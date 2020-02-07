package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AvailableRoomsSelector = obj(
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
            field("alphaUserAvailableRooms", "availableChats", arguments(fieldValue("first", intValue(3)), fieldValue("query", refValue("chatsQuery"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("cursor", "cursor", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    inline("SharedRoom", obj(
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("kind", "kind", notNull(scalar("String"))),
                                        field("membersCount", "membersCount", notNull(scalar("Int"))),
                                        field("membership", "membership", notNull(scalar("String"))),
                                        field("organization", "organization", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("name", "name", notNull(scalar("String"))),
                                                field("photo", "photo", scalar("String"))
                                            )),
                                        field("photo", "photo", notNull(scalar("String"))),
                                        field("title", "title", notNull(scalar("String")))
                                    ))
                                )))
                        )))))
                ))),
            field("alphaUserAvailableRooms", "availableChannels", arguments(fieldValue("first", intValue(3)), fieldValue("query", refValue("channelsQuery"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("cursor", "cursor", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    inline("SharedRoom", obj(
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("kind", "kind", notNull(scalar("String"))),
                                        field("membersCount", "membersCount", notNull(scalar("Int"))),
                                        field("membership", "membership", notNull(scalar("String"))),
                                        field("organization", "organization", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("name", "name", notNull(scalar("String"))),
                                                field("photo", "photo", scalar("String"))
                                            )),
                                        field("photo", "photo", notNull(scalar("String"))),
                                        field("title", "title", notNull(scalar("String")))
                                    ))
                                )))
                        )))))
                ))),
            field("betaIsDiscoverDone", "isDiscoverDone", notNull(scalar("Boolean"))),
            field("betaSuggestedRooms", "suggestedRooms", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("id", "id", notNull(scalar("ID"))),
                        field("kind", "kind", notNull(scalar("String"))),
                        field("membersCount", "membersCount", notNull(scalar("Int"))),
                        field("membership", "membership", notNull(scalar("String"))),
                        field("organization", "organization", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("name", "name", notNull(scalar("String"))),
                                field("photo", "photo", scalar("String"))
                            )),
                        field("photo", "photo", notNull(scalar("String"))),
                        field("title", "title", notNull(scalar("String")))
                    ))
                )))))
        )
val AvailableRooms = object: OperationDefinition {
    override val name = "AvailableRooms"
    override val kind = OperationKind.QUERY
    override val body = "query AvailableRooms(\$channelsQuery:String,\$chatsQuery:String){communities:alphaComunityPrefixSearch(first:3){__typename edges{__typename node{__typename ...CommunitySearch}}}availableChats:alphaUserAvailableRooms(first:3,query:\$chatsQuery){__typename edges{__typename cursor node{__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}}}availableChannels:alphaUserAvailableRooms(first:3,query:\$channelsQuery){__typename edges{__typename cursor node{__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}}}isDiscoverDone:betaIsDiscoverDone suggestedRooms:betaSuggestedRooms{__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}}fragment CommunitySearch on Organization{__typename about featured:alphaFeatured roomsCount:betaPublicRoomsCount id isMine membersCount name photo status superAccountId}"
    override val selector = AvailableRoomsSelector
}