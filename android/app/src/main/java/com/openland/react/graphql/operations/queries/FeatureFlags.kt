package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeatureFlagsSelector = obj(
            field("featureFlags","featureFlags", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("title","title", notNull(scalar("String")))
                )))))
        )
val FeatureFlags = object: OperationDefinition {
    override val name = "FeatureFlags"
    override val kind = OperationKind.QUERY
    override val body = "query FeatureFlags{featureFlags{__typename id key title}}"
    override val selector = FeatureFlagsSelector
}