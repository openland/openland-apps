package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val OauthContextSelector = obj(
            field("oauthContext", "context", arguments(fieldValue("code", refValue("code"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("app", "app", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("clientId", "clientId", scalar("String")),
                            field("clientSecret", "clientSecret", scalar("String")),
                            field("id", "id", notNull(scalar("ID"))),
                            field("owner", "owner", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("User", UserTinySelector)
                                ))),
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
    override val body = "query OauthContext(\$code:String!){context:oauthContext(code:\$code){__typename app{__typename clientId clientSecret id owner{__typename ...UserTiny}scopes title}code redirectUrl state}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}"
    override val selector = OauthContextSelector
}