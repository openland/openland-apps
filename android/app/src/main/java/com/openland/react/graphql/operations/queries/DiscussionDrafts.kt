package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscussionDraftsSelector = obj(
            field("discussionMyDrafts", "discussionMyDrafts", arguments(fieldValue("first", intValue(20)), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Discussion", DiscussionSimpleSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val DiscussionDrafts = object: OperationDefinition {
    override val name = "DiscussionDrafts"
    override val kind = OperationKind.QUERY
    override val body = "query DiscussionDrafts(\$after:String){discussionMyDrafts(first:20,after:\$after){__typename items{__typename ...DiscussionSimple}cursor}}fragment DiscussionSimple on Discussion{__typename id title content{__typename ...ParagraphSimple}hub{__typename ...HubSimple}author{__typename id name}createdAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text}... on ImageParagraph{__typename image{__typename uuid}}}fragment HubSimple on Hub{__typename id title shortname type owner{__typename id firstName lastName}}"
    override val selector = DiscussionDraftsSelector
}