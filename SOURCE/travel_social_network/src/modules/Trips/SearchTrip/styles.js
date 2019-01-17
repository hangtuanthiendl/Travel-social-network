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
    container_search: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: global.purple
    },
});