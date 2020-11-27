package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val GetSequenceStateSelector = obj(
            field("sequenceState", "sequenceState", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("pts", "pts", notNull(scalar("Int"))),
                    field("seq", "seq", notNull(scalar("Int"))),
                    field("sequence", "sequence", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Sequence", ShortSequenceSelector)
                        )))
                )))
        )
val GetSequenceState = object: OperationDefinition {
    override val name = "GetSequenceState"
    override val kind = OperationKind.QUERY
    override val body = "query GetSequenceState(\$id:ID!){sequenceState(id:\$id){__typename pts seq sequence{__typename ...ShortSequence}}}fragment ShortSequence on Sequence{__typename id ... on SequenceChat{__typename id ...ShortSequenceChat}... on SequenceCommon{__typename id ...ShortSequenceCommon}}fragment ShortSequenceChat on SequenceChat{__typename id cid draft{__typename version message date}}fragment ShortSequenceCommon on SequenceCommon{__typename id settings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id version primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone communityAdminsCanSeeContactInfo desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}channels{__typename showNotification sound}notificationPreview}"
    override val selector = GetSequenceStateSelector
}