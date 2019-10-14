package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AddStickerCommentSelector = obj(
            field("betaAddStickerComment", "addStickerComment", arguments(fieldValue("peerId", refValue("peerId")), fieldValue("repeatKey", refValue("repeatKey")), fieldValue("replyComment", refValue("replyComment")), fieldValue("stickerId", refValue("stickerId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val AddStickerComment = object: OperationDefinition {
    override val name = "AddStickerComment"
    override val kind = OperationKind.MUTATION
    override val body = "mutation AddStickerComment(\$peerId:ID!,\$repeatKey:String,\$replyComment:ID,\$stickerId:ID!){addStickerComment:betaAddStickerComment(peerId:\$peerId,repeatKey:\$repeatKey,replyComment:\$replyComment,stickerId:\$stickerId){__typename id}}"
    override val selector = AddStickerCommentSelector
}