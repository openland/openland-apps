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
    override val body = "query MyContacts(\$first:Int!,\$after:String){myContacts(first:\$first,after:\$after){__typename items{__typename id user{__typename ...UserShort}}cursor}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts isBanned isMeBanned primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite featured:alphaFeatured}"
    override val selector = MyContactsSelector
}