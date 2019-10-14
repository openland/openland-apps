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
            field("betaIsDiscoverDone", "isDiscoverDone", notNull(scalar("Boolean"))),
            field("betaSuggestedRooms", "suggestedRooms", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("id", "id", notNull(scalar("ID"))),
                        field("kind", "kind", notNull(scalar("String"))),
                        field("membersCount", "membersCount", scalar("Int")),
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
                ))))),
            field("betaUserAvailableRooms", "availableChats", arguments(fieldValue("isChannel", boolValue(false)), fieldValue("limit", intValue(3))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("id", "id", notNull(scalar("ID"))),
                        field("kind", "kind", notNull(scalar("String"))),
                        field("membersCount", "membersCount", scalar("Int")),
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
                ))))),
            field("betaUserAvailableRooms", "availableChannels", arguments(fieldValue("isChannel", boolValue(true)), fieldValue("limit", intValue(3))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("id", "id", notNull(scalar("ID"))),
                        field("kind", "kind", notNull(scalar("String"))),
                        field("membersCount", "membersCount", scalar("Int")),
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
    override val body = "query AvailableRooms{communities:alphaComunityPrefixSearch(first:3){__typename edges{__typename node{__typename ...CommunitySearch}}}isDiscoverDone:betaIsDiscoverDone suggestedRooms:betaSuggestedRooms{__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}availableChats:betaUserAvailableRooms(isChannel:false,limit:3){__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}availableChannels:betaUserAvailableRooms(isChannel:true,limit:3){__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}}fragment CommunitySearch on Organization{__typename about featured:alphaFeatured betaPublicRooms{__typename id}id isMine membersCount name photo status superAccountId}"
    override val selector = AvailableRoomsSelector
}