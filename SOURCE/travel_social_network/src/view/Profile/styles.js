import {
    StyleSheet,
    Dimensions
} from 'react-native';
const {
    height,
    width
} = Dimensions.get('window');
import global from '../../Styles/global';
export const imageWidth = width;
export const imageHeight = (imageWidth / 500) * 330;

export default StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    header_profile:{
        flex: 1,
        width:width,
        position: 'relative',
    },
    header_profile_view:{
      position:'absolute',
      top:0,
      left:0,
      right:0,
      bottom:0,
        justifyContent:'center',
        alignItems:'center',
      backgroundColor:global.imgBackgroundCard,

    },
    body_profile:{
      flex:2,
      width:width,
      backgroundColor:global.colorFF
    }
});