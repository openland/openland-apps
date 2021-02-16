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
                            fragment("VoiceChat", VoiceChatSelector)
                        )))))
                )))
        )
val ActiveVoiceChats = object: OperationDefinition {
    override val name = "ActiveVoiceChats"
    override val kind = OperationKind.QUERY
    override val body = "query ActiveVoiceChats(\$first:Int!,\$after:String){activeVoiceChats(first:\$first,after:\$after){__typename cursor items{__typename ...VoiceChat}}}fragment VoiceChat on VoiceChat{__typename id title listenersCount speakersCount speakers{__typename id user{__typename id name firstName photo}status}}"
    override val selector = ActiveVoiceChatsSelector
}