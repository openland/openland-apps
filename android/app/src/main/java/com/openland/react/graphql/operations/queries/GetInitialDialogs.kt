package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val GetInitialDialogsSelector = obj(
            field("syncUserChats", "syncUserChats", arguments(fieldValue("first", intValue(500)), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("sequence", "sequence", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("Sequence", ShortSequenceSelector)
                                )))
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val GetInitialDialogs = object: OperationDefinition {
    override val name = "GetInitialDialogs"
    override val kind = OperationKind.QUERY
    override val body = "query GetInitialDialogs(\$after:String){syncUserChats(first:500,after:\$after){__typename items{__typename sequence{__typename ...ShortSequence}}cursor}}fragment ShortSequence on Sequence{__typename id ... on SequenceChat{__typename id cid}}"
    override val selector = GetInitialDialogsSelector
}