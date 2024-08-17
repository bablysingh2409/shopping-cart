import productData from "../product.json";
import { useState } from "react";
import { ProductDetailsModal } from "../components/Product";
import { useCart } from "../context/cartContext";
import toast, { Toaster } from "react-hot-toast";

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
                  alt={item.title}
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
    <>
      <Toaster />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 transform transition-transform duration-300 hover:scale-105"
              onClick={() => openModal(item)}
            >
              <div className="md:h-72 h-60 w-full">
                <img
                  className="object-cover h-full w-full rounded-lg"
                  src={item.images[0]}
                  alt={item.title}
                />
              </div>
              <p className="mt-2 text-center text-gray-800 font-semibold text-lg">
                {item.title}
              </p>
              <p className="text-center text-gray-700 font-bold text-xl">
                ₹ {item.price}
              </p>
              {getItemQuantity(item.id) > 0 ? (
                <div className="flex items-center space-x-2 mt-2">
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
                    className="border-2 border-[#2874f0] rounded-md px-4 bg-white text-[#2874f0] hover:bg-[#2874f0] hover:text-white text-xl font-bold"
                    onClick={(e) => increaseQuantity(e, item)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="border-2 border-[#2874f0] p-2 rounded-md bg-[#2874f0] text-white hover:text-[#2874f0] hover:bg-white mt-2 w-full"
                  onClick={(e) => handleCart(e, item)}
                >
                  Add To Cart
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <ProductDetailsModal product={selectedProduct} onClose={closeModal} />
      )}
    </>
  );
}

export default ProductList;
