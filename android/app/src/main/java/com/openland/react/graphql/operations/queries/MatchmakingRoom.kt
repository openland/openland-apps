package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MatchmakingRoomSelector = obj(
            field("matchmakingRoom","matchmakingRoom", arguments(fieldValue("peerId", refValue("peerId"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("MatchmakingRoom", MatchmakingRoomFragmentSelector)
                ))
        )
val MatchmakingRoom = object: OperationDefinition {
    override val name = "MatchmakingRoom"
    override val kind = OperationKind.QUERY
    override val body = "query MatchmakingRoom(\$peerId:ID!){matchmakingRoom(peerId:\$peerId){__typename ...MatchmakingRoomFragment}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id name photo primaryOrganization{__typename id name photo}}}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isYou name photo}}"
    override val selector = MatchmakingRoomSelector
}