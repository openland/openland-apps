package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val GetStateSelector = obj(
            field("updatesState", "updatesState", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("seq", "seq", notNull(scalar("Int"))),
                    field("state", "state", notNull(scalar("String"))),
                    field("sequences", "sequences", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("pts", "pts", notNull(scalar("Int"))),
                            field("sequence", "sequence", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("Sequence", ShortSequenceSelector)
                                )))
                        )))))
                )))
        )
val GetState = object: OperationDefinition {
    override val name = "GetState"
    override val kind = OperationKind.QUERY
    override val body = "query GetState{updatesState{__typename seq state sequences{__typename pts sequence{__typename ...ShortSequence}}}}fragment ShortSequence on Sequence{__typename id ... on SequenceChat{__typename id ...ShortSequenceChat}... on SequenceCommon{__typename id ...ShortSequenceCommon}}fragment ShortSequenceChat on SequenceChat{__typename id cid draft{__typename version message date}states{__typename counter mentions total seq readSeq}room{__typename ...RoomNano}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title photo membersCount featured settings{__typename id mute}}fragment ShortSequenceCommon on SequenceCommon{__typename id settings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id version primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone whoCanAddToGroups communityAdminsCanSeeContactInfo desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}channels{__typename showNotification sound}notificationPreview}"
    override val selector = GetStateSelector
}