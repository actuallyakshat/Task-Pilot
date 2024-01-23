import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <nav className="flex h-[70px] justify-center items-center border-b-2 shadow-sm text-black/80">
      <div className="w-[70%] h-full flex items-center justify-between">
        <Link to="/">
          <h1 className="font-Poppins uppercase text-xl font-[700]">
            task pilot
          </h1>
        </Link>
        <div className="flex gap-6">
          <button>dark</button>
          <Link to="/login"><button>login</button></Link>
        </div>
      </div>
    </nav>
  );
};
