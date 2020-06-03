package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val PostPublishSelector = obj(
            field("postDraftPublish", "postDraftPublish", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Post", PostSimpleSelector)
                )))
        )
val PostPublish = object: OperationDefinition {
    override val name = "PostPublish"
    override val kind = OperationKind.MUTATION
    override val body = "mutation PostPublish(\$id:ID!){postDraftPublish(id:\$id){__typename ...PostSimple}}fragment PostSimple on Post{__typename id title content{__typename ...ParagraphSimple}channel{__typename id title shortname}author{__typename id name}draft{__typename id}canEdit createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}"
    override val selector = PostPublishSelector
}