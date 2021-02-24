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
                                fragment("VoiceChat", VoiceChatWithSpeakersSelector)
                            )))
                    ))
                )))))
        )
val ActiveVoiceChatsEvents = object: OperationDefinition {
    override val name = "ActiveVoiceChatsEvents"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription ActiveVoiceChatsEvents{activeVoiceChatsEvents{__typename ... on VoiceChatUpdatedEvent{__typename chat{__typename ...VoiceChatWithSpeakers}}}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount me{__typename ...VoiceChatParticipant}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename id name firstName photo}status handRaised}"
    override val selector = ActiveVoiceChatsEventsSelector
}