import React, { Component } from "react";
import ResourceItem from "./ResourceItem/ResourceItem";
import { connect } from "react-redux";
import "./Resources.css";
import RightSide from "../Sidebars/RightSibebar";
import { Box, Button, IconButton, Flex, Stack } from "@chakra-ui/core";
import { VARIANT_COLOR } from "../ThemeSelector/ThemeSelector";

class Resources extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_RESOURCES" });
  }

  toNewResource = () => {
    this.props.history.push("/add-resource");
  };

  render() {
    return (
      <div>
        <Flex mt="10%">
          <Stack alignItems="center">
            <Button
              variantColor={VARIANT_COLOR}
              width="10%"
              onClick={this.toNewResource}
              textAlign="center"
            >
              Add Resource
            </Button>
            <Stack>
              {this.props.resources.resources.map((resourceItem) => {
                return (
                  <Box width="70%" alignItems="center" m="auto" mt={2}>
                    <ResourceItem
                      key={resourceItem.id}
                      resourceItem={resourceItem}
                    />
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        </Flex>
      </div>
    );
  }
}

// Makes our reducers available in our component
const mapStateToProps = (state) => {
  return {
    resources: state.resources,
  };
};

export default connect(mapStateToProps)(Resources);
