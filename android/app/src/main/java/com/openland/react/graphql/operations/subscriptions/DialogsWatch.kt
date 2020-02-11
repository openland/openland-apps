package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DialogsWatchSelector = obj(
            field("dialogsUpdates", "event", arguments(fieldValue("fromState", refValue("state"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("DialogUpdateSingle", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("update", "update", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("DialogUpdate", DialogUpdateFragmentSelector)
                            )))
                    )),
                    inline("DialogUpdateBatch", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
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
    override val body = "subscription DialogsWatch(\$state:String){event:dialogsUpdates(fromState:\$state){__typename ... on DialogUpdateSingle{__typename state update{__typename ...DialogUpdateFragment}}... on DialogUpdateBatch{__typename state updates{__typename ...DialogUpdateFragment}}}}fragment DialogUpdateFragment on DialogUpdate{__typename ... on DialogMessageReceived{__typename cid unread globalUnread message:alphaMessage{__typename ...DialogMessage}haveMention silent{__typename mobile desktop}showNotification{__typename mobile desktop}}... on DialogMessageUpdated{__typename cid message:alphaMessage{__typename ...DialogMessage}haveMention}... on DialogMessageDeleted{__typename cid message:alphaMessage{__typename ...DialogMessage}prevMessage:alphaPrevMessage{__typename ...DialogMessage}unread globalUnread haveMention}... on DialogMessageRead{__typename cid mid unread globalUnread haveMention}... on DialogMuteChanged{__typename cid mute}... on DialogPeerUpdated{__typename cid peer{__typename ... on PrivateRoom{__typename id user{__typename id name photo}}... on SharedRoom{__typename id title photo}}}... on DialogDeleted{__typename cid globalUnread}... on DialogBump{__typename cid globalUnread unread topMessage{__typename ...DialogMessage}haveMention}}fragment DialogMessage on ModernMessage{__typename id date sender{__typename id name photo firstName}message fallback ... on GeneralMessage{__typename id quotedMessages{__typename id}}}"
    override val selector = DialogsWatchSelector
}