package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverEditorsChoiceSelector = obj(
            field("discoverEditorsChoice", "discoverEditorsChoice", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("image", "image", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("uuid", "uuid", notNull(scalar("String"))),
                            field("crop", "crop", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("x", "x", notNull(scalar("Int"))),
                                    field("y", "y", notNull(scalar("Int"))),
                                    field("w", "w", notNull(scalar("Int"))),
                                    field("h", "h", notNull(scalar("Int")))
                                ))
                        ))),
                    field("chat", "chat", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("SharedRoom", DiscoverSharedRoomSelector)
                        )))
                )))))
        )
val DiscoverEditorsChoice = object: OperationDefinition {
    override val name = "DiscoverEditorsChoice"
    override val kind = OperationKind.QUERY
    override val body = "query DiscoverEditorsChoice{discoverEditorsChoice{__typename id image{__typename uuid crop{__typename x y w h}}chat{__typename ...DiscoverSharedRoom}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}"
    override val selector = DiscoverEditorsChoiceSelector
}