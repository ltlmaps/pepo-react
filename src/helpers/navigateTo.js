import CurrentUser from '../models/CurrentUser';

export default class NavigateTo {
  constructor(navigation) {
    this.navigation = navigation;
  }

  navigate(goToObject) {
    if (goToObject && goToObject.pn == 'p') {
      this.goToProfilePage(goToObject.v.puid);
    } else if (goToObject && goToObject.pn == 'cb') {
      this.goToSupporters(goToObject.v.puid);
    } else if (goToObject && goToObject.pn == 'v') {
      this.goToVideo(goToObject.v.vid);
    } else if (goToObject && goToObject.pn == 'f') {
      this.navigation.navigate('Home');
    } else if (goToObject && goToObject.pn == 'nc') {
      this.navigation.navigate('Notification');
    }
  }

  goToVideo = (vId) => {
    this.navigation.push('VideoPlayer', {
      videoId: vId
    });
  };

  goToSupporters = (profileId) => {
    console.log('goToSupporters', profileId);
    this.navigation.push('SupportersListScreen', { userId: profileId });
  };

  goToProfilePage = (id) => {
    if (id == CurrentUser.getUserId()) {
      this.navigation.navigate('ProfileScreen');
    } else {
      this.navigation.push('UsersProfileScreen', { userId: id });
    }
  };
}
