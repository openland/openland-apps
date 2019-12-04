package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SharedMediaSelector = obj(
            field("chatSharedMedia", "sharedMedia", arguments(fieldValue("after", refValue("after")), fieldValue("chatId", refValue("chatId")), fieldValue("first", refValue("first")), fieldValue("mediaTypes", refValue("mediaTypes"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("cursor", "cursor", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("message", "message", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            inline("GeneralMessage", obj(
                                                field("attachments", "attachments", notNull(list(notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        inline("MessageAttachmentFile", obj(
                                                            field("fallback", "fallback", notNull(scalar("String"))),
                                                            field("fileId", "fileId", notNull(scalar("String"))),
                                                            field("fileMetadata", "fileMetadata", notNull(obj(
                                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                                    field("imageFormat", "imageFormat", scalar("String")),
                                                                    field("imageHeight", "imageHeight", scalar("Int")),
                                                                    field("imageWidth", "imageWidth", scalar("Int")),
                                                                    field("isImage", "isImage", notNull(scalar("Boolean"))),
                                                                    field("mimeType", "mimeType", scalar("String")),
                                                                    field("name", "name", notNull(scalar("String"))),
                                                                    field("size", "size", notNull(scalar("Int")))
                                                                ))),
                                                            field("filePreview", "filePreview", scalar("String")),
                                                            field("id", "id", notNull(scalar("ID")))
                                                        )),
                                                        inline("MessageRichAttachment", obj(
                                                            field("id", "id", notNull(scalar("ID"))),
                                                            field("image", "image", obj(
                                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                                    field("url", "url", notNull(scalar("String")))
                                                                )),
                                                            field("imageFallback", "imageFallback", obj(
                                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                                    field("photo", "photo", notNull(scalar("String")))
                                                                )),
                                                            field("imagePreview", "imagePreview", scalar("String")),
                                                            field("subTitle", "subTitle", scalar("String")),
                                                            field("title", "title", scalar("String")),
                                                            field("titleLink", "titleLink", scalar("String"))
                                                        ))
                                                    ))))),
                                                field("date", "date", notNull(scalar("Date"))),
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("sender", "sender", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("name", "name", notNull(scalar("String")))
                                                    )))
                                            ))
                                        )))
                                )))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("currentPage", "currentPage", notNull(scalar("Int"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean")))
                        )))
                )))
        )
val SharedMedia = object: OperationDefinition {
    override val name = "SharedMedia"
    override val kind = OperationKind.QUERY
    override val body = "query SharedMedia(\$after:String,\$chatId:ID!,\$first:Int!,\$mediaTypes:[SharedMediaType!]!){sharedMedia:chatSharedMedia(after:\$after,chatId:\$chatId,first:\$first,mediaTypes:\$mediaTypes){__typename edges{__typename cursor node{__typename message{__typename ... on GeneralMessage{attachments{__typename ... on MessageAttachmentFile{fallback fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{id image{__typename url}imageFallback{__typename photo}imagePreview subTitle title titleLink}}date id sender{__typename id name}}}}}pageInfo{__typename currentPage hasNextPage}}}"
    override val selector = SharedMediaSelector
}