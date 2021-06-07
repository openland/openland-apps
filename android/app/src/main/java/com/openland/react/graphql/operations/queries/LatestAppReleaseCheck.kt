package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val LatestAppReleaseCheckSelector = obj(
            field("latestAppRelease", "latestAppRelease", arguments(fieldValue("platform", refValue("platform"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("version", "version", notNull(scalar("String")))
                ))
        )
val LatestAppReleaseCheck = object: OperationDefinition {
    override val name = "LatestAppReleaseCheck"
    override val kind = OperationKind.QUERY
    override val body = "query LatestAppReleaseCheck(\$platform:ReleasePlatform!){latestAppRelease(platform:\$platform){__typename id version}}"
    override val selector = LatestAppReleaseCheckSelector
}