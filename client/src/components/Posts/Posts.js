import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import { Grid, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";

const Posts = ({ setSelectedId }) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post setSelectedId={setSelectedId} post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
