package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperAccountsSelector = obj(
            field("superAccounts","superAccounts", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("createdAt","createdAt", scalar("String")),
                    field("id","id", notNull(scalar("ID"))),
                    field("orgId","orgId", notNull(scalar("ID"))),
                    field("state","state", notNull(scalar("String"))),
                    field("title","title", notNull(scalar("String")))
                )))))
        )
val SuperAccounts = object: OperationDefinition {
    override val name = "SuperAccounts"
    override val kind = OperationKind.QUERY
    override val body = "query SuperAccounts{superAccounts{__typename createdAt id orgId state title}}"
    override val selector = SuperAccountsSelector
}