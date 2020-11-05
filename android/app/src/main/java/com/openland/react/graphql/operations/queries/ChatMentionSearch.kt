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
                                        fragment("Organization", OrganizationShortSelector)
                                    )))
                            )),
                            inline("MentionSearchUser", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("user", "user", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        fragment("User", UserForMentionSelector)
                                    ))),
                                field("fromSameChat", "fromSameChat", notNull(scalar("Boolean")))
                            )),
                            inline("MentionSearchSharedRoom", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("room", "room", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        fragment("SharedRoom", RoomSharedNanoSelector)
                                    )))
                            ))
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val ChatMentionSearch = object: OperationDefinition {
    override val name = "ChatMentionSearch"
    override val kind = OperationKind.QUERY
    override val body = "query ChatMentionSearch(\$cid:ID!,\$query:String,\$first:Int!,\$after:String){mentions:betaChatMentionSearch(cid:\$cid,query:\$query,first:\$first,after:\$after){__typename items{__typename ... on MentionSearchOrganization{__typename organization{__typename ...OrganizationShort}}... on MentionSearchUser{__typename user{__typename ...UserForMention}fromSameChat}... on MentionSearchSharedRoom{__typename room{__typename ...RoomSharedNano}}}cursor}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}fragment UserForMention on User{__typename id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title photo membersCount featured settings{__typename id mute}}"
    override val selector = ChatMentionSearchSelector
}