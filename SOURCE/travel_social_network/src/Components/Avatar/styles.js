import {StyleSheet, Platform, Dimensions,} from "react-native";
import global from "../../Styles/global";

const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    avatarSmall:{
        height:50,
        width:50,
    },
    avatarXSmall:{
        height:70,
        width:70,
    },
    avatarLarge:{
        height:80,
        width:80,
    },
    avatarXlarge:{
        height:120,
        width:120,
    },
    viewAvatar:{
        borderWidth: 1,
        borderColor: global.colorFF,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        elevation: 2,
        alignSelf: 'center',
    }
});
export default styles;
