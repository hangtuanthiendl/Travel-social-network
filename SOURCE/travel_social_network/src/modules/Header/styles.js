import { StyleSheet ,Platform} from 'react-native';
import global from '../../Styles/global';
 const styles = StyleSheet.create({
    container:{
        height:40,
        backgroundColor:global.yellow,
        justifyContent:'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height:2
        },
        shadowRadius: 3,
        shadowOpacity:0.2,
    },
    wrapper:{
        paddingLeft:15,
        paddingRight:15,
        flexDirection: 'row',
        justifyContent:"space-between",
        flex:1,
        alignItems: 'center',
    },
    leftHeader:{width:50,alignItems:'flex-start'},
    rightHeader:{width:50,alignItems:'flex-end'},
    bodyHeader:{ flex: 1, maxWidth: 200, alignItems: "center" }
});
export default styles;