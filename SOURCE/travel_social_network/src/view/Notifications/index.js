

import React, { Component } from 'react';
import {
    ImageBackground, Text,
    View, TouchableOpacity, Dimensions
} from 'react-native';
import Header from "../../modules/Header";
import global from "../../Styles/global";
import IconButton from "../../Components/Button/IconButton";
import TextComponent from '../../Components/Text/Text';
import image from "../../themes/Images";
import styleGlobal from "../../Styles/styles";
import RoundAvatar from "../../Components/Avatar/RoundAvatar";
import styles from "../../modules/Trips/TripListItem/styles";
import * as api from "../../api/Api";
import {getFromLocal} from "../../services/storage";
import urls from "../../api/urls";
import TripListView from "../../modules/Trips/TripListView";
const {height, width} = Dimensions.get('window');
export default class Notification extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataCountMemberWaiting :[],
        };
        this.handleGetListNotification = this.handleGetListNotification.bind(this);
    }
    async componentWillMount(){
        if(await getFromLocal('Token_User') !== null){
            api.getCountListMemberInTrip(await getFromLocal('Token_User')).then((res)=>{
                if(res && res.status){
                    this.setState({
                        dataCountMemberWaiting:res.data
                    })
                }
                console.log("res data count member waiting ",res.data);

            })
                .catch((err)=>{
                    console.log("err count member waiting",err.response);

                });
        }

    }
    async handleGetListNotification(){
        if(await getFromLocal('Token_User') !== null){
            api.getCountListMemberInTrip(await getFromLocal('Token_User')).then((res)=>{
                if(res && res.status){
                    this.setState({
                        dataCountMemberWaiting:res.data
                    })
                }
                console.log("res data count member waiting ",res.data);

            })
                .catch((err)=>{
                    console.log("err count member waiting",err.response);

                });
        }
    }
    handleMemberWaiting(item){
        this.props.navigation.navigate("ListMemberWait",{
            idTripWaiting:item.idTrip
        });
    }
  render() {
    return (
        <ImageBackground source={image.backgroundImage} style={styleGlobal.container}>
            <View style={styleGlobal.imgBackground}>
            <Header
                customHeaderStyle={{backgroundColor: global.yellow,marginBottom:5}}
                leftHeader={<TextComponent text={''}/>}
                body={<TextComponent
                    text='Notification'
                    color={global.black}
                    size={global.sizeP20}
                    bold={global.fontWeightDark}/>}
                rightHeader={
                    <IconButton nameIcon='ios-refresh' iconStyle={{fontSize: 20, color: global.black}}
                                onClick={this.handleGetListNotification}/>}
            />
                {this.state.dataCountMemberWaiting.length > 0
                    ?
                    <TripListView onScroll={this._onScroll} data={this.state.dataCountMemberWaiting}
                                  renderItem={({item,index})=>
                                      <TouchableOpacity style={{
                                          height: 100,
                                          alignItems: 'flex-start',
                                          backgroundColor:global.colorF3,
                                          flexDirection: 'row',
                                          display: 'flex',
                                          borderRadius:10,
                                          marginRight: 10,
                                          marginLeft: 10,
                                          marginBottom:5,
                                      }}
                                      onPress={()=>this.handleMemberWaiting(item)}
                                      >
                                          <View style={{
                                              width:100,
                                              minHeight:100,
                                              justifyContent: 'center',
                                              borderRightColor:global.grayLineColor,
                                              borderRightWidth: 1,

                                          }}>
                                              <RoundAvatar
                                                  onPress={()=>{}}
                                                  size={'x-small'}
                                                  icSrc={item.img!==null ? (urls.ROOT + item.img.slice(1)) : 'https://anh.24h.com.vn/upload/4-2013/images/2013-10-18/1382066384-sapa.jpg'}/>
                                          </View>
                                          <View style={{
                                              minWidth:250,minHeight:100,paddingLeft: 10,paddingTop: 15
                                          }}>
                                              <View style={{ flexDirection:'row',
                                                  display:'flex',
                                                  justifyContent: 'flex-start',
                                                  alignItems: 'center',
                                              }}>
                                                  <IconButton nameIcon='ios-bookmark' iconStyle={{fontSize:25,
                                                      color: global.orangeColor,
                                                      marginRight:5,}}/>
                                                  <Text
                                                      style={{ fontSize: 20,
                                                          color: global.black,flex: 1,}}
                                                  >
                                                      {item.tittle}
                                                  </Text>
                                              </View>
                                              <View style={{ flexDirection:'row',
                                                  display:'flex',
                                                  justifyContent: 'flex-start',
                                                  alignItems: 'center',
                                                  marginTop: 10
                                              }}>
                                                  <IconButton nameIcon='ios-pulse' iconStyle={{fontSize:25,
                                                      color: global.lightGreen,
                                                      marginRight:5,}}/>
                                                  <TextComponent
                                                      text={'Đợi xét duyệt:' + item.count}
                                                      style={{ fontSize: 20,
                                                          color: global.black,}}
                                                  />
                                              </View>
                                          </View>
                                      </TouchableOpacity>
                                  }
                    />
                    :
                    <View style={{width:width,height:50,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:global.colorFF,fontSize:global.sizeP18}}>
                            Không có thông báo
                        </Text>
                    </View>

                }

            </View>
        </ImageBackground>
    );
  }
}

