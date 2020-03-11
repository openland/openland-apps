package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverSuggestedRoomsSelector = obj(
            field("betaSuggestedRooms", "suggestedRooms", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("SharedRoom", DiscoverSharedRoomSelector)
                )))))
        )
val DiscoverSuggestedRooms = object: OperationDefinition {
    override val name = "DiscoverSuggestedRooms"
    override val kind = OperationKind.QUERY
    override val body = "query DiscoverSuggestedRooms{suggestedRooms:betaSuggestedRooms{__typename ...DiscoverSharedRoom}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}"
    override val selector = DiscoverSuggestedRoomsSelector
}