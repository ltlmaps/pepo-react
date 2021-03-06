import deepGet from 'lodash/get';
import unescape from 'lodash/unescape';
import round from 'lodash/round';
import Store from '../store';
import appConfig from '../constants/AppConfig';

let CurrentUser;
import('../models/CurrentUser').then((imports) => {
  CurrentUser = imports.default;
});

class ReduxGetters {
  getHomeFeedUserId(id, state) {
    state = state || Store.getState();
    return deepGet(state, `home_feed_entities.id_${id}.payload.user_id`);
  }

  getHomeFeedVideoId(id, state) {
    state = state || Store.getState();
    return deepGet(state, `home_feed_entities.id_${id}.payload.video_id`);
  }

  getVideoIdFromVideoDetails(id ,state){
    state = state || Store.getState();
    return deepGet(state, `video_stat_entities.id_${id}.video_id`);
  }

  getVideoUrl(id, state) {
    state = state || Store.getState();
    return (
      deepGet(state, `video_entities.id_${id}.resolutions.${appConfig.videoConstant.videoWidth}.url`) ||
      deepGet(state, `video_entities.id_${id}.resolutions.original.url`)
    );
  }
  
  getUser(id, state) {
    state = state || Store.getState();
    return deepGet(state, `user_entities.id_${id}`);
  }

  getUserProfile(id, state) {
    state = state || Store.getState();
    return deepGet(state, `user_profile_entities.id_${id}`);
  }

  getVideoImgUrl(id, state, size) {
    state = state || Store.getState();
    size = size || appConfig.videoConstant.videoImageWidth;
    let posterImageId = deepGet(state, `video_entities.id_${id}.poster_image_id`);
    return this.getImageUrl(posterImageId, state, size);
  }

  getImageUrl( posterImageId, state, size) {
    return (
      deepGet(state, `image_entities.id_${posterImageId}.resolutions.${size}.url`) ||
      deepGet(state, `image_entities.id_${posterImageId}.resolutions.original.url`)
    );
  }

  getUserName(id, state) {
    state = state || Store.getState();
    return deepGet(state, `user_entities.id_${id}.user_name`, "");
  }

  getUserTwitterHandle(id, state) {
    state = state || Store.getState();
    return deepGet(state, `twitter_entities.id_${id}.handle`);
  }

  getUserTwitterHandleLink(id, state) {
    state = state || Store.getState();
    return deepGet(state, `twitter_entities.id_${id}.link`);
  }

  getName(id, state) {
    state = state || Store.getState();
    return unescape(deepGet(state, `user_entities.id_${id}.name`));
  }

  getUserActivationStatus(id, state) {
    state = state || Store.getState();
    return deepGet(state, `user_entities.id_${id}.ost_status`);
  }

  isCreatorApproved(id, state) {
    state = state || Store.getState();
    return deepGet(state, `user_entities.id_${id}.approved_creator`);
  }

  getBio(id, state) {
    state = state || Store.getState();
    return unescape(deepGet(state, `user_profile_entities.id_${id}.bio.text`));
  }

  getBioIncudes(userId, tappedText) {
    let lowercasedTappedText = tappedText.toLowerCase();
    let state =  Store.getState();
    return deepGet(state, `user_profile_entities.id_${userId}.bio.includes.${lowercasedTappedText}`) ||
            deepGet(state, `user_profile_entities.id_${userId}.bio.includes.${tappedText}`);
  }

  canBlockUser(id ,state){
    state = state || Store.getState();
    return !!deepGet(state, `user_allowed_action_entities.id_${id}.can_block` , true) ;
  }

  canMuteUser(id, state){
    state = state || Store.getState();
    return !!deepGet(state, `user_allowed_action_entities.id_${id}.can_mute` , true ) ;
  }

  getEmail(id, state) {
    state = state || Store.getState();
    return deepGet(state, `user_profile_entities.id_${id}.email.text`);
  }

  getVideoSupporters(id, state) {
    state = state || Store.getState();
    return deepGet(state, `video_stat_entities.id_${id}.total_contributed_by`);
  }

  getVideoBt(id, state) {
    state = state || Store.getState();
    return deepGet(state, `video_stat_entities.id_${id}.total_amount_raised_in_wei`);
  }

  getVideoStats(id, state) {
    state = state || Store.getState();
    return deepGet(state, `video_stat_entities.id_${id}`);
  }

  getVideoDescription(id, state) {
    state = state || Store.getState();
    return unescape(deepGet(state, `video_description_entities.id_${id}.text`));
  }

  getVideoDescriptionObject (id, state) {
    state = state || Store.getState();
    return deepGet(state, `video_description_entities.id_${id}`);
  }

  getVideoDescriptionId(id, state) {
    state = state || Store.getState();
    return deepGet(state, `video_stat_entities.id_${id}.description_id`);
  }

  getVideoReplyCount(id, state){
    state = state || Store.getState();
    return deepGet(state, `video_stat_entities.id_${id}.total_video_replies`, 0);
  }

  getBtAmountForReply(id, state){
    state = state || Store.getState();
    return deepGet(state, `video_stat_entities.id_${id}.per_reply_amount_in_wei`, 0);
  }

  isReplyAllowed(id, state){
    state = state || Store.getState();
    return deepGet(state, `video_stat_entities.id_${id}.is_reply_allowed`, true);
  }

  getVideoCreatorUserId(id, state){
    state = state || Store.getState();
    return deepGet(state, `video_stat_entities.id_${id}.creator_user_id`, true);
  }

  getTappedIncludesEntity(videoId, tappedText) {
    let lowercasedText = tappedText.toLowerCase();
    let state = Store.getState();
    return deepGet(state, `video_description_entities.id_${videoId}.includes.${lowercasedText}`) || deepGet(state, `video_description_entities.id_${videoId}.includes.${tappedText}`);
  }

  getVideoLink(id, state) {
    state = state || Store.getState();
    return unescape(deepGet(state, `link_entities.id_${id}.url`));
  }

  getVideoLinkId(id, state) {
    state = state || Store.getState();
    return deepGet(state, `video_stat_entities.id_${id}.link_ids[0]`);
  }

  isVideoSupported(id, state) {
    state = state || Store.getState();
    let val = deepGet(state, `video_contribution_entities.id_${id}`);
    val = val && Number(val);
    return !!val && CurrentUser.getUserId();
  }

  getUserSupporters(id, state) {
    state = state || Store.getState();
    return deepGet(state, `user_stat_entities.id_${id}.total_contributed_by`);
  }

  getVideoSupporters(id, state) {
    state = state || Store.getState();
    return deepGet(state, `video_stat_entities.id_${id}.total_contributed_by`);
  }

  getUsersSupporting(id, state) {
    state = state || Store.getState();
    return deepGet(state, `user_stat_entities.id_${id}.total_contributed_to`);
  }

  getUsersBt(id, state) {
    state = state || Store.getState();
    return deepGet(state, `user_stat_entities.id_${id}.total_amount_raised_in_wei`);
  }

  getRecordedVideo() {
    return deepGet(Store.getState(), `recorded_video`);
  }

  getRecordedVideoType() {
    return deepGet(Store.getState(), `recorded_video.video_type`);
  }



  getRecordedVideoCurrentProcess() {
    let processing = [];
    if (deepGet(Store.getState(), `recorded_video.cover_capture_processing`)) {
      processing.push('cover is capturing');
    }
    if (deepGet(Store.getState(), `recorded_video.cover_s3_upload_processing`)) {
      processing.push('cover is uploading');
    }
    if (deepGet(Store.getState(), `recorded_video.compression_processing`)) {
      processing.push('video is compressing');
    }
    if (deepGet(Store.getState(), `recorded_video.video_s3_upload_processing`)) {
      processing.push('video is uploading');
    }
    return processing.join(', ');
  }


  getUserCoverVideoId(id, state) {
    state = state || Store.getState();
    if (deepGet(state, `user_profile_entities.id_${id}.cover_video_id`)) {
      return deepGet(state, `user_profile_entities.id_${id}.cover_video_id`);
    } else if (deepGet(state, `recorded_video.cover_video_id`)) {
      return deepGet(state, `recorded_video.cover_video_id`);
    }
  }

  getUserCoverImageId(id, state) {
    state = state || Store.getState();
    if (deepGet(state, `user_profile_entities.id_${id}.cover_image_id`)) {
      return deepGet(state, `user_profile_entities.id_${id}.cover_image_id`);
    } else if (deepGet(state, `recorded_video.cover_image_id`)) {
      return deepGet(state, `recorded_video.cover_image_id`);
    }
  }

  getCurrentUserProfile(state) {
    state = state || Store.getState();
    return deepGet(state, `user_profile_entities.id_${CurrentUser.getUserId()}`);
  }

  getImage(id, state, size) {
    state = state || Store.getState();
    size = size || 'original';
    return deepGet(state, `image_entities.id_${id}.resolutions.${size}.url`);
  }

  getUserVideoId(id, state) {
    state = state || Store.getState();
    return deepGet(state, `user_video_entities.id_${id}.payload.video_id`);
  }

  getUserVideoUserId(id, state) {
    state = state || Store.getState();
    return deepGet(state, `user_video_entities.id_${id}.payload.user_id`);
  }

  getTagsVideoPayload(id, state) {
    state = state || Store.getState();
    return deepGet(state, `tag_video_entities.id_${id}.payload`)
  }

  getProfileImage(id, state, size) {
    state = state || Store.getState();
    size = size || appConfig.profileImageConstants.imageWidth;
    return (
      deepGet(state, `image_entities.id_${id}.resolutions.${size}.url`) ||
      deepGet(state, `image_entities.id_${id}.resolutions.${appConfig.profileImageConstants.originalImageWidth}.url`)
    );
  }

  getUserLinkId(id, state) {
    state = state || Store.getState();
    return deepGet(state, `user_profile_entities.id_${id}.link_ids[0]`);
  }

  getLink(id, state) {
    state = state || Store.getState();
    return unescape(deepGet(state, `link_entities.id_${id}.url`));
  }

  getVideoTimeStamp(id, state) {
    state = state || Store.getState();
    return deepGet(state, `video_entities.id_${id}.uts`);
  }

  getProfileImageId(id, state) {
    state = state || Store.getState();
    return deepGet(state, `user_entities.id_${id}.profile_image_id`);
  }

  getVideoUploadUTS(id, state) {
    state = state || Store.getState();
    return deepGet(state, `video_entities.id_${id}.uts`);
  }

  getVideoSize(id, state, size) {
    state = state || Store.getState();
    size = size || 'original';
    let byteSize = deepGet(state, `video_entities.id_${id}.resolutions.${size}.size`);
    return (byteSize && round(byteSize / 1024 / 1024, 2)) || 'NA';
  }

  getImageSize(id, state, size) {
    state = state || Store.getState();
    size = size || 'original';
    let posterImageId = deepGet(state, `video_entities.id_${id}.poster_image_id`);
    let byteSize = deepGet(state, `image_entities.id_${posterImageId}.resolutions.${size}.size`);
    return (byteSize && round(byteSize / 1024 / 1024, 2)) || 'NA';
  }

  getVideoProcessingStatus(state) {
    state = state || Store.getState();
    return deepGet(state, 'video_in_processing');
  }

  getPricePoint(state) {
    state = state || Store.getState();
    return state['price_points'];
  }

  getToken(state) {
    state = state || Store.getState();
    return state['token'];
  }

  getActivityTransactionId(id, state) {
    state = state || Store.getState();
    return deepGet(state, `activities_entities.id_${id}.payload.ost_transaction_id`);
  }

  getActivityGiffyId(id, state) {
    state = state || Store.getState();
    return deepGet(state, `activities_entities.id_${id}.payload.gif_id`);
  }

  getGiffy(id, state) {
    state = state || Store.getState();
    return deepGet(state, `giffy_entities.id_${id}`);
  }

  getActivityMessage(id, state) {
    state = state || Store.getState();
    return deepGet(state, `activities_entities.id_${id}.payload.text`);
  }

  getActivityTransactionStatus(id, state) {
    state = state || Store.getState();
    return deepGet(state, `activities_entities.id_${id}.status`);
  }

  getActivityTransactionTimeStamp(id, state) {
    state = state || Store.getState();
    return deepGet(state, `activities_entities.id_${id}.uts`);
  }

  getTransactionFromUserId(id, state) {
    state = state || Store.getState();
    return deepGet(state, `transaction_entities.id_${id}.from_user_id`);
  }

  getTransactionToUserId(id, state) {
    state = state || Store.getState();
    return deepGet(state, `transaction_entities.id_${id}.to_user_ids[0]`);
  }

  getTransactionAmount(id, state) {
    state = state || Store.getState();
    return deepGet(state, `transaction_entities.id_${id}.amounts[0]`);
  }

  getUserContributionToStats(fromUserId, toUserId, state) {
    state = state || Store.getState();
    return deepGet(state, `user_contribution_to_stats.id_${fromUserId}[${toUserId}]['total_amount']`);
  }

  getUserContributionByStats(fromUserId, toUserId, state) {
    state = state || Store.getState();
    return deepGet(state, `user_contribution_by_stats.id_${toUserId}[${fromUserId}]['total_amount']`);
  }

  getNotificationHeading(notificationId, state) {
    state = state || Store.getState();
    return deepGet(state, `user_notifications.id_${notificationId}.heading`);
  }

  getNotificationPictureId(notificationId, state) {
    state = state || Store.getState();
    return deepGet(state, `user_notifications.id_${notificationId}.image_id`);
  }

  getNotificationKind(notificationId, state) {
    state = state || Store.getState();
    return deepGet(state, `user_notifications.id_${notificationId}.kind`);
  }

  getNotificationPayload(notificationId, state) {
    state = state || Store.getState();
    return deepGet(state, `user_notifications.id_${notificationId}.payload`);
  }

  getNotificationTimestamp(notificationId, state) {
    state = state || Store.getState();
    return deepGet(state, `user_notifications.id_${notificationId}.timestamp`);
  }

  getNotificationGoTo(notificationId, state) {
    state = state || Store.getState();
    return deepGet(state, `user_notifications.id_${notificationId}.goto`);
  }
  getPushNotification(state) {
    state = state || Store.getState();
    return deepGet(state, `push_notification`);
  }

  getNotificationUnreadFlag(state) {
    state = state || Store.getState();
    return deepGet(state, `notification_unread.flag`);
  }

  getBalance( state ){
    state = state || Store.getState();
    return deepGet(state, `balance`);
  }

  getPurchasingStatus(state){
    state = state || Store.getState();
    return deepGet(state, `isPurchase`);
  }
  isUserInactive(id, state){
    state = state || Store.getState();
    return deepGet(state, `user_entities.id_${id}.status`, '').toLowerCase() == appConfig.userStatusMap.inActive;
  }

  getUSDPrice(state){
    state = state || Store.getState();
    return deepGet(state,  "price_points.OST.USD");
  }

  getPepocornBalance(state){
    state = state || Store.getState();
    return deepGet(state,  "pepocorn.balance" , 0);
  }

  getHashTag(id, state){
    state = state || Store.getState();
    return deepGet(state, `tag_entities.id_${id}`);
  }

  getReplyEntity(id, state) {
    state = state || Store.getState();
    return deepGet(state, `reply_detail_entities.id_${id}`);
  }

  getReplyBt(id, state) {
    state = state || Store.getState();
    return deepGet(state, `reply_detail_entities.id_${id}.total_amount_raised_in_wei`);
  }

  getReplyKind(id, state){
    state = state || Store.getState();
    return deepGet(state, `reply_detail_entities.id_${id}.entity_kind`);
  }

  getReplyEntityId(id, state){
    state = state || Store.getState();
    return deepGet(state, `reply_detail_entities.id_${id}.entity_id`);
  }

  getVideoRelationEntity(id, state){
    state = state || Store.getState();
    return deepGet(state, `current_user_video_relation_entities.id_${id}`);
  }

  getReplyDetailRelationEntity(id, state){
    state = state || Store.getState();
    return deepGet(state, `current_user_reply_detail_relation_entities.id_${id}`);
  }

  isReplySeen(id, state){
    state = state || Store.getState();
    return deepGet(state, `current_user_reply_detail_relation_entities.id_${id}.has_seen`);
  }

  getCanDeleteReply(id, state){
    state = state || Store.getState();
    return  !!Number( deepGet(state, `current_user_reply_detail_relation_entities.id_${id}.can_delete` , 0) );
  }

  isVideoIsChargeable(id, state){
    state = state || Store.getState();
    return  !!Number( deepGet(state, `current_user_video_relation_entities.id_${id}.is_reply_chargeable` , 0) );
  }

  isReplyShareable(id ,  state){
    state = state || Store.getState();
    return !!Number( deepGet(state, `current_user_reply_detail_relation_entities.id_${id}.is_shareable` , 0));
  }

  isVideoShareable(id ,state){
    state = state || Store.getState();
    return  !!Number( deepGet(state, `current_user_video_relation_entities.id_${id}.is_shareable` , 0) );
  }

  getReplyDescriptionId(id, state) {
    state = state || Store.getState();
    return deepGet(state, `reply_detail_entities.id_${id}.description_id`);
  }

  getReplyBt(id, state) {
    state = state || Store.getState();
    return deepGet(state, `reply_detail_entities.id_${id}.total_amount_raised_in_wei`);
  }

  getReplySupporters(id , state){
    state = state || Store.getState();
    return deepGet(state, `reply_detail_entities.id_${id}.total_contributed_by`);
  }

  getReplyLinkId(id, state) {
    state = state || Store.getState();
    return deepGet(state, `reply_detail_entities.id_${id}.link_ids[0]`);
  }

  isReplySupported(id, state) {
    state = state || Store.getState();
    let val = deepGet(state, `reply_contribution_entities.id_${id}`);
    val = val && Number(val);
    return !!val;
  }

  getReplyParentVideoId(id ,  state){
    state = state || Store.getState();
    return deepGet(state, `reply_detail_entities.id_${id}.parent_id`);
  }

  getReplyUserId(id ,  state){
    state = state || Store.getState();
    return deepGet(state, `reply_detail_entities.id_${id}.creator_user_id`);
  }

  getReplyParentUserId(id , state){
    state = state || Store.getState();
    let parentId = deepGet(state, `reply_detail_entities.id_${id}.parent_id`);
    return deepGet(state, `video_stat_entities.id_${parentId}.creator_user_id`);
  }

  getLoginPopOverProps(state) {
    state = state || Store.getState();
    return deepGet(state, `login_popover`);    
  }

  getUnseenReplies(id, state){
    state = state || Store.getState();
    return deepGet(state, `unseen_replies_entities.id_${id}.unseen`, []);
  }

  getChannelName(id, state){
    state = state || Store.getState();
    return unescape(deepGet(state, `channel_entities.id_${id}.name`));
  }

  getChannelTagLine(id, state){
    state = state || Store.getState();
    let tagId = deepGet(state, `channel_detail_entities.id_${id}.tagline_id`);
    return unescape(deepGet(state, `text_entities.id_${tagId}.text`));
  }

  getChannelUserCount(id, state){
    state = state || Store.getState();
    return deepGet(state, `channel_stat_entities.id_${id}.total_users`);
  }

  getChannelVideoCount(id, state){
    state = state || Store.getState();
    return deepGet(state, `channel_stat_entities.id_${id}.total_videos`);
  }
  
  getChannelBackgroundImage(id, state){
    state = state || Store.getState();
    let coverImageId = deepGet(state, `channel_detail_entities.id_${id}.cover_image_id`)
      return deepGet(state, `image_entities.id_${coverImageId}.resolutions.576w.url`) || deepGet(state, `image_entities.id_${coverImageId}.resolutions.original.url`) ;
  }

  getChannelTagIds(id, state) {
    state = state || Store.getState();
    return deepGet(state, `channel_detail_entities.id_${id}.tag_ids`);
  }

  isCurrentUserMemberOfChannel(id, state){
    state = state || Store.getState();
    return deepGet(state, `current_user_channel_relation_entities.id_${id}.is_member`);
  }

  isCurrentUserAdminOfChannel(id, state){
    state = state || Store.getState();
    return !!deepGet(state, `current_user_channel_relation_entities.id_${id}.is_admin`);
  }

  isChannelUserAdmin(channelId ,  userId , state){
    state = state || Store.getState();
    return !!deepGet(state, `channel_user_relation_entities.id_${channelId}.${userId}.is_admin` ,  false);
  }

  canCurrentUserEditChannel(id , state){
    state = state || Store.getState();
    return !!deepGet(state, `channel_allowed_action_entities.id_${id}.can_edit`);
  }

  canCurrentUserLeaveChannel(id , state){
    state = state || Store.getState();
    return !!deepGet(state, `channel_allowed_action_entities.id_${id}.can_leave`);
  }

  getChannelDescription(id, state){
    state = state || Store.getState();
    let descId = deepGet(state, `channel_detail_entities.id_${id}.description_id`);
    return unescape(deepGet(state, `text_entities.id_${descId}.text`));
  }

  getChannelIncludesEntity(id, tappedText){
    let lowercasedText = tappedText.toLowerCase();
    let state = Store.getState();
    let descId = deepGet(state, `channel_detail_entities.id_${id}.description_id`);
    return deepGet(state, `text_entities.id_${descId}.includes`) && (deepGet(state, `text_entities.id_${descId}.includes`)[lowercasedText] ||
            deepGet(state, `text_entities.id_${descId}.includes`)[tappedText]);
  }

  getReplyCTS(id, state){
    state = state || Store.getState();
    return deepGet(state, `reply_detail_entities.id_${id}.cts`,  0);
  } 

  getVideoCTS(id ,state ){
    state = state || Store.getState();
    return deepGet(state, `video_stat_entities.id_${id}.cts` , 0 );
  }

  getVideoChannelList(id , state){
    state = state || Store.getState();
    return deepGet(state, `video_stat_entities.id_${id}.channel_ids` , [] );
  }
  currentUserNotificationStatus(id, state){
    state = state || Store.getState();
    return deepGet(state, `current_user_channel_relation_entities.id_${id}.notification_status`);

  }
  getPepoAmtInWei(state){
    state = state || Store.getState();
    return deepGet(state, `airdrop_details_entities.pepo_amount_in_wei`);
  }
  getPepoAmtInUSD(state){
    state = state || Store.getState();
    return deepGet(state, `airdrop_details_entities.pepo_amount_in_usd`);
  }


}

export default new ReduxGetters();
