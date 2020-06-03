package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyPostDraftsSelector = obj(
            field("postMyDrafts", "postMyDrafts", arguments(fieldValue("first", intValue(20)), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("PostDraft", PostDraftSimpleSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val MyPostDrafts = object: OperationDefinition {
    override val name = "MyPostDrafts"
    override val kind = OperationKind.QUERY
    override val body = "query MyPostDrafts(\$after:String){postMyDrafts(first:20,after:\$after){__typename items{__typename ...PostDraftSimple}cursor}}fragment PostDraftSimple on PostDraft{__typename id title content{__typename ...ParagraphSimple}publishedCopy{__typename id}channel{__typename id title shortname}createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}"
    override val selector = MyPostDraftsSelector
}