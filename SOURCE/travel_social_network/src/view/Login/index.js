
import React, { Component } from 'react';
import {
    ImageBackground,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Keyboard,
} from 'react-native';
import image from "../../themes/Images";
import styleGlobal from "../../Styles/styles";
import Text from '../../Components/Text/Text';
import global from "../../Styles/global";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import * as loginActions from "../../action/loginAction";
import styles from "./styles"
class Login extends Component {

  constructor(props){
      super(props);
      this.state = {
          username:'0002@gmail.com',
          password:'123',
          loading: false,
      };
      this.login = this.login.bind(this);
  }
  login(){
     // alert("trungdo")
      this.props.loginActions.login(this.state.username, this.state.password);
      this.setState({
          loading:true,
      })
  }

    componentWillReceiveProps(nextProps) {
        if (nextProps.login && nextProps.login.isLogin !== this.props.login.isLogin && nextProps.login.isLogin) {
            this.setState({errorMsg: '', loading: false}, () => {
                this.props.navigation.navigate('TabBar');
            });
            Keyboard.dismiss();
        }
    }
  render() {
    return (
        <ImageBackground source={image.backgroundImage} style={styleGlobal.container}>
            <View style={[styleGlobal.imgBackground,styles.container_login]}>
                {this.state.loading
                    ?
                    <ActivityIndicator size="small"/>
                    :
                    <TouchableOpacity style={styles.buttonLogin} onPress={this.login}>
                        <Text
                            text='Login'
                            color={global.colorF3}
                            size={global.sizeP20}
                            bold={global.fontWeightDark}/>
                    </TouchableOpacity>
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
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);