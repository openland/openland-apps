package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscussionSelector = obj(
            field("discussion", "discussion", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Discussion", DiscussionSimpleSelector)
                ))
        )
val Discussion = object: OperationDefinition {
    override val name = "Discussion"
    override val kind = OperationKind.QUERY
    override val body = "query Discussion(\$id:ID!){discussion(id:\$id){__typename ...DiscussionSimple}}fragment DiscussionSimple on Discussion{__typename id title content{__typename ...ParagraphSimple}hub{__typename ...HubSimple}author{__typename id name}createdAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text}... on ImageParagraph{__typename image{__typename uuid}}}fragment HubSimple on Hub{__typename id title shortname type owner{__typename id firstName lastName}}"
    override val selector = DiscussionSelector
}