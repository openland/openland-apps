package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeatureFlagEnableSelector = obj(
            field("superAccountFeatureAdd", "superAccountFeatureAdd", arguments(fieldValue("id", refValue("accountId")), fieldValue("featureId", refValue("featureId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("features", "features", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("key", "key", notNull(scalar("String"))),
                            field("title", "title", notNull(scalar("String")))
                        )))))
                )))
        )
val FeatureFlagEnable = object: OperationDefinition {
    override val name = "FeatureFlagEnable"
    override val kind = OperationKind.MUTATION
    override val body = "mutation FeatureFlagEnable(\$accountId:ID!,\$featureId:ID!){superAccountFeatureAdd(id:\$accountId,featureId:\$featureId){__typename id features{__typename id key title}}}"
    override val selector = FeatureFlagEnableSelector
}