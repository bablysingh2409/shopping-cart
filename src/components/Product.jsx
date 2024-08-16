export const ProductDetailsModal = ({ product, onClose }) => {
  if (!product) return <></>;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center  ">
      <div className="bg-white p-8 rounded-md shadow-lg w-[60%] ">
        <button onClick={onClose} className="text-red-500 float-right font-extrabold text-xl">
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
              <button
                type="button"
                className="border-2 border-[#2874f0] rounded-md bg-[#2874f0] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[white] hover:text-[#2874f0]  "
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
