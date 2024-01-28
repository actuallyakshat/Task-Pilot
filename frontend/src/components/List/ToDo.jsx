import PropTypes from "prop-types";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import toast from "react-hot-toast";
import useSound from "use-sound";
import checkSound from "../../assets/sounds/check.mp3";
import uncheckSound from "../../assets/sounds/uncheck.mp3";
import deleteSound from "../../assets/sounds/deleteSound.mp3";
import { isDarkAtom } from "../../utils/Store";
import { useAtomValue } from "jotai";

export const ToDo = ({
  isCompleted,
  text,
  updateTodo,
  deleteTodo,
  updateState,
  inputRef,
}) => {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [checkTodoSound] = useSound(checkSound);
  const [uncheckTodoSound] = useSound(uncheckSound, { volume: 0.5 });
  const [deleteTodoSound] = useSound(deleteSound, { volume: 0.4 });
  const isDark = useAtomValue(isDarkAtom);

  const handleCheckboxChange = () => {
    updateState();
    if (!isChecked) {
      checkTodoSound();
    } else {
      uncheckTodoSound();
    }
    setIsChecked(!isChecked);
  };

  const handleUpdateToDo = () => {
    updateTodo();
    inputRef.current.focus();
  };

  const deleteToDoHandler = () => {
    deleteTodo();
    deleteTodoSound();
    toast.error("Deleted Task", {
      position: "bottom-center",
      duration: 1500,
      style: {
        marginBottom: "20px",
      },
    });
  };

  return (
    <div
      className={`${
        isDark ? "bg-[#121317] text-white hover:bg-white/20" : "bg-gray-100/70 hover:bg-gray-200"
      } w-full md:w-[70%] mx-auto my-2 flex items-center font-[600] font-mono text-lg justify-between rounded-md shadow-md  transition-colors`}
    >
      <div
        className="flex flex-grow items-center h-full p-4 gap-3 cursor-pointer"
        onClick={handleCheckboxChange}
      >
        <input
          type="checkbox"
          checked={isChecked}
          className="cursor-pointer"
          readOnly
        />
        <div className={`${isChecked ? "line-through" : ""} select-none`}>
          <p> {text} </p>
        </div>
      </div>
      <div className="flex gap-4 px-4 select-none text-lg">
        <button onClick={handleUpdateToDo}>
          <BiEdit />
        </button>
        <button onClick={deleteToDoHandler}>
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};

ToDo.propTypes = {
  isCompleted: PropTypes.bool,
  text: PropTypes.string,
  updateTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  updateState: PropTypes.func,
  inputRef: PropTypes.object,
};
