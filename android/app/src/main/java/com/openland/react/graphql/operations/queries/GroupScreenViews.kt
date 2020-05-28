package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val GroupScreenViewsSelector = obj(
            field("groupScreenViews", "groupScreenViews", arguments(fieldValue("id", refValue("id")), fieldValue("from", refValue("from")), fieldValue("to", refValue("to"))), notNull(scalar("Int")))
        )
val GroupScreenViews = object: OperationDefinition {
    override val name = "GroupScreenViews"
    override val kind = OperationKind.QUERY
    override val body = "query GroupScreenViews(\$id:ID!,\$from:Date,\$to:Date){groupScreenViews(id:\$id,from:\$from,to:\$to)}"
    override val selector = GroupScreenViewsSelector
}