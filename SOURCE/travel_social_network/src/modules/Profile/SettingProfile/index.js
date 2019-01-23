
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
import {bindActionCreators} from "redux";
import * as loginActions from "../../../action/loginAction";
import * as placeAction from "../../../action/placeAction";
import * as tripActions from "../../../action/tripAction";
import * as uploadImageAction from "../../../action/uploadImgaeAction";
import connect from "react-redux/es/connect/connect";
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
            email:this.props.userInfo.data.email,
            phone:this.props.userInfo.data.phone,
            nameUser:this.props.userInfo.data.firstName +' '+this.props.userInfo.data.middleName +' '+this.props.userInfo.data.lastName,
            name:'',
        };
        this.handleOpenEditProfile = this.handleOpenEditProfile.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.doneEdit = this.doneEdit.bind(this);
    }
    handleOpenEditProfile(titleSetting,name){
        this.setState({
            showEditProfile:true,
            titleSetting:titleSetting,
            name:name,
        })
    }
    onCloseModal(){
        this.setState({
            showEditProfile:false,
        })
    }
    doneEdit(content){
       console.log("content",content);
        if(this.state.titleSetting === 'Email'){
            this.setState({
                email:content,
            })
        }else if(this.state.titleSetting === 'Tên hiển thị'){
            this.setState({
                nameUser:content,
            })
        }else{
            this.setState({
                phone:content,
            })
        }
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
                                txtDetails={this.state.email}
                                txtTitle={'Email'}
                                onClick={this.handleOpenEditProfile.bind(null,'Email',this.state.email)}
                            />
                            <SettingItem
                                nameIcon='ios-eye'
                                styleIcon={{color:global.colorFF,fontSize: 30,}}
                                txtDetails={this.state.nameUser}
                                txtTitle={'Tên hiển thị'}
                                onClick={this.handleOpenEditProfile.bind(null,'Tên hiển thị',this.state.nameUser)}
                            />
                            <SettingItem
                                nameIcon='ios-pulse'
                                styleIcon={{color:global.red,fontSize: 30,}}
                                txtDetails={this.state.phone}
                                txtTitle={'Số điện thoại'}
                                onClick={this.handleOpenEditProfile.bind(null,'Số điện thoại',this.state.phone)}
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
                        name={this.state.name}
                    />
                </ImageBackground>
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        login: state.loginReducer,
        error: state.loginReducer.error,
        dataImage:state.imageReducer,
        dataTripCreateNew:state.tripReducer.dataTripCreateNew,
        placeReducer:state.placeReducer,
        userInfo:state.userReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
        placeAction: bindActionCreators(placeAction,dispatch),
        tripActions:bindActionCreators(tripActions,dispatch),
        uploadImageAction:bindActionCreators(uploadImageAction,dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingProfile);
