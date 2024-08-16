import productData from "../product.json";
import { useState } from "react";
import { ProductDetailsModal } from "../components/Product";
import { useCart } from "../context/cartContext";

function ProductList() {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {handleCartData}=useCart()

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct([]);
    setIsModalOpen(false);
  };

  const handleCart=(e,item)=>{
    e.stopPropagation(); 
    handleCartData(item);
  }

  return (
    <div className="flex flex-wrap  justify-center space-x-2 md:w-[100%] place-items-center bg-gray-100">
      {productData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center place-items-center justify-items-center sm:my-5 my-0 shadow-sm p-4 gap-1 
          transform transition-transform duration-300 hover:scale-105 bg-white rounded-md"
          onClick={() => openModal(item)}
        >
          {/* <Link to={`/item-details/${item.id}`} key={index}> */}
            <div className="md:h-[350px] h-72 md:w-[18rem] w-[11rem]">
              <img
                className="object-cover h-full w-full "
                src={item.images[0]}
                alt="Image"
              />
            </div>
          {/* </Link> */}
          <p className="text-new-arrival font-book-antiqua text-sm font-bold leading-tight text-center mt-1 mb-1 md:text-base capitalize text-gray-700">
            {item.title}
          </p>
          <p className="text-black text-center font-book-antiqua text-sm font-bold leading-tight uppercase md:text-base">
            ₹ {item.price}
          </p>
          <button className="border-2  border-[#2874f0] p-2 rounded-md bg-[#2874f0] text-white
           hover:text-[#2874f0] hover:bg-white w-[60%]" 
           onClick={(e) => handleCart(e, item)}
           >
            Add To Cart
          </button>
        </div>
      ))}
      {isModalOpen && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default ProductList;
