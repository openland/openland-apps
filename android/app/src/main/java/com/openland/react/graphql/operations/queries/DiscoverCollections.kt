package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverCollectionsSelector = obj(
            field("discoverCollections", "discoverCollections", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("DiscoverChatsCollection", DiscoverChatsCollectionSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                ))
        )
val DiscoverCollections = object: OperationDefinition {
    override val name = "DiscoverCollections"
    override val kind = OperationKind.QUERY
    override val body = "query DiscoverCollections(\$first:Int!,\$after:String){discoverCollections(first:\$first,after:\$after){__typename items{__typename ...DiscoverChatsCollection}cursor}}fragment DiscoverChatsCollection on DiscoverChatsCollection{__typename id title chatsCount chats{__typename ...DiscoverSharedRoom}description image{__typename uuid crop{__typename x y w h}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}"
    override val selector = DiscoverCollectionsSelector
}