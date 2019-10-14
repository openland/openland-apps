package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val RoomSettingsUpdateSelector = obj(
            field("betaRoomUpdateUserNotificationSettings", "betaRoomUpdateUserNotificationSettings", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("settings", refValue("settings"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("mute", "mute", scalar("Boolean"))
                )))
        )
val RoomSettingsUpdate = object: OperationDefinition {
    override val name = "RoomSettingsUpdate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation RoomSettingsUpdate(\$roomId:ID!,\$settings:RoomUserNotificaionSettingsInput!){betaRoomUpdateUserNotificationSettings(roomId:\$roomId,settings:\$settings){__typename id mute}}"
    override val selector = RoomSettingsUpdateSelector
}