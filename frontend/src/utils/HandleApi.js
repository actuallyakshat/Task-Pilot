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

const login = async (email, password, setError = () => {}) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, { email, password });
    const data = response.data;
    if (!data.success) {
      setError(data.message);
      return null; // Return null to indicate unsuccessful login
    } else {
      return data; // Return the data for successful login
    }
  } catch (error) {
    console.log("Error occurred while logging in:", error);
    setError("Error occurred while logging in");
    return null; // Return null for any error during login
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

const deleteToDo = async (userid, todoid, setToDo) => {
  await axios
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

//updating status of todos
const updateState = async (todoid) => {
  await axios
    .put(`${baseUrl}/update-state`, { todoid: todoid })
    .catch((error) => {
      console.log("Error while updating the state of todo.");
      console.error(error);
    });
};

const sendOtp = async (email, name, otp) => {
  try {
    const response = await axios.post(`${baseUrl}/send-otp`, {
      email,
      name,
      otp,
    });
    return response;
  } catch (error) {
    console.log("Error occoured while sending OTP", error);
    return {
      success: error,
    };
  }
};

const deleteAccount = async (email) => {
  try {
    const response = await axios.delete(`${baseUrl}/delete-user`, {
      data: { email },
    });
    if (response.status === 200) {
      return true;
    } else {
      console.log("Account couldn't be deleted");
      return false;
    }
  } catch (error) {
    console.log("Internal Server Error While Deleting Account", error);
    return false;
  }
};

const editPassword = async (email, password) => {
  try {
    await axios.put(`${baseUrl}/change-password`, {
      email: email,
      password: password,
    });
    return true;
  } catch (error) {
    console.error("Error while changing password:", error);
    return false;
  }
};

const editUser = async (name, email) => {
  try {
    await axios.put(`${baseUrl}/update-user`, { name, email });
    return true;
  } catch (error) {
    console.error("Error while editing user details:", error);
    return false;
  }
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
  updateState,
  sendOtp,
  deleteAccount,
  editPassword,
  editUser,
};
