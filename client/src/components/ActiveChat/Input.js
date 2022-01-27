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
import ContentCopyIcon from '@material-ui/icons/FileCopyOutlined';
import ImagePreview from "./ImagePreview";
import axios from "axios";
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
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
    "&:focus-within": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
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
    marginRight: 10,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& svg": {
      color: "#C8C9CD",
    },
    "& svg:hover": {
      willChange: "color",
      transition: "color 200ms linear",
      color: "rgba(0, 0, 0, 0.8)",
    },
  },
}));
const url = process.env.REACT_APP_UPLOAD_URL;
const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [files, setFiles] = useState([]);
  const { postMessage, otherUser, conversationId, user } = props;
  const fileRef = useRef();
  const handleFilePreview = () => {
    const files = fileRef.current.files;
    if (files.length > 0) {
      setFiles(files);
      setShowFilePreview(true);
    } else {
      setShowFilePreview(false);
    }
  };
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleFileUpload = async () => {
    const files = fileRef.current.files;

    const promises = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        const file = files[i];
        formData.append("file", file);
        formData.append("upload_preset", "pyqhus40");
        promises.push(
          axios.post(url, formData, {
            transformRequest: (data, headers) => {
              delete headers["x-access-token"];
              return data;
            },
          })
        );
      }
    }
    try {
      const responses = await Promise.all(promises);
      fileRef.current.value = "";
      const attachments = responses.map((res) => res.data.url);
      return attachments;
    } catch (err) {
      console.error(err);
    };
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
    setFiles([]);
    setShowFilePreview(false);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <Box className={classes.formWrapper}>
          {showFilePreview && <ImagePreview files={files} />}
          <Box className={classes.inputWrapper}>
            
            <FilledInput
              classes={{ root: classes.input }}
              disableUnderline
              placeholder="Type something..."
              value={text}
              name="text"
              onChange={handleChange}
            />
            <Tooltip title="Upload Image" arrow>
              <Button
                component="label"
                disableRipple
                className={classes.imageUpload}
              >
                <ContentCopyIcon />
                <input
                  ref={fileRef}
                  type="file"
                  hidden
                  multiple
                  onChange={handleFilePreview}
                />
              </Button>
            </Tooltip>
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
