package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MatchmakingRoomSelector = obj(
            field("matchmakingRoom", "matchmakingRoom", arguments(fieldValue("peerId", refValue("peerId"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("MatchmakingRoom", MatchmakingRoomFragmentSelector)
                ))
        )
val MatchmakingRoom = object: OperationDefinition {
    override val name = "MatchmakingRoom"
    override val kind = OperationKind.QUERY
    override val body = "query MatchmakingRoom(\$peerId:ID!){matchmakingRoom(peerId:\$peerId){__typename ...MatchmakingRoomFragment}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}"
    override val selector = MatchmakingRoomSelector
}