package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeatureFlagEnableSelector = obj(
            field("superAccountFeatureAdd", "superAccountFeatureAdd", arguments(fieldValue("featureId", refValue("featureId")), fieldValue("id", refValue("accountId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("features", "features", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("key", "key", notNull(scalar("String"))),
                            field("title", "title", notNull(scalar("String")))
                        ))))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val FeatureFlagEnable = object: OperationDefinition {
    override val name = "FeatureFlagEnable"
    override val kind = OperationKind.MUTATION
    override val body = "mutation FeatureFlagEnable(\$accountId:ID!,\$featureId:ID!){superAccountFeatureAdd(featureId:\$featureId,id:\$accountId){__typename features{__typename id key title}id}}"
    override val selector = FeatureFlagEnableSelector
}