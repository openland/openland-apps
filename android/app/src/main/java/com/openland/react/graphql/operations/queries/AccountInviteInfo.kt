package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AccountInviteInfoSelector = obj(
            field("alphaInviteInfo", "invite", arguments(fieldValue("key", refValue("inviteKey"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("creator", "creator", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )),
                    field("forEmail", "forEmail", scalar("String")),
                    field("forName", "forName", scalar("String")),
                    field("id", "id", notNull(scalar("ID"))),
                    field("joined", "joined", notNull(scalar("Boolean"))),
                    field("key", "key", notNull(scalar("String"))),
                    field("membersCount", "membersCount", scalar("Int")),
                    field("orgId", "orgId", notNull(scalar("ID"))),
                    field("organization", "organization", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("about", "about", scalar("String")),
                            field("alphaIsCommunity", "isCommunity", notNull(scalar("Boolean"))),
                            field("id", "id", notNull(scalar("ID")))
                        )),
                    field("photo", "photo", scalar("String")),
                    field("title", "title", notNull(scalar("String")))
                ))
        )
val AccountInviteInfo = object: OperationDefinition {
    override val name = "AccountInviteInfo"
    override val kind = OperationKind.QUERY
    override val body = "query AccountInviteInfo(\$inviteKey:String!){invite:alphaInviteInfo(key:\$inviteKey){__typename creator{__typename ...UserShort}forEmail forName id joined key membersCount orgId organization{__typename about isCommunity:alphaIsCommunity id}photo title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}"
    override val selector = AccountInviteInfoSelector
}