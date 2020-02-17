package com.openland.react.graphql

import com.openland.spacex.*
import com.openland.spacex.gen.*
import org.json.*

internal val AppChatSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("chat", "chat", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    )),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    ))
                ))),
            field("webhook", "webhook", notNull(scalar("String")))
        )

internal val AppFullSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("name", "name", notNull(scalar("String"))),
            field("shortname", "shortname", scalar("String")),
            field("photoRef", "photoRef", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("uuid", "uuid", notNull(scalar("String"))),
                    field("crop", "crop", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("x", "x", notNull(scalar("Int"))),
                            field("y", "y", notNull(scalar("Int"))),
                            field("w", "w", notNull(scalar("Int"))),
                            field("h", "h", notNull(scalar("Int")))
                        ))
                )),
            field("about", "about", scalar("String")),
            field("token", "token", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("salt", "salt", notNull(scalar("String")))
                )))
        )

internal val OrganizationShortSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("name", "name", notNull(scalar("String"))),
            field("photo", "photo", scalar("String")),
            field("shortname", "shortname", scalar("String")),
            field("about", "about", scalar("String")),
            field("alphaIsCommunity", "isCommunity", notNull(scalar("Boolean"))),
            field("membersCount", "membersCount", notNull(scalar("Int")))
        )

internal val UserShortSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("name", "name", notNull(scalar("String"))),
            field("firstName", "firstName", notNull(scalar("String"))),
            field("lastName", "lastName", scalar("String")),
            field("photo", "photo", scalar("String")),
            field("email", "email", scalar("String")),
            field("online", "online", notNull(scalar("Boolean"))),
            field("lastSeen", "lastSeen", scalar("String")),
            field("isYou", "isYou", notNull(scalar("Boolean"))),
            field("isBot", "isBot", notNull(scalar("Boolean"))),
            field("shortname", "shortname", scalar("String")),
            field("primaryOrganization", "primaryOrganization", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                ))
        )

internal val UserBadgeSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("name", "name", notNull(scalar("String"))),
            field("verified", "verified", notNull(scalar("Boolean")))
        )

internal val UserForMentionSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("isYou", "isYou", notNull(scalar("Boolean"))),
            field("id", "id", notNull(scalar("ID"))),
            field("name", "name", notNull(scalar("String"))),
            field("photo", "photo", scalar("String")),
            field("shortname", "shortname", scalar("String")),
            field("isBot", "isBot", notNull(scalar("Boolean"))),
            field("primaryOrganization", "primaryOrganization", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("name", "name", notNull(scalar("String")))
                ))
        )

internal val RoomSharedNanoSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("kind", "kind", notNull(scalar("String"))),
            field("isChannel", "isChannel", notNull(scalar("Boolean"))),
            field("title", "title", notNull(scalar("String"))),
            field("photo", "roomPhoto", notNull(scalar("String"))),
            field("membersCount", "membersCount", notNull(scalar("Int"))),
            field("settings", "settings", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("mute", "mute", scalar("Boolean"))
                )))
        )

internal val RoomNanoSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("PrivateRoom", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("user", "user", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("name", "name", notNull(scalar("String"))),
                        field("photo", "photo", scalar("String"))
                    ))),
                field("settings", "settings", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("mute", "mute", scalar("Boolean"))
                    )))
            )),
            inline("SharedRoom", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                fragment("SharedRoom", RoomSharedNanoSelector)
            ))
        )

internal val SpanFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("offset", "offset", notNull(scalar("Int"))),
            field("length", "length", notNull(scalar("Int"))),
            inline("MessageSpanUserMention", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("user", "user", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("User", UserForMentionSelector)
                    )))
            )),
            inline("MessageSpanMultiUserMention", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("users", "users", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("User", UserForMentionSelector)
                    )))))
            )),
            inline("MessageSpanOrganizationMention", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("organization", "organization", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("Organization", OrganizationShortSelector)
                    )))
            )),
            inline("MessageSpanRoomMention", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("room", "room", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("Room", RoomNanoSelector)
                    )))
            )),
            inline("MessageSpanLink", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("url", "url", notNull(scalar("String")))
            )),
            inline("MessageSpanDate", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("date", "date", notNull(scalar("Date")))
            ))
        )

internal val QuotedMessageSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("date", "date", notNull(scalar("Date"))),
            field("message", "message", scalar("String")),
            field("sender", "sender", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("User", UserShortSelector)
                ))),
            field("senderBadge", "senderBadge", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                )),
            field("message", "message", scalar("String")),
            field("fallback", "fallback", notNull(scalar("String"))),
            field("source", "source", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("MessageSourceChat", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("chat", "chat", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                inline("PrivateRoom", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("ID")))
                                )),
                                inline("SharedRoom", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("ID")))
                                ))
                            )))
                    ))
                )),
            field("spans", "spans", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("MessageSpan", SpanFragmentSelector)
                ))))),
            inline("GeneralMessage", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("overrideName", "overrideName", scalar("String")),
                field("overrideAvatar", "overrideAvatar", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("uuid", "uuid", notNull(scalar("String"))),
                        field("crop", "crop", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("x", "x", notNull(scalar("Int"))),
                                field("y", "y", notNull(scalar("Int"))),
                                field("w", "w", notNull(scalar("Int"))),
                                field("h", "h", notNull(scalar("Int")))
                            ))
                    )),
                field("commentsCount", "commentsCount", notNull(scalar("Int"))),
                field("edited", "edited", notNull(scalar("Boolean"))),
                field("attachments", "attachments", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("fallback", "fallback", notNull(scalar("String"))),
                        inline("MessageAttachmentFile", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("fileId", "fileId", notNull(scalar("String"))),
                            field("fileMetadata", "fileMetadata", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("name", "name", notNull(scalar("String"))),
                                    field("mimeType", "mimeType", scalar("String")),
                                    field("size", "size", notNull(scalar("Int"))),
                                    field("isImage", "isImage", notNull(scalar("Boolean"))),
                                    field("imageWidth", "imageWidth", scalar("Int")),
                                    field("imageHeight", "imageHeight", scalar("Int")),
                                    field("imageFormat", "imageFormat", scalar("String"))
                                ))),
                            field("filePreview", "filePreview", scalar("String"))
                        )),
                        inline("MessageRichAttachment", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("title", "title", scalar("String")),
                            field("subTitle", "subTitle", scalar("String")),
                            field("titleLink", "titleLink", scalar("String")),
                            field("titleLinkHostname", "titleLinkHostname", scalar("String")),
                            field("text", "text", scalar("String")),
                            field("icon", "icon", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("url", "url", notNull(scalar("String"))),
                                    field("metadata", "metadata", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("name", "name", notNull(scalar("String"))),
                                            field("mimeType", "mimeType", scalar("String")),
                                            field("size", "size", notNull(scalar("Int"))),
                                            field("isImage", "isImage", notNull(scalar("Boolean"))),
                                            field("imageWidth", "imageWidth", scalar("Int")),
                                            field("imageHeight", "imageHeight", scalar("Int")),
                                            field("imageFormat", "imageFormat", scalar("String"))
                                        ))
                                )),
                            field("image", "image", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("url", "url", notNull(scalar("String"))),
                                    field("metadata", "metadata", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("name", "name", notNull(scalar("String"))),
                                            field("mimeType", "mimeType", scalar("String")),
                                            field("size", "size", notNull(scalar("Int"))),
                                            field("isImage", "isImage", notNull(scalar("Boolean"))),
                                            field("imageWidth", "imageWidth", scalar("Int")),
                                            field("imageHeight", "imageHeight", scalar("Int")),
                                            field("imageFormat", "imageFormat", scalar("String"))
                                        ))
                                )),
                            field("keyboard", "keyboard", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("buttons", "buttons", notNull(list(list(notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("id", "id", notNull(scalar("ID"))),
                                            field("title", "title", notNull(scalar("String"))),
                                            field("style", "style", notNull(scalar("String"))),
                                            field("url", "url", scalar("String"))
                                        ))))))
                                )),
                            field("imageFallback", "imageFallback", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("photo", "photo", notNull(scalar("String"))),
                                    field("text", "text", notNull(scalar("String")))
                                )),
                            field("fallback", "fallback", notNull(scalar("String")))
                        ))
                    )))))
            )),
            inline("StickerMessage", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("date", "date", notNull(scalar("Date"))),
                field("overrideName", "overrideName", scalar("String")),
                field("overrideAvatar", "overrideAvatar", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("uuid", "uuid", notNull(scalar("String"))),
                        field("crop", "crop", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("x", "x", notNull(scalar("Int"))),
                                field("y", "y", notNull(scalar("Int"))),
                                field("w", "w", notNull(scalar("Int"))),
                                field("h", "h", notNull(scalar("Int")))
                            ))
                    )),
                field("sender", "sender", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("User", UserShortSelector)
                    ))),
                field("senderBadge", "senderBadge", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("UserBadge", UserBadgeSelector)
                    )),
                field("source", "source", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        inline("MessageSourceChat", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("chat", "chat", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    inline("PrivateRoom", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID")))
                                    )),
                                    inline("SharedRoom", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID")))
                                    ))
                                )))
                        ))
                    )),
                field("reactions", "reactions", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("user", "user", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            ))),
                        field("reaction", "reaction", notNull(scalar("String")))
                    ))))),
                field("sticker", "sticker", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        inline("ImageSticker", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("pack", "pack", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    inline("StickerPack", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("title", "title", notNull(scalar("String")))
                                    ))
                                ))),
                            field("image", "image", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    inline("ImageRef", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("uuid", "uuid", notNull(scalar("String")))
                                    ))
                                )))
                        ))
                    )))
            ))
        )

internal val StickerFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("ImageSticker", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("pack", "pack", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("title", "title", notNull(scalar("String")))
                    ))),
                field("image", "image", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("uuid", "uuid", notNull(scalar("String")))
                    )))
            ))
        )

internal val UserTinySelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("isYou", "isYou", notNull(scalar("Boolean"))),
            field("name", "name", notNull(scalar("String"))),
            field("firstName", "firstName", notNull(scalar("String"))),
            field("lastName", "lastName", scalar("String")),
            field("photo", "photo", scalar("String")),
            field("shortname", "shortname", scalar("String")),
            field("primaryOrganization", "primaryOrganization", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                ))
        )

internal val FullMessageSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("date", "date", notNull(scalar("Date"))),
            field("sender", "sender", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("User", UserShortSelector)
                ))),
            field("senderBadge", "senderBadge", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                )),
            field("message", "message", scalar("String")),
            field("fallback", "fallback", notNull(scalar("String"))),
            field("source", "source", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("MessageSourceChat", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("chat", "chat", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                inline("PrivateRoom", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("ID")))
                                )),
                                inline("SharedRoom", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("ID"))),
                                    field("isChannel", "isChannel", notNull(scalar("Boolean"))),
                                    field("membersCount", "membersCount", notNull(scalar("Int")))
                                ))
                            )))
                    ))
                )),
            field("spans", "spans", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("MessageSpan", SpanFragmentSelector)
                ))))),
            inline("GeneralMessage", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("overrideName", "overrideName", scalar("String")),
                field("overrideAvatar", "overrideAvatar", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("uuid", "uuid", notNull(scalar("String"))),
                        field("crop", "crop", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("x", "x", notNull(scalar("Int"))),
                                field("y", "y", notNull(scalar("Int"))),
                                field("w", "w", notNull(scalar("Int"))),
                                field("h", "h", notNull(scalar("Int")))
                            ))
                    )),
                field("edited", "edited", notNull(scalar("Boolean"))),
                field("commentsCount", "commentsCount", notNull(scalar("Int"))),
                field("attachments", "attachments", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("fallback", "fallback", notNull(scalar("String"))),
                        inline("MessageAttachmentFile", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("fileId", "fileId", notNull(scalar("String"))),
                            field("fileMetadata", "fileMetadata", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("name", "name", notNull(scalar("String"))),
                                    field("mimeType", "mimeType", scalar("String")),
                                    field("size", "size", notNull(scalar("Int"))),
                                    field("isImage", "isImage", notNull(scalar("Boolean"))),
                                    field("imageWidth", "imageWidth", scalar("Int")),
                                    field("imageHeight", "imageHeight", scalar("Int")),
                                    field("imageFormat", "imageFormat", scalar("String"))
                                ))),
                            field("filePreview", "filePreview", scalar("String"))
                        )),
                        inline("MessageRichAttachment", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("title", "title", scalar("String")),
                            field("subTitle", "subTitle", scalar("String")),
                            field("titleLink", "titleLink", scalar("String")),
                            field("titleLinkHostname", "titleLinkHostname", scalar("String")),
                            field("text", "text", scalar("String")),
                            field("icon", "icon", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("url", "url", notNull(scalar("String"))),
                                    field("metadata", "metadata", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("name", "name", notNull(scalar("String"))),
                                            field("mimeType", "mimeType", scalar("String")),
                                            field("size", "size", notNull(scalar("Int"))),
                                            field("isImage", "isImage", notNull(scalar("Boolean"))),
                                            field("imageWidth", "imageWidth", scalar("Int")),
                                            field("imageHeight", "imageHeight", scalar("Int")),
                                            field("imageFormat", "imageFormat", scalar("String"))
                                        ))
                                )),
                            field("image", "image", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("url", "url", notNull(scalar("String"))),
                                    field("metadata", "metadata", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("name", "name", notNull(scalar("String"))),
                                            field("mimeType", "mimeType", scalar("String")),
                                            field("size", "size", notNull(scalar("Int"))),
                                            field("isImage", "isImage", notNull(scalar("Boolean"))),
                                            field("imageWidth", "imageWidth", scalar("Int")),
                                            field("imageHeight", "imageHeight", scalar("Int")),
                                            field("imageFormat", "imageFormat", scalar("String"))
                                        ))
                                )),
                            field("socialImage", "socialImage", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("url", "url", notNull(scalar("String"))),
                                    field("metadata", "metadata", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("name", "name", notNull(scalar("String"))),
                                            field("mimeType", "mimeType", scalar("String")),
                                            field("size", "size", notNull(scalar("Int"))),
                                            field("isImage", "isImage", notNull(scalar("Boolean"))),
                                            field("imageWidth", "imageWidth", scalar("Int")),
                                            field("imageHeight", "imageHeight", scalar("Int")),
                                            field("imageFormat", "imageFormat", scalar("String"))
                                        ))
                                )),
                            field("imageFallback", "imageFallback", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("photo", "photo", notNull(scalar("String"))),
                                    field("text", "text", notNull(scalar("String")))
                                )),
                            field("keyboard", "keyboard", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("buttons", "buttons", notNull(list(list(notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("id", "id", notNull(scalar("ID"))),
                                            field("title", "title", notNull(scalar("String"))),
                                            field("style", "style", notNull(scalar("String"))),
                                            field("url", "url", scalar("String"))
                                        ))))))
                                )),
                            field("fallback", "fallback", notNull(scalar("String")))
                        ))
                    ))))),
                field("quotedMessages", "quotedMessages", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", QuotedMessageSelector)
                    ))))),
                field("reactions", "reactions", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("user", "user", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            ))),
                        field("reaction", "reaction", notNull(scalar("String")))
                    )))))
            )),
            inline("StickerMessage", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("overrideName", "overrideName", scalar("String")),
                field("overrideAvatar", "overrideAvatar", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("uuid", "uuid", notNull(scalar("String"))),
                        field("crop", "crop", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("x", "x", notNull(scalar("Int"))),
                                field("y", "y", notNull(scalar("Int"))),
                                field("w", "w", notNull(scalar("Int"))),
                                field("h", "h", notNull(scalar("Int")))
                            ))
                    )),
                field("date", "date", notNull(scalar("Date"))),
                field("commentsCount", "commentsCount", notNull(scalar("Int"))),
                field("sender", "sender", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("User", UserShortSelector)
                    ))),
                field("senderBadge", "senderBadge", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("UserBadge", UserBadgeSelector)
                    )),
                field("quotedMessages", "quotedMessages", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", QuotedMessageSelector)
                    ))))),
                field("reactions", "reactions", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("user", "user", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            ))),
                        field("reaction", "reaction", notNull(scalar("String")))
                    ))))),
                field("sticker", "sticker", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("Sticker", StickerFragmentSelector)
                    )))
            )),
            inline("ServiceMessage", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("overrideName", "overrideName", scalar("String")),
                field("overrideAvatar", "overrideAvatar", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("uuid", "uuid", notNull(scalar("String"))),
                        field("crop", "crop", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("x", "x", notNull(scalar("Int"))),
                                field("y", "y", notNull(scalar("Int"))),
                                field("w", "w", notNull(scalar("Int"))),
                                field("h", "h", notNull(scalar("Int")))
                            ))
                    )),
                field("serviceMetadata", "serviceMetadata", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        inline("InviteServiceMetadata", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("users", "users", list(notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("User", UserTinySelector)
                                )))),
                            field("invitedBy", "invitedBy", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("User", UserTinySelector)
                                )))
                        )),
                        inline("KickServiceMetadata", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("user", "user", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("User", UserTinySelector)
                                ))),
                            field("kickedBy", "kickedBy", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("User", UserTinySelector)
                                )))
                        )),
                        inline("TitleChangeServiceMetadata", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("title", "title", notNull(scalar("String")))
                        )),
                        inline("PhotoChangeServiceMetadata", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("photo", "photo", scalar("String"))
                        )),
                        inline("PostRespondServiceMetadata", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("respondType", "respondType", notNull(scalar("ID")))
                        ))
                    ))
            ))
        )

internal val MatchmakingProfileFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("chatCreated", "chatCreated", notNull(scalar("Boolean"))),
            field("user", "user", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("isYou", "isYou", notNull(scalar("Boolean"))),
                    field("name", "name", notNull(scalar("String"))),
                    field("photo", "photo", scalar("String")),
                    field("isBot", "isBot", notNull(scalar("Boolean"))),
                    field("primaryOrganization", "primaryOrganization", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("name", "name", notNull(scalar("String")))
                        ))
                ))),
            field("answers", "answers", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("TextMatchmakingAnswer", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("question", "question", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("title", "title", notNull(scalar("String"))),
                                field("subtitle", "subtitle", notNull(scalar("String")))
                            ))),
                        field("answer", "answer", notNull(scalar("String")))
                    )),
                    inline("MultiselectMatchmakingAnswer", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("question", "question", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("title", "title", notNull(scalar("String"))),
                                field("subtitle", "subtitle", notNull(scalar("String")))
                            ))),
                        field("tags", "tags", notNull(list(notNull(scalar("String")))))
                    ))
                )))))
        )

internal val MatchmakingRoomFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("enabled", "enabled", notNull(scalar("Boolean"))),
            field("questions", "questions", list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("TextMatchmakingQuestion", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("title", "title", notNull(scalar("String"))),
                        field("subtitle", "subtitle", notNull(scalar("String")))
                    )),
                    inline("MultiselectMatchmakingQuestion", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("title", "title", notNull(scalar("String"))),
                        field("subtitle", "subtitle", notNull(scalar("String"))),
                        field("tags", "tags", notNull(list(notNull(scalar("String")))))
                    ))
                )))),
            field("myProfile", "myProfile", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("MatchmakingProfile", MatchmakingProfileFragmentSelector)
                )),
            field("profiles", "profiles", list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("MatchmakingProfile", MatchmakingProfileFragmentSelector)
                ))))
        )

internal val RoomShortSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("PrivateRoom", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("user", "user", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("User", UserShortSelector)
                    ))),
                field("settings", "settings", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("mute", "mute", scalar("Boolean"))
                    ))),
                field("pinnedMessage", "pinnedMessage", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", FullMessageSelector)
                    )),
                field("myBadge", "myBadge", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("UserBadge", UserBadgeSelector)
                    ))
            )),
            inline("SharedRoom", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("kind", "kind", notNull(scalar("String"))),
                field("isChannel", "isChannel", notNull(scalar("Boolean"))),
                field("title", "title", notNull(scalar("String"))),
                field("photo", "photo", notNull(scalar("String"))),
                field("membership", "membership", notNull(scalar("String"))),
                field("role", "role", notNull(scalar("String"))),
                field("canEdit", "canEdit", notNull(scalar("Boolean"))),
                field("canSendMessage", "canSendMessage", notNull(scalar("Boolean"))),
                field("membersCount", "membersCount", notNull(scalar("Int"))),
                field("pinnedMessage", "pinnedMessage", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", FullMessageSelector)
                    )),
                field("matchmaking", "matchmaking", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("MatchmakingRoom", MatchmakingRoomFragmentSelector)
                    )),
                field("organization", "organization", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("Organization", OrganizationShortSelector)
                    )),
                field("settings", "settings", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("mute", "mute", scalar("Boolean"))
                    ))),
                field("myBadge", "myBadge", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("UserBadge", UserBadgeSelector)
                    ))
            ))
        )

internal val ChatUpdateFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("ChatMessageReceived", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("message", "message", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", FullMessageSelector)
                    ))),
                field("repeatKey", "repeatKey", scalar("String"))
            )),
            inline("ChatMessageUpdated", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("message", "message", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", FullMessageSelector)
                    )))
            )),
            inline("ChatMessageDeleted", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("message", "message", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    )))
            )),
            inline("ChatUpdated", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("chat", "chat", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("Room", RoomShortSelector)
                    )))
            )),
            inline("ChatLostAccess", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("lostAccess", "lostAccess", notNull(scalar("Boolean")))
            ))
        )

internal val CommentEntryFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("deleted", "deleted", notNull(scalar("Boolean"))),
            field("betaComment", "comment", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    fragment("ModernMessage", FullMessageSelector)
                ))),
            field("parentComment", "parentComment", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("betaComment", "comment", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("message", "message", scalar("String"))
                        ))),
                    field("id", "id", notNull(scalar("ID")))
                )),
            field("childComments", "childComments", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))))
        )

internal val CommentUpdateFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("CommentReceived", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("comment", "comment", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("CommentEntry", CommentEntryFragmentSelector)
                    )))
            )),
            inline("CommentUpdated", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("comment", "comment", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("CommentEntry", CommentEntryFragmentSelector)
                    )))
            ))
        )

internal val CommunitySearchSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("superAccountId", "superAccountId", notNull(scalar("ID"))),
            field("name", "name", notNull(scalar("String"))),
            field("photo", "photo", scalar("String")),
            field("isMine", "isMine", notNull(scalar("Boolean"))),
            field("about", "about", scalar("String")),
            field("status", "status", notNull(scalar("String"))),
            field("alphaFeatured", "featured", notNull(scalar("Boolean"))),
            field("membersCount", "membersCount", notNull(scalar("Int"))),
            field("betaPublicRoomsCount", "roomsCount", notNull(scalar("Int")))
        )

internal val ConferenceFullSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("startTime", "startTime", scalar("Date")),
            field("peers", "peers", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))),
                    field("connection", "connection", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("state", "state", notNull(scalar("String"))),
                            field("sdp", "sdp", scalar("String")),
                            field("ice", "ice", notNull(list(notNull(scalar("String")))))
                        ))
                ))))),
            field("iceServers", "iceServers", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("urls", "urls", notNull(list(notNull(scalar("String"))))),
                    field("username", "username", scalar("String")),
                    field("credential", "credential", scalar("String"))
                )))))
        )

internal val ConferenceShortSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("startTime", "startTime", scalar("Date")),
            field("iceServers", "iceServers", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("urls", "urls", notNull(list(notNull(scalar("String"))))),
                    field("username", "username", scalar("String")),
                    field("credential", "credential", scalar("String"))
                )))))
        )

internal val DialogMessageSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("date", "date", notNull(scalar("Date"))),
            field("sender", "sender", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("name", "name", notNull(scalar("String"))),
                    field("photo", "photo", scalar("String")),
                    field("firstName", "firstName", notNull(scalar("String")))
                ))),
            field("message", "message", scalar("String")),
            field("fallback", "fallback", notNull(scalar("String"))),
            inline("GeneralMessage", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("quotedMessages", "quotedMessages", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    )))))
            ))
        )

internal val DialogFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("cid", "cid", notNull(scalar("ID"))),
            field("fid", "fid", notNull(scalar("ID"))),
            field("kind", "kind", notNull(scalar("String"))),
            field("isChannel", "isChannel", notNull(scalar("Boolean"))),
            field("title", "title", notNull(scalar("String"))),
            field("photo", "photo", notNull(scalar("String"))),
            field("unreadCount", "unreadCount", notNull(scalar("Int"))),
            field("isMuted", "isMuted", notNull(scalar("Boolean"))),
            field("haveMention", "haveMention", notNull(scalar("Boolean"))),
            field("alphaTopMessage", "topMessage", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("ModernMessage", DialogMessageSelector)
                ))
        )

internal val DialogUpdateFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("DialogMessageReceived", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("cid", "cid", notNull(scalar("ID"))),
                field("unread", "unread", notNull(scalar("Int"))),
                field("globalUnread", "globalUnread", notNull(scalar("Int"))),
                field("alphaMessage", "message", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", DialogMessageSelector),
                        inline("ServiceMessage", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("serviceMetadata", "serviceMetadata", obj(
                                    field("__typename", "__typename", notNull(scalar("String")))
                                ))
                        ))
                    ))),
                field("haveMention", "haveMention", notNull(scalar("Boolean"))),
                field("silent", "silent", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("mobile", "mobile", notNull(scalar("Boolean"))),
                        field("desktop", "desktop", notNull(scalar("Boolean")))
                    ))),
                field("showNotification", "showNotification", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("mobile", "mobile", notNull(scalar("Boolean"))),
                        field("desktop", "desktop", notNull(scalar("Boolean")))
                    )))
            )),
            inline("DialogMessageUpdated", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("cid", "cid", notNull(scalar("ID"))),
                field("alphaMessage", "message", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", DialogMessageSelector)
                    ))),
                field("haveMention", "haveMention", notNull(scalar("Boolean")))
            )),
            inline("DialogMessageDeleted", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("cid", "cid", notNull(scalar("ID"))),
                field("alphaMessage", "message", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", DialogMessageSelector)
                    ))),
                field("alphaPrevMessage", "prevMessage", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", DialogMessageSelector)
                    )),
                field("unread", "unread", notNull(scalar("Int"))),
                field("globalUnread", "globalUnread", notNull(scalar("Int"))),
                field("haveMention", "haveMention", notNull(scalar("Boolean")))
            )),
            inline("DialogMessageRead", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("cid", "cid", notNull(scalar("ID"))),
                field("mid", "mid", scalar("ID")),
                field("unread", "unread", notNull(scalar("Int"))),
                field("globalUnread", "globalUnread", notNull(scalar("Int"))),
                field("haveMention", "haveMention", notNull(scalar("Boolean")))
            )),
            inline("DialogMuteChanged", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("cid", "cid", notNull(scalar("ID"))),
                field("mute", "mute", notNull(scalar("Boolean")))
            )),
            inline("DialogPeerUpdated", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("cid", "cid", notNull(scalar("ID"))),
                field("peer", "peer", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        inline("PrivateRoom", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("user", "user", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("ID"))),
                                    field("name", "name", notNull(scalar("String"))),
                                    field("photo", "photo", scalar("String"))
                                )))
                        )),
                        inline("SharedRoom", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("title", "title", notNull(scalar("String"))),
                            field("photo", "photo", notNull(scalar("String")))
                        ))
                    )))
            )),
            inline("DialogDeleted", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("cid", "cid", notNull(scalar("ID"))),
                field("globalUnread", "globalUnread", notNull(scalar("Int")))
            )),
            inline("DialogBump", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("cid", "cid", notNull(scalar("ID"))),
                field("globalUnread", "globalUnread", notNull(scalar("Int"))),
                field("unread", "unread", notNull(scalar("Int"))),
                field("topMessage", "topMessage", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", DialogMessageSelector),
                        inline("ServiceMessage", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("serviceMetadata", "serviceMetadata", obj(
                                    field("__typename", "__typename", notNull(scalar("String")))
                                ))
                        ))
                    )),
                field("haveMention", "haveMention", notNull(scalar("Boolean")))
            ))
        )

internal val FeedChannelFullSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("title", "title", notNull(scalar("String"))),
            field("about", "about", scalar("String")),
            field("photo", "photo", scalar("String")),
            field("subscribed", "subscribed", notNull(scalar("Boolean"))),
            field("myRole", "myRole", notNull(scalar("String"))),
            field("subscribersCount", "subscribersCount", notNull(scalar("Int"))),
            field("shortname", "shortname", scalar("String")),
            field("isGlobal", "isGlobal", notNull(scalar("Boolean"))),
            field("socialImage", "socialImage", scalar("String")),
            field("postsCount", "postsCount", notNull(scalar("Int")))
        )

internal val FeedPostAuthorFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("User", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                fragment("User", UserShortSelector)
            ))
        )

internal val FeedPostSourceFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("FeedChannel", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                fragment("FeedChannel", FeedChannelFullSelector)
            ))
        )

internal val SlideFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("TextSlide", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("text", "text", notNull(scalar("String"))),
                field("spans", "spans", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("MessageSpan", SpanFragmentSelector)
                    ))))),
                field("cover", "cover", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("url", "url", notNull(scalar("String"))),
                        field("metadata", "metadata", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("name", "name", notNull(scalar("String"))),
                                field("mimeType", "mimeType", scalar("String")),
                                field("size", "size", notNull(scalar("Int"))),
                                field("isImage", "isImage", notNull(scalar("Boolean"))),
                                field("imageWidth", "imageWidth", scalar("Int")),
                                field("imageHeight", "imageHeight", scalar("Int")),
                                field("imageFormat", "imageFormat", scalar("String"))
                            ))
                    )),
                field("coverAlign", "coverAlign", scalar("String")),
                field("attachments", "attachments", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        inline("User", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )),
                        inline("SharedRoom", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("kind", "kind", notNull(scalar("String"))),
                            field("title", "title", notNull(scalar("String"))),
                            field("photo", "roomPhoto", notNull(scalar("String"))),
                            field("membersCount", "membersCount", notNull(scalar("Int"))),
                            field("membership", "membership", notNull(scalar("String"))),
                            field("canSendMessage", "canSendMessage", notNull(scalar("Boolean"))),
                            field("organization", "organization", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("ID"))),
                                    field("name", "name", notNull(scalar("String"))),
                                    field("photo", "photo", scalar("String"))
                                ))
                        )),
                        inline("Organization", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Organization", OrganizationShortSelector)
                        ))
                    )))))
            ))
        )

internal val FeedItemFullSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("FeedPost", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("date", "date", notNull(scalar("Date"))),
                field("author", "author", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("FeedPostAuthor", FeedPostAuthorFragmentSelector)
                    ))),
                field("source", "source", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("FeedPostSource", FeedPostSourceFragmentSelector)
                    )),
                field("edited", "edited", notNull(scalar("Boolean"))),
                field("canEdit", "canEdit", notNull(scalar("Boolean"))),
                field("commentsCount", "commentsCount", notNull(scalar("Int"))),
                field("message", "message", scalar("String")),
                field("fallback", "fallback", notNull(scalar("String"))),
                field("reactions", "reactions", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("user", "user", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            ))),
                        field("reaction", "reaction", notNull(scalar("String")))
                    ))))),
                field("slides", "slides", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("Slide", SlideFragmentSelector)
                    )))))
            ))
        )

internal val FeedUpdateFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("FeedItemReceived", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("item", "item", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("FeedItem", FeedItemFullSelector)
                    )))
            )),
            inline("FeedItemUpdated", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("item", "item", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("FeedItem", FeedItemFullSelector)
                    )))
            )),
            inline("FeedItemDeleted", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("item", "item", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("FeedItem", FeedItemFullSelector)
                    )))
            )),
            inline("FeedRebuildNeeded", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("homeFeed", "feed", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("items", "items", notNull(list(notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("FeedItem", FeedItemFullSelector)
                            ))))),
                        field("cursor", "cursor", scalar("String"))
                    )))
            ))
        )

internal val NotificationFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("text", "text", scalar("String")),
            field("content", "content", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("NewCommentNotification", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("comment", "comment", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("CommentEntry", CommentEntryFragmentSelector)
                            ))),
                        field("peer", "peer", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("peerRoot", "peerRoot", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        inline("CommentPeerRootMessage", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("message", "message", notNull(obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    inline("GeneralMessage", obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("fallback", "fallback", notNull(scalar("String"))),
                                                        field("message", "message", scalar("String")),
                                                        field("sender", "sender", notNull(obj(
                                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                                field("id", "id", notNull(scalar("ID"))),
                                                                field("name", "name", notNull(scalar("String")))
                                                            ))),
                                                        field("senderBadge", "senderBadge", obj(
                                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                                fragment("UserBadge", UserBadgeSelector)
                                                            ))
                                                    ))
                                                ))),
                                            field("chat", "chat", notNull(obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    fragment("Room", RoomNanoSelector)
                                                )))
                                        )),
                                        inline("CommentPeerRootFeedItem", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("item", "item", notNull(obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    fragment("FeedItem", FeedItemFullSelector)
                                                )))
                                        ))
                                    ))),
                                field("subscription", "subscription", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("type", "type", scalar("String"))
                                    ))
                            )))
                    )),
                    inline("NewMatchmakingProfilesNotification", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("room", "room", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("peer", "peer", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        inline("SharedRoom", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            fragment("Room", RoomNanoSelector)
                                        ))
                                    )))
                            ))),
                        field("profiles", "profiles", notNull(list(notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("MatchmakingProfile", MatchmakingProfileFragmentSelector)
                            )))))
                    ))
                )))))
        )

internal val NotificationCenterUpdateFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("NotificationReceived", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("center", "center", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("unread", "unread", notNull(scalar("Int")))
                    ))),
                field("notification", "notification", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("Notification", NotificationFragmentSelector)
                    )))
            )),
            inline("NotificationUpdated", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("center", "center", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("unread", "unread", notNull(scalar("Int")))
                    ))),
                field("notification", "notification", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("Notification", NotificationFragmentSelector)
                    )))
            )),
            inline("NotificationDeleted", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("center", "center", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("unread", "unread", notNull(scalar("Int")))
                    ))),
                field("notification", "notification", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    )))
            )),
            inline("NotificationRead", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("center", "center", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("unread", "unread", notNull(scalar("Int")))
                    )))
            )),
            inline("NotificationContentUpdated", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("content", "content", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        inline("UpdatedNotificationContentComment", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("peer", "peer", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("peerRoot", "peerRoot", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            inline("CommentPeerRootMessage", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("message", "message", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        inline("GeneralMessage", obj(
                                                            field("__typename", "__typename", notNull(scalar("String"))),
                                                            field("id", "id", notNull(scalar("ID"))),
                                                            field("fallback", "fallback", notNull(scalar("String"))),
                                                            field("message", "message", scalar("String")),
                                                            field("sender", "sender", notNull(obj(
                                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                                    field("id", "id", notNull(scalar("ID"))),
                                                                    field("name", "name", notNull(scalar("String")))
                                                                ))),
                                                            field("senderBadge", "senderBadge", obj(
                                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                                    fragment("UserBadge", UserBadgeSelector)
                                                                ))
                                                        ))
                                                    ))),
                                                field("chat", "chat", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        fragment("Room", RoomNanoSelector)
                                                    )))
                                            )),
                                            inline("CommentPeerRootFeedItem", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("item", "item", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        fragment("FeedItem", FeedItemFullSelector)
                                                    )))
                                            ))
                                        ))),
                                    field("id", "id", notNull(scalar("ID"))),
                                    field("subscription", "subscription", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("type", "type", scalar("String"))
                                        ))
                                ))),
                            field("comment", "comment", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("CommentEntry", CommentEntryFragmentSelector)
                                ))
                        ))
                    )))
            ))
        )

internal val UserFullSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("name", "name", notNull(scalar("String"))),
            field("firstName", "firstName", notNull(scalar("String"))),
            field("lastName", "lastName", scalar("String")),
            field("photo", "photo", scalar("String")),
            field("phone", "phone", scalar("String")),
            field("email", "email", scalar("String")),
            field("website", "website", scalar("String")),
            field("about", "about", scalar("String")),
            field("location", "location", scalar("String")),
            field("isBot", "isBot", notNull(scalar("Boolean"))),
            field("isYou", "isYou", notNull(scalar("Boolean"))),
            field("online", "online", notNull(scalar("Boolean"))),
            field("lastSeen", "lastSeen", scalar("String")),
            field("linkedin", "linkedin", scalar("String")),
            field("instagram", "instagram", scalar("String")),
            field("twitter", "twitter", scalar("String")),
            field("facebook", "facebook", scalar("String")),
            field("shortname", "shortname", scalar("String")),
            field("audienceSize", "audienceSize", notNull(scalar("Int"))),
            field("primaryOrganization", "primaryOrganization", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                ))
        )

internal val OrganizationFullSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("superAccountId", "superAccountId", notNull(scalar("ID"))),
            field("isMine", "isMine", notNull(scalar("Boolean"))),
            field("alphaIsPrivate", "isPrivate", notNull(scalar("Boolean"))),
            field("betaIsOwner", "isOwner", notNull(scalar("Boolean"))),
            field("betaIsAdmin", "isAdmin", notNull(scalar("Boolean"))),
            field("alphaFeatured", "featured", notNull(scalar("Boolean"))),
            field("alphaIsCommunity", "isCommunity", notNull(scalar("Boolean"))),
            field("name", "name", notNull(scalar("String"))),
            field("photo", "photo", scalar("String")),
            field("shortname", "shortname", scalar("String")),
            field("website", "website", scalar("String")),
            field("about", "about", scalar("String")),
            field("twitter", "twitter", scalar("String")),
            field("facebook", "facebook", scalar("String")),
            field("linkedin", "linkedin", scalar("String")),
            field("instagram", "instagram", scalar("String")),
            field("membersCount", "membersCount", notNull(scalar("Int"))),
            field("alphaOrganizationMembers", "members", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("role", "role", notNull(scalar("String"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserFullSelector)
                        )))
                ))))),
            field("alphaOrganizationMemberRequests", "requests", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("role", "role", notNull(scalar("String"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserFullSelector)
                        )))
                )))))
        )

internal val OrganizationMediumSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("name", "name", notNull(scalar("String"))),
            field("photo", "photo", scalar("String")),
            field("isMine", "isMine", notNull(scalar("Boolean"))),
            field("membersCount", "membersCount", notNull(scalar("Int"))),
            field("shortname", "shortname", scalar("String")),
            field("about", "about", scalar("String")),
            field("betaIsOwner", "isOwner", notNull(scalar("Boolean"))),
            field("betaIsAdmin", "isAdmin", notNull(scalar("Boolean"))),
            field("alphaIsCommunity", "isCommunity", notNull(scalar("Boolean")))
        )

internal val OrganizationProfileFullSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("name", "name", notNull(scalar("String"))),
            field("photoRef", "photoRef", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("uuid", "uuid", notNull(scalar("String"))),
                    field("crop", "crop", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("x", "x", notNull(scalar("Int"))),
                            field("y", "y", notNull(scalar("Int"))),
                            field("w", "w", notNull(scalar("Int"))),
                            field("h", "h", notNull(scalar("Int")))
                        ))
                )),
            field("website", "website", scalar("String")),
            field("websiteTitle", "websiteTitle", scalar("String")),
            field("about", "about", scalar("String")),
            field("twitter", "twitter", scalar("String")),
            field("facebook", "facebook", scalar("String")),
            field("linkedin", "linkedin", scalar("String")),
            field("instagram", "instagram", scalar("String")),
            field("shortname", "shortname", scalar("String")),
            field("alphaIsPrivate", "private", notNull(scalar("Boolean"))),
            field("alphaFeatured", "featured", notNull(scalar("Boolean"))),
            field("alphaPublished", "published", notNull(scalar("Boolean"))),
            field("alphaEditorial", "editorial", notNull(scalar("Boolean")))
        )

internal val OrganizationSearchSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("superAccountId", "superAccountId", notNull(scalar("ID"))),
            field("name", "name", notNull(scalar("String"))),
            field("photo", "photo", scalar("String")),
            field("isMine", "isMine", notNull(scalar("Boolean"))),
            field("about", "about", scalar("String")),
            field("status", "status", notNull(scalar("String"))),
            field("membersCount", "membersCount", notNull(scalar("Int"))),
            field("alphaFeatured", "featured", notNull(scalar("Boolean"))),
            field("alphaOrganizationMembers", "members", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("name", "name", notNull(scalar("String"))),
                            field("photo", "photo", scalar("String"))
                        )))
                )))))
        )

internal val OrganizationWithoutMembersFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("superAccountId", "superAccountId", notNull(scalar("ID"))),
            field("isMine", "isMine", notNull(scalar("Boolean"))),
            field("alphaIsPrivate", "isPrivate", notNull(scalar("Boolean"))),
            field("betaIsOwner", "isOwner", notNull(scalar("Boolean"))),
            field("betaIsAdmin", "isAdmin", notNull(scalar("Boolean"))),
            field("alphaFeatured", "featured", notNull(scalar("Boolean"))),
            field("alphaIsCommunity", "isCommunity", notNull(scalar("Boolean"))),
            field("name", "name", notNull(scalar("String"))),
            field("photo", "photo", scalar("String")),
            field("shortname", "shortname", scalar("String")),
            field("website", "website", scalar("String")),
            field("about", "about", scalar("String")),
            field("twitter", "twitter", scalar("String")),
            field("facebook", "facebook", scalar("String")),
            field("linkedin", "linkedin", scalar("String")),
            field("instagram", "instagram", scalar("String")),
            field("membersCount", "membersCount", notNull(scalar("Int"))),
            field("alphaOrganizationMemberRequests", "requests", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("role", "role", notNull(scalar("String"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserFullSelector)
                        )))
                ))))),
            field("betaPublicRoomsCount", "roomsCount", notNull(scalar("Int")))
        )

internal val PlatformNotificationSettingsFullSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("direct", "direct", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("showNotification", "showNotification", notNull(scalar("Boolean"))),
                    field("sound", "sound", notNull(scalar("Boolean")))
                ))),
            field("secretChat", "secretChat", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("showNotification", "showNotification", notNull(scalar("Boolean"))),
                    field("sound", "sound", notNull(scalar("Boolean")))
                ))),
            field("organizationChat", "organizationChat", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("showNotification", "showNotification", notNull(scalar("Boolean"))),
                    field("sound", "sound", notNull(scalar("Boolean")))
                ))),
            field("communityChat", "communityChat", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("showNotification", "showNotification", notNull(scalar("Boolean"))),
                    field("sound", "sound", notNull(scalar("Boolean")))
                ))),
            field("comments", "comments", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("showNotification", "showNotification", notNull(scalar("Boolean"))),
                    field("sound", "sound", notNull(scalar("Boolean")))
                ))),
            field("notificationPreview", "notificationPreview", notNull(scalar("String")))
        )

internal val RoomFullSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("PrivateRoom", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("user", "user", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("User", UserShortSelector)
                    ))),
                field("settings", "settings", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("mute", "mute", scalar("Boolean"))
                    ))),
                field("pinnedMessage", "pinnedMessage", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", FullMessageSelector)
                    )),
                field("myBadge", "myBadge", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("UserBadge", UserBadgeSelector)
                    ))
            )),
            inline("SharedRoom", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("kind", "kind", notNull(scalar("String"))),
                field("isChannel", "isChannel", notNull(scalar("Boolean"))),
                field("title", "title", notNull(scalar("String"))),
                field("photo", "photo", notNull(scalar("String"))),
                field("socialImage", "socialImage", scalar("String")),
                field("description", "description", scalar("String")),
                field("shortname", "shortname", scalar("String")),
                field("organization", "organization", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("Organization", OrganizationMediumSelector)
                    )),
                field("membership", "membership", notNull(scalar("String"))),
                field("role", "role", notNull(scalar("String"))),
                field("membersCount", "membersCount", notNull(scalar("Int"))),
                field("featuredMembersCount", "featuredMembersCount", notNull(scalar("Int"))),
                field("onlineMembersCount", "onlineMembersCount", notNull(scalar("Int"))),
                field("previewMembers", "previewMembers", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("photo", "photo", scalar("String")),
                        field("name", "name", notNull(scalar("String")))
                    ))))),
                field("members", "members", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("role", "role", notNull(scalar("String"))),
                        field("membership", "membership", notNull(scalar("String"))),
                        field("user", "user", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            ))),
                        field("canKick", "canKick", notNull(scalar("Boolean"))),
                        field("badge", "badge", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            ))
                    ))))),
                field("requests", "requests", list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("user", "user", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            )))
                    )))),
                field("settings", "settings", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("mute", "mute", scalar("Boolean"))
                    ))),
                field("canEdit", "canEdit", notNull(scalar("Boolean"))),
                field("canSendMessage", "canSendMessage", notNull(scalar("Boolean"))),
                field("welcomeMessage", "welcomeMessage", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("isOn", "isOn", notNull(scalar("Boolean"))),
                        field("sender", "sender", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("name", "name", notNull(scalar("String")))
                            )),
                        field("message", "message", scalar("String"))
                    )),
                field("matchmaking", "matchmaking", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("MatchmakingRoom", MatchmakingRoomFragmentSelector)
                    )),
                field("pinnedMessage", "pinnedMessage", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", FullMessageSelector)
                    )),
                field("myBadge", "myBadge", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("UserBadge", UserBadgeSelector)
                    )),
                field("isPremium", "isPremium", notNull(scalar("Boolean"))),
                field("premiumPassIsActive", "premiumPassIsActive", notNull(scalar("Boolean"))),
                field("premiumSubscription", "premiumSubscription", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("state", "state", notNull(scalar("String")))
                    )),
                field("premiumSettings", "premiumSettings", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("price", "price", notNull(scalar("Int"))),
                        field("interval", "interval", scalar("String"))
                    )),
                field("owner", "owner", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    ))
            ))
        )

internal val RoomFullWithoutMembersSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("PrivateRoom", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("user", "user", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("User", UserShortSelector)
                    ))),
                field("settings", "settings", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("mute", "mute", scalar("Boolean"))
                    ))),
                field("myBadge", "myBadge", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("UserBadge", UserBadgeSelector)
                    ))
            )),
            inline("SharedRoom", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("kind", "kind", notNull(scalar("String"))),
                field("isChannel", "isChannel", notNull(scalar("Boolean"))),
                field("title", "title", notNull(scalar("String"))),
                field("photo", "photo", notNull(scalar("String"))),
                field("socialImage", "socialImage", scalar("String")),
                field("description", "description", scalar("String")),
                field("shortname", "shortname", scalar("String")),
                field("organization", "organization", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("Organization", OrganizationMediumSelector)
                    )),
                field("membership", "membership", notNull(scalar("String"))),
                field("role", "role", notNull(scalar("String"))),
                field("membersCount", "membersCount", notNull(scalar("Int"))),
                field("featuredMembersCount", "featuredMembersCount", notNull(scalar("Int"))),
                field("settings", "settings", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("mute", "mute", scalar("Boolean"))
                    ))),
                field("matchmaking", "matchmaking", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("MatchmakingRoom", MatchmakingRoomFragmentSelector)
                    )),
                field("canEdit", "canEdit", notNull(scalar("Boolean"))),
                field("canSendMessage", "canSendMessage", notNull(scalar("Boolean"))),
                field("welcomeMessage", "welcomeMessage", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("isOn", "isOn", notNull(scalar("Boolean"))),
                        field("sender", "sender", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("name", "name", notNull(scalar("String")))
                            )),
                        field("message", "message", scalar("String"))
                    )),
                field("pinnedMessage", "pinnedMessage", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", FullMessageSelector)
                    )),
                field("myBadge", "myBadge", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("UserBadge", UserBadgeSelector)
                    ))
            ))
        )

internal val SessionStateFullSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("isLoggedIn", "isLoggedIn", notNull(scalar("Boolean"))),
            field("isActivated", "isActivated", notNull(scalar("Boolean"))),
            field("isProfileCreated", "isProfileCreated", notNull(scalar("Boolean"))),
            field("isAccountActivated", "isAccountActivated", notNull(scalar("Boolean"))),
            field("isAccountExists", "isAccountExists", notNull(scalar("Boolean"))),
            field("isAccountPicked", "isAccountPicked", notNull(scalar("Boolean"))),
            field("isCompleted", "isCompleted", notNull(scalar("Boolean"))),
            field("isBlocked", "isBlocked", notNull(scalar("Boolean")))
        )

internal val SettingsFullSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("primaryEmail", "primaryEmail", notNull(scalar("String"))),
            field("emailFrequency", "emailFrequency", notNull(scalar("String"))),
            field("excludeMutedChats", "excludeMutedChats", notNull(scalar("Boolean"))),
            field("countUnreadChats", "countUnreadChats", notNull(scalar("Boolean"))),
            field("desktop", "desktop", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("PlatformNotificationSettings", PlatformNotificationSettingsFullSelector)
                ))),
            field("mobile", "mobile", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("PlatformNotificationSettings", PlatformNotificationSettingsFullSelector)
                )))
        )

internal val SharedRoomViewSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("title", "title", notNull(scalar("String"))),
            field("photo", "photo", notNull(scalar("String"))),
            field("membersCount", "membersCount", notNull(scalar("Int"))),
            field("photo", "photo", notNull(scalar("String")))
        )

internal val StickerPackFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("title", "title", notNull(scalar("String"))),
            field("stickers", "stickers", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Sticker", StickerFragmentSelector)
                )))))
        )

internal val TinyMessageSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("date", "date", notNull(scalar("Date"))),
            field("sender", "sender", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("User", UserTinySelector)
                ))),
            field("senderBadge", "senderBadge", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                )),
            field("message", "message", scalar("String")),
            field("fallback", "fallback", notNull(scalar("String"))),
            inline("GeneralMessage", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("overrideName", "overrideName", scalar("String")),
                field("overrideAvatar", "overrideAvatar", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("uuid", "uuid", notNull(scalar("String"))),
                        field("crop", "crop", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("x", "x", notNull(scalar("Int"))),
                                field("y", "y", notNull(scalar("Int"))),
                                field("w", "w", notNull(scalar("Int"))),
                                field("h", "h", notNull(scalar("Int")))
                            ))
                    )),
                field("isMentioned", "isMentioned", notNull(scalar("Boolean"))),
                field("commentsCount", "commentsCount", notNull(scalar("Int"))),
                field("attachments", "attachments", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("fallback", "fallback", notNull(scalar("String"))),
                        inline("MessageAttachmentFile", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("fileId", "fileId", notNull(scalar("String"))),
                            field("fileMetadata", "fileMetadata", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("isImage", "isImage", notNull(scalar("Boolean"))),
                                    field("imageFormat", "imageFormat", scalar("String"))
                                ))),
                            field("filePreview", "filePreview", scalar("String"))
                        ))
                    ))))),
                field("quotedMessages", "quotedMessages", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    )))))
            ))
        )

internal val UserNanoSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("name", "name", notNull(scalar("String"))),
            field("firstName", "firstName", notNull(scalar("String"))),
            field("lastName", "lastName", scalar("String")),
            field("photo", "photo", scalar("String")),
            field("online", "online", notNull(scalar("Boolean")))
        )

internal val WalletTransactionFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("status", "status", notNull(scalar("String"))),
            field("date", "date", notNull(scalar("String"))),
            field("operation", "operation", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("WalletTransactionDeposit", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("amount", "amount", notNull(scalar("Int"))),
                        field("payment", "payment", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("status", "status", notNull(scalar("String"))),
                                field("card", "card", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("brand", "brand", notNull(scalar("String"))),
                                        field("last4", "last4", notNull(scalar("String")))
                                    )),
                                field("intent", "intent", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("clientSecret", "clientSecret", notNull(scalar("String")))
                                    ))
                            ))
                    )),
                    inline("WalletTransactionSubscription", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("amount", "amount", notNull(scalar("Int"))),
                        field("subscription", "subscription", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("interval", "interval", notNull(scalar("String"))),
                                field("amount", "amount", notNull(scalar("Int"))),
                                field("product", "product", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        inline("WalletSubscriptionProductGroup", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("group", "group", notNull(obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    field("id", "id", notNull(scalar("ID"))),
                                                    field("title", "title", notNull(scalar("String"))),
                                                    field("photo", "photo", notNull(scalar("String")))
                                                )))
                                        )),
                                        inline("WalletSubscriptionProductDonation", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("user", "user", notNull(obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    field("id", "id", notNull(scalar("ID"))),
                                                    field("name", "name", notNull(scalar("String"))),
                                                    field("photo", "photo", scalar("String"))
                                                )))
                                        ))
                                    )))
                            ))),
                        field("payment", "payment", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("status", "status", notNull(scalar("String"))),
                                field("intent", "intent", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("clientSecret", "clientSecret", notNull(scalar("String")))
                                    )),
                                field("card", "card", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("brand", "brand", notNull(scalar("String"))),
                                        field("last4", "last4", notNull(scalar("String")))
                                    ))
                            ))
                    )),
                    inline("WalletTransactionTransferOut", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("walletAmount", "walletAmount", notNull(scalar("Int"))),
                        field("chargeAmount", "chargeAmount", notNull(scalar("Int"))),
                        field("payment", "payment", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("status", "status", notNull(scalar("String"))),
                                field("card", "card", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("brand", "brand", notNull(scalar("String"))),
                                        field("last4", "last4", notNull(scalar("String")))
                                    )),
                                field("intent", "intent", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("clientSecret", "clientSecret", notNull(scalar("String")))
                                    ))
                            )),
                        field("toUser", "toUser", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            )))
                    )),
                    inline("WalletTransactionTransferIn", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("amount", "amount", notNull(scalar("Int"))),
                        field("payment", "payment", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("status", "status", notNull(scalar("String"))),
                                field("card", "card", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("brand", "brand", notNull(scalar("String"))),
                                        field("last4", "last4", notNull(scalar("String")))
                                    )),
                                field("intent", "intent", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("clientSecret", "clientSecret", notNull(scalar("String")))
                                    ))
                            )),
                        field("fromUser", "fromUser", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            )))
                    ))
                )))
        )

internal val WalletUpdateFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("WalletUpdateBalance", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("amount", "amount", notNull(scalar("Int")))
            )),
            inline("WalletUpdateLocked", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("isLocked", "isLocked", notNull(scalar("Boolean")))
            )),
            inline("WalletUpdateTransactionSuccess", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("transaction", "transaction", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("WalletTransaction", WalletTransactionFragmentSelector)
                    )))
            )),
            inline("WalletUpdateTransactionCanceled", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("transaction", "transaction", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("WalletTransaction", WalletTransactionFragmentSelector)
                    )))
            )),
            inline("WalletUpdateTransactionPending", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("transaction", "transaction", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("WalletTransaction", WalletTransactionFragmentSelector)
                    )))
            )),
            inline("WalletUpdatePaymentStatus", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("payment", "payment", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("status", "status", notNull(scalar("String"))),
                        field("intent", "intent", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("clientSecret", "clientSecret", notNull(scalar("String")))
                            )),
                        field("card", "card", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("brand", "brand", notNull(scalar("String"))),
                                field("last4", "last4", notNull(scalar("String")))
                            ))
                    )))
            ))
        )
