package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationMembersShortSelector = obj(
            field("organization", "organization", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("alphaOrganizationMembers", "members", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("user", "user", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("ID")))
                                )))
                        ))))),
                    fragment("Organization", OrganizationFragmentSelector)
                )))
        )
val OrganizationMembersShort = object: OperationDefinition {
    override val name = "OrganizationMembersShort"
    override val kind = OperationKind.QUERY
    override val body = "query OrganizationMembersShort(\$organizationId:ID!){organization(id:\$organizationId){__typename ...OrganizationFragment members:alphaOrganizationMembers{__typename user{__typename id}}}}fragment OrganizationFragment on Organization{__typename id isMine superAccountId name photo shortname website websiteTitle about twitter facebook linkedin instagram membersCount private:alphaIsPrivate isOwner:betaIsOwner isAdmin:betaIsAdmin featured:alphaFeatured isCommunity:alphaIsCommunity roomsCount:betaPublicRoomsCount}"
    override val selector = OrganizationMembersShortSelector
}