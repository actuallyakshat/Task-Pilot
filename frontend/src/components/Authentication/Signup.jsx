import { useState, useEffect, useRef } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { sendOtp, signup } from "../../utils/HandleApi";
import toast from "react-hot-toast";

export const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordsMatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [spinner, setSpinner] = useState(false);

  //otp validation
  const [askOTP, setAskOTP] = useState(false);
  const [otpEntered, setOtpEntered] = useState("");

  const otpRef = useRef("");

  function generateOTP() {
    const otpLength = 6;
    let otp = "";
    for (let i = 0; i < otpLength; i++) {
      const randomDigit = Math.floor(Math.random() * 10);
      otp += randomDigit.toString();
    }

    otpRef.current = otp;
    return otp;
  }

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const signupHandler = async () => {
    setAskOTP(false);
    try {
      // Email Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Invalid Email Format", {
          duration: 5000,
          position: "top-center",
          style: {
            marginTop: "15px",
            fontWeight: 500,
          },
        });
        return;
      }

      // Password Validation
      const passwordLengthRegex = /^.{6,}$/;
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

      if (
        !passwordLengthRegex.test(password) ||
        !uppercaseRegex.test(password) ||
        !lowercaseRegex.test(password) ||
        !specialCharacterRegex.test(password)
      ) {
        toast.error(
          "Your password must contain at least:\n 1 uppercase letter,\n1 lowercase letter,\n1 special character.",
          {
            duration: 5000,
            position: "top-center",
            style: {
              marginTop: "15px",
              fontWeight: 500,
            },
          }
        );
        return;
      }

      setSpinner(true);
      //TODO: check if user exists.
      const otp = generateOTP();
      let response = await sendOtp(email, name, otp);
      if (response.data.success) {
        setAskOTP(true);
        setSpinner(false);
        toast("OTP Sent on Email", {
          icon: "📬",
        });
      } else if (response.data.success == false) {
        spinner(false);
        setErrorMessage(true);
      } else {
        spinner(false);
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      console.error("Error occurred while signing up:", error.message);
    }
  };

  const otpHandler = async () => {
    const matched = await verifyOTP(otpRef.current);

    if (matched == true) {
      const response = await signup(name, email, password);
      if (response) {
        setErrorMessage(false);
        toast.success("Account Created Successfully", {
          duration: 5000,
          position: "top-center",
          style: {
            marginTop: "15px",
            fontWeight: "bold",
          },
        });
        navigate("/login");
      } else {
        toast.error("Something Went Wrong");
      }
    } else {
      toast.error("OTP Does Not Match!");
    }
  };

  const verifyOTP = (otp) => {
    if (otpEntered == otp) {
      return true;
    } else {
      return false;
    }
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
    <div className="flex-1 flex px-8 md:p-0 items-center justify-center">
      <div className="bg-white w-[420px] h-fit px-6 py-8 -translate-y-8 md:-translate-y-12 rounded-lg shadow-2xl flex flex-col">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Sign up</h1>
          <p className="font-medium max-w-[38ch]">
            Your journey to a more organized and focused life begins here.
          </p>
        </div>
        <form
          className="flex flex-col gap-5 mb-4"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              signupHandler();
            }
          }}
        >
          <input
            type="text"
            id="text"
            disabled={askOTP}
            placeholder="Name"
            required
            className="p-2 rounded-md border border-black/70 focus:outline-none"
            onChange={nameHandler}
          />
          <input
            type="email"
            id="email"
            disabled={askOTP}
            placeholder="Email"
            required
            className="p-2 rounded-md border border-black/70 focus:outline-none"
            onChange={emailHandler}
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              disabled={askOTP}
              placeholder="Password"
              required
              className="p-2 rounded-md border w-full border-black/70 focus:outline-none"
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
          {password && password.length < 6 && (
            <p className="my-[-10px] text-red-500 font-semibold">
              Your password must contain atleast 6 characters
            </p>
          )}
          <div className="relative w-full">
            <input
              type="password"
              placeholder="Confirm Password"
              disabled={askOTP}
              required
              onChange={confirmPasswordHandler}
              className="p-2 rounded-md border w-full border-black/70 focus:outline-none"
            />
            {password && confirmPassword && !passwordMatch && (
              <p className="text-red-500 font-semibold mt-2">
                Passwords do not match
              </p>
            )}
            {errorMessage && (
              <p className="text-red-500 font-semibold mt-2">
                User already registered!
              </p>
            )}
          </div>
        </form>
        {spinner && (
          <div role="status" className="mb-4 mx-auto">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {askOTP && (
          <div className="flex items-center justify-between gap-4 mb-6 w-full">
            <input
              type="text"
              placeholder="Enter OTP"
              onChange={(e) => setOtpEntered(e.target.value)}
              className="p-2 rounded-md border flex-1 border-black/70 focus:outline-none"
            />
            <button
              onClick={signupHandler}
              className="text-sm px-3 py-3 text-white rounded-lg bg-dark"
            >
              Resend
            </button>
          </div>
        )}
        {askOTP ? (
          <button
            onClick={otpHandler}
            className="px-4 py-2 bg-green-700 font-semibold rounded-3xl tracking-wider text-white"
          >
            Submit OTP
          </button>
        ) : (
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                signupHandler;
              }
            }}
          >
            Register
          </button>
        )}
        <Link to="/login" className="mt-6">
          <p className="text-blue-600 font-semibold text-center">
            Already have an account?
          </p>
        </Link>
      </div>
    </div>
  );
};
