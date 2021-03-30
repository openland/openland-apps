package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AccountInviteInfoSelector = obj(
            field("alphaInviteInfo", "invite", arguments(fieldValue("key", refValue("inviteKey"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("key", "key", notNull(scalar("String"))),
                    field("orgId", "orgId", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String"))),
                    field("photo", "photo", scalar("String")),
                    field("joined", "joined", notNull(scalar("Boolean"))),
                    field("creator", "creator", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserSmallSelector)
                        )),
                    field("forEmail", "forEmail", scalar("String")),
                    field("forName", "forName", scalar("String")),
                    field("membersCount", "membersCount", scalar("Int")),
                    field("organization", "organization", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("alphaIsCommunity", "isCommunity", notNull(scalar("Boolean"))),
                            field("about", "about", scalar("String"))
                        ))
                ))
        )
val AccountInviteInfo = object: OperationDefinition {
    override val name = "AccountInviteInfo"
    override val kind = OperationKind.QUERY
    override val body = "query AccountInviteInfo(\$inviteKey:String!){invite:alphaInviteInfo(key:\$inviteKey){__typename id key orgId title photo joined creator{__typename ...UserSmall}forEmail forName membersCount organization{__typename id isCommunity:alphaIsCommunity about}}}fragment UserSmall on User{__typename id name firstName photo shortname isBot}"
    override val selector = AccountInviteInfoSelector
}