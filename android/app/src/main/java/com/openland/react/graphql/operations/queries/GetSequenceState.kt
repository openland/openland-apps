package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val GetSequenceStateSelector = obj(
            field("sequenceState", "sequenceState", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("pts", "pts", notNull(scalar("Int"))),
                    field("sequence", "sequence", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Sequence", ShortSequenceSelector)
                        )))
                )))
        )
val GetSequenceState = object: OperationDefinition {
    override val name = "GetSequenceState"
    override val kind = OperationKind.QUERY
    override val body = "query GetSequenceState(\$id:ID!){sequenceState(id:\$id){__typename pts sequence{__typename ...ShortSequence}}}fragment ShortSequence on Sequence{__typename id ... on SequenceChat{__typename id ...ShortSequenceChat}}fragment ShortSequenceChat on SequenceChat{__typename id cid unread}"
    override val selector = GetSequenceStateSelector
}