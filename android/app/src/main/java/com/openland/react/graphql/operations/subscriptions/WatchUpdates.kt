package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val WatchUpdatesSelector = obj(
            field("watchUpdates", "watchUpdates", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("UpdateSubscriptionStarted", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("seq", "seq", notNull(scalar("Int"))),
                        field("state", "state", notNull(scalar("String")))
                    )),
                    inline("UpdateSubscriptionCheckpoint", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("seq", "seq", notNull(scalar("Int"))),
                        field("state", "state", notNull(scalar("String")))
                    )),
                    inline("UpdateSubscriptionEvent", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("seq", "seq", notNull(scalar("Int"))),
                        field("pts", "pts", notNull(scalar("Int"))),
                        field("sequence", "sequence", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID")))
                            ))),
                        field("event", "event", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("UpdateEvent", ShortUpdateSelector)
                            )))
                    ))
                )))
        )
val WatchUpdates = object: OperationDefinition {
    override val name = "WatchUpdates"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription WatchUpdates{watchUpdates{__typename ... on UpdateSubscriptionStarted{__typename seq state}... on UpdateSubscriptionCheckpoint{__typename seq state}... on UpdateSubscriptionEvent{__typename seq pts sequence{__typename id}event{__typename ...ShortUpdate}}}}fragment ShortUpdate on UpdateEvent{__typename ... on UpdateMyProfileChanged{__typename user{__typename id firstName lastName}}... on UpdateChatDraftChanged{__typename cid draft version date}... on UpdateSettingsChanged{__typename settings{__typename ...SettingsFull}}}fragment SettingsFull on Settings{__typename id version primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone communityAdminsCanSeeContactInfo desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}notificationPreview}"
    override val selector = WatchUpdatesSelector
}