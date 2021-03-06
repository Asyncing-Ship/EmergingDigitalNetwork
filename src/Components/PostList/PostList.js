import React, { Component } from "react";
import PostItem from "./PostItem/PostItem";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import "./PostList.css";
import { Box, Button } from "@chakra-ui/core";
import { VARIANT_COLOR } from "../ThemeSelector/ThemeSelector";

class PostList extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_POSTS" });
  }

  toNewPost = () => {
    this.props.history.push("/add-post");
  };

  render() {
    return (
      <Box>
        <Button variantColor={VARIANT_COLOR} onClick={this.toNewPost}>
          Add Post
        </Button>
        {this.props.posts.posts.map((postItem, index) => {
          return (
            <PostItem key={postItem.id} postItem={postItem} postIndex={index} />
          );
        })}
      </Box>
    );
  }
}

// Makes our reducers available in our component
const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

export default withRouter(connect(mapStateToProps)(PostList));
