import React, { PureComponent } from 'react';
import {View, Text} from 'react-native';
import { withNavigation } from 'react-navigation';

import BackArrow from '../CommonComponents/BackArrow';
import TagsInput from '../CommonComponents/TagsInput';
import Colors from '../../theme/styles/Colors';
import CommonStyle from '../../theme/styles/Common';
import inlineStyles from './style';

class BioScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Bio',
      headerStyle: {
        backgroundColor: Colors.white,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      headerTitleStyle: {
        fontFamily: 'AvenirNext-Medium'
      },
      headerBackImage: <BackArrow />
    };
  };

  constructor(props) {
    super(props);
    this.initialVal = this.props.navigation.getParam('initialValue') || '';
    this.onChangeTextDelegate = this.props.navigation.getParam('onChangeTextDelegate');
    this.state = {
      count: this.initialVal.length
    };
  }

  submitEvent = (value) => {
    this.onChangeTextDelegate && this.onChangeTextDelegate(value.trim());
    this.props.navigation.goBack();
  };

  onChangeVal = (val) => {
    val = val || '';
    this.onChangeTextDelegate && this.onChangeTextDelegate(val);
    this.setState({ count: val.length });
  };

  render() {
    return (
      <View style={CommonStyle.viewContainer}>
        <View style={{ marginHorizontal: 15, marginTop: 20 }} >
          <TagsInput
            dropdownStyle={inlineStyles.dropDownStyle}
            horizontal={this.props.horizontal}
            initialValue={this.initialVal}
            onChangeVal={this.onChangeVal}
            placeholderText="Bio"
            submitEvent={this.submitEvent}
            textInputStyles={inlineStyles.multilineTextInput}
            maxLength={300}
            autoFocus={true}
          />
          <Text style={inlineStyles.countStyle}>{this.state.count} /300</Text>
        </View>
      </View>
    );
  }
}

export default withNavigation(BioScreen);
