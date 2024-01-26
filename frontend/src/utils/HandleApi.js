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
const getAllToDo = async (setToDo, userid) => {
  if (!userid) {
    console.error("User ID is not provided");
    return;
  }
  await axios
    .get(`${baseUrl}`, { params: { userid: userid } })
    .then(({ data }) => {
      setToDo(data);
    })
    .catch((error) => {
      console.error("Error while getting todos:", error);
      throw error;
    });
};

const addToDo = async (text, userid, setText, setToDo) => {
  await axios
    .post(`${baseUrl}/create-todo`, { text: text, userid: userid })
    .then(() => {
      setText("");
      getAllToDo(setToDo, userid);
    })
    .catch((error) => {
      console.error("Error while adding todo:", error);
    });
};

const updateToDo = async (
  ToDoId,
  userid,
  text,
  setText,
  setToDo,
  setIsUpdating
) => {
  await axios
    .put(`${baseUrl}/update-todo`, { _id: ToDoId, text: text })
    .then(() => {
      setIsUpdating(false);
      getAllToDo(setToDo, userid);
      setText("");
    })
    .catch((error) => {
      console.error("Error while updating todo:", error);
    });
};

const deleteToDo = (userid, todoid, setToDo) => {
  console.log("User ki id hai :", userid);
  console.log("Todo ki id hai :", todoid);
  // axios
  //   .delete(`${baseUrl}/delete-todo`, { userid: userid, todoid: todoid })
  //   .then(() => {
  //     getAllToDo(setToDo);
  //   })
  //   .catch((error) => {
  //     console.error("Error while deleting todo:", error);
  //   });
  axios
    .delete(`${baseUrl}/delete-todo`, {
      data: { userid: userid, todoid: todoid },
    })
    .then(() => {
      getAllToDo(setToDo, userid);
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
