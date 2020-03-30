package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverCollectionsCreateSelector = obj(
            field("discoverCollectionsCreate", "discoverCollectionsCreate", arguments(fieldValue("collection", objectValue(fieldValue("title", refValue("title")),fieldValue("description", refValue("description")),fieldValue("image", refValue("image")),fieldValue("chatIds", refValue("chatIds"))))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String")))
                )))
        )
val DiscoverCollectionsCreate = object: OperationDefinition {
    override val name = "DiscoverCollectionsCreate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation DiscoverCollectionsCreate(\$title:String!,\$description:String,\$image:ImageRefInput!,\$chatIds:[ID!]!){discoverCollectionsCreate(collection:{title:\$title,description:\$description,image:\$image,chatIds:\$chatIds}){__typename id title}}"
    override val selector = DiscoverCollectionsCreateSelector
}