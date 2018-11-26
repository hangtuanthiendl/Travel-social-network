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
    container_details: {
        flex: 1,
        height:height,
        width:width,
        position:'relative',
    },
    header_details:{
        flex:1,
        backgroundColor: global.imgBackgroundCard,
        position: 'relative',
    },
    body_details:{
        position:'absolute',
        top:0,
        right:0,
        left:0,
        bottom:0,
        backgroundColor: global.imgBackgroundCard,
    },
    footer_details:{
        width:width,
        position:'absolute',
        bottom:10,
        height:50,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
    },
    header_title_details:{
        position:'absolute',
        bottom:-1,
        height:120,
        width:width,
        alignItems:'center',
    },
    header_text_container:{
        height:120,
        width:220,
        backgroundColor:global.backgroudText,
        borderTopLeftRadius:200,
        borderTopRightRadius:200,
        justifyContent: 'flex-end'
    },
    header_text_child: {
        flexDirection: 'row',
        width: 180,
        marginLeft: 10,
        marginBottom: 3,
    },
    icon_numberParticipant:{
        color:global.orange,
        fontSize: 30,
        marginLeft: 20,
    },
    icon_timeStart:{
        color:global.orange,
        fontSize: 20,
        marginLeft:50,
        paddingTop: 30,
    },

    ///////////////////
    btn_back_details:{
        position:'absolute',
        top:0,
        width:width,
        alignItems:'center',
        backgroundColor:'transparent',
        elevation:5,
    },
    icon_back:{
        color:global.colorFF,
        fontSize: 35,
    },
    bg_btn_back:{
        width:50,
        backgroundColor:global.imgBackgroundOrange,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        shadowColor: '#000000',
        shadowOffset: {
            width: 2,
            height:10
        },
        shadowRadius: 3,
        shadowOpacity:0.9,
        elevation:5,

    },
    icon_tour:{
        color:global.colorFF,
        fontSize: 35,
    },
    btn_tour:{
        backgroundColor: global.backgroudTransparent,
        overflow: 'hidden',
        width:200,
        height:40,
        flexDirection: 'row',
        borderColor: global.colorFF, borderWidth: 1,
        borderRadius:30,
        shadowColor: global.yellow,
        shadowOffset: {
            width: 0,
            height:2
        },
        shadowRadius: 3,
        shadowOpacity:0.9,
    },
    txt_btn_tour:{
        fontSize:16,
        fontWeight: global.fontWeightBold,
        marginLeft:5,
    },
    bg_btn_tour:{
        width:width,
        height:70,
        justifyContent:'center',
        alignItems:'center'
    },
    header_drop_down:{
        backgroundColor:global.backgroudTransparent,
        marginLeft:10,
        marginRight: 10,
        marginBottom:7,
        height: 40,
        borderBottomColor:global.orange,
        borderColor:global.backgroudTransparent,
        borderWidth: 1,
        borderStyle:'solid',
        flexDirection: 'row',
        alignItems:'center',
        paddingLeft: 5,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
    },
    content_drop_down:{
        backgroundColor: global.backgroudText,
        marginLeft:10,
        marginRight: 10,
        borderBottomRightRadius:40,
        flexDirection: 'row',
        alignItems:'center',
        borderRightWidth:2,
        borderBottomWidth:5,
        borderStyle:'solid',
        borderBottomColor:global.orange,
        borderRightColor:global.orange,
        borderColor:global.backgroudTransparent,

    },
    text_title_drop_down:{
        marginLeft:10,
        marginRight:10,
        fontSize: global.sizeP16,
        fontWeight: global.fontWeightNormal,
        color:global.colorFF
    },
    text_content_drop_down:{
        fontSize: global.sizeP16,
        fontWeight: global.fontWeightNormal,
        color:global.colorFF
    },
    header_drop_down_details:{
        backgroundColor: global.backgroudTransparent,
        marginLeft:10,
        marginRight: 10,
        marginBottom:7,
        height: 40,
        borderBottomColor:global.orange,
        borderColor:global.backgroudTransparent,
        borderWidth: 1,
        borderStyle:'solid',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        paddingLeft: 5,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
    },
    text_title_drop_down_details:{
        marginLeft:10,
        marginRight:10,
        fontSize: global.sizeP16,
        fontWeight: global.fontWeightNormal,
        color:global.orange
    },

});