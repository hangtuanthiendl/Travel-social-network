import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import global from './global';
const {height, width} = Dimensions.get('window');

export const imageWidth = width;
export const imageHeight = (imageWidth / 500) *330;

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: global.coloF3,},
    viewHome: {flexDirection: 'row', justifyContent:'center', padding: height/80, position: 'absolute', right: width /6,left: width/6,top: height/ 35,zIndex:100,backgroundColor: 'transparent'},
    styleOnPress: {color: 'white', opacity: 0.54, fontSize: height/45},
    styleUnPress:{opacity: 1,fontSize: height/40},
    styleDivide: {width: height/800, height: height/100, backgroundColor:'white', margin: height/100, alignSelf: 'center'},
    imageItemtop:{height: height/3,width: width/2,resizeMode: 'cover',},
    imageItemtopLinear:{height: height/2.5,width: width/2,position: 'absolute'},
    imageItemtopEpisode:{height: height/4,width: width/3,resizeMode: 'contain',},
    imageItemtopEpisodeLinear:{height: height/4,width: width/3,position: 'absolute'},
    imagePopular: {height: null,width: null,resizeMode: 'cover', flex:1},
    imagePopularLinear: {height: null,width: null,position: 'absolute',flex:1},
    viewChat:{position: 'absolute',right: 0,left: height/60,bottom: height/60,zIndex:100,width: width/2, height:height/5, justifyContent:'flex-end'},
    viewiTV:{position: 'absolute',bottom:height/3,zIndex:100,width: width, height:height/2, justifyContent:'center',alignItems:'center'},
    styleTextChat:{ marginLeft: 5, color: 'white', fontSize: height/40, opacity: 1},
    styleTextiTV:{color: 'white', fontSize: height/13, opacity: 1},
    styleTextDesiTV:{color: 'white', fontSize: height/20, opacity: 1,textAlign:'center'},
    viewFuntionVideo:{position: 'absolute',right: height/60,bottom: height/60,zIndex:100,alignItems:'center'},
    avatarLarge:{width: height/10, height:  height/10, borderRadius:  height/6, backgroundColor: 'transparent'},
    avatarSmall: {width: height/15, height: height/15, borderRadius: height/7.5, backgroundColor: 'transparent'},
    styleIconFuntionVideo: {fontSize: height/20, color: 'white'},
    styleTextFuntionVideo: {alignSelf:'center',  fontSize: height/60,color: 'white', textAlign:'center'},
    styleViewItemBottom:{position: 'absolute', right: 0,left: 2,bottom: 5,zIndex:100,   },
    styleTextName: {marginLeft: 10, color: global.colorTextPrimary, fontSize:height/40, opacity: 0.8, fontFamily: global.fontRegular, fontWeight: '400'},
    styleViewItemTop:{flexDirection: 'row',position: 'absolute',right: 5,top: 5, zIndex:100,alignItems:'center'},
    styleIconItemTop:{fontSize: height/40, color: 'white'},
    styleTextNumPerson: {alignSelf:'center', marginLeft: 5, fontSize: height/50, color: 'white'},
    wraperSwiper1: {
        height: height / 3.5,
       backgroundColor: '#DEF3F6'
    },
    wraper2: {
        marginTop: 5,
        height: undefined,
        backgroundColor: '#F0F0F0',
        elevation: 3
    },
    // slide: {
    //     //backgroundColor: '#2d3436',
    //     height: height / 3.5,
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // },
    slide: {
        //alignSelf: 'stretch',
        height: height / 3.5,
        width: null,
        //position: 'relative',
      //  resizeMode: 'cover'
    },
    slideLinear: {
        //alignSelf: 'stretch',
        height: height / 3.5,
        width: null,
       // position: 'absolute',
       // resizeMode: 'cover'
    },
    viewPage: {
        flexDirection: 'row',
        marginTop: height / 50,
        alignItems: 'center'
    },
    titlePage: {
        fontSize: height / 30,
        fontWeight: 'normal',
        marginLeft: height / 60,
        color: '#1253bc'
    },
    tron: {
        backgroundColor: 'transparent',
        fontSize: height/30,
        fontWeight: 'bold',
        color: '#e74c3c',
        marginLeft: height/80
        //borderRadius: height/30
    },
    titlePeople: {
        fontSize: height / 50,
        fontWeight: 'normal',
        color: 'white',
        marginBottom: height / 100,
    },
    viewAcdicator:{
        height: height/5,alignItems:'center',justifyContent:'center'
    },
    modal: {
        flex:1,
        //flexDirection:'row',
        height: '95%',
        borderRadius: 5
      },
});