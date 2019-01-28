import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import global from '../../Styles/global'
const {height, width} = Dimensions.get('window');

export const imageWidth = width;
export const imageHeight = (imageWidth / 500) *330;

export default StyleSheet.create({
    container_login:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor:global.backgroudTransparent
    },
    buttonLogin:{
        backgroundColor:global.colorFb,
        width:100,
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:5,
        //borderRadius:80,
    },
    btnBack_view:{
        justifyContent:'center',
        alignItems:'flex-start',
        width:width -50,
        marginBottom: 10,
    },
    btn_login_facebook:{
        backgroundColor:global.colorFF,
        height:50,
        width :width - 50,
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'row',
        marginBottom: 10,
        borderRadius:50,
    },
    btn_login_email:{
        backgroundColor:global.orangeColor,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'row',
        borderRadius:6,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    nextHome:{
        width:width,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom:20,

    },
    btn_nextHome:{
        width:150,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:global.backgroudText,
        borderRadius:10,
        borderColor:global.colorFF,
        borderWidth: 1,
    },
    txt_nextHome:{
      color:global.colorFF,
      fontSize:global.sizeP16,
       fontWeight: global.fontWeightBold
    }
});