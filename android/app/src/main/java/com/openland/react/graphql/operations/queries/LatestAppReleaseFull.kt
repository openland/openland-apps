package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val LatestAppReleaseFullSelector = obj(
            field("latestAppRelease", "latestAppRelease", arguments(fieldValue("platform", refValue("platform"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("platform", "platform", notNull(scalar("String"))),
                    field("version", "version", notNull(scalar("String"))),
                    field("notes", "notes", scalar("String")),
                    field("date", "date", notNull(scalar("Date")))
                ))
        )
val LatestAppReleaseFull = object: OperationDefinition {
    override val name = "LatestAppReleaseFull"
    override val kind = OperationKind.QUERY
    override val body = "query LatestAppReleaseFull(\$platform:ReleasePlatform!){latestAppRelease(platform:\$platform){__typename id platform version notes date}}"
    override val selector = LatestAppReleaseFullSelector
}