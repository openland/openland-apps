package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ProfileSelector = obj(
            field("me","user", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("shortname","shortname", scalar("String"))
                )),
            field("myProfile","profile", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("about","about", scalar("String")),
                    field("alphaInvitedBy","invitedBy", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String")))
                        )),
                    field("alphaJoinedAt","joinedAt", scalar("String")),
                    field("alphaRole","role", scalar("String")),
                    field("email","email", scalar("String")),
                    field("facebook","facebook", scalar("String")),
                    field("firstName","firstName", scalar("String")),
                    field("id","id", notNull(scalar("ID"))),
                    field("instagram","instagram", scalar("String")),
                    field("lastName","lastName", scalar("String")),
                    field("linkedin","linkedin", scalar("String")),
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
                    field("primaryOrganization","primaryOrganization", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("membersCount","membersCount", notNull(scalar("Int"))),
                            field("name","name", notNull(scalar("String")))
                        )),
                    field("twitter","twitter", scalar("String")),
                    field("website","website", scalar("String"))
                ))
        )
val Profile = object: OperationDefinition {
    override val name = "Profile"
    override val kind = OperationKind.QUERY
    override val body = "query Profile{user:me{__typename id shortname}profile:myProfile{__typename about invitedBy:alphaInvitedBy{__typename id name}joinedAt:alphaJoinedAt role:alphaRole email facebook firstName id instagram lastName linkedin location phone photoRef{__typename crop{__typename h w x y}uuid}primaryOrganization{__typename id membersCount name}twitter website}}"
    override val selector = ProfileSelector
}