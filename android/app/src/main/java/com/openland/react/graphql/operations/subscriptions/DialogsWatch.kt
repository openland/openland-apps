package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DialogsWatchSelector = obj(
            field("dialogsUpdates", "event", arguments(fieldValue("fromState", refValue("state"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("DialogUpdateSingle", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("seq", "seq", notNull(scalar("Int"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("update", "update", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("DialogUpdate", DialogUpdateFragmentSelector)
                            )))
                    )),
                    inline("DialogUpdateBatch", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("fromSeq", "fromSeq", notNull(scalar("Int"))),
                        field("seq", "seq", notNull(scalar("Int"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("updates", "updates", notNull(list(notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("DialogUpdate", DialogUpdateFragmentSelector)
                            )))))
                    ))
                )))
        )
val DialogsWatch = object: OperationDefinition {
    override val name = "DialogsWatch"
    override val kind = OperationKind.SUBSCRIPTION
    override val body = "subscription DialogsWatch(\$state:String){event:dialogsUpdates(fromState:\$state){__typename ... on DialogUpdateSingle{__typename seq state update{__typename ...DialogUpdateFragment}}... on DialogUpdateBatch{__typename fromSeq seq state updates{__typename ...DialogUpdateFragment}}}}fragment DialogUpdateFragment on DialogUpdate{__typename ... on DialogMessageReceived{__typename cid unread globalUnread message:alphaMessage{__typename ...TinyMessage}haveMention silent{__typename mobile desktop}showNotification{__typename mobile desktop}}... on DialogMessageUpdated{__typename cid message:alphaMessage{__typename ...TinyMessage}haveMention}... on DialogMessageDeleted{__typename cid message:alphaMessage{__typename ...TinyMessage}prevMessage:alphaPrevMessage{__typename ...TinyMessage}unread globalUnread haveMention}... on DialogMessageRead{__typename cid mid unread globalUnread haveMention}... on DialogMuteChanged{__typename cid mute}... on DialogPeerUpdated{__typename cid peer{__typename ... on PrivateRoom{__typename id user{__typename id name photo}}... on SharedRoom{__typename id title photo}}}... on DialogDeleted{__typename cid globalUnread}... on DialogBump{__typename cid globalUnread unread topMessage{__typename ...TinyMessage}haveMention}}fragment TinyMessage on ModernMessage{__typename id date sender{__typename ...UserTiny}senderBadge{__typename ...UserBadge}message fallback ... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}isMentioned commentsCount attachments{__typename id fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename isImage imageFormat}filePreview}}quotedMessages{__typename id}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}"
    override val selector = DialogsWatchSelector
}