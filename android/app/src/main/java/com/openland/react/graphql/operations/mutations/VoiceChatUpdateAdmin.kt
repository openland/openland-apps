package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatUpdateAdminSelector = obj(
            field("voiceChatUpdateAdmin", "voiceChatUpdateAdmin", arguments(fieldValue("id", refValue("id")), fieldValue("uid", refValue("uid")), fieldValue("admin", refValue("admin"))), notNull(scalar("Boolean")))
        )
val VoiceChatUpdateAdmin = object: OperationDefinition {
    override val name = "VoiceChatUpdateAdmin"
    override val kind = OperationKind.MUTATION
    override val body = "mutation VoiceChatUpdateAdmin(\$id:ID!,\$uid:ID!,\$admin:Boolean!){voiceChatUpdateAdmin(id:\$id,uid:\$uid,admin:\$admin)}"
    override val selector = VoiceChatUpdateAdminSelector
}