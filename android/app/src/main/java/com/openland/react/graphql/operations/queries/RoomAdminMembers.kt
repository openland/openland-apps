package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomAdminMembersSelector = obj(
            field("room", "room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("organization", "organization", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("alphaOrganizationAdminMembers", "admins", notNull(list(notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("role", "role", notNull(scalar("String"))),
                                        field("user", "user", notNull(obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                fragment("User", UserShortSelector)
                                            )))
                                    )))))
                            ))
                    ))
                ))
        )
val RoomAdminMembers = object: OperationDefinition {
    override val name = "RoomAdminMembers"
    override val kind = OperationKind.QUERY
    override val body = "query RoomAdminMembers(\$id:ID!){room(id:\$id){__typename ... on SharedRoom{__typename id organization{__typename id admins:alphaOrganizationAdminMembers{__typename role user{__typename ...UserShort}}}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}"
    override val selector = RoomAdminMembersSelector
}