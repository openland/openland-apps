package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val IpLocationSelector = obj(
            field("ipLocation", "ipLocation", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("countryCode", "countryCode", scalar("String"))
                ))
        )
val IpLocation = object: OperationDefinition {
    override val name = "IpLocation"
    override val kind = OperationKind.QUERY
    override val body = "query IpLocation{ipLocation{__typename countryCode}}"
    override val selector = IpLocationSelector
}