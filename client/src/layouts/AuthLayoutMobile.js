import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import pathToBgImage from "../assets/bg-img.png";
import pathToBubbleIcon from "../assets/bubble.svg";
import AuthFormSwitch from "../components/AuthFormSwitch";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: '100%',
    backgroundImage: `url(${pathToBgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "top center",
    backgroundRepeat: 'no-repeat',
    minHeight: "100vh",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    marginTop: "10px",
  },
  bannerText: {
    fontSize: 26,
    fontWeight: 400,
    lineHeight: "40px",
    color: "#FFFFFF",
  },
  bannerChat: {
    marginBottom: 20,
  },
  accountForm: {
    backgroundColor: "#FFF",
    padding: "5% 8px",
    borderRadius: "25px",
    marginBottom: "5%",
  },
}));
const AuthLayoutMobile = (props) => {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
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
      <Grid className={classes.accountForm}>
        {props.children}
        <AuthFormSwitch isMobile={true} />
      </Grid>
    </Grid>
  );
};
export default AuthLayoutMobile;
