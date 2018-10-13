import React, { Component } from 'react';
import {FlatList,Alert} from 'react-native';
import TripListItem from '../TripListItem';
import PropTypes from 'prop-types';
const TripListView = ({data}) =>{
    return(
        <FlatList
            data={data}
            removeClippedSubviews={true}
            extraData={this.props}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({item,index})=>
                <TripListItem
                    id={item.id}
                    time={item.time}
                    total={item.total}
                    data={item.product}
                />
            }
        />
    );
};

TripListView.propTypes = {
    data: PropTypes.array,
};
export default TripListView;