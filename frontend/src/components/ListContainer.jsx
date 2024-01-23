import { useState } from "react";
import { useEffect } from "react";
import { InputBar } from "./InputBar";
import { ToDo } from "./ToDo";
import { getAllToDo } from "../utils/HandleApi";

export const ListContainer = () => {
  const [text, setText] = useState("");
  const [toDo, setToDo] = useState([]);

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  return (
    <div className="mx-auto px-4 my-12 md:min-h-[600px] w-[60%] h-full">
      <InputBar text={text} setText={setText} setToDo={setToDo} />
      {toDo.map((item) => {
        return <ToDo key={item._id} value={text} text={item.text}></ToDo>;
      })}
    </div>
  );
};
