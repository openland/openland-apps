package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SetRoomShortnameSelector = obj(
            field("alphaSetRoomShortName", "alphaSetRoomShortName", arguments(fieldValue("id", refValue("id")), fieldValue("shortname", refValue("shortname"))), scalar("String"))
        )
val SetRoomShortname = object: OperationDefinition {
    override val name = "SetRoomShortname"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SetRoomShortname(\$id:ID!,\$shortname:String!){alphaSetRoomShortName(id:\$id,shortname:\$shortname)}"
    override val selector = SetRoomShortnameSelector
}