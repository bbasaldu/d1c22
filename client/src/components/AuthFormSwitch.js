import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    height: "min-content",
    display: "flex",
    paddingTop: 30,
    justifyContent: "flex-end",
  },
  container: {
    width: "auto",
    height: "min-content",
    display: "flex",
    alignItems: "center",
    marginRight: "42px",
  },
  containerMobile: {
    marginRight: "0px",
  },
  headerText: {
    fontSize: "14px",
    weight: "400",
    color: theme.palette.secondary.main,
  },
  headerButton: {
    marginLeft: 30,
    padding: "16px 52px",
    borderRadius: "5px",
    backgroundColor: "#FFF",
    color: theme.palette.primary.main,
    fontSize: "14px",
    fontWeight: "600",
    boxShadow:
      "0px 3px 1px -2px rgb(74 106 149 / 20%), 0px 2px 2px 0px rgb(74 106 149 / 20%), 0px 1px 5px 0px rgb(74 106 149 / 20%)",
    "&:hover": {
      backgroundColor: "rgba(230, 230, 230, 0.1)",
    },
  },
  headerButtonMobile: {
    width: 150,
    padding: "10px 52px",
  }
}));
const AuthFormSwitch = (props) => {
  const { isMobile } = props;
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const isLoginPage = location.pathname === "/login";
  const handleAuthFormSwitch = () => {
    history.push(isLoginPage ? '/register' : '/login')
  };
  return (
    <Grid className={classes.root}>
      <Grid
        className={[
          classes.container,
          isMobile ? classes.containerMobile : "",
        ].join(" ")}
      >
        <Typography className={classes.headerText}>
          {isLoginPage ? "Don't have an account?" : "Already have an account?"}
        </Typography>
        <Button
          onClick={handleAuthFormSwitch}
          className={[classes.headerButton, isMobile?classes.headerButtonMobile:''].join(' ')}
          size="small"
          variant="contained"
        >
          {isLoginPage ? "Create account" : "Login"}
        </Button>
      </Grid>
    </Grid>
  );
};
export default AuthFormSwitch;
