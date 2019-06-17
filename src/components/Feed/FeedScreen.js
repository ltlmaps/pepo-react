import React, { Component } from 'react';
import { View , FlatList , Text} from 'react-native';
import styles from './styles';
import FeedRow from '../FeedComponents/FeedRow';

import {FetchComponent} from "../FetchComponent";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds : []
    }
  }

  componentWillMount() {
    this.fetchComponent = new FetchComponent('/feeds'); 
    this.getFeedList();
  }

  componentWillUnmount(){
    this.fetchComponent = null;
    this.setState({ feeds : []});
  }

  getFeedList = () => {
    this.fetchComponent
      .fetch()
      .then(( res ) => {
        this.setState( {feeds : this.fetchComponent.getIDList() })
      })
      .catch((error) => {
        console.log("getFeedList error" , error);
      })
  };

  render() {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.feeds}
            onEndReached={this.getFeedList}
            keyExtractor={(item, index) => `id_${item}`}
            onEndReachedThreshold={0.5}
            initialNumToRender={20}
            renderItem={({ item }) => (
                <FeedRow id={item} />
            )}
          />
        </View>
      );
  }
}

export default Feed;
