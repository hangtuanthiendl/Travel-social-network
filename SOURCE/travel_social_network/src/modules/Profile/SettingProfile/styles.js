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
        width: width,
        height: height,
        backgroundColor: global.colorFF
    },
    header_profile_setting:{
        flex: 1,
        width:width,
        position: 'relative',
    },
    header_profile_view_setting:{
        flex:1,
        alignItems:'center',
        backgroundColor:global.imgBackgroundCard,

    },
    setting_item:{

    }
});