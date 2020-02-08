package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChatMentionSearchSelector = obj(
            field("chatMentionSearch", "mentions", arguments(fieldValue("cid", refValue("cid")), fieldValue("query", refValue("query")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("globalItems", "globalItems", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            inline("Organization", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("Organization", OrganizationShortSelector)
                            )),
                            inline("User", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("User", UserForMentionSelector)
                            )),
                            inline("SharedRoom", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("SharedRoom", RoomSharedNanoSelector)
                            ))
                        ))))),
                    field("localItems", "localItems", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserForMentionSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val ChatMentionSearch = object: OperationDefinition {
    override val name = "ChatMentionSearch"
    override val kind = OperationKind.QUERY
    override val body = "query ChatMentionSearch(\$cid:ID!,\$query:String,\$first:Int!,\$after:String){mentions:chatMentionSearch(cid:\$cid,query:\$query,first:\$first,after:\$after){__typename globalItems{__typename ... on Organization{__typename ...OrganizationShort}... on User{__typename ...UserForMention}... on SharedRoom{__typename ...RoomSharedNano}}localItems{__typename ...UserForMention}cursor}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel title roomPhoto:photo membersCount settings{__typename id mute}}"
    override val selector = ChatMentionSearchSelector
}