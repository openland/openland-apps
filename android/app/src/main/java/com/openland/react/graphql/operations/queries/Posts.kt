package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val PostsSelector = obj(
            field("posts", "posts", arguments(fieldValue("hubs", refValue("channels")), fieldValue("first", intValue(20)), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Post", PostSimpleSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val Posts = object: OperationDefinition {
    override val name = "Posts"
    override val kind = OperationKind.QUERY
    override val body = "query Posts(\$channels:[ID!]!,\$after:String){posts(hubs:\$channels,first:20,after:\$after){__typename items{__typename ...PostSimple}cursor}}fragment PostSimple on Post{__typename id title content{__typename ...ParagraphSimple}channel{__typename id title shortname}author{__typename id name}draft{__typename id}canEdit createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}"
    override val selector = PostsSelector
}