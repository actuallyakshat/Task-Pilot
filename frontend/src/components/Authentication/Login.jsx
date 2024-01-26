import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/HandleApi";
import { useSetAtom } from "jotai";
import { isLoggedInAtom, userAtom } from "../../utils/Store";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetAtom(userAtom);
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);
  const navigate = useNavigate();
  const [invalidCredentials, setinvalidCredentials] = useState(false);

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
      const data = await login(email, password, setUser);
      if (data.success == true) {
        localStorage.setItem("token", data.token);
        setUser(data.data);
        setinvalidCredentials(false);
        setIsLoggedIn(true);
        navigate("/list");
      } else {
        setinvalidCredentials(true);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="bg-white w-[420px] h-fit px-6 py-8 -translate-y-12 rounded-lg shadow-2xl flex flex-col">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Sign in</h1>
          <p className="font-medium">Stay productive in a fast-paced world</p>
        </div>
        <div
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
            className="p-2 rounded-md border border-black/70 focus:outline-none"
            onChange={emailHandler}
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              required
              className="p-2 rounded-md border w-full border-black/70 focus:outline-none"
              onChange={passwordHandler}
            />
            <button
              className="absolute right-3 top-3"
              onClick={showPasswordHandler}
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
          </div>
          {invalidCredentials && (
            <p className="text-red-500 font-semibold">Invalid Credentials</p>
          )}
        </div>
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
            className="px-4 py-2 border-green-700 transition-colors border font-semibold rounded-3xl cursor-pointer flex items-center justify-center"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
