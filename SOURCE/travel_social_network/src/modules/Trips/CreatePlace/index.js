/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Image,
    ImageBackground, TextInput,
    View, TouchableOpacity, Text, Alert, ActivityIndicator
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
class CreatePlace extends Component {
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
            formatted_address:'',
            loading:false,
            creator:this.props.userInfo.data.firstName +this.props.userInfo.data.middleName + this.props.userInfo.data.lastName
        };
        this.changePhotoBgr = this.changePhotoBgr.bind(this);
        this.onChangeDestination = this.onChangeDestination.bind(this);
        this.handleOpenEditProfile = this.handleOpenEditProfile.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.doneEdit = this.doneEdit.bind(this);
        this.handleShowListPlace = this.handleShowListPlace.bind(this);
        this.handleCreateNewPlace = this.handleCreateNewPlace.bind(this);
        this.handleGoToCreateStopInTrip = this.handleGoToCreateStopInTrip.bind(this);
    }
    componentWillMount(){
        console.log(" this.props.dataTripCreateNew", this.props.dataTripCreateNew);
        console.log("this.props.placeReducer",this.props.placeReducer);
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
                },()=>this.props.uploadImageAction.updateLoadImage(this.props.login.token,response));
            }
        });
    }

    componentWillReceiveProps(nextProps){
        console.log("nextProps.placeReducer",nextProps.placeReducer);
        if(!nextProps.placeReducer.fetching && nextProps.placeReducer.msg !== null){
            this.setState({
                loading:nextProps.placeReducer.fetching
            },()=>this.handleGoToCreateStopInTrip(nextProps.placeReducer.msg.data))
        }
    }
    handleGoToCreateStopInTrip(item) {
        const {navigation} = this.props;
        navigation.state.params.onSelect({item: item});
        navigation.goBack();
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
            contentTitle:item.structured_formatting.main_text,
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
                console.log('TrungDo',jsonResponse.result.formatted_address);
                this.setState({
                    marker:{
                        latitude: jsonResponse.result.geometry.location.lat,
                        longitude:jsonResponse.result.geometry.location.lng,
                    },
                    formatted_address:jsonResponse.result.formatted_address
                });
            })
            .catch(function(error) {
                // console.log('There has been a problem with your fetch operation: ' + error.message);
            });
    }
    handleOpenEditProfile(titleSetting,name){
        this.setState({
            showEditProfile:true,
            titleSetting:titleSetting,
            name:name,
        })
    }
    onCloseModal(){
        this.setState({
            showEditProfile:false,
        })
    }
    doneEdit(content){
        if(this.state.titleSetting === 'Tên điểm dừng'){
            this.setState({
                contentTitle:content
            })
        }else{
            this.setState({
                contentDescription:content
            })
        }
        console.log("doneEdit",content);
        this.setState({
            showEditProfile:false,
        })
    }
    handleShowListPlace(){
        this.props.navigation.navigate('ListPlace')
    }
    async handleCreateNewPlace(){
        if(this.state.contentTitle === 'vd: Thung lũng tình yêu' ||
            this.state.contentTitle === ''||
            this.state.contentDescription === ''
        ){
            Alert.alert(
                "Thông báo",
                "Bạn cần nhập đầy đủ thông tin");
        }else{
            this.setState({
                loading:true
            });
            let option ={
                "name": this.state.contentTitle,
                "description":this.state.contentDescription ,
                "long": this.state.marker.longitude,
                "lat": this.state.marker.latitude,
                "address": this.state.formatted_address,
                "createdAt": "01-01-2018",
                "updatedAt": "01-01-2018",
                "creator":this.state.creator,
            };
            if(await getFromLocal('Token_User') !== null){
                this.props.placeAction.createNewPlace(await getFromLocal('Token_User'),option)
            }else{
                this.props.placeAction.createNewPlace(this.props.login.data.token,option)
            }
        }
    }
    render() {
        const predictions = this.state.predictions.map((item,index)=>{
            const onClick = ()=>this.handleSearchPlace(item);
            return(
                <TouchableOpacity key={index} style={styles.result_Search_place} onPress={onClick}>
                    <Text style={{color:global.colorFF}}>
                        {item.description}
                    </Text>
                </TouchableOpacity>
            );
        });
        return (
            <ImageBackground source={image.backgroundImage} style={styleGlobal.container}>
                <View style={styleGlobal.imgBackground}>
                    <Header
                        customHeaderStyle={{backgroundColor: global.yellow}}
                        leftHeader={<IconButton nameIcon='ios-arrow-back'
                                                onClick={()=>this.props.navigation.goBack()}
                                                iconStyle={{fontSize: 35, color: global.black}}/>}
                        body={<TextComponent
                            text='Tạo mới điểm du lịch'
                            color={global.black}
                            size={global.sizeP20}
                            bold={global.fontWeightDark}/>}
                        rightHeader={<TextComponent text={''}/>}
                    />
                    <View style={styles.body_trip_stop}>
                        <TextInput
                        onChangeText={(destination)=>this.onChangeDestination(destination)}
                        style={styles.txt_search}
                        placeholder={"Tìm kiếm điểm dừng"}
                        value={this.state.destination}
                        placeholderTextColor={global.colorB2}
                        autoCapitalize = 'none'
                        underlineColorAndroid="transparent"
                        />
                        <View style={{width:'100%',position:'absolute',top:50,zIndex:200}}>
                        {this.state.isRenderResultSearch && predictions}
                        </View>

                        <SettingItem
                            nameIcon='ios-stats'
                            styleIcon={{color:global.orange,fontSize: 30,}}
                            txtDetails={this.state.contentTitle}
                            txtTitle={'Tên điểm dừng'}
                           // onClick={this.handleOpenEditProfile.bind(null,'Tên điểm dừng')}
                        />
                        <SettingItem
                            nameIcon='ios-eye'
                            styleIcon={{color:global.colorFF,fontSize: 30,}}
                            txtDetails={this.state.contentDescription}
                            txtTitle={'Mô tả điểm dừng'}
                            onClick={this.handleOpenEditProfile.bind(null,'Mô tả điểm dừng',this.state.contentDescription)}

                        />
                        <View style={styles.view_btn_create}>
                            <TouchableOpacity style={styles.btn_create} onPress={this.handleCreateNewPlace}>
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
                        editable={true}
                        name={this.state.name}
                    />
                    {this.state.loading
                    &&
                    <ActivityIndicator color={'red'} size="small"/>}
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
        placeReducer:state.placeReducer,
        userInfo:state.userReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
        placeAction: bindActionCreators(placeAction,dispatch),
        tripActions:bindActionCreators(tripActions,dispatch),
        uploadImageAction:bindActionCreators(uploadImageAction,dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePlace);
