package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val GetStateSelector = obj(
            field("updatesState", "updatesState", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("seq", "seq", notNull(scalar("Int"))),
                    field("state", "state", notNull(scalar("String"))),
                    field("sequences", "sequences", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("pts", "pts", notNull(scalar("Int"))),
                            field("sequence", "sequence", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("Sequence", ShortSequenceSelector)
                                )))
                        )))))
                )))
        )
val GetState = object: OperationDefinition {
    override val name = "GetState"
    override val kind = OperationKind.QUERY
    override val body = "query GetState{updatesState{__typename seq state sequences{__typename pts sequence{__typename ...ShortSequence}}}}fragment ShortSequence on Sequence{__typename id ... on SequenceChat{__typename id ...ShortSequenceChat}}fragment ShortSequenceChat on SequenceChat{__typename id cid unread}"
    override val selector = GetStateSelector
}