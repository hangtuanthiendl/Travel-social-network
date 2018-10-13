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
        backgroundColor: global.colorFF,
    },
    modalbox:{
        justifyContent: 'center',
        alignItems: 'center',
        height: '30%',
        width: '80%',
        borderRadius: 20,
        backgroundColor: global.colorTextPrimary
    },
    btn_with_icon:{
        margin: 5,
        width: 200,
        height: 45,
        backgroundColor: global.colorF3,
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_with_icon_text:{
        color: global.colorTextPrimary,
        fontSize: global.sizeP16,
        fontFamily: global.fontBold,
        alignSelf: 'center',
        textDecorationLine: 'underline',
        textAlign: 'center'
    }
});