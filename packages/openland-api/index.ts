// WARNING! THIS IS AUTOGENERATED FILE. DO NOT EDIT!

import { typedQuery } from 'openland-y-graphql/typed';
import { typedMutation } from 'openland-y-graphql/typed';
import { typedSubscription } from 'openland-y-graphql/typed';
import { typedFragment } from 'openland-y-graphql/typed';
import * as Types from './Types';
import * as Account from './queries/Account';
import * as App from './queries/App';
import * as Badges from './queries/Badges';
import * as Chats from './queries/Chats';
import * as Comments from './queries/Comments';
import * as Conferences from './queries/Conferences';
import * as Explore from './queries/Explore';
import * as FeatureFlag from './queries/FeatureFlag';
import * as Feed from './queries/Feed';
import * as Matchmaking from './queries/Matchmaking';
import * as MyNotificationsCenter from './queries/MyNotificationsCenter';
import * as Oauth from './queries/Oauth';
import * as Organization from './queries/Organization';
import * as Permissions from './queries/Permissions';
import * as Report from './queries/Report';
import * as Settings from './queries/Settings';
import * as Shortname from './queries/Shortname';
import * as Stickers from './queries/Stickers';
import * as Track from './queries/Track';
import * as User from './queries/User';
import * as AppChat from './fragments/AppChat';
import * as AppFull from './fragments/AppFull';
import * as Comment from './fragments/Comment';
import * as CommunitySearch from './fragments/CommunitySearch';
import * as ConferenceFull from './fragments/ConferenceFull';
import * as FeedChannelFull from './fragments/FeedChannelFull';
import * as FeedItemFull from './fragments/FeedItemFull';
import * as MatchmakingFragments from './fragments/MatchmakingFragments';
import * as Message from './fragments/Message';
import * as OrganizationFull from './fragments/OrganizationFull';
import * as OrganizationMedium from './fragments/OrganizationMedium';
import * as OrganizationProfileFull from './fragments/OrganizationProfileFull';
import * as OrganizationSearch from './fragments/OrganizationSearch';
import * as OrganizationShort from './fragments/OrganizationShort';
import * as OrganizationWithoutMembersFragment from './fragments/OrganizationWithoutMembersFragment';
import * as RoomFull from './fragments/RoomFull';
import * as RoomNano from './fragments/RoomNano';
import * as RoomShort from './fragments/RoomShort';
import * as SessionStateFull from './fragments/SessionStateFull';
import * as SettingsFragment from './fragments/SettingsFragment';
import * as StickerFragment from './fragments/StickerFragment';
import * as UserBadge from './fragments/UserBadge';
import * as UserForMention from './fragments/UserForMention';
import * as UserFull from './fragments/UserFull';
import * as UserShort from './fragments/UserShort';
import * as UserTiny from './fragments/UserTiny';

export const AccountQuery = typedQuery<Types.Account, {}>(Account.AccountQuery);
export const AccountSettingsQuery = typedQuery<Types.AccountSettings, {}>(Account.AccountSettingsQuery);
export const SettingsWatchSubscription = typedSubscription<Types.SettingsWatch, {}>(Account.SettingsWatchSubscription);
export const CreateOrganizationMutation = typedMutation<Types.CreateOrganization, Types.CreateOrganizationVariables>(Account.CreateOrganizationMutation);
export const AccountInviteInfoQuery = typedQuery<Types.AccountInviteInfo, Types.AccountInviteInfoVariables>(Account.AccountInviteInfoQuery);
export const AccountAppInviteInfoQuery = typedQuery<Types.AccountAppInviteInfo, Types.AccountAppInviteInfoVariables>(Account.AccountAppInviteInfoQuery);
export const AccountAppInviteQuery = typedQuery<Types.AccountAppInvite, {}>(Account.AccountAppInviteQuery);
export const AccountInviteJoinMutation = typedMutation<Types.AccountInviteJoin, Types.AccountInviteJoinVariables>(Account.AccountInviteJoinMutation);
export const ProfilePrefillQuery = typedQuery<Types.ProfilePrefill, {}>(Account.ProfilePrefillQuery);
export const CreateUserProfileAndOrganizationMutation = typedMutation<Types.CreateUserProfileAndOrganization, Types.CreateUserProfileAndOrganizationVariables>(Account.CreateUserProfileAndOrganizationMutation);
export const ReportOnlineMutation = typedMutation<Types.ReportOnline, Types.ReportOnlineVariables>(Account.ReportOnlineMutation);
export const RegisterPushMutation = typedMutation<Types.RegisterPush, Types.RegisterPushVariables>(Account.RegisterPushMutation);
export const FetchPushSettingsQuery = typedQuery<Types.FetchPushSettings, {}>(Account.FetchPushSettingsQuery);
export const RegisterWebPushMutation = typedMutation<Types.RegisterWebPush, Types.RegisterWebPushVariables>(Account.RegisterWebPushMutation);
export const MyAppsQuery = typedQuery<Types.MyApps, {}>(App.MyAppsQuery);
export const CreateAppMutation = typedMutation<Types.CreateApp, Types.CreateAppVariables>(App.CreateAppMutation);
export const UpdateAppMutation = typedMutation<Types.UpdateApp, Types.UpdateAppVariables>(App.UpdateAppMutation);
export const RefreshAppTokenMutation = typedMutation<Types.RefreshAppToken, Types.RefreshAppTokenVariables>(App.RefreshAppTokenMutation);
export const AddAppToChatMutation = typedMutation<Types.AddAppToChat, Types.AddAppToChatVariables>(App.AddAppToChatMutation);
export const UserStorageQuery = typedQuery<Types.UserStorage, Types.UserStorageVariables>(App.UserStorageQuery);
export const UserStorageSetMutation = typedMutation<Types.UserStorageSet, Types.UserStorageSetVariables>(App.UserStorageSetMutation);
export const SuperBadgeCreateToRoomMutation = typedMutation<Types.SuperBadgeCreateToRoom, Types.SuperBadgeCreateToRoomVariables>(Badges.SuperBadgeCreateToRoomMutation);
export const SuperBadgeUnsetToRoomMutation = typedMutation<Types.SuperBadgeUnsetToRoom, Types.SuperBadgeUnsetToRoomVariables>(Badges.SuperBadgeUnsetToRoomMutation);
export const SuperBadgeInRoomQuery = typedQuery<Types.SuperBadgeInRoom, Types.SuperBadgeInRoomVariables>(Badges.SuperBadgeInRoomQuery);
export const DialogsQuery = typedQuery<Types.Dialogs, Types.DialogsVariables>(Chats.DialogsQuery);
export const ChatWatchSubscription = typedSubscription<Types.ChatWatch, Types.ChatWatchVariables>(Chats.ChatWatchSubscription);
export const DialogsWatchSubscription = typedSubscription<Types.DialogsWatch, Types.DialogsWatchVariables>(Chats.DialogsWatchSubscription);
export const RoomQuery = typedQuery<Types.Room, Types.RoomVariables>(Chats.RoomQuery);
export const RoomPicoQuery = typedQuery<Types.RoomPico, Types.RoomPicoVariables>(Chats.RoomPicoQuery);
export const RoomChatQuery = typedQuery<Types.RoomChat, Types.RoomChatVariables>(Chats.RoomChatQuery);
export const RoomWithoutMembersQuery = typedQuery<Types.RoomWithoutMembers, Types.RoomWithoutMembersVariables>(Chats.RoomWithoutMembersQuery);
export const RoomFeaturedMembersQuery = typedQuery<Types.RoomFeaturedMembers, Types.RoomFeaturedMembersVariables>(Chats.RoomFeaturedMembersQuery);
export const RoomTinyQuery = typedQuery<Types.RoomTiny, Types.RoomTinyVariables>(Chats.RoomTinyQuery);
export const RoomSuperQuery = typedQuery<Types.RoomSuper, Types.RoomSuperVariables>(Chats.RoomSuperQuery);
export const PinMessageMutation = typedMutation<Types.PinMessage, Types.PinMessageVariables>(Chats.PinMessageMutation);
export const UnpinMessageMutation = typedMutation<Types.UnpinMessage, Types.UnpinMessageVariables>(Chats.UnpinMessageMutation);
export const MessageSetReactionMutation = typedMutation<Types.MessageSetReaction, Types.MessageSetReactionVariables>(Chats.MessageSetReactionMutation);
export const MessageUnsetReactionMutation = typedMutation<Types.MessageUnsetReaction, Types.MessageUnsetReactionVariables>(Chats.MessageUnsetReactionMutation);
export const GlobalCounterQuery = typedQuery<Types.GlobalCounter, {}>(Chats.GlobalCounterQuery);
export const MessagesBatchQuery = typedQuery<Types.MessagesBatch, Types.MessagesBatchVariables>(Chats.MessagesBatchQuery);
export const ChatInitQuery = typedQuery<Types.ChatInit, Types.ChatInitVariables>(Chats.ChatInitQuery);
export const ChatInitFromUnreadQuery = typedQuery<Types.ChatInitFromUnread, Types.ChatInitFromUnreadVariables>(Chats.ChatInitFromUnreadQuery);
export const SendMessageMutation = typedMutation<Types.SendMessage, Types.SendMessageVariables>(Chats.SendMessageMutation);
export const RoomReadMutation = typedMutation<Types.RoomRead, Types.RoomReadVariables>(Chats.RoomReadMutation);
export const RoomCreateMutation = typedMutation<Types.RoomCreate, Types.RoomCreateVariables>(Chats.RoomCreateMutation);
export const SetTypingMutation = typedMutation<Types.SetTyping, Types.SetTypingVariables>(Chats.SetTypingMutation);
export const RoomAddMembersMutation = typedMutation<Types.RoomAddMembers, Types.RoomAddMembersVariables>(Chats.RoomAddMembersMutation);
export const RoomKickMutation = typedMutation<Types.RoomKick, Types.RoomKickVariables>(Chats.RoomKickMutation);
export const RoomChangeRoleMutation = typedMutation<Types.RoomChangeRole, Types.RoomChangeRoleVariables>(Chats.RoomChangeRoleMutation);
export const RoomLeaveMutation = typedMutation<Types.RoomLeave, Types.RoomLeaveVariables>(Chats.RoomLeaveMutation);
export const RoomSearchQuery = typedQuery<Types.RoomSearch, Types.RoomSearchVariables>(Chats.RoomSearchQuery);
export const RoomAlterFeaturedMutation = typedMutation<Types.RoomAlterFeatured, Types.RoomAlterFeaturedVariables>(Chats.RoomAlterFeaturedMutation);
export const RoomAlterHiddenMutation = typedMutation<Types.RoomAlterHidden, Types.RoomAlterHiddenVariables>(Chats.RoomAlterHiddenMutation);
export const RoomMembersShortQuery = typedQuery<Types.RoomMembersShort, Types.RoomMembersShortVariables>(Chats.RoomMembersShortQuery);
export const RoomMembersQuery = typedQuery<Types.RoomMembers, Types.RoomMembersVariables>(Chats.RoomMembersQuery);
export const RoomMembersTinyQuery = typedQuery<Types.RoomMembersTiny, Types.RoomMembersTinyVariables>(Chats.RoomMembersTinyQuery);
export const ChatMembersSearchQuery = typedQuery<Types.ChatMembersSearch, Types.ChatMembersSearchVariables>(Chats.ChatMembersSearchQuery);
export const RoomOrganizationAdminMembersQuery = typedQuery<Types.RoomOrganizationAdminMembers, Types.RoomOrganizationAdminMembersVariables>(Chats.RoomOrganizationAdminMembersQuery);
export const RoomMembersPaginatedQuery = typedQuery<Types.RoomMembersPaginated, Types.RoomMembersPaginatedVariables>(Chats.RoomMembersPaginatedQuery);
export const RoomSettingsUpdateMutation = typedMutation<Types.RoomSettingsUpdate, Types.RoomSettingsUpdateVariables>(Chats.RoomSettingsUpdateMutation);
export const RoomJoinMutation = typedMutation<Types.RoomJoin, Types.RoomJoinVariables>(Chats.RoomJoinMutation);
export const RoomsJoinMutation = typedMutation<Types.RoomsJoin, Types.RoomsJoinVariables>(Chats.RoomsJoinMutation);
export const RoomsInviteUserMutation = typedMutation<Types.RoomsInviteUser, Types.RoomsInviteUserVariables>(Chats.RoomsInviteUserMutation);
export const RoomJoinInviteLinkMutation = typedMutation<Types.RoomJoinInviteLink, Types.RoomJoinInviteLinkVariables>(Chats.RoomJoinInviteLinkMutation);
export const RoomRenewInviteLinkMutation = typedMutation<Types.RoomRenewInviteLink, Types.RoomRenewInviteLinkVariables>(Chats.RoomRenewInviteLinkMutation);
export const RoomInviteLinkQuery = typedQuery<Types.RoomInviteLink, Types.RoomInviteLinkVariables>(Chats.RoomInviteLinkQuery);
export const RoomInviteInfoQuery = typedQuery<Types.RoomInviteInfo, Types.RoomInviteInfoVariables>(Chats.RoomInviteInfoQuery);
export const ResolvedInviteQuery = typedQuery<Types.ResolvedInvite, Types.ResolvedInviteVariables>(Chats.ResolvedInviteQuery);
export const RoomUpdateMutation = typedMutation<Types.RoomUpdate, Types.RoomUpdateVariables>(Chats.RoomUpdateMutation);
export const RoomDeleteMessageMutation = typedMutation<Types.RoomDeleteMessage, Types.RoomDeleteMessageVariables>(Chats.RoomDeleteMessageMutation);
export const RoomDeleteMessagesMutation = typedMutation<Types.RoomDeleteMessages, Types.RoomDeleteMessagesVariables>(Chats.RoomDeleteMessagesMutation);
export const RoomDeleteUrlAugmentationMutation = typedMutation<Types.RoomDeleteUrlAugmentation, Types.RoomDeleteUrlAugmentationVariables>(Chats.RoomDeleteUrlAugmentationMutation);
export const EditMessageMutation = typedMutation<Types.EditMessage, Types.EditMessageVariables>(Chats.EditMessageMutation);
export const MarkSequenceReadMutation = typedMutation<Types.MarkSequenceRead, Types.MarkSequenceReadVariables>(Chats.MarkSequenceReadMutation);
export const TypingsWatchSubscription = typedSubscription<Types.TypingsWatch, {}>(Chats.TypingsWatchSubscription);
export const ChatOnlinesCountWatchSubscription = typedSubscription<Types.ChatOnlinesCountWatch, Types.ChatOnlinesCountWatchVariables>(Chats.ChatOnlinesCountWatchSubscription);
export const UpdateWelcomeMessageMutation = typedMutation<Types.UpdateWelcomeMessage, Types.UpdateWelcomeMessageVariables>(Chats.UpdateWelcomeMessageMutation);
export const MessageQuery = typedQuery<Types.Message, Types.MessageVariables>(Chats.MessageQuery);
export const MessagesSearchQuery = typedQuery<Types.MessagesSearch, Types.MessagesSearchVariables>(Chats.MessagesSearchQuery);
export const DeleteCommentMutation = typedMutation<Types.DeleteComment, Types.DeleteCommentVariables>(Comments.DeleteCommentMutation);
export const CommentsQuery = typedQuery<Types.Comments, Types.CommentsVariables>(Comments.CommentsQuery);
export const CommentSetReactionMutation = typedMutation<Types.CommentSetReaction, Types.CommentSetReactionVariables>(Comments.CommentSetReactionMutation);
export const CommentUnsetReactionMutation = typedMutation<Types.CommentUnsetReaction, Types.CommentUnsetReactionVariables>(Comments.CommentUnsetReactionMutation);
export const DeleteNotificationMutation = typedMutation<Types.DeleteNotification, Types.DeleteNotificationVariables>(Comments.DeleteNotificationMutation);
export const SubscribeToCommentsMutation = typedMutation<Types.SubscribeToComments, Types.SubscribeToCommentsVariables>(Comments.SubscribeToCommentsMutation);
export const UnSubscribeFromCommentsMutation = typedMutation<Types.UnSubscribeFromComments, Types.UnSubscribeFromCommentsVariables>(Comments.UnSubscribeFromCommentsMutation);
export const AddCommentMutation = typedMutation<Types.AddComment, Types.AddCommentVariables>(Comments.AddCommentMutation);
export const EditCommentMutation = typedMutation<Types.EditComment, Types.EditCommentVariables>(Comments.EditCommentMutation);
export const CommentWatchSubscription = typedSubscription<Types.CommentWatch, Types.CommentWatchVariables>(Comments.CommentWatchSubscription);
export const ConferenceQuery = typedQuery<Types.Conference, Types.ConferenceVariables>(Conferences.ConferenceQuery);
export const ConferenceMediaQuery = typedQuery<Types.ConferenceMedia, Types.ConferenceMediaVariables>(Conferences.ConferenceMediaQuery);
export const ConferenceJoinMutation = typedMutation<Types.ConferenceJoin, Types.ConferenceJoinVariables>(Conferences.ConferenceJoinMutation);
export const ConferenceLeaveMutation = typedMutation<Types.ConferenceLeave, Types.ConferenceLeaveVariables>(Conferences.ConferenceLeaveMutation);
export const ConferenceKeepAliveMutation = typedMutation<Types.ConferenceKeepAlive, Types.ConferenceKeepAliveVariables>(Conferences.ConferenceKeepAliveMutation);
export const ConferenceOfferMutation = typedMutation<Types.ConferenceOffer, Types.ConferenceOfferVariables>(Conferences.ConferenceOfferMutation);
export const ConferenceAnswerMutation = typedMutation<Types.ConferenceAnswer, Types.ConferenceAnswerVariables>(Conferences.ConferenceAnswerMutation);
export const ConferenceCandidateMutation = typedMutation<Types.ConferenceCandidate, Types.ConferenceCandidateVariables>(Conferences.ConferenceCandidateMutation);
export const MediaOfferMutation = typedMutation<Types.MediaOffer, Types.MediaOfferVariables>(Conferences.MediaOfferMutation);
export const MediaNegotiationNeededMutation = typedMutation<Types.MediaNegotiationNeeded, Types.MediaNegotiationNeededVariables>(Conferences.MediaNegotiationNeededMutation);
export const MediaFailedMutation = typedMutation<Types.MediaFailed, Types.MediaFailedVariables>(Conferences.MediaFailedMutation);
export const MediaAnswerMutation = typedMutation<Types.MediaAnswer, Types.MediaAnswerVariables>(Conferences.MediaAnswerMutation);
export const MediaCandidateMutation = typedMutation<Types.MediaCandidate, Types.MediaCandidateVariables>(Conferences.MediaCandidateMutation);
export const ConferenceMediaWatchSubscription = typedSubscription<Types.ConferenceMediaWatch, Types.ConferenceMediaWatchVariables>(Conferences.ConferenceMediaWatchSubscription);
export const ConferenceWatchSubscription = typedSubscription<Types.ConferenceWatch, Types.ConferenceWatchVariables>(Conferences.ConferenceWatchSubscription);
export const AvailableRoomsQuery = typedQuery<Types.AvailableRooms, {}>(Explore.AvailableRoomsQuery);
export const SuggestedRoomsQuery = typedQuery<Types.SuggestedRooms, {}>(Explore.SuggestedRoomsQuery);
export const UserAvailableRoomsQuery = typedQuery<Types.UserAvailableRooms, Types.UserAvailableRoomsVariables>(Explore.UserAvailableRoomsQuery);
export const GlobalSearchQuery = typedQuery<Types.GlobalSearch, Types.GlobalSearchVariables>(Explore.GlobalSearchQuery);
export const DiscoverNextPageQuery = typedQuery<Types.DiscoverNextPage, Types.DiscoverNextPageVariables>(Explore.DiscoverNextPageQuery);
export const BetaSubmitNextDiscoverMutation = typedMutation<Types.BetaSubmitNextDiscover, Types.BetaSubmitNextDiscoverVariables>(Explore.BetaSubmitNextDiscoverMutation);
export const BetaDiscoverSkipMutation = typedMutation<Types.BetaDiscoverSkip, Types.BetaDiscoverSkipVariables>(Explore.BetaDiscoverSkipMutation);
export const DiscoverIsDoneQuery = typedQuery<Types.DiscoverIsDone, {}>(Explore.DiscoverIsDoneQuery);
export const FeatureFlagsQuery = typedQuery<Types.FeatureFlags, {}>(FeatureFlag.FeatureFlagsQuery);
export const FeatureFlagAddMutation = typedMutation<Types.FeatureFlagAdd, Types.FeatureFlagAddVariables>(FeatureFlag.FeatureFlagAddMutation);
export const FeatureFlagEnableMutation = typedMutation<Types.FeatureFlagEnable, Types.FeatureFlagEnableVariables>(FeatureFlag.FeatureFlagEnableMutation);
export const FeatureFlagDisableMutation = typedMutation<Types.FeatureFlagDisable, Types.FeatureFlagDisableVariables>(FeatureFlag.FeatureFlagDisableMutation);
export const InitFeedQuery = typedQuery<Types.InitFeed, Types.InitFeedVariables>(Feed.InitFeedQuery);
export const FeedLoadMoreQuery = typedQuery<Types.FeedLoadMore, Types.FeedLoadMoreVariables>(Feed.FeedLoadMoreQuery);
export const FeedSubscriptionsQuery = typedQuery<Types.FeedSubscriptions, Types.FeedSubscriptionsVariables>(Feed.FeedSubscriptionsQuery);
export const FeedWritableChannelsQuery = typedQuery<Types.FeedWritableChannels, Types.FeedWritableChannelsVariables>(Feed.FeedWritableChannelsQuery);
export const FeedChannelsSearchQuery = typedQuery<Types.FeedChannelsSearch, Types.FeedChannelsSearchVariables>(Feed.FeedChannelsSearchQuery);
export const FeedRecommendedChannelsQuery = typedQuery<Types.FeedRecommendedChannels, Types.FeedRecommendedChannelsVariables>(Feed.FeedRecommendedChannelsQuery);
export const FeedChannelQuery = typedQuery<Types.FeedChannel, Types.FeedChannelVariables>(Feed.FeedChannelQuery);
export const FeedChannelWritersQuery = typedQuery<Types.FeedChannelWriters, Types.FeedChannelWritersVariables>(Feed.FeedChannelWritersQuery);
export const FeedChannelSubscribersQuery = typedQuery<Types.FeedChannelSubscribers, Types.FeedChannelSubscribersVariables>(Feed.FeedChannelSubscribersQuery);
export const FeedChannelContentQuery = typedQuery<Types.FeedChannelContent, Types.FeedChannelContentVariables>(Feed.FeedChannelContentQuery);
export const FeedChannelCreateMutation = typedMutation<Types.FeedChannelCreate, Types.FeedChannelCreateVariables>(Feed.FeedChannelCreateMutation);
export const FeedChannelUpdateMutation = typedMutation<Types.FeedChannelUpdate, Types.FeedChannelUpdateVariables>(Feed.FeedChannelUpdateMutation);
export const FeedChannelSubscribeMutation = typedMutation<Types.FeedChannelSubscribe, Types.FeedChannelSubscribeVariables>(Feed.FeedChannelSubscribeMutation);
export const FeedChannelUnsubscribeMutation = typedMutation<Types.FeedChannelUnsubscribe, Types.FeedChannelUnsubscribeVariables>(Feed.FeedChannelUnsubscribeMutation);
export const FeedChannelAddWriterMutation = typedMutation<Types.FeedChannelAddWriter, Types.FeedChannelAddWriterVariables>(Feed.FeedChannelAddWriterMutation);
export const FeedChannelRemoveWriterMutation = typedMutation<Types.FeedChannelRemoveWriter, Types.FeedChannelRemoveWriterVariables>(Feed.FeedChannelRemoveWriterMutation);
export const FeedItemQuery = typedQuery<Types.FeedItem, Types.FeedItemVariables>(Feed.FeedItemQuery);
export const FeedEditPostMutation = typedMutation<Types.FeedEditPost, Types.FeedEditPostVariables>(Feed.FeedEditPostMutation);
export const FeedCreatePostMutation = typedMutation<Types.FeedCreatePost, Types.FeedCreatePostVariables>(Feed.FeedCreatePostMutation);
export const FeedReactionAddMutation = typedMutation<Types.FeedReactionAdd, Types.FeedReactionAddVariables>(Feed.FeedReactionAddMutation);
export const FeedReactionRemoveMutation = typedMutation<Types.FeedReactionRemove, Types.FeedReactionRemoveVariables>(Feed.FeedReactionRemoveMutation);
export const FeedDeletePostMutation = typedMutation<Types.FeedDeletePost, Types.FeedDeletePostVariables>(Feed.FeedDeletePostMutation);
export const FeedUpdatesSubscription = typedSubscription<Types.FeedUpdates, Types.FeedUpdatesVariables>(Feed.FeedUpdatesSubscription);
export const MatchmakingRoomQuery = typedQuery<Types.MatchmakingRoom, Types.MatchmakingRoomVariables>(Matchmaking.MatchmakingRoomQuery);
export const MatchmakingProfileQuery = typedQuery<Types.MatchmakingProfile, Types.MatchmakingProfileVariables>(Matchmaking.MatchmakingProfileQuery);
export const MatchmakingRoomSaveMutation = typedMutation<Types.MatchmakingRoomSave, Types.MatchmakingRoomSaveVariables>(Matchmaking.MatchmakingRoomSaveMutation);
export const MatchmakingProfileFillMutation = typedMutation<Types.MatchmakingProfileFill, Types.MatchmakingProfileFillVariables>(Matchmaking.MatchmakingProfileFillMutation);
export const MatchmakingConnectMutation = typedMutation<Types.MatchmakingConnect, Types.MatchmakingConnectVariables>(Matchmaking.MatchmakingConnectMutation);
export const MyNotificationsQuery = typedQuery<Types.MyNotifications, Types.MyNotificationsVariables>(MyNotificationsCenter.MyNotificationsQuery);
export const MyNotificationsCenterSubscription = typedSubscription<Types.MyNotificationsCenter, Types.MyNotificationsCenterVariables>(MyNotificationsCenter.MyNotificationsCenterSubscription);
export const MyNotificationCenterQuery = typedQuery<Types.MyNotificationCenter, {}>(MyNotificationsCenter.MyNotificationCenterQuery);
export const MyNotificationCenterMarkSeqReadMutation = typedMutation<Types.MyNotificationCenterMarkSeqRead, Types.MyNotificationCenterMarkSeqReadVariables>(MyNotificationsCenter.MyNotificationCenterMarkSeqReadMutation);
export const ReadNotificationMutation = typedMutation<Types.ReadNotification, Types.ReadNotificationVariables>(MyNotificationsCenter.ReadNotificationMutation);
export const OauthContextQuery = typedQuery<Types.OauthContext, Types.OauthContextVariables>(Oauth.OauthContextQuery);
export const MyOrganizationsQuery = typedQuery<Types.MyOrganizations, {}>(Organization.MyOrganizationsQuery);
export const UpdateOrganizationMutation = typedMutation<Types.UpdateOrganization, Types.UpdateOrganizationVariables>(Organization.UpdateOrganizationMutation);
export const OrganizationQuery = typedQuery<Types.Organization, Types.OrganizationVariables>(Organization.OrganizationQuery);
export const OrganizationWithoutMembersQuery = typedQuery<Types.OrganizationWithoutMembers, Types.OrganizationWithoutMembersVariables>(Organization.OrganizationWithoutMembersQuery);
export const OrganizationMembersShortQuery = typedQuery<Types.OrganizationMembersShort, Types.OrganizationMembersShortVariables>(Organization.OrganizationMembersShortQuery);
export const OrganizationMembersQuery = typedQuery<Types.OrganizationMembers, Types.OrganizationMembersVariables>(Organization.OrganizationMembersQuery);
export const OrganizationProfileQuery = typedQuery<Types.OrganizationProfile, Types.OrganizationProfileVariables>(Organization.OrganizationProfileQuery);
export const ExploreCommunityQuery = typedQuery<Types.ExploreCommunity, Types.ExploreCommunityVariables>(Organization.ExploreCommunityQuery);
export const OrganizationChangeMemberRoleMutation = typedMutation<Types.OrganizationChangeMemberRole, Types.OrganizationChangeMemberRoleVariables>(Organization.OrganizationChangeMemberRoleMutation);
export const OrganizationAddMemberMutation = typedMutation<Types.OrganizationAddMember, Types.OrganizationAddMemberVariables>(Organization.OrganizationAddMemberMutation);
export const OrganizationPublicInviteQuery = typedQuery<Types.OrganizationPublicInvite, Types.OrganizationPublicInviteVariables>(Organization.OrganizationPublicInviteQuery);
export const OrganizationCreatePublicInviteMutation = typedMutation<Types.OrganizationCreatePublicInvite, Types.OrganizationCreatePublicInviteVariables>(Organization.OrganizationCreatePublicInviteMutation);
export const DeleteOrganizationMutation = typedMutation<Types.DeleteOrganization, Types.DeleteOrganizationVariables>(Organization.DeleteOrganizationMutation);
export const OrganizationMemberRemoveMutation = typedMutation<Types.OrganizationMemberRemove, Types.OrganizationMemberRemoveVariables>(Organization.OrganizationMemberRemoveMutation);
export const OrganizationActivateByInviteMutation = typedMutation<Types.OrganizationActivateByInvite, Types.OrganizationActivateByInviteVariables>(Organization.OrganizationActivateByInviteMutation);
export const OrganizationAlterPublishedMutation = typedMutation<Types.OrganizationAlterPublished, Types.OrganizationAlterPublishedVariables>(Organization.OrganizationAlterPublishedMutation);
export const OrganizationByPrefixQuery = typedQuery<Types.OrganizationByPrefix, Types.OrganizationByPrefixVariables>(Organization.OrganizationByPrefixQuery);
export const PermissionsQuery = typedQuery<Types.Permissions, {}>(Permissions.PermissionsQuery);
export const DebugMailsMutation = typedMutation<Types.DebugMails, Types.DebugMailsVariables>(Permissions.DebugMailsMutation);
export const SuperAdminsQuery = typedQuery<Types.SuperAdmins, {}>(Permissions.SuperAdminsQuery);
export const SuperAccountsQuery = typedQuery<Types.SuperAccounts, {}>(Permissions.SuperAccountsQuery);
export const SuperAccountQuery = typedQuery<Types.SuperAccount, Types.SuperAccountVariables>(Permissions.SuperAccountQuery);
export const SuperAccountRenameMutation = typedMutation<Types.SuperAccountRename, Types.SuperAccountRenameVariables>(Permissions.SuperAccountRenameMutation);
export const SuperAccountActivateMutation = typedMutation<Types.SuperAccountActivate, Types.SuperAccountActivateVariables>(Permissions.SuperAccountActivateMutation);
export const SuperAccountSuspendMutation = typedMutation<Types.SuperAccountSuspend, Types.SuperAccountSuspendVariables>(Permissions.SuperAccountSuspendMutation);
export const SuperAccountPendMutation = typedMutation<Types.SuperAccountPend, Types.SuperAccountPendVariables>(Permissions.SuperAccountPendMutation);
export const SuperAccountAddMutation = typedMutation<Types.SuperAccountAdd, Types.SuperAccountAddVariables>(Permissions.SuperAccountAddMutation);
export const SuperAccountMemberAddMutation = typedMutation<Types.SuperAccountMemberAdd, Types.SuperAccountMemberAddVariables>(Permissions.SuperAccountMemberAddMutation);
export const SuperAccountMemberRemoveMutation = typedMutation<Types.SuperAccountMemberRemove, Types.SuperAccountMemberRemoveVariables>(Permissions.SuperAccountMemberRemoveMutation);
export const SuperAdminAddMutation = typedMutation<Types.SuperAdminAdd, Types.SuperAdminAddVariables>(Permissions.SuperAdminAddMutation);
export const SuperAdminRemoveMutation = typedMutation<Types.SuperAdminRemove, Types.SuperAdminRemoveVariables>(Permissions.SuperAdminRemoveMutation);
export const DebugEventsWatchSubscription = typedSubscription<Types.DebugEventsWatch, Types.DebugEventsWatchVariables>(Permissions.DebugEventsWatchSubscription);
export const ReportContentMutation = typedMutation<Types.ReportContent, Types.ReportContentVariables>(Report.ReportContentMutation);
export const ProfileQuery = typedQuery<Types.Profile, {}>(Settings.ProfileQuery);
export const ProfileUpdateMutation = typedMutation<Types.ProfileUpdate, Types.ProfileUpdateVariables>(Settings.ProfileUpdateMutation);
export const ProfileCreateMutation = typedMutation<Types.ProfileCreate, Types.ProfileCreateVariables>(Settings.ProfileCreateMutation);
export const SettingsQuery = typedQuery<Types.Settings, {}>(Settings.SettingsQuery);
export const SettingsUpdateMutation = typedMutation<Types.SettingsUpdate, Types.SettingsUpdateVariables>(Settings.SettingsUpdateMutation);
export const ResolveShortNameQuery = typedQuery<Types.ResolveShortName, Types.ResolveShortNameVariables>(Shortname.ResolveShortNameQuery);
export const SetOrgShortnameMutation = typedMutation<Types.SetOrgShortname, Types.SetOrgShortnameVariables>(Shortname.SetOrgShortnameMutation);
export const SetUserShortnameMutation = typedMutation<Types.SetUserShortname, Types.SetUserShortnameVariables>(Shortname.SetUserShortnameMutation);
export const SetFeedChannelShortnameMutation = typedMutation<Types.SetFeedChannelShortname, Types.SetFeedChannelShortnameVariables>(Shortname.SetFeedChannelShortnameMutation);
export const MyStickersQuery = typedQuery<Types.MyStickers, {}>(Stickers.MyStickersQuery);
export const StickerPackQuery = typedQuery<Types.StickerPack, Types.StickerPackVariables>(Stickers.StickerPackQuery);
export const StickerPackAddToCollectionMutation = typedMutation<Types.StickerPackAddToCollection, Types.StickerPackAddToCollectionVariables>(Stickers.StickerPackAddToCollectionMutation);
export const SendStickerMutation = typedMutation<Types.SendSticker, Types.SendStickerVariables>(Stickers.SendStickerMutation);
export const AddStickerCommentMutation = typedMutation<Types.AddStickerComment, Types.AddStickerCommentVariables>(Stickers.AddStickerCommentMutation);
export const PersistEventsMutation = typedMutation<Types.PersistEvents, Types.PersistEventsVariables>(Track.PersistEventsMutation);
export const UsersQuery = typedQuery<Types.Users, Types.UsersVariables>(User.UsersQuery);
export const UserQuery = typedQuery<Types.User, Types.UserVariables>(User.UserQuery);
export const OnlineQuery = typedQuery<Types.Online, Types.OnlineVariables>(User.OnlineQuery);
export const OnlineWatchSubscription = typedSubscription<Types.OnlineWatch, Types.OnlineWatchVariables>(User.OnlineWatchSubscription);
export const ExplorePeopleQuery = typedQuery<Types.ExplorePeople, Types.ExplorePeopleVariables>(User.ExplorePeopleQuery);
export const DeleteUserMutation = typedMutation<Types.DeleteUser, Types.DeleteUserVariables>(User.DeleteUserMutation);
export const BetaNextDiscoverResetMutation = typedMutation<Types.BetaNextDiscoverReset, {}>(User.BetaNextDiscoverResetMutation);
export const MySuccessfulInvitesCountQuery = typedQuery<Types.MySuccessfulInvitesCount, {}>(User.MySuccessfulInvitesCountQuery);
export const AppChatFragment = typedFragment<Types.AppChat>(AppChat.AppChat);
export const AppFullFragment = typedFragment<Types.AppFull>(AppFull.AppFull);
export const CommentEntryFragmentFragment = typedFragment<Types.CommentEntryFragment>(Comment.CommentEntryFragment);
export const CommunitySearchFragment = typedFragment<Types.CommunitySearch>(CommunitySearch.CommunitySearch);
export const ConferenceFullFragment = typedFragment<Types.ConferenceFull>(ConferenceFull.ConferenceFull);
export const ConferenceShortFragment = typedFragment<Types.ConferenceShort>(ConferenceFull.ConferenceShort);
export const FeedChannelFullFragment = typedFragment<Types.FeedChannelFull>(FeedChannelFull.FeedChannelFull);
export const FeedPostAuthorFragmentFragment = typedFragment<Types.FeedPostAuthorFragment>(FeedItemFull.FeedPostAuthorFragment);
export const FeedPostSourceFragmentFragment = typedFragment<Types.FeedPostSourceFragment>(FeedItemFull.FeedPostSourceFragment);
export const SlideFragmentFragment = typedFragment<Types.SlideFragment>(FeedItemFull.SlideFragment);
export const FeedItemFullFragment = typedFragment<Types.FeedItemFull>(FeedItemFull.FeedItemFull);
export const MatchmakingProfileFragmentFragment = typedFragment<Types.MatchmakingProfileFragment>(MatchmakingFragments.MatchmakingProfileFragment);
export const MatchmakingRoomFragmentFragment = typedFragment<Types.MatchmakingRoomFragment>(MatchmakingFragments.MatchmakingRoomFragment);
export const SpanFragmentFragment = typedFragment<Types.SpanFragment>(Message.SpanFragment);
export const DaialogListMessageFragment = typedFragment<Types.DaialogListMessage>(Message.DaialogListMessage);
export const TinyMessageFragment = typedFragment<Types.TinyMessage>(Message.TinyMessage);
export const QuotedMessageFragment = typedFragment<Types.QuotedMessage>(Message.QuotedMessage);
export const FullMessageFragment = typedFragment<Types.FullMessage>(Message.FullMessage);
export const OrganizationFullFragment = typedFragment<Types.OrganizationFull>(OrganizationFull.OrganizationFull);
export const OrganizationMediumFragment = typedFragment<Types.OrganizationMedium>(OrganizationMedium.OrganizationMedium);
export const OrganizationProfileFullFragment = typedFragment<Types.OrganizationProfileFull>(OrganizationProfileFull.OrganizationProfileFull);
export const OrganizationSearchFragment = typedFragment<Types.OrganizationSearch>(OrganizationSearch.OrganizationSearch);
export const OrganizationShortFragment = typedFragment<Types.OrganizationShort>(OrganizationShort.OrganizationShort);
export const OrganizationWithoutMembersFragmentFragment = typedFragment<Types.OrganizationWithoutMembersFragment>(OrganizationWithoutMembersFragment.OrganizationWithoutMembersFragment);
export const RoomFullFragment = typedFragment<Types.RoomFull>(RoomFull.RoomFull);
export const RoomFullWithoutMembersFragment = typedFragment<Types.RoomFullWithoutMembers>(RoomFull.RoomFullWithoutMembers);
export const RoomNanoFragment = typedFragment<Types.RoomNano>(RoomNano.RoomNano);
export const RoomShortFragment = typedFragment<Types.RoomShort>(RoomShort.RoomShort);
export const SessionStateFullFragment = typedFragment<Types.SessionStateFull>(SessionStateFull.SessionStateFull);
export const PlatformNotificationSettingsFullFragment = typedFragment<Types.PlatformNotificationSettingsFull>(SettingsFragment.PlatformNotificationSettingsFull);
export const SettingsFullFragment = typedFragment<Types.SettingsFull>(SettingsFragment.SettingsFull);
export const StickerFragmentFragment = typedFragment<Types.StickerFragment>(StickerFragment.StickerFragment);
export const StickerPackFragmentFragment = typedFragment<Types.StickerPackFragment>(StickerFragment.StickerPackFragment);
export const UserBadgeFragment = typedFragment<Types.UserBadge>(UserBadge.UserBadge);
export const UserForMentionFragment = typedFragment<Types.UserForMention>(UserForMention.UserForMention);
export const UserFullFragment = typedFragment<Types.UserFull>(UserFull.UserFull);
export const UserShortFragment = typedFragment<Types.UserShort>(UserShort.UserShort);
export const UserTinyFragment = typedFragment<Types.UserTiny>(UserTiny.UserTiny);
export const ChatUpdateFragmentFragment = typedFragment<Types.ChatUpdateFragment>(Chats.ChatUpdateFragment);
export const DialogUpdateFragmentFragment = typedFragment<Types.DialogUpdateFragment>(Chats.DialogUpdateFragment);
export const CommentUpdateFragmentFragment = typedFragment<Types.CommentUpdateFragment>(Comments.CommentUpdateFragment);
export const FeedUpdateFragmentFragment = typedFragment<Types.FeedUpdateFragment>(Feed.FeedUpdateFragment);
export const NotificationFragmentFragment = typedFragment<Types.NotificationFragment>(MyNotificationsCenter.NotificationFragment);
export const NotificationCenterUpdateFragmentFragment = typedFragment<Types.NotificationCenterUpdateFragment>(MyNotificationsCenter.NotificationCenterUpdateFragment);
