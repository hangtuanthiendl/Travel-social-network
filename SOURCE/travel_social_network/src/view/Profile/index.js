
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
const {
    height,
    width
} = Dimensions.get('window');
class Profile extends Component {

    constructor(props){
        super(props);
        this.state={
            isLogin:this.props.login.isLogin,
        };
        this.thoatApp = this.thoatApp.bind(this);
    }
    // async componentDidMount(){
    //     if(await getFromLocal('Token_User') === null || this.state.isLogin) {
    //         this.props.navigation.navigate('Login')
    //     }
    // }
    componentWillReceiveProps(nextProps) {
        if (nextProps.login && nextProps.login.isLogin !== this.props.login.isLogin && nextProps.login.isLogin) {
            this.setState({
                isLogin:nextProps.login.isLogin,
            });
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
                        this.props.navigation.navigate('SplashScreen');
                    }
                },
            ])

    }

    render() {
    return (
        <View style={styles.container}>
            <ImageBackground source={image.img_bg_1} style={styles.header_profile}>
                <View style={styles.header_profile_view}>
                    <RoundAvatar
                        onPress={()=>alert('change images')}
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
        userInfo:state.userReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
        placeAction: bindActionCreators(placeAction,dispatch),
        tripActions:bindActionCreators(tripActions,dispatch),
        userInfoAction:bindActionCreators(userInfoAction,dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);