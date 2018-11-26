import React from "react";
import PropTypes from 'prop-types';
import {Text} from "react-native";
import global from '../../Styles/global';

const   TextComponent = ({text, style, numberOfLines, allowFontScaling =true, size, bold, color,fontFamily}) => {
    let textVar = "";
    if (text) {
        textVar = text;
    }
   let styleVar = '';
    if (style) {
        styleVar = [styleVar, style];
    }
    let fontSize = size;
    let fontWeight = bold;
    let propsText = {
        //style: [styleVar,{color, fontSize, fontWeight, fontFamily}]
    };
    if (numberOfLines !== -1) {
        propsText.numberOfLines = numberOfLines;
    }
    propsText.allowFontScaling = allowFontScaling;
    return (
        <Text {...propsText} style ={[{color, fontSize, fontWeight}, style]}>
            {textVar.toString()}
        </Text>
    );
};

TextComponent.defaultProps = {
    numberOfLines: 1,
    size: global.sizeP14,
};
TextComponent.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    style: PropTypes.oneOfType([PropTypes.number,PropTypes.object,PropTypes.array]),
    size: PropTypes.number,
    bold: PropTypes.string,
    color: PropTypes.string,
    numberOfLines: PropTypes.number,
    allowFontScaling : PropTypes.bool
};

export default TextComponent;
