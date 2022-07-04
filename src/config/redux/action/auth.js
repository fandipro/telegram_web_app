import axios from "axios";

export const register = async (data, alert, navigate) => {
  try {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, data);
    console.log(result.data.data);
    alert.fire({
      title: "Success",
      text: `${result.data.message}`,
      icon: "Success",
    });
    navigate("/login");
  } catch (error) {
    if (error.response.status === 403) {
      alert.fire({
        title: "Error",
        text: `${error.response.data.message}`,
        icon: "errror",
      });
    } else {
      alert.fire({
        title: "Error",
        text: `Error Network`,
        icon: "errror",
      });
    }
  }
};
