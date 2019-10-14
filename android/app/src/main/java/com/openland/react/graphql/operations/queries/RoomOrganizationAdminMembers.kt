package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomOrganizationAdminMembersSelector = obj(
            field("room", "room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("id", "id", notNull(scalar("ID"))),
                        field("organization", "organization", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("alphaOrganizationAdminMembers", "adminMembers", notNull(list(notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("role", "role", notNull(scalar("String"))),
                                        field("user", "user", notNull(obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                fragment("User", UserShortSelector)
                                            )))
                                    ))))),
                                field("id", "id", notNull(scalar("ID")))
                            ))
                    ))
                ))
        )
val RoomOrganizationAdminMembers = object: OperationDefinition {
    override val name = "RoomOrganizationAdminMembers"
    override val kind = OperationKind.QUERY
    override val body = "query RoomOrganizationAdminMembers(\$id:ID!){room(id:\$id){__typename ... on SharedRoom{id organization{__typename adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserShort}}id}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}"
    override val selector = RoomOrganizationAdminMembersSelector
}