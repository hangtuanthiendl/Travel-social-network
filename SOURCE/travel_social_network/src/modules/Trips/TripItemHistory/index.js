

import React, { Component } from 'react';
import {
    ImageBackground, Text,
    View, TouchableOpacity, Dimensions
} from 'react-native';
import global from "../../../Styles/global";
import RoundAvatar from "../../../Components/Avatar/RoundAvatar";
import PropTypes from "prop-types";
import TripListView from "../TripListView";
import urls from "../../../api/urls";
const {height, width} = Dimensions.get('window');
export default class TripItemHistory extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataCountMemberWaiting :[],
        };
        this.convertNumberToCurrency = this.convertNumberToCurrency.bind(this);
    }
    convertNumberToCurrency(money) {
        let value = money.toString();
        if (value != "") {
            value = value.replace(/\D/g, "");
            value = value.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1" + '.');
        }
        return value
    }
    render() {
        const {dataTripHistory} = this.props;
        return (
           <TouchableOpacity style={{ height: 100,
               alignItems: 'flex-start',
               backgroundColor:global.colorFF,
               flexDirection: 'row',
               display: 'flex',
               marginBottom:3,
               borderRadius:10,
               marginRight: 10,
               marginLeft: 10,}}>
               <View style={{
                   width:100,
                   height:100,
                   justifyContent: 'center',

               }}>
                   <RoundAvatar
                       onPress={()=>{}}
                       size={'x-small'}
                       icSrc={dataTripHistory.img !== null ? urls.ROOT + dataTripHistory.img.slice(1):'https://anh.24h.com.vn//upload/1-2015/images/2015-02-12/1423706954-anhgirlxinh.jpg'}/>
               </View>
               <View style={{
                   width:250,height:100,paddingLeft: 10,paddingTop: 15
               }}>
                   <Text style={{paddingBottom: 5,fontSize:18 ,color:dataTripHistory.status === 2?global.red: dataTripHistory.status === 1 ? global.green :global.yellowColor }}>
                       {dataTripHistory.tittle}
                   </Text>
                   <Text style={{paddingBottom: 5,fontSize:18}}>
                       {'Kinh phí:' + this.convertNumberToCurrency(dataTripHistory.quantity) + 'Đ'}
                   </Text>
               </View>
           </TouchableOpacity>
        );
    }
}
TripItemHistory.propTypes = {
    dataTripHistory: PropTypes.object,
};
