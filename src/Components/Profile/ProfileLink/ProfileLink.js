import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Icon, Link, Box } from "@chakra-ui/core";
import "../Profile.css";
class ProfileLink extends Component {
  render() {
    const { profileLink } = this.props;
    return (
      <Box className="center">
        {profileLink.platform_name !== "Email" &&
        profileLink.platform_name !== "Phone" ? (
          <Link
            target="_blank"
            href={`https://${profileLink.profile_url}`}
            isExternal
          >
            <Box className="profileLink">
              {profileLink.platform_name}
              <Icon name="external-link" mx={1} />
            </Box>
          </Link>
        ) : (
          <Box className="profileLink">
            {profileLink.platform_name}: {profileLink.profile_url}
          </Box>
        )}
      </Box>
    );
  }
}

export default ProfileLink;
