import axios from "axios";
const baseUrl = "http://localhost:3000";

const getAllToDo = (setToDo) => {
  axios
    .get(`${baseUrl}`)
    .then(({ data }) => {
      console.log("Type of data = ", typeof data);
      setToDo(data);
    })
    .catch((error) => {
      console.log("Error while getting todos:", error);
    });
};

const addToDo = (text, setText, setToDo) => {
  axios
    .post(`${baseUrl}/create-todo`, { text })
    .then(({ data }) => {
      console.log(data);
      setText("");
      getAllToDo(setToDo);
    })
    .catch((error) => {
      console.log("Error while adding todo:", error);
    });
};

const updateToDo = (ToDoId, text, setToDo, setText, setIsUpdating) => {
  axios
    .put(`${baseUrl}/update-todo`, { _id: ToDoId, text: text })
    .then(() => {
      setIsUpdating(false);
      setText("");
      getAllToDo(setToDo);
      console.log("Todo Updated Successfully");
    })
    .catch((error) => {
      console.log("Error while updating todo:", error);
    });
};

const deleteToDo = (_id, setToDo) => {
  axios
    .delete(`${baseUrl}/delete-todo`, { params: { _id } })
    .then(() => {
      console.log("Deleted successfully");
      getAllToDo(setToDo);
    })
    .catch((error) => {
      console.log("Error while deleting todo:", error);
    });
};

//editToDo
export { getAllToDo, addToDo, updateToDo, deleteToDo };
