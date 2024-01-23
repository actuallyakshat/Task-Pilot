import PropTypes from "prop-types";
import { addToDo } from "../utils/HandleApi";
import { Day } from "./Day";
import { Time } from "./Time";

export const InputBar = ({ text, setText, setToDo }) => {
  const addToDoHandler = () => {
    addToDo(text, setText, setToDo);
    setText("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addToDoHandler();
    }
  };

  return (
    <div className="w-full h-full mb-8">
      <div className="flex w-[90%] mx-auto justify-between items-center">
        <Day />
        <Time />
      </div>
      <div className="mx-auto w-[70%] mt-4 flex gap-4">
        <button
          className="px-6 py-2 text-sm font-[500] rounded-2xl bg-blue-300"
          onClick={() => {
            addToDoHandler;
          }}
        >
          Add
        </button>
        <input
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
};
