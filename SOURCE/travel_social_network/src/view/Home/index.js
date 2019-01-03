import React, { Component } from 'react';
import {
    View, StatusBar, UIManager, LayoutAnimation, Image, ImageBackground, FlatList, Dimensions,
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
        };
        this.data_DaDienRa = [];
        this.data_ChuaDienRa = [];
        this.data_DangDienRa = [];
        this._onScroll = this._onScroll.bind(this);
        this.handleGetListPlace = this.handleGetListPlace.bind(this);

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
    componentWillMount(){
        this.initData();
        this.handleData(dataTrip)
    }
    async componentDidMount(){
        console.log("this.props.login.token",this.props.login.token);
        if(this.props.login.token === null && await getFromLocal('Token_User') !== null){
            setToLocal('Token_User', this.props.login.data.token);
        }
        StatusBar.setHidden(true);
    }
    handleGetListPlace(){
        this.props.placeAction.getListPlace(1,this.props.login.data.token);
    }
    initData() {
        //0: chua dien ra, 1: dang dien ra, 2: da ket thuc
        dataTrip = [
            {
                id: 'a1',
                title: 'Du lich Nha Trang Du lich Nha Trang Du lich Nha Trang',
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
                title: 'Du lich Nha Trang',
                numberParticipant: 20,
                quantity: 30,
                status: 1,
                numberStar: 4,
                timeStart: '20/10/2018',
                timeEnd: '20/11/2018',
                locationStart: 'Tp. Ho Chi Minh',
                namePersonCreate:'Trung Do',
                imgBackground:'http://vietnamtourism.gov.vn/images/MuCangChai-YenBai1.jpg',
                imgAvatar:'http://biketsworldtour.com/wp-content/uploads/2013/04/ef995443d411c0847e8d5f67c83bfd9c_large-e1367182889174.jpeg',
            },
            {
                id: 'a4',
                title: 'Du lich Nha Trang',
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
                id: 'a5',
                title: 'Du lich Nha Trang',
                numberParticipant: 20,
                quantity: 30,
                status: 2,
                numberStar: 4,
                timeStart: '20/10/2018',
                timeEnd: '20/11/2018',
                locationStart: 'Tp. Ho Chi Minh',
                namePersonCreate:'Trung Do',
                imgBackground:'http://vietnamtourism.gov.vn/images/MuCangChai-YenBai1.jpg',
                imgAvatar:'http://biketsworldtour.com/wp-content/uploads/2013/04/ef995443d411c0847e8d5f67c83bfd9c_large-e1367182889174.jpeg',
            },
            {
                id: 'a6',
                title: 'Du lich Nha Trang',
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
                id: 'a7',
                title: 'Du lich Nha Trang',
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
    _renderScene = ({route}) => {
        switch (route.key) {
            case '0':
                return (<TripListView onScroll={this._onScroll} data={this.data_ChuaDienRa}
                                     renderItem={({item,index})=>
                                         <TripListItem
                                             key={index}
                                             index={index}
                                             id={item.id}
                                             title={item.title}
                                             numberParticipant={item.numberParticipant}
                                             quantity={item.quantity}
                                             status={item.status}
                                             numberStar={item.numberStar}
                                             timeStart={item.timeStart}
                                             timeEnd={item.timeEnd}
                                             locationStart={item.locationStart}
                                             namePersonCreate={item.namePersonCreate}
                                             imgBackground={item.imgBackground}
                                             imgAvatar={item.imgAvatar}
                                             onClick={()=>this.props.navigation.navigate('Details')}
                                         />
                                     }
                />);
            case '1':
                return (<TripListView onScroll={this._onScroll} data={this.data_DangDienRa}
                                      renderItem={({item,index})=>
                                          <TripListItem
                                              key={index}
                                              index={index}
                                              id={item.id}
                                              title={item.title}
                                              numberParticipant={item.numberParticipant}
                                              quantity={item.quantity}
                                              status={item.status}
                                              numberStar={item.numberStar}
                                              timeStart={item.timeStart}
                                              timeEnd={item.timeEnd}
                                              locationStart={item.locationStart}
                                              namePersonCreate={item.namePersonCreate}
                                              imgBackground={item.imgBackground}
                                              imgAvatar={item.imgAvatar}
                                              onClick={()=>this.props.navigation.navigate('Details')}
                                          />
                                      }
                />);
            case '2':
                return (<TripListView onScroll={this._onScroll} data={this.data_DaDienRa}
                                      renderItem={({item,index})=>
                                          <TripListItem
                                              key={index}
                                              index={index}
                                              id={item.id}
                                              title={item.title}
                                              numberParticipant={item.numberParticipant}
                                              quantity={item.quantity}
                                              status={item.status}
                                              numberStar={item.numberStar}
                                              timeStart={item.timeStart}
                                              timeEnd={item.timeEnd}
                                              locationStart={item.locationStart}
                                              namePersonCreate={item.namePersonCreate}
                                              imgBackground={item.imgBackground}
                                              imgAvatar={item.imgAvatar}
                                              onClick={()=>this.props.navigation.navigate('Details')}
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
  render() {
    return (
        <ImageBackground source={image.backgroundImage} style={styleGlobal.container}>
            <View style={styleGlobal.imgBackground}>
                <Header
                    customHeaderStyle={{backgroundColor: global.yellow}}
                    leftHeader={<IconButton nameIcon='ios-search' iconStyle={{fontSize: 35, color: global.black}}/>}
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
function mapStateToProps(state, ownProps) {
    return {
        login: state.loginReducer,
        error: state.loginReducer.error,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
        placeAction: bindActionCreators(placeAction,dispatch),
        tripActions:bindActionCreators(tripActions,dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

