import React from 'react';
import { connect } from 'react-redux';
import { Image, Text, View, TouchableOpacity} from 'react-native';

import infoIcon from '../../assets/information_icon.png';
import reduxGetter from '../../services/ReduxGetters';
import InAppBrowser from '../../services/InAppBrowser';
import CurrentUser from '../../models/CurrentUser';
import inlineStyles from './styles';

const mapStateToProps = (state , ownProps) => {
  return {
    isCreatorApproved :  reduxGetter.isCreatorApproved(CurrentUser.getUserId())
  }
};

const ReviewStatusBanner = ( props ) => {
  if( props.isCreatorApproved == 0 ){
    return(
      <TouchableOpacity style={inlineStyles.bannerContainer} onPress={() => InAppBrowser.openBrowser('https://pepo.com/content-terms')}>
        <View style= {{flexDirection: 'row'}}>
          <Image source={infoIcon} style={inlineStyles.infoImageDimensions}/>
          <Text style={inlineStyles.infoText} >
            Your videos are private, pending approval.
          </Text>
        </View>
      </TouchableOpacity>
      );
  }else{
    return <View style={{height:15}} />
  }

};

export default connect(mapStateToProps)(ReviewStatusBanner);
