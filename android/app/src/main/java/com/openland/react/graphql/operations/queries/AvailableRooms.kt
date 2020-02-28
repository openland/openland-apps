package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AvailableRoomsSelector = obj(
            field("alphaUserAvailableRooms", "availableChats", arguments(fieldValue("first", intValue(3)), fieldValue("query", refValue("chatsQuery"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    inline("SharedRoom", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("kind", "kind", notNull(scalar("String"))),
                                        field("title", "title", notNull(scalar("String"))),
                                        field("photo", "photo", notNull(scalar("String"))),
                                        field("membersCount", "membersCount", notNull(scalar("Int"))),
                                        field("membership", "membership", notNull(scalar("String"))),
                                        field("organization", "organization", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("name", "name", notNull(scalar("String"))),
                                                field("photo", "photo", scalar("String"))
                                            )),
                                        field("premiumSettings", "premiumSettings", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("price", "price", notNull(scalar("Int"))),
                                                field("interval", "interval", scalar("String"))
                                            )),
                                        field("isPremium", "isPremium", notNull(scalar("Boolean"))),
                                        field("premiumPassIsActive", "premiumPassIsActive", notNull(scalar("Boolean")))
                                    ))
                                ))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        )))))
                ))),
            field("alphaUserAvailableRooms", "availableChannels", arguments(fieldValue("first", intValue(3)), fieldValue("query", refValue("channelsQuery"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    inline("SharedRoom", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("kind", "kind", notNull(scalar("String"))),
                                        field("title", "title", notNull(scalar("String"))),
                                        field("photo", "photo", notNull(scalar("String"))),
                                        field("membersCount", "membersCount", notNull(scalar("Int"))),
                                        field("membership", "membership", notNull(scalar("String"))),
                                        field("organization", "organization", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("name", "name", notNull(scalar("String"))),
                                                field("photo", "photo", scalar("String"))
                                            )),
                                        field("premiumSettings", "premiumSettings", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("price", "price", notNull(scalar("Int"))),
                                                field("interval", "interval", scalar("String"))
                                            )),
                                        field("isPremium", "isPremium", notNull(scalar("Boolean"))),
                                        field("premiumPassIsActive", "premiumPassIsActive", notNull(scalar("Boolean")))
                                    ))
                                ))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        )))))
                ))),
            field("betaSuggestedRooms", "suggestedRooms", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("kind", "kind", notNull(scalar("String"))),
                        field("title", "title", notNull(scalar("String"))),
                        field("photo", "photo", notNull(scalar("String"))),
                        field("membersCount", "membersCount", notNull(scalar("Int"))),
                        field("membership", "membership", notNull(scalar("String"))),
                        field("organization", "organization", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("name", "name", notNull(scalar("String"))),
                                field("photo", "photo", scalar("String"))
                            )),
                        field("premiumSettings", "premiumSettings", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("price", "price", notNull(scalar("Int"))),
                                field("interval", "interval", scalar("String"))
                            )),
                        field("isPremium", "isPremium", notNull(scalar("Boolean"))),
                        field("premiumPassIsActive", "premiumPassIsActive", notNull(scalar("Boolean")))
                    ))
                ))))),
            field("alphaComunityPrefixSearch", "communities", arguments(fieldValue("first", intValue(3))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("Organization", CommunitySearchSelector)
                                )))
                        )))))
                ))),
            field("betaIsDiscoverDone", "isDiscoverDone", notNull(scalar("Boolean")))
        )
val AvailableRooms = object: OperationDefinition {
    override val name = "AvailableRooms"
    override val kind = OperationKind.QUERY
    override val body = "query AvailableRooms(\$chatsQuery:String,\$channelsQuery:String){availableChats:alphaUserAvailableRooms(first:3,query:\$chatsQuery){__typename edges{__typename node{__typename ... on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}}cursor}}availableChannels:alphaUserAvailableRooms(first:3,query:\$channelsQuery){__typename edges{__typename node{__typename ... on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}}cursor}}suggestedRooms:betaSuggestedRooms{__typename ... on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}}communities:alphaComunityPrefixSearch(first:3){__typename edges{__typename node{__typename ...CommunitySearch}}}isDiscoverDone:betaIsDiscoverDone}fragment CommunitySearch on Organization{__typename id superAccountId name photo isMine about status featured:alphaFeatured membersCount roomsCount:betaPublicRoomsCount}"
    override val selector = AvailableRoomsSelector
}