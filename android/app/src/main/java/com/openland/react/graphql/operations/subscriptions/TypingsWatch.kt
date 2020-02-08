package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val TypingsWatchSelector = obj(
            field("typings", "typings", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("chat", "conversation", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            inline("PrivateRoom", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID")))
                            )),
                            inline("SharedRoom", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID")))
                            ))
                        ))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("photo", "photo", scalar("String")),
                            field("firstName", "firstName", notNull(scalar("String")))
                        ))),
                    field("cancel", "cancel", notNull(scalar("Boolean"))),
                    field("type", "type", notNull(scalar("String")))
                )))
        )
val TypingsWatch = object: OperationDefinition {
    override val name = "TypingsWatch"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription TypingsWatch{typings{__typename conversation:chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}user{__typename id photo firstName}cancel type}}"
    override val selector = TypingsWatchSelector
}