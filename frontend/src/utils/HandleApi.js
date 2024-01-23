import axios from "axios";

const baseUrl = "http://localhost:3000";

const getAllToDo = (setToDo) => {
  axios.get(baseUrl).then(({ data }) => {
    console.log(data);
    setToDo(data);
  });
};

const addToDo = (text, setText, setToDo) => {
  axios.post(`${baseUrl}/create-todo`, { text }).then(({ data }) => {
    console.log(data);
    setText("");
    getAllToDo(setToDo);
  });
};

//editToDo
export { getAllToDo, addToDo };
