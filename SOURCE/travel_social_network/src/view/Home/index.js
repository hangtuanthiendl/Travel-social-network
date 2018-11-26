import React, { Component } from 'react';
import {
    View, StatusBar, UIManager, LayoutAnimation, Image, ImageBackground, FlatList,
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

let data = {};
let dataTrip = [];
class Home extends Component {

    constructor(props){
        super(props);
        this.state ={
            index: 0,
            routes: [
                {key: '1', title: 'Đã diễn ra'},
                {key: '2', title: 'Đang diễn ra'},
                {key: '3', title: 'Chưa diễn ra'},]
        };
        this._onScroll = this._onScroll.bind(this);

    }
    componentWillMount(){
        //this.init();
        this.initData();
    }
    init(){
        data = [{
            id:'a1',
            time: '232323',
            total: '35000',
            product: [{
                id:1,
                image: 'http://tunghaisan.com/sites/default/files/1427691019_giap.jpg',
                title: 'Cá bò da',
                price: '5000'
            },
                {
                    id:2,
                    image: 'http://phannha.net/files/assets/ca_bo_da.jpg',
                    title: 'Cá bò heo',
                    price: '5000'
                },
                {
                    id:3,
                    image: 'http://tunghaisan.com/sites/default/files/1427691019_giap.jpg',
                    title: 'Cá bò chó',
                    price: '5000'
                }]
        },{
            id:'a2',
            time: '232323',
            total: '35000',
            product: [{
                id:1,
                image: 'http://phannha.net/files/assets/ca_bo_da.jpg',
                title: 'Cá bò da',
                price: '5000'
            }]
        }, {
            id:'a3',
            time: '232323',
            total: '35000',
            product: [{
                id:1,
                image: 'http://tunghaisan.com/sites/default/files/1427691019_giap.jpg',
                title: 'Cá bò da',
                price: '5000'
            }]
        },
            {
                id:'a4',
                time: '232323',
                total: '35000',
                product: [{
                    id:1,
                    image: 'http://tunghaisan.com/sites/default/files/1427691019_giap.jpg',
                    title: 'Cá bò da',
                    price: '5000'
                }]
            },
             {
                id:'a5',
                time: '232323',
                total: '35000',
                product: [{
                    id:1,
                    image: 'http://tunghaisan.com/sites/default/files/1427691019_giap.jpg',
                    title: 'Cá bò da',
                    price: '5000'
                }]
            }, {
                id:'a6',
                time: '232323',
                total: '35000',
                product: [{
                    id:1,
                    image: 'http://tunghaisan.com/sites/default/files/1427691019_giap.jpg',
                    title: 'Cá bò da',
                    price: '5000'
                }]
            }, {
                id:'a7',
                time: '232323',
                total: '35000',
                product: [{
                    id:1,
                    image: 'http://tunghaisan.com/sites/default/files/1427691019_giap.jpg',
                    title: 'Cá bò da',
                    price: '5000'
                }]
            }
        ];
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




    componentDidMount(){
      StatusBar.setHidden(true);
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
            case '1':
                return (<TripListView onScroll={this._onScroll} data={dataTrip}
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
                return (<TripListView onScroll={this._onScroll} data={dataTrip}
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
            case '3':
                return (<TripListView onScroll={this._onScroll} data={dataTrip}
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
                    <IconButton nameIcon='ios-search' iconStyle={{fontSize: 35, color: global.black}}
                                onClick={() => alert("TrungDo")}/>}
            />
            <TabListTrips
                renderScene={this._renderScene}
                index={this.state.index}
                routes={this.state.routes}
                onIndexChange={this._handleIndexChange}
            />
            </View>
      </ImageBackground>
    );
  }
}

export default Home;