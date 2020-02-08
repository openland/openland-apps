package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChatMembersSearchSelector = obj(
            field("chatMembersSearch", "members", arguments(fieldValue("cid", refValue("cid")), fieldValue("query", refValue("query")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "user", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("ID"))),
                                    field("name", "name", notNull(scalar("String"))),
                                    field("shortname", "shortname", scalar("String")),
                                    field("photo", "photo", scalar("String")),
                                    field("primaryOrganization", "primaryOrganization", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("id", "id", notNull(scalar("ID"))),
                                            field("name", "name", notNull(scalar("String")))
                                        ))
                                ))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean")))
                        )))
                )))
        )
val ChatMembersSearch = object: OperationDefinition {
    override val name = "ChatMembersSearch"
    override val kind = OperationKind.QUERY
    override val body = "query ChatMembersSearch(\$cid:ID!,\$query:String,\$first:Int!,\$after:String){members:chatMembersSearch(cid:\$cid,query:\$query,first:\$first,after:\$after){__typename edges{__typename user:node{__typename id name shortname photo primaryOrganization{__typename id name}}cursor}pageInfo{__typename hasNextPage}}}"
    override val selector = ChatMembersSearchSelector
}