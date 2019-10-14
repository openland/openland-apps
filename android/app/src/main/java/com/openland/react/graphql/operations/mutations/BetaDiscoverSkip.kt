package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val BetaDiscoverSkipSelector = obj(
            field("betaDiscoverSkip", "betaDiscoverSkip", arguments(fieldValue("selectedTagsIds", refValue("selectedTagsIds"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("tagGroup", "tagGroup", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("String")))
                        ))
                ))
        )
val BetaDiscoverSkip = object: OperationDefinition {
    override val name = "BetaDiscoverSkip"
    override val kind = OperationKind.MUTATION
    override val body = "mutation BetaDiscoverSkip(\$selectedTagsIds:[String!]!){betaDiscoverSkip(selectedTagsIds:\$selectedTagsIds){__typename tagGroup{__typename id}}}"
    override val selector = BetaDiscoverSkipSelector
}