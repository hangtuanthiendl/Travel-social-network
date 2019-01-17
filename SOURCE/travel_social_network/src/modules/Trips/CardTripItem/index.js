
import React, { Component } from 'react';
import {
    Image,
    View,Text
} from 'react-native';
import global from "../../../Styles/global";
import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import IconButton from "../../../Components/Button/IconButton";

class CardTripItem extends Component {
    render() {
        const {imageUrl,title,description,isShowBtn,onClick} = this.props;
        return (
            <View style={{flex:1,
                backgroundColor:global.colorFF,
                marginRight: 10,
                borderRadius:5,
                flexDirection: 'row',
                paddingTop: 10,
                paddingBottom: 10,
                borderRightWidth: 50,
                borderRightColor:global.orange,
                marginBottom: 10,
                position:'relative'
            }}>
                <View style={{justifyContent: 'center',alignItems: 'center',marginLeft: 5}}>
                    <Image source={{uri: imageUrl}} style={{ width: 50,
                        height: 50,
                        borderRadius: 25}}/>
                </View>
                <View style={{marginLeft:5, maxWidth: 240,}}>
                    <Text style={{
                        fontSize:global.sizeP16,
                        fontWeight: global.fontWeightBold,
                        color:global.black
                    }}>{title}</Text>
                    <Text style={{
                        color:global.color53
                    }}>{description}</Text>
                    <View style={{flexDirection:'row',
                        justifyContent:'space-between',
                        marginLeft:5,
                        maxWidth:100}}>
                        <View style={{flexDirection:'row'}}>
                            <Text>4.5</Text>
                            <Icon name={'ios-star'} style={{
                                color:global.colorRed,
                                fontSize:15,
                                marginLeft:5,
                            }}/>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text>2</Text>
                            <Icon name={'ios-chatbubbles'} style={{
                                color:global.green,
                                fontSize:15,
                                marginLeft:5,
                            }}/>
                        </View>
                    </View>
                </View>
                {isShowBtn && <View style={{justifyContent: 'center',alignItems: 'center',marginLeft: 5}}>
                    <IconButton
                        nameIcon={'ios-arrow-forward'}
                        iconStyle={{fontSize:50,color:global.colorFF}}
                        btnStyle={{marginRight:5}}
                        onClick={onClick}
                    />
                </View>}

            </View>
        );
    }
}

CardTripItem.defaultProps = {
    isShowBtn:false,
    onClick:()=>{}
};

CardTripItem.propTypes = {
    imageUrl:PropTypes.string,
    title:PropTypes.string,
    description:PropTypes.string,
    isShowBtn:PropTypes.bool,
    onClick:PropTypes.func,
};

export default CardTripItem
