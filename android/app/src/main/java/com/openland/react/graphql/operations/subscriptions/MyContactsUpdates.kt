package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyContactsUpdatesSelector = obj(
            field("myContactsUpdates", "myContactsUpdates", arguments(fieldValue("fromState", refValue("state"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("updates", "updates", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            inline("ContactRemoved", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("contact", "contact", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("user", "user", notNull(obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                fragment("User", UserShortSelector)
                                            )))
                                    )))
                            )),
                            inline("ContactAdded", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("contact", "contact", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("user", "user", notNull(obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                fragment("User", UserShortSelector)
                                            )))
                                    )))
                            ))
                        ))))),
                    field("state", "state", notNull(scalar("String")))
                )))
        )
val MyContactsUpdates = object: OperationDefinition {
    override val name = "MyContactsUpdates"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription MyContactsUpdates(\$state:String!){myContactsUpdates(fromState:\$state){__typename updates{__typename ... on ContactRemoved{__typename contact{__typename id user{__typename ...UserShort}}}... on ContactAdded{__typename contact{__typename id user{__typename ...UserShort}}}}state}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot systemBadge}"
    override val selector = MyContactsUpdatesSelector
}