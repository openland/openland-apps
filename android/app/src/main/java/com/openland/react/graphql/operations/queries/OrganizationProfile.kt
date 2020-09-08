package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationProfileSelector = obj(
            field("organizationProfile", "organizationProfile", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("OrganizationProfile", OrganizationProfileFragmentSelector)
                )))
        )
val OrganizationProfile = object: OperationDefinition {
    override val name = "OrganizationProfile"
    override val kind = OperationKind.QUERY
    override val body = "query OrganizationProfile(\$organizationId:ID!){organizationProfile(id:\$organizationId){__typename ...OrganizationProfileFragment}}fragment OrganizationProfileFragment on OrganizationProfile{__typename id name photoRef{__typename uuid crop{__typename x y w h}}website websiteTitle about twitter facebook linkedin instagram shortname applyLink applyLinkEnabled autosubscribeRooms isCommunity:alphaIsCommunity private:alphaIsPrivate featured:alphaFeatured published:alphaPublished editorial:alphaEditorial membersCanInvite:betaMembersCanInvite}"
    override val selector = OrganizationProfileSelector
}