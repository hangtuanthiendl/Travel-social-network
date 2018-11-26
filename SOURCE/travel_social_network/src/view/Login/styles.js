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
    },
    buttonLogin:{
        backgroundColor:global.colorFb,
        width:100,
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:5,
        //borderRadius:80,
    }
});