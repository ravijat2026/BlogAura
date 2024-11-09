import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Menu = () => {
    const navigate = useNavigate();
    const { logout ,isAuthenticated ,user } = useAuthStore();

    const handleLogout = async () => {
        await logout();
       
        navigate("/login");
    };

    return (
        <div className="bg-gray-800 w-[180px] z-10 flex flex-col items-start justify-center absolute top-16 right-4 md:right-32 rounded-md p-6 space-y-4">
            {!isAuthenticated && (
                <h3 className="text-teal-400 text-lg hover:scale-105 duration-300 cursor-pointer">
                    <Link to="/login">Login</Link>
                </h3>
            )}
            {!isAuthenticated && (
                <h3 className="text-teal-400 text-lg hover:scale-105 duration-300 cursor-pointer">
                    <Link to="/signup">Sign Up</Link>
                </h3>
            )}
            {isAuthenticated && (
                <>
                    <h3 className="text-teal-400 text-lg hover:scale-105 duration-300 cursor-pointer">
                        <Link to="/">Home</Link>
                    </h3>
                    <h3 className="text-teal-400 text-lg hover:scale-105 duration-300 cursor-pointer">
                        <Link to={`/profile/${user._id}`}>Profile</Link>
                    </h3>
                    <h3 className="text-teal-400 text-lg hover:scale-105 duration-300 cursor-pointer">
                        <Link to="/write">Write</Link>
                    </h3>
                    <h3 className="text-teal-400 text-lg hover:scale-105 duration-300 cursor-pointer">
                        <Link to={`/myblogs/${user._id}`}>My blogs</Link>
                    </h3>
                    <h3 onClick={handleLogout} className="text-teal-400 hover:scale-105 duration-300 cursor-pointer">
                        Logout
                    </h3>
                </>
            )}
        </div>
    );
};

export default Menu;
