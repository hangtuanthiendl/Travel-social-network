/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    ImageBackground,
    View
} from 'react-native';
import styles from "../Home/styles";
import Header from "../../modules/Header";
import global from "../../Styles/global";
import IconButton from "../../Components/Button/IconButton";
import Text from '../../Components/Text/Text';
import image from "../../themes/Images";
import styleGlobal from "../../Styles/styles";
export default class Notification extends Component {
  render() {
    return (
        <ImageBackground source={image.backgroundImage} style={styleGlobal.container}>
            <View style={styleGlobal.imgBackground}>
            <Header
                customHeaderStyle={{backgroundColor: global.yellow}}
                leftHeader={<IconButton nameIcon='ios-search' iconStyle={{fontSize: 35, color: global.black}}/>}
                body={<Text
                    text='Notification'
                    color={global.black}
                    size={global.sizeP20}
                    bold={global.fontWeightDark}/>}
                rightHeader={
                    <IconButton nameIcon='ios-cart' iconStyle={{fontSize: 35, color: global.black}}
                                onClick={() => alert("TrungDo")}/>}
            />
            </View>
        </ImageBackground>
    );
  }
}

