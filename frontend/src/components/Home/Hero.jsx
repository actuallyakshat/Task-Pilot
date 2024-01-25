import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="h-[calc(100vh-64px)] bg-hero bg-cover bg-no-repeat font-Rubik snap-start">
      <div className="ml-28 mt-40">
        <h1 className=" font-bold text-6xl w-[20ch] mb-2">
          A Minimal To Do List & Accountability App
        </h1>
        <h3 className="w-[40ch] text-[1.1em]">
          Step into a World of Organized Living. <br />
          <span className="font-bold">Task Pilot</span> Awaits Your Presence.
          Join Now to Uncover the Secret to a Harmonious and Stress-Free
          Lifestyle
        </h3>
        <Link to="/signup">
          <button className="mt-12 bg-dark px-4 py-3 text-white font-semibold rounded-md">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};
