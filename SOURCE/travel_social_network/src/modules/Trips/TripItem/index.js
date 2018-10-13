import React, {Component} from 'react';
import {View, Dimensions, Image, TouchableWithoutFeedback,Animated} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import global from '../../../Styles/global';
import Text from '../../../Components/Text/Text';
const {height, width} = Dimensions.get('window');

const TripItem = ({uriImage,title,price})=>{
    console.log("image",uriImage);
    return(
        <View style={{flexDirection:'row',marginLeft:20,marginTop:10,marginBottom:10}}>
            <View>
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri:'http://file.vforum.vn/hinh/2018/01/top-nhung-hot-girl-viet-nam-xinh-nhat-hien-nay-2018-12.png'}}
                />
            </View>
            <View>
                <Text
                    style={{marginLeft:20}}
                    text={title}
                    color ={global.black}
                    size={global.sizeP14}
                    bold={global.fontWeightDark}/>
                <Text
                    style={{marginLeft:20}}
                    text={'Giá bán:'+ price}
                    color ={global.grey}
                    size={global.sizeP14}
                    bold={global.fontWeightDark}/>
            </View>
        </View>
    );
};
TripItem.defaultProps = {};
TripItem.propTypes = {
    uriImage:PropTypes.string,
    title: PropTypes.string,
    price:PropTypes.string,
};
export default TripItem;