import React, { Component } from 'react';
import {FlatList, Alert, View, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
const {
    height,
    width
} = Dimensions.get('window');
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
                ItemSeparatorComponent={() => <View
                    style={{
                        height: 1,
                        width: width,
                    }}
                />}
            />
        );
    }
}

TripListView.propTypes = {
    data: PropTypes.array,
    renderItem:PropTypes.func,
};
export default TripListView;