import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Dimensions, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Ionicons";
import global from "../../../Styles/global";
import IconButton from "../../Button/IconButton";
const {
    height,
    width
} = Dimensions.get('window');
const TextInputItems = ({onClick,editable,nameIcon,namePlaceholder,isForget,multiline,styleIcon,secureTextEntry,isNumber,txtStyle,styleDevider,txtContent,onChangeText,warning,style,maxLength}) => {

    let colorIcon = {
        color:global.yellowColor,
        fontSize:30,
    };
    let txt={
        color:global.black,
        marginLeft:10,
        minWidth:260,
        maxWidth:width,
        fontSize:global.sizeP20,
    };
    let devider={
        backgroundColor: global.backgroudTransparent,
        height:1
    };
    let colorWarning={
        borderColor:global.colorRed,
        borderWidth: 1,
        marginRight: 10,
    };
    let styleContener={
        flexDirection:'row',
        marginLeft:10,
        height:50,
        alignItems: 'center',
        position: 'relative',
    };
    return (
        <View>
            <View style={[styleContener,style, warning && colorWarning,]}>
                <IconButton nameIcon={nameIcon} onClick={onClick}  iconStyle={[colorIcon,styleIcon]}/>
                <TextInput
                    onChangeText={onChangeText}
                    style={[txt,txtStyle]}
                    keyboardType= {isNumber?'numeric':'default'}
                    multiline={multiline}
                    maxLength={maxLength}
                    placeholder={namePlaceholder}
                    value={txtContent}
                    placeholderTextColor={global.colorB2}
                    autoCapitalize = 'none'
                    underlineColorAndroid="transparent"
                    secureTextEntry={secureTextEntry}
                    editable={editable}
                />
            </View>
            <View style={[devider,styleDevider]}>

            </View>

        </View>
    );
};

TextInputItems.defaultProps = {
    isNumber:false,
    secureTextEntry:false,
    multiline:false,
    editable:true,
    onClick : ()=>{}
};

TextInputItems.propTypes = {
    maxLength:PropTypes.number,
    nameIcon:PropTypes.string,
    styleIcon:PropTypes.object,
    style:PropTypes.object,
    namePlaceholder:PropTypes.string,
    isNumber:PropTypes.bool,
    styleDevider:PropTypes.object,
    txtStyle:PropTypes.object,
    txtContent:PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChangeText:PropTypes.func,
    warning:PropTypes.bool,
    secureTextEntry:PropTypes.bool,
    multiline:PropTypes.bool,
    editable:PropTypes.bool,
    onClick:PropTypes.func,
};

export default TextInputItems;
