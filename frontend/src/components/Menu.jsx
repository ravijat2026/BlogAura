import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Home, User, Edit, Book, LogOut } from "lucide-react"; // Import icons

const Menu = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, isAuthenticated, user } = useAuthStore();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    // Menu items for authenticated users
    const authenticatedMenu = [
        {
            name: "Home",
            icon: Home,
            path: "/",
        },
        {
            name: "Write",
            icon: Edit,
            path: "/write",
        },
        {
            name: "My Blogs",
            icon: Book,
            path: `/myblogs/${user?._id}`,
        },
        {
            name: "Profile",
            icon: User,
            path: `/profile/${user?._id}`,
        },
    ];

    // Menu items for unauthenticated users
    const unauthenticatedMenu = [
        {
            name: "Login",
            icon: User,
            path: "/login",
        },
        {
            name: "Sign Up",
            icon: Edit,
            path: "/signup",
        },
    ];

    return (
        <div className="bg-gray-800 text-white h-screen w-64 fixed top-[64.3px] left-0 flex flex-col p-6 space-y-4 shadow-lg">
            {/* <h1 className="text-2xl font-bold text-teal-400 mb-8">My Blog</h1> */}

            {/* Menu Items */}
            <div className="flex flex-col space-y-2 flex-grow">
                {(isAuthenticated ? authenticatedMenu : unauthenticatedMenu).map((menu) => (
                    <Link
                        to={menu.path}
                        key={menu.name}
                        className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-300 ${
                            location.pathname === menu.path ? "bg-teal-500 text-white" : "text-gray-300"
                        }`}
                    >
                        <menu.icon className="w-5 h-5" />
                        <span className="text-lg">{menu.name}</span>
                    </Link>
                ))}
            </div>

            {/* User Info and Logout */}
            {isAuthenticated && (
                <div className="mt-auto">
                    <div
                        onClick={handleLogout}
                        className="flex items-center mb-[54px] space-x-3 p-3 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer mt-2"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="text-lg">Logout</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;