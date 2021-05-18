package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ActiveVoiceChatsEventsSelector = obj(
            field("activeVoiceChatsEvents", "activeVoiceChatsEvents", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("VoiceChatUpdatedEvent", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("chat", "chat", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("VoiceChat", VoiceChatShortSelector)
                            )))
                    ))
                )))))
        )
val ActiveVoiceChatsEvents = object: OperationDefinition {
    override val name = "ActiveVoiceChatsEvents"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription ActiveVoiceChatsEvents{activeVoiceChatsEvents{__typename ... on VoiceChatUpdatedEvent{__typename chat{__typename ...VoiceChatShort}}}}fragment VoiceChatShort on VoiceChat{__typename id active title speakersCount listenersCount parentRoom{__typename id title photo}speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename id photo firstName name}}"
    override val selector = ActiveVoiceChatsEventsSelector
}