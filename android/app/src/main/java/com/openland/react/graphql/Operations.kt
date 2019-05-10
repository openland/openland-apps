package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

private val AppChatSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("chat","chat", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(listOf(
                        field("id","id", notNull(scalar("ID")))
                    ))),
                    inline("SharedRoom", obj(listOf(
                        field("id","id", notNull(scalar("ID")))
                    )))
                )))),
            field("webhook","webhook", notNull(scalar("String")))
        ))

private val AppFullSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("id","id", notNull(scalar("ID"))),
            field("name","name", notNull(scalar("String"))),
            field("photoRef","photoRef", obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("crop","crop", obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("h","h", notNull(scalar("Int"))),
                            field("w","w", notNull(scalar("Int"))),
                            field("x","x", notNull(scalar("Int"))),
                            field("y","y", notNull(scalar("Int")))
                        ))),
                    field("uuid","uuid", notNull(scalar("String")))
                ))),
            field("shortname","shortname", scalar("String")),
            field("token","token", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("salt","salt", notNull(scalar("String")))
                ))))
        ))

private val OrganizationShortSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("alphaIsCommunity","isCommunity", notNull(scalar("Boolean"))),
            field("id","id", notNull(scalar("ID"))),
            field("name","name", notNull(scalar("String"))),
            field("photo","photo", scalar("String"))
        ))

private val UserShortSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("email","email", scalar("String")),
            field("firstName","firstName", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("isBot","isBot", notNull(scalar("Boolean"))),
            field("isYou","isYou", notNull(scalar("Boolean"))),
            field("lastName","lastName", scalar("String")),
            field("lastSeen","lastSeen", scalar("String")),
            field("name","name", notNull(scalar("String"))),
            field("online","online", notNull(scalar("Boolean"))),
            field("photo","photo", scalar("String")),
            field("primaryOrganization","primaryOrganization", obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                ))),
            field("shortname","shortname", scalar("String"))
        ))

private val UserTinySelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("firstName","firstName", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("isYou","isYou", notNull(scalar("Boolean"))),
            field("lastName","lastName", scalar("String")),
            field("name","name", notNull(scalar("String"))),
            field("photo","photo", scalar("String")),
            field("primaryOrganization","primaryOrganization", obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                ))),
            field("shortname","shortname", scalar("String"))
        ))

private val FullMessageSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("date","date", notNull(scalar("Date"))),
            field("fallback","fallback", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("message","message", scalar("String")),
            field("sender","sender", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("User", UserShortSelector)
                )))),
            field("spans","spans", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("length","length", notNull(scalar("Int"))),
                    field("offset","offset", notNull(scalar("Int"))),
                    inline("MessageSpanUserMention", obj(listOf(
                        field("user","user", notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            ))))
                    ))),
                    inline("MessageSpanMultiUserMention", obj(listOf(
                        field("users","users", notNull(list(notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            ))))))
                    ))),
                    inline("MessageSpanRoomMention", obj(listOf(
                        field("room","room", notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                inline("PrivateRoom", obj(listOf(
                                    field("id","id", notNull(scalar("ID"))),
                                    field("user","user", notNull(obj(listOf(
                                            field("__typename","__typename", notNull(scalar("String"))),
                                            field("id","id", notNull(scalar("ID"))),
                                            field("name","name", notNull(scalar("String")))
                                        ))))
                                ))),
                                inline("SharedRoom", obj(listOf(
                                    field("id","id", notNull(scalar("ID"))),
                                    field("title","title", notNull(scalar("String")))
                                )))
                            ))))
                    ))),
                    inline("MessageSpanLink", obj(listOf(
                        field("url","url", notNull(scalar("String")))
                    ))),
                    inline("MessageSpanDate", obj(listOf(
                        field("date","date", notNull(scalar("Date")))
                    )))
                )))))),
            inline("GeneralMessage", obj(listOf(
                field("attachments","attachments", notNull(list(notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("fallback","fallback", notNull(scalar("String"))),
                        inline("MessageAttachmentFile", obj(listOf(
                            field("fileId","fileId", notNull(scalar("String"))),
                            field("fileMetadata","fileMetadata", notNull(obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("imageFormat","imageFormat", scalar("String")),
                                    field("imageHeight","imageHeight", scalar("Int")),
                                    field("imageWidth","imageWidth", scalar("Int")),
                                    field("isImage","isImage", notNull(scalar("Boolean"))),
                                    field("mimeType","mimeType", scalar("String")),
                                    field("name","name", notNull(scalar("String"))),
                                    field("size","size", notNull(scalar("Int")))
                                )))),
                            field("filePreview","filePreview", scalar("String")),
                            field("id","id", notNull(scalar("ID")))
                        ))),
                        inline("MessageRichAttachment", obj(listOf(
                            field("fallback","fallback", notNull(scalar("String"))),
                            field("icon","icon", obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("metadata","metadata", obj(listOf(
                                            field("__typename","__typename", notNull(scalar("String"))),
                                            field("imageFormat","imageFormat", scalar("String")),
                                            field("imageHeight","imageHeight", scalar("Int")),
                                            field("imageWidth","imageWidth", scalar("Int")),
                                            field("isImage","isImage", notNull(scalar("Boolean"))),
                                            field("mimeType","mimeType", scalar("String")),
                                            field("name","name", notNull(scalar("String"))),
                                            field("size","size", notNull(scalar("Int")))
                                        ))),
                                    field("url","url", notNull(scalar("String")))
                                ))),
                            field("id","id", notNull(scalar("ID"))),
                            field("image","image", obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("metadata","metadata", obj(listOf(
                                            field("__typename","__typename", notNull(scalar("String"))),
                                            field("imageFormat","imageFormat", scalar("String")),
                                            field("imageHeight","imageHeight", scalar("Int")),
                                            field("imageWidth","imageWidth", scalar("Int")),
                                            field("isImage","isImage", notNull(scalar("Boolean"))),
                                            field("mimeType","mimeType", scalar("String")),
                                            field("name","name", notNull(scalar("String"))),
                                            field("size","size", notNull(scalar("Int")))
                                        ))),
                                    field("url","url", notNull(scalar("String")))
                                ))),
                            field("keyboard","keyboard", obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("buttons","buttons", notNull(list(list(notNull(obj(listOf(
                                            field("__typename","__typename", notNull(scalar("String"))),
                                            field("id","id", notNull(scalar("ID"))),
                                            field("style","style", notNull(scalar("String"))),
                                            field("title","title", notNull(scalar("String"))),
                                            field("url","url", scalar("String"))
                                        )))))))
                                ))),
                            field("subTitle","subTitle", scalar("String")),
                            field("text","text", scalar("String")),
                            field("title","title", scalar("String")),
                            field("titleLink","titleLink", scalar("String")),
                            field("titleLinkHostname","titleLinkHostname", scalar("String"))
                        )))
                    )))))),
                field("commentsCount","commentsCount", notNull(scalar("Int"))),
                field("edited","edited", notNull(scalar("Boolean"))),
                field("id","id", notNull(scalar("ID"))),
                field("quotedMessages","quotedMessages", notNull(list(notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("date","date", notNull(scalar("Date"))),
                        field("fallback","fallback", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("message","message", scalar("String")),
                        field("message","message", scalar("String")),
                        field("sender","sender", notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            )))),
                        field("spans","spans", notNull(list(notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("length","length", notNull(scalar("Int"))),
                                field("offset","offset", notNull(scalar("Int"))),
                                inline("MessageSpanUserMention", obj(listOf(
                                    field("user","user", notNull(obj(listOf(
                                            field("__typename","__typename", notNull(scalar("String"))),
                                            fragment("User", UserShortSelector)
                                        ))))
                                ))),
                                inline("MessageSpanMultiUserMention", obj(listOf(
                                    field("users","users", notNull(list(notNull(obj(listOf(
                                            field("__typename","__typename", notNull(scalar("String"))),
                                            fragment("User", UserShortSelector)
                                        ))))))
                                ))),
                                inline("MessageSpanRoomMention", obj(listOf(
                                    field("room","room", notNull(obj(listOf(
                                            field("__typename","__typename", notNull(scalar("String"))),
                                            inline("PrivateRoom", obj(listOf(
                                                field("id","id", notNull(scalar("ID"))),
                                                field("user","user", notNull(obj(listOf(
                                                        field("__typename","__typename", notNull(scalar("String"))),
                                                        field("id","id", notNull(scalar("ID"))),
                                                        field("name","name", notNull(scalar("String")))
                                                    ))))
                                            ))),
                                            inline("SharedRoom", obj(listOf(
                                                field("id","id", notNull(scalar("ID"))),
                                                field("title","title", notNull(scalar("String")))
                                            )))
                                        ))))
                                ))),
                                inline("MessageSpanLink", obj(listOf(
                                    field("url","url", notNull(scalar("String")))
                                ))),
                                inline("MessageSpanDate", obj(listOf(
                                    field("date","date", notNull(scalar("Date")))
                                )))
                            )))))),
                        inline("GeneralMessage", obj(listOf(
                            field("attachments","attachments", notNull(list(notNull(obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("fallback","fallback", notNull(scalar("String"))),
                                    inline("MessageAttachmentFile", obj(listOf(
                                        field("fileId","fileId", notNull(scalar("String"))),
                                        field("fileMetadata","fileMetadata", notNull(obj(listOf(
                                                field("__typename","__typename", notNull(scalar("String"))),
                                                field("imageFormat","imageFormat", scalar("String")),
                                                field("imageHeight","imageHeight", scalar("Int")),
                                                field("imageWidth","imageWidth", scalar("Int")),
                                                field("isImage","isImage", notNull(scalar("Boolean"))),
                                                field("mimeType","mimeType", scalar("String")),
                                                field("name","name", notNull(scalar("String"))),
                                                field("size","size", notNull(scalar("Int")))
                                            )))),
                                        field("filePreview","filePreview", scalar("String")),
                                        field("id","id", notNull(scalar("ID")))
                                    ))),
                                    inline("MessageRichAttachment", obj(listOf(
                                        field("fallback","fallback", notNull(scalar("String"))),
                                        field("icon","icon", obj(listOf(
                                                field("__typename","__typename", notNull(scalar("String"))),
                                                field("metadata","metadata", obj(listOf(
                                                        field("__typename","__typename", notNull(scalar("String"))),
                                                        field("imageFormat","imageFormat", scalar("String")),
                                                        field("imageHeight","imageHeight", scalar("Int")),
                                                        field("imageWidth","imageWidth", scalar("Int")),
                                                        field("isImage","isImage", notNull(scalar("Boolean"))),
                                                        field("mimeType","mimeType", scalar("String")),
                                                        field("name","name", notNull(scalar("String"))),
                                                        field("size","size", notNull(scalar("Int")))
                                                    ))),
                                                field("url","url", notNull(scalar("String")))
                                            ))),
                                        field("id","id", notNull(scalar("ID"))),
                                        field("image","image", obj(listOf(
                                                field("__typename","__typename", notNull(scalar("String"))),
                                                field("metadata","metadata", obj(listOf(
                                                        field("__typename","__typename", notNull(scalar("String"))),
                                                        field("imageFormat","imageFormat", scalar("String")),
                                                        field("imageHeight","imageHeight", scalar("Int")),
                                                        field("imageWidth","imageWidth", scalar("Int")),
                                                        field("isImage","isImage", notNull(scalar("Boolean"))),
                                                        field("mimeType","mimeType", scalar("String")),
                                                        field("name","name", notNull(scalar("String"))),
                                                        field("size","size", notNull(scalar("Int")))
                                                    ))),
                                                field("url","url", notNull(scalar("String")))
                                            ))),
                                        field("subTitle","subTitle", scalar("String")),
                                        field("text","text", scalar("String")),
                                        field("title","title", scalar("String")),
                                        field("titleLink","titleLink", scalar("String")),
                                        field("titleLinkHostname","titleLinkHostname", scalar("String"))
                                    )))
                                )))))),
                            field("commentsCount","commentsCount", notNull(scalar("Int"))),
                            field("edited","edited", notNull(scalar("Boolean"))),
                            field("id","id", notNull(scalar("ID")))
                        )))
                    )))))),
                field("reactions","reactions", notNull(list(notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("reaction","reaction", notNull(scalar("String"))),
                        field("user","user", notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            ))))
                    ))))))
            ))),
            inline("ServiceMessage", obj(listOf(
                field("id","id", notNull(scalar("ID"))),
                field("serviceMetadata","serviceMetadata", obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        inline("InviteServiceMetadata", obj(listOf(
                            field("invitedBy","invitedBy", notNull(obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("User", UserTinySelector)
                                )))),
                            field("users","users", list(notNull(obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("User", UserTinySelector)
                                )))))
                        ))),
                        inline("KickServiceMetadata", obj(listOf(
                            field("kickedBy","kickedBy", notNull(obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("User", UserTinySelector)
                                )))),
                            field("user","user", notNull(obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("User", UserTinySelector)
                                ))))
                        ))),
                        inline("TitleChangeServiceMetadata", obj(listOf(
                            field("title","title", notNull(scalar("String")))
                        ))),
                        inline("PhotoChangeServiceMetadata", obj(listOf(
                            field("photo","photo", scalar("String"))
                        ))),
                        inline("PostRespondServiceMetadata", obj(listOf(
                            field("respondType","respondType", notNull(scalar("ID")))
                        )))
                    )))
            )))
        ))

private val RoomShortSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("PrivateRoom", obj(listOf(
                field("id","id", notNull(scalar("ID"))),
                field("settings","settings", notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("mute","mute", scalar("Boolean"))
                    )))),
                field("user","user", notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("User", UserShortSelector)
                    ))))
            ))),
            inline("SharedRoom", obj(listOf(
                field("canEdit","canEdit", notNull(scalar("Boolean"))),
                field("canSendMessage","canSendMessage", notNull(scalar("Boolean"))),
                field("id","id", notNull(scalar("ID"))),
                field("isChannel","isChannel", notNull(scalar("Boolean"))),
                field("kind","kind", notNull(scalar("String"))),
                field("membersCount","membersCount", scalar("Int")),
                field("membership","membership", notNull(scalar("String"))),
                field("organization","organization", obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("Organization", OrganizationShortSelector)
                    ))),
                field("photo","photo", notNull(scalar("String"))),
                field("pinnedMessage","pinnedMessage", obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", FullMessageSelector)
                    ))),
                field("role","role", notNull(scalar("String"))),
                field("settings","settings", notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("mute","mute", scalar("Boolean"))
                    )))),
                field("title","title", notNull(scalar("String")))
            )))
        ))

private val ChatUpdateFragmentSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("ChatMessageReceived", obj(listOf(
                field("message","message", notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", FullMessageSelector)
                    )))),
                field("repeatKey","repeatKey", scalar("String"))
            ))),
            inline("ChatMessageUpdated", obj(listOf(
                field("message","message", notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", FullMessageSelector)
                    ))))
            ))),
            inline("ChatMessageDeleted", obj(listOf(
                field("message","message", notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID")))
                    ))))
            ))),
            inline("ChatUpdated", obj(listOf(
                field("chat","chat", notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("Room", RoomShortSelector)
                    ))))
            ))),
            inline("ChatLostAccess", obj(listOf(
                field("lostAccess","lostAccess", notNull(scalar("Boolean")))
            )))
        ))

private val CommentEntryFragmentSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("childComments","childComments", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                )))))),
            field("comment","comment", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    fragment("ModernMessage", FullMessageSelector)
                )))),
            field("deleted","deleted", notNull(scalar("Boolean"))),
            field("id","id", notNull(scalar("ID"))),
            field("parentComment","parentComment", obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                )))
        ))

private val CommentUpdateFragmentSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("CommentReceived", obj(listOf(
                field("comment","comment", notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("CommentEntry", CommentEntryFragmentSelector)
                    ))))
            ))),
            inline("CommentUpdated", obj(listOf(
                field("comment","comment", notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("CommentEntry", CommentEntryFragmentSelector)
                    ))))
            )))
        ))

private val CommunitySearchSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("alphaFeatured","featured", notNull(scalar("Boolean"))),
            field("id","id", notNull(scalar("ID"))),
            field("isMine","isMine", notNull(scalar("Boolean"))),
            field("membersCount","membersCount", notNull(scalar("Int"))),
            field("name","name", notNull(scalar("String"))),
            field("photo","photo", scalar("String")),
            field("status","status", notNull(scalar("String"))),
            field("superAccountId","superAccountId", notNull(scalar("ID")))
        ))

private val ConferenceFullSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("iceServers","iceServers", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("credential","credential", scalar("String")),
                    field("urls","urls", notNull(list(notNull(scalar("String"))))),
                    field("username","username", scalar("String"))
                )))))),
            field("id","id", notNull(scalar("ID"))),
            field("peers","peers", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("connection","connection", obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("ice","ice", notNull(list(notNull(scalar("String"))))),
                            field("sdp","sdp", scalar("String")),
                            field("state","state", notNull(scalar("String")))
                        ))),
                    field("id","id", notNull(scalar("ID"))),
                    field("user","user", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))))
                )))))),
            field("startTime","startTime", scalar("Date"))
        ))

private val ConferenceShortSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("iceServers","iceServers", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("credential","credential", scalar("String")),
                    field("urls","urls", notNull(list(notNull(scalar("String"))))),
                    field("username","username", scalar("String"))
                )))))),
            field("id","id", notNull(scalar("ID"))),
            field("startTime","startTime", scalar("Date"))
        ))

private val DaialogListMessageSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("date","date", notNull(scalar("Date"))),
            field("fallback","fallback", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("message","message", scalar("String")),
            field("sender","sender", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("firstName","firstName", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("name","name", notNull(scalar("String")))
                )))),
            inline("GeneralMessage", obj(listOf(
                field("attachments","attachments", notNull(list(notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("fallback","fallback", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        inline("MessageAttachmentFile", obj(listOf(
                            field("fileId","fileId", notNull(scalar("String"))),
                            field("fileMetadata","fileMetadata", notNull(obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("imageFormat","imageFormat", scalar("String")),
                                    field("isImage","isImage", notNull(scalar("Boolean")))
                                )))),
                            field("id","id", notNull(scalar("ID")))
                        )))
                    )))))),
                field("id","id", notNull(scalar("ID"))),
                field("quotedMessages","quotedMessages", notNull(list(notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID")))
                    ))))))
            )))
        ))

private val TinyMessageSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("date","date", notNull(scalar("Date"))),
            field("fallback","fallback", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("message","message", scalar("String")),
            field("sender","sender", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("User", UserTinySelector)
                )))),
            inline("GeneralMessage", obj(listOf(
                field("attachments","attachments", notNull(list(notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("fallback","fallback", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        inline("MessageAttachmentFile", obj(listOf(
                            field("fileId","fileId", notNull(scalar("String"))),
                            field("fileMetadata","fileMetadata", notNull(obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("imageFormat","imageFormat", scalar("String")),
                                    field("isImage","isImage", notNull(scalar("Boolean")))
                                )))),
                            field("filePreview","filePreview", scalar("String")),
                            field("id","id", notNull(scalar("ID")))
                        )))
                    )))))),
                field("commentsCount","commentsCount", notNull(scalar("Int"))),
                field("id","id", notNull(scalar("ID"))),
                field("quotedMessages","quotedMessages", notNull(list(notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID")))
                    ))))))
            )))
        ))

private val DialogUpdateFragmentSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("DialogMessageReceived", obj(listOf(
                field("alphaMessage","message", notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", TinyMessageSelector)
                    )))),
                field("cid","cid", notNull(scalar("ID"))),
                field("globalUnread","globalUnread", notNull(scalar("Int"))),
                field("unread","unread", notNull(scalar("Int")))
            ))),
            inline("DialogMessageUpdated", obj(listOf(
                field("alphaMessage","message", notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", TinyMessageSelector)
                    )))),
                field("cid","cid", notNull(scalar("ID")))
            ))),
            inline("DialogMessageDeleted", obj(listOf(
                field("alphaMessage","message", notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", TinyMessageSelector)
                    )))),
                field("alphaPrevMessage","prevMessage", obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", TinyMessageSelector)
                    ))),
                field("cid","cid", notNull(scalar("ID"))),
                field("globalUnread","globalUnread", notNull(scalar("Int"))),
                field("unread","unread", notNull(scalar("Int")))
            ))),
            inline("DialogMessageRead", obj(listOf(
                field("cid","cid", notNull(scalar("ID"))),
                field("globalUnread","globalUnread", notNull(scalar("Int"))),
                field("unread","unread", notNull(scalar("Int")))
            ))),
            inline("DialogMessageRead", obj(listOf(
                field("cid","cid", notNull(scalar("ID"))),
                field("globalUnread","globalUnread", notNull(scalar("Int"))),
                field("unread","unread", notNull(scalar("Int")))
            ))),
            inline("DialogTitleUpdated", obj(listOf(
                field("cid","cid", notNull(scalar("ID"))),
                field("title","title", notNull(scalar("String")))
            ))),
            inline("DialogMuteChanged", obj(listOf(
                field("cid","cid", notNull(scalar("ID"))),
                field("mute","mute", notNull(scalar("Boolean")))
            ))),
            inline("DialogMentionedChanged", obj(listOf(
                field("cid","cid", notNull(scalar("ID"))),
                field("haveMention","haveMention", notNull(scalar("Boolean")))
            ))),
            inline("DialogPhotoUpdated", obj(listOf(
                field("cid","cid", notNull(scalar("ID"))),
                field("photo","photo", scalar("String"))
            ))),
            inline("DialogDeleted", obj(listOf(
                field("cid","cid", notNull(scalar("ID"))),
                field("globalUnread","globalUnread", notNull(scalar("Int")))
            ))),
            inline("DialogBump", obj(listOf(
                field("cid","cid", notNull(scalar("ID"))),
                field("globalUnread","globalUnread", notNull(scalar("Int"))),
                field("topMessage","topMessage", obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", TinyMessageSelector)
                    ))),
                field("unread","unread", notNull(scalar("Int")))
            )))
        ))

private val UserFullSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("email","email", scalar("String")),
            field("firstName","firstName", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("isBot","isBot", notNull(scalar("Boolean"))),
            field("isYou","isYou", notNull(scalar("Boolean"))),
            field("lastName","lastName", scalar("String")),
            field("lastSeen","lastSeen", scalar("String")),
            field("linkedin","linkedin", scalar("String")),
            field("location","location", scalar("String")),
            field("name","name", notNull(scalar("String"))),
            field("online","online", notNull(scalar("Boolean"))),
            field("phone","phone", scalar("String")),
            field("photo","photo", scalar("String")),
            field("primaryOrganization","primaryOrganization", obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                ))),
            field("shortname","shortname", scalar("String")),
            field("twitter","twitter", scalar("String")),
            field("website","website", scalar("String"))
        ))

private val OrganizationFullSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("alphaFeatured","featured", notNull(scalar("Boolean"))),
            field("alphaIsCommunity","isCommunity", notNull(scalar("Boolean"))),
            field("alphaOrganizationMemberRequests","requests", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("role","role", notNull(scalar("String"))),
                    field("user","user", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserFullSelector)
                        ))))
                )))))),
            field("alphaOrganizationMembers","members", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("role","role", notNull(scalar("String"))),
                    field("user","user", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserFullSelector)
                        ))))
                )))))),
            field("betaIsAdmin","isAdmin", notNull(scalar("Boolean"))),
            field("betaIsOwner","isOwner", notNull(scalar("Boolean"))),
            field("betaPublicRooms","rooms", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))))),
            field("facebook","facebook", scalar("String")),
            field("id","id", notNull(scalar("ID"))),
            field("isMine","isMine", notNull(scalar("Boolean"))),
            field("linkedin","linkedin", scalar("String")),
            field("membersCount","membersCount", notNull(scalar("Int"))),
            field("name","name", notNull(scalar("String"))),
            field("photo","photo", scalar("String")),
            field("shortname","shortname", scalar("String")),
            field("superAccountId","superAccountId", notNull(scalar("ID"))),
            field("twitter","twitter", scalar("String")),
            field("website","website", scalar("String"))
        ))

private val OrganizationMediumSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("alphaIsCommunity","isCommunity", notNull(scalar("Boolean"))),
            field("alphaOrganizationAdminMembers","adminMembers", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("role","role", notNull(scalar("String"))),
                    field("user","user", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserFullSelector)
                        ))))
                )))))),
            field("betaIsAdmin","isAdmin", notNull(scalar("Boolean"))),
            field("betaIsOwner","isOwner", notNull(scalar("Boolean"))),
            field("id","id", notNull(scalar("ID"))),
            field("isMine","isMine", notNull(scalar("Boolean"))),
            field("membersCount","membersCount", notNull(scalar("Int"))),
            field("name","name", notNull(scalar("String"))),
            field("photo","photo", scalar("String"))
        ))

private val OrganizationProfileFullSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("alphaFeatured","featured", notNull(scalar("Boolean"))),
            field("facebook","facebook", scalar("String")),
            field("id","id", notNull(scalar("ID"))),
            field("linkedin","linkedin", scalar("String")),
            field("name","name", notNull(scalar("String"))),
            field("photoRef","photoRef", obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("crop","crop", obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("h","h", notNull(scalar("Int"))),
                            field("w","w", notNull(scalar("Int"))),
                            field("x","x", notNull(scalar("Int"))),
                            field("y","y", notNull(scalar("Int")))
                        ))),
                    field("uuid","uuid", notNull(scalar("String")))
                ))),
            field("shortname","shortname", scalar("String")),
            field("twitter","twitter", scalar("String")),
            field("website","website", scalar("String")),
            field("websiteTitle","websiteTitle", scalar("String"))
        ))

private val OrganizationSearchSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("alphaFeatured","featured", notNull(scalar("Boolean"))),
            field("alphaOrganizationMembers","members", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("user","user", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String"))),
                            field("photo","photo", scalar("String"))
                        ))))
                )))))),
            field("id","id", notNull(scalar("ID"))),
            field("isMine","isMine", notNull(scalar("Boolean"))),
            field("membersCount","membersCount", notNull(scalar("Int"))),
            field("name","name", notNull(scalar("String"))),
            field("photo","photo", scalar("String")),
            field("status","status", notNull(scalar("String"))),
            field("superAccountId","superAccountId", notNull(scalar("ID")))
        ))

private val OrganizationWithoutMembersFragmentSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("alphaFeatured","featured", notNull(scalar("Boolean"))),
            field("alphaIsCommunity","isCommunity", notNull(scalar("Boolean"))),
            field("alphaOrganizationMemberRequests","requests", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("role","role", notNull(scalar("String"))),
                    field("user","user", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserFullSelector)
                        ))))
                )))))),
            field("betaIsAdmin","isAdmin", notNull(scalar("Boolean"))),
            field("betaIsOwner","isOwner", notNull(scalar("Boolean"))),
            field("betaPublicRooms","rooms", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))))),
            field("facebook","facebook", scalar("String")),
            field("id","id", notNull(scalar("ID"))),
            field("isMine","isMine", notNull(scalar("Boolean"))),
            field("linkedin","linkedin", scalar("String")),
            field("membersCount","membersCount", notNull(scalar("Int"))),
            field("name","name", notNull(scalar("String"))),
            field("photo","photo", scalar("String")),
            field("shortname","shortname", scalar("String")),
            field("superAccountId","superAccountId", notNull(scalar("ID"))),
            field("twitter","twitter", scalar("String")),
            field("website","website", scalar("String"))
        ))

private val RoomFullSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("PrivateRoom", obj(listOf(
                field("id","id", notNull(scalar("ID"))),
                field("settings","settings", notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("mute","mute", scalar("Boolean"))
                    )))),
                field("user","user", notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("User", UserShortSelector)
                    ))))
            ))),
            inline("SharedRoom", obj(listOf(
                field("canEdit","canEdit", notNull(scalar("Boolean"))),
                field("canSendMessage","canSendMessage", notNull(scalar("Boolean"))),
                field("description","description", scalar("String")),
                field("id","id", notNull(scalar("ID"))),
                field("isChannel","isChannel", notNull(scalar("Boolean"))),
                field("kind","kind", notNull(scalar("String"))),
                field("members","members", notNull(list(notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("canKick","canKick", notNull(scalar("Boolean"))),
                        field("membership","membership", notNull(scalar("String"))),
                        field("role","role", notNull(scalar("String"))),
                        field("user","user", notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            ))))
                    )))))),
                field("membersCount","membersCount", scalar("Int")),
                field("membership","membership", notNull(scalar("String"))),
                field("organization","organization", obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("Organization", OrganizationMediumSelector)
                    ))),
                field("photo","photo", notNull(scalar("String"))),
                field("pinnedMessage","pinnedMessage", obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", FullMessageSelector)
                    ))),
                field("requests","requests", list(notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("user","user", notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            ))))
                    ))))),
                field("role","role", notNull(scalar("String"))),
                field("settings","settings", notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("mute","mute", scalar("Boolean"))
                    )))),
                field("socialImage","socialImage", scalar("String")),
                field("title","title", notNull(scalar("String"))),
                field("welcomeMessage","welcomeMessage", obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("isOn","isOn", notNull(scalar("Boolean"))),
                        field("message","message", scalar("String")),
                        field("sender","sender", obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String")))
                            )))
                    )))
            )))
        ))

private val RoomFullWithoutMembersSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("PrivateRoom", obj(listOf(
                field("id","id", notNull(scalar("ID"))),
                field("settings","settings", notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("mute","mute", scalar("Boolean"))
                    )))),
                field("user","user", notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("User", UserShortSelector)
                    ))))
            ))),
            inline("SharedRoom", obj(listOf(
                field("canEdit","canEdit", notNull(scalar("Boolean"))),
                field("canSendMessage","canSendMessage", notNull(scalar("Boolean"))),
                field("description","description", scalar("String")),
                field("id","id", notNull(scalar("ID"))),
                field("isChannel","isChannel", notNull(scalar("Boolean"))),
                field("kind","kind", notNull(scalar("String"))),
                field("membersCount","membersCount", scalar("Int")),
                field("membership","membership", notNull(scalar("String"))),
                field("organization","organization", obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("Organization", OrganizationMediumSelector)
                    ))),
                field("photo","photo", notNull(scalar("String"))),
                field("pinnedMessage","pinnedMessage", obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", FullMessageSelector)
                    ))),
                field("role","role", notNull(scalar("String"))),
                field("settings","settings", notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("mute","mute", scalar("Boolean"))
                    )))),
                field("socialImage","socialImage", scalar("String")),
                field("title","title", notNull(scalar("String"))),
                field("welcomeMessage","welcomeMessage", obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("isOn","isOn", notNull(scalar("Boolean"))),
                        field("message","message", scalar("String")),
                        field("sender","sender", obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String")))
                            )))
                    )))
            )))
        ))

private val SessionStateFullSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("isAccountActivated","isAccountActivated", notNull(scalar("Boolean"))),
            field("isAccountExists","isAccountExists", notNull(scalar("Boolean"))),
            field("isAccountPicked","isAccountPicked", notNull(scalar("Boolean"))),
            field("isBlocked","isBlocked", notNull(scalar("Boolean"))),
            field("isCompleted","isCompleted", notNull(scalar("Boolean"))),
            field("isLoggedIn","isLoggedIn", notNull(scalar("Boolean"))),
            field("isProfileCreated","isProfileCreated", notNull(scalar("Boolean")))
        ))

private val SettingsFullSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("desktopNotifications","desktopNotifications", notNull(scalar("String"))),
            field("emailFrequency","emailFrequency", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("mobileAlert","mobileAlert", notNull(scalar("Boolean"))),
            field("mobileIncludeText","mobileIncludeText", notNull(scalar("Boolean"))),
            field("mobileNotifications","mobileNotifications", notNull(scalar("String"))),
            field("primaryEmail","primaryEmail", notNull(scalar("String")))
        ))

private val UserForMentionSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("name","name", notNull(scalar("String"))),
            field("photo","photo", scalar("String")),
            field("primaryOrganization","primaryOrganization", obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("name","name", notNull(scalar("String")))
                )))
        ))

private val AccountSelector = obj(listOf(
            field("me","me", obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("User", UserShortSelector)
                ))),
            field("myPermissions","myPermissions", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("roles","roles", notNull(list(notNull(scalar("String")))))
                )))),
            field("sessionState","sessionState", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("SessionState", SessionStateFullSelector)
                ))))
        ))
private val AccountAppInviteSelector = obj(listOf(
            field("appInvite","invite", notNull(scalar("String")))
        ))
private val AccountAppInviteInfoSelector = obj(listOf(
            field("alphaInviteInfo","invite", mapOf("key" to refValue("inviteKey")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("creator","creator", obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))),
                    field("id","id", notNull(scalar("ID")))
                ))),
            field("appInviteInfo","appInvite", mapOf("key" to refValue("inviteKey")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("inviter","inviter", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))))
                )))
        ))
private val AccountInviteInfoSelector = obj(listOf(
            field("alphaInviteInfo","invite", mapOf("key" to refValue("inviteKey")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("creator","creator", obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))),
                    field("forEmail","forEmail", scalar("String")),
                    field("forName","forName", scalar("String")),
                    field("id","id", notNull(scalar("ID"))),
                    field("joined","joined", notNull(scalar("Boolean"))),
                    field("key","key", notNull(scalar("String"))),
                    field("membersCount","membersCount", scalar("Int")),
                    field("orgId","orgId", notNull(scalar("ID"))),
                    field("organization","organization", obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("about","about", scalar("String")),
                            field("alphaIsCommunity","isCommunity", notNull(scalar("Boolean"))),
                            field("id","id", notNull(scalar("ID")))
                        ))),
                    field("photo","photo", scalar("String")),
                    field("title","title", notNull(scalar("String")))
                )))
        ))
private val AccountInvitesSelector = obj(listOf(
            field("alphaInvites","invites", list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String")))
                )))))
        ))
private val AccountInvitesHistorySelector = obj(listOf(
            field("alphaInvitesHistory","invites", list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("acceptedBy","acceptedBy", obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String"))),
                            field("picture","picture", scalar("String"))
                        ))),
                    field("forEmail","forEmail", notNull(scalar("String"))),
                    field("isGlobal","isGlobal", notNull(scalar("Boolean")))
                )))))
        ))
private val AccountSettingsSelector = obj(listOf(
            field("me","me", obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("User", UserShortSelector)
                ))),
            field("myOrganizations","organizations", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                ))))))
        ))
private val AvailableRoomsSelector = obj(listOf(
            field("betaUserAvailableRooms","availableRooms", mapOf("limit" to intValue(3)), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(listOf(
                        field("id","id", notNull(scalar("ID"))),
                        field("kind","kind", notNull(scalar("String"))),
                        field("membersCount","membersCount", scalar("Int")),
                        field("membership","membership", notNull(scalar("String"))),
                        field("organization","organization", obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String"))),
                                field("photo","photo", scalar("String"))
                            ))),
                        field("photo","photo", notNull(scalar("String"))),
                        field("title","title", notNull(scalar("String")))
                    )))
                )))))),
            field("betaUserRooms","userRooms", mapOf("limit" to intValue(3)), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(listOf(
                        field("id","id", notNull(scalar("ID"))),
                        field("kind","kind", notNull(scalar("String"))),
                        field("membersCount","membersCount", scalar("Int")),
                        field("membership","membership", notNull(scalar("String"))),
                        field("organization","organization", obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String"))),
                                field("photo","photo", scalar("String"))
                            ))),
                        field("photo","photo", notNull(scalar("String"))),
                        field("title","title", notNull(scalar("String")))
                    )))
                ))))))
        ))
private val ChatHistorySelector = obj(listOf(
            field("conversationState","state", mapOf("id" to refValue("chatId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("state","state", scalar("String"))
                )))),
            field("messages","messages", mapOf("before" to refValue("before"), "chatId" to refValue("chatId"), "first" to refValue("first")), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("ModernMessage", FullMessageSelector)
                ))))))
        ))
private val ChatInitSelector = obj(listOf(
            field("conversationState","state", mapOf("id" to refValue("chatId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("state","state", scalar("String"))
                )))),
            field("messages","messages", mapOf("before" to refValue("before"), "chatId" to refValue("chatId"), "first" to refValue("first")), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("ModernMessage", FullMessageSelector)
                )))))),
            field("room","room", mapOf("id" to refValue("chatId")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))
        ))
private val ChatSearchGroupSelector = obj(listOf(
            field("alphaChatSearch","group", mapOf("members" to refValue("members")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("flexibleId","flexibleId", notNull(scalar("ID"))),
                    field("id","id", notNull(scalar("ID")))
                )))
        ))
private val ConferenceSelector = obj(listOf(
            field("conference","conference", mapOf("id" to refValue("id")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceFullSelector)
                ))))
        ))
private val ConferenceMediaSelector = obj(listOf(
            field("conferenceMedia","conferenceMedia", mapOf("id" to refValue("id"), "peerId" to refValue("peerId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("iceServers","iceServers", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("credential","credential", scalar("String")),
                            field("urls","urls", notNull(list(notNull(scalar("String"))))),
                            field("username","username", scalar("String"))
                        )))))),
                    field("id","id", notNull(scalar("ID"))),
                    field("streams","streams", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("ice","ice", notNull(list(notNull(scalar("String"))))),
                            field("id","id", notNull(scalar("ID"))),
                            field("sdp","sdp", scalar("String")),
                            field("state","state", notNull(scalar("String")))
                        ))))))
                ))))
        ))
private val DialogsSelector = obj(listOf(
            field("alphaNotificationCounter","counter", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("unreadCount","unreadCount", notNull(scalar("Int")))
                )))),
            field("dialogs","dialogs", mapOf("after" to refValue("after"), "first" to intValue(20)), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("cursor","cursor", scalar("String")),
                    field("items","items", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("alphaTopMessage","topMessage", obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("ModernMessage", DaialogListMessageSelector)
                                ))),
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
                        ))))))
                )))),
            field("dialogsState","state", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("state","state", scalar("String"))
                ))))
        ))
private val ExploreCommunitySelector = obj(listOf(
            field("alphaComunityPrefixSearch","items", mapOf("first" to intValue(25), "page" to refValue("page"), "query" to refValue("query"), "sort" to refValue("sort")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("edges","edges", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("cursor","cursor", notNull(scalar("String"))),
                            field("node","node", notNull(obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("Organization", CommunitySearchSelector)
                                ))))
                        )))))),
                    field("pageInfo","pageInfo", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("currentPage","currentPage", notNull(scalar("Int"))),
                            field("hasNextPage","hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage","hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount","itemsCount", notNull(scalar("Int"))),
                            field("openEnded","openEnded", notNull(scalar("Boolean"))),
                            field("pagesCount","pagesCount", notNull(scalar("Int")))
                        ))))
                ))))
        ))
private val ExploreOrganizationsSelector = obj(listOf(
            field("alphaOrganizations","items", mapOf("after" to refValue("after"), "all" to refValue("all"), "first" to intValue(25), "page" to refValue("page"), "prefix" to refValue("prefix"), "query" to refValue("query"), "sort" to refValue("sort")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("edges","edges", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("cursor","cursor", notNull(scalar("String"))),
                            field("node","node", notNull(obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("Organization", OrganizationSearchSelector)
                                ))))
                        )))))),
                    field("pageInfo","pageInfo", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("currentPage","currentPage", notNull(scalar("Int"))),
                            field("hasNextPage","hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage","hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount","itemsCount", notNull(scalar("Int"))),
                            field("openEnded","openEnded", notNull(scalar("Boolean"))),
                            field("pagesCount","pagesCount", notNull(scalar("Int")))
                        ))))
                ))))
        ))
private val ExplorePeopleSelector = obj(listOf(
            field("userSearch","items", mapOf("after" to refValue("after"), "first" to intValue(25), "page" to refValue("page"), "query" to refValue("query"), "sort" to refValue("sort")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("edges","edges", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("cursor","cursor", notNull(scalar("String"))),
                            field("node","node", notNull(obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("isYou","isYou", notNull(scalar("Boolean"))),
                                    fragment("User", UserShortSelector)
                                ))))
                        )))))),
                    field("pageInfo","pageInfo", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("currentPage","currentPage", notNull(scalar("Int"))),
                            field("hasNextPage","hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage","hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount","itemsCount", notNull(scalar("Int"))),
                            field("openEnded","openEnded", notNull(scalar("Boolean"))),
                            field("pagesCount","pagesCount", notNull(scalar("Int")))
                        ))))
                ))))
        ))
private val FeatureFlagsSelector = obj(listOf(
            field("featureFlags","featureFlags", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("title","title", notNull(scalar("String")))
                ))))))
        ))
private val FeedHomeSelector = obj(listOf(
            field("alphaHomeFeed","homeFeed", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("alphaBy","by", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))),
                    field("date","date", notNull(scalar("Date"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("text","text", notNull(scalar("String")))
                ))))))
        ))
private val FetchPushSettingsSelector = obj(listOf(
            field("pushSettings","pushSettings", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("webPushKey","webPushKey", scalar("String"))
                ))))
        ))
private val GetDraftMessageSelector = obj(listOf(
            field("conversationDraft","message", mapOf("conversationId" to refValue("conversationId")), scalar("String"))
        ))
private val GlobalCounterSelector = obj(listOf(
            field("alphaNotificationCounter","alphaNotificationCounter", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("unreadCount","unreadCount", notNull(scalar("Int")))
                ))))
        ))
private val GlobalSearchSelector = obj(listOf(
            field("alphaGlobalSearch","items", mapOf("query" to refValue("query")), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("Organization", obj(listOf(
                        fragment("Organization", OrganizationShortSelector)
                    ))),
                    inline("User", obj(listOf(
                        fragment("User", UserShortSelector)
                    ))),
                    inline("SharedRoom", obj(listOf(
                        field("id","id", notNull(scalar("ID"))),
                        field("kind","kind", notNull(scalar("String"))),
                        field("membersCount","membersCount", scalar("Int")),
                        field("membership","membership", notNull(scalar("String"))),
                        field("organization","organization", obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String"))),
                                field("photo","photo", scalar("String"))
                            ))),
                        field("photo","roomPhoto", notNull(scalar("String"))),
                        field("title","title", notNull(scalar("String")))
                    )))
                ))))))
        ))
private val MessageSelector = obj(listOf(
            field("message","message", mapOf("messageId" to refValue("messageId")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("ModernMessage", FullMessageSelector)
                )))
        ))
private val MessageCommentsSelector = obj(listOf(
            field("messageComments","messageComments", mapOf("messageId" to refValue("messageId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("comments","comments", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("CommentEntry", CommentEntryFragmentSelector)
                        )))))),
                    field("count","count", notNull(scalar("Int"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("state","state", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("state","state", scalar("String"))
                        ))))
                ))))
        ))
private val MyAppsSelector = obj(listOf(
            field("myApps","apps", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                ))))))
        ))
private val MyOrganizationsSelector = obj(listOf(
            field("myOrganizations","myOrganizations", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("betaIsPrimary","isPrimary", notNull(scalar("Boolean"))),
                    fragment("Organization", OrganizationShortSelector)
                ))))))
        ))
private val OnlineSelector = obj(listOf(
            field("user","user", mapOf("id" to refValue("userId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("lastSeen","lastSeen", scalar("String")),
                    field("online","online", notNull(scalar("Boolean")))
                ))))
        ))
private val OrganizationSelector = obj(listOf(
            field("organization","organization", mapOf("id" to refValue("organizationId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationFullSelector)
                ))))
        ))
private val OrganizationByPrefixSelector = obj(listOf(
            field("alphaOrganizationByPrefix","organizationByPrefix", mapOf("query" to refValue("query")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationSearchSelector)
                )))
        ))
private val OrganizationMembersShortSelector = obj(listOf(
            field("organization","organization", mapOf("id" to refValue("organizationId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("alphaOrganizationMembers","members", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("user","user", notNull(obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("id","id", notNull(scalar("ID")))
                                ))))
                        )))))),
                    fragment("Organization", OrganizationWithoutMembersFragmentSelector)
                ))))
        ))
private val OrganizationMembersShortPaginatedSelector = obj(listOf(
            field("organization","organization", mapOf("id" to refValue("organizationId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("alphaOrganizationMembers","members", mapOf("after" to refValue("after"), "first" to refValue("first")), notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("role","role", notNull(scalar("String"))),
                            field("user","user", notNull(obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("User", UserFullSelector)
                                ))))
                        )))))),
                    fragment("Organization", OrganizationWithoutMembersFragmentSelector)
                ))))
        ))
private val OrganizationProfileSelector = obj(listOf(
            field("organizationProfile","organizationProfile", mapOf("id" to refValue("organizationId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("OrganizationProfile", OrganizationProfileFullSelector)
                ))))
        ))
private val OrganizationPublicInviteSelector = obj(listOf(
            field("alphaOrganizationInviteLink","publicInvite", mapOf("organizationId" to refValue("organizationId")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("ttl","ttl", scalar("String"))
                )))
        ))
private val OrganizationWithoutMembersSelector = obj(listOf(
            field("organization","organization", mapOf("id" to refValue("organizationId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationWithoutMembersFragmentSelector)
                ))))
        ))
private val PermissionsSelector = obj(listOf(
            field("myPermissions","myPermissions", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("roles","roles", notNull(list(notNull(scalar("String")))))
                ))))
        ))
private val ProfileSelector = obj(listOf(
            field("me","user", obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("shortname","shortname", scalar("String"))
                ))),
            field("myProfile","profile", obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("about","about", scalar("String")),
                    field("alphaInvitedBy","invitedBy", obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String")))
                        ))),
                    field("alphaJoinedAt","joinedAt", scalar("String")),
                    field("alphaLinkedin","linkedin", scalar("String")),
                    field("alphaRole","role", scalar("String")),
                    field("email","email", scalar("String")),
                    field("firstName","firstName", scalar("String")),
                    field("id","id", notNull(scalar("ID"))),
                    field("lastName","lastName", scalar("String")),
                    field("location","location", scalar("String")),
                    field("phone","phone", scalar("String")),
                    field("photoRef","photoRef", obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("crop","crop", obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("h","h", notNull(scalar("Int"))),
                                    field("w","w", notNull(scalar("Int"))),
                                    field("x","x", notNull(scalar("Int"))),
                                    field("y","y", notNull(scalar("Int")))
                                ))),
                            field("uuid","uuid", notNull(scalar("String")))
                        ))),
                    field("primaryOrganization","primaryOrganization", obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String")))
                        ))),
                    field("website","website", scalar("String"))
                )))
        ))
private val ProfilePrefillSelector = obj(listOf(
            field("myProfilePrefill","prefill", obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("firstName","firstName", scalar("String")),
                    field("lastName","lastName", scalar("String")),
                    field("picture","picture", scalar("String"))
                )))
        ))
private val ResolveShortNameSelector = obj(listOf(
            field("alphaResolveShortName","item", mapOf("shortname" to refValue("shortname")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("User", obj(listOf(
                        fragment("User", UserFullSelector)
                    ))),
                    inline("Organization", obj(listOf(
                        fragment("Organization", OrganizationFullSelector)
                    )))
                )))
        ))
private val ResolvedInviteSelector = obj(listOf(
            field("alphaResolveInvite","invite", mapOf("key" to refValue("key")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("InviteInfo", obj(listOf(
                        field("creator","creator", obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            ))),
                        field("id","id", notNull(scalar("ID"))),
                        field("orgId","orgId", notNull(scalar("ID"))),
                        field("title","title", notNull(scalar("String")))
                    ))),
                    inline("AppInvite", obj(listOf(
                        field("inviter","inviter", notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            ))))
                    ))),
                    inline("RoomInvite", obj(listOf(
                        field("id","id", notNull(scalar("ID"))),
                        field("invitedByUser","invitedByUser", notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            )))),
                        field("room","room", notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                inline("SharedRoom", obj(listOf(
                                    field("description","description", scalar("String")),
                                    field("id","id", notNull(scalar("ID"))),
                                    field("isChannel","isChannel", notNull(scalar("Boolean"))),
                                    field("kind","kind", notNull(scalar("String"))),
                                    field("membersCount","membersCount", scalar("Int")),
                                    field("membership","membership", notNull(scalar("String"))),
                                    field("photo","photo", notNull(scalar("String"))),
                                    field("socialImage","socialImage", scalar("String")),
                                    field("title","title", notNull(scalar("String")))
                                )))
                            ))))
                    )))
                )))
        ))
private val RoomSelector = obj(listOf(
            field("room","room", mapOf("id" to refValue("id")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                )))
        ))
private val RoomChatSelector = obj(listOf(
            field("room","room", mapOf("id" to refValue("id")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(listOf(
                        field("id","id", notNull(scalar("ID"))),
                        field("user","user", notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String")))
                            ))))
                    ))),
                    inline("SharedRoom", obj(listOf(
                        field("canEdit","canEdit", notNull(scalar("Boolean"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("isChannel","isChannel", notNull(scalar("Boolean"))),
                        field("kind","kind", notNull(scalar("String"))),
                        field("membership","membership", notNull(scalar("String"))),
                        field("photo","photo", notNull(scalar("String"))),
                        field("pinnedMessage","pinnedMessage", obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("ModernMessage", FullMessageSelector)
                            ))),
                        field("title","title", notNull(scalar("String")))
                    )))
                )))
        ))
private val RoomHeaderSelector = obj(listOf(
            field("room","room", mapOf("id" to refValue("id")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(listOf(
                        field("id","id", notNull(scalar("ID"))),
                        field("settings","settings", notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("mute","mute", scalar("Boolean"))
                            )))),
                        field("user","user", notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String"))),
                                field("photo","photo", scalar("String")),
                                field("primaryOrganization","primaryOrganization", obj(listOf(
                                        field("__typename","__typename", notNull(scalar("String"))),
                                        field("id","id", notNull(scalar("ID"))),
                                        field("name","name", notNull(scalar("String")))
                                    )))
                            ))))
                    ))),
                    inline("SharedRoom", obj(listOf(
                        field("canEdit","canEdit", notNull(scalar("Boolean"))),
                        field("description","description", scalar("String")),
                        field("id","id", notNull(scalar("ID"))),
                        field("isChannel","isChannel", notNull(scalar("Boolean"))),
                        field("kind","kind", notNull(scalar("String"))),
                        field("membersCount","membersCount", scalar("Int")),
                        field("organization","organization", obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("betaIsAdmin","isAdmin", notNull(scalar("Boolean"))),
                                field("betaIsOwner","isOwner", notNull(scalar("Boolean"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String")))
                            ))),
                        field("photo","photo", notNull(scalar("String"))),
                        field("role","role", notNull(scalar("String"))),
                        field("settings","settings", notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("mute","mute", scalar("Boolean"))
                            )))),
                        field("socialImage","socialImage", scalar("String")),
                        field("title","title", notNull(scalar("String"))),
                        field("welcomeMessage","welcomeMessage", obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("isOn","isOn", notNull(scalar("Boolean"))),
                                field("message","message", scalar("String")),
                                field("sender","sender", obj(listOf(
                                        field("__typename","__typename", notNull(scalar("String"))),
                                        field("id","id", notNull(scalar("ID"))),
                                        field("name","name", notNull(scalar("String")))
                                    )))
                            )))
                    )))
                )))
        ))
private val RoomInviteInfoSelector = obj(listOf(
            field("betaRoomInviteInfo","invite", mapOf("invite" to refValue("invite")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("invitedByUser","invitedByUser", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))),
                    field("room","room", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            inline("SharedRoom", obj(listOf(
                                field("description","description", scalar("String")),
                                field("id","id", notNull(scalar("ID"))),
                                field("isChannel","isChannel", notNull(scalar("Boolean"))),
                                field("kind","kind", notNull(scalar("String"))),
                                field("membersCount","membersCount", scalar("Int")),
                                field("membership","membership", notNull(scalar("String"))),
                                field("organization","organization", obj(listOf(
                                        field("__typename","__typename", notNull(scalar("String"))),
                                        fragment("Organization", OrganizationShortSelector)
                                    ))),
                                field("photo","photo", notNull(scalar("String"))),
                                field("socialImage","socialImage", scalar("String")),
                                field("title","title", notNull(scalar("String")))
                            )))
                        ))))
                )))
        ))
private val RoomInviteLinkSelector = obj(listOf(
            field("betaRoomInviteLink","link", mapOf("roomId" to refValue("roomId")), notNull(scalar("String")))
        ))
private val RoomMemberShortSelector = obj(listOf(
            field("roomMember","member", mapOf("memberId" to refValue("memberId"), "roomId" to refValue("roomId")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("user","user", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("firstName","firstName", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String")))
                        ))))
                )))
        ))
private val RoomMembersSelector = obj(listOf(
            field("roomMembers","members", mapOf("roomId" to refValue("roomId")), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("canKick","canKick", notNull(scalar("Boolean"))),
                    field("membership","membership", notNull(scalar("String"))),
                    field("role","role", notNull(scalar("String"))),
                    field("user","user", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))))
                ))))))
        ))
private val RoomMembersForMentionsPaginatedSelector = obj(listOf(
            field("roomMembers","members", mapOf("after" to refValue("after"), "first" to refValue("first"), "roomId" to refValue("roomId")), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("user","user", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserForMentionSelector)
                        ))))
                ))))))
        ))
private val RoomMembersPaginatedSelector = obj(listOf(
            field("roomMembers","members", mapOf("after" to refValue("after"), "first" to refValue("first"), "roomId" to refValue("roomId")), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("canKick","canKick", notNull(scalar("Boolean"))),
                    field("membership","membership", notNull(scalar("String"))),
                    field("role","role", notNull(scalar("String"))),
                    field("user","user", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))))
                ))))))
        ))
private val RoomMembersShortSelector = obj(listOf(
            field("roomMembers","members", mapOf("roomId" to refValue("roomId")), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("user","user", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID")))
                        ))))
                ))))))
        ))
private val RoomSearchSelector = obj(listOf(
            field("betaRoomSearch","items", mapOf("first" to intValue(25), "page" to refValue("page"), "query" to refValue("query"), "sort" to refValue("sort")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("edges","edges", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("cursor","cursor", notNull(scalar("String"))),
                            field("node","node", notNull(obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    inline("SharedRoom", obj(listOf(
                                        field("id","id", notNull(scalar("ID"))),
                                        field("isChannel","isChannel", notNull(scalar("Boolean"))),
                                        field("kind","kind", notNull(scalar("String"))),
                                        field("membersCount","membersCount", scalar("Int")),
                                        field("membership","membership", notNull(scalar("String"))),
                                        field("organization","organization", obj(listOf(
                                                field("__typename","__typename", notNull(scalar("String"))),
                                                field("id","id", notNull(scalar("ID"))),
                                                field("name","name", notNull(scalar("String"))),
                                                field("photo","photo", scalar("String"))
                                            ))),
                                        field("photo","photo", notNull(scalar("String"))),
                                        field("title","title", notNull(scalar("String")))
                                    )))
                                ))))
                        )))))),
                    field("pageInfo","pageInfo", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("currentPage","currentPage", notNull(scalar("Int"))),
                            field("hasNextPage","hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage","hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount","itemsCount", notNull(scalar("Int"))),
                            field("openEnded","openEnded", notNull(scalar("Boolean"))),
                            field("pagesCount","pagesCount", notNull(scalar("Int")))
                        ))))
                ))))
        ))
private val RoomSearchTextSelector = obj(listOf(
            field("betaDialogTextSearch","items", mapOf("query" to refValue("query")), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("cid","id", notNull(scalar("ID"))),
                    field("fid","flexibleId", notNull(scalar("ID"))),
                    field("id","id2", notNull(scalar("ID"))),
                    field("kind","kind", notNull(scalar("String"))),
                    field("photo","photo", notNull(scalar("String"))),
                    field("title","title", notNull(scalar("String")))
                ))))))
        ))
private val RoomSuperSelector = obj(listOf(
            field("roomSuper","roomSuper", mapOf("id" to refValue("id")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("featured","featured", notNull(scalar("Boolean"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("listed","listed", notNull(scalar("Boolean")))
                )))
        ))
private val RoomTinySelector = obj(listOf(
            field("room","room", mapOf("id" to refValue("id")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))
        ))
private val RoomWithoutMembersSelector = obj(listOf(
            field("room","room", mapOf("id" to refValue("id")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullWithoutMembersSelector)
                )))
        ))
private val SettingsSelector = obj(listOf(
            field("settings","settings", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Settings", SettingsFullSelector)
                ))))
        ))
private val SuperAccountSelector = obj(listOf(
            field("superAccount","superAccount", mapOf("id" to refValue("accountId"), "viaOrgId" to refValue("viaOrgId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("alphaPublished","published", notNull(scalar("Boolean"))),
                    field("createdAt","createdAt", scalar("String")),
                    field("createdBy","createdBy", obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String")))
                        ))),
                    field("features","features", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("key","key", notNull(scalar("String"))),
                            field("title","title", notNull(scalar("String")))
                        )))))),
                    field("id","id", notNull(scalar("ID"))),
                    field("members","members", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))))),
                    field("orgId","orgId", notNull(scalar("ID"))),
                    field("state","state", notNull(scalar("String"))),
                    field("title","title", notNull(scalar("String")))
                ))))
        ))
private val SuperAccountsSelector = obj(listOf(
            field("superAccounts","superAccounts", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("orgId","orgId", notNull(scalar("ID"))),
                    field("state","state", notNull(scalar("String"))),
                    field("title","title", notNull(scalar("String")))
                ))))))
        ))
private val SuperAdminsSelector = obj(listOf(
            field("superAdmins","superAdmins", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("email","email", scalar("String")),
                    field("role","role", notNull(scalar("String"))),
                    field("user","user", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))))
                ))))))
        ))
private val UserSelector = obj(listOf(
            field("room","conversation", mapOf("id" to refValue("userId")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(listOf(
                        field("id","id", notNull(scalar("ID"))),
                        field("settings","settings", notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("mute","mute", scalar("Boolean"))
                            ))))
                    )))
                ))),
            field("user","user", mapOf("id" to refValue("userId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("User", UserFullSelector)
                ))))
        ))
private val UserAvailableRoomsSelector = obj(listOf(
            field("betaUserAvailableRooms","betaUserAvailableRooms", mapOf("after" to refValue("after"), "limit" to refValue("limit")), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(listOf(
                        field("id","id", notNull(scalar("ID"))),
                        field("kind","kind", notNull(scalar("String"))),
                        field("membersCount","membersCount", scalar("Int")),
                        field("membership","membership", notNull(scalar("String"))),
                        field("organization","organization", obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String"))),
                                field("photo","photo", scalar("String"))
                            ))),
                        field("photo","photo", notNull(scalar("String"))),
                        field("title","title", notNull(scalar("String")))
                    )))
                ))))))
        ))
private val UserRoomsSelector = obj(listOf(
            field("betaUserRooms","betaUserRooms", mapOf("after" to refValue("after"), "limit" to refValue("limit")), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(listOf(
                        field("id","id", notNull(scalar("ID"))),
                        field("kind","kind", notNull(scalar("String"))),
                        field("membersCount","membersCount", scalar("Int")),
                        field("membership","membership", notNull(scalar("String"))),
                        field("organization","organization", obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String"))),
                                field("photo","photo", scalar("String"))
                            ))),
                        field("photo","photo", notNull(scalar("String"))),
                        field("title","title", notNull(scalar("String")))
                    )))
                ))))))
        ))
private val UserStorageSelector = obj(listOf(
            field("userStorage","userStorage", mapOf("keys" to refValue("keys"), "namespace" to refValue("namespace")), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("value","value", scalar("String"))
                ))))))
        ))
private val UsersSelector = obj(listOf(
            field("users","items", mapOf("query" to refValue("query")), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("email","subtitle", scalar("String")),
                    field("id","id", notNull(scalar("ID"))),
                    field("name","title", notNull(scalar("String")))
                ))))))
        ))
private val AccountCreateInviteSelector = obj(listOf(
            field("alphaCreateInvite","alphaCreateInvite", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String")))
                ))))
        ))
private val AccountDestroyInviteSelector = obj(listOf(
            field("alphaDeleteInvite","alphaDeleteInvite", mapOf("id" to refValue("id")), notNull(scalar("String")))
        ))
private val AccountInviteJoinSelector = obj(listOf(
            field("alphaJoinInvite","alphaJoinInvite", mapOf("key" to refValue("inviteKey")), notNull(scalar("ID")))
        ))
private val AddAppToChatSelector = obj(listOf(
            field("addAppToChat","addAppToChat", mapOf("appId" to refValue("appId"), "chatId" to refValue("chatId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("AppChat", AppChatSelector)
                ))))
        ))
private val AddMessageCommentSelector = obj(listOf(
            field("addMessageComment","addMessageComment", mapOf("fileAttachments" to refValue("fileAttachments"), "mentions" to refValue("mentions"), "message" to refValue("message"), "messageId" to refValue("messageId"), "replyComment" to refValue("replyComment")), notNull(scalar("Boolean")))
        ))
private val BetaAddMessageCommentSelector = obj(listOf(
            field("betaAddMessageComment","betaAddMessageComment", mapOf("fileAttachments" to refValue("fileAttachments"), "mentions" to refValue("mentions"), "message" to refValue("message"), "messageId" to refValue("messageId"), "replyComment" to refValue("replyComment")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                ))))
        ))
private val CancelTypingSelector = obj(listOf(
            field("typingCancel","typingCancel", mapOf("conversationId" to refValue("conversationId")), notNull(scalar("String")))
        ))
private val CommentSetReactionSelector = obj(listOf(
            field("commentReactionAdd","commentReactionAdd", mapOf("commentId" to refValue("commentId"), "reaction" to refValue("reaction")), notNull(scalar("Boolean")))
        ))
private val CommentUnsetReactionSelector = obj(listOf(
            field("commentReactionRemove","commentReactionRemove", mapOf("commentId" to refValue("commentId"), "reaction" to refValue("reaction")), notNull(scalar("Boolean")))
        ))
private val ConferenceAnswerSelector = obj(listOf(
            field("peerConnectionAnswer","peerConnectionAnswer", mapOf("answer" to refValue("answer"), "id" to refValue("id"), "ownPeerId" to refValue("ownPeerId"), "peerId" to refValue("peerId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                ))))
        ))
private val ConferenceCandidateSelector = obj(listOf(
            field("peerConnectionCandidate","peerConnectionCandidate", mapOf("candidate" to refValue("candidate"), "id" to refValue("id"), "ownPeerId" to refValue("ownPeerId"), "peerId" to refValue("peerId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                ))))
        ))
private val ConferenceJoinSelector = obj(listOf(
            field("conferenceJoin","conferenceJoin", mapOf("id" to refValue("id")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("conference","conference", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("Conference", ConferenceShortSelector)
                        )))),
                    field("peerId","peerId", notNull(scalar("ID")))
                ))))
        ))
private val ConferenceKeepAliveSelector = obj(listOf(
            field("conferenceKeepAlive","conferenceKeepAlive", mapOf("id" to refValue("id"), "peerId" to refValue("peerId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                ))))
        ))
private val ConferenceLeaveSelector = obj(listOf(
            field("conferenceLeave","conferenceLeave", mapOf("id" to refValue("id"), "peerId" to refValue("peerId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                ))))
        ))
private val ConferenceOfferSelector = obj(listOf(
            field("peerConnectionOffer","peerConnectionOffer", mapOf("id" to refValue("id"), "offer" to refValue("offer"), "ownPeerId" to refValue("ownPeerId"), "peerId" to refValue("peerId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                ))))
        ))
private val CreateAppSelector = obj(listOf(
            field("createApp","createApp", mapOf("about" to refValue("about"), "name" to refValue("name"), "photoRef" to refValue("photoRef"), "shortname" to refValue("shortname")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                ))))
        ))
private val CreateOrganizationSelector = obj(listOf(
            field("createOrganization","organization", mapOf("input" to refValue("input")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("name","name", notNull(scalar("String")))
                ))))
        ))
private val CreateUserProfileAndOrganizationSelector = obj(listOf(
            field("alphaCreateUserProfileAndOrganization","alphaCreateUserProfileAndOrganization", mapOf("organization" to refValue("organization"), "user" to refValue("user")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("organization","organization", obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String")))
                        ))),
                    field("user","user", obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserFullSelector)
                        )))
                ))))
        ))
private val DebugMailsSelector = obj(listOf(
            field("debugSendEmail","debugSendEmail", mapOf("type" to refValue("type")), scalar("Boolean"))
        ))
private val DeleteCommentSelector = obj(listOf(
            field("deleteComment","deleteComment", mapOf("id" to refValue("id")), notNull(scalar("Boolean")))
        ))
private val DeleteOrganizationSelector = obj(listOf(
            field("deleteOrganization","deleteOrganization", mapOf("id" to refValue("organizationId")), notNull(scalar("Boolean")))
        ))
private val DeleteUserSelector = obj(listOf(
            field("superDeleteUser","superDeleteUser", mapOf("id" to refValue("id")), notNull(scalar("Boolean")))
        ))
private val EditCommentSelector = obj(listOf(
            field("editComment","editComment", mapOf("fileAttachments" to refValue("fileAttachments"), "id" to refValue("id"), "mentions" to refValue("mentions"), "message" to refValue("message")), notNull(scalar("Boolean")))
        ))
private val EditMessageSelector = obj(listOf(
            field("editMessage","editMessage", mapOf("fileAttachments" to refValue("fileAttachments"), "mentions" to refValue("mentions"), "message" to refValue("message"), "messageId" to refValue("messageId"), "replyMessages" to refValue("replyMessages"), "spans" to refValue("spans")), notNull(scalar("Boolean")))
        ))
private val EditPostMessageSelector = obj(listOf(
            field("alphaEditPostMessage","editPostMessage", mapOf("attachments" to refValue("attachments"), "messageId" to refValue("messageId"), "postType" to refValue("postType"), "text" to refValue("text"), "title" to refValue("title")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("seq","seq", notNull(scalar("Int")))
                ))))
        ))
private val FeatureFlagAddSelector = obj(listOf(
            field("featureFlagAdd","featureFlagAdd", mapOf("key" to refValue("key"), "title" to refValue("title")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("title","title", notNull(scalar("String")))
                ))))
        ))
private val FeatureFlagDisableSelector = obj(listOf(
            field("superAccountFeatureRemove","superAccountFeatureRemove", mapOf("featureId" to refValue("featureId"), "id" to refValue("accountId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("features","features", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("key","key", notNull(scalar("String"))),
                            field("title","title", notNull(scalar("String")))
                        )))))),
                    field("id","id", notNull(scalar("ID")))
                ))))
        ))
private val FeatureFlagEnableSelector = obj(listOf(
            field("superAccountFeatureAdd","superAccountFeatureAdd", mapOf("featureId" to refValue("featureId"), "id" to refValue("accountId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("features","features", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("key","key", notNull(scalar("String"))),
                            field("title","title", notNull(scalar("String")))
                        )))))),
                    field("id","id", notNull(scalar("ID")))
                ))))
        ))
private val FeedPostSelector = obj(listOf(
            field("alphaCreateFeedPost","alphaCreateFeedPost", mapOf("message" to refValue("message")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                ))))
        ))
private val MarkSequenceReadSelector = obj(listOf(
            field("alphaGlobalRead","alphaGlobalRead", mapOf("toSeq" to refValue("seq")), notNull(scalar("String")))
        ))
private val MediaAnswerSelector = obj(listOf(
            field("mediaStreamAnswer","mediaStreamAnswer", mapOf("answer" to refValue("answer"), "id" to refValue("id"), "peerId" to refValue("peerId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("streams","streams", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("ice","ice", notNull(list(notNull(scalar("String"))))),
                            field("id","id", notNull(scalar("ID"))),
                            field("sdp","sdp", scalar("String")),
                            field("state","state", notNull(scalar("String")))
                        ))))))
                ))))
        ))
private val MediaCandidateSelector = obj(listOf(
            field("mediaStreamCandidate","mediaStreamCandidate", mapOf("candidate" to refValue("candidate"), "id" to refValue("id"), "peerId" to refValue("peerId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("streams","streams", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("ice","ice", notNull(list(notNull(scalar("String"))))),
                            field("id","id", notNull(scalar("ID"))),
                            field("sdp","sdp", scalar("String")),
                            field("state","state", notNull(scalar("String")))
                        ))))))
                ))))
        ))
private val MediaFailedSelector = obj(listOf(
            field("mediaStreamFailed","mediaStreamFailed", mapOf("id" to refValue("id"), "peerId" to refValue("peerId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("streams","streams", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("ice","ice", notNull(list(notNull(scalar("String"))))),
                            field("id","id", notNull(scalar("ID"))),
                            field("sdp","sdp", scalar("String")),
                            field("state","state", notNull(scalar("String")))
                        ))))))
                ))))
        ))
private val MediaNegotiationNeededSelector = obj(listOf(
            field("mediaStreamNegotiationNeeded","mediaStreamNegotiationNeeded", mapOf("id" to refValue("id"), "peerId" to refValue("peerId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("streams","streams", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("ice","ice", notNull(list(notNull(scalar("String"))))),
                            field("id","id", notNull(scalar("ID"))),
                            field("sdp","sdp", scalar("String")),
                            field("state","state", notNull(scalar("String")))
                        ))))))
                ))))
        ))
private val MediaOfferSelector = obj(listOf(
            field("mediaStreamOffer","mediaStreamOffer", mapOf("id" to refValue("id"), "offer" to refValue("offer"), "peerId" to refValue("peerId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("streams","streams", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("ice","ice", notNull(list(notNull(scalar("String"))))),
                            field("id","id", notNull(scalar("ID"))),
                            field("sdp","sdp", scalar("String")),
                            field("state","state", notNull(scalar("String")))
                        ))))))
                ))))
        ))
private val MessageSetReactionSelector = obj(listOf(
            field("betaReactionSet","betaReactionSet", mapOf("mid" to refValue("messageId"), "reaction" to refValue("reaction")), notNull(scalar("Boolean")))
        ))
private val MessageUnsetReactionSelector = obj(listOf(
            field("betaReactionRemove","betaReactionRemove", mapOf("mid" to refValue("messageId"), "reaction" to refValue("reaction")), notNull(scalar("Boolean")))
        ))
private val OrganizationActivateByInviteSelector = obj(listOf(
            field("joinAppInvite","joinAppInvite", mapOf("key" to refValue("inviteKey")), notNull(scalar("ID")))
        ))
private val OrganizationAddMemberSelector = obj(listOf(
            field("betaOrganizationMemberAdd","betaOrganizationMemberAdd", mapOf("organizationId" to refValue("organizationId"), "userIds" to refValue("userIds")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationFullSelector)
                ))))
        ))
private val OrganizationAlterPublishedSelector = obj(listOf(
            field("alphaAlterPublished","alphaAlterPublished", mapOf("id" to refValue("organizationId"), "published" to refValue("published")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationSearchSelector)
                ))))
        ))
private val OrganizationChangeMemberRoleSelector = obj(listOf(
            field("alphaOrganizationChangeMemberRole","alphaOrganizationChangeMemberRole", mapOf("memberId" to refValue("memberId"), "newRole" to refValue("newRole"), "organizationId" to refValue("organizationId")), notNull(scalar("String")))
        ))
private val OrganizationCreatePublicInviteSelector = obj(listOf(
            field("alphaOrganizationRefreshInviteLink","alphaOrganizationRefreshInviteLink", mapOf("expirationDays" to refValue("expirationDays"), "organizationId" to refValue("organizationId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("ttl","ttl", scalar("String"))
                ))))
        ))
private val OrganizationInviteMembersSelector = obj(listOf(
            field("alphaOrganizationInviteMembers","alphaOrganizationInviteMembers", mapOf("inviteRequests" to refValue("inviteRequests"), "organizationId" to refValue("organizationId")), notNull(scalar("String")))
        ))
private val OrganizationMemberRemoveSelector = obj(listOf(
            field("betaOrganizationMemberRemove","betaOrganizationMemberRemove", mapOf("organizationId" to refValue("organizationId"), "userId" to refValue("userId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                ))))
        ))
private val OrganizationRemoveMemberSelector = obj(listOf(
            field("alphaOrganizationRemoveMember","alphaOrganizationRemoveMember", mapOf("memberId" to refValue("memberId"), "organizationId" to refValue("organizationId")), notNull(scalar("String")))
        ))
private val PersistEventsSelector = obj(listOf(
            field("track","track", mapOf("did" to refValue("did"), "events" to refValue("events"), "isProd" to refValue("isProd"), "platform" to refValue("platform")), notNull(scalar("String")))
        ))
private val PinMessageSelector = obj(listOf(
            field("betaPinMessage","pinMessage", mapOf("chatId" to refValue("chatId"), "messageId" to refValue("messageId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                ))))
        ))
private val ProfileCreateSelector = obj(listOf(
            field("createProfile","createProfile", mapOf("input" to refValue("input")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("about","about", scalar("String")),
                    field("email","email", scalar("String")),
                    field("firstName","firstName", scalar("String")),
                    field("id","id", notNull(scalar("ID"))),
                    field("lastName","lastName", scalar("String")),
                    field("location","location", scalar("String")),
                    field("phone","phone", scalar("String")),
                    field("photoRef","photoRef", obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("crop","crop", obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("h","h", notNull(scalar("Int"))),
                                    field("w","w", notNull(scalar("Int"))),
                                    field("x","x", notNull(scalar("Int"))),
                                    field("y","y", notNull(scalar("Int")))
                                ))),
                            field("uuid","uuid", notNull(scalar("String")))
                        ))),
                    field("website","website", scalar("String"))
                ))))
        ))
private val ProfileUpdateSelector = obj(listOf(
            field("updateProfile","updateProfile", mapOf("input" to refValue("input"), "uid" to refValue("uid")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("about","about", scalar("String")),
                    field("alphaInvitedBy","invitedBy", obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String")))
                        ))),
                    field("alphaJoinedAt","joinedAt", scalar("String")),
                    field("alphaLinkedin","linkedin", scalar("String")),
                    field("alphaPrimaryOrganizationId","primaryOrganizationId", scalar("ID")),
                    field("alphaRole","role", scalar("String")),
                    field("email","email", scalar("String")),
                    field("firstName","firstName", scalar("String")),
                    field("id","id", notNull(scalar("ID"))),
                    field("lastName","lastName", scalar("String")),
                    field("location","location", scalar("String")),
                    field("phone","phone", scalar("String")),
                    field("photoRef","photoRef", obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("crop","crop", obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("h","h", notNull(scalar("Int"))),
                                    field("w","w", notNull(scalar("Int"))),
                                    field("x","x", notNull(scalar("Int"))),
                                    field("y","y", notNull(scalar("Int")))
                                ))),
                            field("uuid","uuid", notNull(scalar("String")))
                        ))),
                    field("website","website", scalar("String"))
                ))))
        ))
private val RefreshAppTokenSelector = obj(listOf(
            field("refreshAppToken","refreshAppToken", mapOf("appId" to refValue("appId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                ))))
        ))
private val RegisterPushSelector = obj(listOf(
            field("registerPush","registerPush", mapOf("endpoint" to refValue("endpoint"), "type" to refValue("type")), notNull(scalar("String")))
        ))
private val RegisterWebPushSelector = obj(listOf(
            field("registerWebPush","registerWebPush", mapOf("endpoint" to refValue("endpoint")), notNull(scalar("String")))
        ))
private val ReplyMessageSelector = obj(listOf(
            field("sendMessage","replyMessage", mapOf("chatId" to refValue("chatId"), "fileAttachments" to refValue("fileAttachments"), "mentions" to refValue("mentions"), "message" to refValue("message"), "repeatKey" to refValue("repeatKey"), "replyMessages" to refValue("replyMessages"), "spans" to refValue("spans")), notNull(scalar("Boolean")))
        ))
private val ReportOnlineSelector = obj(listOf(
            field("presenceReportOnline","presenceReportOnline", mapOf("active" to refValue("active"), "platform" to refValue("platform"), "timeout" to intValue(5000)), notNull(scalar("String")))
        ))
private val RespondPostMessageSelector = obj(listOf(
            field("alphaRespondPostMessage","alphaRespondPostMessage", mapOf("buttonId" to refValue("buttonId"), "messageId" to refValue("messageId")), scalar("Boolean")),
            field("betaReactionSet","betaReactionSet", mapOf("mid" to refValue("messageId"), "reaction" to refValue("reaction")), notNull(scalar("Boolean")))
        ))
private val RoomAddMemberSelector = obj(listOf(
            field("betaRoomInvite","betaRoomInvite", mapOf("invites" to listValue(objectValue("userId" to refValue("userId"),"role" to stringValue("MEMBER"))), "roomId" to refValue("roomId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                ))))
        ))
private val RoomAddMembersSelector = obj(listOf(
            field("betaRoomInvite","betaRoomInvite", mapOf("invites" to refValue("invites"), "roomId" to refValue("roomId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                ))))
        ))
private val RoomAlterFeaturedSelector = obj(listOf(
            field("betaRoomAlterFeatured","betaRoomAlterFeatured", mapOf("featured" to refValue("featured"), "roomId" to refValue("roomId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("featured","featured", notNull(scalar("Boolean"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("listed","listed", notNull(scalar("Boolean")))
                ))))
        ))
private val RoomAlterHiddenSelector = obj(listOf(
            field("betaRoomAlterListed","betaRoomAlterListed", mapOf("listed" to refValue("listed"), "roomId" to refValue("roomId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("featured","featured", notNull(scalar("Boolean"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("listed","listed", notNull(scalar("Boolean")))
                ))))
        ))
private val RoomChangeRoleSelector = obj(listOf(
            field("betaRoomChangeRole","betaRoomChangeRole", mapOf("newRole" to refValue("newRole"), "roomId" to refValue("roomId"), "userId" to refValue("userId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                ))))
        ))
private val RoomCreateSelector = obj(listOf(
            field("betaRoomCreate","room", mapOf("channel" to refValue("channel"), "description" to refValue("description"), "kind" to refValue("kind"), "members" to refValue("members"), "message" to refValue("message"), "organizationId" to refValue("organizationId"), "photoRef" to refValue("photoRef"), "title" to refValue("title")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                ))))
        ))
private val RoomCreateIntroSelector = obj(listOf(
            field("betaIntroSend","intro", mapOf("about" to refValue("about"), "file" to refValue("file"), "message" to refValue("about"), "room" to refValue("roomId"), "uid" to refValue("uid")), notNull(scalar("Boolean")))
        ))
private val RoomDeclineJoinReuestSelector = obj(listOf(
            field("betaRoomDeclineJoinRequest","betaRoomDeclineJoinRequest", mapOf("roomId" to refValue("roomId"), "userId" to refValue("userId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                ))))
        ))
private val RoomDeleteMessageSelector = obj(listOf(
            field("betaMessageDelete","betaMessageDelete", mapOf("mid" to refValue("messageId")), notNull(scalar("Boolean")))
        ))
private val RoomDeleteMessagesSelector = obj(listOf(
            field("betaMessageDelete","betaMessageDelete", mapOf("mids" to refValue("mids")), notNull(scalar("Boolean")))
        ))
private val RoomDeleteUrlAugmentationSelector = obj(listOf(
            field("betaMessageDeleteAugmentation","betaMessageDeleteAugmentation", mapOf("mid" to refValue("messageId")), notNull(scalar("Boolean")))
        ))
private val RoomEditIntroSelector = obj(listOf(
            field("betaIntroEdit","intro", mapOf("about" to refValue("about"), "file" to refValue("file"), "message" to refValue("about"), "mid" to refValue("messageId"), "uid" to refValue("uid")), notNull(scalar("Boolean")))
        ))
private val RoomJoinSelector = obj(listOf(
            field("betaRoomJoin","join", mapOf("roomId" to refValue("roomId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                ))))
        ))
private val RoomJoinInviteLinkSelector = obj(listOf(
            field("betaRoomInviteLinkJoin","join", mapOf("invite" to refValue("invite")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                ))))
        ))
private val RoomKickSelector = obj(listOf(
            field("betaRoomKick","betaRoomKick", mapOf("roomId" to refValue("roomId"), "userId" to refValue("userId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                ))))
        ))
private val RoomLeaveSelector = obj(listOf(
            field("betaRoomLeave","betaRoomLeave", mapOf("roomId" to refValue("roomId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                ))))
        ))
private val RoomReadSelector = obj(listOf(
            field("roomRead","roomRead", mapOf("id" to refValue("id"), "mid" to refValue("mid")), notNull(scalar("Boolean")))
        ))
private val RoomRenewInviteLinkSelector = obj(listOf(
            field("betaRoomInviteLinkRenew","link", mapOf("roomId" to refValue("roomId")), notNull(scalar("String")))
        ))
private val RoomSendEmailInviteSelector = obj(listOf(
            field("betaRoomInviteLinkSendEmail","betaRoomInviteLinkSendEmail", mapOf("inviteRequests" to refValue("inviteRequests"), "roomId" to refValue("roomId")), notNull(scalar("String")))
        ))
private val RoomSettingsUpdateSelector = obj(listOf(
            field("betaRoomUpdateUserNotificationSettings","betaRoomUpdateUserNotificationSettings", mapOf("roomId" to refValue("roomId"), "settings" to refValue("settings")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("mute","mute", scalar("Boolean"))
                ))))
        ))
private val RoomUpdateSelector = obj(listOf(
            field("betaRoomUpdate","betaRoomUpdate", mapOf("input" to refValue("input"), "roomId" to refValue("roomId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(listOf(
                        field("id","id", notNull(scalar("ID")))
                    ))),
                    inline("SharedRoom", obj(listOf(
                        field("description","description", scalar("String")),
                        field("id","id", notNull(scalar("ID"))),
                        field("photo","photo", notNull(scalar("String"))),
                        field("socialImage","socialImage", scalar("String")),
                        field("title","title", notNull(scalar("String")))
                    )))
                ))))
        ))
private val SaveDraftMessageSelector = obj(listOf(
            field("conversationDraftUpdate","conversationDraftUpdate", mapOf("conversationId" to refValue("conversationId"), "message" to refValue("message")), notNull(scalar("String")))
        ))
private val SendMessageSelector = obj(listOf(
            field("sendMessage","sentMessage", mapOf("chatId" to refValue("chatId"), "fileAttachments" to refValue("fileAttachments"), "mentions" to refValue("mentions"), "message" to refValue("message"), "repeatKey" to refValue("repeatKey"), "replyMessages" to refValue("replyMessages"), "spans" to refValue("spans")), notNull(scalar("Boolean")))
        ))
private val SendPostMessageSelector = obj(listOf(
            field("alphaSendPostMessage","sendPostMessage", mapOf("attachments" to refValue("attachments"), "conversationId" to refValue("conversationId"), "postType" to refValue("postType"), "text" to refValue("text"), "title" to refValue("title")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("seq","seq", notNull(scalar("Int")))
                ))))
        ))
private val SetOrgShortnameSelector = obj(listOf(
            field("alphaSetOrgShortName","alphaSetOrgShortName", mapOf("id" to refValue("organizationId"), "shortname" to refValue("shortname")), scalar("String"))
        ))
private val SetTypingSelector = obj(listOf(
            field("typingSend","typingSend", mapOf("conversationId" to refValue("conversationId"), "type" to stringValue("TEXT")), notNull(scalar("String")))
        ))
private val SetUserShortnameSelector = obj(listOf(
            field("alphaSetUserShortName","alphaSetUserShortName", mapOf("shortname" to refValue("shortname")), scalar("String"))
        ))
private val SettingsUpdateSelector = obj(listOf(
            field("updateSettings","updateSettings", mapOf("settings" to refValue("input")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Settings", SettingsFullSelector)
                ))))
        ))
private val SuperAccountActivateSelector = obj(listOf(
            field("superAccountActivate","superAccountActivate", mapOf("id" to refValue("accountId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("state","state", notNull(scalar("String")))
                ))))
        ))
private val SuperAccountAddSelector = obj(listOf(
            field("superAccountAdd","superAccountAdd", mapOf("title" to refValue("title")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                ))))
        ))
private val SuperAccountMemberAddSelector = obj(listOf(
            field("superAccountMemberAdd","superAccountMemberAdd", mapOf("id" to refValue("accountId"), "userId" to refValue("userId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("members","members", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))))))
                ))))
        ))
private val SuperAccountMemberRemoveSelector = obj(listOf(
            field("superAccountMemberRemove","superAccountMemberRemove", mapOf("id" to refValue("accountId"), "userId" to refValue("userId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("members","members", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))))))
                ))))
        ))
private val SuperAccountPendSelector = obj(listOf(
            field("superAccountPend","superAccountPend", mapOf("id" to refValue("accountId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("state","state", notNull(scalar("String")))
                ))))
        ))
private val SuperAccountRenameSelector = obj(listOf(
            field("superAccountRename","superAccountRename", mapOf("id" to refValue("accountId"), "title" to refValue("title")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("title","title", notNull(scalar("String")))
                ))))
        ))
private val SuperAccountSuspendSelector = obj(listOf(
            field("superAccountSuspend","superAccountSuspend", mapOf("id" to refValue("accountId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("state","state", notNull(scalar("String")))
                ))))
        ))
private val SuperAdminAddSelector = obj(listOf(
            field("superAdminAdd","superAdminAdd", mapOf("role" to refValue("role"), "userId" to refValue("userId")), notNull(scalar("String")))
        ))
private val SuperAdminRemoveSelector = obj(listOf(
            field("superAdminRemove","superAdminRemove", mapOf("userId" to refValue("userId")), notNull(scalar("String")))
        ))
private val SwitchReactionSelector = obj(listOf(
            field("betaReactionRemove","betaReactionRemove", mapOf("mid" to refValue("messageId"), "reaction" to refValue("from")), notNull(scalar("Boolean"))),
            field("betaReactionSet","betaReactionSet", mapOf("mid" to refValue("messageId"), "reaction" to refValue("to")), notNull(scalar("Boolean")))
        ))
private val UnpinMessageSelector = obj(listOf(
            field("betaUnpinMessage","unpinMessage", mapOf("chatId" to refValue("chatId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                ))))
        ))
private val UpdateAppSelector = obj(listOf(
            field("updateAppProfile","updateAppProfile", mapOf("appId" to refValue("appId"), "input" to refValue("input")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                ))))
        ))
private val UpdateOrganizationSelector = obj(listOf(
            field("updateOrganizationProfile","updateOrganizationProfile", mapOf("id" to refValue("organizationId"), "input" to refValue("input")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("OrganizationProfile", OrganizationProfileFullSelector)
                ))))
        ))
private val UpdateWelcomeMessageSelector = obj(listOf(
            field("updateWelcomeMessage","updateWelcomeMessage", mapOf("roomId" to refValue("roomId"), "welcomeMessageIsOn" to refValue("welcomeMessageIsOn"), "welcomeMessageSender" to refValue("welcomeMessageSender"), "welcomeMessageText" to refValue("welcomeMessageText")), notNull(scalar("Boolean")))
        ))
private val UserStorageSetSelector = obj(listOf(
            field("userStorageSet","userStorageSet", mapOf("data" to refValue("data"), "namespace" to refValue("namespace")), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("value","value", scalar("String"))
                ))))))
        ))
private val ChatOnlinesCountWatchSelector = obj(listOf(
            field("chatOnlinesCount","chatOnlinesCount", mapOf("chatId" to refValue("chatId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("onlineMembers","onlineMembers", notNull(scalar("Int")))
                ))))
        ))
private val ChatWatchSelector = obj(listOf(
            field("chatUpdates","event", mapOf("chatId" to refValue("chatId"), "fromState" to refValue("state")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("ChatUpdateSingle", obj(listOf(
                        field("seq","seq", notNull(scalar("Int"))),
                        field("state","state", notNull(scalar("String"))),
                        field("update","update", notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("ChatUpdate", ChatUpdateFragmentSelector)
                            ))))
                    ))),
                    inline("ChatUpdateBatch", obj(listOf(
                        field("fromSeq","fromSeq", notNull(scalar("Int"))),
                        field("seq","seq", notNull(scalar("Int"))),
                        field("state","state", notNull(scalar("String"))),
                        field("updates","updates", notNull(list(notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("ChatUpdate", ChatUpdateFragmentSelector)
                            ))))))
                    )))
                ))))
        ))
private val CommentWatchSelector = obj(listOf(
            field("commentUpdates","event", mapOf("fromState" to refValue("fromState"), "peerId" to refValue("peerId")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("CommentUpdateSingle", obj(listOf(
                        field("seq","seq", notNull(scalar("Int"))),
                        field("state","state", notNull(scalar("String"))),
                        field("update","update", notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("CommentUpdate", CommentUpdateFragmentSelector)
                            ))))
                    ))),
                    inline("CommentUpdateBatch", obj(listOf(
                        field("fromSeq","fromSeq", notNull(scalar("Int"))),
                        field("seq","seq", notNull(scalar("Int"))),
                        field("state","state", notNull(scalar("String"))),
                        field("updates","updates", notNull(list(notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("CommentUpdate", CommentUpdateFragmentSelector)
                            ))))))
                    )))
                )))
        ))
private val ConferenceMediaWatchSelector = obj(listOf(
            field("alphaConferenceMediaWatch","media", mapOf("id" to refValue("id"), "peerId" to refValue("peerId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("streams","streams", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("ice","ice", notNull(list(notNull(scalar("String"))))),
                            field("id","id", notNull(scalar("ID"))),
                            field("sdp","sdp", scalar("String")),
                            field("state","state", notNull(scalar("String")))
                        ))))))
                ))))
        ))
private val ConferenceWatchSelector = obj(listOf(
            field("alphaConferenceWatch","alphaConferenceWatch", mapOf("id" to refValue("id")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceFullSelector)
                ))))
        ))
private val DebugEventsWatchSelector = obj(listOf(
            field("debugEvents","debugEvents", mapOf("eventsCount" to refValue("eventsCount"), "fromState" to refValue("fromState"), "randomDelays" to refValue("randomDelays"), "seed" to refValue("seed")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("key","key", notNull(scalar("String"))),
                    field("seq","seq", notNull(scalar("Int")))
                ))))
        ))
private val DialogsWatchSelector = obj(listOf(
            field("dialogsUpdates","event", mapOf("fromState" to refValue("state")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("DialogUpdateSingle", obj(listOf(
                        field("seq","seq", notNull(scalar("Int"))),
                        field("state","state", notNull(scalar("String"))),
                        field("update","update", notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("DialogUpdate", DialogUpdateFragmentSelector)
                            ))))
                    ))),
                    inline("DialogUpdateBatch", obj(listOf(
                        field("fromSeq","fromSeq", notNull(scalar("Int"))),
                        field("seq","seq", notNull(scalar("Int"))),
                        field("state","state", notNull(scalar("String"))),
                        field("updates","updates", notNull(list(notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("DialogUpdate", DialogUpdateFragmentSelector)
                            ))))))
                    )))
                ))))
        ))
private val OnlineWatchSelector = obj(listOf(
            field("alphaSubscribeChatOnline","alphaSubscribeChatOnline", mapOf("conversations" to refValue("conversations")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("timeout","timeout", notNull(scalar("Int"))),
                    field("type","type", notNull(scalar("String"))),
                    field("user","user", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("lastSeen","lastSeen", scalar("String")),
                            field("online","online", notNull(scalar("Boolean")))
                        ))))
                ))))
        ))
private val SettingsWatchSelector = obj(listOf(
            field("watchSettings","watchSettings", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Settings", SettingsFullSelector)
                ))))
        ))
private val TypingsWatchSelector = obj(listOf(
            field("typings","typings", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("cancel","cancel", notNull(scalar("Boolean"))),
                    field("conversation","conversation", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID")))
                        )))),
                    field("user","user", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String"))),
                            field("photo","photo", scalar("String"))
                        ))))
                ))))
        ))

object Operations {
    val Account = object: OperationDefinition {
        override val name = "Account"
        override val kind = OperationKind.QUERY
        override val body = "query Account{me:me{__typename ...UserShort}myPermissions{__typename roles}sessionState:sessionState{__typename ...SessionStateFull}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment SessionStateFull on SessionState{__typename isAccountActivated isAccountExists isAccountPicked isBlocked isCompleted isLoggedIn isProfileCreated}"
        override val selector = AccountSelector
    }
    val AccountAppInvite = object: OperationDefinition {
        override val name = "AccountAppInvite"
        override val kind = OperationKind.QUERY
        override val body = "query AccountAppInvite{invite:appInvite}"
        override val selector = AccountAppInviteSelector
    }
    val AccountAppInviteInfo = object: OperationDefinition {
        override val name = "AccountAppInviteInfo"
        override val kind = OperationKind.QUERY
        override val body = "query AccountAppInviteInfo(\$inviteKey:String!){invite:alphaInviteInfo(key:\$inviteKey){__typename creator{__typename ...UserShort}id}appInvite:appInviteInfo(key:\$inviteKey){__typename inviter{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = AccountAppInviteInfoSelector
    }
    val AccountInviteInfo = object: OperationDefinition {
        override val name = "AccountInviteInfo"
        override val kind = OperationKind.QUERY
        override val body = "query AccountInviteInfo(\$inviteKey:String!){invite:alphaInviteInfo(key:\$inviteKey){__typename creator{__typename ...UserShort}forEmail forName id joined key membersCount orgId organization{__typename about isCommunity:alphaIsCommunity id}photo title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = AccountInviteInfoSelector
    }
    val AccountInvites = object: OperationDefinition {
        override val name = "AccountInvites"
        override val kind = OperationKind.QUERY
        override val body = "query AccountInvites{invites:alphaInvites{__typename id key}}"
        override val selector = AccountInvitesSelector
    }
    val AccountInvitesHistory = object: OperationDefinition {
        override val name = "AccountInvitesHistory"
        override val kind = OperationKind.QUERY
        override val body = "query AccountInvitesHistory{invites:alphaInvitesHistory{__typename acceptedBy{__typename id name picture}forEmail isGlobal}}"
        override val selector = AccountInvitesHistorySelector
    }
    val AccountSettings = object: OperationDefinition {
        override val name = "AccountSettings"
        override val kind = OperationKind.QUERY
        override val body = "query AccountSettings{me:me{__typename ...UserShort}organizations:myOrganizations{__typename ...OrganizationShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = AccountSettingsSelector
    }
    val AvailableRooms = object: OperationDefinition {
        override val name = "AvailableRooms"
        override val kind = OperationKind.QUERY
        override val body = "query AvailableRooms{availableRooms:betaUserAvailableRooms(limit:3){__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}userRooms:betaUserRooms(limit:3){__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}}"
        override val selector = AvailableRoomsSelector
    }
    val ChatHistory = object: OperationDefinition {
        override val name = "ChatHistory"
        override val kind = OperationKind.QUERY
        override val body = "query ChatHistory(\$before:ID,\$chatId:ID!,\$first:Int!){state:conversationState(id:\$chatId){__typename state}messages(before:\$before,chatId:\$chatId,first:\$first){__typename ...FullMessage}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = ChatHistorySelector
    }
    val ChatInit = object: OperationDefinition {
        override val name = "ChatInit"
        override val kind = OperationKind.QUERY
        override val body = "query ChatInit(\$before:ID,\$chatId:ID!,\$first:Int!){state:conversationState(id:\$chatId){__typename state}messages(before:\$before,chatId:\$chatId,first:\$first){__typename ...FullMessage}room(id:\$chatId){__typename ...RoomShort}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}"
        override val selector = ChatInitSelector
    }
    val ChatSearchGroup = object: OperationDefinition {
        override val name = "ChatSearchGroup"
        override val kind = OperationKind.QUERY
        override val body = "query ChatSearchGroup(\$members:[ID!]!){group:alphaChatSearch(members:\$members){__typename flexibleId id}}"
        override val selector = ChatSearchGroupSelector
    }
    val Conference = object: OperationDefinition {
        override val name = "Conference"
        override val kind = OperationKind.QUERY
        override val body = "query Conference(\$id:ID!){conference(id:\$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename iceServers{__typename credential urls username}id peers{__typename connection{__typename ice sdp state}id user{__typename ...UserShort}}startTime}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = ConferenceSelector
    }
    val ConferenceMedia = object: OperationDefinition {
        override val name = "ConferenceMedia"
        override val kind = OperationKind.QUERY
        override val body = "query ConferenceMedia(\$id:ID!,\$peerId:ID!){conferenceMedia(id:\$id,peerId:\$peerId){__typename iceServers{__typename credential urls username}id streams{__typename ice id sdp state}}}"
        override val selector = ConferenceMediaSelector
    }
    val Dialogs = object: OperationDefinition {
        override val name = "Dialogs"
        override val kind = OperationKind.QUERY
        override val body = "query Dialogs(\$after:String){counter:alphaNotificationCounter{__typename id unreadCount}dialogs(after:\$after,first:20){__typename cursor items{__typename topMessage:alphaTopMessage{__typename ...DaialogListMessage}cid fid haveMention id isChannel isMuted kind photo title unreadCount}}state:dialogsState{__typename state}}fragment DaialogListMessage on ModernMessage{__typename date fallback id message sender{__typename firstName id name}... on GeneralMessage{attachments{__typename fallback id ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat isImage}id}}id quotedMessages{__typename id}}}"
        override val selector = DialogsSelector
    }
    val ExploreCommunity = object: OperationDefinition {
        override val name = "ExploreCommunity"
        override val kind = OperationKind.QUERY
        override val body = "query ExploreCommunity(\$page:Int,\$query:String,\$sort:String){items:alphaComunityPrefixSearch(first:25,page:\$page,query:\$query,sort:\$sort){__typename edges{__typename cursor node{__typename ...CommunitySearch}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment CommunitySearch on Organization{__typename about featured:alphaFeatured id isMine membersCount name photo status superAccountId}"
        override val selector = ExploreCommunitySelector
    }
    val ExploreOrganizations = object: OperationDefinition {
        override val name = "ExploreOrganizations"
        override val kind = OperationKind.QUERY
        override val body = "query ExploreOrganizations(\$after:String,\$all:Boolean,\$page:Int,\$prefix:String,\$query:String,\$sort:String){items:alphaOrganizations(after:\$after,all:\$all,first:25,page:\$page,prefix:\$prefix,query:\$query,sort:\$sort){__typename edges{__typename cursor node{__typename ...OrganizationSearch}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment OrganizationSearch on Organization{__typename about featured:alphaFeatured members:alphaOrganizationMembers{__typename user{__typename id name photo}}id isMine membersCount name photo status superAccountId}"
        override val selector = ExploreOrganizationsSelector
    }
    val ExplorePeople = object: OperationDefinition {
        override val name = "ExplorePeople"
        override val kind = OperationKind.QUERY
        override val body = "query ExplorePeople(\$after:String,\$page:Int,\$query:String,\$sort:String){items:userSearch(after:\$after,first:25,page:\$page,query:\$query,sort:\$sort){__typename edges{__typename cursor node{__typename isYou ...UserShort}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = ExplorePeopleSelector
    }
    val FeatureFlags = object: OperationDefinition {
        override val name = "FeatureFlags"
        override val kind = OperationKind.QUERY
        override val body = "query FeatureFlags{featureFlags{__typename id key title}}"
        override val selector = FeatureFlagsSelector
    }
    val FeedHome = object: OperationDefinition {
        override val name = "FeedHome"
        override val kind = OperationKind.QUERY
        override val body = "query FeedHome{homeFeed:alphaHomeFeed{__typename by:alphaBy{__typename ...UserShort}date id text}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = FeedHomeSelector
    }
    val FetchPushSettings = object: OperationDefinition {
        override val name = "FetchPushSettings"
        override val kind = OperationKind.QUERY
        override val body = "query FetchPushSettings{pushSettings{__typename webPushKey}}"
        override val selector = FetchPushSettingsSelector
    }
    val GetDraftMessage = object: OperationDefinition {
        override val name = "GetDraftMessage"
        override val kind = OperationKind.QUERY
        override val body = "query GetDraftMessage(\$conversationId:ID!){message:conversationDraft(conversationId:\$conversationId)}"
        override val selector = GetDraftMessageSelector
    }
    val GlobalCounter = object: OperationDefinition {
        override val name = "GlobalCounter"
        override val kind = OperationKind.QUERY
        override val body = "query GlobalCounter{alphaNotificationCounter{__typename id unreadCount}}"
        override val selector = GlobalCounterSelector
    }
    val GlobalSearch = object: OperationDefinition {
        override val name = "GlobalSearch"
        override val kind = OperationKind.QUERY
        override val body = "query GlobalSearch(\$query:String!){items:alphaGlobalSearch(query:\$query){__typename ... on Organization{...OrganizationShort}... on User{...UserShort}... on SharedRoom{id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}}}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = GlobalSearchSelector
    }
    val Message = object: OperationDefinition {
        override val name = "Message"
        override val kind = OperationKind.QUERY
        override val body = "query Message(\$messageId:ID!){message(messageId:\$messageId){__typename ...FullMessage}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = MessageSelector
    }
    val MessageComments = object: OperationDefinition {
        override val name = "MessageComments"
        override val kind = OperationKind.QUERY
        override val body = "query MessageComments(\$messageId:ID!){messageComments(messageId:\$messageId){__typename comments{__typename ...CommentEntryFragment}count id state{__typename state}}}fragment CommentEntryFragment on CommentEntry{__typename childComments{__typename id}comment{__typename id ...FullMessage}deleted id parentComment{__typename id}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = MessageCommentsSelector
    }
    val MyApps = object: OperationDefinition {
        override val name = "MyApps"
        override val kind = OperationKind.QUERY
        override val body = "query MyApps{apps:myApps{__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}"
        override val selector = MyAppsSelector
    }
    val MyOrganizations = object: OperationDefinition {
        override val name = "MyOrganizations"
        override val kind = OperationKind.QUERY
        override val body = "query MyOrganizations{myOrganizations{__typename isPrimary:betaIsPrimary ...OrganizationShort}}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = MyOrganizationsSelector
    }
    val Online = object: OperationDefinition {
        override val name = "Online"
        override val kind = OperationKind.QUERY
        override val body = "query Online(\$userId:ID!){user:user(id:\$userId){__typename id lastSeen online}}"
        override val selector = OnlineSelector
    }
    val Organization = object: OperationDefinition {
        override val name = "Organization"
        override val kind = OperationKind.QUERY
        override val body = "query Organization(\$organizationId:ID!){organization(id:\$organizationId){__typename ...OrganizationFull}}fragment OrganizationFull on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}members:alphaOrganizationMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = OrganizationSelector
    }
    val OrganizationByPrefix = object: OperationDefinition {
        override val name = "OrganizationByPrefix"
        override val kind = OperationKind.QUERY
        override val body = "query OrganizationByPrefix(\$query:String!){organizationByPrefix:alphaOrganizationByPrefix(query:\$query){__typename ...OrganizationSearch}}fragment OrganizationSearch on Organization{__typename about featured:alphaFeatured members:alphaOrganizationMembers{__typename user{__typename id name photo}}id isMine membersCount name photo status superAccountId}"
        override val selector = OrganizationByPrefixSelector
    }
    val OrganizationMembersShort = object: OperationDefinition {
        override val name = "OrganizationMembersShort"
        override val kind = OperationKind.QUERY
        override val body = "query OrganizationMembersShort(\$organizationId:ID!){organization(id:\$organizationId){__typename members:alphaOrganizationMembers{__typename user{__typename id}}...OrganizationWithoutMembersFragment}}fragment OrganizationWithoutMembersFragment on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = OrganizationMembersShortSelector
    }
    val OrganizationMembersShortPaginated = object: OperationDefinition {
        override val name = "OrganizationMembersShortPaginated"
        override val kind = OperationKind.QUERY
        override val body = "query OrganizationMembersShortPaginated(\$after:ID,\$first:Int,\$organizationId:ID!){organization(id:\$organizationId){__typename members:alphaOrganizationMembers(after:\$after,first:\$first){__typename role user{__typename ...UserFull}}...OrganizationWithoutMembersFragment}}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationWithoutMembersFragment on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = OrganizationMembersShortPaginatedSelector
    }
    val OrganizationProfile = object: OperationDefinition {
        override val name = "OrganizationProfile"
        override val kind = OperationKind.QUERY
        override val body = "query OrganizationProfile(\$organizationId:ID!){organizationProfile(id:\$organizationId){__typename ...OrganizationProfileFull}}fragment OrganizationProfileFull on OrganizationProfile{__typename about featured:alphaFeatured facebook id linkedin name photoRef{__typename crop{__typename h w x y}uuid}shortname twitter website websiteTitle}"
        override val selector = OrganizationProfileSelector
    }
    val OrganizationPublicInvite = object: OperationDefinition {
        override val name = "OrganizationPublicInvite"
        override val kind = OperationKind.QUERY
        override val body = "query OrganizationPublicInvite(\$organizationId:ID){publicInvite:alphaOrganizationInviteLink(organizationId:\$organizationId){__typename id key ttl}}"
        override val selector = OrganizationPublicInviteSelector
    }
    val OrganizationWithoutMembers = object: OperationDefinition {
        override val name = "OrganizationWithoutMembers"
        override val kind = OperationKind.QUERY
        override val body = "query OrganizationWithoutMembers(\$organizationId:ID!){organization(id:\$organizationId){__typename ...OrganizationWithoutMembersFragment}}fragment OrganizationWithoutMembersFragment on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = OrganizationWithoutMembersSelector
    }
    val Permissions = object: OperationDefinition {
        override val name = "Permissions"
        override val kind = OperationKind.QUERY
        override val body = "query Permissions{myPermissions{__typename roles}}"
        override val selector = PermissionsSelector
    }
    val Profile = object: OperationDefinition {
        override val name = "Profile"
        override val kind = OperationKind.QUERY
        override val body = "query Profile{user:me{__typename id shortname}profile:myProfile{__typename about invitedBy:alphaInvitedBy{__typename id name}joinedAt:alphaJoinedAt linkedin:alphaLinkedin role:alphaRole email firstName id lastName location phone photoRef{__typename crop{__typename h w x y}uuid}primaryOrganization{__typename id name}website}}"
        override val selector = ProfileSelector
    }
    val ProfilePrefill = object: OperationDefinition {
        override val name = "ProfilePrefill"
        override val kind = OperationKind.QUERY
        override val body = "query ProfilePrefill{prefill:myProfilePrefill{__typename firstName lastName picture}}"
        override val selector = ProfilePrefillSelector
    }
    val ResolveShortName = object: OperationDefinition {
        override val name = "ResolveShortName"
        override val kind = OperationKind.QUERY
        override val body = "query ResolveShortName(\$shortname:String!){item:alphaResolveShortName(shortname:\$shortname){__typename ... on User{...UserFull}... on Organization{...OrganizationFull}}}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationFull on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}members:alphaOrganizationMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = ResolveShortNameSelector
    }
    val ResolvedInvite = object: OperationDefinition {
        override val name = "ResolvedInvite"
        override val kind = OperationKind.QUERY
        override val body = "query ResolvedInvite(\$key:String!){invite:alphaResolveInvite(key:\$key){__typename ... on InviteInfo{creator{__typename ...UserShort}id orgId title}... on AppInvite{inviter{__typename ...UserShort}}... on RoomInvite{id invitedByUser{__typename ...UserShort}room{__typename ... on SharedRoom{description id isChannel kind membersCount membership photo socialImage title}}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = ResolvedInviteSelector
    }
    val Room = object: OperationDefinition {
        override val name = "Room"
        override val kind = OperationKind.QUERY
        override val body = "query Room(\$id:ID!){room(id:\$id){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomSelector
    }
    val RoomChat = object: OperationDefinition {
        override val name = "RoomChat"
        override val kind = OperationKind.QUERY
        override val body = "query RoomChat(\$id:ID!){room(id:\$id){__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{canEdit id isChannel kind membership photo pinnedMessage{__typename ...FullMessage}title}}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomChatSelector
    }
    val RoomHeader = object: OperationDefinition {
        override val name = "RoomHeader"
        override val kind = OperationKind.QUERY
        override val body = "query RoomHeader(\$id:ID!){room(id:\$id){__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo primaryOrganization{__typename id name}}}... on SharedRoom{canEdit description id isChannel kind membersCount organization{__typename isAdmin:betaIsAdmin isOwner:betaIsOwner id name}photo role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}}"
        override val selector = RoomHeaderSelector
    }
    val RoomInviteInfo = object: OperationDefinition {
        override val name = "RoomInviteInfo"
        override val kind = OperationKind.QUERY
        override val body = "query RoomInviteInfo(\$invite:String!){invite:betaRoomInviteInfo(invite:\$invite){__typename id invitedByUser{__typename ...UserShort}room{__typename ... on SharedRoom{description id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo socialImage title}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = RoomInviteInfoSelector
    }
    val RoomInviteLink = object: OperationDefinition {
        override val name = "RoomInviteLink"
        override val kind = OperationKind.QUERY
        override val body = "query RoomInviteLink(\$roomId:ID!){link:betaRoomInviteLink(roomId:\$roomId)}"
        override val selector = RoomInviteLinkSelector
    }
    val RoomMemberShort = object: OperationDefinition {
        override val name = "RoomMemberShort"
        override val kind = OperationKind.QUERY
        override val body = "query RoomMemberShort(\$memberId:ID!,\$roomId:ID!){member:roomMember(memberId:\$memberId,roomId:\$roomId){__typename user{__typename firstName id name}}}"
        override val selector = RoomMemberShortSelector
    }
    val RoomMembers = object: OperationDefinition {
        override val name = "RoomMembers"
        override val kind = OperationKind.QUERY
        override val body = "query RoomMembers(\$roomId:ID!){members:roomMembers(roomId:\$roomId){__typename canKick membership role user{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = RoomMembersSelector
    }
    val RoomMembersForMentionsPaginated = object: OperationDefinition {
        override val name = "RoomMembersForMentionsPaginated"
        override val kind = OperationKind.QUERY
        override val body = "query RoomMembersForMentionsPaginated(\$after:ID,\$first:Int,\$roomId:ID!){members:roomMembers(after:\$after,first:\$first,roomId:\$roomId){__typename user{__typename ...UserForMention}}}fragment UserForMention on User{__typename id name photo primaryOrganization{__typename id name}}"
        override val selector = RoomMembersForMentionsPaginatedSelector
    }
    val RoomMembersPaginated = object: OperationDefinition {
        override val name = "RoomMembersPaginated"
        override val kind = OperationKind.QUERY
        override val body = "query RoomMembersPaginated(\$after:ID,\$first:Int,\$roomId:ID!){members:roomMembers(after:\$after,first:\$first,roomId:\$roomId){__typename canKick membership role user{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = RoomMembersPaginatedSelector
    }
    val RoomMembersShort = object: OperationDefinition {
        override val name = "RoomMembersShort"
        override val kind = OperationKind.QUERY
        override val body = "query RoomMembersShort(\$roomId:ID!){members:roomMembers(roomId:\$roomId){__typename user{__typename id}}}"
        override val selector = RoomMembersShortSelector
    }
    val RoomSearch = object: OperationDefinition {
        override val name = "RoomSearch"
        override val kind = OperationKind.QUERY
        override val body = "query RoomSearch(\$page:Int,\$query:String,\$sort:String){items:betaRoomSearch(first:25,page:\$page,query:\$query,sort:\$sort){__typename edges{__typename cursor node{__typename ... on SharedRoom{id isChannel kind membersCount membership organization{__typename id name photo}photo title}}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}"
        override val selector = RoomSearchSelector
    }
    val RoomSearchText = object: OperationDefinition {
        override val name = "RoomSearchText"
        override val kind = OperationKind.QUERY
        override val body = "query RoomSearchText(\$query:String!){items:betaDialogTextSearch(query:\$query){__typename id:cid flexibleId:fid id2:id kind photo title}}"
        override val selector = RoomSearchTextSelector
    }
    val RoomSuper = object: OperationDefinition {
        override val name = "RoomSuper"
        override val kind = OperationKind.QUERY
        override val body = "query RoomSuper(\$id:ID!){roomSuper(id:\$id){__typename featured id listed}}"
        override val selector = RoomSuperSelector
    }
    val RoomTiny = object: OperationDefinition {
        override val name = "RoomTiny"
        override val kind = OperationKind.QUERY
        override val body = "query RoomTiny(\$id:ID!){room(id:\$id){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomTinySelector
    }
    val RoomWithoutMembers = object: OperationDefinition {
        override val name = "RoomWithoutMembers"
        override val kind = OperationKind.QUERY
        override val body = "query RoomWithoutMembers(\$id:ID!){room(id:\$id){__typename ...RoomFullWithoutMembers}}fragment RoomFullWithoutMembers on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomWithoutMembersSelector
    }
    val Settings = object: OperationDefinition {
        override val name = "Settings"
        override val kind = OperationKind.QUERY
        override val body = "query Settings{settings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename desktopNotifications emailFrequency id mobileAlert mobileIncludeText mobileNotifications primaryEmail}"
        override val selector = SettingsSelector
    }
    val SuperAccount = object: OperationDefinition {
        override val name = "SuperAccount"
        override val kind = OperationKind.QUERY
        override val body = "query SuperAccount(\$accountId:ID!,\$viaOrgId:Boolean){superAccount(id:\$accountId,viaOrgId:\$viaOrgId){__typename published:alphaPublished createdAt createdBy{__typename id name}features{__typename id key title}id members{__typename ...UserShort}orgId state title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = SuperAccountSelector
    }
    val SuperAccounts = object: OperationDefinition {
        override val name = "SuperAccounts"
        override val kind = OperationKind.QUERY
        override val body = "query SuperAccounts{superAccounts{__typename id orgId state title}}"
        override val selector = SuperAccountsSelector
    }
    val SuperAdmins = object: OperationDefinition {
        override val name = "SuperAdmins"
        override val kind = OperationKind.QUERY
        override val body = "query SuperAdmins{superAdmins{__typename email role user{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = SuperAdminsSelector
    }
    val User = object: OperationDefinition {
        override val name = "User"
        override val kind = OperationKind.QUERY
        override val body = "query User(\$userId:ID!){conversation:room(id:\$userId){__typename ... on PrivateRoom{id settings{__typename id mute}}}user:user(id:\$userId){__typename ...UserFull}}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = UserSelector
    }
    val UserAvailableRooms = object: OperationDefinition {
        override val name = "UserAvailableRooms"
        override val kind = OperationKind.QUERY
        override val body = "query UserAvailableRooms(\$after:ID,\$limit:Int!){betaUserAvailableRooms(after:\$after,limit:\$limit){__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}}"
        override val selector = UserAvailableRoomsSelector
    }
    val UserRooms = object: OperationDefinition {
        override val name = "UserRooms"
        override val kind = OperationKind.QUERY
        override val body = "query UserRooms(\$after:ID,\$limit:Int!){betaUserRooms(after:\$after,limit:\$limit){__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}}"
        override val selector = UserRoomsSelector
    }
    val UserStorage = object: OperationDefinition {
        override val name = "UserStorage"
        override val kind = OperationKind.QUERY
        override val body = "query UserStorage(\$keys:[String!]!,\$namespace:String!){userStorage(keys:\$keys,namespace:\$namespace){__typename id key value}}"
        override val selector = UserStorageSelector
    }
    val Users = object: OperationDefinition {
        override val name = "Users"
        override val kind = OperationKind.QUERY
        override val body = "query Users(\$query:String!){items:users(query:\$query){__typename subtitle:email id title:name}}"
        override val selector = UsersSelector
    }
    val AccountCreateInvite = object: OperationDefinition {
        override val name = "AccountCreateInvite"
        override val kind = OperationKind.MUTATION
        override val body = "mutation AccountCreateInvite{alphaCreateInvite{__typename id key}}"
        override val selector = AccountCreateInviteSelector
    }
    val AccountDestroyInvite = object: OperationDefinition {
        override val name = "AccountDestroyInvite"
        override val kind = OperationKind.MUTATION
        override val body = "mutation AccountDestroyInvite(\$id:ID!){alphaDeleteInvite(id:\$id)}"
        override val selector = AccountDestroyInviteSelector
    }
    val AccountInviteJoin = object: OperationDefinition {
        override val name = "AccountInviteJoin"
        override val kind = OperationKind.MUTATION
        override val body = "mutation AccountInviteJoin(\$inviteKey:String!){alphaJoinInvite(key:\$inviteKey)}"
        override val selector = AccountInviteJoinSelector
    }
    val AddAppToChat = object: OperationDefinition {
        override val name = "AddAppToChat"
        override val kind = OperationKind.MUTATION
        override val body = "mutation AddAppToChat(\$appId:ID!,\$chatId:ID!){addAppToChat(appId:\$appId,chatId:\$chatId){__typename ...AppChat}}fragment AppChat on AppChat{__typename chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}webhook}"
        override val selector = AddAppToChatSelector
    }
    val AddMessageComment = object: OperationDefinition {
        override val name = "AddMessageComment"
        override val kind = OperationKind.MUTATION
        override val body = "mutation AddMessageComment(\$fileAttachments:[FileAttachmentInput!],\$mentions:[MentionInput!],\$message:String,\$messageId:ID!,\$replyComment:ID){addMessageComment(fileAttachments:\$fileAttachments,mentions:\$mentions,message:\$message,messageId:\$messageId,replyComment:\$replyComment)}"
        override val selector = AddMessageCommentSelector
    }
    val BetaAddMessageComment = object: OperationDefinition {
        override val name = "BetaAddMessageComment"
        override val kind = OperationKind.MUTATION
        override val body = "mutation BetaAddMessageComment(\$fileAttachments:[FileAttachmentInput!],\$mentions:[MentionInput!],\$message:String,\$messageId:ID!,\$replyComment:ID){betaAddMessageComment(fileAttachments:\$fileAttachments,mentions:\$mentions,message:\$message,messageId:\$messageId,replyComment:\$replyComment){__typename id}}"
        override val selector = BetaAddMessageCommentSelector
    }
    val CancelTyping = object: OperationDefinition {
        override val name = "CancelTyping"
        override val kind = OperationKind.MUTATION
        override val body = "mutation CancelTyping(\$conversationId:ID!){typingCancel(conversationId:\$conversationId)}"
        override val selector = CancelTypingSelector
    }
    val CommentSetReaction = object: OperationDefinition {
        override val name = "CommentSetReaction"
        override val kind = OperationKind.MUTATION
        override val body = "mutation CommentSetReaction(\$commentId:ID!,\$reaction:MessageReactionType!){commentReactionAdd(commentId:\$commentId,reaction:\$reaction)}"
        override val selector = CommentSetReactionSelector
    }
    val CommentUnsetReaction = object: OperationDefinition {
        override val name = "CommentUnsetReaction"
        override val kind = OperationKind.MUTATION
        override val body = "mutation CommentUnsetReaction(\$commentId:ID!,\$reaction:MessageReactionType!){commentReactionRemove(commentId:\$commentId,reaction:\$reaction)}"
        override val selector = CommentUnsetReactionSelector
    }
    val ConferenceAnswer = object: OperationDefinition {
        override val name = "ConferenceAnswer"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ConferenceAnswer(\$answer:String!,\$id:ID!,\$ownPeerId:ID!,\$peerId:ID!){peerConnectionAnswer(answer:\$answer,id:\$id,ownPeerId:\$ownPeerId,peerId:\$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}"
        override val selector = ConferenceAnswerSelector
    }
    val ConferenceCandidate = object: OperationDefinition {
        override val name = "ConferenceCandidate"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ConferenceCandidate(\$candidate:String!,\$id:ID!,\$ownPeerId:ID!,\$peerId:ID!){peerConnectionCandidate(candidate:\$candidate,id:\$id,ownPeerId:\$ownPeerId,peerId:\$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}"
        override val selector = ConferenceCandidateSelector
    }
    val ConferenceJoin = object: OperationDefinition {
        override val name = "ConferenceJoin"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ConferenceJoin(\$id:ID!){conferenceJoin(id:\$id){__typename conference{__typename ...ConferenceShort}peerId}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}"
        override val selector = ConferenceJoinSelector
    }
    val ConferenceKeepAlive = object: OperationDefinition {
        override val name = "ConferenceKeepAlive"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ConferenceKeepAlive(\$id:ID!,\$peerId:ID!){conferenceKeepAlive(id:\$id,peerId:\$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}"
        override val selector = ConferenceKeepAliveSelector
    }
    val ConferenceLeave = object: OperationDefinition {
        override val name = "ConferenceLeave"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ConferenceLeave(\$id:ID!,\$peerId:ID!){conferenceLeave(id:\$id,peerId:\$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}"
        override val selector = ConferenceLeaveSelector
    }
    val ConferenceOffer = object: OperationDefinition {
        override val name = "ConferenceOffer"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ConferenceOffer(\$id:ID!,\$offer:String!,\$ownPeerId:ID!,\$peerId:ID!){peerConnectionOffer(id:\$id,offer:\$offer,ownPeerId:\$ownPeerId,peerId:\$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}"
        override val selector = ConferenceOfferSelector
    }
    val CreateApp = object: OperationDefinition {
        override val name = "CreateApp"
        override val kind = OperationKind.MUTATION
        override val body = "mutation CreateApp(\$about:String,\$name:String!,\$photoRef:ImageRefInput,\$shortname:String){createApp(about:\$about,name:\$name,photoRef:\$photoRef,shortname:\$shortname){__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}"
        override val selector = CreateAppSelector
    }
    val CreateOrganization = object: OperationDefinition {
        override val name = "CreateOrganization"
        override val kind = OperationKind.MUTATION
        override val body = "mutation CreateOrganization(\$input:CreateOrganizationInput!){organization:createOrganization(input:\$input){__typename id name}}"
        override val selector = CreateOrganizationSelector
    }
    val CreateUserProfileAndOrganization = object: OperationDefinition {
        override val name = "CreateUserProfileAndOrganization"
        override val kind = OperationKind.MUTATION
        override val body = "mutation CreateUserProfileAndOrganization(\$organization:CreateOrganizationInput!,\$user:ProfileInput!){alphaCreateUserProfileAndOrganization(organization:\$organization,user:\$user){__typename organization{__typename id name}user{__typename ...UserFull}}}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = CreateUserProfileAndOrganizationSelector
    }
    val DebugMails = object: OperationDefinition {
        override val name = "DebugMails"
        override val kind = OperationKind.MUTATION
        override val body = "mutation DebugMails(\$type:DebugEmailType!){debugSendEmail(type:\$type)}"
        override val selector = DebugMailsSelector
    }
    val DeleteComment = object: OperationDefinition {
        override val name = "DeleteComment"
        override val kind = OperationKind.MUTATION
        override val body = "mutation DeleteComment(\$id:ID!){deleteComment(id:\$id)}"
        override val selector = DeleteCommentSelector
    }
    val DeleteOrganization = object: OperationDefinition {
        override val name = "DeleteOrganization"
        override val kind = OperationKind.MUTATION
        override val body = "mutation DeleteOrganization(\$organizationId:ID!){deleteOrganization(id:\$organizationId)}"
        override val selector = DeleteOrganizationSelector
    }
    val DeleteUser = object: OperationDefinition {
        override val name = "DeleteUser"
        override val kind = OperationKind.MUTATION
        override val body = "mutation DeleteUser(\$id:ID!){superDeleteUser(id:\$id)}"
        override val selector = DeleteUserSelector
    }
    val EditComment = object: OperationDefinition {
        override val name = "EditComment"
        override val kind = OperationKind.MUTATION
        override val body = "mutation EditComment(\$fileAttachments:[FileAttachmentInput!],\$id:ID!,\$mentions:[MentionInput!],\$message:String){editComment(fileAttachments:\$fileAttachments,id:\$id,mentions:\$mentions,message:\$message)}"
        override val selector = EditCommentSelector
    }
    val EditMessage = object: OperationDefinition {
        override val name = "EditMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation EditMessage(\$fileAttachments:[FileAttachmentInput!],\$mentions:[MentionInput!],\$message:String,\$messageId:ID!,\$replyMessages:[ID!],\$spans:[MessageSpanInput!]){editMessage(fileAttachments:\$fileAttachments,mentions:\$mentions,message:\$message,messageId:\$messageId,replyMessages:\$replyMessages,spans:\$spans)}"
        override val selector = EditMessageSelector
    }
    val EditPostMessage = object: OperationDefinition {
        override val name = "EditPostMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation EditPostMessage(\$attachments:[String!],\$messageId:ID!,\$postType:PostMessageType!,\$text:String!,\$title:String!){editPostMessage:alphaEditPostMessage(attachments:\$attachments,messageId:\$messageId,postType:\$postType,text:\$text,title:\$title){__typename seq}}"
        override val selector = EditPostMessageSelector
    }
    val FeatureFlagAdd = object: OperationDefinition {
        override val name = "FeatureFlagAdd"
        override val kind = OperationKind.MUTATION
        override val body = "mutation FeatureFlagAdd(\$key:String!,\$title:String!){featureFlagAdd(key:\$key,title:\$title){__typename id key title}}"
        override val selector = FeatureFlagAddSelector
    }
    val FeatureFlagDisable = object: OperationDefinition {
        override val name = "FeatureFlagDisable"
        override val kind = OperationKind.MUTATION
        override val body = "mutation FeatureFlagDisable(\$accountId:ID!,\$featureId:ID!){superAccountFeatureRemove(featureId:\$featureId,id:\$accountId){__typename features{__typename id key title}id}}"
        override val selector = FeatureFlagDisableSelector
    }
    val FeatureFlagEnable = object: OperationDefinition {
        override val name = "FeatureFlagEnable"
        override val kind = OperationKind.MUTATION
        override val body = "mutation FeatureFlagEnable(\$accountId:ID!,\$featureId:ID!){superAccountFeatureAdd(featureId:\$featureId,id:\$accountId){__typename features{__typename id key title}id}}"
        override val selector = FeatureFlagEnableSelector
    }
    val FeedPost = object: OperationDefinition {
        override val name = "FeedPost"
        override val kind = OperationKind.MUTATION
        override val body = "mutation FeedPost(\$message:String!){alphaCreateFeedPost(message:\$message){__typename id}}"
        override val selector = FeedPostSelector
    }
    val MarkSequenceRead = object: OperationDefinition {
        override val name = "MarkSequenceRead"
        override val kind = OperationKind.MUTATION
        override val body = "mutation MarkSequenceRead(\$seq:Int!){alphaGlobalRead(toSeq:\$seq)}"
        override val selector = MarkSequenceReadSelector
    }
    val MediaAnswer = object: OperationDefinition {
        override val name = "MediaAnswer"
        override val kind = OperationKind.MUTATION
        override val body = "mutation MediaAnswer(\$answer:String!,\$id:ID!,\$peerId:ID!){mediaStreamAnswer(answer:\$answer,id:\$id,peerId:\$peerId){__typename id streams{__typename ice id sdp state}}}"
        override val selector = MediaAnswerSelector
    }
    val MediaCandidate = object: OperationDefinition {
        override val name = "MediaCandidate"
        override val kind = OperationKind.MUTATION
        override val body = "mutation MediaCandidate(\$candidate:String!,\$id:ID!,\$peerId:ID!){mediaStreamCandidate(candidate:\$candidate,id:\$id,peerId:\$peerId){__typename id streams{__typename ice id sdp state}}}"
        override val selector = MediaCandidateSelector
    }
    val MediaFailed = object: OperationDefinition {
        override val name = "MediaFailed"
        override val kind = OperationKind.MUTATION
        override val body = "mutation MediaFailed(\$id:ID!,\$peerId:ID!){mediaStreamFailed(id:\$id,peerId:\$peerId){__typename id streams{__typename ice id sdp state}}}"
        override val selector = MediaFailedSelector
    }
    val MediaNegotiationNeeded = object: OperationDefinition {
        override val name = "MediaNegotiationNeeded"
        override val kind = OperationKind.MUTATION
        override val body = "mutation MediaNegotiationNeeded(\$id:ID!,\$peerId:ID!){mediaStreamNegotiationNeeded(id:\$id,peerId:\$peerId){__typename id streams{__typename ice id sdp state}}}"
        override val selector = MediaNegotiationNeededSelector
    }
    val MediaOffer = object: OperationDefinition {
        override val name = "MediaOffer"
        override val kind = OperationKind.MUTATION
        override val body = "mutation MediaOffer(\$id:ID!,\$offer:String!,\$peerId:ID!){mediaStreamOffer(id:\$id,offer:\$offer,peerId:\$peerId){__typename id streams{__typename ice id sdp state}}}"
        override val selector = MediaOfferSelector
    }
    val MessageSetReaction = object: OperationDefinition {
        override val name = "MessageSetReaction"
        override val kind = OperationKind.MUTATION
        override val body = "mutation MessageSetReaction(\$messageId:ID!,\$reaction:String!){betaReactionSet(mid:\$messageId,reaction:\$reaction)}"
        override val selector = MessageSetReactionSelector
    }
    val MessageUnsetReaction = object: OperationDefinition {
        override val name = "MessageUnsetReaction"
        override val kind = OperationKind.MUTATION
        override val body = "mutation MessageUnsetReaction(\$messageId:ID!,\$reaction:String!){betaReactionRemove(mid:\$messageId,reaction:\$reaction)}"
        override val selector = MessageUnsetReactionSelector
    }
    val OrganizationActivateByInvite = object: OperationDefinition {
        override val name = "OrganizationActivateByInvite"
        override val kind = OperationKind.MUTATION
        override val body = "mutation OrganizationActivateByInvite(\$inviteKey:String!){joinAppInvite(key:\$inviteKey)}"
        override val selector = OrganizationActivateByInviteSelector
    }
    val OrganizationAddMember = object: OperationDefinition {
        override val name = "OrganizationAddMember"
        override val kind = OperationKind.MUTATION
        override val body = "mutation OrganizationAddMember(\$organizationId:ID!,\$userIds:[ID!]){betaOrganizationMemberAdd(organizationId:\$organizationId,userIds:\$userIds){__typename ...OrganizationFull}}fragment OrganizationFull on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}members:alphaOrganizationMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = OrganizationAddMemberSelector
    }
    val OrganizationAlterPublished = object: OperationDefinition {
        override val name = "OrganizationAlterPublished"
        override val kind = OperationKind.MUTATION
        override val body = "mutation OrganizationAlterPublished(\$organizationId:ID!,\$published:Boolean!){alphaAlterPublished(id:\$organizationId,published:\$published){__typename ...OrganizationSearch}}fragment OrganizationSearch on Organization{__typename about featured:alphaFeatured members:alphaOrganizationMembers{__typename user{__typename id name photo}}id isMine membersCount name photo status superAccountId}"
        override val selector = OrganizationAlterPublishedSelector
    }
    val OrganizationChangeMemberRole = object: OperationDefinition {
        override val name = "OrganizationChangeMemberRole"
        override val kind = OperationKind.MUTATION
        override val body = "mutation OrganizationChangeMemberRole(\$memberId:ID!,\$newRole:OrganizationMemberRole!,\$organizationId:ID!){alphaOrganizationChangeMemberRole(memberId:\$memberId,newRole:\$newRole,organizationId:\$organizationId)}"
        override val selector = OrganizationChangeMemberRoleSelector
    }
    val OrganizationCreatePublicInvite = object: OperationDefinition {
        override val name = "OrganizationCreatePublicInvite"
        override val kind = OperationKind.MUTATION
        override val body = "mutation OrganizationCreatePublicInvite(\$expirationDays:Int,\$organizationId:ID){alphaOrganizationRefreshInviteLink(expirationDays:\$expirationDays,organizationId:\$organizationId){__typename id key ttl}}"
        override val selector = OrganizationCreatePublicInviteSelector
    }
    val OrganizationInviteMembers = object: OperationDefinition {
        override val name = "OrganizationInviteMembers"
        override val kind = OperationKind.MUTATION
        override val body = "mutation OrganizationInviteMembers(\$inviteRequests:[InviteRequest!]!,\$organizationId:ID){alphaOrganizationInviteMembers(inviteRequests:\$inviteRequests,organizationId:\$organizationId)}"
        override val selector = OrganizationInviteMembersSelector
    }
    val OrganizationMemberRemove = object: OperationDefinition {
        override val name = "OrganizationMemberRemove"
        override val kind = OperationKind.MUTATION
        override val body = "mutation OrganizationMemberRemove(\$organizationId:ID!,\$userId:ID!){betaOrganizationMemberRemove(organizationId:\$organizationId,userId:\$userId){__typename id}}"
        override val selector = OrganizationMemberRemoveSelector
    }
    val OrganizationRemoveMember = object: OperationDefinition {
        override val name = "OrganizationRemoveMember"
        override val kind = OperationKind.MUTATION
        override val body = "mutation OrganizationRemoveMember(\$memberId:ID!,\$organizationId:ID!){alphaOrganizationRemoveMember(memberId:\$memberId,organizationId:\$organizationId)}"
        override val selector = OrganizationRemoveMemberSelector
    }
    val PersistEvents = object: OperationDefinition {
        override val name = "PersistEvents"
        override val kind = OperationKind.MUTATION
        override val body = "mutation PersistEvents(\$did:String!,\$events:[Event!]!,\$isProd:Boolean,\$platform:EventPlatform){track(did:\$did,events:\$events,isProd:\$isProd,platform:\$platform)}"
        override val selector = PersistEventsSelector
    }
    val PinMessage = object: OperationDefinition {
        override val name = "PinMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation PinMessage(\$chatId:ID!,\$messageId:ID!){pinMessage:betaPinMessage(chatId:\$chatId,messageId:\$messageId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = PinMessageSelector
    }
    val ProfileCreate = object: OperationDefinition {
        override val name = "ProfileCreate"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ProfileCreate(\$input:CreateProfileInput!){createProfile(input:\$input){__typename about email firstName id lastName location phone photoRef{__typename crop{__typename h w x y}uuid}website}}"
        override val selector = ProfileCreateSelector
    }
    val ProfileUpdate = object: OperationDefinition {
        override val name = "ProfileUpdate"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ProfileUpdate(\$input:UpdateProfileInput!,\$uid:ID){updateProfile(input:\$input,uid:\$uid){__typename about invitedBy:alphaInvitedBy{__typename id name}joinedAt:alphaJoinedAt linkedin:alphaLinkedin primaryOrganizationId:alphaPrimaryOrganizationId role:alphaRole email firstName id lastName location phone photoRef{__typename crop{__typename h w x y}uuid}website}}"
        override val selector = ProfileUpdateSelector
    }
    val RefreshAppToken = object: OperationDefinition {
        override val name = "RefreshAppToken"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RefreshAppToken(\$appId:ID!){refreshAppToken(appId:\$appId){__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}"
        override val selector = RefreshAppTokenSelector
    }
    val RegisterPush = object: OperationDefinition {
        override val name = "RegisterPush"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RegisterPush(\$endpoint:String!,\$type:PushType!){registerPush(endpoint:\$endpoint,type:\$type)}"
        override val selector = RegisterPushSelector
    }
    val RegisterWebPush = object: OperationDefinition {
        override val name = "RegisterWebPush"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RegisterWebPush(\$endpoint:String!){registerWebPush(endpoint:\$endpoint)}"
        override val selector = RegisterWebPushSelector
    }
    val ReplyMessage = object: OperationDefinition {
        override val name = "ReplyMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ReplyMessage(\$chatId:ID!,\$fileAttachments:[FileAttachmentInput!],\$mentions:[MentionInput!],\$message:String,\$repeatKey:String,\$replyMessages:[ID!],\$spans:[MessageSpanInput!]){replyMessage:sendMessage(chatId:\$chatId,fileAttachments:\$fileAttachments,mentions:\$mentions,message:\$message,repeatKey:\$repeatKey,replyMessages:\$replyMessages,spans:\$spans)}"
        override val selector = ReplyMessageSelector
    }
    val ReportOnline = object: OperationDefinition {
        override val name = "ReportOnline"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ReportOnline(\$active:Boolean,\$platform:String){presenceReportOnline(active:\$active,platform:\$platform,timeout:5000)}"
        override val selector = ReportOnlineSelector
    }
    val RespondPostMessage = object: OperationDefinition {
        override val name = "RespondPostMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RespondPostMessage(\$buttonId:ID!,\$messageId:ID!,\$reaction:String!){alphaRespondPostMessage(buttonId:\$buttonId,messageId:\$messageId)betaReactionSet(mid:\$messageId,reaction:\$reaction)}"
        override val selector = RespondPostMessageSelector
    }
    val RoomAddMember = object: OperationDefinition {
        override val name = "RoomAddMember"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomAddMember(\$roomId:ID!,\$userId:ID!){betaRoomInvite(invites:[{userId:\$userId,role:MEMBER}],roomId:\$roomId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomAddMemberSelector
    }
    val RoomAddMembers = object: OperationDefinition {
        override val name = "RoomAddMembers"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomAddMembers(\$invites:[RoomInviteInput!]!,\$roomId:ID!){betaRoomInvite(invites:\$invites,roomId:\$roomId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomAddMembersSelector
    }
    val RoomAlterFeatured = object: OperationDefinition {
        override val name = "RoomAlterFeatured"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomAlterFeatured(\$featured:Boolean!,\$roomId:ID!){betaRoomAlterFeatured(featured:\$featured,roomId:\$roomId){__typename featured id listed}}"
        override val selector = RoomAlterFeaturedSelector
    }
    val RoomAlterHidden = object: OperationDefinition {
        override val name = "RoomAlterHidden"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomAlterHidden(\$listed:Boolean!,\$roomId:ID!){betaRoomAlterListed(listed:\$listed,roomId:\$roomId){__typename featured id listed}}"
        override val selector = RoomAlterHiddenSelector
    }
    val RoomChangeRole = object: OperationDefinition {
        override val name = "RoomChangeRole"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomChangeRole(\$newRole:RoomMemberRole!,\$roomId:ID!,\$userId:ID!){betaRoomChangeRole(newRole:\$newRole,roomId:\$roomId,userId:\$userId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomChangeRoleSelector
    }
    val RoomCreate = object: OperationDefinition {
        override val name = "RoomCreate"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomCreate(\$channel:Boolean!,\$description:String,\$kind:SharedRoomKind!,\$members:[ID!]!,\$message:String,\$organizationId:ID,\$photoRef:ImageRefInput,\$title:String){room:betaRoomCreate(channel:\$channel,description:\$description,kind:\$kind,members:\$members,message:\$message,organizationId:\$organizationId,photoRef:\$photoRef,title:\$title){__typename id}}"
        override val selector = RoomCreateSelector
    }
    val RoomCreateIntro = object: OperationDefinition {
        override val name = "RoomCreateIntro"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomCreateIntro(\$about:String,\$file:String,\$roomId:ID!,\$uid:ID!){intro:betaIntroSend(about:\$about,file:\$file,message:\$about,room:\$roomId,uid:\$uid)}"
        override val selector = RoomCreateIntroSelector
    }
    val RoomDeclineJoinReuest = object: OperationDefinition {
        override val name = "RoomDeclineJoinReuest"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomDeclineJoinReuest(\$roomId:ID!,\$userId:ID!){betaRoomDeclineJoinRequest(roomId:\$roomId,userId:\$userId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomDeclineJoinReuestSelector
    }
    val RoomDeleteMessage = object: OperationDefinition {
        override val name = "RoomDeleteMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomDeleteMessage(\$messageId:ID!){betaMessageDelete(mid:\$messageId)}"
        override val selector = RoomDeleteMessageSelector
    }
    val RoomDeleteMessages = object: OperationDefinition {
        override val name = "RoomDeleteMessages"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomDeleteMessages(\$mids:[ID!]!){betaMessageDelete(mids:\$mids)}"
        override val selector = RoomDeleteMessagesSelector
    }
    val RoomDeleteUrlAugmentation = object: OperationDefinition {
        override val name = "RoomDeleteUrlAugmentation"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomDeleteUrlAugmentation(\$messageId:ID!){betaMessageDeleteAugmentation(mid:\$messageId)}"
        override val selector = RoomDeleteUrlAugmentationSelector
    }
    val RoomEditIntro = object: OperationDefinition {
        override val name = "RoomEditIntro"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomEditIntro(\$about:String,\$file:String,\$messageId:ID!,\$uid:ID!){intro:betaIntroEdit(about:\$about,file:\$file,message:\$about,mid:\$messageId,uid:\$uid)}"
        override val selector = RoomEditIntroSelector
    }
    val RoomJoin = object: OperationDefinition {
        override val name = "RoomJoin"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomJoin(\$roomId:ID!){join:betaRoomJoin(roomId:\$roomId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomJoinSelector
    }
    val RoomJoinInviteLink = object: OperationDefinition {
        override val name = "RoomJoinInviteLink"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomJoinInviteLink(\$invite:String!){join:betaRoomInviteLinkJoin(invite:\$invite){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomJoinInviteLinkSelector
    }
    val RoomKick = object: OperationDefinition {
        override val name = "RoomKick"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomKick(\$roomId:ID!,\$userId:ID!){betaRoomKick(roomId:\$roomId,userId:\$userId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomKickSelector
    }
    val RoomLeave = object: OperationDefinition {
        override val name = "RoomLeave"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomLeave(\$roomId:ID!){betaRoomLeave(roomId:\$roomId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomLeaveSelector
    }
    val RoomRead = object: OperationDefinition {
        override val name = "RoomRead"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomRead(\$id:ID!,\$mid:ID!){roomRead(id:\$id,mid:\$mid)}"
        override val selector = RoomReadSelector
    }
    val RoomRenewInviteLink = object: OperationDefinition {
        override val name = "RoomRenewInviteLink"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomRenewInviteLink(\$roomId:ID!){link:betaRoomInviteLinkRenew(roomId:\$roomId)}"
        override val selector = RoomRenewInviteLinkSelector
    }
    val RoomSendEmailInvite = object: OperationDefinition {
        override val name = "RoomSendEmailInvite"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomSendEmailInvite(\$inviteRequests:[RoomInviteEmailRequest!]!,\$roomId:ID!){betaRoomInviteLinkSendEmail(inviteRequests:\$inviteRequests,roomId:\$roomId)}"
        override val selector = RoomSendEmailInviteSelector
    }
    val RoomSettingsUpdate = object: OperationDefinition {
        override val name = "RoomSettingsUpdate"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomSettingsUpdate(\$roomId:ID!,\$settings:RoomUserNotificaionSettingsInput!){betaRoomUpdateUserNotificationSettings(roomId:\$roomId,settings:\$settings){__typename id mute}}"
        override val selector = RoomSettingsUpdateSelector
    }
    val RoomUpdate = object: OperationDefinition {
        override val name = "RoomUpdate"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomUpdate(\$input:RoomUpdateInput!,\$roomId:ID!){betaRoomUpdate(input:\$input,roomId:\$roomId){__typename ... on PrivateRoom{id}... on SharedRoom{description id photo socialImage title}}}"
        override val selector = RoomUpdateSelector
    }
    val SaveDraftMessage = object: OperationDefinition {
        override val name = "SaveDraftMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SaveDraftMessage(\$conversationId:ID!,\$message:String!){conversationDraftUpdate(conversationId:\$conversationId,message:\$message)}"
        override val selector = SaveDraftMessageSelector
    }
    val SendMessage = object: OperationDefinition {
        override val name = "SendMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SendMessage(\$chatId:ID!,\$fileAttachments:[FileAttachmentInput!],\$mentions:[MentionInput!],\$message:String,\$repeatKey:String,\$replyMessages:[ID!],\$spans:[MessageSpanInput!]){sentMessage:sendMessage(chatId:\$chatId,fileAttachments:\$fileAttachments,mentions:\$mentions,message:\$message,repeatKey:\$repeatKey,replyMessages:\$replyMessages,spans:\$spans)}"
        override val selector = SendMessageSelector
    }
    val SendPostMessage = object: OperationDefinition {
        override val name = "SendPostMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SendPostMessage(\$attachments:[String!],\$conversationId:ID!,\$postType:PostMessageType!,\$text:String!,\$title:String!){sendPostMessage:alphaSendPostMessage(attachments:\$attachments,conversationId:\$conversationId,postType:\$postType,text:\$text,title:\$title){__typename seq}}"
        override val selector = SendPostMessageSelector
    }
    val SetOrgShortname = object: OperationDefinition {
        override val name = "SetOrgShortname"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SetOrgShortname(\$organizationId:ID!,\$shortname:String!){alphaSetOrgShortName(id:\$organizationId,shortname:\$shortname)}"
        override val selector = SetOrgShortnameSelector
    }
    val SetTyping = object: OperationDefinition {
        override val name = "SetTyping"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SetTyping(\$conversationId:ID!){typingSend(conversationId:\$conversationId,type:TEXT)}"
        override val selector = SetTypingSelector
    }
    val SetUserShortname = object: OperationDefinition {
        override val name = "SetUserShortname"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SetUserShortname(\$shortname:String!){alphaSetUserShortName(shortname:\$shortname)}"
        override val selector = SetUserShortnameSelector
    }
    val SettingsUpdate = object: OperationDefinition {
        override val name = "SettingsUpdate"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SettingsUpdate(\$input:UpdateSettingsInput){updateSettings(settings:\$input){__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename desktopNotifications emailFrequency id mobileAlert mobileIncludeText mobileNotifications primaryEmail}"
        override val selector = SettingsUpdateSelector
    }
    val SuperAccountActivate = object: OperationDefinition {
        override val name = "SuperAccountActivate"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperAccountActivate(\$accountId:ID!){superAccountActivate(id:\$accountId){__typename id state}}"
        override val selector = SuperAccountActivateSelector
    }
    val SuperAccountAdd = object: OperationDefinition {
        override val name = "SuperAccountAdd"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperAccountAdd(\$title:String!){superAccountAdd(title:\$title){__typename id}}"
        override val selector = SuperAccountAddSelector
    }
    val SuperAccountMemberAdd = object: OperationDefinition {
        override val name = "SuperAccountMemberAdd"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperAccountMemberAdd(\$accountId:ID!,\$userId:ID!){superAccountMemberAdd(id:\$accountId,userId:\$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = SuperAccountMemberAddSelector
    }
    val SuperAccountMemberRemove = object: OperationDefinition {
        override val name = "SuperAccountMemberRemove"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperAccountMemberRemove(\$accountId:ID!,\$userId:ID!){superAccountMemberRemove(id:\$accountId,userId:\$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = SuperAccountMemberRemoveSelector
    }
    val SuperAccountPend = object: OperationDefinition {
        override val name = "SuperAccountPend"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperAccountPend(\$accountId:ID!){superAccountPend(id:\$accountId){__typename id state}}"
        override val selector = SuperAccountPendSelector
    }
    val SuperAccountRename = object: OperationDefinition {
        override val name = "SuperAccountRename"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperAccountRename(\$accountId:ID!,\$title:String!){superAccountRename(id:\$accountId,title:\$title){__typename id title}}"
        override val selector = SuperAccountRenameSelector
    }
    val SuperAccountSuspend = object: OperationDefinition {
        override val name = "SuperAccountSuspend"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperAccountSuspend(\$accountId:ID!){superAccountSuspend(id:\$accountId){__typename id state}}"
        override val selector = SuperAccountSuspendSelector
    }
    val SuperAdminAdd = object: OperationDefinition {
        override val name = "SuperAdminAdd"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperAdminAdd(\$role:SuperAdminRole!,\$userId:ID!){superAdminAdd(role:\$role,userId:\$userId)}"
        override val selector = SuperAdminAddSelector
    }
    val SuperAdminRemove = object: OperationDefinition {
        override val name = "SuperAdminRemove"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperAdminRemove(\$userId:ID!){superAdminRemove(userId:\$userId)}"
        override val selector = SuperAdminRemoveSelector
    }
    val SwitchReaction = object: OperationDefinition {
        override val name = "SwitchReaction"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SwitchReaction(\$from:String!,\$messageId:ID!,\$to:String!){betaReactionRemove(mid:\$messageId,reaction:\$from)betaReactionSet(mid:\$messageId,reaction:\$to)}"
        override val selector = SwitchReactionSelector
    }
    val UnpinMessage = object: OperationDefinition {
        override val name = "UnpinMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation UnpinMessage(\$chatId:ID!){unpinMessage:betaUnpinMessage(chatId:\$chatId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = UnpinMessageSelector
    }
    val UpdateApp = object: OperationDefinition {
        override val name = "UpdateApp"
        override val kind = OperationKind.MUTATION
        override val body = "mutation UpdateApp(\$appId:ID!,\$input:AppProfileInput!){updateAppProfile(appId:\$appId,input:\$input){__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}"
        override val selector = UpdateAppSelector
    }
    val UpdateOrganization = object: OperationDefinition {
        override val name = "UpdateOrganization"
        override val kind = OperationKind.MUTATION
        override val body = "mutation UpdateOrganization(\$input:UpdateOrganizationProfileInput!,\$organizationId:ID){updateOrganizationProfile(id:\$organizationId,input:\$input){__typename ...OrganizationProfileFull}}fragment OrganizationProfileFull on OrganizationProfile{__typename about featured:alphaFeatured facebook id linkedin name photoRef{__typename crop{__typename h w x y}uuid}shortname twitter website websiteTitle}"
        override val selector = UpdateOrganizationSelector
    }
    val UpdateWelcomeMessage = object: OperationDefinition {
        override val name = "UpdateWelcomeMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation UpdateWelcomeMessage(\$roomId:ID!,\$welcomeMessageIsOn:Boolean!,\$welcomeMessageSender:ID,\$welcomeMessageText:String){updateWelcomeMessage(roomId:\$roomId,welcomeMessageIsOn:\$welcomeMessageIsOn,welcomeMessageSender:\$welcomeMessageSender,welcomeMessageText:\$welcomeMessageText)}"
        override val selector = UpdateWelcomeMessageSelector
    }
    val UserStorageSet = object: OperationDefinition {
        override val name = "UserStorageSet"
        override val kind = OperationKind.MUTATION
        override val body = "mutation UserStorageSet(\$data:[AppStorageValueInput!]!,\$namespace:String!){userStorageSet(data:\$data,namespace:\$namespace){__typename id key value}}"
        override val selector = UserStorageSetSelector
    }
    val ChatOnlinesCountWatch = object: OperationDefinition {
        override val name = "ChatOnlinesCountWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription ChatOnlinesCountWatch(\$chatId:ID!){chatOnlinesCount(chatId:\$chatId){__typename onlineMembers}}"
        override val selector = ChatOnlinesCountWatchSelector
    }
    val ChatWatch = object: OperationDefinition {
        override val name = "ChatWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription ChatWatch(\$chatId:ID!,\$state:String){event:chatUpdates(chatId:\$chatId,fromState:\$state){__typename ... on ChatUpdateSingle{seq state update{__typename ...ChatUpdateFragment}}... on ChatUpdateBatch{fromSeq seq state updates{__typename ...ChatUpdateFragment}}}}fragment ChatUpdateFragment on ChatUpdate{__typename ... on ChatMessageReceived{message{__typename ...FullMessage}repeatKey}... on ChatMessageUpdated{message{__typename ...FullMessage}}... on ChatMessageDeleted{message{__typename id}}... on ChatUpdated{chat{__typename ...RoomShort}}... on ChatLostAccess{lostAccess}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}"
        override val selector = ChatWatchSelector
    }
    val CommentWatch = object: OperationDefinition {
        override val name = "CommentWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription CommentWatch(\$fromState:String,\$peerId:ID!){event:commentUpdates(fromState:\$fromState,peerId:\$peerId){__typename ... on CommentUpdateSingle{seq state update{__typename ...CommentUpdateFragment}}... on CommentUpdateBatch{fromSeq seq state updates{__typename ...CommentUpdateFragment}}}}fragment CommentUpdateFragment on CommentUpdate{__typename ... on CommentReceived{comment{__typename ...CommentEntryFragment}}... on CommentUpdated{comment{__typename ...CommentEntryFragment}}}fragment CommentEntryFragment on CommentEntry{__typename childComments{__typename id}comment{__typename id ...FullMessage}deleted id parentComment{__typename id}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = CommentWatchSelector
    }
    val ConferenceMediaWatch = object: OperationDefinition {
        override val name = "ConferenceMediaWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription ConferenceMediaWatch(\$id:ID!,\$peerId:ID!){media:alphaConferenceMediaWatch(id:\$id,peerId:\$peerId){__typename id streams{__typename ice id sdp state}}}"
        override val selector = ConferenceMediaWatchSelector
    }
    val ConferenceWatch = object: OperationDefinition {
        override val name = "ConferenceWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription ConferenceWatch(\$id:ID!){alphaConferenceWatch(id:\$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename iceServers{__typename credential urls username}id peers{__typename connection{__typename ice sdp state}id user{__typename ...UserShort}}startTime}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = ConferenceWatchSelector
    }
    val DebugEventsWatch = object: OperationDefinition {
        override val name = "DebugEventsWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription DebugEventsWatch(\$eventsCount:Int!,\$fromState:String,\$randomDelays:Boolean!,\$seed:String!){debugEvents(eventsCount:\$eventsCount,fromState:\$fromState,randomDelays:\$randomDelays,seed:\$seed){__typename key seq}}"
        override val selector = DebugEventsWatchSelector
    }
    val DialogsWatch = object: OperationDefinition {
        override val name = "DialogsWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription DialogsWatch(\$state:String){event:dialogsUpdates(fromState:\$state){__typename ... on DialogUpdateSingle{seq state update{__typename ...DialogUpdateFragment}}... on DialogUpdateBatch{fromSeq seq state updates{__typename ...DialogUpdateFragment}}}}fragment DialogUpdateFragment on DialogUpdate{__typename ... on DialogMessageReceived{message:alphaMessage{__typename ...TinyMessage}cid globalUnread unread}... on DialogMessageUpdated{message:alphaMessage{__typename ...TinyMessage}cid}... on DialogMessageDeleted{message:alphaMessage{__typename ...TinyMessage}prevMessage:alphaPrevMessage{__typename ...TinyMessage}cid globalUnread unread}... on DialogMessageRead{cid globalUnread unread}... on DialogMessageRead{cid globalUnread unread}... on DialogTitleUpdated{cid title}... on DialogMuteChanged{cid mute}... on DialogMentionedChanged{cid haveMention}... on DialogPhotoUpdated{cid photo}... on DialogDeleted{cid globalUnread}... on DialogBump{cid globalUnread topMessage{__typename ...TinyMessage}unread}}fragment TinyMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserTiny}... on GeneralMessage{attachments{__typename fallback id ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat isImage}filePreview id}}commentsCount id quotedMessages{__typename id}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = DialogsWatchSelector
    }
    val OnlineWatch = object: OperationDefinition {
        override val name = "OnlineWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription OnlineWatch(\$conversations:[ID!]!){alphaSubscribeChatOnline(conversations:\$conversations){__typename timeout type user:user{__typename id lastSeen online}}}"
        override val selector = OnlineWatchSelector
    }
    val SettingsWatch = object: OperationDefinition {
        override val name = "SettingsWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription SettingsWatch{watchSettings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename desktopNotifications emailFrequency id mobileAlert mobileIncludeText mobileNotifications primaryEmail}"
        override val selector = SettingsWatchSelector
    }
    val TypingsWatch = object: OperationDefinition {
        override val name = "TypingsWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription TypingsWatch{typings{__typename cancel conversation{__typename id}user{__typename id name photo}}}"
        override val selector = TypingsWatchSelector
    }
    fun operationByName(name: String): OperationDefinition {
        if (name == "Account") return Account
        if (name == "AccountAppInvite") return AccountAppInvite
        if (name == "AccountAppInviteInfo") return AccountAppInviteInfo
        if (name == "AccountInviteInfo") return AccountInviteInfo
        if (name == "AccountInvites") return AccountInvites
        if (name == "AccountInvitesHistory") return AccountInvitesHistory
        if (name == "AccountSettings") return AccountSettings
        if (name == "AvailableRooms") return AvailableRooms
        if (name == "ChatHistory") return ChatHistory
        if (name == "ChatInit") return ChatInit
        if (name == "ChatSearchGroup") return ChatSearchGroup
        if (name == "Conference") return Conference
        if (name == "ConferenceMedia") return ConferenceMedia
        if (name == "Dialogs") return Dialogs
        if (name == "ExploreCommunity") return ExploreCommunity
        if (name == "ExploreOrganizations") return ExploreOrganizations
        if (name == "ExplorePeople") return ExplorePeople
        if (name == "FeatureFlags") return FeatureFlags
        if (name == "FeedHome") return FeedHome
        if (name == "FetchPushSettings") return FetchPushSettings
        if (name == "GetDraftMessage") return GetDraftMessage
        if (name == "GlobalCounter") return GlobalCounter
        if (name == "GlobalSearch") return GlobalSearch
        if (name == "Message") return Message
        if (name == "MessageComments") return MessageComments
        if (name == "MyApps") return MyApps
        if (name == "MyOrganizations") return MyOrganizations
        if (name == "Online") return Online
        if (name == "Organization") return Organization
        if (name == "OrganizationByPrefix") return OrganizationByPrefix
        if (name == "OrganizationMembersShort") return OrganizationMembersShort
        if (name == "OrganizationMembersShortPaginated") return OrganizationMembersShortPaginated
        if (name == "OrganizationProfile") return OrganizationProfile
        if (name == "OrganizationPublicInvite") return OrganizationPublicInvite
        if (name == "OrganizationWithoutMembers") return OrganizationWithoutMembers
        if (name == "Permissions") return Permissions
        if (name == "Profile") return Profile
        if (name == "ProfilePrefill") return ProfilePrefill
        if (name == "ResolveShortName") return ResolveShortName
        if (name == "ResolvedInvite") return ResolvedInvite
        if (name == "Room") return Room
        if (name == "RoomChat") return RoomChat
        if (name == "RoomHeader") return RoomHeader
        if (name == "RoomInviteInfo") return RoomInviteInfo
        if (name == "RoomInviteLink") return RoomInviteLink
        if (name == "RoomMemberShort") return RoomMemberShort
        if (name == "RoomMembers") return RoomMembers
        if (name == "RoomMembersForMentionsPaginated") return RoomMembersForMentionsPaginated
        if (name == "RoomMembersPaginated") return RoomMembersPaginated
        if (name == "RoomMembersShort") return RoomMembersShort
        if (name == "RoomSearch") return RoomSearch
        if (name == "RoomSearchText") return RoomSearchText
        if (name == "RoomSuper") return RoomSuper
        if (name == "RoomTiny") return RoomTiny
        if (name == "RoomWithoutMembers") return RoomWithoutMembers
        if (name == "Settings") return Settings
        if (name == "SuperAccount") return SuperAccount
        if (name == "SuperAccounts") return SuperAccounts
        if (name == "SuperAdmins") return SuperAdmins
        if (name == "User") return User
        if (name == "UserAvailableRooms") return UserAvailableRooms
        if (name == "UserRooms") return UserRooms
        if (name == "UserStorage") return UserStorage
        if (name == "Users") return Users
        if (name == "AccountCreateInvite") return AccountCreateInvite
        if (name == "AccountDestroyInvite") return AccountDestroyInvite
        if (name == "AccountInviteJoin") return AccountInviteJoin
        if (name == "AddAppToChat") return AddAppToChat
        if (name == "AddMessageComment") return AddMessageComment
        if (name == "BetaAddMessageComment") return BetaAddMessageComment
        if (name == "CancelTyping") return CancelTyping
        if (name == "CommentSetReaction") return CommentSetReaction
        if (name == "CommentUnsetReaction") return CommentUnsetReaction
        if (name == "ConferenceAnswer") return ConferenceAnswer
        if (name == "ConferenceCandidate") return ConferenceCandidate
        if (name == "ConferenceJoin") return ConferenceJoin
        if (name == "ConferenceKeepAlive") return ConferenceKeepAlive
        if (name == "ConferenceLeave") return ConferenceLeave
        if (name == "ConferenceOffer") return ConferenceOffer
        if (name == "CreateApp") return CreateApp
        if (name == "CreateOrganization") return CreateOrganization
        if (name == "CreateUserProfileAndOrganization") return CreateUserProfileAndOrganization
        if (name == "DebugMails") return DebugMails
        if (name == "DeleteComment") return DeleteComment
        if (name == "DeleteOrganization") return DeleteOrganization
        if (name == "DeleteUser") return DeleteUser
        if (name == "EditComment") return EditComment
        if (name == "EditMessage") return EditMessage
        if (name == "EditPostMessage") return EditPostMessage
        if (name == "FeatureFlagAdd") return FeatureFlagAdd
        if (name == "FeatureFlagDisable") return FeatureFlagDisable
        if (name == "FeatureFlagEnable") return FeatureFlagEnable
        if (name == "FeedPost") return FeedPost
        if (name == "MarkSequenceRead") return MarkSequenceRead
        if (name == "MediaAnswer") return MediaAnswer
        if (name == "MediaCandidate") return MediaCandidate
        if (name == "MediaFailed") return MediaFailed
        if (name == "MediaNegotiationNeeded") return MediaNegotiationNeeded
        if (name == "MediaOffer") return MediaOffer
        if (name == "MessageSetReaction") return MessageSetReaction
        if (name == "MessageUnsetReaction") return MessageUnsetReaction
        if (name == "OrganizationActivateByInvite") return OrganizationActivateByInvite
        if (name == "OrganizationAddMember") return OrganizationAddMember
        if (name == "OrganizationAlterPublished") return OrganizationAlterPublished
        if (name == "OrganizationChangeMemberRole") return OrganizationChangeMemberRole
        if (name == "OrganizationCreatePublicInvite") return OrganizationCreatePublicInvite
        if (name == "OrganizationInviteMembers") return OrganizationInviteMembers
        if (name == "OrganizationMemberRemove") return OrganizationMemberRemove
        if (name == "OrganizationRemoveMember") return OrganizationRemoveMember
        if (name == "PersistEvents") return PersistEvents
        if (name == "PinMessage") return PinMessage
        if (name == "ProfileCreate") return ProfileCreate
        if (name == "ProfileUpdate") return ProfileUpdate
        if (name == "RefreshAppToken") return RefreshAppToken
        if (name == "RegisterPush") return RegisterPush
        if (name == "RegisterWebPush") return RegisterWebPush
        if (name == "ReplyMessage") return ReplyMessage
        if (name == "ReportOnline") return ReportOnline
        if (name == "RespondPostMessage") return RespondPostMessage
        if (name == "RoomAddMember") return RoomAddMember
        if (name == "RoomAddMembers") return RoomAddMembers
        if (name == "RoomAlterFeatured") return RoomAlterFeatured
        if (name == "RoomAlterHidden") return RoomAlterHidden
        if (name == "RoomChangeRole") return RoomChangeRole
        if (name == "RoomCreate") return RoomCreate
        if (name == "RoomCreateIntro") return RoomCreateIntro
        if (name == "RoomDeclineJoinReuest") return RoomDeclineJoinReuest
        if (name == "RoomDeleteMessage") return RoomDeleteMessage
        if (name == "RoomDeleteMessages") return RoomDeleteMessages
        if (name == "RoomDeleteUrlAugmentation") return RoomDeleteUrlAugmentation
        if (name == "RoomEditIntro") return RoomEditIntro
        if (name == "RoomJoin") return RoomJoin
        if (name == "RoomJoinInviteLink") return RoomJoinInviteLink
        if (name == "RoomKick") return RoomKick
        if (name == "RoomLeave") return RoomLeave
        if (name == "RoomRead") return RoomRead
        if (name == "RoomRenewInviteLink") return RoomRenewInviteLink
        if (name == "RoomSendEmailInvite") return RoomSendEmailInvite
        if (name == "RoomSettingsUpdate") return RoomSettingsUpdate
        if (name == "RoomUpdate") return RoomUpdate
        if (name == "SaveDraftMessage") return SaveDraftMessage
        if (name == "SendMessage") return SendMessage
        if (name == "SendPostMessage") return SendPostMessage
        if (name == "SetOrgShortname") return SetOrgShortname
        if (name == "SetTyping") return SetTyping
        if (name == "SetUserShortname") return SetUserShortname
        if (name == "SettingsUpdate") return SettingsUpdate
        if (name == "SuperAccountActivate") return SuperAccountActivate
        if (name == "SuperAccountAdd") return SuperAccountAdd
        if (name == "SuperAccountMemberAdd") return SuperAccountMemberAdd
        if (name == "SuperAccountMemberRemove") return SuperAccountMemberRemove
        if (name == "SuperAccountPend") return SuperAccountPend
        if (name == "SuperAccountRename") return SuperAccountRename
        if (name == "SuperAccountSuspend") return SuperAccountSuspend
        if (name == "SuperAdminAdd") return SuperAdminAdd
        if (name == "SuperAdminRemove") return SuperAdminRemove
        if (name == "SwitchReaction") return SwitchReaction
        if (name == "UnpinMessage") return UnpinMessage
        if (name == "UpdateApp") return UpdateApp
        if (name == "UpdateOrganization") return UpdateOrganization
        if (name == "UpdateWelcomeMessage") return UpdateWelcomeMessage
        if (name == "UserStorageSet") return UserStorageSet
        if (name == "ChatOnlinesCountWatch") return ChatOnlinesCountWatch
        if (name == "ChatWatch") return ChatWatch
        if (name == "CommentWatch") return CommentWatch
        if (name == "ConferenceMediaWatch") return ConferenceMediaWatch
        if (name == "ConferenceWatch") return ConferenceWatch
        if (name == "DebugEventsWatch") return DebugEventsWatch
        if (name == "DialogsWatch") return DialogsWatch
        if (name == "OnlineWatch") return OnlineWatch
        if (name == "SettingsWatch") return SettingsWatch
        if (name == "TypingsWatch") return TypingsWatch
        error("Unknown operation: \$name")
    }
}