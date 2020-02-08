package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val CreateAppSelector = obj(
            field("createApp", "createApp", arguments(fieldValue("name", refValue("name")), fieldValue("shortname", refValue("shortname")), fieldValue("photoRef", refValue("photoRef")), fieldValue("about", refValue("about"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                )))
        )
val CreateApp = object: OperationDefinition {
    override val name = "CreateApp"
    override val kind = OperationKind.MUTATION
    override val body = "mutation CreateApp(\$name:String!,\$shortname:String,\$photoRef:ImageRefInput,\$about:String){createApp(name:\$name,shortname:\$shortname,photoRef:\$photoRef,about:\$about){__typename ...AppFull}}fragment AppFull on AppProfile{__typename id name shortname photoRef{__typename uuid crop{__typename x y w h}}about token{__typename salt}}"
    override val selector = CreateAppSelector
}