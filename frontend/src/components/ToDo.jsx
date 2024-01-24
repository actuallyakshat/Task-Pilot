import PropTypes from "prop-types";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";

export const ToDo = ({ text, updateTodo, deleteTodo, inputRef }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleUpdateToDo = () => {
    updateTodo();
    inputRef.current.focus();
  };

  const deleteToDoHandler = () => {
    deleteTodo();
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
  text: PropTypes.string,
  updateTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  focusInput: PropTypes.func,
  inputRef: PropTypes.object,
};
