package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ExploreRoomsSelector = obj(
            field("discoverPopularNow", "discoverPopularNow", arguments(fieldValue("first", intValue(5))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("SharedRoom", DiscoverSharedRoomSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                ))),
            field("betaSuggestedRooms", "suggestedRooms", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("SharedRoom", DiscoverSharedRoomSelector)
                ))))),
            field("discoverTopPremium", "discoverTopPremium", arguments(fieldValue("first", intValue(5))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("SharedRoom", DiscoverSharedRoomSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                ))),
            field("discoverTopFree", "discoverTopFree", arguments(fieldValue("first", intValue(5))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("SharedRoom", DiscoverSharedRoomSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                ))),
            field("betaIsDiscoverDone", "isDiscoverDone", notNull(scalar("Boolean")))
        )
val ExploreRooms = object: OperationDefinition {
    override val name = "ExploreRooms"
    override val kind = OperationKind.QUERY
    override val body = "query ExploreRooms{discoverPopularNow(first:5){__typename items{__typename ...DiscoverSharedRoom}cursor}suggestedRooms:betaSuggestedRooms{__typename ...DiscoverSharedRoom}discoverTopPremium(first:5){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverTopFree(first:5){__typename items{__typename ...DiscoverSharedRoom}cursor}isDiscoverDone:betaIsDiscoverDone}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}"
    override val selector = ExploreRoomsSelector
}