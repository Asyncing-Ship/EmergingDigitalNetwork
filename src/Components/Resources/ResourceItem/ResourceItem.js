import React, { Component } from "react";
import { withRouter } from "react-router";

import { connect } from "react-redux";
import { Flex, Box, Button, Text, Heading, Link } from "@chakra-ui/core";
import AddComment from "../../Comment/AddComment";
import Axios from "axios";
import { PRIMARY_COLOR } from "../../ThemeSelector/ThemeSelector";

class ResourceItem extends Component {
  state = {
    comments: {
      comments: 0,
    },
    upvotes: 0,

    displayThread: false,
  };

  componentDidMount() {
    this.updateComments();
    this.updateupvotes();
  }

  updateupvotes = () => {
    this.setState({
      upvotes: this.props.resourceItem.upvote_count,
    });
  };

  updateComments = () => {
    Axios.get(`api/resources/comments/${this.props.resourceItem.id}`)
      .then((result) => {
        console.table(result.data);
        this.setState({
          comments: { comments: result.data },
        });
      })
      .catch((error) => console.log("error getting comments", error));
  };

  // addResourceComment = () => {
  //   //
  // };

  addResourceLike = (event) => {
    const payObj = { id: event.target.id };
    console.log(payObj);
    console.log(this.props.resourceItem.id);
    this.setState({
      upvotes: this.props.resourceItem.upvote_count + 1,
    });
    this.props.dispatch({
      type: "ADD_RESOURCE_LIKE",
      payload: payObj,
    });
  };

  // Axios.delete(`/api/posts/${event.target.id}`)

  deleteResource = (event) => {
    console.log("In resource delete");
    this.props.dispatch({ type: "DELETE_RESOURCE", payload: event.target.id });
    try {
      this.props.dispatch({ type: "FETCH_RESOURCES" });
    } catch (error) {
      console.log(error);
    }
    this.props.history.push("/resources");
  };

  addResourceComment = (event) => {};

  editResource = (event) => {};

  switchDisplay = () => {
    if (this.state.displayThread === true) {
      this.setState({ displayThread: false });
    } else {
      this.setState({ displayThread: true });
    }
  };

  render() {
    const commentOrcomments = () => {
      if (this.state.comments.comments.length === 1) {
        return "Comment";
      } else {
        return "Comments";
      }
    };

    const likeOrupvotes = () => {
      if (this.state.upvotes === 1) {
        return "Upvote";
      } else {
        return "Upvotes";
      }
    };

    const viewOrClose = () => {
      if (this.state.displayThread) {
        return "Close Thread";
      } else {
        return "View Thread";
      }
    };

    if (this.props.user.id === this.props.resourceItem.user_id) {
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
            textAlign="center"
            boxShadow="lg"
            p={4}
            py={8}
          >
            <Heading as="h3" size="lg">
              {this.props.resourceItem.title}
            </Heading>
            <Text>{this.props.resourceItem.body}</Text>
            <Text>
              {this.state.upvotes} {likeOrupvotes()}
            </Text>
            <Text>
              {this.state.comments.comments.length} {commentOrcomments()}
            </Text>
            <Button
              variantColor={PRIMARY_COLOR}
              m={1}
              id={this.props.resourceItem.id}
              onClick={this.addResourceLike}
            >
              Like
            </Button>
            <Button
              variantColor={PRIMARY_COLOR}
              m={1}
              id={this.props.resourceItem.id}
              onClick={this.editResource}
            >
              Edit
            </Button>
            <Button
              variantColor={PRIMARY_COLOR}
              m={1}
              id={this.props.resourceItem.id}
              onClick={this.deleteResource}
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
                          width="half"
                          maxWidth="60%"
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
                  postItem={this.props.resourceItem}
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
            textAlign="center"
            boxShadow="lg"
            p={4}
            py={8}
          >
            <Heading as="h3" size="lg">
              {this.props.resourceItem.title}
            </Heading>
            <Text>{this.props.resourceItem.body}</Text>
            <Text>
              {this.state.upvotes} {likeOrupvotes()}
            </Text>
            <Text>
              {this.state.comments.comments.length} {commentOrcomments()}
            </Text>
            <Button
              variantColor={PRIMARY_COLOR}
              m={1}
              id={this.props.resourceItem.id}
              onClick={this.addResourceLike}
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
                          width="half"
                          maxWidth="60%"
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
                  postItem={this.props.resourceItem}
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
});

export default withRouter(connect(mapStateToProps)(ResourceItem));
