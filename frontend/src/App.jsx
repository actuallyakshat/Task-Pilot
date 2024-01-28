import { Navbar } from "./components/Navbar";
import { ListContainer } from "./components/List/ListContainer";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Authentication/Login";
import { Signup } from "./components/Authentication/Signup";
import { PageNotFound } from "./components/PageNotFound";
import { isDarkAtom, isLoggedInAtom, loadingAtom } from "./utils/Store";
import { useSetAtom, useAtomValue, useAtom } from "jotai";
import { Toaster } from "react-hot-toast";
import { Home } from "./components/Home/Home";
import { useEffect } from "react";
import { authorization } from "./utils/HandleApi";
import { Sidebar } from "./components/Sidebar";

function App() {
  const isDark = useAtomValue(isDarkAtom);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const setLoading = useSetAtom(loadingAtom);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const auth = await authorization(token);
          setIsLoggedIn(auth.data.login);
        } else {
          setIsLoggedIn(false);
        }
        setLoading(false);
      } catch (error) {
        console.log("Token not found");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen h-full w-full flex flex-col">
      <Toaster />
      <Navbar />
      <div
        className={`${
          isDark ? "bg-dark" : "bg-light"
        } flex-1 flex transition-colors`}
      >
        {/* {isLoggedIn && <Sidebar />} */}

        <Routes>
          <Route index path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/list" element={<ListContainer />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
