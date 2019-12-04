package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MatchmakingRoomSaveSelector = obj(
            field("matchmakingRoomSave", "matchmakingRoomSave", arguments(fieldValue("input", refValue("input")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("MatchmakingRoom", MatchmakingRoomFragmentSelector)
                )))
        )
val MatchmakingRoomSave = object: OperationDefinition {
    override val name = "MatchmakingRoomSave"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MatchmakingRoomSave(\$input:MatchmakingRoomInput!,\$peerId:ID!){matchmakingRoomSave(input:\$input,peerId:\$peerId){__typename ...MatchmakingRoomFragment}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}"
    override val selector = MatchmakingRoomSaveSelector
}