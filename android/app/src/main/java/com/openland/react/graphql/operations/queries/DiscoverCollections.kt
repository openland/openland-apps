package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverCollectionsSelector = obj(
            field("discoverCollections", "discoverCollections", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("title", "title", notNull(scalar("String"))),
                            field("chatsCount", "chatsCount", notNull(scalar("Int"))),
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
                                )))
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                ))
        )
val DiscoverCollections = object: OperationDefinition {
    override val name = "DiscoverCollections"
    override val kind = OperationKind.QUERY
    override val body = "query DiscoverCollections(\$first:Int!,\$after:String){discoverCollections(first:\$first,after:\$after){__typename items{__typename id title chatsCount image{__typename uuid crop{__typename x y w h}}}cursor}}"
    override val selector = DiscoverCollectionsSelector
}