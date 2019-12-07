package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationMembersSelector = obj(
            field("organization", "organization", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("alphaOrganizationMembers", "members", arguments(fieldValue("after", refValue("after")), fieldValue("first", refValue("first"))), notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("role", "role", notNull(scalar("String"))),
                            field("user", "user", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("User", UserShortSelector)
                                )))
                        ))))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val OrganizationMembers = object: OperationDefinition {
    override val name = "OrganizationMembers"
    override val kind = OperationKind.QUERY
    override val body = "query OrganizationMembers(\$after:ID,\$first:Int,\$organizationId:ID!){organization(id:\$organizationId){__typename members:alphaOrganizationMembers(after:\$after,first:\$first){__typename role user{__typename ...UserShort}}id}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}"
    override val selector = OrganizationMembersSelector
}