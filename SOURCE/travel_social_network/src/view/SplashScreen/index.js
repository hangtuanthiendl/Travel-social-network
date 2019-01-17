
import React, { Component } from 'react';
import {
    ImageBackground,
    View,
    Text, Dimensions,Image,TouchableOpacity
} from 'react-native';
import connect from "react-redux/es/connect/connect";
import Swiper from 'react-native-swiper';
import styles from "./styles"
import image from "../../themes/Images";
import global from "../../Styles/global";
import {bindActionCreators} from "redux";
import * as tripActions from  "../../action/tripAction";
import styleGlobal from "../../Styles/styles";
import { getFromLocal } from "../../services/storage";
import * as loginActions from "../../action/loginAction";
const {height, width} = Dimensions.get('window');
class SplashScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            isShowLogin_Register:false
        };
        this.timeOutSplash = null;
        this.token_user = null;
    }
    async componentDidMount(){
        this.token_user = await getFromLocal('Token_User');
        await this.props.loginActions.updateToken(this.token_user);
        console.log("datalogin",this.token_user);
        this.props.tripActions.getListTrip(2);
    }
    componentWillUnmount(){
        clearTimeout(this.timeOutSplash)
    }
    handelRender(){
        console.log("this.token_user",this.token_user);
        if(this.token_user !== null){
            this.props.navigation.navigate('TabBar');
        }else{
             this.setState({
                isShowLogin_Register:true
            },()=>clearTimeout(this.timeOutSplash))
        }
    }
    renderLogin_Register(){
        if(!this.state.isShowLogin_Register)
            return null;
        return(
            <View style={styles.container_splash}>
                <Swiper
                    dot={<View style={{
                        backgroundColor: global.imgBackgroundOrange,
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        marginLeft: 8,
                        marginRight: 8
                    }} />}
                    activeDot={<View style={{
                        backgroundColor: '#ffff',
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        marginLeft: 8,
                        marginRight: 8,
                    }} />}
                    //autoplay={!__DEV__ ? true : false}
                    loop={true}
                    autoplay={true}
                    index={1}
                    autoplayTimeout={4}

                >
                    <ImageBackground
                        style={styles.slide}
                        source={image.img_bg_5}
                    >
                        <View style={styles.view_image}>
                            <Text style={styles.text_noidung}>Không phải ai lang thang cũng là đi lạc.</Text>
                            <Text style={styles.text_tieude}>"J. R. R. Tolkien"</Text>
                        </View>
                    </ImageBackground>
                    <ImageBackground
                        style={styles.slide}
                        source={image.img_bg_3}
                    >
                        <View style={styles.view_image}>
                            <Text style={styles.text_noidung}>Mỗi ngày là một cuộc hành trình, và cuộc hành trình bản thân nó chính là nhà!</Text>
                            <Text style={styles.text_tieude} >"Matsuo Basho"</Text>
                        </View>
                    </ImageBackground>

                    <ImageBackground
                        style={styles.slide}
                        source={image.img_bg_4}
                    >
                        <View style={styles.view_image}>
                            <Text style={styles.text_noidung}>Thế giới là một cuốn sách, và ai không đi chỉ đọc được một trang</Text>
                            <Text style={styles.text_tieude}>"St. Augustine"</Text>
                        </View>
                    </ImageBackground>
                </Swiper>
                <View style={{
                    top:0,
                    position:'absolute',
                    height:250,
                    width:width,
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                    <View style={styles.btn_login_register}>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('Login',{isLogin:true})}
                            style={{
                                height:50,
                                width:150,
                                justifyContent:'center',
                                alignItems:'center',
                                borderRadius:30,
                                backgroundColor:global.backgroudText
                            }}>
                            <Text style={{color:global.colorFF,fontSize:global.sizeP16,fontWeight:global.fontWeightBold}}>
                                Đăng Nhập
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('Login',{isLogin:false})}
                            style={{
                                height:50,
                                width:150,
                                justifyContent:'center',
                                alignItems:'center',
                                borderRadius:30,
                                backgroundColor:global.backgroudText
                            }}>
                            <Text style={{color:global.colorFF,fontSize:global.sizeP16,fontWeight:global.fontWeightBold}}>
                                Đăng Ký
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btn_login_facebook}>
                        <Image
                            source={image.ic_google}
                        />
                        <Text style={{
                            color:global.colorFb,
                            fontSize:global.sizeP16,
                            fontWeight: global.fontWeightBold,
                            marginLeft:10,
                        }}>
                            Đăng nhập bằng Google
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn_login_facebook}>
                        <Image
                            source={image.ic_facebook}
                        />
                        <Text style={{
                            color:global.orangeColor,
                            fontSize:global.sizeP16,
                            fontWeight: global.fontWeightBold,
                            marginLeft:10,
                        }}>
                            Đăng nhập bằng Facebook
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.logo}>
                    <Image
                        style={{width:280,height:80}}
                        source={image.logo}
                        resizeMethod={'resize'}
                    />
                </View>
            </View>
        );
    }
    renderSplash(){
        if(this.state.isShowLogin_Register)
            return null;
        return(
            <ImageBackground source={image.backgroundImage} style={styleGlobal.container}>
                <View style={styles.imgBackground_splash}>
                    <View style={styles.logo1}>
                        <Image
                            style={{width:280,height:80}}
                            source={image.logo}
                            resizeMethod={'resize'}
                        />
                    </View>
                </View>
            </ImageBackground>
        );
    }
    handleTimeout(){
        this.timeOutSplash = setTimeout(()=>{
            this.handelRender()
        },2000)
    }
    render() {
        return(
            <View style={styles.container_splash}>
                {this.renderSplash()}
                {
                  this.handleTimeout()
                }
                {this.renderLogin_Register()}
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        dataTrip : state.dataTrip,
        login: state.loginReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        tripActions:bindActionCreators(tripActions,dispatch),
        loginActions: bindActionCreators(loginActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SplashScreen);
