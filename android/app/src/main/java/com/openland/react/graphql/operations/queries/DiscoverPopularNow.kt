package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverPopularNowSelector = obj(
            field("discoverPopularNow", "discoverPopularNow", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("room", "room", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("SharedRoom", DiscoverSharedRoomSelector)
                                ))),
                            field("newMessages", "newMessages", notNull(scalar("Int")))
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val DiscoverPopularNow = object: OperationDefinition {
    override val name = "DiscoverPopularNow"
    override val kind = OperationKind.QUERY
    override val body = "query DiscoverPopularNow(\$first:Int!,\$after:String){discoverPopularNow(first:\$first,after:\$after){__typename items{__typename room{__typename ...DiscoverSharedRoom}newMessages}cursor}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}"
    override val selector = DiscoverPopularNowSelector
}