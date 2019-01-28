
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
import {getFromLocal} from "../../../services/storage";
import * as api from "../../../api/Api";
import TripListView from "../TripListView";
const {height, width} = Dimensions.get('window');
export default class ListMemberWait extends Component {

    constructor(props){
        super(props);
        this.state={
            dataMemberWaiting:[],
        };
        this.idTripWaiting = null;
    }
    async componentWillMount(){
        const {params} = this.props.navigation.state;
        this.idTripWaiting = params.idTripWaiting;
        if(await getFromLocal('Token_User') !== null){
            api.getListMemberWaitingInTrip(await getFromLocal('Token_User'),this.idTripWaiting,0).then((res)=>{
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
    handleAccept(item){
        Alert.alert(
            "Thông báo",
            "Chấp nhận thành viên này?",
            [
                { text: 'Không', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Có', onPress: async () => {
                        console.log("item",item);
                        let arr = this.state.dataMemberWaiting;
                        let index = arr.indexOf(item);
                        if (index > -1) {
                            arr.splice(index, 1);
                        }
                        this.setState({
                            dataMemberWaiting:arr
                        });
                        let option ={
                            "idUser": item.idUser,
                            "idTrip": item.idTrip,
                            "status": 1
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
    handleRefuse(item){
        Alert.alert(
            "Thông báo",
            "Huỷ yêu cầu thành viên này?",
            [
                { text: 'Không', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Có', onPress: async () => {
                        console.log("item",item);
                        let arr = this.state.dataMemberWaiting;
                        let index = arr.indexOf(item);
                        if (index > -1) {
                            arr.splice(index, 1);
                        }
                        this.setState({
                            dataMemberWaiting:arr
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
                            text='Yêu cầu tham gia'
                            color={global.black}
                            size={global.sizeP20}
                            bold={global.fontWeightDark}/>}
                        rightHeader={
                            <IconButton nameIcon='ios-refresh' iconStyle={{fontSize: 20, color: global.black}}
                                        onClick={() => {}}/>}
                    />
                    {
                        this.state.dataMemberWaiting.length > 0
                        ?
                            <TripListView onScroll={this._onScroll} data={this.state.dataMemberWaiting}
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
                                                  <View style={{alignItems:'center',height:100,justifyContent:'center',marginLeft:10}}>
                                                      <IconButton
                                                          nameIcon={'ios-checkmark-circle-outline'}
                                                          iconStyle={{color:global.primaryColor,
                                                              fontSize: 40,}}
                                                          btnStyle={{
                                                              width:50,
                                                              height:50,
                                                              flexDirection: 'row',
                                                              borderRadius:25,}}
                                                          onClick={()=>this.handleAccept(item)}
                                                      />
                                                      <IconButton
                                                          nameIcon={'ios-close-circle-outline'}
                                                          iconStyle={{color:global.colorRed,
                                                              fontSize: 40,}}
                                                          btnStyle={{
                                                              minWidth:50,
                                                              height:50,
                                                              flexDirection: 'row',
                                                              borderRadius:25,}}
                                                          onClick={()=>this.handleRefuse(item)}
                                                      />
                                                  </View>
                                              </View>
                                          }
                            />
                            :
                            <View style={{width:width,height:50,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:global.colorFF,fontSize:global.sizeP18}}>
                                    Không có dữ liệu
                                </Text>
                            </View>
                    }

                </View>
            </ImageBackground>
        );
    }
}

