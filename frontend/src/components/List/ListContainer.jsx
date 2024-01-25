import { useState, useEffect, useRef } from "react";
import { InputBar } from "./InputBar";
import { ToDo } from "./ToDo";
import { authorization, deleteToDo, getAllToDo } from "../../utils/HandleApi";
import { useAtom, useSetAtom } from "jotai";
import { isLoggedInAtom, isUpdatingAtom, loadingAtom } from "../../utils/Store";
import { useNavigate } from "react-router-dom";

export const ListContainer = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const setIsUpdating = useSetAtom(isUpdatingAtom);
  const [text, setText] = useState("");
  const [toDo, setToDo] = useState([]);
  const [toDoId, setToDoId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const setLoading = useSetAtom(loadingAtom);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const auth = await authorization(token);
        if (auth.data.login) {
          setIsLoggedIn(true);
          setLoading(false);
          getAllToDo(setToDo);
        } else {
          console.log("Inside list else");
          setLoading(false);
          navigate("/login");
        }
      } else {
        console.log("Token is missing");
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  const updateTodo = (_id, text) => {
    setText(text);
    setToDoId(_id);
    setIsUpdating(true);
  };

  return (
    <div className={"mx-auto px-4 my-12 md:min-h-[600px] w-[60%] h-full"}>
      {isLoggedIn && (
        <>
          <InputBar
            text={text}
            setText={setText}
            setToDo={setToDo}
            toDoId={toDoId}
            inputRef={inputRef}
          />
          {toDo.map((item) => (
            <ToDo
              key={item._id}
              value={text}
              text={item.text}
              updateTodo={() => updateTodo(item._id, item.text)}
              deleteTodo={() => deleteToDo(item._id, setToDo)}
              inputRef={inputRef}
            />
          ))}
        </>
      )}
    </div>
  );
};
