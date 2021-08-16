import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../../actions/posts";
import { useDispatch, useSelector } from "react-redux";

const Form = ({ selectedId, setSelectedId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) => selectedId ? state.posts.find((p) => (p._id === selectedId)):null);

 useEffect(()=>{
   if(post) setPostData(post)
   
 }, [post])



  const clear = () => {
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setSelectedId(null)
  };

  const dispatch = useDispatch();

  const classes = useStyles();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (selectedId){
       dispatch(updatePost(selectedId, postData));
   
    }
    else dispatch(createPost(postData));

    clear();
  };

  return (
    <Paper className={`${classes.paper} ${classes.root}`}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={submitHandler}
      >
        <Typography variant="h6">{selectedId ? "Edit" : "Create a post"}</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="meassage"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Add tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          color="primary"
          size="large"
          variant="contained"
          fullWidth
          className={classes.buttonSubmit}
          type="submit"
        >
         {selectedId ? "Edit Post" : "Create post"}
        </Button>
        <Button
          color="secondary"
          size="small"
          variant="contained"
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
