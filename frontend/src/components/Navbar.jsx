import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import Menu from "./Menu";
import { useAuthStore } from "../store/authStore.js";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { isAuthenticated } = useAuthStore();
  const showMenu = () => setMenu(!menu);

  return (
    <>
    <div className="bg-gray-800 text-white h-[64px] flex items-center justify-between px-6 py-4 fixed top-0 border-b-2 border-gray-700 w-full z-50">
      <h1 className="text-lg md:text-3xl font-bold text-teal-400">
        <Link to="/">BlogAura</Link>
      </h1>
      {path === "/" && (
        <div
        className="flex justify-between items-center border shadow-lg rounded-xl w-48 h-10 md:h-12 md:w-96 p-2 md:p-4 hover:shadow-xl transition-shadow duration-300"
        onClick={() => navigate(prompt ? `?search=${prompt}` : "/")} // Make the entire bar clickable
        onKeyDown={(e) => e.key === "Enter" && navigate(prompt ? `?search=${prompt}` : "/")} // Add Enter key support
        tabIndex={0} // Make the div focusable
        role="button" // Add role for accessibility
      >
        <input
          onChange={(e) => setPrompt(e.target.value)}
          className="outline-none md:px-3 w-32 flex-grow bg-transparent"
          placeholder="Search a post...."
          type="text"
          onKeyDown={(e) => e.key === "Enter" && navigate(prompt ? `?search=${prompt}` : "/")} // Add Enter key support for input
        />
        <p className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-300">
          <BsSearch />
        </p>
      </div>
      )}

      {/* <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {isAuthenticated ? (
          <>
            <h3 className="text-lg hover:scale-105 duration-300 cursor-pointer md:p-4">
              <Link to="/write">Write</Link>
            </h3>
            <div onClick={showMenu}>
              <p className="cursor-pointer relative text-3xl">
                <FaBars />
              </p>
              {menu && <Menu />}
            </div>
          </>
        ) : (
          <>
            <h3>
              <Link to="/login">Login</Link>
            </h3>
            <h3>
              <Link to="/signup">Signup</Link>
            </h3>
          </>
        )}
      </div> */}

      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
    <div className="hidden md:flex"><Menu/></div>
    </>
  );
};

export default Navbar;
