import { Box, makeStyles } from "@material-ui/core";
const useStyles = makeStyles(() => ({
  image: {
    height: 200,
  },
  multiImage: {
    height: 100
  },
  senderBubble: {
    borderRadius: "10px 10px 0 10px",
    marginLeft: 5
  },
  otherBubble: {
    borderRadius: "0 10px 10px 10px",
    marginRight: 5
  },
  
}));
const ImageBubble = (props) => {
  const { images, variant, id} = props;
  const classes = useStyles();
  return (
    <Box>
      {images.map((src,i) => {
        return (
          <img
            key={`${id}_img_${i}`}
            src={src}
            className={[
              classes.image,
              variant === "sender" ? classes.senderBubble : classes.otherBubble,
              images.length > 1 ? classes.multiImage : "",
            ].join(" ")}
            alt="message"
          />
        );
      })}
    </Box>
  );
};
export default ImageBubble;
