package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperAccountSelector = obj(
            field("superAccount", "superAccount", arguments(fieldValue("id", refValue("accountId")), fieldValue("viaOrgId", refValue("viaOrgId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String"))),
                    field("state", "state", notNull(scalar("String"))),
                    field("members", "members", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))))),
                    field("features", "features", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("key", "key", notNull(scalar("String"))),
                            field("title", "title", notNull(scalar("String")))
                        ))))),
                    field("orgId", "orgId", notNull(scalar("ID"))),
                    field("createdAt", "createdAt", scalar("String")),
                    field("createdBy", "createdBy", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("name", "name", notNull(scalar("String")))
                        )),
                    field("alphaPublished", "published", notNull(scalar("Boolean")))
                )))
        )
val SuperAccount = object: OperationDefinition {
    override val name = "SuperAccount"
    override val kind = OperationKind.QUERY
    override val body = "query SuperAccount(\$accountId:ID!,\$viaOrgId:Boolean){superAccount(id:\$accountId,viaOrgId:\$viaOrgId){__typename id title state members{__typename ...UserShort}features{__typename id key title}orgId createdAt createdBy{__typename id name}published:alphaPublished}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}"
    override val selector = SuperAccountSelector
}