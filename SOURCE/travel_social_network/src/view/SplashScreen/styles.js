import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import global from '../../Styles/global'
const {height, width} = Dimensions.get('window');

export const imageWidth = width;
export const imageHeight = (imageWidth / 500) *330;

export default StyleSheet.create({
    container_splash: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative'
    },
    imgBackground_splash:{
        flex: 1,
        backgroundColor: global.imgBackground,
        justifyContent:'center',
        alignItems:'center',
    },
    text: {
        position: 'absolute',
        bottom: 10,
        fontSize: 50,
    },
    slide: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    view_image: {
        backgroundColor: global.backgroudText,
        width: width,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_tieude: {
        color:  global.colorC5,
        fontSize: 14,
        marginTop: 10,
        fontWeight: 'bold',
    },
    text_noidung: {
        color: '#fff',
        fontSize: 18,
    },
    btn_login_register:{
        height:50,
        width :width - 50,
        marginBottom: 10,
        justifyContent:'space-between',
        flexDirection:'row',
    },
    btn_login_facebook:{
        backgroundColor:global.colorF4,
        height:50,
        width :width - 50,
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'row',
        marginBottom: 10,
        borderRadius:6,
    },
    btn_login_google:{
        backgroundColor:global.colorF4,
        height:50,
        width :width - 50,
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'row',
        marginBottom: 10,
        borderRadius:6,
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
    logo1:{
        width:width,
        height:200,
        justifyContent:'center',
        alignItems:'center',
    }
});