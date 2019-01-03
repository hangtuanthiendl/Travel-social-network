import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Ionicons";
import global from "../../../Styles/global";
const {
    height,
    width
} = Dimensions.get('window');
const AlineItem = ({nameIcon,styleIcon,txtAction,txtName,onClick}) => {
    let styleContainer ={
        width:width,
        height:60,
        backgroundColor:global.colorFF,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    };
    let styleIcons ={
        fontSize:30,
        color:'black',
        marginRight: 10,
    };
    return (
        <TouchableOpacity onPress={onClick}>
            <View style={[styleContainer,]}>
                <View style={{flexDirection:'row', marginLeft: 10, alignItems: 'center'}}>
                    <Icon name={nameIcon}
                          style={[styleIcons,styleIcon]}
                    />
                    <Text style={{fontWeight: global.fontWeightNormal,fontSize:global.sizeP18}}>
                        {txtName}
                    </Text>
                </View>
                <View style={{flexDirection:'row', marginRight: 5, alignItems: 'center'}}>
                    <Text style={{marginRight: 7}}>
                        {txtAction}
                    </Text>
                    <Icon name={'ios-arrow-forward'}
                          style={{color: global.color53,fontSize: 20}}
                    />
                </View>
            </View>
            <View style={{width: width,height:1, backgroundColor: global.backgroudText}}>

            </View>
        </TouchableOpacity>
    );
};

AlineItem.defaultProps = {

};

AlineItem.propTypes = {
    nameIcon:PropTypes.string,
    styleIcon:PropTypes.object,
    txtAction:PropTypes.string,
    txtName:PropTypes.string,
    onClick:PropTypes.func,
};

export default AlineItem;
