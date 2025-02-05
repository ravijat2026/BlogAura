import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoading, error } = useAuthStore();

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		await login(email, password);
		navigate("/");
	};

	return (
		<div className="mx-auto bg-gradient-to-tl from-[#1f1f20] to-[#131f2e] flex items-center justify-center h-screen z-0 md:ml-64">
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden max-h-screen'
		>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center text-white'>
					Welcome Back
				</h2>

				<form onSubmit={handleLogin}>
					<Input
						icon={Mail}
						type='email'
						placeholder='Email Address'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<Input
						icon={Lock}
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<div className='flex items-center mb-6'>
						<Link to='/forgot-password' className='text-sm text-white'>
							Forgot password?
						</Link>
					</div>
					{error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='w-full py-3 px-4 bg-teal-400 text-white font-bold rounded-lg shadow-lg  focus:outline-none transition duration-200'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Login"}
					</motion.button>
				</form>
			</div>
			<div className='px-8 py-4 bg-gray-600 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-white'>
					Don't have an account?{" "}
					<Link to='/signup' className='text-teal-400'>
						Sign up
					</Link>
				</p>
			</div>
		</motion.div>
		</div>
	);
};
export default Login;