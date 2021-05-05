package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AccountAppInviteInfoSelector = obj(
            field("alphaInviteInfo", "invite", arguments(fieldValue("key", refValue("inviteKey"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("creator", "creator", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserSmallSelector)
                        ))
                )),
            field("appInviteInfo", "appInvite", arguments(fieldValue("key", refValue("inviteKey"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("inviter", "inviter", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserSmallSelector)
                        )))
                ))
        )
val AccountAppInviteInfo = object: OperationDefinition {
    override val name = "AccountAppInviteInfo"
    override val kind = OperationKind.QUERY
    override val body = "query AccountAppInviteInfo(\$inviteKey:String!){invite:alphaInviteInfo(key:\$inviteKey){__typename id creator{__typename ...UserSmall}}appInvite:appInviteInfo(key:\$inviteKey){__typename inviter{__typename ...UserSmall}}}fragment UserSmall on User{__typename id name firstName photo shortname isBot systemBadge}"
    override val selector = AccountAppInviteInfoSelector
}