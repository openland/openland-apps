package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ProfileUpdateSelector = obj(
            field("profileUpdate", "profileUpdate", arguments(fieldValue("input", refValue("input")), fieldValue("uid", refValue("uid"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("about", "about", scalar("String")),
                    field("alphaInvitedBy", "invitedBy", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("name", "name", notNull(scalar("String")))
                        )),
                    field("alphaJoinedAt", "joinedAt", scalar("String")),
                    field("alphaPrimaryOrganizationId", "primaryOrganizationId", scalar("ID")),
                    field("alphaRole", "role", scalar("String")),
                    field("email", "email", scalar("String")),
                    field("facebook", "facebook", scalar("String")),
                    field("firstName", "firstName", scalar("String")),
                    field("id", "id", notNull(scalar("ID"))),
                    field("instagram", "instagram", scalar("String")),
                    field("lastName", "lastName", scalar("String")),
                    field("linkedin", "linkedin", scalar("String")),
                    field("location", "location", scalar("String")),
                    field("phone", "phone", scalar("String")),
                    field("photoRef", "photoRef", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("crop", "crop", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("h", "h", notNull(scalar("Int"))),
                                    field("w", "w", notNull(scalar("Int"))),
                                    field("x", "x", notNull(scalar("Int"))),
                                    field("y", "y", notNull(scalar("Int")))
                                )),
                            field("uuid", "uuid", notNull(scalar("String")))
                        )),
                    field("twitter", "twitter", scalar("String")),
                    field("website", "website", scalar("String"))
                )))
        )
val ProfileUpdate = object: OperationDefinition {
    override val name = "ProfileUpdate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ProfileUpdate(\$input:ProfileInput!,\$uid:ID){profileUpdate(input:\$input,uid:\$uid){__typename about invitedBy:alphaInvitedBy{__typename id name}joinedAt:alphaJoinedAt primaryOrganizationId:alphaPrimaryOrganizationId role:alphaRole email facebook firstName id instagram lastName linkedin location phone photoRef{__typename crop{__typename h w x y}uuid}twitter website}}"
    override val selector = ProfileUpdateSelector
}