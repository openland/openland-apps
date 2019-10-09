package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AppChatSelector = obj(
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

internal val AppFullSelector = obj(
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

internal val OrganizationShortSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("alphaIsCommunity","isCommunity", notNull(scalar("Boolean"))),
            field("id","id", notNull(scalar("ID"))),
            field("name","name", notNull(scalar("String"))),
            field("photo","photo", scalar("String")),
            field("shortname","shortname", scalar("String"))
        )

internal val UserShortSelector = obj(
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
            field("primaryOrganization","primaryOrganization", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                )),
            field("shortname","shortname", scalar("String"))
        )

internal val UserBadgeSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("name","name", notNull(scalar("String"))),
            field("verified","verified", notNull(scalar("Boolean")))
        )

internal val UserForMentionSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("isYou","isYou", notNull(scalar("Boolean"))),
            field("name","name", notNull(scalar("String"))),
            field("photo","photo", scalar("String")),
            field("primaryOrganization","primaryOrganization", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("name","name", notNull(scalar("String")))
                )),
            field("shortname","shortname", scalar("String"))
        )

internal val SpanFragmentSelector = obj(
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
        )

internal val QuotedMessageSelector = obj(
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
            field("source","source", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("MessageSourceChat", obj(
                        field("chat","chat", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                inline("PrivateRoom", obj(
                                    field("id","id", notNull(scalar("ID")))
                                )),
                                inline("SharedRoom", obj(
                                    field("id","id", notNull(scalar("ID")))
                                ))
                            )))
                    ))
                )),
            field("spans","spans", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("MessageSpan", SpanFragmentSelector)
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
                            field("imageFallback","imageFallback", obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("photo","photo", notNull(scalar("String"))),
                                    field("text","text", notNull(scalar("String")))
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
            )),
            inline("StickerMessage", obj(
                field("date","date", notNull(scalar("Date"))),
                field("id","id", notNull(scalar("ID"))),
                field("reactions","reactions", notNull(list(notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("reaction","reaction", notNull(scalar("String"))),
                        field("user","user", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            )))
                    ))))),
                field("sender","sender", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("User", UserShortSelector)
                    ))),
                field("senderBadge","senderBadge", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("UserBadge", UserBadgeSelector)
                    )),
                field("source","source", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        inline("MessageSourceChat", obj(
                            field("chat","chat", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    inline("PrivateRoom", obj(
                                        field("id","id", notNull(scalar("ID")))
                                    )),
                                    inline("SharedRoom", obj(
                                        field("id","id", notNull(scalar("ID")))
                                    ))
                                )))
                        ))
                    )),
                field("sticker","sticker", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        inline("ImageSticker", obj(
                            field("id","id", notNull(scalar("ID"))),
                            field("image","image", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    inline("ImageRef", obj(
                                        field("uuid","uuid", notNull(scalar("String")))
                                    ))
                                ))),
                            field("pack","pack", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    inline("StickerPack", obj(
                                        field("id","id", notNull(scalar("ID"))),
                                        field("title","title", notNull(scalar("String")))
                                    ))
                                )))
                        ))
                    )))
            ))
        )

internal val StickerFragmentSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("ImageSticker", obj(
                field("id","id", notNull(scalar("ID"))),
                field("image","image", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("uuid","uuid", notNull(scalar("String")))
                    ))),
                field("pack","pack", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID"))),
                        field("title","title", notNull(scalar("String")))
                    )))
            ))
        )

internal val UserTinySelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("firstName","firstName", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("isYou","isYou", notNull(scalar("Boolean"))),
            field("lastName","lastName", scalar("String")),
            field("name","name", notNull(scalar("String"))),
            field("photo","photo", scalar("String")),
            field("primaryOrganization","primaryOrganization", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                )),
            field("shortname","shortname", scalar("String"))
        )

internal val FullMessageSelector = obj(
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
            field("source","source", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("MessageSourceChat", obj(
                        field("chat","chat", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                inline("PrivateRoom", obj(
                                    field("id","id", notNull(scalar("ID")))
                                )),
                                inline("SharedRoom", obj(
                                    field("id","id", notNull(scalar("ID")))
                                ))
                            )))
                    ))
                )),
            field("spans","spans", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("MessageSpan", SpanFragmentSelector)
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
                            field("imageFallback","imageFallback", obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("photo","photo", notNull(scalar("String"))),
                                    field("text","text", notNull(scalar("String")))
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
                        fragment("ModernMessage", QuotedMessageSelector)
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
            inline("StickerMessage", obj(
                field("commentsCount","commentsCount", notNull(scalar("Int"))),
                field("date","date", notNull(scalar("Date"))),
                field("id","id", notNull(scalar("ID"))),
                field("quotedMessages","quotedMessages", notNull(list(notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", QuotedMessageSelector)
                    ))))),
                field("reactions","reactions", notNull(list(notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("reaction","reaction", notNull(scalar("String"))),
                        field("user","user", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            )))
                    ))))),
                field("sender","sender", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("User", UserShortSelector)
                    ))),
                field("senderBadge","senderBadge", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("UserBadge", UserBadgeSelector)
                    )),
                field("source","source", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        inline("MessageSourceChat", obj(
                            field("chat","chat", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    inline("PrivateRoom", obj(
                                        field("id","id", notNull(scalar("ID")))
                                    )),
                                    inline("SharedRoom", obj(
                                        field("id","id", notNull(scalar("ID")))
                                    ))
                                )))
                        ))
                    )),
                field("sticker","sticker", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("Sticker", StickerFragmentSelector)
                    )))
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

internal val RoomShortSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("PrivateRoom", obj(
                field("id","id", notNull(scalar("ID"))),
                field("myBadge","myBadge", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("UserBadge", UserBadgeSelector)
                    )),
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
                field("myBadge","myBadge", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("UserBadge", UserBadgeSelector)
                    )),
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

internal val ChatUpdateFragmentSelector = obj(
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

internal val CommentEntryFragmentSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("betaComment","comment", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    fragment("ModernMessage", FullMessageSelector)
                ))),
            field("childComments","childComments", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                ))))),
            field("deleted","deleted", notNull(scalar("Boolean"))),
            field("id","id", notNull(scalar("ID"))),
            field("parentComment","parentComment", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("betaComment","comment", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("message","message", scalar("String"))
                        ))),
                    field("id","id", notNull(scalar("ID")))
                ))
        )

internal val CommentUpdateFragmentSelector = obj(
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

internal val CommunitySearchSelector = obj(
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

internal val ConferenceFullSelector = obj(
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

internal val ConferenceShortSelector = obj(
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

internal val DaialogListMessageSelector = obj(
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

internal val TinyMessageSelector = obj(
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

internal val DialogUpdateFragmentSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("DialogMessageReceived", obj(
                field("alphaMessage","message", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", TinyMessageSelector)
                    ))),
                field("cid","cid", notNull(scalar("ID"))),
                field("globalUnread","globalUnread", notNull(scalar("Int"))),
                field("haveMention","haveMention", notNull(scalar("Boolean"))),
                field("showNotification","showNotification", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("desktop","desktop", notNull(scalar("Boolean"))),
                        field("mobile","mobile", notNull(scalar("Boolean")))
                    ))),
                field("silent","silent", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("desktop","desktop", notNull(scalar("Boolean"))),
                        field("mobile","mobile", notNull(scalar("Boolean")))
                    ))),
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
            inline("DialogMuteChanged", obj(
                field("cid","cid", notNull(scalar("ID"))),
                field("mute","mute", notNull(scalar("Boolean")))
            )),
            inline("DialogPeerUpdated", obj(
                field("cid","cid", notNull(scalar("ID"))),
                field("peer","peer", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        inline("PrivateRoom", obj(
                            field("id","id", notNull(scalar("ID"))),
                            field("user","user", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("id","id", notNull(scalar("ID"))),
                                    field("name","name", notNull(scalar("String"))),
                                    field("photo","photo", scalar("String"))
                                )))
                        )),
                        inline("SharedRoom", obj(
                            field("id","id", notNull(scalar("ID"))),
                            field("photo","photo", notNull(scalar("String"))),
                            field("title","title", notNull(scalar("String")))
                        ))
                    )))
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

internal val FeedChannelFullSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("id","id", notNull(scalar("ID"))),
            field("isGlobal","isGlobal", notNull(scalar("Boolean"))),
            field("myRole","myRole", notNull(scalar("String"))),
            field("photo","photo", scalar("String")),
            field("shortname","shortname", scalar("String")),
            field("subscribed","subscribed", notNull(scalar("Boolean"))),
            field("subscribersCount","subscribersCount", notNull(scalar("Int"))),
            field("title","title", notNull(scalar("String")))
        )

internal val FeedPostAuthorFragmentSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("User", obj(
                fragment("User", UserShortSelector)
            ))
        )

internal val SlideFragmentSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("TextSlide", obj(
                field("attachments","attachments", notNull(list(notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
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
                        )),
                        inline("Organization", obj(
                            fragment("Organization", OrganizationShortSelector)
                        ))
                    ))))),
                field("cover","cover", obj(
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
                field("coverAlign","coverAlign", scalar("String")),
                field("id","id", notNull(scalar("ID"))),
                field("spans","spans", notNull(list(notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("MessageSpan", SpanFragmentSelector)
                    ))))),
                field("text","text", notNull(scalar("String")))
            ))
        )

internal val FeedPostSourceFragmentSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("FeedChannel", obj(
                fragment("FeedChannel", FeedChannelFullSelector)
            ))
        )

internal val FeedItemFullSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("FeedPost", obj(
                field("author","author", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("FeedPostAuthor", FeedPostAuthorFragmentSelector)
                    ))),
                field("canEdit","canEdit", notNull(scalar("Boolean"))),
                field("commentsCount","commentsCount", notNull(scalar("Int"))),
                field("date","date", notNull(scalar("Date"))),
                field("edited","edited", notNull(scalar("Boolean"))),
                field("fallback","fallback", notNull(scalar("String"))),
                field("id","id", notNull(scalar("ID"))),
                field("message","message", scalar("String")),
                field("reactions","reactions", notNull(list(notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("reaction","reaction", notNull(scalar("String"))),
                        field("user","user", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            )))
                    ))))),
                field("slides","slides", notNull(list(notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("Slide", SlideFragmentSelector)
                    ))))),
                field("source","source", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("FeedPostSource", FeedPostSourceFragmentSelector)
                    ))
            ))
        )

internal val FeedUpdateFragmentSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("FeedItemReceived", obj(
                field("item","item", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("FeedItem", FeedItemFullSelector)
                    )))
            )),
            inline("FeedItemUpdated", obj(
                field("item","item", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("FeedItem", FeedItemFullSelector)
                    )))
            )),
            inline("FeedItemDeleted", obj(
                field("item","item", notNull(obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("FeedItem", FeedItemFullSelector)
                    )))
            ))
        )

internal val MatchmakingProfileFragmentSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("answers","answers", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("TextMatchmakingAnswer", obj(
                        field("answer","answer", notNull(scalar("String"))),
                        field("question","question", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("subtitle","subtitle", notNull(scalar("String"))),
                                field("title","title", notNull(scalar("String")))
                            )))
                    )),
                    inline("MultiselectMatchmakingAnswer", obj(
                        field("question","question", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("subtitle","subtitle", notNull(scalar("String"))),
                                field("title","title", notNull(scalar("String")))
                            ))),
                        field("tags","tags", notNull(list(notNull(scalar("String")))))
                    ))
                ))))),
            field("chatCreated","chatCreated", notNull(scalar("Boolean"))),
            field("user","user", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("isYou","isYou", notNull(scalar("Boolean"))),
                    field("name","name", notNull(scalar("String"))),
                    field("photo","photo", scalar("String"))
                )))
        )

internal val MatchmakingRoomFragmentSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("enabled","enabled", notNull(scalar("Boolean"))),
            field("myProfile","myProfile", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("MatchmakingProfile", MatchmakingProfileFragmentSelector)
                )),
            field("profiles","profiles", list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("answers","answers", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            inline("TextMatchmakingAnswer", obj(
                                field("answer","answer", notNull(scalar("String"))),
                                field("question","question", notNull(obj(
                                        field("__typename","__typename", notNull(scalar("String"))),
                                        field("id","id", notNull(scalar("ID"))),
                                        field("subtitle","subtitle", notNull(scalar("String"))),
                                        field("title","title", notNull(scalar("String")))
                                    )))
                            )),
                            inline("MultiselectMatchmakingAnswer", obj(
                                field("question","question", notNull(obj(
                                        field("__typename","__typename", notNull(scalar("String"))),
                                        field("id","id", notNull(scalar("ID"))),
                                        field("subtitle","subtitle", notNull(scalar("String"))),
                                        field("title","title", notNull(scalar("String")))
                                    ))),
                                field("tags","tags", notNull(list(notNull(scalar("String")))))
                            ))
                        ))))),
                    field("chatCreated","chatCreated", notNull(scalar("Boolean"))),
                    field("user","user", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String"))),
                            field("photo","photo", scalar("String")),
                            field("primaryOrganization","primaryOrganization", obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("id","id", notNull(scalar("ID"))),
                                    field("name","name", notNull(scalar("String"))),
                                    field("photo","photo", scalar("String"))
                                ))
                        )))
                )))),
            field("questions","questions", list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("TextMatchmakingQuestion", obj(
                        field("id","id", notNull(scalar("ID"))),
                        field("subtitle","subtitle", notNull(scalar("String"))),
                        field("title","title", notNull(scalar("String")))
                    )),
                    inline("MultiselectMatchmakingQuestion", obj(
                        field("id","id", notNull(scalar("ID"))),
                        field("subtitle","subtitle", notNull(scalar("String"))),
                        field("tags","tags", notNull(list(notNull(scalar("String"))))),
                        field("title","title", notNull(scalar("String")))
                    ))
                ))))
        )

internal val RoomNanoSelector = obj(
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

internal val NotificationFragmentSelector = obj(
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
                                        )),
                                        inline("CommentPeerRootFeedItem", obj(
                                            field("item","item", notNull(obj(
                                                    field("__typename","__typename", notNull(scalar("String"))),
                                                    fragment("FeedItem", FeedItemFullSelector)
                                                )))
                                        ))
                                    ))),
                                field("subscription","subscription", obj(
                                        field("__typename","__typename", notNull(scalar("String"))),
                                        field("type","type", scalar("String"))
                                    ))
                            )))
                    )),
                    inline("NewMatchmakingProfilesNotification", obj(
                        field("room","room", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("enabled","enabled", notNull(scalar("Boolean")))
                            )))
                    ))
                ))))),
            field("id","id", notNull(scalar("ID"))),
            field("text","text", scalar("String"))
        )

internal val NotificationCenterUpdateFragmentSelector = obj(
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
                                            )),
                                            inline("CommentPeerRootFeedItem", obj(
                                                field("item","item", notNull(obj(
                                                        field("__typename","__typename", notNull(scalar("String"))),
                                                        fragment("FeedItem", FeedItemFullSelector)
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

internal val UserFullSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("audienceSize","audienceSize", notNull(scalar("Int"))),
            field("email","email", scalar("String")),
            field("facebook","facebook", scalar("String")),
            field("firstName","firstName", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("instagram","instagram", scalar("String")),
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
            field("primaryOrganization","primaryOrganization", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                )),
            field("shortname","shortname", scalar("String")),
            field("twitter","twitter", scalar("String")),
            field("website","website", scalar("String"))
        )

internal val OrganizationFullSelector = obj(
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
            field("instagram","instagram", scalar("String")),
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

internal val OrganizationMediumSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("alphaIsCommunity","isCommunity", notNull(scalar("Boolean"))),
            field("betaIsAdmin","isAdmin", notNull(scalar("Boolean"))),
            field("betaIsOwner","isOwner", notNull(scalar("Boolean"))),
            field("id","id", notNull(scalar("ID"))),
            field("isMine","isMine", notNull(scalar("Boolean"))),
            field("membersCount","membersCount", notNull(scalar("Int"))),
            field("name","name", notNull(scalar("String"))),
            field("photo","photo", scalar("String")),
            field("shortname","shortname", scalar("String"))
        )

internal val OrganizationProfileFullSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("alphaEditorial","editorial", notNull(scalar("Boolean"))),
            field("alphaFeatured","featured", notNull(scalar("Boolean"))),
            field("alphaIsPrivate","private", notNull(scalar("Boolean"))),
            field("alphaPublished","published", notNull(scalar("Boolean"))),
            field("facebook","facebook", scalar("String")),
            field("id","id", notNull(scalar("ID"))),
            field("instagram","instagram", scalar("String")),
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

internal val OrganizationSearchSelector = obj(
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

internal val OrganizationWithoutMembersFragmentSelector = obj(
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
            field("instagram","instagram", scalar("String")),
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

internal val PlatformNotificationSettingsFullSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("comments","comments", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("showNotification","showNotification", notNull(scalar("Boolean"))),
                    field("sound","sound", notNull(scalar("Boolean")))
                ))),
            field("communityChat","communityChat", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("showNotification","showNotification", notNull(scalar("Boolean"))),
                    field("sound","sound", notNull(scalar("Boolean")))
                ))),
            field("direct","direct", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("showNotification","showNotification", notNull(scalar("Boolean"))),
                    field("sound","sound", notNull(scalar("Boolean")))
                ))),
            field("notificationPreview","notificationPreview", notNull(scalar("String"))),
            field("organizationChat","organizationChat", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("showNotification","showNotification", notNull(scalar("Boolean"))),
                    field("sound","sound", notNull(scalar("Boolean")))
                ))),
            field("secretChat","secretChat", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("showNotification","showNotification", notNull(scalar("Boolean"))),
                    field("sound","sound", notNull(scalar("Boolean")))
                )))
        )

internal val RoomFullSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("PrivateRoom", obj(
                field("id","id", notNull(scalar("ID"))),
                field("myBadge","myBadge", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("UserBadge", UserBadgeSelector)
                    )),
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
                field("featuredMembersCount","featuredMembersCount", notNull(scalar("Int"))),
                field("id","id", notNull(scalar("ID"))),
                field("isChannel","isChannel", notNull(scalar("Boolean"))),
                field("kind","kind", notNull(scalar("String"))),
                field("matchmaking","matchmaking", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("enabled","enabled", notNull(scalar("Boolean"))),
                        field("questions","questions", list(notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                inline("TextMatchmakingQuestion", obj(
                                    field("id","id", notNull(scalar("ID")))
                                )),
                                inline("MultiselectMatchmakingQuestion", obj(
                                    field("id","id", notNull(scalar("ID")))
                                ))
                            ))))
                    )),
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
                field("myBadge","myBadge", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("UserBadge", UserBadgeSelector)
                    )),
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

internal val RoomFullWithoutMembersSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("PrivateRoom", obj(
                field("id","id", notNull(scalar("ID"))),
                field("myBadge","myBadge", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("UserBadge", UserBadgeSelector)
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
                field("featuredMembersCount","featuredMembersCount", notNull(scalar("Int"))),
                field("id","id", notNull(scalar("ID"))),
                field("isChannel","isChannel", notNull(scalar("Boolean"))),
                field("kind","kind", notNull(scalar("String"))),
                field("membersCount","membersCount", scalar("Int")),
                field("membership","membership", notNull(scalar("String"))),
                field("myBadge","myBadge", obj(
                        field("__typename","__typename", notNull(scalar("String"))),
                        fragment("UserBadge", UserBadgeSelector)
                    )),
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

internal val SessionStateFullSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("isAccountActivated","isAccountActivated", notNull(scalar("Boolean"))),
            field("isAccountExists","isAccountExists", notNull(scalar("Boolean"))),
            field("isAccountPicked","isAccountPicked", notNull(scalar("Boolean"))),
            field("isBlocked","isBlocked", notNull(scalar("Boolean"))),
            field("isCompleted","isCompleted", notNull(scalar("Boolean"))),
            field("isLoggedIn","isLoggedIn", notNull(scalar("Boolean"))),
            field("isProfileCreated","isProfileCreated", notNull(scalar("Boolean")))
        )

internal val SettingsFullSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("countUnreadChats","countUnreadChats", notNull(scalar("Boolean"))),
            field("desktop","desktop", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("PlatformNotificationSettings", PlatformNotificationSettingsFullSelector)
                ))),
            field("emailFrequency","emailFrequency", notNull(scalar("String"))),
            field("excludeMutedChats","excludeMutedChats", notNull(scalar("Boolean"))),
            field("id","id", notNull(scalar("ID"))),
            field("mobile","mobile", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("PlatformNotificationSettings", PlatformNotificationSettingsFullSelector)
                ))),
            field("primaryEmail","primaryEmail", notNull(scalar("String")))
        )

internal val StickerPackFragmentSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("stickers","stickers", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Sticker", StickerFragmentSelector)
                ))))),
            field("title","title", notNull(scalar("String")))
        )
