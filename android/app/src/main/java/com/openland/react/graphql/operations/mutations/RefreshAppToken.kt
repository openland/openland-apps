package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RefreshAppTokenSelector = obj(
            field("refreshAppToken", "refreshAppToken", arguments(fieldValue("appId", refValue("appId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                )))
        )
val RefreshAppToken = object: OperationDefinition {
    override val name = "RefreshAppToken"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RefreshAppToken(\$appId:ID!){refreshAppToken(appId:\$appId){__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}"
    override val selector = RefreshAppTokenSelector
}