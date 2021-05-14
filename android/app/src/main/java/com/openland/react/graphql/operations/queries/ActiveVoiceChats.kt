package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ActiveVoiceChatsSelector = obj(
            field("activeVoiceChats", "activeVoiceChats", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("cursor", "cursor", scalar("String")),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("VoiceChat", VoiceChatShortSelector)
                        )))))
                )))
        )
val ActiveVoiceChats = object: OperationDefinition {
    override val name = "ActiveVoiceChats"
    override val kind = OperationKind.QUERY
    override val body = "query ActiveVoiceChats(\$first:Int!,\$after:String){activeVoiceChats(first:\$first,after:\$after){__typename cursor items{__typename ...VoiceChatShort}}}fragment VoiceChatShort on VoiceChat{__typename id active title speakersCount listenersCount parentRoom{__typename id title photo}speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename id photo firstName name}}"
    override val selector = ActiveVoiceChatsSelector
}