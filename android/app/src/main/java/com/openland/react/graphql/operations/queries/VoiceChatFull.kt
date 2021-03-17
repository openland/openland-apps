package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val VoiceChatFullSelector = obj(
            field("voiceChat", "voiceChat", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("VoiceChat", FullVoiceChatSelector)
                )))
        )
val VoiceChatFull = object: OperationDefinition {
    override val name = "VoiceChatFull"
    override val kind = OperationKind.QUERY
    override val body = "query VoiceChatFull(\$id:ID!){voiceChat(id:\$id){__typename ...FullVoiceChat}}fragment FullVoiceChat on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}listeners{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount me{__typename ...VoiceChatMeParticipant}}fragment VoiceChatMeParticipant on VoiceChatParticipant{__typename id user{__typename id name firstName photo followersCount online lastSeen shortname}status handRaised}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename id name firstName photo followersCount online lastSeen}status handRaised}"
    override val selector = VoiceChatFullSelector
}