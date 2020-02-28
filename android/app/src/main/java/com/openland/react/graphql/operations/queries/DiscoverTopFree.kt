package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DiscoverTopFreeSelector = obj(
            field("discoverTopFree", "discoverTopFree", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("SharedRoom", DiscoverSharedRoomSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val DiscoverTopFree = object: OperationDefinition {
    override val name = "DiscoverTopFree"
    override val kind = OperationKind.QUERY
    override val body = "query DiscoverTopFree(\$first:Int!,\$after:String){discoverTopFree(first:\$first,after:\$after){__typename items{__typename ...DiscoverSharedRoom}cursor}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}"
    override val selector = DiscoverTopFreeSelector
}