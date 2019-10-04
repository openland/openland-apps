package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MediaFailedSelector = obj(
            field("mediaStreamFailed","mediaStreamFailed", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("streams","streams", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("ice","ice", notNull(list(notNull(scalar("String"))))),
                            field("id","id", notNull(scalar("ID"))),
                            field("sdp","sdp", scalar("String")),
                            field("state","state", notNull(scalar("String")))
                        )))))
                )))
        )
val MediaFailed = object: OperationDefinition {
    override val name = "MediaFailed"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MediaFailed(\$id:ID!,\$peerId:ID!){mediaStreamFailed(id:\$id,peerId:\$peerId){__typename id streams{__typename ice id sdp state}}}"
    override val selector = MediaFailedSelector
}