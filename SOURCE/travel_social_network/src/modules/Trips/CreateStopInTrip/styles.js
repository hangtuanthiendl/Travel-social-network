import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import global from "../../../Styles/global";
const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    body_trip_stop:{
        width:width,
        height:300,
        backgroundColor:'transparent',
        marginTop: 20,
        position: 'relative'
    },
    logo:{
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        width:width,
        height:200,
        bottom: 50,
        backgroundColor:global.backgroudTransparent,
    },
    txt_search:{
        height:40,
        borderRadius:10,
        borderWidth: 1,
        borderColor:global.orange,
        backgroundColor:global.colorFF,
        color: global.black,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 5,
        marginBottom:15,
        paddingLeft: 10,
        fontSize: global.sizeP18
    },
    view_btn_create:{
        width:width,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    btn_create:{
      width:100,
      height:40,
      borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:global.orange,
        marginLeft: 15,
        marginTop:10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 2,
            height:10
        },
        shadowRadius: 3,
        shadowOpacity:0.9,
        elevation:5,
    },
    result_Search_place:{
        height:40,
        borderRadius:5,
        borderWidth: 1,
        borderColor:global.colorFF,
        backgroundColor:global.orange,
        marginRight: 20,
        marginLeft: 20,
        justifyContent:'center',
        paddingLeft: 10,
        marginTop:1,
    },

});