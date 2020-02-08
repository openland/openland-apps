package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MatchmakingRoomSaveSelector = obj(
            field("matchmakingRoomSave", "matchmakingRoomSave", arguments(fieldValue("peerId", refValue("peerId")), fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("MatchmakingRoom", MatchmakingRoomFragmentSelector)
                )))
        )
val MatchmakingRoomSave = object: OperationDefinition {
    override val name = "MatchmakingRoomSave"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MatchmakingRoomSave(\$peerId:ID!,\$input:MatchmakingRoomInput!){matchmakingRoomSave(peerId:\$peerId,input:\$input){__typename ...MatchmakingRoomFragment}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}"
    override val selector = MatchmakingRoomSaveSelector
}