package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AccountAppInviteInfoSelector = obj(
            field("alphaInviteInfo", "invite", arguments(fieldValue("key", refValue("inviteKey"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("creator", "creator", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )),
                    field("id", "id", notNull(scalar("ID")))
                )),
            field("appInviteInfo", "appInvite", arguments(fieldValue("key", refValue("inviteKey"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("inviter", "inviter", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))
                ))
        )
val AccountAppInviteInfo = object: OperationDefinition {
    override val name = "AccountAppInviteInfo"
    override val kind = OperationKind.QUERY
    override val body = "query AccountAppInviteInfo(\$inviteKey:String!){invite:alphaInviteInfo(key:\$inviteKey){__typename creator{__typename ...UserShort}id}appInvite:appInviteInfo(key:\$inviteKey){__typename inviter{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}"
    override val selector = AccountAppInviteInfoSelector
}