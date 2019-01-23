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
        height:height,
        position: 'relative',
        backgroundColor: global.imgBackground
        //backgroundColor: 'red',
    },
    txt_search:{
        height:40,
        borderRadius:10,
        borderWidth: 1,
        borderColor:global.orange,
        backgroundColor:global.colorFF,
        color: global.black,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 50,
        marginBottom:5,
        paddingLeft: 10,
        fontSize: global.sizeP18
    },
    row1: {
        flexDirection: 'row',
        padding: 10,
        height: 50,
        borderBottomWidth: 0.5,
        borderColor: 'grey',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});