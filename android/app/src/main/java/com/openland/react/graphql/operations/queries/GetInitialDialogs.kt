package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val GetInitialDialogsSelector = obj(
            field("syncUserChats", "syncUserChats", arguments(fieldValue("first", intValue(500)), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("sequence", "sequence", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("Sequence", ShortSequenceSelector)
                                ))),
                            field("pts", "pts", notNull(scalar("Int")))
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
val GetInitialDialogs = object: OperationDefinition {
    override val name = "GetInitialDialogs"
    override val kind = OperationKind.QUERY
    override val body = "query GetInitialDialogs(\$after:String){syncUserChats(first:500,after:\$after){__typename items{__typename sequence{__typename ...ShortSequence}pts}cursor}}fragment ShortSequence on Sequence{__typename id ... on SequenceChat{__typename id ...ShortSequenceChat}... on SequenceCommon{__typename id ...ShortSequenceCommon}}fragment ShortSequenceChat on SequenceChat{__typename id cid draft{__typename version message date}}fragment ShortSequenceCommon on SequenceCommon{__typename id settings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id version primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone communityAdminsCanSeeContactInfo desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}notificationPreview}"
    override val selector = GetInitialDialogsSelector
}