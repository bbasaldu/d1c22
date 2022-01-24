import React, { useRef, useState } from "react";
import {
  FormControl,
  FilledInput,
  Box,
  Button,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ImagePreview from "./ImagePreview";
const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  formWrapper: {
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "#F4F6FA",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.13)",
    },
    "&:focus-within": {
      backgroundColor: "rgba(0, 0, 0, 0.13)",
    },
    willChange: "background-color",
    transition: "background-color 200ms linear",
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  input: {
    height: 70,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&:focus-within": {
      backgroundColor: "transparent",
    },
    flexGrow: 1,
  },
  imageUpload: {
    height: 70,
    backgroundColor: "transparent",
    margin: 0,
    padding: 0,
    minWidth: 0,
    marginLeft: 10,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& svg": {
      color: "rgba(0,0,0,1)",
    },
    "& svg:hover": {
      willChange: "color",
      transition: "color 200ms linear",
      color: "rgba(0, 0, 0, 0.5)",
    },
  },
}));
const url = process.env.REACT_APP_UPLOAD_URL
const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [showFilePreview, setShowFilePreview] = useState(false)
  const [files, setFiles] = useState([])
  const { postMessage, otherUser, conversationId, user } = props;
  const fileRef = useRef();
  const handleFilePreview = () => {
    const files = fileRef.current.files;
    if(files.length > 0){
      setFiles(files)
      setShowFilePreview(true)
    }
    else{
      setShowFilePreview(false)
    }
  }
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleFileUpload = async () => {
    const files = fileRef.current.files;
    const formData = new FormData();
    const attachments = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append("file", file);
        formData.append("upload_preset", "pyqhus40");
        const res = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        attachments.push(data.url);
      }
    }
    fileRef.current.value = ""
    return attachments;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const attachments = await handleFileUpload();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments,
    };
    await postMessage(reqBody);
    setText("");
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <Box className={classes.formWrapper}>
        {showFilePreview && <ImagePreview files={files}/>}
        <Box className={classes.inputWrapper}>
        
          <Tooltip title="Upload Image" arrow>
            <Button
              component="label"
              disableRipple
              className={classes.imageUpload}
            >
              <AddCircleIcon />
              <input
                ref={fileRef}
                type="file"
                hidden
                multiple
                onChange={handleFilePreview}
              />
            </Button>
          </Tooltip>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type something..."
            value={text}
            name="text"
            onChange={handleChange}
          />
        </Box>
        </Box>
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
