package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomFeaturedMembersSelector = obj(
            field("roomFeaturedMembers","roomFeaturedMembers", arguments(fieldValue("roomId", refValue("roomId"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("badge","badge", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("UserBadge", UserBadgeSelector)
                        )),
                    field("canKick","canKick", notNull(scalar("Boolean"))),
                    field("membership","membership", notNull(scalar("String"))),
                    field("role","role", notNull(scalar("String"))),
                    field("user","user", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))
                )))))
        )
val RoomFeaturedMembers = object: OperationDefinition {
    override val name = "RoomFeaturedMembers"
    override val kind = OperationKind.QUERY
    override val body = "query RoomFeaturedMembers(\$roomId:ID!){roomFeaturedMembers(roomId:\$roomId){__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}}fragment UserBadge on UserBadge{__typename id name verified}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}"
    override val selector = RoomFeaturedMembersSelector
}