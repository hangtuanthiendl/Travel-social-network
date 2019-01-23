
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
        const {imageUrl,title,description,isShowBtn,onClick,withView} = this.props;
        return (
            <View style={{flex:1,
                backgroundColor:global.colorFF,
                marginRight: 10,
                borderRadius:5,
                flexDirection: 'row',
                marginBottom: 10,
                justifyContent:'space-between'
            }}>
                <View style={{  flexDirection: 'row',}}>
                    <View style={{justifyContent: 'center',alignItems: 'center',marginLeft: 5}}>
                        <Image source={{uri: imageUrl}} style={{ width: 50,
                            height: 50,
                            borderRadius: 25}}/>
                    </View>
                    <View style={{marginLeft:10, maxWidth: withView, paddingTop: 10,
                        paddingBottom: 10,}}>
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
                </View>

                {isShowBtn
                    ?
                    <View style={{justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:global.orange,

                }}>
                    <IconButton
                        nameIcon={'ios-arrow-forward'}
                        iconStyle={{fontSize:50,color:global.colorFF}}
                        btnStyle={{marginRight:5,marginLeft:5}}
                        onClick={onClick}
                    />
                </View>
                :
                    <View style={{justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor:global.orangeColor,
                        width:30,
                    }}>

                    </View>
                }

            </View>
        );
    }
}

CardTripItem.defaultProps = {
    isShowBtn:false,
    onClick:()=>{},
    withView:150,
};

CardTripItem.propTypes = {
    imageUrl:PropTypes.string,
    title:PropTypes.string,
    description:PropTypes.string,
    isShowBtn:PropTypes.bool,
    onClick:PropTypes.func,
    withView:PropTypes.number,
};

export default CardTripItem
