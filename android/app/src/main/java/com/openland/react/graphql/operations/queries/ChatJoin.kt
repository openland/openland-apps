package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChatJoinSelector = obj(
            field("room", "room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("title", "title", notNull(scalar("String"))),
                        field("description", "description", scalar("String")),
                        field("photo", "photo", notNull(scalar("String"))),
                        field("membersCount", "membersCount", notNull(scalar("Int"))),
                        field("onlineMembersCount", "onlineMembersCount", notNull(scalar("Int"))),
                        field("previewMembers", "previewMembers", notNull(list(notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("photo", "photo", scalar("String")),
                                field("name", "name", notNull(scalar("String")))
                            ))))),
                        field("isChannel", "isChannel", notNull(scalar("Boolean")))
                    ))
                ))
        )
val ChatJoin = object: OperationDefinition {
    override val name = "ChatJoin"
    override val kind = OperationKind.QUERY
    override val body = "query ChatJoin(\$id:ID!){room(id:\$id){__typename ... on SharedRoom{__typename id title description photo membersCount onlineMembersCount previewMembers{__typename id photo name}isChannel}}}"
    override val selector = ChatJoinSelector
}