package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperAccountMemberRemoveSelector = obj(
            field("superAccountMemberRemove", "superAccountMemberRemove", arguments(fieldValue("id", refValue("accountId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("members", "members", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))))
                )))
        )
val SuperAccountMemberRemove = object: OperationDefinition {
    override val name = "SuperAccountMemberRemove"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SuperAccountMemberRemove(\$accountId:ID!,\$userId:ID!){superAccountMemberRemove(id:\$accountId,userId:\$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName photo online lastSeen isBot shortname primaryOrganization{__typename id name shortname}}"
    override val selector = SuperAccountMemberRemoveSelector
}