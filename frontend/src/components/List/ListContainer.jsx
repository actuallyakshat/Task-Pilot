import { useState, useEffect, useRef } from "react";
import { InputBar } from "./InputBar";
import { ToDo } from "./ToDo";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import {
  authorization,
  deleteToDo,
  getAllToDo,
  updateState,
} from "../../utils/HandleApi";

import {
  isDarkAtom,
  isLoggedInAtom,
  isUpdatingAtom,
  loadingAtom,
  userAtom,
} from "../../utils/Store";

export const ListContainer = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const setIsUpdating = useSetAtom(isUpdatingAtom);
  const [text, setText] = useState("");
  const [toDo, setToDo] = useState([]);
  const [toDoId, setToDoId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const setLoading = useSetAtom(loadingAtom);
  const [user, setUser] = useAtom(userAtom);
  const isDark = useAtomValue(isDarkAtom);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const auth = await authorization(token);
        // console.log(auth);
        if (auth.data.login) {
          setUser(auth.data.data);
          setIsLoggedIn(true);

          setLoading(false);

          // eslint-disable-next-line react-hooks/exhaustive-deps

          const id = auth.data.data.id;
          getAllToDo(setToDo, id);
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
    <div
      className={
        "mx-auto my-8 px-6 w-fit md:my-12 md:min-h-[600px] md:w-[60%] flex flex-col h-full"
      }
    >
      {isLoggedIn && (
        <>
          <p
            className={`${
              isDark ? "text-white" : ""
            } font-bold text-2xl tracking-wider w-full md:text-4xl font-Rubik md:tracking-widest text-center mb-7`}
          >
            Hey {user.name.split(" ")[0]}, let&apos;s get to work!
          </p>

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
              isCompleted={item.completed}
              text={item.text}
              updateTodo={() => updateTodo(item._id, item.text)}
              deleteTodo={() => deleteToDo(user.id, item._id, setToDo)}
              updateState={() => updateState(item._id)}
              inputRef={inputRef}
            />
          ))}
        </>
      )}
    </div>
  );
};
