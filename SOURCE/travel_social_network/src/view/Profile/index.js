
import React, { Component } from 'react';
import {
    Dimensions,
    ImageBackground,
    View,
    Text,
} from 'react-native';
import styles from "../Profile/styles";
import image from "../../themes/Images";
import RoundAvatar from "../../Components/Avatar/RoundAvatar";
import Icon from "react-native-vector-icons/Ionicons";
import global from "../../Styles/global";
import TextComponent from "../../Components/Text/Text";
import AlineItem from "../../Components/Items/AlineItem";
import IconButton from "../../Components/Button/IconButton";
const {
    height,
    width
} = Dimensions.get('window');
export default class Profile extends Component {

    renderStar=(number)=>{
        const fields = [];
        for (let i = 0; i < number; i++){
            fields.push(<Icon name={'ios-star'} style={{
                color:global.yellowColor,
                fontSize:20,
                marginLeft:4,
            }}/>)
        }
        return fields;
    };
  render() {
    return (
        <View style={styles.container}>
            <ImageBackground source={image.img_bg_1} style={styles.header_profile}>
                <View style={styles.header_profile_view}>
                    <RoundAvatar
                        size={'x-large'}
                        icSrc={'https://anh.24h.com.vn//upload/1-2015/images/2015-02-12/1423706954-anhgirlxinh.jpg'}/>
                    <View style={{flexDirection: 'row',marginTop: 10}}>
                        {this.renderStar(4)}
                        <Icon name={'ios-star-half'} style={{
                            color:global.yellow,
                            fontSize:20,
                            marginLeft:4,
                        }}/>
                    </View>
                    <View style={{
                        width:width,
                        height:30,
                        flexDirection:'row',
                        alignItems:'flex-end',
                        paddingLeft:10,
                        paddingRight:10,
                        justifyContent: 'space-between'}}>
                        <TextComponent
                            text={'Có 3k người theo dõi'}
                            style={{color:global.colorFF}}
                        />
                        <TextComponent
                            text={'Theo dõi: 100'}
                            style={{color:global.colorFF}}
                        />
                    </View>
                    <View style={{
                        position:'absolute',
                        width:width,
                        height:50,
                        top:0,
                        justifyContent:'center',
                        alignItems:'center',
                    }}>
                        <IconButton
                            nameIcon={'ios-reverse-camera'}
                            iconStyle={{
                                fontSize:35,
                                color:global.colorFF,
                            }}
                            btnStyle={{
                                width:40,
                                height:40,
                                borderRadius:10,
                                backgroundColor:global.backgroudText,
                                marginLeft:80,
                            }}
                            onClick={()=>alert('Change Photo')}
                        />
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.body_profile}>
               <AlineItem
                    txtAction={'Xem tài khoản của tôi'}
                    txtName={'Tài khoản'}
                    nameIcon={'ios-contact'}
                    styleIcon={{
                        color:global.red
                    }}
                    onClick={()=>this.props.navigation.navigate('SettingProfile')}
               />
               <AlineItem
                    txtAction={'Xem tour đã đi'}
                    txtName={'Lịch sử'}
                    nameIcon={'ios-bicycle'}
                    styleIcon={{
                        color:global.orangeColor
                    }}
                    onClick={()=>alert('Hello')}
                />
               <AlineItem
                    txtAction={'Tiện ích cho bạn'}
                    txtName={'Tiện ích'}
                    nameIcon={'ios-list'}
                    styleIcon={{
                        color:global.primaryColor
                    }}
                    onClick={()=>alert('Hello')}
                />
               <AlineItem
                    txtAction={'Đăng xuất tài khoản'}
                    txtName={'Đăng xuất'}
                    nameIcon={'ios-exit'}
                    styleIcon={{
                        color:global.colorC5
                    }}
                    onClick={()=>alert('Hello')}
                />

            </View>
      </View>
    );
  }
}

