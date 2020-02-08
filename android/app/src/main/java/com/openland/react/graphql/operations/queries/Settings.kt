package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SettingsSelector = obj(
            field("settings", "settings", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Settings", SettingsFullSelector)
                )))
        )
val Settings = object: OperationDefinition {
    override val name = "Settings"
    override val kind = OperationKind.QUERY
    override val body = "query Settings{settings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id primaryEmail emailFrequency excludeMutedChats countUnreadChats desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}organizationChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}notificationPreview}"
    override val selector = SettingsSelector
}