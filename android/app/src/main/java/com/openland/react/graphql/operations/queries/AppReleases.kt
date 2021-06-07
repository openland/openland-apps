package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AppReleasesSelector = obj(
            field("appReleases", "appReleases", arguments(fieldValue("platform", refValue("platform"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("platform", "platform", notNull(scalar("String"))),
                    field("version", "version", notNull(scalar("String"))),
                    field("notes", "notes", scalar("String")),
                    field("date", "date", notNull(scalar("Date")))
                )))))
        )
val AppReleases = object: OperationDefinition {
    override val name = "AppReleases"
    override val kind = OperationKind.QUERY
    override val body = "query AppReleases(\$platform:ReleasePlatform!){appReleases(platform:\$platform){__typename id platform version notes date}}"
    override val selector = AppReleasesSelector
}