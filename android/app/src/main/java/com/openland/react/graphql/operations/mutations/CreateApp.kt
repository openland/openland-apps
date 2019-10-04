package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val CreateAppSelector = obj(
            field("createApp","createApp", arguments(fieldValue("about", refValue("about")), fieldValue("name", refValue("name")), fieldValue("photoRef", refValue("photoRef")), fieldValue("shortname", refValue("shortname"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                )))
        )
val CreateApp = object: OperationDefinition {
    override val name = "CreateApp"
    override val kind = OperationKind.MUTATION
    override val body = "mutation CreateApp(\$about:String,\$name:String!,\$photoRef:ImageRefInput,\$shortname:String){createApp(about:\$about,name:\$name,photoRef:\$photoRef,shortname:\$shortname){__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}"
    override val selector = CreateAppSelector
}