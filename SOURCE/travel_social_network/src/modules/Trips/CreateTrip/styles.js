import {
    StyleSheet,
    Dimensions
} from 'react-native';
const {
    height,
    width
} = Dimensions.get('window');
import global from '../../../Styles/global';

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
    txt_time:{
        marginLeft: 20,fontSize:20,color:global.color66
    },
    txt_time_warning:{
        borderColor:global.colorRed,
        borderWidth: 1,
    }
});