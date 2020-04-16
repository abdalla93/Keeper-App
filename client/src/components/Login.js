import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { GlobalContext } from "../context/GlobalState";
import Message from "./Message";
const Login = (props) => {
  const { loginUser } = useContext(GlobalContext);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  function change(event) {
    event.preventDefault();
    const newUser = {
      username: user.username,
      email: user.email,
      password: user.password,
    };
    loginUser(newUser).then((data) => {
      if (!data.message.msgError) {
        const { token } = data;
        if (token) props.history.push("/logedin");
      } else {
        setMessage(data.message);
        setUser({ username: "", email: "", password: "" });
      }
    });

    // setUser({ username: "", email: "", password: "" });
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  return (
    <div className="form-style-6">
      <form autoComplete="off" className="create-user">
        <input
          type="text"
          onChange={handleChange}
          name="username"
          value={user.username}
          placeholder="Username"
        />
        <input
          type="email"
          onChange={handleChange}
          name="email"
          value={user.email}
          placeholder="Email"
        ></input>
        <input
          type="password"
          onChange={handleChange}
          name="password"
          value={user.password}
          placeholder="Password"
        ></input>

        <Button
          className="upload-btn"
          variant="contained"
          color="default"
          onClick={change}
          startIcon={<CloudUploadIcon />}
        >
          Login
        </Button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};
export default Login;
