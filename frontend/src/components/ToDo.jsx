import PropTypes from "prop-types";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";

export const ToDo = ({ text, editToDo, deleteToDo }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="w-[70%] mx-auto bg-gray-50 my-4 flex items-center justify-between shadow-md">
      <div
        className="flex flex-grow items-center h-full p-4 gap-4"
        onClick={handleCheckboxChange}
      >
        <input type="checkbox" checked={isChecked} readOnly />
        <div className={`${isChecked ? "line-through" : ""} select-none`}>
          <p> {text} </p>
        </div>
      </div>
      <div className="flex gap-4 px-4 select-none text-lg">
        <button onClick={editToDo}>
          <BiEdit />
        </button>
        <button onClick={deleteToDo}>
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};

ToDo.propTypes = {
  text: PropTypes.string,
  editToDo: PropTypes.func,
  deleteToDo: PropTypes.func,
};
