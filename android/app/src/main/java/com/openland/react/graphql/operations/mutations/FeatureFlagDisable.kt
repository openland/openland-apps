package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeatureFlagDisableSelector = obj(
            field("superAccountFeatureRemove","superAccountFeatureRemove", arguments(fieldValue("featureId", refValue("featureId")), fieldValue("id", refValue("accountId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("features","features", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("key","key", notNull(scalar("String"))),
                            field("title","title", notNull(scalar("String")))
                        ))))),
                    field("id","id", notNull(scalar("ID")))
                )))
        )
val FeatureFlagDisable = object: OperationDefinition {
    override val name = "FeatureFlagDisable"
    override val kind = OperationKind.MUTATION
    override val body = "mutation FeatureFlagDisable(\$accountId:ID!,\$featureId:ID!){superAccountFeatureRemove(featureId:\$featureId,id:\$accountId){__typename features{__typename id key title}id}}"
    override val selector = FeatureFlagDisableSelector
}