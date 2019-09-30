package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ProfileCreateSelector = obj(
            field("createProfile","createProfile", arguments(fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("about","about", scalar("String")),
                    field("email","email", scalar("String")),
                    field("firstName","firstName", scalar("String")),
                    field("id","id", notNull(scalar("ID"))),
                    field("lastName","lastName", scalar("String")),
                    field("location","location", scalar("String")),
                    field("phone","phone", scalar("String")),
                    field("photoRef","photoRef", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("crop","crop", obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("h","h", notNull(scalar("Int"))),
                                    field("w","w", notNull(scalar("Int"))),
                                    field("x","x", notNull(scalar("Int"))),
                                    field("y","y", notNull(scalar("Int")))
                                )),
                            field("uuid","uuid", notNull(scalar("String")))
                        )),
                    field("website","website", scalar("String"))
                )))
        )
val ProfileCreate = object: OperationDefinition {
    override val name = "ProfileCreate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation ProfileCreate(\$input:CreateProfileInput!){createProfile(input:\$input){__typename about email firstName id lastName location phone photoRef{__typename crop{__typename h w x y}uuid}website}}"
    override val selector = ProfileCreateSelector
}