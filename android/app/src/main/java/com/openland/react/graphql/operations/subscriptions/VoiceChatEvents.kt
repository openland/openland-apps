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
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("handRaisedCount", "handRaisedCount", notNull(scalar("Int"))),
                                        field("me", "me", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                fragment("VoiceChatParticipant", VoiceChatMeSelector)
                                            ))
                                    ))),
                                field("participant", "participant", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("status", "status", notNull(scalar("String"))),
                                        field("handRaised", "handRaised", scalar("Boolean")),
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
    override val body = "subscription VoiceChatEvents(\$id:ID!,\$fromState:String!){voiceChatEvents(fromState:\$fromState,id:\$id){__typename state events{__typename ... on VoiceChatParticipantUpdatedEvent{__typename chat{__typename id handRaisedCount me{__typename ...VoiceChatMe}}participant{__typename ...VoiceChatParticipant status handRaised}}... on VoiceChatUpdatedEvent{__typename chat{__typename ...VoiceChatEntity}}}}}fragment VoiceChatMe on VoiceChatParticipant{__typename id user{__typename id photo firstName name shortname}status handRaised}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename id photo firstName name}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount handRaisedCount parentRoom{__typename id title photo membership kind isChannel shortname organization{__typename id isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}isPremium role}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatMe}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}"
    override val selector = VoiceChatEventsSelector
}