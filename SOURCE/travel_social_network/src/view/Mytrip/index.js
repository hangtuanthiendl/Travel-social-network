
import React, { Component } from 'react';
import {
    ImageBackground,
    View
} from 'react-native';
import Header from "../../modules/Header";
import global from "../../Styles/global";
import IconButton from "../../Components/Button/IconButton";
import TextComponent from '../../Components/Text/Text';
import image from "../../themes/Images";
import styleGlobal from "../../Styles/styles";
import TripListItem from "../../modules/Trips/TripListItem";
import urls from "../../api/urls";
import TripListView from "../../modules/Trips/TripListView";
import {bindActionCreators} from "redux";
import * as loginActions from "../../action/loginAction";
import * as placeAction from "../../action/placeAction";
import * as tripActions from "../../action/tripAction";
import * as userInfoAction from "../../action/userAction";
import connect from "react-redux/es/connect/connect";
import {getFromLocal} from "../../services/storage";
class MyTrip extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataMyTrip : this.props.dataTrips.dataMyTrip
        };
        this.handleTripDetail = this.handleTripDetail.bind(this);
    }
   async componentWillMount(){
        console.log("da ta my trip",this.props.dataTrips);
        if(await getFromLocal('Token_User') === null){
            this.props.navigation.navigate('Login');
        }
    }
    async handleTripDetail(item){
        this.props.navigation.navigate('Details',{
            dataDetail : item,
        })
    }
      render() {
        return (
            <ImageBackground source={image.backgroundImage} style={styleGlobal.container}>
                <View style={styleGlobal.imgBackground}>
                <Header
                    customHeaderStyle={{backgroundColor: global.yellow}}
                    leftHeader={<TextComponent text={''}/>}
                    body={<TextComponent
                        text='My Trip'
                        color={global.black}
                        size={global.sizeP20}
                        bold={global.fontWeightDark}/>}
                    rightHeader={
                        <IconButton nameIcon='ios-refresh' iconStyle={{fontSize: 20, color: global.black}}
                                    onClick={() => alert("TrungDo")}/>}
                />
                    <TripListView onScroll={this._onScroll} data={this.state.dataMyTrip}
                                  renderItem={({item,index})=>
                                      <TripListItem
                                          dataDetail={item}
                                          key={index}
                                          index={index}
                                          id={item.id}
                                          title={item.tittle}
                                          numberParticipant={item.numberParticipant}
                                          quantity={item.quantity}
                                          status={item.status}
                                          numberStar={item.numberStar}
                                          timeStart={item.timeStart}
                                          timeEnd={item.timeEnd}
                                          locationStart={item.placeStart}
                                          namePersonCreate={item.namePersonCreate}
                                          imgBackground={item.imgBackground!==null ? (urls.ROOT + item.imgBackground.slice(1)) : 'https://anh.24h.com.vn/upload/4-2013/images/2013-10-18/1382066384-sapa.jpg'}
                                          imgAvatar={item.imgAvatar}
                                          onClick={this.handleTripDetail}
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
)(MyTrip);

