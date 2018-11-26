import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');

export const imageWidth = width;
export const imageHeight = (imageWidth / 500) *330;

export default StyleSheet.create({
    //  modalOder
    modalOder: {
        borderRadius: 6,
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 24,
        paddingBottom: 24,
        paddingLeft: width >= 375 ? 20 : 14,
        paddingRight: width >= 375 ? 20 : 14,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    // modalCall
    ModalContact: {
        borderRadius: 10,
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        // paddingTop: 24,
       // paddingBottom: 24,
        paddingLeft: width >= 375 ? 20 : 14,
        paddingRight: width >= 375 ? 20 : 14,
        alignSelf: 'center',
        justifyContent: 'center',
    },
});