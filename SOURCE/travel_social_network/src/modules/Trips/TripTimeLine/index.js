/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, ImageBackground
} from 'react-native';
import Timeline from 'react-native-timeline-listview'
import Header from "../../Header";
import global from "../../../Styles/global";
import IconButton from "../../../Components/Button/IconButton";
import image from "../../../themes/Images";
import TextComponent from "../../../Components/Text/Text";
import styleGlobal from "../../../Styles/styles";
import Icon from "react-native-vector-icons/Ionicons";
import CardTripItem from "../../../modules/Trips/CardTripItem";
import urls from "../../../api/urls";

class TripTimeline extends Component {
    constructor(){
        super();
        this.state = {
            dataStop : [],
        };
        this.onEventPress = this.onEventPress.bind(this);
        this.renderSelected = this.renderSelected.bind(this);
        this.renderDetail = this.renderDetail.bind(this);

        this.data = [
            {
                time: '09:00',
                tittle: 'Đồi chè Cầu Đất',
                description: 'Tới đây bạn sẽ được tận hưởng cảnh vật và thiên nhiên trong lành.',
                icon: require('../../../images/bycle.jpg'),
                img: 'http://a9.vietbao.vn/images/vi955/2013/12/55600814-1388139129-da-lat.jpg'
            },
            {
                time: '10:45',
                tittle: 'Cây Thông Cô Đơn',
                description: 'Thông luôn là biểu tượng từ bao đời của xứ sở ngàn hoa vì nó mang nét đẹp vĩnh cửu của thành phố sương. ',
                icon: require('../../../images/bycle.jpg'),
                img: 'https://fastly.4sqi.net/img/general/200x200/35465889_fV1LOnOJSpkaJOtHcSbBUdLTVmFQfBBcoXGZisFGFAg.jpg'
            },
            {
                time: '12:00',
                tittle: 'Đỉnh núi Lang Biang',
                icon: require('../../../images/bycle.jpg'),
                description: '"Langbiang được ví như "nóc nhà" của Đà Lạt. Từ trên đỉnh núi có thể nhìn thấy Suối Vàng ' +
                    'và Suối Bạc và toàn cảnh Đà Lạt trên cao, với những màn sương mù bay phất phơ trước mặt làm bạn cứ ngỡ ' +
                    'như là đang ở trên mây.',
                img: 'https://phongvehoanggia.com.vn/wp-content/uploads/2016/06/du-lich-sapa-2-ngay-2-dem-200x200.jpg'
            },
            {
                time: '14:00',
                tittle: 'Thung Lũng Tình Yêu',
                description: '"Muốn tham quan địa điểm du lịch ở Đà Lạt đẹp và nổi tiếng thì nhất định phải tới đây nha.' +
                    ' Thung lũng Tình Yêu đẹp và cuốn hút bởi thung lũng sâu và đồi thông quanh năm xanh biếc.',
                icon: require('../../../images/bycle.jpg'),
                img: 'http://tiepthivagiadinh.vn/UserFile/News/635347047205352564_17631/2012-01-27-073222994.jpg'
            },
            {
                time: '16:30',
                tittle: 'Tiệm Bánh Cối Xay Gió',
                description: '"Đây là địa điểm được check in nhiều nhất năm 2018 của các bạn trẻ ở Đà Lạt.',
                icon: require('../../../images/bycle.jpg'),
                img: 'https://danangxanh.com.vn/data/news/200/den-da-lat-check-in-ngay-resort-nay-de-co-view-ho-tuyen-lam-dep-khong-tuong.jpg'
            }
        ];
        this.state = {selected: null}
    }

    componentWillMount(){
        const {params} = this.props.navigation.state;
        let arr = [];
        console.log("data strop trips first",params.dataStop);
        if(params.dataStop.length > 0){
            params.dataStop.map((item)=>{
                item.time = item.time !== null ?  item.time.slice(5,10) : '12:02';
                item.img = urls.ROOT + item.img.slice(1);
                item.icon = require('../../../images/bycle.jpg');
                arr.push(item);
            })
        }
        console.log("data strop trips",arr);
        this.setState({
            dataStop:arr
        })
    }
    onEventPress(data){
        this.setState({selected: data})
    }

    renderSelected(){
        if(this.state.selected)
            return <Text style={{marginTop:10}}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
    }

    renderDetail(rowData, sectionID, rowID) {
        return (
            <CardTripItem
            title={rowData.tittle}
            description={rowData.description}
            imageUrl={rowData.img}
            />
        )
    }

    render() {
        return (
            <ImageBackground source={image.backgroundImage} style={styleGlobal.container}>
                <View style={styleGlobal.imgBackground}>
                    <Header
                        customHeaderStyle={{backgroundColor: global.yellow}}
                        leftHeader={<TextComponent
                            text={''}
                        />}
                        body={<TextComponent
                            text='Hành trình tour'
                            color={global.black}
                            size={global.sizeP20}
                            bold={global.fontWeightDark}/>}
                        rightHeader={<IconButton
                            nameIcon='ios-close'
                            iconStyle={{fontSize: 35, color: global.black}}
                            onClick={()=>this.props.navigation.goBack()}
                        />}
                    />
                    <Timeline
                    style={styles.list}
                    data={this.state.dataStop.length > 0 ? this.state.dataStop : this.data}
                    circleSize={20}
                    circleColor='rgba(0,0,0,0)'
                    lineColor={global.orangeColor}
                    timeContainerStyle={{minWidth:50, marginTop: -5}}
                    timeStyle={{textAlign: 'center',
                        marginTop:5,
                        marginLeft:1,
                        color:'white',
                        padding:5,
                        borderRadius:20,
                        borderColor:global.colorFF,
                        borderWidth: 2,
                        borderStyle:'solid'}}
                    descriptionStyle={{color:'red'}}
                    innerCircle={'icon'}
                    onEventPress={this.onEventPress}
                    renderDetail={this.renderDetail}
                    />
                </View>
            </ImageBackground>

        );
    }
}
export default TripTimeline;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: global.colorFF,
        width: '100%',
        height: '100%',
    },
    list: {
        flex: 1,
        marginTop:5,
    },
    title:{
        fontSize:16,
        fontWeight: 'bold'
    },
    descriptionContainer:{
        flexDirection: 'row',
        paddingRight: 50
    },
    image:{
        width: 50,
        height: 50,
        borderRadius: 25
    },
    textDescription: {
        marginLeft: 10,
        color: 'gray'
    }
});