package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UpdateOrganizationSelector = obj(
            field("updateOrganizationProfile","updateOrganizationProfile", arguments(fieldValue("id", refValue("organizationId")), fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("OrganizationProfile", OrganizationProfileFullSelector)
                )))
        )
val UpdateOrganization = object: OperationDefinition {
    override val name = "UpdateOrganization"
    override val kind = OperationKind.MUTATION
    override val body = "mutation UpdateOrganization(\$input:UpdateOrganizationProfileInput!,\$organizationId:ID){updateOrganizationProfile(id:\$organizationId,input:\$input){__typename ...OrganizationProfileFull}}fragment OrganizationProfileFull on OrganizationProfile{__typename about editorial:alphaEditorial featured:alphaFeatured private:alphaIsPrivate published:alphaPublished facebook id instagram linkedin name photoRef{__typename crop{__typename h w x y}uuid}shortname twitter website websiteTitle}"
    override val selector = UpdateOrganizationSelector
}