import React, { Component } from "react";
import { Box, Textarea, FormControl, Button } from "@chakra-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class AddComment extends Component {
  state = {
    comment: { body: "", id: null },
  };

  handleChangeFor = (event) => {
    // Updates our local state when input is changed
    this.setState({
      comment: {
        id: this.props.postItem.id,
        user: this.props.userID,
        body: event.target.value,
      },
      type: this.props.postItem.post_body || this.props.postItem.body,
    });
  };

  handleComment = async (event) => {
    event.preventDefault();
    this.props.addComment(this.state.comment);
    this.setState({ comment: { body: "", id: null } });
  };
  render() {
    return (
      <div>
        <Box>
          <form onSubmit={this.handleComment.bind(this)}>
            <FormControl>
              <Textarea
                mb={4}
                mt={2}
                placeholder="Add a comment"
                isRequired
                value={this.state.comment.body}
                onChange={(event) => this.handleChangeFor(event)}
              />
            </FormControl>
            <Button type="submit">Add Comment</Button>
          </form>
        </Box>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  members: state.members,
});

export default withRouter(connect(mapStateToProps)(AddComment));
