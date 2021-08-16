import React, {useEffect, useState} from "react";
import { Container, AppBar, Grid, Grow, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts"


import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import makeStyles from "./styles";

const App = () => {
  const classes = makeStyles();
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null)
  

  useEffect(()=>{
    dispatch(getPosts())
    console.log("getting posts")
  },[dispatch, selectedId])


  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          CHAPTERS
        </Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setSelectedId={setSelectedId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form selectedId={selectedId} setSelectedId={setSelectedId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
