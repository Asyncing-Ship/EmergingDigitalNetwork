import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PostItem from "../PostList/PostItem/PostItem";
import {
  Link,
  Heading,
  Button,
  Icon,
  Input,
  Textarea,
  Flex,
  Box,
} from "@chakra-ui/core";
import { VARIANT_COLOR } from "../ThemeSelector/ThemeSelector";
import ProfileLink from "./ProfileLink/ProfileLink";

class Profile extends Component {
  state = {
    editMode: false,
    first_name: "",
    last_name: "",
    bio: "",
  };

  componentDidMount() {
    this.getProfile();
    this.getUserLinks();
    this.getUserPosts();
  }

  getProfile = () => {
    this.props.dispatch({
      type: "FETCH_PROFILE",
    });
  };

  getUserLinks = () => {
    this.props.dispatch({
      type: "FETCH_USER_LINKS",
    });
  };

  getUserPosts = () => {
    this.props.dispatch({
      type: "FETCH_USER_POSTS",
    });
  };
  editProfile = () => {
    this.setState({
      editMode: true,
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      bio: this.props.profileData.bio,
    });
  };
  saveEdits = () => {
    console.log(this.props.profile);
    this.props.dispatch({
      type: "EDIT_PROFILE",
      payload: {
        user: {
          id: this.props.profileData.user_id,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
        },
        profile: {
          id: this.props.profileData.user_id,
          bio: this.state.bio,
        },
      },
    });
    this.setState({
      editMode: false,
      first_name: "",
      last_name: "",
      bio: "",
    });
  };
  render() {
    const { user, profile, profileData, profileLinks } = this.props;
    if (!profileData) {
      this.props.dispatch({ type: "ADD_PROFILE" });
    }
    return (
      <div className="content">
        <div>
          {!this.state.editMode ? (
            <Box mb={8}>
              <Heading className="profile">
                {profileData.first_name} {profileData.last_name}
              </Heading>
              <Button
                variantColor={VARIANT_COLOR}
                mb={4}
                onClick={this.editProfile}
              >
                Edit Profile
              </Button>
              <p className="profile">
                {profileData ? profileData.bio : "ERROR: COULD NOT GET BIO"}{" "}
              </p>
            </Box>
          ) : (
            <Box mb={8}>
              {" "}
              <Box display="flex">
                <Box flex={3}>
                  <small>First Name</small>
                  <Input
                    className="profile"
                    value={this.state.first_name}
                    onChange={(event) =>
                      this.setState({ first_name: event.target.value })
                    }
                  />
                  <small>Last Name</small>
                  <Input
                    className="profile"
                    value={this.state.last_name}
                    onChange={(event) =>
                      this.setState({ last_name: event.target.value })
                    }
                  />
                  <small>Bio</small>
                  <Textarea
                    placeholder="Biography"
                    className="profile"
                    value={this.state.bio}
                    onChange={(event) =>
                      this.setState({ bio: event.target.value })
                    }
                  />
                </Box>
                <Box flex={2}>
                  <small>Social Links</small>
                  <Input></Input>
                </Box>
              </Box>
              <Button
                variantColor={VARIANT_COLOR}
                mb={4}
                onClick={() => this.saveEdits()}
              >
                Save
              </Button>
              <Button
                variantColor={VARIANT_COLOR}
                mb={4}
                onClick={() =>
                  this.setState({
                    editMode: false,
                    first_name: "",
                    last_name: "",
                    bio: "",
                  })
                }
              >
                Cancel
              </Button>
              <p className="profile">
                {profileData ? profileData.bio : "ERROR: COULD NOT GET BIO"}{" "}
              </p>
            </Box>
          )}
          <hr></hr>
          <Heading my={8}>
            <u>Posts</u>
          </Heading>
          {profileLinks.map((profileLink) => {
            return (
              <ProfileLink key={profileLink.id} profileLink={profileLink} />
            );
          })}
          {profile.profilePosts[0] ? (
            profile.profilePosts.map((postItem) => {
              console.log(postItem);
              return <PostItem key={postItem.id} postItem={postItem} />;
            })
          ) : (
            <div>This User Has No Posts Yet</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  profile: state.profile,
  profileData: state.profile.profile[0],
  profileLinks: state.profile.profileLinks,
});

export default withRouter(connect(mapStateToProps)(Profile));
