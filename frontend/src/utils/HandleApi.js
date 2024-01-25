import axios from "axios";
const baseUrl = "http://localhost:3000";

//Authentication

const authorization = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/signup`, {
      name,
      email,
      password,
    });
    console.log(response.data.name);
    return response.data;
  } catch (error) {
    console.error("Error occurred while creating account");
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, { email, password });
    const data = response.data;

    if (!data.success) {
      console.log(data.message);
    } else {
      return data;
    }
  } catch (error) {
    return {
      success: false,
    };
  }
};

//CRUD
const getAllToDo = async (setToDo) => {
  await axios
    .get(`${baseUrl}`)
    .then(({ data }) => {
      setToDo(data);
    })
    .catch((error) => {
      console.error("Error while getting todos:", error);
    });
};

const addToDo = async (text, setText, setToDo) => {
  await axios
    .post(`${baseUrl}/create-todo`, { text })
    .then(() => {
      setText("");
      getAllToDo(setToDo);
    })
    .catch((error) => {
      console.error("Error while adding todo:", error);
    });
};

const updateToDo = async (ToDoId, text, setText, setToDo, setIsUpdating) => {
  await axios
    .put(`${baseUrl}/update-todo`, { _id: ToDoId, text: text })
    .then(() => {
      setIsUpdating(false);
      getAllToDo(setToDo);
      setText("");
    })
    .catch((error) => {
      console.error("Error while updating todo:", error);
    });
};

const deleteToDo = (_id, setToDo) => {
  axios
    .delete(`${baseUrl}/delete-todo`, { params: { _id } })
    .then(() => {
      getAllToDo(setToDo);
    })
    .catch((error) => {
      console.error("Error while deleting todo:", error);
    });
};

//editToDo
export {
  getAllToDo,
  addToDo,
  updateToDo,
  deleteToDo,
  signup,
  login,
  authorization,
};
