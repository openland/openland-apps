package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationAddMemberSelector = obj(
            field("alphaOrganizationMemberAdd", "alphaOrganizationMemberAdd", arguments(fieldValue("userIds", refValue("userIds")), fieldValue("organizationId", refValue("organizationId"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("role", "role", notNull(scalar("String"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))
                )))))
        )
val OrganizationAddMember = object: OperationDefinition {
    override val name = "OrganizationAddMember"
    override val kind = OperationKind.MUTATION
    override val body = "mutation OrganizationAddMember(\$userIds:[ID!],\$organizationId:ID!){alphaOrganizationMemberAdd(userIds:\$userIds,organizationId:\$organizationId){__typename role user{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}"
    override val selector = OrganizationAddMemberSelector
}