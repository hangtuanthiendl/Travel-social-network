import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import global from './global';
const {height, width} = Dimensions.get('window');

export const imageWidth = width;
export const imageHeight = (imageWidth / 500) *330;

export default StyleSheet.create({
   container:{
       flex: 1,
       width: '100%',
       height: '100%',
       position:'relative',
   },
   imgBackground:{
       position:'absolute',
       top:0,
       bottom:0,
       right:0,
       left:0,
       backgroundColor: global.imgBackground,
   },
   imgBackgroundCard:{
       position:'absolute',
       top:0,
       bottom:0,
       right:0,
       left:0,
       backgroundColor: global.imgBackground,
   },
    avatar:{
        width:40,
        height:40,
        borderRadius:20,
    },
});