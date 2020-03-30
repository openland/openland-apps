package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverCollectionsShortSelector = obj(
            field("discoverCollections", "discoverCollections", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("DiscoverChatsCollection", DiscoverChatsCollectionShortSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                ))
        )
val DiscoverCollectionsShort = object: OperationDefinition {
    override val name = "DiscoverCollectionsShort"
    override val kind = OperationKind.QUERY
    override val body = "query DiscoverCollectionsShort(\$first:Int!,\$after:String){discoverCollections(first:\$first,after:\$after){__typename items{__typename ...DiscoverChatsCollectionShort}cursor}}fragment DiscoverChatsCollectionShort on DiscoverChatsCollection{__typename id title chatsCount description image{__typename uuid crop{__typename x y w h}}}"
    override val selector = DiscoverCollectionsShortSelector
}