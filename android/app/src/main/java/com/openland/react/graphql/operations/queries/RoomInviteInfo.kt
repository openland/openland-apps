package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomInviteInfoSelector = obj(
            field("betaRoomInviteInfo", "invite", arguments(fieldValue("invite", refValue("invite"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
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
                                field("organization", "organization", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        fragment("Organization", OrganizationShortSelector)
                                    )),
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
        )
val RoomInviteInfo = object: OperationDefinition {
    override val name = "RoomInviteInfo"
    override val kind = OperationKind.QUERY
    override val body = "query RoomInviteInfo(\$invite:String!){invite:betaRoomInviteInfo(invite:\$invite){__typename id invitedByUser{__typename ...UserShort}room{__typename ... on SharedRoom{description id isChannel isPro kind matchmaking{__typename enabled}membersCount membership onlineMembersCount organization{__typename ...OrganizationShort}photo previewMembers{__typename id photo}proPassIsActive proSettings{__typename id interval price}socialImage title}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}"
    override val selector = RoomInviteInfoSelector
}