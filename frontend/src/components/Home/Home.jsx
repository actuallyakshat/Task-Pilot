import { isDarkAtom } from "../../utils/Store";
import { useAtomValue } from "jotai";
import { Hero } from "./Hero";
import { Features } from "./Features";

export const Home = () => {
  const isDark = useAtomValue(isDarkAtom);
  return (
    <div className="flex flex-col flex-1">
      <Hero />
      <Features />
    </div>
  );
};
