
import React, { Component } from 'react';
import {
    View, TextInput, Dimensions, Image, TouchableOpacity,Text
} from 'react-native';
import global from "../../../Styles/global";
import image from "../../../themes/Images";
import styles from "./styles";
const {width, height} = Dimensions.get('window');
import MapView, { PROVIDER_GOOGLE,Marker,Callout } from 'react-native-maps';
import IconButton from "../../../Components/Button/IconButton";
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
export default class TripMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            flex:0,
            region:{
                latitude: 21.669108,
                longitude: 106.662683,
                latitudeDelta: 10,
                longitudeDelta: 10,
            },
            placesStop:null,
            marker:{
                latitude: 10.798377,
                longitude:106.648074,
            },
            typeMap:'standard',
            destination:"",
            predictions:[],
            isShowSearch:false,
            isRenderResultSearch:false,
        };
        this.Camera = {
            center: {
                latitude: 21.669108,
                longitude: 106.662683,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            zoom: 10
    };
        this.onRegionChange = this.onRegionChange.bind(this);
        this.renderStopInTrip = this.renderStopInTrip.bind(this);
        //this.onChangeDestinationDebounced = _.debounce(this.onChangeDestination,1000);
    }
    componentWillMount(){
        const {params} = this.props.navigation.state;
        console.log("params",params);
        this.dataLocation = params.dataLocation;
        this.setState({
            flex:1
        });
        if(this.dataLocation.length > 0){
            this.setState({
                region:{
                    latitude: this.dataLocation[0].lat,
                    longitude: this.dataLocation[0].long,
                    latitudeDelta: 10,
                    longitudeDelta: 10,
                },
            });
            //this.getMyLocation();
            this.renderStopInTrip();
        }
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
    renderStopInTrip(){
        if(this.dataLocation.length > 0){
            const arrMarkers = [];
            this.dataLocation.map((item,index)=>{
                arrMarkers.push(
                    <Marker
                        key={index}
                        coordinate = {{
                            latitude:item.lat,
                            longitude:item.long,
                        }}>

                        <Callout>
                            <View style={styles.information}>
                                <Text style={styles.text_inf}>{index}</Text>
                                <Text style={styles.text_inf}>{item.tittle}</Text>
                            </View>
                        </Callout>
                    </Marker>
                )
            });
            console.log("arrMarkers",arrMarkers);
            this.setState({placesStop:arrMarkers});
           // this._map.animateToCoordinate(this.state.marker, 1000);
        }
    }
    componentDidMount() {
        this._map.fitToCoordinates( [{
            latitude: 20.639935,
            longitude: 105.489459,
        }], {
            edgePadding:DEFAULT_PADDING,
            animated: true,
        });
    }
    render() {
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
                    {this.state.placesStop}
                </MapView>
                <TouchableOpacity
                    style={styles.btn_MyLocation}
                    onPress={this.getMyLocation.bind(this)}
                >
                    <Image
                        source={image.home}
                    />
                </TouchableOpacity>
                <View style={styles.btn_back_home}>
                    <IconButton nameIcon='ios-arrow-back'
                                iconStyle={styles.icon_back}
                                btnStyle={styles.bg_btn_back}
                                onClick={()=>this.props.navigation.goBack()}/>
                </View>
            </View>
        );
    }
}
