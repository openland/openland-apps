package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedChannelContentSelector = obj(
            field("alphaFeedChannelContent", "content", arguments(fieldValue("after", refValue("after")), fieldValue("first", refValue("first")), fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("cursor", "cursor", scalar("String")),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("FeedItem", FeedItemFullSelector)
                        )))))
                )))
        )
val FeedChannelContent = object: OperationDefinition {
    override val name = "FeedChannelContent"
    override val kind = OperationKind.QUERY
    override val body = "query FeedChannelContent(\$after:String,\$first:Int!,\$id:ID!){content:alphaFeedChannelContent(after:\$after,first:\$first,id:\$id){__typename cursor items{__typename ...FeedItemFull}}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{author{__typename ...FeedPostAuthorFragment}canEdit commentsCount date edited fallback id message reactions{__typename reaction user{__typename ...UserShort}}slides{__typename ...SlideFragment}source{__typename ...FeedPostSourceFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{...UserShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SlideFragment on Slide{__typename ... on TextSlide{attachments{__typename ... on User{...UserShort}... on SharedRoom{canSendMessage id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}... on Organization{...OrganizationShort}}cover{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}coverAlign id spans{__typename ...SpanFragment}text}}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id roomPhoto:photo title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo postsCount shortname socialImage subscribed subscribersCount title}"
    override val selector = FeedChannelContentSelector
}