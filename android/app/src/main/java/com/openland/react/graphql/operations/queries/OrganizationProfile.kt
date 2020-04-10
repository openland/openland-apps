package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationProfileSelector = obj(
            field("organizationProfile", "organizationProfile", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("OrganizationProfile", OrganizationProfileFullSelector)
                )))
        )
val OrganizationProfile = object: OperationDefinition {
    override val name = "OrganizationProfile"
    override val kind = OperationKind.QUERY
    override val body = "query OrganizationProfile(\$organizationId:ID!){organizationProfile(id:\$organizationId){__typename ...OrganizationProfileFull}}fragment OrganizationProfileFull on OrganizationProfile{__typename id name photoRef{__typename uuid crop{__typename x y w h}}website websiteTitle about twitter facebook linkedin instagram shortname isCommunity:alphaIsCommunity private:alphaIsPrivate featured:alphaFeatured published:alphaPublished editorial:alphaEditorial}"
    override val selector = OrganizationProfileSelector
}