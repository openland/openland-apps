package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ExploreRoomsSelector = obj(
            field("discoverNewAndGrowing", "discoverNewAndGrowing", arguments(fieldValue("first", intValue(3)), fieldValue("seed", refValue("seed"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("SharedRoom", DiscoverSharedRoomSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                ))),
            field("discoverPopularNow", "discoverPopularNow", arguments(fieldValue("first", intValue(3))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("room", "room", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("SharedRoom", DiscoverSharedRoomSelector)
                                ))),
                            field("newMessages", "newMessages", notNull(scalar("Int")))
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
            field("discoverTopOrganizations", "discoverTopOrganizations", arguments(fieldValue("first", intValue(5))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Organization", DiscoverOrganizationSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                ))),
            field("discoverNewAndGrowingOrganizations", "discoverNewAndGrowingOrganizations", arguments(fieldValue("first", intValue(5)), fieldValue("seed", refValue("seed"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Organization", DiscoverOrganizationSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                ))),
            field("betaIsDiscoverDone", "isDiscoverDone", notNull(scalar("Boolean")))
        )
val ExploreRooms = object: OperationDefinition {
    override val name = "ExploreRooms"
    override val kind = OperationKind.QUERY
    override val body = "query ExploreRooms(\$seed:Int!){discoverNewAndGrowing(first:3,seed:\$seed){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverPopularNow(first:3){__typename items{__typename room{__typename ...DiscoverSharedRoom}newMessages}cursor}suggestedRooms:betaSuggestedRooms{__typename ...DiscoverSharedRoom}discoverTopPremium(first:5){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverTopFree(first:5){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverTopOrganizations(first:5){__typename items{__typename ...DiscoverOrganization}cursor}discoverNewAndGrowingOrganizations(first:5,seed:\$seed){__typename items{__typename ...DiscoverOrganization}cursor}isDiscoverDone:betaIsDiscoverDone}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive featured}fragment DiscoverOrganization on Organization{__typename id name photo membersCount shortname featured:alphaFeatured}"
    override val selector = ExploreRoomsSelector
}