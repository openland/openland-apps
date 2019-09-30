package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuggestedRoomsSelector = obj(
            field("betaIsDiscoverDone","isDiscoverDone", notNull(scalar("Boolean"))),
            field("betaSuggestedRooms","suggestedRooms", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("id","id", notNull(scalar("ID"))),
                        field("kind","kind", notNull(scalar("String"))),
                        field("membersCount","membersCount", scalar("Int")),
                        field("membership","membership", notNull(scalar("String"))),
                        field("organization","organization", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String"))),
                                field("photo","photo", scalar("String"))
                            )),
                        field("photo","photo", notNull(scalar("String"))),
                        field("title","title", notNull(scalar("String")))
                    ))
                )))))
        )
val SuggestedRooms = object: OperationDefinition {
    override val name = "SuggestedRooms"
    override val kind = OperationKind.QUERY
    override val body = "query SuggestedRooms{isDiscoverDone:betaIsDiscoverDone suggestedRooms:betaSuggestedRooms{__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}}"
    override val selector = SuggestedRoomsSelector
}