
import React, { Component } from 'react';
import {
    ImageBackground,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Keyboard, Dimensions, Image, Text, ScrollView, TextInput
} from 'react-native';
import image from "../../themes/Images";
import styleGlobal from "../../Styles/styles";
import global from "../../Styles/global";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import * as loginActions from "../../action/loginAction";
import styles from "./styles";
import IconButton from "../../Components/Button/IconButton";
import TextInputItems from "../../Components/Items/TextInputItem";
import ButtonWithIcon from "../../Components/Button/ButtonWithIcon";
import * as tripActions from "../../action/tripAction";
import * as registerUserAction from "../../action/registerUserAction";
import TextComponent from "../../Components/Text/Text";
const {height, width} = Dimensions.get('window');
class Login extends Component {

  constructor(props){
      super(props);
      this.state = {
          status:'init',
          username:'0001@gmail.com',
          password:'123',
          loading: false,
          isShowLogin:true,
          warningNameUser:false,
          warningPhoneNumber:false,
          warningEmailRegister:false,
          warningPassRegister:false,
          warningPassRegisterAgain:false,
          warningEmailLogin:false,
          warningPassLogin:false,
          userNameRegister:'',
          passRegister:'',
          passRegisterAgain:'',
          phoneNumber:'',
          emailRegister:'',

      };
      this.login = this.login.bind(this);
      this.handleShowRegister = this.handleShowRegister.bind(this);
      this.handleGoback = this.handleGoback.bind(this);
      this.handleShowLogin = this.handleShowLogin.bind(this);
      this.handleNextHome = this.handleNextHome.bind(this);
  }
  componentWillMount(){
      let isLogin = this.props.navigation.getParam('isLogin');
      if(isLogin){
          this.setState({
              isShowLogin:true,
          })
      }else {
          this.setState({
              isShowLogin:false,
          })
      }
  }
  //login
    renderWarningLogin(){
        const {username, password} = this.state;
        if(username === ''){
            this.setState({
                warningEmailLogin:true,
            })
        }else{
            this.setState({
                warningEmailLogin:false,
            })
        }
        if(password === ''){
            this.setState({
                warningPassLogin:true,
            })
        }else{
            this.setState({
                warningPassLogin:false,
            })
        }
    }
  login(){
      if(this.state.username.length > 0 && this.state.password.length > 0){
         this.props.loginActions.login(this.state.username, this.state.password);
         this.setState({
             loading:true,
         })
     }else{
          this.renderWarningLogin();
      }
  }
  //login

  //register
  renderWarningRegister(){
          const { userNameRegister, passRegister, passRegisterAgain, phoneNumber, emailRegister} = this.state;
          if(userNameRegister === ''){
              this.setState({
                  warningNameUser:true,
              })
          }else{
              this.setState({
                  warningNameUser:false,
              })
          }

        if(phoneNumber === ''){
            this.setState({
                warningPhoneNumber:true,
            })
        }else{
            this.setState({
                warningPhoneNumber:false,
            })
        }

        if(emailRegister === ''){
            this.setState({
                warningEmailRegister:true,
            })
        }else{
            this.setState({
                warningEmailRegister:false,
            })
        }

        if(passRegister === ''){
            this.setState({
                warningPassRegister:true,
            })
        }else{
            this.setState({
                warningPassRegister:false,
            })
        }

        if(passRegisterAgain === ''){
            this.setState({
                warningPassRegisterAgain:true,
            })
        }else{
            this.setState({
                warningPassRegisterAgain:false,
            })
        }
    }
    checkRegisterPassword(){
        const {passRegister, passRegisterAgain} = this.state;
        if(passRegister !== passRegisterAgain){
            this.setState({
                warningPassRegisterAgain:true,
            })
        }else{
            this.setState({
                warningPassRegisterAgain:false,
            })
        }
    }
    register(){
        const { userNameRegister, passRegister, passRegisterAgain, phoneNumber, emailRegister} = this.state;
        if(userNameRegister !== '' && passRegister!=='' && passRegisterAgain !== ''&&
            passRegister === passRegisterAgain && emailRegister !== '' && phoneNumber !== ''
        ){
            let option = {
                "phone": phoneNumber.toString(),
                "email": emailRegister.toString(),
                "password": passRegister.toString(),
                "firstName": userNameRegister.toString(),
                "lastName": "",
                "middleName": ""
            };
            this.props.registerUserAction.registerUser(option);
            this.setState({
                loading:true,
            })
        }else{
            this.renderWarningRegister();
            this.checkRegisterPassword();
        }

    }
    //register
    componentWillReceiveProps(nextProps) {
        if (nextProps.login && nextProps.login.isLogin !== this.props.login.isLogin && nextProps.login.isLogin) {
            this.setState({errorMsg: '', loading:  nextProps.login.fetching}, () => {
                this.props.navigation.navigate('TabBar');
            });
            Keyboard.dismiss();
        }
        console.log("Register",this.props.register,nextProps.register);
        if(nextProps.register && nextProps.register.data.Status === "Created"){
            this.setState({
                loading:  nextProps.register.fetching,
                isShowLogin:true,
                username:this.state.emailRegister,
                password:this.state.passRegister,
            });
        }
        if(nextProps.tripReducer && nextProps.tripReducer.dataTrip.length > 0){
            this.setState({
                loading:nextProps.tripReducer.fetching
            })
        }
    }
    handleShowRegister(){
      this.setState({
          isShowLogin:false,
      })
    }
    handleShowLogin(){
        this.setState({
            isShowLogin:true,
        });
    }
    handleGoback(){
        this.setState({
            isShowLogin:true,
        });
        this.props.navigation.goBack();
    }
    renderLogin(){
      return(
          <View style={{
              width:width-50,
              backgroundColor:global.imgBackground,
              borderRadius:6,
          }}>
              <TextInputItems
                  onChangeText={(text) => this.setState({username: text})}
                  nameIcon={'ios-mail'}
                  namePlaceholder={'Email'}
                  styleIcon={{color:global.colorBb,fontSize:global.sizeP18}}
                  txtStyle={{color:global.colorFF}}
                  styleDevider={{backgroundColor:global.colorFF}}
                  txtContent={this.state.username}
                  warning={this.state.warningEmailLogin}
              />
              <TextInputItems
                  onChangeText={(text) => this.setState({password: text})}
                  nameIcon={'ios-key'}
                  namePlaceholder={'Mật khẩu'}
                  styleIcon={{color:global.colorBb,fontSize:global.sizeP18}}
                  txtStyle={{color:global.colorFF}}
                  styleDevider={{backgroundColor:global.colorFF}}
                  txtContent={this.state.password}
                  secureTextEntry={true}
                  warning={this.state.warningPassLogin}
              />
              <TouchableOpacity style={styles.btn_login_email} onPress={()=>this.login()}>
                  <Text style={{
                      color:global.colorFF,
                      fontSize:global.sizeP18,
                      fontWeight: global.fontWeightBold,
                      marginLeft:10,
                  }}>
                      Đăng Nhập
                  </Text>
              </TouchableOpacity>
              <View style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems:'center',
                  height:50,
              }}>
                  <ButtonWithIcon
                      styleText={{fontSize:global.sizeP14}}
                      style={{backgroundColor:'transparent',marginLeft:5}}
                      buttonText={'Quên mật khẩu'}/>
                  <ButtonWithIcon
                      onClick={this.handleShowRegister}
                      styleText={{fontSize:global.sizeP14}}
                      style={{backgroundColor:'transparent',marginRight: 5}}
                      buttonText={'Đăng ký'}/>
              </View>
          </View>
      );
    }

    renderRegister(){
      return(
          <View style={{
              width:width-50,
              backgroundColor:global.imgBackground,
              borderRadius:6,
          }}>
              <TextInputItems
                  onChangeText={(text) => this.setState({userNameRegister: text})}
                  warning={this.state.warningNameUser}
                  nameIcon={'ios-person'}
                  namePlaceholder={'Tên hiển thị'}
                  styleIcon={{color:global.colorBb,fontSize:global.sizeP18}}
                  txtStyle={{color:global.colorFF}}
                  styleDevider={{backgroundColor:global.colorFF}}
                  txtContent={this.state.userNameRegister}
              />
              <TextInputItems
                  warning={this.state.warningPhoneNumber}
                  nameIcon={'ios-phone-portrait'}
                  namePlaceholder={'Số điện thoại'}
                  styleIcon={{color:global.colorBb,fontSize:global.sizeP18}}
                  txtStyle={{color:global.colorFF}}
                  styleDevider={{backgroundColor:global.colorFF}}
                  txtContent={this.state.phoneNumber}
                  onChangeText={(text) => this.setState({phoneNumber: text})}
                  isNumber={true}
              />
              <TextInputItems
                  warning={this.state.warningEmailRegister}
                  nameIcon={'ios-mail'}
                  namePlaceholder={'Email'}
                  styleIcon={{color:global.colorBb,fontSize:global.sizeP18}}
                  txtStyle={{color:global.colorFF}}
                  styleDevider={{backgroundColor:global.colorFF}}
                  txtContent={this.state.emailRegister}
                  onChangeText={(text) => this.setState({emailRegister: text})}
              />
              <TextInputItems
                  warning={this.state.warningPassRegister}
                  nameIcon={'ios-key'}
                  namePlaceholder={'Mật khẩu'}
                  styleIcon={{color:global.colorBb,fontSize:global.sizeP18}}
                  txtStyle={{color:global.colorFF}}
                  styleDevider={{backgroundColor:global.colorFF}}
                  txtContent={this.state.passRegister}
                  onChangeText={(text) => this.setState({passRegister: text})}
                  secureTextEntry={true}
              />
              <TextInputItems
                  warning={this.state.warningPassRegisterAgain}
                  nameIcon={'ios-lock'}
                  namePlaceholder={'Nhập lại ật khẩu'}
                  styleIcon={{color:global.colorBb,fontSize:global.sizeP18}}
                  txtStyle={{color:global.colorFF}}
                  styleDevider={{backgroundColor:global.colorFF}}
                  txtContent={this.state.passRegisterAgain}
                  onChangeText={(text) => this.setState({passRegisterAgain: text})}
                  secureTextEntry={true}
              />

              <TouchableOpacity style={styles.btn_login_email} onPress={this.register.bind(this)}>
                  <Text style={{
                      color:global.colorFF,
                      fontSize:global.sizeP18,
                      fontWeight: global.fontWeightBold,
                      marginLeft:10,
                  }}>
                      Đăng Ký
                  </Text>
              </TouchableOpacity>
              <View style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems:'center',
                  height:50,
              }}>
                  <ButtonWithIcon
                      styleText={{fontSize:global.sizeP14}}
                      style={{backgroundColor:'transparent',marginLeft:5}}
                      buttonText={'Điều khoản dịch vụ'}/>
                  <ButtonWithIcon
                      onClick={this.handleShowLogin}
                      styleText={{fontSize:global.sizeP14}}
                      style={{backgroundColor:'transparent',marginRight: 5}}
                      buttonText={'Đăng nhập'}/>
              </View>
          </View>
      );
    }
    handleNextHome(){
      const {tripReducer} = this.props;
      this.setState({
          loading:true,
      });
      console.log("tripReducer.dataTrip",tripReducer.dataTrip);
      if(tripReducer.dataTrip.length > 0){
          this.props.navigation.navigate('TabBar')
      }
    }
  render() {
    return (
        <ImageBackground source={image.img_bg_1} style={styleGlobal.container}>
            <View style={[styles.container_login]}>
                {this.state.loading
                    ?
                    <ActivityIndicator color={'red'} size="small"/>
                    :
                    <View style={{
                        position:'absolute',
                        height:height,
                        top:0,
                        alignItems:'center',
                        width:width - 30,
                    }}>
                        <View style={styles.btnBack_view}>
                            <IconButton
                                nameIcon={'ios-arrow-round-back'}
                                iconStyle={{color:global.colorFF,fontSize:40}}
                                btnStyle={{width:35,height:35,}}
                                onClick={this.handleGoback}
                            />
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
                        {this.state.isShowLogin
                            ?
                           this.renderLogin()
                            :
                           this.renderRegister()
                        }
                        <View style={styles.nextHome}>
                            <TouchableOpacity style={styles.btn_nextHome} onPress={this.handleNextHome}>
                                <Text style={styles.txt_nextHome}>
                                    Vào Home
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        </ImageBackground>
    );
  }
}


function mapStateToProps(state, ownProps) {
    return {
        login: state.loginReducer,
        error: state.loginReducer.error,
        register:state.registerUserReducer,
        tripReducer : state.tripReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
        tripActions:bindActionCreators(tripActions,dispatch),
        registerUserAction:bindActionCreators(registerUserAction,dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);