package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SetFeedChannelShortnameSelector = obj(
            field("alphaSetFeedChannelShortName","alphaSetFeedChannelShortName", arguments(fieldValue("id", refValue("id")), fieldValue("shortname", refValue("shortname"))), scalar("String"))
        )
val SetFeedChannelShortname = object: OperationDefinition {
    override val name = "SetFeedChannelShortname"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SetFeedChannelShortname(\$id:ID!,\$shortname:String!){alphaSetFeedChannelShortName(id:\$id,shortname:\$shortname)}"
    override val selector = SetFeedChannelShortnameSelector
}