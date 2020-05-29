package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscussionCreateDraftSelector = obj(
            field("discussionCreate", "discussionCreate", arguments(fieldValue("isDraft", boolValue(true)), fieldValue("input", objectValue())), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Discussion", DiscussionSimpleSelector)
                )))
        )
val DiscussionCreateDraft = object: OperationDefinition {
    override val name = "DiscussionCreateDraft"
    override val kind = OperationKind.MUTATION
    override val body = "mutation DiscussionCreateDraft{discussionCreate(isDraft:true,input:{}){__typename ...DiscussionSimple}}fragment DiscussionSimple on Discussion{__typename id title content{__typename ...ParagraphSimple}hub{__typename ...HubSimple}author{__typename id name}createdAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ...SpanFragment}}... on ImageParagraph{__typename image{__typename uuid}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment HubSimple on Hub{__typename id title shortname type owner{__typename id firstName lastName}}"
    override val selector = DiscussionCreateDraftSelector
}