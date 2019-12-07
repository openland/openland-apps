package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val CreateUserProfileAndOrganizationSelector = obj(
            field("alphaCreateUserProfileAndOrganization", "alphaCreateUserProfileAndOrganization", arguments(fieldValue("organization", refValue("organization")), fieldValue("user", refValue("user"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("organization", "organization", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("name", "name", notNull(scalar("String")))
                        )),
                    field("user", "user", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserFullSelector)
                        ))
                )))
        )
val CreateUserProfileAndOrganization = object: OperationDefinition {
    override val name = "CreateUserProfileAndOrganization"
    override val kind = OperationKind.MUTATION
    override val body = "mutation CreateUserProfileAndOrganization(\$organization:CreateOrganizationInput!,\$user:ProfileInput!){alphaCreateUserProfileAndOrganization(organization:\$organization,user:\$user){__typename organization{__typename id name}user{__typename ...UserFull}}}fragment UserFull on User{__typename about audienceSize email facebook firstName id instagram isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}"
    override val selector = CreateUserProfileAndOrganizationSelector
}