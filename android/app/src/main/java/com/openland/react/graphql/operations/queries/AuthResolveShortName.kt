package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AuthResolveShortNameSelector = obj(
            field("alphaResolveShortName", "item", arguments(fieldValue("shortname", refValue("shortname"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("User", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("User", UserNanoSelector)
                    )),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("Room", RoomPreviewSelector)
                    ))
                ))
        )
val AuthResolveShortName = object: OperationDefinition {
    override val name = "AuthResolveShortName"
    override val kind = OperationKind.QUERY
    override val body = "query AuthResolveShortName(\$shortname:String!){item:alphaResolveShortName(shortname:\$shortname){__typename ... on User{__typename ...UserNano}... on SharedRoom{__typename ...RoomPreview}}}fragment UserNano on User{__typename id name firstName lastName photo online}fragment RoomPreview on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}}... on SharedRoom{__typename id isChannel isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}membership owner{__typename id}matchmaking{__typename enabled}title photo membersCount description previewMembers{__typename id name photo}onlineMembersCount}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}"
    override val selector = AuthResolveShortNameSelector
}