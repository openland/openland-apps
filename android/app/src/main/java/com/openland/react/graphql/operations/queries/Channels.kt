package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val ChannelsSelector = obj(
            field("channels", "channels", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Channel", ChannelSimpleSelector)
                )))))
        )
val Channels = object: OperationDefinition {
    override val name = "Channels"
    override val kind = OperationKind.QUERY
    override val body = "query Channels{channels{__typename ...ChannelSimple}}fragment ChannelSimple on Channel{__typename id title shortname type owner{__typename id firstName lastName}}"
    override val selector = ChannelsSelector
}