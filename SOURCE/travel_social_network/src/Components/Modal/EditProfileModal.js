
import React, {Commponent} from "react";
import {View, TouchableOpacity} from "react-native";
import Modal from "./Modal";
import PropTypes from "prop-types";
import styles from "./styles";
import global from "../../Styles/global";

export default class EditProfileModal extends Modal {

    constructor(props) {
        super(props);
        this.renderPopup = this.renderPopup.bind(this);
    }

    renderBottom() {
        return null;
    }

    renderHeader(){
        return null;
    }

    renderContent(){
        return null;
    }

    renderPopup() {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width:300,
                    height:150,
                    borderRadius:20,
                }}>
                    {this.renderHeader()}
                    {this.renderContent()}
                    {this.renderBottom()}
                </View>

            </View>
        );
    }

    render() {
        return super.render(this.renderPopup, true);
    }
}

EditProfileModal.defaultProps = {
};

EditProfileModal.propTypes = {
    styleModalPopupCustom: PropTypes.oneOfType([PropTypes.number,PropTypes.object,PropTypes.array]),
};
