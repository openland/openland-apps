package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MarkSequenceReadSelector = obj(
            field("alphaGlobalRead","alphaGlobalRead", arguments(fieldValue("toSeq", refValue("seq"))), notNull(scalar("String")))
        )
val MarkSequenceRead = object: OperationDefinition {
    override val name = "MarkSequenceRead"
    override val kind = OperationKind.MUTATION
    override val body = "mutation MarkSequenceRead(\$seq:Int!){alphaGlobalRead(toSeq:\$seq)}"
    override val selector = MarkSequenceReadSelector
}