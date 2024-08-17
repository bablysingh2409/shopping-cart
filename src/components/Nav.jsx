import { FiHeart, FiLogOut, FiUser } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SiAmazonluna } from "react-icons/si";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";

function Nav() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="bg-[#2874f0] text-white border-b border-b-gray-400 z-50 relative">
        <div className="container flex justify-between items-center h-16 mx-auto px-4 md:px-0">
          <Link
            to="/"
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
            <SiAmazonluna size={34} className="font-bold text-xl" />
          </Link>
          <ul
            className={`${
              menuOpen ? "block" : "hidden"
            } items-stretch space-y-2 md:space-y-0 md:space-x-3 md:flex md:items-center md:flex-row absolute top-16 left-0 w-full md:w-auto md:static bg-[#2874f0] md:bg-transparent z-50`}
          >
            <li className="flex justify-center md:justify-start">
              <Link
                to="/cart"
                className="flex items-center px-4 py-2 md:py-0 relative"
                onClick={() => setMenuOpen(false)}
              >
                <HiOutlineShoppingBag size={28} />
                {cart.length > 0 && (
                  <span className="z-10 absolute bg-red-500 top-0 right-0 md:left-9 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                )}
              </Link>
            </li>
            <li className="flex justify-center md:justify-start">
              {user.isLogin ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center px-4 py-2 md:py-0"
                >
                  <FiLogOut size={28} />
                  <span className="ml-2">Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 md:py-0"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiUser size={28} />
                  <span className="ml-2">Login</span>
                </Link>
              )}
            </li>
          </ul>
          <button
            className="flex justify-end p-4 md:hidden"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <p className="text-3xl font-bold">X</p>
            ) : (
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
            )}
          </button>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Nav;
