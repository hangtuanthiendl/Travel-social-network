import React, {Component} from 'react';
import {View, Dimensions, Animated, ImageBackground,Image,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import global from '../../../Styles/global';
import TextComponent from '../../../Components/Text/Text';
import styleGlobal from "../../../Styles/styles";
import IconButton from "../../../Components/Button/IconButton";
import image from "../../../themes/Images";
import urls from "../../../api/urls";
const {height, width} = Dimensions.get('window');

class TripListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: new Animated.Value(0)
        };
        this.convertNumberToCurrency = this.convertNumberToCurrency.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    componentWillMount(){
        Animated.timing(this.state.animation,{
            toValue:1,
            duration:500,
            delay: this.props.index* 400
        }).start();
    }
    convertNumberToCurrency(money) {
        let value = money.toString();
        if (value != "") {
            value = value.replace(/\D/g, "");
            value = value.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1" + '.');
        }
        return value
    }
    getStatus(status){
        switch (status) {
            case 0:
                return 'Chưa diễn ra';
            case 1:
                return 'Đang diễn ra';
            case 2:
                return 'Đã diễn ra';
            default:
                return 'Chưa diễn ra';
        }
    }
    renderStar=(number)=>{
        const fields = [];
        for (let i = 0; i < number; i++){
            fields.push(<IconButton key ={i} nameIcon='ios-star' iconStyle={styles.icon} onClick={()=>alert('Tim')}/>)
        }
        return fields;
    };
    onClick(){
        this.props.onClick(this.props.dataDetail)
    }
    render() {
        const {id, title, numberParticipant, quantity, status, numberStar, timeStart, timeEnd, locationStart,
            namePersonCreate,
            imgBackground,onClick,
            imgAvatar} = this.props;
        return (
            <Animated.View style={{
                //  opacity: this.state.animation, // Binds directly
                transform: [{
                    translateY: this.state.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [130, 0],// 0 : 150, 0.5 : 75, 1 : 0
                        extrapolate: 'clamp'
                    }),
                }],
            }}>
                <TouchableOpacity onPress={this.onClick}>
                    <ImageBackground source={{uri:imgBackground}} style={styles.container}>
                        <View style={[styleGlobal.imgBackgroundCard]}>
                            <View style={styles.headerCard}>
                                {imgAvatar!== null
                                ?
                                    <Image
                                        source={{uri:urls.ROOT + imgAvatar.slice(1)}}
                                        style={styleGlobal.avatar}
                                    />
                                :
                                    <Image
                                        source={image.avatarTrip}
                                        style={styleGlobal.avatar}
                                    />

                                }

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
                                            <IconButton nameIcon='ios-ribbon' iconStyle={styles.icon1}/>
                                            <TextComponent
                                                text={'Kinh phí:'}
                                                style={styles.text1}
                                            />
                                            <TextComponent
                                                text={this.convertNumberToCurrency(quantity) + " Đ"}
                                                style={styles.text}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.right}>
                                        <View style={styles.line_right}>
                                            <IconButton nameIcon='ios-calendar' iconStyle={styles.icon}/>
                                            <TextComponent
                                                text={timeStart.slice(0,10)}
                                                style={styles.text}
                                            />
                                        </View>
                                        <View style={styles.line_right}>
                                            <TextComponent
                                                text={parseInt(numberStar) > 0 ? parseInt(numberStar) : 1}
                                                style={styles.text1}
                                            />
                                            {this.renderStar(parseInt(numberStar) > 0 ? parseInt(numberStar) : 1)}
                                        </View>
                                    </View>
                                </View>
                                {/*<View style={styles.bodyRight}>*/}

                                {/*</View>*/}
                            </View>
                            <View style={styles.footerCard}>
                                <IconButton nameIcon='ios-pulse' iconStyle={styles.icon}/>
                                <TextComponent
                                    text={this.getStatus(status)}
                                    style={styles.text}
                                />
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
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
    numberStar: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    timeStart: PropTypes.string,
    timeEnd: PropTypes.string,
    locationStart: PropTypes.string,
    namePersonCreate:PropTypes.string,
    imgBackground:PropTypes.string,
    imgAvatar:PropTypes.string,
    onClick:PropTypes.func,
    dataDetail:PropTypes.object,
};
export default TripListItem;