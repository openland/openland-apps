package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyBlackListSelector = obj(
            field("myBlackList", "myBlackList", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("isBanned", "isBanned", notNull(scalar("Boolean"))),
                    field("isMeBanned", "isMeBanned", notNull(scalar("Boolean"))),
                    fragment("User", UserShortSelector)
                )))))
        )
val MyBlackList = object: OperationDefinition {
    override val name = "MyBlackList"
    override val kind = OperationKind.QUERY
    override val body = "query MyBlackList{myBlackList{__typename ...UserShort isBanned isMeBanned}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot systemBadge}"
    override val selector = MyBlackListSelector
}