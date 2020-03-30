package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverCollectionSelector = obj(
            field("discoverCollection", "discoverCollection", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String"))),
                    field("description", "description", scalar("String")),
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
                    field("chats", "chats", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("SharedRoom", DiscoverSharedRoomSelector)
                        )))))
                ))
        )
val DiscoverCollection = object: OperationDefinition {
    override val name = "DiscoverCollection"
    override val kind = OperationKind.QUERY
    override val body = "query DiscoverCollection(\$id:ID!){discoverCollection(id:\$id){__typename id title description image{__typename uuid crop{__typename x y w h}}chats{__typename ...DiscoverSharedRoom}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}"
    override val selector = DiscoverCollectionSelector
}