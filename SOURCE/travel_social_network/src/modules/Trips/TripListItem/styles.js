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
    height:200,
    width:'100%',
    position:'relative',
    marginBottom: 2,
},
    headerCard:{
        flex:0.2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 5,
    },
    bodyCard:{
        flex:0.6,
        flexDirection: 'row',
        display: 'flex',
        width :width,
        height:100,
    },
    bodyLeft:{
        flex: 1,
        flexDirection:'row',
    },
    bodyRight:{
        flex: 0.2,
    },
    footerCard:{
        flex:0.2,
        justifyContent:'flex-end',
        alignItems:'center',
        width:width,
        display:'flex',
        flexDirection:'row',
        paddingRight:10,
    },
    left:{
        flex:0.6,
    },
    right:{
        flex:0.4,
        marginLeft: 8,
    },
    line_left:{
        flexDirection:'row',
        display:'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
        height:20,
        marginLeft:20,
    },
    line_right:{
        flexDirection:'row',
        display:'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
        height:20,
    },

    text:{
        fontSize: 15,
        color: global.colorFF,
    },
    text1:{
        marginRight:3,
        fontSize: 15,
        color: global.colorFF,
    },
    icon:{
        fontSize:15,
        color: global.red,
        marginRight:4,
    },
    icon1:{
        fontSize:15,
        color: global.yellow,
        marginRight:4,
    },
});