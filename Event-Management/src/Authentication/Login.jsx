import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import bgImg from "../assets/images/login.jpg";
import logo from "../assets/images/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({ email: '', password: '' });
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Signin Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("All fields are required.");
      return;
    }

    try {
      await signIn(email, password);
      toast.success("Signin Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error("Invalid Credentials");
      resetForm();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12 px-4">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-xl shadow-2xl border lg:max-w-4xl transition-all duration-300 hover:shadow-3xl">
        <div
          className="hidden bg-cover bg-center lg:block lg:w-1/2 transition-transform duration-500 hover:scale-105"
          style={{
            backgroundImage: `url(${bgImg})`,
          }}
        ></div>

        <div className="w-full px-8 py-10 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-10 sm:h-12 transition-transform duration-300 hover:scale-110" src={logo} alt="" />
          </div>

          <p className="mt-4 text-2xl font-semibold text-center text-gray-700">
            Welcome back!
          </p>

          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full mt-6 transition-all duration-300 transform border-2 rounded-lg py-3 px-4 hover:bg-gray-50 hover:shadow-md active:scale-95"
          >
            <div className="mr-3">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107"/>
                <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00"/>
                <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50"/>
                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2"/>
              </svg>
            </div>
            <span className="font-semibold text-gray-700">Sign in with Google</span>
          </button>

          <div className="flex items-center justify-between mt-6">
            <span className="w-1/5 border-b border-gray-300 lg:w-1/4"></span>
            <p className="text-xs text-center text-gray-500 uppercase">or login with email</p>
            <span className="w-1/5 border-b border-gray-300 lg:w-1/4"></span>
          </div>

          <form onSubmit={handleSignIn} className="mt-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="LoggingEmailAddress">
                  Email Address
                </label>
                <input
                  id="LoggingEmailAddress"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-2 block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring transition-colors duration-300"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="loggingPassword">
                  Password
                </label>
                <input
                  id="loggingPassword"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-2 block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring transition-colors duration-300"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:opacity-90 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:scale-95"
            >
              Sign In
            </button>
          </form>

          <div className="flex items-center justify-between mt-6">
            <span className="w-1/5 border-b border-gray-300 md:w-1/4"></span>
            <Link
              to="/registration"
              className="text-sm text-gray-500 uppercase hover:text-gray-700 hover:underline transition-colors duration-300"
            >
              or sign up
            </Link>
            <span className="w-1/5 border-b border-gray-300 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;