import { Navbar } from "./components/Navbar";
import { ListContainer } from "./components/ListContainer";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/login";
import { Signup } from "./components/Signup";
import { PageNotFound } from "./components/PageNotFound";

function App() {
  return (
    <div className="min-h-screen h-full w-full flex flex-col">
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<ListContainer />}></Route>
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
