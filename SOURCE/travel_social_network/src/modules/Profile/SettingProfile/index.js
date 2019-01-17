
import React, { Component } from 'react';
import {
    Dimensions,
    ImageBackground,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import styles from "../SettingProfile/styles";
import Header from "../../../modules/Header";
import global from "../../../Styles/global";
import IconButton from "../../../Components/Button/IconButton";
import image from "../../../themes/Images";
import RoundAvatar from "../../../Components/Avatar/RoundAvatar";
import TextComponent from "../../../Components/Text/Text";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
import SettingItem from "../../../Components/Items/SetteingItem";
import SettingProfileModal from "../SettingProfileModal";
const {
    height,
    width
} = Dimensions.get('window');
class SettingProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            showEditProfile:false,
            titleSetting:'',
        };
        this.handleOpenEditProfile = this.handleOpenEditProfile.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.doneEdit = this.doneEdit.bind(this);
    }
    handleOpenEditProfile(titleSetting){
        this.setState({
            showEditProfile:true,
            titleSetting:titleSetting,
        })
    }
    onCloseModal(){
        this.setState({
            showEditProfile:false,
        })
    }
    doneEdit(){
        this.setState({
            showEditProfile:false,
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Header
                    customHeaderStyle={{backgroundColor: global.yellow}}
                    leftHeader={<TextComponent text={''}/>}
                    body={<TextComponent
                        text='Thiết lập tài khoản'
                        color={global.black}
                        size={global.sizeP20}
                        bold={global.fontWeightDark}/>}
                    rightHeader={
                        <IconButton nameIcon={"ios-close"} iconStyle={{fontSize: 35, color: global.black}}
                                    onClick={() => this.props.navigation.goBack()}/>}
                />
                <ImageBackground source={image.img_bg_1} style={styles.header_profile_setting}>
                    <View style={styles.header_profile_view_setting}>
                        <View style={{flex: 2,paddingTop: 20}}>
                            <SettingItem
                                nameIcon='ios-finger-print'
                                styleIcon={{color:global.orange,fontSize: 30,}}
                                txtDetails={'doquoctrung95@gmail.com'}
                                txtTitle={'Email'}
                                onClick={this.handleOpenEditProfile}
                            />
                            <SettingItem
                                nameIcon='ios-eye'
                                styleIcon={{color:global.colorFF,fontSize: 30,}}
                                txtDetails={'Do Quoc Trung'}
                                txtTitle={'Tên hiển thị'}
                            />
                            <SettingItem
                                nameIcon='ios-pulse'
                                styleIcon={{color:global.red,fontSize: 30,}}
                                txtDetails={'0934197445'}
                                txtTitle={'Số điện thoại'}
                            />
                            <SettingItem
                                nameIcon='ios-key'
                                styleIcon={{color:global.colorFF,fontSize: 30,}}
                                txtDetails={'1234567'}
                                txtTitle={'Mật khẩu'}
                            />
                        </View>
                        <View style={{flex:1}}>
                            <RoundAvatar
                                size={'x-large'}
                                icSrc={'https://anh.24h.com.vn//upload/1-2015/images/2015-02-12/1423706954-anhgirlxinh.jpg'}/>
                        </View>

                    </View>
                    <SettingProfileModal
                        visible={this.state.showEditProfile}
                        onCloseModal={this.onCloseModal}
                        doneEdit ={this.doneEdit}
                        title={this.state.titleSetting}
                    />
                </ImageBackground>
            </View>
        );
    }
}
export  default  SettingProfile;
