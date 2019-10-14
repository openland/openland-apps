package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperAccountRenameSelector = obj(
            field("superAccountRename", "superAccountRename", arguments(fieldValue("id", refValue("accountId")), fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String")))
                )))
        )
val SuperAccountRename = object: OperationDefinition {
    override val name = "SuperAccountRename"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SuperAccountRename(\$accountId:ID!,\$title:String!){superAccountRename(id:\$accountId,title:\$title){__typename id title}}"
    override val selector = SuperAccountRenameSelector
}