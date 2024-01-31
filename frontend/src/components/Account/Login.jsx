import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/HandleApi";
import { useSetAtom, useAtom } from "jotai";
import { isLoggedInAtom, userAtom } from "../../utils/Store";

export const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  if (isLoggedIn) {
    navigate("/list");
  }
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetAtom(userAtom);
  const [error, setError] = useState("");

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = async () => {
    try {
      const data = await login(email, password, setError);
      if (data) {
        if (data.success == true) {
          localStorage.setItem("token", data.token);
          setUser(data.data);
          setIsLoggedIn(true);
          navigate("/list");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    !isLoggedIn && (
      <div className="flex-1 flex items-center justify-center py-12 px-0 md:px-8">
        <div className="-translate-y-6 shadow-2xl min-w-[80%] lg:min-w-[70%] rounded-lg h-[80%] md:min-h-[90%] flex">
          <div className="bg-white overflow-hidden text-center md:text-left py-12 w-full lg:w-[50%] min-h-full px-6 md:px-16 rounded-lg lg:rounded-none lg:rounded-l-lg flex justify-center flex-col">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Sign in</h1>
              <p className="font-medium">
                Stay productive in a fast-paced world
              </p>
            </div>
            <form
              className="flex flex-col gap-5 mb-8"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  loginHandler();
                }
              }}
            >
              <input
                type="email"
                id="email"
                placeholder="Email"
                required
                className="p-2 bg-gray-200 border-gray-300 font-Rubik rounded-md border focus:outline-none"
                onChange={emailHandler}
              />
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  required
                  className="p-2 rounded-md bg-gray-200 font-Rubik border w-full border-gray-300 focus:outline-none"
                  onChange={passwordHandler}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={showPasswordHandler}
                >
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </button>
              </div>
              {error && <p className="text-red-500 font-semibold">{error}</p>}
            </form>
            <div className="w-full flex flex-col gap-2">
              <button
                disabled={!email || !password}
                className={`${
                  email && password ? "bg-green-700" : "bg-gray-600"
                } px-4 py-2  font-semibold rounded-3xl tracking-wider text-white`}
                onClick={loginHandler}
              >
                Sign in
              </button>

              <p className="w-fit mx-auto">or</p>
              <Link
                to="/signup"
                className="px-4 py-2 border-purple-600 hover:bg-purple-600 hover:text-white transition-colors border font-semibold rounded-3xl cursor-pointer flex items-center justify-center"
              >
                Sign up
              </Link>
            </div>
          </div>
          <div className="bg-login bg-cover bg-center rounded-r-lg hidden lg:inline flex-1">
            <div className="h-full flex px-4 text-center flex-col items-center justify-center">
              <h1 className="text-white font-[700] text-5xl mb-3 font-Rubik">
                Welcome Back!
              </h1>
              <h3 className="text-white font-[500] text-2xl mb-3 font-Rubik text-center px-6">Let&apos;s take back control of our day and get back to work!</h3>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
