package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MatchmakingProfileSelector = obj(
            field("matchmakingProfile","matchmakingProfile", arguments(fieldValue("peerId", refValue("peerId")), fieldValue("uid", refValue("uid"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("MatchmakingProfile", MatchmakingProfileFragmentSelector)
                ))
        )
val MatchmakingProfile = object: OperationDefinition {
    override val name = "MatchmakingProfile"
    override val kind = OperationKind.QUERY
    override val body = "query MatchmakingProfile(\$peerId:ID!,\$uid:ID!){matchmakingProfile(peerId:\$peerId,uid:\$uid){__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isYou name photo primaryOrganization{__typename id name}}}"
    override val selector = MatchmakingProfileSelector
}