package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MatchmakingConnectSelector = obj(
            field("matchmakingConnect", "matchmakingConnect", arguments(fieldValue("peerId", refValue("peerId")), fieldValue("uid", refValue("uid"))), notNull(scalar("Boolean")))
        )
val MatchmakingConnect = object: OperationDefinition {
    override val name = "MatchmakingConnect"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MatchmakingConnect(\$peerId:ID!,\$uid:ID!){matchmakingConnect(peerId:\$peerId,uid:\$uid)}"
    override val selector = MatchmakingConnectSelector
}