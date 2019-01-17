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
    TextInput
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
let data = {};
const SECTIONS = [
    {
        title1: 'Nơi khởi hành:',
        content1: 'Tp. Hồ Chí Minh',
        title2:'Nơi kết thúc:',
        content2:'Tp. Đà Lạt',
    },
    {
        title1: 'Thời gian đầu:',
        content1: '20-11-2018',
        title2:'Thời gian kết thúc:',
        content2:'25-11-2018'
    }
];
const SECTIONSDETAILS = [
    {
        title: 'Thông tin chi tiết ',
        content: 'Ngày 1 : Tp.Hồ Chí Minh - Nha Trang\n' +
            '5h30p: xuất phát , chúng ta ăn sáng tại Đồng Nai vào lúc 7h30p\n' +
            '7h30p: tiếp tục di chuyển và ngừng lại chụp hình ở Bình Thuận, bãi cát sa mạc đến 10h\n' +
            '3h: chúng ta đến Nha Trang và nghỉ ngơi tại đó\n' +
            'Ngày 2: Tham gian các điạ điểm du lịch ở Nha Trang (Tháp Bà, ,,,,)\n' +
            'Ngày 3: Di chuyển về lại Sài Gòn',
    }
];
class TripDetails extends Component {
    constructor(props){
        super(props);
        this.state ={
            activeSections: [],
            activeSectionsDETAILS: [],
            userInfo: this.props.userInfo,
            isShowUserInfo:false,
        };
        this.handleShowUserInfo = this.handleShowUserInfo.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.doneEdit = this.doneEdit.bind(this);
    }
     componentWillMount(){
        this.initData();
         console.log("nextProps.userInfo",this.props.userInfo);
    }
    componentWillReceiveProps(nextProps){
        console.log("nextProps.userInfo",this.props.userInfo,nextProps.userInfo);
        if(this.props.userInfo && nextProps.userInfo && !_.isEqual(this.props.userInfo,nextProps.userInfo)){
            this.setState({
                userInfo:nextProps.userInfo
            },()=> console.log("nextProps.userInfo",this.state.userInfo))
        }
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
    render() {
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
                                       text={'20/11/2018'}
                                       color={global.colorFF}
                                       style={{
                                           alignItems:'center',
                                           justifyContent:'center',
                                           fontSize:16,
                                           marginLeft: 5,
                                           alignSelf: 'center',
                                           marginTop: 30,
                                       }}
                                   />
                               </View>
                               <View style={styles.header_text_child}>
                                   <IconButton nameIcon='ios-flower' iconStyle={styles.icon_numberParticipant}/>
                                   <TextComponent
                                       text={'So cho trong: 20'}
                                       color={global.colorFF}
                                       style={{
                                           alignItems:'center',
                                           justifyContent:'center',
                                           fontSize:16,
                                           marginLeft: 5,
                                           alignSelf: 'center'
                                       }}
                                   />
                               </View>
                               <View style={styles.header_text_child}>
                                   <Image
                                       source={{uri:'https://i.ytimg.com/vi/3dLyIZ6fUGs/maxresdefault.jpg'}}
                                       style={styleGlobal.avatar}
                                   />
                                   <TextComponent
                                       text={'Nha Trang - Da Lat - Tp.HCM'}
                                       color={global.colorFF}
                                       bold={'700'}
                                       numberOfLines={2}
                                       style={{
                                           alignItems:'center',
                                           justifyContent:'center',
                                           fontSize:16,
                                           marginLeft: 5,
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
                                onClick={()=>this.props.navigation.navigate('TripTimeline')}
                            />
                       </View>
                       <ScrollView
                           showsVerticalScrollIndicator={false}
                         >
                           <Accordion
                               sections={SECTIONS}
                               activeSections={this.state.activeSections}
                               renderHeader={this._renderHeader}
                               renderContent={this._renderContent}
                               onChange={this._updateSections}
                           />
                           <View style={styles.header_drop_down}>
                               <Icon name={'ios-flag'} style={{
                                   color:global.orange,
                                   fontSize:25,
                               }}/>
                               <Text style={styles.text_title_drop_down}>Đia điểm tham quan</Text>
                               <IconButton nameIcon={'ios-arrow-round-forward'} iconStyle={{color:global.orange,
                                   fontSize:25,}} btnStyle={{width:width/1.3,justifyContent:'flex-end'}} onClick={()=>alert('Maps')}/>
                           </View>
                           <Accordion
                               sections={SECTIONSDETAILS}
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
                           <View style={{
                               backgroundColor:global.colorF4,
                               marginLeft:10,
                               marginRight: 10,
                               height:40,
                               flexDirection: 'row',
                               justifyContent:'space-between',
                               alignItems:'center',
                               borderRadius:20,
                           }}>
                               <View style={{marginLeft:5,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                   <Icon name={'ios-chatbubbles'} style={{
                                       color:global.yellowColor,
                                       fontSize:25,
                                   }}/>
                                   <TextInput
                                       onChangeText={(text) => this.setState({username: text})}
                                       style={{
                                           color:global.black,
                                           marginLeft:10,
                                           width:260,
                                       }}
                                       multiline={true}
                                       maxLength={100}
                                       placeholder={'Viết bình luận '}
                                       value={this.state.username}
                                       placeholderTextColor={global.black}
                                       autoCapitalize = 'none'
                                       underlineColorAndroid="transparent"
                                   />
                               </View>
                               <IconButton
                                   nameIcon={'ios-paper-plane'}
                                   iconStyle={{color:global.colorFF,fontSize:15}}
                                   btnStyle={{width:30,height:30,borderRadius:15,backgroundColor:global.yellowColor,marginRight:10}}
                                   onClick={()=>alert('send comments')}
                               />
                           </View>
                           <View style={{
                               backgroundColor:global.backgroudTransparent,
                               height:25,
                           }}>
                           </View>
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
                    }}>
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
                   userName={'Do Quoc Trung'}
                   numberPhone={'0934197445'}
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
        userInfo:state.userReducer
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
