package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuggestedRoomsSelector = obj(
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
                            ))
                    ))
                ))))),
            field("betaIsDiscoverDone", "isDiscoverDone", notNull(scalar("Boolean")))
        )
val SuggestedRooms = object: OperationDefinition {
    override val name = "SuggestedRooms"
    override val kind = OperationKind.QUERY
    override val body = "query SuggestedRooms{suggestedRooms:betaSuggestedRooms{__typename ... on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}}}isDiscoverDone:betaIsDiscoverDone}"
    override val selector = SuggestedRoomsSelector
}