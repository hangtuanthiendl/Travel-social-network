import React, { Component } from 'react';
import {
    View, StatusBar, UIManager, LayoutAnimation, Image, ImageBackground, FlatList, Dimensions, Keyboard,
} from 'react-native';
import Header from "../../modules/Header";
import global from '../../Styles/global';
import IconButton from "../../Components/Button/IconButton";
import styles from './styles';
import Text from '../../Components/Text/Text';
import TripListView from "../../modules/Trips/TripListView";
import TabListTrips from "../../modules/Tabs/TabListTrips";
import image from "../../themes/Images";
import styleGlobal from "../../Styles/styles";
import TripListItem from "../../modules/Trips/TripListItem";
import {bindActionCreators} from "redux";
import * as loginActions from "../../action/loginAction";
import * as placeAction from "../../action/placeAction";
import connect from "react-redux/es/connect/connect";
import * as tripActions from "../../action/tripAction";
import { setToLocal,getFromLocal } from "../../services/storage";
import * as userInfoAction from "../../action/userAction";
import urls from "../../api/urls";
import * as api from "../../api/Api";
const {height, width} = Dimensions.get('window');
let dataTrip = [];
class Home extends Component {

    constructor(props){
        super(props);
        this.state ={
            index: 1,
            routes: [
                {key: '2', title: 'Đã diễn ra'},
                {key: '1', title: 'Đang diễn ra'},
                {key: '0', title: 'Chưa diễn ra'},],
            onScrolling: false,
            isLogin:true,
            dataTrips:this.props.dataTrips.dataTrip,
        };
        this.data_DaDienRa = [];
        this.data_ChuaDienRa = [];
        this.data_DangDienRa = [];
        this._onScroll = this._onScroll.bind(this);
        this.handleGetListPlace = this.handleGetListPlace.bind(this);
        this.handleSearchTrip = this.handleSearchTrip.bind(this);
        this.handleTripDetail = this.handleTripDetail.bind(this);
    }
    handleData(dataTrip){
        dataTrip && dataTrip.map((item,index)=>{
            if(item.status === 0){
                this.data_ChuaDienRa.push(item);
            }else if(item.status === 1){
                this.data_DangDienRa.push(item);
            }else if(item.status === 2){
                this.data_DaDienRa.push(item);
            }
        });
        console.log("data0",this.data_ChuaDienRa);
        console.log("data1",this.data_DangDienRa);
        console.log("data2",this.data_DaDienRa);
    }
    async componentWillMount(){
        console.log("dataTrips",this.props.dataTrips);
        this.initData();
        if(this.props.dataTrips && this.props.dataTrips.dataTrip.length > 0){
            this.handleData(this.props.dataTrips.dataTrip);
        }else{
            this.handleData(dataTrip);
        }
        //this.handleData(dataTrip);
        console.log("Token_User",await getFromLocal('Token_User'));
        console.log("Token_User2",this.props.login);
        if(await getFromLocal('Token_User') !== null){
            this.props.userInfoAction.getUserInfo(await getFromLocal('Token_User'));
            this.setState({
                isLogin:true,
            })
        }else if(this.props.login.isLogin){
            this.props.userInfoAction.getUserInfo(this.props.login.data.token);
            this.setState({
                isLogin:true,
            })
        }else{
            console.log("da qua");
            this.setState({
                isLogin:false,
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.login && nextProps.login.isLogin !== this.props.login.isLogin && nextProps.login.isLogin) {
            this.setState({
                isLogin:nextProps.login.isLogin,
            });
        }
    }
    async componentDidMount(){
        console.log("this.props.login.token",this.props.login.token);
        console.log("getFromLocal('Token_User')1",await getFromLocal('Token_User'));
        if(await getFromLocal('Token_User') !== null){
            this.props.tripActions.getListMyTrip(await getFromLocal('Token_User'),0);
        }else{
            this.props.tripActions.getListMyTrip(this.props.login.token ,0);
        }
        if(this.props.login.token !== null && await getFromLocal('Token_User') === null){
            console.log("getFromLocal('Token_User')2",await getFromLocal('Token_User'));
            await setToLocal('Token_User', this.props.login.data.token);
        }

        StatusBar.setHidden(true);
    }
    handleGetListPlace(){
        //this.props.placeAction.getListPlace(1,this.props.login.data.token);
        this.props.navigation.navigate("MyMap");
    }
    initData() {
        //0: chua dien ra, 1: dang dien ra, 2: da ket thuc
        dataTrip = [
            {
                id: 'a1',
                title: 'Du lich Nha Trang ',
                numberParticipant: 20,
                quantity: 30,
                status: 0,
                numberStar: 4,
                timeStart: '20/10/2018',
                timeEnd: '20/11/2018',
                locationStart: 'Tp. Ho Chi Minh',
                namePersonCreate:'Trung Do',
                imgBackground:'http://www.nivitigala.ps.gov.lk/english/images/com_fwgallery/files/420/mid_2014-beautiful-nature-wallpapers-for-background-beautiful-nature-20.jpg',
                imgAvatar:'https://i.pinimg.com/236x/d1/48/3e/d1483e43b77a8fe49b6d6856079d3cae--purple-things-purple-stuff.jpg',
            },
            {
                id: 'a2',
                title: 'Du lich Da Lat',
                numberParticipant: 20,
                quantity: 30,
                status: 0,
                numberStar: 4,
                timeStart: '20/10/2018',
                timeEnd: '20/11/2018',
                locationStart: 'Tp. Ho Chi Minh',
                namePersonCreate:'Trung Do',
                imgBackground:'http://vietnamtourism.gov.vn/images/MuCangChai-YenBai1.jpg',
                imgAvatar:'http://biketsworldtour.com/wp-content/uploads/2013/04/ef995443d411c0847e8d5f67c83bfd9c_large-e1367182889174.jpeg',
            },
            {
                id: 'a3',
                title: 'Du lich Côn đảo',
                numberParticipant: 20,
                quantity: 30,
                status: 1,
                numberStar: 2,
                timeStart: '20/10/2018',
                timeEnd: '20/11/2018',
                locationStart: 'Tp. Ho Chi Minh',
                namePersonCreate:'Trung Do',
                imgBackground:'http://vietnamtourism.gov.vn/images/MuCangChai-YenBai1.jpg',
                imgAvatar:'http://biketsworldtour.com/wp-content/uploads/2013/04/ef995443d411c0847e8d5f67c83bfd9c_large-e1367182889174.jpeg',
            },
            {
                id: 'a4',
                title: 'Du lich Vũng Tàu',
                numberParticipant: 20,
                quantity: 30,
                status: 0,
                numberStar: 5,
                timeStart: '20/10/2018',
                timeEnd: '20/11/2018',
                locationStart: 'Tp. Ho Chi Minh',
                namePersonCreate:'Trung Do',
                imgBackground:'http://vietnamtourism.gov.vn/images/MuCangChai-YenBai1.jpg',
                imgAvatar:'http://biketsworldtour.com/wp-content/uploads/2013/04/ef995443d411c0847e8d5f67c83bfd9c_large-e1367182889174.jpeg',
            },
            {
                id: 'a5',
                title: 'Du lich SaPa',
                numberParticipant: 20,
                quantity: 30,
                status: 2,
                numberStar: 4,
                timeStart: '20/10/2018',
                timeEnd: '20/11/2018',
                locationStart: 'Tp. Ho Chi Minh',
                namePersonCreate:'Trung Do',
                imgBackground:'http://vietnamtourism.gov.vn/images/MuCangChai-YenBai1.jpg',
                imgAvatar:'https://i.pinimg.com/236x/76/df/57/76df577ffd358b4cb39e1a69288a5ba1.jpg',
            },
            {
                id: 'a6',
                title: 'Du lich Tây Ninh',
                numberParticipant: 20,
                quantity: 30,
                status: 0,
                numberStar: 3,
                timeStart: '20/10/2018',
                timeEnd: '20/11/2018',
                locationStart: 'Tp. Ho Chi Minh',
                namePersonCreate:'Trung Do',
                imgBackground:'https://anh.24h.com.vn/upload/4-2013/images/2013-10-18/1382066384-sapa.jpg',
                imgAvatar:'https://anh.24h.com.vn/upload/4-2013/images/2013-10-18/1382066384-sapa.jpg',
            },
            {
                id: 'a7',
                title: 'Du lich Hội An',
                numberParticipant: 20,
                quantity: 30,
                status: 0,
                numberStar: 4,
                timeStart: '20/10/2018',
                timeEnd: '20/11/2018',
                locationStart: 'Tp. Ho Chi Minh',
                namePersonCreate:'Trung Do',
                imgBackground:'http://vietnamtourism.gov.vn/images/MuCangChai-YenBai1.jpg',
                imgAvatar:'https://i.pinimg.com/236x/76/df/57/76df577ffd358b4cb39e1a69288a5ba1.jpg',
            },

        ];
    }

    _onScroll(event) {
        // Simple fade-in / fade-out animation
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        const CustomLayoutLinear = {
            duration: 250,
            create: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity
            },
            update: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity
            },
            delete: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity
            }
        };
        // Check if the user is scrolling up or down by confronting the new scroll position with your own one
        const currentOffset = event.nativeEvent.contentOffset.y;
        if (Math.abs(currentOffset - this._listViewOffset) <= 50) {
            return;
        }
        const direction =
            currentOffset > 0 && currentOffset > this._listViewOffset ? "up" : "down";
        // If the user is scrolling down (and the is still visible) hide it
        const onScrolling = direction === "up";
        if (
            onScrolling !== this.state.onScrolling
        ) {
            LayoutAnimation.configureNext(CustomLayoutLinear);
            //this.onScrolling = onScrolling;
            this.setState({onScrolling});
        }
        console.log(this._listViewOffset, this.state.onScrolling);
        // Update your scroll position
        this._listViewOffset = currentOffset;
    }
    async handleTripDetail(item){
        if(this.state.isLogin){
            this.props.navigation.navigate('Details',{
                dataDetail : item,
            })
        }else{
            this.props.navigation.navigate('Login');
        }
    }
    _renderScene = ({route}) => {
        switch (route.key) {
            case '0':
                return (<TripListView onScroll={this._onScroll} data={this.data_ChuaDienRa}
                                     renderItem={({item,index})=>
                                         <TripListItem
                                             dataDetail={item}
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
                />);
            case '1':
                return (<TripListView onScroll={this._onScroll} data={this.data_DangDienRa}
                                      renderItem={({item,index})=>
                                          <TripListItem
                                              dataDetail={item}
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
                />);
            case '2':
                return (<TripListView onScroll={this._onScroll} data={this.data_DaDienRa}
                                      renderItem={({item,index})=>
                                          <TripListItem
                                              dataDetail={item}
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
                />);
            default:
                return null;
        }
    };
    _handleIndexChange = index =>
        this.setState({
            index,
        });
    handleSearchTrip(){
        this.props.navigation.navigate('SearchTrip',{
            dataTrips:this.state.dataTrips
        });
    }
  render() {
    return (
        <ImageBackground source={image.backgroundImage} style={styleGlobal.container}>
            <View style={styleGlobal.imgBackground}>
                <Header
                    customHeaderStyle={{backgroundColor: global.yellow}}
                    leftHeader={<IconButton nameIcon='ios-search' iconStyle={{fontSize: 35, color: global.black}} onClick={this.handleSearchTrip}/>}
                    body={<Text
                        text='Home'
                        color={global.black}
                        size={global.sizeP20}
                        />}
                    rightHeader={
                        <IconButton nameIcon='ios-pin' iconStyle={{fontSize: 35, color: global.black}}
                                    onClick={this.handleGetListPlace}/>}
                />
                <TabListTrips
                    renderScene={this._renderScene}
                    index={this.state.index}
                    routes={this.state.routes}
                    onIndexChange={this._handleIndexChange}
                />
                {!this.state.onScrolling &&
                    <View style={{
                        width:width,
                        height:50,
                        position:'absolute',
                        bottom:20,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        paddingRight: 30
                    }}>
                        <IconButton
                            nameIcon='ios-create'
                            iconStyle={{fontSize: 30,fontWeight: global.fontWeightBold, color: global.orange}}
                            onClick={()=>this.props.navigation.navigate("CreateTrip")}
                            btnStyle={{
                                backgroundColor:global.colorF3,
                                width:50,
                                height:50,
                                borderRadius:25,
                            }}/>
                    </View>
                }
            </View>
      </ImageBackground>
    );
  }
}
//this.props.tripActions.createTrip(this.props.login.data.token)
function mapStateToProps(state) {
    return {
        login: state.loginReducer,
        error: state.loginReducer.error,
        userInfo:state.userReducer,
        dataTrips : state.tripReducer,
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
)(Home);

