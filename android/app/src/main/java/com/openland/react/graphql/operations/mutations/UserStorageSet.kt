package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UserStorageSetSelector = obj(
            field("userStorageSet","userStorageSet", arguments(fieldValue("data", refValue("data")), fieldValue("namespace", refValue("namespace"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("value","value", scalar("String"))
                )))))
        )
val UserStorageSet = object: OperationDefinition {
    override val name = "UserStorageSet"
    override val kind = OperationKind.MUTATION
    override val body = "mutation UserStorageSet(\$data:[AppStorageValueInput!]!,\$namespace:String!){userStorageSet(data:\$data,namespace:\$namespace){__typename id key value}}"
    override val selector = UserStorageSetSelector
}