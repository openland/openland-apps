package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val PicSharedMediaSelector = obj(
            field("chatSharedMedia", "chatSharedMedia", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("mediaTypes", listValue(stringValue("IMAGE"))), fieldValue("first", refValue("first")), fieldValue("after", refValue("after")), fieldValue("before", refValue("before")), fieldValue("around", refValue("around"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage", "hasPreviousPage", notNull(scalar("Boolean"))),
                            field("currentPage", "currentPage", notNull(scalar("Int"))),
                            field("pagesCount", "pagesCount", notNull(scalar("Int"))),
                            field("itemsCount", "itemsCount", notNull(scalar("Int")))
                        ))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("cursor", "cursor", notNull(scalar("String"))),
                            field("index", "index", notNull(scalar("Int"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("message", "message", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            inline("GeneralMessage", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("id", "id", notNull(scalar("ID"))),
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
                                                        ))
                                                    )))))
                                            ))
                                        )))
                                )))
                        )))))
                )))
        )
val PicSharedMedia = object: OperationDefinition {
    override val name = "PicSharedMedia"
    override val kind = OperationKind.QUERY
    override val body = "query PicSharedMedia(\$chatId:ID!,\$first:Int!,\$after:ID,\$before:ID,\$around:ID){chatSharedMedia(chatId:\$chatId,mediaTypes:[IMAGE],first:\$first,after:\$after,before:\$before,around:\$around){__typename pageInfo{__typename hasNextPage hasPreviousPage currentPage pagesCount itemsCount}edges{__typename cursor index node{__typename message{__typename ... on GeneralMessage{__typename id date sender{__typename id name}attachments{__typename ... on MessageAttachmentFile{__typename id fileMetadata{__typename name isImage imageFormat mimeType imageWidth imageHeight size}filePreview fileId fallback}}}}}}}}"
    override val selector = PicSharedMediaSelector
}