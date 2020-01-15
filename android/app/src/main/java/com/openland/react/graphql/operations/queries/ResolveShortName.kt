package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ResolveShortNameSelector = obj(
            field("alphaResolveShortName", "item", arguments(fieldValue("shortname", refValue("shortname"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("User", obj(
                        field("id", "id", notNull(scalar("ID"))),
                        field("isDeleted", "isDeleted", notNull(scalar("Boolean")))
                    )),
                    inline("Organization", obj(
                        field("id", "id", notNull(scalar("ID"))),
                        field("isDeleted", "isDeleted", notNull(scalar("Boolean")))
                    )),
                    inline("FeedChannel", obj(
                        field("id", "id", notNull(scalar("ID")))
                    ))
                ))
        )
val ResolveShortName = object: OperationDefinition {
    override val name = "ResolveShortName"
    override val kind = OperationKind.QUERY
    override val body = "query ResolveShortName(\$shortname:String!){item:alphaResolveShortName(shortname:\$shortname){__typename ... on User{id isDeleted}... on Organization{id isDeleted}... on FeedChannel{id}}}"
    override val selector = ResolveShortNameSelector
}