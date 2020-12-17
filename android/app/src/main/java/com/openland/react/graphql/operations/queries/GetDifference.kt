package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val GetDifferenceSelector = obj(
            field("updatesDifference", "updatesDifference", arguments(fieldValue("state", refValue("state"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("seq", "seq", notNull(scalar("Int"))),
                    field("state", "state", notNull(scalar("String"))),
                    field("hasMore", "hasMore", notNull(scalar("Boolean"))),
                    field("sequences", "sequences", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("after", "after", notNull(scalar("Int"))),
                            field("events", "events", notNull(list(notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("pts", "pts", notNull(scalar("Int"))),
                                    field("event", "event", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            fragment("UpdateEvent", ShortUpdateSelector)
                                        )))
                                ))))),
                            field("sequence", "sequence", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("Sequence", ShortSequenceSelector)
                                )))
                        )))))
                )))
        )
val GetDifference = object: OperationDefinition {
    override val name = "GetDifference"
    override val kind = OperationKind.QUERY
    override val body = "query GetDifference(\$state:String!){updatesDifference(state:\$state){__typename seq state hasMore sequences{__typename after events{__typename pts event{__typename ...ShortUpdate}}sequence{__typename ...ShortSequence}}}}fragment ShortUpdate on UpdateEvent{__typename ... on UpdateMyProfileChanged{__typename user{__typename id firstName lastName}}... on UpdateChatDraftChanged{__typename cid draft version date}... on UpdateSettingsChanged{__typename settings{__typename ...SettingsFull}}... on UpdateChatMessage{__typename cid message{__typename id seq sender{__typename id}}}... on UpdateChatMessageDeleted{__typename cid mid seq}... on UpdateChatRead{__typename cid seq}}fragment SettingsFull on Settings{__typename id version primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone whoCanAddToGroups communityAdminsCanSeeContactInfo desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}channels{__typename showNotification sound}notificationPreview}fragment ShortSequence on Sequence{__typename id ... on SequenceChat{__typename id ...ShortSequenceChat}... on SequenceCommon{__typename id ...ShortSequenceCommon}}fragment ShortSequenceChat on SequenceChat{__typename id cid draft{__typename version message date}states{__typename counter mentions total seq}}fragment ShortSequenceCommon on SequenceCommon{__typename id settings{__typename ...SettingsFull}}"
    override val selector = GetDifferenceSelector
}