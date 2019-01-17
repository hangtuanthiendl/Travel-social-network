import React, {} from "react";
import {
    View,
    TouchableOpacity,
    Dimensions,
    TextInput, Text
} from "react-native";
import PropTypes from "prop-types";
import global from "../../../Styles/global";
import EditProfileModal from "../../../Components/Modal/EditProfileModal";
import TextComponent from "../../../Components/Text/Text";
import IconButton from "../../../Components/Button/IconButton";

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
    renderHeader() {
        return (
            <View style={{
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:global.yellow,
                width: 300,
                borderTopLeftRadius:20,
                borderTopRightRadius:20,
            }}>
                <TextComponent
                    text={this.props.title}
                    style={{fontWeight: global.fontWeightBold,fontSize:20}}
                />
            </View>
        );
    }

    renderContent() {
        const {userName,numberPhone} = this.props;
        return (
            <View style={{
                height: 100,
                alignItems: 'flex-start',
                width: 300,
                backgroundColor:global.colorFF,
                flexDirection: 'row',
                display: 'flex',
            }}>
                <View style={{
                    width:150,
                    height:100,
                    backgroundColor:'blue',
                    justifyContent: 'center',
                    
                }}>
                    <TextComponent
                        text={userName}
                    />
                    <TextComponent
                        text={numberPhone}
                    />
                </View>
                <IconButton
                    nameIcon={'ios-phone-portrait'}
                    btnStyle={{width:150,height:100,backgroundColor:'red'}}
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
};
