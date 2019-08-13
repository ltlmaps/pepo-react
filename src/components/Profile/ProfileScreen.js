import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import BalanceHeader from '../Profile/BalanceHeader';
import LogoutComponent from '../LogoutLink';
import UserInfo from '../CommonComponents/UserInfo';
import CurrentUser from '../../models/CurrentUser';

import reduxGetter from '../../services/ReduxGetters';

import UserProfileFlatList from '../CommonComponents/UserProfileFlatList';
import TouchableButton from '../../theme/components/TouchableButton';
import Theme from '../../theme/styles';
import inlineStyles from './styles';
import Colors from '../../theme/styles/Colors';
import NavigationEmitter from '../../helpers/TabNavigationEvent';

const mapStateToProps = (state, ownProps) => {
  return { userId: CurrentUser.getUserId() };
};

class ProfileScreen extends PureComponent {
  static navigationOptions = (options) => {
    const name = options.navigation.getParam('headerTitle') || reduxGetter.getName(CurrentUser.getUserId());
    return {
      headerBackTitle: null,
      headerTitle: name,
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
      headerRight: <LogoutComponent {...options} />
    };
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    NavigationEmitter.on('onRefresh', (screen) => console.log('NavigationEmitter emitted ProfileScreen', screen));
  }

  componentWillUnmount() {
    NavigationEmitter.removeListener('onRefresh');
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId != prevProps.userId) {
      this.props.navigation.setParams({ headerTitle: reduxGetter.getName(CurrentUser.getUserId()) });
      this.props.navigation.goBack(null);
    }
  }

  onEdit = () => {
    this.props.navigation.push('ProfileEdit');
  };

  _headerComponent() {
    return (
      <UserInfo
        userId={this.props.userId}
        header={<BalanceHeader />}
        editButton={
          <TouchableButton
            onPress={this.onEdit}
            TouchableStyles={[
              Theme.Button.btnPinkSecondary,
              { marginTop: 10, paddingVertical: 8, paddingHorizontal: 20, borderRadius: 50 }
            ]}
            TextStyles={[Theme.Button.btnPinkSecondaryText]}
            text="Edit Your Profile"
          />
        }
      />
    );
  }

  _subHeader() {
    return <Text style={inlineStyles.updates}>Videos</Text>;
  }

  render() {
    return (
      <UserProfileFlatList
        listHeaderComponent={this._headerComponent()}
        listHeaderSubComponent={this._subHeader()}
        userId={this.props.userId}
      />
    );
  }
}

export default connect(mapStateToProps)(ProfileScreen);
