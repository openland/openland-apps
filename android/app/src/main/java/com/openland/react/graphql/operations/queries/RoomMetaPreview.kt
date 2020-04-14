package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomMetaPreviewSelector = obj(
            field("alphaResolveShortName", "alphaResolveShortName", arguments(fieldValue("shortname", refValue("shortname"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("title", "title", notNull(scalar("String"))),
                        field("description", "description", scalar("String")),
                        field("photo", "photo", notNull(scalar("String"))),
                        field("socialImage", "socialImage", scalar("String"))
                    ))
                )),
            field("roomSocialImage", "roomSocialImage", arguments(fieldValue("roomId", refValue("id"))), scalar("String"))
        )
val RoomMetaPreview = object: OperationDefinition {
    override val name = "RoomMetaPreview"
    override val kind = OperationKind.QUERY
    override val body = "query RoomMetaPreview(\$shortname:String!,\$id:ID!){alphaResolveShortName(shortname:\$shortname){__typename ... on SharedRoom{__typename id title description photo socialImage}}roomSocialImage(roomId:\$id)}"
    override val selector = RoomMetaPreviewSelector
}