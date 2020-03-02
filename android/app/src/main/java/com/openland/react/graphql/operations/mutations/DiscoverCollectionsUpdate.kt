package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverCollectionsUpdateSelector = obj(
            field("discoverCollectionsUpdate", "discoverCollectionsUpdate", arguments(fieldValue("id", refValue("id")), fieldValue("input", objectValue(fieldValue("title", refValue("title")),fieldValue("image", refValue("image")),fieldValue("chatIds", refValue("chatIds"))))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String")))
                )))
        )
val DiscoverCollectionsUpdate = object: OperationDefinition {
    override val name = "DiscoverCollectionsUpdate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation DiscoverCollectionsUpdate(\$id:ID!,\$title:String!,\$image:ImageRefInput!,\$chatIds:[ID!]!){discoverCollectionsUpdate(id:\$id,input:{title:\$title,image:\$image,chatIds:\$chatIds}){__typename id title}}"
    override val selector = DiscoverCollectionsUpdateSelector
}