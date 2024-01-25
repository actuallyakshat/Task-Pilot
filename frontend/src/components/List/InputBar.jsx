import PropTypes from "prop-types";
import { addToDo, updateToDo } from "../../utils/HandleApi";
import { Day } from "./Day";
import { Time } from "./Time";
import { useAtom, useAtomValue } from "jotai";
import { isDarkAtom, isUpdatingAtom } from "../../utils/Store";

export const InputBar = ({ text, setText, setToDo, toDoId, inputRef }) => {
  const [isUpdating, setIsUpdating] = useAtom(isUpdatingAtom);
  const isDark = useAtomValue(isDarkAtom);
  const addToDoHandler = () => {
    addToDo(text, setText, setToDo);
    setText("");
  };

  const updateToDoHandler = () => {
    updateToDo(toDoId, text, setText, setToDo, setIsUpdating);
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
    <div className="w-full h-full mb-8">
      <div
        className={`${
          isDark ? "text-white" : ""
        } flex w-[90%] mx-auto justify-between items-center`}
      >
        <Day />
        <Time />
      </div>
      <div className="mx-auto w-[70%] mt-4 flex gap-4">
        <button
          className="px-6 py-2 text-sm font-bold font-mono rounded-2xl bg-green-500 flex items-center justify-center"
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
          className="bg-[#edf2f6] w-full p-3 rounded-lg font-mono"
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
