import React, { Component } from 'react';
import { View, Text, FlatList,StyleSheet,TouchableOpacity,Image,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const { height } = Dimensions.get('window');
import global from '../../Styles/global'
import PropTypes from 'prop-types';

const FloatingButton = ({nameIcon,icoStyle,btnStyle,onClick})=>{
    let container = {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    };
    let floatingButton = {
        position: 'absolute',
        width:60,height:60,
        backgroundColor: global.colorTextPrimary,
        bottom:20,right:20,
        borderRadius: 30,
        alignItems:'center',
        justifyContent:'center',
        elevation: 2
    };
    let iconStyle = {
        fontSize: height / 20,
        color: 'white',
        alignSelf:'center' 
    };
    return (
        <TouchableOpacity onPress ={onClick}>
            <View style = {[floatingButton,btnStyle]}>
            <Icon name={nameIcon} style={[iconStyle,icoStyle]}/>
            </View>
        </TouchableOpacity>
);
};

FloatingButton.propTypes = {
    nameIcon: PropTypes.string,
    icoStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    btnStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func
};
export default FloatingButton;