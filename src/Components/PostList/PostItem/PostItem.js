import React, { Component } from "react";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  Flex,
  Box,
  Button,
  Heading,
  Text,
  IconButton,
  Stack,
  Link,
} from "@chakra-ui/core";
import AddComment from "../../Comment/AddComment";
import Axios from "axios";
import { PRIMARY_COLOR } from "../../ThemeSelector/ThemeSelector";

class PostItem extends Component {
  state = {
    comments: {
      comments: 0,
    },
    likes: 0,

    displayThread: false,
  };

  componentDidMount() {
    this.updateComments();
    this.updateLikes();
  }

  updateLikes = () => {
    this.setState({
      likes: this.props.postItem.likes,
    });
  };

  updateComments = () => {
    Axios.get(`api/posts/comments/${this.props.postItem.id}`)
      .then((result) => {
        console.table(result.data);
        this.setState({
          comments: { comments: result.data },
        });
      })
      .catch((error) => console.log("error getting comments", error));
  };

  switchDisplay = () => {
    if (this.state.displayThread === true) {
      this.setState({ displayThread: false });
    } else {
      this.setState({ displayThread: true });
    }
  };

  addPostLike = (event) => {
    const payObj = { id: event.target.id };
    console.log(payObj);
    console.log(this.props.postItem.id);
    this.setState({
      likes: this.props.postItem.likes + 1,
    });
    this.props.dispatch({
      type: "ADD_POST_LIKE",
      payload: payObj,
    });
  };

  // Axios.delete(`/api/posts/${event.target.id}`)

  deletePost = (event) => {
    console.log("In delete");
    this.props.dispatch({ type: "DELETE_POST", payload: event.target.id });
    try {
      this.props.dispatch({ type: "FETCH_POSTS" });
    } catch (error) {
      console.log(error);
    }
    this.props.history.push("/");
  };

  addPostComment = (event) => {};

  editPost = (event) => {};

  render() {
    const commentOrcomments = () => {
      if (this.state.comments.comments.length === 1) {
        return "Comment";
      } else {
        return "Comments";
      }
    };

    const likeOrLikes = () => {
      if (this.state.likes === 1) {
        return "Like";
      } else {
        return "Likes";
      }
    };

    const viewOrClose = () => {
      if (this.state.displayThread) {
        return "Close Thread";
      } else {
        return "View Thread";
      }
    };

    if (this.props.user.id === this.props.postItem.user_id) {
      return (
        <Flex width="full" justifyContent="center">
          <Box
            m={4}
            textAlign="center"
            borderWidth={1}
            borderRadius="lg"
            px={4}
            width="full"
            maxWidth="100%"
            boxShadow="lg"
            p={4}
            py={8}
            className="dark"
          >
            {/* <div className="postItem"> */}
            <Heading as="h3" size="lg" mb={2}>
              {this.props.postItem.post_title}
            </Heading>
            <Text>By</Text>
            <Heading mb={2} as="h5" size="sm">
              {this.props.postItem.first_name}
            </Heading>
            <Text mb={8}>{this.props.postItem.post_body}</Text>
            <Stack isInline width="full" justifyContent="center">
              <Text p={2}>
                {this.state.likes} {likeOrLikes()}
              </Text>
              <Text p={2}>
                {this.state.comments.comments.length} {commentOrcomments()}
              </Text>
            </Stack>
            <Button
              variantColor={PRIMARY_COLOR}
              m={1}
              id={this.props.postItem.id}
              onClick={this.addPostLike}
            >
              Like
            </Button>
            <Button
              variantColor={PRIMARY_COLOR}
              m={1}
              id={this.props.postItem.id}
              onClick={this.editPost}
            >
              Edit
            </Button>
            <Button
              variantColor={PRIMARY_COLOR}
              m={1}
              id={this.props.postItem.id}
              onClick={this.deletePost}
            >
              Delete
            </Button>
            <br />
            <br />
            <Link pt={4} onClick={this.switchDisplay}>
              {viewOrClose()}
            </Link>

            {this.state.displayThread ? (
              <>
                <Box>
                  {this.state.comments.comments.map((comment) => {
                    return (
                      <Flex justifyContent="center">
                        <Box
                          textAlign="left"
                          borderWidth={1}
                          borderRadius="lg"
                          px={2}
                          width="full"
                          maxWidth="90%"
                          boxShadow="lg"
                          p={1}
                          py={1}
                          mb={2}
                        >
                          <Text>
                            <Heading as="h5" size="sm">
                              {comment.first_name}:
                            </Heading>{" "}
                            {comment.body}
                          </Text>
                        </Box>
                      </Flex>
                    );
                  })}
                </Box>
                <AddComment
                  postItem={this.props.postItem}
                  userID={this.props.user.id}
                />
              </>
            ) : (
              <></>
            )}
          </Box>
        </Flex>
      );
    } else {
      return (
        <Flex width="full" justifyContent="center">
          <Box
            m={4}
            textAlign="center"
            borderWidth={1}
            borderRadius="lg"
            px={4}
            width="full"
            maxWidth="100%"
            boxShadow="lg"
            p={4}
            py={8}
          >
            {/* <div className="postItem"> */}
            <Heading as="h3" size="lg" mb={2}>
              {this.props.postItem.post_title}
            </Heading>
            <Text>By</Text>
            <Heading mb={2} as="h5" size="sm">
              {this.props.postItem.first_name}
            </Heading>
            <Text mb={8}>{this.props.postItem.post_body}</Text>
            <Stack isInline width="full" justifyContent="center">
              <Text p={2}>
                {this.props.postItem.likes} {likeOrLikes()}
              </Text>
              <Text p={2}>
                {this.state.comments.comments.length} {commentOrcomments()}
              </Text>
            </Stack>
            <Button
              variantColor={PRIMARY_COLOR}
              m={1}
              id={this.props.postItem.id}
              onClick={this.addPostLike}
            >
              Like
            </Button>
            <br />
            <br />
            <Link pt={4} onClick={this.switchDisplay}>
              {viewOrClose()}
            </Link>

            {this.state.displayThread ? (
              <>
                <Box>
                  {this.state.comments.comments.map((comment) => {
                    return (
                      <Flex justifyContent="center">
                        <Box
                          textAlign="left"
                          borderWidth={1}
                          borderRadius="lg"
                          px={2}
                          width="full"
                          maxWidth="90%"
                          boxShadow="lg"
                          p={1}
                          py={1}
                          mb={2}
                        >
                          <Text>
                            <Heading as="h5" size="sm">
                              {comment.first_name}:
                            </Heading>{" "}
                            {comment.body}
                          </Text>
                        </Box>
                      </Flex>
                    );
                  })}
                </Box>
                <AddComment
                  postItem={this.props.postItem}
                  userID={this.props.user.id}
                />
              </>
            ) : (
              <></>
            )}
          </Box>
        </Flex>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  members: state.members,
});

export default withRouter(connect(mapStateToProps)(PostItem));
