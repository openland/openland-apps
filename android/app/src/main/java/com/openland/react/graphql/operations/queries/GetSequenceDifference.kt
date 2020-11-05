package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val GetSequenceDifferenceSelector = obj(
            field("sequenceDifference", "sequenceDifference", arguments(fieldValue("id", refValue("id")), fieldValue("pts", refValue("pts"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("sequence", "sequence", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Sequence", ShortSequenceSelector)
                        ))),
                    field("events", "events", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("pts", "pts", notNull(scalar("Int"))),
                            field("event", "event", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("UpdateEvent", ShortUpdateSelector)
                                )))
                        ))))),
                    field("hasMore", "hasMore", notNull(scalar("Boolean")))
                )))
        )
val GetSequenceDifference = object: OperationDefinition {
    override val name = "GetSequenceDifference"
    override val kind = OperationKind.QUERY
    override val body = "query GetSequenceDifference(\$id:ID!,\$pts:Int!){sequenceDifference(id:\$id,pts:\$pts){__typename sequence{__typename ...ShortSequence}events{__typename pts event{__typename ...ShortUpdate}}hasMore}}fragment ShortSequence on Sequence{__typename id ... on SequenceChat{__typename id cid}}fragment ShortUpdate on UpdateEvent{__typename ... on UpdateMyProfileChanged{__typename user{__typename id}}}"
    override val selector = GetSequenceDifferenceSelector
}