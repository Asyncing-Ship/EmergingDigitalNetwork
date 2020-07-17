import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PostItem from "../PostList/PostItem/PostItem";

class Profile extends Component {
  state = {};

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

  render() {
    const { user, profile, profileData } = this.props;
    return (
      <div className="content">
        <h1 className="profile">
          {user.first_name} {user.last_name}
        </h1>
        <p className="profile">{profileData.bio}</p>
        {profile.profilePosts.map((postItem) => {
          return <PostItem key={postItem.id} postItem={postItem} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  profile: state.profile,
  profileData: state.profile.profile[0],
});

export default withRouter(connect(mapStateToProps)(Profile));
