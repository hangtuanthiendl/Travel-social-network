import React, { Component } from "react";

import { View, Text as NativeText } from "react-native";

import styles from "./styles";
import PropTypes from "prop-types";

const Header =({leftHeader={}, rightHeader={}, body={}, customHeaderStyle })=>{

    return (
      <View style={[styles.container, customHeaderStyle]}>
        <View style={styles.wrapper}>
          <View style={styles.leftHeader}>{leftHeader}</View>
          <View style={styles.bodyHeader}>{body}</View>
          <View style={styles.rightHeader}>{rightHeader}</View>
        </View>
      </View>
    );
  
}
Header.defaultProps = {};
Header.propTypes = {
  rightHeader: PropTypes.object,
  leftHeader: PropTypes.object,
  body: PropTypes.object,
  customHeaderStyle: PropTypes.oneOfType([PropTypes.number,PropTypes.object,PropTypes.array]),
};
export default  Header;