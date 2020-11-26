package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperAccountMemberAddSelector = obj(
            field("superAccountMemberAdd", "superAccountMemberAdd", arguments(fieldValue("id", refValue("accountId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("members", "members", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))))
                )))
        )
val SuperAccountMemberAdd = object: OperationDefinition {
    override val name = "SuperAccountMemberAdd"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SuperAccountMemberAdd(\$accountId:ID!,\$userId:ID!){superAccountMemberAdd(id:\$accountId,userId:\$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts isBanned isMeBanned primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite featured:alphaFeatured}"
    override val selector = SuperAccountMemberAddSelector
}