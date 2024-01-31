import { useSetAtom } from "jotai";
import { isDarkAtom, isLoggedInAtom } from "../../utils/Store";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useAtomValue } from "jotai";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";

export const Logout = () => {
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);
  const isDark = useAtomValue(isDarkAtom);
  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    
  };

  // return <div onClick={logoutHandler}>Logout</div>;
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="font-[500] text-2xl hover:text-red-500 transition-colors hover:border-b px-2 py-2 border-red-500">
        <MdLogout />
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content
          className={`${
            isDark
              ? "bg-black/80 text-white border-white"
              : "bg-white border-black"
          }  border w-[80%] md:w-fit animate-alertModal font-mono shadow-md rounded-xl fixed top-1/2 left-1/2 py-8 px-8 -translate-x-1/2 -translate-y-1/2`}
        >
          <AlertDialog.Title className="font-bold text-2xl mb-1">
            Logout
          </AlertDialog.Title>
          <AlertDialog.Description className="text-lg">
            Are you sure you want to log out?
          </AlertDialog.Description>
          <div className="flex gap-4 justify-end mt-4">
            <AlertDialog.Cancel className="px-4 py-2 rounded-md bg-gray-600 text-white font-semibold flex items-center justify-center">
              Cancel
            </AlertDialog.Cancel>
            <AlertDialog.Action
              className="px-3 py-2 rounded-md bg-red-500 text-white font-semibold flex items-center justify-center"
              onClick={logoutHandler}
            >
              <Link to="/login">Logout</Link>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
