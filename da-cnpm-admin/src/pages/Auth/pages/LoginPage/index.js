import { Box, makeStyles, Typography } from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import AuthForm from "pages/Auth/components/AuthForm";
import { login } from "pages/Auth/authSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 50,
  },

  form: {
    maxWidth: "25rem",
    padding: theme.spacing(7, 7, 4),
    border: "1px solid #BDBDBD",
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white"
  },

  title: {
    marginTop: "1.5rem",
    marginBottom: "1rem",
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const history = useHistory();

  const handleFormSubmit = async (data) => {
    try {
      const action = login(data);

      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      enqueueSnackbar("Logged in successfully 🎉🎉", { variant: "success" });
      history.push("/home");
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Login failed", { variant: "error" });
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.form}>
        <Typography component="h1" variant="h4">
          E-Decor
        </Typography>
        <Typography variant="h6" component="h1" className={classes.title}>
          Login
        </Typography>

        <AuthForm isLogin onSubmit={handleFormSubmit} />
      </Box>
    </Box>
  );
};

export default LoginPage;
