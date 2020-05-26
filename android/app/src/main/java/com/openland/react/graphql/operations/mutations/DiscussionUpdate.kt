package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscussionUpdateSelector = obj(
            field("discussionUpdate", "discussionUpdate", arguments(fieldValue("id", refValue("id")), fieldValue("input", objectValue(fieldValue("title", refValue("title"))))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Discussion", DiscussionSimpleSelector)
                )))
        )
val DiscussionUpdate = object: OperationDefinition {
    override val name = "DiscussionUpdate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation DiscussionUpdate(\$id:ID!,\$title:String!){discussionUpdate(id:\$id,input:{title:\$title}){__typename ...DiscussionSimple}}fragment DiscussionSimple on Discussion{__typename id title content{__typename ...ParagraphSimple}hub{__typename ...HubSimple}author{__typename id name}createdAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text}... on ImageParagraph{__typename image{__typename uuid}}}fragment HubSimple on Hub{__typename id title shortname type owner{__typename id firstName lastName}}"
    override val selector = DiscussionUpdateSelector
}