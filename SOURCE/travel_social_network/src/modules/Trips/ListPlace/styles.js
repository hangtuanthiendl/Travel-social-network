import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import global from "../../../Styles/global";
const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    txt_search_place:{
        height:40,
        borderRadius:10,
        borderWidth: 1,
        borderColor:global.orange,
        backgroundColor:global.colorFF,
        color: global.black,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 5,
        marginBottom:5,
        paddingLeft: 10,
        fontSize: global.sizeP18
    },
});