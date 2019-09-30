package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ProfilePrefillSelector = obj(
            field("myProfilePrefill","prefill", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("firstName","firstName", scalar("String")),
                    field("lastName","lastName", scalar("String")),
                    field("picture","picture", scalar("String"))
                ))
        )
val ProfilePrefill = object: OperationDefinition {
    override val name = "ProfilePrefill"
    override val kind = OperationKind.QUERY
    override val body = "query ProfilePrefill{prefill:myProfilePrefill{__typename firstName lastName picture}}"
    override val selector = ProfilePrefillSelector
}