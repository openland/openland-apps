package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MessagesSearchSelector = obj(
            field("messagesSearch", "messagesSearch", arguments(fieldValue("query", refValue("query")), fieldValue("sort", refValue("sort")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("chat", "chat", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            inline("PrivateRoom", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("user", "user", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("name", "name", notNull(scalar("String"))),
                                                        field("photo", "photo", scalar("String"))
                                                    ))),
                                                field("settings", "settings", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("mute", "mute", scalar("Boolean"))
                                                    )))
                                            )),
                                            inline("SharedRoom", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("kind", "kind", notNull(scalar("String"))),
                                                field("title", "title", notNull(scalar("String"))),
                                                field("membership", "membership", notNull(scalar("String"))),
                                                field("isChannel", "isChannel", notNull(scalar("Boolean"))),
                                                field("role", "role", notNull(scalar("String"))),
                                                field("canEdit", "canEdit", notNull(scalar("Boolean"))),
                                                field("photo", "photo", notNull(scalar("String"))),
                                                field("settings", "settings", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("mute", "mute", scalar("Boolean"))
                                                    )))
                                            ))
                                        ))),
                                    field("message", "message", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("id", "id", notNull(scalar("ID"))),
                                            field("date", "date", notNull(scalar("Date"))),
                                            field("sender", "sender", notNull(obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    field("id", "id", notNull(scalar("ID"))),
                                                    field("name", "name", notNull(scalar("String"))),
                                                    field("firstName", "firstName", notNull(scalar("String"))),
                                                    field("photo", "photo", scalar("String"))
                                                ))),
                                            field("senderBadge", "senderBadge", obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    fragment("UserBadge", UserBadgeSelector)
                                                )),
                                            field("message", "message", scalar("String")),
                                            field("fallback", "fallback", notNull(scalar("String"))),
                                            inline("GeneralMessage", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("attachments", "attachments", notNull(list(notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("fallback", "fallback", notNull(scalar("String"))),
                                                        inline("MessageAttachmentFile", obj(
                                                            field("__typename", "__typename", notNull(scalar("String"))),
                                                            field("id", "id", notNull(scalar("ID"))),
                                                            field("fileId", "fileId", notNull(scalar("String"))),
                                                            field("fileMetadata", "fileMetadata", notNull(obj(
                                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                                    field("isImage", "isImage", notNull(scalar("Boolean"))),
                                                                    field("imageFormat", "imageFormat", scalar("String"))
                                                                )))
                                                        ))
                                                    ))))),
                                                field("quotedMessages", "quotedMessages", notNull(list(notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID")))
                                                    )))))
                                            ))
                                        )))
                                ))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage", "hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount", "itemsCount", notNull(scalar("Int"))),
                            field("currentPage", "currentPage", notNull(scalar("Int"))),
                            field("pagesCount", "pagesCount", notNull(scalar("Int"))),
                            field("openEnded", "openEnded", notNull(scalar("Boolean")))
                        )))
                )))
        )
val MessagesSearch = object: OperationDefinition {
    override val name = "MessagesSearch"
    override val kind = OperationKind.QUERY
    override val body = "query MessagesSearch(\$query:String!,\$sort:String,\$first:Int!,\$after:String){messagesSearch(query:\$query,sort:\$sort,first:\$first,after:\$after){__typename edges{__typename node{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename id kind title membership isChannel role canEdit photo settings{__typename id mute}}}message{__typename id date sender{__typename id name firstName photo}senderBadge{__typename ...UserBadge}message fallback ... on GeneralMessage{__typename id attachments{__typename id fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename isImage imageFormat}}}quotedMessages{__typename id}}}}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount currentPage pagesCount openEnded}}}fragment UserBadge on UserBadge{__typename id name verified}"
    override val selector = MessagesSearchSelector
}