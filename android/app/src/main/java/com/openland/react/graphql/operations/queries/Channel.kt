package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChannelSelector = obj(
            field("channel", "channel", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Channel", ChannelSimpleSelector)
                ))
        )
val Channel = object: OperationDefinition {
    override val name = "Channel"
    override val kind = OperationKind.QUERY
    override val body = "query Channel(\$id:ID!){channel(id:\$id){__typename ...ChannelSimple}}fragment ChannelSimple on Channel{__typename id title shortname type owner{__typename id firstName lastName}}"
    override val selector = ChannelSelector
}