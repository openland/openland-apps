private let AppChatSelector = obj(
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

private let AppFullSelector = obj(
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

private let OrganizationShortSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("alphaIsCommunity","isCommunity", notNull(scalar("Boolean"))),
            field("id","id", notNull(scalar("ID"))),
            field("name","name", notNull(scalar("String"))),
            field("photo","photo", scalar("String")),
            field("shortname","shortname", scalar("String"))
        )

private let UserShortSelector = obj(
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

private let UserBadgeSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("name","name", notNull(scalar("String"))),
            field("verified","verified", notNull(scalar("Boolean")))
        )

private let UserForMentionSelector = obj(
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

private let SpanFragmentSelector = obj(
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

private let QuotedMessageSelector = obj(
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

private let StickerFragmentSelector = obj(
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

private let UserTinySelector = obj(
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

private let FullMessageSelector = obj(
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

private let RoomShortSelector = obj(
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

private let ChatUpdateFragmentSelector = obj(
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

private let CommentEntryFragmentSelector = obj(
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

private let CommentUpdateFragmentSelector = obj(
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

private let CommunitySearchSelector = obj(
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

private let ConferenceFullSelector = obj(
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

private let ConferenceShortSelector = obj(
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

private let DaialogListMessageSelector = obj(
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

private let TinyMessageSelector = obj(
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

private let DialogUpdateFragmentSelector = obj(
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

private let FeedChannelFullSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("about","about", scalar("String")),
            field("id","id", notNull(scalar("ID"))),
            field("myRole","myRole", notNull(scalar("String"))),
            field("photo","photo", notNull(scalar("String"))),
            field("subscribed","subscribed", notNull(scalar("Boolean"))),
            field("subscribersCount","subscribersCount", notNull(scalar("Int"))),
            field("title","title", notNull(scalar("String")))
        )

private let FeedPostAuthorFragmentSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("User", obj(
                fragment("User", UserShortSelector)
            ))
        )

private let SlideFragmentSelector = obj(
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

private let FeedPostSourceFragmentSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            inline("FeedChannel", obj(
                fragment("FeedChannel", FeedChannelFullSelector)
            ))
        )

private let FeedItemFullSelector = obj(
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

private let FeedUpdateFragmentSelector = obj(
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

private let MatchmakingProfileFragmentSelector = obj(
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

private let MatchmakingRoomFragmentSelector = obj(
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

private let RoomNanoSelector = obj(
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

private let NotificationFragmentSelector = obj(
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
                    ))
                ))))),
            field("id","id", notNull(scalar("ID"))),
            field("text","text", scalar("String"))
        )

private let NotificationCenterUpdateFragmentSelector = obj(
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

private let UserFullSelector = obj(
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

private let OrganizationFullSelector = obj(
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

private let OrganizationMediumSelector = obj(
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

private let OrganizationProfileFullSelector = obj(
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

private let OrganizationSearchSelector = obj(
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

private let OrganizationWithoutMembersFragmentSelector = obj(
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

private let PlatformNotificationSettingsFullSelector = obj(
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

private let RoomFullSelector = obj(
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

private let RoomFullWithoutMembersSelector = obj(
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

private let SessionStateFullSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("isAccountActivated","isAccountActivated", notNull(scalar("Boolean"))),
            field("isAccountExists","isAccountExists", notNull(scalar("Boolean"))),
            field("isAccountPicked","isAccountPicked", notNull(scalar("Boolean"))),
            field("isBlocked","isBlocked", notNull(scalar("Boolean"))),
            field("isCompleted","isCompleted", notNull(scalar("Boolean"))),
            field("isLoggedIn","isLoggedIn", notNull(scalar("Boolean"))),
            field("isProfileCreated","isProfileCreated", notNull(scalar("Boolean")))
        )

private let SettingsFullSelector = obj(
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

private let StickerPackFragmentSelector = obj(
            field("__typename","__typename", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("stickers","stickers", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Sticker", StickerFragmentSelector)
                ))))),
            field("title","title", notNull(scalar("String")))
        )

private let AccountSelector = obj(
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
private let AccountAppInviteSelector = obj(
            field("appInvite","invite", notNull(scalar("String")))
        )
private let AccountAppInviteInfoSelector = obj(
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
private let AccountInviteInfoSelector = obj(
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
private let AccountSettingsSelector = obj(
            field("me","me", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("audienceSize","audienceSize", notNull(scalar("Int"))),
                    fragment("User", UserShortSelector)
                )),
            field("myOrganizations","organizations", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                )))))
        )
private let AvailableRoomsSelector = obj(
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
private let ChatInitSelector = obj(
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
private let ChatInitFromUnreadSelector = obj(
            field("conversationState","state", arguments(fieldValue("id", refValue("chatId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("state","state", scalar("String"))
                ))),
            field("gammaMessages","gammaMessages", arguments(fieldValue("before", refValue("before")), fieldValue("chatId", refValue("chatId")), fieldValue("first", refValue("first"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("haveMoreBackward","haveMoreBackward", scalar("Boolean")),
                    field("haveMoreForward","haveMoreForward", scalar("Boolean")),
                    field("messages","messages", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("ModernMessage", FullMessageSelector)
                        )))))
                )),
            field("lastReadedMessage","lastReadedMessage", arguments(fieldValue("chatId", refValue("chatId"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                )),
            field("room","room", arguments(fieldValue("id", refValue("chatId"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                ))
        )
private let ChatMembersSearchSelector = obj(
            field("chatMembersSearch","members", arguments(fieldValue("after", refValue("after")), fieldValue("cid", refValue("cid")), fieldValue("first", refValue("first")), fieldValue("query", refValue("query"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("edges","edges", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("cursor","cursor", notNull(scalar("String"))),
                            field("node","user", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("id","id", notNull(scalar("ID"))),
                                    field("name","name", notNull(scalar("String"))),
                                    field("photo","photo", scalar("String")),
                                    field("primaryOrganization","primaryOrganization", obj(
                                            field("__typename","__typename", notNull(scalar("String"))),
                                            field("id","id", notNull(scalar("ID"))),
                                            field("name","name", notNull(scalar("String")))
                                        )),
                                    field("shortname","shortname", scalar("String"))
                                )))
                        ))))),
                    field("pageInfo","pageInfo", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("hasNextPage","hasNextPage", notNull(scalar("Boolean")))
                        )))
                )))
        )
private let CommentsSelector = obj(
            field("comments","comments", arguments(fieldValue("peerId", refValue("peerId"))), notNull(obj(
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
private let ConferenceSelector = obj(
            field("conference","conference", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceFullSelector)
                )))
        )
private let ConferenceMediaSelector = obj(
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
private let DialogsSelector = obj(
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
private let DiscoverIsDoneSelector = obj(
            field("betaIsDiscoverDone","betaIsDiscoverDone", notNull(scalar("Boolean")))
        )
private let DiscoverNextPageSelector = obj(
            field("gammaNextDiscoverPage","betaNextDiscoverPage", arguments(fieldValue("excudedGroupsIds", refValue("excudedGroupsIds")), fieldValue("selectedTagsIds", refValue("selectedTagsIds"))), obj(
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
private let ExploreCommunitySelector = obj(
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
private let ExplorePeopleSelector = obj(
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
private let FeatureFlagsSelector = obj(
            field("featureFlags","featureFlags", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("title","title", notNull(scalar("String")))
                )))))
        )
private let FeedSelector = obj(
            field("alphaHomeFeed","feed", arguments(fieldValue("after", refValue("after")), fieldValue("first", refValue("first"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("cursor","cursor", scalar("String")),
                    field("items","items", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("FeedItem", FeedItemFullSelector)
                        )))))
                )))
        )
private let FeedChannelSelector = obj(
            field("alphaFeedChannel","channel", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("FeedChannel", FeedChannelFullSelector)
                )))
        )
private let FeedChannelContentSelector = obj(
            field("alphaFeedChannelContent","content", arguments(fieldValue("after", refValue("after")), fieldValue("first", refValue("first")), fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("cursor","cursor", scalar("String")),
                    field("items","items", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("FeedItem", FeedItemFullSelector)
                        )))))
                )))
        )
private let FeedChannelsSearchSelector = obj(
            field("alphaFeedChannelSearch","search", arguments(fieldValue("after", refValue("after")), fieldValue("first", refValue("first")), fieldValue("query", refValue("query")), fieldValue("sort", refValue("sort"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("edges","edges", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("cursor","cursor", notNull(scalar("String"))),
                            field("node","node", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("FeedChannel", FeedChannelFullSelector)
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
private let FeedItemSelector = obj(
            field("alphaFeedItem","item", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("FeedItem", FeedItemFullSelector)
                ))
        )
private let FeedMyChannelsSelector = obj(
            field("alphaFeedMyChannels","channels", arguments(fieldValue("after", refValue("after")), fieldValue("first", refValue("first"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("cursor","cursor", scalar("String")),
                    field("items","items", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("FeedChannel", FeedChannelFullSelector)
                        )))))
                )))
        )
private let FetchPushSettingsSelector = obj(
            field("pushSettings","pushSettings", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("webPushKey","webPushKey", scalar("String"))
                )))
        )
private let GlobalCounterSelector = obj(
            field("alphaNotificationCounter","alphaNotificationCounter", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("unreadCount","unreadCount", notNull(scalar("Int")))
                )))
        )
private let GlobalSearchSelector = obj(
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
private let MatchmakingRoomSelector = obj(
            field("matchmakingRoom","matchmakingRoom", arguments(fieldValue("peerId", refValue("peerId"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("MatchmakingRoom", MatchmakingRoomFragmentSelector)
                ))
        )
private let MessageSelector = obj(
            field("message","message", arguments(fieldValue("messageId", refValue("messageId"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
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
                    fragment("ModernMessage", FullMessageSelector)
                ))
        )
private let MessagesBatchSelector = obj(
            field("conversationState","state", arguments(fieldValue("id", refValue("chatId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("state","state", scalar("String"))
                ))),
            field("gammaMessages","gammaMessages", arguments(fieldValue("after", refValue("after")), fieldValue("before", refValue("before")), fieldValue("chatId", refValue("chatId")), fieldValue("first", refValue("first"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("haveMoreBackward","haveMoreBackward", scalar("Boolean")),
                    field("haveMoreForward","haveMoreForward", scalar("Boolean")),
                    field("messages","messages", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("ModernMessage", FullMessageSelector)
                        )))))
                ))
        )
private let MessagesSearchSelector = obj(
            field("messagesSearch","messagesSearch", arguments(fieldValue("after", refValue("after")), fieldValue("first", refValue("first")), fieldValue("query", refValue("query")), fieldValue("sort", refValue("sort"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("edges","edges", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("cursor","cursor", notNull(scalar("String"))),
                            field("node","node", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("chat","chat", notNull(obj(
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
                                                field("canEdit","canEdit", notNull(scalar("Boolean"))),
                                                field("id","id", notNull(scalar("ID"))),
                                                field("isChannel","isChannel", notNull(scalar("Boolean"))),
                                                field("kind","kind", notNull(scalar("String"))),
                                                field("membership","membership", notNull(scalar("String"))),
                                                field("photo","photo", notNull(scalar("String"))),
                                                field("role","role", notNull(scalar("String"))),
                                                field("title","title", notNull(scalar("String")))
                                            ))
                                        ))),
                                    field("message","message", notNull(obj(
                                            field("__typename","__typename", notNull(scalar("String"))),
                                            field("date","date", notNull(scalar("Date"))),
                                            field("fallback","fallback", notNull(scalar("String"))),
                                            field("id","id", notNull(scalar("ID"))),
                                            field("message","message", scalar("String")),
                                            field("sender","sender", notNull(obj(
                                                    field("__typename","__typename", notNull(scalar("String"))),
                                                    field("firstName","firstName", notNull(scalar("String"))),
                                                    field("id","id", notNull(scalar("ID"))),
                                                    field("name","name", notNull(scalar("String"))),
                                                    field("photo","photo", scalar("String"))
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
                                        )))
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
private let MyAppsSelector = obj(
            field("myApps","apps", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                )))))
        )
private let MyNotificationCenterSelector = obj(
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
private let MyNotificationsSelector = obj(
            field("myNotifications","myNotifications", arguments(fieldValue("before", refValue("before")), fieldValue("first", refValue("first"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("cursor","cursor", scalar("String")),
                    field("items","items", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("Notification", NotificationFragmentSelector)
                        )))))
                )))
        )
private let MyOrganizationsSelector = obj(
            field("myOrganizations","myOrganizations", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("betaIsPrimary","isPrimary", notNull(scalar("Boolean"))),
                    fragment("Organization", OrganizationShortSelector)
                )))))
        )
private let MyStickersSelector = obj(
            field("myStickers","stickers", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("packs","packs", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("stickers","stickers", notNull(list(notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("Sticker", StickerFragmentSelector)
                                ))))),
                            field("title","title", notNull(scalar("String")))
                        )))))
                )))
        )
private let MySuccessfulInvitesCountSelector = obj(
            field("mySuccessfulInvitesCount","mySuccessfulInvitesCount", notNull(scalar("Int")))
        )
private let OnlineSelector = obj(
            field("user","user", arguments(fieldValue("id", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("lastSeen","lastSeen", scalar("String")),
                    field("online","online", notNull(scalar("Boolean")))
                )))
        )
private let OrganizationSelector = obj(
            field("organization","organization", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationFullSelector)
                )))
        )
private let OrganizationByPrefixSelector = obj(
            field("alphaOrganizationByPrefix","organizationByPrefix", arguments(fieldValue("query", refValue("query"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationSearchSelector)
                ))
        )
private let OrganizationMembersSelector = obj(
            field("organization","organization", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("alphaOrganizationMembers","members", arguments(fieldValue("after", refValue("after")), fieldValue("first", refValue("first"))), notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("role","role", notNull(scalar("String"))),
                            field("user","user", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("User", UserShortSelector)
                                )))
                        ))))),
                    field("id","id", notNull(scalar("ID")))
                )))
        )
private let OrganizationMembersShortSelector = obj(
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
private let OrganizationProfileSelector = obj(
            field("organizationProfile","organizationProfile", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("OrganizationProfile", OrganizationProfileFullSelector)
                )))
        )
private let OrganizationPublicInviteSelector = obj(
            field("alphaOrganizationInviteLink","publicInvite", arguments(fieldValue("organizationId", refValue("organizationId"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("ttl","ttl", scalar("String"))
                ))
        )
private let OrganizationWithoutMembersSelector = obj(
            field("organization","organization", arguments(fieldValue("id", refValue("organizationId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationWithoutMembersFragmentSelector)
                )))
        )
private let PermissionsSelector = obj(
            field("myPermissions","myPermissions", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("roles","roles", notNull(list(notNull(scalar("String")))))
                )))
        )
private let ProfileSelector = obj(
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
                    field("alphaRole","role", scalar("String")),
                    field("email","email", scalar("String")),
                    field("facebook","facebook", scalar("String")),
                    field("firstName","firstName", scalar("String")),
                    field("id","id", notNull(scalar("ID"))),
                    field("instagram","instagram", scalar("String")),
                    field("lastName","lastName", scalar("String")),
                    field("linkedin","linkedin", scalar("String")),
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
                    field("primaryOrganization","primaryOrganization", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("membersCount","membersCount", notNull(scalar("Int"))),
                            field("name","name", notNull(scalar("String")))
                        )),
                    field("twitter","twitter", scalar("String")),
                    field("website","website", scalar("String"))
                ))
        )
private let ProfilePrefillSelector = obj(
            field("myProfilePrefill","prefill", obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("firstName","firstName", scalar("String")),
                    field("lastName","lastName", scalar("String")),
                    field("picture","picture", scalar("String"))
                ))
        )
private let ResolveShortNameSelector = obj(
            field("alphaResolveShortName","item", arguments(fieldValue("shortname", refValue("shortname"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("User", obj(
                        field("id","id", notNull(scalar("ID")))
                    )),
                    inline("Organization", obj(
                        field("id","id", notNull(scalar("ID")))
                    ))
                ))
        )
private let ResolvedInviteSelector = obj(
            field("alphaResolveInvite","invite", arguments(fieldValue("key", refValue("key"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("InviteInfo", obj(
                        field("creator","creator", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            )),
                        field("id","id", notNull(scalar("ID"))),
                        field("orgId","orgId", notNull(scalar("ID"))),
                        field("organization","organization", obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("about","about", scalar("String")),
                                field("alphaIsCommunity","isCommunity", notNull(scalar("Boolean"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("membersCount","membersCount", notNull(scalar("Int"))),
                                field("name","name", notNull(scalar("String"))),
                                field("photo","photo", scalar("String"))
                            )),
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
                                    field("matchmaking","matchmaking", obj(
                                            field("__typename","__typename", notNull(scalar("String"))),
                                            field("enabled","enabled", notNull(scalar("Boolean")))
                                        )),
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
private let RoomSelector = obj(
            field("room","room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                ))
        )
private let RoomChatSelector = obj(
            field("room","room", arguments(fieldValue("id", refValue("id"))), obj(
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
                                field("id","id", notNull(scalar("ID"))),
                                field("isBot","isBot", notNull(scalar("Boolean"))),
                                field("name","name", notNull(scalar("String"))),
                                field("photo","photo", scalar("String")),
                                field("primaryOrganization","primaryOrganization", obj(
                                        field("__typename","__typename", notNull(scalar("String"))),
                                        field("id","id", notNull(scalar("ID"))),
                                        field("name","name", notNull(scalar("String")))
                                    )),
                                field("shortname","shortname", scalar("String"))
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
                        field("settings","settings", notNull(obj(
                                field("__typename","__typename", notNull(scalar("String"))),
                                field("id","id", notNull(scalar("ID"))),
                                field("mute","mute", scalar("Boolean"))
                            ))),
                        field("title","title", notNull(scalar("String")))
                    ))
                ))
        )
private let RoomFeaturedMembersSelector = obj(
            field("roomFeaturedMembers","roomFeaturedMembers", arguments(fieldValue("roomId", refValue("roomId"))), notNull(list(notNull(obj(
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
private let RoomInviteInfoSelector = obj(
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
                                field("matchmaking","matchmaking", obj(
                                        field("__typename","__typename", notNull(scalar("String"))),
                                        field("enabled","enabled", notNull(scalar("Boolean")))
                                    )),
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
private let RoomInviteLinkSelector = obj(
            field("betaRoomInviteLink","link", arguments(fieldValue("roomId", refValue("roomId"))), notNull(scalar("String")))
        )
private let RoomMembersSelector = obj(
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
private let RoomMembersPaginatedSelector = obj(
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
private let RoomMembersShortSelector = obj(
            field("roomMembers","members", arguments(fieldValue("roomId", refValue("roomId"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("user","user", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID")))
                        )))
                )))))
        )
private let RoomMembersTinySelector = obj(
            field("roomMembers","members", arguments(fieldValue("roomId", refValue("roomId"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("user","user", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String"))),
                            field("photo","photo", scalar("String")),
                            field("primaryOrganization","primaryOrganization", obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    field("id","id", notNull(scalar("ID"))),
                                    field("name","name", notNull(scalar("String")))
                                )),
                            field("shortname","shortname", scalar("String"))
                        )))
                )))))
        )
private let RoomOrganizationAdminMembersSelector = obj(
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
private let RoomPicoSelector = obj(
            field("room","room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomNanoSelector)
                ))
        )
private let RoomSearchSelector = obj(
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
private let RoomSuperSelector = obj(
            field("roomSuper","roomSuper", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("featured","featured", notNull(scalar("Boolean"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("listed","listed", notNull(scalar("Boolean")))
                ))
        )
private let RoomTinySelector = obj(
            field("room","room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                ))
        )
private let RoomWithoutMembersSelector = obj(
            field("room","room", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullWithoutMembersSelector)
                ))
        )
private let SettingsSelector = obj(
            field("settings","settings", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Settings", SettingsFullSelector)
                )))
        )
private let StickerPackSelector = obj(
            field("stickerPack","stickerPack", arguments(fieldValue("id", refValue("id"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("StickerPack", StickerPackFragmentSelector)
                ))
        )
private let SuggestedRoomsSelector = obj(
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
private let SuperAccountSelector = obj(
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
private let SuperAccountsSelector = obj(
            field("superAccounts","superAccounts", notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("createdAt","createdAt", scalar("String")),
                    field("id","id", notNull(scalar("ID"))),
                    field("orgId","orgId", notNull(scalar("ID"))),
                    field("state","state", notNull(scalar("String"))),
                    field("title","title", notNull(scalar("String")))
                )))))
        )
private let SuperAdminsSelector = obj(
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
private let SuperBadgeInRoomSelector = obj(
            field("superBadgeInRoom","superBadgeInRoom", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                ))
        )
private let UserSelector = obj(
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
                    field("chatsWithBadge","chatsWithBadge", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("badge","badge", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("UserBadge", UserBadgeSelector)
                                ))),
                            field("chat","chat", notNull(obj(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("Room", RoomShortSelector)
                                )))
                        ))))),
                    fragment("User", UserFullSelector)
                )))
        )
private let UserAvailableRoomsSelector = obj(
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
private let UserStorageSelector = obj(
            field("userStorage","userStorage", arguments(fieldValue("keys", refValue("keys")), fieldValue("namespace", refValue("namespace"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("value","value", scalar("String"))
                )))))
        )
private let UsersSelector = obj(
            field("users","items", arguments(fieldValue("query", refValue("query"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("email","subtitle", scalar("String")),
                    field("id","id", notNull(scalar("ID"))),
                    field("name","title", notNull(scalar("String")))
                )))))
        )
private let AccountInviteJoinSelector = obj(
            field("alphaJoinInvite","alphaJoinInvite", arguments(fieldValue("key", refValue("inviteKey"))), notNull(scalar("ID")))
        )
private let AddAppToChatSelector = obj(
            field("addAppToChat","addAppToChat", arguments(fieldValue("appId", refValue("appId")), fieldValue("chatId", refValue("chatId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("AppChat", AppChatSelector)
                )))
        )
private let AddCommentSelector = obj(
            field("betaAddComment","betaAddComment", arguments(fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("mentions", refValue("mentions")), fieldValue("message", refValue("message")), fieldValue("peerId", refValue("peerId")), fieldValue("repeatKey", refValue("repeatKey")), fieldValue("replyComment", refValue("replyComment")), fieldValue("spans", refValue("spans"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                )))
        )
private let AddStickerCommentSelector = obj(
            field("betaAddStickerComment","addStickerComment", arguments(fieldValue("peerId", refValue("peerId")), fieldValue("repeatKey", refValue("repeatKey")), fieldValue("replyComment", refValue("replyComment")), fieldValue("stickerId", refValue("stickerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                )))
        )
private let BetaDiscoverSkipSelector = obj(
            field("betaDiscoverSkip","betaDiscoverSkip", arguments(fieldValue("selectedTagsIds", refValue("selectedTagsIds"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("tagGroup","tagGroup", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("String")))
                        ))
                ))
        )
private let BetaNextDiscoverResetSelector = obj(
            field("betaNextDiscoverReset","betaNextDiscoverReset", notNull(scalar("Boolean")))
        )
private let BetaSubmitNextDiscoverSelector = obj(
            field("betaSubmitNextDiscover","betaSubmitNextDiscover", arguments(fieldValue("excudedGroupsIds", refValue("excudedGroupsIds")), fieldValue("selectedTagsIds", refValue("selectedTagsIds"))), obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("tagGroup","tagGroup", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("String")))
                        ))
                ))
        )
private let CommentSetReactionSelector = obj(
            field("commentReactionAdd","commentReactionAdd", arguments(fieldValue("commentId", refValue("commentId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
private let CommentUnsetReactionSelector = obj(
            field("commentReactionRemove","commentReactionRemove", arguments(fieldValue("commentId", refValue("commentId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
private let ConferenceAnswerSelector = obj(
            field("peerConnectionAnswer","peerConnectionAnswer", arguments(fieldValue("answer", refValue("answer")), fieldValue("id", refValue("id")), fieldValue("ownPeerId", refValue("ownPeerId")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
private let ConferenceCandidateSelector = obj(
            field("peerConnectionCandidate","peerConnectionCandidate", arguments(fieldValue("candidate", refValue("candidate")), fieldValue("id", refValue("id")), fieldValue("ownPeerId", refValue("ownPeerId")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
private let ConferenceJoinSelector = obj(
            field("conferenceJoin","conferenceJoin", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("conference","conference", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("Conference", ConferenceShortSelector)
                        ))),
                    field("peerId","peerId", notNull(scalar("ID")))
                )))
        )
private let ConferenceKeepAliveSelector = obj(
            field("conferenceKeepAlive","conferenceKeepAlive", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
private let ConferenceLeaveSelector = obj(
            field("conferenceLeave","conferenceLeave", arguments(fieldValue("id", refValue("id")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
private let ConferenceOfferSelector = obj(
            field("peerConnectionOffer","peerConnectionOffer", arguments(fieldValue("id", refValue("id")), fieldValue("offer", refValue("offer")), fieldValue("ownPeerId", refValue("ownPeerId")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceShortSelector)
                )))
        )
private let CreateAppSelector = obj(
            field("createApp","createApp", arguments(fieldValue("about", refValue("about")), fieldValue("name", refValue("name")), fieldValue("photoRef", refValue("photoRef")), fieldValue("shortname", refValue("shortname"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                )))
        )
private let CreateOrganizationSelector = obj(
            field("createOrganization","organization", arguments(fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("name","name", notNull(scalar("String")))
                )))
        )
private let CreateUserProfileAndOrganizationSelector = obj(
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
private let DebugMailsSelector = obj(
            field("debugSendEmail","debugSendEmail", arguments(fieldValue("type", refValue("type"))), scalar("Boolean"))
        )
private let DeleteCommentSelector = obj(
            field("deleteComment","deleteComment", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
private let DeleteNotificationSelector = obj(
            field("deleteNotification","deleteNotification", arguments(fieldValue("notificationId", refValue("notificationId"))), notNull(scalar("Boolean")))
        )
private let DeleteOrganizationSelector = obj(
            field("deleteOrganization","deleteOrganization", arguments(fieldValue("id", refValue("organizationId"))), notNull(scalar("Boolean")))
        )
private let DeleteUserSelector = obj(
            field("superDeleteUser","superDeleteUser", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
private let EditCommentSelector = obj(
            field("editComment","editComment", arguments(fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("id", refValue("id")), fieldValue("mentions", refValue("mentions")), fieldValue("message", refValue("message")), fieldValue("spans", refValue("spans"))), notNull(scalar("Boolean")))
        )
private let EditMessageSelector = obj(
            field("editMessage","editMessage", arguments(fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("mentions", refValue("mentions")), fieldValue("message", refValue("message")), fieldValue("messageId", refValue("messageId")), fieldValue("replyMessages", refValue("replyMessages")), fieldValue("spans", refValue("spans"))), notNull(scalar("Boolean")))
        )
private let FeatureFlagAddSelector = obj(
            field("featureFlagAdd","featureFlagAdd", arguments(fieldValue("key", refValue("key")), fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("title","title", notNull(scalar("String")))
                )))
        )
private let FeatureFlagDisableSelector = obj(
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
private let FeatureFlagEnableSelector = obj(
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
private let FeedChannelAddEditorSelector = obj(
            field("alphaFeedChannelAddEditor","alphaFeedChannelAddEditor", arguments(fieldValue("id", refValue("id")), fieldValue("userId", refValue("userId"))), notNull(scalar("Boolean")))
        )
private let FeedChannelCreateSelector = obj(
            field("alphaFeedCreateChannel","channel", arguments(fieldValue("about", refValue("about")), fieldValue("global", refValue("global")), fieldValue("photoRef", refValue("photoRef")), fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                )))
        )
private let FeedChannelRemoveEditorSelector = obj(
            field("alphaFeedChannelRemoveEditor","alphaFeedChannelRemoveEditor", arguments(fieldValue("id", refValue("id")), fieldValue("userId", refValue("userId"))), notNull(scalar("Boolean")))
        )
private let FeedChannelSubscribeSelector = obj(
            field("alphaFeedChannelSubscribe","alphaFeedChannelSubscribe", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
private let FeedChannelUnsubscribeSelector = obj(
            field("alphaFeedChannelUnsubscribe","alphaFeedChannelUnsubscribe", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
private let FeedChannelUpdateSelector = obj(
            field("alphaFeedUpdateChannel","channel", arguments(fieldValue("about", refValue("about")), fieldValue("global", refValue("global")), fieldValue("id", refValue("id")), fieldValue("photoRef", refValue("photoRef")), fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                )))
        )
private let FeedCreatePostSelector = obj(
            field("alphaCreateFeedPost","post", arguments(fieldValue("channel", refValue("channel")), fieldValue("repeatKey", refValue("repeatKey")), fieldValue("slides", refValue("slides"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("FeedItem", FeedItemFullSelector)
                )))
        )
private let FeedDeletePostSelector = obj(
            field("alphaDeleteFeedPost","alphaDeleteFeedPost", arguments(fieldValue("feedItemId", refValue("feedItemId"))), notNull(scalar("Boolean")))
        )
private let FeedEditPostSelector = obj(
            field("alphaEditFeedPost","editFeedPost", arguments(fieldValue("feedItemId", refValue("feedItemId")), fieldValue("slides", refValue("slides"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("FeedItem", FeedItemFullSelector)
                )))
        )
private let FeedReactionAddSelector = obj(
            field("feedReactionAdd","feedReactionAdd", arguments(fieldValue("feedItemId", refValue("feedItemId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
private let FeedReactionRemoveSelector = obj(
            field("feedReactionRemove","feedReactionRemove", arguments(fieldValue("feedItemId", refValue("feedItemId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
private let MarkSequenceReadSelector = obj(
            field("alphaGlobalRead","alphaGlobalRead", arguments(fieldValue("toSeq", refValue("seq"))), notNull(scalar("String")))
        )
private let MatchmakingConnectSelector = obj(
            field("matchmakingConnect","matchmakingConnect", arguments(fieldValue("peerId", refValue("peerId")), fieldValue("uid", refValue("uid"))), notNull(scalar("Boolean")))
        )
private let MatchmakingProfileFillSelector = obj(
            field("matchmakingProfileFill","matchmakingProfileFill", arguments(fieldValue("input", refValue("input")), fieldValue("peerId", refValue("peerId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("MatchmakingProfile", MatchmakingProfileFragmentSelector)
                )))
        )
private let MediaAnswerSelector = obj(
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
private let MediaCandidateSelector = obj(
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
private let MediaFailedSelector = obj(
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
private let MediaNegotiationNeededSelector = obj(
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
private let MediaOfferSelector = obj(
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
private let MessageSetReactionSelector = obj(
            field("messageReactionAdd","messageReactionAdd", arguments(fieldValue("messageId", refValue("messageId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
private let MessageUnsetReactionSelector = obj(
            field("messageReactionRemove","messageReactionRemove", arguments(fieldValue("messageId", refValue("messageId")), fieldValue("reaction", refValue("reaction"))), notNull(scalar("Boolean")))
        )
private let MyNotificationCenterMarkSeqReadSelector = obj(
            field("notificationCenterMarkSeqRead","notificationCenterMarkSeqRead", arguments(fieldValue("toSeq", refValue("seq"))), notNull(scalar("Boolean")))
        )
private let OrganizationActivateByInviteSelector = obj(
            field("joinAppInvite","joinAppInvite", arguments(fieldValue("key", refValue("inviteKey"))), notNull(scalar("ID")))
        )
private let OrganizationAddMemberSelector = obj(
            field("alphaOrganizationMemberAdd","alphaOrganizationMemberAdd", arguments(fieldValue("organizationId", refValue("organizationId")), fieldValue("userIds", refValue("userIds"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("role","role", notNull(scalar("String"))),
                    field("user","user", notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))
                )))))
        )
private let OrganizationAlterPublishedSelector = obj(
            field("alphaAlterPublished","alphaAlterPublished", arguments(fieldValue("id", refValue("organizationId")), fieldValue("published", refValue("published"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationSearchSelector)
                )))
        )
private let OrganizationChangeMemberRoleSelector = obj(
            field("alphaOrganizationChangeMemberRole","alphaOrganizationChangeMemberRole", arguments(fieldValue("memberId", refValue("memberId")), fieldValue("newRole", refValue("newRole")), fieldValue("organizationId", refValue("organizationId"))), notNull(scalar("String")))
        )
private let OrganizationCreatePublicInviteSelector = obj(
            field("alphaOrganizationRefreshInviteLink","alphaOrganizationRefreshInviteLink", arguments(fieldValue("expirationDays", refValue("expirationDays")), fieldValue("organizationId", refValue("organizationId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("ttl","ttl", scalar("String"))
                )))
        )
private let OrganizationMemberRemoveSelector = obj(
            field("betaOrganizationMemberRemove","betaOrganizationMemberRemove", arguments(fieldValue("organizationId", refValue("organizationId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                )))
        )
private let PersistEventsSelector = obj(
            field("track","track", arguments(fieldValue("did", refValue("did")), fieldValue("events", refValue("events")), fieldValue("isProd", refValue("isProd"))), notNull(scalar("String")))
        )
private let PinMessageSelector = obj(
            field("gammaPinMessage","pinMessage", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("messageId", refValue("messageId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))
        )
private let ProfileCreateSelector = obj(
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
private let ProfileUpdateSelector = obj(
            field("profileUpdate","profileUpdate", arguments(fieldValue("input", refValue("input")), fieldValue("uid", refValue("uid"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("about","about", scalar("String")),
                    field("alphaInvitedBy","invitedBy", obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String")))
                        )),
                    field("alphaJoinedAt","joinedAt", scalar("String")),
                    field("alphaPrimaryOrganizationId","primaryOrganizationId", scalar("ID")),
                    field("alphaRole","role", scalar("String")),
                    field("email","email", scalar("String")),
                    field("facebook","facebook", scalar("String")),
                    field("firstName","firstName", scalar("String")),
                    field("id","id", notNull(scalar("ID"))),
                    field("instagram","instagram", scalar("String")),
                    field("lastName","lastName", scalar("String")),
                    field("linkedin","linkedin", scalar("String")),
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
                    field("twitter","twitter", scalar("String")),
                    field("website","website", scalar("String"))
                )))
        )
private let ReadNotificationSelector = obj(
            field("readNotification","readNotification", arguments(fieldValue("notificationId", refValue("notificationId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("unread","unread", notNull(scalar("Int")))
                )))
        )
private let RefreshAppTokenSelector = obj(
            field("refreshAppToken","refreshAppToken", arguments(fieldValue("appId", refValue("appId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                )))
        )
private let RegisterPushSelector = obj(
            field("registerPush","registerPush", arguments(fieldValue("endpoint", refValue("endpoint")), fieldValue("type", refValue("type"))), notNull(scalar("String")))
        )
private let RegisterWebPushSelector = obj(
            field("registerWebPush","registerWebPush", arguments(fieldValue("endpoint", refValue("endpoint"))), notNull(scalar("String")))
        )
private let ReportContentSelector = obj(
            field("reportContent","reportContent", arguments(fieldValue("contentId", refValue("contentId")), fieldValue("message", refValue("message")), fieldValue("type", refValue("type"))), scalar("Boolean"))
        )
private let ReportOnlineSelector = obj(
            field("presenceReportOnline","presenceReportOnline", arguments(fieldValue("active", refValue("active")), fieldValue("platform", refValue("platform")), fieldValue("timeout", intValue(5000))), notNull(scalar("String")))
        )
private let RoomAddMembersSelector = obj(
            field("alphaRoomInvite","alphaRoomInvite", arguments(fieldValue("invites", refValue("invites")), fieldValue("roomId", refValue("roomId"))), notNull(list(notNull(obj(
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
private let RoomAlterFeaturedSelector = obj(
            field("betaRoomAlterFeatured","betaRoomAlterFeatured", arguments(fieldValue("featured", refValue("featured")), fieldValue("roomId", refValue("roomId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("featured","featured", notNull(scalar("Boolean"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("listed","listed", notNull(scalar("Boolean")))
                )))
        )
private let RoomAlterHiddenSelector = obj(
            field("betaRoomAlterListed","betaRoomAlterListed", arguments(fieldValue("listed", refValue("listed")), fieldValue("roomId", refValue("roomId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("featured","featured", notNull(scalar("Boolean"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("listed","listed", notNull(scalar("Boolean")))
                )))
        )
private let RoomChangeRoleSelector = obj(
            field("betaRoomChangeRole","betaRoomChangeRole", arguments(fieldValue("newRole", refValue("newRole")), fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                )))
        )
private let RoomCreateSelector = obj(
            field("betaRoomCreate","room", arguments(fieldValue("channel", refValue("channel")), fieldValue("description", refValue("description")), fieldValue("kind", refValue("kind")), fieldValue("members", refValue("members")), fieldValue("message", refValue("message")), fieldValue("organizationId", refValue("organizationId")), fieldValue("photoRef", refValue("photoRef")), fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                )))
        )
private let RoomDeleteMessageSelector = obj(
            field("betaMessageDelete","betaMessageDelete", arguments(fieldValue("mid", refValue("messageId"))), notNull(scalar("Boolean")))
        )
private let RoomDeleteMessagesSelector = obj(
            field("betaMessageDelete","betaMessageDelete", arguments(fieldValue("mids", refValue("mids"))), notNull(scalar("Boolean")))
        )
private let RoomDeleteUrlAugmentationSelector = obj(
            field("betaMessageDeleteAugmentation","betaMessageDeleteAugmentation", arguments(fieldValue("mid", refValue("messageId"))), notNull(scalar("Boolean")))
        )
private let RoomJoinSelector = obj(
            field("betaRoomJoin","join", arguments(fieldValue("roomId", refValue("roomId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                )))
        )
private let RoomJoinInviteLinkSelector = obj(
            field("betaRoomInviteLinkJoin","join", arguments(fieldValue("invite", refValue("invite"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                )))
        )
private let RoomKickSelector = obj(
            field("betaRoomKick","betaRoomKick", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                )))
        )
private let RoomLeaveSelector = obj(
            field("betaRoomLeave","betaRoomLeave", arguments(fieldValue("roomId", refValue("roomId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                )))
        )
private let RoomReadSelector = obj(
            field("roomRead","roomRead", arguments(fieldValue("id", refValue("id")), fieldValue("mid", refValue("mid"))), notNull(scalar("Boolean")))
        )
private let RoomRenewInviteLinkSelector = obj(
            field("betaRoomInviteLinkRenew","link", arguments(fieldValue("roomId", refValue("roomId"))), notNull(scalar("String")))
        )
private let RoomSettingsUpdateSelector = obj(
            field("betaRoomUpdateUserNotificationSettings","betaRoomUpdateUserNotificationSettings", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("settings", refValue("settings"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("mute","mute", scalar("Boolean"))
                )))
        )
private let RoomUpdateSelector = obj(
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
private let RoomsInviteUserSelector = obj(
            field("betaRoomsInviteUser","rooms", arguments(fieldValue("roomIds", refValue("roomIds")), fieldValue("userId", refValue("userId"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))))
        )
private let RoomsJoinSelector = obj(
            field("betaRoomsJoin","join", arguments(fieldValue("roomsIds", refValue("roomsIds"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))))
        )
private let SendMessageSelector = obj(
            field("sendMessage","sentMessage", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("fileAttachments", refValue("fileAttachments")), fieldValue("mentions", refValue("mentions")), fieldValue("message", refValue("message")), fieldValue("repeatKey", refValue("repeatKey")), fieldValue("replyMessages", refValue("replyMessages")), fieldValue("spans", refValue("spans"))), notNull(scalar("Boolean")))
        )
private let SendStickerSelector = obj(
            field("sendSticker","sendSticker", arguments(fieldValue("chatId", refValue("chatId")), fieldValue("repeatKey", refValue("repeatKey")), fieldValue("replyMessages", refValue("replyMessages")), fieldValue("stickerId", refValue("stickerId"))), notNull(scalar("Boolean")))
        )
private let SetOrgShortnameSelector = obj(
            field("alphaSetOrgShortName","alphaSetOrgShortName", arguments(fieldValue("id", refValue("organizationId")), fieldValue("shortname", refValue("shortname"))), scalar("String"))
        )
private let SetTypingSelector = obj(
            field("typingSend","typingSend", arguments(fieldValue("conversationId", refValue("conversationId")), fieldValue("type", stringValue("TEXT"))), notNull(scalar("String")))
        )
private let SetUserShortnameSelector = obj(
            field("alphaSetUserShortName","alphaSetUserShortName", arguments(fieldValue("shortname", refValue("shortname"))), scalar("String"))
        )
private let SettingsUpdateSelector = obj(
            field("updateSettings","updateSettings", arguments(fieldValue("settings", refValue("input"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Settings", SettingsFullSelector)
                )))
        )
private let StickerPackAddToCollectionSelector = obj(
            field("stickerPackAddToCollection","stickerPackAddToCollection", arguments(fieldValue("id", refValue("id"))), notNull(scalar("Boolean")))
        )
private let SubscribeToCommentsSelector = obj(
            field("subscribeToComments","subscribeToComments", arguments(fieldValue("peerId", refValue("peerId")), fieldValue("type", refValue("type"))), notNull(scalar("Boolean")))
        )
private let SuperAccountActivateSelector = obj(
            field("superAccountActivate","superAccountActivate", arguments(fieldValue("id", refValue("accountId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("state","state", notNull(scalar("String")))
                )))
        )
private let SuperAccountAddSelector = obj(
            field("superAccountAdd","superAccountAdd", arguments(fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID")))
                )))
        )
private let SuperAccountMemberAddSelector = obj(
            field("superAccountMemberAdd","superAccountMemberAdd", arguments(fieldValue("id", refValue("accountId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("members","members", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))))
                )))
        )
private let SuperAccountMemberRemoveSelector = obj(
            field("superAccountMemberRemove","superAccountMemberRemove", arguments(fieldValue("id", refValue("accountId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("members","members", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))))
                )))
        )
private let SuperAccountPendSelector = obj(
            field("superAccountPend","superAccountPend", arguments(fieldValue("id", refValue("accountId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("state","state", notNull(scalar("String")))
                )))
        )
private let SuperAccountRenameSelector = obj(
            field("superAccountRename","superAccountRename", arguments(fieldValue("id", refValue("accountId")), fieldValue("title", refValue("title"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("title","title", notNull(scalar("String")))
                )))
        )
private let SuperAccountSuspendSelector = obj(
            field("superAccountSuspend","superAccountSuspend", arguments(fieldValue("id", refValue("accountId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("state","state", notNull(scalar("String")))
                )))
        )
private let SuperAdminAddSelector = obj(
            field("superAdminAdd","superAdminAdd", arguments(fieldValue("role", refValue("role")), fieldValue("userId", refValue("userId"))), notNull(scalar("String")))
        )
private let SuperAdminRemoveSelector = obj(
            field("superAdminRemove","superAdminRemove", arguments(fieldValue("userId", refValue("userId"))), notNull(scalar("String")))
        )
private let SuperBadgeCreateToRoomSelector = obj(
            field("superBadgeCreateToRoom","superBadgeCreateToRoom", arguments(fieldValue("name", refValue("name")), fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("UserBadge", UserBadgeSelector)
                )))
        )
private let SuperBadgeUnsetToRoomSelector = obj(
            field("superBadgeUnsetToRoom","superBadgeUnsetToRoom", arguments(fieldValue("badgeId", refValue("badgeId")), fieldValue("roomId", refValue("roomId")), fieldValue("userId", refValue("userId"))), notNull(scalar("Boolean")))
        )
private let UnSubscribeFromCommentsSelector = obj(
            field("unsubscribeFromComments","unsubscribeFromComments", arguments(fieldValue("peerId", refValue("peerId"))), notNull(scalar("Boolean")))
        )
private let UnpinMessageSelector = obj(
            field("gammaUnpinMessage","unpinMessage", arguments(fieldValue("chatId", refValue("chatId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))
        )
private let UpdateAppSelector = obj(
            field("updateAppProfile","updateAppProfile", arguments(fieldValue("appId", refValue("appId")), fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                )))
        )
private let UpdateOrganizationSelector = obj(
            field("updateOrganizationProfile","updateOrganizationProfile", arguments(fieldValue("id", refValue("organizationId")), fieldValue("input", refValue("input"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("OrganizationProfile", OrganizationProfileFullSelector)
                )))
        )
private let UpdateWelcomeMessageSelector = obj(
            field("updateWelcomeMessage","updateWelcomeMessage", arguments(fieldValue("roomId", refValue("roomId")), fieldValue("welcomeMessageIsOn", refValue("welcomeMessageIsOn")), fieldValue("welcomeMessageSender", refValue("welcomeMessageSender")), fieldValue("welcomeMessageText", refValue("welcomeMessageText"))), notNull(scalar("Boolean")))
        )
private let UserStorageSetSelector = obj(
            field("userStorageSet","userStorageSet", arguments(fieldValue("data", refValue("data")), fieldValue("namespace", refValue("namespace"))), notNull(list(notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("value","value", scalar("String"))
                )))))
        )
private let ChatOnlinesCountWatchSelector = obj(
            field("chatOnlinesCount","chatOnlinesCount", arguments(fieldValue("chatId", refValue("chatId"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("onlineMembers","onlineMembers", notNull(scalar("Int")))
                )))
        )
private let ChatWatchSelector = obj(
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
private let CommentWatchSelector = obj(
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
private let ConferenceMediaWatchSelector = obj(
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
private let ConferenceWatchSelector = obj(
            field("alphaConferenceWatch","alphaConferenceWatch", arguments(fieldValue("id", refValue("id"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceFullSelector)
                )))
        )
private let DebugEventsWatchSelector = obj(
            field("debugEvents","debugEvents", arguments(fieldValue("eventsCount", refValue("eventsCount")), fieldValue("fromState", refValue("fromState")), fieldValue("randomDelays", refValue("randomDelays")), fieldValue("seed", refValue("seed"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("key","key", notNull(scalar("String"))),
                    field("seq","seq", notNull(scalar("Int")))
                )))
        )
private let DialogsWatchSelector = obj(
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
private let FeedUpdatesSelector = obj(
            field("homeFeedUpdates","event", arguments(fieldValue("fromState", refValue("state"))), notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("state","state", notNull(scalar("String"))),
                    field("updates","updates", notNull(list(notNull(obj(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("FeedUpdate", FeedUpdateFragmentSelector)
                        )))))
                )))
        )
private let MyNotificationsCenterSelector = obj(
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
private let OnlineWatchSelector = obj(
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
private let SettingsWatchSelector = obj(
            field("watchSettings","watchSettings", notNull(obj(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Settings", SettingsFullSelector)
                )))
        )
private let TypingsWatchSelector = obj(
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

class Operations {
    static let shared = Operations()
    
    private init() { }
    let Account = OperationDefinition(
        "Account",
        .query, 
        "query Account{me:me{__typename ...UserShort}myPermissions{__typename roles}sessionState:sessionState{__typename ...SessionStateFull}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SessionStateFull on SessionState{__typename isAccountActivated isAccountExists isAccountPicked isBlocked isCompleted isLoggedIn isProfileCreated}",
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
        "query AccountAppInviteInfo($inviteKey:String!){invite:alphaInviteInfo(key:$inviteKey){__typename creator{__typename ...UserShort}id}appInvite:appInviteInfo(key:$inviteKey){__typename inviter{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
        AccountAppInviteInfoSelector
    )
    let AccountInviteInfo = OperationDefinition(
        "AccountInviteInfo",
        .query, 
        "query AccountInviteInfo($inviteKey:String!){invite:alphaInviteInfo(key:$inviteKey){__typename creator{__typename ...UserShort}forEmail forName id joined key membersCount orgId organization{__typename about isCommunity:alphaIsCommunity id}photo title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
        AccountInviteInfoSelector
    )
    let AccountSettings = OperationDefinition(
        "AccountSettings",
        .query, 
        "query AccountSettings{me:me{__typename audienceSize ...UserShort}organizations:myOrganizations{__typename ...OrganizationShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
        AccountSettingsSelector
    )
    let AvailableRooms = OperationDefinition(
        "AvailableRooms",
        .query, 
        "query AvailableRooms{communities:alphaComunityPrefixSearch(first:3){__typename edges{__typename node{__typename ...CommunitySearch}}}isDiscoverDone:betaIsDiscoverDone suggestedRooms:betaSuggestedRooms{__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}availableChats:betaUserAvailableRooms(isChannel:false,limit:3){__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}availableChannels:betaUserAvailableRooms(isChannel:true,limit:3){__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}}fragment CommunitySearch on Organization{__typename about featured:alphaFeatured betaPublicRooms{__typename id}id isMine membersCount name photo status superAccountId}",
        AvailableRoomsSelector
    )
    let ChatInit = OperationDefinition(
        "ChatInit",
        .query, 
        "query ChatInit($before:ID,$chatId:ID!,$first:Int!){state:conversationState(id:$chatId){__typename state}lastReadedMessage(chatId:$chatId){__typename id}messages(before:$before,chatId:$chatId,first:$first){__typename ...FullMessage}room(id:$chatId){__typename ...RoomShort}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}",
        ChatInitSelector
    )
    let ChatInitFromUnread = OperationDefinition(
        "ChatInitFromUnread",
        .query, 
        "query ChatInitFromUnread($before:ID,$chatId:ID!,$first:Int!){state:conversationState(id:$chatId){__typename state}gammaMessages(before:$before,chatId:$chatId,first:$first){__typename haveMoreBackward haveMoreForward messages{__typename ...FullMessage}}lastReadedMessage(chatId:$chatId){__typename id}room(id:$chatId){__typename ...RoomShort}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}",
        ChatInitFromUnreadSelector
    )
    let ChatMembersSearch = OperationDefinition(
        "ChatMembersSearch",
        .query, 
        "query ChatMembersSearch($after:String,$cid:ID!,$first:Int!,$query:String){members:chatMembersSearch(after:$after,cid:$cid,first:$first,query:$query){__typename edges{__typename cursor user:node{__typename id name photo primaryOrganization{__typename id name}shortname}}pageInfo{__typename hasNextPage}}}",
        ChatMembersSearchSelector
    )
    let Comments = OperationDefinition(
        "Comments",
        .query, 
        "query Comments($peerId:ID!){comments(peerId:$peerId){__typename comments{__typename ...CommentEntryFragment}count id state{__typename state}}}fragment CommentEntryFragment on CommentEntry{__typename comment:betaComment{__typename id ...FullMessage}childComments{__typename id}deleted id parentComment{__typename comment:betaComment{__typename id message}id}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}",
        CommentsSelector
    )
    let Conference = OperationDefinition(
        "Conference",
        .query, 
        "query Conference($id:ID!){conference(id:$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename iceServers{__typename credential urls username}id peers{__typename connection{__typename ice sdp state}id user{__typename ...UserShort}}startTime}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
        ConferenceSelector
    )
    let ConferenceMedia = OperationDefinition(
        "ConferenceMedia",
        .query, 
        "query ConferenceMedia($id:ID!,$peerId:ID!){conferenceMedia(id:$id,peerId:$peerId){__typename iceServers{__typename credential urls username}id streams{__typename ice id sdp state}}}",
        ConferenceMediaSelector
    )
    let Dialogs = OperationDefinition(
        "Dialogs",
        .query, 
        "query Dialogs($after:String){counter:alphaNotificationCounter{__typename id unreadCount}dialogs(after:$after,first:20){__typename cursor items{__typename topMessage:alphaTopMessage{__typename ...DaialogListMessage}cid fid haveMention id isChannel isMuted kind photo title unreadCount}}state:dialogsState{__typename state}}fragment DaialogListMessage on ModernMessage{__typename date fallback id message sender{__typename firstName id name}senderBadge{__typename ...UserBadge}... on GeneralMessage{attachments{__typename fallback id ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat isImage}id}}id quotedMessages{__typename id}}}fragment UserBadge on UserBadge{__typename id name verified}",
        DialogsSelector
    )
    let DiscoverIsDone = OperationDefinition(
        "DiscoverIsDone",
        .query, 
        "query DiscoverIsDone{betaIsDiscoverDone}",
        DiscoverIsDoneSelector
    )
    let DiscoverNextPage = OperationDefinition(
        "DiscoverNextPage",
        .query, 
        "query DiscoverNextPage($excudedGroupsIds:[String!]!,$selectedTagsIds:[String!]!){betaNextDiscoverPage:gammaNextDiscoverPage(excudedGroupsIds:$excudedGroupsIds,selectedTagsIds:$selectedTagsIds){__typename chats{__typename ...RoomShort}tagGroup{__typename id subtitle tags{__typename id title}title}}}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}",
        DiscoverNextPageSelector
    )
    let ExploreCommunity = OperationDefinition(
        "ExploreCommunity",
        .query, 
        "query ExploreCommunity($after:String,$featuredIfEmptyQuery:Boolean,$page:Int,$query:String,$sort:String){items:alphaComunityPrefixSearch(after:$after,featuredIfEmptyQuery:$featuredIfEmptyQuery,first:25,page:$page,query:$query,sort:$sort){__typename edges{__typename cursor node{__typename ...CommunitySearch}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment CommunitySearch on Organization{__typename about featured:alphaFeatured betaPublicRooms{__typename id}id isMine membersCount name photo status superAccountId}",
        ExploreCommunitySelector
    )
    let ExplorePeople = OperationDefinition(
        "ExplorePeople",
        .query, 
        "query ExplorePeople($after:String,$page:Int,$query:String,$sort:String){items:userSearch(after:$after,first:25,page:$page,query:$query,sort:$sort){__typename edges{__typename cursor node{__typename isYou ...UserShort}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
        ExplorePeopleSelector
    )
    let FeatureFlags = OperationDefinition(
        "FeatureFlags",
        .query, 
        "query FeatureFlags{featureFlags{__typename id key title}}",
        FeatureFlagsSelector
    )
    let Feed = OperationDefinition(
        "Feed",
        .query, 
        "query Feed($after:String,$first:Int!){feed:alphaHomeFeed(after:$after,first:$first){__typename cursor items{__typename ...FeedItemFull}}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{author{__typename ...FeedPostAuthorFragment}canEdit commentsCount date edited fallback id message reactions{__typename reaction user{__typename ...UserShort}}slides{__typename ...SlideFragment}source{__typename ...FeedPostSourceFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{...UserShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SlideFragment on Slide{__typename ... on TextSlide{attachments{__typename ... on User{...UserShort}... on SharedRoom{id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}... on Organization{...OrganizationShort}}cover{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}coverAlign id spans{__typename ...SpanFragment}text}}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id myRole photo subscribed subscribersCount title}",
        FeedSelector
    )
    let FeedChannel = OperationDefinition(
        "FeedChannel",
        .query, 
        "query FeedChannel($id:ID!){channel:alphaFeedChannel(id:$id){__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id myRole photo subscribed subscribersCount title}",
        FeedChannelSelector
    )
    let FeedChannelContent = OperationDefinition(
        "FeedChannelContent",
        .query, 
        "query FeedChannelContent($after:String,$first:Int!,$id:ID!){content:alphaFeedChannelContent(after:$after,first:$first,id:$id){__typename cursor items{__typename ...FeedItemFull}}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{author{__typename ...FeedPostAuthorFragment}canEdit commentsCount date edited fallback id message reactions{__typename reaction user{__typename ...UserShort}}slides{__typename ...SlideFragment}source{__typename ...FeedPostSourceFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{...UserShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SlideFragment on Slide{__typename ... on TextSlide{attachments{__typename ... on User{...UserShort}... on SharedRoom{id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}... on Organization{...OrganizationShort}}cover{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}coverAlign id spans{__typename ...SpanFragment}text}}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id myRole photo subscribed subscribersCount title}",
        FeedChannelContentSelector
    )
    let FeedChannelsSearch = OperationDefinition(
        "FeedChannelsSearch",
        .query, 
        "query FeedChannelsSearch($after:String,$first:Int!,$query:String,$sort:String){search:alphaFeedChannelSearch(after:$after,first:$first,query:$query,sort:$sort){__typename edges{__typename cursor node{__typename ...FeedChannelFull}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment FeedChannelFull on FeedChannel{__typename about id myRole photo subscribed subscribersCount title}",
        FeedChannelsSearchSelector
    )
    let FeedItem = OperationDefinition(
        "FeedItem",
        .query, 
        "query FeedItem($id:ID!){item:alphaFeedItem(id:$id){__typename ...FeedItemFull}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{author{__typename ...FeedPostAuthorFragment}canEdit commentsCount date edited fallback id message reactions{__typename reaction user{__typename ...UserShort}}slides{__typename ...SlideFragment}source{__typename ...FeedPostSourceFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{...UserShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SlideFragment on Slide{__typename ... on TextSlide{attachments{__typename ... on User{...UserShort}... on SharedRoom{id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}... on Organization{...OrganizationShort}}cover{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}coverAlign id spans{__typename ...SpanFragment}text}}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id myRole photo subscribed subscribersCount title}",
        FeedItemSelector
    )
    let FeedMyChannels = OperationDefinition(
        "FeedMyChannels",
        .query, 
        "query FeedMyChannels($after:ID,$first:Int!){channels:alphaFeedMyChannels(after:$after,first:$first){__typename cursor items{__typename ...FeedChannelFull}}}fragment FeedChannelFull on FeedChannel{__typename about id myRole photo subscribed subscribersCount title}",
        FeedMyChannelsSelector
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
        "query GlobalSearch($kinds:[GlobalSearchEntryKind!],$query:String!){items:alphaGlobalSearch(kinds:$kinds,query:$query){__typename ... on Organization{...OrganizationShort}... on User{...UserShort}... on SharedRoom{id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}}}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}",
        GlobalSearchSelector
    )
    let MatchmakingRoom = OperationDefinition(
        "MatchmakingRoom",
        .query, 
        "query MatchmakingRoom($peerId:ID!){matchmakingRoom(peerId:$peerId){__typename ...MatchmakingRoomFragment}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id name photo primaryOrganization{__typename id name photo}}}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isYou name photo}}",
        MatchmakingRoomSelector
    )
    let Message = OperationDefinition(
        "Message",
        .query, 
        "query Message($messageId:ID!){message(messageId:$messageId){__typename source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}...FullMessage}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}",
        MessageSelector
    )
    let MessagesBatch = OperationDefinition(
        "MessagesBatch",
        .query, 
        "query MessagesBatch($after:ID,$before:ID,$chatId:ID!,$first:Int!){state:conversationState(id:$chatId){__typename state}gammaMessages(after:$after,before:$before,chatId:$chatId,first:$first){__typename haveMoreBackward haveMoreForward messages{__typename ...FullMessage}}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}",
        MessagesBatchSelector
    )
    let MessagesSearch = OperationDefinition(
        "MessagesSearch",
        .query, 
        "query MessagesSearch($after:String,$first:Int!,$query:String!,$sort:String){messagesSearch(after:$after,first:$first,query:$query,sort:$sort){__typename edges{__typename cursor node{__typename chat{__typename ... on PrivateRoom{id user{__typename id name photo}}... on SharedRoom{canEdit id isChannel kind membership photo role title}}message{__typename date fallback id message sender{__typename firstName id name photo}senderBadge{__typename ...UserBadge}... on GeneralMessage{attachments{__typename fallback id ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat isImage}id}}id quotedMessages{__typename id}}}}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment UserBadge on UserBadge{__typename id name verified}",
        MessagesSearchSelector
    )
    let MyApps = OperationDefinition(
        "MyApps",
        .query, 
        "query MyApps{apps:myApps{__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}",
        MyAppsSelector
    )
    let MyNotificationCenter = OperationDefinition(
        "MyNotificationCenter",
        .query, 
        "query MyNotificationCenter{myNotificationCenter{__typename id state{__typename state}unread}}",
        MyNotificationCenterSelector
    )
    let MyNotifications = OperationDefinition(
        "MyNotifications",
        .query, 
        "query MyNotifications($before:ID,$first:Int!){myNotifications(before:$before,first:$first){__typename cursor items{__typename ...NotificationFragment}}}fragment NotificationFragment on Notification{__typename content{__typename ... on NewCommentNotification{comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{chat{__typename ...RoomNano}message{__typename ... on GeneralMessage{fallback id message sender{__typename id name}senderBadge{__typename ...UserBadge}}}}... on CommentPeerRootFeedItem{item{__typename ...FeedItemFull}}}subscription{__typename type}}}}id text}fragment CommentEntryFragment on CommentEntry{__typename comment:betaComment{__typename id ...FullMessage}childComments{__typename id}deleted id parentComment{__typename comment:betaComment{__typename id message}id}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{id isChannel kind photo settings{__typename id mute}title}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{author{__typename ...FeedPostAuthorFragment}canEdit commentsCount date edited fallback id message reactions{__typename reaction user{__typename ...UserShort}}slides{__typename ...SlideFragment}source{__typename ...FeedPostSourceFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{...UserShort}}fragment SlideFragment on Slide{__typename ... on TextSlide{attachments{__typename ... on User{...UserShort}... on SharedRoom{id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}... on Organization{...OrganizationShort}}cover{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}coverAlign id spans{__typename ...SpanFragment}text}}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id myRole photo subscribed subscribersCount title}",
        MyNotificationsSelector
    )
    let MyOrganizations = OperationDefinition(
        "MyOrganizations",
        .query, 
        "query MyOrganizations{myOrganizations{__typename isPrimary:betaIsPrimary ...OrganizationShort}}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
        MyOrganizationsSelector
    )
    let MyStickers = OperationDefinition(
        "MyStickers",
        .query, 
        "query MyStickers{stickers:myStickers{__typename packs{__typename id stickers{__typename ...StickerFragment}title}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}",
        MyStickersSelector
    )
    let MySuccessfulInvitesCount = OperationDefinition(
        "MySuccessfulInvitesCount",
        .query, 
        "query MySuccessfulInvitesCount{mySuccessfulInvitesCount}",
        MySuccessfulInvitesCountSelector
    )
    let Online = OperationDefinition(
        "Online",
        .query, 
        "query Online($userId:ID!){user:user(id:$userId){__typename id lastSeen online}}",
        OnlineSelector
    )
    let Organization = OperationDefinition(
        "Organization",
        .query, 
        "query Organization($organizationId:ID!){organization(id:$organizationId){__typename ...OrganizationFull}}fragment OrganizationFull on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity isPrivate:alphaIsPrivate requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}members:alphaOrganizationMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id instagram isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment UserFull on User{__typename about audienceSize email facebook firstName id instagram isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}",
        OrganizationSelector
    )
    let OrganizationByPrefix = OperationDefinition(
        "OrganizationByPrefix",
        .query, 
        "query OrganizationByPrefix($query:String!){organizationByPrefix:alphaOrganizationByPrefix(query:$query){__typename ...OrganizationSearch}}fragment OrganizationSearch on Organization{__typename about featured:alphaFeatured members:alphaOrganizationMembers{__typename user{__typename id name photo}}id isMine membersCount name photo status superAccountId}",
        OrganizationByPrefixSelector
    )
    let OrganizationMembers = OperationDefinition(
        "OrganizationMembers",
        .query, 
        "query OrganizationMembers($after:ID,$first:Int,$organizationId:ID!){organization(id:$organizationId){__typename members:alphaOrganizationMembers(after:$after,first:$first){__typename role user{__typename ...UserShort}}id}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
        OrganizationMembersSelector
    )
    let OrganizationMembersShort = OperationDefinition(
        "OrganizationMembersShort",
        .query, 
        "query OrganizationMembersShort($organizationId:ID!){organization(id:$organizationId){__typename members:alphaOrganizationMembers{__typename user{__typename id}}...OrganizationWithoutMembersFragment}}fragment OrganizationWithoutMembersFragment on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity isPrivate:alphaIsPrivate requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id instagram isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment UserFull on User{__typename about audienceSize email facebook firstName id instagram isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}",
        OrganizationMembersShortSelector
    )
    let OrganizationProfile = OperationDefinition(
        "OrganizationProfile",
        .query, 
        "query OrganizationProfile($organizationId:ID!){organizationProfile(id:$organizationId){__typename ...OrganizationProfileFull}}fragment OrganizationProfileFull on OrganizationProfile{__typename about editorial:alphaEditorial featured:alphaFeatured private:alphaIsPrivate published:alphaPublished facebook id instagram linkedin name photoRef{__typename crop{__typename h w x y}uuid}shortname twitter website websiteTitle}",
        OrganizationProfileSelector
    )
    let OrganizationPublicInvite = OperationDefinition(
        "OrganizationPublicInvite",
        .query, 
        "query OrganizationPublicInvite($organizationId:ID){publicInvite:alphaOrganizationInviteLink(organizationId:$organizationId){__typename id key ttl}}",
        OrganizationPublicInviteSelector
    )
    let OrganizationWithoutMembers = OperationDefinition(
        "OrganizationWithoutMembers",
        .query, 
        "query OrganizationWithoutMembers($organizationId:ID!){organization(id:$organizationId){__typename ...OrganizationWithoutMembersFragment}}fragment OrganizationWithoutMembersFragment on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity isPrivate:alphaIsPrivate requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id instagram isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment UserFull on User{__typename about audienceSize email facebook firstName id instagram isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}",
        OrganizationWithoutMembersSelector
    )
    let Permissions = OperationDefinition(
        "Permissions",
        .query, 
        "query Permissions{myPermissions{__typename roles}}",
        PermissionsSelector
    )
    let Profile = OperationDefinition(
        "Profile",
        .query, 
        "query Profile{user:me{__typename id shortname}profile:myProfile{__typename about invitedBy:alphaInvitedBy{__typename id name}joinedAt:alphaJoinedAt role:alphaRole email facebook firstName id instagram lastName linkedin location phone photoRef{__typename crop{__typename h w x y}uuid}primaryOrganization{__typename id membersCount name}twitter website}}",
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
        "query ResolveShortName($shortname:String!){item:alphaResolveShortName(shortname:$shortname){__typename ... on User{id}... on Organization{id}}}",
        ResolveShortNameSelector
    )
    let ResolvedInvite = OperationDefinition(
        "ResolvedInvite",
        .query, 
        "query ResolvedInvite($key:String!){invite:alphaResolveInvite(key:$key){__typename ... on InviteInfo{creator{__typename ...UserShort}id orgId organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo}title}... on AppInvite{inviter{__typename ...UserShort}}... on RoomInvite{id invitedByUser{__typename ...UserShort}room{__typename ... on SharedRoom{description id isChannel kind matchmaking{__typename enabled}membersCount membership photo socialImage title}}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
        ResolvedInviteSelector
    )
    let Room = OperationDefinition(
        "Room",
        .query, 
        "query Room($id:ID!){room(id:$id){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description featuredMembersCount id isChannel kind members{__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationMedium on Organization{__typename about isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo shortname}",
        RoomSelector
    )
    let RoomChat = OperationDefinition(
        "RoomChat",
        .query, 
        "query RoomChat($id:ID!){room(id:$id){__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename id isBot name photo primaryOrganization{__typename id name}shortname}}... on SharedRoom{canEdit id isChannel kind membersCount membership photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}",
        RoomChatSelector
    )
    let RoomFeaturedMembers = OperationDefinition(
        "RoomFeaturedMembers",
        .query, 
        "query RoomFeaturedMembers($roomId:ID!){roomFeaturedMembers(roomId:$roomId){__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}}fragment UserBadge on UserBadge{__typename id name verified}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
        RoomFeaturedMembersSelector
    )
    let RoomInviteInfo = OperationDefinition(
        "RoomInviteInfo",
        .query, 
        "query RoomInviteInfo($invite:String!){invite:betaRoomInviteInfo(invite:$invite){__typename id invitedByUser{__typename ...UserShort}room{__typename ... on SharedRoom{description id isChannel kind matchmaking{__typename enabled}membersCount membership organization{__typename ...OrganizationShort}photo socialImage title}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
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
        "query RoomMembers($roomId:ID!){members:roomMembers(roomId:$roomId){__typename canKick membership role user{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
        RoomMembersSelector
    )
    let RoomMembersPaginated = OperationDefinition(
        "RoomMembersPaginated",
        .query, 
        "query RoomMembersPaginated($after:ID,$first:Int,$roomId:ID!){members:roomMembers(after:$after,first:$first,roomId:$roomId){__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}}fragment UserBadge on UserBadge{__typename id name verified}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
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
        "query RoomMembersTiny($roomId:ID!){members:roomMembers(roomId:$roomId){__typename user{__typename id name photo primaryOrganization{__typename id name}shortname}}}",
        RoomMembersTinySelector
    )
    let RoomOrganizationAdminMembers = OperationDefinition(
        "RoomOrganizationAdminMembers",
        .query, 
        "query RoomOrganizationAdminMembers($id:ID!){room(id:$id){__typename ... on SharedRoom{id organization{__typename adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserShort}}id}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
        RoomOrganizationAdminMembersSelector
    )
    let RoomPico = OperationDefinition(
        "RoomPico",
        .query, 
        "query RoomPico($id:ID!){room(id:$id){__typename ...RoomNano}}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{id isChannel kind photo settings{__typename id mute}title}}",
        RoomPicoSelector
    )
    let RoomSearch = OperationDefinition(
        "RoomSearch",
        .query, 
        "query RoomSearch($page:Int,$query:String,$sort:String){items:betaRoomSearch(first:25,page:$page,query:$query,sort:$sort){__typename edges{__typename cursor node{__typename ... on SharedRoom{id isChannel kind membersCount membership organization{__typename id name photo}photo title}}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}",
        RoomSearchSelector
    )
    let RoomSuper = OperationDefinition(
        "RoomSuper",
        .query, 
        "query RoomSuper($id:ID!){roomSuper(id:$id){__typename featured id listed}}",
        RoomSuperSelector
    )
    let RoomTiny = OperationDefinition(
        "RoomTiny",
        .query, 
        "query RoomTiny($id:ID!){room(id:$id){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}",
        RoomTinySelector
    )
    let RoomWithoutMembers = OperationDefinition(
        "RoomWithoutMembers",
        .query, 
        "query RoomWithoutMembers($id:ID!){room(id:$id){__typename ...RoomFullWithoutMembers}}fragment RoomFullWithoutMembers on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description featuredMembersCount id isChannel kind membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment OrganizationMedium on Organization{__typename about isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo shortname}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}",
        RoomWithoutMembersSelector
    )
    let Settings = OperationDefinition(
        "Settings",
        .query, 
        "query Settings{settings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename countUnreadChats desktop{__typename ...PlatformNotificationSettingsFull}emailFrequency excludeMutedChats id mobile{__typename ...PlatformNotificationSettingsFull}primaryEmail}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename comments{__typename showNotification sound}communityChat{__typename showNotification sound}direct{__typename showNotification sound}notificationPreview organizationChat{__typename showNotification sound}secretChat{__typename showNotification sound}}",
        SettingsSelector
    )
    let StickerPack = OperationDefinition(
        "StickerPack",
        .query, 
        "query StickerPack($id:ID!){stickerPack(id:$id){__typename ...StickerPackFragment}}fragment StickerPackFragment on StickerPack{__typename id stickers{__typename ...StickerFragment}title}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}",
        StickerPackSelector
    )
    let SuggestedRooms = OperationDefinition(
        "SuggestedRooms",
        .query, 
        "query SuggestedRooms{isDiscoverDone:betaIsDiscoverDone suggestedRooms:betaSuggestedRooms{__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}}",
        SuggestedRoomsSelector
    )
    let SuperAccount = OperationDefinition(
        "SuperAccount",
        .query, 
        "query SuperAccount($accountId:ID!,$viaOrgId:Boolean){superAccount(id:$accountId,viaOrgId:$viaOrgId){__typename published:alphaPublished createdAt createdBy{__typename id name}features{__typename id key title}id members{__typename ...UserShort}orgId state title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
        SuperAccountSelector
    )
    let SuperAccounts = OperationDefinition(
        "SuperAccounts",
        .query, 
        "query SuperAccounts{superAccounts{__typename createdAt id orgId state title}}",
        SuperAccountsSelector
    )
    let SuperAdmins = OperationDefinition(
        "SuperAdmins",
        .query, 
        "query SuperAdmins{superAdmins{__typename email role user{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
        SuperAdminsSelector
    )
    let SuperBadgeInRoom = OperationDefinition(
        "SuperBadgeInRoom",
        .query, 
        "query SuperBadgeInRoom($roomId:ID!,$userId:ID!){superBadgeInRoom(roomId:$roomId,userId:$userId){__typename ...UserBadge}}fragment UserBadge on UserBadge{__typename id name verified}",
        SuperBadgeInRoomSelector
    )
    let User = OperationDefinition(
        "User",
        .query, 
        "query User($userId:ID!){conversation:room(id:$userId){__typename ... on PrivateRoom{id settings{__typename id mute}}}user:user(id:$userId){__typename chatsWithBadge{__typename badge{__typename ...UserBadge}chat{__typename ...RoomShort}}...UserFull}}fragment UserBadge on UserBadge{__typename id name verified}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment UserFull on User{__typename about audienceSize email facebook firstName id instagram isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}",
        UserSelector
    )
    let UserAvailableRooms = OperationDefinition(
        "UserAvailableRooms",
        .query, 
        "query UserAvailableRooms($after:ID,$isChannel:Boolean,$limit:Int!){betaUserAvailableRooms(after:$after,isChannel:$isChannel,limit:$limit){__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}}",
        UserAvailableRoomsSelector
    )
    let UserStorage = OperationDefinition(
        "UserStorage",
        .query, 
        "query UserStorage($keys:[String!]!,$namespace:String!){userStorage(keys:$keys,namespace:$namespace){__typename id key value}}",
        UserStorageSelector
    )
    let Users = OperationDefinition(
        "Users",
        .query, 
        "query Users($query:String!){items:users(query:$query){__typename subtitle:email id title:name}}",
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
        "mutation AddAppToChat($appId:ID!,$chatId:ID!){addAppToChat(appId:$appId,chatId:$chatId){__typename ...AppChat}}fragment AppChat on AppChat{__typename chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}webhook}",
        AddAppToChatSelector
    )
    let AddComment = OperationDefinition(
        "AddComment",
        .mutation, 
        "mutation AddComment($fileAttachments:[FileAttachmentInput!],$mentions:[MentionInput!],$message:String,$peerId:ID!,$repeatKey:String,$replyComment:ID,$spans:[MessageSpanInput!]){betaAddComment(fileAttachments:$fileAttachments,mentions:$mentions,message:$message,peerId:$peerId,repeatKey:$repeatKey,replyComment:$replyComment,spans:$spans){__typename id}}",
        AddCommentSelector
    )
    let AddStickerComment = OperationDefinition(
        "AddStickerComment",
        .mutation, 
        "mutation AddStickerComment($peerId:ID!,$repeatKey:String,$replyComment:ID,$stickerId:ID!){addStickerComment:betaAddStickerComment(peerId:$peerId,repeatKey:$repeatKey,replyComment:$replyComment,stickerId:$stickerId){__typename id}}",
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
        "mutation BetaSubmitNextDiscover($excudedGroupsIds:[String!]!,$selectedTagsIds:[String!]!){betaSubmitNextDiscover(excudedGroupsIds:$excudedGroupsIds,selectedTagsIds:$selectedTagsIds){__typename tagGroup{__typename id}}}",
        BetaSubmitNextDiscoverSelector
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
    let ConferenceAnswer = OperationDefinition(
        "ConferenceAnswer",
        .mutation, 
        "mutation ConferenceAnswer($answer:String!,$id:ID!,$ownPeerId:ID!,$peerId:ID!){peerConnectionAnswer(answer:$answer,id:$id,ownPeerId:$ownPeerId,peerId:$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}",
        ConferenceAnswerSelector
    )
    let ConferenceCandidate = OperationDefinition(
        "ConferenceCandidate",
        .mutation, 
        "mutation ConferenceCandidate($candidate:String!,$id:ID!,$ownPeerId:ID!,$peerId:ID!){peerConnectionCandidate(candidate:$candidate,id:$id,ownPeerId:$ownPeerId,peerId:$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}",
        ConferenceCandidateSelector
    )
    let ConferenceJoin = OperationDefinition(
        "ConferenceJoin",
        .mutation, 
        "mutation ConferenceJoin($id:ID!){conferenceJoin(id:$id){__typename conference{__typename ...ConferenceShort}peerId}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}",
        ConferenceJoinSelector
    )
    let ConferenceKeepAlive = OperationDefinition(
        "ConferenceKeepAlive",
        .mutation, 
        "mutation ConferenceKeepAlive($id:ID!,$peerId:ID!){conferenceKeepAlive(id:$id,peerId:$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}",
        ConferenceKeepAliveSelector
    )
    let ConferenceLeave = OperationDefinition(
        "ConferenceLeave",
        .mutation, 
        "mutation ConferenceLeave($id:ID!,$peerId:ID!){conferenceLeave(id:$id,peerId:$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}",
        ConferenceLeaveSelector
    )
    let ConferenceOffer = OperationDefinition(
        "ConferenceOffer",
        .mutation, 
        "mutation ConferenceOffer($id:ID!,$offer:String!,$ownPeerId:ID!,$peerId:ID!){peerConnectionOffer(id:$id,offer:$offer,ownPeerId:$ownPeerId,peerId:$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}",
        ConferenceOfferSelector
    )
    let CreateApp = OperationDefinition(
        "CreateApp",
        .mutation, 
        "mutation CreateApp($about:String,$name:String!,$photoRef:ImageRefInput,$shortname:String){createApp(about:$about,name:$name,photoRef:$photoRef,shortname:$shortname){__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}",
        CreateAppSelector
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
        "mutation CreateUserProfileAndOrganization($organization:CreateOrganizationInput!,$user:ProfileInput!){alphaCreateUserProfileAndOrganization(organization:$organization,user:$user){__typename organization{__typename id name}user{__typename ...UserFull}}}fragment UserFull on User{__typename about audienceSize email facebook firstName id instagram isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
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
    let EditComment = OperationDefinition(
        "EditComment",
        .mutation, 
        "mutation EditComment($fileAttachments:[FileAttachmentInput!],$id:ID!,$mentions:[MentionInput!],$message:String,$spans:[MessageSpanInput!]){editComment(fileAttachments:$fileAttachments,id:$id,mentions:$mentions,message:$message,spans:$spans)}",
        EditCommentSelector
    )
    let EditMessage = OperationDefinition(
        "EditMessage",
        .mutation, 
        "mutation EditMessage($fileAttachments:[FileAttachmentInput!],$mentions:[MentionInput!],$message:String,$messageId:ID!,$replyMessages:[ID!],$spans:[MessageSpanInput!]){editMessage(fileAttachments:$fileAttachments,mentions:$mentions,message:$message,messageId:$messageId,replyMessages:$replyMessages,spans:$spans)}",
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
        "mutation FeatureFlagDisable($accountId:ID!,$featureId:ID!){superAccountFeatureRemove(featureId:$featureId,id:$accountId){__typename features{__typename id key title}id}}",
        FeatureFlagDisableSelector
    )
    let FeatureFlagEnable = OperationDefinition(
        "FeatureFlagEnable",
        .mutation, 
        "mutation FeatureFlagEnable($accountId:ID!,$featureId:ID!){superAccountFeatureAdd(featureId:$featureId,id:$accountId){__typename features{__typename id key title}id}}",
        FeatureFlagEnableSelector
    )
    let FeedChannelAddEditor = OperationDefinition(
        "FeedChannelAddEditor",
        .mutation, 
        "mutation FeedChannelAddEditor($id:ID!,$userId:ID!){alphaFeedChannelAddEditor(id:$id,userId:$userId)}",
        FeedChannelAddEditorSelector
    )
    let FeedChannelCreate = OperationDefinition(
        "FeedChannelCreate",
        .mutation, 
        "mutation FeedChannelCreate($about:String,$global:Boolean,$photoRef:ImageRefInput,$title:String!){channel:alphaFeedCreateChannel(about:$about,global:$global,photoRef:$photoRef,title:$title){__typename id}}",
        FeedChannelCreateSelector
    )
    let FeedChannelRemoveEditor = OperationDefinition(
        "FeedChannelRemoveEditor",
        .mutation, 
        "mutation FeedChannelRemoveEditor($id:ID!,$userId:ID!){alphaFeedChannelRemoveEditor(id:$id,userId:$userId)}",
        FeedChannelRemoveEditorSelector
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
        "mutation FeedChannelUpdate($about:String,$global:Boolean,$id:ID!,$photoRef:ImageRefInput,$title:String!){channel:alphaFeedUpdateChannel(about:$about,global:$global,id:$id,photoRef:$photoRef,title:$title){__typename id}}",
        FeedChannelUpdateSelector
    )
    let FeedCreatePost = OperationDefinition(
        "FeedCreatePost",
        .mutation, 
        "mutation FeedCreatePost($channel:ID!,$repeatKey:String,$slides:[SlideInput!]!){post:alphaCreateFeedPost(channel:$channel,repeatKey:$repeatKey,slides:$slides){__typename ...FeedItemFull}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{author{__typename ...FeedPostAuthorFragment}canEdit commentsCount date edited fallback id message reactions{__typename reaction user{__typename ...UserShort}}slides{__typename ...SlideFragment}source{__typename ...FeedPostSourceFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{...UserShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SlideFragment on Slide{__typename ... on TextSlide{attachments{__typename ... on User{...UserShort}... on SharedRoom{id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}... on Organization{...OrganizationShort}}cover{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}coverAlign id spans{__typename ...SpanFragment}text}}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id myRole photo subscribed subscribersCount title}",
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
        "mutation FeedEditPost($feedItemId:ID!,$slides:[SlideInput!]!){editFeedPost:alphaEditFeedPost(feedItemId:$feedItemId,slides:$slides){__typename ...FeedItemFull}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{author{__typename ...FeedPostAuthorFragment}canEdit commentsCount date edited fallback id message reactions{__typename reaction user{__typename ...UserShort}}slides{__typename ...SlideFragment}source{__typename ...FeedPostSourceFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{...UserShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SlideFragment on Slide{__typename ... on TextSlide{attachments{__typename ... on User{...UserShort}... on SharedRoom{id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}... on Organization{...OrganizationShort}}cover{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}coverAlign id spans{__typename ...SpanFragment}text}}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id myRole photo subscribed subscribersCount title}",
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
        "mutation MatchmakingProfileFill($input:MatchmakingProfileFillInput!,$peerId:ID!){matchmakingProfileFill(input:$input,peerId:$peerId){__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isYou name photo}}",
        MatchmakingProfileFillSelector
    )
    let MediaAnswer = OperationDefinition(
        "MediaAnswer",
        .mutation, 
        "mutation MediaAnswer($answer:String!,$id:ID!,$peerId:ID!){mediaStreamAnswer(answer:$answer,id:$id,peerId:$peerId){__typename id streams{__typename ice id sdp state}}}",
        MediaAnswerSelector
    )
    let MediaCandidate = OperationDefinition(
        "MediaCandidate",
        .mutation, 
        "mutation MediaCandidate($candidate:String!,$id:ID!,$peerId:ID!){mediaStreamCandidate(candidate:$candidate,id:$id,peerId:$peerId){__typename id streams{__typename ice id sdp state}}}",
        MediaCandidateSelector
    )
    let MediaFailed = OperationDefinition(
        "MediaFailed",
        .mutation, 
        "mutation MediaFailed($id:ID!,$peerId:ID!){mediaStreamFailed(id:$id,peerId:$peerId){__typename id streams{__typename ice id sdp state}}}",
        MediaFailedSelector
    )
    let MediaNegotiationNeeded = OperationDefinition(
        "MediaNegotiationNeeded",
        .mutation, 
        "mutation MediaNegotiationNeeded($id:ID!,$peerId:ID!){mediaStreamNegotiationNeeded(id:$id,peerId:$peerId){__typename id streams{__typename ice id sdp state}}}",
        MediaNegotiationNeededSelector
    )
    let MediaOffer = OperationDefinition(
        "MediaOffer",
        .mutation, 
        "mutation MediaOffer($id:ID!,$offer:String!,$peerId:ID!){mediaStreamOffer(id:$id,offer:$offer,peerId:$peerId){__typename id streams{__typename ice id sdp state}}}",
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
        "mutation OrganizationAddMember($organizationId:ID!,$userIds:[ID!]){alphaOrganizationMemberAdd(organizationId:$organizationId,userIds:$userIds){__typename role user{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
        OrganizationAddMemberSelector
    )
    let OrganizationAlterPublished = OperationDefinition(
        "OrganizationAlterPublished",
        .mutation, 
        "mutation OrganizationAlterPublished($organizationId:ID!,$published:Boolean!){alphaAlterPublished(id:$organizationId,published:$published){__typename ...OrganizationSearch}}fragment OrganizationSearch on Organization{__typename about featured:alphaFeatured members:alphaOrganizationMembers{__typename user{__typename id name photo}}id isMine membersCount name photo status superAccountId}",
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
        "mutation OrganizationMemberRemove($organizationId:ID!,$userId:ID!){betaOrganizationMemberRemove(organizationId:$organizationId,userId:$userId){__typename id}}",
        OrganizationMemberRemoveSelector
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
        "mutation PinMessage($chatId:ID!,$messageId:ID!){pinMessage:gammaPinMessage(chatId:$chatId,messageId:$messageId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}",
        PinMessageSelector
    )
    let ProfileCreate = OperationDefinition(
        "ProfileCreate",
        .mutation, 
        "mutation ProfileCreate($input:CreateProfileInput!){createProfile(input:$input){__typename about email firstName id lastName location phone photoRef{__typename crop{__typename h w x y}uuid}website}}",
        ProfileCreateSelector
    )
    let ProfileUpdate = OperationDefinition(
        "ProfileUpdate",
        .mutation, 
        "mutation ProfileUpdate($input:ProfileInput!,$uid:ID){profileUpdate(input:$input,uid:$uid){__typename about invitedBy:alphaInvitedBy{__typename id name}joinedAt:alphaJoinedAt primaryOrganizationId:alphaPrimaryOrganizationId role:alphaRole email facebook firstName id instagram lastName linkedin location phone photoRef{__typename crop{__typename h w x y}uuid}twitter website}}",
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
        "mutation RefreshAppToken($appId:ID!){refreshAppToken(appId:$appId){__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}",
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
    let ReportContent = OperationDefinition(
        "ReportContent",
        .mutation, 
        "mutation ReportContent($contentId:ID!,$message:String,$type:String!){reportContent(contentId:$contentId,message:$message,type:$type)}",
        ReportContentSelector
    )
    let ReportOnline = OperationDefinition(
        "ReportOnline",
        .mutation, 
        "mutation ReportOnline($active:Boolean,$platform:String){presenceReportOnline(active:$active,platform:$platform,timeout:5000)}",
        ReportOnlineSelector
    )
    let RoomAddMembers = OperationDefinition(
        "RoomAddMembers",
        .mutation, 
        "mutation RoomAddMembers($invites:[RoomInviteInput!]!,$roomId:ID!){alphaRoomInvite(invites:$invites,roomId:$roomId){__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}}fragment UserBadge on UserBadge{__typename id name verified}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
        RoomAddMembersSelector
    )
    let RoomAlterFeatured = OperationDefinition(
        "RoomAlterFeatured",
        .mutation, 
        "mutation RoomAlterFeatured($featured:Boolean!,$roomId:ID!){betaRoomAlterFeatured(featured:$featured,roomId:$roomId){__typename featured id listed}}",
        RoomAlterFeaturedSelector
    )
    let RoomAlterHidden = OperationDefinition(
        "RoomAlterHidden",
        .mutation, 
        "mutation RoomAlterHidden($listed:Boolean!,$roomId:ID!){betaRoomAlterListed(listed:$listed,roomId:$roomId){__typename featured id listed}}",
        RoomAlterHiddenSelector
    )
    let RoomChangeRole = OperationDefinition(
        "RoomChangeRole",
        .mutation, 
        "mutation RoomChangeRole($newRole:RoomMemberRole!,$roomId:ID!,$userId:ID!){betaRoomChangeRole(newRole:$newRole,roomId:$roomId,userId:$userId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description featuredMembersCount id isChannel kind members{__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationMedium on Organization{__typename about isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo shortname}",
        RoomChangeRoleSelector
    )
    let RoomCreate = OperationDefinition(
        "RoomCreate",
        .mutation, 
        "mutation RoomCreate($channel:Boolean!,$description:String,$kind:SharedRoomKind!,$members:[ID!]!,$message:String,$organizationId:ID,$photoRef:ImageRefInput,$title:String){room:betaRoomCreate(channel:$channel,description:$description,kind:$kind,members:$members,message:$message,organizationId:$organizationId,photoRef:$photoRef,title:$title){__typename id}}",
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
        "mutation RoomJoin($roomId:ID!){join:betaRoomJoin(roomId:$roomId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description featuredMembersCount id isChannel kind members{__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationMedium on Organization{__typename about isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo shortname}",
        RoomJoinSelector
    )
    let RoomJoinInviteLink = OperationDefinition(
        "RoomJoinInviteLink",
        .mutation, 
        "mutation RoomJoinInviteLink($invite:String!){join:betaRoomInviteLinkJoin(invite:$invite){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description featuredMembersCount id isChannel kind members{__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationMedium on Organization{__typename about isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo shortname}",
        RoomJoinInviteLinkSelector
    )
    let RoomKick = OperationDefinition(
        "RoomKick",
        .mutation, 
        "mutation RoomKick($roomId:ID!,$userId:ID!){betaRoomKick(roomId:$roomId,userId:$userId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description featuredMembersCount id isChannel kind members{__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationMedium on Organization{__typename about isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo shortname}",
        RoomKickSelector
    )
    let RoomLeave = OperationDefinition(
        "RoomLeave",
        .mutation, 
        "mutation RoomLeave($roomId:ID!){betaRoomLeave(roomId:$roomId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description featuredMembersCount id isChannel kind members{__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationMedium on Organization{__typename about isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo shortname}",
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
        "mutation RoomSettingsUpdate($roomId:ID!,$settings:RoomUserNotificaionSettingsInput!){betaRoomUpdateUserNotificationSettings(roomId:$roomId,settings:$settings){__typename id mute}}",
        RoomSettingsUpdateSelector
    )
    let RoomUpdate = OperationDefinition(
        "RoomUpdate",
        .mutation, 
        "mutation RoomUpdate($input:RoomUpdateInput!,$roomId:ID!){betaRoomUpdate(input:$input,roomId:$roomId){__typename ... on PrivateRoom{id}... on SharedRoom{description id photo socialImage title}}}",
        RoomUpdateSelector
    )
    let RoomsInviteUser = OperationDefinition(
        "RoomsInviteUser",
        .mutation, 
        "mutation RoomsInviteUser($roomIds:[ID!]!,$userId:ID!){rooms:betaRoomsInviteUser(roomIds:$roomIds,userId:$userId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}",
        RoomsInviteUserSelector
    )
    let RoomsJoin = OperationDefinition(
        "RoomsJoin",
        .mutation, 
        "mutation RoomsJoin($roomsIds:[ID!]!){join:betaRoomsJoin(roomsIds:$roomsIds){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}",
        RoomsJoinSelector
    )
    let SendMessage = OperationDefinition(
        "SendMessage",
        .mutation, 
        "mutation SendMessage($chatId:ID!,$fileAttachments:[FileAttachmentInput!],$mentions:[MentionInput!],$message:String,$repeatKey:String,$replyMessages:[ID!],$spans:[MessageSpanInput!]){sentMessage:sendMessage(chatId:$chatId,fileAttachments:$fileAttachments,mentions:$mentions,message:$message,repeatKey:$repeatKey,replyMessages:$replyMessages,spans:$spans)}",
        SendMessageSelector
    )
    let SendSticker = OperationDefinition(
        "SendSticker",
        .mutation, 
        "mutation SendSticker($chatId:ID!,$repeatKey:String,$replyMessages:[ID!],$stickerId:ID!){sendSticker(chatId:$chatId,repeatKey:$repeatKey,replyMessages:$replyMessages,stickerId:$stickerId)}",
        SendStickerSelector
    )
    let SetOrgShortname = OperationDefinition(
        "SetOrgShortname",
        .mutation, 
        "mutation SetOrgShortname($organizationId:ID!,$shortname:String!){alphaSetOrgShortName(id:$organizationId,shortname:$shortname)}",
        SetOrgShortnameSelector
    )
    let SetTyping = OperationDefinition(
        "SetTyping",
        .mutation, 
        "mutation SetTyping($conversationId:ID!){typingSend(conversationId:$conversationId,type:TEXT)}",
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
        "mutation SettingsUpdate($input:UpdateSettingsInput){updateSettings(settings:$input){__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename countUnreadChats desktop{__typename ...PlatformNotificationSettingsFull}emailFrequency excludeMutedChats id mobile{__typename ...PlatformNotificationSettingsFull}primaryEmail}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename comments{__typename showNotification sound}communityChat{__typename showNotification sound}direct{__typename showNotification sound}notificationPreview organizationChat{__typename showNotification sound}secretChat{__typename showNotification sound}}",
        SettingsUpdateSelector
    )
    let StickerPackAddToCollection = OperationDefinition(
        "StickerPackAddToCollection",
        .mutation, 
        "mutation StickerPackAddToCollection($id:ID!){stickerPackAddToCollection:stickerPackAddToCollection(id:$id)}",
        StickerPackAddToCollectionSelector
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
        "mutation SuperAccountMemberAdd($accountId:ID!,$userId:ID!){superAccountMemberAdd(id:$accountId,userId:$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
        SuperAccountMemberAddSelector
    )
    let SuperAccountMemberRemove = OperationDefinition(
        "SuperAccountMemberRemove",
        .mutation, 
        "mutation SuperAccountMemberRemove($accountId:ID!,$userId:ID!){superAccountMemberRemove(id:$accountId,userId:$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
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
        "mutation SuperAdminAdd($role:SuperAdminRole!,$userId:ID!){superAdminAdd(role:$role,userId:$userId)}",
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
        "mutation SuperBadgeCreateToRoom($name:String!,$roomId:ID!,$userId:ID!){superBadgeCreateToRoom(name:$name,roomId:$roomId,userId:$userId){__typename ...UserBadge}}fragment UserBadge on UserBadge{__typename id name verified}",
        SuperBadgeCreateToRoomSelector
    )
    let SuperBadgeUnsetToRoom = OperationDefinition(
        "SuperBadgeUnsetToRoom",
        .mutation, 
        "mutation SuperBadgeUnsetToRoom($badgeId:ID!,$roomId:ID!,$userId:ID!){superBadgeUnsetToRoom(badgeId:$badgeId,roomId:$roomId,userId:$userId)}",
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
        "mutation UnpinMessage($chatId:ID!){unpinMessage:gammaUnpinMessage(chatId:$chatId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}",
        UnpinMessageSelector
    )
    let UpdateApp = OperationDefinition(
        "UpdateApp",
        .mutation, 
        "mutation UpdateApp($appId:ID!,$input:AppProfileInput!){updateAppProfile(appId:$appId,input:$input){__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}",
        UpdateAppSelector
    )
    let UpdateOrganization = OperationDefinition(
        "UpdateOrganization",
        .mutation, 
        "mutation UpdateOrganization($input:UpdateOrganizationProfileInput!,$organizationId:ID){updateOrganizationProfile(id:$organizationId,input:$input){__typename ...OrganizationProfileFull}}fragment OrganizationProfileFull on OrganizationProfile{__typename about editorial:alphaEditorial featured:alphaFeatured private:alphaIsPrivate published:alphaPublished facebook id instagram linkedin name photoRef{__typename crop{__typename h w x y}uuid}shortname twitter website websiteTitle}",
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
        "mutation UserStorageSet($data:[AppStorageValueInput!]!,$namespace:String!){userStorageSet(data:$data,namespace:$namespace){__typename id key value}}",
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
        "subscription ChatWatch($chatId:ID!,$state:String){event:chatUpdates(chatId:$chatId,fromState:$state){__typename ... on ChatUpdateSingle{seq state update{__typename ...ChatUpdateFragment}}... on ChatUpdateBatch{fromSeq seq state updates{__typename ...ChatUpdateFragment}}}}fragment ChatUpdateFragment on ChatUpdate{__typename ... on ChatMessageReceived{message{__typename ...FullMessage}repeatKey}... on ChatMessageUpdated{message{__typename ...FullMessage}}... on ChatMessageDeleted{message{__typename id}}... on ChatUpdated{chat{__typename ...RoomShort}}... on ChatLostAccess{lostAccess}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}",
        ChatWatchSelector
    )
    let CommentWatch = OperationDefinition(
        "CommentWatch",
        .subscription, 
        "subscription CommentWatch($fromState:String,$peerId:ID!){event:commentUpdates(fromState:$fromState,peerId:$peerId){__typename ... on CommentUpdateSingle{seq state update{__typename ...CommentUpdateFragment}}... on CommentUpdateBatch{fromSeq seq state updates{__typename ...CommentUpdateFragment}}}}fragment CommentUpdateFragment on CommentUpdate{__typename ... on CommentReceived{comment{__typename ...CommentEntryFragment}}... on CommentUpdated{comment{__typename ...CommentEntryFragment}}}fragment CommentEntryFragment on CommentEntry{__typename comment:betaComment{__typename id ...FullMessage}childComments{__typename id}deleted id parentComment{__typename comment:betaComment{__typename id message}id}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}",
        CommentWatchSelector
    )
    let ConferenceMediaWatch = OperationDefinition(
        "ConferenceMediaWatch",
        .subscription, 
        "subscription ConferenceMediaWatch($id:ID!,$peerId:ID!){media:alphaConferenceMediaWatch(id:$id,peerId:$peerId){__typename id streams{__typename ice id sdp state}}}",
        ConferenceMediaWatchSelector
    )
    let ConferenceWatch = OperationDefinition(
        "ConferenceWatch",
        .subscription, 
        "subscription ConferenceWatch($id:ID!){alphaConferenceWatch(id:$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename iceServers{__typename credential urls username}id peers{__typename connection{__typename ice sdp state}id user{__typename ...UserShort}}startTime}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}",
        ConferenceWatchSelector
    )
    let DebugEventsWatch = OperationDefinition(
        "DebugEventsWatch",
        .subscription, 
        "subscription DebugEventsWatch($eventsCount:Int!,$fromState:String,$randomDelays:Boolean!,$seed:String!){debugEvents(eventsCount:$eventsCount,fromState:$fromState,randomDelays:$randomDelays,seed:$seed){__typename key seq}}",
        DebugEventsWatchSelector
    )
    let DialogsWatch = OperationDefinition(
        "DialogsWatch",
        .subscription, 
        "subscription DialogsWatch($state:String){event:dialogsUpdates(fromState:$state){__typename ... on DialogUpdateSingle{seq state update{__typename ...DialogUpdateFragment}}... on DialogUpdateBatch{fromSeq seq state updates{__typename ...DialogUpdateFragment}}}}fragment DialogUpdateFragment on DialogUpdate{__typename ... on DialogMessageReceived{message:alphaMessage{__typename ...TinyMessage}cid globalUnread haveMention showNotification{__typename desktop mobile}silent{__typename desktop mobile}unread}... on DialogMessageUpdated{message:alphaMessage{__typename ...TinyMessage}cid haveMention}... on DialogMessageDeleted{message:alphaMessage{__typename ...TinyMessage}prevMessage:alphaPrevMessage{__typename ...TinyMessage}cid globalUnread haveMention unread}... on DialogMessageRead{cid globalUnread haveMention unread}... on DialogMuteChanged{cid mute}... on DialogPeerUpdated{cid peer{__typename ... on PrivateRoom{id user{__typename id name photo}}... on SharedRoom{id photo title}}}... on DialogDeleted{cid globalUnread}... on DialogBump{cid globalUnread haveMention topMessage{__typename ...TinyMessage}unread}}fragment TinyMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserTiny}senderBadge{__typename ...UserBadge}... on GeneralMessage{attachments{__typename fallback id ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat isImage}filePreview id}}commentsCount id isMentioned quotedMessages{__typename id}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}",
        DialogsWatchSelector
    )
    let FeedUpdates = OperationDefinition(
        "FeedUpdates",
        .subscription, 
        "subscription FeedUpdates($state:String){event:homeFeedUpdates(fromState:$state){__typename state updates{__typename ...FeedUpdateFragment}}}fragment FeedUpdateFragment on FeedUpdate{__typename ... on FeedItemReceived{item{__typename ...FeedItemFull}}... on FeedItemUpdated{item{__typename ...FeedItemFull}}... on FeedItemDeleted{item{__typename ...FeedItemFull}}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{author{__typename ...FeedPostAuthorFragment}canEdit commentsCount date edited fallback id message reactions{__typename reaction user{__typename ...UserShort}}slides{__typename ...SlideFragment}source{__typename ...FeedPostSourceFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{...UserShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment SlideFragment on Slide{__typename ... on TextSlide{attachments{__typename ... on User{...UserShort}... on SharedRoom{id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}... on Organization{...OrganizationShort}}cover{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}coverAlign id spans{__typename ...SpanFragment}text}}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id myRole photo subscribed subscribersCount title}",
        FeedUpdatesSelector
    )
    let MyNotificationsCenter = OperationDefinition(
        "MyNotificationsCenter",
        .subscription, 
        "subscription MyNotificationsCenter($state:String){event:notificationCenterUpdates(fromState:$state){__typename ... on NotificationCenterUpdateSingle{seq state update{__typename ...NotificationCenterUpdateFragment}}... on NotificationCenterUpdateBatch{fromSeq seq state updates{__typename ...NotificationCenterUpdateFragment}}}}fragment NotificationCenterUpdateFragment on NotificationCenterUpdate{__typename ... on NotificationReceived{center{__typename id unread}notification{__typename ...NotificationFragment}}... on NotificationUpdated{center{__typename id unread}notification{__typename ...NotificationFragment}}... on NotificationDeleted{center{__typename id unread}notification{__typename id}}... on NotificationRead{center{__typename id unread}}... on NotificationContentUpdated{content{__typename ... on UpdatedNotificationContentComment{comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{chat{__typename ...RoomNano}message{__typename ... on GeneralMessage{fallback id message sender{__typename id name}senderBadge{__typename ...UserBadge}}}}... on CommentPeerRootFeedItem{item{__typename ...FeedItemFull}}}subscription{__typename type}}}}}}fragment NotificationFragment on Notification{__typename content{__typename ... on NewCommentNotification{comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{chat{__typename ...RoomNano}message{__typename ... on GeneralMessage{fallback id message sender{__typename id name}senderBadge{__typename ...UserBadge}}}}... on CommentPeerRootFeedItem{item{__typename ...FeedItemFull}}}subscription{__typename type}}}}id text}fragment CommentEntryFragment on CommentEntry{__typename comment:betaComment{__typename id ...FullMessage}childComments{__typename id}deleted id parentComment{__typename comment:betaComment{__typename id message}id}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isYou name photo primaryOrganization{__typename id name}shortname}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id}... on StickerMessage{date id reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{id isChannel kind photo settings{__typename id mute}title}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{author{__typename ...FeedPostAuthorFragment}canEdit commentsCount date edited fallback id message reactions{__typename reaction user{__typename ...UserShort}}slides{__typename ...SlideFragment}source{__typename ...FeedPostSourceFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{...UserShort}}fragment SlideFragment on Slide{__typename ... on TextSlide{attachments{__typename ... on User{...UserShort}... on SharedRoom{id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}... on Organization{...OrganizationShort}}cover{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}coverAlign id spans{__typename ...SpanFragment}text}}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id myRole photo subscribed subscribersCount title}",
        MyNotificationsCenterSelector
    )
    let OnlineWatch = OperationDefinition(
        "OnlineWatch",
        .subscription, 
        "subscription OnlineWatch($users:[ID!]!){alphaSubscribeOnline(users:$users){__typename timeout user{__typename id lastSeen online}}}",
        OnlineWatchSelector
    )
    let SettingsWatch = OperationDefinition(
        "SettingsWatch",
        .subscription, 
        "subscription SettingsWatch{watchSettings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename countUnreadChats desktop{__typename ...PlatformNotificationSettingsFull}emailFrequency excludeMutedChats id mobile{__typename ...PlatformNotificationSettingsFull}primaryEmail}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename comments{__typename showNotification sound}communityChat{__typename showNotification sound}direct{__typename showNotification sound}notificationPreview organizationChat{__typename showNotification sound}secretChat{__typename showNotification sound}}",
        SettingsWatchSelector
    )
    let TypingsWatch = OperationDefinition(
        "TypingsWatch",
        .subscription, 
        "subscription TypingsWatch{typings{__typename cancel conversation:chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}user{__typename id name photo}}}",
        TypingsWatchSelector
    )
    
    func operationByName(_ name: String) -> OperationDefinition {
        if name == "Account" { return Account }
        if name == "AccountAppInvite" { return AccountAppInvite }
        if name == "AccountAppInviteInfo" { return AccountAppInviteInfo }
        if name == "AccountInviteInfo" { return AccountInviteInfo }
        if name == "AccountSettings" { return AccountSettings }
        if name == "AvailableRooms" { return AvailableRooms }
        if name == "ChatInit" { return ChatInit }
        if name == "ChatInitFromUnread" { return ChatInitFromUnread }
        if name == "ChatMembersSearch" { return ChatMembersSearch }
        if name == "Comments" { return Comments }
        if name == "Conference" { return Conference }
        if name == "ConferenceMedia" { return ConferenceMedia }
        if name == "Dialogs" { return Dialogs }
        if name == "DiscoverIsDone" { return DiscoverIsDone }
        if name == "DiscoverNextPage" { return DiscoverNextPage }
        if name == "ExploreCommunity" { return ExploreCommunity }
        if name == "ExplorePeople" { return ExplorePeople }
        if name == "FeatureFlags" { return FeatureFlags }
        if name == "Feed" { return Feed }
        if name == "FeedChannel" { return FeedChannel }
        if name == "FeedChannelContent" { return FeedChannelContent }
        if name == "FeedChannelsSearch" { return FeedChannelsSearch }
        if name == "FeedItem" { return FeedItem }
        if name == "FeedMyChannels" { return FeedMyChannels }
        if name == "FetchPushSettings" { return FetchPushSettings }
        if name == "GlobalCounter" { return GlobalCounter }
        if name == "GlobalSearch" { return GlobalSearch }
        if name == "MatchmakingRoom" { return MatchmakingRoom }
        if name == "Message" { return Message }
        if name == "MessagesBatch" { return MessagesBatch }
        if name == "MessagesSearch" { return MessagesSearch }
        if name == "MyApps" { return MyApps }
        if name == "MyNotificationCenter" { return MyNotificationCenter }
        if name == "MyNotifications" { return MyNotifications }
        if name == "MyOrganizations" { return MyOrganizations }
        if name == "MyStickers" { return MyStickers }
        if name == "MySuccessfulInvitesCount" { return MySuccessfulInvitesCount }
        if name == "Online" { return Online }
        if name == "Organization" { return Organization }
        if name == "OrganizationByPrefix" { return OrganizationByPrefix }
        if name == "OrganizationMembers" { return OrganizationMembers }
        if name == "OrganizationMembersShort" { return OrganizationMembersShort }
        if name == "OrganizationProfile" { return OrganizationProfile }
        if name == "OrganizationPublicInvite" { return OrganizationPublicInvite }
        if name == "OrganizationWithoutMembers" { return OrganizationWithoutMembers }
        if name == "Permissions" { return Permissions }
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
        if name == "RoomSuper" { return RoomSuper }
        if name == "RoomTiny" { return RoomTiny }
        if name == "RoomWithoutMembers" { return RoomWithoutMembers }
        if name == "Settings" { return Settings }
        if name == "StickerPack" { return StickerPack }
        if name == "SuggestedRooms" { return SuggestedRooms }
        if name == "SuperAccount" { return SuperAccount }
        if name == "SuperAccounts" { return SuperAccounts }
        if name == "SuperAdmins" { return SuperAdmins }
        if name == "SuperBadgeInRoom" { return SuperBadgeInRoom }
        if name == "User" { return User }
        if name == "UserAvailableRooms" { return UserAvailableRooms }
        if name == "UserStorage" { return UserStorage }
        if name == "Users" { return Users }
        if name == "AccountInviteJoin" { return AccountInviteJoin }
        if name == "AddAppToChat" { return AddAppToChat }
        if name == "AddComment" { return AddComment }
        if name == "AddStickerComment" { return AddStickerComment }
        if name == "BetaDiscoverSkip" { return BetaDiscoverSkip }
        if name == "BetaNextDiscoverReset" { return BetaNextDiscoverReset }
        if name == "BetaSubmitNextDiscover" { return BetaSubmitNextDiscover }
        if name == "CommentSetReaction" { return CommentSetReaction }
        if name == "CommentUnsetReaction" { return CommentUnsetReaction }
        if name == "ConferenceAnswer" { return ConferenceAnswer }
        if name == "ConferenceCandidate" { return ConferenceCandidate }
        if name == "ConferenceJoin" { return ConferenceJoin }
        if name == "ConferenceKeepAlive" { return ConferenceKeepAlive }
        if name == "ConferenceLeave" { return ConferenceLeave }
        if name == "ConferenceOffer" { return ConferenceOffer }
        if name == "CreateApp" { return CreateApp }
        if name == "CreateOrganization" { return CreateOrganization }
        if name == "CreateUserProfileAndOrganization" { return CreateUserProfileAndOrganization }
        if name == "DebugMails" { return DebugMails }
        if name == "DeleteComment" { return DeleteComment }
        if name == "DeleteNotification" { return DeleteNotification }
        if name == "DeleteOrganization" { return DeleteOrganization }
        if name == "DeleteUser" { return DeleteUser }
        if name == "EditComment" { return EditComment }
        if name == "EditMessage" { return EditMessage }
        if name == "FeatureFlagAdd" { return FeatureFlagAdd }
        if name == "FeatureFlagDisable" { return FeatureFlagDisable }
        if name == "FeatureFlagEnable" { return FeatureFlagEnable }
        if name == "FeedChannelAddEditor" { return FeedChannelAddEditor }
        if name == "FeedChannelCreate" { return FeedChannelCreate }
        if name == "FeedChannelRemoveEditor" { return FeedChannelRemoveEditor }
        if name == "FeedChannelSubscribe" { return FeedChannelSubscribe }
        if name == "FeedChannelUnsubscribe" { return FeedChannelUnsubscribe }
        if name == "FeedChannelUpdate" { return FeedChannelUpdate }
        if name == "FeedCreatePost" { return FeedCreatePost }
        if name == "FeedDeletePost" { return FeedDeletePost }
        if name == "FeedEditPost" { return FeedEditPost }
        if name == "FeedReactionAdd" { return FeedReactionAdd }
        if name == "FeedReactionRemove" { return FeedReactionRemove }
        if name == "MarkSequenceRead" { return MarkSequenceRead }
        if name == "MatchmakingConnect" { return MatchmakingConnect }
        if name == "MatchmakingProfileFill" { return MatchmakingProfileFill }
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
        if name == "PersistEvents" { return PersistEvents }
        if name == "PinMessage" { return PinMessage }
        if name == "ProfileCreate" { return ProfileCreate }
        if name == "ProfileUpdate" { return ProfileUpdate }
        if name == "ReadNotification" { return ReadNotification }
        if name == "RefreshAppToken" { return RefreshAppToken }
        if name == "RegisterPush" { return RegisterPush }
        if name == "RegisterWebPush" { return RegisterWebPush }
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
        if name == "SendMessage" { return SendMessage }
        if name == "SendSticker" { return SendSticker }
        if name == "SetOrgShortname" { return SetOrgShortname }
        if name == "SetTyping" { return SetTyping }
        if name == "SetUserShortname" { return SetUserShortname }
        if name == "SettingsUpdate" { return SettingsUpdate }
        if name == "StickerPackAddToCollection" { return StickerPackAddToCollection }
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
        fatalError("Unknown operation: " + name)
    }
}