import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// Import Components
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import HomePage from "../HomePage/HomePage";
import Resources from "../Resources/Resources";
import Header from "../Header/Header";
import AddPost from "../PostList/AddPost/AddPost";
import AddResource from "../Resources/AddResource/AddResource";
import Profile from "../Profile/Profile";
import Frame from "../Frame/Frame";

import { connect } from "react-redux";

// // Chakra UI
import {
  ThemeProvider,
  CSSReset,
  theme,
  ColorModeProvider,
} from "@chakra-ui/core";

import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
    this.props.dispatch({ type: "FETCH_ALL_USERS" });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <Router>
            <Frame />
            <Header />
            <div>
              <Switch>
                {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
                <Redirect exact from="/" to="/home" />
                {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the HomePage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
                <ProtectedRoute exact path="/home" component={HomePage} />
                {/* <ProtectedRoute exact path="/resources" component={Resources} /> */}
                <ProtectedRoute exact path="/add-post" component={AddPost} />
                <ProtectedRoute exact path="/profile" component={Profile} />

                <ProtectedRoute
                  exact
                  path="/add-resource"
                  component={AddResource}
                />
                {/* If none of the other routes matched, we will show a 404. */}
                <Route render={() => <h1>404</h1>} />
              </Switch>
            </div>
          </Router>
        </ColorModeProvider>
      </ThemeProvider>
    );
  }
}

export default connect()(App);
