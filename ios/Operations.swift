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

private let ChannelSimpleSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("title", "title", notNull(scalar("String"))),
            field("shortname", "shortname", notNull(scalar("String"))),
            field("type", "type", notNull(scalar("String"))),
            field("owner", "owner", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("firstName", "firstName", notNull(scalar("String"))),
                    field("lastName", "lastName", scalar("String"))
                ))
        )

private let ChatNewMessageFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("date", "date", notNull(scalar("Date"))),
            field("seq", "seq", scalar("Int")),
            field("sender", "sender", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                ))),
            field("message", "message", scalar("String")),
            field("fallback", "fallback", notNull(scalar("String")))
        )

private let MessageSenderSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("name", "name", notNull(scalar("String"))),
            field("photo", "photo", scalar("String")),
            field("isBot", "isBot", notNull(scalar("Boolean"))),
            field("shortname", "shortname", scalar("String")),
            field("inContacts", "inContacts", notNull(scalar("Boolean"))),
            field("primaryOrganization", "primaryOrganization", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("name", "name", notNull(scalar("String"))),
                    field("shortname", "shortname", scalar("String"))
                ))
        )

private let UserBadgeSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("name", "name", notNull(scalar("String"))),
            field("verified", "verified", notNull(scalar("Boolean")))
        )

private let MessageSpanSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("offset", "offset", notNull(scalar("Int"))),
            field("length", "length", notNull(scalar("Int"))),
            inline("MessageSpanUserMention", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("user", "user", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("name", "name", notNull(scalar("String")))
                    )))
            )),
            inline("MessageSpanMultiUserMention", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("offset", "offset", notNull(scalar("Int"))),
                field("length", "length", notNull(scalar("Int")))
            )),
            inline("MessageSpanOrganizationMention", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("organization", "organization", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("name", "name", notNull(scalar("String")))
                    )))
            )),
            inline("MessageSpanRoomMention", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("room", "room", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        inline("PrivateRoom", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("user", "user", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    field("id", "id", notNull(scalar("ID"))),
                                    field("name", "name", notNull(scalar("String")))
                                )))
                        )),
                        inline("SharedRoom", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("title", "title", notNull(scalar("String"))),
                            field("isPremium", "isPremium", notNull(scalar("Boolean")))
                        ))
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

private let MessageAttachmentsSelector = obj(
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
            )),
            inline("MessageAttachmentPurchase", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("purchase", "purchase", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("state", "state", notNull(scalar("String"))),
                        field("amount", "amount", notNull(scalar("Int")))
                    ))),
                field("fallback", "fallback", notNull(scalar("String")))
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

private let QuotedMessageSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("date", "date", notNull(scalar("Date"))),
            field("message", "message", scalar("String")),
            field("sender", "sender", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("User", MessageSenderSelector)
                ))),
            field("senderBadge", "senderBadge", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                )),
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
                    fragment("MessageSpan", MessageSpanSelector)
                ))))),
            inline("GeneralMessage", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("edited", "edited", notNull(scalar("Boolean"))),
                field("commentsCount", "commentsCount", notNull(scalar("Int"))),
                field("attachments", "attachments", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ModernMessageAttachment", MessageAttachmentsSelector)
                    )))))
            )),
            inline("StickerMessage", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("sticker", "sticker", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("Sticker", StickerFragmentSelector)
                    )))
            ))
        )

private let MessageCounterReactionsSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("reaction", "reaction", notNull(scalar("String"))),
            field("count", "count", notNull(scalar("Int"))),
            field("setByMe", "setByMe", notNull(scalar("Boolean")))
        )

private let ServiceMessageMetadataSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("InviteServiceMetadata", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("users", "users", list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    )))),
                field("invitedBy", "invitedBy", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    )))
            )),
            inline("KickServiceMetadata", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("user", "user", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    ))),
                field("kickedBy", "kickedBy", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
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
        )

private let FullMessageSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("date", "date", notNull(scalar("Date"))),
            field("sender", "sender", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("User", MessageSenderSelector)
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
                    fragment("MessageSpan", MessageSpanSelector)
                ))))),
            inline("GeneralMessage", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("edited", "edited", notNull(scalar("Boolean"))),
                field("commentsCount", "commentsCount", notNull(scalar("Int"))),
                field("attachments", "attachments", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ModernMessageAttachment", MessageAttachmentsSelector)
                    ))))),
                field("quotedMessages", "quotedMessages", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", QuotedMessageSelector)
                    ))))),
                field("reactionCounters", "reactionCounters", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ReactionCounter", MessageCounterReactionsSelector)
                    ))))),
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
                field("overrideName", "overrideName", scalar("String"))
            )),
            inline("StickerMessage", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("commentsCount", "commentsCount", notNull(scalar("Int"))),
                field("quotedMessages", "quotedMessages", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", QuotedMessageSelector)
                    ))))),
                field("sticker", "sticker", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("Sticker", StickerFragmentSelector)
                    ))),
                field("reactionCounters", "reactionCounters", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ReactionCounter", MessageCounterReactionsSelector)
                    ))))),
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
                field("overrideName", "overrideName", scalar("String"))
            )),
            inline("ServiceMessage", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("id", "id", notNull(scalar("ID"))),
                field("serviceMetadata", "serviceMetadata", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ServiceMetadata", ServiceMessageMetadataSelector)
                    ))
            ))
        )

private let OrganizationShortSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("name", "name", notNull(scalar("String"))),
            field("photo", "photo", scalar("String")),
            field("shortname", "shortname", scalar("String")),
            field("about", "about", scalar("String")),
            field("alphaIsCommunity", "isCommunity", notNull(scalar("Boolean"))),
            field("alphaIsPrivate", "private", notNull(scalar("Boolean"))),
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
            field("isBot", "isBot", notNull(scalar("Boolean"))),
            field("shortname", "shortname", scalar("String")),
            field("inContacts", "inContacts", notNull(scalar("Boolean"))),
            field("primaryOrganization", "primaryOrganization", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                ))
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
                field("canUnpinMessage", "canUnpinMessage", notNull(scalar("Boolean"))),
                field("pinnedMessage", "pinnedMessage", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("ModernMessage", FullMessageSelector)
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
                        field("firstName", "firstName", notNull(scalar("String"))),
                        field("isYou", "isYou", notNull(scalar("Boolean")))
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
                    fragment("ModernMessage", FullMessageSelector)
                ))),
            field("parentComment", "parentComment", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("betaComment", "comment", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("message", "message", scalar("String"))
                        )))
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
                    field("mediaState", "mediaState", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("audioPaused", "audioPaused", notNull(scalar("Boolean"))),
                            field("videoPaused", "videoPaused", notNull(scalar("Boolean"))),
                            field("screencastEnabled", "screencastEnabled", notNull(scalar("Boolean")))
                        )))
                ))))),
            field("iceServers", "iceServers", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("urls", "urls", notNull(list(notNull(scalar("String"))))),
                    field("username", "username", scalar("String")),
                    field("credential", "credential", scalar("String"))
                ))))),
            field("room", "room", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("title", "title", notNull(scalar("String"))),
                        field("isChannel", "isChannel", notNull(scalar("Boolean"))),
                        field("membersCount", "membersCount", notNull(scalar("Int"))),
                        field("photo", "photo", notNull(scalar("String"))),
                        field("owner", "owner", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("name", "name", notNull(scalar("String")))
                            ))
                    )),
                    inline("PrivateRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("user", "user", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("name", "name", notNull(scalar("String"))),
                                field("photo", "photo", scalar("String"))
                            )))
                    ))
                ))
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
            field("hasActiveCall", "hasActiveCall", notNull(scalar("Boolean"))),
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
            )),
            inline("DialogCallStateChanged", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("cid", "cid", notNull(scalar("ID"))),
                field("hasActiveCall", "hasActiveCall", notNull(scalar("Boolean")))
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
            field("shortname", "shortname", scalar("String")),
            field("chatsCount", "chatsCount", notNull(scalar("Int"))),
            field("chats", "chats", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("SharedRoom", DiscoverSharedRoomSelector)
                ))))),
            field("description", "description", scalar("String")),
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
            field("shortname", "shortname", scalar("String")),
            field("chatsCount", "chatsCount", notNull(scalar("Int"))),
            field("description", "description", scalar("String")),
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

private let MediaStreamFullSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("seq", "seq", notNull(scalar("Int"))),
            field("state", "state", notNull(scalar("String"))),
            field("sdp", "sdp", scalar("String")),
            field("ice", "ice", notNull(list(notNull(scalar("String"))))),
            field("iceTransportPolicy", "iceTransportPolicy", notNull(scalar("String"))),
            field("receivers", "receivers", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("peerId", "peerId", scalar("ID")),
                    field("kind", "kind", notNull(scalar("String"))),
                    field("videoSource", "videoSource", scalar("String")),
                    field("mid", "mid", scalar("String"))
                ))))),
            field("senders", "senders", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("kind", "kind", notNull(scalar("String"))),
                    field("videoSource", "videoSource", scalar("String")),
                    field("codecParams", "codecParams", scalar("String")),
                    field("mid", "mid", scalar("String"))
                )))))
        )

private let MessageUsersReactionsSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("user", "user", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("name", "name", notNull(scalar("String"))),
                    field("photo", "photo", scalar("String")),
                    field("primaryOrganization", "primaryOrganization", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("name", "name", notNull(scalar("String")))
                        ))
                ))),
            field("reaction", "reaction", notNull(scalar("String")))
        )

private let RoomSharedNanoSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("kind", "kind", notNull(scalar("String"))),
            field("isChannel", "isChannel", notNull(scalar("Boolean"))),
            field("isPremium", "isPremium", notNull(scalar("Boolean"))),
            field("title", "title", notNull(scalar("String"))),
            field("photo", "photo", notNull(scalar("String"))),
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
                                        inline("CommentPeerRootPost", obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("post", "post", notNull(obj(
                                                    field("__typename", "__typename", notNull(scalar("String"))),
                                                    field("id", "id", notNull(scalar("ID")))
                                                )))
                                        ))
                                    ))),
                                field("subscription", "subscription", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("type", "type", scalar("String"))
                                    ))
                            )))
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
                                            inline("CommentPeerRootPost", obj(
                                                field("__typename", "__typename", notNull(scalar("String"))),
                                                field("post", "post", notNull(obj(
                                                        field("__typename", "__typename", notNull(scalar("String"))),
                                                        field("id", "id", notNull(scalar("ID")))
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

private let OrganizationFragmentSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("isMine", "isMine", notNull(scalar("Boolean"))),
            field("superAccountId", "superAccountId", notNull(scalar("ID"))),
            field("name", "name", notNull(scalar("String"))),
            field("photo", "photo", scalar("String")),
            field("shortname", "shortname", scalar("String")),
            field("website", "website", scalar("String")),
            field("websiteTitle", "websiteTitle", scalar("String")),
            field("about", "about", scalar("String")),
            field("twitter", "twitter", scalar("String")),
            field("facebook", "facebook", scalar("String")),
            field("linkedin", "linkedin", scalar("String")),
            field("instagram", "instagram", scalar("String")),
            field("membersCount", "membersCount", notNull(scalar("Int"))),
            field("alphaIsPrivate", "private", notNull(scalar("Boolean"))),
            field("betaIsOwner", "isOwner", notNull(scalar("Boolean"))),
            field("betaIsAdmin", "isAdmin", notNull(scalar("Boolean"))),
            field("alphaFeatured", "featured", notNull(scalar("Boolean"))),
            field("alphaIsCommunity", "isCommunity", notNull(scalar("Boolean"))),
            field("betaPublicRoomsCount", "roomsCount", notNull(scalar("Int")))
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
            field("alphaIsCommunity", "isCommunity", notNull(scalar("Boolean"))),
            field("alphaIsPrivate", "private", notNull(scalar("Boolean")))
        )

private let OrganizationProfileFragmentSelector = obj(
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
            field("alphaIsCommunity", "isCommunity", notNull(scalar("Boolean"))),
            field("alphaIsPrivate", "private", notNull(scalar("Boolean"))),
            field("alphaFeatured", "featured", notNull(scalar("Boolean"))),
            field("alphaPublished", "published", notNull(scalar("Boolean"))),
            field("alphaEditorial", "editorial", notNull(scalar("Boolean")))
        )

private let ParagraphSimpleSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            inline("TextParagraph", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("text", "text", notNull(scalar("String"))),
                field("spans", "spans", notNull(list(notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        inline("PostSpanBold", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("offset", "offset", notNull(scalar("Int"))),
                            field("length", "length", notNull(scalar("Int")))
                        )),
                        inline("PostSpanItalic", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("offset", "offset", notNull(scalar("Int"))),
                            field("length", "length", notNull(scalar("Int")))
                        )),
                        inline("PostSpanIrony", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("offset", "offset", notNull(scalar("Int"))),
                            field("length", "length", notNull(scalar("Int")))
                        )),
                        inline("PostSpanLink", obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("offset", "offset", notNull(scalar("Int"))),
                            field("length", "length", notNull(scalar("Int"))),
                            field("url", "url", notNull(scalar("String")))
                        ))
                    )))))
            )),
            inline("ImageParagraph", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("url", "url", notNull(scalar("String"))),
                field("image", "image", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("uuid", "uuid", notNull(scalar("String")))
                    ))),
                field("fileMetadata", "fileMetadata", notNull(obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("isImage", "isImage", notNull(scalar("Boolean"))),
                        field("imageWidth", "imageWidth", scalar("Int")),
                        field("imageHeight", "imageHeight", scalar("Int")),
                        field("imageFormat", "imageFormat", scalar("String"))
                    )))
            )),
            inline("H1Paragraph", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("text", "text", notNull(scalar("String")))
            )),
            inline("H2Paragraph", obj(
                field("__typename", "__typename", notNull(scalar("String"))),
                field("text", "text", notNull(scalar("String")))
            ))
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

private let PostDraftSimpleSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("title", "title", notNull(scalar("String"))),
            field("content", "content", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Paragraph", ParagraphSimpleSelector)
                ))))),
            field("publishedCopy", "publishedCopy", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )),
            field("channel", "channel", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String"))),
                    field("shortname", "shortname", notNull(scalar("String")))
                )),
            field("createdAt", "createdAt", notNull(scalar("Date"))),
            field("updatedAt", "updatedAt", scalar("Date")),
            field("deletedAt", "deletedAt", scalar("Date"))
        )

private let PostSimpleSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("title", "title", notNull(scalar("String"))),
            field("content", "content", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Paragraph", ParagraphSimpleSelector)
                ))))),
            field("channel", "channel", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String"))),
                    field("shortname", "shortname", notNull(scalar("String")))
                )),
            field("author", "author", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("name", "name", notNull(scalar("String")))
                )),
            field("draft", "draft", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )),
            field("canEdit", "canEdit", notNull(scalar("Boolean"))),
            field("createdAt", "createdAt", notNull(scalar("Date"))),
            field("updatedAt", "updatedAt", scalar("Date")),
            field("deletedAt", "deletedAt", scalar("Date"))
        )

private let SettingsFullSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("primaryEmail", "primaryEmail", notNull(scalar("String"))),
            field("emailFrequency", "emailFrequency", notNull(scalar("String"))),
            field("excludeMutedChats", "excludeMutedChats", notNull(scalar("Boolean"))),
            field("countUnreadChats", "countUnreadChats", notNull(scalar("Boolean"))),
            field("whoCanSeeEmail", "whoCanSeeEmail", notNull(scalar("String"))),
            field("whoCanSeePhone", "whoCanSeePhone", notNull(scalar("String"))),
            field("desktop", "desktop", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("PlatformNotificationSettings", PlatformNotificationSettingsFullSelector)
                ))),
            field("mobile", "mobile", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("PlatformNotificationSettings", PlatformNotificationSettingsFullSelector)
                )))
        )

private let SharedRoomPreviewSelector = obj(
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
            field("title", "title", notNull(scalar("String"))),
            field("photo", "photo", notNull(scalar("String"))),
            field("membersCount", "membersCount", notNull(scalar("Int"))),
            field("description", "description", scalar("String")),
            field("previewMembers", "previewMembers", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("name", "name", notNull(scalar("String"))),
                    field("photo", "photo", scalar("String"))
                )))))
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

private let UserForMentionSelector = obj(
            field("__typename", "__typename", notNull(scalar("String"))),
            field("id", "id", notNull(scalar("ID"))),
            field("name", "name", notNull(scalar("String"))),
            field("photo", "photo", scalar("String")),
            field("shortname", "shortname", scalar("String")),
            field("isBot", "isBot", notNull(scalar("Boolean"))),
            field("inContacts", "inContacts", notNull(scalar("Boolean"))),
            field("primaryOrganization", "primaryOrganization", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("name", "name", notNull(scalar("String")))
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
            field("online", "online", notNull(scalar("Boolean"))),
            field("lastSeen", "lastSeen", scalar("String")),
            field("linkedin", "linkedin", scalar("String")),
            field("instagram", "instagram", scalar("String")),
            field("twitter", "twitter", scalar("String")),
            field("facebook", "facebook", scalar("String")),
            field("shortname", "shortname", scalar("String")),
            field("audienceSize", "audienceSize", notNull(scalar("Int"))),
            field("inContacts", "inContacts", notNull(scalar("Boolean"))),
            field("primaryOrganization", "primaryOrganization", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                ))
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
                                            )),
                                            inline("WalletProductDonationReaction", obj(
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
                                    field("user", "user", notNull(obj(
                                            field("__typename", "__typename", notNull(scalar("String"))),
                                            field("id", "id", notNull(scalar("ID"))),
                                            field("name", "name", notNull(scalar("String"))),
                                            field("photo", "photo", scalar("String"))
                                        ))),
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
                                            )),
                                            inline("WalletProductDonationReaction", obj(
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
                                        )),
                                        inline("WalletProductDonationReaction", obj(
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
                                        )),
                                        inline("WalletProductDonationReaction", obj(
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
                    field("isLoggedIn", "isLoggedIn", notNull(scalar("Boolean"))),
                    field("isActivated", "isActivated", notNull(scalar("Boolean"))),
                    field("isProfileCreated", "isProfileCreated", notNull(scalar("Boolean"))),
                    field("isAccountActivated", "isAccountActivated", notNull(scalar("Boolean"))),
                    field("isAccountExists", "isAccountExists", notNull(scalar("Boolean"))),
                    field("isAccountPicked", "isAccountPicked", notNull(scalar("Boolean"))),
                    field("isCompleted", "isCompleted", notNull(scalar("Boolean"))),
                    field("isBlocked", "isBlocked", notNull(scalar("Boolean")))
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
private let AuthPointsSelector = obj(
            field("authPoints", "authPoints", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("email", "email", scalar("String")),
                    field("phone", "phone", scalar("String"))
                )))
        )
private let AuthResolveShortNameSelector = obj(
            field("alphaResolveShortName", "item", arguments(fieldValue("shortname", refValue("shortname"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("User", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("name", "name", notNull(scalar("String"))),
                        field("firstName", "firstName", notNull(scalar("String"))),
                        field("lastName", "lastName", scalar("String")),
                        field("photo", "photo", scalar("String")),
                        field("online", "online", notNull(scalar("Boolean")))
                    )),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        fragment("SharedRoom", SharedRoomPreviewSelector)
                    )),
                    inline("DiscoverChatsCollection", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    ))
                ))
        )
private let ChannelSelector = obj(
            field("channel", "channel", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Channel", ChannelSimpleSelector)
                ))
        )
private let ChannelsSelector = obj(
            field("channels", "channels", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Channel", ChannelSimpleSelector)
                )))))
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
private let ChatNewGetMessageSelector = obj(
            field("message", "message", arguments(fieldValue("messageId", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("ModernMessage", ChatNewMessageFragmentSelector)
                ))
        )
private let ChatNewLoadAfterSelector = obj(
            field("gammaMessages", "batch", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("first", refValue("limit")), fieldValue("after", refValue("after"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("messages", "messages", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("ModernMessage", ChatNewMessageFragmentSelector)
                        ))))),
                    field("haveMoreForward", "haveMoreForward", scalar("Boolean"))
                ))
        )
private let ChatNewLoadBeforeSelector = obj(
            field("gammaMessages", "batch", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("first", refValue("limit")), fieldValue("before", refValue("before"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("messages", "messages", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("ModernMessage", ChatNewMessageFragmentSelector)
                        ))))),
                    field("haveMoreBackward", "haveMoreBackward", scalar("Boolean"))
                ))
        )
private let ChatNewReadLastReadSelector = obj(
            field("lastReadedMessage", "message", arguments(fieldValue("chatId", refValue("chatId"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                ))
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
                            fragment("MediaStream", MediaStreamFullSelector)
                        ))))),
                    field("iceServers", "iceServers", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("urls", "urls", notNull(list(notNull(scalar("String"))))),
                            field("username", "username", scalar("String")),
                            field("credential", "credential", scalar("String"))
                        )))))
                )))
        )
private let DebugGqlTraceSelector = obj(
            field("debugGqlTrace", "debugGqlTrace", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("name", "name", notNull(scalar("String"))),
                    field("duration", "duration", notNull(scalar("Int"))),
                    field("traceData", "traceData", notNull(scalar("String"))),
                    field("date", "date", notNull(scalar("Date")))
                )))
        )
private let DebugGqlTracesSelector = obj(
            field("debugGqlTraces", "debugGqlTraces", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("cursor", "cursor", scalar("ID")),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("name", "name", notNull(scalar("String"))),
                            field("date", "date", notNull(scalar("Date"))),
                            field("duration", "duration", notNull(scalar("Int")))
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
                    field("shortname", "shortname", scalar("String")),
                    field("description", "description", scalar("String")),
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
private let DiscoverNoAuthSelector = obj(
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
            field("discoverCollections", "discoverCollections", arguments(fieldValue("first", intValue(20))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("DiscoverChatsCollection", DiscoverChatsCollectionShortSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )),
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
private let IpLocationSelector = obj(
            field("ipLocation", "ipLocation", obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("countryCode", "countryCode", scalar("String"))
                ))
        )
private let MessageSelector = obj(
            field("message", "message", arguments(fieldValue("messageId", refValue("messageId"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("ModernMessage", FullMessageSelector)
                ))
        )
private let MessageFullReactionsSelector = obj(
            field("message", "message", arguments(fieldValue("messageId", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    inline("GeneralMessage", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("reactions", "reactions", notNull(list(notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("ModernMessageReaction", MessageUsersReactionsSelector)
                            )))))
                    )),
                    inline("StickerMessage", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("reactions", "reactions", notNull(list(notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("ModernMessageReaction", MessageUsersReactionsSelector)
                            )))))
                    ))
                ))
        )
private let MessageMultiSpanSelector = obj(
            field("message", "message", arguments(fieldValue("messageId", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("spans", "spans", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            inline("MessageSpanMultiUserMention", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("users", "users", notNull(list(notNull(obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        fragment("User", UserForMentionSelector)
                                    )))))
                            ))
                        )))))
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
private let MyCommunitiesSelector = obj(
            field("myCommunities", "myCommunities", notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("betaIsOwner", "isOwner", notNull(scalar("Boolean"))),
                    field("betaIsAdmin", "isAdmin", notNull(scalar("Boolean"))),
                    fragment("Organization", OrganizationShortSelector)
                )))))
        )
private let MyContactsSelector = obj(
            field("myContacts", "myContacts", arguments(fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("id", "id", notNull(scalar("ID"))),
                            field("user", "user", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("User", UserShortSelector)
                                )))
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
        )
private let MyContactsSearchSelector = obj(
            field("myContactsSearch", "myContactsSearch", arguments(fieldValue("query", refValue("query")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after")), fieldValue("page", refValue("page"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
                                    field("__typename", "__typename", notNull(scalar("String"))),
                                    fragment("User", UserShortSelector)
                                )))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean"))),
                            field("currentPage", "currentPage", notNull(scalar("Int")))
                        )))
                )))
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
private let MyPostDraftsSelector = obj(
            field("postMyDrafts", "postMyDrafts", arguments(fieldValue("first", intValue(20)), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("PostDraft", PostDraftSimpleSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
                )))
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
                    fragment("Organization", OrganizationFragmentSelector)
                )))
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
                    fragment("Organization", OrganizationFragmentSelector)
                )))
        )
private let OrganizationPicoSelector = obj(
            field("organization", "organization", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                )))
        )
private let OrganizationProfileSelector = obj(
            field("organizationProfile", "organizationProfile", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("OrganizationProfile", OrganizationProfileFragmentSelector)
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
private let PermissionsSelector = obj(
            field("myPermissions", "myPermissions", notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("roles", "roles", notNull(list(notNull(scalar("String")))))
                )))
        )
private let PicSharedMediaSelector = obj(
            field("chatSharedMedia", "chatSharedMedia", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("mediaTypes", listValue(stringValue("IMAGE"))), fieldValue("first", refValue("first")), fieldValue("after", refValue("after")), fieldValue("before", refValue("before")), fieldValue("around", refValue("around"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
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
private let PostSelector = obj(
            field("post", "post", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Post", PostSimpleSelector)
                ))
        )
private let PostDraftSelector = obj(
            field("postDraft", "postDraft", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("PostDraft", PostDraftSimpleSelector)
                ))
        )
private let PostsSelector = obj(
            field("posts", "posts", arguments(fieldValue("hubs", refValue("channels")), fieldValue("first", intValue(20)), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("items", "items", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("Post", PostSimpleSelector)
                        ))))),
                    field("cursor", "cursor", scalar("String"))
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
                    )),
                    inline("DiscoverChatsCollection", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID")))
                    )),
                    inline("Channel", obj(
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
                        fragment("SharedRoom", SharedRoomPreviewSelector)
                    ))
                ))
        )
private let RoomAdminMembersSelector = obj(
            field("roomAdmins", "roomAdmins", arguments(fieldValue("roomId", refValue("roomId"))), notNull(list(notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("user", "user", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))
                )))))
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
                                field("firstName", "firstName", notNull(scalar("String"))),
                                field("photo", "photo", scalar("String")),
                                field("shortname", "shortname", scalar("String")),
                                field("inContacts", "inContacts", notNull(scalar("Boolean"))),
                                field("primaryOrganization", "primaryOrganization", obj(
                                        field("__typename", "__typename", notNull(scalar("String"))),
                                        field("id", "id", notNull(scalar("ID"))),
                                        field("name", "name", notNull(scalar("String")))
                                    )),
                                field("isBot", "isBot", notNull(scalar("Boolean"))),
                                field("isYou", "isYou", notNull(scalar("Boolean"))),
                                field("online", "online", notNull(scalar("Boolean"))),
                                field("lastSeen", "lastSeen", scalar("String"))
                            ))),
                        field("pinnedMessage", "pinnedMessage", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("ModernMessage", FullMessageSelector)
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
                        field("canSendMessage", "canSendMessage", notNull(scalar("Boolean"))),
                        field("photo", "photo", notNull(scalar("String"))),
                        field("membersCount", "membersCount", notNull(scalar("Int"))),
                        field("shortname", "shortname", scalar("String")),
                        field("featuredMembersCount", "featuredMembersCount", notNull(scalar("Int"))),
                        field("socialImage", "socialImage", scalar("String")),
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
                        field("organization", "organization", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("Organization", OrganizationMediumSelector)
                            )),
                        field("canUnpinMessage", "canUnpinMessage", notNull(scalar("Boolean"))),
                        field("pinnedMessage", "pinnedMessage", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("ModernMessage", FullMessageSelector)
                            )),
                        field("myBadge", "myBadge", obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                fragment("UserBadge", UserBadgeSelector)
                            )),
                        field("settings", "settings", notNull(obj(
                                field("__typename", "__typename", notNull(scalar("String"))),
                                field("id", "id", notNull(scalar("ID"))),
                                field("mute", "mute", scalar("Boolean"))
                            ))),
                        field("description", "description", scalar("String")),
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
                                field("id", "id", notNull(scalar("ID"))),
                                field("firstName", "firstName", notNull(scalar("String"))),
                                field("isYou", "isYou", notNull(scalar("Boolean")))
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
private let RoomMembersSearchSelector = obj(
            field("chatMembersSearch", "chatMembersSearch", arguments(fieldValue("cid", refValue("cid")), fieldValue("query", refValue("query")), fieldValue("first", refValue("first")), fieldValue("after", refValue("after"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("edges", "edges", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("node", "node", notNull(obj(
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
                                ))),
                            field("cursor", "cursor", notNull(scalar("String")))
                        ))))),
                    field("pageInfo", "pageInfo", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("hasNextPage", "hasNextPage", notNull(scalar("Boolean")))
                        )))
                )))
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
private let RoomMetaPreviewSelector = obj(
            field("alphaResolveShortName", "alphaResolveShortName", arguments(fieldValue("shortname", refValue("shortname"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    inline("SharedRoom", obj(
                        field("__typename", "__typename", notNull(scalar("String"))),
                        field("id", "id", notNull(scalar("ID"))),
                        field("title", "title", notNull(scalar("String"))),
                        field("description", "description", scalar("String")),
                        field("photo", "photo", notNull(scalar("String"))),
                        field("socialImage", "socialImage", scalar("String"))
                    ))
                )),
            field("roomSocialImage", "roomSocialImage", arguments(fieldValue("roomId", refValue("id"))), scalar("String"))
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
private let RoomTinySelector = obj(
            field("room", "room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
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
private let UserNanoSelector = obj(
            field("user", "user", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("User", UserForMentionSelector)
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
private let AddToContactsSelector = obj(
            field("addToContacts", "addToContacts", arguments(fieldValue("userId", refValue("userId"))), notNull(scalar("Boolean")))
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
private let CommentDeleteUrlAugmentationSelector = obj(
            field("deleteCommentAugmentation", "deleteCommentAugmentation", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
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
private let ConferenceJoinSelector = obj(
            field("conferenceJoin", "conferenceJoin", arguments(fieldValue("id", refValue("id")), fieldValue("input", refValue("input"))), notNull(obj(
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
private let DiscoverCollectionSetShortnameSelector = obj(
            field("alphaSetCollectionShortName", "alphaSetCollectionShortName", arguments(fieldValue("id", refValue("id")), fieldValue("shortname", refValue("shortname"))), scalar("String"))
        )
private let DiscoverCollectionsCreateSelector = obj(
            field("discoverCollectionsCreate", "discoverCollectionsCreate", arguments(fieldValue("collection", objectValue(fieldValue("title", refValue("title")),fieldValue("description", refValue("description")),fieldValue("image", refValue("image")),fieldValue("chatIds", refValue("chatIds"))))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("title", "title", notNull(scalar("String")))
                )))
        )
private let DiscoverCollectionsDeleteSelector = obj(
            field("discoverCollectionsDelete", "discoverCollectionsDelete", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
private let DiscoverCollectionsUpdateSelector = obj(
            field("discoverCollectionsUpdate", "discoverCollectionsUpdate", arguments(fieldValue("id", refValue("id")), fieldValue("input", objectValue(fieldValue("title", refValue("title")),fieldValue("description", refValue("description")),fieldValue("image", refValue("image")),fieldValue("chatIds", refValue("chatIds"))))), notNull(obj(
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
private let GlobalEventBusPublishSelector = obj(
            field("globalEventBusPublish", "globalEventBusPublish", arguments(fieldValue("topic", refValue("topic")), fieldValue("message", refValue("message"))), notNull(scalar("Boolean")))
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
private let MediaAnswerSelector = obj(
            field("mediaStreamAnswer", "mediaStreamAnswer", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId")), fieldValue("answer", refValue("answer")), fieldValue("seq", refValue("seq"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("streams", "streams", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("MediaStream", MediaStreamFullSelector)
                        )))))
                )))
        )
private let MediaCandidateSelector = obj(
            field("mediaStreamCandidate", "mediaStreamCandidate", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId")), fieldValue("candidate", refValue("candidate"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("streams", "streams", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("MediaStream", MediaStreamFullSelector)
                        )))))
                )))
        )
private let MediaFailedSelector = obj(
            field("mediaStreamFailed", "mediaStreamFailed", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("streams", "streams", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("MediaStream", MediaStreamFullSelector)
                        )))))
                )))
        )
private let MediaOfferSelector = obj(
            field("mediaStreamOffer", "mediaStreamOffer", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId")), fieldValue("offer", refValue("offer")), fieldValue("seq", refValue("seq")), fieldValue("hints", refValue("hints"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID"))),
                    field("streams", "streams", notNull(list(notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            fragment("MediaStream", MediaStreamFullSelector)
                        )))))
                )))
        )
private let MessageSetDonationReactionSelector = obj(
            field("messageDonationReactionAdd", "messageDonationReactionAdd", arguments(fieldValue("messageId", refValue("messageId"))), notNull(scalar("Boolean")))
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
private let PairEmailSelector = obj(
            field("pairEmail", "pairEmail", arguments(fieldValue("sessionId", refValue("sessionId")), fieldValue("confirmationCode", refValue("confirmationCode"))), notNull(scalar("Boolean")))
        )
private let PairPhoneSelector = obj(
            field("pairPhone", "pairPhone", arguments(fieldValue("sessionId", refValue("sessionId")), fieldValue("confirmationCode", refValue("confirmationCode"))), notNull(scalar("Boolean")))
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
private let PhonebookAddSelector = obj(
            field("phonebookAdd", "phonebookAdd", arguments(fieldValue("records", refValue("records"))), notNull(scalar("Boolean")))
        )
private let PinMessageSelector = obj(
            field("gammaPinMessage", "pinMessage", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("messageId", refValue("messageId"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))
        )
private let PostCreateDraftSelector = obj(
            field("postDraftCreate", "postDraftCreate", arguments(fieldValue("input", objectValue())), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("PostDraft", PostDraftSimpleSelector)
                )))
        )
private let PostDraftUpdateSelector = obj(
            field("postDraftUpdate", "postDraftUpdate", arguments(fieldValue("id", refValue("id")), fieldValue("input", objectValue(fieldValue("hub", refValue("channel")),fieldValue("title", refValue("title")),fieldValue("content", refValue("content"))))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("PostDraft", PostDraftSimpleSelector)
                )))
        )
private let PostPublishSelector = obj(
            field("postDraftPublish", "postDraftPublish", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Post", PostSimpleSelector)
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
private let RemoveFromContactsSelector = obj(
            field("removeFromContacts", "removeFromContacts", arguments(fieldValue("userId", refValue("userId"))), notNull(scalar("Boolean")))
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
private let RoomChangeRoleSelector = obj(
            field("betaRoomChangeRole", "betaRoomChangeRole", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId")), fieldValue("newRole", refValue("newRole"))), notNull(obj(
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
private let RoomCreateSelector = obj(
            field("betaRoomCreate", "room", arguments(fieldValue("kind", refValue("kind")), fieldValue("members", refValue("members")), fieldValue("message", refValue("message")), fieldValue("title", refValue("title")), fieldValue("description", refValue("description")), fieldValue("photoRef", refValue("photoRef")), fieldValue("organizationId", refValue("organizationId")), fieldValue("channel", refValue("channel")), fieldValue("price", refValue("price")), fieldValue("interval", refValue("interval"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("id", "id", notNull(scalar("ID")))
                )))
        )
private let RoomDeleteSelector = obj(
            field("deleteChat", "deleteChat", arguments(fieldValue("chatId", refValue("chatId"))), notNull(scalar("Boolean")))
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
            field("sendDonation", "sendDonation", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("userId", refValue("userId")), fieldValue("amount", refValue("amount")), fieldValue("message", refValue("message")), fieldValue("repeatKey", refValue("repeatKey"))), notNull(scalar("Boolean")))
        )
private let SendEmailPairCodeSelector = obj(
            field("sendEmailPairCode", "sendEmailPairCode", arguments(fieldValue("email", refValue("email"))), notNull(scalar("String")))
        )
private let SendMessageSelector = obj(
            field("sendMessage", "sentMessage", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("message", refValue("message")), fieldValue("replyMessages", refValue("replyMessages")), fieldValue("mentions", refValue("mentions")), fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("spans", refValue("spans")), fieldValue("repeatKey", refValue("repeatKey"))), notNull(scalar("Boolean")))
        )
private let SendPhonePairCodeSelector = obj(
            field("sendPhonePairCode", "sendPhonePairCode", arguments(fieldValue("phone", refValue("phone"))), notNull(scalar("String")))
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
                    field("id", "id", notNull(scalar("ID")))
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
private let conferenceAddScreenShareSelector = obj(
            field("conferenceAddScreenShare", "conferenceAddScreenShare", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
private let conferenceAlterMediaStateSelector = obj(
            field("conferenceAlterMediaState", "conferenceAlterMediaState", arguments(fieldValue("id", refValue("id")), fieldValue("state", refValue("state"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
private let conferenceRemoveScreenShareSelector = obj(
            field("conferenceRemoveScreenShare", "conferenceRemoveScreenShare", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
private let conferenceRequestLocalMediaChangeSelector = obj(
            field("conferenceRequestLocalMediaChange", "conferenceRequestLocalMediaChange", arguments(fieldValue("id", refValue("id")), fieldValue("media", refValue("media"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
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
                            fragment("MediaStream", MediaStreamFullSelector)
                        ))))),
                    field("localMedia", "localMedia", notNull(obj(
                            field("__typename", "__typename", notNull(scalar("String"))),
                            field("sendVideo", "sendVideo", notNull(scalar("Boolean"))),
                            field("sendAudio", "sendAudio", notNull(scalar("Boolean"))),
                            field("sendScreencast", "sendScreencast", notNull(scalar("Boolean")))
                        )))
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
private let GlobalEventBusSelector = obj(
            field("globalEventBus", "globalEventBus", arguments(fieldValue("topic", refValue("topic"))), notNull(obj(
                    field("__typename", "__typename", notNull(scalar("String"))),
                    field("message", "message", notNull(scalar("String")))
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
        "query Account{me:me{__typename ...UserShort}myProfile{__typename id authEmail}sessionState:sessionState{__typename isLoggedIn isActivated isProfileCreated isAccountActivated isAccountExists isAccountPicked isCompleted isBlocked}myPermissions{__typename roles}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
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
        "query AccountAppInviteInfo($inviteKey:String!){invite:alphaInviteInfo(key:$inviteKey){__typename id creator{__typename ...UserShort}}appInvite:appInviteInfo(key:$inviteKey){__typename inviter{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
        AccountAppInviteInfoSelector
    )
    let AccountInviteInfo = OperationDefinition(
        "AccountInviteInfo",
        .query, 
        "query AccountInviteInfo($inviteKey:String!){invite:alphaInviteInfo(key:$inviteKey){__typename id key orgId title photo joined creator{__typename ...UserShort}forEmail forName membersCount organization{__typename id isCommunity:alphaIsCommunity about}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
        AccountInviteInfoSelector
    )
    let AccountSettings = OperationDefinition(
        "AccountSettings",
        .query, 
        "query AccountSettings{me:me{__typename ...UserShort audienceSize}myProfile{__typename id authEmail}organizations:myOrganizations{__typename ...OrganizationShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
        AccountSettingsSelector
    )
    let AuthPoints = OperationDefinition(
        "AuthPoints",
        .query, 
        "query AuthPoints{authPoints{__typename email phone}}",
        AuthPointsSelector
    )
    let AuthResolveShortName = OperationDefinition(
        "AuthResolveShortName",
        .query, 
        "query AuthResolveShortName($shortname:String!){item:alphaResolveShortName(shortname:$shortname){__typename ... on User{__typename id name firstName lastName photo online}... on SharedRoom{__typename ...SharedRoomPreview}... on DiscoverChatsCollection{__typename id}}}fragment SharedRoomPreview on SharedRoom{__typename id isChannel isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}membership owner{__typename id}title photo membersCount description previewMembers{__typename id name photo}}",
        AuthResolveShortNameSelector
    )
    let Channel = OperationDefinition(
        "Channel",
        .query, 
        "query Channel($id:ID!){channel(id:$id){__typename ...ChannelSimple}}fragment ChannelSimple on Channel{__typename id title shortname type owner{__typename id firstName lastName}}",
        ChannelSelector
    )
    let Channels = OperationDefinition(
        "Channels",
        .query, 
        "query Channels{channels{__typename ...ChannelSimple}}fragment ChannelSimple on Channel{__typename id title shortname type owner{__typename id firstName lastName}}",
        ChannelsSelector
    )
    let ChatInit = OperationDefinition(
        "ChatInit",
        .query, 
        "query ChatInit($chatId:ID!,$before:ID,$first:Int!){messages(chatId:$chatId,first:$first,before:$before){__typename ...FullMessage}state:conversationState(id:$chatId){__typename state}room(id:$chatId){__typename ...RoomShort}lastReadedMessage(chatId:$chatId){__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageCounterReactions on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
        ChatInitSelector
    )
    let ChatInitFromUnread = OperationDefinition(
        "ChatInitFromUnread",
        .query, 
        "query ChatInitFromUnread($chatId:ID!,$before:ID,$first:Int!){gammaMessages(chatId:$chatId,first:$first,before:$before){__typename messages{__typename ...FullMessage}haveMoreForward haveMoreBackward}state:conversationState(id:$chatId){__typename state}room(id:$chatId){__typename ...RoomShort}lastReadedMessage(chatId:$chatId){__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageCounterReactions on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
        ChatInitFromUnreadSelector
    )
    let ChatJoin = OperationDefinition(
        "ChatJoin",
        .query, 
        "query ChatJoin($id:ID!){room(id:$id){__typename ... on SharedRoom{__typename id title description photo membersCount previewMembers{__typename id photo name}isChannel isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}}",
        ChatJoinSelector
    )
    let ChatMentionSearch = OperationDefinition(
        "ChatMentionSearch",
        .query, 
        "query ChatMentionSearch($cid:ID!,$query:String,$first:Int!,$after:String){mentions:chatMentionSearch(cid:$cid,query:$query,first:$first,after:$after){__typename globalItems{__typename ... on Organization{__typename ...OrganizationShort}... on User{__typename ...UserForMention}... on SharedRoom{__typename ...RoomSharedNano}}localItems{__typename ...UserForMention}cursor}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}fragment UserForMention on User{__typename id name photo shortname isBot inContacts primaryOrganization{__typename id name}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title photo membersCount settings{__typename id mute}}",
        ChatMentionSearchSelector
    )
    let ChatNewGetMessage = OperationDefinition(
        "ChatNewGetMessage",
        .query, 
        "query ChatNewGetMessage($id:ID!){message(messageId:$id){__typename ...ChatNewMessageFragment}}fragment ChatNewMessageFragment on ModernMessage{__typename id date seq sender{__typename id}message fallback}",
        ChatNewGetMessageSelector
    )
    let ChatNewLoadAfter = OperationDefinition(
        "ChatNewLoadAfter",
        .query, 
        "query ChatNewLoadAfter($chatId:ID!,$after:ID!,$limit:Int!){batch:gammaMessages(chatId:$chatId,first:$limit,after:$after){__typename messages{__typename ...ChatNewMessageFragment}haveMoreForward}}fragment ChatNewMessageFragment on ModernMessage{__typename id date seq sender{__typename id}message fallback}",
        ChatNewLoadAfterSelector
    )
    let ChatNewLoadBefore = OperationDefinition(
        "ChatNewLoadBefore",
        .query, 
        "query ChatNewLoadBefore($chatId:ID!,$before:ID!,$limit:Int!){batch:gammaMessages(chatId:$chatId,first:$limit,before:$before){__typename messages{__typename ...ChatNewMessageFragment}haveMoreBackward}}fragment ChatNewMessageFragment on ModernMessage{__typename id date seq sender{__typename id}message fallback}",
        ChatNewLoadBeforeSelector
    )
    let ChatNewReadLastRead = OperationDefinition(
        "ChatNewReadLastRead",
        .query, 
        "query ChatNewReadLastRead($chatId:ID!){message:lastReadedMessage(chatId:$chatId){__typename id}}",
        ChatNewReadLastReadSelector
    )
    let Comments = OperationDefinition(
        "Comments",
        .query, 
        "query Comments($peerId:ID!){comments(peerId:$peerId){__typename id state{__typename state}count comments{__typename ...CommentEntryFragment}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage}parentComment{__typename id comment:betaComment{__typename id message}}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageCounterReactions on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
        CommentsSelector
    )
    let Conference = OperationDefinition(
        "Conference",
        .query, 
        "query Conference($id:ID!){conference(id:$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename id startTime peers{__typename id user{__typename ...UserShort}mediaState{__typename audioPaused videoPaused screencastEnabled}}iceServers{__typename urls username credential}room{__typename ... on SharedRoom{__typename id title isChannel membersCount photo owner{__typename id name}}... on PrivateRoom{__typename id user{__typename id name photo}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
        ConferenceSelector
    )
    let ConferenceMedia = OperationDefinition(
        "ConferenceMedia",
        .query, 
        "query ConferenceMedia($id:ID!,$peerId:ID!){conferenceMedia(id:$id,peerId:$peerId){__typename id streams{__typename ...MediaStreamFull}iceServers{__typename urls username credential}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource mid}senders{__typename kind videoSource codecParams mid}}",
        ConferenceMediaSelector
    )
    let DebugGqlTrace = OperationDefinition(
        "DebugGqlTrace",
        .query, 
        "query DebugGqlTrace($id:ID!){debugGqlTrace(id:$id){__typename id name duration traceData date}}",
        DebugGqlTraceSelector
    )
    let DebugGqlTraces = OperationDefinition(
        "DebugGqlTraces",
        .query, 
        "query DebugGqlTraces($first:Int!,$after:ID){debugGqlTraces(first:$first,after:$after){__typename cursor items{__typename id name date duration}}}",
        DebugGqlTracesSelector
    )
    let Dialogs = OperationDefinition(
        "Dialogs",
        .query, 
        "query Dialogs($after:String){dialogs(first:20,after:$after){__typename items{__typename ...DialogFragment}cursor}state:dialogsState{__typename state}counter:alphaNotificationCounter{__typename id unreadCount}}fragment DialogFragment on Dialog{__typename id cid fid kind isChannel isPremium title photo unreadCount isMuted hasActiveCall haveMention topMessage:alphaTopMessage{__typename ...DialogMessage}membership}fragment DialogMessage on ModernMessage{__typename id date sender{__typename id name photo firstName}message fallback ... on GeneralMessage{__typename id quotedMessages{__typename id}}}",
        DialogsSelector
    )
    let DiscoverCollection = OperationDefinition(
        "DiscoverCollection",
        .query, 
        "query DiscoverCollection($id:ID!){discoverCollection(id:$id){__typename id title shortname description image{__typename uuid crop{__typename x y w h}}chats{__typename ...DiscoverSharedRoom}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
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
        "query DiscoverCollections($first:Int!,$after:String){discoverCollections(first:$first,after:$after){__typename items{__typename ...DiscoverChatsCollection}cursor}}fragment DiscoverChatsCollection on DiscoverChatsCollection{__typename id title shortname chatsCount chats{__typename ...DiscoverSharedRoom}description image{__typename uuid crop{__typename x y w h}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
        DiscoverCollectionsSelector
    )
    let DiscoverCollectionsShort = OperationDefinition(
        "DiscoverCollectionsShort",
        .query, 
        "query DiscoverCollectionsShort($first:Int!,$after:String){discoverCollections(first:$first,after:$after){__typename items{__typename ...DiscoverChatsCollectionShort}cursor}}fragment DiscoverChatsCollectionShort on DiscoverChatsCollection{__typename id title shortname chatsCount description image{__typename uuid crop{__typename x y w h}}}",
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
        "query DiscoverNextPage($selectedTagsIds:[String!]!,$excudedGroupsIds:[String!]!){betaNextDiscoverPage:gammaNextDiscoverPage(selectedTagsIds:$selectedTagsIds,excudedGroupsIds:$excudedGroupsIds){__typename chats{__typename ...RoomShort}tagGroup{__typename id title subtitle tags{__typename id title}}}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageCounterReactions on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
        DiscoverNextPageSelector
    )
    let DiscoverNoAuth = OperationDefinition(
        "DiscoverNoAuth",
        .query, 
        "query DiscoverNoAuth($seed:Int!){discoverNewAndGrowing(first:3,seed:$seed){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverPopularNow(first:3){__typename items{__typename room{__typename ...DiscoverSharedRoom}newMessages}cursor}discoverTopPremium(first:5){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverTopFree(first:5){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverCollections(first:20){__typename items{__typename ...DiscoverChatsCollectionShort}cursor}discoverEditorsChoice{__typename id image{__typename uuid crop{__typename x y w h}}chat{__typename ...DiscoverSharedRoom}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}fragment DiscoverChatsCollectionShort on DiscoverChatsCollection{__typename id title shortname chatsCount description image{__typename uuid crop{__typename x y w h}}}",
        DiscoverNoAuthSelector
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
        "query ExplorePeople($query:String,$sort:String,$page:Int,$after:String){items:userSearch(query:$query,sort:$sort,page:$page,first:25,after:$after){__typename edges{__typename node{__typename ...UserShort isYou}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount currentPage pagesCount openEnded}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
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
        "query GlobalSearch($query:String!,$kinds:[GlobalSearchEntryKind!]){items:alphaGlobalSearch(query:$query,kinds:$kinds){__typename ... on Organization{__typename id name about photo shortname isCommunity:alphaIsCommunity}... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title canSendMessage roomPhoto:photo membersCount membership organization{__typename id name photo}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
        GlobalSearchSelector
    )
    let IpLocation = OperationDefinition(
        "IpLocation",
        .query, 
        "query IpLocation{ipLocation{__typename countryCode}}",
        IpLocationSelector
    )
    let Message = OperationDefinition(
        "Message",
        .query, 
        "query Message($messageId:ID!){message(messageId:$messageId){__typename ...FullMessage}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageCounterReactions on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
        MessageSelector
    )
    let MessageFullReactions = OperationDefinition(
        "MessageFullReactions",
        .query, 
        "query MessageFullReactions($id:ID!){message(messageId:$id){__typename id ... on GeneralMessage{__typename id reactions{__typename ...MessageUsersReactions}}... on StickerMessage{__typename id reactions{__typename ...MessageUsersReactions}}}}fragment MessageUsersReactions on ModernMessageReaction{__typename user{__typename id name photo primaryOrganization{__typename id name}}reaction}",
        MessageFullReactionsSelector
    )
    let MessageMultiSpan = OperationDefinition(
        "MessageMultiSpan",
        .query, 
        "query MessageMultiSpan($id:ID!){message(messageId:$id){__typename id spans{__typename ... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}}}}fragment UserForMention on User{__typename id name photo shortname isBot inContacts primaryOrganization{__typename id name}}",
        MessageMultiSpanSelector
    )
    let MessagesBatch = OperationDefinition(
        "MessagesBatch",
        .query, 
        "query MessagesBatch($chatId:ID!,$first:Int!,$before:ID,$after:ID){gammaMessages(chatId:$chatId,first:$first,before:$before,after:$after){__typename messages{__typename ...FullMessage}haveMoreForward haveMoreBackward}state:conversationState(id:$chatId){__typename state}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageCounterReactions on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
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
    let MyCommunities = OperationDefinition(
        "MyCommunities",
        .query, 
        "query MyCommunities{myCommunities{__typename ...OrganizationShort isOwner:betaIsOwner isAdmin:betaIsAdmin}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
        MyCommunitiesSelector
    )
    let MyContacts = OperationDefinition(
        "MyContacts",
        .query, 
        "query MyContacts($first:Int!,$after:String){myContacts(first:$first,after:$after){__typename items{__typename id user{__typename ...UserShort}}cursor}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
        MyContactsSelector
    )
    let MyContactsSearch = OperationDefinition(
        "MyContactsSearch",
        .query, 
        "query MyContactsSearch($query:String,$first:Int!,$after:String,$page:Int){myContactsSearch(query:$query,first:$first,after:$after,page:$page){__typename edges{__typename node{__typename ...UserShort}}pageInfo{__typename hasNextPage currentPage}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
        MyContactsSearchSelector
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
        "query MyNotifications($first:Int!,$before:ID){myNotifications(first:$first,before:$before){__typename items{__typename ...NotificationFragment}cursor}}fragment NotificationFragment on Notification{__typename id text content{__typename ... on NewCommentNotification{__typename comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{__typename message{__typename ... on GeneralMessage{__typename id fallback message sender{__typename id name}senderBadge{__typename ...UserBadge}}}chat{__typename ...RoomNano}}... on CommentPeerRootPost{__typename post{__typename id}}}subscription{__typename type}}}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage}parentComment{__typename id comment:betaComment{__typename id message}}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageCounterReactions on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title photo membersCount settings{__typename id mute}}",
        MyNotificationsSelector
    )
    let MyOrganizations = OperationDefinition(
        "MyOrganizations",
        .query, 
        "query MyOrganizations{myOrganizations{__typename ...OrganizationShort isPrimary:betaIsPrimary}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
        MyOrganizationsSelector
    )
    let MyPostDrafts = OperationDefinition(
        "MyPostDrafts",
        .query, 
        "query MyPostDrafts($after:String){postMyDrafts(first:20,after:$after){__typename items{__typename ...PostDraftSimple}cursor}}fragment PostDraftSimple on PostDraft{__typename id title content{__typename ...ParagraphSimple}publishedCopy{__typename id}channel{__typename id title shortname}createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}",
        MyPostDraftsSelector
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
        "query MyWallet{myWallet{__typename id balance state isLocked failingPaymentsCount}transactionsPending{__typename ...WalletTransactionFragment}transactionsHistory(first:20){__typename items{__typename ...WalletTransactionFragment}cursor}}fragment WalletTransactionFragment on WalletTransaction{__typename id status date operation{__typename ... on WalletTransactionDeposit{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}}... on WalletTransactionIncome{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}source{__typename ... on WalletSubscription{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}... on Purchase{__typename id user{__typename id name photo}product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}}}... on WalletTransactionTransferIn{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}fromUser{__typename ...UserShort}}... on WalletTransactionTransferOut{__typename amount walletAmount chargeAmount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}toUser{__typename ...UserShort}}... on WalletTransactionSubscription{__typename amount walletAmount chargeAmount subscription{__typename id interval amount product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}... on WalletTransactionPurchase{__typename amount walletAmount chargeAmount purchase{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
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
        "query Organization($organizationId:ID!){organization(id:$organizationId){__typename ...OrganizationFragment}}fragment OrganizationFragment on Organization{__typename id isMine superAccountId name photo shortname website websiteTitle about twitter facebook linkedin instagram membersCount private:alphaIsPrivate isOwner:betaIsOwner isAdmin:betaIsAdmin featured:alphaFeatured isCommunity:alphaIsCommunity roomsCount:betaPublicRoomsCount}",
        OrganizationSelector
    )
    let OrganizationMembers = OperationDefinition(
        "OrganizationMembers",
        .query, 
        "query OrganizationMembers($organizationId:ID!,$first:Int,$after:ID){organization(id:$organizationId){__typename id members:alphaOrganizationMembers(first:$first,after:$after){__typename role user{__typename ...UserShort}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
        OrganizationMembersSelector
    )
    let OrganizationMembersShort = OperationDefinition(
        "OrganizationMembersShort",
        .query, 
        "query OrganizationMembersShort($organizationId:ID!){organization(id:$organizationId){__typename ...OrganizationFragment members:alphaOrganizationMembers{__typename user{__typename id}}}}fragment OrganizationFragment on Organization{__typename id isMine superAccountId name photo shortname website websiteTitle about twitter facebook linkedin instagram membersCount private:alphaIsPrivate isOwner:betaIsOwner isAdmin:betaIsAdmin featured:alphaFeatured isCommunity:alphaIsCommunity roomsCount:betaPublicRoomsCount}",
        OrganizationMembersShortSelector
    )
    let OrganizationPico = OperationDefinition(
        "OrganizationPico",
        .query, 
        "query OrganizationPico($id:ID!){organization(id:$id){__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
        OrganizationPicoSelector
    )
    let OrganizationProfile = OperationDefinition(
        "OrganizationProfile",
        .query, 
        "query OrganizationProfile($organizationId:ID!){organizationProfile(id:$organizationId){__typename ...OrganizationProfileFragment}}fragment OrganizationProfileFragment on OrganizationProfile{__typename id name photoRef{__typename uuid crop{__typename x y w h}}website websiteTitle about twitter facebook linkedin instagram shortname isCommunity:alphaIsCommunity private:alphaIsPrivate featured:alphaFeatured published:alphaPublished editorial:alphaEditorial}",
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
    let Permissions = OperationDefinition(
        "Permissions",
        .query, 
        "query Permissions{myPermissions{__typename roles}}",
        PermissionsSelector
    )
    let PicSharedMedia = OperationDefinition(
        "PicSharedMedia",
        .query, 
        "query PicSharedMedia($chatId:ID!,$first:Int!,$after:ID,$before:ID,$around:ID){chatSharedMedia(chatId:$chatId,mediaTypes:[IMAGE],first:$first,after:$after,before:$before,around:$around){__typename edges{__typename cursor index node{__typename message{__typename ... on GeneralMessage{__typename id date sender{__typename id name}attachments{__typename ... on MessageAttachmentFile{__typename id fileMetadata{__typename name isImage imageFormat mimeType imageWidth imageHeight size}filePreview fileId fallback}}}}}}}}",
        PicSharedMediaSelector
    )
    let Post = OperationDefinition(
        "Post",
        .query, 
        "query Post($id:ID!){post(id:$id){__typename ...PostSimple}}fragment PostSimple on Post{__typename id title content{__typename ...ParagraphSimple}channel{__typename id title shortname}author{__typename id name}draft{__typename id}canEdit createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}",
        PostSelector
    )
    let PostDraft = OperationDefinition(
        "PostDraft",
        .query, 
        "query PostDraft($id:ID!){postDraft(id:$id){__typename ...PostDraftSimple}}fragment PostDraftSimple on PostDraft{__typename id title content{__typename ...ParagraphSimple}publishedCopy{__typename id}channel{__typename id title shortname}createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}",
        PostDraftSelector
    )
    let Posts = OperationDefinition(
        "Posts",
        .query, 
        "query Posts($channels:[ID!]!,$after:String){posts(hubs:$channels,first:20,after:$after){__typename items{__typename ...PostSimple}cursor}}fragment PostSimple on Post{__typename id title content{__typename ...ParagraphSimple}channel{__typename id title shortname}author{__typename id name}draft{__typename id}canEdit createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}",
        PostsSelector
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
        "query ResolveShortName($shortname:String!){item:alphaResolveShortName(shortname:$shortname){__typename ... on User{__typename id isDeleted}... on Organization{__typename id isDeleted}... on FeedChannel{__typename id}... on SharedRoom{__typename id}... on DiscoverChatsCollection{__typename id}... on Channel{__typename id}}}",
        ResolveShortNameSelector
    )
    let ResolvedInvite = OperationDefinition(
        "ResolvedInvite",
        .query, 
        "query ResolvedInvite($key:String!){invite:alphaResolveInvite(key:$key){__typename ... on InviteInfo{__typename id orgId title creator{__typename ...UserShort}organization{__typename id photo name membersCount about isCommunity:alphaIsCommunity}}... on AppInvite{__typename inviter{__typename ...UserShort}}... on RoomInvite{__typename id invitedByUser{__typename ...UserShort}room{__typename ... on SharedRoom{__typename id kind isChannel title photo socialImage description membership membersCount previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}}}shortnameItem:alphaResolveShortName(shortname:$key){__typename ... on SharedRoom{__typename ...SharedRoomPreview}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}fragment SharedRoomPreview on SharedRoom{__typename id isChannel isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}membership owner{__typename id}title photo membersCount description previewMembers{__typename id name photo}}",
        ResolvedInviteSelector
    )
    let RoomAdminMembers = OperationDefinition(
        "RoomAdminMembers",
        .query, 
        "query RoomAdminMembers($roomId:ID!){roomAdmins(roomId:$roomId){__typename user{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
        RoomAdminMembersSelector
    )
    let RoomChat = OperationDefinition(
        "RoomChat",
        .query, 
        "query RoomChat($id:ID!){room(id:$id){__typename ... on PrivateRoom{__typename id user{__typename id name firstName photo shortname inContacts primaryOrganization{__typename id name}isBot isYou online lastSeen}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind title membership isChannel role canEdit canSendMessage photo membersCount shortname featuredMembersCount socialImage welcomeMessage{__typename isOn sender{__typename id name}message}organization{__typename ...OrganizationMedium}canUnpinMessage pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}settings{__typename id mute}description previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName isYou}}}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageCounterReactions on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment OrganizationMedium on Organization{__typename id name photo isMine membersCount shortname about isOwner:betaIsOwner isAdmin:betaIsAdmin isCommunity:alphaIsCommunity private:alphaIsPrivate}",
        RoomChatSelector
    )
    let RoomFeaturedMembers = OperationDefinition(
        "RoomFeaturedMembers",
        .query, 
        "query RoomFeaturedMembers($roomId:ID!){roomFeaturedMembers(roomId:$roomId){__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}fragment UserBadge on UserBadge{__typename id name verified}",
        RoomFeaturedMembersSelector
    )
    let RoomInviteInfo = OperationDefinition(
        "RoomInviteInfo",
        .query, 
        "query RoomInviteInfo($invite:String!){invite:betaRoomInviteInfo(invite:$invite){__typename id room{__typename ... on SharedRoom{__typename id kind isChannel title photo socialImage description organization{__typename ...OrganizationShort}membership membersCount previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}invitedByUser{__typename ...UserShort}}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}",
        RoomInviteInfoSelector
    )
    let RoomInviteLink = OperationDefinition(
        "RoomInviteLink",
        .query, 
        "query RoomInviteLink($roomId:ID!){link:betaRoomInviteLink(roomId:$roomId)}",
        RoomInviteLinkSelector
    )
    let RoomMembersPaginated = OperationDefinition(
        "RoomMembersPaginated",
        .query, 
        "query RoomMembersPaginated($roomId:ID!,$first:Int,$after:ID){members:roomMembers(roomId:$roomId,first:$first,after:$after){__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}fragment UserBadge on UserBadge{__typename id name verified}",
        RoomMembersPaginatedSelector
    )
    let RoomMembersSearch = OperationDefinition(
        "RoomMembersSearch",
        .query, 
        "query RoomMembersSearch($cid:ID!,$query:String,$first:Int!,$after:String){chatMembersSearch(cid:$cid,query:$query,first:$first,after:$after){__typename edges{__typename node{__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}cursor}pageInfo{__typename hasNextPage}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}fragment UserBadge on UserBadge{__typename id name verified}",
        RoomMembersSearchSelector
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
    let RoomMetaPreview = OperationDefinition(
        "RoomMetaPreview",
        .query, 
        "query RoomMetaPreview($shortname:String!,$id:ID!){alphaResolveShortName(shortname:$shortname){__typename ... on SharedRoom{__typename id title description photo socialImage}}roomSocialImage(roomId:$id)}",
        RoomMetaPreviewSelector
    )
    let RoomPico = OperationDefinition(
        "RoomPico",
        .query, 
        "query RoomPico($id:ID!){room(id:$id){__typename ...RoomNano}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title photo membersCount settings{__typename id mute}}",
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
    let RoomTiny = OperationDefinition(
        "RoomTiny",
        .query, 
        "query RoomTiny($id:ID!){room(id:$id){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageCounterReactions on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
        RoomTinySelector
    )
    let Settings = OperationDefinition(
        "Settings",
        .query, 
        "query Settings{settings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}organizationChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}notificationPreview}",
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
        "query SuperAccount($accountId:ID!,$viaOrgId:Boolean){superAccount(id:$accountId,viaOrgId:$viaOrgId){__typename id title state members{__typename ...UserShort}features{__typename id key title}orgId createdAt createdBy{__typename id name}published:alphaPublished}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
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
        "query SuperAdmins{superAdmins{__typename role user{__typename ...UserShort}email}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
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
        "query TransactionsHistory($first:Int!,$after:String){transactionsHistory(first:$first,after:$after){__typename items{__typename ...WalletTransactionFragment}cursor}}fragment WalletTransactionFragment on WalletTransaction{__typename id status date operation{__typename ... on WalletTransactionDeposit{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}}... on WalletTransactionIncome{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}source{__typename ... on WalletSubscription{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}... on Purchase{__typename id user{__typename id name photo}product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}}}... on WalletTransactionTransferIn{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}fromUser{__typename ...UserShort}}... on WalletTransactionTransferOut{__typename amount walletAmount chargeAmount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}toUser{__typename ...UserShort}}... on WalletTransactionSubscription{__typename amount walletAmount chargeAmount subscription{__typename id interval amount product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}... on WalletTransactionPurchase{__typename amount walletAmount chargeAmount purchase{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
        TransactionsHistorySelector
    )
    let User = OperationDefinition(
        "User",
        .query, 
        "query User($userId:ID!){user:user(id:$userId){__typename ...UserFull chatsWithBadge{__typename chat{__typename ...RoomShort}badge{__typename ...UserBadge}}}conversation:room(id:$userId){__typename ... on PrivateRoom{__typename id settings{__typename id mute}}}}fragment UserFull on User{__typename id name firstName lastName photo phone email website about location isBot online lastSeen linkedin instagram twitter facebook shortname audienceSize inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageCounterReactions on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
        UserSelector
    )
    let UserAvailableRooms = OperationDefinition(
        "UserAvailableRooms",
        .query, 
        "query UserAvailableRooms($first:Int!,$after:String,$query:String){alphaUserAvailableRooms(first:$first,after:$after,query:$query){__typename edges{__typename node{__typename ...DiscoverSharedRoom}cursor}pageInfo{__typename hasNextPage}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
        UserAvailableRoomsSelector
    )
    let UserNano = OperationDefinition(
        "UserNano",
        .query, 
        "query UserNano($id:ID!){user(id:$id){__typename ...UserForMention}}fragment UserForMention on User{__typename id name photo shortname isBot inContacts primaryOrganization{__typename id name}}",
        UserNanoSelector
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
        "mutation AddAppToChat($appId:ID!,$chatId:ID!){addAppToChat(appId:$appId,chatId:$chatId){__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}webhook}}",
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
    let AddToContacts = OperationDefinition(
        "AddToContacts",
        .mutation, 
        "mutation AddToContacts($userId:ID!){addToContacts(userId:$userId)}",
        AddToContactsSelector
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
    let CommentDeleteUrlAugmentation = OperationDefinition(
        "CommentDeleteUrlAugmentation",
        .mutation, 
        "mutation CommentDeleteUrlAugmentation($id:ID!){deleteCommentAugmentation(id:$id)}",
        CommentDeleteUrlAugmentationSelector
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
    let ConferenceJoin = OperationDefinition(
        "ConferenceJoin",
        .mutation, 
        "mutation ConferenceJoin($id:ID!,$input:ConferenceJoinInput){conferenceJoin(id:$id,input:$input){__typename peerId conference{__typename ...ConferenceShort}}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}",
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
    let DiscoverCollectionSetShortname = OperationDefinition(
        "DiscoverCollectionSetShortname",
        .mutation, 
        "mutation DiscoverCollectionSetShortname($id:ID!,$shortname:String!){alphaSetCollectionShortName(id:$id,shortname:$shortname)}",
        DiscoverCollectionSetShortnameSelector
    )
    let DiscoverCollectionsCreate = OperationDefinition(
        "DiscoverCollectionsCreate",
        .mutation, 
        "mutation DiscoverCollectionsCreate($title:String!,$description:String,$image:ImageRefInput!,$chatIds:[ID!]!){discoverCollectionsCreate(collection:{title:$title,description:$description,image:$image,chatIds:$chatIds}){__typename id title}}",
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
        "mutation DiscoverCollectionsUpdate($id:ID!,$title:String!,$description:String,$image:ImageRefInput!,$chatIds:[ID!]!){discoverCollectionsUpdate(id:$id,input:{title:$title,description:$description,image:$image,chatIds:$chatIds}){__typename id title}}",
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
    let GlobalEventBusPublish = OperationDefinition(
        "GlobalEventBusPublish",
        .mutation, 
        "mutation GlobalEventBusPublish($topic:String!,$message:String!){globalEventBusPublish(topic:$topic,message:$message)}",
        GlobalEventBusPublishSelector
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
    let MediaAnswer = OperationDefinition(
        "MediaAnswer",
        .mutation, 
        "mutation MediaAnswer($id:ID!,$peerId:ID!,$answer:String!,$seq:Int!){mediaStreamAnswer(id:$id,peerId:$peerId,answer:$answer,seq:$seq){__typename id streams{__typename ...MediaStreamFull}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource mid}senders{__typename kind videoSource codecParams mid}}",
        MediaAnswerSelector
    )
    let MediaCandidate = OperationDefinition(
        "MediaCandidate",
        .mutation, 
        "mutation MediaCandidate($id:ID!,$peerId:ID!,$candidate:String!){mediaStreamCandidate(id:$id,peerId:$peerId,candidate:$candidate){__typename id streams{__typename ...MediaStreamFull}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource mid}senders{__typename kind videoSource codecParams mid}}",
        MediaCandidateSelector
    )
    let MediaFailed = OperationDefinition(
        "MediaFailed",
        .mutation, 
        "mutation MediaFailed($id:ID!,$peerId:ID!){mediaStreamFailed(id:$id,peerId:$peerId){__typename id streams{__typename ...MediaStreamFull}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource mid}senders{__typename kind videoSource codecParams mid}}",
        MediaFailedSelector
    )
    let MediaOffer = OperationDefinition(
        "MediaOffer",
        .mutation, 
        "mutation MediaOffer($id:ID!,$peerId:ID!,$offer:String!,$seq:Int!,$hints:[MediaStreamHint!]){mediaStreamOffer(id:$id,peerId:$peerId,offer:$offer,seq:$seq,hints:$hints){__typename id streams{__typename ...MediaStreamFull}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource mid}senders{__typename kind videoSource codecParams mid}}",
        MediaOfferSelector
    )
    let MessageSetDonationReaction = OperationDefinition(
        "MessageSetDonationReaction",
        .mutation, 
        "mutation MessageSetDonationReaction($messageId:ID!){messageDonationReactionAdd(messageId:$messageId)}",
        MessageSetDonationReactionSelector
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
        "mutation OrganizationAddMember($userIds:[ID!],$organizationId:ID!){alphaOrganizationMemberAdd(userIds:$userIds,organizationId:$organizationId){__typename role user{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
        OrganizationAddMemberSelector
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
    let PairEmail = OperationDefinition(
        "PairEmail",
        .mutation, 
        "mutation PairEmail($sessionId:String!,$confirmationCode:String!){pairEmail(sessionId:$sessionId,confirmationCode:$confirmationCode)}",
        PairEmailSelector
    )
    let PairPhone = OperationDefinition(
        "PairPhone",
        .mutation, 
        "mutation PairPhone($sessionId:String!,$confirmationCode:String!){pairPhone(sessionId:$sessionId,confirmationCode:$confirmationCode)}",
        PairPhoneSelector
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
    let PhonebookAdd = OperationDefinition(
        "PhonebookAdd",
        .mutation, 
        "mutation PhonebookAdd($records:[PhonebookRecordInput!]!){phonebookAdd(records:$records)}",
        PhonebookAddSelector
    )
    let PinMessage = OperationDefinition(
        "PinMessage",
        .mutation, 
        "mutation PinMessage($chatId:ID!,$messageId:ID!){pinMessage:gammaPinMessage(chatId:$chatId,messageId:$messageId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageCounterReactions on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
        PinMessageSelector
    )
    let PostCreateDraft = OperationDefinition(
        "PostCreateDraft",
        .mutation, 
        "mutation PostCreateDraft{postDraftCreate(input:{}){__typename ...PostDraftSimple}}fragment PostDraftSimple on PostDraft{__typename id title content{__typename ...ParagraphSimple}publishedCopy{__typename id}channel{__typename id title shortname}createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}",
        PostCreateDraftSelector
    )
    let PostDraftUpdate = OperationDefinition(
        "PostDraftUpdate",
        .mutation, 
        "mutation PostDraftUpdate($id:ID!,$channel:ID,$title:String!,$content:[PostContentInput!]){postDraftUpdate(id:$id,input:{hub:$channel,title:$title,content:$content}){__typename ...PostDraftSimple}}fragment PostDraftSimple on PostDraft{__typename id title content{__typename ...ParagraphSimple}publishedCopy{__typename id}channel{__typename id title shortname}createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}",
        PostDraftUpdateSelector
    )
    let PostPublish = OperationDefinition(
        "PostPublish",
        .mutation, 
        "mutation PostPublish($id:ID!){postDraftPublish(id:$id){__typename ...PostSimple}}fragment PostSimple on Post{__typename id title content{__typename ...ParagraphSimple}channel{__typename id title shortname}author{__typename id name}draft{__typename id}canEdit createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}",
        PostPublishSelector
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
    let RemoveFromContacts = OperationDefinition(
        "RemoveFromContacts",
        .mutation, 
        "mutation RemoveFromContacts($userId:ID!){removeFromContacts(userId:$userId)}",
        RemoveFromContactsSelector
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
        "mutation RoomAddMembers($roomId:ID!,$invites:[RoomInviteInput!]!){alphaRoomInvite(roomId:$roomId,invites:$invites){__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}fragment UserBadge on UserBadge{__typename id name verified}",
        RoomAddMembersSelector
    )
    let RoomChangeRole = OperationDefinition(
        "RoomChangeRole",
        .mutation, 
        "mutation RoomChangeRole($roomId:ID!,$userId:ID!,$newRole:RoomMemberRole!){betaRoomChangeRole(roomId:$roomId,userId:$userId,newRole:$newRole){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}",
        RoomChangeRoleSelector
    )
    let RoomCreate = OperationDefinition(
        "RoomCreate",
        .mutation, 
        "mutation RoomCreate($kind:SharedRoomKind!,$members:[ID!]!,$message:String,$title:String,$description:String,$photoRef:ImageRefInput,$organizationId:ID,$channel:Boolean!,$price:Int,$interval:WalletSubscriptionInterval){room:betaRoomCreate(kind:$kind,members:$members,message:$message,title:$title,description:$description,photoRef:$photoRef,organizationId:$organizationId,channel:$channel,price:$price,interval:$interval){__typename id}}",
        RoomCreateSelector
    )
    let RoomDelete = OperationDefinition(
        "RoomDelete",
        .mutation, 
        "mutation RoomDelete($chatId:ID!){deleteChat(chatId:$chatId)}",
        RoomDeleteSelector
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
        "mutation RoomJoinInviteLink($invite:String!){join:betaRoomInviteLinkJoin(invite:$invite){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageCounterReactions on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
        RoomJoinInviteLinkSelector
    )
    let RoomKick = OperationDefinition(
        "RoomKick",
        .mutation, 
        "mutation RoomKick($roomId:ID!,$userId:ID!){betaRoomKick(roomId:$roomId,userId:$userId){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}",
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
        "mutation RoomsInviteUser($userId:ID!,$roomIds:[ID!]!){rooms:betaRoomsInviteUser(userId:$userId,roomIds:$roomIds){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageCounterReactions on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
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
        "mutation SendDonation($amount:Int!,$chatId:ID,$userId:ID,$message:String,$repeatKey:String){sendDonation(chatId:$chatId,userId:$userId,amount:$amount,message:$message,repeatKey:$repeatKey)}",
        SendDonationSelector
    )
    let SendEmailPairCode = OperationDefinition(
        "SendEmailPairCode",
        .mutation, 
        "mutation SendEmailPairCode($email:String!){sendEmailPairCode(email:$email)}",
        SendEmailPairCodeSelector
    )
    let SendMessage = OperationDefinition(
        "SendMessage",
        .mutation, 
        "mutation SendMessage($chatId:ID!,$message:String,$replyMessages:[ID!],$mentions:[MentionInput!],$fileAttachments:[FileAttachmentInput!],$spans:[MessageSpanInput!],$repeatKey:String){sentMessage:sendMessage(chatId:$chatId,message:$message,replyMessages:$replyMessages,mentions:$mentions,fileAttachments:$fileAttachments,spans:$spans,repeatKey:$repeatKey)}",
        SendMessageSelector
    )
    let SendPhonePairCode = OperationDefinition(
        "SendPhonePairCode",
        .mutation, 
        "mutation SendPhonePairCode($phone:String!){sendPhonePairCode(phone:$phone)}",
        SendPhonePairCodeSelector
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
        "mutation SettingsUpdate($input:UpdateSettingsInput){updateSettings(settings:$input){__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}organizationChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}notificationPreview}",
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
        "mutation SuperAccountMemberAdd($accountId:ID!,$userId:ID!){superAccountMemberAdd(id:$accountId,userId:$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
        SuperAccountMemberAddSelector
    )
    let SuperAccountMemberRemove = OperationDefinition(
        "SuperAccountMemberRemove",
        .mutation, 
        "mutation SuperAccountMemberRemove($accountId:ID!,$userId:ID!){superAccountMemberRemove(id:$accountId,userId:$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
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
        "mutation UnpinMessage($chatId:ID!){unpinMessage:gammaUnpinMessage(chatId:$chatId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageCounterReactions on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
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
        "mutation UpdateOrganization($input:UpdateOrganizationProfileInput!,$organizationId:ID){updateOrganizationProfile(input:$input,id:$organizationId){__typename id}}",
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
    let conferenceAddScreenShare = OperationDefinition(
        "conferenceAddScreenShare",
        .mutation, 
        "mutation conferenceAddScreenShare($id:ID!){conferenceAddScreenShare(id:$id){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}",
        conferenceAddScreenShareSelector
    )
    let conferenceAlterMediaState = OperationDefinition(
        "conferenceAlterMediaState",
        .mutation, 
        "mutation conferenceAlterMediaState($id:ID!,$state:MediaStreamMediaStateInput!){conferenceAlterMediaState(id:$id,state:$state){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}",
        conferenceAlterMediaStateSelector
    )
    let conferenceRemoveScreenShare = OperationDefinition(
        "conferenceRemoveScreenShare",
        .mutation, 
        "mutation conferenceRemoveScreenShare($id:ID!){conferenceRemoveScreenShare(id:$id){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}",
        conferenceRemoveScreenShareSelector
    )
    let conferenceRequestLocalMediaChange = OperationDefinition(
        "conferenceRequestLocalMediaChange",
        .mutation, 
        "mutation conferenceRequestLocalMediaChange($id:ID!,$media:LocalMediaInput!){conferenceRequestLocalMediaChange(id:$id,media:$media){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}",
        conferenceRequestLocalMediaChangeSelector
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
        "subscription ChatWatch($chatId:ID!,$state:String){event:chatUpdates(chatId:$chatId,fromState:$state){__typename ... on ChatUpdateSingle{__typename seq state update{__typename ...ChatUpdateFragment}}... on ChatUpdateBatch{__typename fromSeq seq state updates{__typename ...ChatUpdateFragment}}}}fragment ChatUpdateFragment on ChatUpdate{__typename ... on ChatMessageReceived{__typename message{__typename ...FullMessage}repeatKey}... on ChatMessageUpdated{__typename message{__typename ...FullMessage}}... on ChatMessageDeleted{__typename message{__typename id}}... on ChatUpdated{__typename chat{__typename ...RoomShort}}... on ChatLostAccess{__typename lostAccess}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageCounterReactions on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
        ChatWatchSelector
    )
    let CommentWatch = OperationDefinition(
        "CommentWatch",
        .subscription, 
        "subscription CommentWatch($peerId:ID!,$fromState:String){event:commentUpdates(peerId:$peerId,fromState:$fromState){__typename ... on CommentUpdateSingle{__typename seq state update{__typename ...CommentUpdateFragment}}... on CommentUpdateBatch{__typename fromSeq seq state updates{__typename ...CommentUpdateFragment}}}}fragment CommentUpdateFragment on CommentUpdate{__typename ... on CommentReceived{__typename comment{__typename ...CommentEntryFragment}}... on CommentUpdated{__typename comment{__typename ...CommentEntryFragment}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage}parentComment{__typename id comment:betaComment{__typename id message}}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageCounterReactions on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
        CommentWatchSelector
    )
    let ConferenceMediaWatch = OperationDefinition(
        "ConferenceMediaWatch",
        .subscription, 
        "subscription ConferenceMediaWatch($id:ID!,$peerId:ID!){media:alphaConferenceMediaWatch(id:$id,peerId:$peerId){__typename id streams{__typename ...MediaStreamFull}localMedia{__typename sendVideo sendAudio sendScreencast}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource mid}senders{__typename kind videoSource codecParams mid}}",
        ConferenceMediaWatchSelector
    )
    let ConferenceWatch = OperationDefinition(
        "ConferenceWatch",
        .subscription, 
        "subscription ConferenceWatch($id:ID!){alphaConferenceWatch(id:$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename id startTime peers{__typename id user{__typename ...UserShort}mediaState{__typename audioPaused videoPaused screencastEnabled}}iceServers{__typename urls username credential}room{__typename ... on SharedRoom{__typename id title isChannel membersCount photo owner{__typename id name}}... on PrivateRoom{__typename id user{__typename id name photo}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
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
        "subscription DialogsWatch($state:String){event:dialogsUpdates(fromState:$state){__typename ... on DialogUpdateSingle{__typename state update{__typename ...DialogUpdateFragment}}... on DialogUpdateBatch{__typename state updates{__typename ...DialogUpdateFragment}}}}fragment DialogUpdateFragment on DialogUpdate{__typename ... on DialogMessageReceived{__typename cid unread globalUnread message:alphaMessage{__typename ...DialogMessage ... on ServiceMessage{__typename id serviceMetadata{__typename}}}haveMention silent{__typename mobile desktop}showNotification{__typename mobile desktop}membership}... on DialogMessageUpdated{__typename cid message:alphaMessage{__typename ...DialogMessage}haveMention}... on DialogMessageDeleted{__typename cid message:alphaMessage{__typename ...DialogMessage}prevMessage:alphaPrevMessage{__typename ...DialogMessage}unread globalUnread haveMention}... on DialogMessageRead{__typename cid mid unread globalUnread haveMention}... on DialogMuteChanged{__typename cid mute}... on DialogPeerUpdated{__typename cid peer{__typename ... on PrivateRoom{__typename id user{__typename id name photo}}... on SharedRoom{__typename id title photo}}}... on DialogDeleted{__typename cid globalUnread}... on DialogBump{__typename cid globalUnread unread topMessage{__typename ...DialogMessage ... on ServiceMessage{__typename id serviceMetadata{__typename}}}haveMention membership}... on DialogCallStateChanged{__typename cid hasActiveCall}}fragment DialogMessage on ModernMessage{__typename id date sender{__typename id name photo firstName}message fallback ... on GeneralMessage{__typename id quotedMessages{__typename id}}}",
        DialogsWatchSelector
    )
    let GlobalEventBus = OperationDefinition(
        "GlobalEventBus",
        .subscription, 
        "subscription GlobalEventBus($topic:String!){globalEventBus(topic:$topic){__typename message}}",
        GlobalEventBusSelector
    )
    let MyNotificationsCenter = OperationDefinition(
        "MyNotificationsCenter",
        .subscription, 
        "subscription MyNotificationsCenter($state:String){event:notificationCenterUpdates(fromState:$state){__typename ... on NotificationCenterUpdateSingle{__typename seq state update{__typename ...NotificationCenterUpdateFragment}}... on NotificationCenterUpdateBatch{__typename fromSeq seq state updates{__typename ...NotificationCenterUpdateFragment}}}}fragment NotificationCenterUpdateFragment on NotificationCenterUpdate{__typename ... on NotificationReceived{__typename center{__typename id unread}notification{__typename ...NotificationFragment}}... on NotificationUpdated{__typename center{__typename id unread}notification{__typename ...NotificationFragment}}... on NotificationDeleted{__typename center{__typename id unread}notification{__typename id}}... on NotificationRead{__typename center{__typename id unread}}... on NotificationContentUpdated{__typename content{__typename ... on UpdatedNotificationContentComment{__typename peer{__typename peerRoot{__typename ... on CommentPeerRootMessage{__typename message{__typename ... on GeneralMessage{__typename id fallback message sender{__typename id name}senderBadge{__typename ...UserBadge}}}chat{__typename ...RoomNano}}... on CommentPeerRootPost{__typename post{__typename id}}}id subscription{__typename type}}comment{__typename ...CommentEntryFragment}}}}}fragment NotificationFragment on Notification{__typename id text content{__typename ... on NewCommentNotification{__typename comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{__typename message{__typename ... on GeneralMessage{__typename id fallback message sender{__typename id name}senderBadge{__typename ...UserBadge}}}chat{__typename ...RoomNano}}... on CommentPeerRootPost{__typename post{__typename id}}}subscription{__typename type}}}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage}parentComment{__typename id comment:betaComment{__typename id message}}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageCounterReactions}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageCounterReactions on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title photo membersCount settings{__typename id mute}}",
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
        "subscription SettingsWatch{watchSettings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}organizationChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}notificationPreview}",
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
        "subscription WalletUpdates($state:String!){event:walletUpdates(fromState:$state){__typename ... on WalletUpdateSingle{__typename state update{__typename ...WalletUpdateFragment}}... on WalletUpdateBatch{__typename state updates{__typename ...WalletUpdateFragment}}}}fragment WalletUpdateFragment on WalletUpdate{__typename ... on WalletUpdateBalance{__typename amount}... on WalletUpdateLocked{__typename isLocked failingPaymentsCount}... on WalletUpdateTransactionSuccess{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdateTransactionCanceled{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdateTransactionPending{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdatePaymentStatus{__typename payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}}fragment WalletTransactionFragment on WalletTransaction{__typename id status date operation{__typename ... on WalletTransactionDeposit{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}}... on WalletTransactionIncome{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}source{__typename ... on WalletSubscription{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}... on Purchase{__typename id user{__typename id name photo}product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}}}... on WalletTransactionTransferIn{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}fromUser{__typename ...UserShort}}... on WalletTransactionTransferOut{__typename amount walletAmount chargeAmount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}toUser{__typename ...UserShort}}... on WalletTransactionSubscription{__typename amount walletAmount chargeAmount subscription{__typename id interval amount product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}... on WalletTransactionPurchase{__typename amount walletAmount chargeAmount purchase{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount}",
        WalletUpdatesSelector
    )
    
    func operationByName(_ name: String) -> OperationDefinition {
        if name == "Account" { return Account }
        if name == "AccountAppInvite" { return AccountAppInvite }
        if name == "AccountAppInviteInfo" { return AccountAppInviteInfo }
        if name == "AccountInviteInfo" { return AccountInviteInfo }
        if name == "AccountSettings" { return AccountSettings }
        if name == "AuthPoints" { return AuthPoints }
        if name == "AuthResolveShortName" { return AuthResolveShortName }
        if name == "Channel" { return Channel }
        if name == "Channels" { return Channels }
        if name == "ChatInit" { return ChatInit }
        if name == "ChatInitFromUnread" { return ChatInitFromUnread }
        if name == "ChatJoin" { return ChatJoin }
        if name == "ChatMentionSearch" { return ChatMentionSearch }
        if name == "ChatNewGetMessage" { return ChatNewGetMessage }
        if name == "ChatNewLoadAfter" { return ChatNewLoadAfter }
        if name == "ChatNewLoadBefore" { return ChatNewLoadBefore }
        if name == "ChatNewReadLastRead" { return ChatNewReadLastRead }
        if name == "Comments" { return Comments }
        if name == "Conference" { return Conference }
        if name == "ConferenceMedia" { return ConferenceMedia }
        if name == "DebugGqlTrace" { return DebugGqlTrace }
        if name == "DebugGqlTraces" { return DebugGqlTraces }
        if name == "Dialogs" { return Dialogs }
        if name == "DiscoverCollection" { return DiscoverCollection }
        if name == "DiscoverCollectionShort" { return DiscoverCollectionShort }
        if name == "DiscoverCollections" { return DiscoverCollections }
        if name == "DiscoverCollectionsShort" { return DiscoverCollectionsShort }
        if name == "DiscoverEditorsChoice" { return DiscoverEditorsChoice }
        if name == "DiscoverIsDone" { return DiscoverIsDone }
        if name == "DiscoverNewAndGrowing" { return DiscoverNewAndGrowing }
        if name == "DiscoverNextPage" { return DiscoverNextPage }
        if name == "DiscoverNoAuth" { return DiscoverNoAuth }
        if name == "DiscoverPopularNow" { return DiscoverPopularNow }
        if name == "DiscoverState" { return DiscoverState }
        if name == "DiscoverSuggestedRooms" { return DiscoverSuggestedRooms }
        if name == "DiscoverTopFree" { return DiscoverTopFree }
        if name == "DiscoverTopPremium" { return DiscoverTopPremium }
        if name == "ExplorePeople" { return ExplorePeople }
        if name == "ExploreRooms" { return ExploreRooms }
        if name == "FeatureFlags" { return FeatureFlags }
        if name == "FetchPushSettings" { return FetchPushSettings }
        if name == "GlobalCounter" { return GlobalCounter }
        if name == "GlobalSearch" { return GlobalSearch }
        if name == "IpLocation" { return IpLocation }
        if name == "Message" { return Message }
        if name == "MessageFullReactions" { return MessageFullReactions }
        if name == "MessageMultiSpan" { return MessageMultiSpan }
        if name == "MessagesBatch" { return MessagesBatch }
        if name == "MessagesSearch" { return MessagesSearch }
        if name == "MyApps" { return MyApps }
        if name == "MyCards" { return MyCards }
        if name == "MyCommunities" { return MyCommunities }
        if name == "MyContacts" { return MyContacts }
        if name == "MyContactsSearch" { return MyContactsSearch }
        if name == "MyNotificationCenter" { return MyNotificationCenter }
        if name == "MyNotifications" { return MyNotifications }
        if name == "MyOrganizations" { return MyOrganizations }
        if name == "MyPostDrafts" { return MyPostDrafts }
        if name == "MyStickers" { return MyStickers }
        if name == "MySuccessfulInvitesCount" { return MySuccessfulInvitesCount }
        if name == "MyWallet" { return MyWallet }
        if name == "OauthContext" { return OauthContext }
        if name == "Online" { return Online }
        if name == "Organization" { return Organization }
        if name == "OrganizationMembers" { return OrganizationMembers }
        if name == "OrganizationMembersShort" { return OrganizationMembersShort }
        if name == "OrganizationPico" { return OrganizationPico }
        if name == "OrganizationProfile" { return OrganizationProfile }
        if name == "OrganizationPublicInvite" { return OrganizationPublicInvite }
        if name == "OrganizationPublicRooms" { return OrganizationPublicRooms }
        if name == "Permissions" { return Permissions }
        if name == "PicSharedMedia" { return PicSharedMedia }
        if name == "Post" { return Post }
        if name == "PostDraft" { return PostDraft }
        if name == "Posts" { return Posts }
        if name == "Profile" { return Profile }
        if name == "ProfilePrefill" { return ProfilePrefill }
        if name == "ResolveShortName" { return ResolveShortName }
        if name == "ResolvedInvite" { return ResolvedInvite }
        if name == "RoomAdminMembers" { return RoomAdminMembers }
        if name == "RoomChat" { return RoomChat }
        if name == "RoomFeaturedMembers" { return RoomFeaturedMembers }
        if name == "RoomInviteInfo" { return RoomInviteInfo }
        if name == "RoomInviteLink" { return RoomInviteLink }
        if name == "RoomMembersPaginated" { return RoomMembersPaginated }
        if name == "RoomMembersSearch" { return RoomMembersSearch }
        if name == "RoomMembersShort" { return RoomMembersShort }
        if name == "RoomMembersTiny" { return RoomMembersTiny }
        if name == "RoomMetaPreview" { return RoomMetaPreview }
        if name == "RoomPico" { return RoomPico }
        if name == "RoomSearch" { return RoomSearch }
        if name == "RoomSocialImage" { return RoomSocialImage }
        if name == "RoomTiny" { return RoomTiny }
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
        if name == "UserNano" { return UserNano }
        if name == "UserPico" { return UserPico }
        if name == "UserStorage" { return UserStorage }
        if name == "Users" { return Users }
        if name == "AccountInviteJoin" { return AccountInviteJoin }
        if name == "AddAppToChat" { return AddAppToChat }
        if name == "AddComment" { return AddComment }
        if name == "AddStickerComment" { return AddStickerComment }
        if name == "AddToContacts" { return AddToContacts }
        if name == "BetaDiscoverSkip" { return BetaDiscoverSkip }
        if name == "BetaNextDiscoverReset" { return BetaNextDiscoverReset }
        if name == "BetaSubmitNextDiscover" { return BetaSubmitNextDiscover }
        if name == "BuyPremiumChatPass" { return BuyPremiumChatPass }
        if name == "BuyPremiumChatSubscription" { return BuyPremiumChatSubscription }
        if name == "CancelSubscription" { return CancelSubscription }
        if name == "CommentDeleteUrlAugmentation" { return CommentDeleteUrlAugmentation }
        if name == "CommentSetReaction" { return CommentSetReaction }
        if name == "CommentUnsetReaction" { return CommentUnsetReaction }
        if name == "CommitCardSetupIntent" { return CommitCardSetupIntent }
        if name == "ConferenceJoin" { return ConferenceJoin }
        if name == "ConferenceKeepAlive" { return ConferenceKeepAlive }
        if name == "ConferenceLeave" { return ConferenceLeave }
        if name == "CreateApp" { return CreateApp }
        if name == "CreateCardSetupIntent" { return CreateCardSetupIntent }
        if name == "CreateDepositIntent" { return CreateDepositIntent }
        if name == "CreateOrganization" { return CreateOrganization }
        if name == "DebugMails" { return DebugMails }
        if name == "DeleteComment" { return DeleteComment }
        if name == "DeleteNotification" { return DeleteNotification }
        if name == "DeleteOrganization" { return DeleteOrganization }
        if name == "DeleteUser" { return DeleteUser }
        if name == "DiscoverCollectionSetShortname" { return DiscoverCollectionSetShortname }
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
        if name == "GlobalEventBusPublish" { return GlobalEventBusPublish }
        if name == "MakeCardDefault" { return MakeCardDefault }
        if name == "MarkSequenceRead" { return MarkSequenceRead }
        if name == "MediaAnswer" { return MediaAnswer }
        if name == "MediaCandidate" { return MediaCandidate }
        if name == "MediaFailed" { return MediaFailed }
        if name == "MediaOffer" { return MediaOffer }
        if name == "MessageSetDonationReaction" { return MessageSetDonationReaction }
        if name == "MessageSetReaction" { return MessageSetReaction }
        if name == "MessageUnsetReaction" { return MessageUnsetReaction }
        if name == "MyNotificationCenterMarkSeqRead" { return MyNotificationCenterMarkSeqRead }
        if name == "OrganizationActivateByInvite" { return OrganizationActivateByInvite }
        if name == "OrganizationAddMember" { return OrganizationAddMember }
        if name == "OrganizationChangeMemberRole" { return OrganizationChangeMemberRole }
        if name == "OrganizationCreatePublicInvite" { return OrganizationCreatePublicInvite }
        if name == "OrganizationMemberRemove" { return OrganizationMemberRemove }
        if name == "PairEmail" { return PairEmail }
        if name == "PairPhone" { return PairPhone }
        if name == "PaymentIntentCancel" { return PaymentIntentCancel }
        if name == "PaymentIntentCommit" { return PaymentIntentCommit }
        if name == "PersistEvents" { return PersistEvents }
        if name == "PhonebookAdd" { return PhonebookAdd }
        if name == "PinMessage" { return PinMessage }
        if name == "PostCreateDraft" { return PostCreateDraft }
        if name == "PostDraftUpdate" { return PostDraftUpdate }
        if name == "PostPublish" { return PostPublish }
        if name == "ProfileCreate" { return ProfileCreate }
        if name == "ProfileUpdate" { return ProfileUpdate }
        if name == "ReadNotification" { return ReadNotification }
        if name == "RefreshAppToken" { return RefreshAppToken }
        if name == "RegisterPush" { return RegisterPush }
        if name == "RegisterWebPush" { return RegisterWebPush }
        if name == "RemoveCard" { return RemoveCard }
        if name == "RemoveFromContacts" { return RemoveFromContacts }
        if name == "ReportContent" { return ReportContent }
        if name == "ReportOnline" { return ReportOnline }
        if name == "RoomAddMembers" { return RoomAddMembers }
        if name == "RoomChangeRole" { return RoomChangeRole }
        if name == "RoomCreate" { return RoomCreate }
        if name == "RoomDelete" { return RoomDelete }
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
        if name == "SendEmailPairCode" { return SendEmailPairCode }
        if name == "SendMessage" { return SendMessage }
        if name == "SendPhonePairCode" { return SendPhonePairCode }
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
        if name == "conferenceAddScreenShare" { return conferenceAddScreenShare }
        if name == "conferenceAlterMediaState" { return conferenceAlterMediaState }
        if name == "conferenceRemoveScreenShare" { return conferenceRemoveScreenShare }
        if name == "conferenceRequestLocalMediaChange" { return conferenceRequestLocalMediaChange }
        if name == "ChatOnlinesCountWatch" { return ChatOnlinesCountWatch }
        if name == "ChatWatch" { return ChatWatch }
        if name == "CommentWatch" { return CommentWatch }
        if name == "ConferenceMediaWatch" { return ConferenceMediaWatch }
        if name == "ConferenceWatch" { return ConferenceWatch }
        if name == "DebugEventsWatch" { return DebugEventsWatch }
        if name == "DialogsWatch" { return DialogsWatch }
        if name == "GlobalEventBus" { return GlobalEventBus }
        if name == "MyNotificationsCenter" { return MyNotificationsCenter }
        if name == "OnlineWatch" { return OnlineWatch }
        if name == "SettingsWatch" { return SettingsWatch }
        if name == "TypingsWatch" { return TypingsWatch }
        if name == "WalletUpdates" { return WalletUpdates }
        fatalError("Unknown operation: " + name)
    }
}