import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import inlineStyles from './styles';
import Theme from "../../theme/styles";
import profileEditIcon from "../../assets/profile-edit-icon.png";
import default_user_icon from '../../assets/default_user_icon.png';
import FormInput from "../../theme/components/FormInput";
import reduxGetter from "../../services/ReduxGetters";
import { ostErrors } from '../../services/OstErrors';
import PepoApi from "../../services/PepoApi";
import ProfilePlusIcon from '../../assets/plus_icon.png'

import {updateCurrentUser, upsertUserProfileEntities , upsertLinkEntities} from "../../actions";
import Store from "../../store";
import utilities from "../../services/Utilities";
const mapStateToProps = (state, ownProps) => {
  return {
    user_name: reduxGetter.getUserName( ownProps.userId ,state ) || "",
    name: reduxGetter.getName( ownProps.userId , state )|| "",
    bio: reduxGetter.getBio( ownProps.userId , state )|| "",
    link : reduxGetter.getLink( reduxGetter.getUserLinkId(ownProps.userId , state ) ,  state )|| "",
    profilePicture: reduxGetter.getImage( reduxGetter.getProfileImageId( ownProps.userId , state), state  )
  }
};

const btnPreText = "Save Profile" ;
const btnPostText = "Saving...";

class ProfileEdit extends React.PureComponent{
  
  constructor(props){
    super(props);

    this.tabIndex = {
      name: 1,
      username: 2,
      bio: 3,
      link: 4
    };

    this.defaults={
      name_error      :null,
      user_name_error : null,
      server_errors   : {},
      general_error   : null ,
      btnText : btnPreText,
    };

    this.state ={
      name      : this.props.name,
      user_name : this.props.user_name,
      bio       : this.props.bio,
      link      : this.props.link,
      current_formField: 0,
      ...this.defaults
    };

  }

  getImageSrc = () => {
    if(this.props.profilePicture){
      return {uri : this.props.profilePicture}
    }else {
      return default_user_icon;
    }
  };

  onSubmitEditing(currentIndex) {
    this.setState({
      current_formField: currentIndex + 1
    });
  }

  validateProfileInput(){
    let isValid = true ;
    if(!this.state.name){
      this.setState({
        name_error : ostErrors.getUIErrorMessage('name')
      });
      isValid =  false ;
    }
    if(!this.state.user_name){
      this.setState({
        user_name_error : ostErrors.getUIErrorMessage('user_name')
      });
      isValid = false;
    }
    return isValid;
  }

  clearErrors(){
    this.setState(this.defaults);
  }


  getParams() {
      return {
        name: this.state.name,
        user_name: this.state.user_name,
        bio: this.state.bio,
        link: this.state.link
      };
  }

  updateProfileData(){
    const currentUserObj = CurrentUser.getUser();
    if(this.state.name){
      currentUserObj["name"] = this.state.name ;
    }
    if(this.state.user_name){
      currentUserObj["user_name"] = this.state.user_name ;
    }
    Store.dispatch(updateCurrentUser( currentUserObj ));

    const userProfileEntity = reduxGetter.getUserProfile( this.props.userId ) ;
    if( !userProfileEntity ) return ;
    if(this.state.bio){
      const bio =  userProfileEntity["bio"] || {};
      bio["text"] = this.state.bio;
      userProfileEntity["bio"] = bio ;
    }

    if(this.state.link) {
      const  linkId =  `link_${Date.now()}` ;
      let linkObj = {
        id : linkId,
        url : this.state.link
      };
      Store.dispatch(upsertLinkEntities( utilities._getEntityFromObj( linkObj ) ));
      let userProfileLinkIds = userProfileEntity['link_ids'] || [];
      userProfileLinkIds.unshift(linkId)
    }

    Store.dispatch(upsertUserProfileEntities( utilities._getEntityFromObj( userProfileEntity ) ));

  }

  onSubmit(){
    this.clearErrors();
    if( this.validateProfileInput() ){
      this.setState({ btnText : btnPostText} );
      return new PepoApi(`/users/${this.props.userId}/profile`)
        .post( this.getParams() )
        .then( ( res ) => {
          console.log("----res----" , res);
          this.setState({ btnText : btnPreText} );
          if( res && res.success ){
            this.updateProfileData();
            this.props.hideProfileEdit && this.props.hideProfileEdit( res );
            return ;
          }else {
            this.onServerError(res);
          }
        })
        .catch( (error ) => {
          this.setState({ btnText : btnPreText} );
        });
    }
  }

  onServerError(res){
    const errorMsg = ostErrors.getErrorMessage(res);
    this.setState({ server_errors: res  , general_error : errorMsg});

  }

  render(){
    return(
      <View style={{marginTop:20,paddingBottom:100}}>

        <View style={inlineStyles.editProfileContainer}>
          <Image style={{width: 75,height: 75}} source={this.getImageSrc()}></Image>
          <View style={inlineStyles.editProfileIconPos}>
            <Image style={{width: 13,height: 13}} source={ this.props.profilePicture?profileEditIcon:ProfilePlusIcon}></Image>
          </View>
        </View>

        <Text style={{}}>Name</Text>
        <FormInput
          editable={true}
          onChangeText={(name) => this.setState({ name, error: null, name_error: null })}
          fieldName="name"
          textContentType="none"
          style={[Theme.TextInput.textInputStyle ]}
          placeholder="Name"
          returnKeyType="next"
          returnKeyLabel="Next"
          placeholderTextColor="#ababab"
          blurOnSubmit={false}
          onSubmitEditing={() => {
            this.onSubmitEditing(this.tabIndex.name);
          }}
          isFocus={this.state.current_formField == this.tabIndex.name}
          onFocus={() => {
            this.state.current_formField = this.tabIndex.name;
          }}
          value = {this.state.name}
          errorMsg={this.state.name_error}

        />

        <Text style={{}}>Username</Text>
        <FormInput
          editable={true}
          onChangeText={(user_name) => this.setState({ user_name, error: null, user_name_error: null })}
          fieldName="user_name"
          textContentType="none"
          style={[ Theme.TextInput.textInputStyle ]}
          placeholder="User Name"
          returnKeyType="next"
          returnKeyLabel="Next"
          placeholderTextColor="#ababab"
          blurOnSubmit={false}
          onSubmitEditing={() => {
            this.onSubmitEditing(this.tabIndex.username);
          }}
          isFocus={this.state.current_formField == this.tabIndex.username}
          onFocus={() => {
            this.state.current_formField = this.tabIndex.username;
          }}
          value = {this.state.user_name}
          errorMsg={this.state.user_name_error}
          serverErrors={this.state.serverErrors}
        />

        <Text style={{}}>Bio</Text>
        <FormInput
          editable={true}
          onChangeText={(bio) => this.setState({ bio, error: null, bio_error: null })}
          fieldName="bio"
          textContentType="none"
          style={[
            Theme.TextInput.textInputStyle,  {marginBottom: 10, height: 75, paddingVertical: 15}
          ]}
          placeholder="Bio"
          returnKeyType="next"
          returnKeyLabel="Next"
          placeholderTextColor="#ababab"
          blurOnSubmit={false}
          maxLength = {100}
          onSubmitEditing={() => {
            this.onSubmitEditing(this.tabIndex.bio);
          }}
          isFocus={this.state.current_formField == this.tabIndex.bio}
          onFocus={() => {
            this.props.navigation.push("BioScreen");
            this.state.current_formField = this.tabIndex.bio;
          }}
          value = {this.state.bio}
          serverErrors={this.state.serverErrors}
        />

        <Text style={{}}>Link</Text>
        <FormInput
          editable={true}
          onChangeText={(link) => this.setState({ link, error: null, link_error: null })}
          fieldName="link"
          textContentType="none"
          style={[
            Theme.TextInput.textInputStyle
          ]}
          placeholder="Link"
          returnKeyType="next"
          returnKeyLabel="Next"
          placeholderTextColor="#ababab"
          blurOnSubmit={false}
          onSubmitEditing={() => {
            this.onSubmitEditing(this.tabIndex.link);
          }}
          isFocus={this.state.current_formField == this.tabIndex.link}
          onFocus={() => {
            this.state.current_formField = this.tabIndex.link;
          }}
          value = {this.state.link}
          serverErrors={this.state.serverErrors}
        />

        <TouchableOpacity
          onPress={this.onSubmit.bind(this)}
          style={[Theme.Button.btn, Theme.Button.btnPink]}
        >
          <Text style={[Theme.Button.btnPinkText, {textAlign: 'center'}]}>{this.state.btnText}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.props.hideProfileEdit}
          style={[Theme.Button.btn, Theme.Button.btnPinkSecondary,{marginTop:10}]}
        >
          <Text style={[Theme.Button.btnPinkSecondaryText, {textAlign: 'center'}]}>Cancel</Text>
        </TouchableOpacity>
        {/*//TODO error styling */}
        <Text>{this.state.general_error}</Text>

      </View>
    )
  }

}

export default connect(mapStateToProps)( withNavigation( ProfileEdit )) ;