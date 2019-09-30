package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SetOrgShortnameSelector = obj(
            field("alphaSetOrgShortName","alphaSetOrgShortName", arguments(fieldValue("id", refValue("organizationId")), fieldValue("shortname", refValue("shortname"))), scalar("String"))
        )
val SetOrgShortname = object: OperationDefinition {
    override val name = "SetOrgShortname"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SetOrgShortname(\$organizationId:ID!,\$shortname:String!){alphaSetOrgShortName(id:\$organizationId,shortname:\$shortname)}"
    override val selector = SetOrgShortnameSelector
}