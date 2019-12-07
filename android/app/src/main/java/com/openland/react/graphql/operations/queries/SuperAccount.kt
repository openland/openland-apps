package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperAccountSelector = obj(
            field("superAccount", "superAccount", arguments(fieldValue("id", refValue("accountId")), fieldValue("viaOrgId", refValue("viaOrgId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("alphaPublished", "published", notNull(scalar("Boolean"))),
                    field("createdAt", "createdAt", scalar("String")),
                    field("createdBy", "createdBy", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("name", "name", notNull(scalar("String")))
                        )),
                    field("features", "features", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("key", "key", notNull(scalar("String"))),
                            field("title", "title", notNull(scalar("String")))
                        ))))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("members", "members", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))))),
                    field("orgId", "orgId", notNull(scalar("ID"))),
                    field("state", "state", notNull(scalar("String"))),
                    field("title", "title", notNull(scalar("String")))
                )))
        )
val SuperAccount = object: OperationDefinition {
    override val name = "SuperAccount"
    override val kind = OperationKind.QUERY
    override val body = "query SuperAccount(\$accountId:ID!,\$viaOrgId:Boolean){superAccount(id:\$accountId,viaOrgId:\$viaOrgId){__typename published:alphaPublished createdAt createdBy{__typename id name}features{__typename id key title}id members{__typename ...UserShort}orgId state title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}"
    override val selector = SuperAccountSelector
}