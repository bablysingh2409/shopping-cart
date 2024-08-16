import toast from "react-hot-toast";
import { useCart } from "../context/cartContext";

export const ProductDetailsModal = ({ product, onClose }) => {
  const { cart, handleCartData, updateItemQuantity } = useCart();

  const handleCart = (item) => {
    handleCartData(item);

    toast.custom((t) => {
      setTimeout(() => {
        toast.dismiss(t.id);
      }, 1000);
      return (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-xs  bg-white shadow-lg  pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex p-2">
            <div className="flex flex-row">
              <div className="flex justify-center">
                <img
                  className="h-20 w-8 object-contain"
                  src={item.images[0]}
                  alt="item.title"
                />
              </div>
              <div className="ml-3 flex items-center font-book-antiqua">
                <p className="mt-1 text-sm text-gray-500">
                  Item Added to Cart{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const getItemQuantity = (itemId) => {
    const item = Array.isArray(cart)
      ? cart.find((cartItem) => cartItem.id === itemId)
      : null;
    return item ? item.quantity : 0;
  };
  const increaseQuantity = (item) => {
    handleCartData(item);

    toast.custom((t) => {
      setTimeout(() => {
        toast.dismiss(t.id);
      }, 1000);

      return (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-xs  bg-white shadow-lg  pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex p-2">
            <div className="flex flex-row">
              <div className="flex justify-center">
                <img
                  className="h-20 w-8 object-contain"
                  src={item.images[0]}
                  alt="item.title"
                />
              </div>
              <div className="ml-3 flex items-center font-book-antiqua">
                <p className="mt-1 text-sm text-gray-500">
                  Quantity Increased{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const decreaseQuantity = (item) => {
    const newQuantity = getItemQuantity(item.id) - 1;
    updateItemQuantity(item.id, newQuantity);

    toast.custom((t) => {
      setTimeout(() => {
        toast.dismiss(t.id);
      }, 500);

      return (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-xs  bg-white shadow-lg  pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex p-2">
            <div className="flex flex-row">
              <div className="flex justify-center">
                <img
                  className="h-20 w-8 object-contain"
                  src={item.images[0]}
                  alt="item.title"
                />
              </div>
              <div className="ml-3 flex items-center font-book-antiqua">
                <p className="mt-1 text-sm text-gray-500">
                  Quantity Decreased{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  if (!product) return <></>;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center  ">
      <div className="bg-white p-8 rounded-md shadow-lg w-[60%] ">
        <button
          onClick={onClose}
          className="text-red-500 float-right font-extrabold text-xl"
        >
          X
        </button>
        <div className="flex flex-wrap items-center">
          <img
            alt={product.title}
            className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
            src={product.images[0]}
          />
          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
            <h2 className="text-sm font-semibold tracking-widest text-gray-500">
              {product.brand}
            </h2>
            <h1 className="my-4 text-3xl font-semibold text-black">
              {product.title}
            </h1>
            <p className="leading-relaxed">{product.description}</p>
            <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5 gap-5">
              <span className="title-font text-xl font-bold text-gray-900">
                ₹{product.price}
              </span>
              {getItemQuantity(product.id) > 0 ? (
                <div className="flex items-center space-x-2">
                  <button
                    className="border-2 border-[#2874f0] px-4 rounded-md bg-white text-[#2874f0] hover:bg-[#2874f0] hover:text-white font-bold text-xl"
                    onClick={() => decreaseQuantity(product)}
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold text-[#2874f0]">
                    {getItemQuantity(product.id)}
                  </span>
                  <button
                    className="border-2 border-[#2874f0]  rounded-md px-4  bg-white text-[#2874f0] hover:bg-[#2874f0] hover:text-white text-xl font-bold"
                    onClick={() => increaseQuantity(product)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="border-2 border-[#2874f0] p-2 rounded-md bg-[#2874f0] text-white
              hover:text-[#2874f0] hover:bg-white w-[60%]"
                  onClick={(e) => handleCart(product)}
                >
                  Add To Cart
                </button>
              )}
              {/* <button
                type="button"
                className="border-2 border-[#2874f0] rounded-md bg-[#2874f0] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[white] hover:text-[#2874f0]  "
              >
                Add to Cart
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
