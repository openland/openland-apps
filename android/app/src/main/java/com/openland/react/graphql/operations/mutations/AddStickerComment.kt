package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AddStickerCommentSelector = obj(
            field("betaAddStickerComment", "addStickerComment", arguments(fieldValue("peerId", refValue("peerId")), fieldValue("stickerId", refValue("stickerId")), fieldValue("replyComment", refValue("replyComment")), fieldValue("repeatKey", refValue("repeatKey"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
val AddStickerComment = object: OperationDefinition {
    override val name = "AddStickerComment"
    override val kind = OperationKind.MUTATION
    override val body = "mutation AddStickerComment(\$peerId:ID!,\$stickerId:ID!,\$replyComment:ID,\$repeatKey:String){addStickerComment:betaAddStickerComment(peerId:\$peerId,stickerId:\$stickerId,replyComment:\$replyComment,repeatKey:\$repeatKey){__typename id}}"
    override val selector = AddStickerCommentSelector
}