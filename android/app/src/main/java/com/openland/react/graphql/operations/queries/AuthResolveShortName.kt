package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AuthResolveShortNameSelector = obj(
            field("alphaResolveShortName", "item", arguments(fieldValue("shortname", refValue("shortname"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("User", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("name", "name", notNull(scalar("String"))),
                        field("firstName", "firstName", notNull(scalar("String"))),
                        field("lastName", "lastName", scalar("String")),
                        field("photo", "photo", scalar("String")),
                        field("online", "online", notNull(scalar("Boolean")))
                    )),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("SharedRoom", SharedRoomPreviewSelector)
                    )),
                    inline("DiscoverChatsCollection", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    ))
                ))
        )
val AuthResolveShortName = object: OperationDefinition {
    override val name = "AuthResolveShortName"
    override val kind = OperationKind.QUERY
    override val body = "query AuthResolveShortName(\$shortname:String!){item:alphaResolveShortName(shortname:\$shortname){__typename ... on User{__typename id name firstName lastName photo online}... on SharedRoom{__typename ...SharedRoomPreview}... on DiscoverChatsCollection{__typename id}}}fragment SharedRoomPreview on SharedRoom{__typename id isChannel isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}membership owner{__typename id}title photo membersCount description previewMembers{__typename id name photo}}"
    override val selector = AuthResolveShortNameSelector
}