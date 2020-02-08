package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val FeedChannelWritersSelector = obj(
            field("alphaFeedChannelAdmins", "writers", arguments(fieldValue("id", refValue("id")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("user", "user", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("User", UserShortSelector)
                                ))),
                            field("role", "role", notNull(scalar("String")))
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val FeedChannelWriters = object: OperationDefinition {
    override val name = "FeedChannelWriters"
    override val kind = OperationKind.QUERY
    override val body = "query FeedChannelWriters(\$id:ID!,\$first:Int!,\$after:ID){writers:alphaFeedChannelAdmins(id:\$id,first:\$first,after:\$after){__typename items{__typename user{__typename ...UserShort}role}cursor}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}"
    override val selector = FeedChannelWritersSelector
}