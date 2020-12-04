package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val GetSequenceDifferenceSelector = obj(
            field("sequenceDifference", "sequenceDifference", arguments(fieldValue("id", refValue("id")), fieldValue("pts", refValue("pts"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("sequence", "sequence", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Sequence", ShortSequenceSelector)
                        ))),
                    field("events", "events", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("pts", "pts", notNull(scalar("Int"))),
                            field("event", "event", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("UpdateEvent", ShortUpdateSelector)
                                )))
                        ))))),
                    field("after", "after", notNull(scalar("Int"))),
                    field("hasMore", "hasMore", notNull(scalar("Boolean"))),
                    field("seq", "seq", notNull(scalar("Int")))
                )))
        )
val GetSequenceDifference = object: OperationDefinition {
    override val name = "GetSequenceDifference"
    override val kind = OperationKind.QUERY
    override val body = "query GetSequenceDifference(\$id:ID!,\$pts:Int!){sequenceDifference(id:\$id,pts:\$pts){__typename sequence{__typename ...ShortSequence}events{__typename pts event{__typename ...ShortUpdate}}after hasMore seq}}fragment ShortSequence on Sequence{__typename id ... on SequenceChat{__typename id ...ShortSequenceChat}... on SequenceCommon{__typename id ...ShortSequenceCommon}}fragment ShortSequenceChat on SequenceChat{__typename id cid draft{__typename version message date}}fragment ShortSequenceCommon on SequenceCommon{__typename id settings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id version primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone whoCanAddToGroups communityAdminsCanSeeContactInfo desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}channels{__typename showNotification sound}notificationPreview}fragment ShortUpdate on UpdateEvent{__typename ... on UpdateMyProfileChanged{__typename user{__typename id firstName lastName}}... on UpdateChatDraftChanged{__typename cid draft version date}... on UpdateSettingsChanged{__typename settings{__typename ...SettingsFull}}}"
    override val selector = GetSequenceDifferenceSelector
}