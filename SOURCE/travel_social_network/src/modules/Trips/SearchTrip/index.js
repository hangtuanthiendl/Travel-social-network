
import React, { Component } from 'react';
import {
    Dimensions,
    ImageBackground,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import styles from './styles'
import Header from "../../Header";
import global from "../../../Styles/global";
import IconButton from "../../../Components/Button/IconButton";
import TextComponent from "../../../Components/Text/Text";
const {
    height,
    width
} = Dimensions.get('window');
class SearchTrip extends Component {
    constructor(props){
        super(props);
        this.state = {

        };

    }

    render() {
        return (
            <View style={styles.container_search}>
                <Header
                    customHeaderStyle={{backgroundColor: global.yellow}}
                    leftHeader={<IconButton nameIcon='ios-search' iconStyle={{fontSize: 35, color: global.black}} onClick={this.handleSearchTrip}/>}
                    body={<TextComponent
                        text='Home'
                        color={global.black}
                        size={global.sizeP20}
                    />}
                    rightHeader={
                        <IconButton nameIcon='ios-pin' iconStyle={{fontSize: 35, color: global.black}}
                                    onClick={this.handleGetListPlace}/>}
                />
            </View>
        );
    }
}
export  default  SearchTrip;
