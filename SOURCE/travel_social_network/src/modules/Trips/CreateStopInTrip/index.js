/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Image,
    ImageBackground, TextInput,
    View,TouchableOpacity,Text
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
        };
        this.changePhotoBgr = this.changePhotoBgr.bind(this);
        this.onChangeDestination = this.onChangeDestination.bind(this);
        this.handleOpenEditProfile = this.handleOpenEditProfile.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.doneEdit = this.doneEdit.bind(this);
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
    handleOpenEditProfile(titleSetting){
        this.setState({
            showEditProfile:true,
            titleSetting:titleSetting,
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
                            text='Tạo mới điểm dừng'
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
                        <View style={{width:'100%',position:'absolute',top:50,zIndex:100}}>
                            {this.state.isRenderResultSearch && predictions}
                        </View>

                        <SettingItem
                            nameIcon='ios-stats'
                            styleIcon={{color:global.orange,fontSize: 30,}}
                            txtDetails={this.state.contentTitle}
                            txtTitle={'Tên điểm dừng'}
                            onClick={this.handleOpenEditProfile.bind(null,'Tên điểm dừng')}
                        />
                        <SettingItem
                            nameIcon='ios-eye'
                            styleIcon={{color:global.colorFF,fontSize: 30,}}
                            txtDetails={this.state.contentDescription}
                            txtTitle={'Mô tả điểm dừng'}
                            onClick={this.handleOpenEditProfile.bind(null,'Mô tả điểm dừng')}
                        />
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
                            <TouchableOpacity style={styles.btn_create}>
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
)(CreateStopInTrip);
