package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UserSearchForChatSelector = obj(
            field("userSearchForChat", "userSearchForChat", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("query", refValue("query")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after")), fieldValue("sort", refValue("sort"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("User", UserShortSelector)
                                ))),
                            field("isMember", "isMember", notNull(scalar("Boolean"))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean")))
                        )))
                )))
        )
val UserSearchForChat = object: OperationDefinition {
    override val name = "UserSearchForChat"
    override val kind = OperationKind.QUERY
    override val body = "query UserSearchForChat(\$chatId:ID!,\$query:String,\$first:Int!,\$after:String,\$sort:String){userSearchForChat(chatId:\$chatId,query:\$query,first:\$first,after:\$after,sort:\$sort){__typename edges{__typename node{__typename ...UserShort}isMember cursor}pageInfo{__typename hasNextPage}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts isBanned isMeBanned primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite featured:alphaFeatured}"
    override val selector = UserSearchForChatSelector
}