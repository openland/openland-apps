package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SharedMediaCountersSelector = obj(
            field("chatSharedMediaCounters", "counters", arguments(fieldValue("chatId", refValue("chatId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("links", "links", notNull(scalar("Int"))),
                    field("images", "images", notNull(scalar("Int"))),
                    field("documents", "documents", notNull(scalar("Int"))),
                    field("videos", "videos", notNull(scalar("Int")))
                )))
        )
val SharedMediaCounters = object: OperationDefinition {
    override val name = "SharedMediaCounters"
    override val kind = OperationKind.QUERY
    override val body = "query SharedMediaCounters(\$chatId:ID!){counters:chatSharedMediaCounters(chatId:\$chatId){__typename links images documents videos}}"
    override val selector = SharedMediaCountersSelector
}