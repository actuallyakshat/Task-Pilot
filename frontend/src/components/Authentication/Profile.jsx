import { useAtomValue } from "jotai";
import { isDarkAtom, userAtom } from "../../utils/Store";
export const Profile = () => {
  const user = useAtomValue(userAtom);
  const isDark = useAtomValue(isDarkAtom);
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
              <div className="flex flex-col gap-1">
                <p className="font-bold">Name</p>
                <input
                  value={user.name}
                  className="bg-gray-50 w-full text-black rounded-md px-2 py-1 border-gray-300 border "
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold">Email</p>
                <input
                  value={user.email}
                  className="bg-gray-50 text-black w-full rounded-md px-2 py-1 border-gray-300 border "
                />
              </div>
              <button className="bg-green-600 hover:bg-green-700 transition-colors rounded-md text-white block px-3 py-2 mt-4 w-fit">
                Save Changes
              </button>
            </div>
            <div className="mt-5 flex flex-col sm:flex-row justify-between gap-4">
              <button
                className={`${
                  isDark ? "text-white" : "text-black"
                } border-purple-600 hover:bg-purple-600 transition-colors hover:text-white border w-fit py-2 px-3 rounded-md`}
              >
                Change Password
              </button>
              <button
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
