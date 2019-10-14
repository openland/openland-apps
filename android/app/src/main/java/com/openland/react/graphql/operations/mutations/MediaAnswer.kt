package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MediaAnswerSelector = obj(
            field("mediaStreamAnswer", "mediaStreamAnswer", arguments(fieldValue("answer", refValue("answer")), fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("streams", "streams", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("ice", "ice", notNull(list(notNull(scalar("String"))))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("sdp", "sdp", scalar("String")),
                            field("state", "state", notNull(scalar("String")))
                        )))))
                )))
        )
val MediaAnswer = object: OperationDefinition {
    override val name = "MediaAnswer"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MediaAnswer(\$answer:String!,\$id:ID!,\$peerId:ID!){mediaStreamAnswer(answer:\$answer,id:\$id,peerId:\$peerId){__typename id streams{__typename ice id sdp state}}}"
    override val selector = MediaAnswerSelector
}