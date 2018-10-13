/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    View
} from 'react-native';
import styles from "../Home/styles";
import Header from "../../modules/Header";
import global from "../../Styles/global";
import IconButton from "../../Components/Button/IconButton";
import Text from '../../Components/Text/Text';
export default class Messaging extends Component {
  render() {
    return (
        <View style={styles.container}>
            <Header
                customHeaderStyle={{backgroundColor: global.yellow}}
                leftHeader={<IconButton nameIcon='ios-search' iconStyle={{fontSize: 35, color: global.black}}/>}
                body={<Text
                    text='My Trip'
                    color={global.black}
                    size={global.sizeP20}
                    bold={global.fontWeightDark}/>}
                rightHeader={
                    <IconButton nameIcon='ios-cart' iconStyle={{fontSize: 35, color: global.black}}
                                onClick={() => alert("TrungDo")}/>}
            />
        </View>
    );
  }
}

