package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyNotificationsCenterSelector = obj(
            field("notificationCenterUpdates", "event", arguments(fieldValue("fromState", refValue("state"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("NotificationCenterUpdateSingle", obj(
                        field("seq", "seq", notNull(scalar("Int"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("update", "update", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("NotificationCenterUpdate", NotificationCenterUpdateFragmentSelector)
                            )))
                    )),
                    inline("NotificationCenterUpdateBatch", obj(
                        field("fromSeq", "fromSeq", notNull(scalar("Int"))),
                        field("seq", "seq", notNull(scalar("Int"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("updates", "updates", notNull(list(notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("NotificationCenterUpdate", NotificationCenterUpdateFragmentSelector)
                            )))))
                    ))
                ))
        )
val MyNotificationsCenter = object: OperationDefinition {
    override val name = "MyNotificationsCenter"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription MyNotificationsCenter(\$state:String){event:notificationCenterUpdates(fromState:\$state){__typename ... on NotificationCenterUpdateSingle{seq state update{__typename ...NotificationCenterUpdateFragment}}... on NotificationCenterUpdateBatch{fromSeq seq state updates{__typename ...NotificationCenterUpdateFragment}}}}fragment NotificationCenterUpdateFragment on NotificationCenterUpdate{__typename ... on NotificationReceived{center{__typename id unread}notification{__typename ...NotificationFragment}}... on NotificationUpdated{center{__typename id unread}notification{__typename ...NotificationFragment}}... on NotificationDeleted{center{__typename id unread}notification{__typename id}}... on NotificationRead{center{__typename id unread}}... on NotificationContentUpdated{content{__typename ... on UpdatedNotificationContentComment{comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{chat{__typename ...RoomNano}message{__typename ... on GeneralMessage{fallback id message sender{__typename id name}senderBadge{__typename ...UserBadge}}}}... on CommentPeerRootFeedItem{item{__typename ...FeedItemFull}}}subscription{__typename type}}}}}}fragment NotificationFragment on Notification{__typename content{__typename ... on NewCommentNotification{comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{chat{__typename ...RoomNano}message{__typename ... on GeneralMessage{fallback id message sender{__typename id name}senderBadge{__typename ...UserBadge}}}}... on CommentPeerRootFeedItem{item{__typename ...FeedItemFull}}}subscription{__typename type}}}... on NewMatchmakingProfilesNotification{profiles{__typename ...MatchmakingProfileFragment}room{__typename peer{__typename ... on SharedRoom{...RoomNano}}}}}id text}fragment CommentEntryFragment on CommentEntry{__typename comment:betaComment{__typename id ...FullMessage}childComments{__typename id}deleted id parentComment{__typename comment:betaComment{__typename id message}id}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{author{__typename ...FeedPostAuthorFragment}canEdit commentsCount date edited fallback id message reactions{__typename reaction user{__typename ...UserShort}}slides{__typename ...SlideFragment}source{__typename ...FeedPostSourceFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{...UserShort}}fragment SlideFragment on Slide{__typename ... on TextSlide{attachments{__typename ... on User{...UserShort}... on SharedRoom{canSendMessage id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}... on Organization{...OrganizationShort}}cover{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}coverAlign id spans{__typename ...SpanFragment}text}}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo postsCount shortname socialImage subscribed subscribersCount title}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}"
    override val selector = MyNotificationsCenterSelector
}