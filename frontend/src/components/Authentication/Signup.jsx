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

      //TODO: check if user exists.
      const otp = generateOTP();
      console.log("Sending this otp:", otp);
      let response = await sendOtp(email, name, otp);
      console.log("logging response:", response.data.success);
      console.log("You are unique");
      if (response.data.success) {
        setAskOTP(true);
        //TODO: send email
        toast("OTP Sent on Email", {
          icon: "📬",
        });
      } else if (response.data.success == false) {
        setErrorMessage(true);
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      console.error("Error occurred while signing up:", error.message);
    }
  };

  const otpHandler = async () => {
    console.log("Welcome to otp handler function");
    const matched = await verifyOTP(otpRef.current);

    if (matched == true) {
      const response = await signup(name, email, password);
      console.log(response);
      if (response) {
        setErrorMessage(false);
        console.log("User created successfully:", response.name);
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
    console.log("OTP jo maine banaya hai", otp);
    console.log("OTP jo tumne daala woh hai", otpEntered);
    if (otpEntered == otp) {
      console.log("returning true");
      return true;
    } else {
      console.log("returning false");
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
