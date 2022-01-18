import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { register } from "./store/utils/thunkCreators";
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
  createAccountText: {
    fontWeight: 600,
    fontSize: "26px",
    lineHeight: "40px",
    marginBottom: 12,
  },
  createAccountTextMobile: {
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
  registerButton: {
    fontSize: "16px",
    fontWeight: 700,
    backgroundColor: theme.palette.primary.main,
    color: "#FFF",
    padding: "16px 53px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main + "EE",
    },
  },
  registerButtonMobile: {
    padding: '10px 53px',
  },
  formWrapperMobile: {
    flexGrow: 1,
    padding: '0% 10%'
  }

}));

const Login = (props) => {
  const classes = useStyles();
  const { user, register, isMobile } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justify="center">
      <Box className={isMobile?classes.formWrapperMobile:''}>
        <Typography className={[classes.createAccountText, isMobile?classes.createAccountTextMobile:''].join(' ')}>
          Create an account.
        </Typography>
        <form onSubmit={handleRegister}>
          <Grid
            className={
              isMobile ? classes.formContainerMobile : classes.formContainer
            }
          >
            <Grid>
              <FormControl fullWidth>
                <TextField
                  className={[classes.textField, isMobile?classes.textFieldMobile:''].join(' ')}
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
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
            <Grid>
              <FormControl fullWidth>
                <TextField
                  className={[classes.textField, isMobile?classes.textFieldMobile:''].join(' ')}
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
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
            <Grid>
              <FormControl error={!!formErrorMessage.confirmPassword} fullWidth>
                <TextField
                  className={[classes.textField, isMobile?classes.textFieldMobile:''].join(' ')}
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.inputLabel,
                      focused: classes.inputLabelFocused,
                    },
                  }}
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl error={!!formErrorMessage.confirmPassword} fullWidth>
                <TextField
                  className={[classes.textField, isMobile?classes.textFieldMobile:''].join(' ')}
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  required
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.inputLabel,
                      focused: classes.inputLabelFocused,
                    },
                  }}
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid container justifyContent="center">
              <Button
                className={[classes.registerButton, isMobile?classes.registerButtonMobile:''].join(' ')}
                type="submit"
                variant="contained"
                size="large"
              >
                Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
