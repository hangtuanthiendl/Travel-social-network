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
    container_map_view:{
        ...StyleSheet.absoluteFillObject
    },
    map_view:{
        ...StyleSheet.absoluteFillObject
    },
    radius:{
        height:50,
        width:50,
        borderRadius:50/2,
        backgroundColor: '#ff000013',
        borderWidth:1,
        borderColor:'#ff00004b',
        alignItems:'center',
        justifyContent:'center'

    },
    maker:{
        height:12,
        width:12,
        borderColor:'white',
        backgroundColor:'#ff0000',
        borderRadius:12/2,
        overflow:'hidden',
    },
    btn_MyLocation:{
        height:40,
        width:40,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom:40,
        //left: Dimensions.get('window').width - 60,
        left:5,
        zIndex: 100,
        borderRadius:40/2,
        backgroundColor:'#01000c2f',
    },
    btn_eat:{
        height:40,
        width:40,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom:160,
        //left: Dimensions.get('window').width - 60,
        left:5,
        zIndex: 100,
        borderRadius:40/2,
        backgroundColor:'#01000c2f',
    },
    btn_hotel:{
        height:40,
        width:40,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom:100,
        //left: Dimensions.get('window').width - 60,
        left:5,
        zIndex: 100,
        borderRadius:40/2,
        backgroundColor:'#01000c2f',
    },
    btn_atm:{
        height:40,
        width:40,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom:40,
        //left: Dimensions.get('window').width - 60,
        left:5,
        zIndex: 100,
        borderRadius:40/2,
        backgroundColor:'#01000c2f',
    },

    btn_back_home:{
        position:'absolute',
        top:2,
        width:width,
        alignItems:'flex-start',
        justifyContent:'space-between',
        backgroundColor:'transparent',
        flexDirection:'row',
        height:30,
        paddingLeft: 5,
        paddingRight: 5
    },
    icon_back:{
        color:global.colorFF,
        fontSize: 20,
    },
    bg_btn_back:{
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        width:40,
        backgroundColor:global.imgBackgroundOrange,
        shadowColor: '#000000',
        shadowOffset: {
            width: 2,
            height:10
        },
        shadowRadius: 3,
        shadowOpacity:0.9,
        elevation:5,
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
    result_Search:{
        height:40,
        borderRadius:5,
        borderWidth: 1,
        borderColor:global.colorFF,
        backgroundColor:global.orange,
        marginRight: 20,
        marginLeft: 20,
        justifyContent:'center',
        paddingLeft: 10,
    },
    information:{
        flex:1,
        justifyContent:'center',
        width:200,
        borderRadius:100,
    },
    text_inf:{
        fontWeight:'bold',
        fontStyle:'italic'
    },
});