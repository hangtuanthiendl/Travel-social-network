import React, {Component} from 'react';
import {TouchableOpacity,Image} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import image from "../../themes/Images";
const CarouselItemImages = ({onClick, item}) => {
    return (
        <TouchableOpacity style={styles.slideInnerContainer} onPress={onClick}>
            <Image
                style={styles.image}
                // source={{
                //     uri: item.img,
                // }}
                source={item.img}
            />
        </TouchableOpacity>
    );
};
CarouselItemImages.defaultProps = {};

CarouselItemImages.propTypes = {
    uriImage: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    item: PropTypes.object
};

export default CarouselItemImages;
