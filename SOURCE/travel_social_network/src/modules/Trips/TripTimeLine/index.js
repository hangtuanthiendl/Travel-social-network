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

class TripTimeline extends Component {
    constructor(){
        super();
        this.onEventPress = this.onEventPress.bind(this);
        this.renderSelected = this.renderSelected.bind(this);
        this.renderDetail = this.renderDetail.bind(this);

        this.data = [
            {
                time: '09:00',
                title: 'Archery Training',
                description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
                icon: require('../../../images/bycle.jpg'),
                imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
            },
            {
                time: '10:45',
                title: 'Play Badminton',
                description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
                icon: require('../../../images/bycle.jpg'),
                imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
            },
            {
                time: '12:00',
                title: 'Lunch',
                icon: require('../../../images/bycle.jpg'),
                description: 'Team sport played between two teams of eleven players with a spherical ball. ',
                imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
            },
            {
                time: '14:00',
                title: 'Watch Soccer',
                description: 'Team sport played between two teams of eleven players with a spherical ball. ',
                icon: require('../../../images/bycle.jpg'),
                imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
            },
            {
                time: '16:30',
                title: 'Go to Fitness center',
                description: 'Look out for the Best Gym & Fitness Centers around me :)',
                icon: require('../../../images/bycle.jpg'),
                imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
            }
        ];
        this.state = {selected: null}
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
            title={rowData.title}
            description={rowData.description}
            imageUrl={rowData.imageUrl}
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
                    data={this.data}
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