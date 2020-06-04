package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ResolvedInviteSelector = obj(
            field("alphaResolveInvite", "invite", arguments(fieldValue("key", refValue("key"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("InviteInfo", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("orgId", "orgId", notNull(scalar("ID"))),
                        field("title", "title", notNull(scalar("String"))),
                        field("creator", "creator", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            )),
                        field("organization", "organization", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("photo", "photo", scalar("String")),
                                field("name", "name", notNull(scalar("String"))),
                                field("membersCount", "membersCount", notNull(scalar("Int"))),
                                field("about", "about", scalar("String")),
                                field("alphaIsCommunity", "isCommunity", notNull(scalar("Boolean")))
                            ))
                    )),
                    inline("AppInvite", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("inviter", "inviter", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            )))
                    )),
                    inline("RoomInvite", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("invitedByUser", "invitedByUser", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            ))),
                        field("room", "room", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                inline("SharedRoom", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("ID"))),
                                    field("kind", "kind", notNull(scalar("String"))),
                                    field("isChannel", "isChannel", notNull(scalar("Boolean"))),
                                    field("title", "title", notNull(scalar("String"))),
                                    field("photo", "photo", notNull(scalar("String"))),
                                    field("socialImage", "socialImage", scalar("String")),
                                    field("description", "description", scalar("String")),
                                    field("membership", "membership", notNull(scalar("String"))),
                                    field("membersCount", "membersCount", notNull(scalar("Int"))),
                                    field("onlineMembersCount", "onlineMembersCount", notNull(scalar("Int"))),
                                    field("previewMembers", "previewMembers", notNull(list(notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("id", "id", notNull(scalar("ID"))),
                                            field("photo", "photo", scalar("String")),
                                            field("name", "name", notNull(scalar("String")))
                                        ))))),
                                    field("isPremium", "isPremium", notNull(scalar("Boolean"))),
                                    field("premiumPassIsActive", "premiumPassIsActive", notNull(scalar("Boolean"))),
                                    field("premiumSubscription", "premiumSubscription", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("id", "id", notNull(scalar("ID"))),
                                            field("state", "state", notNull(scalar("String")))
                                        )),
                                    field("premiumSettings", "premiumSettings", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("id", "id", notNull(scalar("ID"))),
                                            field("price", "price", notNull(scalar("Int"))),
                                            field("interval", "interval", scalar("String"))
                                        )),
                                    field("owner", "owner", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("id", "id", notNull(scalar("ID"))),
                                            field("firstName", "firstName", notNull(scalar("String")))
                                        ))
                                ))
                            )))
                    ))
                )),
            field("alphaResolveShortName", "shortnameItem", arguments(fieldValue("shortname", refValue("key"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("Room", RoomPreviewSelector)
                    ))
                ))
        )
val ResolvedInvite = object: OperationDefinition {
    override val name = "ResolvedInvite"
    override val kind = OperationKind.QUERY
    override val body = "query ResolvedInvite(\$key:String!){invite:alphaResolveInvite(key:\$key){__typename ... on InviteInfo{__typename id orgId title creator{__typename ...UserShort}organization{__typename id photo name membersCount about isCommunity:alphaIsCommunity}}... on AppInvite{__typename inviter{__typename ...UserShort}}... on RoomInvite{__typename id invitedByUser{__typename ...UserShort}room{__typename ... on SharedRoom{__typename id kind isChannel title photo socialImage description membership membersCount onlineMembersCount previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}}}shortnameItem:alphaResolveShortName(shortname:\$key){__typename ... on SharedRoom{__typename ...RoomPreview}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment RoomPreview on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}}... on SharedRoom{__typename id isChannel isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}membership owner{__typename id}title photo membersCount description previewMembers{__typename id name photo}onlineMembersCount}}"
    override val selector = ResolvedInviteSelector
}