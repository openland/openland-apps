package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatEventsSelector = obj(
            field("voiceChatEvents", "voiceChatEvents", arguments(fieldValue("fromState", refValue("fromState")), fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("state", "state", notNull(scalar("String"))),
                    field("events", "events", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            inline("VoiceChatParticipantUpdatedEvent", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("chat", "chat", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        fragment("VoiceChat", VoiceChatEntitySelector)
                                    ))),
                                field("participant", "participant", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        fragment("VoiceChatParticipant", VoiceChatParticipantSelector)
                                    )))
                            )),
                            inline("VoiceChatUpdatedEvent", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("chat", "chat", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        fragment("VoiceChat", VoiceChatEntitySelector)
                                    )))
                            ))
                        )))))
                )))
        )
val VoiceChatEvents = object: OperationDefinition {
    override val name = "VoiceChatEvents"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription VoiceChatEvents(\$id:ID!,\$fromState:String!){voiceChatEvents(fromState:\$fromState,id:\$id){__typename state events{__typename ... on VoiceChatParticipantUpdatedEvent{__typename chat{__typename ...VoiceChatEntity}participant{__typename ...VoiceChatParticipant}}... on VoiceChatUpdatedEvent{__typename chat{__typename ...VoiceChatEntity}}}}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount me{__typename ...VoiceChatMeParticipant}}fragment VoiceChatMeParticipant on VoiceChatParticipant{__typename id user{__typename id name firstName photo followersCount online lastSeen shortname}status handRaised}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename id name firstName photo followersCount online lastSeen}status handRaised}"
    override val selector = VoiceChatEventsSelector
}