import { AppRegistry ,YellowBox} from 'react-native';
import App from './src/App';
YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Warning: componentWillUpdate is deprecated',
    'Warning: isMounted(...) is deprecated',
    'Warning: Can only update a mounted or mounting component',
    'Warning: Module RCTImageLoader requires',
]);
AppRegistry.registerComponent('travel_social_network', () => App);
