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
  Box,
  ButtonGroup,
  Select,
  Text,
  NumberInput,
} from "@chakra-ui/core";
import { VARIANT_COLOR } from "../ThemeSelector/ThemeSelector";
import ProfileLink from "./ProfileLink/ProfileLink";
import PhoneInput from "react-phone-number-input/input";

class Profile extends Component {
  state = {
    editMode: false,
    first_name: "",
    last_name: "",
    bio: "",
    facebook: "",
    twitter: "",
    github: "",
    personal_site: "",
    linkedin: "",
    email: "",
    phone: "",
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
  handleChangeFor = (event, value) => {
    this.setState({
      [value]: event.target.value,
    });
  };
  editProfile = () => {
    this.setState({
      editMode: true,
      first_name: this.props.profileData.first_name,
      last_name: this.props.profileData.last_name,
      bio: this.props.profileData.bio,
      facebook: this.props.profileData.facebook,
      twitter: this.props.profileData.twitter,
      github: this.props.profileData.github,
      personal_site: this.props.profileData.personal_site,
      linkedin: this.props.profileData.linkedin,
      email: this.props.profileData.email,
      phone: this.props.profileData.phone,
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
          facebook: this.state.facebook,
          twitter: this.state.twitter,
          github: this.state.github,
          personal_site: this.state.personal_site,
          linkedin: this.state.linkedin,
          email: this.state.email,
          phone: this.state.phone,
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
        <Box display="flex">
          {!this.state.editMode ? (
            <Box mb={8} flex={3}>
              <Heading className="profile">
                {profileData.first_name} {profileData.last_name}
              </Heading>
              <p className="profile">
                {profileData ? profileData.bio : "ERROR: COULD NOT GET BIO"}{" "}
              </p>
            </Box>
          ) : (
            <Box mb={8} flex={4}>
              {" "}
              <Box display="flex">
                <Box flex={4}>
                  <Box mb={5}>
                    <Text>Personal Info</Text>
                  </Box>
                  <small>First Name</small>
                  <Input
                    className="profile"
                    value={this.state.first_name}
                    onChange={(event) =>
                      this.handleChangeFor(event, "first_name")
                    }
                  />
                  <small>Last Name</small>
                  <Input
                    className="profile"
                    value={this.state.last_name}
                    onChange={(event) =>
                      this.handleChangeFor(event, "last_name")
                    }
                  />
                  <small>Bio</small>
                  <Textarea
                    placeholder="Biography"
                    className="profile"
                    value={this.state.bio}
                    onChange={(event) => this.handleChangeFor(event, "bio")}
                  />
                </Box>
                <Box flex={1}></Box>
                <Box flex={4}>
                  <Box mb={5}>
                    <Text>Social Links</Text>
                  </Box>
                  <small>Facebook</small>
                  <Input
                    flex={5}
                    mb={5}
                    value={this.state.facebook}
                    onChange={(event) =>
                      this.handleChangeFor(event, "facebook")
                    }
                  ></Input>
                  <small>Twitter</small>
                  <Input
                    flex={5}
                    mb={5}
                    value={this.state.twitter}
                    onChange={(event) => this.handleChangeFor(event, "twitter")}
                  ></Input>
                  <small>Github</small>
                  <Input
                    flex={5}
                    mb={5}
                    value={this.state.github}
                    onChange={(event) => this.handleChangeFor(event, "github")}
                  ></Input>
                  <small>Personal Site</small>
                  <Input
                    flex={5}
                    mb={5}
                    value={this.state.personal_site}
                    onChange={(event) =>
                      this.handleChangeFor(event, "personal_site")
                    }
                  ></Input>
                  <small>LinkedIn</small>
                  <Input
                    flex={5}
                    mb={5}
                    value={this.state.linkedin}
                    onChange={(event) =>
                      this.handleChangeFor(event, "linkedin")
                    }
                  ></Input>
                  <small>Email</small>
                  <Input
                    type="email"
                    flex={5}
                    mb={5}
                    value={this.state.email}
                    onChange={(event) => this.handleChangeFor(event, "email")}
                  ></Input>
                  <small>Phone</small>
                  <Input
                    value={this.state.phone}
                    onChange={(event) => this.handleChangeFor(event, "phone")}
                  ></Input>
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
            </Box>
          )}
          {(profileData.facebook ||
            profileData.twitter ||
            profileData.github ||
            profileData.personal_site ||
            profileData.linkedin ||
            profileData.email ||
            profileData.phone) &&
            !this.state.editMode && (
              <Box flex={3}>
                <Box mb={5}>
                  <b>
                    <u>Social Links</u>
                  </b>
                </Box>
                {profileData.facebook && (
                  <Box>Facebook: {profileData.facebook}</Box>
                )}
                {profileData.twitter && (
                  <Box>Twitter: {profileData.twitter}</Box>
                )}
                {profileData.github && <Box>Github: {profileData.github}</Box>}
                {profileData.personal_site && (
                  <Box>Persopnal Site: {profileData.personal_site}</Box>
                )}
                {profileData.linkedin && (
                  <Box>LinkedIn: {profileData.linkedin}</Box>
                )}
                {profileData.email && <Box>Email: {profileData.email}</Box>}
                {profileData.phone && <Box>Phone #: {profileData.phone}</Box>}
              </Box>
            )}
        </Box>
        {!this.state.editMode && (
          <Button
            variantColor={VARIANT_COLOR}
            mb={4}
            onClick={this.editProfile}
          >
            Edit Profile
          </Button>
        )}
        <hr></hr>
        <Heading my={8}>
          <u>Posts</u>
        </Heading>
        {profileLinks.map((profileLink) => {
          return <ProfileLink key={profileLink.id} profileLink={profileLink} />;
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
