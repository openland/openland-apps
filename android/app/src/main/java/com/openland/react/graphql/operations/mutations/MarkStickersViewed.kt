package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MarkStickersViewedSelector = obj(
            field("myStickersMarkAsViewed", "myStickersMarkAsViewed", notNull(scalar("Boolean")))
        )
val MarkStickersViewed = object: OperationDefinition {
    override val name = "MarkStickersViewed"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MarkStickersViewed{myStickersMarkAsViewed}"
    override val selector = MarkStickersViewedSelector
}