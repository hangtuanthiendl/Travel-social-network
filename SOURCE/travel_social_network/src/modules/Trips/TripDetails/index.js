import React, {Component} from 'react';
import {
    View,
    Dimensions,
    Animated,
    ImageBackground,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput, Alert, AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import CarouselView from "../../CarouselView";
import CarouselItemImages from "../../CarouselItemImages";
import global from "../../../Styles/global";
import TextComponent from "../../../Components/Text/Text";
import IconButton from "../../../Components/Button/IconButton";
import styleGlobal from "../../../Styles/styles";
const {height, width} = Dimensions.get('window');
import image from "../../../themes/Images";
import Accordion from 'react-native-collapsible/Accordion';
import Icon from "react-native-vector-icons/Ionicons";
import {bindActionCreators} from "redux";
import * as loginActions from "../../../action/loginAction";
import * as placeAction from "../../../action/placeAction";
import * as tripActions from "../../../action/tripAction";
import * as userInfoAction from "../../../action/userAction"
import connect from "react-redux/es/connect/connect";
import UserProfileModal from "../../../modules/Profile/UserProfileModal";
import _ from "underscore";
import call from "react-native-phone-call";
import {getFromLocal} from "../../../services/storage";
import * as api from "../../../api/Api";
import {createTripFail} from "../../../action/tripAction";
let data = {};
let numberPhone = '000';

class TripDetails extends Component {
    constructor(props){
        super(props);
        this.state ={
            activeSections: [],
            activeSectionsDETAILS: [],
            userInfo: this.props.userInfo,
            isShowUserInfo:false,
            txtCmt:'',
            arrCmt:[],
            loading:false,
            isShowCmt:false,
            userInfoTripDetail:{},
            keyRoles:null,
             Status : '',
        };
        this.dataLocation = [
            {
                tittle:'Stop 1',
                latitude: 21.038756,
                longitude:105.840314,
            },
            {
                tittle:'Stop 2',
                latitude: 21.338134,
                longitude:105.742265,
            },
            {
                tittle:'Stop 3',
                latitude: 21.517253,
                longitude:104.523863,
            },
            {
                tittle:'Stop 4',
                latitude: 21.669108,
                longitude:106.662683,
            },
            {
                tittle:'Stop 5',
                latitude: 20.639935,
                longitude: 105.489459,
            },

        ];
        this.idTrip = null;
        this.handleShowUserInfo = this.handleShowUserInfo.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.doneEdit = this.doneEdit.bind(this);
        this.handleCall = this.handleCall.bind(this);
        this.convertNumberToCurrency = this.convertNumberToCurrency.bind(this);
        this.SECTIONS=null;
        this.SECTIONSDETAILS = null;
        this.handleSentCmt = this.handleSentCmt.bind(this);
        this.handleRegisterTrip = this.handleRegisterTrip.bind(this);
        this.handleShowCmt = this.handleShowCmt.bind(this);
        this.handleGetListMemberInTrip = this.handleGetListMemberInTrip.bind(this);
        this.handleTripTimeLine = this.handleTripTimeLine.bind(this);
        this.handleRenderMap = this.handleRenderMap.bind(this);

    }
    async componentWillMount(){
        this.initData();
        console.log("nextProps.userInfo",this.props.userInfo);
        const {params} = this.props.navigation.state;
        this.idTrip = params.dataDetail.id;
        this.SECTIONS=[
            {
                title1: 'Nơi khởi hành:',
                content1: params.dataDetail.placeStart,
                title2:'Nơi kết thúc:',
                content2:'Tp. Đà Lạt',
            },
            {
                title1: 'Thời gian đầu:',
                content1: params.dataDetail.timeStart.slice(0,10),
                title2:'Thời gian kết thúc:',
                content2: params.dataDetail.timeEnd.slice(0,10),
            }
        ];
        this.SECTIONSDETAILS =[
            {
                title: 'Thông tin chi tiết ',
                content: params.dataDetail.description
            }
        ];

        if(await getFromLocal('Token_User') !== null){
            api.getUserInfoTripDetail(await getFromLocal('Token_User'),params.dataDetail.idUser).then((res)=>{
                console.log("data userInfo trip detail",res,res.data);
                if(res && res.status === 200){
                    this.setState({
                        userInfoTripDetail:res.data,
                    })
                }
            });
            api.checkMeberInTrip(await getFromLocal('Token_User'),this.idTrip).then((res)=>{
                if(res && res.status === 200){
                    this.setState({
                        keyRoles:res.data.num,
                        Status:res.data.Status
                    })
                }
                console.log('data RES',res.data);
            })
                .catch((err)=>{
                    console.log("data RES err",err.response.data.message);
                    if(err.response.status === 404)
                    this.setState({
                        keyRoles:0,
                        Status:err.response.data.message
                    })
                })
        }

    }

    componentWillReceiveProps(nextProps){
        console.log("nextProps.userInfo",this.props.userInfo,nextProps.userInfo);
        if(this.props.userInfo && nextProps.userInfo && !_.isEqual(this.props.userInfo,nextProps.userInfo)){
            this.setState({
                userInfo:nextProps.userInfo
            },()=> console.log("nextProps.userInfo",this.state.userInfo))
        }
        console.log("dataTrip",this.props.dataTrip,nextProps.dataTrip);
        if(!nextProps.dataTrip.fetching && !_.isEqual(this.props.dataTrip.dataRegister,nextProps.dataTrip.dataRegister)){
            this.setState({
                loading:false
            },()=>this.handleNotificationRegister);
        }
    }
    handleNotificationRegister(){
        Alert.alert(
            "Thông báo",
            "Bạn đã gửi yêu cầu tham gia thành công",
            )

    }
   async handleRenderMap(){
        if(await getFromLocal('Token_User') !== null)
        {
            api.getStopWithPlace(await getFromLocal('Token_User'),this.idTrip,0).then((res)=>{
                if(res && res.status){
                    this.props.navigation.navigate("TripMap",{
                        dataLocation:res.data
                    });
                    console.log("data res list stop with place",res.data)
                }
            })
                .catch((err)=>{
                    console.log("err get list stop with place",err.response);
                    Alert.alert('Thông báo','Có lỗi xảy ra');
                })
        }
        // this.props.navigation.navigate("TripMap",{
        //     dataLocation:this.dataLocation
        // });
    }
    initData(){
        data = [{img:image.img_bg_1},
            {img:image.img_bg_2},
            {img:image.img_bg_3}]
    }
    handleShowUserInfo(){
        this.setState({
            isShowUserInfo:true,
        })
    }
    onCloseModal(){
        this.setState({
            isShowUserInfo:false,
        })
    }
    doneEdit(){
        this.setState({
            isShowUserInfo:false,
        })
    }
    _renderHeader =  (section,_,isActive) => {
        return (
            <View style={styles.header_drop_down}>
                <Icon name={!isActive?'ios-arrow-down':'ios-arrow-up'} style={{
                    color:global.orange,
                    fontSize:25,
                }}/>
                <Text style={styles.text_title_drop_down}>{section.title1}</Text>
                <Text style={styles.text_content_drop_down}>{section.content1}</Text>
            </View>
        );
    };

    _renderContent = (section) => {
        return (
            <View style={styles.content_drop_down}>
                <Icon name={'ios-done-all'} style={{
                    color:global.red,
                    fontSize:25,
                }}/>
                <Text style={styles.text_title_drop_down}>{section.title2}</Text>
                <Text style={styles.text_content_drop_down}>{section.content2}</Text>
            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };
    //DETAILS
    _renderHeaderDETAILS =  (section,_,isActive) => {
        return (
            <View style={styles.header_drop_down_details}>
                <Icon name={'ios-snow'} style={{
                    color:isActive?global.orange:global.colorFF,
                    fontSize:25,
                }}/>
                <Text style={!isActive ? styles.text_title_drop_down_details : styles.text_title_drop_down}>{section.title}</Text>
                <Icon name={'ios-snow'} style={{
                    color:isActive?global.orange:global.colorFF,
                    fontSize:25,
                }}/>
            </View>
        );
    };

    _renderContentDETAILS = (section) => {
        return (
            <View style={styles.content_drop_down}>
                <Text style={styles.text_content_drop_down}>{section.content}</Text>
            </View>
        );
    };

    _updateSectionsDETAILS = activeSectionsDETAILS => {
        this.setState({ activeSectionsDETAILS });
    };
    renderStar=(number)=>{
        const fields = [];
        for (let i = 0; i < number; i++){
            fields.push(<Icon key={i} name={'ios-star'} style={{
                color:global.imgBackgroundOrange,
                fontSize:20,
                marginLeft:4,
            }}/>)
        }
        return fields;
    };
   async handleRegisterTrip(idTrip){
       this.setState({
           loading:true
       });
       console.log("idTrips",idTrip);
       if(await getFromLocal('Token_User') !== null){
           if(this.state.keyRoles === 2 || this.state.keyRoles === 1){
               Alert.alert(
                   "Thông báo",
                   this.state.Status,
               )
           }else{
               this.props.tripActions.registerTrip(await getFromLocal('Token_User'),idTrip)
           }
       }
    }

    handleCall(){
        numberPhone = this.state.userInfo.data.phone;
        const args = {
            number:numberPhone,
            prompt:true,
        };
        //console.log("args",args);
        call(args).catch(console.error);
    }
    convertNumberToCurrency(money) {
        let value = money.toString();
        if (value != "") {
            value = value.replace(/\D/g, "");
            value = value.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1" + '.');
        }
        return value
    }
    handleTextChange(text){
        console.log('text',text);
        this.setState({
            txtCmt:text,
        })
    }
    async handleSentCmt(){
       const {userInfo}= this.props;
        let option ={
            "idTrip": this.idTrip,
            "content": this.state.txtCmt
        };
        api.sentCmt(await getFromLocal('Token_User'),option).then((res)=>{
            console.log("resCMT",res);
        });
        let arr = this.state.arrCmt.map(a => Object.assign({}, a));
        arr.push({
            content: this.state.txtCmt,
            firstName: userInfo.data.firstName,
            id: "",
            lastName: userInfo.data.lastName,
            middleName: userInfo.data.middleName,
            updatedAt: "",
        });
        this.setState({
            arrCmt:arr,
            txtCmt:'',
        })
    }
    async handleShowCmt(){
        if(await getFromLocal('Token_User') !== null){
            if(this.state.keyRoles === 1){
                this.setState({
                    isShowCmt:true,
                });
                api.getListCmt(await getFromLocal('Token_User'),this.idTrip,0).then((res)=>{
                    if(res && res.status === 200){
                        this.setState({
                            arrCmt :res.data
                        });
                    }
                    console.log("res.data listcmt",res.data);
                });
            }else {
                Alert.alert(
                    "Thông báo",
                    "Đăng ký tour để tham gia bình luận",
                )
            }
        }
    }
    async handleGetListMemberInTrip(){
       api.getListMemberInTrip(await getFromLocal('Token_User'),this.idTrip,0)
           .then((res)=>{
                if(res && res.status === 200){
                    this.props.navigation.navigate('ListMemberInTrip',{
                        dataMemberInTrip: res.data,
                        idTrip:this.idTrip,
                        userInfoTripDetail: this.state.userInfoTripDetail,
                        userInfo :this.props.userInfo.data,
                    })
                }
                console.log("res list member in trip",res.data)
           })
           .catch((err)=>{
               console.log("data RES err",err.response);

           });

       //this.props.navigation.navigate('ListMemberInTrip');
    }
    async handleTripTimeLine(){
       if( await getFromLocal('Token_User') !== null){
           api.getListStopInTrip(await getFromLocal('Token_User'),this.idTrip).then((res)=>{
               if(res && res.status){
                   this.props.navigation.navigate("TripTimeline",{
                       dataStop:res.data
                   });
                   console.log(' res list stop in trip data',res.data);
               }
           })
               .catch((err)=>{
                   console.log("err list stop",err.response);
               });
       }
       //this.props.navigation.navigate("TripTimeline")
    }
    render() {
        const {params} = this.props.navigation.state;
        console.log("paramsTrungDo",params);
        return (
           <View style={styles.container_details}>
               <ImageBackground source={image.backgroundImage} style={{flex:1}}>
                   <View style={styles.header_details}>
                       <CarouselView
                           data={data}
                           renderItem={({item, index}) =>
                               <CarouselItemImages item={item}/>
                           }/>
                       <View style={styles.header_title_details}>
                           <View style={styles.header_text_container}>
                               <View style={styles.header_text_child}>
                                   <IconButton nameIcon='ios-calendar' iconStyle={styles.icon_timeStart}/>
                                   <TextComponent
                                       text={params.dataDetail.createdAt.slice(0,10)}
                                       color={global.colorFF}
                                       style={{
                                           marginLeft:3,
                                           alignItems:'center',
                                           justifyContent:'center',
                                           fontSize:16,
                                           alignSelf: 'center',
                                           marginTop: 30,
                                       }}
                                   />
                               </View>
                               <View style={styles.header_text_child}>
                                   <IconButton nameIcon='ios-ribbon' iconStyle={styles.icon_numberParticipant}/>
                                   <TextComponent
                                       text={'Kinh phí :' + this.convertNumberToCurrency(params.dataDetail.quantity)}
                                       color={global.colorFF}
                                       style={{
                                           alignItems:'center',
                                           justifyContent:'center',
                                           fontSize:16,
                                           alignSelf: 'center',
                                           marginLeft:3,
                                       }}
                                   />
                               </View>
                               <View style={styles.header_text_child}>
                                   {params.dataDetail.imgAvatar!== null
                                       ?
                                       <Image
                                           source={{uri:params.dataDetail.imgAvatar}}
                                           style={styleGlobal.avatar}
                                       />
                                       :
                                       <Image
                                           source={image.avatarTrip}
                                           style={styleGlobal.avatar}
                                       />

                                   }
                                   <TextComponent
                                       text={params.dataDetail.tittle}
                                       color={global.colorFF}
                                       bold={'700'}
                                       numberOfLines={2}
                                       style={{
                                           marginLeft:3,
                                           alignItems:'center',
                                           justifyContent:'center',
                                           fontSize:16,
                                           alignSelf: 'center',
                                       }}
                                   />
                               </View>
                           </View>
                       </View>
                       <View style={styles.btn_back_details}>
                           <IconButton nameIcon='ios-arrow-back'
                                       iconStyle={styles.icon_back}
                                       btnStyle={styles.bg_btn_back}
                                       onClick={()=>this.props.navigation.goBack()}/>
                       </View>
                   </View>
               </ImageBackground>
               <ImageBackground source={image.img_bg_2} style={{flex:2}}>
                   <View style={[styles.body_details]}>
                       <View style={styles.bg_btn_tour}>
                            <IconButton
                                nameIcon={'ios-bicycle'}
                                iconStyle={styles.icon_tour}
                                btnStyle={styles.btn_tour}
                                badge={'Hành trình tour'}
                                badgeStyle={{}}
                                onClick={this.handleTripTimeLine}
                            />
                       </View>
                       <ScrollView
                           showsVerticalScrollIndicator={false}
                         >
                           <Accordion
                               sections={this.SECTIONS}
                               activeSections={this.state.activeSections}
                               renderHeader={this._renderHeader}
                               renderContent={this._renderContent}
                               onChange={this._updateSections}
                           />
                           <View style={styles.header_drop_down2}>
                               <View style={{flexDirection:'row'}}>
                                   <Icon name={'ios-flag'} style={{
                                       color:global.orange,
                                       fontSize:25,
                                   }}/>
                                   <Text style={styles.text_title_drop_down}>Đia điểm tham quan</Text>
                               </View>

                               <IconButton nameIcon={'ios-arrow-round-forward'} iconStyle={{color:global.orange,
                                   fontSize:25,}} btnStyle={{marginRight:10,justifyContent:'flex-end'}} onClick={this.handleRenderMap}/>
                           </View>
                           {this.state.keyRoles === 1 &&  <View style={styles.header_drop_down2}>
                               <View style={{flexDirection:'row'}}>
                                   <Icon name={'ios-bookmark'} style={{
                                       color:global.orange,
                                       fontSize:25,
                                   }}/>
                                   <Text style={styles.text_title_drop_down}>Danh sách thành viên</Text>
                               </View>

                               <IconButton nameIcon={'ios-arrow-round-forward'} iconStyle={{color:global.orange,
                                   fontSize:25,}} btnStyle={{marginRight:10,justifyContent:'flex-end'}} onClick={this.handleGetListMemberInTrip}/>
                           </View>}

                           <Accordion
                               sections={this.SECTIONSDETAILS}
                               activeSections={this.state.activeSectionsDETAILS}
                               renderHeader={this._renderHeaderDETAILS}
                               renderContent={this._renderContentDETAILS}
                               onChange={this._updateSectionsDETAILS}
                           />
                           <View style={{
                               backgroundColor:global.backgroudTransparent,
                               marginLeft:10,
                               marginRight: 10,
                               height: 40,
                               flexDirection: 'row',
                               justifyContent:'center',
                               alignItems:'center',
                           }}>
                               {this.renderStar(5)}
                           </View>
                           {
                               !this.state.isShowCmt
                               ?
                               <View style={{width:width,justifyContent:'flex-start'}}>
                                   <IconButton
                                       nameIcon={'ios-brush'}
                                       iconStyle={{color:global.colorFF,
                                           fontSize: 20,marginRight:5}}
                                       btnStyle={{ backgroundColor: global.backgroudTransparent,
                                           overflow: 'hidden',
                                           width:150,
                                           height:40,
                                           marginLeft:10,
                                           marginBottom:10,
                                           flexDirection: 'row',
                                           borderColor: global.colorFF, borderWidth: 1,
                                           borderRadius:10,}}
                                       badge={'Viết bình luận'}
                                       badgeStyle={{}}
                                       onClick={this.handleShowCmt}
                                   />
                               </View>
                               :
                               <View style={{
                                   backgroundColor:global.colorF4,
                                   marginLeft:10,
                                   marginRight: 10,
                                   height:40,
                                   flexDirection: 'row',
                                   justifyContent:'space-between',
                                   alignItems:'center',
                                   borderRadius:20,
                                   marginBottom: 10,
                               }}>
                                   <View style={{marginLeft:5,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                       <Icon name={'ios-chatbubbles'} style={{
                                           color:global.yellowColor,
                                           fontSize:25,
                                       }}/>
                                       <TextInput
                                           onChangeText={(text) => this.handleTextChange(text)}
                                           style={{
                                               color:global.black,
                                               marginLeft:10,
                                               width:260,
                                           }}
                                           multiline={true}
                                           maxLength={100}
                                           placeholder={'Viết bình luận '}
                                           value={this.state.txtCmt}
                                           placeholderTextColor={global.black}
                                           autoCapitalize = 'none'
                                           underlineColorAndroid="transparent"
                                       />
                                   </View>
                                   <IconButton
                                       nameIcon={'ios-paper-plane'}
                                       iconStyle={{color:global.colorFF,fontSize:15}}
                                       btnStyle={{width:30,height:30,borderRadius:15,backgroundColor:global.yellowColor,marginRight:10}}
                                       onClick={this.handleSentCmt}
                                   />
                               </View>
                           }

                           {this.state.isShowCmt && this.state.arrCmt.map((item,index)=>{
                               return(
                                   <View key={index} style={{
                                       //width:width,
                                       minHeight:50,
                                       flexDirection:'row',
                                       justifyContent:'flex-start',
                                       alignItems:'center',
                                       paddingLeft: 5,
                                       borderRadius:5,
                                       marginLeft:10,
                                       marginRight:10,
                                       marginBottom:2,
                                       borderColor:global.colorFF,
                                       borderWidth:1,
                                       backgroundColor:global.backgroudTransparent}}>
                                       {index % 2 === 0
                                       ?
                                           <Image
                                               source={image.avatarTrip}
                                               style={styleGlobal.avatar}
                                           />
                                           :
                                           <Image
                                               source={image.img_bg_3}
                                               style={styleGlobal.avatar}
                                           />
                                       }

                                       <View>
                                           <TextComponent
                                               text={item.firstName + ' '+ item.middleName + ' '+ item.lastName}
                                               style={{
                                                   alignItems:'center',
                                                   marginLeft:5,
                                                   color:global.orange,
                                                   fontSize:global.sizeP18
                                               }}
                                           />
                                           <Text
                                               style={{
                                                   alignItems:'center',
                                                   marginLeft:5,
                                                   color:global.colorFF,
                                                   fontSize:global.sizeP18,
                                                   width:width-80,
                                               }}
                                           >
                                              {item.content}
                                           </Text>
                                       </View>
                                   </View>
                               );
                           })}
                       </ScrollView>

                   </View>
               </ImageBackground>
               <View style={styles.footer_details}>
                    <TouchableOpacity style={{
                        height:40,
                        width:'80%',
                        backgroundColor:global.yellowColor,
                        justifyContent:'center',
                        alignItems:'center',
                        borderRadius:35,
                        borderColor:global.colorFF,
                        borderWidth: 2,
                        marginLeft:10
                    }}
                      disabled={params.dataDetail.status !== 0}
                      onPress={()=>this.handleRegisterTrip(parseInt(params.dataDetail.id))}
                    >
                        <Text style={{
                            fontSize:14,
                            fontWeight: global.fontWeightBold,
                        }}>
                            ĐĂNG KÝ TOUR
                        </Text>
                    </TouchableOpacity>
                   <IconButton
                       nameIcon={'ios-person'}
                       iconStyle={{color:global.orange,fontSize:30}}
                       btnStyle={{width:40,height:40,borderRadius:20,backgroundColor:global.colorF3,marginRight:10}}
                       onClick={this.handleShowUserInfo}
                   />
               </View>
               <UserProfileModal
                   visible={this.state.isShowUserInfo}
                   onCloseModal={this.onCloseModal}
                   doneEdit ={this.doneEdit}
                   title={'Thông tin người tạo'}
                   userName={this.state.userInfoTripDetail.firstName + ' '+this.state.userInfoTripDetail.middleName  + ' '+ this.state.userInfoTripDetail.lastName }
                   numberPhone={this.state.userInfoTripDetail.phone}
                   onClick={this.handleCall}
               />
           </View>
        );
    }
}
TripDetails.defaultProps = {};
TripDetails.propTypes = {

};
function mapStateToProps(state) {
    return {
        login: state.loginReducer,
        error: state.loginReducer.error,
        userInfo:state.userReducer,
        dataTrip: state.tripReducer,
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
)(TripDetails);
