package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val BetaSubmitNextDiscoverSelector = obj(
            field("betaSubmitNextDiscover","betaSubmitNextDiscover", arguments(fieldValue("excudedGroupsIds", refValue("excudedGroupsIds")), fieldValue("selectedTagsIds", refValue("selectedTagsIds"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("tagGroup","tagGroup", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("String")))
                        ))
                ))
        )
val BetaSubmitNextDiscover = object: OperationDefinition {
    override val name = "BetaSubmitNextDiscover"
    override val kind = OperationKind.MUTATION
    override val body = "mutation BetaSubmitNextDiscover(\$excudedGroupsIds:[String!]!,\$selectedTagsIds:[String!]!){betaSubmitNextDiscover(excudedGroupsIds:\$excudedGroupsIds,selectedTagsIds:\$selectedTagsIds){__typename tagGroup{__typename id}}}"
    override val selector = BetaSubmitNextDiscoverSelector
}