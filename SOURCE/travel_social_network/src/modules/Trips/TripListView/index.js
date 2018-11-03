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
                    index={index}
                    id={item.id}
                    title={item.title}
                    numberParticipant={item.numberParticipant}
                    quantity={item.quantity}
                    status={item.status}
                    numberStar={item.numberStar}
                    timeStart={item.timeStart}
                    timeEnd={item.timeEnd}
                    locationStart={item.locationStart}
                    namePersonCreate={item.namePersonCreate}
                    imgBackground={item.imgBackground}
                    imgAvatar={item.imgAvatar}
                />
            }
        />
    );
};

TripListView.propTypes = {
    data: PropTypes.array,
};
export default TripListView;