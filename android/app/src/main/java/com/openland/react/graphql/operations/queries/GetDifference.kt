package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val GetDifferenceSelector = obj(
            field("updatesDifference", "updatesDifference", arguments(fieldValue("state", refValue("state"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("seq", "seq", notNull(scalar("Int"))),
                    field("state", "state", notNull(scalar("String"))),
                    field("hasMore", "hasMore", notNull(scalar("Boolean"))),
                    field("sequences", "sequences", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("after", "after", notNull(scalar("Int"))),
                            field("events", "events", notNull(list(notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("pts", "pts", notNull(scalar("Int"))),
                                    field("event", "event", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            fragment("UpdateEvent", ShortUpdateSelector)
                                        )))
                                ))))),
                            field("sequence", "sequence", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("Sequence", ShortSequenceSelector)
                                )))
                        )))))
                )))
        )
val GetDifference = object: OperationDefinition {
    override val name = "GetDifference"
    override val kind = OperationKind.QUERY
    override val body = "query GetDifference(\$state:String!){updatesDifference(state:\$state){__typename seq state hasMore sequences{__typename after events{__typename pts event{__typename ...ShortUpdate}}sequence{__typename ...ShortSequence}}}}fragment ShortUpdate on UpdateEvent{__typename ... on UpdateMyProfileChanged{__typename user{__typename id firstName lastName}}... on UpdateChatDraftChanged{__typename cid draft version date}}fragment ShortSequence on Sequence{__typename id ... on SequenceChat{__typename id ...ShortSequenceChat}}fragment ShortSequenceChat on SequenceChat{__typename id cid draft{__typename version message date}}"
    override val selector = GetDifferenceSelector
}