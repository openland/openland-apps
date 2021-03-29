package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val BlackListUpdatesSelector = obj(
            field("blackListUpdates", "blackListUpdates", arguments(fieldValue("fromState", refValue("fromState"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("state", "state", notNull(scalar("String"))),
                    field("updates", "updates", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            inline("BlackListAdded", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("bannedBy", "bannedBy", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        fragment("User", UserShortSelector)
                                    ))),
                                field("bannedUser", "bannedUser", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        fragment("User", UserShortSelector)
                                    )))
                            )),
                            inline("BlackListRemoved", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("bannedBy", "bannedBy", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        fragment("User", UserShortSelector)
                                    ))),
                                field("bannedUser", "bannedUser", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        fragment("User", UserShortSelector)
                                    )))
                            ))
                        )))))
                )))
        )
val BlackListUpdates = object: OperationDefinition {
    override val name = "BlackListUpdates"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription BlackListUpdates(\$fromState:String!){blackListUpdates(fromState:\$fromState){__typename state updates{__typename ... on BlackListAdded{__typename bannedBy{__typename ...UserShort}bannedUser{__typename ...UserShort}}... on BlackListRemoved{__typename bannedBy{__typename ...UserShort}bannedUser{__typename ...UserShort}}}}}fragment UserShort on User{__typename id name firstName photo online lastSeen isBot shortname primaryOrganization{__typename id name shortname}}"
    override val selector = BlackListUpdatesSelector
}