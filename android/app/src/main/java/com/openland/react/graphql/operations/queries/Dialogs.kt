package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val DialogsSelector = obj(
            field("alphaNotificationCounter","counter", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("unreadCount","unreadCount", notNull(scalar("Int")))
                ))),
            field("dialogs","dialogs", arguments(fieldValue("after", refValue("after")), fieldValue("first", intValue(20))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("cursor","cursor", scalar("String")),
                    field("items","items", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("alphaTopMessage","topMessage", obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("ModernMessage", DaialogListMessageSelector)
                                )),
                            field("cid","cid", notNull(scalar("ID"))),
                            field("fid","fid", notNull(scalar("ID"))),
                            field("haveMention","haveMention", notNull(scalar("Boolean"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("isChannel","isChannel", notNull(scalar("Boolean"))),
                            field("isMuted","isMuted", notNull(scalar("Boolean"))),
                            field("kind","kind", notNull(scalar("String"))),
                            field("photo","photo", notNull(scalar("String"))),
                            field("title","title", notNull(scalar("String"))),
                            field("unreadCount","unreadCount", notNull(scalar("Int")))
                        )))))
                ))),
            field("dialogsState","state", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("state","state", scalar("String"))
                )))
        )
val Dialogs = object: OperationDefinition {
    override val name = "Dialogs"
    override val kind = OperationKind.QUERY
    override val body = "query Dialogs(\$after:String){counter:alphaNotificationCounter{__typename id unreadCount}dialogs(after:\$after,first:20){__typename cursor items{__typename topMessage:alphaTopMessage{__typename ...DaialogListMessage}cid fid haveMention id isChannel isMuted kind photo title unreadCount}}state:dialogsState{__typename state}}fragment DaialogListMessage on ModernMessage{__typename date fallback id message sender{__typename firstName id name}senderBadge{__typename ...UserBadge}... on GeneralMessage{attachments{__typename fallback id ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat isImage}id}}id quotedMessages{__typename id}}}fragment UserBadge on UserBadge{__typename id name verified}"
    override val selector = DialogsSelector
}