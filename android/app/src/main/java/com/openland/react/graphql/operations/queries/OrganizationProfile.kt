package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OrganizationProfileSelector = obj(
            field("organizationProfile","organizationProfile", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("OrganizationProfile", OrganizationProfileFullSelector)
                )))
        )
val OrganizationProfile = object: OperationDefinition {
    override val name = "OrganizationProfile"
    override val kind = OperationKind.QUERY
    override val body = "query OrganizationProfile(\$organizationId:ID!){organizationProfile(id:\$organizationId){__typename ...OrganizationProfileFull}}fragment OrganizationProfileFull on OrganizationProfile{__typename about editorial:alphaEditorial featured:alphaFeatured private:alphaIsPrivate published:alphaPublished facebook id instagram linkedin name photoRef{__typename crop{__typename h w x y}uuid}shortname twitter website websiteTitle}"
    override val selector = OrganizationProfileSelector
}