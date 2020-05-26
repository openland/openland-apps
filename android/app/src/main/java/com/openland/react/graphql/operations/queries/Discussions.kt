package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscussionsSelector = obj(
            field("discussions", "discussions", arguments(fieldValue("hubs", refValue("hubs")), fieldValue("first", intValue(20)), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Discussion", DiscussionSimpleSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val Discussions = object: OperationDefinition {
    override val name = "Discussions"
    override val kind = OperationKind.QUERY
    override val body = "query Discussions(\$hubs:[ID!]!,\$after:String){discussions(hubs:\$hubs,first:20,after:\$after){__typename items{__typename ...DiscussionSimple}cursor}}fragment DiscussionSimple on Discussion{__typename id title content{__typename ...ParagraphSimple}hub{__typename ...HubSimple}author{__typename id name}createdAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text}... on ImageParagraph{__typename image{__typename uuid}}}fragment HubSimple on Hub{__typename id title shortname type owner{__typename id firstName lastName}}"
    override val selector = DiscussionsSelector
}