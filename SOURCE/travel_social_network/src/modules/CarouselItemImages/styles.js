import { StyleSheet, Dimensions, Platform } from 'react-native';
const {height, width} = Dimensions.get('window');
import {itemWidth,itemHorizontalMargin} from "../CarouselView/SliderEntry";
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.4;
const slideWidth = wp(82);

const IS_IOS = Platform.OS === 'ios';

const entryBorderRadius = 8;

export default StyleSheet.create({
    slideInnerContainer: {
        width: slideWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        width:slideWidth,
        height:slideHeight,
        borderRadius: 10,
    },

});