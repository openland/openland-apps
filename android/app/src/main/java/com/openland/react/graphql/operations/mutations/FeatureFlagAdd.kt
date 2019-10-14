package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeatureFlagAddSelector = obj(
            field("featureFlagAdd", "featureFlagAdd", arguments(fieldValue("key", refValue("key")), fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("key", "key", notNull(scalar("String"))),
                    field("title", "title", notNull(scalar("String")))
                )))
        )
val FeatureFlagAdd = object: OperationDefinition {
    override val name = "FeatureFlagAdd"
    override val kind = OperationKind.MUTATION
    override val body = "mutation FeatureFlagAdd(\$key:String!,\$title:String!){featureFlagAdd(key:\$key,title:\$title){__typename id key title}}"
    override val selector = FeatureFlagAddSelector
}