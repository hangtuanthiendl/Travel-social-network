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
       backgroundColor: global.imgBackground,
   },
   imgBackground:{
       flex: 1,
       backgroundColor: global.imgBackground,
   },
   imgBackgroundCard:{
       flex: 1,
       backgroundColor: global.imgBackground,
   },
    avatar:{
        width:40,
        height:40,
        borderRadius:20,
    },
});