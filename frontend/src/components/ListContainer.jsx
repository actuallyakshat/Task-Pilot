import { useState, useEffect, useRef } from "react";
import { InputBar } from "./InputBar";
import { ToDo } from "./ToDo";
import { deleteToDo, getAllToDo } from "../utils/HandleApi";
import { useSetAtom } from "jotai";
import { isUpdatingAtom } from "../utils/Store";

export const ListContainer = () => {
  const inputRef = useRef(null);
  const setIsUpdating = useSetAtom(isUpdatingAtom);
  const [text, setText] = useState("");
  const [toDo, setToDo] = useState([]);
  const [toDoId, setToDoId] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateTodo = (_id, text) => {
    setText(text);
    setToDoId(_id);
    setIsUpdating(true);
  };

  console.log("toDo in ListContainer:", typeof toDo, "value of todo =", toDo);

  return (
    <div className={"mx-auto px-4 my-12 md:min-h-[600px] w-[60%] h-full"}>
      <InputBar
        text={text}
        setText={setText}
        setToDo={setToDo}
        toDoId={toDoId}
        inputRef={inputRef}
      />
      {toDo.map((item) => {
        return (
          <ToDo
            key={item._id}
            value={text}
            text={item.text}
            updateTodo={() => updateTodo(item._id, item.text)}
            deleteTodo={() => deleteToDo(item._id, setToDo)}
            inputRef={inputRef}
          ></ToDo>
        );
      })}
    </div>
  );
};
