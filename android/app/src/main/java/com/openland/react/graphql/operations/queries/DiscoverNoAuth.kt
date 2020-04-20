package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverNoAuthSelector = obj(
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
            field("discoverCollections", "discoverCollections", arguments(fieldValue("first", intValue(20))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("DiscoverChatsCollection", DiscoverChatsCollectionShortSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )),
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
val DiscoverNoAuth = object: OperationDefinition {
    override val name = "DiscoverNoAuth"
    override val kind = OperationKind.QUERY
    override val body = "query DiscoverNoAuth(\$seed:Int!){discoverNewAndGrowing(first:3,seed:\$seed){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverPopularNow(first:3){__typename items{__typename room{__typename ...DiscoverSharedRoom}newMessages}cursor}discoverTopPremium(first:5){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverTopFree(first:5){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverCollections(first:20){__typename items{__typename ...DiscoverChatsCollectionShort}cursor}discoverEditorsChoice{__typename id image{__typename uuid crop{__typename x y w h}}chat{__typename ...DiscoverSharedRoom}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}fragment DiscoverChatsCollectionShort on DiscoverChatsCollection{__typename id title shortname chatsCount description image{__typename uuid crop{__typename x y w h}}}"
    override val selector = DiscoverNoAuthSelector
}