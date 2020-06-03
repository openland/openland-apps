package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val PostCreateDraftSelector = obj(
            field("postDraftCreate", "postDraftCreate", arguments(fieldValue("input", objectValue())), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("PostDraft", PostDraftSimpleSelector)
                )))
        )
val PostCreateDraft = object: OperationDefinition {
    override val name = "PostCreateDraft"
    override val kind = OperationKind.MUTATION
    override val body = "mutation PostCreateDraft{postDraftCreate(input:{}){__typename ...PostDraftSimple}}fragment PostDraftSimple on PostDraft{__typename id title content{__typename ...ParagraphSimple}publishedCopy{__typename id}channel{__typename id title shortname}createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}"
    override val selector = PostCreateDraftSelector
}