import React, {Component} from 'react';
import {View, Dimensions,Platform} from 'react-native';
import global from "../../Styles/global";
import PropTypes from "prop-types";
import Carousel, { Pagination } from "react-native-snap-carousel";
const {height, width} = Dimensions.get('window');
const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
import { sliderWidth, itemWidth } from './SliderEntry';
import styles from "./styles"

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
// const slideHeight = viewportHeight * 0.36;
// const slideWidth = wp(85);
// const itemHorizontalMargin = wp(7);
//
// const sliderWidth = viewportWidth;
// const itemWidth = slideWidth + itemHorizontalMargin;
class CarouselView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        };
    }
    render(){
        const {data,renderItem}=this.props;
        return (
            <View style={styles.exampleContainer}>
                <Carousel
                    {...this.props}
                    data={data}
                    renderItem={renderItem}
                    // loop={true}
                    // autoplay={true}
                    // autoplayDelay={5000}
                    // autoplayInterval={3000}
                    // sliderWidth={width}
                    // itemWidth={width}
                    // containerCustomStyle={styles.slider}
                    // contentContainerCustomStyle={styles.sliderContentContainer}
                    // layout={'tinder'}
                    // enableMomentum = {false}
                    // lockScrollWhileSnapping={false}
                    // useScrollView={false}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={1}
                    inactiveSlideScale={0.95}
                    inactiveSlideOpacity={0.5}
                    inactiveSlideShift={40}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    loop={true}
                    autoplay={true}
                    autoplayDelay={5000}
                    autoplayInterval={3000}
                />
            </View>
        );
    }
}
CarouselView.defaultProps = {
    data: [],
};
CarouselView.propTypes = {
    data: PropTypes.array,
    renderItem: PropTypes.func,
};

export default CarouselView;


