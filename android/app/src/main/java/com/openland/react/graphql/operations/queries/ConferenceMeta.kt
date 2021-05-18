package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ConferenceMetaSelector = obj(
            field("conference", "conference", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("parent", "parent", obj(
                            field("__typename", "__typename", notNull(scalar("String")))
                        )),
                    field("peers", "peers", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("user", "user", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("ID"))),
                                    field("name", "name", notNull(scalar("String")))
                                )))
                        )))))
                )))
        )
val ConferenceMeta = object: OperationDefinition {
    override val name = "ConferenceMeta"
    override val kind = OperationKind.QUERY
    override val body = "query ConferenceMeta(\$id:ID!){conference(id:\$id){__typename id parent{__typename}peers{__typename id user{__typename id name}}}}"
    override val selector = ConferenceMetaSelector
}