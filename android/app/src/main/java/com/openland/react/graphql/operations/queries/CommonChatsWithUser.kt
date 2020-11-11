package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val CommonChatsWithUserSelector = obj(
            field("commonChatsWithUser", "commonChatsWithUser", arguments(fieldValue("uid", refValue("uid")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("title", "title", notNull(scalar("String"))),
                            field("description", "description", scalar("String")),
                            field("photo", "photo", notNull(scalar("String"))),
                            field("membersCount", "membersCount", notNull(scalar("Int"))),
                            field("featured", "featured", notNull(scalar("Boolean")))
                        ))))),
                    field("cursor", "cursor", scalar("String")),
                    field("count", "count", notNull(scalar("Int")))
                )))
        )
val CommonChatsWithUser = object: OperationDefinition {
    override val name = "CommonChatsWithUser"
    override val kind = OperationKind.QUERY
    override val body = "query CommonChatsWithUser(\$uid:ID!,\$first:Int!,\$after:ID){commonChatsWithUser(uid:\$uid,first:\$first,after:\$after){__typename items{__typename id title description photo membersCount featured}cursor count}}"
    override val selector = CommonChatsWithUserSelector
}