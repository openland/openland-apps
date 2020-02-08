package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val BetaSubmitNextDiscoverSelector = obj(
            field("betaSubmitNextDiscover", "betaSubmitNextDiscover", arguments(fieldValue("selectedTagsIds", refValue("selectedTagsIds")), fieldValue("excudedGroupsIds", refValue("excudedGroupsIds"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("tagGroup", "tagGroup", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("String")))
                        ))
                ))
        )
val BetaSubmitNextDiscover = object: OperationDefinition {
    override val name = "BetaSubmitNextDiscover"
    override val kind = OperationKind.MUTATION
    override val body = "mutation BetaSubmitNextDiscover(\$selectedTagsIds:[String!]!,\$excudedGroupsIds:[String!]!){betaSubmitNextDiscover(selectedTagsIds:\$selectedTagsIds,excudedGroupsIds:\$excudedGroupsIds){__typename tagGroup{__typename id}}}"
    override val selector = BetaSubmitNextDiscoverSelector
}