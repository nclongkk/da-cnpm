import { yupResolver } from "@hookform/resolvers/yup";
import { Button, makeStyles } from "@material-ui/core";
import InputFieldWithIcon from "components/FormFields/InputFieldWithIcon";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter your email")
    .email("Please enter a valid email address"),

  password: yup.string().required("Please enter your password"),
});

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    textTransform: "none",
  },

  paragraph: {
    fontSize: "0.875rem",
    color: "#828282",
    textAlign: "center",
    margin: theme.spacing(3),
  },

  social: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& > *": {
      margin: theme.spacing(0, 1.5),
    },
  },
}));

const AuthForm = ({ isLogin, onSubmit }) => {
  const classes = useStyles();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputFieldWithIcon
          name="email"
          control={control}
          type="email"
          placeholder="Email"
        />

        <InputFieldWithIcon
          name="password"
          control={control}
          type="password"
          placeholder="Password"
        />

        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disableElevation
          disabled={isSubmitting}
        >
          {isLogin ? "Login" : "Register"}
        </Button>
      </form>

      {!isLogin && (
        <p className={classes.paragraph}>
          Already a member? <Link to="/auth/login">Login</Link>
        </p>
      )}

      {isLogin && (
        <p className={classes.paragraph}>
          Don’t have an account yet? <Link to="/auth/register">Register</Link>
        </p>
      )}
    </div>
  );
};

AuthForm.propTypes = {
  isLogin: PropTypes.bool,
  onSubmit: PropTypes.func,
};

AuthForm.defaultProps = {
  isLogin: false,
  onSubmit: null,
};

export default AuthForm;
