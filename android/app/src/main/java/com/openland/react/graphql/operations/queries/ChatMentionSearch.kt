package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChatMentionSearchSelector = obj(
            field("chatMentionSearch", "mentions", arguments(fieldValue("after", refValue("after")), fieldValue("cid", refValue("cid")), fieldValue("first", refValue("first")), fieldValue("query", refValue("query"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("cursor", "cursor", scalar("String")),
                    field("globalItems", "globalItems", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            inline("Organization", obj(
                                fragment("Organization", OrganizationShortSelector)
                            )),
                            inline("User", obj(
                                fragment("User", UserForMentionSelector)
                            )),
                            inline("SharedRoom", obj(
                                fragment("SharedRoom", RoomSharedNanoSelector)
                            ))
                        ))))),
                    field("localItems", "localItems", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserForMentionSelector)
                        )))))
                )))
        )
val ChatMentionSearch = object: OperationDefinition {
    override val name = "ChatMentionSearch"
    override val kind = OperationKind.QUERY
    override val body = "query ChatMentionSearch(\$after:String,\$cid:ID!,\$first:Int!,\$query:String){mentions:chatMentionSearch(after:\$after,cid:\$cid,first:\$first,query:\$query){__typename cursor globalItems{__typename ... on Organization{...OrganizationShort}... on User{...UserForMention}... on SharedRoom{...RoomSharedNano}}localItems{__typename ...UserForMention}}}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}"
    override val selector = ChatMentionSearchSelector
}