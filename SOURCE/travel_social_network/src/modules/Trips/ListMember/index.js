
import React, { Component } from 'react';
import {
    Alert, AsyncStorage,
    Dimensions,
    ImageBackground, Text,
    View
} from 'react-native';
import Header from "../../../modules/Header";
import global from "../../../Styles/global";
import IconButton from "../../../Components/Button/IconButton";
import TextComponent from '../../../Components/Text/Text';
import image from "../../../themes/Images";
import styleGlobal from "../../../Styles/styles";
import RoundAvatar from "../../../Components/Avatar/RoundAvatar";
import TripListView from "../TripListView";
import {getFromLocal} from "../../../services/storage";
import * as api from "../../../api/Api";
const {height, width} = Dimensions.get('window');
export default class ListMemberInTrip extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataMemberInTrip : []
        };
        this.idTrip = null;
        this.userInfoTripDetail = {};
        this.userInfo = {};
    }
    componentWillMount(){
        const {params} = this.props.navigation.state;
        this.setState({
            dataMemberInTrip:params.dataMemberInTrip
        });
        this.idTrip = params.idTrip;
        this.userInfoTripDetail = params.userInfoTripDetail;
        this.userInfo = params.userInfo;
        console.log("this.userInfo",this.userInfoTripDetail, this.userInfo);
    }

    handleDeleteMember(item){
        console.log("member",item);
        Alert.alert(
            "Thông báo",
            "Bạn muốn xoá thành viên này?",
            [
                { text: 'Không', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Có', onPress: async () => {
                        let arr = this.state.dataMemberInTrip;
                        let index = arr.indexOf(item);
                        if (index > -1) {
                            arr.splice(index, 1);
                        }
                        this.setState({
                            dataMemberInTrip:arr
                        });
                        let option ={
                            "idUser": item.idUser,
                            "idTrip": item.idTrip,
                            "status": 0
                        };
                        if(await getFromLocal('Token_User') !== null){
                            api.updateStatusMemberInTrip(await getFromLocal('Token_User'),option).then((res)=>{
                                if(res && res.status){
                                    this.setState({
                                        dataMemberWaiting:res.data
                                    })
                                }
                                console.log("res data  member waiting ",res.data);

                            })
                                .catch((err)=>{
                                    console.log("err  member waiting",err.response);
                                    if(err.response.status === 404){
                                        Alert.alert(
                                            "Thông báo",
                                            err.response.data.message,
                                            [
                                                {
                                                    text: 'OK', onPress: () => {
                                                        this.props.navigation.goBack();
                                                    }
                                                },
                                            ]
                                        );
                                    }
                                });
                        }
                    }
                },
            ])

    }
    render() {
        return (
            <ImageBackground source={image.backgroundImage} style={styleGlobal.container}>
                <View style={styleGlobal.imgBackground}>
                    <Header
                        customHeaderStyle={{backgroundColor: global.yellow,marginBottom: 10,}}
                        leftHeader={<IconButton nameIcon='ios-arrow-back'
                                                iconStyle={{fontSize: 35, color: global.black}}
                                                onClick={()=>this.props.navigation.goBack()}
                        />}
                        body={<TextComponent
                            text='Danh sách thành viên'
                            color={global.black}
                            size={global.sizeP20}
                            bold={global.fontWeightDark}/>}
                        rightHeader={<TextComponent text={''}/>}
                    />
                    <TripListView onScroll={this._onScroll} data={this.state.dataMemberInTrip}
                                  renderItem={({item,index})=>
                                      <View style={{
                                          height: 100,
                                          alignItems: 'flex-start',
                                          backgroundColor:global.colorFF,
                                          flexDirection: 'row',
                                          display: 'flex',
                                          borderRadius:10,
                                          marginRight: 10,
                                          marginLeft: 10,
                                          marginBottom:5,
                                      }}>
                                          <View style={{
                                              width:100,
                                              height:100,
                                              justifyContent: 'center',

                                          }}>
                                              <RoundAvatar
                                                  onPress={()=>{}}
                                                  size={'x-small'}
                                                  icSrc={'https://anh.24h.com.vn//upload/1-2015/images/2015-02-12/1423706954-anhgirlxinh.jpg'}/>
                                          </View>
                                          <View style={{
                                              width:150,height:100,paddingLeft: 10,paddingTop: 15
                                          }}>
                                              <Text style={{paddingBottom: 5,fontSize:18}}>
                                                  { item.firstName + ' '+ item.middleName  + ' '+  item.lastName}
                                              </Text>
                                              <Text style={{fontSize:18}}>
                                                  {item.phone}
                                              </Text>
                                          </View>
                                          <IconButton
                                              nameIcon={'ios-phone-portrait'}
                                              btnStyle={{width:30,height:100,backgroundColor:global.yellowColor}}
                                              iconStyle={{fontSize:30,color:global.colorFF}}
                                              onClick={()=>{}}
                                          />
                                          {
                                              this.userInfoTripDetail.id === this.userInfo.id && this.userInfoTripDetail.id !== item.idUser
                                              ?
                                                  <View style={{alignItems:'center',height:100,justifyContent:'center',marginLeft:10}}>
                                                      <IconButton
                                                          nameIcon={'ios-close-circle-outline'}
                                                          iconStyle={{color:global.colorRed,
                                                              fontSize: 40,}}
                                                          btnStyle={{
                                                              minWidth:50,
                                                              height:50,
                                                              flexDirection: 'row',
                                                              borderRadius:25,}}
                                                          onClick={()=>this.handleDeleteMember(item)}
                                                      />
                                                  </View>
                                                  :
                                                  <View style={{alignItems:'center',height:100,justifyContent:'center',marginLeft:10}}>
                                                      <IconButton
                                                          nameIcon={this.userInfoTripDetail.id === item.idUser ? 'ios-medal' : 'ios-contact'}
                                                          iconStyle={{color:global.orangeColor,
                                                          fontSize: 40,}}
                                                          btnStyle={{
                                                          minWidth:50,
                                                          height:50,
                                                          flexDirection: 'row',
                                                          borderRadius:25,}}
                                                      onClick={()=>{}}
                                                      />
                                                </View>
                                          }

                                      </View>
                                  }
                    />
                </View>
            </ImageBackground>
        );
    }
}

