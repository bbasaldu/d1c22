import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import pathToBgImage from "../assets/bg-img.png";
import pathToBubbleIcon from "../assets/bubble.svg";
import AuthFormSwitch from "../components/AuthFormSwitch";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  sideBanner: {
    position: "relative",
    backgroundImage: `url(${pathToBgImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#86B9FF',
    backgroundSize: "contain",
    minWidth: 425,
    minHeight: 700,
    height: "100vh",
    zIndex: 1,
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
  },
  bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "linear-gradient(180deg, #3A8DFF 0%, #86B9FF 100%)",
    mixBlendMode: "normal",
    opacity: 0.85,
    zIndex: -1,
  },
  bannerMiddle: {
    position: "relative",
    zIndex: 2,
    width: 269,
    height: 186,
    textAlign: "center",
    overflowWrap: "break-word",
    paddingTop: "50%",
  },
  bannerText: {
    fontSize: 26,
    fontWeight: 400,
    lineHeight: "40px",
    color: "#FFFFFF",
  },
  bannerChat: {
    marginBottom: 39.5,
  },
  account: {
    minWidth: 351,
    flexGrow: 3,
    display: "flex",
    flexDirection: "column",
  },
  accountForm: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',    
    paddingBottom: "86.5px",
  },
}));

const AuthLayout = (props) => {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <Grid className={classes.sideBanner}>
        <Box className={classes.bg}></Box>
        <Grid className={classes.bannerMiddle}>
          <img
            className={classes.bannerChat}
            src={pathToBubbleIcon}
            alt="message bubble"
          />
          <Typography className={classes.bannerText} component="p">
            Converse with anyone with any language
          </Typography>
        </Grid>
      </Grid>
      <Grid className={classes.account}>
        <AuthFormSwitch />
        <Grid className={classes.accountForm}>{props.children}</Grid>
      </Grid>
    </Grid>
  );
};
export default AuthLayout;
