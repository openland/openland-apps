package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChatMentionSearchSelector = obj(
            field("betaChatMentionSearch", "mentions", arguments(fieldValue("cid", refValue("cid")), fieldValue("query", refValue("query")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            inline("MentionSearchOrganization", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("organization", "organization", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        fragment("Organization", OrganizationSmallSelector)
                                    )))
                            )),
                            inline("MentionSearchUser", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("user", "user", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        fragment("User", UserSmallSelector)
                                    ))),
                                field("fromSameChat", "fromSameChat", notNull(scalar("Boolean")))
                            )),
                            inline("MentionSearchSharedRoom", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("room", "room", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("featured", "featured", notNull(scalar("Boolean"))),
                                        fragment("SharedRoom", RoomSmallSelector)
                                    )))
                            ))
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val ChatMentionSearch = object: OperationDefinition {
    override val name = "ChatMentionSearch"
    override val kind = OperationKind.QUERY
    override val body = "query ChatMentionSearch(\$cid:ID!,\$query:String,\$first:Int!,\$after:String){mentions:betaChatMentionSearch(cid:\$cid,query:\$query,first:\$first,after:\$after){__typename items{__typename ... on MentionSearchOrganization{__typename organization{__typename ...OrganizationSmall}}... on MentionSearchUser{__typename user{__typename ...UserSmall}fromSameChat}... on MentionSearchSharedRoom{__typename room{__typename ...RoomSmall featured}}}cursor}}fragment OrganizationSmall on Organization{__typename id name photo about shortname isCommunity:alphaIsCommunity featured:alphaFeatured}fragment UserSmall on User{__typename id name firstName photo shortname isBot}fragment RoomSmall on SharedRoom{__typename id title photo isChannel isPremium featured}"
    override val selector = ChatMentionSearchSelector
}