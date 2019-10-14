package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ConferenceWatchSelector = obj(
            field("alphaConferenceWatch", "alphaConferenceWatch", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceFullSelector)
                )))
        )
val ConferenceWatch = object: OperationDefinition {
    override val name = "ConferenceWatch"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription ConferenceWatch(\$id:ID!){alphaConferenceWatch(id:\$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename iceServers{__typename credential urls username}id peers{__typename connection{__typename ice sdp state}id user{__typename ...UserShort}}startTime}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}"
    override val selector = ConferenceWatchSelector
}