package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyAppsSelector = obj(
            field("myApps", "apps", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                )))))
        )
val MyApps = object: OperationDefinition {
    override val name = "MyApps"
    override val kind = OperationKind.QUERY
    override val body = "query MyApps{apps:myApps{__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}"
    override val selector = MyAppsSelector
}