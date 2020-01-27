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
                                field("isPaid", "isPaid", notNull(scalar("Boolean"))),
                                field("kind", "kind", notNull(scalar("String"))),
                                field("matchmaking", "matchmaking", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("enabled", "enabled", notNull(scalar("Boolean")))
                                    )),
                                field("membersCount", "membersCount", notNull(scalar("Int"))),
                                field("membership", "membership", notNull(scalar("String"))),
                                field("organization", "organization", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        fragment("Organization", OrganizationShortSelector)
                                    )),
                                field("paidPassIsActive", "paidPassIsActive", notNull(scalar("Boolean"))),
                                field("paymentSettings", "paymentSettings", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("price", "price", notNull(scalar("Int"))),
                                        field("strategy", "strategy", notNull(scalar("String")))
                                    )),
                                field("photo", "photo", notNull(scalar("String"))),
                                field("socialImage", "socialImage", scalar("String")),
                                field("title", "title", notNull(scalar("String")))
                            ))
                        )))
                ))
        )
val RoomInviteInfo = object: OperationDefinition {
    override val name = "RoomInviteInfo"
    override val kind = OperationKind.QUERY
    override val body = "query RoomInviteInfo(\$invite:String!){invite:betaRoomInviteInfo(invite:\$invite){__typename id invitedByUser{__typename ...UserShort}room{__typename ... on SharedRoom{description id isChannel isPaid kind matchmaking{__typename enabled}membersCount membership organization{__typename ...OrganizationShort}paidPassIsActive paymentSettings{__typename id price strategy}photo socialImage title}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}"
    override val selector = RoomInviteInfoSelector
}