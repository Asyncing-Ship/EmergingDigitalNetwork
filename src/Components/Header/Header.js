import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Header.css";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import { Box } from "@chakra-ui/core";
import RightSibebar from "../Sidebars/RightSibebar";
import Logo from "./EDN.png";
const Nav = (props) => (
  <Box boxShadow="lg">
    <div className="nav">
      <div className="header">
        <Link to="/home">
          <h1 className="nav-title">
            <img src={Logo} width={"80rem"} />
          </h1>
        </Link>
        <div className="nav-right">
          <ThemeSelector />
        </div>
      </div>
      <div className="navbar">
        <div className="nav-left">
          <Link className="nav-link" to="/home">
            {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
            {props.user.id ? "Home" : "Login / Register"}
          </Link>
        </div>
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.user.id && (
          <>
            <div className="nav-left">
              {/* <Link className="nav-link" to="/resources">
                Resources
              </Link> */}
            </div>
            <div className="nav-right">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
              <LogOutButton className="nav-link" />
            </div>
            <RightSibebar />
          </>
        )}
      </div>
    </div>
  </Box>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
