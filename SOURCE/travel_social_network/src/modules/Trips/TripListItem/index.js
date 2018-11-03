import React, {Component} from 'react';
import {View, Dimensions, Animated, ImageBackground,Image} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import global from '../../../Styles/global';
import TextComponent from '../../../Components/Text/Text';
import styleGlobal from "../../../Styles/styles";
import IconButton from "../../../Components/Button/IconButton";
const {height, width} = Dimensions.get('window');

class TripListItem extends Component {
    state = {
        animation: new Animated.Value(0)
    };
    componentWillMount(){
        Animated.timing(this.state.animation,{
            toValue:1,
            duration:500,
            delay: this.props.index* 400
        }).start();
    }
    getStatus(status){
        switch (status) {
            case 0:
                return 'Chưa diễn ra';
            case 1:
                return 'ang diễn ra';
            case 2:
                return 'Đã diễn ra';
            default:
                return 'Chưa diễn ra';
        }
    }
    renderStar=(number)=>{
        const fields = [];
        for (let i = 0; i < number; i++){
            fields.push(<IconButton nameIcon='ios-heart' iconStyle={styles.icon}/>)
        }
        return fields;
    };
    render() {
        const {id, title, numberParticipant, quantity, status, numberStar, timeStart, timeEnd, locationStart,
            namePersonCreate,
            imgBackground,
            imgAvatar} = this.props;
        return (
            <Animated.View   style={{
                //  opacity: this.state.animation, // Binds directly
                transform: [{
                    translateY: this.state.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [130, 0],// 0 : 150, 0.5 : 75, 1 : 0
                        extrapolate: 'clamp'
                    }),
                }],
            }}>
                <ImageBackground source={{uri:imgBackground}} style={styles.container}>
                    <View style={[styleGlobal.imgBackgroundCard]}>
                        <View style={styles.headerCard}>
                            <Image
                                source={{uri:imgAvatar}}
                                style={styles.avatar}
                            />
                            <TextComponent
                                text={title}
                                color={global.colorFF}
                                bold={'700'}
                                style={{marginLeft: 5,flex:0.5,width:50,fontSize:18}}

                            />
                        </View>
                        <View style={styles.bodyCard}>
                                <View style={styles.bodyLeft}>
                                    <View style={styles.left}>
                                        <View style={styles.line_left}>
                                            <IconButton nameIcon='ios-pin' iconStyle={styles.icon}/>
                                            <TextComponent
                                                text={locationStart}
                                                style={styles.text}
                                            />
                                        </View>
                                        <View style={styles.line_left}>
                                            <TextComponent
                                                text={'Số chỗ trống :'}
                                                style={styles.text1}
                                            />
                                            <TextComponent
                                                text={numberParticipant.toString()}
                                                style={styles.text}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.right}>
                                        <View style={styles.line_right}>
                                            <IconButton nameIcon='ios-calendar' iconStyle={styles.icon}/>
                                            <TextComponent
                                                text={timeStart}
                                                style={styles.text}
                                            />
                                        </View>
                                        <View style={styles.line_right}>
                                            <TextComponent
                                                text={numberStar.toString()}
                                                style={styles.text1}
                                            />
                                            {this.renderStar(numberStar)}
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.bodyRight}>

                                </View>
                        </View>
                        <View style={styles.footerCard}>
                            <IconButton nameIcon='ios-pulse' iconStyle={styles.icon}/>
                            <TextComponent
                                text={'Chưa diễn ra'}
                                style={styles.text}
                            />
                        </View>
                    </View>
                </ImageBackground>
            </Animated.View>
        );
    }
}
TripListItem.defaultProps = {};
TripListItem.propTypes = {
    id: PropTypes.string,
    title:PropTypes.string,
    numberParticipant: PropTypes.number,
    quantity: PropTypes.number,
    status: PropTypes.number,
    numberStar: PropTypes.number,
    timeStart: PropTypes.string,
    timeEnd: PropTypes.string,
    locationStart: PropTypes.string,
    namePersonCreate:PropTypes.string,
    imgBackground:PropTypes.string,
    imgAvatar:PropTypes.string,
};
export default TripListItem;