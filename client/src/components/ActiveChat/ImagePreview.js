import { Box, makeStyles } from "@material-ui/core";
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  imagePreview: {
    height: 100,
    margin: "15px 10px 0px 10px",
    borderRadius: 10
  },
}));
const ImagePreview = (props) => {
  const { files } = props;
  const classes = useStyles();
  const images = [...files].map((file) => URL.createObjectURL(file));
  return (
    <Box className={classes.root}>
      {images.map((src,i) => {
        return <img key={`img_preview_${i}`} className={classes.imagePreview} src={src} alt="preview" />;
      })}
    </Box>
  );
};
export default ImagePreview;
