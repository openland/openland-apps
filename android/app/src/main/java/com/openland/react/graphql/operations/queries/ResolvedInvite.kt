package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ResolvedInviteSelector = obj(
            field("alphaResolveInvite", "invite", arguments(fieldValue("key", refValue("key"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("InviteInfo", obj(
                        field("creator", "creator", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            )),
                        field("id", "id", notNull(scalar("ID"))),
                        field("orgId", "orgId", notNull(scalar("ID"))),
                        field("organization", "organization", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("about", "about", scalar("String")),
                                field("alphaIsCommunity", "isCommunity", notNull(scalar("Boolean"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("membersCount", "membersCount", notNull(scalar("Int"))),
                                field("name", "name", notNull(scalar("String"))),
                                field("photo", "photo", scalar("String"))
                            )),
                        field("title", "title", notNull(scalar("String")))
                    )),
                    inline("AppInvite", obj(
                        field("inviter", "inviter", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            )))
                    )),
                    inline("RoomInvite", obj(
                        field("id", "id", notNull(scalar("ID"))),
                        field("invitedByUser", "invitedByUser", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            ))),
                        field("room", "room", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                inline("SharedRoom", obj(
                                    field("description", "description", scalar("String")),
                                    field("id", "id", notNull(scalar("ID"))),
                                    field("isChannel", "isChannel", notNull(scalar("Boolean"))),
                                    field("isPro", "isPro", notNull(scalar("Boolean"))),
                                    field("kind", "kind", notNull(scalar("String"))),
                                    field("matchmaking", "matchmaking", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("enabled", "enabled", notNull(scalar("Boolean")))
                                        )),
                                    field("membersCount", "membersCount", notNull(scalar("Int"))),
                                    field("membership", "membership", notNull(scalar("String"))),
                                    field("onlineMembersCount", "onlineMembersCount", notNull(scalar("Int"))),
                                    field("photo", "photo", notNull(scalar("String"))),
                                    field("previewMembers", "previewMembers", notNull(list(notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("id", "id", notNull(scalar("ID"))),
                                            field("photo", "photo", scalar("String"))
                                        ))))),
                                    field("proPassIsActive", "proPassIsActive", notNull(scalar("Boolean"))),
                                    field("proSettings", "proSettings", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("id", "id", notNull(scalar("ID"))),
                                            field("interval", "interval", notNull(scalar("String"))),
                                            field("price", "price", notNull(scalar("Int")))
                                        )),
                                    field("socialImage", "socialImage", scalar("String")),
                                    field("title", "title", notNull(scalar("String")))
                                ))
                            )))
                    ))
                ))
        )
val ResolvedInvite = object: OperationDefinition {
    override val name = "ResolvedInvite"
    override val kind = OperationKind.QUERY
    override val body = "query ResolvedInvite(\$key:String!){invite:alphaResolveInvite(key:\$key){__typename ... on InviteInfo{creator{__typename ...UserShort}id orgId organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo}title}... on AppInvite{inviter{__typename ...UserShort}}... on RoomInvite{id invitedByUser{__typename ...UserShort}room{__typename ... on SharedRoom{description id isChannel isPro kind matchmaking{__typename enabled}membersCount membership onlineMembersCount photo previewMembers{__typename id photo}proPassIsActive proSettings{__typename id interval price}socialImage title}}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}"
    override val selector = ResolvedInviteSelector
}