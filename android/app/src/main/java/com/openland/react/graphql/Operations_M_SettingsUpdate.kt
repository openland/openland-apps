package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val SettingsUpdateSelector = obj(
            field("updateSettings","updateSettings", arguments(fieldValue("settings", refValue("input"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Settings", SettingsFullSelector)
                )))
        )
val SettingsUpdate = object: OperationDefinition {
    override val name = "SettingsUpdate"
    override val kind = OperationKind.MUTATION
    override val body = "mutation SettingsUpdate(\$input:UpdateSettingsInput){updateSettings(settings:\$input){__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename countUnreadChats desktop{__typename ...PlatformNotificationSettingsFull}emailFrequency excludeMutedChats id mobile{__typename ...PlatformNotificationSettingsFull}primaryEmail}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename comments{__typename showNotification sound}communityChat{__typename showNotification sound}direct{__typename showNotification sound}notificationPreview organizationChat{__typename showNotification sound}secretChat{__typename showNotification sound}}"
    override val selector = SettingsUpdateSelector
}