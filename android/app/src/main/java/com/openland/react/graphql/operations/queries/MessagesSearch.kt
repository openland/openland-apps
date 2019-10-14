package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MessagesSearchSelector = obj(
            field("messagesSearch", "messagesSearch", arguments(fieldValue("after", refValue("after")), fieldValue("first", refValue("first")), fieldValue("query", refValue("query")), fieldValue("sort", refValue("sort"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("cursor", "cursor", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("chat", "chat", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            inline("PrivateRoom", obj(
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("user", "user", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("name", "name", notNull(scalar("String"))),
                                                        field("photo", "photo", scalar("String"))
                                                    )))
                                            )),
                                            inline("SharedRoom", obj(
                                                field("canEdit", "canEdit", notNull(scalar("Boolean"))),
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("isChannel", "isChannel", notNull(scalar("Boolean"))),
                                                field("kind", "kind", notNull(scalar("String"))),
                                                field("membership", "membership", notNull(scalar("String"))),
                                                field("photo", "photo", notNull(scalar("String"))),
                                                field("role", "role", notNull(scalar("String"))),
                                                field("title", "title", notNull(scalar("String")))
                                            ))
                                        ))),
                                    field("message", "message", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("date", "date", notNull(scalar("Date"))),
                                            field("fallback", "fallback", notNull(scalar("String"))),
                                            field("id", "id", notNull(scalar("ID"))),
                                            field("message", "message", scalar("String")),
                                            field("sender", "sender", notNull(obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    field("firstName", "firstName", notNull(scalar("String"))),
                                                    field("id", "id", notNull(scalar("ID"))),
                                                    field("name", "name", notNull(scalar("String"))),
                                                    field("photo", "photo", scalar("String"))
                                                ))),
                                            field("senderBadge", "senderBadge", obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    fragment("UserBadge", UserBadgeSelector)
                                                )),
                                            inline("GeneralMessage", obj(
                                                field("attachments", "attachments", notNull(list(notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("fallback", "fallback", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        inline("MessageAttachmentFile", obj(
                                                            field("fileId", "fileId", notNull(scalar("String"))),
                                                            field("fileMetadata", "fileMetadata", notNull(obj(
                                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                                    field("imageFormat", "imageFormat", scalar("String")),
                                                                    field("isImage", "isImage", notNull(scalar("Boolean")))
                                                                ))),
                                                            field("id", "id", notNull(scalar("ID")))
                                                        ))
                                                    ))))),
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("quotedMessages", "quotedMessages", notNull(list(notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID")))
                                                    )))))
                                            ))
                                        )))
                                )))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("currentPage", "currentPage", notNull(scalar("Int"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage", "hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount", "itemsCount", notNull(scalar("Int"))),
                            field("openEnded", "openEnded", notNull(scalar("Boolean"))),
                            field("pagesCount", "pagesCount", notNull(scalar("Int")))
                        )))
                )))
        )
val MessagesSearch = object: OperationDefinition {
    override val name = "MessagesSearch"
    override val kind = OperationKind.QUERY
    override val body = "query MessagesSearch(\$after:String,\$first:Int!,\$query:String!,\$sort:String){messagesSearch(after:\$after,first:\$first,query:\$query,sort:\$sort){__typename edges{__typename cursor node{__typename chat{__typename ... on PrivateRoom{id user{__typename id name photo}}... on SharedRoom{canEdit id isChannel kind membership photo role title}}message{__typename date fallback id message sender{__typename firstName id name photo}senderBadge{__typename ...UserBadge}... on GeneralMessage{attachments{__typename fallback id ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat isImage}id}}id quotedMessages{__typename id}}}}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment UserBadge on UserBadge{__typename id name verified}"
    override val selector = MessagesSearchSelector
}