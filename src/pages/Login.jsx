import React, { useState } from "react";
import {
  Alert,
  Button,
  IconButton,
  OutlinedInput,
  Snackbar,
} from "@mui/material";
import styles from "../styles/Login.module.css";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initState = {
  email: "",
  password: "",
};

const Login = ({change}) => {
  const [loginCred, setLoginCred] = useState(initState);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [snackbar, setSnackBar]=useState(false)
  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginCred({ ...loginCred, [name]: value });
  };

  const handleLogin = async () => {
    let c = 0;
    for (let i = 0; i < loginCred.email.length; i++) {
      if (loginCred.email[i] === "@") {
        c++;
      }
    }
    // console.log(loginCred);
    if (loginCred.email === "" && loginCred.password === "") {
      setMessage("Email & password can't be empty");
      setSuccess(false);
      setError(true);
    } else if (loginCred.email !== "" && loginCred.password === "") {
      setMessage("Password can't be empty");
      setSuccess(false);
      setError(true);
    } else if (loginCred.email === "" && loginCred.password !== "") {
      setMessage("Email can't be empty");
      setSuccess(false);
      setError(true);
    } else if (loginCred.email !== "" && loginCred.password !== "" && c !== 1) {
      setMessage("Email should contain @ symbol");
      setSuccess(false);
      setError(true);
    } else if (
      loginCred.email !== "" &&
      c === 1 &&
      (loginCred.password.length > 16 || loginCred.password.length < 8)
    ) {
      setMessage("Password Length should be min 8 and max 16 characters");
      setSuccess(false);
      setError(true);
    } else if (
      loginCred.email !== "" &&
      c === 1 &&
      loginCred.password.length <= 16 &&
      loginCred.password.length >= 8
    ) {
      let allowedPasswordChar = /^[A-Za-z0-9]*$/;
      let res = allowedPasswordChar.test(loginCred.password);
      if (res) {
        setMessage("Email and Password validated");
        setError(false);
        setSuccess(true);
        // console.log(loginCred);
        let res = await axios.post("https://showappbackend.onrender.com/login", loginCred);
        if(res.data==="error"){
            setSnackBar(true);
            setSuccess(false);
            setError(true);
            setMessage("Login Failed")
        }
        else{
            navigate("/search")
            change(res.data)
            // console.log(res.data);
        }
      } else {
        setMessage(
          "Password should be alphanumeric i.e only contains alphabets and numbers"
        );
        setSuccess(false);
        setError(true);
      }
    } 
  };

    const handleClose = () =>{
        setSnackBar(false)
    }

    const action = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
  return (
    <div className={styles.container}>
      {error ? <Alert severity="error">{message}</Alert> : null}
      {success ? <Alert severity="success">{message}</Alert> : null}
      <OutlinedInput
        fullWidth
        type="text"
        name="email"
        onChange={handleChange}
        placeholder="Enter email"
      />
      <OutlinedInput
        fullWidth
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Enter password"
      />
      <Button onClick={handleLogin}>Login</Button>
      <Snackbar
        open={snackbar}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Login Failed"
        action={action}
      />
    </div>
  );
};

export default Login;
