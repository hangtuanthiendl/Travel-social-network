import React, {} from "react";
import {
    View,
    Dimensions,
    TextInput, Text
} from "react-native";
import PropTypes from "prop-types";
import global from "../../../Styles/global";
import EditProfileModal from "../../../Components/Modal/EditProfileModal";
import IconButton from "../../../Components/Button/IconButton";
import RoundAvatar from "../../../Components/Avatar/RoundAvatar";

const {height, width} = Dimensions.get("window");
export default class UserProfileModal extends EditProfileModal{
    constructor(props) {
        super(props);
        this.state = {
            name:'',
        };
        //this.openModal = this.openModal.bind(this);
        this.doneEdit = this.doneEdit.bind(this);
    }
    doneEdit(){
        this.props.doneEdit(this.state.name);
    }
    // renderHeader() {
    //     return (
    //         <View style={{
    //             height: 50,
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             backgroundColor:global.yellow,
    //             width: 300,
    //             borderTopLeftRadius:20,
    //             borderTopRightRadius:20,
    //         }}>
    //             <TextComponent
    //                 text={this.props.title}
    //                 style={{fontWeight: global.fontWeightBold,fontSize:20}}
    //             />
    //         </View>
    //     );
    // }

    renderContent() {
        const {userName,numberPhone,onClick} = this.props;
        return (
            <View style={{
                height: 100,
                alignItems: 'flex-start',
                width: 300,
                backgroundColor:global.colorFF,
                flexDirection: 'row',
                display: 'flex',
                borderRadius:10,
            }}>
                <View style={{
                    width:100,
                    height:100,
                    justifyContent: 'center',
                    
                }}>
                    <RoundAvatar
                        onPress={()=>alert('change images')}
                        size={'x-small'}
                        icSrc={'https://anh.24h.com.vn//upload/1-2015/images/2015-02-12/1423706954-anhgirlxinh.jpg'}/>
                </View>
                <View style={{
                    width:150,height:100,paddingLeft: 10,paddingTop: 15
                }}>
                    <Text style={{paddingBottom: 5,fontSize:18}}>
                        {userName}
                    </Text>
                    <Text style={{fontSize:18}}>
                        {numberPhone}
                    </Text>
                </View>
                <IconButton
                    nameIcon={'ios-phone-portrait'}
                    btnStyle={{width:30,height:100,backgroundColor:global.yellowColor}}
                    iconStyle={{fontSize:30,color:global.colorFF}}
                    onClick={onClick}
                />
            </View>
        );
    }
    // renderBottom(){
    //     return (
    //         <View style={{
    //             height: 50,
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             backgroundColor:global.yellow,
    //             width: 300,
    //             borderBottomLeftRadius:20,
    //             borderBottomRightRadius:20,
    //         }}>
    //             <IconButton
    //                 nameIcon={'ios-phone-portrait'}
    //             />
    //         </View>
    //     );
    // }
}

UserProfileModal.defaultProps = {

};

UserProfileModal.propTypes = {
    doneEdit:PropTypes.func,
    title:PropTypes.string,
    userName:PropTypes.string,
    numberPhone:PropTypes.string,
    onClick:PropTypes.func,
};
