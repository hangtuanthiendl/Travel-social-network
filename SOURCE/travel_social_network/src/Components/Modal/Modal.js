import PropTypes from 'prop-types';
import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, BackAndroid ,Platform} from "react-native";
import Modal from './ModalBox';
import styles from "./styles";

export default class ModalComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            animationType: "none",
            pressBackgroundClose : true,
            pressBackToClose : true,
            animationDuration:0,
            swipeToClose:true,
        };
        console.disableYellowBox = true;
        this.onLayout = this.onLayout.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onOpenedModal = this.onOpenedModal.bind(this);
        this.renderPopup = this.renderPopup.bind(this);

    }

    componentWillReceiveProps(nextProp) {
        if (nextProp.visible !==  this.props.visible) {
            this.setState({
                visible: nextProp.visible
            });
        }
    }

    onCloseModal() {
        this.setState({
            visible: false
        });
        if(this.props.onCloseModal){
            this.props.onCloseModal();
        }
    }

    onOpenedModal(){
        if(this.props.onOpenedModal){
            this.props.onOpenedModal();
        }
    }

    renderPopup (){
        return null;
    }

    openModal() {
        return new Promise((resolve, reject)=>{
            this.setState({
                visible: true
            });
            setTimeout(()=>{
                if(this.state.visible){
                    resolve();
                }
                else{
                    reject();
                }
            },500);
        });
    }

    closeModal() {

        return new Promise((resolve, reject)=>{
            this.setState({
                visible: false
            });
            if(this.props.closeModal){
                this.props.closeModal();
            }
            setTimeout(()=>{
                if(!this.state.visible){
                    resolve();
                }
                else{
                    reject();
                }
            },500);
        });
    }

    onLayout(e) {
        this.refs.modal.measure((x, y, width, height, pageX, pageY) => {
            if (width !== 0 && height !== 0) {
                this.setState({
                    width: width,
                    height: height,
                });
            }
        });
    }

    render(component = null, center = false, isLoader = false) {
      //  let styleSecond = styles.modalViewCenter;
        let styleBackgroundColor ="black";
       // if (!center) {
        //    styleSecond = styles.modalViewBottom;
       // }
        if(this.backgroundColor){
            styleBackgroundColor = this.backgroundColor;
        }

        return (

            <Modal
                style={[{backgroundColor: 'transparent'}, {height: this.state.height, width: this.state.width},this.props.styleModal]}
                isOpen={this.state.visible}
                animationType={this.state.animationType}
                animationDuration ={this.state.animationDuration}
                backdropPressToClose = {this.state.pressBackgroundClose}
                onClosed={this.onCloseModal}
                onOpened ={this.onOpenedModal}
                coverScreen
                backdropColor={styleBackgroundColor}
                backdropOpacity={this.props.backdropOpacity}
                position={center ? "center" : "bottom"}
                pressBackToClose ={this.state.pressBackToClose}
                swipeToClose={this.state.swipeToClose}
            >
                <View ref="modal" onLayout={this.onLayout.bind(this)}>
                    {component()}
                </View>
            </Modal>

        );
    }
}

ModalComponent.defaultProps = {
    visible: false,
    backdropOpacity:.8
};

ModalComponent.propTypes = {
    visible: PropTypes.bool,
    onCloseModal : PropTypes.func,
    closeModal : PropTypes.func,
    openModal : PropTypes.func,
    onOpenedModal :PropTypes.func,
    styleModal: PropTypes.oneOfType([PropTypes.number,PropTypes.object,PropTypes.array]),
    backdropOpacity:PropTypes.number,
    swipeToClose:PropTypes.bool
};