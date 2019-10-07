package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedItemSelector = obj(
            field("alphaFeedItem","item", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("FeedItem", FeedItemFullSelector)
                ))
        )
val FeedItem = object: OperationDefinition {
    override val name = "FeedItem"
    override val kind = OperationKind.QUERY
    override val body = "query FeedItem(\$id:ID!){item:alphaFeedItem(id:\$id){__typename ...FeedItemFull}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{author{__typename ...FeedPostAuthorFragment}canEdit commentsCount date edited fallback id message reactions{__typename reaction user{__typename ...UserShort}}slides{__typename ...SlideFragment}source{__typename ...FeedPostSourceFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{...UserShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SlideFragment on Slide{__typename ... on TextSlide{attachments{__typename ... on User{...UserShort}... on SharedRoom{id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}... on Organization{...OrganizationShort}}cover{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}coverAlign id spans{__typename ...SpanFragment}text}}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id myRole photo subscribed subscribersCount title}"
    override val selector = FeedItemSelector
}