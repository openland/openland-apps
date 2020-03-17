package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverCollectionShortSelector = obj(
            field("discoverCollection", "discoverCollection", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String"))),
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
                ))
        )
val DiscoverCollectionShort = object: OperationDefinition {
    override val name = "DiscoverCollectionShort"
    override val kind = OperationKind.QUERY
    override val body = "query DiscoverCollectionShort(\$id:ID!){discoverCollection(id:\$id){__typename id title image{__typename uuid crop{__typename x y w h}}}}"
    override val selector = DiscoverCollectionShortSelector
}