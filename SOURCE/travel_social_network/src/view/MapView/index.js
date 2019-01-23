
import React, { Component } from 'react';
import {
    View, TextInput, Dimensions, Image, TouchableOpacity,Text
} from 'react-native';
import global from "../../Styles/global";
import image from "../../themes/Images";
import styleGlobal from "../../Styles/styles";
import styles from "./styles";
const {width, height} = Dimensions.get('window');
import MapView, { PROVIDER_GOOGLE,Marker,Callout } from 'react-native-maps';
import IconButton from "../../Components/Button/IconButton";
import _ from "lodash.debounce";
export default class MyMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            flex:0,
            region:{
                latitude: 10.8671779,
                longitude: 106.8012878,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            places:null,
            placeId:null,
            radius:5000,
            marker:{
                latitude: 10.8671779,
                longitude:106.8012878,
            },
            typeMap:'standard',
            destination:"",
            predictions:[],
            isShowSearch:false,
            isRenderResultSearch:false,
        };
        this.onRegionChange = this.onRegionChange.bind(this);
        this.handleShowSearch = this.handleShowSearch.bind(this);
        //this.onChangeDestinationDebounced = _.debounce(this.onChangeDestination,1000);
    }
    componentWillMount(){
        this.setState({
            flex:1
        });
        this.getMyLocation();
    }
    onRegionChange(region) {
        this.setState({ region });
    }
    getMyLocation(){//giai quyet truoc khi tim vi tri cua ban
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log("position",position);
                this.setState({
                    region:{
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5,
                    },
                    marker:{
                        latitude: position.coords.latitude,
                        longitude:position.coords.longitude,
                    }
                });
                this._map.animateToCoordinate(this.state.marker, 1000);
            }
        )
    };
    handleShowSearch(){
        this.setState(prevState => {
            return {isShowSearch: !prevState.isShowSearch}
        })
    }

    async onChangeDestination(destination){
        this.setState({
            destination,
            isRenderResultSearch:true,
        });
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${destination}
        &key=${global.apiKey}
        &location=${this.state.region.latitude},${this.state.region.longitude}
        &radius=5000`;
        try {
            const result = await fetch(apiUrl);
            const json = await result.json();
            this.setState({
                predictions:json.predictions,
            });
            console.log("json",json);
        }catch (e) {

        }
        console.log("destination",this.state.destination)
    }
    handleSearchPlace(item){
        console.log("item",item);
        this.setState({
            destination:item.structured_formatting.main_text,
            isRenderResultSearch:false,
            placeId:item.place_id,
        },()=>this.getPlaces());
    }
    //https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyAKSoqkh5ct2FAbRF-QfYJJAVYM30viFBk
    getUrlWithParameters(lat,long,radius,type,name,API){
        const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
        const location = `location=${lat},${long}&radius=${radius}`;
        const typeData = `&types=${type}`;
        const nameDaTa = `&name=${name}`;
        const key = `&key=${API}`;
        return `${url}${location}${typeData}${nameDaTa}${key}`;
    }
    getUrlSearchPlace(placeId,key){
        const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${key}`;
       return url;
    }
   async getPlaces(){
        const url = this.getUrlSearchPlace(this.state.placeId,global.apiKey);
        await fetch(url)
            .then((jsonRequest)=>jsonRequest.json())
            .then((jsonResponse)=>{
                console.log(jsonResponse.result);
                const arrMarkers = [];
                this.setState({
                    marker:{
                        latitude: jsonResponse.result.geometry.location.lat,
                        longitude:jsonResponse.result.geometry.location.lng,
                    }
                });
                arrMarkers.push(
                    <Marker
                        key={jsonResponse.result.id}
                        coordinate = {{ latitude: jsonResponse.result.geometry.location.lat,
                            longitude:jsonResponse.result.geometry.location.lng,}}>
                        <Callout>
                            <View style={styles.information}>
                                <Text style={styles.text_inf}>{jsonResponse.result.name}</Text>
                                <Text style={styles.text_inf}>{jsonResponse.result.vicinity}</Text>
                            </View>
                        </Callout>
                    </Marker>
                );
                this.setState({places:arrMarkers});})
            .catch(function(error) {
                // console.log('There has been a problem with your fetch operation: ' + error.message);
            });
       this._map.animateToCoordinate(this.state.marker, 1000);
    }
    getListItem(keySearch){
        const url = this.getUrlWithParameters(
            this.state.region.latitude,
            this.state.region.longitude,
            this.state.radius,
            '',
            keySearch,
            global.apiKey
        );
        fetch(url)
            .then((jsonRequest)=>jsonRequest.json())
            .then((jsonResponse)=>{
                console.log(jsonResponse);
                const arrMarkers = [];
                jsonResponse.results.map((element,i)=>{
                    arrMarkers.push(
                        <Marker
                            key={i}
                            coordinate = {{
                                latitude:element.geometry.location.lat,
                                longitude:element.geometry.location.lng,
                            }}>
                            <Image
                                style={{width: 25, height: 25}}
                                source={{uri: element.icon}}
                            />
                            <Callout>
                                <View style={styles.information}>
                                    <Text style={styles.text_inf}>{element.name}</Text>
                                    <Text style={styles.text_inf}>{element.vicinity}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    )
                });
                //console.log(JSON.stringify(arrMarkers));
                this.setState({places:arrMarkers});})
            .catch(function(error) {
                // console.log('There has been a problem with your fetch operation: ' + error.message);
            });
    }
    getListEat(){
        this.getListItem('Com');
    }
    getListHotel(){
        this.getListItem('Hotel');
    }
    getListAtm(){
        this.getListItem('ATM');
    }
    render() {
        const predictions = this.state.predictions.map((item,index)=>{
            const onClick = ()=>this.handleSearchPlace(item);
            return(
                <TouchableOpacity key={index} style={styles.result_Search} onPress={onClick}>
                    <Text style={{color:global.colorFF}}>
                        {item.description}
                    </Text>
                </TouchableOpacity>
            );
        });
        return (
            <View style={styles.container_map_view}>
                <MapView
                    ref={(map)=>this._map = map}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={this.state.region}
                    style={styles.map_view}
                    mapType={this.state.typeMap}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    showsCompass={false}
                    followsUserLocation={true}
                    userLocationAnnotationTitle={'My Location'}
                >
                    {this.state.places}
                </MapView>
                <TouchableOpacity
                    style={styles.btn_MyLocation}
                    onPress={this.getMyLocation.bind(this)}
                >
                    <Image
                        source={image.home}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn_eat}
                    onPress={this.getListEat.bind(this)}
                >
                    <Image
                        source={image.eat}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn_hotel}
                    onPress={this.getListHotel.bind(this)}
                >
                    <Image
                        source={image.hotel}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn_atm}
                    onPress={this.getListAtm.bind(this)}
                >
                    <Image
                        source={image.atm}
                    />
                </TouchableOpacity>
                <View style={styles.btn_back_home}>
                    <IconButton nameIcon='ios-arrow-back'
                                iconStyle={styles.icon_back}
                                btnStyle={styles.bg_btn_back}
                                onClick={()=>this.props.navigation.goBack()}/>
                    <IconButton nameIcon='ios-search'
                                iconStyle={styles.icon_back}
                                btnStyle={styles.bg_btn_back}
                                onClick={this.handleShowSearch}/>
                </View>
                {this.state.isShowSearch &&  <TextInput
                    onChangeText={(destination)=>this.onChangeDestination(destination)}
                    style={styles.txt_search}
                    placeholder={"Tìm kiếm"}
                    value={this.state.destination}
                    placeholderTextColor={global.colorB2}
                    autoCapitalize = 'none'
                    underlineColorAndroid="transparent"
                />}
                {this.state.isRenderResultSearch && predictions}
            </View>
        );
    }
}
