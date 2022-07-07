import { Box, makeStyles, Typography } from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import AuthForm from "pages/Auth/components/AuthForm";
import NameForm from "pages/Auth/components/NameForm";
import { register, updateAccount } from "pages/Auth/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },

  form: {
    maxWidth: "25rem",
    padding: theme.spacing(6, 7, 4),
    border: "1px solid #BDBDBD",
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },

  title: {
    marginTop: "1.5rem",
    marginBottom: "1rem",
  },

  subtitle: {
    marginBottom: theme.spacing(3),
  },
}));

const SignupPage = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const history = useHistory();

  const [namingMode, setNamingMode] = useState(false);

  const handleFormSubmit = async (data) => {
    try {
      // auto set name = email
      data.name = data.email;

      const action = register(data);

      const resultAction = await dispatch(action);
      const originalResult = unwrapResult(resultAction);

      if (originalResult) {
        setNamingMode(true);
      }
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Registration failed", { variant: "error" });
    }
  };

  const handleNamingFormSubmit = async (data) => {
    // Update name for account

    const { id } = JSON.parse(localStorage.getItem("user"));

    try {
      const userData = {
        id,
        ...data,
      };

      const action = updateAccount(userData);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      enqueueSnackbar("Sign up successfully 🎉🎉", { variant: "success" });
      history.push("/auth/login");
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Registration failed", { variant: "error" });
    }
  };

  return (
    <Box className={classes.root}>
      {!namingMode && (
        <Box className={classes.form}>
          <Typography component="h1" variant="h4">
            E-Decor
          </Typography>
          <Typography variant="h6" component="h1" className={classes.title}>
            Register
          </Typography>

          <AuthForm onSubmit={handleFormSubmit} />
        </Box>
      )}

      {namingMode && (
        <Box width={400}>
          <NameForm onSubmit={handleNamingFormSubmit} />
        </Box>
      )}
    </Box>
  );
};

export default SignupPage;
