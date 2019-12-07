package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationAddMemberSelector = obj(
            field("alphaOrganizationMemberAdd", "alphaOrganizationMemberAdd", arguments(fieldValue("organizationId", refValue("organizationId")), fieldValue("userIds", refValue("userIds"))), notNull(list(notNull(obj(
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
    override val body = "mutation OrganizationAddMember(\$organizationId:ID!,\$userIds:[ID!]){alphaOrganizationMemberAdd(organizationId:\$organizationId,userIds:\$userIds){__typename role user{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}"
    override val selector = OrganizationAddMemberSelector
}