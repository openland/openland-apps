package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedCreatePostSelector = obj(
            field("alphaCreateFeedPost", "post", arguments(fieldValue("channel", refValue("channel")), fieldValue("slides", refValue("slides")), fieldValue("repeatKey", refValue("repeatKey"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("FeedItem", FeedItemFullSelector)
                )))
        )
val FeedCreatePost = object: OperationDefinition {
    override val name = "FeedCreatePost"
    override val kind = OperationKind.MUTATION
    override val body = "mutation FeedCreatePost(\$channel:ID!,\$slides:[SlideInput!]!,\$repeatKey:String){post:alphaCreateFeedPost(channel:\$channel,slides:\$slides,repeatKey:\$repeatKey){__typename ...FeedItemFull}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{__typename id date author{__typename ...FeedPostAuthorFragment}source{__typename ...FeedPostSourceFragment}edited canEdit commentsCount message fallback reactions{__typename user{__typename ...UserShort}reaction}slides{__typename ...SlideFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{__typename ...UserShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}fragment SlideFragment on Slide{__typename ... on TextSlide{__typename id text spans{__typename ...SpanFragment}cover{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}coverAlign attachments{__typename ... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title roomPhoto:photo membersCount membership canSendMessage organization{__typename id name photo}}... on Organization{__typename ...OrganizationShort}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel title roomPhoto:photo membersCount settings{__typename id mute}}"
    override val selector = FeedCreatePostSelector
}