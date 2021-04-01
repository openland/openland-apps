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
    override val body = "subscription VoiceChatEvents(\$id:ID!,\$fromState:String!){voiceChatEvents(fromState:\$fromState,id:\$id){__typename state events{__typename ... on VoiceChatParticipantUpdatedEvent{__typename chat{__typename ...VoiceChatEntity}participant{__typename ...VoiceChatParticipant}}... on VoiceChatUpdatedEvent{__typename chat{__typename ...VoiceChatEntity}}}}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership isChannel}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followersCount}status handRaised}fragment UserSmall on User{__typename id name firstName photo shortname isBot}"
    override val selector = VoiceChatEventsSelector
}