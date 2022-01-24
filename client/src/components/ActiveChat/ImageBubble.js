import { Box, makeStyles } from "@material-ui/core";
const useStyles = makeStyles(() => ({
  image: {
      width: 200
  },
  senderBubble: {
    borderRadius: "10px 10px 0 10px",
  },
  otherBubble: {
    borderRadius: "0 10px 10px 10px",
  },
  withText: {
    borderRadius: "10px 10px 0px 0px",
  },
}));
const ImageBubble = (props) => {
  const { src, variant, withText } = props;
  const classes = useStyles();
  console.log(src)
  return (
    <img
      src={src}
      className={[
        classes.image,
        variant === "sender" ? classes.senderBubble : classes.otherBubble,
        withText ? classes.withText : "",
      ].join(" ")}
      alt="message"
    />
  );
};
export default ImageBubble;
