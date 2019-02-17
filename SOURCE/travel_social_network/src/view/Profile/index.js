
import React, { Component } from 'react';
import {
    Dimensions,
    ImageBackground,
    View,
    BackHandler,
    Alert
} from 'react-native';
import styles from "../Profile/styles";
import image from "../../themes/Images";
import RoundAvatar from "../../Components/Avatar/RoundAvatar";
import Icon from "react-native-vector-icons/Ionicons";
import global from "../../Styles/global";
import TextComponent from "../../Components/Text/Text";
import AlineItem from "../../Components/Items/AlineItem";
import { AsyncStorage } from 'react-native';
import {getFromLocal} from "../../services/storage";
import {bindActionCreators} from "redux";
import * as loginActions from "../../action/loginAction";
import * as placeAction from "../../action/placeAction";
import * as tripActions from "../../action/tripAction";
import * as userInfoAction from "../../action/userAction";
import connect from "react-redux/es/connect/connect";
import * as uploadImageAction from "../../action/uploadImgaeAction";
import * as api from "../../api/Api";
import urls from "../../api/urls";
const {
    height,
    width
} = Dimensions.get('window');
let ImagePicker = require('react-native-image-picker');
const options = {
    title: 'Chọn hình ảnh',
  //  takePhotoButtonTitle:'Chọn ảnh từ Camera',
    chooseFromLibraryButtonTitle:'Chọn ảnh từ thư viện',
    cancelButtonTitle:'Thoát',
    storageOptions: {
        skipBackup: true,
        path: 'images',
        quality:0.1,
        maxWidth:20,
        maxHeight:20,
    }
};
class Profile extends Component {

    constructor(props){
        super(props);
        this.state={
            isLogin:this.props.login.isLogin,
            avatarSource: '',
            avatarSourceUrl:'',
        };
        this.thoatApp = this.thoatApp.bind(this);
        this.changePhotoBgr = this.changePhotoBgr.bind(this);
        this.handleGetListTripHistory = this.handleGetListTripHistory.bind(this);
    }
    // async componentDidMount(){
    //     if(await getFromLocal('Token_User') === null || this.state.isLogin) {
    //         this.props.navigation.navigate('Login')
    //     }
    // }
    componentWillMount(){
        console.log("avatarSourceUrl",this.props.userInfo.data);
        if(this.props.userInfo && this.props.userInfo.data.img !== null){
            this.setState({
                avatarSourceUrl: urls.ROOT + this.props.userInfo.data.img.slice(1)
            })
        }else{
            this.setState({
                avatarSourceUrl: 'https://anh.24h.com.vn//upload/1-2015/images/2015-02-12/1423706954-anhgirlxinh.jpg',
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.login && nextProps.login.isLogin !== this.props.login.isLogin && nextProps.login.isLogin) {
            this.setState({
                isLogin:nextProps.login.isLogin,
            });
        }
        if(nextProps.userInfo && nextProps.userInfo.data){
            this.setState({
                avatarSource: urls.ROOT + this.props.userInfo.data.img.slice(1),
            })
        }
    }
    renderStar=(number)=>{
        const fields = [];
        for (let i = 0; i < number; i++){
            fields.push(<Icon key={i} name={'ios-star'} style={{
                color:global.yellowColor,
                fontSize:20,
                marginLeft:4,
            }}/>)
        }
        return fields;
    };
    thoatApp() {
        Alert.alert(
            "Thông báo",
            "Bạn muốn thoát ứng dụng?",
            [
                { text: 'Không', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Có', onPress: () => {
                        let keys = ['Token_User','History_Search'];
                            AsyncStorage.multiRemove(keys, (err) => {
                                // keys k1 & k2 removed, if they existed
                                // do most stuff after removal (if you want)
                            });
                        this.props.navigation.navigate('SplashScreen',{
                            isSplashScreen:true,
                        });
                    }
                },
            ])

    }
    changePhotoBgr(){
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }else {
                const source = { uri: response.uri };
                this.setState({
                    avatarSource: source,
                }, async ()=>api.upLoadAvatar(await getFromLocal('Token_User'),response).then((res)=>{
                    if(res && res.status){
                        console.log("res upload avatar",res.data)
                    }
                }).catch((err)=>{
                    console.log("upload avatar err",err.response)
                }));
            }
        });
    }
    async handleGetListTripHistory(){
        if(await getFromLocal('Token_User') !== null){
            api.getAllMyTrip(await getFromLocal('Token_User')).then((res)=>{
                if(res && res.status){
                    console.log("res get all my trip history",res.data);
                    this.props.navigation.navigate('TripHistory',{
                        dataTripHistory:res.data
                    })
                }
            })
                .catch((err)=>{
                    console.log("err get all my trip history",err.response);
                })
        }
    }
    render() {
    return (
        <View style={styles.container}>
            <ImageBackground source={image.img_bg_1} style={styles.header_profile}>
                <View style={styles.header_profile_view}>
                    {this.state.avatarSource === ''
                     ?
                        <RoundAvatar
                            onPress={this.changePhotoBgr}
                            size={'x-large'}
                            icSrc={this.state.avatarSourceUrl}
                        />
                        :
                        <RoundAvatar
                            onPress={this.changePhotoBgr}
                            size={'x-large'}
                            imageLocal={this.state.avatarSource}
                        />
                    }

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
                    onClick={this.handleGetListTripHistory}
                />
               <AlineItem
                    txtAction={'Tiện ích cho bạn'}
                    txtName={'Tiện ích'}
                    nameIcon={'ios-list'}
                    styleIcon={{
                        color:global.primaryColor
                    }}
                    onClick={()=>Alert.alert('Thông báo ','Chức năng đang phát triên')}
                />
               <AlineItem
                    txtAction={'Đăng xuất tài khoản'}
                    txtName={'Đăng xuất'}
                    nameIcon={'ios-exit'}
                    styleIcon={{
                        color:global.colorC5
                    }}
                    onClick={this.thoatApp}
                />

            </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
    return {
        login: state.loginReducer,
        error: state.loginReducer.error,
        userInfo:state.userReducer,
        dataImage:state.imageReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
        placeAction: bindActionCreators(placeAction,dispatch),
        tripActions:bindActionCreators(tripActions,dispatch),
        userInfoAction:bindActionCreators(userInfoAction,dispatch),
        uploadImageAction:bindActionCreators(uploadImageAction,dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);