package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ConferenceSelector = obj(
            field("conference","conference", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceFullSelector)
                )))
        )
val Conference = object: OperationDefinition {
    override val name = "Conference"
    override val kind = OperationKind.QUERY
    override val body = "query Conference(\$id:ID!){conference(id:\$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename iceServers{__typename credential urls username}id peers{__typename connection{__typename ice sdp state}id user{__typename ...UserShort}}startTime}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}"
    override val selector = ConferenceSelector
}