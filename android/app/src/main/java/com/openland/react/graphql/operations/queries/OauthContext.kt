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
                            field("title", "title", notNull(scalar("String"))),
                            field("scopes", "scopes", list(notNull(scalar("String")))),
                            field("image", "image", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("uuid", "uuid", notNull(scalar("String"))),
                                    field("crop", "crop", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("x", "x", notNull(scalar("Int"))),
                                            field("y", "y", notNull(scalar("Int"))),
                                            field("w", "w", notNull(scalar("Int"))),
                                            field("h", "h", notNull(scalar("Int")))
                                        ))
                                ))
                        ))),
                    field("state", "state", notNull(scalar("String"))),
                    field("redirectUrl", "redirectUrl", notNull(scalar("String"))),
                    field("code", "code", notNull(scalar("String")))
                ))
        )
val OauthContext = object: OperationDefinition {
    override val name = "OauthContext"
    override val kind = OperationKind.QUERY
    override val body = "query OauthContext(\$code:String!){context:oauthContext(code:\$code){__typename app{__typename id title scopes image{__typename uuid crop{__typename x y w h}}}state redirectUrl code}}"
    override val selector = OauthContextSelector
}