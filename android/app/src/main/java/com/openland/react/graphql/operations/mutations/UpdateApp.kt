package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UpdateAppSelector = obj(
            field("updateAppProfile", "updateAppProfile", arguments(fieldValue("appId", refValue("appId")), fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                )))
        )
val UpdateApp = object: OperationDefinition {
    override val name = "UpdateApp"
    override val kind = OperationKind.MUTATION
    override val body = "mutation UpdateApp(\$appId:ID!,\$input:AppProfileInput!){updateAppProfile(appId:\$appId,input:\$input){__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}"
    override val selector = UpdateAppSelector
}