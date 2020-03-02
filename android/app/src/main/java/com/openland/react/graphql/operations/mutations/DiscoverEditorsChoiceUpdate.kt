package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverEditorsChoiceUpdateSelector = obj(
            field("discoverEditorsChoiceUpdate", "discoverEditorsChoiceUpdate", arguments(fieldValue("id", refValue("id")), fieldValue("input", objectValue(fieldValue("image", refValue("image")),fieldValue("cid", refValue("cid"))))), notNull(obj(
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
                            field("id", "id", notNull(scalar("ID"))),
                            field("title", "title", notNull(scalar("String")))
                        )))
                )))
        )
val DiscoverEditorsChoiceUpdate = object: OperationDefinition {
    override val name = "DiscoverEditorsChoiceUpdate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation DiscoverEditorsChoiceUpdate(\$id:ID!,\$image:ImageRefInput!,\$cid:ID!){discoverEditorsChoiceUpdate(id:\$id,input:{image:\$image,cid:\$cid}){__typename id image{__typename uuid crop{__typename x y w h}}chat{__typename id title}}}"
    override val selector = DiscoverEditorsChoiceUpdateSelector
}