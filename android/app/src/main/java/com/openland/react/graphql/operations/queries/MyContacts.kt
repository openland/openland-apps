package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyContactsSelector = obj(
            field("myContacts", "myContacts", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("user", "user", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("User", UserShortSelector)
                                )))
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val MyContacts = object: OperationDefinition {
    override val name = "MyContacts"
    override val kind = OperationKind.QUERY
    override val body = "query MyContacts(\$first:Int!,\$after:String){myContacts(first:\$first,after:\$after){__typename items{__typename id user{__typename ...UserShort}}cursor}}fragment UserShort on User{__typename id name firstName photo online lastSeen isBot shortname}"
    override val selector = MyContactsSelector
}