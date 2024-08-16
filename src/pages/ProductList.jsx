import productData from "../product.json";
import { useState } from "react";
import { ProductDetailsModal } from "../components/Product";
import { useCart } from "../context/cartContext";
import toast from "react-hot-toast";

function ProductList() {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart, handleCartData, updateItemQuantity } = useCart();

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct([]);
    setIsModalOpen(false);
  };

  const handleCart = (e, item) => {
    e.stopPropagation();
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
  const increaseQuantity = (e, item) => {
    e.stopPropagation();
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

  const decreaseQuantity = (e, item) => {
    e.stopPropagation();
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

  return (
    <div className="flex flex-wrap  justify-center space-x-2 md:w-[100%] place-items-center bg-gray-100">
      {productData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center place-items-center justify-items-center sm:my-5 my-0 shadow-sm p-4 gap-1 
          transform transition-transform duration-300 hover:scale-105 bg-white rounded-md"
          onClick={() => openModal(item)}
        >
          <div className="md:h-[350px] h-72 md:w-[18rem] w-[11rem]">
            <img
              className="object-cover h-full w-full "
              src={item.images[0]}
              alt="Image"
            />
          </div>
          <p className="text-new-arrival font-book-antiqua text-sm font-bold leading-tight text-center mt-1 mb-1 md:text-base capitalize text-gray-700">
            {item.title}
          </p>
          <p className="text-black text-center font-book-antiqua text-sm font-bold leading-tight uppercase md:text-base">
            ₹ {item.price}
          </p>
          {getItemQuantity(item.id) > 0 ? (
            <div className="flex items-center space-x-2">
              <button
                className="border-2 border-[#2874f0] px-4 rounded-md bg-white text-[#2874f0] hover:bg-[#2874f0] hover:text-white font-bold text-xl"
                onClick={(e) => decreaseQuantity(e, item)}
              >
                -
              </button>
              <span className="text-lg font-semibold text-[#2874f0]">
                {getItemQuantity(item.id)}
              </span>
              <button
                className="border-2 border-[#2874f0]  rounded-md px-4  bg-white text-[#2874f0] hover:bg-[#2874f0] hover:text-white text-xl font-bold"
                onClick={(e) => increaseQuantity(e, item)}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="border-2 border-[#2874f0] p-2 rounded-md bg-[#2874f0] text-white
              hover:text-[#2874f0] hover:bg-white w-[60%]"
              onClick={(e) => handleCart(e, item)}
            >
              Add To Cart
            </button>
          )}
        </div>
      ))}
      {isModalOpen && (
        <ProductDetailsModal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
}

export default ProductList;
