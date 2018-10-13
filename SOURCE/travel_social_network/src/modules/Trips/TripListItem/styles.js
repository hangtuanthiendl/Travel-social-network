import {
    StyleSheet,
    Dimensions
} from 'react-native';
const {
    height,
    width
} = Dimensions.get('window');
import global from '../../../Styles/global';
export const imageWidth = width;
export const imageHeight = (imageWidth / 500) * 330;

export default StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: global.colorF4,
},
icon:{
    fontSize: 35,
    color: global.colorF3,
},
card_container:{
    width:width,
    backgroundColor: global.colorFF,
    marginBottom:15,
},
viewLine: {
    backgroundColor: '#CFD8DC',
    height: 0.5,
    width: width,
},
});