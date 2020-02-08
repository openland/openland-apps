package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationMembersSelector = obj(
            field("organization", "organization", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("alphaOrganizationMembers", "members", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("role", "role", notNull(scalar("String"))),
                            field("user", "user", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("User", UserShortSelector)
                                )))
                        )))))
                )))
        )
val OrganizationMembers = object: OperationDefinition {
    override val name = "OrganizationMembers"
    override val kind = OperationKind.QUERY
    override val body = "query OrganizationMembers(\$organizationId:ID!,\$first:Int,\$after:ID){organization(id:\$organizationId){__typename id members:alphaOrganizationMembers(first:\$first,after:\$after){__typename role user{__typename ...UserShort}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}"
    override val selector = OrganizationMembersSelector
}