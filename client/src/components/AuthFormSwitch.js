import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 'min-content',
    display: 'flex',
    paddingTop: 30,
    justifyContent: 'flex-end',
    
  },
  container: {
    width: 'auto',
    height: 'min-content',
    display: 'flex',
    alignItems: 'center',
    marginRight: 42
  },
  headerText: {
    fontSize: '14px',
    weight: '400',
    color: theme.palette.secondary.main
  },
  headerButton: {
    marginLeft: 30,
    padding: '16px 52px',
    borderRadius: '5px',
    backgroundColor: '#FFF',
    color: theme.palette.primary.main,
    fontSize: '14px',
    fontWeight: '600',
    boxShadow: '0px 3px 1px -2px rgb(74 106 149 / 20%), 0px 2px 2px 0px rgb(74 106 149 / 20%), 0px 1px 5px 0px rgb(74 106 149 / 20%)',
    '&:hover': {
      backgroundColor: 'rgba(230, 230, 230, 0.1)'
    }
  }
}));
const AuthFormSwitch = (props) => {
  const classes = useStyles();
  const location = useLocation()
  const history = useHistory()
  const isLoginPage = location.pathname === '/login'
  const handleAuthFormSwitch = () => {
    if(isLoginPage){
      history.push('/register')
    }
    else{
      history.push('/login')
    }
  }
  return (
    <div className={classes.root}>
        <div className={classes.container}>
            <Typography className={classes.headerText}>
              {isLoginPage?"Don't have an account?":'Already have an account?'}
            </Typography>
            <Button onClick={handleAuthFormSwitch} className={classes.headerButton} size="small" variant="contained">
              {isLoginPage?'Create account':'Login'}
            </Button>
        </div>
    </div>
  )
};
export default AuthFormSwitch;
