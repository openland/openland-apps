package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SetUserShortnameSelector = obj(
            field("alphaSetUserShortName","alphaSetUserShortName", arguments(fieldValue("shortname", refValue("shortname"))), scalar("String"))
        )
val SetUserShortname = object: OperationDefinition {
    override val name = "SetUserShortname"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SetUserShortname(\$shortname:String!){alphaSetUserShortName(shortname:\$shortname)}"
    override val selector = SetUserShortnameSelector
}