package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val CreateUserProfileAndOrganizationSelector = obj(
            field("alphaCreateUserProfileAndOrganization", "alphaCreateUserProfileAndOrganization", arguments(fieldValue("user", refValue("user")), fieldValue("organization", refValue("organization"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("user", "user", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserFullSelector)
                        )),
                    field("organization", "organization", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("name", "name", notNull(scalar("String")))
                        ))
                )))
        )
val CreateUserProfileAndOrganization = object: OperationDefinition {
    override val name = "CreateUserProfileAndOrganization"
    override val kind = OperationKind.MUTATION
    override val body = "mutation CreateUserProfileAndOrganization(\$user:ProfileInput!,\$organization:CreateOrganizationInput!){alphaCreateUserProfileAndOrganization(user:\$user,organization:\$organization){__typename user{__typename ...UserFull}organization{__typename id name}}}fragment UserFull on User{__typename id name firstName lastName photo phone email website about location isBot isYou online lastSeen linkedin instagram twitter facebook shortname audienceSize primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}"
    override val selector = CreateUserProfileAndOrganizationSelector
}