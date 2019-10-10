package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MatchmakingProfileFillSelector = obj(
            field("matchmakingProfileFill","matchmakingProfileFill", arguments(fieldValue("input", refValue("input")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("MatchmakingProfile", MatchmakingProfileFragmentSelector)
                )))
        )
val MatchmakingProfileFill = object: OperationDefinition {
    override val name = "MatchmakingProfileFill"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MatchmakingProfileFill(\$input:MatchmakingProfileFillInput!,\$peerId:ID!){matchmakingProfileFill(input:\$input,peerId:\$peerId){__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isYou name photo primaryOrganization{__typename id name}}}"
    override val selector = MatchmakingProfileFillSelector
}