package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

private val AppChatSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("chat","chat", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(
                        field("id","id", notNull(scalar("ID")))
                    )),
                    inline("SharedRoom", obj(
                        field("id","id", notNull(scalar("ID")))
                    ))
                ))),
            field("webhook","webhook", notNull(scalar("String")))
        )

private val AppFullSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("id","id", notNull(scalar("ID"))),
            field("name","name", notNull(scalar("String"))),
            field("photoRef","photoRef", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("crop","crop", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("h","h", notNull(scalar("Int"))),
                            field("w","w", notNull(scalar("Int"))),
                            field("x","x", notNull(scalar("Int"))),
                            field("y","y", notNull(scalar("Int")))
                        )),
                    field("uuid","uuid", notNull(scalar("String")))
                )),
            field("shortname","shortname", scalar("String")),
            field("token","token", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("salt","salt", notNull(scalar("String")))
                )))
        )

private val UserBadgeSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("name","name", notNull(scalar("String"))),
            field("verified","verified", notNull(scalar("Boolean")))
        )

private val OrganizationShortSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("alphaIsCommunity","isCommunity", notNull(scalar("Boolean"))),
            field("id","id", notNull(scalar("ID"))),
            field("name","name", notNull(scalar("String"))),
            field("photo","photo", scalar("String"))
        )

private val UserShortSelector = obj(
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
            field("primaryBadge","primaryBadge", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                )),
            field("primaryOrganization","primaryOrganization", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                )),
            field("shortname","shortname", scalar("String"))
        )

private val UserForMentionSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("isYou","isYou", notNull(scalar("Boolean"))),
            field("name","name", notNull(scalar("String"))),
            field("photo","photo", scalar("String")),
            field("primaryBadge","primaryBadge", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                )),
            field("primaryOrganization","primaryOrganization", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("name","name", notNull(scalar("String")))
                ))
        )

private val UserTinySelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("firstName","firstName", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("isYou","isYou", notNull(scalar("Boolean"))),
            field("lastName","lastName", scalar("String")),
            field("name","name", notNull(scalar("String"))),
            field("photo","photo", scalar("String")),
            field("primaryBadge","primaryBadge", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                )),
            field("primaryOrganization","primaryOrganization", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                )),
            field("shortname","shortname", scalar("String"))
        )

private val FullMessageSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("date","date", notNull(scalar("Date"))),
            field("fallback","fallback", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("message","message", scalar("String")),
            field("sender","sender", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("User", UserShortSelector)
                ))),
            field("senderBadge","senderBadge", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                )),
            field("spans","spans", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("length","length", notNull(scalar("Int"))),
                    field("offset","offset", notNull(scalar("Int"))),
                    inline("MessageSpanUserMention", obj(
                        field("user","user", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserForMentionSelector)
                            )))
                    )),
                    inline("MessageSpanMultiUserMention", obj(
                        field("users","users", notNull(list(notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserForMentionSelector)
                            )))))
                    )),
                    inline("MessageSpanRoomMention", obj(
                        field("room","room", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                inline("PrivateRoom", obj(
                                    field("id","id", notNull(scalar("ID"))),
                                    field("user","user", notNull(obj(
                                            field("__typename","__typename", notNull(scalar("String"))),
                                            field("id","id", notNull(scalar("ID"))),
                                            field("name","name", notNull(scalar("String")))
                                        )))
                                )),
                                inline("SharedRoom", obj(
                                    field("id","id", notNull(scalar("ID"))),
                                    field("title","title", notNull(scalar("String")))
                                ))
                            )))
                    )),
                    inline("MessageSpanLink", obj(
                        field("url","url", notNull(scalar("String")))
                    )),
                    inline("MessageSpanDate", obj(
                        field("date","date", notNull(scalar("Date")))
                    ))
                ))))),
            inline("GeneralMessage", obj(
                field("attachments","attachments", notNull(list(notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("fallback","fallback", notNull(scalar("String"))),
                        inline("MessageAttachmentFile", obj(
                            field("fileId","fileId", notNull(scalar("String"))),
                            field("fileMetadata","fileMetadata", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("imageFormat","imageFormat", scalar("String")),
                                    field("imageHeight","imageHeight", scalar("Int")),
                                    field("imageWidth","imageWidth", scalar("Int")),
                                    field("isImage","isImage", notNull(scalar("Boolean"))),
                                    field("mimeType","mimeType", scalar("String")),
                                    field("name","name", notNull(scalar("String"))),
                                    field("size","size", notNull(scalar("Int")))
                                ))),
                            field("filePreview","filePreview", scalar("String")),
                            field("id","id", notNull(scalar("ID")))
                        )),
                        inline("MessageRichAttachment", obj(
                            field("fallback","fallback", notNull(scalar("String"))),
                            field("icon","icon", obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("metadata","metadata", obj(
                                            field("__typename","__typename", notNull(scalar("String"))),
                                            field("imageFormat","imageFormat", scalar("String")),
                                            field("imageHeight","imageHeight", scalar("Int")),
                                            field("imageWidth","imageWidth", scalar("Int")),
                                            field("isImage","isImage", notNull(scalar("Boolean"))),
                                            field("mimeType","mimeType", scalar("String")),
                                            field("name","name", notNull(scalar("String"))),
                                            field("size","size", notNull(scalar("Int")))
                                        )),
                                    field("url","url", notNull(scalar("String")))
                                )),
                            field("id","id", notNull(scalar("ID"))),
                            field("image","image", obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("metadata","metadata", obj(
                                            field("__typename","__typename", notNull(scalar("String"))),
                                            field("imageFormat","imageFormat", scalar("String")),
                                            field("imageHeight","imageHeight", scalar("Int")),
                                            field("imageWidth","imageWidth", scalar("Int")),
                                            field("isImage","isImage", notNull(scalar("Boolean"))),
                                            field("mimeType","mimeType", scalar("String")),
                                            field("name","name", notNull(scalar("String"))),
                                            field("size","size", notNull(scalar("Int")))
                                        )),
                                    field("url","url", notNull(scalar("String")))
                                )),
                            field("keyboard","keyboard", obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("buttons","buttons", notNull(list(list(notNull(obj(
                                            field("__typename","__typename", notNull(scalar("String"))),
                                            field("id","id", notNull(scalar("ID"))),
                                            field("style","style", notNull(scalar("String"))),
                                            field("title","title", notNull(scalar("String"))),
                                            field("url","url", scalar("String"))
                                        ))))))
                                )),
                            field("subTitle","subTitle", scalar("String")),
                            field("text","text", scalar("String")),
                            field("title","title", scalar("String")),
                            field("titleLink","titleLink", scalar("String")),
                            field("titleLinkHostname","titleLinkHostname", scalar("String"))
                        ))
                    ))))),
                field("commentsCount","commentsCount", notNull(scalar("Int"))),
                field("edited","edited", notNull(scalar("Boolean"))),
                field("id","id", notNull(scalar("ID"))),
                field("quotedMessages","quotedMessages", notNull(list(notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("date","date", notNull(scalar("Date"))),
                        field("fallback","fallback", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("message","message", scalar("String")),
                        field("message","message", scalar("String")),
                        field("sender","sender", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            ))),
                        field("senderBadge","senderBadge", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            )),
                        field("spans","spans", notNull(list(notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("length","length", notNull(scalar("Int"))),
                                field("offset","offset", notNull(scalar("Int"))),
                                inline("MessageSpanUserMention", obj(
                                    field("user","user", notNull(obj(
                                            field("__typename","__typename", notNull(scalar("String"))),
                                            fragment("User", UserShortSelector)
                                        )))
                                )),
                                inline("MessageSpanMultiUserMention", obj(
                                    field("users","users", notNull(list(notNull(obj(
                                            field("__typename","__typename", notNull(scalar("String"))),
                                            fragment("User", UserShortSelector)
                                        )))))
                                )),
                                inline("MessageSpanRoomMention", obj(
                                    field("room","room", notNull(obj(
                                            field("__typename","__typename", notNull(scalar("String"))),
                                            inline("PrivateRoom", obj(
                                                field("id","id", notNull(scalar("ID"))),
                                                field("user","user", notNull(obj(
                                                        field("__typename","__typename", notNull(scalar("String"))),
                                                        field("id","id", notNull(scalar("ID"))),
                                                        field("name","name", notNull(scalar("String")))
                                                    )))
                                            )),
                                            inline("SharedRoom", obj(
                                                field("id","id", notNull(scalar("ID"))),
                                                field("title","title", notNull(scalar("String")))
                                            ))
                                        )))
                                )),
                                inline("MessageSpanLink", obj(
                                    field("url","url", notNull(scalar("String")))
                                )),
                                inline("MessageSpanDate", obj(
                                    field("date","date", notNull(scalar("Date")))
                                ))
                            ))))),
                        inline("GeneralMessage", obj(
                            field("attachments","attachments", notNull(list(notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("fallback","fallback", notNull(scalar("String"))),
                                    inline("MessageAttachmentFile", obj(
                                        field("fileId","fileId", notNull(scalar("String"))),
                                        field("fileMetadata","fileMetadata", notNull(obj(
                                                field("__typename","__typename", notNull(scalar("String"))),
                                                field("imageFormat","imageFormat", scalar("String")),
                                                field("imageHeight","imageHeight", scalar("Int")),
                                                field("imageWidth","imageWidth", scalar("Int")),
                                                field("isImage","isImage", notNull(scalar("Boolean"))),
                                                field("mimeType","mimeType", scalar("String")),
                                                field("name","name", notNull(scalar("String"))),
                                                field("size","size", notNull(scalar("Int")))
                                            ))),
                                        field("filePreview","filePreview", scalar("String")),
                                        field("id","id", notNull(scalar("ID")))
                                    )),
                                    inline("MessageRichAttachment", obj(
                                        field("fallback","fallback", notNull(scalar("String"))),
                                        field("icon","icon", obj(
                                                field("__typename","__typename", notNull(scalar("String"))),
                                                field("metadata","metadata", obj(
                                                        field("__typename","__typename", notNull(scalar("String"))),
                                                        field("imageFormat","imageFormat", scalar("String")),
                                                        field("imageHeight","imageHeight", scalar("Int")),
                                                        field("imageWidth","imageWidth", scalar("Int")),
                                                        field("isImage","isImage", notNull(scalar("Boolean"))),
                                                        field("mimeType","mimeType", scalar("String")),
                                                        field("name","name", notNull(scalar("String"))),
                                                        field("size","size", notNull(scalar("Int")))
                                                    )),
                                                field("url","url", notNull(scalar("String")))
                                            )),
                                        field("id","id", notNull(scalar("ID"))),
                                        field("image","image", obj(
                                                field("__typename","__typename", notNull(scalar("String"))),
                                                field("metadata","metadata", obj(
                                                        field("__typename","__typename", notNull(scalar("String"))),
                                                        field("imageFormat","imageFormat", scalar("String")),
                                                        field("imageHeight","imageHeight", scalar("Int")),
                                                        field("imageWidth","imageWidth", scalar("Int")),
                                                        field("isImage","isImage", notNull(scalar("Boolean"))),
                                                        field("mimeType","mimeType", scalar("String")),
                                                        field("name","name", notNull(scalar("String"))),
                                                        field("size","size", notNull(scalar("Int")))
                                                    )),
                                                field("url","url", notNull(scalar("String")))
                                            )),
                                        field("subTitle","subTitle", scalar("String")),
                                        field("text","text", scalar("String")),
                                        field("title","title", scalar("String")),
                                        field("titleLink","titleLink", scalar("String")),
                                        field("titleLinkHostname","titleLinkHostname", scalar("String"))
                                    ))
                                ))))),
                            field("commentsCount","commentsCount", notNull(scalar("Int"))),
                            field("edited","edited", notNull(scalar("Boolean"))),
                            field("id","id", notNull(scalar("ID")))
                        ))
                    ))))),
                field("reactions","reactions", notNull(list(notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("reaction","reaction", notNull(scalar("String"))),
                        field("user","user", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            )))
                    )))))
            )),
            inline("ServiceMessage", obj(
                field("id","id", notNull(scalar("ID"))),
                field("serviceMetadata","serviceMetadata", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        inline("InviteServiceMetadata", obj(
                            field("invitedBy","invitedBy", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("User", UserTinySelector)
                                ))),
                            field("users","users", list(notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("User", UserTinySelector)
                                ))))
                        )),
                        inline("KickServiceMetadata", obj(
                            field("kickedBy","kickedBy", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("User", UserTinySelector)
                                ))),
                            field("user","user", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("User", UserTinySelector)
                                )))
                        )),
                        inline("TitleChangeServiceMetadata", obj(
                            field("title","title", notNull(scalar("String")))
                        )),
                        inline("PhotoChangeServiceMetadata", obj(
                            field("photo","photo", scalar("String"))
                        )),
                        inline("PostRespondServiceMetadata", obj(
                            field("respondType","respondType", notNull(scalar("ID")))
                        ))
                    ))
            ))
        )

private val RoomShortSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("PrivateRoom", obj(
                field("id","id", notNull(scalar("ID"))),
                field("pinnedMessage","pinnedMessage", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", FullMessageSelector)
                    )),
                field("settings","settings", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("mute","mute", scalar("Boolean"))
                    ))),
                field("user","user", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("User", UserShortSelector)
                    )))
            )),
            inline("SharedRoom", obj(
                field("canEdit","canEdit", notNull(scalar("Boolean"))),
                field("canSendMessage","canSendMessage", notNull(scalar("Boolean"))),
                field("id","id", notNull(scalar("ID"))),
                field("isChannel","isChannel", notNull(scalar("Boolean"))),
                field("kind","kind", notNull(scalar("String"))),
                field("membersCount","membersCount", scalar("Int")),
                field("membership","membership", notNull(scalar("String"))),
                field("organization","organization", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("Organization", OrganizationShortSelector)
                    )),
                field("photo","photo", notNull(scalar("String"))),
                field("pinnedMessage","pinnedMessage", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", FullMessageSelector)
                    )),
                field("role","role", notNull(scalar("String"))),
                field("settings","settings", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("mute","mute", scalar("Boolean"))
                    ))),
                field("title","title", notNull(scalar("String")))
            ))
        )

private val ChatUpdateFragmentSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("ChatMessageReceived", obj(
                field("message","message", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", FullMessageSelector)
                    ))),
                field("repeatKey","repeatKey", scalar("String"))
            )),
            inline("ChatMessageUpdated", obj(
                field("message","message", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", FullMessageSelector)
                    )))
            )),
            inline("ChatMessageDeleted", obj(
                field("message","message", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID")))
                    )))
            )),
            inline("ChatUpdated", obj(
                field("chat","chat", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("Room", RoomShortSelector)
                    )))
            )),
            inline("ChatLostAccess", obj(
                field("lostAccess","lostAccess", notNull(scalar("Boolean")))
            ))
        )

private val CommentEntryFragmentSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("childComments","childComments", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                ))))),
            field("comment","comment", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    fragment("ModernMessage", FullMessageSelector)
                ))),
            field("deleted","deleted", notNull(scalar("Boolean"))),
            field("id","id", notNull(scalar("ID"))),
            field("parentComment","parentComment", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("comment","comment", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("message","message", scalar("String"))
                        ))),
                    field("id","id", notNull(scalar("ID")))
                ))
        )

private val CommentUpdateFragmentSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("CommentReceived", obj(
                field("comment","comment", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("CommentEntry", CommentEntryFragmentSelector)
                    )))
            )),
            inline("CommentUpdated", obj(
                field("comment","comment", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("CommentEntry", CommentEntryFragmentSelector)
                    )))
            ))
        )

private val CommunitySearchSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("alphaFeatured","featured", notNull(scalar("Boolean"))),
            field("betaPublicRooms","betaPublicRooms", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                ))))),
            field("id","id", notNull(scalar("ID"))),
            field("isMine","isMine", notNull(scalar("Boolean"))),
            field("membersCount","membersCount", notNull(scalar("Int"))),
            field("name","name", notNull(scalar("String"))),
            field("photo","photo", scalar("String")),
            field("status","status", notNull(scalar("String"))),
            field("superAccountId","superAccountId", notNull(scalar("ID")))
        )

private val ConferenceFullSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("iceServers","iceServers", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("credential","credential", scalar("String")),
                    field("urls","urls", notNull(list(notNull(scalar("String"))))),
                    field("username","username", scalar("String"))
                ))))),
            field("id","id", notNull(scalar("ID"))),
            field("peers","peers", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("connection","connection", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("ice","ice", notNull(list(notNull(scalar("String"))))),
                            field("sdp","sdp", scalar("String")),
                            field("state","state", notNull(scalar("String")))
                        )),
                    field("id","id", notNull(scalar("ID"))),
                    field("user","user", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))
                ))))),
            field("startTime","startTime", scalar("Date"))
        )

private val ConferenceShortSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("iceServers","iceServers", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("credential","credential", scalar("String")),
                    field("urls","urls", notNull(list(notNull(scalar("String"))))),
                    field("username","username", scalar("String"))
                ))))),
            field("id","id", notNull(scalar("ID"))),
            field("startTime","startTime", scalar("Date"))
        )

private val DaialogListMessageSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("date","date", notNull(scalar("Date"))),
            field("fallback","fallback", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("message","message", scalar("String")),
            field("sender","sender", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("firstName","firstName", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("name","name", notNull(scalar("String")))
                ))),
            field("senderBadge","senderBadge", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                )),
            inline("GeneralMessage", obj(
                field("attachments","attachments", notNull(list(notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("fallback","fallback", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        inline("MessageAttachmentFile", obj(
                            field("fileId","fileId", notNull(scalar("String"))),
                            field("fileMetadata","fileMetadata", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("imageFormat","imageFormat", scalar("String")),
                                    field("isImage","isImage", notNull(scalar("Boolean")))
                                ))),
                            field("id","id", notNull(scalar("ID")))
                        ))
                    ))))),
                field("id","id", notNull(scalar("ID"))),
                field("quotedMessages","quotedMessages", notNull(list(notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID")))
                    )))))
            ))
        )

private val TinyMessageSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("date","date", notNull(scalar("Date"))),
            field("fallback","fallback", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("message","message", scalar("String")),
            field("sender","sender", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("User", UserTinySelector)
                ))),
            field("senderBadge","senderBadge", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                )),
            inline("GeneralMessage", obj(
                field("attachments","attachments", notNull(list(notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("fallback","fallback", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        inline("MessageAttachmentFile", obj(
                            field("fileId","fileId", notNull(scalar("String"))),
                            field("fileMetadata","fileMetadata", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("imageFormat","imageFormat", scalar("String")),
                                    field("isImage","isImage", notNull(scalar("Boolean")))
                                ))),
                            field("filePreview","filePreview", scalar("String")),
                            field("id","id", notNull(scalar("ID")))
                        ))
                    ))))),
                field("commentsCount","commentsCount", notNull(scalar("Int"))),
                field("id","id", notNull(scalar("ID"))),
                field("isMentioned","isMentioned", notNull(scalar("Boolean"))),
                field("quotedMessages","quotedMessages", notNull(list(notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID")))
                    )))))
            ))
        )

private val DialogUpdateFragmentSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("DialogMessageReceived", obj(
                field("alphaMessage","message", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", TinyMessageSelector)
                    ))),
                field("cid","cid", notNull(scalar("ID"))),
                field("globalUnread","globalUnread", notNull(scalar("Int"))),
                field("haveMention","haveMention", notNull(scalar("Boolean"))),
                field("unread","unread", notNull(scalar("Int")))
            )),
            inline("DialogMessageUpdated", obj(
                field("alphaMessage","message", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", TinyMessageSelector)
                    ))),
                field("cid","cid", notNull(scalar("ID"))),
                field("haveMention","haveMention", notNull(scalar("Boolean")))
            )),
            inline("DialogMessageDeleted", obj(
                field("alphaMessage","message", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", TinyMessageSelector)
                    ))),
                field("alphaPrevMessage","prevMessage", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", TinyMessageSelector)
                    )),
                field("cid","cid", notNull(scalar("ID"))),
                field("globalUnread","globalUnread", notNull(scalar("Int"))),
                field("haveMention","haveMention", notNull(scalar("Boolean"))),
                field("unread","unread", notNull(scalar("Int")))
            )),
            inline("DialogMessageRead", obj(
                field("cid","cid", notNull(scalar("ID"))),
                field("globalUnread","globalUnread", notNull(scalar("Int"))),
                field("haveMention","haveMention", notNull(scalar("Boolean"))),
                field("unread","unread", notNull(scalar("Int")))
            )),
            inline("DialogTitleUpdated", obj(
                field("cid","cid", notNull(scalar("ID"))),
                field("title","title", notNull(scalar("String")))
            )),
            inline("DialogMuteChanged", obj(
                field("cid","cid", notNull(scalar("ID"))),
                field("mute","mute", notNull(scalar("Boolean")))
            )),
            inline("DialogPhotoUpdated", obj(
                field("cid","cid", notNull(scalar("ID"))),
                field("photo","photo", scalar("String"))
            )),
            inline("DialogDeleted", obj(
                field("cid","cid", notNull(scalar("ID"))),
                field("globalUnread","globalUnread", notNull(scalar("Int")))
            )),
            inline("DialogBump", obj(
                field("cid","cid", notNull(scalar("ID"))),
                field("globalUnread","globalUnread", notNull(scalar("Int"))),
                field("haveMention","haveMention", notNull(scalar("Boolean"))),
                field("topMessage","topMessage", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", TinyMessageSelector)
                    )),
                field("unread","unread", notNull(scalar("Int")))
            ))
        )

private val RoomNanoSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("PrivateRoom", obj(
                field("id","id", notNull(scalar("ID"))),
                field("settings","settings", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("mute","mute", scalar("Boolean"))
                    ))),
                field("user","user", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("name","name", notNull(scalar("String"))),
                        field("photo","photo", scalar("String"))
                    )))
            )),
            inline("SharedRoom", obj(
                field("id","id", notNull(scalar("ID"))),
                field("isChannel","isChannel", notNull(scalar("Boolean"))),
                field("kind","kind", notNull(scalar("String"))),
                field("photo","photo", notNull(scalar("String"))),
                field("settings","settings", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("mute","mute", scalar("Boolean"))
                    ))),
                field("title","title", notNull(scalar("String")))
            ))
        )

private val NotificationFragmentSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("content","content", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("NewCommentNotification", obj(
                        field("comment","comment", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("CommentEntry", CommentEntryFragmentSelector)
                            ))),
                        field("peer","peer", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("peerRoot","peerRoot", notNull(obj(
                                        field("__typename","__typename", notNull(scalar("String"))),
                                        inline("CommentPeerRootMessage", obj(
                                            field("chat","chat", notNull(obj(
                                                    field("__typename","__typename", notNull(scalar("String"))),
                                                    fragment("Room", RoomNanoSelector)
                                                ))),
                                            field("message","message", notNull(obj(
                                                    field("__typename","__typename", notNull(scalar("String"))),
                                                    inline("GeneralMessage", obj(
                                                        field("fallback","fallback", notNull(scalar("String"))),
                                                        field("id","id", notNull(scalar("ID"))),
                                                        field("message","message", scalar("String")),
                                                        field("sender","sender", notNull(obj(
                                                                field("__typename","__typename", notNull(scalar("String"))),
                                                                field("id","id", notNull(scalar("ID"))),
                                                                field("name","name", notNull(scalar("String")))
                                                            ))),
                                                        field("senderBadge","senderBadge", obj(
                                                                field("__typename","__typename", notNull(scalar("String"))),
                                                                fragment("UserBadge", UserBadgeSelector)
                                                            ))
                                                    ))
                                                )))
                                        ))
                                    ))),
                                field("subscription","subscription", obj(
                                        field("__typename","__typename", notNull(scalar("String"))),
                                        field("type","type", scalar("String"))
                                    ))
                            )))
                    ))
                ))))),
            field("id","id", notNull(scalar("ID"))),
            field("text","text", scalar("String"))
        )

private val NotificationCenterUpdateFragmentSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("NotificationReceived", obj(
                field("center","center", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("unread","unread", notNull(scalar("Int")))
                    ))),
                field("notification","notification", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("Notification", NotificationFragmentSelector)
                    )))
            )),
            inline("NotificationUpdated", obj(
                field("center","center", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("unread","unread", notNull(scalar("Int")))
                    ))),
                field("notification","notification", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("Notification", NotificationFragmentSelector)
                    )))
            )),
            inline("NotificationDeleted", obj(
                field("center","center", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("unread","unread", notNull(scalar("Int")))
                    ))),
                field("notification","notification", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID")))
                    )))
            )),
            inline("NotificationRead", obj(
                field("center","center", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("unread","unread", notNull(scalar("Int")))
                    )))
            )),
            inline("NotificationContentUpdated", obj(
                field("content","content", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        inline("UpdatedNotificationContentComment", obj(
                            field("comment","comment", obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("CommentEntry", CommentEntryFragmentSelector)
                                )),
                            field("peer","peer", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("id","id", notNull(scalar("ID"))),
                                    field("peerRoot","peerRoot", notNull(obj(
                                            field("__typename","__typename", notNull(scalar("String"))),
                                            inline("CommentPeerRootMessage", obj(
                                                field("chat","chat", notNull(obj(
                                                        field("__typename","__typename", notNull(scalar("String"))),
                                                        fragment("Room", RoomNanoSelector)
                                                    ))),
                                                field("message","message", notNull(obj(
                                                        field("__typename","__typename", notNull(scalar("String"))),
                                                        inline("GeneralMessage", obj(
                                                            field("fallback","fallback", notNull(scalar("String"))),
                                                            field("id","id", notNull(scalar("ID"))),
                                                            field("message","message", scalar("String")),
                                                            field("sender","sender", notNull(obj(
                                                                    field("__typename","__typename", notNull(scalar("String"))),
                                                                    field("id","id", notNull(scalar("ID"))),
                                                                    field("name","name", notNull(scalar("String")))
                                                                ))),
                                                            field("senderBadge","senderBadge", obj(
                                                                    field("__typename","__typename", notNull(scalar("String"))),
                                                                    fragment("UserBadge", UserBadgeSelector)
                                                                ))
                                                        ))
                                                    )))
                                            ))
                                        ))),
                                    field("subscription","subscription", obj(
                                            field("__typename","__typename", notNull(scalar("String"))),
                                            field("type","type", scalar("String"))
                                        ))
                                )))
                        ))
                    )))
            ))
        )

private val UserFullSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("audienceSize","audienceSize", notNull(scalar("Int"))),
            field("badges","badges", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                ))))),
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
            field("primaryBadge","primaryBadge", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                )),
            field("primaryOrganization","primaryOrganization", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                )),
            field("shortname","shortname", scalar("String")),
            field("twitter","twitter", scalar("String")),
            field("website","website", scalar("String"))
        )

private val OrganizationFullSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("alphaFeatured","featured", notNull(scalar("Boolean"))),
            field("alphaIsCommunity","isCommunity", notNull(scalar("Boolean"))),
            field("alphaIsPrivate","isPrivate", notNull(scalar("Boolean"))),
            field("alphaOrganizationMemberRequests","requests", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("role","role", notNull(scalar("String"))),
                    field("user","user", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserFullSelector)
                        )))
                ))))),
            field("alphaOrganizationMembers","members", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("role","role", notNull(scalar("String"))),
                    field("user","user", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserFullSelector)
                        )))
                ))))),
            field("betaIsAdmin","isAdmin", notNull(scalar("Boolean"))),
            field("betaIsOwner","isOwner", notNull(scalar("Boolean"))),
            field("betaPublicRooms","rooms", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                ))))),
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
        )

private val OrganizationMediumSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("alphaIsCommunity","isCommunity", notNull(scalar("Boolean"))),
            field("betaIsAdmin","isAdmin", notNull(scalar("Boolean"))),
            field("betaIsOwner","isOwner", notNull(scalar("Boolean"))),
            field("id","id", notNull(scalar("ID"))),
            field("isMine","isMine", notNull(scalar("Boolean"))),
            field("membersCount","membersCount", notNull(scalar("Int"))),
            field("name","name", notNull(scalar("String"))),
            field("photo","photo", scalar("String"))
        )

private val OrganizationProfileFullSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("alphaEditorial","editorial", notNull(scalar("Boolean"))),
            field("alphaFeatured","featured", notNull(scalar("Boolean"))),
            field("alphaIsPrivate","private", notNull(scalar("Boolean"))),
            field("alphaPublished","published", notNull(scalar("Boolean"))),
            field("facebook","facebook", scalar("String")),
            field("id","id", notNull(scalar("ID"))),
            field("linkedin","linkedin", scalar("String")),
            field("name","name", notNull(scalar("String"))),
            field("photoRef","photoRef", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("crop","crop", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("h","h", notNull(scalar("Int"))),
                            field("w","w", notNull(scalar("Int"))),
                            field("x","x", notNull(scalar("Int"))),
                            field("y","y", notNull(scalar("Int")))
                        )),
                    field("uuid","uuid", notNull(scalar("String")))
                )),
            field("shortname","shortname", scalar("String")),
            field("twitter","twitter", scalar("String")),
            field("website","website", scalar("String")),
            field("websiteTitle","websiteTitle", scalar("String"))
        )

private val OrganizationSearchSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("alphaFeatured","featured", notNull(scalar("Boolean"))),
            field("alphaOrganizationMembers","members", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("user","user", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String"))),
                            field("photo","photo", scalar("String"))
                        )))
                ))))),
            field("id","id", notNull(scalar("ID"))),
            field("isMine","isMine", notNull(scalar("Boolean"))),
            field("membersCount","membersCount", notNull(scalar("Int"))),
            field("name","name", notNull(scalar("String"))),
            field("photo","photo", scalar("String")),
            field("status","status", notNull(scalar("String"))),
            field("superAccountId","superAccountId", notNull(scalar("ID")))
        )

private val OrganizationWithoutMembersFragmentSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("alphaFeatured","featured", notNull(scalar("Boolean"))),
            field("alphaIsCommunity","isCommunity", notNull(scalar("Boolean"))),
            field("alphaIsPrivate","isPrivate", notNull(scalar("Boolean"))),
            field("alphaOrganizationMemberRequests","requests", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("role","role", notNull(scalar("String"))),
                    field("user","user", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserFullSelector)
                        )))
                ))))),
            field("betaIsAdmin","isAdmin", notNull(scalar("Boolean"))),
            field("betaIsOwner","isOwner", notNull(scalar("Boolean"))),
            field("betaPublicRooms","rooms", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                ))))),
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
        )

private val RoomFullSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("PrivateRoom", obj(
                field("id","id", notNull(scalar("ID"))),
                field("pinnedMessage","pinnedMessage", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", FullMessageSelector)
                    )),
                field("settings","settings", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("mute","mute", scalar("Boolean"))
                    ))),
                field("user","user", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("User", UserShortSelector)
                    )))
            )),
            inline("SharedRoom", obj(
                field("canEdit","canEdit", notNull(scalar("Boolean"))),
                field("canSendMessage","canSendMessage", notNull(scalar("Boolean"))),
                field("description","description", scalar("String")),
                field("id","id", notNull(scalar("ID"))),
                field("isChannel","isChannel", notNull(scalar("Boolean"))),
                field("kind","kind", notNull(scalar("String"))),
                field("members","members", notNull(list(notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("badge","badge", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            )),
                        field("canKick","canKick", notNull(scalar("Boolean"))),
                        field("membership","membership", notNull(scalar("String"))),
                        field("role","role", notNull(scalar("String"))),
                        field("user","user", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            )))
                    ))))),
                field("membersCount","membersCount", scalar("Int")),
                field("membership","membership", notNull(scalar("String"))),
                field("organization","organization", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("Organization", OrganizationMediumSelector)
                    )),
                field("photo","photo", notNull(scalar("String"))),
                field("pinnedMessage","pinnedMessage", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", FullMessageSelector)
                    )),
                field("requests","requests", list(notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("user","user", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            )))
                    )))),
                field("role","role", notNull(scalar("String"))),
                field("settings","settings", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("mute","mute", scalar("Boolean"))
                    ))),
                field("socialImage","socialImage", scalar("String")),
                field("title","title", notNull(scalar("String"))),
                field("welcomeMessage","welcomeMessage", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("isOn","isOn", notNull(scalar("Boolean"))),
                        field("message","message", scalar("String")),
                        field("sender","sender", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String")))
                            ))
                    ))
            ))
        )

private val RoomFullWithoutMembersSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("PrivateRoom", obj(
                field("id","id", notNull(scalar("ID"))),
                field("settings","settings", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("mute","mute", scalar("Boolean"))
                    ))),
                field("user","user", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("User", UserShortSelector)
                    )))
            )),
            inline("SharedRoom", obj(
                field("canEdit","canEdit", notNull(scalar("Boolean"))),
                field("canSendMessage","canSendMessage", notNull(scalar("Boolean"))),
                field("description","description", scalar("String")),
                field("id","id", notNull(scalar("ID"))),
                field("isChannel","isChannel", notNull(scalar("Boolean"))),
                field("kind","kind", notNull(scalar("String"))),
                field("membersCount","membersCount", scalar("Int")),
                field("membership","membership", notNull(scalar("String"))),
                field("organization","organization", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("Organization", OrganizationMediumSelector)
                    )),
                field("photo","photo", notNull(scalar("String"))),
                field("pinnedMessage","pinnedMessage", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", FullMessageSelector)
                    )),
                field("role","role", notNull(scalar("String"))),
                field("settings","settings", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("mute","mute", scalar("Boolean"))
                    ))),
                field("socialImage","socialImage", scalar("String")),
                field("title","title", notNull(scalar("String"))),
                field("welcomeMessage","welcomeMessage", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("isOn","isOn", notNull(scalar("Boolean"))),
                        field("message","message", scalar("String")),
                        field("sender","sender", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String")))
                            ))
                    ))
            ))
        )

private val SessionStateFullSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("isAccountActivated","isAccountActivated", notNull(scalar("Boolean"))),
            field("isAccountExists","isAccountExists", notNull(scalar("Boolean"))),
            field("isAccountPicked","isAccountPicked", notNull(scalar("Boolean"))),
            field("isBlocked","isBlocked", notNull(scalar("Boolean"))),
            field("isCompleted","isCompleted", notNull(scalar("Boolean"))),
            field("isLoggedIn","isLoggedIn", notNull(scalar("Boolean"))),
            field("isProfileCreated","isProfileCreated", notNull(scalar("Boolean")))
        )

private val SettingsFullSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("commentNotifications","commentNotifications", notNull(scalar("String"))),
            field("commentNotificationsDelivery","commentNotificationsDelivery", notNull(scalar("String"))),
            field("desktopNotifications","desktopNotifications", notNull(scalar("String"))),
            field("emailFrequency","emailFrequency", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("mobileAlert","mobileAlert", notNull(scalar("Boolean"))),
            field("mobileIncludeText","mobileIncludeText", notNull(scalar("Boolean"))),
            field("mobileNotifications","mobileNotifications", notNull(scalar("String"))),
            field("primaryEmail","primaryEmail", notNull(scalar("String")))
        )

private val AccountSelector = obj(
            field("me","me", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("User", UserShortSelector)
                )),
            field("myPermissions","myPermissions", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("roles","roles", notNull(list(notNull(scalar("String")))))
                ))),
            field("sessionState","sessionState", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("SessionState", SessionStateFullSelector)
                )))
        )
private val AccountAppInviteSelector = obj(
            field("appInvite","invite", notNull(scalar("String")))
        )
private val AccountAppInviteInfoSelector = obj(
            field("alphaInviteInfo","invite", arguments(fieldValue("key", refValue("inviteKey"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("creator","creator", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )),
                    field("id","id", notNull(scalar("ID")))
                )),
            field("appInviteInfo","appInvite", arguments(fieldValue("key", refValue("inviteKey"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("inviter","inviter", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))
                ))
        )
private val AccountInviteInfoSelector = obj(
            field("alphaInviteInfo","invite", arguments(fieldValue("key", refValue("inviteKey"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("creator","creator", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )),
                    field("forEmail","forEmail", scalar("String")),
                    field("forName","forName", scalar("String")),
                    field("id","id", notNull(scalar("ID"))),
                    field("joined","joined", notNull(scalar("Boolean"))),
                    field("key","key", notNull(scalar("String"))),
                    field("membersCount","membersCount", scalar("Int")),
                    field("orgId","orgId", notNull(scalar("ID"))),
                    field("organization","organization", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("about","about", scalar("String")),
                            field("alphaIsCommunity","isCommunity", notNull(scalar("Boolean"))),
                            field("id","id", notNull(scalar("ID")))
                        )),
                    field("photo","photo", scalar("String")),
                    field("title","title", notNull(scalar("String")))
                ))
        )
private val AccountInvitesSelector = obj(
            field("alphaInvites","invites", list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String")))
                ))))
        )
private val AccountInvitesHistorySelector = obj(
            field("alphaInvitesHistory","invites", list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("acceptedBy","acceptedBy", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String"))),
                            field("picture","picture", scalar("String"))
                        )),
                    field("forEmail","forEmail", notNull(scalar("String"))),
                    field("isGlobal","isGlobal", notNull(scalar("Boolean")))
                ))))
        )
private val AccountSettingsSelector = obj(
            field("me","me", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("User", UserShortSelector)
                )),
            field("myOrganizations","organizations", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                )))))
        )
private val AvailableRoomsSelector = obj(
            field("alphaComunityPrefixSearch","communities", arguments(fieldValue("first", intValue(3))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("edges","edges", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("node","node", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("Organization", CommunitySearchSelector)
                                )))
                        )))))
                ))),
            field("betaIsDiscoverDone","isDiscoverDone", notNull(scalar("Boolean"))),
            field("betaSuggestedRooms","suggestedRooms", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("id","id", notNull(scalar("ID"))),
                        field("kind","kind", notNull(scalar("String"))),
                        field("membersCount","membersCount", scalar("Int")),
                        field("membership","membership", notNull(scalar("String"))),
                        field("organization","organization", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String"))),
                                field("photo","photo", scalar("String"))
                            )),
                        field("photo","photo", notNull(scalar("String"))),
                        field("title","title", notNull(scalar("String")))
                    ))
                ))))),
            field("betaUserAvailableRooms","availableChats", arguments(fieldValue("isChannel", boolValue(false)), fieldValue("limit", intValue(3))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("id","id", notNull(scalar("ID"))),
                        field("kind","kind", notNull(scalar("String"))),
                        field("membersCount","membersCount", scalar("Int")),
                        field("membership","membership", notNull(scalar("String"))),
                        field("organization","organization", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String"))),
                                field("photo","photo", scalar("String"))
                            )),
                        field("photo","photo", notNull(scalar("String"))),
                        field("title","title", notNull(scalar("String")))
                    ))
                ))))),
            field("betaUserAvailableRooms","availableChannels", arguments(fieldValue("isChannel", boolValue(true)), fieldValue("limit", intValue(3))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("id","id", notNull(scalar("ID"))),
                        field("kind","kind", notNull(scalar("String"))),
                        field("membersCount","membersCount", scalar("Int")),
                        field("membership","membership", notNull(scalar("String"))),
                        field("organization","organization", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String"))),
                                field("photo","photo", scalar("String"))
                            )),
                        field("photo","photo", notNull(scalar("String"))),
                        field("title","title", notNull(scalar("String")))
                    ))
                )))))
        )
private val ChatHistorySelector = obj(
            field("conversationState","state", arguments(fieldValue("id", refValue("chatId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("state","state", scalar("String"))
                ))),
            field("messages","messages", arguments(fieldValue("before", refValue("before")), fieldValue("chatId", refValue("chatId")), fieldValue("first", refValue("first"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("ModernMessage", FullMessageSelector)
                )))))
        )
private val ChatInitSelector = obj(
            field("conversationState","state", arguments(fieldValue("id", refValue("chatId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("state","state", scalar("String"))
                ))),
            field("lastReadedMessage","lastReadedMessage", arguments(fieldValue("chatId", refValue("chatId"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                )),
            field("messages","messages", arguments(fieldValue("before", refValue("before")), fieldValue("chatId", refValue("chatId")), fieldValue("first", refValue("first"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("ModernMessage", FullMessageSelector)
                ))))),
            field("room","room", arguments(fieldValue("id", refValue("chatId"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                ))
        )
private val ChatSearchGroupSelector = obj(
            field("alphaChatSearch","group", arguments(fieldValue("members", refValue("members"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("flexibleId","flexibleId", notNull(scalar("ID"))),
                    field("id","id", notNull(scalar("ID")))
                ))
        )
private val ConferenceSelector = obj(
            field("conference","conference", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceFullSelector)
                )))
        )
private val ConferenceMediaSelector = obj(
            field("conferenceMedia","conferenceMedia", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("iceServers","iceServers", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("credential","credential", scalar("String")),
                            field("urls","urls", notNull(list(notNull(scalar("String"))))),
                            field("username","username", scalar("String"))
                        ))))),
                    field("id","id", notNull(scalar("ID"))),
                    field("streams","streams", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("ice","ice", notNull(list(notNull(scalar("String"))))),
                            field("id","id", notNull(scalar("ID"))),
                            field("sdp","sdp", scalar("String")),
                            field("state","state", notNull(scalar("String")))
                        )))))
                )))
        )
private val DialogsSelector = obj(
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
private val DiscoverIsDoneSelector = obj(
            field("betaIsDiscoverDone","betaIsDiscoverDone", notNull(scalar("Boolean")))
        )
private val DiscoverNextPageSelector = obj(
            field("betaNextDiscoverPage","betaNextDiscoverPage", arguments(fieldValue("excudedGroupsIds", refValue("excudedGroupsIds")), fieldValue("selectedTagsIds", refValue("selectedTagsIds"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("chats","chats", list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("Room", RoomShortSelector)
                        )))),
                    field("tagGroup","tagGroup", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("String"))),
                            field("subtitle","subtitle", scalar("String")),
                            field("tags","tags", notNull(list(notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("id","id", notNull(scalar("String"))),
                                    field("title","title", notNull(scalar("String")))
                                ))))),
                            field("title","title", scalar("String"))
                        ))
                ))
        )
private val ExploreCommunitySelector = obj(
            field("alphaComunityPrefixSearch","items", arguments(fieldValue("after", refValue("after")), fieldValue("featuredIfEmptyQuery", refValue("featuredIfEmptyQuery")), fieldValue("first", intValue(25)), fieldValue("page", refValue("page")), fieldValue("query", refValue("query")), fieldValue("sort", refValue("sort"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("edges","edges", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("cursor","cursor", notNull(scalar("String"))),
                            field("node","node", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("Organization", CommunitySearchSelector)
                                )))
                        ))))),
                    field("pageInfo","pageInfo", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("currentPage","currentPage", notNull(scalar("Int"))),
                            field("hasNextPage","hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage","hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount","itemsCount", notNull(scalar("Int"))),
                            field("openEnded","openEnded", notNull(scalar("Boolean"))),
                            field("pagesCount","pagesCount", notNull(scalar("Int")))
                        )))
                )))
        )
private val ExploreOrganizationsSelector = obj(
            field("alphaOrganizations","items", arguments(fieldValue("after", refValue("after")), fieldValue("all", refValue("all")), fieldValue("first", intValue(25)), fieldValue("page", refValue("page")), fieldValue("prefix", refValue("prefix")), fieldValue("query", refValue("query")), fieldValue("sort", refValue("sort"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("edges","edges", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("cursor","cursor", notNull(scalar("String"))),
                            field("node","node", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("Organization", OrganizationSearchSelector)
                                )))
                        ))))),
                    field("pageInfo","pageInfo", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("currentPage","currentPage", notNull(scalar("Int"))),
                            field("hasNextPage","hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage","hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount","itemsCount", notNull(scalar("Int"))),
                            field("openEnded","openEnded", notNull(scalar("Boolean"))),
                            field("pagesCount","pagesCount", notNull(scalar("Int")))
                        )))
                )))
        )
private val ExplorePeopleSelector = obj(
            field("userSearch","items", arguments(fieldValue("after", refValue("after")), fieldValue("first", intValue(25)), fieldValue("page", refValue("page")), fieldValue("query", refValue("query")), fieldValue("sort", refValue("sort"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("edges","edges", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("cursor","cursor", notNull(scalar("String"))),
                            field("node","node", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("isYou","isYou", notNull(scalar("Boolean"))),
                                    fragment("User", UserShortSelector)
                                )))
                        ))))),
                    field("pageInfo","pageInfo", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("currentPage","currentPage", notNull(scalar("Int"))),
                            field("hasNextPage","hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage","hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount","itemsCount", notNull(scalar("Int"))),
                            field("openEnded","openEnded", notNull(scalar("Boolean"))),
                            field("pagesCount","pagesCount", notNull(scalar("Int")))
                        )))
                )))
        )
private val FeatureFlagsSelector = obj(
            field("featureFlags","featureFlags", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("title","title", notNull(scalar("String")))
                )))))
        )
private val FeedHomeSelector = obj(
            field("alphaHomeFeed","homeFeed", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("alphaBy","by", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))),
                    field("date","date", notNull(scalar("Date"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("text","text", notNull(scalar("String")))
                )))))
        )
private val FetchPushSettingsSelector = obj(
            field("pushSettings","pushSettings", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("webPushKey","webPushKey", scalar("String"))
                )))
        )
private val GetDraftMessageSelector = obj(
            field("conversationDraft","message", arguments(fieldValue("conversationId", refValue("conversationId"))), scalar("String"))
        )
private val GlobalCounterSelector = obj(
            field("alphaNotificationCounter","alphaNotificationCounter", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("unreadCount","unreadCount", notNull(scalar("Int")))
                )))
        )
private val GlobalSearchSelector = obj(
            field("alphaGlobalSearch","items", arguments(fieldValue("kinds", refValue("kinds")), fieldValue("query", refValue("query"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("Organization", obj(
                        fragment("Organization", OrganizationShortSelector)
                    )),
                    inline("User", obj(
                        fragment("User", UserShortSelector)
                    )),
                    inline("SharedRoom", obj(
                        field("id","id", notNull(scalar("ID"))),
                        field("kind","kind", notNull(scalar("String"))),
                        field("membersCount","membersCount", scalar("Int")),
                        field("membership","membership", notNull(scalar("String"))),
                        field("organization","organization", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String"))),
                                field("photo","photo", scalar("String"))
                            )),
                        field("photo","roomPhoto", notNull(scalar("String"))),
                        field("title","title", notNull(scalar("String")))
                    ))
                )))))
        )
private val MessageSelector = obj(
            field("message","message", arguments(fieldValue("messageId", refValue("messageId"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("ModernMessage", FullMessageSelector)
                ))
        )
private val MessageCommentsSelector = obj(
            field("messageComments","messageComments", arguments(fieldValue("messageId", refValue("messageId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("comments","comments", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("CommentEntry", CommentEntryFragmentSelector)
                        ))))),
                    field("count","count", notNull(scalar("Int"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("state","state", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("state","state", scalar("String"))
                        )))
                )))
        )
private val MyAppsSelector = obj(
            field("myApps","apps", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                )))))
        )
private val MyNotificationCenterSelector = obj(
            field("myNotificationCenter","myNotificationCenter", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("state","state", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("state","state", scalar("String"))
                        ))),
                    field("unread","unread", notNull(scalar("Int")))
                )))
        )
private val MyNotificationsSelector = obj(
            field("myNotifications","myNotifications", arguments(fieldValue("before", refValue("before")), fieldValue("first", refValue("first"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("cursor","cursor", scalar("String")),
                    field("items","items", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("Notification", NotificationFragmentSelector)
                        )))))
                )))
        )
private val MyOrganizationsSelector = obj(
            field("myOrganizations","myOrganizations", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("betaIsPrimary","isPrimary", notNull(scalar("Boolean"))),
                    fragment("Organization", OrganizationShortSelector)
                )))))
        )
private val OnlineSelector = obj(
            field("user","user", arguments(fieldValue("id", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("lastSeen","lastSeen", scalar("String")),
                    field("online","online", notNull(scalar("Boolean")))
                )))
        )
private val OrganizationSelector = obj(
            field("organization","organization", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationFullSelector)
                )))
        )
private val OrganizationByPrefixSelector = obj(
            field("alphaOrganizationByPrefix","organizationByPrefix", arguments(fieldValue("query", refValue("query"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationSearchSelector)
                ))
        )
private val OrganizationMembersShortSelector = obj(
            field("organization","organization", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("alphaOrganizationMembers","members", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("user","user", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("id","id", notNull(scalar("ID")))
                                )))
                        ))))),
                    fragment("Organization", OrganizationWithoutMembersFragmentSelector)
                )))
        )
private val OrganizationMembersShortPaginatedSelector = obj(
            field("organization","organization", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("alphaOrganizationMembers","members", arguments(fieldValue("after", refValue("after")), fieldValue("first", refValue("first"))), notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("role","role", notNull(scalar("String"))),
                            field("user","user", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("User", UserFullSelector)
                                )))
                        ))))),
                    fragment("Organization", OrganizationWithoutMembersFragmentSelector)
                )))
        )
private val OrganizationProfileSelector = obj(
            field("organizationProfile","organizationProfile", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("OrganizationProfile", OrganizationProfileFullSelector)
                )))
        )
private val OrganizationPublicInviteSelector = obj(
            field("alphaOrganizationInviteLink","publicInvite", arguments(fieldValue("organizationId", refValue("organizationId"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("ttl","ttl", scalar("String"))
                ))
        )
private val OrganizationWithoutMembersSelector = obj(
            field("organization","organization", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationWithoutMembersFragmentSelector)
                )))
        )
private val PermissionsSelector = obj(
            field("myPermissions","myPermissions", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("roles","roles", notNull(list(notNull(scalar("String")))))
                )))
        )
private val ProfileSelector = obj(
            field("me","user", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("shortname","shortname", scalar("String"))
                )),
            field("myProfile","profile", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("about","about", scalar("String")),
                    field("alphaInvitedBy","invitedBy", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String")))
                        )),
                    field("alphaJoinedAt","joinedAt", scalar("String")),
                    field("alphaLinkedin","linkedin", scalar("String")),
                    field("alphaRole","role", scalar("String")),
                    field("email","email", scalar("String")),
                    field("firstName","firstName", scalar("String")),
                    field("id","id", notNull(scalar("ID"))),
                    field("lastName","lastName", scalar("String")),
                    field("location","location", scalar("String")),
                    field("phone","phone", scalar("String")),
                    field("photoRef","photoRef", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("crop","crop", obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("h","h", notNull(scalar("Int"))),
                                    field("w","w", notNull(scalar("Int"))),
                                    field("x","x", notNull(scalar("Int"))),
                                    field("y","y", notNull(scalar("Int")))
                                )),
                            field("uuid","uuid", notNull(scalar("String")))
                        )),
                    field("primaryBadge","primaryBadge", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("UserBadge", UserBadgeSelector)
                        )),
                    field("primaryOrganization","primaryOrganization", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("membersCount","membersCount", notNull(scalar("Int"))),
                            field("name","name", notNull(scalar("String")))
                        )),
                    field("website","website", scalar("String"))
                ))
        )
private val ProfilePrefillSelector = obj(
            field("myProfilePrefill","prefill", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("firstName","firstName", scalar("String")),
                    field("lastName","lastName", scalar("String")),
                    field("picture","picture", scalar("String"))
                ))
        )
private val ResolveShortNameSelector = obj(
            field("alphaResolveShortName","item", arguments(fieldValue("shortname", refValue("shortname"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("User", obj(
                        fragment("User", UserFullSelector)
                    )),
                    inline("Organization", obj(
                        fragment("Organization", OrganizationFullSelector)
                    ))
                ))
        )
private val ResolvedInviteSelector = obj(
            field("alphaResolveInvite","invite", arguments(fieldValue("key", refValue("key"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("InviteInfo", obj(
                        field("creator","creator", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            )),
                        field("id","id", notNull(scalar("ID"))),
                        field("orgId","orgId", notNull(scalar("ID"))),
                        field("title","title", notNull(scalar("String")))
                    )),
                    inline("AppInvite", obj(
                        field("inviter","inviter", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            )))
                    )),
                    inline("RoomInvite", obj(
                        field("id","id", notNull(scalar("ID"))),
                        field("invitedByUser","invitedByUser", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            ))),
                        field("room","room", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                inline("SharedRoom", obj(
                                    field("description","description", scalar("String")),
                                    field("id","id", notNull(scalar("ID"))),
                                    field("isChannel","isChannel", notNull(scalar("Boolean"))),
                                    field("kind","kind", notNull(scalar("String"))),
                                    field("membersCount","membersCount", scalar("Int")),
                                    field("membership","membership", notNull(scalar("String"))),
                                    field("photo","photo", notNull(scalar("String"))),
                                    field("socialImage","socialImage", scalar("String")),
                                    field("title","title", notNull(scalar("String")))
                                ))
                            )))
                    ))
                ))
        )
private val RoomSelector = obj(
            field("room","room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                ))
        )
private val RoomChatSelector = obj(
            field("room","room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(
                        field("id","id", notNull(scalar("ID"))),
                        field("pinnedMessage","pinnedMessage", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("ModernMessage", FullMessageSelector)
                            )),
                        field("user","user", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String")))
                            )))
                    )),
                    inline("SharedRoom", obj(
                        field("canEdit","canEdit", notNull(scalar("Boolean"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("isChannel","isChannel", notNull(scalar("Boolean"))),
                        field("kind","kind", notNull(scalar("String"))),
                        field("membersCount","membersCount", scalar("Int")),
                        field("membership","membership", notNull(scalar("String"))),
                        field("photo","photo", notNull(scalar("String"))),
                        field("pinnedMessage","pinnedMessage", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("ModernMessage", FullMessageSelector)
                            )),
                        field("role","role", notNull(scalar("String"))),
                        field("title","title", notNull(scalar("String")))
                    ))
                ))
        )
private val RoomHeaderSelector = obj(
            field("room","room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(
                        field("id","id", notNull(scalar("ID"))),
                        field("settings","settings", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("mute","mute", scalar("Boolean"))
                            ))),
                        field("user","user", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String"))),
                                field("photo","photo", scalar("String")),
                                field("primaryOrganization","primaryOrganization", obj(
                                        field("__typename","__typename", notNull(scalar("String"))),
                                        field("id","id", notNull(scalar("ID"))),
                                        field("name","name", notNull(scalar("String")))
                                    ))
                            )))
                    )),
                    inline("SharedRoom", obj(
                        field("canEdit","canEdit", notNull(scalar("Boolean"))),
                        field("description","description", scalar("String")),
                        field("id","id", notNull(scalar("ID"))),
                        field("isChannel","isChannel", notNull(scalar("Boolean"))),
                        field("kind","kind", notNull(scalar("String"))),
                        field("membersCount","membersCount", scalar("Int")),
                        field("organization","organization", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("betaIsAdmin","isAdmin", notNull(scalar("Boolean"))),
                                field("betaIsOwner","isOwner", notNull(scalar("Boolean"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String")))
                            )),
                        field("photo","photo", notNull(scalar("String"))),
                        field("role","role", notNull(scalar("String"))),
                        field("settings","settings", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("mute","mute", scalar("Boolean"))
                            ))),
                        field("socialImage","socialImage", scalar("String")),
                        field("title","title", notNull(scalar("String"))),
                        field("welcomeMessage","welcomeMessage", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("isOn","isOn", notNull(scalar("Boolean"))),
                                field("message","message", scalar("String")),
                                field("sender","sender", obj(
                                        field("__typename","__typename", notNull(scalar("String"))),
                                        field("id","id", notNull(scalar("ID"))),
                                        field("name","name", notNull(scalar("String")))
                                    ))
                            ))
                    ))
                ))
        )
private val RoomInviteInfoSelector = obj(
            field("betaRoomInviteInfo","invite", arguments(fieldValue("invite", refValue("invite"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("invitedByUser","invitedByUser", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))),
                    field("room","room", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            inline("SharedRoom", obj(
                                field("description","description", scalar("String")),
                                field("id","id", notNull(scalar("ID"))),
                                field("isChannel","isChannel", notNull(scalar("Boolean"))),
                                field("kind","kind", notNull(scalar("String"))),
                                field("membersCount","membersCount", scalar("Int")),
                                field("membership","membership", notNull(scalar("String"))),
                                field("organization","organization", obj(
                                        field("__typename","__typename", notNull(scalar("String"))),
                                        fragment("Organization", OrganizationShortSelector)
                                    )),
                                field("photo","photo", notNull(scalar("String"))),
                                field("socialImage","socialImage", scalar("String")),
                                field("title","title", notNull(scalar("String")))
                            ))
                        )))
                ))
        )
private val RoomInviteLinkSelector = obj(
            field("betaRoomInviteLink","link", arguments(fieldValue("roomId", refValue("roomId"))), notNull(scalar("String")))
        )
private val RoomMemberShortSelector = obj(
            field("roomMember","member", arguments(fieldValue("memberId", refValue("memberId")), fieldValue("roomId", refValue("roomId"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("user","user", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("firstName","firstName", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String")))
                        )))
                ))
        )
private val RoomMembersSelector = obj(
            field("roomMembers","members", arguments(fieldValue("roomId", refValue("roomId"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("canKick","canKick", notNull(scalar("Boolean"))),
                    field("membership","membership", notNull(scalar("String"))),
                    field("role","role", notNull(scalar("String"))),
                    field("user","user", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))
                )))))
        )
private val RoomMembersForMentionsPaginatedSelector = obj(
            field("roomMembers","members", arguments(fieldValue("after", refValue("after")), fieldValue("first", refValue("first")), fieldValue("roomId", refValue("roomId"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("user","user", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserForMentionSelector)
                        )))
                )))))
        )
private val RoomMembersPaginatedSelector = obj(
            field("roomMembers","members", arguments(fieldValue("after", refValue("after")), fieldValue("first", refValue("first")), fieldValue("roomId", refValue("roomId"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("badge","badge", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("UserBadge", UserBadgeSelector)
                        )),
                    field("canKick","canKick", notNull(scalar("Boolean"))),
                    field("membership","membership", notNull(scalar("String"))),
                    field("role","role", notNull(scalar("String"))),
                    field("user","user", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))
                )))))
        )
private val RoomMembersShortSelector = obj(
            field("roomMembers","members", arguments(fieldValue("roomId", refValue("roomId"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("user","user", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID")))
                        )))
                )))))
        )
private val RoomOrganizationAdminMembersSelector = obj(
            field("room","room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("id","id", notNull(scalar("ID"))),
                        field("organization","organization", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("alphaOrganizationAdminMembers","adminMembers", notNull(list(notNull(obj(
                                        field("__typename","__typename", notNull(scalar("String"))),
                                        field("role","role", notNull(scalar("String"))),
                                        field("user","user", notNull(obj(
                                                field("__typename","__typename", notNull(scalar("String"))),
                                                fragment("User", UserShortSelector)
                                            )))
                                    ))))),
                                field("id","id", notNull(scalar("ID")))
                            ))
                    ))
                ))
        )
private val RoomPicoSelector = obj(
            field("room","room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomNanoSelector)
                ))
        )
private val RoomSearchSelector = obj(
            field("betaRoomSearch","items", arguments(fieldValue("first", intValue(25)), fieldValue("page", refValue("page")), fieldValue("query", refValue("query")), fieldValue("sort", refValue("sort"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("edges","edges", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("cursor","cursor", notNull(scalar("String"))),
                            field("node","node", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    inline("SharedRoom", obj(
                                        field("id","id", notNull(scalar("ID"))),
                                        field("isChannel","isChannel", notNull(scalar("Boolean"))),
                                        field("kind","kind", notNull(scalar("String"))),
                                        field("membersCount","membersCount", scalar("Int")),
                                        field("membership","membership", notNull(scalar("String"))),
                                        field("organization","organization", obj(
                                                field("__typename","__typename", notNull(scalar("String"))),
                                                field("id","id", notNull(scalar("ID"))),
                                                field("name","name", notNull(scalar("String"))),
                                                field("photo","photo", scalar("String"))
                                            )),
                                        field("photo","photo", notNull(scalar("String"))),
                                        field("title","title", notNull(scalar("String")))
                                    ))
                                )))
                        ))))),
                    field("pageInfo","pageInfo", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("currentPage","currentPage", notNull(scalar("Int"))),
                            field("hasNextPage","hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage","hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount","itemsCount", notNull(scalar("Int"))),
                            field("openEnded","openEnded", notNull(scalar("Boolean"))),
                            field("pagesCount","pagesCount", notNull(scalar("Int")))
                        )))
                )))
        )
private val RoomSearchTextSelector = obj(
            field("betaDialogTextSearch","items", arguments(fieldValue("query", refValue("query"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("cid","id", notNull(scalar("ID"))),
                    field("fid","flexibleId", notNull(scalar("ID"))),
                    field("id","id2", notNull(scalar("ID"))),
                    field("kind","kind", notNull(scalar("String"))),
                    field("photo","photo", notNull(scalar("String"))),
                    field("title","title", notNull(scalar("String")))
                )))))
        )
private val RoomSuperSelector = obj(
            field("roomSuper","roomSuper", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("featured","featured", notNull(scalar("Boolean"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("listed","listed", notNull(scalar("Boolean")))
                ))
        )
private val RoomTinySelector = obj(
            field("room","room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                ))
        )
private val RoomWithoutMembersSelector = obj(
            field("room","room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullWithoutMembersSelector)
                ))
        )
private val RoomsSelector = obj(
            field("rooms","rooms", arguments(fieldValue("ids", refValue("ids"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))))
        )
private val SettingsSelector = obj(
            field("settings","settings", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Settings", SettingsFullSelector)
                )))
        )
private val SuggestedRoomsSelector = obj(
            field("betaIsDiscoverDone","isDiscoverDone", notNull(scalar("Boolean"))),
            field("betaSuggestedRooms","suggestedRooms", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("id","id", notNull(scalar("ID"))),
                        field("kind","kind", notNull(scalar("String"))),
                        field("membersCount","membersCount", scalar("Int")),
                        field("membership","membership", notNull(scalar("String"))),
                        field("organization","organization", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String"))),
                                field("photo","photo", scalar("String"))
                            )),
                        field("photo","photo", notNull(scalar("String"))),
                        field("title","title", notNull(scalar("String")))
                    ))
                )))))
        )
private val SuperAccountSelector = obj(
            field("superAccount","superAccount", arguments(fieldValue("id", refValue("accountId")), fieldValue("viaOrgId", refValue("viaOrgId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("alphaPublished","published", notNull(scalar("Boolean"))),
                    field("createdAt","createdAt", scalar("String")),
                    field("createdBy","createdBy", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String")))
                        )),
                    field("features","features", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("key","key", notNull(scalar("String"))),
                            field("title","title", notNull(scalar("String")))
                        ))))),
                    field("id","id", notNull(scalar("ID"))),
                    field("members","members", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))))),
                    field("orgId","orgId", notNull(scalar("ID"))),
                    field("state","state", notNull(scalar("String"))),
                    field("title","title", notNull(scalar("String")))
                )))
        )
private val SuperAccountsSelector = obj(
            field("superAccounts","superAccounts", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("createdAt","createdAt", scalar("String")),
                    field("id","id", notNull(scalar("ID"))),
                    field("orgId","orgId", notNull(scalar("ID"))),
                    field("state","state", notNull(scalar("String"))),
                    field("title","title", notNull(scalar("String")))
                )))))
        )
private val SuperAdminsSelector = obj(
            field("superAdmins","superAdmins", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("email","email", scalar("String")),
                    field("role","role", notNull(scalar("String"))),
                    field("user","user", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))
                )))))
        )
private val UserSelector = obj(
            field("room","conversation", arguments(fieldValue("id", refValue("userId"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(
                        field("id","id", notNull(scalar("ID"))),
                        field("settings","settings", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("mute","mute", scalar("Boolean"))
                            )))
                    ))
                )),
            field("user","user", arguments(fieldValue("id", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("User", UserFullSelector)
                )))
        )
private val UserAvailableRoomsSelector = obj(
            field("betaUserAvailableRooms","betaUserAvailableRooms", arguments(fieldValue("after", refValue("after")), fieldValue("isChannel", refValue("isChannel")), fieldValue("limit", refValue("limit"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("id","id", notNull(scalar("ID"))),
                        field("kind","kind", notNull(scalar("String"))),
                        field("membersCount","membersCount", scalar("Int")),
                        field("membership","membership", notNull(scalar("String"))),
                        field("organization","organization", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String"))),
                                field("photo","photo", scalar("String"))
                            )),
                        field("photo","photo", notNull(scalar("String"))),
                        field("title","title", notNull(scalar("String")))
                    ))
                )))))
        )
private val UserRoomsSelector = obj(
            field("betaUserRooms","betaUserRooms", arguments(fieldValue("after", refValue("after")), fieldValue("limit", refValue("limit"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("id","id", notNull(scalar("ID"))),
                        field("kind","kind", notNull(scalar("String"))),
                        field("membersCount","membersCount", scalar("Int")),
                        field("membership","membership", notNull(scalar("String"))),
                        field("organization","organization", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("name","name", notNull(scalar("String"))),
                                field("photo","photo", scalar("String"))
                            )),
                        field("photo","photo", notNull(scalar("String"))),
                        field("title","title", notNull(scalar("String")))
                    ))
                )))))
        )
private val UserStorageSelector = obj(
            field("userStorage","userStorage", arguments(fieldValue("keys", refValue("keys")), fieldValue("namespace", refValue("namespace"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("value","value", scalar("String"))
                )))))
        )
private val UsersSelector = obj(
            field("users","items", arguments(fieldValue("query", refValue("query"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("email","subtitle", scalar("String")),
                    field("id","id", notNull(scalar("ID"))),
                    field("name","title", notNull(scalar("String"))),
                    field("primaryBadge","primaryBadge", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("UserBadge", UserBadgeSelector)
                        ))
                )))))
        )
private val AccountCreateInviteSelector = obj(
            field("alphaCreateInvite","alphaCreateInvite", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String")))
                )))
        )
private val AccountDestroyInviteSelector = obj(
            field("alphaDeleteInvite","alphaDeleteInvite", arguments(fieldValue("id", refValue("id"))), notNull(scalar("String")))
        )
private val AccountInviteJoinSelector = obj(
            field("alphaJoinInvite","alphaJoinInvite", arguments(fieldValue("key", refValue("inviteKey"))), notNull(scalar("ID")))
        )
private val AddAppToChatSelector = obj(
            field("addAppToChat","addAppToChat", arguments(fieldValue("appId", refValue("appId")), fieldValue("chatId", refValue("chatId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("AppChat", AppChatSelector)
                )))
        )
private val AddMessageCommentSelector = obj(
            field("betaAddMessageComment","addMessageComment", arguments(fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("mentions", refValue("mentions")), fieldValue("message", refValue("message")), fieldValue("messageId", refValue("messageId")), fieldValue("replyComment", refValue("replyComment")), fieldValue("spans", refValue("spans"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                )))
        )
private val BadgeCreateSelector = obj(
            field("badgeCreate","badgeCreate", arguments(fieldValue("name", refValue("name"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("User", obj(
                        field("badges","badges", notNull(list(notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            ))))),
                        field("id","id", notNull(scalar("ID"))),
                        field("primaryBadge","primaryBadge", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            ))
                    ))
                )))
        )
private val BadgeCreateToRoomSelector = obj(
            field("badgeCreateToRoom","badgeCreateToRoom", arguments(fieldValue("name", refValue("name")), fieldValue("roomId", refValue("roomId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                )))
        )
private val BadgeDeleteSelector = obj(
            field("badgeDelete","badgeDelete", arguments(fieldValue("badgeId", refValue("badgeId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("User", obj(
                        field("badges","badges", notNull(list(notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            ))))),
                        field("id","id", notNull(scalar("ID"))),
                        field("primaryBadge","primaryBadge", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            ))
                    ))
                )))
        )
private val BadgeSetPrimarySelector = obj(
            field("badgeSetPrimary","badgeSetPrimary", arguments(fieldValue("badgeId", refValue("badgeId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("User", obj(
                        field("badges","badges", notNull(list(notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            ))))),
                        field("id","id", notNull(scalar("ID"))),
                        field("primaryBadge","primaryBadge", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            ))
                    ))
                )))
        )
private val BadgeSetToRoomSelector = obj(
            field("badgeSetToRoom","badgeSetToRoom", arguments(fieldValue("badgeId", refValue("badgeId")), fieldValue("roomId", refValue("roomId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                )))
        )
private val BadgeUnsetPrimarySelector = obj(
            field("badgeUnsetPrimary","badgeUnsetPrimary", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("User", obj(
                        field("badges","badges", notNull(list(notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            ))))),
                        field("id","id", notNull(scalar("ID"))),
                        field("primaryBadge","primaryBadge", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            ))
                    ))
                )))
        )
private val BadgeUnsetToRoomSelector = obj(
            field("badgeUnsetToRoom","badgeUnsetToRoom", arguments(fieldValue("roomId", refValue("roomId"))), notNull(scalar("Boolean")))
        )
private val CancelTypingSelector = obj(
            field("typingCancel","typingCancel", arguments(fieldValue("conversationId", refValue("conversationId"))), notNull(scalar("String")))
        )
private val CommentSetReactionSelector = obj(
            field("commentReactionAdd","commentReactionAdd", arguments(fieldValue("commentId", refValue("commentId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
private val CommentUnsetReactionSelector = obj(
            field("commentReactionRemove","commentReactionRemove", arguments(fieldValue("commentId", refValue("commentId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
private val ConferenceAnswerSelector = obj(
            field("peerConnectionAnswer","peerConnectionAnswer", arguments(fieldValue("answer", refValue("answer")), fieldValue("id", refValue("id")), fieldValue("ownPeerId", refValue("ownPeerId")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
private val ConferenceCandidateSelector = obj(
            field("peerConnectionCandidate","peerConnectionCandidate", arguments(fieldValue("candidate", refValue("candidate")), fieldValue("id", refValue("id")), fieldValue("ownPeerId", refValue("ownPeerId")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
private val ConferenceJoinSelector = obj(
            field("conferenceJoin","conferenceJoin", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("conference","conference", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("Conference", ConferenceShortSelector)
                        ))),
                    field("peerId","peerId", notNull(scalar("ID")))
                )))
        )
private val ConferenceKeepAliveSelector = obj(
            field("conferenceKeepAlive","conferenceKeepAlive", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
private val ConferenceLeaveSelector = obj(
            field("conferenceLeave","conferenceLeave", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
private val ConferenceOfferSelector = obj(
            field("peerConnectionOffer","peerConnectionOffer", arguments(fieldValue("id", refValue("id")), fieldValue("offer", refValue("offer")), fieldValue("ownPeerId", refValue("ownPeerId")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
private val CreateAppSelector = obj(
            field("createApp","createApp", arguments(fieldValue("about", refValue("about")), fieldValue("name", refValue("name")), fieldValue("photoRef", refValue("photoRef")), fieldValue("shortname", refValue("shortname"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                )))
        )
private val CreateOrganizationSelector = obj(
            field("createOrganization","organization", arguments(fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("name","name", notNull(scalar("String")))
                )))
        )
private val CreateUserProfileAndOrganizationSelector = obj(
            field("alphaCreateUserProfileAndOrganization","alphaCreateUserProfileAndOrganization", arguments(fieldValue("organization", refValue("organization")), fieldValue("user", refValue("user"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("organization","organization", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String")))
                        )),
                    field("user","user", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserFullSelector)
                        ))
                )))
        )
private val DebugMailsSelector = obj(
            field("debugSendEmail","debugSendEmail", arguments(fieldValue("type", refValue("type"))), scalar("Boolean"))
        )
private val DeleteCommentSelector = obj(
            field("deleteComment","deleteComment", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
private val DeleteNotificationSelector = obj(
            field("deleteNotification","deleteNotification", arguments(fieldValue("notificationId", refValue("notificationId"))), notNull(scalar("Boolean")))
        )
private val DeleteOrganizationSelector = obj(
            field("deleteOrganization","deleteOrganization", arguments(fieldValue("id", refValue("organizationId"))), notNull(scalar("Boolean")))
        )
private val DeleteUserSelector = obj(
            field("superDeleteUser","superDeleteUser", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
private val EditCommentSelector = obj(
            field("editComment","editComment", arguments(fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("id", refValue("id")), fieldValue("mentions", refValue("mentions")), fieldValue("message", refValue("message")), fieldValue("spans", refValue("spans"))), notNull(scalar("Boolean")))
        )
private val EditMessageSelector = obj(
            field("editMessage","editMessage", arguments(fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("mentions", refValue("mentions")), fieldValue("message", refValue("message")), fieldValue("messageId", refValue("messageId")), fieldValue("replyMessages", refValue("replyMessages")), fieldValue("spans", refValue("spans"))), notNull(scalar("Boolean")))
        )
private val EditPostMessageSelector = obj(
            field("alphaEditPostMessage","editPostMessage", arguments(fieldValue("attachments", refValue("attachments")), fieldValue("messageId", refValue("messageId")), fieldValue("postType", refValue("postType")), fieldValue("text", refValue("text")), fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("seq","seq", notNull(scalar("Int")))
                )))
        )
private val FeatureFlagAddSelector = obj(
            field("featureFlagAdd","featureFlagAdd", arguments(fieldValue("key", refValue("key")), fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("title","title", notNull(scalar("String")))
                )))
        )
private val FeatureFlagDisableSelector = obj(
            field("superAccountFeatureRemove","superAccountFeatureRemove", arguments(fieldValue("featureId", refValue("featureId")), fieldValue("id", refValue("accountId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("features","features", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("key","key", notNull(scalar("String"))),
                            field("title","title", notNull(scalar("String")))
                        ))))),
                    field("id","id", notNull(scalar("ID")))
                )))
        )
private val FeatureFlagEnableSelector = obj(
            field("superAccountFeatureAdd","superAccountFeatureAdd", arguments(fieldValue("featureId", refValue("featureId")), fieldValue("id", refValue("accountId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("features","features", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("key","key", notNull(scalar("String"))),
                            field("title","title", notNull(scalar("String")))
                        ))))),
                    field("id","id", notNull(scalar("ID")))
                )))
        )
private val FeedPostSelector = obj(
            field("alphaCreateFeedPost","alphaCreateFeedPost", arguments(fieldValue("message", refValue("message"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                )))
        )
private val MarkSequenceReadSelector = obj(
            field("alphaGlobalRead","alphaGlobalRead", arguments(fieldValue("toSeq", refValue("seq"))), notNull(scalar("String")))
        )
private val MediaAnswerSelector = obj(
            field("mediaStreamAnswer","mediaStreamAnswer", arguments(fieldValue("answer", refValue("answer")), fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("streams","streams", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("ice","ice", notNull(list(notNull(scalar("String"))))),
                            field("id","id", notNull(scalar("ID"))),
                            field("sdp","sdp", scalar("String")),
                            field("state","state", notNull(scalar("String")))
                        )))))
                )))
        )
private val MediaCandidateSelector = obj(
            field("mediaStreamCandidate","mediaStreamCandidate", arguments(fieldValue("candidate", refValue("candidate")), fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("streams","streams", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("ice","ice", notNull(list(notNull(scalar("String"))))),
                            field("id","id", notNull(scalar("ID"))),
                            field("sdp","sdp", scalar("String")),
                            field("state","state", notNull(scalar("String")))
                        )))))
                )))
        )
private val MediaFailedSelector = obj(
            field("mediaStreamFailed","mediaStreamFailed", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("streams","streams", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("ice","ice", notNull(list(notNull(scalar("String"))))),
                            field("id","id", notNull(scalar("ID"))),
                            field("sdp","sdp", scalar("String")),
                            field("state","state", notNull(scalar("String")))
                        )))))
                )))
        )
private val MediaNegotiationNeededSelector = obj(
            field("mediaStreamNegotiationNeeded","mediaStreamNegotiationNeeded", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("streams","streams", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("ice","ice", notNull(list(notNull(scalar("String"))))),
                            field("id","id", notNull(scalar("ID"))),
                            field("sdp","sdp", scalar("String")),
                            field("state","state", notNull(scalar("String")))
                        )))))
                )))
        )
private val MediaOfferSelector = obj(
            field("mediaStreamOffer","mediaStreamOffer", arguments(fieldValue("id", refValue("id")), fieldValue("offer", refValue("offer")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("streams","streams", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("ice","ice", notNull(list(notNull(scalar("String"))))),
                            field("id","id", notNull(scalar("ID"))),
                            field("sdp","sdp", scalar("String")),
                            field("state","state", notNull(scalar("String")))
                        )))))
                )))
        )
private val MessageSetReactionSelector = obj(
            field("betaReactionSet","betaReactionSet", arguments(fieldValue("mid", refValue("messageId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
private val MessageUnsetReactionSelector = obj(
            field("betaReactionRemove","betaReactionRemove", arguments(fieldValue("mid", refValue("messageId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
private val MyNotificationCenterMarkSeqReadSelector = obj(
            field("notificationCenterMarkSeqRead","notificationCenterMarkSeqRead", arguments(fieldValue("toSeq", refValue("seq"))), notNull(scalar("Boolean")))
        )
private val OrganizationActivateByInviteSelector = obj(
            field("joinAppInvite","joinAppInvite", arguments(fieldValue("key", refValue("inviteKey"))), notNull(scalar("ID")))
        )
private val OrganizationAddMemberSelector = obj(
            field("betaOrganizationMemberAdd","betaOrganizationMemberAdd", arguments(fieldValue("organizationId", refValue("organizationId")), fieldValue("userIds", refValue("userIds"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationFullSelector)
                )))
        )
private val OrganizationAlterPublishedSelector = obj(
            field("alphaAlterPublished","alphaAlterPublished", arguments(fieldValue("id", refValue("organizationId")), fieldValue("published", refValue("published"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationSearchSelector)
                )))
        )
private val OrganizationChangeMemberRoleSelector = obj(
            field("alphaOrganizationChangeMemberRole","alphaOrganizationChangeMemberRole", arguments(fieldValue("memberId", refValue("memberId")), fieldValue("newRole", refValue("newRole")), fieldValue("organizationId", refValue("organizationId"))), notNull(scalar("String")))
        )
private val OrganizationCreatePublicInviteSelector = obj(
            field("alphaOrganizationRefreshInviteLink","alphaOrganizationRefreshInviteLink", arguments(fieldValue("expirationDays", refValue("expirationDays")), fieldValue("organizationId", refValue("organizationId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("ttl","ttl", scalar("String"))
                )))
        )
private val OrganizationInviteMembersSelector = obj(
            field("alphaOrganizationInviteMembers","alphaOrganizationInviteMembers", arguments(fieldValue("inviteRequests", refValue("inviteRequests")), fieldValue("organizationId", refValue("organizationId"))), notNull(scalar("String")))
        )
private val OrganizationMemberRemoveSelector = obj(
            field("betaOrganizationMemberRemove","betaOrganizationMemberRemove", arguments(fieldValue("organizationId", refValue("organizationId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                )))
        )
private val OrganizationRemoveMemberSelector = obj(
            field("alphaOrganizationRemoveMember","alphaOrganizationRemoveMember", arguments(fieldValue("memberId", refValue("memberId")), fieldValue("organizationId", refValue("organizationId"))), notNull(scalar("String")))
        )
private val PersistEventsSelector = obj(
            field("track","track", arguments(fieldValue("did", refValue("did")), fieldValue("events", refValue("events")), fieldValue("isProd", refValue("isProd")), fieldValue("platform", refValue("platform"))), notNull(scalar("String")))
        )
private val PinMessageSelector = obj(
            field("gammaPinMessage","pinMessage", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("messageId", refValue("messageId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))
        )
private val ProfileCreateSelector = obj(
            field("createProfile","createProfile", arguments(fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("about","about", scalar("String")),
                    field("email","email", scalar("String")),
                    field("firstName","firstName", scalar("String")),
                    field("id","id", notNull(scalar("ID"))),
                    field("lastName","lastName", scalar("String")),
                    field("location","location", scalar("String")),
                    field("phone","phone", scalar("String")),
                    field("photoRef","photoRef", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("crop","crop", obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("h","h", notNull(scalar("Int"))),
                                    field("w","w", notNull(scalar("Int"))),
                                    field("x","x", notNull(scalar("Int"))),
                                    field("y","y", notNull(scalar("Int")))
                                )),
                            field("uuid","uuid", notNull(scalar("String")))
                        )),
                    field("website","website", scalar("String"))
                )))
        )
private val ProfileUpdateSelector = obj(
            field("updateProfile","updateProfile", arguments(fieldValue("input", refValue("input")), fieldValue("uid", refValue("uid"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("about","about", scalar("String")),
                    field("alphaInvitedBy","invitedBy", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String")))
                        )),
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
                    field("photoRef","photoRef", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("crop","crop", obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("h","h", notNull(scalar("Int"))),
                                    field("w","w", notNull(scalar("Int"))),
                                    field("x","x", notNull(scalar("Int"))),
                                    field("y","y", notNull(scalar("Int")))
                                )),
                            field("uuid","uuid", notNull(scalar("String")))
                        )),
                    field("website","website", scalar("String"))
                )))
        )
private val ReadNotificationSelector = obj(
            field("readNotification","readNotification", arguments(fieldValue("notificationId", refValue("notificationId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("unread","unread", notNull(scalar("Int")))
                )))
        )
private val RefreshAppTokenSelector = obj(
            field("refreshAppToken","refreshAppToken", arguments(fieldValue("appId", refValue("appId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                )))
        )
private val RegisterPushSelector = obj(
            field("registerPush","registerPush", arguments(fieldValue("endpoint", refValue("endpoint")), fieldValue("type", refValue("type"))), notNull(scalar("String")))
        )
private val RegisterWebPushSelector = obj(
            field("registerWebPush","registerWebPush", arguments(fieldValue("endpoint", refValue("endpoint"))), notNull(scalar("String")))
        )
private val ReplyMessageSelector = obj(
            field("sendMessage","replyMessage", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("mentions", refValue("mentions")), fieldValue("message", refValue("message")), fieldValue("repeatKey", refValue("repeatKey")), fieldValue("replyMessages", refValue("replyMessages")), fieldValue("spans", refValue("spans"))), notNull(scalar("Boolean")))
        )
private val ReportOnlineSelector = obj(
            field("presenceReportOnline","presenceReportOnline", arguments(fieldValue("active", refValue("active")), fieldValue("platform", refValue("platform")), fieldValue("timeout", intValue(5000))), notNull(scalar("String")))
        )
private val RespondPostMessageSelector = obj(
            field("alphaRespondPostMessage","alphaRespondPostMessage", arguments(fieldValue("buttonId", refValue("buttonId")), fieldValue("messageId", refValue("messageId"))), scalar("Boolean")),
            field("betaReactionSet","betaReactionSet", arguments(fieldValue("mid", refValue("messageId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
private val RoomAddMemberSelector = obj(
            field("betaRoomInvite","betaRoomInvite", arguments(fieldValue("invites", listValue(objectValue(fieldValue("userId", refValue("userId")),fieldValue("role", stringValue("MEMBER"))))), fieldValue("roomId", refValue("roomId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                )))
        )
private val RoomAddMembersSelector = obj(
            field("betaRoomInvite","betaRoomInvite", arguments(fieldValue("invites", refValue("invites")), fieldValue("roomId", refValue("roomId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                )))
        )
private val RoomAlterFeaturedSelector = obj(
            field("betaRoomAlterFeatured","betaRoomAlterFeatured", arguments(fieldValue("featured", refValue("featured")), fieldValue("roomId", refValue("roomId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("featured","featured", notNull(scalar("Boolean"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("listed","listed", notNull(scalar("Boolean")))
                )))
        )
private val RoomAlterHiddenSelector = obj(
            field("betaRoomAlterListed","betaRoomAlterListed", arguments(fieldValue("listed", refValue("listed")), fieldValue("roomId", refValue("roomId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("featured","featured", notNull(scalar("Boolean"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("listed","listed", notNull(scalar("Boolean")))
                )))
        )
private val RoomChangeRoleSelector = obj(
            field("betaRoomChangeRole","betaRoomChangeRole", arguments(fieldValue("newRole", refValue("newRole")), fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                )))
        )
private val RoomCreateSelector = obj(
            field("betaRoomCreate","room", arguments(fieldValue("channel", refValue("channel")), fieldValue("description", refValue("description")), fieldValue("kind", refValue("kind")), fieldValue("members", refValue("members")), fieldValue("message", refValue("message")), fieldValue("organizationId", refValue("organizationId")), fieldValue("photoRef", refValue("photoRef")), fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                )))
        )
private val RoomCreateIntroSelector = obj(
            field("betaIntroSend","intro", arguments(fieldValue("about", refValue("about")), fieldValue("file", refValue("file")), fieldValue("message", refValue("about")), fieldValue("room", refValue("roomId")), fieldValue("uid", refValue("uid"))), notNull(scalar("Boolean")))
        )
private val RoomDeclineJoinReuestSelector = obj(
            field("betaRoomDeclineJoinRequest","betaRoomDeclineJoinRequest", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                )))
        )
private val RoomDeleteMessageSelector = obj(
            field("betaMessageDelete","betaMessageDelete", arguments(fieldValue("mid", refValue("messageId"))), notNull(scalar("Boolean")))
        )
private val RoomDeleteMessagesSelector = obj(
            field("betaMessageDelete","betaMessageDelete", arguments(fieldValue("mids", refValue("mids"))), notNull(scalar("Boolean")))
        )
private val RoomDeleteUrlAugmentationSelector = obj(
            field("betaMessageDeleteAugmentation","betaMessageDeleteAugmentation", arguments(fieldValue("mid", refValue("messageId"))), notNull(scalar("Boolean")))
        )
private val RoomEditIntroSelector = obj(
            field("betaIntroEdit","intro", arguments(fieldValue("about", refValue("about")), fieldValue("file", refValue("file")), fieldValue("message", refValue("about")), fieldValue("mid", refValue("messageId")), fieldValue("uid", refValue("uid"))), notNull(scalar("Boolean")))
        )
private val RoomJoinSelector = obj(
            field("betaRoomJoin","join", arguments(fieldValue("roomId", refValue("roomId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                )))
        )
private val RoomJoinInviteLinkSelector = obj(
            field("betaRoomInviteLinkJoin","join", arguments(fieldValue("invite", refValue("invite"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                )))
        )
private val RoomKickSelector = obj(
            field("betaRoomKick","betaRoomKick", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                )))
        )
private val RoomLeaveSelector = obj(
            field("betaRoomLeave","betaRoomLeave", arguments(fieldValue("roomId", refValue("roomId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                )))
        )
private val RoomReadSelector = obj(
            field("roomRead","roomRead", arguments(fieldValue("id", refValue("id")), fieldValue("mid", refValue("mid"))), notNull(scalar("Boolean")))
        )
private val RoomRenewInviteLinkSelector = obj(
            field("betaRoomInviteLinkRenew","link", arguments(fieldValue("roomId", refValue("roomId"))), notNull(scalar("String")))
        )
private val RoomSendEmailInviteSelector = obj(
            field("betaRoomInviteLinkSendEmail","betaRoomInviteLinkSendEmail", arguments(fieldValue("inviteRequests", refValue("inviteRequests")), fieldValue("roomId", refValue("roomId"))), notNull(scalar("String")))
        )
private val RoomSettingsUpdateSelector = obj(
            field("betaRoomUpdateUserNotificationSettings","betaRoomUpdateUserNotificationSettings", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("settings", refValue("settings"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("mute","mute", scalar("Boolean"))
                )))
        )
private val RoomUpdateSelector = obj(
            field("betaRoomUpdate","betaRoomUpdate", arguments(fieldValue("input", refValue("input")), fieldValue("roomId", refValue("roomId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(
                        field("id","id", notNull(scalar("ID")))
                    )),
                    inline("SharedRoom", obj(
                        field("description","description", scalar("String")),
                        field("id","id", notNull(scalar("ID"))),
                        field("photo","photo", notNull(scalar("String"))),
                        field("socialImage","socialImage", scalar("String")),
                        field("title","title", notNull(scalar("String")))
                    ))
                )))
        )
private val RoomsInviteUserSelector = obj(
            field("betaRoomsInviteUser","rooms", arguments(fieldValue("roomIds", refValue("roomIds")), fieldValue("userId", refValue("userId"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))))
        )
private val RoomsJoinSelector = obj(
            field("betaRoomsJoin","join", arguments(fieldValue("roomsIds", refValue("roomsIds"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))))
        )
private val SaveDraftMessageSelector = obj(
            field("conversationDraftUpdate","conversationDraftUpdate", arguments(fieldValue("conversationId", refValue("conversationId")), fieldValue("message", refValue("message"))), notNull(scalar("String")))
        )
private val SendMessageSelector = obj(
            field("sendMessage","sentMessage", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("mentions", refValue("mentions")), fieldValue("message", refValue("message")), fieldValue("repeatKey", refValue("repeatKey")), fieldValue("replyMessages", refValue("replyMessages")), fieldValue("spans", refValue("spans"))), notNull(scalar("Boolean")))
        )
private val SendPostMessageSelector = obj(
            field("alphaSendPostMessage","sendPostMessage", arguments(fieldValue("attachments", refValue("attachments")), fieldValue("conversationId", refValue("conversationId")), fieldValue("postType", refValue("postType")), fieldValue("text", refValue("text")), fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("seq","seq", notNull(scalar("Int")))
                )))
        )
private val SetOrgShortnameSelector = obj(
            field("alphaSetOrgShortName","alphaSetOrgShortName", arguments(fieldValue("id", refValue("organizationId")), fieldValue("shortname", refValue("shortname"))), scalar("String"))
        )
private val SetTypingSelector = obj(
            field("typingSend","typingSend", arguments(fieldValue("conversationId", refValue("conversationId")), fieldValue("type", stringValue("TEXT"))), notNull(scalar("String")))
        )
private val SetUserShortnameSelector = obj(
            field("alphaSetUserShortName","alphaSetUserShortName", arguments(fieldValue("shortname", refValue("shortname"))), scalar("String"))
        )
private val SettingsUpdateSelector = obj(
            field("updateSettings","updateSettings", arguments(fieldValue("settings", refValue("input"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Settings", SettingsFullSelector)
                )))
        )
private val SubscribeMessageCommentsSelector = obj(
            field("subscribeMessageComments","subscribeMessageComments", arguments(fieldValue("messageId", refValue("messageId")), fieldValue("type", refValue("type"))), notNull(scalar("Boolean")))
        )
private val SuperAccountActivateSelector = obj(
            field("superAccountActivate","superAccountActivate", arguments(fieldValue("id", refValue("accountId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("state","state", notNull(scalar("String")))
                )))
        )
private val SuperAccountAddSelector = obj(
            field("superAccountAdd","superAccountAdd", arguments(fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                )))
        )
private val SuperAccountMemberAddSelector = obj(
            field("superAccountMemberAdd","superAccountMemberAdd", arguments(fieldValue("id", refValue("accountId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("members","members", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))))
                )))
        )
private val SuperAccountMemberRemoveSelector = obj(
            field("superAccountMemberRemove","superAccountMemberRemove", arguments(fieldValue("id", refValue("accountId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("members","members", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))))
                )))
        )
private val SuperAccountPendSelector = obj(
            field("superAccountPend","superAccountPend", arguments(fieldValue("id", refValue("accountId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("state","state", notNull(scalar("String")))
                )))
        )
private val SuperAccountRenameSelector = obj(
            field("superAccountRename","superAccountRename", arguments(fieldValue("id", refValue("accountId")), fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("title","title", notNull(scalar("String")))
                )))
        )
private val SuperAccountSuspendSelector = obj(
            field("superAccountSuspend","superAccountSuspend", arguments(fieldValue("id", refValue("accountId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("state","state", notNull(scalar("String")))
                )))
        )
private val SuperAdminAddSelector = obj(
            field("superAdminAdd","superAdminAdd", arguments(fieldValue("role", refValue("role")), fieldValue("userId", refValue("userId"))), notNull(scalar("String")))
        )
private val SuperAdminRemoveSelector = obj(
            field("superAdminRemove","superAdminRemove", arguments(fieldValue("userId", refValue("userId"))), notNull(scalar("String")))
        )
private val SuperBadgeCreateSelector = obj(
            field("superBadgeCreate","superBadgeCreate", arguments(fieldValue("name", refValue("name")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("User", obj(
                        field("badges","badges", notNull(list(notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            ))))),
                        field("id","id", notNull(scalar("ID"))),
                        field("primaryBadge","primaryBadge", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            ))
                    ))
                )))
        )
private val SuperBadgeCreateToRoomSelector = obj(
            field("superBadgeCreateToRoom","superBadgeCreateToRoom", arguments(fieldValue("name", refValue("name")), fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                )))
        )
private val SuperBadgeDeleteSelector = obj(
            field("superBadgeDelete","superBadgeDelete", arguments(fieldValue("badgeId", refValue("badgeId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("User", obj(
                        field("badges","badges", notNull(list(notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            ))))),
                        field("id","id", notNull(scalar("ID"))),
                        field("primaryBadge","primaryBadge", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            ))
                    ))
                )))
        )
private val SuperBadgeSetToRoomSelector = obj(
            field("superBadgeSetToRoom","superBadgeSetToRoom", arguments(fieldValue("badgeId", refValue("badgeId")), fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                )))
        )
private val SuperBadgeUnsetToRoomSelector = obj(
            field("superBadgeUnsetToRoom","superBadgeUnsetToRoom", arguments(fieldValue("badgeId", refValue("badgeId")), fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId"))), notNull(scalar("Boolean")))
        )
private val SuperBadgeUnverifySelector = obj(
            field("superBadgeUnverify","superBadgeUnverify", arguments(fieldValue("badgeId", refValue("badgeId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("User", obj(
                        field("badges","badges", notNull(list(notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            ))))),
                        field("id","id", notNull(scalar("ID"))),
                        field("primaryBadge","primaryBadge", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            ))
                    ))
                )))
        )
private val SuperBadgeVerifySelector = obj(
            field("superBadgeVerify","superBadgeVerify", arguments(fieldValue("badgeId", refValue("badgeId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("User", obj(
                        field("badges","badges", notNull(list(notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            ))))),
                        field("id","id", notNull(scalar("ID"))),
                        field("primaryBadge","primaryBadge", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            ))
                    ))
                )))
        )
private val SwitchReactionSelector = obj(
            field("betaReactionRemove","betaReactionRemove", arguments(fieldValue("mid", refValue("messageId")), fieldValue("reaction", refValue("from"))), notNull(scalar("Boolean"))),
            field("betaReactionSet","betaReactionSet", arguments(fieldValue("mid", refValue("messageId")), fieldValue("reaction", refValue("to"))), notNull(scalar("Boolean")))
        )
private val UnSubscribeMessageCommentsSelector = obj(
            field("unSubscribeMessageComments","unSubscribeMessageComments", arguments(fieldValue("messageId", refValue("messageId"))), notNull(scalar("Boolean")))
        )
private val UnpinMessageSelector = obj(
            field("gammaUnpinMessage","unpinMessage", arguments(fieldValue("chatId", refValue("chatId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))
        )
private val UpdateAppSelector = obj(
            field("updateAppProfile","updateAppProfile", arguments(fieldValue("appId", refValue("appId")), fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                )))
        )
private val UpdateOrganizationSelector = obj(
            field("updateOrganizationProfile","updateOrganizationProfile", arguments(fieldValue("id", refValue("organizationId")), fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("OrganizationProfile", OrganizationProfileFullSelector)
                )))
        )
private val UpdateWelcomeMessageSelector = obj(
            field("updateWelcomeMessage","updateWelcomeMessage", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("welcomeMessageIsOn", refValue("welcomeMessageIsOn")), fieldValue("welcomeMessageSender", refValue("welcomeMessageSender")), fieldValue("welcomeMessageText", refValue("welcomeMessageText"))), notNull(scalar("Boolean")))
        )
private val UserStorageSetSelector = obj(
            field("userStorageSet","userStorageSet", arguments(fieldValue("data", refValue("data")), fieldValue("namespace", refValue("namespace"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("value","value", scalar("String"))
                )))))
        )
private val ChatOnlinesCountWatchSelector = obj(
            field("chatOnlinesCount","chatOnlinesCount", arguments(fieldValue("chatId", refValue("chatId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("onlineMembers","onlineMembers", notNull(scalar("Int")))
                )))
        )
private val ChatWatchSelector = obj(
            field("chatUpdates","event", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("fromState", refValue("state"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("ChatUpdateSingle", obj(
                        field("seq","seq", notNull(scalar("Int"))),
                        field("state","state", notNull(scalar("String"))),
                        field("update","update", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("ChatUpdate", ChatUpdateFragmentSelector)
                            )))
                    )),
                    inline("ChatUpdateBatch", obj(
                        field("fromSeq","fromSeq", notNull(scalar("Int"))),
                        field("seq","seq", notNull(scalar("Int"))),
                        field("state","state", notNull(scalar("String"))),
                        field("updates","updates", notNull(list(notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("ChatUpdate", ChatUpdateFragmentSelector)
                            )))))
                    ))
                )))
        )
private val CommentWatchSelector = obj(
            field("commentUpdates","event", arguments(fieldValue("fromState", refValue("fromState")), fieldValue("peerId", refValue("peerId"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("CommentUpdateSingle", obj(
                        field("seq","seq", notNull(scalar("Int"))),
                        field("state","state", notNull(scalar("String"))),
                        field("update","update", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("CommentUpdate", CommentUpdateFragmentSelector)
                            )))
                    )),
                    inline("CommentUpdateBatch", obj(
                        field("fromSeq","fromSeq", notNull(scalar("Int"))),
                        field("seq","seq", notNull(scalar("Int"))),
                        field("state","state", notNull(scalar("String"))),
                        field("updates","updates", notNull(list(notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("CommentUpdate", CommentUpdateFragmentSelector)
                            )))))
                    ))
                ))
        )
private val ConferenceMediaWatchSelector = obj(
            field("alphaConferenceMediaWatch","media", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("streams","streams", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("ice","ice", notNull(list(notNull(scalar("String"))))),
                            field("id","id", notNull(scalar("ID"))),
                            field("sdp","sdp", scalar("String")),
                            field("state","state", notNull(scalar("String")))
                        )))))
                )))
        )
private val ConferenceWatchSelector = obj(
            field("alphaConferenceWatch","alphaConferenceWatch", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceFullSelector)
                )))
        )
private val DebugEventsWatchSelector = obj(
            field("debugEvents","debugEvents", arguments(fieldValue("eventsCount", refValue("eventsCount")), fieldValue("fromState", refValue("fromState")), fieldValue("randomDelays", refValue("randomDelays")), fieldValue("seed", refValue("seed"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("key","key", notNull(scalar("String"))),
                    field("seq","seq", notNull(scalar("Int")))
                )))
        )
private val DialogsWatchSelector = obj(
            field("dialogsUpdates","event", arguments(fieldValue("fromState", refValue("state"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("DialogUpdateSingle", obj(
                        field("seq","seq", notNull(scalar("Int"))),
                        field("state","state", notNull(scalar("String"))),
                        field("update","update", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("DialogUpdate", DialogUpdateFragmentSelector)
                            )))
                    )),
                    inline("DialogUpdateBatch", obj(
                        field("fromSeq","fromSeq", notNull(scalar("Int"))),
                        field("seq","seq", notNull(scalar("Int"))),
                        field("state","state", notNull(scalar("String"))),
                        field("updates","updates", notNull(list(notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("DialogUpdate", DialogUpdateFragmentSelector)
                            )))))
                    ))
                )))
        )
private val MyNotificationsCenterSelector = obj(
            field("notificationCenterUpdates","event", arguments(fieldValue("fromState", refValue("state"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("NotificationCenterUpdateSingle", obj(
                        field("seq","seq", notNull(scalar("Int"))),
                        field("state","state", notNull(scalar("String"))),
                        field("update","update", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("NotificationCenterUpdate", NotificationCenterUpdateFragmentSelector)
                            )))
                    )),
                    inline("NotificationCenterUpdateBatch", obj(
                        field("fromSeq","fromSeq", notNull(scalar("Int"))),
                        field("seq","seq", notNull(scalar("Int"))),
                        field("state","state", notNull(scalar("String"))),
                        field("updates","updates", notNull(list(notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("NotificationCenterUpdate", NotificationCenterUpdateFragmentSelector)
                            )))))
                    ))
                ))
        )
private val OnlineWatchSelector = obj(
            field("alphaSubscribeOnline","alphaSubscribeOnline", arguments(fieldValue("users", refValue("users"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("timeout","timeout", notNull(scalar("Int"))),
                    field("user","user", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("lastSeen","lastSeen", scalar("String")),
                            field("online","online", notNull(scalar("Boolean")))
                        )))
                )))
        )
private val SettingsWatchSelector = obj(
            field("watchSettings","watchSettings", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Settings", SettingsFullSelector)
                )))
        )
private val TypingsWatchSelector = obj(
            field("typings","typings", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("cancel","cancel", notNull(scalar("Boolean"))),
                    field("chat","conversation", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            inline("PrivateRoom", obj(
                                field("id","id", notNull(scalar("ID")))
                            )),
                            inline("SharedRoom", obj(
                                field("id","id", notNull(scalar("ID")))
                            ))
                        ))),
                    field("user","user", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String"))),
                            field("photo","photo", scalar("String"))
                        )))
                )))
        )

object Operations {
    val Account = object: OperationDefinition {
        override val name = "Account"
        override val kind = OperationKind.QUERY
        override val body = "query Account{me:me{__typename ...UserShort}myPermissions{__typename roles}sessionState:sessionState{__typename ...SessionStateFull}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment SessionStateFull on SessionState{__typename isAccountActivated isAccountExists isAccountPicked isBlocked isCompleted isLoggedIn isProfileCreated}"
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
        override val body = "query AccountAppInviteInfo(\$inviteKey:String!){invite:alphaInviteInfo(key:\$inviteKey){__typename creator{__typename ...UserShort}id}appInvite:appInviteInfo(key:\$inviteKey){__typename inviter{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = AccountAppInviteInfoSelector
    }
    val AccountInviteInfo = object: OperationDefinition {
        override val name = "AccountInviteInfo"
        override val kind = OperationKind.QUERY
        override val body = "query AccountInviteInfo(\$inviteKey:String!){invite:alphaInviteInfo(key:\$inviteKey){__typename creator{__typename ...UserShort}forEmail forName id joined key membersCount orgId organization{__typename about isCommunity:alphaIsCommunity id}photo title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
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
        override val body = "query AccountSettings{me:me{__typename ...UserShort}organizations:myOrganizations{__typename ...OrganizationShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = AccountSettingsSelector
    }
    val AvailableRooms = object: OperationDefinition {
        override val name = "AvailableRooms"
        override val kind = OperationKind.QUERY
        override val body = "query AvailableRooms{communities:alphaComunityPrefixSearch(first:3){__typename edges{__typename node{__typename ...CommunitySearch}}}isDiscoverDone:betaIsDiscoverDone suggestedRooms:betaSuggestedRooms{__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}availableChats:betaUserAvailableRooms(isChannel:false,limit:3){__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}availableChannels:betaUserAvailableRooms(isChannel:true,limit:3){__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}}fragment CommunitySearch on Organization{__typename about featured:alphaFeatured betaPublicRooms{__typename id}id isMine membersCount name photo status superAccountId}"
        override val selector = AvailableRoomsSelector
    }
    val ChatHistory = object: OperationDefinition {
        override val name = "ChatHistory"
        override val kind = OperationKind.QUERY
        override val body = "query ChatHistory(\$before:ID,\$chatId:ID!,\$first:Int!){state:conversationState(id:\$chatId){__typename state}messages(before:\$before,chatId:\$chatId,first:\$first){__typename ...FullMessage}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = ChatHistorySelector
    }
    val ChatInit = object: OperationDefinition {
        override val name = "ChatInit"
        override val kind = OperationKind.QUERY
        override val body = "query ChatInit(\$before:ID,\$chatId:ID!,\$first:Int!){state:conversationState(id:\$chatId){__typename state}lastReadedMessage(chatId:\$chatId){__typename id}messages(before:\$before,chatId:\$chatId,first:\$first){__typename ...FullMessage}room(id:\$chatId){__typename ...RoomShort}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment RoomShort on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}"
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
        override val body = "query Conference(\$id:ID!){conference(id:\$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename iceServers{__typename credential urls username}id peers{__typename connection{__typename ice sdp state}id user{__typename ...UserShort}}startTime}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
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
        override val body = "query Dialogs(\$after:String){counter:alphaNotificationCounter{__typename id unreadCount}dialogs(after:\$after,first:20){__typename cursor items{__typename topMessage:alphaTopMessage{__typename ...DaialogListMessage}cid fid haveMention id isChannel isMuted kind photo title unreadCount}}state:dialogsState{__typename state}}fragment DaialogListMessage on ModernMessage{__typename date fallback id message sender{__typename firstName id name}senderBadge{__typename ...UserBadge}... on GeneralMessage{attachments{__typename fallback id ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat isImage}id}}id quotedMessages{__typename id}}}fragment UserBadge on UserBadge{__typename id name verified}"
        override val selector = DialogsSelector
    }
    val DiscoverIsDone = object: OperationDefinition {
        override val name = "DiscoverIsDone"
        override val kind = OperationKind.QUERY
        override val body = "query DiscoverIsDone{betaIsDiscoverDone}"
        override val selector = DiscoverIsDoneSelector
    }
    val DiscoverNextPage = object: OperationDefinition {
        override val name = "DiscoverNextPage"
        override val kind = OperationKind.QUERY
        override val body = "query DiscoverNextPage(\$excudedGroupsIds:[String!]!,\$selectedTagsIds:[String!]!){betaNextDiscoverPage(excudedGroupsIds:\$excudedGroupsIds,selectedTagsIds:\$selectedTagsIds){__typename chats{__typename ...RoomShort}tagGroup{__typename id subtitle tags{__typename id title}title}}}fragment RoomShort on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = DiscoverNextPageSelector
    }
    val ExploreCommunity = object: OperationDefinition {
        override val name = "ExploreCommunity"
        override val kind = OperationKind.QUERY
        override val body = "query ExploreCommunity(\$after:String,\$featuredIfEmptyQuery:Boolean,\$page:Int,\$query:String,\$sort:String){items:alphaComunityPrefixSearch(after:\$after,featuredIfEmptyQuery:\$featuredIfEmptyQuery,first:25,page:\$page,query:\$query,sort:\$sort){__typename edges{__typename cursor node{__typename ...CommunitySearch}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment CommunitySearch on Organization{__typename about featured:alphaFeatured betaPublicRooms{__typename id}id isMine membersCount name photo status superAccountId}"
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
        override val body = "query ExplorePeople(\$after:String,\$page:Int,\$query:String,\$sort:String){items:userSearch(after:\$after,first:25,page:\$page,query:\$query,sort:\$sort){__typename edges{__typename cursor node{__typename isYou ...UserShort}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
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
        override val body = "query FeedHome{homeFeed:alphaHomeFeed{__typename by:alphaBy{__typename ...UserShort}date id text}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
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
        override val body = "query GlobalSearch(\$kinds:[GlobalSearchEntryKind!],\$query:String!){items:alphaGlobalSearch(kinds:\$kinds,query:\$query){__typename ... on Organization{...OrganizationShort}... on User{...UserShort}... on SharedRoom{id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}}}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}"
        override val selector = GlobalSearchSelector
    }
    val Message = object: OperationDefinition {
        override val name = "Message"
        override val kind = OperationKind.QUERY
        override val body = "query Message(\$messageId:ID!){message(messageId:\$messageId){__typename ...FullMessage}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = MessageSelector
    }
    val MessageComments = object: OperationDefinition {
        override val name = "MessageComments"
        override val kind = OperationKind.QUERY
        override val body = "query MessageComments(\$messageId:ID!){messageComments(messageId:\$messageId){__typename comments{__typename ...CommentEntryFragment}count id state{__typename state}}}fragment CommentEntryFragment on CommentEntry{__typename childComments{__typename id}comment{__typename id ...FullMessage}deleted id parentComment{__typename comment{__typename id message}id}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = MessageCommentsSelector
    }
    val MyApps = object: OperationDefinition {
        override val name = "MyApps"
        override val kind = OperationKind.QUERY
        override val body = "query MyApps{apps:myApps{__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}"
        override val selector = MyAppsSelector
    }
    val MyNotificationCenter = object: OperationDefinition {
        override val name = "MyNotificationCenter"
        override val kind = OperationKind.QUERY
        override val body = "query MyNotificationCenter{myNotificationCenter{__typename id state{__typename state}unread}}"
        override val selector = MyNotificationCenterSelector
    }
    val MyNotifications = object: OperationDefinition {
        override val name = "MyNotifications"
        override val kind = OperationKind.QUERY
        override val body = "query MyNotifications(\$before:ID,\$first:Int!){myNotifications(before:\$before,first:\$first){__typename cursor items{__typename ...NotificationFragment}}}fragment NotificationFragment on Notification{__typename content{__typename ... on NewCommentNotification{comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{chat{__typename ...RoomNano}message{__typename ... on GeneralMessage{fallback id message sender{__typename id name}senderBadge{__typename ...UserBadge}}}}}subscription{__typename type}}}}id text}fragment CommentEntryFragment on CommentEntry{__typename childComments{__typename id}comment{__typename id ...FullMessage}deleted id parentComment{__typename comment{__typename id message}id}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{id isChannel kind photo settings{__typename id mute}title}}"
        override val selector = MyNotificationsSelector
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
        override val body = "query Organization(\$organizationId:ID!){organization(id:\$organizationId){__typename ...OrganizationFull}}fragment OrganizationFull on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity isPrivate:alphaIsPrivate requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}members:alphaOrganizationMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment UserFull on User{__typename about audienceSize badges{__typename ...UserBadge}email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment RoomShort on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}"
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
        override val body = "query OrganizationMembersShort(\$organizationId:ID!){organization(id:\$organizationId){__typename members:alphaOrganizationMembers{__typename user{__typename id}}...OrganizationWithoutMembersFragment}}fragment OrganizationWithoutMembersFragment on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity isPrivate:alphaIsPrivate requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment UserFull on User{__typename about audienceSize badges{__typename ...UserBadge}email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment RoomShort on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = OrganizationMembersShortSelector
    }
    val OrganizationMembersShortPaginated = object: OperationDefinition {
        override val name = "OrganizationMembersShortPaginated"
        override val kind = OperationKind.QUERY
        override val body = "query OrganizationMembersShortPaginated(\$after:ID,\$first:Int,\$organizationId:ID!){organization(id:\$organizationId){__typename members:alphaOrganizationMembers(after:\$after,first:\$first){__typename role user{__typename ...UserFull}}...OrganizationWithoutMembersFragment}}fragment UserFull on User{__typename about audienceSize badges{__typename ...UserBadge}email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationWithoutMembersFragment on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity isPrivate:alphaIsPrivate requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment RoomShort on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = OrganizationMembersShortPaginatedSelector
    }
    val OrganizationProfile = object: OperationDefinition {
        override val name = "OrganizationProfile"
        override val kind = OperationKind.QUERY
        override val body = "query OrganizationProfile(\$organizationId:ID!){organizationProfile(id:\$organizationId){__typename ...OrganizationProfileFull}}fragment OrganizationProfileFull on OrganizationProfile{__typename about editorial:alphaEditorial featured:alphaFeatured private:alphaIsPrivate published:alphaPublished facebook id linkedin name photoRef{__typename crop{__typename h w x y}uuid}shortname twitter website websiteTitle}"
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
        override val body = "query OrganizationWithoutMembers(\$organizationId:ID!){organization(id:\$organizationId){__typename ...OrganizationWithoutMembersFragment}}fragment OrganizationWithoutMembersFragment on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity isPrivate:alphaIsPrivate requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment UserFull on User{__typename about audienceSize badges{__typename ...UserBadge}email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment RoomShort on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}"
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
        override val body = "query Profile{user:me{__typename id shortname}profile:myProfile{__typename about invitedBy:alphaInvitedBy{__typename id name}joinedAt:alphaJoinedAt linkedin:alphaLinkedin role:alphaRole email firstName id lastName location phone photoRef{__typename crop{__typename h w x y}uuid}primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id membersCount name}website}}fragment UserBadge on UserBadge{__typename id name verified}"
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
        override val body = "query ResolveShortName(\$shortname:String!){item:alphaResolveShortName(shortname:\$shortname){__typename ... on User{...UserFull}... on Organization{...OrganizationFull}}}fragment UserFull on User{__typename about audienceSize badges{__typename ...UserBadge}email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationFull on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity isPrivate:alphaIsPrivate requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}members:alphaOrganizationMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment RoomShort on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = ResolveShortNameSelector
    }
    val ResolvedInvite = object: OperationDefinition {
        override val name = "ResolvedInvite"
        override val kind = OperationKind.QUERY
        override val body = "query ResolvedInvite(\$key:String!){invite:alphaResolveInvite(key:\$key){__typename ... on InviteInfo{creator{__typename ...UserShort}id orgId title}... on AppInvite{inviter{__typename ...UserShort}}... on RoomInvite{id invitedByUser{__typename ...UserShort}room{__typename ... on SharedRoom{description id isChannel kind membersCount membership photo socialImage title}}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = ResolvedInviteSelector
    }
    val Room = object: OperationDefinition {
        override val name = "Room"
        override val kind = OperationKind.QUERY
        override val body = "query Room(\$id:ID!){room(id:\$id){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}"
        override val selector = RoomSelector
    }
    val RoomChat = object: OperationDefinition {
        override val name = "RoomChat"
        override val kind = OperationKind.QUERY
        override val body = "query RoomChat(\$id:ID!){room(id:\$id){__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}user{__typename id name}}... on SharedRoom{canEdit id isChannel kind membersCount membership photo pinnedMessage{__typename ...FullMessage}role title}}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}"
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
        override val body = "query RoomInviteInfo(\$invite:String!){invite:betaRoomInviteInfo(invite:\$invite){__typename id invitedByUser{__typename ...UserShort}room{__typename ... on SharedRoom{description id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo socialImage title}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
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
        override val body = "query RoomMembers(\$roomId:ID!){members:roomMembers(roomId:\$roomId){__typename canKick membership role user{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = RoomMembersSelector
    }
    val RoomMembersForMentionsPaginated = object: OperationDefinition {
        override val name = "RoomMembersForMentionsPaginated"
        override val kind = OperationKind.QUERY
        override val body = "query RoomMembersForMentionsPaginated(\$after:ID,\$first:Int,\$roomId:ID!){members:roomMembers(after:\$after,first:\$first,roomId:\$roomId){__typename user{__typename ...UserForMention}}}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserBadge on UserBadge{__typename id name verified}"
        override val selector = RoomMembersForMentionsPaginatedSelector
    }
    val RoomMembersPaginated = object: OperationDefinition {
        override val name = "RoomMembersPaginated"
        override val kind = OperationKind.QUERY
        override val body = "query RoomMembersPaginated(\$after:ID,\$first:Int,\$roomId:ID!){members:roomMembers(after:\$after,first:\$first,roomId:\$roomId){__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}}fragment UserBadge on UserBadge{__typename id name verified}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = RoomMembersPaginatedSelector
    }
    val RoomMembersShort = object: OperationDefinition {
        override val name = "RoomMembersShort"
        override val kind = OperationKind.QUERY
        override val body = "query RoomMembersShort(\$roomId:ID!){members:roomMembers(roomId:\$roomId){__typename user{__typename id}}}"
        override val selector = RoomMembersShortSelector
    }
    val RoomOrganizationAdminMembers = object: OperationDefinition {
        override val name = "RoomOrganizationAdminMembers"
        override val kind = OperationKind.QUERY
        override val body = "query RoomOrganizationAdminMembers(\$id:ID!){room(id:\$id){__typename ... on SharedRoom{id organization{__typename adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserShort}}id}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = RoomOrganizationAdminMembersSelector
    }
    val RoomPico = object: OperationDefinition {
        override val name = "RoomPico"
        override val kind = OperationKind.QUERY
        override val body = "query RoomPico(\$id:ID!){room(id:\$id){__typename ...RoomNano}}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{id isChannel kind photo settings{__typename id mute}title}}"
        override val selector = RoomPicoSelector
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
        override val body = "query RoomTiny(\$id:ID!){room(id:\$id){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomTinySelector
    }
    val RoomWithoutMembers = object: OperationDefinition {
        override val name = "RoomWithoutMembers"
        override val kind = OperationKind.QUERY
        override val body = "query RoomWithoutMembers(\$id:ID!){room(id:\$id){__typename ...RoomFullWithoutMembers}}fragment RoomFullWithoutMembers on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomWithoutMembersSelector
    }
    val Rooms = object: OperationDefinition {
        override val name = "Rooms"
        override val kind = OperationKind.QUERY
        override val body = "query Rooms(\$ids:[ID!]!){rooms(ids:\$ids){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomsSelector
    }
    val Settings = object: OperationDefinition {
        override val name = "Settings"
        override val kind = OperationKind.QUERY
        override val body = "query Settings{settings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename commentNotifications commentNotificationsDelivery desktopNotifications emailFrequency id mobileAlert mobileIncludeText mobileNotifications primaryEmail}"
        override val selector = SettingsSelector
    }
    val SuggestedRooms = object: OperationDefinition {
        override val name = "SuggestedRooms"
        override val kind = OperationKind.QUERY
        override val body = "query SuggestedRooms{isDiscoverDone:betaIsDiscoverDone suggestedRooms:betaSuggestedRooms{__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}}"
        override val selector = SuggestedRoomsSelector
    }
    val SuperAccount = object: OperationDefinition {
        override val name = "SuperAccount"
        override val kind = OperationKind.QUERY
        override val body = "query SuperAccount(\$accountId:ID!,\$viaOrgId:Boolean){superAccount(id:\$accountId,viaOrgId:\$viaOrgId){__typename published:alphaPublished createdAt createdBy{__typename id name}features{__typename id key title}id members{__typename ...UserShort}orgId state title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = SuperAccountSelector
    }
    val SuperAccounts = object: OperationDefinition {
        override val name = "SuperAccounts"
        override val kind = OperationKind.QUERY
        override val body = "query SuperAccounts{superAccounts{__typename createdAt id orgId state title}}"
        override val selector = SuperAccountsSelector
    }
    val SuperAdmins = object: OperationDefinition {
        override val name = "SuperAdmins"
        override val kind = OperationKind.QUERY
        override val body = "query SuperAdmins{superAdmins{__typename email role user{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = SuperAdminsSelector
    }
    val User = object: OperationDefinition {
        override val name = "User"
        override val kind = OperationKind.QUERY
        override val body = "query User(\$userId:ID!){conversation:room(id:\$userId){__typename ... on PrivateRoom{id settings{__typename id mute}}}user:user(id:\$userId){__typename ...UserFull}}fragment UserFull on User{__typename about audienceSize badges{__typename ...UserBadge}email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = UserSelector
    }
    val UserAvailableRooms = object: OperationDefinition {
        override val name = "UserAvailableRooms"
        override val kind = OperationKind.QUERY
        override val body = "query UserAvailableRooms(\$after:ID,\$isChannel:Boolean,\$limit:Int!){betaUserAvailableRooms(after:\$after,isChannel:\$isChannel,limit:\$limit){__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}}"
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
        override val body = "query Users(\$query:String!){items:users(query:\$query){__typename subtitle:email id title:name primaryBadge{__typename ...UserBadge}}}fragment UserBadge on UserBadge{__typename id name verified}"
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
        override val body = "mutation AddMessageComment(\$fileAttachments:[FileAttachmentInput!],\$mentions:[MentionInput!],\$message:String,\$messageId:ID!,\$replyComment:ID,\$spans:[MessageSpanInput!]){addMessageComment:betaAddMessageComment(fileAttachments:\$fileAttachments,mentions:\$mentions,message:\$message,messageId:\$messageId,replyComment:\$replyComment,spans:\$spans){__typename id}}"
        override val selector = AddMessageCommentSelector
    }
    val BadgeCreate = object: OperationDefinition {
        override val name = "BadgeCreate"
        override val kind = OperationKind.MUTATION
        override val body = "mutation BadgeCreate(\$name:String!){badgeCreate(name:\$name){__typename ... on User{badges{__typename ...UserBadge}id primaryBadge{__typename ...UserBadge}}}}fragment UserBadge on UserBadge{__typename id name verified}"
        override val selector = BadgeCreateSelector
    }
    val BadgeCreateToRoom = object: OperationDefinition {
        override val name = "BadgeCreateToRoom"
        override val kind = OperationKind.MUTATION
        override val body = "mutation BadgeCreateToRoom(\$name:String!,\$roomId:ID!){badgeCreateToRoom(name:\$name,roomId:\$roomId){__typename ...UserBadge}}fragment UserBadge on UserBadge{__typename id name verified}"
        override val selector = BadgeCreateToRoomSelector
    }
    val BadgeDelete = object: OperationDefinition {
        override val name = "BadgeDelete"
        override val kind = OperationKind.MUTATION
        override val body = "mutation BadgeDelete(\$badgeId:ID!){badgeDelete(badgeId:\$badgeId){__typename ... on User{badges{__typename ...UserBadge}id primaryBadge{__typename ...UserBadge}}}}fragment UserBadge on UserBadge{__typename id name verified}"
        override val selector = BadgeDeleteSelector
    }
    val BadgeSetPrimary = object: OperationDefinition {
        override val name = "BadgeSetPrimary"
        override val kind = OperationKind.MUTATION
        override val body = "mutation BadgeSetPrimary(\$badgeId:ID!){badgeSetPrimary(badgeId:\$badgeId){__typename ... on User{badges{__typename ...UserBadge}id primaryBadge{__typename ...UserBadge}}}}fragment UserBadge on UserBadge{__typename id name verified}"
        override val selector = BadgeSetPrimarySelector
    }
    val BadgeSetToRoom = object: OperationDefinition {
        override val name = "BadgeSetToRoom"
        override val kind = OperationKind.MUTATION
        override val body = "mutation BadgeSetToRoom(\$badgeId:ID!,\$roomId:ID!){badgeSetToRoom(badgeId:\$badgeId,roomId:\$roomId){__typename ...UserBadge}}fragment UserBadge on UserBadge{__typename id name verified}"
        override val selector = BadgeSetToRoomSelector
    }
    val BadgeUnsetPrimary = object: OperationDefinition {
        override val name = "BadgeUnsetPrimary"
        override val kind = OperationKind.MUTATION
        override val body = "mutation BadgeUnsetPrimary{badgeUnsetPrimary{__typename ... on User{badges{__typename ...UserBadge}id primaryBadge{__typename ...UserBadge}}}}fragment UserBadge on UserBadge{__typename id name verified}"
        override val selector = BadgeUnsetPrimarySelector
    }
    val BadgeUnsetToRoom = object: OperationDefinition {
        override val name = "BadgeUnsetToRoom"
        override val kind = OperationKind.MUTATION
        override val body = "mutation BadgeUnsetToRoom(\$roomId:ID!){badgeUnsetToRoom(roomId:\$roomId)}"
        override val selector = BadgeUnsetToRoomSelector
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
        override val body = "mutation CreateUserProfileAndOrganization(\$organization:CreateOrganizationInput!,\$user:ProfileInput!){alphaCreateUserProfileAndOrganization(organization:\$organization,user:\$user){__typename organization{__typename id name}user{__typename ...UserFull}}}fragment UserFull on User{__typename about audienceSize badges{__typename ...UserBadge}email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
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
    val DeleteNotification = object: OperationDefinition {
        override val name = "DeleteNotification"
        override val kind = OperationKind.MUTATION
        override val body = "mutation DeleteNotification(\$notificationId:ID!){deleteNotification(notificationId:\$notificationId)}"
        override val selector = DeleteNotificationSelector
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
        override val body = "mutation EditComment(\$fileAttachments:[FileAttachmentInput!],\$id:ID!,\$mentions:[MentionInput!],\$message:String,\$spans:[MessageSpanInput!]){editComment(fileAttachments:\$fileAttachments,id:\$id,mentions:\$mentions,message:\$message,spans:\$spans)}"
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
    val MyNotificationCenterMarkSeqRead = object: OperationDefinition {
        override val name = "MyNotificationCenterMarkSeqRead"
        override val kind = OperationKind.MUTATION
        override val body = "mutation MyNotificationCenterMarkSeqRead(\$seq:Int!){notificationCenterMarkSeqRead(toSeq:\$seq)}"
        override val selector = MyNotificationCenterMarkSeqReadSelector
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
        override val body = "mutation OrganizationAddMember(\$organizationId:ID!,\$userIds:[ID!]){betaOrganizationMemberAdd(organizationId:\$organizationId,userIds:\$userIds){__typename ...OrganizationFull}}fragment OrganizationFull on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity isPrivate:alphaIsPrivate requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}members:alphaOrganizationMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment UserFull on User{__typename about audienceSize badges{__typename ...UserBadge}email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment RoomShort on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}"
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
        override val body = "mutation PinMessage(\$chatId:ID!,\$messageId:ID!){pinMessage:gammaPinMessage(chatId:\$chatId,messageId:\$messageId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}"
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
    val ReadNotification = object: OperationDefinition {
        override val name = "ReadNotification"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ReadNotification(\$notificationId:ID!){readNotification(notificationId:\$notificationId){__typename id unread}}"
        override val selector = ReadNotificationSelector
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
        override val body = "mutation RoomAddMember(\$roomId:ID!,\$userId:ID!){betaRoomInvite(invites:[{userId:\$userId,role:MEMBER}],roomId:\$roomId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}"
        override val selector = RoomAddMemberSelector
    }
    val RoomAddMembers = object: OperationDefinition {
        override val name = "RoomAddMembers"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomAddMembers(\$invites:[RoomInviteInput!]!,\$roomId:ID!){betaRoomInvite(invites:\$invites,roomId:\$roomId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}"
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
        override val body = "mutation RoomChangeRole(\$newRole:RoomMemberRole!,\$roomId:ID!,\$userId:ID!){betaRoomChangeRole(newRole:\$newRole,roomId:\$roomId,userId:\$userId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}"
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
        override val body = "mutation RoomDeclineJoinReuest(\$roomId:ID!,\$userId:ID!){betaRoomDeclineJoinRequest(roomId:\$roomId,userId:\$userId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}"
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
        override val body = "mutation RoomJoin(\$roomId:ID!){join:betaRoomJoin(roomId:\$roomId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}"
        override val selector = RoomJoinSelector
    }
    val RoomJoinInviteLink = object: OperationDefinition {
        override val name = "RoomJoinInviteLink"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomJoinInviteLink(\$invite:String!){join:betaRoomInviteLinkJoin(invite:\$invite){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}"
        override val selector = RoomJoinInviteLinkSelector
    }
    val RoomKick = object: OperationDefinition {
        override val name = "RoomKick"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomKick(\$roomId:ID!,\$userId:ID!){betaRoomKick(roomId:\$roomId,userId:\$userId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}"
        override val selector = RoomKickSelector
    }
    val RoomLeave = object: OperationDefinition {
        override val name = "RoomLeave"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomLeave(\$roomId:ID!){betaRoomLeave(roomId:\$roomId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}"
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
    val RoomsInviteUser = object: OperationDefinition {
        override val name = "RoomsInviteUser"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomsInviteUser(\$roomIds:[ID!]!,\$userId:ID!){rooms:betaRoomsInviteUser(roomIds:\$roomIds,userId:\$userId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomsInviteUserSelector
    }
    val RoomsJoin = object: OperationDefinition {
        override val name = "RoomsJoin"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomsJoin(\$roomsIds:[ID!]!){join:betaRoomsJoin(roomsIds:\$roomsIds){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomsJoinSelector
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
        override val body = "mutation SettingsUpdate(\$input:UpdateSettingsInput){updateSettings(settings:\$input){__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename commentNotifications commentNotificationsDelivery desktopNotifications emailFrequency id mobileAlert mobileIncludeText mobileNotifications primaryEmail}"
        override val selector = SettingsUpdateSelector
    }
    val SubscribeMessageComments = object: OperationDefinition {
        override val name = "SubscribeMessageComments"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SubscribeMessageComments(\$messageId:ID!,\$type:CommentSubscriptionType!){subscribeMessageComments(messageId:\$messageId,type:\$type)}"
        override val selector = SubscribeMessageCommentsSelector
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
        override val body = "mutation SuperAccountMemberAdd(\$accountId:ID!,\$userId:ID!){superAccountMemberAdd(id:\$accountId,userId:\$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = SuperAccountMemberAddSelector
    }
    val SuperAccountMemberRemove = object: OperationDefinition {
        override val name = "SuperAccountMemberRemove"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperAccountMemberRemove(\$accountId:ID!,\$userId:ID!){superAccountMemberRemove(id:\$accountId,userId:\$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
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
    val SuperBadgeCreate = object: OperationDefinition {
        override val name = "SuperBadgeCreate"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperBadgeCreate(\$name:String!,\$userId:ID!){superBadgeCreate(name:\$name,userId:\$userId){__typename ... on User{badges{__typename ...UserBadge}id primaryBadge{__typename ...UserBadge}}}}fragment UserBadge on UserBadge{__typename id name verified}"
        override val selector = SuperBadgeCreateSelector
    }
    val SuperBadgeCreateToRoom = object: OperationDefinition {
        override val name = "SuperBadgeCreateToRoom"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperBadgeCreateToRoom(\$name:String!,\$roomId:ID!,\$userId:ID!){superBadgeCreateToRoom(name:\$name,roomId:\$roomId,userId:\$userId){__typename ...UserBadge}}fragment UserBadge on UserBadge{__typename id name verified}"
        override val selector = SuperBadgeCreateToRoomSelector
    }
    val SuperBadgeDelete = object: OperationDefinition {
        override val name = "SuperBadgeDelete"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperBadgeDelete(\$badgeId:ID!,\$userId:ID!){superBadgeDelete(badgeId:\$badgeId,userId:\$userId){__typename ... on User{badges{__typename ...UserBadge}id primaryBadge{__typename ...UserBadge}}}}fragment UserBadge on UserBadge{__typename id name verified}"
        override val selector = SuperBadgeDeleteSelector
    }
    val SuperBadgeSetToRoom = object: OperationDefinition {
        override val name = "SuperBadgeSetToRoom"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperBadgeSetToRoom(\$badgeId:ID!,\$roomId:ID!,\$userId:ID!){superBadgeSetToRoom(badgeId:\$badgeId,roomId:\$roomId,userId:\$userId){__typename ...UserBadge}}fragment UserBadge on UserBadge{__typename id name verified}"
        override val selector = SuperBadgeSetToRoomSelector
    }
    val SuperBadgeUnsetToRoom = object: OperationDefinition {
        override val name = "SuperBadgeUnsetToRoom"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperBadgeUnsetToRoom(\$badgeId:ID!,\$roomId:ID!,\$userId:ID!){superBadgeUnsetToRoom(badgeId:\$badgeId,roomId:\$roomId,userId:\$userId)}"
        override val selector = SuperBadgeUnsetToRoomSelector
    }
    val SuperBadgeUnverify = object: OperationDefinition {
        override val name = "SuperBadgeUnverify"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperBadgeUnverify(\$badgeId:ID!,\$userId:ID!){superBadgeUnverify(badgeId:\$badgeId,userId:\$userId){__typename ... on User{badges{__typename ...UserBadge}id primaryBadge{__typename ...UserBadge}}}}fragment UserBadge on UserBadge{__typename id name verified}"
        override val selector = SuperBadgeUnverifySelector
    }
    val SuperBadgeVerify = object: OperationDefinition {
        override val name = "SuperBadgeVerify"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperBadgeVerify(\$badgeId:ID!,\$userId:ID!){superBadgeVerify(badgeId:\$badgeId,userId:\$userId){__typename ... on User{badges{__typename ...UserBadge}id primaryBadge{__typename ...UserBadge}}}}fragment UserBadge on UserBadge{__typename id name verified}"
        override val selector = SuperBadgeVerifySelector
    }
    val SwitchReaction = object: OperationDefinition {
        override val name = "SwitchReaction"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SwitchReaction(\$from:String!,\$messageId:ID!,\$to:String!){betaReactionRemove(mid:\$messageId,reaction:\$from)betaReactionSet(mid:\$messageId,reaction:\$to)}"
        override val selector = SwitchReactionSelector
    }
    val UnSubscribeMessageComments = object: OperationDefinition {
        override val name = "UnSubscribeMessageComments"
        override val kind = OperationKind.MUTATION
        override val body = "mutation UnSubscribeMessageComments(\$messageId:ID!){unSubscribeMessageComments(messageId:\$messageId)}"
        override val selector = UnSubscribeMessageCommentsSelector
    }
    val UnpinMessage = object: OperationDefinition {
        override val name = "UnpinMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation UnpinMessage(\$chatId:ID!){unpinMessage:gammaUnpinMessage(chatId:\$chatId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}"
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
        override val body = "mutation UpdateOrganization(\$input:UpdateOrganizationProfileInput!,\$organizationId:ID){updateOrganizationProfile(id:\$organizationId,input:\$input){__typename ...OrganizationProfileFull}}fragment OrganizationProfileFull on OrganizationProfile{__typename about editorial:alphaEditorial featured:alphaFeatured private:alphaIsPrivate published:alphaPublished facebook id linkedin name photoRef{__typename crop{__typename h w x y}uuid}shortname twitter website websiteTitle}"
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
        override val body = "subscription ChatWatch(\$chatId:ID!,\$state:String){event:chatUpdates(chatId:\$chatId,fromState:\$state){__typename ... on ChatUpdateSingle{seq state update{__typename ...ChatUpdateFragment}}... on ChatUpdateBatch{fromSeq seq state updates{__typename ...ChatUpdateFragment}}}}fragment ChatUpdateFragment on ChatUpdate{__typename ... on ChatMessageReceived{message{__typename ...FullMessage}repeatKey}... on ChatMessageUpdated{message{__typename ...FullMessage}}... on ChatMessageDeleted{message{__typename id}}... on ChatUpdated{chat{__typename ...RoomShort}}... on ChatLostAccess{lostAccess}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment RoomShort on Room{__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}"
        override val selector = ChatWatchSelector
    }
    val CommentWatch = object: OperationDefinition {
        override val name = "CommentWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription CommentWatch(\$fromState:String,\$peerId:ID!){event:commentUpdates(fromState:\$fromState,peerId:\$peerId){__typename ... on CommentUpdateSingle{seq state update{__typename ...CommentUpdateFragment}}... on CommentUpdateBatch{fromSeq seq state updates{__typename ...CommentUpdateFragment}}}}fragment CommentUpdateFragment on CommentUpdate{__typename ... on CommentReceived{comment{__typename ...CommentEntryFragment}}... on CommentUpdated{comment{__typename ...CommentEntryFragment}}}fragment CommentEntryFragment on CommentEntry{__typename childComments{__typename id}comment{__typename id ...FullMessage}deleted id parentComment{__typename comment{__typename id message}id}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}"
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
        override val body = "subscription ConferenceWatch(\$id:ID!){alphaConferenceWatch(id:\$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename iceServers{__typename credential urls username}id peers{__typename connection{__typename ice sdp state}id user{__typename ...UserShort}}startTime}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
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
        override val body = "subscription DialogsWatch(\$state:String){event:dialogsUpdates(fromState:\$state){__typename ... on DialogUpdateSingle{seq state update{__typename ...DialogUpdateFragment}}... on DialogUpdateBatch{fromSeq seq state updates{__typename ...DialogUpdateFragment}}}}fragment DialogUpdateFragment on DialogUpdate{__typename ... on DialogMessageReceived{message:alphaMessage{__typename ...TinyMessage}cid globalUnread haveMention unread}... on DialogMessageUpdated{message:alphaMessage{__typename ...TinyMessage}cid haveMention}... on DialogMessageDeleted{message:alphaMessage{__typename ...TinyMessage}prevMessage:alphaPrevMessage{__typename ...TinyMessage}cid globalUnread haveMention unread}... on DialogMessageRead{cid globalUnread haveMention unread}... on DialogTitleUpdated{cid title}... on DialogMuteChanged{cid mute}... on DialogPhotoUpdated{cid photo}... on DialogDeleted{cid globalUnread}... on DialogBump{cid globalUnread haveMention topMessage{__typename ...TinyMessage}unread}}fragment TinyMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserTiny}senderBadge{__typename ...UserBadge}... on GeneralMessage{attachments{__typename fallback id ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat isImage}filePreview id}}commentsCount id isMentioned quotedMessages{__typename id}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = DialogsWatchSelector
    }
    val MyNotificationsCenter = object: OperationDefinition {
        override val name = "MyNotificationsCenter"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription MyNotificationsCenter(\$state:String){event:notificationCenterUpdates(fromState:\$state){__typename ... on NotificationCenterUpdateSingle{seq state update{__typename ...NotificationCenterUpdateFragment}}... on NotificationCenterUpdateBatch{fromSeq seq state updates{__typename ...NotificationCenterUpdateFragment}}}}fragment NotificationCenterUpdateFragment on NotificationCenterUpdate{__typename ... on NotificationReceived{center{__typename id unread}notification{__typename ...NotificationFragment}}... on NotificationUpdated{center{__typename id unread}notification{__typename ...NotificationFragment}}... on NotificationDeleted{center{__typename id unread}notification{__typename id}}... on NotificationRead{center{__typename id unread}}... on NotificationContentUpdated{content{__typename ... on UpdatedNotificationContentComment{comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{chat{__typename ...RoomNano}message{__typename ... on GeneralMessage{fallback id message sender{__typename id name}senderBadge{__typename ...UserBadge}}}}}subscription{__typename type}}}}}}fragment NotificationFragment on Notification{__typename content{__typename ... on NewCommentNotification{comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{chat{__typename ...RoomNano}message{__typename ... on GeneralMessage{fallback id message sender{__typename id name}senderBadge{__typename ...UserBadge}}}}}subscription{__typename type}}}}id text}fragment CommentEntryFragment on CommentEntry{__typename childComments{__typename id}comment{__typename id ...FullMessage}deleted id parentComment{__typename comment{__typename id message}id}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserForMention on User{__typename id isYou name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename id name}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryBadge{__typename ...UserBadge}primaryOrganization{__typename ...OrganizationShort}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{id isChannel kind photo settings{__typename id mute}title}}"
        override val selector = MyNotificationsCenterSelector
    }
    val OnlineWatch = object: OperationDefinition {
        override val name = "OnlineWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription OnlineWatch(\$users:[ID!]!){alphaSubscribeOnline(users:\$users){__typename timeout user{__typename id lastSeen online}}}"
        override val selector = OnlineWatchSelector
    }
    val SettingsWatch = object: OperationDefinition {
        override val name = "SettingsWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription SettingsWatch{watchSettings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename commentNotifications commentNotificationsDelivery desktopNotifications emailFrequency id mobileAlert mobileIncludeText mobileNotifications primaryEmail}"
        override val selector = SettingsWatchSelector
    }
    val TypingsWatch = object: OperationDefinition {
        override val name = "TypingsWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription TypingsWatch{typings{__typename cancel conversation:chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}user{__typename id name photo}}}"
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
        if (name == "DiscoverIsDone") return DiscoverIsDone
        if (name == "DiscoverNextPage") return DiscoverNextPage
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
        if (name == "MyNotificationCenter") return MyNotificationCenter
        if (name == "MyNotifications") return MyNotifications
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
        if (name == "RoomOrganizationAdminMembers") return RoomOrganizationAdminMembers
        if (name == "RoomPico") return RoomPico
        if (name == "RoomSearch") return RoomSearch
        if (name == "RoomSearchText") return RoomSearchText
        if (name == "RoomSuper") return RoomSuper
        if (name == "RoomTiny") return RoomTiny
        if (name == "RoomWithoutMembers") return RoomWithoutMembers
        if (name == "Rooms") return Rooms
        if (name == "Settings") return Settings
        if (name == "SuggestedRooms") return SuggestedRooms
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
        if (name == "BadgeCreate") return BadgeCreate
        if (name == "BadgeCreateToRoom") return BadgeCreateToRoom
        if (name == "BadgeDelete") return BadgeDelete
        if (name == "BadgeSetPrimary") return BadgeSetPrimary
        if (name == "BadgeSetToRoom") return BadgeSetToRoom
        if (name == "BadgeUnsetPrimary") return BadgeUnsetPrimary
        if (name == "BadgeUnsetToRoom") return BadgeUnsetToRoom
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
        if (name == "DeleteNotification") return DeleteNotification
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
        if (name == "MyNotificationCenterMarkSeqRead") return MyNotificationCenterMarkSeqRead
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
        if (name == "ReadNotification") return ReadNotification
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
        if (name == "RoomsInviteUser") return RoomsInviteUser
        if (name == "RoomsJoin") return RoomsJoin
        if (name == "SaveDraftMessage") return SaveDraftMessage
        if (name == "SendMessage") return SendMessage
        if (name == "SendPostMessage") return SendPostMessage
        if (name == "SetOrgShortname") return SetOrgShortname
        if (name == "SetTyping") return SetTyping
        if (name == "SetUserShortname") return SetUserShortname
        if (name == "SettingsUpdate") return SettingsUpdate
        if (name == "SubscribeMessageComments") return SubscribeMessageComments
        if (name == "SuperAccountActivate") return SuperAccountActivate
        if (name == "SuperAccountAdd") return SuperAccountAdd
        if (name == "SuperAccountMemberAdd") return SuperAccountMemberAdd
        if (name == "SuperAccountMemberRemove") return SuperAccountMemberRemove
        if (name == "SuperAccountPend") return SuperAccountPend
        if (name == "SuperAccountRename") return SuperAccountRename
        if (name == "SuperAccountSuspend") return SuperAccountSuspend
        if (name == "SuperAdminAdd") return SuperAdminAdd
        if (name == "SuperAdminRemove") return SuperAdminRemove
        if (name == "SuperBadgeCreate") return SuperBadgeCreate
        if (name == "SuperBadgeCreateToRoom") return SuperBadgeCreateToRoom
        if (name == "SuperBadgeDelete") return SuperBadgeDelete
        if (name == "SuperBadgeSetToRoom") return SuperBadgeSetToRoom
        if (name == "SuperBadgeUnsetToRoom") return SuperBadgeUnsetToRoom
        if (name == "SuperBadgeUnverify") return SuperBadgeUnverify
        if (name == "SuperBadgeVerify") return SuperBadgeVerify
        if (name == "SwitchReaction") return SwitchReaction
        if (name == "UnSubscribeMessageComments") return UnSubscribeMessageComments
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
        if (name == "MyNotificationsCenter") return MyNotificationsCenter
        if (name == "OnlineWatch") return OnlineWatch
        if (name == "SettingsWatch") return SettingsWatch
        if (name == "TypingsWatch") return TypingsWatch
        error("Unknown operation: $name")
    }
}