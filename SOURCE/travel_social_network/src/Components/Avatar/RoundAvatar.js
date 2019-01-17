import React, {Component} from 'react';
import {View, TouchableOpacity, AppRegistry, StyleSheet, Image, Platform} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import global from "../../Styles/global";

const RoundAvatar = ({size, icSrc, onPress, canClick, style, styleIc, isShowDot,imageLocal}) => {
    {console.log("icSrc",icSrc)}
    {console.log("imageLocal",imageLocal)}
    let styleRadiusSize = null;
    let styleDot = null;
    let styleAvatar = {};

    if (size === 'small') {
        styleAvatar = styles.avatarSmall;
        styleRadiusSize = 25;
    }
    if (size === 'x-small') {
        styleAvatar = styles.avatarXSmall;
        styleRadiusSize = 35;
        styleDot = 13 / 2;
    }
    if (size === "large") {
        styleAvatar = styles.avatarLarge;
        styleRadiusSize = 40;

    }
    if (size === "x-large") {
        styleAvatar = styles.avatarXlarge;
        styleRadiusSize = 60;

    }
    if (size === 'xx-large') {
        styleAvatar = {width: 125, height: 125};
        styleRadiusSize = 62.5;
    }
    return icSrc ? (
        <TouchableOpacity
            activeOpacity={0.85}
            disabled={!canClick} style={[styles.viewAvatar, {borderRadius: styleRadiusSize}, style]}
            onPress={onPress}
        >
            <Image source={{uri: icSrc, cache: 'force-cache'}}
                   style={[styleAvatar, styleIc]}
                   borderRadius={styleRadiusSize}
                   resizeMode={'cover'}
            />
            {
                isShowDot ? <View style={{
                    backgroundColor: global.lightGreen,
                    width: (styleRadiusSize - 5) / 2,
                    height: (styleRadiusSize - 5) / 2,
                    borderRadius: (styleRadiusSize - 5) / 4,
                    position: 'absolute',
                    right: (styleRadiusSize - 5) / 6, bottom: 0,
                    borderColor: global.colorFF,
                    borderWidth: 1
                }}/> : null
            }
        </TouchableOpacity>
    )
        :
        <TouchableOpacity
            activeOpacity={0.85}
            disabled={!canClick} style={[styles.viewAvatar, {borderRadius: styleRadiusSize}, style]}
            onPress={onPress}
        >
            <Image source={imageLocal}
                   style={[styleAvatar, styleIc]}
                   borderRadius={styleRadiusSize}
                   resizeMode={'cover'}
            />
            {
                isShowDot ? <View style={{
                    backgroundColor: global.lightGreen,
                    width: (styleRadiusSize - 5) / 2,
                    height: (styleRadiusSize - 5) / 2,
                    borderRadius: (styleRadiusSize - 5) / 4,
                    position: 'absolute',
                    right: (styleRadiusSize - 5) / 6, bottom: 0,
                    borderColor: global.colorFF,
                    borderWidth: 1
                }}/> : null
            }
        </TouchableOpacity>;
};

RoundAvatar.defaultProps = {
    size: "small",
    style: {},
    canClick: true,
    isShowDot:false,
    onPress: () => {
    },
    imageLocal:{}
};

RoundAvatar.propTypes = {
    size: PropTypes.oneOf(["small", "x-small", "large", "x-large", "xx-large"]),
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    styleIc: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    onPress: PropTypes.func,
    icSrc: PropTypes.string,
    canClick: PropTypes.bool,
    isShowDot: PropTypes.bool,
    imageLocal: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
};

export default RoundAvatar;
