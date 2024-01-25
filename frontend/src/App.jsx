import { Navbar } from "./components/Navbar";
import { ListContainer } from "./components/List/ListContainer";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Authentication/Login";
import { Signup } from "./components/Authentication/Signup";
import { PageNotFound } from "./components/PageNotFound";
import { isDarkAtom } from "./utils/Store";
import { useAtomValue } from "jotai";
import { Toaster } from "react-hot-toast";
import { Home } from "./components/Home/Home";

function App() {
  const isDark = useAtomValue(isDarkAtom);

  return (
    <div className="min-h-screen h-full w-full flex flex-col">
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 1000,
          style: {
            marginBottom: "20px",
          },
        }}
      />
      <Navbar />
      <div className={`${isDark ? "bg-dark" : ""} flex-1 flex transition-colors`}>
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
