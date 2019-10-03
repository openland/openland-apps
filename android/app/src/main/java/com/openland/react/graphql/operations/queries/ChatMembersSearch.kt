package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChatMembersSearchSelector = obj(
            field("chatMembersSearch","members", arguments(fieldValue("after", refValue("after")), fieldValue("cid", refValue("cid")), fieldValue("first", refValue("first")), fieldValue("query", refValue("query"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("edges","edges", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("cursor","cursor", notNull(scalar("String"))),
                            field("node","user", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("id","id", notNull(scalar("ID"))),
                                    field("name","name", notNull(scalar("String"))),
                                    field("photo","photo", scalar("String")),
                                    field("primaryOrganization","primaryOrganization", obj(
                                            field("__typename","__typename", notNull(scalar("String"))),
                                            field("id","id", notNull(scalar("ID"))),
                                            field("name","name", notNull(scalar("String")))
                                        )),
                                    field("shortname","shortname", scalar("String"))
                                )))
                        ))))),
                    field("pageInfo","pageInfo", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("hasNextPage","hasNextPage", notNull(scalar("Boolean")))
                        )))
                )))
        )
val ChatMembersSearch = object: OperationDefinition {
    override val name = "ChatMembersSearch"
    override val kind = OperationKind.QUERY
    override val body = "query ChatMembersSearch(\$after:String,\$cid:ID!,\$first:Int!,\$query:String){members:chatMembersSearch(after:\$after,cid:\$cid,first:\$first,query:\$query){__typename edges{__typename cursor user:node{__typename id name photo primaryOrganization{__typename id name}shortname}}pageInfo{__typename hasNextPage}}}"
    override val selector = ChatMembersSearchSelector
}