import { isDarkAtom } from "../utils/Store";
import { useAtomValue } from "jotai";

export const PageNotFound = () => {
  const isDark = useAtomValue(isDarkAtom);
  return (
    <div
      className={`${
        isDark ? "text-white" : "text-black"
      } flex-1 flex-col flex font-mono justify-center items-center`}
    >
      <div className="text-center flex flex-col gap-4 -translate-y-12">
        <h1 className="text-6xl">Whoops 🙊</h1>
        <p className="text-4xl">
          The page you are looking for does not exists!
        </p>
      </div>
    </div>
  );
};
