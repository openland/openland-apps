package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val MyCardsSelector = obj(
            field("myCards", "myCards", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("pmid", "pmid", notNull(scalar("ID"))),
                    field("last4", "last4", notNull(scalar("String"))),
                    field("brand", "brand", notNull(scalar("String"))),
                    field("expYear", "expYear", notNull(scalar("Int"))),
                    field("expMonth", "expMonth", notNull(scalar("Int"))),
                    field("isDefault", "isDefault", notNull(scalar("Boolean"))),
                    field("deleted", "deleted", notNull(scalar("Boolean")))
                )))))
        )
val MyCards = object: OperationDefinition {
    override val name = "MyCards"
    override val kind = OperationKind.QUERY
    override val body = "query MyCards{myCards{__typename id pmid last4 brand expYear expMonth isDefault deleted}}"
    override val selector = MyCardsSelector
}