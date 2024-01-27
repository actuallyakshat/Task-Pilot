import { Navbar } from "./components/Navbar";
import { ListContainer } from "./components/List/ListContainer";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Authentication/Login";
import { Signup } from "./components/Authentication/Signup";
import { PageNotFound } from "./components/PageNotFound";
import { isDarkAtom, isLoggedInAtom, loadingAtom } from "./utils/Store";
import { useSetAtom, useAtomValue } from "jotai";
import { Toaster } from "react-hot-toast";
import { Home } from "./components/Home/Home";
import { useEffect } from "react";
import { authorization } from "./utils/HandleApi";

function App() {
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);
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

  const isDark = useAtomValue(isDarkAtom);

  return (
    <div className="min-h-screen h-full w-full flex flex-col">
      <Toaster />
      <Navbar />
      <div
        className={`${isDark ? "bg-dark" : "bg-light"} flex-1 flex transition-colors`}
      >
        <Routes>
          <Route index path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/list" element={<ListContainer />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>

      {/* <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} /> */}
      {/* <div className="flex-1 flex ">
                  <Signin />
                </div> */}
    </div>
  );
}

export default App;
