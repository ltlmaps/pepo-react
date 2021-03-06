import React, { PureComponent } from 'react';
import {
  SectionList,
  TouchableOpacity,
  Text,
  View,
  Keyboard
} from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import deepGet from "lodash/get";
import TagsCell from '../TagsList/TagsCell';

import Pagination from "../../services/MultiSection/MultiSectionPagination";
import UserRow from "../CommonComponents/UserRow";
import SearchUser from "../CommonComponents/UserRow/Search";
import VideoThumbnail from "../CommonComponents/VideoThumbnail/VideoThumbnail";
import {FetchServices} from "../../services/FetchServices";
import ChannelCell from "../ChannelCell";
import DataContract from '../../constants/DataContract';

const titleKeyName = 'title',
  dataKeyName = 'data',
  NO_RESULT_KIND = 'no_result_kind'
;
class TopsList extends PureComponent {
  constructor(props){
    super(props);
    let list = [];
    // this.topPagination = new Pagination( this.props.getFetchUrl());

    this.state = {
      list,
      refreshing : false,
      loadingNext: false
    };
    this.listRef = null ;
  }


  componentDidMount(){
    this.forcedRefresh();
  }

  componentWillUnmount() {
    this.removePaginationListeners();
  }

  scrollToTop(){
    if ( this.getSectionsData().length > 0){
      this.listRef.scrollToLocation({itemIndex: 0, sectionIndex:0 , viewOffset: 100});
    }
  }


  getPagination = () => {
    return this.topPagination;
  };

  // region - Pagination and Event Handlers

  initPagination() {
    // First, take care of existing Pagination if exists.
    this.removePaginationListeners();

    // Now, create a new one.
    let fetchUrl = this.props.getFetchUrl();
    this.topPagination = new Pagination(fetchUrl);
    this.bindPaginationEvents();
  }

  bindPaginationEvents(){
    let pagination = this.topPagination;
    if ( !pagination ) {
      return;
    }
    let paginationEvent = pagination.event;
    if ( null === paginationEvent ) {
      return;
    }

    paginationEvent.on("onBeforeRefresh" , this.beforeRefresh.bind(this) );
    paginationEvent.on("onRefresh" ,  this.onRefresh.bind(this) );
    paginationEvent.on("onRefreshError" , this.onRefreshError.bind(this));
    paginationEvent.on("onBeforeNext" , this.beforeNext.bind(this));
    paginationEvent.on("onNext" , this.onNext.bind(this) );
    paginationEvent.on("onNextError" , this.onNextError.bind(this));
  }

  removePaginationListeners(){
    let pagination = this.topPagination;
    if ( !pagination ) {
      return;
    }
    let paginationEvent = pagination.event;
    if ( null === paginationEvent ) {
      return;
    }
    paginationEvent.removeListener('onBeforeRefresh');
    paginationEvent.removeListener('onRefresh');
    paginationEvent.removeListener('onRefreshError');
    paginationEvent.removeListener('onBeforeNext');
    paginationEvent.removeListener('onNext');
    paginationEvent.removeListener('onNextError');
  }


  forcedRefresh (fetchUrl){
    this.initPagination();
    this.refresh();
  }

  beforeRefresh = ( ) => {
    //this.props.beforeRefresh && this.props.beforeRefresh();
    //this.onPullToRefresh();
    let stateObject = { refreshing : true };
    if (this.state.loadingNext) {
      stateObject['loadingNext'] = false;
    }
    this.setState(stateObject);
  };

  onRefresh = ( res ) => {
    const list = this.topPagination.getResults();
    console.log('onRefresh------get Top results', list);
    this.props.onRefresh && this.props.onRefresh( list , res );
    this.setState({ refreshing : false , list : list });
  };

  onRefreshError = ( error ) => {
    this.setState({ refreshing : false });
  };

  beforeNext =() => {
    if (this.state.refreshing) return;
    this.setState({ loadingNext : true });
  };

  onNext = ( res  ) => {
    this.setState({ loadingNext : false ,  list : this.topPagination.getResults() });
  };

  onNextError = ( error ) => {
    this.setState({ loadingNext : false });
  };

  getNext = () => {
    this.topPagination.getNext();
  };

  refresh = () => {
    this.topPagination.refresh();
  };

  _keyExtractor = (item, index) => {
    return `id_${item.id}`;
  };

  _renderTagItem = ({ item, index }) => {
    return <TagsCell text={item.text} tagId={item.id} />;
  };

  __renderUserItem = ({ item, index }) => {
    return <UserRow userId={item.payload.user_id}><SearchUser userId={item.payload.user_id} /></UserRow>;
  };


  onVideoClick = (payload, index) => {
    console.log(payload, index, this.props.getSectionFetchUrl('videos'));
    let fullVideoPageUrl = this.props.getSectionFetchUrl('videos');
    let seedData = this.getVideoSectionsData();
    const fetchService =   new FetchServices( fullVideoPageUrl, null ,  undefined , {seedData});
    this.props.navigation.push("FullScreenVideoCollection", {
      fetchServices : fetchService,
      currentIndex: index,
      payload,
      baseUrl: fullVideoPageUrl,
      showBalanceFlyer: this.props.extraParams && this.props.extraParams.showBalanceFlyer
    });
  };


  _renderVideoItem = ({ section, index }) => {
    const numColumns = 2;

    if (index % numColumns !== 0) return null;

    const items = [];

    for (let i = index; i < index + numColumns; i++) {
      if (i >= section.data.length) {
        break;
      }
      let itemData = section.data[i];
      let itemKey = "top_list_" + i + "_" + itemData.id;
      items.push(

        <VideoThumbnail
        payload={itemData.payload}
        index={index} key={itemKey}
        onVideoClick={this.onVideoClick}
        />


        )
    };
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        {items}
      </View>
    );

  };

  onChannelPress= (id) =>  {
    this.props.navigation.push("ChannelsScreen", {channelId:id} )
  }

  _renderChannelsItem = (item) => {
    let channelId = deepGet(item, 'item.id' );
    return  <View style={{marginHorizontal: 10, marginBottom: 10}}>
              <TouchableOpacity onPress={() => this.onChannelPress(channelId)} activeOpacity={0.9}>
                <ChannelCell channelId={channelId} />
              </TouchableOpacity>
            </View>;
  };

  listHeaderComponent = () => {
    return (
      <React.Fragment>
        {this.props.listHeaderComponent}
        {this.state.list.length > 0 && this.props.listHeaderSubComponent }
      </React.Fragment>
    )
  };

  getRenderCell = (kind) => {
    if (kind === DataContract.knownEntityTypes.tag){
      return this._renderTagItem;
    } else if (kind === DataContract.knownEntityTypes.user){
      return this.__renderUserItem;
    } else if (kind === DataContract.knownEntityTypes.video){
      return this._renderVideoItem;
    } else if (kind === DataContract.knownEntityTypes.channel){
      return this._renderChannelsItem;
    } else {
      return this.renderEmpty;
    }
  };

  renderEmpty = () => {
    return <React.Fragment></React.Fragment>;
  };

  getVideoSectionsData = () => {
    let topSectionsData = this.getSectionsData();
    let videoData = topSectionsData.filter((data)=>{
      return data.kind === 'videos';
    });
    return videoData.length > 0 ? videoData[0].data : [];
  };


  getSectionsData = () => {
    let sectionsArray = [],
    topSectionsData = this.state.list;
    for (let i = 0; i < topSectionsData.length; i++ ){
      let section = topSectionsData[i];
      let sectionData = section[dataKeyName];
      if ( !sectionData || sectionData.length < 1) {
        //ignore it.
        continue;
      }
      sectionsArray.push({
          data : section[dataKeyName],
          title: section[titleKeyName],
          kind:section.kind,
          renderItem:this.getRenderCell(section.kind),

      });
    }
    if ( sectionsArray.length < 1  && !this.state.refreshing) {
      // Create a dummy section to show no results cell.
      sectionsArray.push({
        data: [this.props.noResultsData],
        kind: NO_RESULT_KIND,
        renderItem: ({item, index}) => {
          console.log("Rendering no results cell");
          return this.props.getNoResultsCell(item);
        },
        title: NO_RESULT_KIND
      })

    }
    return sectionsArray;
  };

  renderSectionHeader = ({section}) => {
    console.log('section', section);

    if (section.kind === NO_RESULT_KIND){
      // return empty cell
      return null;
    } else {
      return <View style={{padding: 12}}>
        <Text style={{color:'#34445b', fontFamily:'AvenirNext-DemiBold', fontSize: 18 }}>{section.title}</Text>
      </View>;

    }


  }

  onScrollToIndexFailed =( info) => {
    console.log("======onScrollToIndexFailed=====" , info );
  }

  render(){
    return(
      <SafeAreaView forceInset={{ top: 'never' }} style={{ flex: 1 }}>
        <SectionList
          ref={(ref)=>  {this.listRef = ref }}
          sections={this.getSectionsData()}
          //extraData={this.state.list}
          onEndReached={this.getNext}
          onRefresh={this.refresh}
          keyExtractor={this._keyExtractor}
          refreshing={this.state.refreshing}
          onScrollBeginDrag={() => Keyboard.dismiss()}
          keyboardShouldPersistTaps={'always'}
          onEndReachedThreshold={9}
          renderSectionHeader={  this.renderSectionHeader}
          stickySectionHeadersEnabled={false}
          onScrollToIndexFailed={this.onScrollToIndexFailed}
        />
      </SafeAreaView>
    );
  }

}

export default  TopsList;
