import { useAtomValue, useAtom } from "jotai";
import { isDarkAtom, isLoggedInAtom, userAtom } from "../../utils/Store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  authorization,
  deleteAccount,
  editPassword,
  editUser,
} from "../../utils/HandleApi";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const user = useAtomValue(userAtom);
  const isDark = useAtomValue(isDarkAtom);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const navigate = useNavigate();
  const [changePassword, setChangePassword] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordMatch] = useState(false);

  useEffect(() => {
    setEmail(user.email);
    setName(user.name);
  }, [user]);

  const deleteHandler = async () => {
    const response = await deleteAccount(email);
    if (response) {
      toast.success("Account deleted successfully");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      toast.error("Account Couldn't Be Deleted!");
    }
  };

  const changePasswordHandler = () => {
    setChangePassword(!changePassword);
  };

  useEffect(() => {
    if (password && confirmPassword && password == confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [password, confirmPassword]);

  const changeUserPassword = () => {
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
        "Your password must contain at least:\n6 characters, where there is:\n1 uppercase letter,\n1 lowercase letter,\n1 special character.",
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
    //TODO: else change password database
    if (editPassword(email, password)) {
      toast.success("Password was changed successfully!");
    } else {
      toast.error("Your password couldn't be changed");
    }
  };

  const changeUserDetails = () => {
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
    if (editUser(name, email, password)) {
      toast.success("Your details were changed successfully!");
    } else {
      toast.error("Your account details couldn't be changed");
    }
  };

  const saveChangesHandler = () => {
    console.log("I am called");
    if (changePassword) {
      changeUserPassword();
    } else {
      changeUserDetails();
    }
  };

  return (
    <div className="flex-1 flex font-Rubik">
      <div
        className={`${
          isDark ? "text-white" : "text-black"
        } md:mx-0 mx-auto w-full px-8 transition-colors mt-8 py-12`}
      >
        <div className="mx-auto md:w-[60%] lg:w-[30%]">
          <div>
            <h1 className="font-[600] text-3xl">Account</h1>
            <p className={`${isDark ? "text-gray-100" : "text-gray-600"}`}>
              Set your account settings below
            </p>
          </div>
          <div className="md:mx-0 h-[40%] w-full flex flex-col justify-between mt-8">
            <div className="flex flex-col gap-4 relative">
              {!changePassword && (
                <>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">Name</p>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-50 w-full text-black rounded-md px-2 py-1 border-gray-300 border "
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">Email</p>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 text-black w-full rounded-md px-2 py-1 border-gray-300 border "
                    />
                  </div>
                </>
              )}

              {changePassword && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">New Password</p>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Enter New Password"
                      className="bg-gray-50 text-black w-full rounded-md px-2 py-1 border-gray-300 border "
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">Confirm New Password</p>
                    <input
                      placeholder="Confirm New Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type="password"
                      className="bg-gray-50 text-black w-full rounded-md px-2 py-1 border-gray-300 border "
                    />
                  </div>
                </div>
              )}

              <button
                onClick={saveChangesHandler}
                className={`${
                  passwordsMatch || !changePassword
                    ? "bg-green-700"
                    : "bg-gray-700"
                } transition-colors rounded-md text-white block px-3 py-2 mt-4 w-fit`}
              >
                Save Changes
              </button>
            </div>
            <div className="mt-5 flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={changePasswordHandler}
                className={`${
                  isDark ? "text-white" : "text-black"
                } border-purple-600 hover:bg-purple-600 transition-colors hover:text-white border w-fit py-2 px-3 rounded-md`}
              >
                {changePassword ? "Cancel Change Password" : "Change Password"}
              </button>
              <button
                onClick={deleteHandler}
                className={`${
                  isDark ? "text-white" : "text-black"
                } border-red-600 hover:bg-red-600 transition-colors hover:text-white border w-fit py-2 px-3 rounded-md`}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
