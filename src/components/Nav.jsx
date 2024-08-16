import { FiHeart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { SiAmazonluna } from "react-icons/si";

function Nav() {
  const {cart}=useCart()
  console.log("Cart content:", cart); 

  return (
    <>
      <nav className=" bg-[#2874f0] text-white border-b border-b-gray-400">
        <div className="container flex justify-between h-16 mx-auto">
          <Link
            to='/'
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
           <SiAmazonluna size={34} className="font-bold text-xl"/>
          </Link>
          <ul className="items-stretch hidden space-x-3 md:flex">
            <li className="flex">
              <Link href="#" className="flex items-center px-4 -mb-1 ">
                <FiHeart size={28} />
              </Link>
              <Link to='/cart' className="flex items-center px-4 -mb-1 relative">
                <HiOutlineShoppingBag size={28} />
                {cart.length > 0 && (
                  <span className=" z-10 absolute bg-red-500 top-4  left-9 text-white  rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                )}{" "}
              </Link>
            </li>
          </ul>
          <button className="flex justify-end p-4 md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Nav;
