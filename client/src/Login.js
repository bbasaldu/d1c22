import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formContainer: {
    width: 380,
  },
  formContainerMobile: {
    width: '100%',
  },
  loginAccountText: {
    fontWeight: 600,
    fontSize: "26px",
    lineHeight: "40px",
    marginBottom: 12,
  },
  loginAccountTextMobile: {
    fontSize: '20px'
  },
  textField: {
    marginBottom: 40,
    fontSize: "14px",
    fontWeight: 600,
  },
  textFieldMobile: {
    marginBottom: 15
  },
  inputLabel: {
    fontSize: "14px",
    fontWeight: 400,
  },
  inputLabelFocused: {
    color: `${theme.palette.secondary.main} !important`,
  },
  loginButton: {
    fontSize: "16px",
    fontWeight: 700,
    backgroundColor: theme.palette.primary.main,
    color: "#FFF",
    padding: "16px 53px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main + "EE",
    },
  },
  loginButtonMobile: {
    padding: '10px 53px',
  },
  formWrapperMobile: {
    flexGrow: 1,
    padding: '0% 10%'
  }
  
}));
const Login = (props) => {
  const { user, login, isMobile } = props;
  const classes = useStyles();
  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justify="center">
      <Box className={isMobile?classes.formWrapperMobile:''}>
        <Typography className={[classes.loginAccountText, isMobile?classes.loginAccountTextMobile:''].join(' ')}>
          Welcome back!
        </Typography>

        <form onSubmit={handleLogin}>
          <Grid
            className={
              isMobile ? classes.formContainerMobile : classes.formContainer
            }
          >
            <Grid>
              <FormControl fullWidth required>
                <TextField
                  className={[classes.textField, isMobile?classes.textFieldMobile:''].join(' ')}
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.inputLabel,
                      focused: classes.inputLabelFocused,
                    },
                  }}
                />
              </FormControl>
            </Grid>
            <FormControl fullWidth required>
              <TextField
                  className={[classes.textField, isMobile?classes.textFieldMobile:''].join(' ')}
                  label="Password"
                aria-label="password"
                type="password"
                name="password"
                InputLabelProps={{
                  shrink: true,
                  classes: {
                    root: classes.inputLabel,
                    focused: classes.inputLabelFocused,
                  },
                }}
              />
            </FormControl>
            <Grid container justifyContent="center">
              <Button
                className={[classes.loginButton, isMobile?classes.loginButtonMobile:''].join(' ')}
                type="submit"
                variant="contained"
                size="large"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
