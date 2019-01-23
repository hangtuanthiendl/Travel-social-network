
import React, { Component } from 'react';
import {
    Image,
    View, Text, TouchableOpacity, Dimensions
} from 'react-native';
import global from "../../../Styles/global";
import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
const {height, width} = Dimensions.get('window');
class CardHistorySearch extends Component {
    render() {
        const {onClick,actionDelete,nameSearch} = this.props;
        return (
            <TouchableOpacity onPress={onClick}>
                <View style={{ flexDirection: 'row',
                    height: 50,
                    marginRight:10,
                    marginLeft:10,
                    marginBottom:1,
                    alignItems: 'center',
                    backgroundColor:global.colorFF,
                    justifyContent: 'space-between',}}>
                    <View style = {{ flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft:5,
                        justifyContent: 'center',}}>
                        <Icon style={{color: global.orangeColor,fontSize:30}} name="md-alarm" />
                        <Text numberOfLines ={1} style = {{  fontSize: 18,
                            fontStyle: 'normal',
                            color: global.black,

                            marginLeft: 5}}>{nameSearch}</Text>
                    </View>
                    <TouchableOpacity onPress={actionDelete} style={{marginRight:10}}>
                        <Icon style={{color: global.orangeColor,fontSize:30}} name="md-close" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }
}

CardHistorySearch.defaultProps = {
    isShowBtn:false,
    onClick:()=>{}
};

CardHistorySearch.propTypes = {
    onClick:PropTypes.func,
    actionDelete:PropTypes.func,
    nameSearch:PropTypes.string,
};

export default CardHistorySearch
