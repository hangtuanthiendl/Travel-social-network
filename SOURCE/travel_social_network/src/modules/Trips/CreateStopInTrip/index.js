/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Image,
    ImageBackground, TextInput,
    View, TouchableOpacity, Text, Alert, ScrollView, AsyncStorage
} from 'react-native';
import Header from "../../../modules/Header";
import global from "../../../Styles/global";
import IconButton from "../../../Components/Button/IconButton";
import TextComponent from '../../../Components/Text/Text';
import image from "../../../themes/Images";
import styleGlobal from "../../../Styles/styles";
import styles from "./styles";
import SettingItem from "../../../Components/Items/SetteingItem";
import RoundAvatar from "../../../Components/Avatar/RoundAvatar";
import {bindActionCreators} from "redux";
import * as loginActions from "../../../action/loginAction";
import * as placeAction from "../../../action/placeAction";
import * as tripActions from "../../../action/tripAction";
import * as uploadImageAction from "../../../action/uploadImgaeAction";
import connect from "react-redux/es/connect/connect";
import {Callout, Marker} from "react-native-maps";
import SettingProfileModal from "../../Profile/SettingProfileModal";
import {getFromLocal} from "../../../services/storage";
import _ from "underscore";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import {resetAction} from "../../../constants/actionTypes"
import { NavigationActions } from 'react-navigation'
import * as stopAction from "../../../action/stopAction";
let ImagePicker = require('react-native-image-picker');
const options = {
    title: 'Chọn hình ảnh',
    takePhotoButtonTitle:'Chọn ảnh từ Camera',
    chooseFromLibraryButtonTitle:'Chọn ảnh từ thư viện',
    cancelButtonTitle:'Thoát',
    storageOptions: {
        skipBackup: true,
        path: 'images',
        quality:0.1,
        maxWidth:20,
        maxHeight:20,
    }
};
class CreateStopInTrip extends Component {
    constructor(props){
        super(props);
        this.state = {
            destination:"",
            avatarSource:'',
            region:{
                latitude: 10.8671779,
                longitude: 106.8012878,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            showEditProfile:false,
            predictions:[],
            marker:{
                latitude: 10.8671779,
                longitude:106.8012878,
            },
            titleSetting:'',
            contentTitle:'vd: Thung lũng tình yêu',
            contentDescription:'7h: Ăn uống, 8h: Vui chơi , 10h: xuất phát ...',
            isRenderResultSearch:false,
            data:{},
            pathImage:'',
            timeStart:moment().format('YYYY-MM-DD'),
            loading:false,
        };
        this.changePhotoBgr = this.changePhotoBgr.bind(this);
        this.onChangeDestination = this.onChangeDestination.bind(this);
        this.handleOpenEditProfile = this.handleOpenEditProfile.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.doneEdit = this.doneEdit.bind(this);
        this.handleShowListPlace = this.handleShowListPlace.bind(this);
        this.handleCreatePlace = this.handleCreatePlace.bind(this);
        this.handleCreateStop = this.handleCreateStop.bind(this);
        this.resetState = this.resetState.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
    }
   componentWillMount(){
        console.log(" this.props.dataTripCreateNew", this.props.dataTripCreateNew);
   }
   componentWillReceiveProps(nextProps){
       if(this.props.dataImage.data && nextProps.dataImage.data && !_.isEqual(this.props.dataImage.data,nextProps.dataImage.data )){
           this.setState({
               pathImage:nextProps.dataImage.data.file.path.replace("public","."),
           },()=> console.log("pathImage",this.state.pathImage));
       }
       console.log("this.props.stopReducer",this.props.stopReducer, nextProps.stopReducer);
       if(this.props.stopReducer &&
           nextProps.stopReducer  &&
           !_.isEqual(this.props.stopReducer.msg,nextProps.stopReducer.msg) &&
           !nextProps.stopReducer.fetching && nextProps.stopReducer.msg !== null){
           this.handleFinish();
           this.resetState();
       }
   }
    handleFinish() {
        Alert.alert(
            "Thông báo",
            "Tạo điểm dừng thành công, Bạn có muốn tạo thêm điểm dừng chân không?",
            [
                { text: 'Có', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Không', onPress: () => {
                        this.props.navigation.navigate('TabBar');
                    }
                },
            ])

    }
   resetState(){
        this.setState({
            destination:"",
            avatarSource:'',
            region:{
                latitude: 10.8671779,
                longitude: 106.8012878,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            showEditProfile:false,
            predictions:[],
            marker:{
                latitude: 10.8671779,
                longitude:106.8012878,
            },
            titleSetting:'',
            contentTitle:'vd: Thung lũng tình yêu',
            contentDescription:'7h: Ăn uống, 8h: Vui chơi , 10h: xuất phát ...',
            isRenderResultSearch:false,
            data:{},
            pathImage:'',
            timeStart:moment().format('YYYY-MM-DD'),
            loading:false,
        });
   }
   changePhotoBgr(){
         ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }else {
                const source = { uri: response.uri };
                this.setState({
                    avatarSource: source,
                }, async ()=>this.props.uploadImageAction.updateLoadImage(await getFromLocal('Token_User'),response));
            }
        });
    }

    async onChangeDestination(destination){
        this.setState({
            destination,
            isRenderResultSearch:true,
        });
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${destination}
        &key=${global.apiKey}
        &location=${this.state.region.latitude},${this.state.region.longitude}
        &radius=5000`;
        try {
            const result = await fetch(apiUrl);
            const json = await result.json();
            this.setState({
                predictions:json.predictions,
            });
            console.log("json",json);
        }catch (e) {

        }
        console.log("destination",this.state.destination)
    }
    handleSearchPlace(item){
        console.log("item",item);
        this.setState({
            destination:item.structured_formatting.main_text,
            isRenderResultSearch:false,
            placeId:item.place_id,
        },()=>this.getPlaces());
    }
    getUrlSearchPlace(placeId,key){
        const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${key}`;
        return url;
    }
    async getPlaces(){
        const url = this.getUrlSearchPlace(this.state.placeId,global.apiKey);
        await fetch(url)
            .then((jsonRequest)=>jsonRequest.json())
            .then((jsonResponse)=>{
                console.log('TrungDo',jsonResponse.result.geometry);
                this.setState({
                    marker:{
                        latitude: jsonResponse.result.geometry.location.lat,
                        longitude:jsonResponse.result.geometry.location.lng,
                    }
                });
               })
            .catch(function(error) {
                // console.log('There has been a problem with your fetch operation: ' + error.message);
            });
    }
    handleOpenEditProfile(titleSetting,name){
        console.log("nametrungDo",name);
        this.setState({
            showEditProfile:true,
            titleSetting:titleSetting,
            name:name
        })
    }
    onCloseModal(){
        this.setState({
            showEditProfile:false,
        })
    }
    doneEdit(){
        this.setState({
            showEditProfile:false,
        })
    }
    handleShowListPlace(){
        this.props.navigation.navigate('ListPlace',{onSelect:this.onSelect});
    }
    handleCreatePlace(){
        this.props.navigation.navigate('CreatePlace',{onSelect:this.onSelect})
    }
    onSelect = data => {
        this.setState({
            data:data,
            contentTitle:data.item.name,
            contentDescription:data.item.description,
        });
    };

    async handleCreateStop(){
       console.log("click",this.state.contentTitle,this.state.contentDescription,this.state.avatarSource);
        if(this.state.contentTitle === 'vd: Thung lũng tình yêu' ||
            this.state.contentTitle === ''||
            this.state.contentDescription === ''||
            this.state.avatarSource === ''
        ){
            Alert.alert(
                "Thông báo",
                "Bạn cần nhập đầy đủ thông tin");
        }else{
            this.setState({
                loading:true,
            });
            let option =
            {
                "idPlaces": this.state.data.item.id,
                "idTrip": this.props.dataTripCreateNew.idTrip,
                "tittle":this.state.contentTitle ,
                "description": this.state.contentDescription,
                "img": this.state.pathImage,
                "time": this.state.timeStart.toString(),
                "createdAt": "01-01-2018",
                "updatedAt": "01-01-2018"
            };
            if(await getFromLocal('Token_User') !== null){
                this.props.stopAction.createNewStop(await getFromLocal('Token_User'),option)
            }else {
                this.props.tripActions.createNewStop(this.props.login.data.token,option)
            }

        }
    }
    render() {
        const {params} = this.props.navigation.state;
        return (
            <ImageBackground source={image.backgroundImage} style={styleGlobal.container}>
                <View style={styleGlobal.imgBackground}>
                    <Header
                        customHeaderStyle={{backgroundColor: global.yellow}}
                        leftHeader={<IconButton nameIcon='ios-arrow-back'
                                                onClick={()=>this.props.navigation.goBack()}
                                                iconStyle={{fontSize: 35, color: global.black}}/>}
                        body={<TextComponent
                            text='Tạo mới điểm dừng'
                            color={global.black}
                            size={global.sizeP20}
                            bold={global.fontWeightDark}/>}
                        rightHeader={<TextComponent text={''}/>}
                    />
                    <View style={styles.body_trip_stop}>
                        <View style={styles.view_btn_create_place}>
                            <TouchableOpacity style={styles.btn_create_place} onPress={this.handleShowListPlace}>
                                <Text style={{color:global.colorFF,fontWeight: global.fontWeightBold}}>
                                    Địa điểm sẵn có
                                </Text>

                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn_create_place} onPress={this.handleCreatePlace}>
                                <Text style={{color:global.colorFF,fontWeight: global.fontWeightBold}}>
                                    Tạo mới điạ điểm
                                </Text>

                            </TouchableOpacity>
                        </View>

                        <SettingItem
                            nameIcon='ios-stats'
                            styleIcon={{color:global.orange,fontSize: 30,}}
                            txtDetails={this.state.contentTitle}
                            txtTitle={'Tên điểm dừng'}
                            onClick={this.handleOpenEditProfile.bind(null,'Tên điểm dừng',this.state.contentTitle)}
                        />
                        <SettingItem
                            nameIcon='ios-eye'
                            styleIcon={{color:global.colorFF,fontSize: 30,}}
                            txtDetails={this.state.contentDescription}
                            txtTitle={'Mô tả điểm dừng'}
                            onClick={this.handleOpenEditProfile.bind(null,'Mô tả điểm dừng',this.state.contentDescription)}
                        />
                        <View style={{height:50,alignItems: 'center',flexDirection: 'row',justifyContent: 'space-between', borderBottomWidth: 1,
                            borderColor:global.colorCc,}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:20,color:global.colorFF,marginLeft: 10}}>Thời gian: </Text>
                                <DatePicker
                                    style={{width: 150}}
                                    date={this.state.timeStart}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="2018-12-03"
                                    maxDate="3000-12-03"
                                    showIcon= {false}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateInput: {
                                            borderColor: 'transparent',
                                            borderWidth: 0,
                                            alignItems: 'flex-start',
                                            justifyContent: 'flex-start',
                                        },
                                        dateText: {
                                            color:global.orange,
                                            fontSize: 20,
                                            marginLeft:10,
                                        }
                                    }}
                                    onDateChange={(date) => {this.setState({timeStart: date})}}
                                />
                            </View>
                            <IconButton nameIcon={'ios-calendar'} iconStyle={{marginRight: 10,fontSize:30,color:global.green}}/>
                        </View>
                        <View style={{
                            height:150,
                            justifyContent:'space-between',
                            alignItems:'center',
                            flexDirection:'row',
                        }}>
                            <Text style={{fontSize:20,color:global.colorFF,marginLeft: 10}}>
                                Hình ảnh diểm dừng:
                            </Text>
                            <RoundAvatar
                                size={'x-large'}
                                //icSrc={'https://anh.24h.com.vn//upload/1-2015/images/2015-02-12/1423706954-anhgirlxinh.jpg'}
                                imageLocal={this.state.avatarSource ==='' ? image.noPhoto : this.state.avatarSource}
                                onPress={this.changePhotoBgr}
                            />
                            <IconButton
                                iconStyle={{marginRight: 10,fontSize:30,color:global.orange}}
                                nameIcon={'ios-reverse-camera'}
                                onClick={this.changePhotoBgr}
                            />
                        </View>
                        <View style={styles.view_btn_create}>
                            <TouchableOpacity style={styles.btn_create} onPress={this.handleCreateStop}>
                                <Text style={{color:global.colorFF,fontWeight: global.fontWeightBold}}>
                                    Tạo mới
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={styles.logo}>
                        <Image
                            style={{width:280,height:80}}
                            source={image.logo}
                            resizeMethod={'resize'}
                        />
                    </View>
                    <SettingProfileModal
                        visible={this.state.showEditProfile}
                        onCloseModal={this.onCloseModal}
                        doneEdit ={this.doneEdit}
                        title={this.state.titleSetting}
                        name={this.state.name}
                        editable={false}
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
        dataImage:state.imageReducer,
        dataTripCreateNew:state.tripReducer.dataTripCreateNew,
        stopReducer:state.stopReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
        placeAction: bindActionCreators(placeAction,dispatch),
        tripActions:bindActionCreators(tripActions,dispatch),
        uploadImageAction:bindActionCreators(uploadImageAction,dispatch),
        stopAction:bindActionCreators(stopAction,dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateStopInTrip);
