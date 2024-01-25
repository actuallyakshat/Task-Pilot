import { useState, useEffect } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import { signup } from "../../utils/HandleApi";
import { useAtomValue } from "jotai";
import { isDarkAtom } from "../../utils/Store";

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordsMatch] = useState(false);
  const isDark = useAtomValue(isDarkAtom);

  const nameHandler = (e) => {
    setName(e.target.value);
    console.log("Name is: ", name);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
    console.log("Email is: ", email);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    console.log("Pass is: ", password);
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };
  const signupHandler = () => {
    signup(name, email, password);
  };

  useEffect(() => {
    if (password && confirmPassword && confirmPassword == password) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [password, confirmPassword]);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="bg-white w-[420px] h-fit px-6 py-8 -translate-y-12 rounded-lg shadow-lg flex flex-col">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Sign up</h1>
          <p className="font-medium w-[38ch]">
            Your journey to a more organized and focused life begins here.
          </p>
        </div>
        <div className="flex flex-col gap-5 mb-8">
          <input
            type="text"
            id="text"
            placeholder="Name"
            required
            className="p-2 rounded-md border border-black/70 focus:outline-none"
            onChange={nameHandler}
          />
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
          <div className="relative w-full">
            <input
              type="password"
              placeholder="Confirm Password"
              required
              onChange={confirmPasswordHandler}
              className="p-2 rounded-md border w-full border-black/70 focus:outline-none"
            />
            {password && confirmPassword && !passwordMatch && (
              <p className="text-red-500 font-semibold mt-2">
                Passwords do not match
              </p>
            )}
          </div>
        </div>
        <button
          disabled={
            !name || !email || !password || !confirmPassword || !passwordMatch
          }
          className={`${
            name && email && password && passwordMatch
              ? "bg-green-700"
              : "bg-gray-600"
          } px-4 py-2  font-semibold rounded-3xl tracking-wider text-white`}
          onClick={signupHandler}
        >
          Register
        </button>
        <Link to="/login" className="mt-6">
          <p className="text-blue-600 font-semibold text-center">
            Already have an account?
          </p>
        </Link>
      </div>
    </div>
  );
};
