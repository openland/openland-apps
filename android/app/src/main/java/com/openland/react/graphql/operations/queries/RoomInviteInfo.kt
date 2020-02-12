package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomInviteInfoSelector = obj(
            field("betaRoomInviteInfo", "invite", arguments(fieldValue("invite", refValue("invite"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
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
                                field("organization", "organization", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        fragment("Organization", OrganizationShortSelector)
                                    )),
                                field("membership", "membership", notNull(scalar("String"))),
                                field("membersCount", "membersCount", notNull(scalar("Int"))),
                                field("onlineMembersCount", "onlineMembersCount", notNull(scalar("Int"))),
                                field("previewMembers", "previewMembers", notNull(list(notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("photo", "photo", scalar("String")),
                                        field("name", "name", notNull(scalar("String")))
                                    ))))),
                                field("matchmaking", "matchmaking", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("enabled", "enabled", notNull(scalar("Boolean")))
                                    )),
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
                                        field("id", "id", notNull(scalar("ID")))
                                    ))
                            ))
                        ))),
                    field("invitedByUser", "invitedByUser", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))
                ))
        )
val RoomInviteInfo = object: OperationDefinition {
    override val name = "RoomInviteInfo"
    override val kind = OperationKind.QUERY
    override val body = "query RoomInviteInfo(\$invite:String!){invite:betaRoomInviteInfo(invite:\$invite){__typename id room{__typename ... on SharedRoom{__typename id kind isChannel title photo socialImage description organization{__typename ...OrganizationShort}membership membersCount onlineMembersCount previewMembers{__typename id photo name}matchmaking{__typename enabled}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id}}}invitedByUser{__typename ...UserShort}}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}"
    override val selector = RoomInviteInfoSelector
}