package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OauthContextSelector = obj(
            field("oauthContext", "context", arguments(fieldValue("code", refValue("code"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("app", "app", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("image", "image", obj(
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
                            field("scopes", "scopes", list(notNull(scalar("String")))),
                            field("title", "title", notNull(scalar("String")))
                        ))),
                    field("code", "code", notNull(scalar("String"))),
                    field("redirectUrl", "redirectUrl", notNull(scalar("String"))),
                    field("state", "state", notNull(scalar("String")))
                ))
        )
val OauthContext = object: OperationDefinition {
    override val name = "OauthContext"
    override val kind = OperationKind.QUERY
    override val body = "query OauthContext(\$code:String!){context:oauthContext(code:\$code){__typename app{__typename id image{__typename crop{__typename h w x y}uuid}scopes title}code redirectUrl state}}"
    override val selector = OauthContextSelector
}