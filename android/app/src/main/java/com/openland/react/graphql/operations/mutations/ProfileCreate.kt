package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ProfileCreateSelector = obj(
            field("profileCreate", "profileCreate", arguments(fieldValue("input", refValue("input")), fieldValue("inviteKey", refValue("inviteKey"))), notNull(obj(
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
                    field("location", "location", scalar("String"))
                )))
        )
val ProfileCreate = object: OperationDefinition {
    override val name = "ProfileCreate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ProfileCreate(\$input:ProfileInput!,\$inviteKey:String){profileCreate(input:\$input,inviteKey:\$inviteKey){__typename id firstName lastName photoRef{__typename uuid crop{__typename x y w h}}email phone website about location}}"
    override val selector = ProfileCreateSelector
}