package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatListenersSelector = obj(
            field("voiceChatListeners", "voiceChatListeners", arguments(fieldValue("id", refValue("id")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("VoiceChatParticipant", VoiceChatParticipantSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val VoiceChatListeners = object: OperationDefinition {
    override val name = "VoiceChatListeners"
    override val kind = OperationKind.QUERY
    override val body = "query VoiceChatListeners(\$id:ID!,\$first:Int!,\$after:String){voiceChatListeners(id:\$id,first:\$first,after:\$after){__typename items{__typename ...VoiceChatParticipant}cursor}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename id name firstName photo followersCount}status handRaised}"
    override val selector = VoiceChatListenersSelector
}