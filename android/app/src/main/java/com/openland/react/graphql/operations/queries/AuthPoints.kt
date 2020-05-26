package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AuthPointsSelector = obj(
            field("authPoints", "authPoints", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("email", "email", scalar("String")),
                    field("phone", "phone", scalar("String"))
                )))
        )
val AuthPoints = object: OperationDefinition {
    override val name = "AuthPoints"
    override val kind = OperationKind.QUERY
    override val body = "query AuthPoints{authPoints{__typename email phone}}"
    override val selector = AuthPointsSelector
}