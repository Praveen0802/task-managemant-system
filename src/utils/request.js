import axios from "axios";

export const fetchTaskDetails = async () => {
  try {
    const response = await axios({
      url: "/api/tasks",
      method: "GET",
    });
    return response?.data?.data;
  } catch (error) {
    console.log("ERROR in fetching task", error);
    throw error;
  }
};

export const createTask = async (payload) => {
  try {
    const response = await axios({
      url: "/api/tasks",
      method: "POST",
      data: payload,
    });
    return response?.data?.data;
  } catch (error) {
    console.log("ERROR in creating task", error);
    throw error;
  }
};

export const updateTask = async (payload) => {
  try {
    const response = await axios({
      url: "/api/tasks",
      method: "PUT",
      data: payload,
    });
    return response?.data?.data;
  } catch (error) {
    console.log("ERROR in updating task", error);
    throw error;
  }
};
