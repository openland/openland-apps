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
                                field("id", "id", notNull(scalar("ID"))),
                                field("photo", "roomPhoto", notNull(scalar("String"))),
                                field("title", "title", notNull(scalar("String")))
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
    override val body = "query ChatMentionSearch(\$after:String,\$cid:ID!,\$first:Int!,\$query:String){mentions:chatMentionSearch(after:\$after,cid:\$cid,first:\$first,query:\$query){__typename cursor globalItems{__typename ... on Organization{...OrganizationShort}... on User{...UserForMention}... on SharedRoom{id roomPhoto:photo title}}localItems{__typename ...UserForMention}}}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}"
    override val selector = ChatMentionSearchSelector
}