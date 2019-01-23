import React, {Commponent} from "react";
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

const {height, width} = Dimensions.get("window");
export default class SettingProfileModal extends EditProfileModal{
    constructor(props) {
        super(props);
        this.state = {
            name:'',
        };
        //this.openModal = this.openModal.bind(this);
       this.doneEdit = this.doneEdit.bind(this);
    }
    doneEdit(){
        this.props.doneEdit(!this.props.editable ? this.props.name :this.state.name);
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
        return (
            <View style={{
                minHeight: 100,
                alignItems: 'flex-start',
                backgroundColor:global.colorFF
            }}>
                <TextInput
                    onChangeText={(text) => this.setState({name: text})}
                    style={{
                        color:global.black,
                        width:300,
                        fontSize:16,
                        paddingLeft: 10,
                        paddingRight: 10,
                    }}
                    multiline={true}
                    maxLength={150}
                    placeholder={'...'}
                    value={this.props.name}
                    placeholderTextColor={global.black}
                    autoCapitalize = 'none'
                    underlineColorAndroid="transparent"
                    editable={this.props.editable}
                />
            </View>
        );
    }
    renderBottom(){
        return (
            <View style={{
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:global.yellow,
                width: 300,
                borderBottomLeftRadius:20,
                borderBottomRightRadius:20,
            }}>
                <TouchableOpacity style={{
                    width:100,
                    height:40,
                    borderColor:global.colorFF,
                    borderWidth: 1,
                    justifyContent:'center',
                    borderRadius:10,
                    alignItems:'center'
                }} onPress={this.doneEdit}>
                    <Text style={{fontWeight: global.fontWeightBold,fontSize:20}}>
                        Xong
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

SettingProfileModal.defaultProps = {
    editable:true,
};

SettingProfileModal.propTypes = {
    doneEdit:PropTypes.func,
    title:PropTypes.string,
    name:PropTypes.string,
    editable:PropTypes.bool
};
