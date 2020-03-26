private let AppChatSelector = obj(
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

private let AppFullSelector = obj(
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

private let OrganizationShortSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("name", "name", notNull(scalar("String"))),
            field("photo", "photo", scalar("String")),
            field("shortname", "shortname", scalar("String")),
            field("about", "about", scalar("String")),
            field("alphaIsCommunity", "isCommunity", notNull(scalar("Boolean"))),
            field("membersCount", "membersCount", notNull(scalar("Int")))
        )

private let UserShortSelector = obj(
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

private let UserBadgeSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("name", "name", notNull(scalar("String"))),
            field("verified", "verified", notNull(scalar("Boolean")))
        )

private let UserForMentionSelector = obj(
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

private let RoomSharedNanoSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("kind", "kind", notNull(scalar("String"))),
            field("isChannel", "isChannel", notNull(scalar("Boolean"))),
            field("isPremium", "isPremium", notNull(scalar("Boolean"))),
            field("title", "title", notNull(scalar("String"))),
            field("photo", "roomPhoto", notNull(scalar("String"))),
            field("membersCount", "membersCount", notNull(scalar("Int"))),
            field("settings", "settings", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("mute", "mute", scalar("Boolean"))
                )))
        )

private let RoomNanoSelector = obj(
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

private let SpanFragmentSelector = obj(
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

private let QuotedMessageSelector = obj(
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

private let StickerFragmentSelector = obj(
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

private let UserTinySelector = obj(
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

private let FullMessageSelector = obj(
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

private let MatchmakingProfileFragmentSelector = obj(
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

private let MatchmakingRoomFragmentSelector = obj(
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

private let RoomShortSelector = obj(
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
                field("isPremium", "isPremium", notNull(scalar("Boolean"))),
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
                    )),
                field("owner", "owner", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("firstName", "firstName", notNull(scalar("String")))
                    ))
            ))
        )

private let ChatUpdateFragmentSelector = obj(
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

private let CommentEntryFragmentSelector = obj(
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

private let CommentUpdateFragmentSelector = obj(
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

private let CommunitySearchSelector = obj(
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

private let ConferenceFullSelector = obj(
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

private let ConferenceShortSelector = obj(
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

private let DialogMessageSelector = obj(
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

private let DialogFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("cid", "cid", notNull(scalar("ID"))),
            field("fid", "fid", notNull(scalar("ID"))),
            field("kind", "kind", notNull(scalar("String"))),
            field("isChannel", "isChannel", notNull(scalar("Boolean"))),
            field("isPremium", "isPremium", notNull(scalar("Boolean"))),
            field("title", "title", notNull(scalar("String"))),
            field("photo", "photo", notNull(scalar("String"))),
            field("unreadCount", "unreadCount", notNull(scalar("Int"))),
            field("isMuted", "isMuted", notNull(scalar("Boolean"))),
            field("haveMention", "haveMention", notNull(scalar("Boolean"))),
            field("alphaTopMessage", "topMessage", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("ModernMessage", DialogMessageSelector)
                )),
            field("membership", "membership", notNull(scalar("String")))
        )

private let DialogUpdateFragmentSelector = obj(
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
                    ))),
                field("membership", "membership", notNull(scalar("String")))
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
                field("haveMention", "haveMention", notNull(scalar("Boolean"))),
                field("membership", "membership", notNull(scalar("String")))
            ))
        )

private let DiscoverSharedRoomSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("kind", "kind", notNull(scalar("String"))),
            field("title", "title", notNull(scalar("String"))),
            field("photo", "photo", notNull(scalar("String"))),
            field("membersCount", "membersCount", notNull(scalar("Int"))),
            field("membership", "membership", notNull(scalar("String"))),
            field("organization", "organization", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("name", "name", notNull(scalar("String"))),
                    field("photo", "photo", scalar("String"))
                )),
            field("premiumSettings", "premiumSettings", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("price", "price", notNull(scalar("Int"))),
                    field("interval", "interval", scalar("String"))
                )),
            field("isPremium", "isPremium", notNull(scalar("Boolean"))),
            field("premiumPassIsActive", "premiumPassIsActive", notNull(scalar("Boolean")))
        )

private let DiscoverChatsCollectionSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("title", "title", notNull(scalar("String"))),
            field("chatsCount", "chatsCount", notNull(scalar("Int"))),
            field("chats", "chats", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("SharedRoom", DiscoverSharedRoomSelector)
                ))))),
            field("image", "image", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("uuid", "uuid", notNull(scalar("String"))),
                    field("crop", "crop", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("x", "x", notNull(scalar("Int"))),
                            field("y", "y", notNull(scalar("Int"))),
                            field("w", "w", notNull(scalar("Int"))),
                            field("h", "h", notNull(scalar("Int")))
                        ))
                )))
        )

private let DiscoverChatsCollectionShortSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("title", "title", notNull(scalar("String"))),
            field("chatsCount", "chatsCount", notNull(scalar("Int"))),
            field("image", "image", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("uuid", "uuid", notNull(scalar("String"))),
                    field("crop", "crop", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("x", "x", notNull(scalar("Int"))),
                            field("y", "y", notNull(scalar("Int"))),
                            field("w", "w", notNull(scalar("Int"))),
                            field("h", "h", notNull(scalar("Int")))
                        ))
                )))
        )

private let FeedChannelFullSelector = obj(
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

private let FeedPostAuthorFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("User", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                fragment("User", UserShortSelector)
            ))
        )

private let FeedPostSourceFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("FeedChannel", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                fragment("FeedChannel", FeedChannelFullSelector)
            ))
        )

private let SlideFragmentSelector = obj(
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

private let FeedItemFullSelector = obj(
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

private let FeedUpdateFragmentSelector = obj(
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

private let NotificationFragmentSelector = obj(
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

private let NotificationCenterUpdateFragmentSelector = obj(
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

private let UserFullSelector = obj(
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

private let OrganizationFullSelector = obj(
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

private let OrganizationMediumSelector = obj(
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

private let OrganizationProfileFullSelector = obj(
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

private let OrganizationSearchSelector = obj(
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

private let OrganizationWithoutMembersFragmentSelector = obj(
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

private let PlatformNotificationSettingsFullSelector = obj(
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

private let RoomFullSelector = obj(
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
                        field("id", "id", notNull(scalar("ID"))),
                        field("firstName", "firstName", notNull(scalar("String")))
                    ))
            ))
        )

private let RoomFullWithoutMembersSelector = obj(
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
                field("isPremium", "isPremium", notNull(scalar("Boolean"))),
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
                        field("id", "id", notNull(scalar("ID"))),
                        field("firstName", "firstName", notNull(scalar("String")))
                    ))
            ))
        )

private let RoomPreviewSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("PrivateRoom", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("user", "user", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("User", UserShortSelector)
                    )))
            )),
            inline("SharedRoom", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("isChannel", "isChannel", notNull(scalar("Boolean"))),
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
                field("membership", "membership", notNull(scalar("String"))),
                field("owner", "owner", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    )),
                field("matchmaking", "matchmaking", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("enabled", "enabled", notNull(scalar("Boolean")))
                    )),
                field("title", "title", notNull(scalar("String"))),
                field("photo", "photo", notNull(scalar("String"))),
                field("membersCount", "membersCount", notNull(scalar("Int"))),
                field("description", "description", scalar("String")),
                field("previewMembers", "previewMembers", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("name", "name", notNull(scalar("String"))),
                        field("photo", "photo", scalar("String"))
                    ))))),
                field("onlineMembersCount", "onlineMembersCount", notNull(scalar("Int")))
            ))
        )

private let SessionStateFullSelector = obj(
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

private let SettingsFullSelector = obj(
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

private let SharedRoomViewSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("title", "title", notNull(scalar("String"))),
            field("photo", "photo", notNull(scalar("String"))),
            field("membersCount", "membersCount", notNull(scalar("Int"))),
            field("photo", "photo", notNull(scalar("String")))
        )

private let StickerPackFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("title", "title", notNull(scalar("String"))),
            field("stickers", "stickers", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Sticker", StickerFragmentSelector)
                )))))
        )

private let TinyMessageSelector = obj(
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

private let UserNanoSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("name", "name", notNull(scalar("String"))),
            field("firstName", "firstName", notNull(scalar("String"))),
            field("lastName", "lastName", scalar("String")),
            field("photo", "photo", scalar("String")),
            field("online", "online", notNull(scalar("Boolean")))
        )

private let WalletTransactionFragmentSelector = obj(
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
                    inline("WalletTransactionIncome", obj(
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
                        field("source", "source", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                inline("WalletSubscription", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("ID"))),
                                    field("product", "product", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            inline("WalletProductGroup", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("group", "group", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("title", "title", notNull(scalar("String"))),
                                                        field("photo", "photo", notNull(scalar("String")))
                                                    )))
                                            )),
                                            inline("WalletProductDonation", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("user", "user", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("name", "name", notNull(scalar("String"))),
                                                        field("photo", "photo", scalar("String"))
                                                    )))
                                            )),
                                            inline("WalletProductDonationMessage", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("user", "user", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("name", "name", notNull(scalar("String"))),
                                                        field("photo", "photo", scalar("String"))
                                                    ))),
                                                field("chat", "chat", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        inline("SharedRoom", obj(
                                                            field("__typename", "__typename", notNull(scalar("String"))),
                                                            field("id", "id", notNull(scalar("ID"))),
                                                            field("title", "title", notNull(scalar("String")))
                                                        ))
                                                    )))
                                            ))
                                        )))
                                )),
                                inline("Purchase", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("ID"))),
                                    field("product", "product", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            inline("WalletProductGroup", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("group", "group", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("title", "title", notNull(scalar("String"))),
                                                        field("photo", "photo", notNull(scalar("String")))
                                                    )))
                                            )),
                                            inline("WalletProductDonation", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("user", "user", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("name", "name", notNull(scalar("String"))),
                                                        field("photo", "photo", scalar("String"))
                                                    )))
                                            )),
                                            inline("WalletProductDonationMessage", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("user", "user", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("name", "name", notNull(scalar("String"))),
                                                        field("photo", "photo", scalar("String"))
                                                    ))),
                                                field("chat", "chat", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        inline("SharedRoom", obj(
                                                            field("__typename", "__typename", notNull(scalar("String"))),
                                                            field("id", "id", notNull(scalar("ID"))),
                                                            field("title", "title", notNull(scalar("String")))
                                                        ))
                                                    )))
                                            ))
                                        )))
                                ))
                            ))
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
                    )),
                    inline("WalletTransactionTransferOut", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("amount", "amount", notNull(scalar("Int"))),
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
                    inline("WalletTransactionSubscription", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("amount", "amount", notNull(scalar("Int"))),
                        field("walletAmount", "walletAmount", notNull(scalar("Int"))),
                        field("chargeAmount", "chargeAmount", notNull(scalar("Int"))),
                        field("subscription", "subscription", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("interval", "interval", notNull(scalar("String"))),
                                field("amount", "amount", notNull(scalar("Int"))),
                                field("product", "product", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        inline("WalletProductGroup", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("group", "group", notNull(obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    field("id", "id", notNull(scalar("ID"))),
                                                    field("title", "title", notNull(scalar("String"))),
                                                    field("photo", "photo", notNull(scalar("String")))
                                                )))
                                        )),
                                        inline("WalletProductDonation", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("user", "user", notNull(obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    field("id", "id", notNull(scalar("ID"))),
                                                    field("name", "name", notNull(scalar("String"))),
                                                    field("photo", "photo", scalar("String"))
                                                )))
                                        )),
                                        inline("WalletProductDonationMessage", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("user", "user", notNull(obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    field("id", "id", notNull(scalar("ID"))),
                                                    field("name", "name", notNull(scalar("String"))),
                                                    field("photo", "photo", scalar("String"))
                                                ))),
                                            field("chat", "chat", notNull(obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    inline("SharedRoom", obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("title", "title", notNull(scalar("String")))
                                                    ))
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
                    inline("WalletTransactionPurchase", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("amount", "amount", notNull(scalar("Int"))),
                        field("walletAmount", "walletAmount", notNull(scalar("Int"))),
                        field("chargeAmount", "chargeAmount", notNull(scalar("Int"))),
                        field("purchase", "purchase", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("product", "product", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        inline("WalletProductGroup", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("group", "group", notNull(obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    field("id", "id", notNull(scalar("ID"))),
                                                    field("title", "title", notNull(scalar("String"))),
                                                    field("photo", "photo", notNull(scalar("String")))
                                                )))
                                        )),
                                        inline("WalletProductDonation", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("user", "user", notNull(obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    field("id", "id", notNull(scalar("ID"))),
                                                    field("name", "name", notNull(scalar("String"))),
                                                    field("photo", "photo", scalar("String"))
                                                )))
                                        )),
                                        inline("WalletProductDonationMessage", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("user", "user", notNull(obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    field("id", "id", notNull(scalar("ID"))),
                                                    field("name", "name", notNull(scalar("String"))),
                                                    field("photo", "photo", scalar("String"))
                                                ))),
                                            field("chat", "chat", notNull(obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    inline("SharedRoom", obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("title", "title", notNull(scalar("String")))
                                                    ))
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
                    ))
                )))
        )

private let WalletUpdateFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("WalletUpdateBalance", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("amount", "amount", notNull(scalar("Int")))
            )),
            inline("WalletUpdateLocked", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("isLocked", "isLocked", notNull(scalar("Boolean"))),
                field("failingPaymentsCount", "failingPaymentsCount", notNull(scalar("Int")))
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

private let AccountSelector = obj(
            field("me", "me", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("User", UserShortSelector)
                )),
            field("myProfile", "myProfile", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("authEmail", "authEmail", scalar("String"))
                )),
            field("sessionState", "sessionState", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("SessionState", SessionStateFullSelector)
                ))),
            field("myPermissions", "myPermissions", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("roles", "roles", notNull(list(notNull(scalar("String")))))
                )))
        )
private let AccountAppInviteSelector = obj(
            field("appInvite", "invite", notNull(scalar("String")))
        )
private let AccountAppInviteInfoSelector = obj(
            field("alphaInviteInfo", "invite", arguments(fieldValue("key", refValue("inviteKey"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("creator", "creator", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))
                )),
            field("appInviteInfo", "appInvite", arguments(fieldValue("key", refValue("inviteKey"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("inviter", "inviter", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))
                ))
        )
private let AccountInviteInfoSelector = obj(
            field("alphaInviteInfo", "invite", arguments(fieldValue("key", refValue("inviteKey"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("key", "key", notNull(scalar("String"))),
                    field("orgId", "orgId", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String"))),
                    field("photo", "photo", scalar("String")),
                    field("joined", "joined", notNull(scalar("Boolean"))),
                    field("creator", "creator", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )),
                    field("forEmail", "forEmail", scalar("String")),
                    field("forName", "forName", scalar("String")),
                    field("membersCount", "membersCount", scalar("Int")),
                    field("organization", "organization", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("alphaIsCommunity", "isCommunity", notNull(scalar("Boolean"))),
                            field("about", "about", scalar("String"))
                        ))
                ))
        )
private let AccountSettingsSelector = obj(
            field("me", "me", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("audienceSize", "audienceSize", notNull(scalar("Int"))),
                    fragment("User", UserShortSelector)
                )),
            field("myProfile", "myProfile", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("authEmail", "authEmail", scalar("String"))
                )),
            field("myOrganizations", "organizations", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                )))))
        )
private let AuthResolveShortNameSelector = obj(
            field("alphaResolveShortName", "item", arguments(fieldValue("shortname", refValue("shortname"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("User", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("User", UserNanoSelector)
                    )),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("Room", RoomPreviewSelector)
                    ))
                ))
        )
private let ChatInitSelector = obj(
            field("messages", "messages", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("first", refValue("first")), fieldValue("before", refValue("before"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("ModernMessage", FullMessageSelector)
                ))))),
            field("conversationState", "state", arguments(fieldValue("id", refValue("chatId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("state", "state", scalar("String"))
                ))),
            field("room", "room", arguments(fieldValue("id", refValue("chatId"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )),
            field("lastReadedMessage", "lastReadedMessage", arguments(fieldValue("chatId", refValue("chatId"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                ))
        )
private let ChatInitFromUnreadSelector = obj(
            field("gammaMessages", "gammaMessages", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("first", refValue("first")), fieldValue("before", refValue("before"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("messages", "messages", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("ModernMessage", FullMessageSelector)
                        ))))),
                    field("haveMoreForward", "haveMoreForward", scalar("Boolean")),
                    field("haveMoreBackward", "haveMoreBackward", scalar("Boolean"))
                )),
            field("conversationState", "state", arguments(fieldValue("id", refValue("chatId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("state", "state", scalar("String"))
                ))),
            field("room", "room", arguments(fieldValue("id", refValue("chatId"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )),
            field("lastReadedMessage", "lastReadedMessage", arguments(fieldValue("chatId", refValue("chatId"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                ))
        )
private let ChatJoinSelector = obj(
            field("room", "room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("title", "title", notNull(scalar("String"))),
                        field("description", "description", scalar("String")),
                        field("photo", "photo", notNull(scalar("String"))),
                        field("membersCount", "membersCount", notNull(scalar("Int"))),
                        field("onlineMembersCount", "onlineMembersCount", notNull(scalar("Int"))),
                        field("previewMembers", "previewMembers", notNull(list(notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("photo", "photo", scalar("String")),
                                field("name", "name", notNull(scalar("String")))
                            ))))),
                        field("isChannel", "isChannel", notNull(scalar("Boolean"))),
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
                                field("id", "id", notNull(scalar("ID"))),
                                field("firstName", "firstName", notNull(scalar("String")))
                            ))
                    ))
                ))
        )
private let ChatMembersSearchSelector = obj(
            field("chatMembersSearch", "members", arguments(fieldValue("cid", refValue("cid")), fieldValue("query", refValue("query")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "user", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("ID"))),
                                    field("name", "name", notNull(scalar("String"))),
                                    field("shortname", "shortname", scalar("String")),
                                    field("photo", "photo", scalar("String")),
                                    field("primaryOrganization", "primaryOrganization", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("id", "id", notNull(scalar("ID"))),
                                            field("name", "name", notNull(scalar("String")))
                                        ))
                                ))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean")))
                        )))
                )))
        )
private let ChatMentionSearchSelector = obj(
            field("chatMentionSearch", "mentions", arguments(fieldValue("cid", refValue("cid")), fieldValue("query", refValue("query")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("globalItems", "globalItems", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            inline("Organization", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("Organization", OrganizationShortSelector)
                            )),
                            inline("User", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("User", UserForMentionSelector)
                            )),
                            inline("SharedRoom", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("SharedRoom", RoomSharedNanoSelector)
                            ))
                        ))))),
                    field("localItems", "localItems", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserForMentionSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
private let CommentsSelector = obj(
            field("comments", "comments", arguments(fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("state", "state", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("state", "state", scalar("String"))
                        ))),
                    field("count", "count", notNull(scalar("Int"))),
                    field("comments", "comments", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("CommentEntry", CommentEntryFragmentSelector)
                        )))))
                )))
        )
private let ConferenceSelector = obj(
            field("conference", "conference", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceFullSelector)
                )))
        )
private let ConferenceMediaSelector = obj(
            field("conferenceMedia", "conferenceMedia", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("streams", "streams", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("peerId", "peerId", scalar("ID")),
                            field("state", "state", notNull(scalar("String"))),
                            field("sdp", "sdp", scalar("String")),
                            field("ice", "ice", notNull(list(notNull(scalar("String")))))
                        ))))),
                    field("iceServers", "iceServers", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("urls", "urls", notNull(list(notNull(scalar("String"))))),
                            field("username", "username", scalar("String")),
                            field("credential", "credential", scalar("String"))
                        )))))
                )))
        )
private let DialogsSelector = obj(
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
private let DiscoverCollectionSelector = obj(
            field("discoverCollection", "discoverCollection", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String"))),
                    field("chats", "chats", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("SharedRoom", DiscoverSharedRoomSelector)
                        )))))
                ))
        )
private let DiscoverCollectionShortSelector = obj(
            field("discoverCollection", "discoverCollection", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String"))),
                    field("image", "image", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("uuid", "uuid", notNull(scalar("String"))),
                            field("crop", "crop", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("x", "x", notNull(scalar("Int"))),
                                    field("y", "y", notNull(scalar("Int"))),
                                    field("w", "w", notNull(scalar("Int"))),
                                    field("h", "h", notNull(scalar("Int")))
                                ))
                        )))
                ))
        )
private let DiscoverCollectionsSelector = obj(
            field("discoverCollections", "discoverCollections", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("DiscoverChatsCollection", DiscoverChatsCollectionSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                ))
        )
private let DiscoverCollectionsShortSelector = obj(
            field("discoverCollections", "discoverCollections", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("DiscoverChatsCollection", DiscoverChatsCollectionShortSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                ))
        )
private let DiscoverEditorsChoiceSelector = obj(
            field("discoverEditorsChoice", "discoverEditorsChoice", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("image", "image", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("uuid", "uuid", notNull(scalar("String"))),
                            field("crop", "crop", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("x", "x", notNull(scalar("Int"))),
                                    field("y", "y", notNull(scalar("Int"))),
                                    field("w", "w", notNull(scalar("Int"))),
                                    field("h", "h", notNull(scalar("Int")))
                                ))
                        ))),
                    field("chat", "chat", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("SharedRoom", DiscoverSharedRoomSelector)
                        )))
                )))))
        )
private let DiscoverIsDoneSelector = obj(
            field("betaIsDiscoverDone", "betaIsDiscoverDone", notNull(scalar("Boolean")))
        )
private let DiscoverNewAndGrowingSelector = obj(
            field("discoverNewAndGrowing", "discoverNewAndGrowing", arguments(fieldValue("first", refValue("first")), fieldValue("seed", refValue("seed")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("SharedRoom", DiscoverSharedRoomSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
private let DiscoverNextPageSelector = obj(
            field("gammaNextDiscoverPage", "betaNextDiscoverPage", arguments(fieldValue("selectedTagsIds", refValue("selectedTagsIds")), fieldValue("excudedGroupsIds", refValue("excudedGroupsIds"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("chats", "chats", list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Room", RoomShortSelector)
                        )))),
                    field("tagGroup", "tagGroup", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("String"))),
                            field("title", "title", scalar("String")),
                            field("subtitle", "subtitle", scalar("String")),
                            field("tags", "tags", notNull(list(notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("String"))),
                                    field("title", "title", notNull(scalar("String")))
                                )))))
                        ))
                ))
        )
private let DiscoverPopularNowSelector = obj(
            field("discoverPopularNow", "discoverPopularNow", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("room", "room", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("SharedRoom", DiscoverSharedRoomSelector)
                                ))),
                            field("newMessages", "newMessages", notNull(scalar("Int")))
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
private let DiscoverStateSelector = obj(
            field("dialogs", "dialogs", arguments(fieldValue("first", intValue(1))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID")))
                        )))))
                )))
        )
private let DiscoverSuggestedRoomsSelector = obj(
            field("betaSuggestedRooms", "suggestedRooms", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("SharedRoom", DiscoverSharedRoomSelector)
                )))))
        )
private let DiscoverTopFreeSelector = obj(
            field("discoverTopFree", "discoverTopFree", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("SharedRoom", DiscoverSharedRoomSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
private let DiscoverTopPremiumSelector = obj(
            field("discoverTopPremium", "discoverTopPremium", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("SharedRoom", DiscoverSharedRoomSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
private let ExplorePeopleSelector = obj(
            field("userSearch", "items", arguments(fieldValue("query", refValue("query")), fieldValue("sort", refValue("sort")), fieldValue("page", refValue("page")), fieldValue("first", intValue(25)), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("isYou", "isYou", notNull(scalar("Boolean"))),
                                    fragment("User", UserShortSelector)
                                ))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage", "hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount", "itemsCount", notNull(scalar("Int"))),
                            field("currentPage", "currentPage", notNull(scalar("Int"))),
                            field("pagesCount", "pagesCount", notNull(scalar("Int"))),
                            field("openEnded", "openEnded", notNull(scalar("Boolean")))
                        )))
                )))
        )
private let ExploreRoomsSelector = obj(
            field("discoverNewAndGrowing", "discoverNewAndGrowing", arguments(fieldValue("first", intValue(3)), fieldValue("seed", refValue("seed"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("SharedRoom", DiscoverSharedRoomSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                ))),
            field("discoverPopularNow", "discoverPopularNow", arguments(fieldValue("first", intValue(3))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("room", "room", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("SharedRoom", DiscoverSharedRoomSelector)
                                ))),
                            field("newMessages", "newMessages", notNull(scalar("Int")))
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                ))),
            field("betaSuggestedRooms", "suggestedRooms", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("SharedRoom", DiscoverSharedRoomSelector)
                ))))),
            field("discoverTopPremium", "discoverTopPremium", arguments(fieldValue("first", intValue(5))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("SharedRoom", DiscoverSharedRoomSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                ))),
            field("discoverTopFree", "discoverTopFree", arguments(fieldValue("first", intValue(5))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("SharedRoom", DiscoverSharedRoomSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                ))),
            field("betaIsDiscoverDone", "isDiscoverDone", notNull(scalar("Boolean")))
        )
private let FeatureFlagsSelector = obj(
            field("featureFlags", "featureFlags", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("key", "key", notNull(scalar("String"))),
                    field("title", "title", notNull(scalar("String")))
                )))))
        )
private let FeedChannelSelector = obj(
            field("alphaFeedChannel", "channel", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("FeedChannel", FeedChannelFullSelector)
                )))
        )
private let FeedChannelContentSelector = obj(
            field("alphaFeedChannelContent", "content", arguments(fieldValue("id", refValue("id")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("FeedItem", FeedItemFullSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
private let FeedChannelSubscribersSelector = obj(
            field("alphaFeedChannelSubscribers", "subscribers", arguments(fieldValue("channelId", refValue("channelId")), fieldValue("query", refValue("query")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("user", "user", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            fragment("User", UserShortSelector)
                                        ))),
                                    field("role", "role", notNull(scalar("String")))
                                ))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage", "hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount", "itemsCount", notNull(scalar("Int"))),
                            field("pagesCount", "pagesCount", notNull(scalar("Int"))),
                            field("currentPage", "currentPage", notNull(scalar("Int"))),
                            field("openEnded", "openEnded", notNull(scalar("Boolean")))
                        )))
                )))
        )
private let FeedChannelWritersSelector = obj(
            field("alphaFeedChannelAdmins", "writers", arguments(fieldValue("id", refValue("id")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("user", "user", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("User", UserShortSelector)
                                ))),
                            field("role", "role", notNull(scalar("String")))
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
private let FeedChannelsSearchSelector = obj(
            field("alphaFeedChannelSearch", "search", arguments(fieldValue("query", refValue("query")), fieldValue("sort", refValue("sort")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("FeedChannel", FeedChannelFullSelector)
                                ))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage", "hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount", "itemsCount", notNull(scalar("Int"))),
                            field("pagesCount", "pagesCount", notNull(scalar("Int"))),
                            field("currentPage", "currentPage", notNull(scalar("Int"))),
                            field("openEnded", "openEnded", notNull(scalar("Boolean")))
                        )))
                )))
        )
private let FeedItemSelector = obj(
            field("alphaFeedItem", "item", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("FeedItem", FeedItemFullSelector)
                ))
        )
private let FeedLoadMoreSelector = obj(
            field("alphaHomeFeed", "feed", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("FeedItem", FeedItemFullSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
private let FeedRecommendedChannelsSelector = obj(
            field("alphaRecommendedChannels", "search", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("FeedChannel", FeedChannelFullSelector)
                                ))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage", "hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount", "itemsCount", notNull(scalar("Int"))),
                            field("pagesCount", "pagesCount", notNull(scalar("Int"))),
                            field("currentPage", "currentPage", notNull(scalar("Int"))),
                            field("openEnded", "openEnded", notNull(scalar("Boolean")))
                        )))
                )))
        )
private let FeedSubscriptionsSelector = obj(
            field("alphaFeedMySubscriptions", "channels", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("FeedChannel", FeedChannelFullSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
private let FeedWritableChannelsSelector = obj(
            field("alphaWritableChannels", "channels", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("FeedChannel", FeedChannelFullSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
private let FetchPushSettingsSelector = obj(
            field("pushSettings", "pushSettings", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("webPushKey", "webPushKey", scalar("String"))
                )))
        )
private let GlobalCounterSelector = obj(
            field("alphaNotificationCounter", "alphaNotificationCounter", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("unreadCount", "unreadCount", notNull(scalar("Int")))
                )))
        )
private let GlobalSearchSelector = obj(
            field("alphaGlobalSearch", "items", arguments(fieldValue("query", refValue("query")), fieldValue("kinds", refValue("kinds"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("Organization", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("name", "name", notNull(scalar("String"))),
                        field("about", "about", scalar("String")),
                        field("photo", "photo", scalar("String")),
                        field("shortname", "shortname", scalar("String")),
                        field("alphaIsCommunity", "isCommunity", notNull(scalar("Boolean")))
                    )),
                    inline("User", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("User", UserShortSelector)
                    )),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("kind", "kind", notNull(scalar("String"))),
                        field("title", "title", notNull(scalar("String"))),
                        field("canSendMessage", "canSendMessage", notNull(scalar("Boolean"))),
                        field("photo", "roomPhoto", notNull(scalar("String"))),
                        field("membersCount", "membersCount", notNull(scalar("Int"))),
                        field("membership", "membership", notNull(scalar("String"))),
                        field("organization", "organization", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("name", "name", notNull(scalar("String"))),
                                field("photo", "photo", scalar("String"))
                            ))
                    ))
                )))))
        )
private let InitFeedSelector = obj(
            field("alphaHomeFeed", "feed", arguments(fieldValue("first", refValue("first"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("FeedItem", FeedItemFullSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                ))),
            field("alphaFeedMyDraftsChannel", "drafts", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("FeedChannel", FeedChannelFullSelector)
                )))
        )
private let MatchmakingProfileSelector = obj(
            field("matchmakingProfile", "matchmakingProfile", arguments(fieldValue("peerId", refValue("peerId")), fieldValue("uid", refValue("uid"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("MatchmakingProfile", MatchmakingProfileFragmentSelector)
                ))
        )
private let MatchmakingRoomSelector = obj(
            field("matchmakingRoom", "matchmakingRoom", arguments(fieldValue("peerId", refValue("peerId"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("MatchmakingRoom", MatchmakingRoomFragmentSelector)
                ))
        )
private let MessageSelector = obj(
            field("message", "message", arguments(fieldValue("messageId", refValue("messageId"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("ModernMessage", FullMessageSelector)
                ))
        )
private let MessagesBatchSelector = obj(
            field("gammaMessages", "gammaMessages", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("first", refValue("first")), fieldValue("before", refValue("before")), fieldValue("after", refValue("after"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("messages", "messages", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("ModernMessage", FullMessageSelector)
                        ))))),
                    field("haveMoreForward", "haveMoreForward", scalar("Boolean")),
                    field("haveMoreBackward", "haveMoreBackward", scalar("Boolean"))
                )),
            field("conversationState", "state", arguments(fieldValue("id", refValue("chatId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("state", "state", scalar("String"))
                )))
        )
private let MessagesSearchSelector = obj(
            field("messagesSearch", "messagesSearch", arguments(fieldValue("query", refValue("query")), fieldValue("sort", refValue("sort")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("chat", "chat", notNull(obj(
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
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("kind", "kind", notNull(scalar("String"))),
                                                field("title", "title", notNull(scalar("String"))),
                                                field("membership", "membership", notNull(scalar("String"))),
                                                field("isChannel", "isChannel", notNull(scalar("Boolean"))),
                                                field("role", "role", notNull(scalar("String"))),
                                                field("canEdit", "canEdit", notNull(scalar("Boolean"))),
                                                field("photo", "photo", notNull(scalar("String"))),
                                                field("settings", "settings", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("mute", "mute", scalar("Boolean"))
                                                    )))
                                            ))
                                        ))),
                                    field("message", "message", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("id", "id", notNull(scalar("ID"))),
                                            field("date", "date", notNull(scalar("Date"))),
                                            field("sender", "sender", notNull(obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    field("id", "id", notNull(scalar("ID"))),
                                                    field("name", "name", notNull(scalar("String"))),
                                                    field("firstName", "firstName", notNull(scalar("String"))),
                                                    field("photo", "photo", scalar("String"))
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
                                                                )))
                                                        ))
                                                    ))))),
                                                field("quotedMessages", "quotedMessages", notNull(list(notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID")))
                                                    )))))
                                            ))
                                        )))
                                ))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage", "hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount", "itemsCount", notNull(scalar("Int"))),
                            field("currentPage", "currentPage", notNull(scalar("Int"))),
                            field("pagesCount", "pagesCount", notNull(scalar("Int"))),
                            field("openEnded", "openEnded", notNull(scalar("Boolean")))
                        )))
                )))
        )
private let MyAppsSelector = obj(
            field("myApps", "apps", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                )))))
        )
private let MyCardsSelector = obj(
            field("myCards", "myCards", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("pmid", "pmid", notNull(scalar("ID"))),
                    field("last4", "last4", notNull(scalar("String"))),
                    field("brand", "brand", notNull(scalar("String"))),
                    field("expYear", "expYear", notNull(scalar("Int"))),
                    field("expMonth", "expMonth", notNull(scalar("Int"))),
                    field("isDefault", "isDefault", notNull(scalar("Boolean"))),
                    field("deleted", "deleted", notNull(scalar("Boolean")))
                )))))
        )
private let MyNotificationCenterSelector = obj(
            field("myNotificationCenter", "myNotificationCenter", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("unread", "unread", notNull(scalar("Int"))),
                    field("state", "state", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("state", "state", scalar("String"))
                        )))
                )))
        )
private let MyNotificationsSelector = obj(
            field("myNotifications", "myNotifications", arguments(fieldValue("first", refValue("first")), fieldValue("before", refValue("before"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Notification", NotificationFragmentSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
private let MyOrganizationsSelector = obj(
            field("myOrganizations", "myOrganizations", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("betaIsPrimary", "isPrimary", notNull(scalar("Boolean"))),
                    fragment("Organization", OrganizationShortSelector)
                )))))
        )
private let MyStickersSelector = obj(
            field("myStickers", "stickers", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("packs", "packs", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("title", "title", notNull(scalar("String"))),
                            field("stickers", "stickers", notNull(list(notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("Sticker", StickerFragmentSelector)
                                )))))
                        )))))
                )))
        )
private let MySuccessfulInvitesCountSelector = obj(
            field("mySuccessfulInvitesCount", "mySuccessfulInvitesCount", notNull(scalar("Int")))
        )
private let MyWalletSelector = obj(
            field("myWallet", "myWallet", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("balance", "balance", notNull(scalar("Int"))),
                    field("state", "state", notNull(scalar("String"))),
                    field("isLocked", "isLocked", notNull(scalar("Boolean"))),
                    field("failingPaymentsCount", "failingPaymentsCount", notNull(scalar("Int")))
                ))),
            field("transactionsPending", "transactionsPending", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("WalletTransaction", WalletTransactionFragmentSelector)
                ))))),
            field("transactionsHistory", "transactionsHistory", arguments(fieldValue("first", intValue(20))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("WalletTransaction", WalletTransactionFragmentSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
private let OauthContextSelector = obj(
            field("oauthContext", "context", arguments(fieldValue("code", refValue("code"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("app", "app", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("title", "title", notNull(scalar("String"))),
                            field("scopes", "scopes", list(notNull(scalar("String")))),
                            field("image", "image", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("uuid", "uuid", notNull(scalar("String"))),
                                    field("crop", "crop", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("x", "x", notNull(scalar("Int"))),
                                            field("y", "y", notNull(scalar("Int"))),
                                            field("w", "w", notNull(scalar("Int"))),
                                            field("h", "h", notNull(scalar("Int")))
                                        ))
                                ))
                        ))),
                    field("state", "state", notNull(scalar("String"))),
                    field("redirectUrl", "redirectUrl", notNull(scalar("String"))),
                    field("code", "code", notNull(scalar("String")))
                ))
        )
private let OnlineSelector = obj(
            field("user", "user", arguments(fieldValue("id", refValue("userId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("online", "online", notNull(scalar("Boolean"))),
                    field("lastSeen", "lastSeen", scalar("String")),
                    field("isBot", "isBot", notNull(scalar("Boolean")))
                )))
        )
private let OrganizationSelector = obj(
            field("organization", "organization", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationFullSelector)
                )))
        )
private let OrganizationByPrefixSelector = obj(
            field("alphaOrganizationByPrefix", "organizationByPrefix", arguments(fieldValue("query", refValue("query"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationSearchSelector)
                ))
        )
private let OrganizationMembersSelector = obj(
            field("organization", "organization", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("alphaOrganizationMembers", "members", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("role", "role", notNull(scalar("String"))),
                            field("user", "user", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("User", UserShortSelector)
                                )))
                        )))))
                )))
        )
private let OrganizationMembersShortSelector = obj(
            field("organization", "organization", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("alphaOrganizationMembers", "members", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("user", "user", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("ID")))
                                )))
                        ))))),
                    fragment("Organization", OrganizationWithoutMembersFragmentSelector)
                )))
        )
private let OrganizationProfileSelector = obj(
            field("organizationProfile", "organizationProfile", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("OrganizationProfile", OrganizationProfileFullSelector)
                )))
        )
private let OrganizationPublicInviteSelector = obj(
            field("alphaOrganizationInviteLink", "publicInvite", arguments(fieldValue("organizationId", refValue("organizationId"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("key", "key", notNull(scalar("String"))),
                    field("ttl", "ttl", scalar("String"))
                ))
        )
private let OrganizationPublicRoomsSelector = obj(
            field("organizationPublicRooms", "organizationPublicRooms", arguments(fieldValue("id", refValue("organizationId")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("SharedRoom", SharedRoomViewSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
private let OrganizationWithoutMembersSelector = obj(
            field("organization", "organization", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationWithoutMembersFragmentSelector)
                )))
        )
private let PermissionsSelector = obj(
            field("myPermissions", "myPermissions", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("roles", "roles", notNull(list(notNull(scalar("String")))))
                )))
        )
private let PicSharedMediaSelector = obj(
            field("chatSharedMedia", "chatSharedMedia", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("mediaTypes", listValue(stringValue("IMAGE"))), fieldValue("first", refValue("first")), fieldValue("after", refValue("after")), fieldValue("before", refValue("before")), fieldValue("around", refValue("around"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage", "hasPreviousPage", notNull(scalar("Boolean"))),
                            field("currentPage", "currentPage", notNull(scalar("Int"))),
                            field("pagesCount", "pagesCount", notNull(scalar("Int"))),
                            field("itemsCount", "itemsCount", notNull(scalar("Int")))
                        ))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("cursor", "cursor", notNull(scalar("String"))),
                            field("index", "index", notNull(scalar("Int"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("message", "message", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            inline("GeneralMessage", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("date", "date", notNull(scalar("Date"))),
                                                field("sender", "sender", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("name", "name", notNull(scalar("String")))
                                                    ))),
                                                field("attachments", "attachments", notNull(list(notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        inline("MessageAttachmentFile", obj(
                                                            field("__typename", "__typename", notNull(scalar("String"))),
                                                            field("id", "id", notNull(scalar("ID"))),
                                                            field("fileMetadata", "fileMetadata", notNull(obj(
                                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                                    field("name", "name", notNull(scalar("String"))),
                                                                    field("isImage", "isImage", notNull(scalar("Boolean"))),
                                                                    field("imageFormat", "imageFormat", scalar("String")),
                                                                    field("mimeType", "mimeType", scalar("String")),
                                                                    field("imageWidth", "imageWidth", scalar("Int")),
                                                                    field("imageHeight", "imageHeight", scalar("Int")),
                                                                    field("size", "size", notNull(scalar("Int")))
                                                                ))),
                                                            field("filePreview", "filePreview", scalar("String")),
                                                            field("fileId", "fileId", notNull(scalar("String"))),
                                                            field("fallback", "fallback", notNull(scalar("String")))
                                                        ))
                                                    )))))
                                            ))
                                        )))
                                )))
                        )))))
                )))
        )
private let ProfileSelector = obj(
            field("me", "user", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("shortname", "shortname", scalar("String"))
                )),
            field("myProfile", "profile", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("firstName", "firstName", scalar("String")),
                    field("lastName", "lastName", scalar("String")),
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
                    field("email", "email", scalar("String")),
                    field("phone", "phone", scalar("String")),
                    field("website", "website", scalar("String")),
                    field("about", "about", scalar("String")),
                    field("location", "location", scalar("String")),
                    field("alphaRole", "role", scalar("String")),
                    field("linkedin", "linkedin", scalar("String")),
                    field("instagram", "instagram", scalar("String")),
                    field("facebook", "facebook", scalar("String")),
                    field("twitter", "twitter", scalar("String")),
                    field("primaryOrganization", "primaryOrganization", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("name", "name", notNull(scalar("String"))),
                            field("membersCount", "membersCount", notNull(scalar("Int")))
                        )),
                    field("alphaJoinedAt", "joinedAt", scalar("String")),
                    field("alphaInvitedBy", "invitedBy", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("name", "name", notNull(scalar("String")))
                        ))
                ))
        )
private let ProfilePrefillSelector = obj(
            field("myProfilePrefill", "prefill", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("firstName", "firstName", scalar("String")),
                    field("lastName", "lastName", scalar("String")),
                    field("picture", "picture", scalar("String"))
                ))
        )
private let ResolveShortNameSelector = obj(
            field("alphaResolveShortName", "item", arguments(fieldValue("shortname", refValue("shortname"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("User", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("isDeleted", "isDeleted", notNull(scalar("Boolean")))
                    )),
                    inline("Organization", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("isDeleted", "isDeleted", notNull(scalar("Boolean")))
                    )),
                    inline("FeedChannel", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    )),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    ))
                ))
        )
private let ResolvedInviteSelector = obj(
            field("alphaResolveInvite", "invite", arguments(fieldValue("key", refValue("key"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("InviteInfo", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("orgId", "orgId", notNull(scalar("ID"))),
                        field("title", "title", notNull(scalar("String"))),
                        field("creator", "creator", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            )),
                        field("organization", "organization", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("photo", "photo", scalar("String")),
                                field("name", "name", notNull(scalar("String"))),
                                field("membersCount", "membersCount", notNull(scalar("Int"))),
                                field("about", "about", scalar("String")),
                                field("alphaIsCommunity", "isCommunity", notNull(scalar("Boolean")))
                            ))
                    )),
                    inline("AppInvite", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("inviter", "inviter", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            )))
                    )),
                    inline("RoomInvite", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("invitedByUser", "invitedByUser", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            ))),
                        field("room", "room", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                inline("SharedRoom", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("ID"))),
                                    field("kind", "kind", notNull(scalar("String"))),
                                    field("isChannel", "isChannel", notNull(scalar("Boolean"))),
                                    field("title", "title", notNull(scalar("String"))),
                                    field("photo", "photo", notNull(scalar("String"))),
                                    field("socialImage", "socialImage", scalar("String")),
                                    field("description", "description", scalar("String")),
                                    field("membership", "membership", notNull(scalar("String"))),
                                    field("membersCount", "membersCount", notNull(scalar("Int"))),
                                    field("onlineMembersCount", "onlineMembersCount", notNull(scalar("Int"))),
                                    field("previewMembers", "previewMembers", notNull(list(notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("id", "id", notNull(scalar("ID"))),
                                            field("photo", "photo", scalar("String")),
                                            field("name", "name", notNull(scalar("String")))
                                        ))))),
                                    field("matchmaking", "matchmaking", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("enabled", "enabled", notNull(scalar("Boolean")))
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
                                            field("id", "id", notNull(scalar("ID"))),
                                            field("firstName", "firstName", notNull(scalar("String")))
                                        ))
                                ))
                            )))
                    ))
                )),
            field("alphaResolveShortName", "shortnameItem", arguments(fieldValue("shortname", refValue("key"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("Room", RoomPreviewSelector)
                    ))
                ))
        )
private let RoomSelector = obj(
            field("room", "room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                ))
        )
private let RoomChatSelector = obj(
            field("room", "room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("user", "user", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("name", "name", notNull(scalar("String"))),
                                field("photo", "photo", scalar("String")),
                                field("shortname", "shortname", scalar("String")),
                                field("primaryOrganization", "primaryOrganization", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("name", "name", notNull(scalar("String")))
                                    )),
                                field("isBot", "isBot", notNull(scalar("Boolean")))
                            ))),
                        field("pinnedMessage", "pinnedMessage", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("ModernMessage", FullMessageSelector)
                            )),
                        field("settings", "settings", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("mute", "mute", scalar("Boolean"))
                            )))
                    )),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("kind", "kind", notNull(scalar("String"))),
                        field("title", "title", notNull(scalar("String"))),
                        field("membership", "membership", notNull(scalar("String"))),
                        field("isChannel", "isChannel", notNull(scalar("Boolean"))),
                        field("role", "role", notNull(scalar("String"))),
                        field("canEdit", "canEdit", notNull(scalar("Boolean"))),
                        field("photo", "photo", notNull(scalar("String"))),
                        field("membersCount", "membersCount", notNull(scalar("Int"))),
                        field("organization", "organization", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("Organization", OrganizationMediumSelector)
                            )),
                        field("matchmaking", "matchmaking", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("MatchmakingRoom", MatchmakingRoomFragmentSelector)
                            )),
                        field("pinnedMessage", "pinnedMessage", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("ModernMessage", FullMessageSelector)
                            )),
                        field("settings", "settings", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("mute", "mute", scalar("Boolean"))
                            ))),
                        field("description", "description", scalar("String")),
                        field("onlineMembersCount", "onlineMembersCount", notNull(scalar("Int"))),
                        field("previewMembers", "previewMembers", notNull(list(notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("photo", "photo", scalar("String")),
                                field("name", "name", notNull(scalar("String")))
                            ))))),
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
                ))
        )
private let RoomFeaturedMembersSelector = obj(
            field("roomFeaturedMembers", "roomFeaturedMembers", arguments(fieldValue("roomId", refValue("roomId"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))),
                    field("role", "role", notNull(scalar("String"))),
                    field("membership", "membership", notNull(scalar("String"))),
                    field("canKick", "canKick", notNull(scalar("Boolean"))),
                    field("badge", "badge", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("UserBadge", UserBadgeSelector)
                        ))
                )))))
        )
private let RoomInviteInfoSelector = obj(
            field("betaRoomInviteInfo", "invite", arguments(fieldValue("invite", refValue("invite"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("room", "room", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            inline("SharedRoom", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("kind", "kind", notNull(scalar("String"))),
                                field("isChannel", "isChannel", notNull(scalar("Boolean"))),
                                field("title", "title", notNull(scalar("String"))),
                                field("photo", "photo", notNull(scalar("String"))),
                                field("socialImage", "socialImage", scalar("String")),
                                field("description", "description", scalar("String")),
                                field("organization", "organization", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        fragment("Organization", OrganizationShortSelector)
                                    )),
                                field("membership", "membership", notNull(scalar("String"))),
                                field("membersCount", "membersCount", notNull(scalar("Int"))),
                                field("onlineMembersCount", "onlineMembersCount", notNull(scalar("Int"))),
                                field("previewMembers", "previewMembers", notNull(list(notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("photo", "photo", scalar("String")),
                                        field("name", "name", notNull(scalar("String")))
                                    ))))),
                                field("matchmaking", "matchmaking", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("enabled", "enabled", notNull(scalar("Boolean")))
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
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("firstName", "firstName", notNull(scalar("String")))
                                    ))
                            ))
                        ))),
                    field("invitedByUser", "invitedByUser", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))
                ))
        )
private let RoomInviteLinkSelector = obj(
            field("betaRoomInviteLink", "link", arguments(fieldValue("roomId", refValue("roomId"))), notNull(scalar("String")))
        )
private let RoomMembersSelector = obj(
            field("roomMembers", "members", arguments(fieldValue("roomId", refValue("roomId"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))),
                    field("role", "role", notNull(scalar("String"))),
                    field("membership", "membership", notNull(scalar("String"))),
                    field("canKick", "canKick", notNull(scalar("Boolean")))
                )))))
        )
private let RoomMembersPaginatedSelector = obj(
            field("roomMembers", "members", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))),
                    field("role", "role", notNull(scalar("String"))),
                    field("membership", "membership", notNull(scalar("String"))),
                    field("canKick", "canKick", notNull(scalar("Boolean"))),
                    field("badge", "badge", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("UserBadge", UserBadgeSelector)
                        ))
                )))))
        )
private let RoomMembersShortSelector = obj(
            field("roomMembers", "members", arguments(fieldValue("roomId", refValue("roomId"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID")))
                        )))
                )))))
        )
private let RoomMembersTinySelector = obj(
            field("roomMembers", "members", arguments(fieldValue("roomId", refValue("roomId"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("name", "name", notNull(scalar("String"))),
                            field("shortname", "shortname", scalar("String")),
                            field("photo", "photo", scalar("String")),
                            field("primaryOrganization", "primaryOrganization", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("ID"))),
                                    field("name", "name", notNull(scalar("String")))
                                ))
                        )))
                )))))
        )
private let RoomOrganizationAdminMembersSelector = obj(
            field("room", "room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("organization", "organization", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("alphaOrganizationAdminMembers", "adminMembers", notNull(list(notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("role", "role", notNull(scalar("String"))),
                                        field("user", "user", notNull(obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                fragment("User", UserShortSelector)
                                            )))
                                    )))))
                            ))
                    ))
                ))
        )
private let RoomPicoSelector = obj(
            field("room", "room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Room", RoomNanoSelector)
                ))
        )
private let RoomSearchSelector = obj(
            field("betaRoomSearch", "items", arguments(fieldValue("query", refValue("query")), fieldValue("sort", refValue("sort")), fieldValue("page", refValue("page")), fieldValue("first", intValue(25))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    inline("SharedRoom", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("kind", "kind", notNull(scalar("String"))),
                                        field("isChannel", "isChannel", notNull(scalar("Boolean"))),
                                        field("title", "title", notNull(scalar("String"))),
                                        field("photo", "photo", notNull(scalar("String"))),
                                        field("membership", "membership", notNull(scalar("String"))),
                                        field("membersCount", "membersCount", notNull(scalar("Int"))),
                                        field("organization", "organization", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("photo", "photo", scalar("String")),
                                                field("name", "name", notNull(scalar("String")))
                                            ))
                                    ))
                                ))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean"))),
                            field("hasPreviousPage", "hasPreviousPage", notNull(scalar("Boolean"))),
                            field("itemsCount", "itemsCount", notNull(scalar("Int"))),
                            field("currentPage", "currentPage", notNull(scalar("Int"))),
                            field("pagesCount", "pagesCount", notNull(scalar("Int"))),
                            field("openEnded", "openEnded", notNull(scalar("Boolean")))
                        )))
                )))
        )
private let RoomSocialImageSelector = obj(
            field("roomSocialImage", "roomSocialImage", arguments(fieldValue("roomId", refValue("roomId"))), scalar("String"))
        )
private let RoomSuperSelector = obj(
            field("roomSuper", "roomSuper", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("featured", "featured", notNull(scalar("Boolean"))),
                    field("listed", "listed", notNull(scalar("Boolean")))
                ))
        )
private let RoomTinySelector = obj(
            field("room", "room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                ))
        )
private let RoomWithoutMembersSelector = obj(
            field("room", "room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullWithoutMembersSelector)
                ))
        )
private let SettingsSelector = obj(
            field("settings", "settings", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Settings", SettingsFullSelector)
                )))
        )
private let SharedMediaSelector = obj(
            field("chatSharedMedia", "sharedMedia", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("mediaTypes", refValue("mediaTypes")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean"))),
                            field("currentPage", "currentPage", notNull(scalar("Int")))
                        ))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("message", "message", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            inline("GeneralMessage", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("id", "id", notNull(scalar("ID"))),
                                                field("fallback", "fallback", notNull(scalar("String"))),
                                                field("date", "date", notNull(scalar("Date"))),
                                                field("sender", "sender", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID"))),
                                                        field("name", "name", notNull(scalar("String")))
                                                    ))),
                                                field("attachments", "attachments", notNull(list(notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        inline("MessageAttachmentFile", obj(
                                                            field("__typename", "__typename", notNull(scalar("String"))),
                                                            field("id", "id", notNull(scalar("ID"))),
                                                            field("fileMetadata", "fileMetadata", notNull(obj(
                                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                                    field("name", "name", notNull(scalar("String"))),
                                                                    field("isImage", "isImage", notNull(scalar("Boolean"))),
                                                                    field("imageFormat", "imageFormat", scalar("String")),
                                                                    field("mimeType", "mimeType", scalar("String")),
                                                                    field("imageWidth", "imageWidth", scalar("Int")),
                                                                    field("imageHeight", "imageHeight", scalar("Int")),
                                                                    field("size", "size", notNull(scalar("Int")))
                                                                ))),
                                                            field("filePreview", "filePreview", scalar("String")),
                                                            field("fileId", "fileId", notNull(scalar("String"))),
                                                            field("fallback", "fallback", notNull(scalar("String")))
                                                        )),
                                                        inline("MessageRichAttachment", obj(
                                                            field("__typename", "__typename", notNull(scalar("String"))),
                                                            field("id", "id", notNull(scalar("ID"))),
                                                            field("title", "title", scalar("String")),
                                                            field("text", "text", scalar("String")),
                                                            field("titleLink", "titleLink", scalar("String")),
                                                            field("imagePreview", "imagePreview", scalar("String")),
                                                            field("image", "image", obj(
                                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                                    field("url", "url", notNull(scalar("String")))
                                                                )),
                                                            field("imageFallback", "imageFallback", obj(
                                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                                    field("photo", "photo", notNull(scalar("String")))
                                                                )),
                                                            field("keyboard", "keyboard", obj(
                                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                                    field("buttons", "buttons", notNull(list(list(notNull(obj(
                                                                            field("__typename", "__typename", notNull(scalar("String"))),
                                                                            field("id", "id", notNull(scalar("ID"))),
                                                                            field("title", "title", notNull(scalar("String"))),
                                                                            field("url", "url", scalar("String"))
                                                                        ))))))
                                                                ))
                                                        ))
                                                    )))))
                                            ))
                                        )))
                                ))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        )))))
                )))
        )
private let SharedMediaCountersSelector = obj(
            field("chatSharedMediaCounters", "counters", arguments(fieldValue("chatId", refValue("chatId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("links", "links", notNull(scalar("Int"))),
                    field("images", "images", notNull(scalar("Int"))),
                    field("documents", "documents", notNull(scalar("Int"))),
                    field("videos", "videos", notNull(scalar("Int")))
                )))
        )
private let StickerPackSelector = obj(
            field("stickerPack", "stickerPack", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("StickerPack", StickerPackFragmentSelector)
                ))
        )
private let StickerPackCatalogSelector = obj(
            field("stickerPackCatalog", "stickers", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String"))),
                    field("published", "published", notNull(scalar("Boolean"))),
                    field("stickers", "stickers", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Sticker", StickerFragmentSelector)
                        )))))
                )))))
        )
private let StripeTokenSelector = obj(
            field("stripeToken", "stripeToken", notNull(scalar("String")))
        )
private let SubscriptionsSelector = obj(
            field("subscriptions", "subscriptions", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("state", "state", notNull(scalar("String"))),
                    field("expires", "expires", notNull(scalar("Date"))),
                    field("amount", "amount", notNull(scalar("Int"))),
                    field("interval", "interval", notNull(scalar("String"))),
                    field("product", "product", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            inline("WalletProductGroup", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("group", "group", notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("title", "title", notNull(scalar("String"))),
                                        field("photo", "photo", notNull(scalar("String")))
                                    )))
                            ))
                        )))
                )))))
        )
private let SuggestedRoomsSelector = obj(
            field("betaSuggestedRooms", "suggestedRooms", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("kind", "kind", notNull(scalar("String"))),
                        field("title", "title", notNull(scalar("String"))),
                        field("photo", "photo", notNull(scalar("String"))),
                        field("membersCount", "membersCount", notNull(scalar("Int"))),
                        field("membership", "membership", notNull(scalar("String"))),
                        field("organization", "organization", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("name", "name", notNull(scalar("String"))),
                                field("photo", "photo", scalar("String"))
                            ))
                    ))
                ))))),
            field("betaIsDiscoverDone", "isDiscoverDone", notNull(scalar("Boolean")))
        )
private let SuperAccountSelector = obj(
            field("superAccount", "superAccount", arguments(fieldValue("id", refValue("accountId")), fieldValue("viaOrgId", refValue("viaOrgId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String"))),
                    field("state", "state", notNull(scalar("String"))),
                    field("members", "members", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))))),
                    field("features", "features", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("key", "key", notNull(scalar("String"))),
                            field("title", "title", notNull(scalar("String")))
                        ))))),
                    field("orgId", "orgId", notNull(scalar("ID"))),
                    field("createdAt", "createdAt", scalar("String")),
                    field("createdBy", "createdBy", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("name", "name", notNull(scalar("String")))
                        )),
                    field("alphaPublished", "published", notNull(scalar("Boolean")))
                )))
        )
private let SuperAccountsSelector = obj(
            field("superAccounts", "superAccounts", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("orgId", "orgId", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String"))),
                    field("state", "state", notNull(scalar("String"))),
                    field("createdAt", "createdAt", scalar("String"))
                )))))
        )
private let SuperAdminsSelector = obj(
            field("superAdmins", "superAdmins", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("role", "role", notNull(scalar("String"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))),
                    field("email", "email", scalar("String"))
                )))))
        )
private let SuperBadgeInRoomSelector = obj(
            field("superBadgeInRoom", "superBadgeInRoom", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                ))
        )
private let TransactionsHistorySelector = obj(
            field("transactionsHistory", "transactionsHistory", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("WalletTransaction", WalletTransactionFragmentSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
private let UserSelector = obj(
            field("user", "user", arguments(fieldValue("id", refValue("userId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("chatsWithBadge", "chatsWithBadge", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("chat", "chat", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("Room", RoomShortSelector)
                                ))),
                            field("badge", "badge", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("UserBadge", UserBadgeSelector)
                                )))
                        ))))),
                    fragment("User", UserFullSelector)
                ))),
            field("room", "conversation", arguments(fieldValue("id", refValue("userId"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("settings", "settings", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("mute", "mute", scalar("Boolean"))
                            )))
                    ))
                ))
        )
private let UserAvailableRoomsSelector = obj(
            field("alphaUserAvailableRooms", "alphaUserAvailableRooms", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after")), fieldValue("query", refValue("query"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("SharedRoom", DiscoverSharedRoomSelector)
                                ))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean")))
                        )))
                )))
        )
private let UserPicoSelector = obj(
            field("user", "user", arguments(fieldValue("id", refValue("userId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("name", "name", notNull(scalar("String"))),
                    field("firstName", "firstName", notNull(scalar("String"))),
                    field("photo", "photo", scalar("String"))
                )))
        )
private let UserStorageSelector = obj(
            field("userStorage", "userStorage", arguments(fieldValue("namespace", refValue("namespace")), fieldValue("keys", refValue("keys"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("key", "key", notNull(scalar("String"))),
                    field("value", "value", scalar("String"))
                )))))
        )
private let UsersSelector = obj(
            field("users", "items", arguments(fieldValue("query", refValue("query"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("name", "title", notNull(scalar("String"))),
                    field("email", "subtitle", scalar("String"))
                )))))
        )
private let AccountInviteJoinSelector = obj(
            field("alphaJoinInvite", "alphaJoinInvite", arguments(fieldValue("key", refValue("inviteKey"))), notNull(scalar("ID")))
        )
private let AddAppToChatSelector = obj(
            field("addAppToChat", "addAppToChat", arguments(fieldValue("appId", refValue("appId")), fieldValue("chatId", refValue("chatId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("AppChat", AppChatSelector)
                )))
        )
private let AddCommentSelector = obj(
            field("betaAddComment", "betaAddComment", arguments(fieldValue("repeatKey", refValue("repeatKey")), fieldValue("peerId", refValue("peerId")), fieldValue("message", refValue("message")), fieldValue("replyComment", refValue("replyComment")), fieldValue("mentions", refValue("mentions")), fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("spans", refValue("spans"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
private let AddStickerCommentSelector = obj(
            field("betaAddStickerComment", "addStickerComment", arguments(fieldValue("peerId", refValue("peerId")), fieldValue("stickerId", refValue("stickerId")), fieldValue("replyComment", refValue("replyComment")), fieldValue("repeatKey", refValue("repeatKey"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
private let BetaDiscoverSkipSelector = obj(
            field("betaDiscoverSkip", "betaDiscoverSkip", arguments(fieldValue("selectedTagsIds", refValue("selectedTagsIds"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("tagGroup", "tagGroup", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("String")))
                        ))
                ))
        )
private let BetaNextDiscoverResetSelector = obj(
            field("betaNextDiscoverReset", "betaNextDiscoverReset", notNull(scalar("Boolean")))
        )
private let BetaSubmitNextDiscoverSelector = obj(
            field("betaSubmitNextDiscover", "betaSubmitNextDiscover", arguments(fieldValue("selectedTagsIds", refValue("selectedTagsIds")), fieldValue("excudedGroupsIds", refValue("excudedGroupsIds"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("tagGroup", "tagGroup", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("String")))
                        ))
                ))
        )
private let BuyPremiumChatPassSelector = obj(
            field("betaBuyPremiumChatPass", "betaBuyPremiumChatPass", arguments(fieldValue("chatId", refValue("chatId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("premiumPassIsActive", "premiumPassIsActive", notNull(scalar("Boolean"))),
                    field("membership", "membership", notNull(scalar("String")))
                )))
        )
private let BuyPremiumChatSubscriptionSelector = obj(
            field("betaBuyPremiumChatSubscription", "betaBuyPremiumChatSubscription", arguments(fieldValue("chatId", refValue("chatId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("premiumPassIsActive", "premiumPassIsActive", notNull(scalar("Boolean"))),
                    field("premiumSubscription", "premiumSubscription", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("state", "state", notNull(scalar("String")))
                        )),
                    field("membership", "membership", notNull(scalar("String")))
                )))
        )
private let CancelSubscriptionSelector = obj(
            field("subscriptionCancel", "subscriptionCancel", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
private let CommentSetReactionSelector = obj(
            field("commentReactionAdd", "commentReactionAdd", arguments(fieldValue("commentId", refValue("commentId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
private let CommentUnsetReactionSelector = obj(
            field("commentReactionRemove", "commentReactionRemove", arguments(fieldValue("commentId", refValue("commentId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
private let CommitCardSetupIntentSelector = obj(
            field("cardCommitSetupIntent", "cardCommitSetupIntent", arguments(fieldValue("id", refValue("id")), fieldValue("pmid", refValue("pmid"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
private let ConferenceAnswerSelector = obj(
            field("peerConnectionAnswer", "peerConnectionAnswer", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId")), fieldValue("ownPeerId", refValue("ownPeerId")), fieldValue("answer", refValue("answer"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
private let ConferenceCandidateSelector = obj(
            field("peerConnectionCandidate", "peerConnectionCandidate", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId")), fieldValue("ownPeerId", refValue("ownPeerId")), fieldValue("candidate", refValue("candidate"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
private let ConferenceJoinSelector = obj(
            field("conferenceJoin", "conferenceJoin", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("peerId", "peerId", notNull(scalar("ID"))),
                    field("conference", "conference", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Conference", ConferenceShortSelector)
                        )))
                )))
        )
private let ConferenceKeepAliveSelector = obj(
            field("conferenceKeepAlive", "conferenceKeepAlive", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
private let ConferenceLeaveSelector = obj(
            field("conferenceLeave", "conferenceLeave", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
private let ConferenceOfferSelector = obj(
            field("peerConnectionOffer", "peerConnectionOffer", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId")), fieldValue("ownPeerId", refValue("ownPeerId")), fieldValue("offer", refValue("offer"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
private let CreateAppSelector = obj(
            field("createApp", "createApp", arguments(fieldValue("name", refValue("name")), fieldValue("shortname", refValue("shortname")), fieldValue("photoRef", refValue("photoRef")), fieldValue("about", refValue("about"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                )))
        )
private let CreateCardSetupIntentSelector = obj(
            field("cardCreateSetupIntent", "cardCreateSetupIntent", arguments(fieldValue("retryKey", refValue("retryKey"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("clientSecret", "clientSecret", notNull(scalar("String")))
                )))
        )
private let CreateDepositIntentSelector = obj(
            field("cardDepositIntent", "cardDepositIntent", arguments(fieldValue("id", refValue("cardId")), fieldValue("amount", refValue("amount")), fieldValue("retryKey", refValue("retryKey"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("clientSecret", "clientSecret", notNull(scalar("String")))
                )))
        )
private let CreateOrganizationSelector = obj(
            field("createOrganization", "organization", arguments(fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("name", "name", notNull(scalar("String")))
                )))
        )
private let CreateUserProfileAndOrganizationSelector = obj(
            field("alphaCreateUserProfileAndOrganization", "alphaCreateUserProfileAndOrganization", arguments(fieldValue("user", refValue("user")), fieldValue("organization", refValue("organization"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("user", "user", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserFullSelector)
                        )),
                    field("organization", "organization", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("name", "name", notNull(scalar("String")))
                        ))
                )))
        )
private let DebugMailsSelector = obj(
            field("debugSendEmail", "debugSendEmail", arguments(fieldValue("type", refValue("type"))), scalar("Boolean"))
        )
private let DeleteCommentSelector = obj(
            field("deleteComment", "deleteComment", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
private let DeleteNotificationSelector = obj(
            field("deleteNotification", "deleteNotification", arguments(fieldValue("notificationId", refValue("notificationId"))), notNull(scalar("Boolean")))
        )
private let DeleteOrganizationSelector = obj(
            field("deleteOrganization", "deleteOrganization", arguments(fieldValue("id", refValue("organizationId"))), notNull(scalar("Boolean")))
        )
private let DeleteUserSelector = obj(
            field("superDeleteUser", "superDeleteUser", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
private let DiscoverCollectionsCreateSelector = obj(
            field("discoverCollectionsCreate", "discoverCollectionsCreate", arguments(fieldValue("collection", objectValue(fieldValue("title", refValue("title")),fieldValue("image", refValue("image")),fieldValue("chatIds", refValue("chatIds"))))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String")))
                )))
        )
private let DiscoverCollectionsDeleteSelector = obj(
            field("discoverCollectionsDelete", "discoverCollectionsDelete", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
private let DiscoverCollectionsUpdateSelector = obj(
            field("discoverCollectionsUpdate", "discoverCollectionsUpdate", arguments(fieldValue("id", refValue("id")), fieldValue("input", objectValue(fieldValue("title", refValue("title")),fieldValue("image", refValue("image")),fieldValue("chatIds", refValue("chatIds"))))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String")))
                )))
        )
private let DiscoverEditorsChoiceCreateSelector = obj(
            field("discoverEditorsChoiceCreate", "discoverEditorsChoiceCreate", arguments(fieldValue("input", objectValue(fieldValue("image", refValue("image")),fieldValue("cid", refValue("cid"))))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("image", "image", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("uuid", "uuid", notNull(scalar("String"))),
                            field("crop", "crop", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("x", "x", notNull(scalar("Int"))),
                                    field("y", "y", notNull(scalar("Int"))),
                                    field("w", "w", notNull(scalar("Int"))),
                                    field("h", "h", notNull(scalar("Int")))
                                ))
                        ))),
                    field("chat", "chat", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("title", "title", notNull(scalar("String")))
                        )))
                )))
        )
private let DiscoverEditorsChoiceDeleteSelector = obj(
            field("discoverEditorsChoiceDelete", "discoverEditorsChoiceDelete", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
private let DiscoverEditorsChoiceUpdateSelector = obj(
            field("discoverEditorsChoiceUpdate", "discoverEditorsChoiceUpdate", arguments(fieldValue("id", refValue("id")), fieldValue("input", objectValue(fieldValue("image", refValue("image")),fieldValue("cid", refValue("cid"))))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("image", "image", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("uuid", "uuid", notNull(scalar("String"))),
                            field("crop", "crop", obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("x", "x", notNull(scalar("Int"))),
                                    field("y", "y", notNull(scalar("Int"))),
                                    field("w", "w", notNull(scalar("Int"))),
                                    field("h", "h", notNull(scalar("Int")))
                                ))
                        ))),
                    field("chat", "chat", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("title", "title", notNull(scalar("String")))
                        )))
                )))
        )
private let EditCommentSelector = obj(
            field("editComment", "editComment", arguments(fieldValue("id", refValue("id")), fieldValue("message", refValue("message")), fieldValue("mentions", refValue("mentions")), fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("spans", refValue("spans"))), notNull(scalar("Boolean")))
        )
private let EditMessageSelector = obj(
            field("editMessage", "editMessage", arguments(fieldValue("messageId", refValue("messageId")), fieldValue("message", refValue("message")), fieldValue("replyMessages", refValue("replyMessages")), fieldValue("mentions", refValue("mentions")), fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("spans", refValue("spans"))), notNull(scalar("Boolean")))
        )
private let FeatureFlagAddSelector = obj(
            field("featureFlagAdd", "featureFlagAdd", arguments(fieldValue("key", refValue("key")), fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("key", "key", notNull(scalar("String"))),
                    field("title", "title", notNull(scalar("String")))
                )))
        )
private let FeatureFlagDisableSelector = obj(
            field("superAccountFeatureRemove", "superAccountFeatureRemove", arguments(fieldValue("id", refValue("accountId")), fieldValue("featureId", refValue("featureId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("features", "features", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("key", "key", notNull(scalar("String"))),
                            field("title", "title", notNull(scalar("String")))
                        )))))
                )))
        )
private let FeatureFlagEnableSelector = obj(
            field("superAccountFeatureAdd", "superAccountFeatureAdd", arguments(fieldValue("id", refValue("accountId")), fieldValue("featureId", refValue("featureId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("features", "features", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("key", "key", notNull(scalar("String"))),
                            field("title", "title", notNull(scalar("String")))
                        )))))
                )))
        )
private let FeedChannelAddWriterSelector = obj(
            field("alphaFeedChannelAddEditor", "alphaFeedChannelAddEditor", arguments(fieldValue("id", refValue("id")), fieldValue("userId", refValue("userId"))), notNull(scalar("Boolean")))
        )
private let FeedChannelCreateSelector = obj(
            field("alphaFeedCreateChannel", "channel", arguments(fieldValue("title", refValue("title")), fieldValue("about", refValue("about")), fieldValue("photoRef", refValue("photoRef")), fieldValue("global", refValue("global"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("FeedChannel", FeedChannelFullSelector)
                )))
        )
private let FeedChannelRemoveWriterSelector = obj(
            field("alphaFeedChannelRemoveEditor", "alphaFeedChannelRemoveEditor", arguments(fieldValue("id", refValue("id")), fieldValue("userId", refValue("userId"))), notNull(scalar("Boolean")))
        )
private let FeedChannelSubscribeSelector = obj(
            field("alphaFeedChannelSubscribe", "alphaFeedChannelSubscribe", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
private let FeedChannelUnsubscribeSelector = obj(
            field("alphaFeedChannelUnsubscribe", "alphaFeedChannelUnsubscribe", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
private let FeedChannelUpdateSelector = obj(
            field("alphaFeedUpdateChannel", "channel", arguments(fieldValue("id", refValue("id")), fieldValue("title", refValue("title")), fieldValue("about", refValue("about")), fieldValue("photoRef", refValue("photoRef")), fieldValue("global", refValue("global"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
private let FeedCreatePostSelector = obj(
            field("alphaCreateFeedPost", "post", arguments(fieldValue("channel", refValue("channel")), fieldValue("slides", refValue("slides")), fieldValue("repeatKey", refValue("repeatKey"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("FeedItem", FeedItemFullSelector)
                )))
        )
private let FeedDeletePostSelector = obj(
            field("alphaDeleteFeedPost", "alphaDeleteFeedPost", arguments(fieldValue("feedItemId", refValue("feedItemId"))), notNull(scalar("Boolean")))
        )
private let FeedEditPostSelector = obj(
            field("alphaEditFeedPost", "editFeedPost", arguments(fieldValue("feedItemId", refValue("feedItemId")), fieldValue("slides", refValue("slides"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("FeedItem", FeedItemFullSelector)
                )))
        )
private let FeedReactionAddSelector = obj(
            field("feedReactionAdd", "feedReactionAdd", arguments(fieldValue("feedItemId", refValue("feedItemId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
private let FeedReactionRemoveSelector = obj(
            field("feedReactionRemove", "feedReactionRemove", arguments(fieldValue("feedItemId", refValue("feedItemId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
private let MakeCardDefaultSelector = obj(
            field("cardMakeDefault", "cardMakeDefault", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("isDefault", "isDefault", notNull(scalar("Boolean")))
                )))
        )
private let MarkSequenceReadSelector = obj(
            field("alphaGlobalRead", "alphaGlobalRead", arguments(fieldValue("toSeq", refValue("seq"))), notNull(scalar("String")))
        )
private let MatchmakingConnectSelector = obj(
            field("matchmakingConnect", "matchmakingConnect", arguments(fieldValue("peerId", refValue("peerId")), fieldValue("uid", refValue("uid"))), notNull(scalar("Boolean")))
        )
private let MatchmakingProfileFillSelector = obj(
            field("matchmakingProfileFill", "matchmakingProfileFill", arguments(fieldValue("peerId", refValue("peerId")), fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("MatchmakingProfile", MatchmakingProfileFragmentSelector)
                )))
        )
private let MatchmakingRoomSaveSelector = obj(
            field("matchmakingRoomSave", "matchmakingRoomSave", arguments(fieldValue("peerId", refValue("peerId")), fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("MatchmakingRoom", MatchmakingRoomFragmentSelector)
                )))
        )
private let MediaAnswerSelector = obj(
            field("mediaStreamAnswer", "mediaStreamAnswer", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId")), fieldValue("answer", refValue("answer"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("streams", "streams", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("peerId", "peerId", scalar("ID")),
                            field("state", "state", notNull(scalar("String"))),
                            field("sdp", "sdp", scalar("String")),
                            field("ice", "ice", notNull(list(notNull(scalar("String")))))
                        )))))
                )))
        )
private let MediaCandidateSelector = obj(
            field("mediaStreamCandidate", "mediaStreamCandidate", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId")), fieldValue("candidate", refValue("candidate"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("streams", "streams", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("peerId", "peerId", scalar("ID")),
                            field("state", "state", notNull(scalar("String"))),
                            field("sdp", "sdp", scalar("String")),
                            field("ice", "ice", notNull(list(notNull(scalar("String")))))
                        )))))
                )))
        )
private let MediaFailedSelector = obj(
            field("mediaStreamFailed", "mediaStreamFailed", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("streams", "streams", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("peerId", "peerId", scalar("ID")),
                            field("state", "state", notNull(scalar("String"))),
                            field("sdp", "sdp", scalar("String")),
                            field("ice", "ice", notNull(list(notNull(scalar("String")))))
                        )))))
                )))
        )
private let MediaNegotiationNeededSelector = obj(
            field("mediaStreamNegotiationNeeded", "mediaStreamNegotiationNeeded", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("streams", "streams", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("peerId", "peerId", scalar("ID")),
                            field("state", "state", notNull(scalar("String"))),
                            field("sdp", "sdp", scalar("String")),
                            field("ice", "ice", notNull(list(notNull(scalar("String")))))
                        )))))
                )))
        )
private let MediaOfferSelector = obj(
            field("mediaStreamOffer", "mediaStreamOffer", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId")), fieldValue("offer", refValue("offer"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("streams", "streams", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("peerId", "peerId", scalar("ID")),
                            field("state", "state", notNull(scalar("String"))),
                            field("sdp", "sdp", scalar("String")),
                            field("ice", "ice", notNull(list(notNull(scalar("String")))))
                        )))))
                )))
        )
private let MessageSetReactionSelector = obj(
            field("messageReactionAdd", "messageReactionAdd", arguments(fieldValue("messageId", refValue("messageId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
private let MessageUnsetReactionSelector = obj(
            field("messageReactionRemove", "messageReactionRemove", arguments(fieldValue("messageId", refValue("messageId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
private let MyNotificationCenterMarkSeqReadSelector = obj(
            field("notificationCenterMarkSeqRead", "notificationCenterMarkSeqRead", arguments(fieldValue("toSeq", refValue("seq"))), notNull(scalar("Boolean")))
        )
private let OrganizationActivateByInviteSelector = obj(
            field("joinAppInvite", "joinAppInvite", arguments(fieldValue("key", refValue("inviteKey"))), notNull(scalar("ID")))
        )
private let OrganizationAddMemberSelector = obj(
            field("alphaOrganizationMemberAdd", "alphaOrganizationMemberAdd", arguments(fieldValue("userIds", refValue("userIds")), fieldValue("organizationId", refValue("organizationId"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("role", "role", notNull(scalar("String"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))
                )))))
        )
private let OrganizationAlterPublishedSelector = obj(
            field("alphaAlterPublished", "alphaAlterPublished", arguments(fieldValue("id", refValue("organizationId")), fieldValue("published", refValue("published"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationSearchSelector)
                )))
        )
private let OrganizationChangeMemberRoleSelector = obj(
            field("alphaOrganizationChangeMemberRole", "alphaOrganizationChangeMemberRole", arguments(fieldValue("memberId", refValue("memberId")), fieldValue("newRole", refValue("newRole")), fieldValue("organizationId", refValue("organizationId"))), notNull(scalar("String")))
        )
private let OrganizationCreatePublicInviteSelector = obj(
            field("alphaOrganizationRefreshInviteLink", "alphaOrganizationRefreshInviteLink", arguments(fieldValue("expirationDays", refValue("expirationDays")), fieldValue("organizationId", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("key", "key", notNull(scalar("String"))),
                    field("ttl", "ttl", scalar("String"))
                )))
        )
private let OrganizationMemberRemoveSelector = obj(
            field("betaOrganizationMemberRemove", "betaOrganizationMemberRemove", arguments(fieldValue("userId", refValue("userId")), fieldValue("organizationId", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
private let PaymentIntentCancelSelector = obj(
            field("paymentCancel", "paymentCancel", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
private let PaymentIntentCommitSelector = obj(
            field("paymentIntentCommit", "paymentIntentCommit", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
private let PersistEventsSelector = obj(
            field("track", "track", arguments(fieldValue("did", refValue("did")), fieldValue("events", refValue("events")), fieldValue("isProd", refValue("isProd"))), notNull(scalar("String")))
        )
private let PinMessageSelector = obj(
            field("gammaPinMessage", "pinMessage", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("messageId", refValue("messageId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))
        )
private let ProfileCreateSelector = obj(
            field("profileCreate", "profileCreate", arguments(fieldValue("input", refValue("input")), fieldValue("inviteKey", refValue("inviteKey"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("firstName", "firstName", scalar("String")),
                    field("lastName", "lastName", scalar("String")),
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
                    field("email", "email", scalar("String")),
                    field("phone", "phone", scalar("String")),
                    field("website", "website", scalar("String")),
                    field("about", "about", scalar("String")),
                    field("location", "location", scalar("String"))
                )))
        )
private let ProfileUpdateSelector = obj(
            field("profileUpdate", "profileUpdate", arguments(fieldValue("input", refValue("input")), fieldValue("uid", refValue("uid")), fieldValue("inviteKey", refValue("inviteKey"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("firstName", "firstName", scalar("String")),
                    field("lastName", "lastName", scalar("String")),
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
                    field("email", "email", scalar("String")),
                    field("phone", "phone", scalar("String")),
                    field("website", "website", scalar("String")),
                    field("about", "about", scalar("String")),
                    field("location", "location", scalar("String")),
                    field("alphaRole", "role", scalar("String")),
                    field("linkedin", "linkedin", scalar("String")),
                    field("instagram", "instagram", scalar("String")),
                    field("facebook", "facebook", scalar("String")),
                    field("twitter", "twitter", scalar("String")),
                    field("alphaPrimaryOrganizationId", "primaryOrganizationId", scalar("ID")),
                    field("alphaJoinedAt", "joinedAt", scalar("String")),
                    field("alphaInvitedBy", "invitedBy", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("name", "name", notNull(scalar("String")))
                        ))
                )))
        )
private let ReadNotificationSelector = obj(
            field("readNotification", "readNotification", arguments(fieldValue("notificationId", refValue("notificationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("unread", "unread", notNull(scalar("Int")))
                )))
        )
private let RefreshAppTokenSelector = obj(
            field("refreshAppToken", "refreshAppToken", arguments(fieldValue("appId", refValue("appId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                )))
        )
private let RegisterPushSelector = obj(
            field("registerPush", "registerPush", arguments(fieldValue("endpoint", refValue("endpoint")), fieldValue("type", refValue("type"))), notNull(scalar("String")))
        )
private let RegisterWebPushSelector = obj(
            field("registerWebPush", "registerWebPush", arguments(fieldValue("endpoint", refValue("endpoint"))), notNull(scalar("String")))
        )
private let RemoveCardSelector = obj(
            field("cardRemove", "cardRemove", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("deleted", "deleted", notNull(scalar("Boolean")))
                )))
        )
private let ReportContentSelector = obj(
            field("reportContent", "reportContent", arguments(fieldValue("contentId", refValue("contentId")), fieldValue("type", refValue("type")), fieldValue("message", refValue("message"))), scalar("Boolean"))
        )
private let ReportOnlineSelector = obj(
            field("presenceReportOnline", "presenceReportOnline", arguments(fieldValue("timeout", intValue(5000)), fieldValue("active", refValue("active")), fieldValue("platform", refValue("platform"))), notNull(scalar("String")))
        )
private let RoomAddMembersSelector = obj(
            field("alphaRoomInvite", "alphaRoomInvite", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("invites", refValue("invites"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))),
                    field("role", "role", notNull(scalar("String"))),
                    field("membership", "membership", notNull(scalar("String"))),
                    field("canKick", "canKick", notNull(scalar("Boolean"))),
                    field("badge", "badge", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("UserBadge", UserBadgeSelector)
                        ))
                )))))
        )
private let RoomAlterFeaturedSelector = obj(
            field("betaRoomAlterFeatured", "betaRoomAlterFeatured", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("featured", refValue("featured"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("listed", "listed", notNull(scalar("Boolean"))),
                    field("featured", "featured", notNull(scalar("Boolean")))
                )))
        )
private let RoomAlterHiddenSelector = obj(
            field("betaRoomAlterListed", "betaRoomAlterListed", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("listed", refValue("listed"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("listed", "listed", notNull(scalar("Boolean"))),
                    field("featured", "featured", notNull(scalar("Boolean")))
                )))
        )
private let RoomChangeRoleSelector = obj(
            field("betaRoomChangeRole", "betaRoomChangeRole", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId")), fieldValue("newRole", refValue("newRole"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                )))
        )
private let RoomCreateSelector = obj(
            field("betaRoomCreate", "room", arguments(fieldValue("kind", refValue("kind")), fieldValue("members", refValue("members")), fieldValue("message", refValue("message")), fieldValue("title", refValue("title")), fieldValue("description", refValue("description")), fieldValue("photoRef", refValue("photoRef")), fieldValue("organizationId", refValue("organizationId")), fieldValue("channel", refValue("channel")), fieldValue("price", refValue("price")), fieldValue("interval", refValue("interval"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
private let RoomDeleteMessageSelector = obj(
            field("betaMessageDelete", "betaMessageDelete", arguments(fieldValue("mid", refValue("messageId"))), notNull(scalar("Boolean")))
        )
private let RoomDeleteMessagesSelector = obj(
            field("betaMessageDelete", "betaMessageDelete", arguments(fieldValue("mids", refValue("mids"))), notNull(scalar("Boolean")))
        )
private let RoomDeleteUrlAugmentationSelector = obj(
            field("betaMessageDeleteAugmentation", "betaMessageDeleteAugmentation", arguments(fieldValue("mid", refValue("messageId"))), notNull(scalar("Boolean")))
        )
private let RoomJoinSelector = obj(
            field("betaRoomJoin", "join", arguments(fieldValue("roomId", refValue("roomId"))), notNull(obj(
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
        )
private let RoomJoinInviteLinkSelector = obj(
            field("betaRoomInviteLinkJoin", "join", arguments(fieldValue("invite", refValue("invite"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))
        )
private let RoomKickSelector = obj(
            field("betaRoomKick", "betaRoomKick", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                )))
        )
private let RoomLeaveSelector = obj(
            field("betaRoomLeave", "betaRoomLeave", arguments(fieldValue("roomId", refValue("roomId"))), notNull(obj(
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
        )
private let RoomReadSelector = obj(
            field("roomRead", "roomRead", arguments(fieldValue("id", refValue("id")), fieldValue("mid", refValue("mid"))), notNull(scalar("Boolean")))
        )
private let RoomRenewInviteLinkSelector = obj(
            field("betaRoomInviteLinkRenew", "link", arguments(fieldValue("roomId", refValue("roomId"))), notNull(scalar("String")))
        )
private let RoomSettingsUpdateSelector = obj(
            field("betaRoomUpdateUserNotificationSettings", "betaRoomUpdateUserNotificationSettings", arguments(fieldValue("settings", refValue("settings")), fieldValue("roomId", refValue("roomId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("mute", "mute", scalar("Boolean"))
                )))
        )
private let RoomUpdateSelector = obj(
            field("betaRoomUpdate", "betaRoomUpdate", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    )),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("title", "title", notNull(scalar("String"))),
                        field("photo", "photo", notNull(scalar("String"))),
                        field("description", "description", scalar("String")),
                        field("socialImage", "socialImage", scalar("String"))
                    ))
                )))
        )
private let RoomsInviteUserSelector = obj(
            field("betaRoomsInviteUser", "rooms", arguments(fieldValue("userId", refValue("userId")), fieldValue("roomIds", refValue("roomIds"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))))
        )
private let RoomsJoinSelector = obj(
            field("betaRoomsJoin", "join", arguments(fieldValue("roomsIds", refValue("roomsIds"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("PrivateRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    )),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    ))
                )))))
        )
private let SendDonationSelector = obj(
            field("sendDonation", "sendDonation", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("amount", refValue("amount")), fieldValue("message", refValue("message")), fieldValue("repeatKey", refValue("repeatKey"))), notNull(scalar("Boolean")))
        )
private let SendMessageSelector = obj(
            field("sendMessage", "sentMessage", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("message", refValue("message")), fieldValue("replyMessages", refValue("replyMessages")), fieldValue("mentions", refValue("mentions")), fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("spans", refValue("spans")), fieldValue("repeatKey", refValue("repeatKey"))), notNull(scalar("Boolean")))
        )
private let SendStickerSelector = obj(
            field("sendSticker", "sendSticker", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("stickerId", refValue("stickerId")), fieldValue("replyMessages", refValue("replyMessages")), fieldValue("repeatKey", refValue("repeatKey"))), notNull(scalar("Boolean")))
        )
private let SetFeedChannelShortnameSelector = obj(
            field("alphaSetFeedChannelShortName", "alphaSetFeedChannelShortName", arguments(fieldValue("id", refValue("id")), fieldValue("shortname", refValue("shortname"))), scalar("String"))
        )
private let SetOrgShortnameSelector = obj(
            field("alphaSetOrgShortName", "alphaSetOrgShortName", arguments(fieldValue("id", refValue("organizationId")), fieldValue("shortname", refValue("shortname"))), scalar("String"))
        )
private let SetRoomShortnameSelector = obj(
            field("alphaSetRoomShortName", "alphaSetRoomShortName", arguments(fieldValue("id", refValue("id")), fieldValue("shortname", refValue("shortname"))), scalar("String"))
        )
private let SetTypingSelector = obj(
            field("typingSend", "typingSend", arguments(fieldValue("conversationId", refValue("conversationId")), fieldValue("type", refValue("type"))), notNull(scalar("String")))
        )
private let SetUserShortnameSelector = obj(
            field("alphaSetUserShortName", "alphaSetUserShortName", arguments(fieldValue("shortname", refValue("shortname"))), scalar("String"))
        )
private let SettingsUpdateSelector = obj(
            field("updateSettings", "updateSettings", arguments(fieldValue("settings", refValue("input"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Settings", SettingsFullSelector)
                )))
        )
private let StickerPackAddToCollectionSelector = obj(
            field("stickerPackAddToCollection", "stickerPackAddToCollection", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
private let StickerPackRemoveFromCollectionSelector = obj(
            field("stickerPackRemoveFromCollection", "stickerPackRemoveFromCollection", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
private let SubscribeToCommentsSelector = obj(
            field("subscribeToComments", "subscribeToComments", arguments(fieldValue("peerId", refValue("peerId")), fieldValue("type", refValue("type"))), notNull(scalar("Boolean")))
        )
private let SuperAccountActivateSelector = obj(
            field("superAccountActivate", "superAccountActivate", arguments(fieldValue("id", refValue("accountId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("state", "state", notNull(scalar("String")))
                )))
        )
private let SuperAccountAddSelector = obj(
            field("superAccountAdd", "superAccountAdd", arguments(fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
private let SuperAccountMemberAddSelector = obj(
            field("superAccountMemberAdd", "superAccountMemberAdd", arguments(fieldValue("id", refValue("accountId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("members", "members", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))))
                )))
        )
private let SuperAccountMemberRemoveSelector = obj(
            field("superAccountMemberRemove", "superAccountMemberRemove", arguments(fieldValue("id", refValue("accountId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("members", "members", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))))
                )))
        )
private let SuperAccountPendSelector = obj(
            field("superAccountPend", "superAccountPend", arguments(fieldValue("id", refValue("accountId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("state", "state", notNull(scalar("String")))
                )))
        )
private let SuperAccountRenameSelector = obj(
            field("superAccountRename", "superAccountRename", arguments(fieldValue("id", refValue("accountId")), fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String")))
                )))
        )
private let SuperAccountSuspendSelector = obj(
            field("superAccountSuspend", "superAccountSuspend", arguments(fieldValue("id", refValue("accountId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("state", "state", notNull(scalar("String")))
                )))
        )
private let SuperAdminAddSelector = obj(
            field("superAdminAdd", "superAdminAdd", arguments(fieldValue("userId", refValue("userId")), fieldValue("role", refValue("role"))), notNull(scalar("String")))
        )
private let SuperAdminRemoveSelector = obj(
            field("superAdminRemove", "superAdminRemove", arguments(fieldValue("userId", refValue("userId"))), notNull(scalar("String")))
        )
private let SuperBadgeCreateToRoomSelector = obj(
            field("superBadgeCreateToRoom", "superBadgeCreateToRoom", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId")), fieldValue("name", refValue("name"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                )))
        )
private let SuperBadgeUnsetToRoomSelector = obj(
            field("superBadgeUnsetToRoom", "superBadgeUnsetToRoom", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId")), fieldValue("badgeId", refValue("badgeId"))), notNull(scalar("Boolean")))
        )
private let UnSubscribeFromCommentsSelector = obj(
            field("unsubscribeFromComments", "unsubscribeFromComments", arguments(fieldValue("peerId", refValue("peerId"))), notNull(scalar("Boolean")))
        )
private let UnpinMessageSelector = obj(
            field("gammaUnpinMessage", "unpinMessage", arguments(fieldValue("chatId", refValue("chatId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))
        )
private let UnsetTypingSelector = obj(
            field("typingCancel", "typingCancel", arguments(fieldValue("conversationId", refValue("conversationId"))), notNull(scalar("String")))
        )
private let UpdateAppSelector = obj(
            field("updateAppProfile", "updateAppProfile", arguments(fieldValue("appId", refValue("appId")), fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                )))
        )
private let UpdateOrganizationSelector = obj(
            field("updateOrganizationProfile", "updateOrganizationProfile", arguments(fieldValue("input", refValue("input")), fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("OrganizationProfile", OrganizationProfileFullSelector)
                )))
        )
private let UpdateWelcomeMessageSelector = obj(
            field("updateWelcomeMessage", "updateWelcomeMessage", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("welcomeMessageIsOn", refValue("welcomeMessageIsOn")), fieldValue("welcomeMessageSender", refValue("welcomeMessageSender")), fieldValue("welcomeMessageText", refValue("welcomeMessageText"))), notNull(scalar("Boolean")))
        )
private let UserStorageSetSelector = obj(
            field("userStorageSet", "userStorageSet", arguments(fieldValue("namespace", refValue("namespace")), fieldValue("data", refValue("data"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("key", "key", notNull(scalar("String"))),
                    field("value", "value", scalar("String"))
                )))))
        )
private let ChatOnlinesCountWatchSelector = obj(
            field("chatOnlinesCount", "chatOnlinesCount", arguments(fieldValue("chatId", refValue("chatId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("onlineMembers", "onlineMembers", notNull(scalar("Int")))
                )))
        )
private let ChatWatchSelector = obj(
            field("chatUpdates", "event", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("fromState", refValue("state"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("ChatUpdateSingle", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("seq", "seq", notNull(scalar("Int"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("update", "update", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("ChatUpdate", ChatUpdateFragmentSelector)
                            )))
                    )),
                    inline("ChatUpdateBatch", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("fromSeq", "fromSeq", notNull(scalar("Int"))),
                        field("seq", "seq", notNull(scalar("Int"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("updates", "updates", notNull(list(notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("ChatUpdate", ChatUpdateFragmentSelector)
                            )))))
                    ))
                )))
        )
private let CommentWatchSelector = obj(
            field("commentUpdates", "event", arguments(fieldValue("peerId", refValue("peerId")), fieldValue("fromState", refValue("fromState"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("CommentUpdateSingle", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("seq", "seq", notNull(scalar("Int"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("update", "update", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("CommentUpdate", CommentUpdateFragmentSelector)
                            )))
                    )),
                    inline("CommentUpdateBatch", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("fromSeq", "fromSeq", notNull(scalar("Int"))),
                        field("seq", "seq", notNull(scalar("Int"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("updates", "updates", notNull(list(notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("CommentUpdate", CommentUpdateFragmentSelector)
                            )))))
                    ))
                ))
        )
private let ConferenceMediaWatchSelector = obj(
            field("alphaConferenceMediaWatch", "media", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("streams", "streams", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("peerId", "peerId", scalar("ID")),
                            field("state", "state", notNull(scalar("String"))),
                            field("sdp", "sdp", scalar("String")),
                            field("ice", "ice", notNull(list(notNull(scalar("String")))))
                        )))))
                )))
        )
private let ConferenceWatchSelector = obj(
            field("alphaConferenceWatch", "alphaConferenceWatch", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceFullSelector)
                )))
        )
private let DebugEventsWatchSelector = obj(
            field("debugEvents", "debugEvents", arguments(fieldValue("fromState", refValue("fromState")), fieldValue("eventsCount", refValue("eventsCount")), fieldValue("randomDelays", refValue("randomDelays")), fieldValue("seed", refValue("seed"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("seq", "seq", notNull(scalar("Int"))),
                    field("key", "key", notNull(scalar("String")))
                )))
        )
private let DialogsWatchSelector = obj(
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
private let FeedUpdatesSelector = obj(
            field("homeFeedUpdates", "event", arguments(fieldValue("fromState", refValue("state"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("updates", "updates", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("FeedUpdate", FeedUpdateFragmentSelector)
                        ))))),
                    field("state", "state", notNull(scalar("String")))
                )))
        )
private let MyNotificationsCenterSelector = obj(
            field("notificationCenterUpdates", "event", arguments(fieldValue("fromState", refValue("state"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("NotificationCenterUpdateSingle", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("seq", "seq", notNull(scalar("Int"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("update", "update", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("NotificationCenterUpdate", NotificationCenterUpdateFragmentSelector)
                            )))
                    )),
                    inline("NotificationCenterUpdateBatch", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("fromSeq", "fromSeq", notNull(scalar("Int"))),
                        field("seq", "seq", notNull(scalar("Int"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("updates", "updates", notNull(list(notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("NotificationCenterUpdate", NotificationCenterUpdateFragmentSelector)
                            )))))
                    ))
                ))
        )
private let OnlineWatchSelector = obj(
            field("alphaSubscribeOnline", "alphaSubscribeOnline", arguments(fieldValue("users", refValue("users"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("online", "online", notNull(scalar("Boolean"))),
                            field("lastSeen", "lastSeen", scalar("String"))
                        ))),
                    field("timeout", "timeout", notNull(scalar("Int")))
                )))
        )
private let SettingsWatchSelector = obj(
            field("watchSettings", "watchSettings", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Settings", SettingsFullSelector)
                )))
        )
private let TypingsWatchSelector = obj(
            field("typings", "typings", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("chat", "conversation", notNull(obj(
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
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("photo", "photo", scalar("String")),
                            field("firstName", "firstName", notNull(scalar("String")))
                        ))),
                    field("cancel", "cancel", notNull(scalar("Boolean"))),
                    field("type", "type", notNull(scalar("String")))
                )))
        )
private let WalletUpdatesSelector = obj(
            field("walletUpdates", "event", arguments(fieldValue("fromState", refValue("state"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("WalletUpdateSingle", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("update", "update", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("WalletUpdate", WalletUpdateFragmentSelector)
                            )))
                    )),
                    inline("WalletUpdateBatch", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("updates", "updates", notNull(list(notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("WalletUpdate", WalletUpdateFragmentSelector)
                            )))))
                    ))
                )))
        )

class Operations {
    static let shared = Operations()
    
    private init() { }
    let Account = OperationDefinition(
        "Account",
        .query, 
        "query Account{me:me{__typename ...UserShort}myProfile{__typename id authEmail}sessionState:sessionState{__typename ...SessionStateFull}myPermissions{__typename roles}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment SessionStateFull on SessionState{__typename isLoggedIn isActivated isProfileCreated isAccountActivated isAccountExists isAccountPicked isCompleted isBlocked}",
        AccountSelector
    )
    let AccountAppInvite = OperationDefinition(
        "AccountAppInvite",
        .query, 
        "query AccountAppInvite{invite:appInvite}",
        AccountAppInviteSelector
    )
    let AccountAppInviteInfo = OperationDefinition(
        "AccountAppInviteInfo",
        .query, 
        "query AccountAppInviteInfo($inviteKey:String!){invite:alphaInviteInfo(key:$inviteKey){__typename id creator{__typename ...UserShort}}appInvite:appInviteInfo(key:$inviteKey){__typename inviter{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        AccountAppInviteInfoSelector
    )
    let AccountInviteInfo = OperationDefinition(
        "AccountInviteInfo",
        .query, 
        "query AccountInviteInfo($inviteKey:String!){invite:alphaInviteInfo(key:$inviteKey){__typename id key orgId title photo joined creator{__typename ...UserShort}forEmail forName membersCount organization{__typename id isCommunity:alphaIsCommunity about}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        AccountInviteInfoSelector
    )
    let AccountSettings = OperationDefinition(
        "AccountSettings",
        .query, 
        "query AccountSettings{me:me{__typename ...UserShort audienceSize}myProfile{__typename id authEmail}organizations:myOrganizations{__typename ...OrganizationShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        AccountSettingsSelector
    )
    let AuthResolveShortName = OperationDefinition(
        "AuthResolveShortName",
        .query, 
        "query AuthResolveShortName($shortname:String!){item:alphaResolveShortName(shortname:$shortname){__typename ... on User{__typename ...UserNano}... on SharedRoom{__typename ...RoomPreview}}}fragment UserNano on User{__typename id name firstName lastName photo online}fragment RoomPreview on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}}... on SharedRoom{__typename id isChannel isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}membership owner{__typename id}matchmaking{__typename enabled}title photo membersCount description previewMembers{__typename id name photo}onlineMembersCount}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        AuthResolveShortNameSelector
    )
    let ChatInit = OperationDefinition(
        "ChatInit",
        .query, 
        "query ChatInit($chatId:ID!,$before:ID,$first:Int!){messages(chatId:$chatId,first:$first,before:$before){__typename ...FullMessage}state:conversationState(id:$chatId){__typename state}room(id:$chatId){__typename ...RoomShort}lastReadedMessage(chatId:$chatId){__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount pinnedMessage{__typename ...FullMessage}matchmaking{__typename ...MatchmakingRoomFragment}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName}}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}",
        ChatInitSelector
    )
    let ChatInitFromUnread = OperationDefinition(
        "ChatInitFromUnread",
        .query, 
        "query ChatInitFromUnread($chatId:ID!,$before:ID,$first:Int!){gammaMessages(chatId:$chatId,first:$first,before:$before){__typename messages{__typename ...FullMessage}haveMoreForward haveMoreBackward}state:conversationState(id:$chatId){__typename state}room(id:$chatId){__typename ...RoomShort}lastReadedMessage(chatId:$chatId){__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount pinnedMessage{__typename ...FullMessage}matchmaking{__typename ...MatchmakingRoomFragment}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName}}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}",
        ChatInitFromUnreadSelector
    )
    let ChatJoin = OperationDefinition(
        "ChatJoin",
        .query, 
        "query ChatJoin($id:ID!){room(id:$id){__typename ... on SharedRoom{__typename id title description photo membersCount onlineMembersCount previewMembers{__typename id photo name}isChannel isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}}",
        ChatJoinSelector
    )
    let ChatMembersSearch = OperationDefinition(
        "ChatMembersSearch",
        .query, 
        "query ChatMembersSearch($cid:ID!,$query:String,$first:Int!,$after:String){members:chatMembersSearch(cid:$cid,query:$query,first:$first,after:$after){__typename edges{__typename user:node{__typename id name shortname photo primaryOrganization{__typename id name}}cursor}pageInfo{__typename hasNextPage}}}",
        ChatMembersSearchSelector
    )
    let ChatMentionSearch = OperationDefinition(
        "ChatMentionSearch",
        .query, 
        "query ChatMentionSearch($cid:ID!,$query:String,$first:Int!,$after:String){mentions:chatMentionSearch(cid:$cid,query:$query,first:$first,after:$after){__typename globalItems{__typename ... on Organization{__typename ...OrganizationShort}... on User{__typename ...UserForMention}... on SharedRoom{__typename ...RoomSharedNano}}localItems{__typename ...UserForMention}cursor}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}",
        ChatMentionSearchSelector
    )
    let Comments = OperationDefinition(
        "Comments",
        .query, 
        "query Comments($peerId:ID!){comments(peerId:$peerId){__typename id state{__typename state}count comments{__typename ...CommentEntryFragment}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage id}parentComment{__typename comment:betaComment{__typename id message}id}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}",
        CommentsSelector
    )
    let Conference = OperationDefinition(
        "Conference",
        .query, 
        "query Conference($id:ID!){conference(id:$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename id startTime peers{__typename id user{__typename ...UserShort}connection{__typename state sdp ice}}iceServers{__typename urls username credential}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        ConferenceSelector
    )
    let ConferenceMedia = OperationDefinition(
        "ConferenceMedia",
        .query, 
        "query ConferenceMedia($id:ID!,$peerId:ID!){conferenceMedia(id:$id,peerId:$peerId){__typename id streams{__typename id peerId state sdp ice}iceServers{__typename urls username credential}}}",
        ConferenceMediaSelector
    )
    let Dialogs = OperationDefinition(
        "Dialogs",
        .query, 
        "query Dialogs($after:String){dialogs(first:20,after:$after){__typename items{__typename ...DialogFragment}cursor}state:dialogsState{__typename state}counter:alphaNotificationCounter{__typename id unreadCount}}fragment DialogFragment on Dialog{__typename id cid fid kind isChannel isPremium title photo unreadCount isMuted haveMention topMessage:alphaTopMessage{__typename ...DialogMessage}membership}fragment DialogMessage on ModernMessage{__typename id date sender{__typename id name photo firstName}message fallback ... on GeneralMessage{__typename id quotedMessages{__typename id}}}",
        DialogsSelector
    )
    let DiscoverCollection = OperationDefinition(
        "DiscoverCollection",
        .query, 
        "query DiscoverCollection($id:ID!){discoverCollection(id:$id){__typename id title chats{__typename ...DiscoverSharedRoom}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
        DiscoverCollectionSelector
    )
    let DiscoverCollectionShort = OperationDefinition(
        "DiscoverCollectionShort",
        .query, 
        "query DiscoverCollectionShort($id:ID!){discoverCollection(id:$id){__typename id title image{__typename uuid crop{__typename x y w h}}}}",
        DiscoverCollectionShortSelector
    )
    let DiscoverCollections = OperationDefinition(
        "DiscoverCollections",
        .query, 
        "query DiscoverCollections($first:Int!,$after:String){discoverCollections(first:$first,after:$after){__typename items{__typename ...DiscoverChatsCollection}cursor}}fragment DiscoverChatsCollection on DiscoverChatsCollection{__typename id title chatsCount chats{__typename ...DiscoverSharedRoom}image{__typename uuid crop{__typename x y w h}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
        DiscoverCollectionsSelector
    )
    let DiscoverCollectionsShort = OperationDefinition(
        "DiscoverCollectionsShort",
        .query, 
        "query DiscoverCollectionsShort($first:Int!,$after:String){discoverCollections(first:$first,after:$after){__typename items{__typename ...DiscoverChatsCollectionShort}cursor}}fragment DiscoverChatsCollectionShort on DiscoverChatsCollection{__typename id title chatsCount image{__typename uuid crop{__typename x y w h}}}",
        DiscoverCollectionsShortSelector
    )
    let DiscoverEditorsChoice = OperationDefinition(
        "DiscoverEditorsChoice",
        .query, 
        "query DiscoverEditorsChoice{discoverEditorsChoice{__typename id image{__typename uuid crop{__typename x y w h}}chat{__typename ...DiscoverSharedRoom}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
        DiscoverEditorsChoiceSelector
    )
    let DiscoverIsDone = OperationDefinition(
        "DiscoverIsDone",
        .query, 
        "query DiscoverIsDone{betaIsDiscoverDone}",
        DiscoverIsDoneSelector
    )
    let DiscoverNewAndGrowing = OperationDefinition(
        "DiscoverNewAndGrowing",
        .query, 
        "query DiscoverNewAndGrowing($first:Int!,$seed:Int!,$after:String){discoverNewAndGrowing(first:$first,seed:$seed,after:$after){__typename items{__typename ...DiscoverSharedRoom}cursor}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
        DiscoverNewAndGrowingSelector
    )
    let DiscoverNextPage = OperationDefinition(
        "DiscoverNextPage",
        .query, 
        "query DiscoverNextPage($selectedTagsIds:[String!]!,$excudedGroupsIds:[String!]!){betaNextDiscoverPage:gammaNextDiscoverPage(selectedTagsIds:$selectedTagsIds,excudedGroupsIds:$excudedGroupsIds){__typename chats{__typename ...RoomShort}tagGroup{__typename id title subtitle tags{__typename id title}}}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount pinnedMessage{__typename ...FullMessage}matchmaking{__typename ...MatchmakingRoomFragment}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}",
        DiscoverNextPageSelector
    )
    let DiscoverPopularNow = OperationDefinition(
        "DiscoverPopularNow",
        .query, 
        "query DiscoverPopularNow($first:Int!,$after:String){discoverPopularNow(first:$first,after:$after){__typename items{__typename room{__typename ...DiscoverSharedRoom}newMessages}cursor}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
        DiscoverPopularNowSelector
    )
    let DiscoverState = OperationDefinition(
        "DiscoverState",
        .query, 
        "query DiscoverState{dialogs(first:1){__typename items{__typename id}}}",
        DiscoverStateSelector
    )
    let DiscoverSuggestedRooms = OperationDefinition(
        "DiscoverSuggestedRooms",
        .query, 
        "query DiscoverSuggestedRooms{suggestedRooms:betaSuggestedRooms{__typename ...DiscoverSharedRoom}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
        DiscoverSuggestedRoomsSelector
    )
    let DiscoverTopFree = OperationDefinition(
        "DiscoverTopFree",
        .query, 
        "query DiscoverTopFree($first:Int!,$after:String){discoverTopFree(first:$first,after:$after){__typename items{__typename ...DiscoverSharedRoom}cursor}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
        DiscoverTopFreeSelector
    )
    let DiscoverTopPremium = OperationDefinition(
        "DiscoverTopPremium",
        .query, 
        "query DiscoverTopPremium($first:Int!,$after:String){discoverTopPremium(first:$first,after:$after){__typename items{__typename ...DiscoverSharedRoom}cursor}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
        DiscoverTopPremiumSelector
    )
    let ExplorePeople = OperationDefinition(
        "ExplorePeople",
        .query, 
        "query ExplorePeople($query:String,$sort:String,$page:Int,$after:String){items:userSearch(query:$query,sort:$sort,page:$page,first:25,after:$after){__typename edges{__typename node{__typename ...UserShort isYou}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount currentPage pagesCount openEnded}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        ExplorePeopleSelector
    )
    let ExploreRooms = OperationDefinition(
        "ExploreRooms",
        .query, 
        "query ExploreRooms($seed:Int!){discoverNewAndGrowing(first:3,seed:$seed){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverPopularNow(first:3){__typename items{__typename room{__typename ...DiscoverSharedRoom}newMessages}cursor}suggestedRooms:betaSuggestedRooms{__typename ...DiscoverSharedRoom}discoverTopPremium(first:5){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverTopFree(first:5){__typename items{__typename ...DiscoverSharedRoom}cursor}isDiscoverDone:betaIsDiscoverDone}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
        ExploreRoomsSelector
    )
    let FeatureFlags = OperationDefinition(
        "FeatureFlags",
        .query, 
        "query FeatureFlags{featureFlags{__typename id key title}}",
        FeatureFlagsSelector
    )
    let FeedChannel = OperationDefinition(
        "FeedChannel",
        .query, 
        "query FeedChannel($id:ID!){channel:alphaFeedChannel(id:$id){__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}",
        FeedChannelSelector
    )
    let FeedChannelContent = OperationDefinition(
        "FeedChannelContent",
        .query, 
        "query FeedChannelContent($id:ID!,$first:Int!,$after:String){content:alphaFeedChannelContent(id:$id,first:$first,after:$after){__typename items{__typename ...FeedItemFull}cursor}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{__typename id date author{__typename ...FeedPostAuthorFragment}source{__typename ...FeedPostSourceFragment}edited canEdit commentsCount message fallback reactions{__typename user{__typename ...UserShort}reaction}slides{__typename ...SlideFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{__typename ...UserShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}fragment SlideFragment on Slide{__typename ... on TextSlide{__typename id text spans{__typename ...SpanFragment}cover{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}coverAlign attachments{__typename ... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title roomPhoto:photo membersCount membership canSendMessage organization{__typename id name photo}}... on Organization{__typename ...OrganizationShort}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}",
        FeedChannelContentSelector
    )
    let FeedChannelSubscribers = OperationDefinition(
        "FeedChannelSubscribers",
        .query, 
        "query FeedChannelSubscribers($channelId:ID!,$query:String,$first:Int!,$after:String){subscribers:alphaFeedChannelSubscribers(channelId:$channelId,query:$query,first:$first,after:$after){__typename edges{__typename node{__typename user{__typename ...UserShort}role}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount pagesCount currentPage openEnded}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        FeedChannelSubscribersSelector
    )
    let FeedChannelWriters = OperationDefinition(
        "FeedChannelWriters",
        .query, 
        "query FeedChannelWriters($id:ID!,$first:Int!,$after:ID){writers:alphaFeedChannelAdmins(id:$id,first:$first,after:$after){__typename items{__typename user{__typename ...UserShort}role}cursor}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        FeedChannelWritersSelector
    )
    let FeedChannelsSearch = OperationDefinition(
        "FeedChannelsSearch",
        .query, 
        "query FeedChannelsSearch($query:String,$sort:String,$first:Int!,$after:String){search:alphaFeedChannelSearch(query:$query,sort:$sort,first:$first,after:$after){__typename edges{__typename node{__typename ...FeedChannelFull}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount pagesCount currentPage openEnded}}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}",
        FeedChannelsSearchSelector
    )
    let FeedItem = OperationDefinition(
        "FeedItem",
        .query, 
        "query FeedItem($id:ID!){item:alphaFeedItem(id:$id){__typename ...FeedItemFull}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{__typename id date author{__typename ...FeedPostAuthorFragment}source{__typename ...FeedPostSourceFragment}edited canEdit commentsCount message fallback reactions{__typename user{__typename ...UserShort}reaction}slides{__typename ...SlideFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{__typename ...UserShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}fragment SlideFragment on Slide{__typename ... on TextSlide{__typename id text spans{__typename ...SpanFragment}cover{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}coverAlign attachments{__typename ... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title roomPhoto:photo membersCount membership canSendMessage organization{__typename id name photo}}... on Organization{__typename ...OrganizationShort}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}",
        FeedItemSelector
    )
    let FeedLoadMore = OperationDefinition(
        "FeedLoadMore",
        .query, 
        "query FeedLoadMore($first:Int!,$after:String){feed:alphaHomeFeed(first:$first,after:$after){__typename items{__typename ...FeedItemFull}cursor}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{__typename id date author{__typename ...FeedPostAuthorFragment}source{__typename ...FeedPostSourceFragment}edited canEdit commentsCount message fallback reactions{__typename user{__typename ...UserShort}reaction}slides{__typename ...SlideFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{__typename ...UserShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}fragment SlideFragment on Slide{__typename ... on TextSlide{__typename id text spans{__typename ...SpanFragment}cover{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}coverAlign attachments{__typename ... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title roomPhoto:photo membersCount membership canSendMessage organization{__typename id name photo}}... on Organization{__typename ...OrganizationShort}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}",
        FeedLoadMoreSelector
    )
    let FeedRecommendedChannels = OperationDefinition(
        "FeedRecommendedChannels",
        .query, 
        "query FeedRecommendedChannels($first:Int!,$after:String){search:alphaRecommendedChannels(first:$first,after:$after){__typename edges{__typename node{__typename ...FeedChannelFull}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount pagesCount currentPage openEnded}}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}",
        FeedRecommendedChannelsSelector
    )
    let FeedSubscriptions = OperationDefinition(
        "FeedSubscriptions",
        .query, 
        "query FeedSubscriptions($first:Int!,$after:ID){channels:alphaFeedMySubscriptions(first:$first,after:$after){__typename items{__typename ...FeedChannelFull}cursor}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}",
        FeedSubscriptionsSelector
    )
    let FeedWritableChannels = OperationDefinition(
        "FeedWritableChannels",
        .query, 
        "query FeedWritableChannels($first:Int!,$after:ID){channels:alphaWritableChannels(first:$first,after:$after){__typename items{__typename ...FeedChannelFull}cursor}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}",
        FeedWritableChannelsSelector
    )
    let FetchPushSettings = OperationDefinition(
        "FetchPushSettings",
        .query, 
        "query FetchPushSettings{pushSettings{__typename webPushKey}}",
        FetchPushSettingsSelector
    )
    let GlobalCounter = OperationDefinition(
        "GlobalCounter",
        .query, 
        "query GlobalCounter{alphaNotificationCounter{__typename id unreadCount}}",
        GlobalCounterSelector
    )
    let GlobalSearch = OperationDefinition(
        "GlobalSearch",
        .query, 
        "query GlobalSearch($query:String!,$kinds:[GlobalSearchEntryKind!]){items:alphaGlobalSearch(query:$query,kinds:$kinds){__typename ... on Organization{__typename id name about photo shortname isCommunity:alphaIsCommunity}... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title canSendMessage roomPhoto:photo membersCount membership organization{__typename id name photo}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        GlobalSearchSelector
    )
    let InitFeed = OperationDefinition(
        "InitFeed",
        .query, 
        "query InitFeed($first:Int!){feed:alphaHomeFeed(first:$first){__typename items{__typename ...FeedItemFull}cursor}drafts:alphaFeedMyDraftsChannel{__typename ...FeedChannelFull}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{__typename id date author{__typename ...FeedPostAuthorFragment}source{__typename ...FeedPostSourceFragment}edited canEdit commentsCount message fallback reactions{__typename user{__typename ...UserShort}reaction}slides{__typename ...SlideFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{__typename ...UserShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}fragment SlideFragment on Slide{__typename ... on TextSlide{__typename id text spans{__typename ...SpanFragment}cover{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}coverAlign attachments{__typename ... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title roomPhoto:photo membersCount membership canSendMessage organization{__typename id name photo}}... on Organization{__typename ...OrganizationShort}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}",
        InitFeedSelector
    )
    let MatchmakingProfile = OperationDefinition(
        "MatchmakingProfile",
        .query, 
        "query MatchmakingProfile($peerId:ID!,$uid:ID!){matchmakingProfile(peerId:$peerId,uid:$uid){__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}",
        MatchmakingProfileSelector
    )
    let MatchmakingRoom = OperationDefinition(
        "MatchmakingRoom",
        .query, 
        "query MatchmakingRoom($peerId:ID!){matchmakingRoom(peerId:$peerId){__typename ...MatchmakingRoomFragment}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}",
        MatchmakingRoomSelector
    )
    let Message = OperationDefinition(
        "Message",
        .query, 
        "query Message($messageId:ID!){message(messageId:$messageId){__typename ...FullMessage}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}",
        MessageSelector
    )
    let MessagesBatch = OperationDefinition(
        "MessagesBatch",
        .query, 
        "query MessagesBatch($chatId:ID!,$first:Int!,$before:ID,$after:ID){gammaMessages(chatId:$chatId,first:$first,before:$before,after:$after){__typename messages{__typename ...FullMessage}haveMoreForward haveMoreBackward}state:conversationState(id:$chatId){__typename state}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}",
        MessagesBatchSelector
    )
    let MessagesSearch = OperationDefinition(
        "MessagesSearch",
        .query, 
        "query MessagesSearch($query:String!,$sort:String,$first:Int!,$after:String){messagesSearch(query:$query,sort:$sort,first:$first,after:$after){__typename edges{__typename node{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename id kind title membership isChannel role canEdit photo settings{__typename id mute}}}message{__typename id date sender{__typename id name firstName photo}senderBadge{__typename ...UserBadge}message fallback ... on GeneralMessage{__typename id attachments{__typename id fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename isImage imageFormat}}}quotedMessages{__typename id}}}}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount currentPage pagesCount openEnded}}}fragment UserBadge on UserBadge{__typename id name verified}",
        MessagesSearchSelector
    )
    let MyApps = OperationDefinition(
        "MyApps",
        .query, 
        "query MyApps{apps:myApps{__typename ...AppFull}}fragment AppFull on AppProfile{__typename id name shortname photoRef{__typename uuid crop{__typename x y w h}}about token{__typename salt}}",
        MyAppsSelector
    )
    let MyCards = OperationDefinition(
        "MyCards",
        .query, 
        "query MyCards{myCards{__typename id pmid last4 brand expYear expMonth isDefault deleted}}",
        MyCardsSelector
    )
    let MyNotificationCenter = OperationDefinition(
        "MyNotificationCenter",
        .query, 
        "query MyNotificationCenter{myNotificationCenter{__typename id unread state{__typename state}}}",
        MyNotificationCenterSelector
    )
    let MyNotifications = OperationDefinition(
        "MyNotifications",
        .query, 
        "query MyNotifications($first:Int!,$before:ID){myNotifications(first:$first,before:$before){__typename items{__typename ...NotificationFragment}cursor}}fragment NotificationFragment on Notification{__typename id text content{__typename ... on NewCommentNotification{__typename comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{__typename message{__typename ... on GeneralMessage{__typename id fallback message sender{__typename id name}senderBadge{__typename ...UserBadge}}}chat{__typename ...RoomNano}}... on CommentPeerRootFeedItem{__typename item{__typename ...FeedItemFull}}}subscription{__typename type}}}... on NewMatchmakingProfilesNotification{__typename room{__typename peer{__typename ... on SharedRoom{__typename ...RoomNano}}}profiles{__typename ...MatchmakingProfileFragment}}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage id}parentComment{__typename comment:betaComment{__typename id message}id}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{__typename id date author{__typename ...FeedPostAuthorFragment}source{__typename ...FeedPostSourceFragment}edited canEdit commentsCount message fallback reactions{__typename user{__typename ...UserShort}reaction}slides{__typename ...SlideFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{__typename ...UserShort}}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}fragment SlideFragment on Slide{__typename ... on TextSlide{__typename id text spans{__typename ...SpanFragment}cover{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}coverAlign attachments{__typename ... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title roomPhoto:photo membersCount membership canSendMessage organization{__typename id name photo}}... on Organization{__typename ...OrganizationShort}}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}",
        MyNotificationsSelector
    )
    let MyOrganizations = OperationDefinition(
        "MyOrganizations",
        .query, 
        "query MyOrganizations{myOrganizations{__typename ...OrganizationShort isPrimary:betaIsPrimary}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        MyOrganizationsSelector
    )
    let MyStickers = OperationDefinition(
        "MyStickers",
        .query, 
        "query MyStickers{stickers:myStickers{__typename packs{__typename id title stickers{__typename ...StickerFragment}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}",
        MyStickersSelector
    )
    let MySuccessfulInvitesCount = OperationDefinition(
        "MySuccessfulInvitesCount",
        .query, 
        "query MySuccessfulInvitesCount{mySuccessfulInvitesCount}",
        MySuccessfulInvitesCountSelector
    )
    let MyWallet = OperationDefinition(
        "MyWallet",
        .query, 
        "query MyWallet{myWallet{__typename id balance state isLocked failingPaymentsCount}transactionsPending{__typename ...WalletTransactionFragment}transactionsHistory(first:20){__typename items{__typename ...WalletTransactionFragment}cursor}}fragment WalletTransactionFragment on WalletTransaction{__typename id status date operation{__typename ... on WalletTransactionDeposit{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}}... on WalletTransactionIncome{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}source{__typename ... on WalletSubscription{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}... on Purchase{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}}}... on WalletTransactionTransferIn{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}fromUser{__typename ...UserShort}}... on WalletTransactionTransferOut{__typename amount walletAmount chargeAmount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}toUser{__typename ...UserShort}}... on WalletTransactionSubscription{__typename amount walletAmount chargeAmount subscription{__typename id interval amount product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}... on WalletTransactionPurchase{__typename amount walletAmount chargeAmount purchase{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        MyWalletSelector
    )
    let OauthContext = OperationDefinition(
        "OauthContext",
        .query, 
        "query OauthContext($code:String!){context:oauthContext(code:$code){__typename app{__typename id title scopes image{__typename uuid crop{__typename x y w h}}}state redirectUrl code}}",
        OauthContextSelector
    )
    let Online = OperationDefinition(
        "Online",
        .query, 
        "query Online($userId:ID!){user:user(id:$userId){__typename id online lastSeen isBot}}",
        OnlineSelector
    )
    let Organization = OperationDefinition(
        "Organization",
        .query, 
        "query Organization($organizationId:ID!){organization(id:$organizationId){__typename ...OrganizationFull}}fragment OrganizationFull on Organization{__typename id superAccountId isMine isPrivate:alphaIsPrivate isOwner:betaIsOwner isAdmin:betaIsAdmin featured:alphaFeatured isCommunity:alphaIsCommunity name photo shortname website about twitter facebook linkedin instagram membersCount members:alphaOrganizationMembers{__typename role user{__typename ...UserFull}}requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}}fragment UserFull on User{__typename id name firstName lastName photo phone email website about location isBot isYou online lastSeen linkedin instagram twitter facebook shortname audienceSize primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        OrganizationSelector
    )
    let OrganizationByPrefix = OperationDefinition(
        "OrganizationByPrefix",
        .query, 
        "query OrganizationByPrefix($query:String!){organizationByPrefix:alphaOrganizationByPrefix(query:$query){__typename ...OrganizationSearch}}fragment OrganizationSearch on Organization{__typename id superAccountId name photo isMine about status membersCount featured:alphaFeatured members:alphaOrganizationMembers{__typename user{__typename id name photo}}}",
        OrganizationByPrefixSelector
    )
    let OrganizationMembers = OperationDefinition(
        "OrganizationMembers",
        .query, 
        "query OrganizationMembers($organizationId:ID!,$first:Int,$after:ID){organization(id:$organizationId){__typename id members:alphaOrganizationMembers(first:$first,after:$after){__typename role user{__typename ...UserShort}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        OrganizationMembersSelector
    )
    let OrganizationMembersShort = OperationDefinition(
        "OrganizationMembersShort",
        .query, 
        "query OrganizationMembersShort($organizationId:ID!){organization(id:$organizationId){__typename ...OrganizationWithoutMembersFragment members:alphaOrganizationMembers{__typename user{__typename id}}}}fragment OrganizationWithoutMembersFragment on Organization{__typename id superAccountId isMine isPrivate:alphaIsPrivate isOwner:betaIsOwner isAdmin:betaIsAdmin featured:alphaFeatured isCommunity:alphaIsCommunity name photo shortname website about twitter facebook linkedin instagram membersCount requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}roomsCount:betaPublicRoomsCount}fragment UserFull on User{__typename id name firstName lastName photo phone email website about location isBot isYou online lastSeen linkedin instagram twitter facebook shortname audienceSize primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        OrganizationMembersShortSelector
    )
    let OrganizationProfile = OperationDefinition(
        "OrganizationProfile",
        .query, 
        "query OrganizationProfile($organizationId:ID!){organizationProfile(id:$organizationId){__typename ...OrganizationProfileFull}}fragment OrganizationProfileFull on OrganizationProfile{__typename id name photoRef{__typename uuid crop{__typename x y w h}}website websiteTitle about twitter facebook linkedin instagram shortname private:alphaIsPrivate featured:alphaFeatured published:alphaPublished editorial:alphaEditorial}",
        OrganizationProfileSelector
    )
    let OrganizationPublicInvite = OperationDefinition(
        "OrganizationPublicInvite",
        .query, 
        "query OrganizationPublicInvite($organizationId:ID){publicInvite:alphaOrganizationInviteLink(organizationId:$organizationId){__typename id key ttl}}",
        OrganizationPublicInviteSelector
    )
    let OrganizationPublicRooms = OperationDefinition(
        "OrganizationPublicRooms",
        .query, 
        "query OrganizationPublicRooms($organizationId:ID!,$first:Int!,$after:ID){organizationPublicRooms(id:$organizationId,first:$first,after:$after){__typename items{__typename ...SharedRoomView}cursor}}fragment SharedRoomView on SharedRoom{__typename id title photo membersCount photo}",
        OrganizationPublicRoomsSelector
    )
    let OrganizationWithoutMembers = OperationDefinition(
        "OrganizationWithoutMembers",
        .query, 
        "query OrganizationWithoutMembers($organizationId:ID!){organization(id:$organizationId){__typename ...OrganizationWithoutMembersFragment}}fragment OrganizationWithoutMembersFragment on Organization{__typename id superAccountId isMine isPrivate:alphaIsPrivate isOwner:betaIsOwner isAdmin:betaIsAdmin featured:alphaFeatured isCommunity:alphaIsCommunity name photo shortname website about twitter facebook linkedin instagram membersCount requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}roomsCount:betaPublicRoomsCount}fragment UserFull on User{__typename id name firstName lastName photo phone email website about location isBot isYou online lastSeen linkedin instagram twitter facebook shortname audienceSize primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        OrganizationWithoutMembersSelector
    )
    let Permissions = OperationDefinition(
        "Permissions",
        .query, 
        "query Permissions{myPermissions{__typename roles}}",
        PermissionsSelector
    )
    let PicSharedMedia = OperationDefinition(
        "PicSharedMedia",
        .query, 
        "query PicSharedMedia($chatId:ID!,$first:Int!,$after:ID,$before:ID,$around:ID){chatSharedMedia(chatId:$chatId,mediaTypes:[IMAGE],first:$first,after:$after,before:$before,around:$around){__typename pageInfo{__typename hasNextPage hasPreviousPage currentPage pagesCount itemsCount}edges{__typename cursor index node{__typename message{__typename ... on GeneralMessage{__typename id date sender{__typename id name}attachments{__typename ... on MessageAttachmentFile{__typename id fileMetadata{__typename name isImage imageFormat mimeType imageWidth imageHeight size}filePreview fileId fallback}}}}}}}}",
        PicSharedMediaSelector
    )
    let Profile = OperationDefinition(
        "Profile",
        .query, 
        "query Profile{user:me{__typename id shortname}profile:myProfile{__typename id firstName lastName photoRef{__typename uuid crop{__typename x y w h}}email phone website about location role:alphaRole linkedin instagram facebook twitter primaryOrganization{__typename id name membersCount}joinedAt:alphaJoinedAt invitedBy:alphaInvitedBy{__typename id name}}}",
        ProfileSelector
    )
    let ProfilePrefill = OperationDefinition(
        "ProfilePrefill",
        .query, 
        "query ProfilePrefill{prefill:myProfilePrefill{__typename firstName lastName picture}}",
        ProfilePrefillSelector
    )
    let ResolveShortName = OperationDefinition(
        "ResolveShortName",
        .query, 
        "query ResolveShortName($shortname:String!){item:alphaResolveShortName(shortname:$shortname){__typename ... on User{__typename id isDeleted}... on Organization{__typename id isDeleted}... on FeedChannel{__typename id}... on SharedRoom{__typename id}}}",
        ResolveShortNameSelector
    )
    let ResolvedInvite = OperationDefinition(
        "ResolvedInvite",
        .query, 
        "query ResolvedInvite($key:String!){invite:alphaResolveInvite(key:$key){__typename ... on InviteInfo{__typename id orgId title creator{__typename ...UserShort}organization{__typename id photo name membersCount about isCommunity:alphaIsCommunity}}... on AppInvite{__typename inviter{__typename ...UserShort}}... on RoomInvite{__typename id invitedByUser{__typename ...UserShort}room{__typename ... on SharedRoom{__typename id kind isChannel title photo socialImage description membership membersCount onlineMembersCount previewMembers{__typename id photo name}matchmaking{__typename enabled}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}}}shortnameItem:alphaResolveShortName(shortname:$key){__typename ... on SharedRoom{__typename ...RoomPreview}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment RoomPreview on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}}... on SharedRoom{__typename id isChannel isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}membership owner{__typename id}matchmaking{__typename enabled}title photo membersCount description previewMembers{__typename id name photo}onlineMembersCount}}",
        ResolvedInviteSelector
    )
    let Room = OperationDefinition(
        "Room",
        .query, 
        "query Room($id:ID!){room(id:$id){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel title photo socialImage description shortname organization{__typename ...OrganizationMedium}membership role membersCount featuredMembersCount onlineMembersCount previewMembers{__typename id photo name}members{__typename role membership user{__typename ...UserShort}canKick badge{__typename ...UserBadge}}requests{__typename user{__typename ...UserShort}}settings{__typename id mute}canEdit canSendMessage welcomeMessage{__typename isOn sender{__typename id name}message}matchmaking{__typename ...MatchmakingRoomFragment}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationMedium on Organization{__typename id name photo isMine membersCount shortname about isOwner:betaIsOwner isAdmin:betaIsAdmin isCommunity:alphaIsCommunity}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}",
        RoomSelector
    )
    let RoomChat = OperationDefinition(
        "RoomChat",
        .query, 
        "query RoomChat($id:ID!){room(id:$id){__typename ... on PrivateRoom{__typename id user{__typename id name photo shortname primaryOrganization{__typename id name}isBot}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}}... on SharedRoom{__typename id kind title membership isChannel role canEdit photo membersCount organization{__typename ...OrganizationMedium}matchmaking{__typename ...MatchmakingRoomFragment}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}description onlineMembersCount previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id}}}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationMedium on Organization{__typename id name photo isMine membersCount shortname about isOwner:betaIsOwner isAdmin:betaIsAdmin isCommunity:alphaIsCommunity}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}",
        RoomChatSelector
    )
    let RoomFeaturedMembers = OperationDefinition(
        "RoomFeaturedMembers",
        .query, 
        "query RoomFeaturedMembers($roomId:ID!){roomFeaturedMembers(roomId:$roomId){__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}",
        RoomFeaturedMembersSelector
    )
    let RoomInviteInfo = OperationDefinition(
        "RoomInviteInfo",
        .query, 
        "query RoomInviteInfo($invite:String!){invite:betaRoomInviteInfo(invite:$invite){__typename id room{__typename ... on SharedRoom{__typename id kind isChannel title photo socialImage description organization{__typename ...OrganizationShort}membership membersCount onlineMembersCount previewMembers{__typename id photo name}matchmaking{__typename enabled}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}invitedByUser{__typename ...UserShort}}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}",
        RoomInviteInfoSelector
    )
    let RoomInviteLink = OperationDefinition(
        "RoomInviteLink",
        .query, 
        "query RoomInviteLink($roomId:ID!){link:betaRoomInviteLink(roomId:$roomId)}",
        RoomInviteLinkSelector
    )
    let RoomMembers = OperationDefinition(
        "RoomMembers",
        .query, 
        "query RoomMembers($roomId:ID!){members:roomMembers(roomId:$roomId){__typename user{__typename ...UserShort}role membership canKick}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        RoomMembersSelector
    )
    let RoomMembersPaginated = OperationDefinition(
        "RoomMembersPaginated",
        .query, 
        "query RoomMembersPaginated($roomId:ID!,$first:Int,$after:ID){members:roomMembers(roomId:$roomId,first:$first,after:$after){__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}",
        RoomMembersPaginatedSelector
    )
    let RoomMembersShort = OperationDefinition(
        "RoomMembersShort",
        .query, 
        "query RoomMembersShort($roomId:ID!){members:roomMembers(roomId:$roomId){__typename user{__typename id}}}",
        RoomMembersShortSelector
    )
    let RoomMembersTiny = OperationDefinition(
        "RoomMembersTiny",
        .query, 
        "query RoomMembersTiny($roomId:ID!){members:roomMembers(roomId:$roomId){__typename user{__typename id name shortname photo primaryOrganization{__typename id name}}}}",
        RoomMembersTinySelector
    )
    let RoomOrganizationAdminMembers = OperationDefinition(
        "RoomOrganizationAdminMembers",
        .query, 
        "query RoomOrganizationAdminMembers($id:ID!){room(id:$id){__typename ... on SharedRoom{__typename id organization{__typename id adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserShort}}}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        RoomOrganizationAdminMembersSelector
    )
    let RoomPico = OperationDefinition(
        "RoomPico",
        .query, 
        "query RoomPico($id:ID!){room(id:$id){__typename ...RoomNano}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}",
        RoomPicoSelector
    )
    let RoomSearch = OperationDefinition(
        "RoomSearch",
        .query, 
        "query RoomSearch($query:String,$sort:String,$page:Int){items:betaRoomSearch(query:$query,sort:$sort,page:$page,first:25){__typename edges{__typename node{__typename ... on SharedRoom{__typename id kind isChannel title photo membership membersCount organization{__typename id photo name}}}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount currentPage pagesCount openEnded}}}",
        RoomSearchSelector
    )
    let RoomSocialImage = OperationDefinition(
        "RoomSocialImage",
        .query, 
        "query RoomSocialImage($roomId:ID!){roomSocialImage(roomId:$roomId)}",
        RoomSocialImageSelector
    )
    let RoomSuper = OperationDefinition(
        "RoomSuper",
        .query, 
        "query RoomSuper($id:ID!){roomSuper(id:$id){__typename id featured listed}}",
        RoomSuperSelector
    )
    let RoomTiny = OperationDefinition(
        "RoomTiny",
        .query, 
        "query RoomTiny($id:ID!){room(id:$id){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount pinnedMessage{__typename ...FullMessage}matchmaking{__typename ...MatchmakingRoomFragment}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}",
        RoomTinySelector
    )
    let RoomWithoutMembers = OperationDefinition(
        "RoomWithoutMembers",
        .query, 
        "query RoomWithoutMembers($id:ID!){room(id:$id){__typename ...RoomFullWithoutMembers}}fragment RoomFullWithoutMembers on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo socialImage description shortname organization{__typename ...OrganizationMedium}membership role membersCount featuredMembersCount settings{__typename id mute}matchmaking{__typename ...MatchmakingRoomFragment}canEdit canSendMessage welcomeMessage{__typename isOn sender{__typename id name}message}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationMedium on Organization{__typename id name photo isMine membersCount shortname about isOwner:betaIsOwner isAdmin:betaIsAdmin isCommunity:alphaIsCommunity}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}",
        RoomWithoutMembersSelector
    )
    let Settings = OperationDefinition(
        "Settings",
        .query, 
        "query Settings{settings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id primaryEmail emailFrequency excludeMutedChats countUnreadChats desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}organizationChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}notificationPreview}",
        SettingsSelector
    )
    let SharedMedia = OperationDefinition(
        "SharedMedia",
        .query, 
        "query SharedMedia($chatId:ID!,$mediaTypes:[SharedMediaType!]!,$first:Int!,$after:ID){sharedMedia:chatSharedMedia(chatId:$chatId,mediaTypes:$mediaTypes,first:$first,after:$after){__typename pageInfo{__typename hasNextPage currentPage}edges{__typename node{__typename message{__typename ... on GeneralMessage{__typename id fallback date sender{__typename id name}attachments{__typename ... on MessageAttachmentFile{__typename id fileMetadata{__typename name isImage imageFormat mimeType imageWidth imageHeight size}filePreview fileId fallback}... on MessageRichAttachment{__typename id title text titleLink imagePreview image{__typename url}imageFallback{__typename photo}keyboard{__typename buttons{__typename id title url}}}}}}}cursor}}}",
        SharedMediaSelector
    )
    let SharedMediaCounters = OperationDefinition(
        "SharedMediaCounters",
        .query, 
        "query SharedMediaCounters($chatId:ID!){counters:chatSharedMediaCounters(chatId:$chatId){__typename links images documents videos}}",
        SharedMediaCountersSelector
    )
    let StickerPack = OperationDefinition(
        "StickerPack",
        .query, 
        "query StickerPack($id:ID!){stickerPack(id:$id){__typename ...StickerPackFragment}}fragment StickerPackFragment on StickerPack{__typename id title stickers{__typename ...StickerFragment}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}",
        StickerPackSelector
    )
    let StickerPackCatalog = OperationDefinition(
        "StickerPackCatalog",
        .query, 
        "query StickerPackCatalog{stickers:stickerPackCatalog{__typename id title published stickers{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}",
        StickerPackCatalogSelector
    )
    let StripeToken = OperationDefinition(
        "StripeToken",
        .query, 
        "query StripeToken{stripeToken}",
        StripeTokenSelector
    )
    let Subscriptions = OperationDefinition(
        "Subscriptions",
        .query, 
        "query Subscriptions{subscriptions{__typename id state expires amount interval product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}}}}",
        SubscriptionsSelector
    )
    let SuggestedRooms = OperationDefinition(
        "SuggestedRooms",
        .query, 
        "query SuggestedRooms{suggestedRooms:betaSuggestedRooms{__typename ... on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}}}isDiscoverDone:betaIsDiscoverDone}",
        SuggestedRoomsSelector
    )
    let SuperAccount = OperationDefinition(
        "SuperAccount",
        .query, 
        "query SuperAccount($accountId:ID!,$viaOrgId:Boolean){superAccount(id:$accountId,viaOrgId:$viaOrgId){__typename id title state members{__typename ...UserShort}features{__typename id key title}orgId createdAt createdBy{__typename id name}published:alphaPublished}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        SuperAccountSelector
    )
    let SuperAccounts = OperationDefinition(
        "SuperAccounts",
        .query, 
        "query SuperAccounts{superAccounts{__typename id orgId title state createdAt}}",
        SuperAccountsSelector
    )
    let SuperAdmins = OperationDefinition(
        "SuperAdmins",
        .query, 
        "query SuperAdmins{superAdmins{__typename role user{__typename ...UserShort}email}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        SuperAdminsSelector
    )
    let SuperBadgeInRoom = OperationDefinition(
        "SuperBadgeInRoom",
        .query, 
        "query SuperBadgeInRoom($roomId:ID!,$userId:ID!){superBadgeInRoom(roomId:$roomId,userId:$userId){__typename ...UserBadge}}fragment UserBadge on UserBadge{__typename id name verified}",
        SuperBadgeInRoomSelector
    )
    let TransactionsHistory = OperationDefinition(
        "TransactionsHistory",
        .query, 
        "query TransactionsHistory($first:Int!,$after:String){transactionsHistory(first:$first,after:$after){__typename items{__typename ...WalletTransactionFragment}cursor}}fragment WalletTransactionFragment on WalletTransaction{__typename id status date operation{__typename ... on WalletTransactionDeposit{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}}... on WalletTransactionIncome{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}source{__typename ... on WalletSubscription{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}... on Purchase{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}}}... on WalletTransactionTransferIn{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}fromUser{__typename ...UserShort}}... on WalletTransactionTransferOut{__typename amount walletAmount chargeAmount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}toUser{__typename ...UserShort}}... on WalletTransactionSubscription{__typename amount walletAmount chargeAmount subscription{__typename id interval amount product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}... on WalletTransactionPurchase{__typename amount walletAmount chargeAmount purchase{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        TransactionsHistorySelector
    )
    let User = OperationDefinition(
        "User",
        .query, 
        "query User($userId:ID!){user:user(id:$userId){__typename ...UserFull chatsWithBadge{__typename chat{__typename ...RoomShort}badge{__typename ...UserBadge}}}conversation:room(id:$userId){__typename ... on PrivateRoom{__typename id settings{__typename id mute}}}}fragment UserFull on User{__typename id name firstName lastName photo phone email website about location isBot isYou online lastSeen linkedin instagram twitter facebook shortname audienceSize primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount pinnedMessage{__typename ...FullMessage}matchmaking{__typename ...MatchmakingRoomFragment}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}",
        UserSelector
    )
    let UserAvailableRooms = OperationDefinition(
        "UserAvailableRooms",
        .query, 
        "query UserAvailableRooms($first:Int!,$after:String,$query:String){alphaUserAvailableRooms(first:$first,after:$after,query:$query){__typename edges{__typename node{__typename ...DiscoverSharedRoom}cursor}pageInfo{__typename hasNextPage}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
        UserAvailableRoomsSelector
    )
    let UserPico = OperationDefinition(
        "UserPico",
        .query, 
        "query UserPico($userId:ID!){user:user(id:$userId){__typename id name firstName photo}}",
        UserPicoSelector
    )
    let UserStorage = OperationDefinition(
        "UserStorage",
        .query, 
        "query UserStorage($namespace:String!,$keys:[String!]!){userStorage(namespace:$namespace,keys:$keys){__typename id key value}}",
        UserStorageSelector
    )
    let Users = OperationDefinition(
        "Users",
        .query, 
        "query Users($query:String!){items:users(query:$query){__typename id title:name subtitle:email}}",
        UsersSelector
    )
    let AccountInviteJoin = OperationDefinition(
        "AccountInviteJoin",
        .mutation, 
        "mutation AccountInviteJoin($inviteKey:String!){alphaJoinInvite(key:$inviteKey)}",
        AccountInviteJoinSelector
    )
    let AddAppToChat = OperationDefinition(
        "AddAppToChat",
        .mutation, 
        "mutation AddAppToChat($appId:ID!,$chatId:ID!){addAppToChat(appId:$appId,chatId:$chatId){__typename ...AppChat}}fragment AppChat on AppChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}webhook}",
        AddAppToChatSelector
    )
    let AddComment = OperationDefinition(
        "AddComment",
        .mutation, 
        "mutation AddComment($repeatKey:String,$peerId:ID!,$message:String,$replyComment:ID,$mentions:[MentionInput!],$fileAttachments:[FileAttachmentInput!],$spans:[MessageSpanInput!]){betaAddComment(repeatKey:$repeatKey,peerId:$peerId,message:$message,replyComment:$replyComment,mentions:$mentions,fileAttachments:$fileAttachments,spans:$spans){__typename id}}",
        AddCommentSelector
    )
    let AddStickerComment = OperationDefinition(
        "AddStickerComment",
        .mutation, 
        "mutation AddStickerComment($peerId:ID!,$stickerId:ID!,$replyComment:ID,$repeatKey:String){addStickerComment:betaAddStickerComment(peerId:$peerId,stickerId:$stickerId,replyComment:$replyComment,repeatKey:$repeatKey){__typename id}}",
        AddStickerCommentSelector
    )
    let BetaDiscoverSkip = OperationDefinition(
        "BetaDiscoverSkip",
        .mutation, 
        "mutation BetaDiscoverSkip($selectedTagsIds:[String!]!){betaDiscoverSkip(selectedTagsIds:$selectedTagsIds){__typename tagGroup{__typename id}}}",
        BetaDiscoverSkipSelector
    )
    let BetaNextDiscoverReset = OperationDefinition(
        "BetaNextDiscoverReset",
        .mutation, 
        "mutation BetaNextDiscoverReset{betaNextDiscoverReset}",
        BetaNextDiscoverResetSelector
    )
    let BetaSubmitNextDiscover = OperationDefinition(
        "BetaSubmitNextDiscover",
        .mutation, 
        "mutation BetaSubmitNextDiscover($selectedTagsIds:[String!]!,$excudedGroupsIds:[String!]!){betaSubmitNextDiscover(selectedTagsIds:$selectedTagsIds,excudedGroupsIds:$excudedGroupsIds){__typename tagGroup{__typename id}}}",
        BetaSubmitNextDiscoverSelector
    )
    let BuyPremiumChatPass = OperationDefinition(
        "BuyPremiumChatPass",
        .mutation, 
        "mutation BuyPremiumChatPass($chatId:ID!){betaBuyPremiumChatPass(chatId:$chatId){__typename id premiumPassIsActive membership}}",
        BuyPremiumChatPassSelector
    )
    let BuyPremiumChatSubscription = OperationDefinition(
        "BuyPremiumChatSubscription",
        .mutation, 
        "mutation BuyPremiumChatSubscription($chatId:ID!){betaBuyPremiumChatSubscription(chatId:$chatId){__typename id premiumPassIsActive premiumSubscription{__typename id state}membership}}",
        BuyPremiumChatSubscriptionSelector
    )
    let CancelSubscription = OperationDefinition(
        "CancelSubscription",
        .mutation, 
        "mutation CancelSubscription($id:ID!){subscriptionCancel(id:$id){__typename id}}",
        CancelSubscriptionSelector
    )
    let CommentSetReaction = OperationDefinition(
        "CommentSetReaction",
        .mutation, 
        "mutation CommentSetReaction($commentId:ID!,$reaction:MessageReactionType!){commentReactionAdd(commentId:$commentId,reaction:$reaction)}",
        CommentSetReactionSelector
    )
    let CommentUnsetReaction = OperationDefinition(
        "CommentUnsetReaction",
        .mutation, 
        "mutation CommentUnsetReaction($commentId:ID!,$reaction:MessageReactionType!){commentReactionRemove(commentId:$commentId,reaction:$reaction)}",
        CommentUnsetReactionSelector
    )
    let CommitCardSetupIntent = OperationDefinition(
        "CommitCardSetupIntent",
        .mutation, 
        "mutation CommitCardSetupIntent($id:ID!,$pmid:ID!){cardCommitSetupIntent(id:$id,pmid:$pmid){__typename id}}",
        CommitCardSetupIntentSelector
    )
    let ConferenceAnswer = OperationDefinition(
        "ConferenceAnswer",
        .mutation, 
        "mutation ConferenceAnswer($id:ID!,$ownPeerId:ID!,$peerId:ID!,$answer:String!){peerConnectionAnswer(id:$id,peerId:$peerId,ownPeerId:$ownPeerId,answer:$answer){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}",
        ConferenceAnswerSelector
    )
    let ConferenceCandidate = OperationDefinition(
        "ConferenceCandidate",
        .mutation, 
        "mutation ConferenceCandidate($id:ID!,$ownPeerId:ID!,$peerId:ID!,$candidate:String!){peerConnectionCandidate(id:$id,peerId:$peerId,ownPeerId:$ownPeerId,candidate:$candidate){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}",
        ConferenceCandidateSelector
    )
    let ConferenceJoin = OperationDefinition(
        "ConferenceJoin",
        .mutation, 
        "mutation ConferenceJoin($id:ID!){conferenceJoin(id:$id){__typename peerId conference{__typename ...ConferenceShort}}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}",
        ConferenceJoinSelector
    )
    let ConferenceKeepAlive = OperationDefinition(
        "ConferenceKeepAlive",
        .mutation, 
        "mutation ConferenceKeepAlive($id:ID!,$peerId:ID!){conferenceKeepAlive(id:$id,peerId:$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}",
        ConferenceKeepAliveSelector
    )
    let ConferenceLeave = OperationDefinition(
        "ConferenceLeave",
        .mutation, 
        "mutation ConferenceLeave($id:ID!,$peerId:ID!){conferenceLeave(id:$id,peerId:$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}",
        ConferenceLeaveSelector
    )
    let ConferenceOffer = OperationDefinition(
        "ConferenceOffer",
        .mutation, 
        "mutation ConferenceOffer($id:ID!,$ownPeerId:ID!,$peerId:ID!,$offer:String!){peerConnectionOffer(id:$id,peerId:$peerId,ownPeerId:$ownPeerId,offer:$offer){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}",
        ConferenceOfferSelector
    )
    let CreateApp = OperationDefinition(
        "CreateApp",
        .mutation, 
        "mutation CreateApp($name:String!,$shortname:String,$photoRef:ImageRefInput,$about:String){createApp(name:$name,shortname:$shortname,photoRef:$photoRef,about:$about){__typename ...AppFull}}fragment AppFull on AppProfile{__typename id name shortname photoRef{__typename uuid crop{__typename x y w h}}about token{__typename salt}}",
        CreateAppSelector
    )
    let CreateCardSetupIntent = OperationDefinition(
        "CreateCardSetupIntent",
        .mutation, 
        "mutation CreateCardSetupIntent($retryKey:String!){cardCreateSetupIntent(retryKey:$retryKey){__typename id clientSecret}}",
        CreateCardSetupIntentSelector
    )
    let CreateDepositIntent = OperationDefinition(
        "CreateDepositIntent",
        .mutation, 
        "mutation CreateDepositIntent($cardId:ID!,$amount:Int!,$retryKey:String!){cardDepositIntent(id:$cardId,amount:$amount,retryKey:$retryKey){__typename id clientSecret}}",
        CreateDepositIntentSelector
    )
    let CreateOrganization = OperationDefinition(
        "CreateOrganization",
        .mutation, 
        "mutation CreateOrganization($input:CreateOrganizationInput!){organization:createOrganization(input:$input){__typename id name}}",
        CreateOrganizationSelector
    )
    let CreateUserProfileAndOrganization = OperationDefinition(
        "CreateUserProfileAndOrganization",
        .mutation, 
        "mutation CreateUserProfileAndOrganization($user:ProfileInput!,$organization:CreateOrganizationInput!){alphaCreateUserProfileAndOrganization(user:$user,organization:$organization){__typename user{__typename ...UserFull}organization{__typename id name}}}fragment UserFull on User{__typename id name firstName lastName photo phone email website about location isBot isYou online lastSeen linkedin instagram twitter facebook shortname audienceSize primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        CreateUserProfileAndOrganizationSelector
    )
    let DebugMails = OperationDefinition(
        "DebugMails",
        .mutation, 
        "mutation DebugMails($type:DebugEmailType!){debugSendEmail(type:$type)}",
        DebugMailsSelector
    )
    let DeleteComment = OperationDefinition(
        "DeleteComment",
        .mutation, 
        "mutation DeleteComment($id:ID!){deleteComment(id:$id)}",
        DeleteCommentSelector
    )
    let DeleteNotification = OperationDefinition(
        "DeleteNotification",
        .mutation, 
        "mutation DeleteNotification($notificationId:ID!){deleteNotification(notificationId:$notificationId)}",
        DeleteNotificationSelector
    )
    let DeleteOrganization = OperationDefinition(
        "DeleteOrganization",
        .mutation, 
        "mutation DeleteOrganization($organizationId:ID!){deleteOrganization(id:$organizationId)}",
        DeleteOrganizationSelector
    )
    let DeleteUser = OperationDefinition(
        "DeleteUser",
        .mutation, 
        "mutation DeleteUser($id:ID!){superDeleteUser(id:$id)}",
        DeleteUserSelector
    )
    let DiscoverCollectionsCreate = OperationDefinition(
        "DiscoverCollectionsCreate",
        .mutation, 
        "mutation DiscoverCollectionsCreate($title:String!,$image:ImageRefInput!,$chatIds:[ID!]!){discoverCollectionsCreate(collection:{title:$title,image:$image,chatIds:$chatIds}){__typename id title}}",
        DiscoverCollectionsCreateSelector
    )
    let DiscoverCollectionsDelete = OperationDefinition(
        "DiscoverCollectionsDelete",
        .mutation, 
        "mutation DiscoverCollectionsDelete($id:ID!){discoverCollectionsDelete(id:$id)}",
        DiscoverCollectionsDeleteSelector
    )
    let DiscoverCollectionsUpdate = OperationDefinition(
        "DiscoverCollectionsUpdate",
        .mutation, 
        "mutation DiscoverCollectionsUpdate($id:ID!,$title:String!,$image:ImageRefInput!,$chatIds:[ID!]!){discoverCollectionsUpdate(id:$id,input:{title:$title,image:$image,chatIds:$chatIds}){__typename id title}}",
        DiscoverCollectionsUpdateSelector
    )
    let DiscoverEditorsChoiceCreate = OperationDefinition(
        "DiscoverEditorsChoiceCreate",
        .mutation, 
        "mutation DiscoverEditorsChoiceCreate($image:ImageRefInput!,$cid:ID!){discoverEditorsChoiceCreate(input:{image:$image,cid:$cid}){__typename id image{__typename uuid crop{__typename x y w h}}chat{__typename id title}}}",
        DiscoverEditorsChoiceCreateSelector
    )
    let DiscoverEditorsChoiceDelete = OperationDefinition(
        "DiscoverEditorsChoiceDelete",
        .mutation, 
        "mutation DiscoverEditorsChoiceDelete($id:ID!){discoverEditorsChoiceDelete(id:$id)}",
        DiscoverEditorsChoiceDeleteSelector
    )
    let DiscoverEditorsChoiceUpdate = OperationDefinition(
        "DiscoverEditorsChoiceUpdate",
        .mutation, 
        "mutation DiscoverEditorsChoiceUpdate($id:ID!,$image:ImageRefInput!,$cid:ID!){discoverEditorsChoiceUpdate(id:$id,input:{image:$image,cid:$cid}){__typename id image{__typename uuid crop{__typename x y w h}}chat{__typename id title}}}",
        DiscoverEditorsChoiceUpdateSelector
    )
    let EditComment = OperationDefinition(
        "EditComment",
        .mutation, 
        "mutation EditComment($id:ID!,$message:String,$mentions:[MentionInput!],$fileAttachments:[FileAttachmentInput!],$spans:[MessageSpanInput!]){editComment(id:$id,message:$message,mentions:$mentions,fileAttachments:$fileAttachments,spans:$spans)}",
        EditCommentSelector
    )
    let EditMessage = OperationDefinition(
        "EditMessage",
        .mutation, 
        "mutation EditMessage($messageId:ID!,$message:String,$replyMessages:[ID!],$mentions:[MentionInput!],$fileAttachments:[FileAttachmentInput!],$spans:[MessageSpanInput!]){editMessage(messageId:$messageId,message:$message,replyMessages:$replyMessages,mentions:$mentions,fileAttachments:$fileAttachments,spans:$spans)}",
        EditMessageSelector
    )
    let FeatureFlagAdd = OperationDefinition(
        "FeatureFlagAdd",
        .mutation, 
        "mutation FeatureFlagAdd($key:String!,$title:String!){featureFlagAdd(key:$key,title:$title){__typename id key title}}",
        FeatureFlagAddSelector
    )
    let FeatureFlagDisable = OperationDefinition(
        "FeatureFlagDisable",
        .mutation, 
        "mutation FeatureFlagDisable($accountId:ID!,$featureId:ID!){superAccountFeatureRemove(id:$accountId,featureId:$featureId){__typename id features{__typename id key title}}}",
        FeatureFlagDisableSelector
    )
    let FeatureFlagEnable = OperationDefinition(
        "FeatureFlagEnable",
        .mutation, 
        "mutation FeatureFlagEnable($accountId:ID!,$featureId:ID!){superAccountFeatureAdd(id:$accountId,featureId:$featureId){__typename id features{__typename id key title}}}",
        FeatureFlagEnableSelector
    )
    let FeedChannelAddWriter = OperationDefinition(
        "FeedChannelAddWriter",
        .mutation, 
        "mutation FeedChannelAddWriter($id:ID!,$userId:ID!){alphaFeedChannelAddEditor(id:$id,userId:$userId)}",
        FeedChannelAddWriterSelector
    )
    let FeedChannelCreate = OperationDefinition(
        "FeedChannelCreate",
        .mutation, 
        "mutation FeedChannelCreate($title:String!,$about:String,$photoRef:ImageRefInput,$global:Boolean){channel:alphaFeedCreateChannel(title:$title,about:$about,photoRef:$photoRef,global:$global){__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}",
        FeedChannelCreateSelector
    )
    let FeedChannelRemoveWriter = OperationDefinition(
        "FeedChannelRemoveWriter",
        .mutation, 
        "mutation FeedChannelRemoveWriter($id:ID!,$userId:ID!){alphaFeedChannelRemoveEditor(id:$id,userId:$userId)}",
        FeedChannelRemoveWriterSelector
    )
    let FeedChannelSubscribe = OperationDefinition(
        "FeedChannelSubscribe",
        .mutation, 
        "mutation FeedChannelSubscribe($id:ID!){alphaFeedChannelSubscribe(id:$id)}",
        FeedChannelSubscribeSelector
    )
    let FeedChannelUnsubscribe = OperationDefinition(
        "FeedChannelUnsubscribe",
        .mutation, 
        "mutation FeedChannelUnsubscribe($id:ID!){alphaFeedChannelUnsubscribe(id:$id)}",
        FeedChannelUnsubscribeSelector
    )
    let FeedChannelUpdate = OperationDefinition(
        "FeedChannelUpdate",
        .mutation, 
        "mutation FeedChannelUpdate($id:ID!,$title:String!,$about:String,$photoRef:ImageRefInput,$global:Boolean){channel:alphaFeedUpdateChannel(id:$id,title:$title,about:$about,photoRef:$photoRef,global:$global){__typename id}}",
        FeedChannelUpdateSelector
    )
    let FeedCreatePost = OperationDefinition(
        "FeedCreatePost",
        .mutation, 
        "mutation FeedCreatePost($channel:ID!,$slides:[SlideInput!]!,$repeatKey:String){post:alphaCreateFeedPost(channel:$channel,slides:$slides,repeatKey:$repeatKey){__typename ...FeedItemFull}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{__typename id date author{__typename ...FeedPostAuthorFragment}source{__typename ...FeedPostSourceFragment}edited canEdit commentsCount message fallback reactions{__typename user{__typename ...UserShort}reaction}slides{__typename ...SlideFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{__typename ...UserShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}fragment SlideFragment on Slide{__typename ... on TextSlide{__typename id text spans{__typename ...SpanFragment}cover{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}coverAlign attachments{__typename ... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title roomPhoto:photo membersCount membership canSendMessage organization{__typename id name photo}}... on Organization{__typename ...OrganizationShort}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}",
        FeedCreatePostSelector
    )
    let FeedDeletePost = OperationDefinition(
        "FeedDeletePost",
        .mutation, 
        "mutation FeedDeletePost($feedItemId:ID!){alphaDeleteFeedPost(feedItemId:$feedItemId)}",
        FeedDeletePostSelector
    )
    let FeedEditPost = OperationDefinition(
        "FeedEditPost",
        .mutation, 
        "mutation FeedEditPost($feedItemId:ID!,$slides:[SlideInput!]!){editFeedPost:alphaEditFeedPost(feedItemId:$feedItemId,slides:$slides){__typename ...FeedItemFull}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{__typename id date author{__typename ...FeedPostAuthorFragment}source{__typename ...FeedPostSourceFragment}edited canEdit commentsCount message fallback reactions{__typename user{__typename ...UserShort}reaction}slides{__typename ...SlideFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{__typename ...UserShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}fragment SlideFragment on Slide{__typename ... on TextSlide{__typename id text spans{__typename ...SpanFragment}cover{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}coverAlign attachments{__typename ... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title roomPhoto:photo membersCount membership canSendMessage organization{__typename id name photo}}... on Organization{__typename ...OrganizationShort}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}",
        FeedEditPostSelector
    )
    let FeedReactionAdd = OperationDefinition(
        "FeedReactionAdd",
        .mutation, 
        "mutation FeedReactionAdd($feedItemId:ID!,$reaction:MessageReactionType!){feedReactionAdd(feedItemId:$feedItemId,reaction:$reaction)}",
        FeedReactionAddSelector
    )
    let FeedReactionRemove = OperationDefinition(
        "FeedReactionRemove",
        .mutation, 
        "mutation FeedReactionRemove($feedItemId:ID!,$reaction:MessageReactionType!){feedReactionRemove(feedItemId:$feedItemId,reaction:$reaction)}",
        FeedReactionRemoveSelector
    )
    let MakeCardDefault = OperationDefinition(
        "MakeCardDefault",
        .mutation, 
        "mutation MakeCardDefault($id:ID!){cardMakeDefault(id:$id){__typename id isDefault}}",
        MakeCardDefaultSelector
    )
    let MarkSequenceRead = OperationDefinition(
        "MarkSequenceRead",
        .mutation, 
        "mutation MarkSequenceRead($seq:Int!){alphaGlobalRead(toSeq:$seq)}",
        MarkSequenceReadSelector
    )
    let MatchmakingConnect = OperationDefinition(
        "MatchmakingConnect",
        .mutation, 
        "mutation MatchmakingConnect($peerId:ID!,$uid:ID!){matchmakingConnect(peerId:$peerId,uid:$uid)}",
        MatchmakingConnectSelector
    )
    let MatchmakingProfileFill = OperationDefinition(
        "MatchmakingProfileFill",
        .mutation, 
        "mutation MatchmakingProfileFill($peerId:ID!,$input:MatchmakingProfileFillInput!){matchmakingProfileFill(peerId:$peerId,input:$input){__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}",
        MatchmakingProfileFillSelector
    )
    let MatchmakingRoomSave = OperationDefinition(
        "MatchmakingRoomSave",
        .mutation, 
        "mutation MatchmakingRoomSave($peerId:ID!,$input:MatchmakingRoomInput!){matchmakingRoomSave(peerId:$peerId,input:$input){__typename ...MatchmakingRoomFragment}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}",
        MatchmakingRoomSaveSelector
    )
    let MediaAnswer = OperationDefinition(
        "MediaAnswer",
        .mutation, 
        "mutation MediaAnswer($id:ID!,$peerId:ID!,$answer:String!){mediaStreamAnswer(id:$id,peerId:$peerId,answer:$answer){__typename id streams{__typename id peerId state sdp ice}}}",
        MediaAnswerSelector
    )
    let MediaCandidate = OperationDefinition(
        "MediaCandidate",
        .mutation, 
        "mutation MediaCandidate($id:ID!,$peerId:ID!,$candidate:String!){mediaStreamCandidate(id:$id,peerId:$peerId,candidate:$candidate){__typename id streams{__typename id peerId state sdp ice}}}",
        MediaCandidateSelector
    )
    let MediaFailed = OperationDefinition(
        "MediaFailed",
        .mutation, 
        "mutation MediaFailed($id:ID!,$peerId:ID!){mediaStreamFailed(id:$id,peerId:$peerId){__typename id streams{__typename id peerId state sdp ice}}}",
        MediaFailedSelector
    )
    let MediaNegotiationNeeded = OperationDefinition(
        "MediaNegotiationNeeded",
        .mutation, 
        "mutation MediaNegotiationNeeded($id:ID!,$peerId:ID!){mediaStreamNegotiationNeeded(id:$id,peerId:$peerId){__typename id streams{__typename id peerId state sdp ice}}}",
        MediaNegotiationNeededSelector
    )
    let MediaOffer = OperationDefinition(
        "MediaOffer",
        .mutation, 
        "mutation MediaOffer($id:ID!,$peerId:ID!,$offer:String!){mediaStreamOffer(id:$id,peerId:$peerId,offer:$offer){__typename id streams{__typename id peerId state sdp ice}}}",
        MediaOfferSelector
    )
    let MessageSetReaction = OperationDefinition(
        "MessageSetReaction",
        .mutation, 
        "mutation MessageSetReaction($messageId:ID!,$reaction:MessageReactionType!){messageReactionAdd(messageId:$messageId,reaction:$reaction)}",
        MessageSetReactionSelector
    )
    let MessageUnsetReaction = OperationDefinition(
        "MessageUnsetReaction",
        .mutation, 
        "mutation MessageUnsetReaction($messageId:ID!,$reaction:MessageReactionType!){messageReactionRemove(messageId:$messageId,reaction:$reaction)}",
        MessageUnsetReactionSelector
    )
    let MyNotificationCenterMarkSeqRead = OperationDefinition(
        "MyNotificationCenterMarkSeqRead",
        .mutation, 
        "mutation MyNotificationCenterMarkSeqRead($seq:Int!){notificationCenterMarkSeqRead(toSeq:$seq)}",
        MyNotificationCenterMarkSeqReadSelector
    )
    let OrganizationActivateByInvite = OperationDefinition(
        "OrganizationActivateByInvite",
        .mutation, 
        "mutation OrganizationActivateByInvite($inviteKey:String!){joinAppInvite(key:$inviteKey)}",
        OrganizationActivateByInviteSelector
    )
    let OrganizationAddMember = OperationDefinition(
        "OrganizationAddMember",
        .mutation, 
        "mutation OrganizationAddMember($userIds:[ID!],$organizationId:ID!){alphaOrganizationMemberAdd(userIds:$userIds,organizationId:$organizationId){__typename role user{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        OrganizationAddMemberSelector
    )
    let OrganizationAlterPublished = OperationDefinition(
        "OrganizationAlterPublished",
        .mutation, 
        "mutation OrganizationAlterPublished($organizationId:ID!,$published:Boolean!){alphaAlterPublished(id:$organizationId,published:$published){__typename ...OrganizationSearch}}fragment OrganizationSearch on Organization{__typename id superAccountId name photo isMine about status membersCount featured:alphaFeatured members:alphaOrganizationMembers{__typename user{__typename id name photo}}}",
        OrganizationAlterPublishedSelector
    )
    let OrganizationChangeMemberRole = OperationDefinition(
        "OrganizationChangeMemberRole",
        .mutation, 
        "mutation OrganizationChangeMemberRole($memberId:ID!,$newRole:OrganizationMemberRole!,$organizationId:ID!){alphaOrganizationChangeMemberRole(memberId:$memberId,newRole:$newRole,organizationId:$organizationId)}",
        OrganizationChangeMemberRoleSelector
    )
    let OrganizationCreatePublicInvite = OperationDefinition(
        "OrganizationCreatePublicInvite",
        .mutation, 
        "mutation OrganizationCreatePublicInvite($expirationDays:Int,$organizationId:ID){alphaOrganizationRefreshInviteLink(expirationDays:$expirationDays,organizationId:$organizationId){__typename id key ttl}}",
        OrganizationCreatePublicInviteSelector
    )
    let OrganizationMemberRemove = OperationDefinition(
        "OrganizationMemberRemove",
        .mutation, 
        "mutation OrganizationMemberRemove($userId:ID!,$organizationId:ID!){betaOrganizationMemberRemove(userId:$userId,organizationId:$organizationId){__typename id}}",
        OrganizationMemberRemoveSelector
    )
    let PaymentIntentCancel = OperationDefinition(
        "PaymentIntentCancel",
        .mutation, 
        "mutation PaymentIntentCancel($id:ID!){paymentCancel(id:$id)}",
        PaymentIntentCancelSelector
    )
    let PaymentIntentCommit = OperationDefinition(
        "PaymentIntentCommit",
        .mutation, 
        "mutation PaymentIntentCommit($id:ID!){paymentIntentCommit(id:$id)}",
        PaymentIntentCommitSelector
    )
    let PersistEvents = OperationDefinition(
        "PersistEvents",
        .mutation, 
        "mutation PersistEvents($did:String!,$events:[Event!]!,$isProd:Boolean){track(did:$did,events:$events,isProd:$isProd)}",
        PersistEventsSelector
    )
    let PinMessage = OperationDefinition(
        "PinMessage",
        .mutation, 
        "mutation PinMessage($chatId:ID!,$messageId:ID!){pinMessage:gammaPinMessage(chatId:$chatId,messageId:$messageId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount pinnedMessage{__typename ...FullMessage}matchmaking{__typename ...MatchmakingRoomFragment}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}",
        PinMessageSelector
    )
    let ProfileCreate = OperationDefinition(
        "ProfileCreate",
        .mutation, 
        "mutation ProfileCreate($input:ProfileInput!,$inviteKey:String){profileCreate(input:$input,inviteKey:$inviteKey){__typename id firstName lastName photoRef{__typename uuid crop{__typename x y w h}}email phone website about location}}",
        ProfileCreateSelector
    )
    let ProfileUpdate = OperationDefinition(
        "ProfileUpdate",
        .mutation, 
        "mutation ProfileUpdate($input:ProfileInput!,$uid:ID,$inviteKey:String){profileUpdate(input:$input,uid:$uid,inviteKey:$inviteKey){__typename id firstName lastName photoRef{__typename uuid crop{__typename x y w h}}email phone website about location role:alphaRole linkedin instagram facebook twitter primaryOrganizationId:alphaPrimaryOrganizationId joinedAt:alphaJoinedAt invitedBy:alphaInvitedBy{__typename id name}}}",
        ProfileUpdateSelector
    )
    let ReadNotification = OperationDefinition(
        "ReadNotification",
        .mutation, 
        "mutation ReadNotification($notificationId:ID!){readNotification(notificationId:$notificationId){__typename id unread}}",
        ReadNotificationSelector
    )
    let RefreshAppToken = OperationDefinition(
        "RefreshAppToken",
        .mutation, 
        "mutation RefreshAppToken($appId:ID!){refreshAppToken(appId:$appId){__typename ...AppFull}}fragment AppFull on AppProfile{__typename id name shortname photoRef{__typename uuid crop{__typename x y w h}}about token{__typename salt}}",
        RefreshAppTokenSelector
    )
    let RegisterPush = OperationDefinition(
        "RegisterPush",
        .mutation, 
        "mutation RegisterPush($endpoint:String!,$type:PushType!){registerPush(endpoint:$endpoint,type:$type)}",
        RegisterPushSelector
    )
    let RegisterWebPush = OperationDefinition(
        "RegisterWebPush",
        .mutation, 
        "mutation RegisterWebPush($endpoint:String!){registerWebPush(endpoint:$endpoint)}",
        RegisterWebPushSelector
    )
    let RemoveCard = OperationDefinition(
        "RemoveCard",
        .mutation, 
        "mutation RemoveCard($id:ID!){cardRemove(id:$id){__typename id deleted}}",
        RemoveCardSelector
    )
    let ReportContent = OperationDefinition(
        "ReportContent",
        .mutation, 
        "mutation ReportContent($contentId:ID!,$type:String!,$message:String){reportContent(contentId:$contentId,type:$type,message:$message)}",
        ReportContentSelector
    )
    let ReportOnline = OperationDefinition(
        "ReportOnline",
        .mutation, 
        "mutation ReportOnline($active:Boolean,$platform:String){presenceReportOnline(timeout:5000,active:$active,platform:$platform)}",
        ReportOnlineSelector
    )
    let RoomAddMembers = OperationDefinition(
        "RoomAddMembers",
        .mutation, 
        "mutation RoomAddMembers($roomId:ID!,$invites:[RoomInviteInput!]!){alphaRoomInvite(roomId:$roomId,invites:$invites){__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}",
        RoomAddMembersSelector
    )
    let RoomAlterFeatured = OperationDefinition(
        "RoomAlterFeatured",
        .mutation, 
        "mutation RoomAlterFeatured($roomId:ID!,$featured:Boolean!){betaRoomAlterFeatured(roomId:$roomId,featured:$featured){__typename id listed featured}}",
        RoomAlterFeaturedSelector
    )
    let RoomAlterHidden = OperationDefinition(
        "RoomAlterHidden",
        .mutation, 
        "mutation RoomAlterHidden($roomId:ID!,$listed:Boolean!){betaRoomAlterListed(roomId:$roomId,listed:$listed){__typename id listed featured}}",
        RoomAlterHiddenSelector
    )
    let RoomChangeRole = OperationDefinition(
        "RoomChangeRole",
        .mutation, 
        "mutation RoomChangeRole($roomId:ID!,$userId:ID!,$newRole:RoomMemberRole!){betaRoomChangeRole(roomId:$roomId,userId:$userId,newRole:$newRole){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel title photo socialImage description shortname organization{__typename ...OrganizationMedium}membership role membersCount featuredMembersCount onlineMembersCount previewMembers{__typename id photo name}members{__typename role membership user{__typename ...UserShort}canKick badge{__typename ...UserBadge}}requests{__typename user{__typename ...UserShort}}settings{__typename id mute}canEdit canSendMessage welcomeMessage{__typename isOn sender{__typename id name}message}matchmaking{__typename ...MatchmakingRoomFragment}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationMedium on Organization{__typename id name photo isMine membersCount shortname about isOwner:betaIsOwner isAdmin:betaIsAdmin isCommunity:alphaIsCommunity}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}",
        RoomChangeRoleSelector
    )
    let RoomCreate = OperationDefinition(
        "RoomCreate",
        .mutation, 
        "mutation RoomCreate($kind:SharedRoomKind!,$members:[ID!]!,$message:String,$title:String,$description:String,$photoRef:ImageRefInput,$organizationId:ID,$channel:Boolean!,$price:Int,$interval:WalletSubscriptionInterval){room:betaRoomCreate(kind:$kind,members:$members,message:$message,title:$title,description:$description,photoRef:$photoRef,organizationId:$organizationId,channel:$channel,price:$price,interval:$interval){__typename id}}",
        RoomCreateSelector
    )
    let RoomDeleteMessage = OperationDefinition(
        "RoomDeleteMessage",
        .mutation, 
        "mutation RoomDeleteMessage($messageId:ID!){betaMessageDelete(mid:$messageId)}",
        RoomDeleteMessageSelector
    )
    let RoomDeleteMessages = OperationDefinition(
        "RoomDeleteMessages",
        .mutation, 
        "mutation RoomDeleteMessages($mids:[ID!]!){betaMessageDelete(mids:$mids)}",
        RoomDeleteMessagesSelector
    )
    let RoomDeleteUrlAugmentation = OperationDefinition(
        "RoomDeleteUrlAugmentation",
        .mutation, 
        "mutation RoomDeleteUrlAugmentation($messageId:ID!){betaMessageDeleteAugmentation(mid:$messageId)}",
        RoomDeleteUrlAugmentationSelector
    )
    let RoomJoin = OperationDefinition(
        "RoomJoin",
        .mutation, 
        "mutation RoomJoin($roomId:ID!){join:betaRoomJoin(roomId:$roomId){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}",
        RoomJoinSelector
    )
    let RoomJoinInviteLink = OperationDefinition(
        "RoomJoinInviteLink",
        .mutation, 
        "mutation RoomJoinInviteLink($invite:String!){join:betaRoomInviteLinkJoin(invite:$invite){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount pinnedMessage{__typename ...FullMessage}matchmaking{__typename ...MatchmakingRoomFragment}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}",
        RoomJoinInviteLinkSelector
    )
    let RoomKick = OperationDefinition(
        "RoomKick",
        .mutation, 
        "mutation RoomKick($roomId:ID!,$userId:ID!){betaRoomKick(roomId:$roomId,userId:$userId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel title photo socialImage description shortname organization{__typename ...OrganizationMedium}membership role membersCount featuredMembersCount onlineMembersCount previewMembers{__typename id photo name}members{__typename role membership user{__typename ...UserShort}canKick badge{__typename ...UserBadge}}requests{__typename user{__typename ...UserShort}}settings{__typename id mute}canEdit canSendMessage welcomeMessage{__typename isOn sender{__typename id name}message}matchmaking{__typename ...MatchmakingRoomFragment}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationMedium on Organization{__typename id name photo isMine membersCount shortname about isOwner:betaIsOwner isAdmin:betaIsAdmin isCommunity:alphaIsCommunity}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}",
        RoomKickSelector
    )
    let RoomLeave = OperationDefinition(
        "RoomLeave",
        .mutation, 
        "mutation RoomLeave($roomId:ID!){betaRoomLeave(roomId:$roomId){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}",
        RoomLeaveSelector
    )
    let RoomRead = OperationDefinition(
        "RoomRead",
        .mutation, 
        "mutation RoomRead($id:ID!,$mid:ID!){roomRead(id:$id,mid:$mid)}",
        RoomReadSelector
    )
    let RoomRenewInviteLink = OperationDefinition(
        "RoomRenewInviteLink",
        .mutation, 
        "mutation RoomRenewInviteLink($roomId:ID!){link:betaRoomInviteLinkRenew(roomId:$roomId)}",
        RoomRenewInviteLinkSelector
    )
    let RoomSettingsUpdate = OperationDefinition(
        "RoomSettingsUpdate",
        .mutation, 
        "mutation RoomSettingsUpdate($settings:RoomUserNotificaionSettingsInput!,$roomId:ID!){betaRoomUpdateUserNotificationSettings(settings:$settings,roomId:$roomId){__typename id mute}}",
        RoomSettingsUpdateSelector
    )
    let RoomUpdate = OperationDefinition(
        "RoomUpdate",
        .mutation, 
        "mutation RoomUpdate($roomId:ID!,$input:RoomUpdateInput!){betaRoomUpdate(roomId:$roomId,input:$input){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id title photo description socialImage}}}",
        RoomUpdateSelector
    )
    let RoomsInviteUser = OperationDefinition(
        "RoomsInviteUser",
        .mutation, 
        "mutation RoomsInviteUser($userId:ID!,$roomIds:[ID!]!){rooms:betaRoomsInviteUser(userId:$userId,roomIds:$roomIds){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount pinnedMessage{__typename ...FullMessage}matchmaking{__typename ...MatchmakingRoomFragment}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}",
        RoomsInviteUserSelector
    )
    let RoomsJoin = OperationDefinition(
        "RoomsJoin",
        .mutation, 
        "mutation RoomsJoin($roomsIds:[ID!]!){join:betaRoomsJoin(roomsIds:$roomsIds){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}",
        RoomsJoinSelector
    )
    let SendDonation = OperationDefinition(
        "SendDonation",
        .mutation, 
        "mutation SendDonation($chatId:ID!,$amount:Int!,$message:String,$repeatKey:String){sendDonation(chatId:$chatId,amount:$amount,message:$message,repeatKey:$repeatKey)}",
        SendDonationSelector
    )
    let SendMessage = OperationDefinition(
        "SendMessage",
        .mutation, 
        "mutation SendMessage($chatId:ID!,$message:String,$replyMessages:[ID!],$mentions:[MentionInput!],$fileAttachments:[FileAttachmentInput!],$spans:[MessageSpanInput!],$repeatKey:String){sentMessage:sendMessage(chatId:$chatId,message:$message,replyMessages:$replyMessages,mentions:$mentions,fileAttachments:$fileAttachments,spans:$spans,repeatKey:$repeatKey)}",
        SendMessageSelector
    )
    let SendSticker = OperationDefinition(
        "SendSticker",
        .mutation, 
        "mutation SendSticker($chatId:ID!,$stickerId:ID!,$replyMessages:[ID!],$repeatKey:String){sendSticker(chatId:$chatId,stickerId:$stickerId,replyMessages:$replyMessages,repeatKey:$repeatKey)}",
        SendStickerSelector
    )
    let SetFeedChannelShortname = OperationDefinition(
        "SetFeedChannelShortname",
        .mutation, 
        "mutation SetFeedChannelShortname($id:ID!,$shortname:String!){alphaSetFeedChannelShortName(id:$id,shortname:$shortname)}",
        SetFeedChannelShortnameSelector
    )
    let SetOrgShortname = OperationDefinition(
        "SetOrgShortname",
        .mutation, 
        "mutation SetOrgShortname($organizationId:ID!,$shortname:String!){alphaSetOrgShortName(id:$organizationId,shortname:$shortname)}",
        SetOrgShortnameSelector
    )
    let SetRoomShortname = OperationDefinition(
        "SetRoomShortname",
        .mutation, 
        "mutation SetRoomShortname($id:ID!,$shortname:String!){alphaSetRoomShortName(id:$id,shortname:$shortname)}",
        SetRoomShortnameSelector
    )
    let SetTyping = OperationDefinition(
        "SetTyping",
        .mutation, 
        "mutation SetTyping($conversationId:ID!,$type:TypingType!){typingSend(conversationId:$conversationId,type:$type)}",
        SetTypingSelector
    )
    let SetUserShortname = OperationDefinition(
        "SetUserShortname",
        .mutation, 
        "mutation SetUserShortname($shortname:String!){alphaSetUserShortName(shortname:$shortname)}",
        SetUserShortnameSelector
    )
    let SettingsUpdate = OperationDefinition(
        "SettingsUpdate",
        .mutation, 
        "mutation SettingsUpdate($input:UpdateSettingsInput){updateSettings(settings:$input){__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id primaryEmail emailFrequency excludeMutedChats countUnreadChats desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}organizationChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}notificationPreview}",
        SettingsUpdateSelector
    )
    let StickerPackAddToCollection = OperationDefinition(
        "StickerPackAddToCollection",
        .mutation, 
        "mutation StickerPackAddToCollection($id:ID!){stickerPackAddToCollection:stickerPackAddToCollection(id:$id)}",
        StickerPackAddToCollectionSelector
    )
    let StickerPackRemoveFromCollection = OperationDefinition(
        "StickerPackRemoveFromCollection",
        .mutation, 
        "mutation StickerPackRemoveFromCollection($id:ID!){stickerPackRemoveFromCollection:stickerPackRemoveFromCollection(id:$id)}",
        StickerPackRemoveFromCollectionSelector
    )
    let SubscribeToComments = OperationDefinition(
        "SubscribeToComments",
        .mutation, 
        "mutation SubscribeToComments($peerId:ID!,$type:CommentSubscriptionType!){subscribeToComments(peerId:$peerId,type:$type)}",
        SubscribeToCommentsSelector
    )
    let SuperAccountActivate = OperationDefinition(
        "SuperAccountActivate",
        .mutation, 
        "mutation SuperAccountActivate($accountId:ID!){superAccountActivate(id:$accountId){__typename id state}}",
        SuperAccountActivateSelector
    )
    let SuperAccountAdd = OperationDefinition(
        "SuperAccountAdd",
        .mutation, 
        "mutation SuperAccountAdd($title:String!){superAccountAdd(title:$title){__typename id}}",
        SuperAccountAddSelector
    )
    let SuperAccountMemberAdd = OperationDefinition(
        "SuperAccountMemberAdd",
        .mutation, 
        "mutation SuperAccountMemberAdd($accountId:ID!,$userId:ID!){superAccountMemberAdd(id:$accountId,userId:$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        SuperAccountMemberAddSelector
    )
    let SuperAccountMemberRemove = OperationDefinition(
        "SuperAccountMemberRemove",
        .mutation, 
        "mutation SuperAccountMemberRemove($accountId:ID!,$userId:ID!){superAccountMemberRemove(id:$accountId,userId:$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        SuperAccountMemberRemoveSelector
    )
    let SuperAccountPend = OperationDefinition(
        "SuperAccountPend",
        .mutation, 
        "mutation SuperAccountPend($accountId:ID!){superAccountPend(id:$accountId){__typename id state}}",
        SuperAccountPendSelector
    )
    let SuperAccountRename = OperationDefinition(
        "SuperAccountRename",
        .mutation, 
        "mutation SuperAccountRename($accountId:ID!,$title:String!){superAccountRename(id:$accountId,title:$title){__typename id title}}",
        SuperAccountRenameSelector
    )
    let SuperAccountSuspend = OperationDefinition(
        "SuperAccountSuspend",
        .mutation, 
        "mutation SuperAccountSuspend($accountId:ID!){superAccountSuspend(id:$accountId){__typename id state}}",
        SuperAccountSuspendSelector
    )
    let SuperAdminAdd = OperationDefinition(
        "SuperAdminAdd",
        .mutation, 
        "mutation SuperAdminAdd($userId:ID!,$role:SuperAdminRole!){superAdminAdd(userId:$userId,role:$role)}",
        SuperAdminAddSelector
    )
    let SuperAdminRemove = OperationDefinition(
        "SuperAdminRemove",
        .mutation, 
        "mutation SuperAdminRemove($userId:ID!){superAdminRemove(userId:$userId)}",
        SuperAdminRemoveSelector
    )
    let SuperBadgeCreateToRoom = OperationDefinition(
        "SuperBadgeCreateToRoom",
        .mutation, 
        "mutation SuperBadgeCreateToRoom($roomId:ID!,$userId:ID!,$name:String!){superBadgeCreateToRoom(roomId:$roomId,userId:$userId,name:$name){__typename ...UserBadge}}fragment UserBadge on UserBadge{__typename id name verified}",
        SuperBadgeCreateToRoomSelector
    )
    let SuperBadgeUnsetToRoom = OperationDefinition(
        "SuperBadgeUnsetToRoom",
        .mutation, 
        "mutation SuperBadgeUnsetToRoom($roomId:ID!,$userId:ID!,$badgeId:ID!){superBadgeUnsetToRoom(roomId:$roomId,userId:$userId,badgeId:$badgeId)}",
        SuperBadgeUnsetToRoomSelector
    )
    let UnSubscribeFromComments = OperationDefinition(
        "UnSubscribeFromComments",
        .mutation, 
        "mutation UnSubscribeFromComments($peerId:ID!){unsubscribeFromComments(peerId:$peerId)}",
        UnSubscribeFromCommentsSelector
    )
    let UnpinMessage = OperationDefinition(
        "UnpinMessage",
        .mutation, 
        "mutation UnpinMessage($chatId:ID!){unpinMessage:gammaUnpinMessage(chatId:$chatId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount pinnedMessage{__typename ...FullMessage}matchmaking{__typename ...MatchmakingRoomFragment}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}",
        UnpinMessageSelector
    )
    let UnsetTyping = OperationDefinition(
        "UnsetTyping",
        .mutation, 
        "mutation UnsetTyping($conversationId:ID!){typingCancel(conversationId:$conversationId)}",
        UnsetTypingSelector
    )
    let UpdateApp = OperationDefinition(
        "UpdateApp",
        .mutation, 
        "mutation UpdateApp($appId:ID!,$input:AppProfileInput!){updateAppProfile(appId:$appId,input:$input){__typename ...AppFull}}fragment AppFull on AppProfile{__typename id name shortname photoRef{__typename uuid crop{__typename x y w h}}about token{__typename salt}}",
        UpdateAppSelector
    )
    let UpdateOrganization = OperationDefinition(
        "UpdateOrganization",
        .mutation, 
        "mutation UpdateOrganization($input:UpdateOrganizationProfileInput!,$organizationId:ID){updateOrganizationProfile(input:$input,id:$organizationId){__typename ...OrganizationProfileFull}}fragment OrganizationProfileFull on OrganizationProfile{__typename id name photoRef{__typename uuid crop{__typename x y w h}}website websiteTitle about twitter facebook linkedin instagram shortname private:alphaIsPrivate featured:alphaFeatured published:alphaPublished editorial:alphaEditorial}",
        UpdateOrganizationSelector
    )
    let UpdateWelcomeMessage = OperationDefinition(
        "UpdateWelcomeMessage",
        .mutation, 
        "mutation UpdateWelcomeMessage($roomId:ID!,$welcomeMessageIsOn:Boolean!,$welcomeMessageSender:ID,$welcomeMessageText:String){updateWelcomeMessage(roomId:$roomId,welcomeMessageIsOn:$welcomeMessageIsOn,welcomeMessageSender:$welcomeMessageSender,welcomeMessageText:$welcomeMessageText)}",
        UpdateWelcomeMessageSelector
    )
    let UserStorageSet = OperationDefinition(
        "UserStorageSet",
        .mutation, 
        "mutation UserStorageSet($namespace:String!,$data:[AppStorageValueInput!]!){userStorageSet(namespace:$namespace,data:$data){__typename id key value}}",
        UserStorageSetSelector
    )
    let ChatOnlinesCountWatch = OperationDefinition(
        "ChatOnlinesCountWatch",
        .subscription, 
        "subscription ChatOnlinesCountWatch($chatId:ID!){chatOnlinesCount(chatId:$chatId){__typename onlineMembers}}",
        ChatOnlinesCountWatchSelector
    )
    let ChatWatch = OperationDefinition(
        "ChatWatch",
        .subscription, 
        "subscription ChatWatch($chatId:ID!,$state:String){event:chatUpdates(chatId:$chatId,fromState:$state){__typename ... on ChatUpdateSingle{__typename seq state update{__typename ...ChatUpdateFragment}}... on ChatUpdateBatch{__typename fromSeq seq state updates{__typename ...ChatUpdateFragment}}}}fragment ChatUpdateFragment on ChatUpdate{__typename ... on ChatMessageReceived{__typename message{__typename ...FullMessage}repeatKey}... on ChatMessageUpdated{__typename message{__typename ...FullMessage}}... on ChatMessageDeleted{__typename message{__typename id}}... on ChatUpdated{__typename chat{__typename ...RoomShort}}... on ChatLostAccess{__typename lostAccess}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount pinnedMessage{__typename ...FullMessage}matchmaking{__typename ...MatchmakingRoomFragment}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName}}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}",
        ChatWatchSelector
    )
    let CommentWatch = OperationDefinition(
        "CommentWatch",
        .subscription, 
        "subscription CommentWatch($peerId:ID!,$fromState:String){event:commentUpdates(peerId:$peerId,fromState:$fromState){__typename ... on CommentUpdateSingle{__typename seq state update{__typename ...CommentUpdateFragment}}... on CommentUpdateBatch{__typename fromSeq seq state updates{__typename ...CommentUpdateFragment}}}}fragment CommentUpdateFragment on CommentUpdate{__typename ... on CommentReceived{__typename comment{__typename ...CommentEntryFragment}}... on CommentUpdated{__typename comment{__typename ...CommentEntryFragment}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage id}parentComment{__typename comment:betaComment{__typename id message}id}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}",
        CommentWatchSelector
    )
    let ConferenceMediaWatch = OperationDefinition(
        "ConferenceMediaWatch",
        .subscription, 
        "subscription ConferenceMediaWatch($id:ID!,$peerId:ID!){media:alphaConferenceMediaWatch(id:$id,peerId:$peerId){__typename id streams{__typename id peerId state sdp ice}}}",
        ConferenceMediaWatchSelector
    )
    let ConferenceWatch = OperationDefinition(
        "ConferenceWatch",
        .subscription, 
        "subscription ConferenceWatch($id:ID!){alphaConferenceWatch(id:$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename id startTime peers{__typename id user{__typename ...UserShort}connection{__typename state sdp ice}}iceServers{__typename urls username credential}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        ConferenceWatchSelector
    )
    let DebugEventsWatch = OperationDefinition(
        "DebugEventsWatch",
        .subscription, 
        "subscription DebugEventsWatch($fromState:String,$eventsCount:Int!,$randomDelays:Boolean!,$seed:String!){debugEvents(fromState:$fromState,eventsCount:$eventsCount,randomDelays:$randomDelays,seed:$seed){__typename seq key}}",
        DebugEventsWatchSelector
    )
    let DialogsWatch = OperationDefinition(
        "DialogsWatch",
        .subscription, 
        "subscription DialogsWatch($state:String){event:dialogsUpdates(fromState:$state){__typename ... on DialogUpdateSingle{__typename state update{__typename ...DialogUpdateFragment}}... on DialogUpdateBatch{__typename state updates{__typename ...DialogUpdateFragment}}}}fragment DialogUpdateFragment on DialogUpdate{__typename ... on DialogMessageReceived{__typename cid unread globalUnread message:alphaMessage{__typename ...DialogMessage ... on ServiceMessage{__typename id serviceMetadata{__typename}}}haveMention silent{__typename mobile desktop}showNotification{__typename mobile desktop}membership}... on DialogMessageUpdated{__typename cid message:alphaMessage{__typename ...DialogMessage}haveMention}... on DialogMessageDeleted{__typename cid message:alphaMessage{__typename ...DialogMessage}prevMessage:alphaPrevMessage{__typename ...DialogMessage}unread globalUnread haveMention}... on DialogMessageRead{__typename cid mid unread globalUnread haveMention}... on DialogMuteChanged{__typename cid mute}... on DialogPeerUpdated{__typename cid peer{__typename ... on PrivateRoom{__typename id user{__typename id name photo}}... on SharedRoom{__typename id title photo}}}... on DialogDeleted{__typename cid globalUnread}... on DialogBump{__typename cid globalUnread unread topMessage{__typename ...DialogMessage ... on ServiceMessage{__typename id serviceMetadata{__typename}}}haveMention membership}}fragment DialogMessage on ModernMessage{__typename id date sender{__typename id name photo firstName}message fallback ... on GeneralMessage{__typename id quotedMessages{__typename id}}}",
        DialogsWatchSelector
    )
    let FeedUpdates = OperationDefinition(
        "FeedUpdates",
        .subscription, 
        "subscription FeedUpdates($state:String){event:homeFeedUpdates(fromState:$state){__typename updates{__typename ...FeedUpdateFragment}state}}fragment FeedUpdateFragment on FeedUpdate{__typename ... on FeedItemReceived{__typename item{__typename ...FeedItemFull}}... on FeedItemUpdated{__typename item{__typename ...FeedItemFull}}... on FeedItemDeleted{__typename item{__typename ...FeedItemFull}}... on FeedRebuildNeeded{__typename feed:homeFeed{__typename items{__typename ...FeedItemFull}cursor}}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{__typename id date author{__typename ...FeedPostAuthorFragment}source{__typename ...FeedPostSourceFragment}edited canEdit commentsCount message fallback reactions{__typename user{__typename ...UserShort}reaction}slides{__typename ...SlideFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{__typename ...UserShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}fragment SlideFragment on Slide{__typename ... on TextSlide{__typename id text spans{__typename ...SpanFragment}cover{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}coverAlign attachments{__typename ... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title roomPhoto:photo membersCount membership canSendMessage organization{__typename id name photo}}... on Organization{__typename ...OrganizationShort}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}",
        FeedUpdatesSelector
    )
    let MyNotificationsCenter = OperationDefinition(
        "MyNotificationsCenter",
        .subscription, 
        "subscription MyNotificationsCenter($state:String){event:notificationCenterUpdates(fromState:$state){__typename ... on NotificationCenterUpdateSingle{__typename seq state update{__typename ...NotificationCenterUpdateFragment}}... on NotificationCenterUpdateBatch{__typename fromSeq seq state updates{__typename ...NotificationCenterUpdateFragment}}}}fragment NotificationCenterUpdateFragment on NotificationCenterUpdate{__typename ... on NotificationReceived{__typename center{__typename id unread}notification{__typename ...NotificationFragment}}... on NotificationUpdated{__typename center{__typename id unread}notification{__typename ...NotificationFragment}}... on NotificationDeleted{__typename center{__typename id unread}notification{__typename id}}... on NotificationRead{__typename center{__typename id unread}}... on NotificationContentUpdated{__typename content{__typename ... on UpdatedNotificationContentComment{__typename peer{__typename peerRoot{__typename ... on CommentPeerRootMessage{__typename message{__typename ... on GeneralMessage{__typename id fallback message sender{__typename id name}senderBadge{__typename ...UserBadge}}}chat{__typename ...RoomNano}}... on CommentPeerRootFeedItem{__typename item{__typename ...FeedItemFull}}}id subscription{__typename type}}comment{__typename ...CommentEntryFragment}}}}}fragment NotificationFragment on Notification{__typename id text content{__typename ... on NewCommentNotification{__typename comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{__typename message{__typename ... on GeneralMessage{__typename id fallback message sender{__typename id name}senderBadge{__typename ...UserBadge}}}chat{__typename ...RoomNano}}... on CommentPeerRootFeedItem{__typename item{__typename ...FeedItemFull}}}subscription{__typename type}}}... on NewMatchmakingProfilesNotification{__typename room{__typename peer{__typename ... on SharedRoom{__typename ...RoomNano}}}profiles{__typename ...MatchmakingProfileFragment}}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage id}parentComment{__typename comment:betaComment{__typename id message}id}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{__typename id date author{__typename ...FeedPostAuthorFragment}source{__typename ...FeedPostSourceFragment}edited canEdit commentsCount message fallback reactions{__typename user{__typename ...UserShort}reaction}slides{__typename ...SlideFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{__typename ...UserShort}}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}fragment SlideFragment on Slide{__typename ... on TextSlide{__typename id text spans{__typename ...SpanFragment}cover{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}coverAlign attachments{__typename ... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title roomPhoto:photo membersCount membership canSendMessage organization{__typename id name photo}}... on Organization{__typename ...OrganizationShort}}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}",
        MyNotificationsCenterSelector
    )
    let OnlineWatch = OperationDefinition(
        "OnlineWatch",
        .subscription, 
        "subscription OnlineWatch($users:[ID!]!){alphaSubscribeOnline(users:$users){__typename user{__typename id online lastSeen}timeout}}",
        OnlineWatchSelector
    )
    let SettingsWatch = OperationDefinition(
        "SettingsWatch",
        .subscription, 
        "subscription SettingsWatch{watchSettings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id primaryEmail emailFrequency excludeMutedChats countUnreadChats desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}organizationChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}notificationPreview}",
        SettingsWatchSelector
    )
    let TypingsWatch = OperationDefinition(
        "TypingsWatch",
        .subscription, 
        "subscription TypingsWatch{typings{__typename conversation:chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}user{__typename id photo firstName}cancel type}}",
        TypingsWatchSelector
    )
    let WalletUpdates = OperationDefinition(
        "WalletUpdates",
        .subscription, 
        "subscription WalletUpdates($state:String!){event:walletUpdates(fromState:$state){__typename ... on WalletUpdateSingle{__typename state update{__typename ...WalletUpdateFragment}}... on WalletUpdateBatch{__typename state updates{__typename ...WalletUpdateFragment}}}}fragment WalletUpdateFragment on WalletUpdate{__typename ... on WalletUpdateBalance{__typename amount}... on WalletUpdateLocked{__typename isLocked failingPaymentsCount}... on WalletUpdateTransactionSuccess{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdateTransactionCanceled{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdateTransactionPending{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdatePaymentStatus{__typename payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}}fragment WalletTransactionFragment on WalletTransaction{__typename id status date operation{__typename ... on WalletTransactionDeposit{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}}... on WalletTransactionIncome{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}source{__typename ... on WalletSubscription{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}... on Purchase{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}}}... on WalletTransactionTransferIn{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}fromUser{__typename ...UserShort}}... on WalletTransactionTransferOut{__typename amount walletAmount chargeAmount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}toUser{__typename ...UserShort}}... on WalletTransactionSubscription{__typename amount walletAmount chargeAmount subscription{__typename id interval amount product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}... on WalletTransactionPurchase{__typename amount walletAmount chargeAmount purchase{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}",
        WalletUpdatesSelector
    )
    
    func operationByName(_ name: String) -> OperationDefinition {
        if name == "Account" { return Account }
        if name == "AccountAppInvite" { return AccountAppInvite }
        if name == "AccountAppInviteInfo" { return AccountAppInviteInfo }
        if name == "AccountInviteInfo" { return AccountInviteInfo }
        if name == "AccountSettings" { return AccountSettings }
        if name == "AuthResolveShortName" { return AuthResolveShortName }
        if name == "ChatInit" { return ChatInit }
        if name == "ChatInitFromUnread" { return ChatInitFromUnread }
        if name == "ChatJoin" { return ChatJoin }
        if name == "ChatMembersSearch" { return ChatMembersSearch }
        if name == "ChatMentionSearch" { return ChatMentionSearch }
        if name == "Comments" { return Comments }
        if name == "Conference" { return Conference }
        if name == "ConferenceMedia" { return ConferenceMedia }
        if name == "Dialogs" { return Dialogs }
        if name == "DiscoverCollection" { return DiscoverCollection }
        if name == "DiscoverCollectionShort" { return DiscoverCollectionShort }
        if name == "DiscoverCollections" { return DiscoverCollections }
        if name == "DiscoverCollectionsShort" { return DiscoverCollectionsShort }
        if name == "DiscoverEditorsChoice" { return DiscoverEditorsChoice }
        if name == "DiscoverIsDone" { return DiscoverIsDone }
        if name == "DiscoverNewAndGrowing" { return DiscoverNewAndGrowing }
        if name == "DiscoverNextPage" { return DiscoverNextPage }
        if name == "DiscoverPopularNow" { return DiscoverPopularNow }
        if name == "DiscoverState" { return DiscoverState }
        if name == "DiscoverSuggestedRooms" { return DiscoverSuggestedRooms }
        if name == "DiscoverTopFree" { return DiscoverTopFree }
        if name == "DiscoverTopPremium" { return DiscoverTopPremium }
        if name == "ExplorePeople" { return ExplorePeople }
        if name == "ExploreRooms" { return ExploreRooms }
        if name == "FeatureFlags" { return FeatureFlags }
        if name == "FeedChannel" { return FeedChannel }
        if name == "FeedChannelContent" { return FeedChannelContent }
        if name == "FeedChannelSubscribers" { return FeedChannelSubscribers }
        if name == "FeedChannelWriters" { return FeedChannelWriters }
        if name == "FeedChannelsSearch" { return FeedChannelsSearch }
        if name == "FeedItem" { return FeedItem }
        if name == "FeedLoadMore" { return FeedLoadMore }
        if name == "FeedRecommendedChannels" { return FeedRecommendedChannels }
        if name == "FeedSubscriptions" { return FeedSubscriptions }
        if name == "FeedWritableChannels" { return FeedWritableChannels }
        if name == "FetchPushSettings" { return FetchPushSettings }
        if name == "GlobalCounter" { return GlobalCounter }
        if name == "GlobalSearch" { return GlobalSearch }
        if name == "InitFeed" { return InitFeed }
        if name == "MatchmakingProfile" { return MatchmakingProfile }
        if name == "MatchmakingRoom" { return MatchmakingRoom }
        if name == "Message" { return Message }
        if name == "MessagesBatch" { return MessagesBatch }
        if name == "MessagesSearch" { return MessagesSearch }
        if name == "MyApps" { return MyApps }
        if name == "MyCards" { return MyCards }
        if name == "MyNotificationCenter" { return MyNotificationCenter }
        if name == "MyNotifications" { return MyNotifications }
        if name == "MyOrganizations" { return MyOrganizations }
        if name == "MyStickers" { return MyStickers }
        if name == "MySuccessfulInvitesCount" { return MySuccessfulInvitesCount }
        if name == "MyWallet" { return MyWallet }
        if name == "OauthContext" { return OauthContext }
        if name == "Online" { return Online }
        if name == "Organization" { return Organization }
        if name == "OrganizationByPrefix" { return OrganizationByPrefix }
        if name == "OrganizationMembers" { return OrganizationMembers }
        if name == "OrganizationMembersShort" { return OrganizationMembersShort }
        if name == "OrganizationProfile" { return OrganizationProfile }
        if name == "OrganizationPublicInvite" { return OrganizationPublicInvite }
        if name == "OrganizationPublicRooms" { return OrganizationPublicRooms }
        if name == "OrganizationWithoutMembers" { return OrganizationWithoutMembers }
        if name == "Permissions" { return Permissions }
        if name == "PicSharedMedia" { return PicSharedMedia }
        if name == "Profile" { return Profile }
        if name == "ProfilePrefill" { return ProfilePrefill }
        if name == "ResolveShortName" { return ResolveShortName }
        if name == "ResolvedInvite" { return ResolvedInvite }
        if name == "Room" { return Room }
        if name == "RoomChat" { return RoomChat }
        if name == "RoomFeaturedMembers" { return RoomFeaturedMembers }
        if name == "RoomInviteInfo" { return RoomInviteInfo }
        if name == "RoomInviteLink" { return RoomInviteLink }
        if name == "RoomMembers" { return RoomMembers }
        if name == "RoomMembersPaginated" { return RoomMembersPaginated }
        if name == "RoomMembersShort" { return RoomMembersShort }
        if name == "RoomMembersTiny" { return RoomMembersTiny }
        if name == "RoomOrganizationAdminMembers" { return RoomOrganizationAdminMembers }
        if name == "RoomPico" { return RoomPico }
        if name == "RoomSearch" { return RoomSearch }
        if name == "RoomSocialImage" { return RoomSocialImage }
        if name == "RoomSuper" { return RoomSuper }
        if name == "RoomTiny" { return RoomTiny }
        if name == "RoomWithoutMembers" { return RoomWithoutMembers }
        if name == "Settings" { return Settings }
        if name == "SharedMedia" { return SharedMedia }
        if name == "SharedMediaCounters" { return SharedMediaCounters }
        if name == "StickerPack" { return StickerPack }
        if name == "StickerPackCatalog" { return StickerPackCatalog }
        if name == "StripeToken" { return StripeToken }
        if name == "Subscriptions" { return Subscriptions }
        if name == "SuggestedRooms" { return SuggestedRooms }
        if name == "SuperAccount" { return SuperAccount }
        if name == "SuperAccounts" { return SuperAccounts }
        if name == "SuperAdmins" { return SuperAdmins }
        if name == "SuperBadgeInRoom" { return SuperBadgeInRoom }
        if name == "TransactionsHistory" { return TransactionsHistory }
        if name == "User" { return User }
        if name == "UserAvailableRooms" { return UserAvailableRooms }
        if name == "UserPico" { return UserPico }
        if name == "UserStorage" { return UserStorage }
        if name == "Users" { return Users }
        if name == "AccountInviteJoin" { return AccountInviteJoin }
        if name == "AddAppToChat" { return AddAppToChat }
        if name == "AddComment" { return AddComment }
        if name == "AddStickerComment" { return AddStickerComment }
        if name == "BetaDiscoverSkip" { return BetaDiscoverSkip }
        if name == "BetaNextDiscoverReset" { return BetaNextDiscoverReset }
        if name == "BetaSubmitNextDiscover" { return BetaSubmitNextDiscover }
        if name == "BuyPremiumChatPass" { return BuyPremiumChatPass }
        if name == "BuyPremiumChatSubscription" { return BuyPremiumChatSubscription }
        if name == "CancelSubscription" { return CancelSubscription }
        if name == "CommentSetReaction" { return CommentSetReaction }
        if name == "CommentUnsetReaction" { return CommentUnsetReaction }
        if name == "CommitCardSetupIntent" { return CommitCardSetupIntent }
        if name == "ConferenceAnswer" { return ConferenceAnswer }
        if name == "ConferenceCandidate" { return ConferenceCandidate }
        if name == "ConferenceJoin" { return ConferenceJoin }
        if name == "ConferenceKeepAlive" { return ConferenceKeepAlive }
        if name == "ConferenceLeave" { return ConferenceLeave }
        if name == "ConferenceOffer" { return ConferenceOffer }
        if name == "CreateApp" { return CreateApp }
        if name == "CreateCardSetupIntent" { return CreateCardSetupIntent }
        if name == "CreateDepositIntent" { return CreateDepositIntent }
        if name == "CreateOrganization" { return CreateOrganization }
        if name == "CreateUserProfileAndOrganization" { return CreateUserProfileAndOrganization }
        if name == "DebugMails" { return DebugMails }
        if name == "DeleteComment" { return DeleteComment }
        if name == "DeleteNotification" { return DeleteNotification }
        if name == "DeleteOrganization" { return DeleteOrganization }
        if name == "DeleteUser" { return DeleteUser }
        if name == "DiscoverCollectionsCreate" { return DiscoverCollectionsCreate }
        if name == "DiscoverCollectionsDelete" { return DiscoverCollectionsDelete }
        if name == "DiscoverCollectionsUpdate" { return DiscoverCollectionsUpdate }
        if name == "DiscoverEditorsChoiceCreate" { return DiscoverEditorsChoiceCreate }
        if name == "DiscoverEditorsChoiceDelete" { return DiscoverEditorsChoiceDelete }
        if name == "DiscoverEditorsChoiceUpdate" { return DiscoverEditorsChoiceUpdate }
        if name == "EditComment" { return EditComment }
        if name == "EditMessage" { return EditMessage }
        if name == "FeatureFlagAdd" { return FeatureFlagAdd }
        if name == "FeatureFlagDisable" { return FeatureFlagDisable }
        if name == "FeatureFlagEnable" { return FeatureFlagEnable }
        if name == "FeedChannelAddWriter" { return FeedChannelAddWriter }
        if name == "FeedChannelCreate" { return FeedChannelCreate }
        if name == "FeedChannelRemoveWriter" { return FeedChannelRemoveWriter }
        if name == "FeedChannelSubscribe" { return FeedChannelSubscribe }
        if name == "FeedChannelUnsubscribe" { return FeedChannelUnsubscribe }
        if name == "FeedChannelUpdate" { return FeedChannelUpdate }
        if name == "FeedCreatePost" { return FeedCreatePost }
        if name == "FeedDeletePost" { return FeedDeletePost }
        if name == "FeedEditPost" { return FeedEditPost }
        if name == "FeedReactionAdd" { return FeedReactionAdd }
        if name == "FeedReactionRemove" { return FeedReactionRemove }
        if name == "MakeCardDefault" { return MakeCardDefault }
        if name == "MarkSequenceRead" { return MarkSequenceRead }
        if name == "MatchmakingConnect" { return MatchmakingConnect }
        if name == "MatchmakingProfileFill" { return MatchmakingProfileFill }
        if name == "MatchmakingRoomSave" { return MatchmakingRoomSave }
        if name == "MediaAnswer" { return MediaAnswer }
        if name == "MediaCandidate" { return MediaCandidate }
        if name == "MediaFailed" { return MediaFailed }
        if name == "MediaNegotiationNeeded" { return MediaNegotiationNeeded }
        if name == "MediaOffer" { return MediaOffer }
        if name == "MessageSetReaction" { return MessageSetReaction }
        if name == "MessageUnsetReaction" { return MessageUnsetReaction }
        if name == "MyNotificationCenterMarkSeqRead" { return MyNotificationCenterMarkSeqRead }
        if name == "OrganizationActivateByInvite" { return OrganizationActivateByInvite }
        if name == "OrganizationAddMember" { return OrganizationAddMember }
        if name == "OrganizationAlterPublished" { return OrganizationAlterPublished }
        if name == "OrganizationChangeMemberRole" { return OrganizationChangeMemberRole }
        if name == "OrganizationCreatePublicInvite" { return OrganizationCreatePublicInvite }
        if name == "OrganizationMemberRemove" { return OrganizationMemberRemove }
        if name == "PaymentIntentCancel" { return PaymentIntentCancel }
        if name == "PaymentIntentCommit" { return PaymentIntentCommit }
        if name == "PersistEvents" { return PersistEvents }
        if name == "PinMessage" { return PinMessage }
        if name == "ProfileCreate" { return ProfileCreate }
        if name == "ProfileUpdate" { return ProfileUpdate }
        if name == "ReadNotification" { return ReadNotification }
        if name == "RefreshAppToken" { return RefreshAppToken }
        if name == "RegisterPush" { return RegisterPush }
        if name == "RegisterWebPush" { return RegisterWebPush }
        if name == "RemoveCard" { return RemoveCard }
        if name == "ReportContent" { return ReportContent }
        if name == "ReportOnline" { return ReportOnline }
        if name == "RoomAddMembers" { return RoomAddMembers }
        if name == "RoomAlterFeatured" { return RoomAlterFeatured }
        if name == "RoomAlterHidden" { return RoomAlterHidden }
        if name == "RoomChangeRole" { return RoomChangeRole }
        if name == "RoomCreate" { return RoomCreate }
        if name == "RoomDeleteMessage" { return RoomDeleteMessage }
        if name == "RoomDeleteMessages" { return RoomDeleteMessages }
        if name == "RoomDeleteUrlAugmentation" { return RoomDeleteUrlAugmentation }
        if name == "RoomJoin" { return RoomJoin }
        if name == "RoomJoinInviteLink" { return RoomJoinInviteLink }
        if name == "RoomKick" { return RoomKick }
        if name == "RoomLeave" { return RoomLeave }
        if name == "RoomRead" { return RoomRead }
        if name == "RoomRenewInviteLink" { return RoomRenewInviteLink }
        if name == "RoomSettingsUpdate" { return RoomSettingsUpdate }
        if name == "RoomUpdate" { return RoomUpdate }
        if name == "RoomsInviteUser" { return RoomsInviteUser }
        if name == "RoomsJoin" { return RoomsJoin }
        if name == "SendDonation" { return SendDonation }
        if name == "SendMessage" { return SendMessage }
        if name == "SendSticker" { return SendSticker }
        if name == "SetFeedChannelShortname" { return SetFeedChannelShortname }
        if name == "SetOrgShortname" { return SetOrgShortname }
        if name == "SetRoomShortname" { return SetRoomShortname }
        if name == "SetTyping" { return SetTyping }
        if name == "SetUserShortname" { return SetUserShortname }
        if name == "SettingsUpdate" { return SettingsUpdate }
        if name == "StickerPackAddToCollection" { return StickerPackAddToCollection }
        if name == "StickerPackRemoveFromCollection" { return StickerPackRemoveFromCollection }
        if name == "SubscribeToComments" { return SubscribeToComments }
        if name == "SuperAccountActivate" { return SuperAccountActivate }
        if name == "SuperAccountAdd" { return SuperAccountAdd }
        if name == "SuperAccountMemberAdd" { return SuperAccountMemberAdd }
        if name == "SuperAccountMemberRemove" { return SuperAccountMemberRemove }
        if name == "SuperAccountPend" { return SuperAccountPend }
        if name == "SuperAccountRename" { return SuperAccountRename }
        if name == "SuperAccountSuspend" { return SuperAccountSuspend }
        if name == "SuperAdminAdd" { return SuperAdminAdd }
        if name == "SuperAdminRemove" { return SuperAdminRemove }
        if name == "SuperBadgeCreateToRoom" { return SuperBadgeCreateToRoom }
        if name == "SuperBadgeUnsetToRoom" { return SuperBadgeUnsetToRoom }
        if name == "UnSubscribeFromComments" { return UnSubscribeFromComments }
        if name == "UnpinMessage" { return UnpinMessage }
        if name == "UnsetTyping" { return UnsetTyping }
        if name == "UpdateApp" { return UpdateApp }
        if name == "UpdateOrganization" { return UpdateOrganization }
        if name == "UpdateWelcomeMessage" { return UpdateWelcomeMessage }
        if name == "UserStorageSet" { return UserStorageSet }
        if name == "ChatOnlinesCountWatch" { return ChatOnlinesCountWatch }
        if name == "ChatWatch" { return ChatWatch }
        if name == "CommentWatch" { return CommentWatch }
        if name == "ConferenceMediaWatch" { return ConferenceMediaWatch }
        if name == "ConferenceWatch" { return ConferenceWatch }
        if name == "DebugEventsWatch" { return DebugEventsWatch }
        if name == "DialogsWatch" { return DialogsWatch }
        if name == "FeedUpdates" { return FeedUpdates }
        if name == "MyNotificationsCenter" { return MyNotificationsCenter }
        if name == "OnlineWatch" { return OnlineWatch }
        if name == "SettingsWatch" { return SettingsWatch }
        if name == "TypingsWatch" { return TypingsWatch }
        if name == "WalletUpdates" { return WalletUpdates }
        fatalError("Unknown operation: " + name)
    }
}