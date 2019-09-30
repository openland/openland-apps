package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SuperAccountMemberRemoveSelector = obj(
            field("superAccountMemberRemove","superAccountMemberRemove", arguments(fieldValue("id", refValue("accountId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("members","members", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))))
                )))
        )
val SuperAccountMemberRemove = object: OperationDefinition {
    override val name = "SuperAccountMemberRemove"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SuperAccountMemberRemove(\$accountId:ID!,\$userId:ID!){superAccountMemberRemove(id:\$accountId,userId:\$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}"
    override val selector = SuperAccountMemberRemoveSelector
}