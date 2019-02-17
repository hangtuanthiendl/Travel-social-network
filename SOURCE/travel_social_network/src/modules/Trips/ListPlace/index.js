
import React, { Component } from 'react';
import {
    Image,
    ImageBackground, TextInput,
    View, TouchableOpacity, Text, FlatList
} from 'react-native';
import Header from "../../../modules/Header";
import global from "../../../Styles/global";
import IconButton from "../../../Components/Button/IconButton";
import TextComponent from '../../../Components/Text/Text';
import image from "../../../themes/Images";
import styleGlobal from "../../../Styles/styles";
import {bindActionCreators} from "redux";
import * as loginActions from "../../../action/loginAction";
import * as placeAction from "../../../action/placeAction";
import * as tripActions from "../../../action/tripAction";
import * as uploadImageAction from "../../../action/uploadImgaeAction";
import connect from "react-redux/es/connect/connect";
import TripListItem from "../TripListItem";
import TripListView from "../TripListView";
import CardTripItem from "../CardTripItem";
import styles from "./styles";

class ListPlace extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataPlace:this.props.dataListPlace.dataPlace,
            isSearch:true,
            destination:'',
        };
        this.dataPlace = null;
        this.handleSelectPlace = this.handleSelectPlace.bind(this);
        this.handleShowSearchPlace = this.handleShowSearchPlace.bind(this);
        this.handleCloseSearchPlace = this.handleCloseSearchPlace.bind(this);
        this.onChangeDestination = this.onChangeDestination.bind(this);
    }

    componentWillMount(){
        this.dataPlace = this.props.dataListPlace.dataPlace;
        console.log("this.state.dataPlace",this.dataPlace)
    }
    renderItem(){

    }
    handleSelectPlace(item) {
        const {navigation} = this.props;
        navigation.state.params.onSelect({item: item});
        navigation.goBack();
    }
    handleShowSearchPlace(){
        this.setState({
            isSearch:false
        })
    }
    handleCloseSearchPlace(){
        this.setState({
            isSearch:true,
            destination:'',
            dataPlace:this.dataPlace
        })
    }
    onChangeDestination(destination){
        let arr = [];
        if(destination !== ''){
            this.dataPlace.map((item)=>{
                if(item.name !== null && item.name.indexOf(destination) !== -1){
                    arr.push(item)
                }
            });
            this.setState({
                destination,
                dataPlace:arr
            })

        }else{
            this.setState({
                destination,
                dataPlace:this.dataPlace
            })
        }
    }
    render() {
        return (
            <ImageBackground source={image.backgroundImage} style={styleGlobal.container}>
                <View style={styleGlobal.imgBackground}>
                    <Header
                        customHeaderStyle={{backgroundColor: global.yellow}}
                        leftHeader={<IconButton nameIcon='ios-arrow-back'
                                                onClick={()=>this.props.navigation.goBack()}
                                                iconStyle={{fontSize: 35, color: global.black}}/>}
                        body={<TextComponent
                            text='Địa điểm du lịch'
                            color={global.black}
                            size={global.sizeP20}
                            bold={global.fontWeightDark}/>}
                        rightHeader={
                            this.state.isSearch
                                ?
                            <IconButton nameIcon='ios-search'
                                                 onClick={this.handleShowSearchPlace}
                                                 iconStyle={{fontSize: 30, color: global.black}}/>
                                :
                            <IconButton nameIcon='ios-close'
                                        onClick={this.handleCloseSearchPlace}
                                        iconStyle={{fontSize: 35, color: global.orange}}/>
                        }
                    />
                    {!this.state.isSearch &&   <TextInput
                        onChangeText={(destination)=>this.onChangeDestination(destination)}
                        style={styles.txt_search_place}
                        placeholder={"Tìm kiếm điểm du lịch"}
                        value={this.state.destination}
                        placeholderTextColor={global.colorB2}
                        autoCapitalize = 'none'
                        underlineColorAndroid="transparent"
                    />}
                    <View style={{marginTop: 10,marginLeft: 10}}>
                        <TripListView onScroll={this._onScroll} data={this.state.dataPlace}
                                      renderItem={({item,index})=>{
                                          const onActionClick = ()=>this.handleSelectPlace(item);
                                          return(
                                              <CardTripItem
                                                  imageUrl={'http://a9.vietbao.vn/images/vi955/2013/12/55600814-1388139129-da-lat.jpg'}
                                                  title={item.name}
                                                  description={item.description}
                                                  isShowBtn={true}
                                                  onClick={onActionClick}
                                                  withView={240}
                                              />
                                          );
                                      }
                                      }
                        />
                    </View>

                </View>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return {
        login: state.loginReducer,
        error: state.loginReducer.error,
        dataImage:state.imageReducer,
        dataListPlace:state.placeReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
        placeAction: bindActionCreators(placeAction,dispatch),
        tripActions:bindActionCreators(tripActions,dispatch),
        uploadImageAction:bindActionCreators(uploadImageAction,dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPlace);
