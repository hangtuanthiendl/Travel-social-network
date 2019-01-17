
import React, { Component } from 'react';
import {
    Dimensions,
    View,
    TouchableOpacity,
    Text, TextInput, ScrollView, Image
} from 'react-native';
import _ from "underscore";
import styles from "../CreateTrip/styles";
import Header from "../../../modules/Header";
import global from "../../../Styles/global";
import IconButton from "../../../Components/Button/IconButton";
import image from "../../../themes/Images";
import TextComponent from "../../../Components/Text/Text";
import Icon from "react-native-vector-icons/Ionicons";
import TextInputItems from "../../../Components/Items/TextInputItem";
import RoundAvatar from "../../../Components/Avatar/RoundAvatar";
import DatePicker from 'react-native-datepicker'
import {bindActionCreators} from "redux";
import * as loginActions from "../../../action/loginAction";
import * as placeAction from "../../../action/placeAction";
import * as tripActions from "../../../action/tripAction";
import * as uploadImageAction from '../../../action/uploadImgaeAction';
import connect from "react-redux/es/connect/connect";
import {getFromLocal} from "../../../services/storage";
import moment from 'moment';
let ImagePicker = require('react-native-image-picker');
const {
    height,
    width
} = Dimensions.get('window');
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

class CreateTrip extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameTrip:'',
            nameStartPlace:'',
            nameEndPlace:'',
            timeStart:moment().format('YYYY-MM-DD'),
            timeEnd:moment().format('YYYY-MM-DD'),
            warningTrip:false,
            warningStartPlace:false,
            warningEndPlace:false,
            warningTimeStart:false,
            warningTimeEnd:false,
            avatarSource:'',
            warningNumberParticipant:false,
            numberParticipant:'',
            warningDescription:false,
            description:'',
            pathImage:'',
            params:{},
        };
        this.handleCreateTrip = this.handleCreateTrip.bind(this);
        this.changePhotoBgr = this.changePhotoBgr.bind(this);
        this.handleShowListPlace = this.handleShowListPlace.bind(this);
        console.log("moment().format('L')",moment().format('YYYY-MM-DD'))
    }
    componentWillReceiveProps(nextProps){
        console.log("this.props.dataImage",this.props.dataImage.data,nextProps.dataImage.data.file);
        if(this.props.dataImage.data && nextProps.dataImage.data && !_.isEqual(this.props.dataImage.data,nextProps.dataImage.data )){
            this.setState({
                pathImage:nextProps.dataImage.data.file.path.replace("public","."),
            },()=> console.log("pathImage",this.state.pathImage));
        }
    }
    async componentDidMount(){
        if(await getFromLocal('Token_User') !== null) {
            this.props.placeAction.getListPlace(0, await getFromLocal('Token_User'))
        }else{
            this.props.placeAction.getListPlace(0, this.props.login.data.token)
        }
    }
    renderWarningTextInput(){
        if(this.state.nameTrip === ''){
            this.setState({
                warningTrip:true,
            })
        }else{
            this.setState({
                warningTrip:false,
            })
        }
        if(this.state.nameStartPlace === ''){
            this.setState({
                warningStartPlace:true,
            })
        }else {
            this.setState({
                warningStartPlace:false,
            })
        }
        if(this.state.nameEndPlace === ''){
            this.setState({
                warningEndPlace:true,
            })
        }else{
            this.setState({
                warningEndPlace:false,
            })
        }
        if(this.state.timeStart === "2018-12-03"){
            this.setState({
                warningTimeStart:true,
            })
        }else{
            this.setState({
                warningTimeStart:false,
            })
        }
        if(this.state.timeEnd === "2018-12-03"){
            this.setState({
                warningTimeEnd:true,
            })
        }else{
            this.setState({
                warningTimeEnd:false,
            })
        }
        if(this.state.numberParticipant === ''){
            this.setState({
                warningNumberParticipant:true,
            })
        }else{
            this.setState({
                warningNumberParticipant:false,
            })
        }
        if(this.state.description === ''){
            this.setState({
                warningDescription:true,
            })
        }else{
            this.setState({
                warningDescription:false,
            })
        }
    }
    handleShowListPlace(){
        this.props.navigation.navigate('ListPlace')
    }
    handleCreateTrip(){
        const { nameTrip,
            nameStartPlace,
            nameEndPlace,
            timeStart,
            timeEnd,avatarSource, numberParticipant,
            description} = this.state;
        if(nameStartPlace !== '' &&
            nameTrip !== ''&&
            nameEndPlace !== ''&&
            timeEnd === ''&&
            timeStart !== '' &&
            avatarSource !== ''&&
            description !== ''
        ){
            let option = {
                "idLocation": 1,
                "idCreator": 1,
                "tittle": nameTrip,
                "description": description,
                "img": avatarSource,
                "status": 1,
                "star": 5,
                "quantity": numberParticipant,
                "timeStart": timeStart.toString(),
                "timeEnd": timeEnd.toString(),
                "createdAt": "01-01-2018",
                "updatedAt": "01-01-2018"
            };
            this.props.tripActions.createTrip(this.props.login.data.token,option)
        }else{
            //this.renderWarningTextInput();
           // this.props.navigation.navigate('CreateStopInTrip');
            console.log('trungdo', this.props.navigation.state.params)
        }

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
    render() {
        const { params } = this.props.navigation.state;
        console.log('params',params);
        return (
            <View style={styles.container}>
                <Header
                    customHeaderStyle={{backgroundColor: global.yellow,marginBottom: 10}}
                    leftHeader={<TextComponent text={''}/>}
                    body={<TextComponent
                        text='Tạo mới chuyến đi'
                        color={global.black}
                        size={global.sizeP20}
                        bold={global.fontWeightDark}/>}
                    rightHeader={
                        <IconButton nameIcon={"ios-close"} iconStyle={{fontSize: 35, color: global.black}}
                                    onClick={() => this.props.navigation.goBack()}/>}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    >
                    <TextInputItems
                        nameIcon={'ios-stats'}
                        namePlaceholder={'Tên hành trình'}
                        onChangeText={(nameTrip) => this.setState({nameTrip})}
                        txtContent={this.state.nameTrip}
                        warning={this.state.warningTrip}
                        maxLength={20}
                    />
                    {/*<TextInputItems*/}
                        {/*nameIcon={'ios-trending-up'}*/}
                        {/*styleIcon={{color:global.green}}*/}
                        {/*namePlaceholder={'Nơi xuất phát'}*/}
                        {/*onChangeText={(nameStartPlace) => this.setState({nameStartPlace})}*/}
                        {/*txtContent={this.state.nameStartPlace}*/}
                        {/*warning={this.state.warningStartPlace}*/}
                        {/*maxLength={15}*/}
                    {/*/>*/}
                    <TextInputItems
                        nameIcon={'ios-create'}
                        styleIcon={{color:global.colorRed}}
                        namePlaceholder={'Điểm đến (click vào icon)'}
                        onChangeText={(nameEndPlace) => this.setState({nameEndPlace})}
                        txtContent={params ? params.item.name : ''}
                        warning={this.state.warningEndPlace}
                        maxLength={15}
                        editable={false}
                        onClick={this.handleShowListPlace}
                    />
                    <TextInputItems
                        nameIcon={'ios-contacts'}
                        styleIcon={{color:global.orangeColor}}
                        namePlaceholder={'Tổng số ngừoi có thể tham gia'}
                        onChangeText={(numberParticipant) => this.setState({numberParticipant})}
                        txtContent={this.state.numberParticipant}
                        warning={this.state.warningNumberParticipant}
                        maxLength={2}
                        isNumber
                    />
                    <TextInputItems
                        nameIcon={'ios-flower'}
                        styleIcon={{color:global.purple}}
                        namePlaceholder={'Mô tả sơ lược về chuyến đi của của bạn'}
                        onChangeText={(description) => this.setState({description})}
                        txtContent={this.state.description}
                        warning={this.state.warningDescription}
                        style={{height:100}}
                        maxLength={500}
                    />
                    <View style={{height:50,alignItems: 'center',flexDirection: 'row',justifyContent: 'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:20,color:global.black,marginLeft: 10}}>Thời gian bắt đầu :</Text>
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
                                        justifyContent: 'flex-start'
                                    },
                                    dateText: {
                                        color:global.black,
                                        fontSize: 20,
                                        marginLeft:10,
                                    }
                                }}
                                onDateChange={(date) => {this.setState({timeStart: date})}}
                            />
                        </View>
                        <IconButton nameIcon={'ios-calendar'} iconStyle={{marginRight: 10,fontSize:30,color:global.green}}/>
                    </View>
                    <View style={{backgroundColor:global.backgroudTransparent, height:1}}>

                    </View>
                    <TouchableOpacity style={{height:50,alignItems: 'center',flexDirection: 'row',justifyContent: 'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:20,color:global.black,marginLeft: 10}}>Thời gian kết thúc :</Text>
                            <DatePicker
                                style={{width: 150}}
                                date={this.state.timeEnd}
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
                                        justifyContent: 'flex-start'
                                    },
                                    dateText: {
                                        color:global.black,
                                        fontSize: 20,
                                        marginLeft:10,
                                    }
                                }}
                                onDateChange={(date) => {this.setState({timeEnd: date})}}
                            />
                        </View>
                        <IconButton nameIcon={'ios-calendar'} iconStyle={{marginRight: 10,fontSize:30,color:global.red}}/>
                    </TouchableOpacity>
                    <View style={{backgroundColor:global.backgroudTransparent, height:1}}>

                    </View>
                    <View style={{
                        height:150,
                        justifyContent:'space-between',
                        alignItems:'center',
                        flexDirection:'row',
                    }}>
                        <Text style={{fontSize:20,color:global.black,marginLeft: 10}}>
                            Hình ảnh chuyến đi:
                        </Text>
                        {console.log("this.state.avatarSource",require("../../../images/noImage.jpg"))}
                        <RoundAvatar
                            size={'x-large'}
                            //icSrc={'https://anh.24h.com.vn//upload/1-2015/images/2015-02-12/1423706954-anhgirlxinh.jpg'}
                            imageLocal={this.state.avatarSource ==='' ? image.noPhoto : this.state.avatarSource}
                            onPress={this.changePhotoBgr}
                        />
                        <IconButton
                            iconStyle={{marginRight: 10,fontSize:30,color:global.color66}}
                            nameIcon={'ios-reverse-camera'}
                            onClick={this.changePhotoBgr}
                        />
                    </View>
                </ScrollView>
                <View style={{height:50,justifyContent:'center',alignItems:'center',backgroundColor:'transparent'}}>
                    <TouchableOpacity onPress={this.handleCreateTrip} style={{
                        height:40,
                        width:'80%',
                        backgroundColor:global.yellowColor,
                        justifyContent:'center',
                        alignItems:'center',
                        borderRadius:35,
                        borderColor:global.colorFF,
                        borderWidth: 2,
                    }}>
                        <Text style={{
                            fontSize:14,
                            fontWeight: global.fontWeightBold,
                        }}>
                            TẠO MỚI
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
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
)(CreateTrip);