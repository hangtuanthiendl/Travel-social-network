
import React, { Component } from 'react';
import {
    ImageBackground,
    View
} from 'react-native';
import Header from "../../../modules/Header";
import global from "../../../Styles/global";
import IconButton from "../../../Components/Button/IconButton";
import TextComponent from '../../../Components/Text/Text';
import image from "../../../themes/Images";
import styleGlobal from "../../../Styles/styles";
import TripListItem from "../../../modules/Trips/TripListItem";
import urls from "../../../api/urls";
import TripListView from "../../../modules/Trips/TripListView";
import {bindActionCreators} from "redux";
import * as loginActions from "../../../action/loginAction";
import * as placeAction from "../../../action/placeAction";
import * as tripActions from "../../../action/tripAction";
import * as userInfoAction from "../../../action/userAction";
import connect from "react-redux/es/connect/connect";
import {getFromLocal} from "../../../services/storage";
import * as api from "../../../api/Api";
import TripItemHistory from "../TripItemHistory";
class TripHistory extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataMyTrip : []
        };
        this.handleTripDetail = this.handleTripDetail.bind(this);
        this.handleGetListMyTrip = this.handleGetListMyTrip.bind(this);
    }
     componentWillMount(){
        const {params} = this.props.navigation.state;
        console.log("da ta my trip",params.dataTripHistory);
        this.setState({
            dataMyTrip:params.dataTripHistory
        })
    }
    async handleTripDetail(item){
        this.props.navigation.navigate('Details',{
            dataDetail : item,
        })
    }
    async handleGetListMyTrip(){
        if(await getFromLocal('Token_User') !== null){
            api.getAllMyTrip(await getFromLocal('Token_User')).then((res)=>{
                if(res && res.status){
                    console.log("data  get list my trip",res.data);
                    this.setState({
                        dataMyTrip:res.data
                    })
                }
            })
                .catch((err)=>{
                    console.log("err get list my trip",err.response);
                })
        }
    }
    render() {
        return (
            <ImageBackground source={image.backgroundImage} style={styleGlobal.container}>
                <View style={styleGlobal.imgBackground}>
                    <Header
                        customHeaderStyle={{backgroundColor: global.yellow,marginBottom: 10}}
                        leftHeader={<IconButton nameIcon={"ios-close"} iconStyle={{fontSize: 35, color: global.black}}
                                                onClick={() => this.props.navigation.goBack()}/>}
                        body={<TextComponent
                            text='Chuyến đi của tôi'
                            color={global.black}
                            size={global.sizeP20}
                            bold={global.fontWeightDark}/>}
                        rightHeader={
                            <IconButton nameIcon='ios-refresh' iconStyle={{fontSize: 20, color: global.black}}
                                        onClick={this.handleGetListMyTrip}/>}
                    />
                    <TripListView onScroll={this._onScroll} data={this.state.dataMyTrip}
                                  renderItem={({item,index})=>
                                      <TripItemHistory
                                         key={index}
                                         dataTripHistory={item}
                                      />
                                  }
                    />
                </View>
            </ImageBackground>
        );
    }
}
function mapStateToProps(state) {
    return {
        login: state.loginReducer,
        error: state.loginReducer.error,
        userInfo:state.userReducer,
        dataTrips : state.tripReducer,
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
)(TripHistory);

