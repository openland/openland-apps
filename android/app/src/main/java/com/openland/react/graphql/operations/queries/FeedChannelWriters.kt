package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedChannelWritersSelector = obj(
            field("alphaFeedChannelAdmins","writers", arguments(fieldValue("after", refValue("after")), fieldValue("first", refValue("first")), fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("cursor","cursor", scalar("String")),
                    field("items","items", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("role","role", notNull(scalar("String"))),
                            field("user","user", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("User", UserShortSelector)
                                )))
                        )))))
                )))
        )
val FeedChannelWriters = object: OperationDefinition {
    override val name = "FeedChannelWriters"
    override val kind = OperationKind.QUERY
    override val body = "query FeedChannelWriters(\$after:ID,\$first:Int!,\$id:ID!){writers:alphaFeedChannelAdmins(after:\$after,first:\$first,id:\$id){__typename cursor items{__typename role user{__typename ...UserShort}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}"
    override val selector = FeedChannelWritersSelector
}