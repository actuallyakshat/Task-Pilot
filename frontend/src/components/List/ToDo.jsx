import PropTypes from "prop-types";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import toast from "react-hot-toast";
import useSound from "use-sound";
import checkSound from "../../assets/sounds/check.mp3";
import uncheckSound from "../../assets/sounds/uncheck.mp3";
import deleteSound from "../../assets/sounds/deleteSound.mp3";

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
    <div className="w-[70%] mx-auto bg-gray-50 my-4 flex items-center justify-between rounded-md shadow-md hover:bg-gray-200 transition-colors">
      <div
        className="flex flex-grow items-center h-full p-4 gap-4 cursor-pointer"
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
