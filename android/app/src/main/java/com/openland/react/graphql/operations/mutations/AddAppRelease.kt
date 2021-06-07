package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AddAppReleaseSelector = obj(
            field("superAddAppRelease", "superAddAppRelease", arguments(fieldValue("platform", refValue("platform")), fieldValue("version", refValue("version")), fieldValue("notes", refValue("notes"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val AddAppRelease = object: OperationDefinition {
    override val name = "AddAppRelease"
    override val kind = OperationKind.MUTATION
    override val body = "mutation AddAppRelease(\$platform:ReleasePlatform!,\$version:String!,\$notes:String!){superAddAppRelease(platform:\$platform,version:\$version,notes:\$notes){__typename id}}"
    override val selector = AddAppReleaseSelector
}