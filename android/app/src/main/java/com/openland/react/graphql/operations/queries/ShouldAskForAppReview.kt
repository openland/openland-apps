package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ShouldAskForAppReviewSelector = obj(
            field("shouldAskForAppReview", "shouldAskForAppReview", notNull(scalar("Boolean")))
        )
val ShouldAskForAppReview = object: OperationDefinition {
    override val name = "ShouldAskForAppReview"
    override val kind = OperationKind.QUERY
    override val body = "query ShouldAskForAppReview{shouldAskForAppReview}"
    override val selector = ShouldAskForAppReviewSelector
}