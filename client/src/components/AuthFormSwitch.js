import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 84,
    display: 'flex',
    paddingTop: 30
  },
  container: {
    width: 'auto',
    height: 42,
    display: 'flex'
  }
}));
const AuthFormSwitch = (props) => {
  const classes = useStyles();
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'?true:false
  return (
    <div className={classes.root}>
        <div className={classes.container}>
            <Typography>Already have an account?</Typography>
            <Button>Login</Button>
        </div>
    </div>
  )
};
export default AuthFormSwitch;
