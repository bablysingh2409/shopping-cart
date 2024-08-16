import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { FaRegHeart, FaRegTrashCan } from "react-icons/fa6";
import emptyCart from "../../public/empty_cart.gif";

export default function Cart() {
  const { cart, handleCartData, updateItemQuantity ,setCart} = useCart();
  const navigate = useNavigate();

  const increaseQuantity = (item) => {
    handleCartData(item);
  };

  const decreaseQuantity = (item, quantity) => {
    const newQuantity = quantity - 1;
    updateItemQuantity(item.id, newQuantity);
  };

  const handleRemove = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  const totalAmount = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleCheckout = () => {
    
      navigate("/checkout-success");
      setCart([])
      localStorage.clear()
  };

  if (!cart.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <img src={emptyCart} alt="Empty Cart" className="h-40 w-40 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6">
          It looks like you haven’t added anything to your cart yet.
        </p>
        <Link to="/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Start Shopping
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
      <h2 className="text-3xl font-bold">Your cart</h2>
      <p className="mt-3 text-sm font-medium text-gray-700">
        Review your selected items before proceeding to checkout.
      </p>
      <ul className="flex flex-col divide-y divide-gray-200">
        {cart.map((product) => (
          <li
            key={product.id}
            className="flex flex-col py-6 sm:flex-row sm:justify-between"
          >
            <div className="flex w-full space-x-2 sm:space-x-4">
              <img
                className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                src={product.images[0]}
                alt={product.title}
              />
              <div className="flex w-full flex-col justify-between pb-4">
                <div className="flex w-full justify-between space-x-2 pb-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                      {product.title}
                    </h3>
                    <p className="text-sm">{product.brand}</p>
                    <div className="flex items-center space-x-2">
                      <button
                        className="border border-[#2874f0] px-2 rounded-full bg-white text-[#2874f0] hover:bg-[#2874f0] hover:text-white font-bold text-xl"
                        onClick={() =>
                          decreaseQuantity(product, product.quantity)
                        }
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold text-black">
                        {product.quantity}
                      </span>
                      <button
                        className="border border-[#2874f0]  rounded-full px-2 bg-white text-[#2874f0] hover:bg-[#2874f0] hover:text-white text-xl font-bold"
                        onClick={() => increaseQuantity(product)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">₹{product.price}</p>
                  </div>
                </div>
                <div className="flex divide-x text-sm">
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-2 py-1 pl-0"
                    onClick={()=>handleRemove(product.id)}
                  >
                    <FaRegTrashCan size={24} className="text-[#2874f0]"/>
                    <span>Remove</span>
                  </button>
                  {/* <button
                    type="button"
                    className="flex items-center space-x-2 px-2 py-1"
                  >
                    <FaRegHeart size={24} className="text-[#2874f0]"/>
                    <span>Add to favorites</span>
                  </button> */}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="space-y-1 text-right">
        <p className="text-2xl font-semibold text-gray-700">
          Total amount:
          <span className="font-bold text-2xl text-[#2874f0] "> ₹{(totalAmount).toFixed(2)}</span>
        </p>
      </div>
      <div className="flex justify-end space-x-4">
        <Link to="/">
          <button
            type="button"
            className="rounded-md border border-[#2874f0] px-3 py-2 text-sm font-semibold text-[#2874f0] shadow-sm "
          >
            Back to shop
          </button>
        </Link>
        <button
          type="button"
          className="rounded-md border border-[#2874f0] px-3 py-2 text-sm font-semibold text-[#2874f0] shadow-sm "
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
