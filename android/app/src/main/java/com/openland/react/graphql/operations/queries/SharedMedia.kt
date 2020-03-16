package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SharedMediaSelector = obj(
            field("chatSharedMedia", "sharedMedia", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("mediaTypes", refValue("mediaTypes")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean"))),
                            field("currentPage", "currentPage", notNull(scalar("Int")))
                        ))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("message", "message", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            inline("GeneralMessage", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("fallback", "fallback", notNull(scalar("String"))),
                                                field("date", "date", notNull(scalar("Date"))),
                                                field("sender", "sender", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("name", "name", notNull(scalar("String")))
                                                    ))),
                                                field("attachments", "attachments", notNull(list(notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        inline("MessageAttachmentFile", obj(
                                                            field("__typename", "__typename", notNull(scalar("String"))),
                                                            field("id", "id", notNull(scalar("ID"))),
                                                            field("fileMetadata", "fileMetadata", notNull(obj(
                                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                                    field("name", "name", notNull(scalar("String"))),
                                                                    field("isImage", "isImage", notNull(scalar("Boolean"))),
                                                                    field("imageFormat", "imageFormat", scalar("String")),
                                                                    field("mimeType", "mimeType", scalar("String")),
                                                                    field("imageWidth", "imageWidth", scalar("Int")),
                                                                    field("imageHeight", "imageHeight", scalar("Int")),
                                                                    field("size", "size", notNull(scalar("Int")))
                                                                ))),
                                                            field("filePreview", "filePreview", scalar("String")),
                                                            field("fileId", "fileId", notNull(scalar("String"))),
                                                            field("fallback", "fallback", notNull(scalar("String")))
                                                        )),
                                                        inline("MessageRichAttachment", obj(
                                                            field("__typename", "__typename", notNull(scalar("String"))),
                                                            field("id", "id", notNull(scalar("ID"))),
                                                            field("title", "title", scalar("String")),
                                                            field("text", "text", scalar("String")),
                                                            field("titleLink", "titleLink", scalar("String")),
                                                            field("imagePreview", "imagePreview", scalar("String")),
                                                            field("image", "image", obj(
                                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                                    field("url", "url", notNull(scalar("String")))
                                                                )),
                                                            field("imageFallback", "imageFallback", obj(
                                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                                    field("photo", "photo", notNull(scalar("String")))
                                                                )),
                                                            field("keyboard", "keyboard", obj(
                                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                                    field("buttons", "buttons", notNull(list(list(notNull(obj(
                                                                            field("__typename", "__typename", notNull(scalar("String"))),
                                                                            field("id", "id", notNull(scalar("ID"))),
                                                                            field("title", "title", notNull(scalar("String"))),
                                                                            field("url", "url", scalar("String"))
                                                                        ))))))
                                                                ))
                                                        ))
                                                    )))))
                                            ))
                                        )))
                                ))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        )))))
                )))
        )
val SharedMedia = object: OperationDefinition {
    override val name = "SharedMedia"
    override val kind = OperationKind.QUERY
    override val body = "query SharedMedia(\$chatId:ID!,\$mediaTypes:[SharedMediaType!]!,\$first:Int!,\$after:ID){sharedMedia:chatSharedMedia(chatId:\$chatId,mediaTypes:\$mediaTypes,first:\$first,after:\$after){__typename pageInfo{__typename hasNextPage currentPage}edges{__typename node{__typename message{__typename ... on GeneralMessage{__typename id fallback date sender{__typename id name}attachments{__typename ... on MessageAttachmentFile{__typename id fileMetadata{__typename name isImage imageFormat mimeType imageWidth imageHeight size}filePreview fileId fallback}... on MessageRichAttachment{__typename id title text titleLink imagePreview image{__typename url}imageFallback{__typename photo}keyboard{__typename buttons{__typename id title url}}}}}}}cursor}}}"
    override val selector = SharedMediaSelector
}