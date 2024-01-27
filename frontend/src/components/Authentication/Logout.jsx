import { useSetAtom } from "jotai";
import { isLoggedInAtom } from "../../utils/Store";

export const Logout = () => {
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);
  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return <div onClick={logoutHandler}>Logout</div>;
};
