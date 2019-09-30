package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AccountInviteJoinSelector = obj(
            field("alphaJoinInvite","alphaJoinInvite", arguments(fieldValue("key", refValue("inviteKey"))), notNull(scalar("ID")))
        )
val AccountInviteJoin = object: OperationDefinition {
    override val name = "AccountInviteJoin"
    override val kind = OperationKind.MUTATION
    override val body = "mutation AccountInviteJoin(\$inviteKey:String!){alphaJoinInvite(key:\$inviteKey)}"
    override val selector = AccountInviteJoinSelector
}