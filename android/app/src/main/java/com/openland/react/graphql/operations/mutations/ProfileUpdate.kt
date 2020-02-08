package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ProfileUpdateSelector = obj(
            field("profileUpdate", "profileUpdate", arguments(fieldValue("input", refValue("input")), fieldValue("uid", refValue("uid")), fieldValue("inviteKey", refValue("inviteKey"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("firstName", "firstName", scalar("String")),
                    field("lastName", "lastName", scalar("String")),
                    field("photoRef", "photoRef", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("uuid", "uuid", notNull(scalar("String"))),
                            field("crop", "crop", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("x", "x", notNull(scalar("Int"))),
                                    field("y", "y", notNull(scalar("Int"))),
                                    field("w", "w", notNull(scalar("Int"))),
                                    field("h", "h", notNull(scalar("Int")))
                                ))
                        )),
                    field("email", "email", scalar("String")),
                    field("phone", "phone", scalar("String")),
                    field("website", "website", scalar("String")),
                    field("about", "about", scalar("String")),
                    field("location", "location", scalar("String")),
                    field("alphaRole", "role", scalar("String")),
                    field("linkedin", "linkedin", scalar("String")),
                    field("instagram", "instagram", scalar("String")),
                    field("facebook", "facebook", scalar("String")),
                    field("twitter", "twitter", scalar("String")),
                    field("alphaPrimaryOrganizationId", "primaryOrganizationId", scalar("ID")),
                    field("alphaJoinedAt", "joinedAt", scalar("String")),
                    field("alphaInvitedBy", "invitedBy", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("name", "name", notNull(scalar("String")))
                        ))
                )))
        )
val ProfileUpdate = object: OperationDefinition {
    override val name = "ProfileUpdate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ProfileUpdate(\$input:ProfileInput!,\$uid:ID,\$inviteKey:String){profileUpdate(input:\$input,uid:\$uid,inviteKey:\$inviteKey){__typename id firstName lastName photoRef{__typename uuid crop{__typename x y w h}}email phone website about location role:alphaRole linkedin instagram facebook twitter primaryOrganizationId:alphaPrimaryOrganizationId joinedAt:alphaJoinedAt invitedBy:alphaInvitedBy{__typename id name}}}"
    override val selector = ProfileUpdateSelector
}