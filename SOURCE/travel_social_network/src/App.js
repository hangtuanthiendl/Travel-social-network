import React, { Component } from 'react';
import Home from './view/Home';
import Messaging from './view/Messaging';
import Profile from './view/Profile';
import Notification from './view/Notifications';
import Ionicons from 'react-native-vector-icons/Ionicons'
import History from './view/History';
import Login from './view/Login'
import global from './Styles/global'
import {createBottomTabNavigator,createStackNavigator} from 'react-navigation'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
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
},
{
  initialRouteName: "TabBar",
  headerMode: "none",
}
);

export default class App extends Component {
    componentWillMount(){
        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    }
    render() {
    return (
      <View style={{flex: 1}}>
        <RootNavigator/>
      </View>
    );
  }
}

console.disableYellowBox = true;
