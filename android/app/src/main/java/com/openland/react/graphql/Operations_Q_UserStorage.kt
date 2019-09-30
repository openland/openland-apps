package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val UserStorageSelector = obj(
            field("userStorage","userStorage", arguments(fieldValue("keys", refValue("keys")), fieldValue("namespace", refValue("namespace"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("value","value", scalar("String"))
                )))))
        )
val UserStorage = object: OperationDefinition {
    override val name = "UserStorage"
    override val kind = OperationKind.QUERY
    override val body = "query UserStorage(\$keys:[String!]!,\$namespace:String!){userStorage(keys:\$keys,namespace:\$namespace){__typename id key value}}"
    override val selector = UserStorageSelector
}