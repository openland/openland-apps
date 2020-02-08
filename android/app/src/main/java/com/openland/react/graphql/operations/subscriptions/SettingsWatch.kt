package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SettingsWatchSelector = obj(
            field("watchSettings", "watchSettings", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Settings", SettingsFullSelector)
                )))
        )
val SettingsWatch = object: OperationDefinition {
    override val name = "SettingsWatch"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription SettingsWatch{watchSettings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id primaryEmail emailFrequency excludeMutedChats countUnreadChats desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}organizationChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}notificationPreview}"
    override val selector = SettingsWatchSelector
}