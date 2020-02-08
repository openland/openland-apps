package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MatchmakingProfileFillSelector = obj(
            field("matchmakingProfileFill", "matchmakingProfileFill", arguments(fieldValue("peerId", refValue("peerId")), fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("MatchmakingProfile", MatchmakingProfileFragmentSelector)
                )))
        )
val MatchmakingProfileFill = object: OperationDefinition {
    override val name = "MatchmakingProfileFill"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MatchmakingProfileFill(\$peerId:ID!,\$input:MatchmakingProfileFillInput!){matchmakingProfileFill(peerId:\$peerId,input:\$input){__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}"
    override val selector = MatchmakingProfileFillSelector
}