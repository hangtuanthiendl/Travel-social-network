import React, { Component } from 'react';
import {FlatList,Alert} from 'react-native';
import TripListItem from '../TripListItem';
import PropTypes from 'prop-types';
class TripListView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {data,renderItem} = this.props;
        return(
            <FlatList
                {...this.props}
                data={data}
                removeClippedSubviews={true}
                extraData={this.props}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                onScroll={this.props.onScroll}
            />
        );
    }
}

TripListView.propTypes = {
    data: PropTypes.array,
    renderItem:PropTypes.func,
};
export default TripListView;