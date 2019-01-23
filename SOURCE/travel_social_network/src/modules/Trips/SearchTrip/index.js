
import React, { Component } from 'react';
import {
    Dimensions,
    ImageBackground,
    View,
    TouchableOpacity,
    Text, TextInput
} from 'react-native';
import styles from './styles'
import Header from "../../Header";
import global from "../../../Styles/global";
import IconButton from "../../../Components/Button/IconButton";
import TextComponent from "../../../Components/Text/Text";
import image from "../../../themes/Images";
import styleGlobal from "../../../Styles/styles";
import TripListView from "../TripListView";
import CardHistorySearch from "../CardHistorySearch";
import _ from 'lodash.filter';
import {getFromLocal, setToLocal} from "../../../services/storage";
import TripListItem from "../TripListItem";
import urls from "../../../api/urls";
const {
    height,
    width
} = Dimensions.get('window');
class SearchTrip extends Component {
    constructor(props){
        super(props);
        this.state = {
            destination:'',
            showResult:false,
            arrKeySearch:["Thung lũng tình yêu ","Nha trang ","Đồi cát bình thuận"],
            dataTripResult:[],

        };
        this.dataTrips=[];
        this.onChangeDestination = this.onChangeDestination.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
        this.actionDelete = this.actionDelete.bind(this);
        this.handleDeleteHistory = this.handleDeleteHistory.bind(this);
    }
     async componentWillMount(){
        const {params} = this.props.navigation.state;
        this.dataTrips.push(params.dataTrips);
        console.log("params Search",this.dataTrips);
        // if(await getFromLocal('History_Search') !== null){
        //     let arrKeySearch = await getFromLocal('History_Search');
        //     this.setState({
        //         arrKeySearch
        //     });
        // }
    }
    onChangeDestination(destination){
        let arr = [];
        if(destination !== ''){
            this.dataTrips[0].map((item)=>{
                if(item.tittle.indexOf(destination)!==-1){
                    arr.push(item)
                }
            });

        }
        console.log("TrungArr",arr);
        this.setState({
            destination,
            dataTripResult:arr
        })
    }
    handleSearch(){
        this.state.arrKeySearch.push(this.state.destination);
        console.log("this.state.arrKeySearch",this.state.arrKeySearch);
    }
    async handleGoBack(){
        await setToLocal('History_Search', this.state.arrKeySearch);
        this.props.navigation.goBack();
    }
    actionDelete(item){
        let arr = this.state.arrKeySearch;
        let index = arr.indexOf(item);
        if (index > -1) {
            arr.splice(index, 1);
        }
        this.setState({
            arrKeySearch:arr
        });
    }
    handleDeleteHistory(){
        this.setState({
            arrKeySearch:[]
        })
    }
    render() {
        console.log("this.datatrips",this.dataTrips);
        return (
            <ImageBackground source={image.backgroundImage} style={styleGlobal.container}>
                <View style={styles.container_search}>
                    {this.state.destination === ''
                        ?
                        <IconButton nameIcon={"ios-close"}
                                    iconStyle={{fontSize: 35, color: global.colorFF}}
                                    btnStyle={{position: 'absolute',top:10,right:15}}
                                    onClick={this.handleGoBack}/>
                        :
                        <IconButton nameIcon={"ios-search"}
                                    iconStyle={{fontSize: 30, color: global.orange}}
                                    btnStyle={{position: 'absolute',top:10,right:15,}}
                                    onClick={this.handleSearch}/>
                    }

                    <TextInput
                        onChangeText={(destination)=>this.onChangeDestination(destination)}
                        style={styles.txt_search}
                        placeholder={"Tìm kiếm trip"}
                        value={this.state.destination}
                        placeholderTextColor={global.colorB2}
                        autoCapitalize = 'none'
                        underlineColorAndroid="transparent"
                    />
                    {
                        !this.state.showResult && this.state.destination === '' && <View style={styles.row1}>
                            <Text style={{color: global.orangeColor}}>Lịch sử</Text>
                            <TouchableOpacity onPress={this.handleDeleteHistory}>
                                <Text style={{color: global.orangeColor}}>Xóa tất cả</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        this.state.destination === ''
                        ?
                            <View style={{marginTop: 10}}>
                                <TripListView onScroll={this._onScroll} data={this.state.arrKeySearch}
                                              renderItem={({item,index})=>{
                                                  const actionDelete = ()=>this.actionDelete(item);
                                                  return(
                                                      <CardHistorySearch
                                                          nameSearch={item}
                                                          actionDelete={actionDelete}

                                                          //  onClick={onActionClick}
                                                      />
                                                  );
                                              }
                                              }
                                />
                            </View>
                            :
                            <View style={{marginTop: 10,flex: 1}}>
                                <TripListView onScroll={this._onScroll} data={this.state.dataTripResult}
                                              renderItem={({item,index})=>
                                                  <TripListItem
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
                    }
                </View>
            </ImageBackground>
        );
    }
}
export  default  SearchTrip;
