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
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-3xl font-bold text-teal-600">
        <Link to="/">BlogAura</Link>
      </h1>
      {path === "/" && (
        <div className="flex justify-between items-center space-x-0 border shadow-lg rounded-xl w-48 h-[40px] md:w-96 p-2 md:p-4">
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-none md:px-3 w-32"
            placeholder="Search a post...."
            type="text"
          />
          <p
            onClick={() => navigate(prompt ? `?search=${prompt}` : "/")}
            className="cursor-pointer"
          >
            <BsSearch />
          </p>
        </div>
      )}

      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {isAuthenticated ? (
          <>
            <h3 className="text-black text-lg hover:scale-105 duration-300 cursor-pointer md:p-4">
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
      </div>

      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
