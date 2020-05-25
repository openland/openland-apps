package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*


object Operations {
    fun operationByName(name: String): OperationDefinition {
        if (name == "Account") return Account
        if (name == "AccountAppInvite") return AccountAppInvite
        if (name == "AccountAppInviteInfo") return AccountAppInviteInfo
        if (name == "AccountInviteInfo") return AccountInviteInfo
        if (name == "AccountSettings") return AccountSettings
        if (name == "AuthResolveShortName") return AuthResolveShortName
        if (name == "ChatInit") return ChatInit
        if (name == "ChatInitFromUnread") return ChatInitFromUnread
        if (name == "ChatJoin") return ChatJoin
        if (name == "ChatMentionSearch") return ChatMentionSearch
        if (name == "Comments") return Comments
        if (name == "Conference") return Conference
        if (name == "ConferenceMedia") return ConferenceMedia
        if (name == "DebugGqlTrace") return DebugGqlTrace
        if (name == "DebugGqlTraces") return DebugGqlTraces
        if (name == "Dialogs") return Dialogs
        if (name == "DiscoverCollection") return DiscoverCollection
        if (name == "DiscoverCollectionShort") return DiscoverCollectionShort
        if (name == "DiscoverCollections") return DiscoverCollections
        if (name == "DiscoverCollectionsShort") return DiscoverCollectionsShort
        if (name == "DiscoverEditorsChoice") return DiscoverEditorsChoice
        if (name == "DiscoverIsDone") return DiscoverIsDone
        if (name == "DiscoverNewAndGrowing") return DiscoverNewAndGrowing
        if (name == "DiscoverNextPage") return DiscoverNextPage
        if (name == "DiscoverNoAuth") return DiscoverNoAuth
        if (name == "DiscoverPopularNow") return DiscoverPopularNow
        if (name == "DiscoverState") return DiscoverState
        if (name == "DiscoverSuggestedRooms") return DiscoverSuggestedRooms
        if (name == "DiscoverTopFree") return DiscoverTopFree
        if (name == "DiscoverTopPremium") return DiscoverTopPremium
        if (name == "ExplorePeople") return ExplorePeople
        if (name == "ExploreRooms") return ExploreRooms
        if (name == "FeatureFlags") return FeatureFlags
        if (name == "FeedChannel") return FeedChannel
        if (name == "FeedChannelContent") return FeedChannelContent
        if (name == "FeedChannelSubscribers") return FeedChannelSubscribers
        if (name == "FeedChannelWriters") return FeedChannelWriters
        if (name == "FeedChannelsSearch") return FeedChannelsSearch
        if (name == "FeedItem") return FeedItem
        if (name == "FeedLoadMore") return FeedLoadMore
        if (name == "FeedRecommendedChannels") return FeedRecommendedChannels
        if (name == "FeedSubscriptions") return FeedSubscriptions
        if (name == "FeedWritableChannels") return FeedWritableChannels
        if (name == "FetchPushSettings") return FetchPushSettings
        if (name == "GlobalCounter") return GlobalCounter
        if (name == "GlobalSearch") return GlobalSearch
        if (name == "Hub") return Hub
        if (name == "Hubs") return Hubs
        if (name == "InitFeed") return InitFeed
        if (name == "Message") return Message
        if (name == "MessagesBatch") return MessagesBatch
        if (name == "MessagesSearch") return MessagesSearch
        if (name == "MyApps") return MyApps
        if (name == "MyCards") return MyCards
        if (name == "MyNotificationCenter") return MyNotificationCenter
        if (name == "MyNotifications") return MyNotifications
        if (name == "MyOrganizations") return MyOrganizations
        if (name == "MyStickers") return MyStickers
        if (name == "MySuccessfulInvitesCount") return MySuccessfulInvitesCount
        if (name == "MyWallet") return MyWallet
        if (name == "OauthContext") return OauthContext
        if (name == "Online") return Online
        if (name == "Organization") return Organization
        if (name == "OrganizationMembers") return OrganizationMembers
        if (name == "OrganizationMembersShort") return OrganizationMembersShort
        if (name == "OrganizationProfile") return OrganizationProfile
        if (name == "OrganizationPublicInvite") return OrganizationPublicInvite
        if (name == "OrganizationPublicRooms") return OrganizationPublicRooms
        if (name == "Permissions") return Permissions
        if (name == "PicSharedMedia") return PicSharedMedia
        if (name == "Profile") return Profile
        if (name == "ProfilePrefill") return ProfilePrefill
        if (name == "ResolveShortName") return ResolveShortName
        if (name == "ResolvedInvite") return ResolvedInvite
        if (name == "RoomAdminMembers") return RoomAdminMembers
        if (name == "RoomChat") return RoomChat
        if (name == "RoomFeaturedMembers") return RoomFeaturedMembers
        if (name == "RoomInviteInfo") return RoomInviteInfo
        if (name == "RoomInviteLink") return RoomInviteLink
        if (name == "RoomMembersPaginated") return RoomMembersPaginated
        if (name == "RoomMembersShort") return RoomMembersShort
        if (name == "RoomMembersTiny") return RoomMembersTiny
        if (name == "RoomMetaPreview") return RoomMetaPreview
        if (name == "RoomPico") return RoomPico
        if (name == "RoomSearch") return RoomSearch
        if (name == "RoomSocialImage") return RoomSocialImage
        if (name == "RoomTiny") return RoomTiny
        if (name == "Settings") return Settings
        if (name == "SharedMedia") return SharedMedia
        if (name == "SharedMediaCounters") return SharedMediaCounters
        if (name == "StickerPack") return StickerPack
        if (name == "StickerPackCatalog") return StickerPackCatalog
        if (name == "StripeToken") return StripeToken
        if (name == "Subscriptions") return Subscriptions
        if (name == "SuggestedRooms") return SuggestedRooms
        if (name == "SuperAccount") return SuperAccount
        if (name == "SuperAccounts") return SuperAccounts
        if (name == "SuperAdmins") return SuperAdmins
        if (name == "SuperBadgeInRoom") return SuperBadgeInRoom
        if (name == "TransactionsHistory") return TransactionsHistory
        if (name == "User") return User
        if (name == "UserAvailableRooms") return UserAvailableRooms
        if (name == "UserPico") return UserPico
        if (name == "UserStorage") return UserStorage
        if (name == "Users") return Users
        if (name == "AccountInviteJoin") return AccountInviteJoin
        if (name == "AddAppToChat") return AddAppToChat
        if (name == "AddComment") return AddComment
        if (name == "AddStickerComment") return AddStickerComment
        if (name == "BetaDiscoverSkip") return BetaDiscoverSkip
        if (name == "BetaNextDiscoverReset") return BetaNextDiscoverReset
        if (name == "BetaSubmitNextDiscover") return BetaSubmitNextDiscover
        if (name == "BuyPremiumChatPass") return BuyPremiumChatPass
        if (name == "BuyPremiumChatSubscription") return BuyPremiumChatSubscription
        if (name == "CancelSubscription") return CancelSubscription
        if (name == "CommentSetReaction") return CommentSetReaction
        if (name == "CommentUnsetReaction") return CommentUnsetReaction
        if (name == "CommitCardSetupIntent") return CommitCardSetupIntent
        if (name == "ConferenceJoin") return ConferenceJoin
        if (name == "ConferenceKeepAlive") return ConferenceKeepAlive
        if (name == "ConferenceLeave") return ConferenceLeave
        if (name == "CreateApp") return CreateApp
        if (name == "CreateCardSetupIntent") return CreateCardSetupIntent
        if (name == "CreateDepositIntent") return CreateDepositIntent
        if (name == "CreateOrganization") return CreateOrganization
        if (name == "DebugMails") return DebugMails
        if (name == "DeleteComment") return DeleteComment
        if (name == "DeleteNotification") return DeleteNotification
        if (name == "DeleteOrganization") return DeleteOrganization
        if (name == "DeleteUser") return DeleteUser
        if (name == "DiscoverCollectionSetShortname") return DiscoverCollectionSetShortname
        if (name == "DiscoverCollectionsCreate") return DiscoverCollectionsCreate
        if (name == "DiscoverCollectionsDelete") return DiscoverCollectionsDelete
        if (name == "DiscoverCollectionsUpdate") return DiscoverCollectionsUpdate
        if (name == "DiscoverEditorsChoiceCreate") return DiscoverEditorsChoiceCreate
        if (name == "DiscoverEditorsChoiceDelete") return DiscoverEditorsChoiceDelete
        if (name == "DiscoverEditorsChoiceUpdate") return DiscoverEditorsChoiceUpdate
        if (name == "EditComment") return EditComment
        if (name == "EditMessage") return EditMessage
        if (name == "FeatureFlagAdd") return FeatureFlagAdd
        if (name == "FeatureFlagDisable") return FeatureFlagDisable
        if (name == "FeatureFlagEnable") return FeatureFlagEnable
        if (name == "FeedChannelAddWriter") return FeedChannelAddWriter
        if (name == "FeedChannelCreate") return FeedChannelCreate
        if (name == "FeedChannelRemoveWriter") return FeedChannelRemoveWriter
        if (name == "FeedChannelSubscribe") return FeedChannelSubscribe
        if (name == "FeedChannelUnsubscribe") return FeedChannelUnsubscribe
        if (name == "FeedChannelUpdate") return FeedChannelUpdate
        if (name == "FeedCreatePost") return FeedCreatePost
        if (name == "FeedDeletePost") return FeedDeletePost
        if (name == "FeedEditPost") return FeedEditPost
        if (name == "FeedReactionAdd") return FeedReactionAdd
        if (name == "FeedReactionRemove") return FeedReactionRemove
        if (name == "GlobalEventBusPublish") return GlobalEventBusPublish
        if (name == "MakeCardDefault") return MakeCardDefault
        if (name == "MarkSequenceRead") return MarkSequenceRead
        if (name == "MediaAnswer") return MediaAnswer
        if (name == "MediaCandidate") return MediaCandidate
        if (name == "MediaFailed") return MediaFailed
        if (name == "MediaOffer") return MediaOffer
        if (name == "MessageSetDonationReaction") return MessageSetDonationReaction
        if (name == "MessageSetReaction") return MessageSetReaction
        if (name == "MessageUnsetReaction") return MessageUnsetReaction
        if (name == "MyNotificationCenterMarkSeqRead") return MyNotificationCenterMarkSeqRead
        if (name == "OrganizationActivateByInvite") return OrganizationActivateByInvite
        if (name == "OrganizationAddMember") return OrganizationAddMember
        if (name == "OrganizationChangeMemberRole") return OrganizationChangeMemberRole
        if (name == "OrganizationCreatePublicInvite") return OrganizationCreatePublicInvite
        if (name == "OrganizationMemberRemove") return OrganizationMemberRemove
        if (name == "PaymentIntentCancel") return PaymentIntentCancel
        if (name == "PaymentIntentCommit") return PaymentIntentCommit
        if (name == "PersistEvents") return PersistEvents
        if (name == "PinMessage") return PinMessage
        if (name == "ProfileCreate") return ProfileCreate
        if (name == "ProfileUpdate") return ProfileUpdate
        if (name == "ReadNotification") return ReadNotification
        if (name == "RefreshAppToken") return RefreshAppToken
        if (name == "RegisterPush") return RegisterPush
        if (name == "RegisterWebPush") return RegisterWebPush
        if (name == "RemoveCard") return RemoveCard
        if (name == "ReportContent") return ReportContent
        if (name == "ReportOnline") return ReportOnline
        if (name == "RoomAddMembers") return RoomAddMembers
        if (name == "RoomChangeRole") return RoomChangeRole
        if (name == "RoomCreate") return RoomCreate
        if (name == "RoomDeleteMessage") return RoomDeleteMessage
        if (name == "RoomDeleteMessages") return RoomDeleteMessages
        if (name == "RoomDeleteUrlAugmentation") return RoomDeleteUrlAugmentation
        if (name == "RoomJoin") return RoomJoin
        if (name == "RoomJoinInviteLink") return RoomJoinInviteLink
        if (name == "RoomKick") return RoomKick
        if (name == "RoomLeave") return RoomLeave
        if (name == "RoomRead") return RoomRead
        if (name == "RoomRenewInviteLink") return RoomRenewInviteLink
        if (name == "RoomSettingsUpdate") return RoomSettingsUpdate
        if (name == "RoomUpdate") return RoomUpdate
        if (name == "RoomsInviteUser") return RoomsInviteUser
        if (name == "RoomsJoin") return RoomsJoin
        if (name == "SendDonation") return SendDonation
        if (name == "SendMessage") return SendMessage
        if (name == "SendSticker") return SendSticker
        if (name == "SetFeedChannelShortname") return SetFeedChannelShortname
        if (name == "SetOrgShortname") return SetOrgShortname
        if (name == "SetRoomShortname") return SetRoomShortname
        if (name == "SetTyping") return SetTyping
        if (name == "SetUserShortname") return SetUserShortname
        if (name == "SettingsUpdate") return SettingsUpdate
        if (name == "StickerPackAddToCollection") return StickerPackAddToCollection
        if (name == "StickerPackRemoveFromCollection") return StickerPackRemoveFromCollection
        if (name == "SubscribeToComments") return SubscribeToComments
        if (name == "SuperAccountActivate") return SuperAccountActivate
        if (name == "SuperAccountAdd") return SuperAccountAdd
        if (name == "SuperAccountMemberAdd") return SuperAccountMemberAdd
        if (name == "SuperAccountMemberRemove") return SuperAccountMemberRemove
        if (name == "SuperAccountPend") return SuperAccountPend
        if (name == "SuperAccountRename") return SuperAccountRename
        if (name == "SuperAccountSuspend") return SuperAccountSuspend
        if (name == "SuperAdminAdd") return SuperAdminAdd
        if (name == "SuperAdminRemove") return SuperAdminRemove
        if (name == "SuperBadgeCreateToRoom") return SuperBadgeCreateToRoom
        if (name == "SuperBadgeUnsetToRoom") return SuperBadgeUnsetToRoom
        if (name == "UnSubscribeFromComments") return UnSubscribeFromComments
        if (name == "UnpinMessage") return UnpinMessage
        if (name == "UnsetTyping") return UnsetTyping
        if (name == "UpdateApp") return UpdateApp
        if (name == "UpdateOrganization") return UpdateOrganization
        if (name == "UpdateWelcomeMessage") return UpdateWelcomeMessage
        if (name == "UserStorageSet") return UserStorageSet
        if (name == "conferenceAddScreenShare") return conferenceAddScreenShare
        if (name == "conferenceAlterMediaState") return conferenceAlterMediaState
        if (name == "conferenceRemoveScreenShare") return conferenceRemoveScreenShare
        if (name == "conferenceRequestLocalMediaChange") return conferenceRequestLocalMediaChange
        if (name == "ChatOnlinesCountWatch") return ChatOnlinesCountWatch
        if (name == "ChatWatch") return ChatWatch
        if (name == "CommentWatch") return CommentWatch
        if (name == "ConferenceMediaWatch") return ConferenceMediaWatch
        if (name == "ConferenceWatch") return ConferenceWatch
        if (name == "DebugEventsWatch") return DebugEventsWatch
        if (name == "DialogsWatch") return DialogsWatch
        if (name == "FeedUpdates") return FeedUpdates
        if (name == "GlobalEventBus") return GlobalEventBus
        if (name == "MyNotificationsCenter") return MyNotificationsCenter
        if (name == "OnlineWatch") return OnlineWatch
        if (name == "SettingsWatch") return SettingsWatch
        if (name == "TypingsWatch") return TypingsWatch
        if (name == "WalletUpdates") return WalletUpdates
        error("Unknown operation: $name")
    }
}