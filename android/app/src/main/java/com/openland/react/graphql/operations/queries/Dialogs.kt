package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DialogsSelector = obj(
            field("dialogs", "dialogs", arguments(fieldValue("first", intValue(20)), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Dialog", DialogFragmentSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                ))),
            field("dialogsState", "state", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("state", "state", scalar("String"))
                ))),
            field("alphaNotificationCounter", "counter", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("unreadCount", "unreadCount", notNull(scalar("Int")))
                )))
        )
val Dialogs = object: OperationDefinition {
    override val name = "Dialogs"
    override val kind = OperationKind.QUERY
    override val body = "query Dialogs(\$after:String){dialogs(first:20,after:\$after){__typename items{__typename ...DialogFragment}cursor}state:dialogsState{__typename state}counter:alphaNotificationCounter{__typename id unreadCount}}fragment DialogFragment on Dialog{__typename id cid fid kind isChannel title photo unreadCount isMuted haveMention topMessage:alphaTopMessage{__typename ...DaialogListMessage}}fragment DaialogListMessage on ModernMessage{__typename id date sender{__typename id name firstName}senderBadge{__typename ...UserBadge}message fallback ... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}attachments{__typename id fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename isImage imageFormat}}}quotedMessages{__typename id}}}fragment UserBadge on UserBadge{__typename id name verified}"
    override val selector = DialogsSelector
}