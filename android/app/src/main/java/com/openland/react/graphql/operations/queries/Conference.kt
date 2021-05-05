package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ConferenceSelector = obj(
            field("conference", "conference", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceFullSelector)
                )))
        )
val Conference = object: OperationDefinition {
    override val name = "Conference"
    override val kind = OperationKind.QUERY
    override val body = "query Conference(\$id:ID!){conference(id:\$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename id startTime peers{__typename id user{__typename ...UserSmall}mediaState{__typename audioPaused videoPaused screencastEnabled}}iceServers{__typename urls username credential}parent{__typename ... on SharedRoom{__typename id title isChannel membersCount photo owner{__typename id name}}... on PrivateRoom{__typename id user{__typename id name photo}}... on VoiceChat{__typename id}}}fragment UserSmall on User{__typename id name firstName photo shortname isBot systemBadge}"
    override val selector = ConferenceSelector
}