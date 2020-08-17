package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyContactsSearchSelector = obj(
            field("myContactsSearch", "myContactsSearch", arguments(fieldValue("query", refValue("query")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after")), fieldValue("page", refValue("page"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("User", UserShortSelector)
                                )))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean"))),
                            field("currentPage", "currentPage", notNull(scalar("Int")))
                        )))
                )))
        )
val MyContactsSearch = object: OperationDefinition {
    override val name = "MyContactsSearch"
    override val kind = OperationKind.QUERY
    override val body = "query MyContactsSearch(\$query:String,\$first:Int!,\$after:String,\$page:Int){myContactsSearch(query:\$query,first:\$first,after:\$after,page:\$page){__typename edges{__typename node{__typename ...UserShort}}pageInfo{__typename hasNextPage currentPage}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}"
    override val selector = MyContactsSearchSelector
}