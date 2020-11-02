package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val GetSequenceStateSelector = obj(
            field("sequenceState", "sequenceState", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Sequence", ShortSequenceSelector)
                )))
        )
val GetSequenceState = object: OperationDefinition {
    override val name = "GetSequenceState"
    override val kind = OperationKind.QUERY
    override val body = "query GetSequenceState(\$id:String!){sequenceState(id:\$id){__typename ...ShortSequence}}fragment ShortSequence on Sequence{__typename id ... on SequenceChat{__typename id cid}}"
    override val selector = GetSequenceStateSelector
}