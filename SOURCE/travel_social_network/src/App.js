import React, { Component } from 'react';
import Home from './view/Home';
import Messaging from './view/Mytrip';
import Profile from './view/Profile';
import Notification from './view/Notifications';
import Ionicons from 'react-native-vector-icons/Ionicons'
import History from './view/History';
import Login from './view/Login'
import global from './Styles/global';
import TripDetails from './modules/Trips/TripDetails';
import TripTimeline from './modules/Trips/TripTimeLine';
import SettingProfile from  './modules/Profile/SettingProfile';
import CreateTrip from './modules/Trips/CreateTrip';
import MyMap from  './view/MapView';
import SearchTrip from './modules/Trips/SearchTrip';
import SplashScreen from './view/SplashScreen'
import CreateStopInTrip from './modules/Trips/CreateStopInTrip';
import ListPlace from './modules/Trips/ListPlace';
import CreatePlace from './modules/Trips/CreatePlace';
import ListMemberInTrip from './modules/Trips/ListMember';
import ListMemberWait from './modules/Trips/ListMemberWait';
import TripMap from './modules/Trips/TripMap';
import TripHistory from './modules/Trips/TripHistory';
import {createBottomTabNavigator,createStackNavigator} from 'react-navigation'
import {
    StatusBar,
  View,
  Dimensions
} from 'react-native';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from "./store/configStore";
import {Provider} from 'react-redux';
const { persistor, store } = configureStore();
const {height, width} = Dimensions.get('window');
const TabBar = createBottomTabNavigator({
  Home: Home,
  Messaging: Messaging,
  Notification: Notification,
  Profile: Profile
}, {
  navigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) => {
          const {routeName} = navigation.state;
          let iconName;
          switch (routeName) {
              case 'Home':
                  iconName = "md-home";
                  break;
              case 'Messaging':
                  iconName = "md-globe";
                  break;
              case 'Notification':
                  iconName = "md-notifications";
                  break;
              case 'Profile':
                  iconName = "md-contact";
                  break;
          }
          return <Ionicons name={iconName} style={{fontSize: height/18, color: tintColor}}/>;
      },
  }),
  initialRouteName: 'Home',
  lazyLoad: true,
  swipeEnabled: false,
  animationEnabled: false,
  tabBarPosition: 'bottom',
  tabBarOptions: {
      showLabel: false,
      showIcon: true,
      style: {
          backgroundColor: global.black,
          borderTopColor: 'white',
          borderTopWidth: 0.18,
          height: height / 14,

      },
      inactiveTintColor: global.darkBlue,
      activeTintColor: global.yellow,
      indicatorStyle: {
          backgroundColor: 'transparent',
      },
      pressColor: '#ffff',
  }
}
);
const RootNavigator = createStackNavigator({
  TabBar: {screen: TabBar},
  Login: {screen: Login},
  History:{screen:History},
  Details:{screen:TripDetails},
  TripTimeline:{screen:TripTimeline},
  SettingProfile:{screen:SettingProfile},
  CreateTrip:{screen:CreateTrip},
  SplashScreen:{screen:SplashScreen},
  MyMap:{screen:MyMap},
  SearchTrip:{screen:SearchTrip},
  CreateStopInTrip:{screen:CreateStopInTrip},
  ListPlace:{screen:ListPlace},
  CreatePlace:{screen:CreatePlace},
  ListMemberInTrip:{screen:ListMemberInTrip},
  ListMemberWait:{screen:ListMemberWait},
  TripMap:{screen:TripMap},
  TripHistory:{screen:TripHistory}
},
{
  initialRouteName: "SplashScreen",
  headerMode: "none",
}
);

export default class App extends Component {
    componentWillMount(){
        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];//hide warning
    }
    componentDidMount(){
        StatusBar.setHidden(true);
    }
    render() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <View style={{flex: 1}}>
                    <StatusBar
                        backgroundColor="#2980b9"
                        translucent={false}
                    />
                    <RootNavigator/>
                </View>
            </PersistGate>
        </Provider>
    );
  }
}

console.disableYellowBox = true;
