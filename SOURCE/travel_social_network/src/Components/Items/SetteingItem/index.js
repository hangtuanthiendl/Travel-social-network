import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Ionicons";
import global from "../../../Styles/global";
const {
    height,
    width
} = Dimensions.get('window');
const SettingItem = ({nameIcon, txtTitle,txtDetails,styleIcon,onClick}) => {
   let iconStyle ={
       color:global.yellow,
       fontSize:20,
       marginRight: 10,
   };
    return (
        <TouchableOpacity onPress={onClick}>
            <View style = {{
                width:width,
                height:50,
                flexDirection:'row',
                alignItems:'center',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderColor:global.colorCc,
            }}>
                <View>
                    <Text style = {{
                        fontSize:global.sizeP18,
                        color: global.colorFF,
                        fontWeight: global.fontWeightNormal,
                        marginLeft: 5,
                    }}>{txtTitle}</Text>
                    <Text style={{
                        color:global.color53,
                        marginLeft:10,
                    }} >{txtDetails}</Text>
                </View>
                <Icon name={nameIcon} style={[iconStyle,styleIcon]}/>
            </View>
        </TouchableOpacity>
    );
};

SettingItem.defaultProps = {

};

SettingItem.propTypes = {
    nameIcon : PropTypes.string,
    txtTitle:PropTypes.string,
    txtDetails:PropTypes.string,
    styleIcon:PropTypes.object,
    onClick:PropTypes.func,
};

export default SettingItem;
