import PropTypes from "prop-types";
import { addToDo, updateToDo } from "../../utils/HandleApi";
import { Day } from "./Day";
import { Time } from "./Time";
import { useAtom, useAtomValue } from "jotai";
import { isDarkAtom, isUpdatingAtom, userAtom } from "../../utils/Store";

export const InputBar = ({ text, setText, setToDo, toDoId, inputRef }) => {
  const [isUpdating, setIsUpdating] = useAtom(isUpdatingAtom);
  const isDark = useAtomValue(isDarkAtom);
  const User = useAtomValue(userAtom);
  const userid = User.id;
  const addToDoHandler = () => {
    const userid = User.id;
    addToDo(text, userid, setText, setToDo);
    setText("");
  };

  const updateToDoHandler = () => {
    updateToDo(toDoId, userid, text, setText, setToDo, setIsUpdating);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (isUpdating == true) {
        updateToDoHandler();
      } else {
        addToDoHandler();
      }
    }
  };

  return (
    <div className="h-full md:w-full w-[90vw] px-2 mb-8 flex flex-col">
      <div
        className={`${
          isDark ? "text-white" : ""
        } flex w-full md:w-[90%] mx-auto justify-between items-center`}
      >
        <div className="w-full flex justify-between mb-4">
          <Day />
          <Time />
        </div>
      </div>
      <div className="mx-auto w-full md:w-[70%] mt-4 flex gap-4">
        <button
          className={`px-6 py-2 text-md font-semibold text-white font-mono rounded-2xl ${
            isDark ? "bg-green-600" : "bg-purple-600"
          } flex items-center justify-center`}
          onClick={() => {
            isUpdating ? updateToDoHandler() : addToDoHandler();
          }}
        >
          {isUpdating ? "Update" : "Add"}
        </button>
        <input
          ref={inputRef}
          type="text"
          placeholder="Add Task..."
          className="bg-[#edf2f6] text-black w-full p-3 rounded-lg font-mono"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

InputBar.propTypes = {
  text: PropTypes.string,
  setText: PropTypes.func,
  setToDo: PropTypes.func,
  toDoId: PropTypes.string,
  focusInput: PropTypes.func,
  inputRef: PropTypes.object,
};
