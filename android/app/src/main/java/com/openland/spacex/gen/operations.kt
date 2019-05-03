package com.openland.spacex.gen

import com.openland.spacex.store.*
import com.openland.spacex.model.*
import kotlinx.serialization.json.JsonObject

fun normalizeAppChat(scope1: Scope) {
    scope1.set("__typename", scope1.readString("__typename"))
    scope1.assertObject("chat")
    val scope2 = scope1.child("chat", "chat")
    scope2.set("__typename", scope2.readString("__typename"))
    if (scope2.isType("PrivateRoom")) {
        scope2.set("id", scope2.readString("id"))
    }
    if (scope2.isType("SharedRoom")) {
        scope2.set("id", scope2.readString("id"))
    }
    scope1.set("webhook", scope1.readString("webhook"))
}
fun normalizeAppFull(scope3: Scope) {
    scope3.set("__typename", scope3.readString("__typename"))
    scope3.set("about", scope3.readStringOptional("about"))
    scope3.set("id", scope3.readString("id"))
    scope3.set("name", scope3.readString("name"))
    if (scope3.hasKey("photoRef")) {
        val scope4 = scope3.child("photoRef", "photoRef")
        scope4.set("__typename", scope4.readString("__typename"))
        if (scope4.hasKey("crop")) {
            val scope5 = scope4.child("crop", "crop")
            scope5.set("__typename", scope5.readString("__typename"))
            scope5.set("h", scope5.readInt("h"))
            scope5.set("w", scope5.readInt("w"))
            scope5.set("x", scope5.readInt("x"))
            scope5.set("y", scope5.readInt("y"))
        } else {
            scope4.setNull("crop")
        }
        scope4.set("uuid", scope4.readString("uuid"))
    } else {
        scope3.setNull("photoRef")
    }
    scope3.set("shortname", scope3.readStringOptional("shortname"))
    scope3.assertObject("token")
    val scope6 = scope3.child("token", "token")
    scope6.set("__typename", scope6.readString("__typename"))
    scope6.set("salt", scope6.readString("salt"))
}
fun normalizeOrganizationShort(scope7: Scope) {
    scope7.set("__typename", scope7.readString("__typename"))
    scope7.set("alphaIsCommunity", scope7.readBoolean("isCommunity"))
    scope7.set("id", scope7.readString("id"))
    scope7.set("name", scope7.readString("name"))
    scope7.set("photo", scope7.readStringOptional("photo"))
}
fun normalizeUserShort(scope8: Scope) {
    scope8.set("__typename", scope8.readString("__typename"))
    scope8.set("email", scope8.readStringOptional("email"))
    scope8.set("firstName", scope8.readString("firstName"))
    scope8.set("id", scope8.readString("id"))
    scope8.set("isBot", scope8.readBoolean("isBot"))
    scope8.set("isYou", scope8.readBoolean("isYou"))
    scope8.set("lastName", scope8.readStringOptional("lastName"))
    scope8.set("lastSeen", scope8.readStringOptional("lastSeen"))
    scope8.set("name", scope8.readString("name"))
    scope8.set("online", scope8.readBoolean("online"))
    scope8.set("photo", scope8.readStringOptional("photo"))
    if (scope8.hasKey("primaryOrganization")) {
        val scope9 = scope8.child("primaryOrganization", "primaryOrganization")
        scope9.set("__typename", scope9.readString("__typename"))
        normalizeOrganizationShort(scope9)
    } else {
        scope8.setNull("primaryOrganization")
    }
    scope8.set("shortname", scope8.readStringOptional("shortname"))
}
fun normalizeUserTiny(scope10: Scope) {
    scope10.set("__typename", scope10.readString("__typename"))
    scope10.set("firstName", scope10.readString("firstName"))
    scope10.set("id", scope10.readString("id"))
    scope10.set("isYou", scope10.readBoolean("isYou"))
    scope10.set("lastName", scope10.readStringOptional("lastName"))
    scope10.set("name", scope10.readString("name"))
    scope10.set("photo", scope10.readStringOptional("photo"))
    if (scope10.hasKey("primaryOrganization")) {
        val scope11 = scope10.child("primaryOrganization", "primaryOrganization")
        scope11.set("__typename", scope11.readString("__typename"))
        normalizeOrganizationShort(scope11)
    } else {
        scope10.setNull("primaryOrganization")
    }
    scope10.set("shortname", scope10.readStringOptional("shortname"))
}
fun normalizeFullMessage(scope12: Scope) {
    scope12.set("__typename", scope12.readString("__typename"))
    scope12.set("date", scope12.readString("date"))
    scope12.set("fallback", scope12.readString("fallback"))
    scope12.set("id", scope12.readString("id"))
    scope12.set("message", scope12.readStringOptional("message"))
    scope12.assertObject("sender")
    val scope13 = scope12.child("sender", "sender")
    scope13.set("__typename", scope13.readString("__typename"))
    normalizeUserShort(scope13)
    if (scope12.assertList("spans")) {
        val scope14 = scope12.childList("spans", "spans")
        for (i in 0 until scope14.size) {
            scope14.assertObject(i)
            val scope15 = scope14.child(i)
            scope15.set("__typename", scope15.readString("__typename"))
            scope15.set("length", scope15.readInt("length"))
            scope15.set("offset", scope15.readInt("offset"))
            if (scope15.isType("MessageSpanUserMention")) {
                scope15.assertObject("user")
                val scope16 = scope15.child("user", "user")
                scope16.set("__typename", scope16.readString("__typename"))
                normalizeUserTiny(scope16)
            }
            if (scope15.isType("MessageSpanMultiUserMention")) {
                if (scope15.assertList("users")) {
                    val scope17 = scope15.childList("users", "users")
                    for (i in 0 until scope17.size) {
                        scope17.assertObject(i)
                        val scope18 = scope17.child(i)
                        scope18.set("__typename", scope18.readString("__typename"))
                        normalizeUserTiny(scope18)
                    }
                    scope15.set("users", scope17.completed())
                }
            }
            if (scope15.isType("MessageSpanRoomMention")) {
                scope15.assertObject("room")
                val scope19 = scope15.child("room", "room")
                scope19.set("__typename", scope19.readString("__typename"))
                if (scope19.isType("PrivateRoom")) {
                    scope19.set("id", scope19.readString("id"))
                    scope19.assertObject("user")
                    val scope20 = scope19.child("user", "user")
                    scope20.set("__typename", scope20.readString("__typename"))
                    scope20.set("id", scope20.readString("id"))
                    scope20.set("name", scope20.readString("name"))
                }
                if (scope19.isType("SharedRoom")) {
                    scope19.set("id", scope19.readString("id"))
                    scope19.set("title", scope19.readString("title"))
                }
            }
            if (scope15.isType("MessageSpanLink")) {
                scope15.set("url", scope15.readString("url"))
            }
            if (scope15.isType("MessageSpanBold")) {
                scope15.set("length", scope15.readInt("length"))
                scope15.set("offset", scope15.readInt("offset"))
            }
        }
        scope12.set("spans", scope14.completed())
    }
    if (scope12.isType("GeneralMessage")) {
        if (scope12.assertList("attachments")) {
            val scope21 = scope12.childList("attachments", "attachments")
            for (i in 0 until scope21.size) {
                scope21.assertObject(i)
                val scope22 = scope21.child(i)
                scope22.set("__typename", scope22.readString("__typename"))
                scope22.set("fallback", scope22.readString("fallback"))
                if (scope22.isType("MessageAttachmentFile")) {
                    scope22.set("fileId", scope22.readString("fileId"))
                    scope22.assertObject("fileMetadata")
                    val scope23 = scope22.child("fileMetadata", "fileMetadata")
                    scope23.set("__typename", scope23.readString("__typename"))
                    scope23.set("imageFormat", scope23.readStringOptional("imageFormat"))
                    scope23.set("imageHeight", scope23.readIntOptional("imageHeight"))
                    scope23.set("imageWidth", scope23.readIntOptional("imageWidth"))
                    scope23.set("isImage", scope23.readBoolean("isImage"))
                    scope23.set("mimeType", scope23.readStringOptional("mimeType"))
                    scope23.set("name", scope23.readString("name"))
                    scope23.set("size", scope23.readInt("size"))
                    scope22.set("filePreview", scope22.readStringOptional("filePreview"))
                    scope22.set("id", scope22.readString("id"))
                }
                if (scope22.isType("MessageRichAttachment")) {
                    scope22.set("fallback", scope22.readString("fallback"))
                    if (scope22.hasKey("icon")) {
                        val scope24 = scope22.child("icon", "icon")
                        scope24.set("__typename", scope24.readString("__typename"))
                        if (scope24.hasKey("metadata")) {
                            val scope25 = scope24.child("metadata", "metadata")
                            scope25.set("__typename", scope25.readString("__typename"))
                            scope25.set("imageFormat", scope25.readStringOptional("imageFormat"))
                            scope25.set("imageHeight", scope25.readIntOptional("imageHeight"))
                            scope25.set("imageWidth", scope25.readIntOptional("imageWidth"))
                            scope25.set("isImage", scope25.readBoolean("isImage"))
                            scope25.set("mimeType", scope25.readStringOptional("mimeType"))
                            scope25.set("name", scope25.readString("name"))
                            scope25.set("size", scope25.readInt("size"))
                        } else {
                            scope24.setNull("metadata")
                        }
                        scope24.set("url", scope24.readString("url"))
                    } else {
                        scope22.setNull("icon")
                    }
                    if (scope22.hasKey("image")) {
                        val scope26 = scope22.child("image", "image")
                        scope26.set("__typename", scope26.readString("__typename"))
                        if (scope26.hasKey("metadata")) {
                            val scope27 = scope26.child("metadata", "metadata")
                            scope27.set("__typename", scope27.readString("__typename"))
                            scope27.set("imageFormat", scope27.readStringOptional("imageFormat"))
                            scope27.set("imageHeight", scope27.readIntOptional("imageHeight"))
                            scope27.set("imageWidth", scope27.readIntOptional("imageWidth"))
                            scope27.set("isImage", scope27.readBoolean("isImage"))
                            scope27.set("mimeType", scope27.readStringOptional("mimeType"))
                            scope27.set("name", scope27.readString("name"))
                            scope27.set("size", scope27.readInt("size"))
                        } else {
                            scope26.setNull("metadata")
                        }
                        scope26.set("url", scope26.readString("url"))
                    } else {
                        scope22.setNull("image")
                    }
                    if (scope22.hasKey("keyboard")) {
                        val scope28 = scope22.child("keyboard", "keyboard")
                        scope28.set("__typename", scope28.readString("__typename"))
                        if (scope28.assertList("buttons")) {
                            val scope29 = scope28.childList("buttons", "buttons")
                            for (i in 0 until scope29.size) {
                                if (scope29.isNotNull(i)) {
                                    val scope30 = scope29.childList(i)
                                    for (i in 0 until scope30.size) {
                                        scope30.assertObject(i)
                                        val scope31 = scope30.child(i)
                                        scope31.set("__typename", scope31.readString("__typename"))
                                        scope31.set("style", scope31.readString("style"))
                                        scope31.set("title", scope31.readString("title"))
                                        scope31.set("url", scope31.readStringOptional("url"))
                                    }
                                }
                            }
                            scope28.set("buttons", scope29.completed())
                        }
                    } else {
                        scope22.setNull("keyboard")
                    }
                    scope22.set("subTitle", scope22.readStringOptional("subTitle"))
                    scope22.set("text", scope22.readStringOptional("text"))
                    scope22.set("title", scope22.readStringOptional("title"))
                    scope22.set("titleLink", scope22.readStringOptional("titleLink"))
                    scope22.set("titleLinkHostname", scope22.readStringOptional("titleLinkHostname"))
                }
            }
            scope12.set("attachments", scope21.completed())
        }
        scope12.set("commentsCount", scope12.readInt("commentsCount"))
        scope12.set("edited", scope12.readBoolean("edited"))
        if (scope12.assertList("quotedMessages")) {
            val scope32 = scope12.childList("quotedMessages", "quotedMessages")
            for (i in 0 until scope32.size) {
                scope32.assertObject(i)
                val scope33 = scope32.child(i)
                scope33.set("__typename", scope33.readString("__typename"))
                scope33.set("date", scope33.readString("date"))
                scope33.set("fallback", scope33.readString("fallback"))
                scope33.set("id", scope33.readString("id"))
                scope33.set("message", scope33.readStringOptional("message"))
                scope33.set("message", scope33.readStringOptional("message"))
                scope33.assertObject("sender")
                val scope34 = scope33.child("sender", "sender")
                scope34.set("__typename", scope34.readString("__typename"))
                normalizeUserShort(scope34)
                if (scope33.assertList("spans")) {
                    val scope35 = scope33.childList("spans", "spans")
                    for (i in 0 until scope35.size) {
                        scope35.assertObject(i)
                        val scope36 = scope35.child(i)
                        scope36.set("__typename", scope36.readString("__typename"))
                        scope36.set("length", scope36.readInt("length"))
                        scope36.set("offset", scope36.readInt("offset"))
                        if (scope36.isType("MessageSpanUserMention")) {
                            scope36.assertObject("user")
                            val scope37 = scope36.child("user", "user")
                            scope37.set("__typename", scope37.readString("__typename"))
                            normalizeUserShort(scope37)
                        }
                        if (scope36.isType("MessageSpanMultiUserMention")) {
                            if (scope36.assertList("users")) {
                                val scope38 = scope36.childList("users", "users")
                                for (i in 0 until scope38.size) {
                                    scope38.assertObject(i)
                                    val scope39 = scope38.child(i)
                                    scope39.set("__typename", scope39.readString("__typename"))
                                    normalizeUserShort(scope39)
                                }
                                scope36.set("users", scope38.completed())
                            }
                        }
                        if (scope36.isType("MessageSpanRoomMention")) {
                            scope36.assertObject("room")
                            val scope40 = scope36.child("room", "room")
                            scope40.set("__typename", scope40.readString("__typename"))
                            if (scope40.isType("PrivateRoom")) {
                                scope40.set("id", scope40.readString("id"))
                                scope40.assertObject("user")
                                val scope41 = scope40.child("user", "user")
                                scope41.set("__typename", scope41.readString("__typename"))
                                scope41.set("id", scope41.readString("id"))
                                scope41.set("name", scope41.readString("name"))
                            }
                            if (scope40.isType("SharedRoom")) {
                                scope40.set("id", scope40.readString("id"))
                                scope40.set("title", scope40.readString("title"))
                            }
                        }
                        if (scope36.isType("MessageSpanLink")) {
                            scope36.set("url", scope36.readString("url"))
                        }
                    }
                    scope33.set("spans", scope35.completed())
                }
                if (scope33.isType("GeneralMessage")) {
                    if (scope33.assertList("attachments")) {
                        val scope42 = scope33.childList("attachments", "attachments")
                        for (i in 0 until scope42.size) {
                            scope42.assertObject(i)
                            val scope43 = scope42.child(i)
                            scope43.set("__typename", scope43.readString("__typename"))
                            scope43.set("fallback", scope43.readString("fallback"))
                            if (scope43.isType("MessageAttachmentFile")) {
                                scope43.set("fileId", scope43.readString("fileId"))
                                scope43.assertObject("fileMetadata")
                                val scope44 = scope43.child("fileMetadata", "fileMetadata")
                                scope44.set("__typename", scope44.readString("__typename"))
                                scope44.set("imageFormat", scope44.readStringOptional("imageFormat"))
                                scope44.set("imageHeight", scope44.readIntOptional("imageHeight"))
                                scope44.set("imageWidth", scope44.readIntOptional("imageWidth"))
                                scope44.set("isImage", scope44.readBoolean("isImage"))
                                scope44.set("mimeType", scope44.readStringOptional("mimeType"))
                                scope44.set("name", scope44.readString("name"))
                                scope44.set("size", scope44.readInt("size"))
                                scope43.set("filePreview", scope43.readStringOptional("filePreview"))
                            }
                            if (scope43.isType("MessageRichAttachment")) {
                                scope43.set("fallback", scope43.readString("fallback"))
                                if (scope43.hasKey("icon")) {
                                    val scope45 = scope43.child("icon", "icon")
                                    scope45.set("__typename", scope45.readString("__typename"))
                                    if (scope45.hasKey("metadata")) {
                                        val scope46 = scope45.child("metadata", "metadata")
                                        scope46.set("__typename", scope46.readString("__typename"))
                                        scope46.set("imageFormat", scope46.readStringOptional("imageFormat"))
                                        scope46.set("imageHeight", scope46.readIntOptional("imageHeight"))
                                        scope46.set("imageWidth", scope46.readIntOptional("imageWidth"))
                                        scope46.set("isImage", scope46.readBoolean("isImage"))
                                        scope46.set("mimeType", scope46.readStringOptional("mimeType"))
                                        scope46.set("name", scope46.readString("name"))
                                        scope46.set("size", scope46.readInt("size"))
                                    } else {
                                        scope45.setNull("metadata")
                                    }
                                    scope45.set("url", scope45.readString("url"))
                                } else {
                                    scope43.setNull("icon")
                                }
                                if (scope43.hasKey("image")) {
                                    val scope47 = scope43.child("image", "image")
                                    scope47.set("__typename", scope47.readString("__typename"))
                                    if (scope47.hasKey("metadata")) {
                                        val scope48 = scope47.child("metadata", "metadata")
                                        scope48.set("__typename", scope48.readString("__typename"))
                                        scope48.set("imageFormat", scope48.readStringOptional("imageFormat"))
                                        scope48.set("imageHeight", scope48.readIntOptional("imageHeight"))
                                        scope48.set("imageWidth", scope48.readIntOptional("imageWidth"))
                                        scope48.set("isImage", scope48.readBoolean("isImage"))
                                        scope48.set("mimeType", scope48.readStringOptional("mimeType"))
                                        scope48.set("name", scope48.readString("name"))
                                        scope48.set("size", scope48.readInt("size"))
                                    } else {
                                        scope47.setNull("metadata")
                                    }
                                    scope47.set("url", scope47.readString("url"))
                                } else {
                                    scope43.setNull("image")
                                }
                                scope43.set("subTitle", scope43.readStringOptional("subTitle"))
                                scope43.set("text", scope43.readStringOptional("text"))
                                scope43.set("title", scope43.readStringOptional("title"))
                                scope43.set("titleLink", scope43.readStringOptional("titleLink"))
                                scope43.set("titleLinkHostname", scope43.readStringOptional("titleLinkHostname"))
                            }
                        }
                        scope33.set("attachments", scope42.completed())
                    }
                    scope33.set("commentsCount", scope33.readInt("commentsCount"))
                    scope33.set("edited", scope33.readBoolean("edited"))
                }
            }
            scope12.set("quotedMessages", scope32.completed())
        }
        if (scope12.assertList("reactions")) {
            val scope49 = scope12.childList("reactions", "reactions")
            for (i in 0 until scope49.size) {
                scope49.assertObject(i)
                val scope50 = scope49.child(i)
                scope50.set("__typename", scope50.readString("__typename"))
                scope50.set("reaction", scope50.readString("reaction"))
                scope50.assertObject("user")
                val scope51 = scope50.child("user", "user")
                scope51.set("__typename", scope51.readString("__typename"))
                normalizeUserShort(scope51)
            }
            scope12.set("reactions", scope49.completed())
        }
    }
    if (scope12.isType("ServiceMessage")) {
        if (scope12.hasKey("serviceMetadata")) {
            val scope52 = scope12.child("serviceMetadata", "serviceMetadata")
            scope52.set("__typename", scope52.readString("__typename"))
            if (scope52.isType("InviteServiceMetadata")) {
                scope52.assertObject("invitedBy")
                val scope53 = scope52.child("invitedBy", "invitedBy")
                scope53.set("__typename", scope53.readString("__typename"))
                normalizeUserTiny(scope53)
                if (scope52.hasKey("users")) {
                    val scope54 = scope52.childList("users", "users")
                    for (i in 0 until scope54.size) {
                        scope54.assertObject(i)
                        val scope55 = scope54.child(i)
                        scope55.set("__typename", scope55.readString("__typename"))
                        normalizeUserTiny(scope55)
                    }
                } else {
                    scope52.setNull("users")
                }
            }
            if (scope52.isType("KickServiceMetadata")) {
                scope52.assertObject("kickedBy")
                val scope56 = scope52.child("kickedBy", "kickedBy")
                scope56.set("__typename", scope56.readString("__typename"))
                normalizeUserTiny(scope56)
                scope52.assertObject("user")
                val scope57 = scope52.child("user", "user")
                scope57.set("__typename", scope57.readString("__typename"))
                normalizeUserTiny(scope57)
            }
            if (scope52.isType("TitleChangeServiceMetadata")) {
                scope52.set("title", scope52.readString("title"))
            }
            if (scope52.isType("PhotoChangeServiceMetadata")) {
                scope52.set("photo", scope52.readStringOptional("photo"))
            }
            if (scope52.isType("PostRespondServiceMetadata")) {
                scope52.set("respondType", scope52.readString("respondType"))
            }
        } else {
            scope12.setNull("serviceMetadata")
        }
    }
}
fun normalizeRoomShort(scope58: Scope) {
    scope58.set("__typename", scope58.readString("__typename"))
    if (scope58.isType("PrivateRoom")) {
        scope58.set("id", scope58.readString("id"))
        scope58.assertObject("settings")
        val scope59 = scope58.child("settings", "settings")
        scope59.set("__typename", scope59.readString("__typename"))
        scope59.set("id", scope59.readString("id"))
        scope59.set("mute", scope59.readBooleanOptional("mute"))
        scope58.assertObject("user")
        val scope60 = scope58.child("user", "user")
        scope60.set("__typename", scope60.readString("__typename"))
        normalizeUserShort(scope60)
    }
    if (scope58.isType("SharedRoom")) {
        scope58.set("canEdit", scope58.readBoolean("canEdit"))
        scope58.set("canSendMessage", scope58.readBoolean("canSendMessage"))
        scope58.set("id", scope58.readString("id"))
        scope58.set("isChannel", scope58.readBoolean("isChannel"))
        scope58.set("kind", scope58.readString("kind"))
        scope58.set("membersCount", scope58.readIntOptional("membersCount"))
        scope58.set("membership", scope58.readString("membership"))
        if (scope58.hasKey("organization")) {
            val scope61 = scope58.child("organization", "organization")
            scope61.set("__typename", scope61.readString("__typename"))
            normalizeOrganizationShort(scope61)
        } else {
            scope58.setNull("organization")
        }
        scope58.set("photo", scope58.readString("photo"))
        if (scope58.hasKey("pinnedMessage")) {
            val scope62 = scope58.child("pinnedMessage", "pinnedMessage")
            scope62.set("__typename", scope62.readString("__typename"))
            normalizeFullMessage(scope62)
        } else {
            scope58.setNull("pinnedMessage")
        }
        scope58.set("role", scope58.readString("role"))
        scope58.assertObject("settings")
        val scope63 = scope58.child("settings", "settings")
        scope63.set("__typename", scope63.readString("__typename"))
        scope63.set("id", scope63.readString("id"))
        scope63.set("mute", scope63.readBooleanOptional("mute"))
        scope58.set("title", scope58.readString("title"))
    }
}
fun normalizeChatUpdateFragment(scope64: Scope) {
    scope64.set("__typename", scope64.readString("__typename"))
    if (scope64.isType("ChatMessageReceived")) {
        scope64.assertObject("message")
        val scope65 = scope64.child("message", "message")
        scope65.set("__typename", scope65.readString("__typename"))
        normalizeFullMessage(scope65)
        scope64.set("repeatKey", scope64.readStringOptional("repeatKey"))
    }
    if (scope64.isType("ChatMessageUpdated")) {
        scope64.assertObject("message")
        val scope66 = scope64.child("message", "message")
        scope66.set("__typename", scope66.readString("__typename"))
        normalizeFullMessage(scope66)
    }
    if (scope64.isType("ChatMessageDeleted")) {
        scope64.assertObject("message")
        val scope67 = scope64.child("message", "message")
        scope67.set("__typename", scope67.readString("__typename"))
        scope67.set("id", scope67.readString("id"))
    }
    if (scope64.isType("ChatUpdated")) {
        scope64.assertObject("chat")
        val scope68 = scope64.child("chat", "chat")
        scope68.set("__typename", scope68.readString("__typename"))
        normalizeRoomShort(scope68)
    }
    if (scope64.isType("ChatLostAccess")) {
        scope64.set("lostAccess", scope64.readBoolean("lostAccess"))
    }
}
fun normalizeCommentEntryFragment(scope69: Scope) {
    scope69.set("__typename", scope69.readString("__typename"))
    if (scope69.assertList("childComments")) {
        val scope70 = scope69.childList("childComments", "childComments")
        for (i in 0 until scope70.size) {
            scope70.assertObject(i)
            val scope71 = scope70.child(i)
            scope71.set("__typename", scope71.readString("__typename"))
            scope71.set("id", scope71.readString("id"))
        }
        scope69.set("childComments", scope70.completed())
    }
    scope69.assertObject("comment")
    val scope72 = scope69.child("comment", "comment")
    scope72.set("__typename", scope72.readString("__typename"))
    scope72.set("id", scope72.readString("id"))
    normalizeFullMessage(scope72)
    scope69.set("deleted", scope69.readBoolean("deleted"))
    scope69.set("id", scope69.readString("id"))
    if (scope69.hasKey("parentComment")) {
        val scope73 = scope69.child("parentComment", "parentComment")
        scope73.set("__typename", scope73.readString("__typename"))
        scope73.set("id", scope73.readString("id"))
    } else {
        scope69.setNull("parentComment")
    }
}
fun normalizeCommentUpdateFragment(scope74: Scope) {
    scope74.set("__typename", scope74.readString("__typename"))
    if (scope74.isType("CommentReceived")) {
        scope74.assertObject("comment")
        val scope75 = scope74.child("comment", "comment")
        scope75.set("__typename", scope75.readString("__typename"))
        normalizeCommentEntryFragment(scope75)
    }
    if (scope74.isType("CommentUpdated")) {
        scope74.assertObject("comment")
        val scope76 = scope74.child("comment", "comment")
        scope76.set("__typename", scope76.readString("__typename"))
        normalizeCommentEntryFragment(scope76)
    }
}
fun normalizeCommunitySearch(scope77: Scope) {
    scope77.set("__typename", scope77.readString("__typename"))
    scope77.set("about", scope77.readStringOptional("about"))
    scope77.set("alphaFeatured", scope77.readBoolean("featured"))
    scope77.set("id", scope77.readString("id"))
    scope77.set("isMine", scope77.readBoolean("isMine"))
    scope77.set("membersCount", scope77.readInt("membersCount"))
    scope77.set("name", scope77.readString("name"))
    scope77.set("photo", scope77.readStringOptional("photo"))
    scope77.set("status", scope77.readString("status"))
    scope77.set("superAccountId", scope77.readString("superAccountId"))
}
fun normalizeConferenceFull(scope78: Scope) {
    scope78.set("__typename", scope78.readString("__typename"))
    if (scope78.assertList("iceServers")) {
        val scope79 = scope78.childList("iceServers", "iceServers")
        for (i in 0 until scope79.size) {
            scope79.assertObject(i)
            val scope80 = scope79.child(i)
            scope80.set("__typename", scope80.readString("__typename"))
            scope80.set("credential", scope80.readStringOptional("credential"))
            if (scope80.assertList("urls")) {
                val scope81 = scope80.childList("urls", "urls")
                for (i in 0 until scope81.size) {
                    scope81.next(scope81.readString(i))
                }
                scope80.set("urls", scope81.completed())
            }
            scope80.set("username", scope80.readStringOptional("username"))
        }
        scope78.set("iceServers", scope79.completed())
    }
    scope78.set("id", scope78.readString("id"))
    if (scope78.assertList("peers")) {
        val scope82 = scope78.childList("peers", "peers")
        for (i in 0 until scope82.size) {
            scope82.assertObject(i)
            val scope83 = scope82.child(i)
            scope83.set("__typename", scope83.readString("__typename"))
            if (scope83.hasKey("connection")) {
                val scope84 = scope83.child("connection", "connection")
                scope84.set("__typename", scope84.readString("__typename"))
                if (scope84.assertList("ice")) {
                    val scope85 = scope84.childList("ice", "ice")
                    for (i in 0 until scope85.size) {
                        scope85.next(scope85.readString(i))
                    }
                    scope84.set("ice", scope85.completed())
                }
                scope84.set("sdp", scope84.readStringOptional("sdp"))
                scope84.set("state", scope84.readString("state"))
            } else {
                scope83.setNull("connection")
            }
            scope83.set("id", scope83.readString("id"))
            scope83.assertObject("user")
            val scope86 = scope83.child("user", "user")
            scope86.set("__typename", scope86.readString("__typename"))
            normalizeUserShort(scope86)
        }
        scope78.set("peers", scope82.completed())
    }
    scope78.set("startTime", scope78.readStringOptional("startTime"))
}
fun normalizeTinyMessage(scope87: Scope) {
    scope87.set("__typename", scope87.readString("__typename"))
    scope87.set("date", scope87.readString("date"))
    scope87.set("fallback", scope87.readString("fallback"))
    scope87.set("id", scope87.readString("id"))
    scope87.set("message", scope87.readStringOptional("message"))
    scope87.assertObject("sender")
    val scope88 = scope87.child("sender", "sender")
    scope88.set("__typename", scope88.readString("__typename"))
    normalizeUserTiny(scope88)
    if (scope87.isType("GeneralMessage")) {
        if (scope87.assertList("attachments")) {
            val scope89 = scope87.childList("attachments", "attachments")
            for (i in 0 until scope89.size) {
                scope89.assertObject(i)
                val scope90 = scope89.child(i)
                scope90.set("__typename", scope90.readString("__typename"))
                scope90.set("fallback", scope90.readString("fallback"))
                scope90.set("id", scope90.readString("id"))
                if (scope90.isType("MessageAttachmentFile")) {
                    scope90.set("fileId", scope90.readString("fileId"))
                    scope90.assertObject("fileMetadata")
                    val scope91 = scope90.child("fileMetadata", "fileMetadata")
                    scope91.set("__typename", scope91.readString("__typename"))
                    scope91.set("imageFormat", scope91.readStringOptional("imageFormat"))
                    scope91.set("isImage", scope91.readBoolean("isImage"))
                    scope90.set("filePreview", scope90.readStringOptional("filePreview"))
                }
            }
            scope87.set("attachments", scope89.completed())
        }
        scope87.set("commentsCount", scope87.readInt("commentsCount"))
        if (scope87.assertList("quotedMessages")) {
            val scope92 = scope87.childList("quotedMessages", "quotedMessages")
            for (i in 0 until scope92.size) {
                scope92.assertObject(i)
                val scope93 = scope92.child(i)
                scope93.set("__typename", scope93.readString("__typename"))
                scope93.set("id", scope93.readString("id"))
            }
            scope87.set("quotedMessages", scope92.completed())
        }
    }
}
fun normalizeDialogUpdateFragment(scope94: Scope) {
    scope94.set("__typename", scope94.readString("__typename"))
    if (scope94.isType("DialogMessageReceived")) {
        scope94.assertObject("message")
        val scope95 = scope94.child("message", "alphaMessage")
        scope95.set("__typename", scope95.readString("__typename"))
        normalizeTinyMessage(scope95)
        scope94.set("cid", scope94.readString("cid"))
        scope94.set("globalUnread", scope94.readInt("globalUnread"))
        scope94.set("unread", scope94.readInt("unread"))
    }
    if (scope94.isType("DialogMessageUpdated")) {
        scope94.assertObject("message")
        val scope96 = scope94.child("message", "alphaMessage")
        scope96.set("__typename", scope96.readString("__typename"))
        normalizeTinyMessage(scope96)
        scope94.set("cid", scope94.readString("cid"))
    }
    if (scope94.isType("DialogMessageDeleted")) {
        scope94.assertObject("message")
        val scope97 = scope94.child("message", "alphaMessage")
        scope97.set("__typename", scope97.readString("__typename"))
        normalizeTinyMessage(scope97)
        if (scope94.hasKey("prevMessage")) {
            val scope98 = scope94.child("prevMessage", "alphaPrevMessage")
            scope98.set("__typename", scope98.readString("__typename"))
            normalizeTinyMessage(scope98)
        } else {
            scope94.setNull("alphaPrevMessage")
        }
        scope94.set("cid", scope94.readString("cid"))
        scope94.set("globalUnread", scope94.readInt("globalUnread"))
        scope94.set("unread", scope94.readInt("unread"))
    }
    if (scope94.isType("DialogMessageRead")) {
        scope94.set("cid", scope94.readString("cid"))
        scope94.set("globalUnread", scope94.readInt("globalUnread"))
        scope94.set("unread", scope94.readInt("unread"))
    }
    if (scope94.isType("DialogMessageRead")) {
        scope94.set("cid", scope94.readString("cid"))
        scope94.set("globalUnread", scope94.readInt("globalUnread"))
        scope94.set("unread", scope94.readInt("unread"))
    }
    if (scope94.isType("DialogTitleUpdated")) {
        scope94.set("cid", scope94.readString("cid"))
        scope94.set("title", scope94.readString("title"))
    }
    if (scope94.isType("DialogMuteChanged")) {
        scope94.set("cid", scope94.readString("cid"))
        scope94.set("mute", scope94.readBoolean("mute"))
    }
    if (scope94.isType("DialogMentionedChanged")) {
        scope94.set("cid", scope94.readString("cid"))
        scope94.set("haveMention", scope94.readBoolean("haveMention"))
    }
    if (scope94.isType("DialogPhotoUpdated")) {
        scope94.set("cid", scope94.readString("cid"))
        scope94.set("photo", scope94.readStringOptional("photo"))
    }
    if (scope94.isType("DialogDeleted")) {
        scope94.set("cid", scope94.readString("cid"))
        scope94.set("globalUnread", scope94.readInt("globalUnread"))
    }
    if (scope94.isType("DialogBump")) {
        scope94.set("cid", scope94.readString("cid"))
        scope94.set("globalUnread", scope94.readInt("globalUnread"))
        if (scope94.hasKey("topMessage")) {
            val scope99 = scope94.child("topMessage", "topMessage")
            scope99.set("__typename", scope99.readString("__typename"))
            normalizeTinyMessage(scope99)
        } else {
            scope94.setNull("topMessage")
        }
        scope94.set("unread", scope94.readInt("unread"))
    }
}
fun normalizeUserFull(scope100: Scope) {
    scope100.set("__typename", scope100.readString("__typename"))
    scope100.set("about", scope100.readStringOptional("about"))
    scope100.set("email", scope100.readStringOptional("email"))
    scope100.set("firstName", scope100.readString("firstName"))
    scope100.set("id", scope100.readString("id"))
    scope100.set("isBot", scope100.readBoolean("isBot"))
    scope100.set("isYou", scope100.readBoolean("isYou"))
    scope100.set("lastName", scope100.readStringOptional("lastName"))
    scope100.set("lastSeen", scope100.readStringOptional("lastSeen"))
    scope100.set("linkedin", scope100.readStringOptional("linkedin"))
    scope100.set("location", scope100.readStringOptional("location"))
    scope100.set("name", scope100.readString("name"))
    scope100.set("online", scope100.readBoolean("online"))
    scope100.set("phone", scope100.readStringOptional("phone"))
    scope100.set("photo", scope100.readStringOptional("photo"))
    if (scope100.hasKey("primaryOrganization")) {
        val scope101 = scope100.child("primaryOrganization", "primaryOrganization")
        scope101.set("__typename", scope101.readString("__typename"))
        normalizeOrganizationShort(scope101)
    } else {
        scope100.setNull("primaryOrganization")
    }
    scope100.set("shortname", scope100.readStringOptional("shortname"))
    scope100.set("twitter", scope100.readStringOptional("twitter"))
    scope100.set("website", scope100.readStringOptional("website"))
}
fun normalizeOrganizationFull(scope102: Scope) {
    scope102.set("__typename", scope102.readString("__typename"))
    scope102.set("about", scope102.readStringOptional("about"))
    scope102.set("alphaFeatured", scope102.readBoolean("featured"))
    scope102.set("alphaIsCommunity", scope102.readBoolean("isCommunity"))
    if (scope102.assertList("requests")) {
        val scope103 = scope102.childList("requests", "alphaOrganizationMemberRequests")
        for (i in 0 until scope103.size) {
            scope103.assertObject(i)
            val scope104 = scope103.child(i)
            scope104.set("__typename", scope104.readString("__typename"))
            scope104.set("role", scope104.readString("role"))
            scope104.assertObject("user")
            val scope105 = scope104.child("user", "user")
            scope105.set("__typename", scope105.readString("__typename"))
            normalizeUserFull(scope105)
        }
        scope102.set("alphaOrganizationMemberRequests", scope103.completed())
    }
    if (scope102.assertList("members")) {
        val scope106 = scope102.childList("members", "alphaOrganizationMembers")
        for (i in 0 until scope106.size) {
            scope106.assertObject(i)
            val scope107 = scope106.child(i)
            scope107.set("__typename", scope107.readString("__typename"))
            scope107.set("role", scope107.readString("role"))
            scope107.assertObject("user")
            val scope108 = scope107.child("user", "user")
            scope108.set("__typename", scope108.readString("__typename"))
            normalizeUserFull(scope108)
        }
        scope102.set("alphaOrganizationMembers", scope106.completed())
    }
    scope102.set("betaIsAdmin", scope102.readBoolean("isAdmin"))
    scope102.set("betaIsOwner", scope102.readBoolean("isOwner"))
    if (scope102.assertList("rooms")) {
        val scope109 = scope102.childList("rooms", "betaPublicRooms")
        for (i in 0 until scope109.size) {
            scope109.assertObject(i)
            val scope110 = scope109.child(i)
            scope110.set("__typename", scope110.readString("__typename"))
            normalizeRoomShort(scope110)
        }
        scope102.set("betaPublicRooms", scope109.completed())
    }
    scope102.set("facebook", scope102.readStringOptional("facebook"))
    scope102.set("id", scope102.readString("id"))
    scope102.set("isMine", scope102.readBoolean("isMine"))
    scope102.set("linkedin", scope102.readStringOptional("linkedin"))
    scope102.set("membersCount", scope102.readInt("membersCount"))
    scope102.set("name", scope102.readString("name"))
    scope102.set("photo", scope102.readStringOptional("photo"))
    scope102.set("shortname", scope102.readStringOptional("shortname"))
    scope102.set("superAccountId", scope102.readString("superAccountId"))
    scope102.set("twitter", scope102.readStringOptional("twitter"))
    scope102.set("website", scope102.readStringOptional("website"))
}
fun normalizeOrganizationMedium(scope111: Scope) {
    scope111.set("__typename", scope111.readString("__typename"))
    scope111.set("alphaIsCommunity", scope111.readBoolean("isCommunity"))
    if (scope111.assertList("adminMembers")) {
        val scope112 = scope111.childList("adminMembers", "alphaOrganizationAdminMembers")
        for (i in 0 until scope112.size) {
            scope112.assertObject(i)
            val scope113 = scope112.child(i)
            scope113.set("__typename", scope113.readString("__typename"))
            scope113.set("role", scope113.readString("role"))
            scope113.assertObject("user")
            val scope114 = scope113.child("user", "user")
            scope114.set("__typename", scope114.readString("__typename"))
            normalizeUserFull(scope114)
        }
        scope111.set("alphaOrganizationAdminMembers", scope112.completed())
    }
    scope111.set("betaIsAdmin", scope111.readBoolean("isAdmin"))
    scope111.set("betaIsOwner", scope111.readBoolean("isOwner"))
    scope111.set("id", scope111.readString("id"))
    scope111.set("isMine", scope111.readBoolean("isMine"))
    scope111.set("membersCount", scope111.readInt("membersCount"))
    scope111.set("name", scope111.readString("name"))
    scope111.set("photo", scope111.readStringOptional("photo"))
}
fun normalizeOrganizationProfileFull(scope115: Scope) {
    scope115.set("__typename", scope115.readString("__typename"))
    scope115.set("about", scope115.readStringOptional("about"))
    scope115.set("alphaFeatured", scope115.readBoolean("featured"))
    scope115.set("facebook", scope115.readStringOptional("facebook"))
    scope115.set("id", scope115.readString("id"))
    scope115.set("linkedin", scope115.readStringOptional("linkedin"))
    scope115.set("name", scope115.readString("name"))
    if (scope115.hasKey("photoRef")) {
        val scope116 = scope115.child("photoRef", "photoRef")
        scope116.set("__typename", scope116.readString("__typename"))
        if (scope116.hasKey("crop")) {
            val scope117 = scope116.child("crop", "crop")
            scope117.set("__typename", scope117.readString("__typename"))
            scope117.set("h", scope117.readInt("h"))
            scope117.set("w", scope117.readInt("w"))
            scope117.set("x", scope117.readInt("x"))
            scope117.set("y", scope117.readInt("y"))
        } else {
            scope116.setNull("crop")
        }
        scope116.set("uuid", scope116.readString("uuid"))
    } else {
        scope115.setNull("photoRef")
    }
    scope115.set("shortname", scope115.readStringOptional("shortname"))
    scope115.set("twitter", scope115.readStringOptional("twitter"))
    scope115.set("website", scope115.readStringOptional("website"))
    scope115.set("websiteTitle", scope115.readStringOptional("websiteTitle"))
}
fun normalizeOrganizationSearch(scope118: Scope) {
    scope118.set("__typename", scope118.readString("__typename"))
    scope118.set("about", scope118.readStringOptional("about"))
    scope118.set("alphaFeatured", scope118.readBoolean("featured"))
    if (scope118.assertList("members")) {
        val scope119 = scope118.childList("members", "alphaOrganizationMembers")
        for (i in 0 until scope119.size) {
            scope119.assertObject(i)
            val scope120 = scope119.child(i)
            scope120.set("__typename", scope120.readString("__typename"))
            scope120.assertObject("user")
            val scope121 = scope120.child("user", "user")
            scope121.set("__typename", scope121.readString("__typename"))
            scope121.set("id", scope121.readString("id"))
            scope121.set("name", scope121.readString("name"))
            scope121.set("photo", scope121.readStringOptional("photo"))
        }
        scope118.set("alphaOrganizationMembers", scope119.completed())
    }
    scope118.set("id", scope118.readString("id"))
    scope118.set("isMine", scope118.readBoolean("isMine"))
    scope118.set("membersCount", scope118.readInt("membersCount"))
    scope118.set("name", scope118.readString("name"))
    scope118.set("photo", scope118.readStringOptional("photo"))
    scope118.set("status", scope118.readString("status"))
    scope118.set("superAccountId", scope118.readString("superAccountId"))
}
fun normalizeOrganizationWithoutMembersFragment(scope122: Scope) {
    scope122.set("__typename", scope122.readString("__typename"))
    scope122.set("about", scope122.readStringOptional("about"))
    scope122.set("alphaFeatured", scope122.readBoolean("featured"))
    scope122.set("alphaIsCommunity", scope122.readBoolean("isCommunity"))
    if (scope122.assertList("requests")) {
        val scope123 = scope122.childList("requests", "alphaOrganizationMemberRequests")
        for (i in 0 until scope123.size) {
            scope123.assertObject(i)
            val scope124 = scope123.child(i)
            scope124.set("__typename", scope124.readString("__typename"))
            scope124.set("role", scope124.readString("role"))
            scope124.assertObject("user")
            val scope125 = scope124.child("user", "user")
            scope125.set("__typename", scope125.readString("__typename"))
            normalizeUserFull(scope125)
        }
        scope122.set("alphaOrganizationMemberRequests", scope123.completed())
    }
    scope122.set("betaIsAdmin", scope122.readBoolean("isAdmin"))
    scope122.set("betaIsOwner", scope122.readBoolean("isOwner"))
    if (scope122.assertList("rooms")) {
        val scope126 = scope122.childList("rooms", "betaPublicRooms")
        for (i in 0 until scope126.size) {
            scope126.assertObject(i)
            val scope127 = scope126.child(i)
            scope127.set("__typename", scope127.readString("__typename"))
            normalizeRoomShort(scope127)
        }
        scope122.set("betaPublicRooms", scope126.completed())
    }
    scope122.set("facebook", scope122.readStringOptional("facebook"))
    scope122.set("id", scope122.readString("id"))
    scope122.set("isMine", scope122.readBoolean("isMine"))
    scope122.set("linkedin", scope122.readStringOptional("linkedin"))
    scope122.set("membersCount", scope122.readInt("membersCount"))
    scope122.set("name", scope122.readString("name"))
    scope122.set("photo", scope122.readStringOptional("photo"))
    scope122.set("shortname", scope122.readStringOptional("shortname"))
    scope122.set("superAccountId", scope122.readString("superAccountId"))
    scope122.set("twitter", scope122.readStringOptional("twitter"))
    scope122.set("website", scope122.readStringOptional("website"))
}
fun normalizeRoomFull(scope128: Scope) {
    scope128.set("__typename", scope128.readString("__typename"))
    if (scope128.isType("PrivateRoom")) {
        scope128.set("id", scope128.readString("id"))
        scope128.assertObject("settings")
        val scope129 = scope128.child("settings", "settings")
        scope129.set("__typename", scope129.readString("__typename"))
        scope129.set("id", scope129.readString("id"))
        scope129.set("mute", scope129.readBooleanOptional("mute"))
        scope128.assertObject("user")
        val scope130 = scope128.child("user", "user")
        scope130.set("__typename", scope130.readString("__typename"))
        normalizeUserShort(scope130)
    }
    if (scope128.isType("SharedRoom")) {
        scope128.set("canEdit", scope128.readBoolean("canEdit"))
        scope128.set("canSendMessage", scope128.readBoolean("canSendMessage"))
        scope128.set("description", scope128.readStringOptional("description"))
        scope128.set("id", scope128.readString("id"))
        scope128.set("isChannel", scope128.readBoolean("isChannel"))
        scope128.set("kind", scope128.readString("kind"))
        if (scope128.assertList("members")) {
            val scope131 = scope128.childList("members", "members")
            for (i in 0 until scope131.size) {
                scope131.assertObject(i)
                val scope132 = scope131.child(i)
                scope132.set("__typename", scope132.readString("__typename"))
                scope132.set("canKick", scope132.readBoolean("canKick"))
                scope132.set("membership", scope132.readString("membership"))
                scope132.set("role", scope132.readString("role"))
                scope132.assertObject("user")
                val scope133 = scope132.child("user", "user")
                scope133.set("__typename", scope133.readString("__typename"))
                normalizeUserShort(scope133)
            }
            scope128.set("members", scope131.completed())
        }
        scope128.set("membersCount", scope128.readIntOptional("membersCount"))
        scope128.set("membership", scope128.readString("membership"))
        if (scope128.hasKey("organization")) {
            val scope134 = scope128.child("organization", "organization")
            scope134.set("__typename", scope134.readString("__typename"))
            normalizeOrganizationMedium(scope134)
        } else {
            scope128.setNull("organization")
        }
        scope128.set("photo", scope128.readString("photo"))
        if (scope128.hasKey("pinnedMessage")) {
            val scope135 = scope128.child("pinnedMessage", "pinnedMessage")
            scope135.set("__typename", scope135.readString("__typename"))
            normalizeFullMessage(scope135)
        } else {
            scope128.setNull("pinnedMessage")
        }
        if (scope128.hasKey("requests")) {
            val scope136 = scope128.childList("requests", "requests")
            for (i in 0 until scope136.size) {
                scope136.assertObject(i)
                val scope137 = scope136.child(i)
                scope137.set("__typename", scope137.readString("__typename"))
                scope137.assertObject("user")
                val scope138 = scope137.child("user", "user")
                scope138.set("__typename", scope138.readString("__typename"))
                normalizeUserShort(scope138)
            }
        } else {
            scope128.setNull("requests")
        }
        scope128.set("role", scope128.readString("role"))
        scope128.assertObject("settings")
        val scope139 = scope128.child("settings", "settings")
        scope139.set("__typename", scope139.readString("__typename"))
        scope139.set("id", scope139.readString("id"))
        scope139.set("mute", scope139.readBooleanOptional("mute"))
        scope128.set("socialImage", scope128.readStringOptional("socialImage"))
        scope128.set("title", scope128.readString("title"))
        if (scope128.hasKey("welcomeMessage")) {
            val scope140 = scope128.child("welcomeMessage", "welcomeMessage")
            scope140.set("__typename", scope140.readString("__typename"))
            scope140.set("isOn", scope140.readBoolean("isOn"))
            scope140.set("message", scope140.readStringOptional("message"))
            if (scope140.hasKey("sender")) {
                val scope141 = scope140.child("sender", "sender")
                scope141.set("__typename", scope141.readString("__typename"))
                scope141.set("id", scope141.readString("id"))
                scope141.set("name", scope141.readString("name"))
            } else {
                scope140.setNull("sender")
            }
        } else {
            scope128.setNull("welcomeMessage")
        }
    }
}
fun normalizeRoomFullWithoutMembers(scope142: Scope) {
    scope142.set("__typename", scope142.readString("__typename"))
    if (scope142.isType("PrivateRoom")) {
        scope142.set("id", scope142.readString("id"))
        scope142.assertObject("settings")
        val scope143 = scope142.child("settings", "settings")
        scope143.set("__typename", scope143.readString("__typename"))
        scope143.set("id", scope143.readString("id"))
        scope143.set("mute", scope143.readBooleanOptional("mute"))
        scope142.assertObject("user")
        val scope144 = scope142.child("user", "user")
        scope144.set("__typename", scope144.readString("__typename"))
        normalizeUserShort(scope144)
    }
    if (scope142.isType("SharedRoom")) {
        scope142.set("canEdit", scope142.readBoolean("canEdit"))
        scope142.set("canSendMessage", scope142.readBoolean("canSendMessage"))
        scope142.set("description", scope142.readStringOptional("description"))
        scope142.set("id", scope142.readString("id"))
        scope142.set("isChannel", scope142.readBoolean("isChannel"))
        scope142.set("kind", scope142.readString("kind"))
        scope142.set("membersCount", scope142.readIntOptional("membersCount"))
        scope142.set("membership", scope142.readString("membership"))
        if (scope142.hasKey("organization")) {
            val scope145 = scope142.child("organization", "organization")
            scope145.set("__typename", scope145.readString("__typename"))
            normalizeOrganizationMedium(scope145)
        } else {
            scope142.setNull("organization")
        }
        scope142.set("photo", scope142.readString("photo"))
        if (scope142.hasKey("pinnedMessage")) {
            val scope146 = scope142.child("pinnedMessage", "pinnedMessage")
            scope146.set("__typename", scope146.readString("__typename"))
            normalizeFullMessage(scope146)
        } else {
            scope142.setNull("pinnedMessage")
        }
        scope142.set("role", scope142.readString("role"))
        scope142.assertObject("settings")
        val scope147 = scope142.child("settings", "settings")
        scope147.set("__typename", scope147.readString("__typename"))
        scope147.set("id", scope147.readString("id"))
        scope147.set("mute", scope147.readBooleanOptional("mute"))
        scope142.set("socialImage", scope142.readStringOptional("socialImage"))
        scope142.set("title", scope142.readString("title"))
        if (scope142.hasKey("welcomeMessage")) {
            val scope148 = scope142.child("welcomeMessage", "welcomeMessage")
            scope148.set("__typename", scope148.readString("__typename"))
            scope148.set("isOn", scope148.readBoolean("isOn"))
            scope148.set("message", scope148.readStringOptional("message"))
            if (scope148.hasKey("sender")) {
                val scope149 = scope148.child("sender", "sender")
                scope149.set("__typename", scope149.readString("__typename"))
                scope149.set("id", scope149.readString("id"))
                scope149.set("name", scope149.readString("name"))
            } else {
                scope148.setNull("sender")
            }
        } else {
            scope142.setNull("welcomeMessage")
        }
    }
}
fun normalizeSessionStateFull(scope150: Scope) {
    scope150.set("__typename", scope150.readString("__typename"))
    scope150.set("isAccountActivated", scope150.readBoolean("isAccountActivated"))
    scope150.set("isAccountExists", scope150.readBoolean("isAccountExists"))
    scope150.set("isAccountPicked", scope150.readBoolean("isAccountPicked"))
    scope150.set("isBlocked", scope150.readBoolean("isBlocked"))
    scope150.set("isCompleted", scope150.readBoolean("isCompleted"))
    scope150.set("isLoggedIn", scope150.readBoolean("isLoggedIn"))
    scope150.set("isProfileCreated", scope150.readBoolean("isProfileCreated"))
}
fun normalizeSettingsFull(scope151: Scope) {
    scope151.set("__typename", scope151.readString("__typename"))
    scope151.set("desktopNotifications", scope151.readString("desktopNotifications"))
    scope151.set("emailFrequency", scope151.readString("emailFrequency"))
    scope151.set("id", scope151.readString("id"))
    scope151.set("mobileAlert", scope151.readBoolean("mobileAlert"))
    scope151.set("mobileIncludeText", scope151.readBoolean("mobileIncludeText"))
    scope151.set("mobileNotifications", scope151.readString("mobileNotifications"))
    scope151.set("primaryEmail", scope151.readString("primaryEmail"))
}
fun normalizeAccount(scope152: Scope) {
    if (scope152.hasKey("me")) {
        val scope153 = scope152.child("me", "me")
        scope153.set("__typename", scope153.readString("__typename"))
        normalizeUserShort(scope153)
    } else {
        scope152.setNull("me")
    }
    scope152.assertObject("myPermissions")
    val scope154 = scope152.child("myPermissions", "myPermissions")
    scope154.set("__typename", scope154.readString("__typename"))
    if (scope154.assertList("roles")) {
        val scope155 = scope154.childList("roles", "roles")
        for (i in 0 until scope155.size) {
            scope155.next(scope155.readString(i))
        }
        scope154.set("roles", scope155.completed())
    }
    scope152.assertObject("sessionState")
    val scope156 = scope152.child("sessionState", "sessionState")
    scope156.set("__typename", scope156.readString("__typename"))
    normalizeSessionStateFull(scope156)
}
fun normalizeAccountAppInvite(scope157: Scope) {
    scope157.set("appInvite", scope157.readString("invite"))
}
fun normalizeAccountAppInviteInfo(scope158: Scope) {
    if (scope158.hasKey("invite")) {
        val scope159 = scope158.child("invite", "alphaInviteInfo" + scope158.formatArguments("key" to scope158.argumentKey("inviteKey")))
        scope159.set("__typename", scope159.readString("__typename"))
        if (scope159.hasKey("creator")) {
            val scope160 = scope159.child("creator", "creator")
            scope160.set("__typename", scope160.readString("__typename"))
            normalizeUserShort(scope160)
        } else {
            scope159.setNull("creator")
        }
    } else {
        scope158.setNull("alphaInviteInfo" + scope158.formatArguments("key" to scope158.argumentKey("inviteKey")))
    }
    if (scope158.hasKey("appInvite")) {
        val scope161 = scope158.child("appInvite", "appInviteInfo" + scope158.formatArguments("key" to scope158.argumentKey("inviteKey")))
        scope161.set("__typename", scope161.readString("__typename"))
        scope161.assertObject("inviter")
        val scope162 = scope161.child("inviter", "inviter")
        scope162.set("__typename", scope162.readString("__typename"))
        normalizeUserShort(scope162)
    } else {
        scope158.setNull("appInviteInfo" + scope158.formatArguments("key" to scope158.argumentKey("inviteKey")))
    }
}
fun normalizeAccountInviteInfo(scope163: Scope) {
    if (scope163.hasKey("invite")) {
        val scope164 = scope163.child("invite", "alphaInviteInfo" + scope163.formatArguments("key" to scope163.argumentKey("inviteKey")))
        scope164.set("__typename", scope164.readString("__typename"))
        if (scope164.hasKey("creator")) {
            val scope165 = scope164.child("creator", "creator")
            scope165.set("__typename", scope165.readString("__typename"))
            normalizeUserShort(scope165)
        } else {
            scope164.setNull("creator")
        }
        scope164.set("forEmail", scope164.readStringOptional("forEmail"))
        scope164.set("forName", scope164.readStringOptional("forName"))
        scope164.set("id", scope164.readString("id"))
        scope164.set("joined", scope164.readBoolean("joined"))
        scope164.set("key", scope164.readString("key"))
        scope164.set("membersCount", scope164.readIntOptional("membersCount"))
        scope164.set("orgId", scope164.readString("orgId"))
        if (scope164.hasKey("organization")) {
            val scope166 = scope164.child("organization", "organization")
            scope166.set("__typename", scope166.readString("__typename"))
            scope166.set("about", scope166.readStringOptional("about"))
            scope166.set("alphaIsCommunity", scope166.readBoolean("isCommunity"))
        } else {
            scope164.setNull("organization")
        }
        scope164.set("photo", scope164.readStringOptional("photo"))
        scope164.set("title", scope164.readString("title"))
    } else {
        scope163.setNull("alphaInviteInfo" + scope163.formatArguments("key" to scope163.argumentKey("inviteKey")))
    }
}
fun normalizeAccountInvites(scope167: Scope) {
    if (scope167.hasKey("invites")) {
        val scope168 = scope167.childList("invites", "alphaInvites")
        for (i in 0 until scope168.size) {
            scope168.assertObject(i)
            val scope169 = scope168.child(i)
            scope169.set("__typename", scope169.readString("__typename"))
            scope169.set("id", scope169.readString("id"))
            scope169.set("key", scope169.readString("key"))
        }
    } else {
        scope167.setNull("alphaInvites")
    }
}
fun normalizeAccountInvitesHistory(scope170: Scope) {
    if (scope170.hasKey("invites")) {
        val scope171 = scope170.childList("invites", "alphaInvitesHistory")
        for (i in 0 until scope171.size) {
            scope171.assertObject(i)
            val scope172 = scope171.child(i)
            scope172.set("__typename", scope172.readString("__typename"))
            if (scope172.hasKey("acceptedBy")) {
                val scope173 = scope172.child("acceptedBy", "acceptedBy")
                scope173.set("__typename", scope173.readString("__typename"))
                scope173.set("id", scope173.readString("id"))
                scope173.set("name", scope173.readString("name"))
                scope173.set("picture", scope173.readStringOptional("picture"))
            } else {
                scope172.setNull("acceptedBy")
            }
            scope172.set("forEmail", scope172.readString("forEmail"))
            scope172.set("isGlobal", scope172.readBoolean("isGlobal"))
        }
    } else {
        scope170.setNull("alphaInvitesHistory")
    }
}
fun normalizeAccountSettings(scope174: Scope) {
    if (scope174.hasKey("me")) {
        val scope175 = scope174.child("me", "me")
        scope175.set("__typename", scope175.readString("__typename"))
        normalizeUserShort(scope175)
    } else {
        scope174.setNull("me")
    }
    if (scope174.assertList("organizations")) {
        val scope176 = scope174.childList("organizations", "myOrganizations")
        for (i in 0 until scope176.size) {
            scope176.assertObject(i)
            val scope177 = scope176.child(i)
            scope177.set("__typename", scope177.readString("__typename"))
            normalizeOrganizationShort(scope177)
        }
        scope174.set("myOrganizations", scope176.completed())
    }
}
fun normalizeAvailableRooms(scope178: Scope) {
    if (scope178.assertList("rooms")) {
        val scope179 = scope178.childList("rooms", "betaAvailableRooms")
        for (i in 0 until scope179.size) {
            scope179.assertObject(i)
            val scope180 = scope179.child(i)
            scope180.set("__typename", scope180.readString("__typename"))
            if (scope180.isType("SharedRoom")) {
                scope180.set("id", scope180.readString("id"))
                scope180.set("kind", scope180.readString("kind"))
                scope180.set("membersCount", scope180.readIntOptional("membersCount"))
                scope180.set("membership", scope180.readString("membership"))
                if (scope180.hasKey("organization")) {
                    val scope181 = scope180.child("organization", "organization")
                    scope181.set("__typename", scope181.readString("__typename"))
                    scope181.set("id", scope181.readString("id"))
                    scope181.set("name", scope181.readString("name"))
                    scope181.set("photo", scope181.readStringOptional("photo"))
                } else {
                    scope180.setNull("organization")
                }
                scope180.set("photo", scope180.readString("photo"))
                scope180.set("title", scope180.readString("title"))
            }
        }
        scope178.set("betaAvailableRooms", scope179.completed())
    }
}
fun normalizeChatHistory(scope182: Scope) {
    scope182.assertObject("state")
    val scope183 = scope182.child("state", "conversationState" + scope182.formatArguments("id" to scope182.argumentKey("chatId")))
    scope183.set("__typename", scope183.readString("__typename"))
    scope183.set("state", scope183.readStringOptional("state"))
    if (scope182.assertList("messages")) {
        val scope184 = scope182.childList("messages", "messages" + scope182.formatArguments("before" to scope182.argumentKey("before"),"chatId" to scope182.argumentKey("chatId"),"first" to scope182.argumentKey("first")))
        for (i in 0 until scope184.size) {
            scope184.assertObject(i)
            val scope185 = scope184.child(i)
            scope185.set("__typename", scope185.readString("__typename"))
            normalizeFullMessage(scope185)
        }
        scope182.set("messages" + scope182.formatArguments("before" to scope182.argumentKey("before"),"chatId" to scope182.argumentKey("chatId"),"first" to scope182.argumentKey("first")), scope184.completed())
    }
}
fun normalizeChatInit(scope186: Scope) {
    scope186.assertObject("state")
    val scope187 = scope186.child("state", "conversationState" + scope186.formatArguments("id" to scope186.argumentKey("chatId")))
    scope187.set("__typename", scope187.readString("__typename"))
    scope187.set("state", scope187.readStringOptional("state"))
    if (scope186.assertList("messages")) {
        val scope188 = scope186.childList("messages", "messages" + scope186.formatArguments("before" to scope186.argumentKey("before"),"chatId" to scope186.argumentKey("chatId"),"first" to scope186.argumentKey("first")))
        for (i in 0 until scope188.size) {
            scope188.assertObject(i)
            val scope189 = scope188.child(i)
            scope189.set("__typename", scope189.readString("__typename"))
            normalizeFullMessage(scope189)
        }
        scope186.set("messages" + scope186.formatArguments("before" to scope186.argumentKey("before"),"chatId" to scope186.argumentKey("chatId"),"first" to scope186.argumentKey("first")), scope188.completed())
    }
    if (scope186.hasKey("room")) {
        val scope190 = scope186.child("room", "room" + scope186.formatArguments("id" to scope186.argumentKey("chatId")))
        scope190.set("__typename", scope190.readString("__typename"))
        normalizeRoomShort(scope190)
    } else {
        scope186.setNull("room" + scope186.formatArguments("id" to scope186.argumentKey("chatId")))
    }
}
fun normalizeChatSearchGroup(scope191: Scope) {
    if (scope191.hasKey("group")) {
        val scope192 = scope191.child("group", "alphaChatSearch" + scope191.formatArguments("members" to scope191.argumentKey("members")))
        scope192.set("__typename", scope192.readString("__typename"))
        scope192.set("flexibleId", scope192.readString("flexibleId"))
        scope192.set("id", scope192.readString("id"))
    } else {
        scope191.setNull("alphaChatSearch" + scope191.formatArguments("members" to scope191.argumentKey("members")))
    }
}
fun normalizeConference(scope193: Scope) {
    scope193.assertObject("conference")
    val scope194 = scope193.child("conference", "conference" + scope193.formatArguments("id" to scope193.argumentKey("id")))
    scope194.set("__typename", scope194.readString("__typename"))
    normalizeConferenceFull(scope194)
}
fun normalizeConferenceMedia(scope195: Scope) {
    scope195.assertObject("conferenceMedia")
    val scope196 = scope195.child("conferenceMedia", "conferenceMedia" + scope195.formatArguments("id" to scope195.argumentKey("id"),"peerId" to scope195.argumentKey("peerId")))
    scope196.set("__typename", scope196.readString("__typename"))
    if (scope196.assertList("iceServers")) {
        val scope197 = scope196.childList("iceServers", "iceServers")
        for (i in 0 until scope197.size) {
            scope197.assertObject(i)
            val scope198 = scope197.child(i)
            scope198.set("__typename", scope198.readString("__typename"))
            scope198.set("credential", scope198.readStringOptional("credential"))
            if (scope198.assertList("urls")) {
                val scope199 = scope198.childList("urls", "urls")
                for (i in 0 until scope199.size) {
                    scope199.next(scope199.readString(i))
                }
                scope198.set("urls", scope199.completed())
            }
            scope198.set("username", scope198.readStringOptional("username"))
        }
        scope196.set("iceServers", scope197.completed())
    }
    scope196.set("id", scope196.readString("id"))
    if (scope196.assertList("streams")) {
        val scope200 = scope196.childList("streams", "streams")
        for (i in 0 until scope200.size) {
            scope200.assertObject(i)
            val scope201 = scope200.child(i)
            scope201.set("__typename", scope201.readString("__typename"))
            if (scope201.assertList("ice")) {
                val scope202 = scope201.childList("ice", "ice")
                for (i in 0 until scope202.size) {
                    scope202.next(scope202.readString(i))
                }
                scope201.set("ice", scope202.completed())
            }
            scope201.set("id", scope201.readString("id"))
            scope201.set("sdp", scope201.readStringOptional("sdp"))
            scope201.set("state", scope201.readString("state"))
        }
        scope196.set("streams", scope200.completed())
    }
}
fun normalizeDialogs(scope203: Scope) {
    scope203.assertObject("counter")
    val scope204 = scope203.child("counter", "alphaNotificationCounter")
    scope204.set("__typename", scope204.readString("__typename"))
    scope204.set("id", scope204.readString("id"))
    scope204.set("unreadCount", scope204.readInt("unreadCount"))
    scope203.assertObject("dialogs")
    val scope205 = scope203.child("dialogs", "dialogs" + scope203.formatArguments("after" to scope203.argumentKey("after"),"first" to "20"))
    scope205.set("__typename", scope205.readString("__typename"))
    scope205.set("cursor", scope205.readStringOptional("cursor"))
    if (scope205.assertList("items")) {
        val scope206 = scope205.childList("items", "items")
        for (i in 0 until scope206.size) {
            scope206.assertObject(i)
            val scope207 = scope206.child(i)
            scope207.set("__typename", scope207.readString("__typename"))
            if (scope207.hasKey("topMessage")) {
                val scope208 = scope207.child("topMessage", "alphaTopMessage")
                scope208.set("__typename", scope208.readString("__typename"))
                normalizeTinyMessage(scope208)
            } else {
                scope207.setNull("alphaTopMessage")
            }
            scope207.set("cid", scope207.readString("cid"))
            scope207.set("fid", scope207.readString("fid"))
            scope207.set("haveMention", scope207.readBoolean("haveMention"))
            scope207.set("isChannel", scope207.readBoolean("isChannel"))
            scope207.set("isMuted", scope207.readBoolean("isMuted"))
            scope207.set("kind", scope207.readString("kind"))
            scope207.set("photo", scope207.readString("photo"))
            scope207.set("title", scope207.readString("title"))
            scope207.set("unreadCount", scope207.readInt("unreadCount"))
        }
        scope205.set("items", scope206.completed())
    }
    scope203.assertObject("state")
    val scope209 = scope203.child("state", "dialogsState")
    scope209.set("__typename", scope209.readString("__typename"))
    scope209.set("state", scope209.readStringOptional("state"))
}
fun normalizeExploreCommunity(scope210: Scope) {
    scope210.assertObject("items")
    val scope211 = scope210.child("items", "alphaComunityPrefixSearch" + scope210.formatArguments("first" to "25","page" to scope210.argumentKey("page"),"query" to scope210.argumentKey("query"),"sort" to scope210.argumentKey("sort")))
    scope211.set("__typename", scope211.readString("__typename"))
    if (scope211.assertList("edges")) {
        val scope212 = scope211.childList("edges", "edges")
        for (i in 0 until scope212.size) {
            scope212.assertObject(i)
            val scope213 = scope212.child(i)
            scope213.set("__typename", scope213.readString("__typename"))
            scope213.set("cursor", scope213.readString("cursor"))
            scope213.assertObject("node")
            val scope214 = scope213.child("node", "node")
            scope214.set("__typename", scope214.readString("__typename"))
            normalizeCommunitySearch(scope214)
        }
        scope211.set("edges", scope212.completed())
    }
    scope211.assertObject("pageInfo")
    val scope215 = scope211.child("pageInfo", "pageInfo")
    scope215.set("__typename", scope215.readString("__typename"))
    scope215.set("currentPage", scope215.readInt("currentPage"))
    scope215.set("hasNextPage", scope215.readBoolean("hasNextPage"))
    scope215.set("hasPreviousPage", scope215.readBoolean("hasPreviousPage"))
    scope215.set("itemsCount", scope215.readInt("itemsCount"))
    scope215.set("openEnded", scope215.readBoolean("openEnded"))
    scope215.set("pagesCount", scope215.readInt("pagesCount"))
}
fun normalizeExploreOrganizations(scope216: Scope) {
    scope216.assertObject("items")
    val scope217 = scope216.child("items", "alphaOrganizations" + scope216.formatArguments("after" to scope216.argumentKey("after"),"all" to scope216.argumentKey("all"),"first" to "25","page" to scope216.argumentKey("page"),"prefix" to scope216.argumentKey("prefix"),"query" to scope216.argumentKey("query"),"sort" to scope216.argumentKey("sort")))
    scope217.set("__typename", scope217.readString("__typename"))
    if (scope217.assertList("edges")) {
        val scope218 = scope217.childList("edges", "edges")
        for (i in 0 until scope218.size) {
            scope218.assertObject(i)
            val scope219 = scope218.child(i)
            scope219.set("__typename", scope219.readString("__typename"))
            scope219.set("cursor", scope219.readString("cursor"))
            scope219.assertObject("node")
            val scope220 = scope219.child("node", "node")
            scope220.set("__typename", scope220.readString("__typename"))
            normalizeOrganizationSearch(scope220)
        }
        scope217.set("edges", scope218.completed())
    }
    scope217.assertObject("pageInfo")
    val scope221 = scope217.child("pageInfo", "pageInfo")
    scope221.set("__typename", scope221.readString("__typename"))
    scope221.set("currentPage", scope221.readInt("currentPage"))
    scope221.set("hasNextPage", scope221.readBoolean("hasNextPage"))
    scope221.set("hasPreviousPage", scope221.readBoolean("hasPreviousPage"))
    scope221.set("itemsCount", scope221.readInt("itemsCount"))
    scope221.set("openEnded", scope221.readBoolean("openEnded"))
    scope221.set("pagesCount", scope221.readInt("pagesCount"))
}
fun normalizeExplorePeople(scope222: Scope) {
    scope222.assertObject("items")
    val scope223 = scope222.child("items", "userSearch" + scope222.formatArguments("after" to scope222.argumentKey("after"),"first" to "25","page" to scope222.argumentKey("page"),"query" to scope222.argumentKey("query"),"sort" to scope222.argumentKey("sort")))
    scope223.set("__typename", scope223.readString("__typename"))
    if (scope223.assertList("edges")) {
        val scope224 = scope223.childList("edges", "edges")
        for (i in 0 until scope224.size) {
            scope224.assertObject(i)
            val scope225 = scope224.child(i)
            scope225.set("__typename", scope225.readString("__typename"))
            scope225.set("cursor", scope225.readString("cursor"))
            scope225.assertObject("node")
            val scope226 = scope225.child("node", "node")
            scope226.set("__typename", scope226.readString("__typename"))
            scope226.set("isYou", scope226.readBoolean("isYou"))
            normalizeUserShort(scope226)
        }
        scope223.set("edges", scope224.completed())
    }
    scope223.assertObject("pageInfo")
    val scope227 = scope223.child("pageInfo", "pageInfo")
    scope227.set("__typename", scope227.readString("__typename"))
    scope227.set("currentPage", scope227.readInt("currentPage"))
    scope227.set("hasNextPage", scope227.readBoolean("hasNextPage"))
    scope227.set("hasPreviousPage", scope227.readBoolean("hasPreviousPage"))
    scope227.set("itemsCount", scope227.readInt("itemsCount"))
    scope227.set("openEnded", scope227.readBoolean("openEnded"))
    scope227.set("pagesCount", scope227.readInt("pagesCount"))
}
fun normalizeFeatureFlags(scope228: Scope) {
    if (scope228.assertList("featureFlags")) {
        val scope229 = scope228.childList("featureFlags", "featureFlags")
        for (i in 0 until scope229.size) {
            scope229.assertObject(i)
            val scope230 = scope229.child(i)
            scope230.set("__typename", scope230.readString("__typename"))
            scope230.set("id", scope230.readString("id"))
            scope230.set("key", scope230.readString("key"))
            scope230.set("title", scope230.readString("title"))
        }
        scope228.set("featureFlags", scope229.completed())
    }
}
fun normalizeFeedHome(scope231: Scope) {
    if (scope231.assertList("homeFeed")) {
        val scope232 = scope231.childList("homeFeed", "alphaHomeFeed")
        for (i in 0 until scope232.size) {
            scope232.assertObject(i)
            val scope233 = scope232.child(i)
            scope233.set("__typename", scope233.readString("__typename"))
            scope233.assertObject("by")
            val scope234 = scope233.child("by", "alphaBy")
            scope234.set("__typename", scope234.readString("__typename"))
            normalizeUserShort(scope234)
            scope233.set("date", scope233.readString("date"))
            scope233.set("id", scope233.readString("id"))
            scope233.set("text", scope233.readString("text"))
        }
        scope231.set("alphaHomeFeed", scope232.completed())
    }
}
fun normalizeFetchPushSettings(scope235: Scope) {
    scope235.assertObject("pushSettings")
    val scope236 = scope235.child("pushSettings", "pushSettings")
    scope236.set("__typename", scope236.readString("__typename"))
    scope236.set("webPushKey", scope236.readStringOptional("webPushKey"))
}
fun normalizeGetDraftMessage(scope237: Scope) {
    scope237.set("conversationDraft" + scope237.formatArguments("conversationId" to scope237.argumentKey("conversationId")), scope237.readStringOptional("message"))
}
fun normalizeGlobalCounter(scope238: Scope) {
    scope238.assertObject("alphaNotificationCounter")
    val scope239 = scope238.child("alphaNotificationCounter", "alphaNotificationCounter")
    scope239.set("__typename", scope239.readString("__typename"))
    scope239.set("id", scope239.readString("id"))
    scope239.set("unreadCount", scope239.readInt("unreadCount"))
}
fun normalizeGlobalSearch(scope240: Scope) {
    if (scope240.assertList("items")) {
        val scope241 = scope240.childList("items", "alphaGlobalSearch" + scope240.formatArguments("query" to scope240.argumentKey("query")))
        for (i in 0 until scope241.size) {
            scope241.assertObject(i)
            val scope242 = scope241.child(i)
            scope242.set("__typename", scope242.readString("__typename"))
            if (scope242.isType("Organization")) {
                normalizeOrganizationShort(scope242)
            }
            if (scope242.isType("User")) {
                normalizeUserShort(scope242)
            }
            if (scope242.isType("SharedRoom")) {
                scope242.set("id", scope242.readString("id"))
                scope242.set("kind", scope242.readString("kind"))
                scope242.set("membersCount", scope242.readIntOptional("membersCount"))
                scope242.set("membership", scope242.readString("membership"))
                if (scope242.hasKey("organization")) {
                    val scope243 = scope242.child("organization", "organization")
                    scope243.set("__typename", scope243.readString("__typename"))
                    scope243.set("id", scope243.readString("id"))
                    scope243.set("name", scope243.readString("name"))
                    scope243.set("photo", scope243.readStringOptional("photo"))
                } else {
                    scope242.setNull("organization")
                }
                scope242.set("photo", scope242.readString("roomPhoto"))
                scope242.set("title", scope242.readString("title"))
            }
        }
        scope240.set("alphaGlobalSearch" + scope240.formatArguments("query" to scope240.argumentKey("query")), scope241.completed())
    }
}
fun normalizeMessage(scope244: Scope) {
    if (scope244.hasKey("message")) {
        val scope245 = scope244.child("message", "message" + scope244.formatArguments("messageId" to scope244.argumentKey("messageId")))
        scope245.set("__typename", scope245.readString("__typename"))
        normalizeFullMessage(scope245)
    } else {
        scope244.setNull("message" + scope244.formatArguments("messageId" to scope244.argumentKey("messageId")))
    }
}
fun normalizeMessageComments(scope246: Scope) {
    scope246.assertObject("messageComments")
    val scope247 = scope246.child("messageComments", "messageComments" + scope246.formatArguments("messageId" to scope246.argumentKey("messageId")))
    scope247.set("__typename", scope247.readString("__typename"))
    if (scope247.assertList("comments")) {
        val scope248 = scope247.childList("comments", "comments")
        for (i in 0 until scope248.size) {
            scope248.assertObject(i)
            val scope249 = scope248.child(i)
            scope249.set("__typename", scope249.readString("__typename"))
            normalizeCommentEntryFragment(scope249)
        }
        scope247.set("comments", scope248.completed())
    }
    scope247.set("count", scope247.readInt("count"))
    scope247.set("id", scope247.readString("id"))
    scope247.assertObject("state")
    val scope250 = scope247.child("state", "state")
    scope250.set("__typename", scope250.readString("__typename"))
    scope250.set("state", scope250.readStringOptional("state"))
}
fun normalizeMyApps(scope251: Scope) {
    if (scope251.assertList("apps")) {
        val scope252 = scope251.childList("apps", "myApps")
        for (i in 0 until scope252.size) {
            scope252.assertObject(i)
            val scope253 = scope252.child(i)
            scope253.set("__typename", scope253.readString("__typename"))
            normalizeAppFull(scope253)
        }
        scope251.set("myApps", scope252.completed())
    }
}
fun normalizeMyOrganizations(scope254: Scope) {
    if (scope254.assertList("myOrganizations")) {
        val scope255 = scope254.childList("myOrganizations", "myOrganizations")
        for (i in 0 until scope255.size) {
            scope255.assertObject(i)
            val scope256 = scope255.child(i)
            scope256.set("__typename", scope256.readString("__typename"))
            scope256.set("betaIsPrimary", scope256.readBoolean("isPrimary"))
            normalizeOrganizationShort(scope256)
        }
        scope254.set("myOrganizations", scope255.completed())
    }
}
fun normalizeOnline(scope257: Scope) {
    scope257.assertObject("user")
    val scope258 = scope257.child("user", "user" + scope257.formatArguments("id" to scope257.argumentKey("userId")))
    scope258.set("__typename", scope258.readString("__typename"))
    scope258.set("id", scope258.readString("id"))
    scope258.set("lastSeen", scope258.readStringOptional("lastSeen"))
    scope258.set("online", scope258.readBoolean("online"))
}
fun normalizeOrganization(scope259: Scope) {
    scope259.assertObject("organization")
    val scope260 = scope259.child("organization", "organization" + scope259.formatArguments("id" to scope259.argumentKey("organizationId")))
    scope260.set("__typename", scope260.readString("__typename"))
    normalizeOrganizationFull(scope260)
}
fun normalizeOrganizationByPrefix(scope261: Scope) {
    if (scope261.hasKey("organizationByPrefix")) {
        val scope262 = scope261.child("organizationByPrefix", "alphaOrganizationByPrefix" + scope261.formatArguments("query" to scope261.argumentKey("query")))
        scope262.set("__typename", scope262.readString("__typename"))
        normalizeOrganizationSearch(scope262)
    } else {
        scope261.setNull("alphaOrganizationByPrefix" + scope261.formatArguments("query" to scope261.argumentKey("query")))
    }
}
fun normalizeOrganizationMembersShort(scope263: Scope) {
    scope263.assertObject("organization")
    val scope264 = scope263.child("organization", "organization" + scope263.formatArguments("id" to scope263.argumentKey("organizationId")))
    scope264.set("__typename", scope264.readString("__typename"))
    if (scope264.assertList("members")) {
        val scope265 = scope264.childList("members", "alphaOrganizationMembers")
        for (i in 0 until scope265.size) {
            scope265.assertObject(i)
            val scope266 = scope265.child(i)
            scope266.set("__typename", scope266.readString("__typename"))
            scope266.assertObject("user")
            val scope267 = scope266.child("user", "user")
            scope267.set("__typename", scope267.readString("__typename"))
            scope267.set("id", scope267.readString("id"))
        }
        scope264.set("alphaOrganizationMembers", scope265.completed())
    }
    normalizeOrganizationWithoutMembersFragment(scope264)
}
fun normalizeOrganizationMembersShortPaginated(scope268: Scope) {
    scope268.assertObject("organization")
    val scope269 = scope268.child("organization", "organization" + scope268.formatArguments("id" to scope268.argumentKey("organizationId")))
    scope269.set("__typename", scope269.readString("__typename"))
    if (scope269.assertList("members")) {
        val scope270 = scope269.childList("members", "alphaOrganizationMembers" + scope269.formatArguments("after" to scope269.argumentKey("after"),"first" to scope269.argumentKey("first")))
        for (i in 0 until scope270.size) {
            scope270.assertObject(i)
            val scope271 = scope270.child(i)
            scope271.set("__typename", scope271.readString("__typename"))
            scope271.set("role", scope271.readString("role"))
            scope271.assertObject("user")
            val scope272 = scope271.child("user", "user")
            scope272.set("__typename", scope272.readString("__typename"))
            normalizeUserFull(scope272)
        }
        scope269.set("alphaOrganizationMembers" + scope269.formatArguments("after" to scope269.argumentKey("after"),"first" to scope269.argumentKey("first")), scope270.completed())
    }
    normalizeOrganizationWithoutMembersFragment(scope269)
}
fun normalizeOrganizationProfile(scope273: Scope) {
    scope273.assertObject("organizationProfile")
    val scope274 = scope273.child("organizationProfile", "organizationProfile" + scope273.formatArguments("id" to scope273.argumentKey("organizationId")))
    scope274.set("__typename", scope274.readString("__typename"))
    normalizeOrganizationProfileFull(scope274)
}
fun normalizeOrganizationPublicInvite(scope275: Scope) {
    if (scope275.hasKey("publicInvite")) {
        val scope276 = scope275.child("publicInvite", "alphaOrganizationInviteLink" + scope275.formatArguments("organizationId" to scope275.argumentKey("organizationId")))
        scope276.set("__typename", scope276.readString("__typename"))
        scope276.set("id", scope276.readString("id"))
        scope276.set("key", scope276.readString("key"))
        scope276.set("ttl", scope276.readStringOptional("ttl"))
    } else {
        scope275.setNull("alphaOrganizationInviteLink" + scope275.formatArguments("organizationId" to scope275.argumentKey("organizationId")))
    }
}
fun normalizeOrganizationWithoutMembers(scope277: Scope) {
    scope277.assertObject("organization")
    val scope278 = scope277.child("organization", "organization" + scope277.formatArguments("id" to scope277.argumentKey("organizationId")))
    scope278.set("__typename", scope278.readString("__typename"))
    normalizeOrganizationWithoutMembersFragment(scope278)
}
fun normalizePermissions(scope279: Scope) {
    scope279.assertObject("myPermissions")
    val scope280 = scope279.child("myPermissions", "myPermissions")
    scope280.set("__typename", scope280.readString("__typename"))
    if (scope280.assertList("roles")) {
        val scope281 = scope280.childList("roles", "roles")
        for (i in 0 until scope281.size) {
            scope281.next(scope281.readString(i))
        }
        scope280.set("roles", scope281.completed())
    }
}
fun normalizeProfile(scope282: Scope) {
    if (scope282.hasKey("user")) {
        val scope283 = scope282.child("user", "me")
        scope283.set("__typename", scope283.readString("__typename"))
        scope283.set("id", scope283.readString("id"))
        scope283.set("shortname", scope283.readStringOptional("shortname"))
    } else {
        scope282.setNull("me")
    }
    if (scope282.hasKey("profile")) {
        val scope284 = scope282.child("profile", "myProfile")
        scope284.set("__typename", scope284.readString("__typename"))
        scope284.set("about", scope284.readStringOptional("about"))
        if (scope284.hasKey("invitedBy")) {
            val scope285 = scope284.child("invitedBy", "alphaInvitedBy")
            scope285.set("__typename", scope285.readString("__typename"))
            scope285.set("name", scope285.readString("name"))
        } else {
            scope284.setNull("alphaInvitedBy")
        }
        scope284.set("alphaJoinedAt", scope284.readStringOptional("joinedAt"))
        scope284.set("alphaLinkedin", scope284.readStringOptional("linkedin"))
        scope284.set("alphaRole", scope284.readStringOptional("role"))
        scope284.set("email", scope284.readStringOptional("email"))
        scope284.set("firstName", scope284.readStringOptional("firstName"))
        scope284.set("id", scope284.readString("id"))
        scope284.set("lastName", scope284.readStringOptional("lastName"))
        scope284.set("location", scope284.readStringOptional("location"))
        scope284.set("phone", scope284.readStringOptional("phone"))
        if (scope284.hasKey("photoRef")) {
            val scope286 = scope284.child("photoRef", "photoRef")
            scope286.set("__typename", scope286.readString("__typename"))
            if (scope286.hasKey("crop")) {
                val scope287 = scope286.child("crop", "crop")
                scope287.set("__typename", scope287.readString("__typename"))
                scope287.set("h", scope287.readInt("h"))
                scope287.set("w", scope287.readInt("w"))
                scope287.set("x", scope287.readInt("x"))
                scope287.set("y", scope287.readInt("y"))
            } else {
                scope286.setNull("crop")
            }
            scope286.set("uuid", scope286.readString("uuid"))
        } else {
            scope284.setNull("photoRef")
        }
        if (scope284.hasKey("primaryOrganization")) {
            val scope288 = scope284.child("primaryOrganization", "primaryOrganization")
            scope288.set("__typename", scope288.readString("__typename"))
            scope288.set("id", scope288.readString("id"))
            scope288.set("name", scope288.readString("name"))
        } else {
            scope284.setNull("primaryOrganization")
        }
        scope284.set("website", scope284.readStringOptional("website"))
    } else {
        scope282.setNull("myProfile")
    }
}
fun normalizeProfilePrefill(scope289: Scope) {
    if (scope289.hasKey("prefill")) {
        val scope290 = scope289.child("prefill", "myProfilePrefill")
        scope290.set("__typename", scope290.readString("__typename"))
        scope290.set("firstName", scope290.readStringOptional("firstName"))
        scope290.set("lastName", scope290.readStringOptional("lastName"))
        scope290.set("picture", scope290.readStringOptional("picture"))
    } else {
        scope289.setNull("myProfilePrefill")
    }
}
fun normalizeResolveShortName(scope291: Scope) {
    if (scope291.hasKey("item")) {
        val scope292 = scope291.child("item", "alphaResolveShortName" + scope291.formatArguments("shortname" to scope291.argumentKey("shortname")))
        scope292.set("__typename", scope292.readString("__typename"))
        if (scope292.isType("User")) {
            normalizeUserFull(scope292)
        }
        if (scope292.isType("Organization")) {
            normalizeOrganizationFull(scope292)
        }
    } else {
        scope291.setNull("alphaResolveShortName" + scope291.formatArguments("shortname" to scope291.argumentKey("shortname")))
    }
}
fun normalizeResolvedInvite(scope293: Scope) {
    if (scope293.hasKey("invite")) {
        val scope294 = scope293.child("invite", "alphaResolveInvite" + scope293.formatArguments("key" to scope293.argumentKey("key")))
        scope294.set("__typename", scope294.readString("__typename"))
        if (scope294.isType("InviteInfo")) {
            if (scope294.hasKey("creator")) {
                val scope295 = scope294.child("creator", "creator")
                scope295.set("__typename", scope295.readString("__typename"))
                normalizeUserShort(scope295)
            } else {
                scope294.setNull("creator")
            }
            scope294.set("orgId", scope294.readString("orgId"))
            scope294.set("title", scope294.readString("title"))
        }
        if (scope294.isType("AppInvite")) {
            scope294.assertObject("inviter")
            val scope296 = scope294.child("inviter", "inviter")
            scope296.set("__typename", scope296.readString("__typename"))
            normalizeUserShort(scope296)
        }
        if (scope294.isType("RoomInvite")) {
            scope294.assertObject("invitedByUser")
            val scope297 = scope294.child("invitedByUser", "invitedByUser")
            scope297.set("__typename", scope297.readString("__typename"))
            normalizeUserShort(scope297)
            scope294.assertObject("room")
            val scope298 = scope294.child("room", "room")
            scope298.set("__typename", scope298.readString("__typename"))
            if (scope298.isType("SharedRoom")) {
                scope298.set("description", scope298.readStringOptional("description"))
                scope298.set("id", scope298.readString("id"))
                scope298.set("isChannel", scope298.readBoolean("isChannel"))
                scope298.set("kind", scope298.readString("kind"))
                scope298.set("membersCount", scope298.readIntOptional("membersCount"))
                scope298.set("membership", scope298.readString("membership"))
                scope298.set("photo", scope298.readString("photo"))
                scope298.set("socialImage", scope298.readStringOptional("socialImage"))
                scope298.set("title", scope298.readString("title"))
            }
        }
    } else {
        scope293.setNull("alphaResolveInvite" + scope293.formatArguments("key" to scope293.argumentKey("key")))
    }
}
fun normalizeRoom(scope299: Scope) {
    if (scope299.hasKey("room")) {
        val scope300 = scope299.child("room", "room" + scope299.formatArguments("id" to scope299.argumentKey("id")))
        scope300.set("__typename", scope300.readString("__typename"))
        normalizeRoomFull(scope300)
    } else {
        scope299.setNull("room" + scope299.formatArguments("id" to scope299.argumentKey("id")))
    }
}
fun normalizeRoomChat(scope301: Scope) {
    if (scope301.hasKey("room")) {
        val scope302 = scope301.child("room", "room" + scope301.formatArguments("id" to scope301.argumentKey("id")))
        scope302.set("__typename", scope302.readString("__typename"))
        if (scope302.isType("PrivateRoom")) {
            scope302.set("id", scope302.readString("id"))
            scope302.assertObject("user")
            val scope303 = scope302.child("user", "user")
            scope303.set("__typename", scope303.readString("__typename"))
            scope303.set("id", scope303.readString("id"))
            scope303.set("name", scope303.readString("name"))
        }
        if (scope302.isType("SharedRoom")) {
            scope302.set("canEdit", scope302.readBoolean("canEdit"))
            scope302.set("id", scope302.readString("id"))
            scope302.set("isChannel", scope302.readBoolean("isChannel"))
            scope302.set("kind", scope302.readString("kind"))
            scope302.set("membership", scope302.readString("membership"))
            scope302.set("photo", scope302.readString("photo"))
            if (scope302.hasKey("pinnedMessage")) {
                val scope304 = scope302.child("pinnedMessage", "pinnedMessage")
                scope304.set("__typename", scope304.readString("__typename"))
                normalizeFullMessage(scope304)
            } else {
                scope302.setNull("pinnedMessage")
            }
            scope302.set("title", scope302.readString("title"))
        }
    } else {
        scope301.setNull("room" + scope301.formatArguments("id" to scope301.argumentKey("id")))
    }
}
fun normalizeRoomHeader(scope305: Scope) {
    if (scope305.hasKey("room")) {
        val scope306 = scope305.child("room", "room" + scope305.formatArguments("id" to scope305.argumentKey("id")))
        scope306.set("__typename", scope306.readString("__typename"))
        if (scope306.isType("PrivateRoom")) {
            scope306.set("id", scope306.readString("id"))
            scope306.assertObject("settings")
            val scope307 = scope306.child("settings", "settings")
            scope307.set("__typename", scope307.readString("__typename"))
            scope307.set("id", scope307.readString("id"))
            scope307.set("mute", scope307.readBooleanOptional("mute"))
            scope306.assertObject("user")
            val scope308 = scope306.child("user", "user")
            scope308.set("__typename", scope308.readString("__typename"))
            scope308.set("id", scope308.readString("id"))
            scope308.set("name", scope308.readString("name"))
            scope308.set("photo", scope308.readStringOptional("photo"))
            if (scope308.hasKey("primaryOrganization")) {
                val scope309 = scope308.child("primaryOrganization", "primaryOrganization")
                scope309.set("__typename", scope309.readString("__typename"))
                scope309.set("id", scope309.readString("id"))
                scope309.set("name", scope309.readString("name"))
            } else {
                scope308.setNull("primaryOrganization")
            }
        }
        if (scope306.isType("SharedRoom")) {
            scope306.set("canEdit", scope306.readBoolean("canEdit"))
            scope306.set("description", scope306.readStringOptional("description"))
            scope306.set("id", scope306.readString("id"))
            scope306.set("isChannel", scope306.readBoolean("isChannel"))
            scope306.set("kind", scope306.readString("kind"))
            scope306.set("membersCount", scope306.readIntOptional("membersCount"))
            if (scope306.hasKey("organization")) {
                val scope310 = scope306.child("organization", "organization")
                scope310.set("__typename", scope310.readString("__typename"))
                scope310.set("betaIsAdmin", scope310.readBoolean("isAdmin"))
                scope310.set("betaIsOwner", scope310.readBoolean("isOwner"))
                scope310.set("id", scope310.readString("id"))
                scope310.set("name", scope310.readString("name"))
            } else {
                scope306.setNull("organization")
            }
            scope306.set("photo", scope306.readString("photo"))
            scope306.set("role", scope306.readString("role"))
            scope306.assertObject("settings")
            val scope311 = scope306.child("settings", "settings")
            scope311.set("__typename", scope311.readString("__typename"))
            scope311.set("id", scope311.readString("id"))
            scope311.set("mute", scope311.readBooleanOptional("mute"))
            scope306.set("socialImage", scope306.readStringOptional("socialImage"))
            scope306.set("title", scope306.readString("title"))
            if (scope306.hasKey("welcomeMessage")) {
                val scope312 = scope306.child("welcomeMessage", "welcomeMessage")
                scope312.set("__typename", scope312.readString("__typename"))
                scope312.set("isOn", scope312.readBoolean("isOn"))
                scope312.set("message", scope312.readStringOptional("message"))
                if (scope312.hasKey("sender")) {
                    val scope313 = scope312.child("sender", "sender")
                    scope313.set("__typename", scope313.readString("__typename"))
                    scope313.set("id", scope313.readString("id"))
                    scope313.set("name", scope313.readString("name"))
                } else {
                    scope312.setNull("sender")
                }
            } else {
                scope306.setNull("welcomeMessage")
            }
        }
    } else {
        scope305.setNull("room" + scope305.formatArguments("id" to scope305.argumentKey("id")))
    }
}
fun normalizeRoomInviteInfo(scope314: Scope) {
    if (scope314.hasKey("invite")) {
        val scope315 = scope314.child("invite", "betaRoomInviteInfo" + scope314.formatArguments("invite" to scope314.argumentKey("invite")))
        scope315.set("__typename", scope315.readString("__typename"))
        scope315.set("id", scope315.readString("id"))
        scope315.assertObject("invitedByUser")
        val scope316 = scope315.child("invitedByUser", "invitedByUser")
        scope316.set("__typename", scope316.readString("__typename"))
        normalizeUserShort(scope316)
        scope315.assertObject("room")
        val scope317 = scope315.child("room", "room")
        scope317.set("__typename", scope317.readString("__typename"))
        if (scope317.isType("SharedRoom")) {
            scope317.set("description", scope317.readStringOptional("description"))
            scope317.set("id", scope317.readString("id"))
            scope317.set("isChannel", scope317.readBoolean("isChannel"))
            scope317.set("kind", scope317.readString("kind"))
            scope317.set("membersCount", scope317.readIntOptional("membersCount"))
            scope317.set("membership", scope317.readString("membership"))
            if (scope317.hasKey("organization")) {
                val scope318 = scope317.child("organization", "organization")
                scope318.set("__typename", scope318.readString("__typename"))
                normalizeOrganizationShort(scope318)
            } else {
                scope317.setNull("organization")
            }
            scope317.set("photo", scope317.readString("photo"))
            scope317.set("socialImage", scope317.readStringOptional("socialImage"))
            scope317.set("title", scope317.readString("title"))
        }
    } else {
        scope314.setNull("betaRoomInviteInfo" + scope314.formatArguments("invite" to scope314.argumentKey("invite")))
    }
}
fun normalizeRoomInviteLink(scope319: Scope) {
    scope319.set("betaRoomInviteLink" + scope319.formatArguments("roomId" to scope319.argumentKey("roomId")), scope319.readString("link"))
}
fun normalizeRoomMemberShort(scope320: Scope) {
    if (scope320.hasKey("member")) {
        val scope321 = scope320.child("member", "roomMember" + scope320.formatArguments("memberId" to scope320.argumentKey("memberId"),"roomId" to scope320.argumentKey("roomId")))
        scope321.set("__typename", scope321.readString("__typename"))
        scope321.assertObject("user")
        val scope322 = scope321.child("user", "user")
        scope322.set("__typename", scope322.readString("__typename"))
        scope322.set("firstName", scope322.readString("firstName"))
        scope322.set("id", scope322.readString("id"))
        scope322.set("name", scope322.readString("name"))
    } else {
        scope320.setNull("roomMember" + scope320.formatArguments("memberId" to scope320.argumentKey("memberId"),"roomId" to scope320.argumentKey("roomId")))
    }
}
fun normalizeRoomMembers(scope323: Scope) {
    if (scope323.assertList("members")) {
        val scope324 = scope323.childList("members", "roomMembers" + scope323.formatArguments("roomId" to scope323.argumentKey("roomId")))
        for (i in 0 until scope324.size) {
            scope324.assertObject(i)
            val scope325 = scope324.child(i)
            scope325.set("__typename", scope325.readString("__typename"))
            scope325.set("canKick", scope325.readBoolean("canKick"))
            scope325.set("membership", scope325.readString("membership"))
            scope325.set("role", scope325.readString("role"))
            scope325.assertObject("user")
            val scope326 = scope325.child("user", "user")
            scope326.set("__typename", scope326.readString("__typename"))
            normalizeUserShort(scope326)
        }
        scope323.set("roomMembers" + scope323.formatArguments("roomId" to scope323.argumentKey("roomId")), scope324.completed())
    }
}
fun normalizeRoomMembersPaginated(scope327: Scope) {
    if (scope327.assertList("members")) {
        val scope328 = scope327.childList("members", "roomMembers" + scope327.formatArguments("after" to scope327.argumentKey("after"),"first" to scope327.argumentKey("first"),"roomId" to scope327.argumentKey("roomId")))
        for (i in 0 until scope328.size) {
            scope328.assertObject(i)
            val scope329 = scope328.child(i)
            scope329.set("__typename", scope329.readString("__typename"))
            scope329.set("canKick", scope329.readBoolean("canKick"))
            scope329.set("membership", scope329.readString("membership"))
            scope329.set("role", scope329.readString("role"))
            scope329.assertObject("user")
            val scope330 = scope329.child("user", "user")
            scope330.set("__typename", scope330.readString("__typename"))
            normalizeUserShort(scope330)
        }
        scope327.set("roomMembers" + scope327.formatArguments("after" to scope327.argumentKey("after"),"first" to scope327.argumentKey("first"),"roomId" to scope327.argumentKey("roomId")), scope328.completed())
    }
}
fun normalizeRoomMembersShort(scope331: Scope) {
    if (scope331.assertList("members")) {
        val scope332 = scope331.childList("members", "roomMembers" + scope331.formatArguments("roomId" to scope331.argumentKey("roomId")))
        for (i in 0 until scope332.size) {
            scope332.assertObject(i)
            val scope333 = scope332.child(i)
            scope333.set("__typename", scope333.readString("__typename"))
            scope333.assertObject("user")
            val scope334 = scope333.child("user", "user")
            scope334.set("__typename", scope334.readString("__typename"))
            scope334.set("id", scope334.readString("id"))
        }
        scope331.set("roomMembers" + scope331.formatArguments("roomId" to scope331.argumentKey("roomId")), scope332.completed())
    }
}
fun normalizeRoomSearch(scope335: Scope) {
    scope335.assertObject("items")
    val scope336 = scope335.child("items", "betaRoomSearch" + scope335.formatArguments("first" to "25","page" to scope335.argumentKey("page"),"query" to scope335.argumentKey("query"),"sort" to scope335.argumentKey("sort")))
    scope336.set("__typename", scope336.readString("__typename"))
    if (scope336.assertList("edges")) {
        val scope337 = scope336.childList("edges", "edges")
        for (i in 0 until scope337.size) {
            scope337.assertObject(i)
            val scope338 = scope337.child(i)
            scope338.set("__typename", scope338.readString("__typename"))
            scope338.set("cursor", scope338.readString("cursor"))
            scope338.assertObject("node")
            val scope339 = scope338.child("node", "node")
            scope339.set("__typename", scope339.readString("__typename"))
            if (scope339.isType("SharedRoom")) {
                scope339.set("id", scope339.readString("id"))
                scope339.set("isChannel", scope339.readBoolean("isChannel"))
                scope339.set("kind", scope339.readString("kind"))
                scope339.set("membersCount", scope339.readIntOptional("membersCount"))
                scope339.set("membership", scope339.readString("membership"))
                if (scope339.hasKey("organization")) {
                    val scope340 = scope339.child("organization", "organization")
                    scope340.set("__typename", scope340.readString("__typename"))
                    scope340.set("name", scope340.readString("name"))
                    scope340.set("photo", scope340.readStringOptional("photo"))
                } else {
                    scope339.setNull("organization")
                }
                scope339.set("photo", scope339.readString("photo"))
                scope339.set("title", scope339.readString("title"))
            }
        }
        scope336.set("edges", scope337.completed())
    }
    scope336.assertObject("pageInfo")
    val scope341 = scope336.child("pageInfo", "pageInfo")
    scope341.set("__typename", scope341.readString("__typename"))
    scope341.set("currentPage", scope341.readInt("currentPage"))
    scope341.set("hasNextPage", scope341.readBoolean("hasNextPage"))
    scope341.set("hasPreviousPage", scope341.readBoolean("hasPreviousPage"))
    scope341.set("itemsCount", scope341.readInt("itemsCount"))
    scope341.set("openEnded", scope341.readBoolean("openEnded"))
    scope341.set("pagesCount", scope341.readInt("pagesCount"))
}
fun normalizeRoomSearchText(scope342: Scope) {
    if (scope342.assertList("items")) {
        val scope343 = scope342.childList("items", "betaDialogTextSearch" + scope342.formatArguments("query" to scope342.argumentKey("query")))
        for (i in 0 until scope343.size) {
            scope343.assertObject(i)
            val scope344 = scope343.child(i)
            scope344.set("__typename", scope344.readString("__typename"))
            scope344.set("cid", scope344.readString("id"))
            scope344.set("fid", scope344.readString("flexibleId"))
            scope344.set("kind", scope344.readString("kind"))
            scope344.set("photo", scope344.readString("photo"))
            scope344.set("title", scope344.readString("title"))
        }
        scope342.set("betaDialogTextSearch" + scope342.formatArguments("query" to scope342.argumentKey("query")), scope343.completed())
    }
}
fun normalizeRoomSuper(scope345: Scope) {
    if (scope345.hasKey("roomSuper")) {
        val scope346 = scope345.child("roomSuper", "roomSuper" + scope345.formatArguments("id" to scope345.argumentKey("id")))
        scope346.set("__typename", scope346.readString("__typename"))
        scope346.set("featured", scope346.readBoolean("featured"))
        scope346.set("id", scope346.readString("id"))
        scope346.set("listed", scope346.readBoolean("listed"))
    } else {
        scope345.setNull("roomSuper" + scope345.formatArguments("id" to scope345.argumentKey("id")))
    }
}
fun normalizeRoomTiny(scope347: Scope) {
    if (scope347.hasKey("room")) {
        val scope348 = scope347.child("room", "room" + scope347.formatArguments("id" to scope347.argumentKey("id")))
        scope348.set("__typename", scope348.readString("__typename"))
        normalizeRoomShort(scope348)
    } else {
        scope347.setNull("room" + scope347.formatArguments("id" to scope347.argumentKey("id")))
    }
}
fun normalizeRoomWithoutMembers(scope349: Scope) {
    if (scope349.hasKey("room")) {
        val scope350 = scope349.child("room", "room" + scope349.formatArguments("id" to scope349.argumentKey("id")))
        scope350.set("__typename", scope350.readString("__typename"))
        normalizeRoomFullWithoutMembers(scope350)
    } else {
        scope349.setNull("room" + scope349.formatArguments("id" to scope349.argumentKey("id")))
    }
}
fun normalizeSettings(scope351: Scope) {
    scope351.assertObject("settings")
    val scope352 = scope351.child("settings", "settings")
    scope352.set("__typename", scope352.readString("__typename"))
    normalizeSettingsFull(scope352)
}
fun normalizeSuperAccount(scope353: Scope) {
    scope353.assertObject("superAccount")
    val scope354 = scope353.child("superAccount", "superAccount" + scope353.formatArguments("id" to scope353.argumentKey("accountId"),"viaOrgId" to scope353.argumentKey("viaOrgId")))
    scope354.set("__typename", scope354.readString("__typename"))
    scope354.set("alphaPublished", scope354.readBoolean("published"))
    scope354.set("createdAt", scope354.readStringOptional("createdAt"))
    if (scope354.hasKey("createdBy")) {
        val scope355 = scope354.child("createdBy", "createdBy")
        scope355.set("__typename", scope355.readString("__typename"))
        scope355.set("name", scope355.readString("name"))
    } else {
        scope354.setNull("createdBy")
    }
    if (scope354.assertList("features")) {
        val scope356 = scope354.childList("features", "features")
        for (i in 0 until scope356.size) {
            scope356.assertObject(i)
            val scope357 = scope356.child(i)
            scope357.set("__typename", scope357.readString("__typename"))
            scope357.set("id", scope357.readString("id"))
            scope357.set("key", scope357.readString("key"))
            scope357.set("title", scope357.readString("title"))
        }
        scope354.set("features", scope356.completed())
    }
    scope354.set("id", scope354.readString("id"))
    if (scope354.assertList("members")) {
        val scope358 = scope354.childList("members", "members")
        for (i in 0 until scope358.size) {
            scope358.assertObject(i)
            val scope359 = scope358.child(i)
            scope359.set("__typename", scope359.readString("__typename"))
            normalizeUserShort(scope359)
        }
        scope354.set("members", scope358.completed())
    }
    scope354.set("orgId", scope354.readString("orgId"))
    scope354.set("state", scope354.readString("state"))
    scope354.set("title", scope354.readString("title"))
}
fun normalizeSuperAccounts(scope360: Scope) {
    if (scope360.assertList("superAccounts")) {
        val scope361 = scope360.childList("superAccounts", "superAccounts")
        for (i in 0 until scope361.size) {
            scope361.assertObject(i)
            val scope362 = scope361.child(i)
            scope362.set("__typename", scope362.readString("__typename"))
            scope362.set("id", scope362.readString("id"))
            scope362.set("orgId", scope362.readString("orgId"))
            scope362.set("state", scope362.readString("state"))
            scope362.set("title", scope362.readString("title"))
        }
        scope360.set("superAccounts", scope361.completed())
    }
}
fun normalizeSuperAdmins(scope363: Scope) {
    if (scope363.assertList("superAdmins")) {
        val scope364 = scope363.childList("superAdmins", "superAdmins")
        for (i in 0 until scope364.size) {
            scope364.assertObject(i)
            val scope365 = scope364.child(i)
            scope365.set("__typename", scope365.readString("__typename"))
            scope365.set("email", scope365.readStringOptional("email"))
            scope365.set("role", scope365.readString("role"))
            scope365.assertObject("user")
            val scope366 = scope365.child("user", "user")
            scope366.set("__typename", scope366.readString("__typename"))
            normalizeUserShort(scope366)
        }
        scope363.set("superAdmins", scope364.completed())
    }
}
fun normalizeUser(scope367: Scope) {
    if (scope367.hasKey("conversation")) {
        val scope368 = scope367.child("conversation", "room" + scope367.formatArguments("id" to scope367.argumentKey("userId")))
        scope368.set("__typename", scope368.readString("__typename"))
        if (scope368.isType("PrivateRoom")) {
            scope368.set("id", scope368.readString("id"))
            scope368.assertObject("settings")
            val scope369 = scope368.child("settings", "settings")
            scope369.set("__typename", scope369.readString("__typename"))
            scope369.set("id", scope369.readString("id"))
            scope369.set("mute", scope369.readBooleanOptional("mute"))
        }
    } else {
        scope367.setNull("room" + scope367.formatArguments("id" to scope367.argumentKey("userId")))
    }
    scope367.assertObject("user")
    val scope370 = scope367.child("user", "user" + scope367.formatArguments("id" to scope367.argumentKey("userId")))
    scope370.set("__typename", scope370.readString("__typename"))
    normalizeUserFull(scope370)
}
fun normalizeUserStorage(scope371: Scope) {
    if (scope371.assertList("userStorage")) {
        val scope372 = scope371.childList("userStorage", "userStorage" + scope371.formatArguments("keys" to scope371.argumentKey("keys"),"namespace" to scope371.argumentKey("namespace")))
        for (i in 0 until scope372.size) {
            scope372.assertObject(i)
            val scope373 = scope372.child(i)
            scope373.set("__typename", scope373.readString("__typename"))
            scope373.set("id", scope373.readString("id"))
            scope373.set("key", scope373.readString("key"))
            scope373.set("value", scope373.readStringOptional("value"))
        }
        scope371.set("userStorage" + scope371.formatArguments("keys" to scope371.argumentKey("keys"),"namespace" to scope371.argumentKey("namespace")), scope372.completed())
    }
}
fun normalizeUsers(scope374: Scope) {
    if (scope374.assertList("items")) {
        val scope375 = scope374.childList("items", "users" + scope374.formatArguments("query" to scope374.argumentKey("query")))
        for (i in 0 until scope375.size) {
            scope375.assertObject(i)
            val scope376 = scope375.child(i)
            scope376.set("__typename", scope376.readString("__typename"))
            scope376.set("email", scope376.readStringOptional("subtitle"))
            scope376.set("id", scope376.readString("id"))
            scope376.set("name", scope376.readString("title"))
        }
        scope374.set("users" + scope374.formatArguments("query" to scope374.argumentKey("query")), scope375.completed())
    }
}
fun normalizeAccountCreateInvite(scope377: Scope) {
    scope377.assertObject("alphaCreateInvite")
    val scope378 = scope377.child("alphaCreateInvite", "alphaCreateInvite")
    scope378.set("__typename", scope378.readString("__typename"))
    scope378.set("id", scope378.readString("id"))
    scope378.set("key", scope378.readString("key"))
}
fun normalizeAccountDestroyInvite(scope379: Scope) {
    scope379.set("alphaDeleteInvite" + scope379.formatArguments("id" to scope379.argumentKey("id")), scope379.readString("alphaDeleteInvite"))
}
fun normalizeAccountInviteJoin(scope380: Scope) {
    scope380.set("alphaJoinInvite" + scope380.formatArguments("key" to scope380.argumentKey("inviteKey")), scope380.readString("alphaJoinInvite"))
}
fun normalizeAddAppToChat(scope381: Scope) {
    scope381.assertObject("addAppToChat")
    val scope382 = scope381.child("addAppToChat", "addAppToChat" + scope381.formatArguments("appId" to scope381.argumentKey("appId"),"chatId" to scope381.argumentKey("chatId")))
    scope382.set("__typename", scope382.readString("__typename"))
    normalizeAppChat(scope382)
}
fun normalizeAddMessageComment(scope383: Scope) {
    scope383.set("addMessageComment" + scope383.formatArguments("fileAttachments" to scope383.argumentKey("fileAttachments"),"mentions" to scope383.argumentKey("mentions"),"message" to scope383.argumentKey("message"),"messageId" to scope383.argumentKey("messageId"),"replyComment" to scope383.argumentKey("replyComment")), scope383.readBoolean("addMessageComment"))
}
fun normalizeBetaAddMessageComment(scope384: Scope) {
    scope384.assertObject("betaAddMessageComment")
    val scope385 = scope384.child("betaAddMessageComment", "betaAddMessageComment" + scope384.formatArguments("fileAttachments" to scope384.argumentKey("fileAttachments"),"mentions" to scope384.argumentKey("mentions"),"message" to scope384.argumentKey("message"),"messageId" to scope384.argumentKey("messageId"),"replyComment" to scope384.argumentKey("replyComment")))
    scope385.set("__typename", scope385.readString("__typename"))
    scope385.set("id", scope385.readString("id"))
}
fun normalizeCancelTyping(scope386: Scope) {
    scope386.set("typingCancel" + scope386.formatArguments("conversationId" to scope386.argumentKey("conversationId")), scope386.readString("typingCancel"))
}
fun normalizeCommentSetReaction(scope387: Scope) {
    scope387.set("commentReactionAdd" + scope387.formatArguments("commentId" to scope387.argumentKey("commentId"),"reaction" to scope387.argumentKey("reaction")), scope387.readBoolean("commentReactionAdd"))
}
fun normalizeCommentUnsetReaction(scope388: Scope) {
    scope388.set("commentReactionRemove" + scope388.formatArguments("commentId" to scope388.argumentKey("commentId"),"reaction" to scope388.argumentKey("reaction")), scope388.readBoolean("commentReactionRemove"))
}
fun normalizeConferenceAnswer(scope389: Scope) {
    scope389.assertObject("peerConnectionAnswer")
    val scope390 = scope389.child("peerConnectionAnswer", "peerConnectionAnswer" + scope389.formatArguments("answer" to scope389.argumentKey("answer"),"id" to scope389.argumentKey("id"),"ownPeerId" to scope389.argumentKey("ownPeerId"),"peerId" to scope389.argumentKey("peerId")))
    scope390.set("__typename", scope390.readString("__typename"))
    normalizeConferenceFull(scope390)
}
fun normalizeConferenceCandidate(scope391: Scope) {
    scope391.assertObject("peerConnectionCandidate")
    val scope392 = scope391.child("peerConnectionCandidate", "peerConnectionCandidate" + scope391.formatArguments("candidate" to scope391.argumentKey("candidate"),"id" to scope391.argumentKey("id"),"ownPeerId" to scope391.argumentKey("ownPeerId"),"peerId" to scope391.argumentKey("peerId")))
    scope392.set("__typename", scope392.readString("__typename"))
    normalizeConferenceFull(scope392)
}
fun normalizeConferenceJoin(scope393: Scope) {
    scope393.assertObject("conferenceJoin")
    val scope394 = scope393.child("conferenceJoin", "conferenceJoin" + scope393.formatArguments("id" to scope393.argumentKey("id")))
    scope394.set("__typename", scope394.readString("__typename"))
    scope394.assertObject("conference")
    val scope395 = scope394.child("conference", "conference")
    scope395.set("__typename", scope395.readString("__typename"))
    normalizeConferenceFull(scope395)
    scope394.set("peerId", scope394.readString("peerId"))
}
fun normalizeConferenceKeepAlive(scope396: Scope) {
    scope396.assertObject("conferenceKeepAlive")
    val scope397 = scope396.child("conferenceKeepAlive", "conferenceKeepAlive" + scope396.formatArguments("id" to scope396.argumentKey("id"),"peerId" to scope396.argumentKey("peerId")))
    scope397.set("__typename", scope397.readString("__typename"))
    normalizeConferenceFull(scope397)
}
fun normalizeConferenceLeave(scope398: Scope) {
    scope398.assertObject("conferenceLeave")
    val scope399 = scope398.child("conferenceLeave", "conferenceLeave" + scope398.formatArguments("id" to scope398.argumentKey("id"),"peerId" to scope398.argumentKey("peerId")))
    scope399.set("__typename", scope399.readString("__typename"))
    normalizeConferenceFull(scope399)
}
fun normalizeConferenceOffer(scope400: Scope) {
    scope400.assertObject("peerConnectionOffer")
    val scope401 = scope400.child("peerConnectionOffer", "peerConnectionOffer" + scope400.formatArguments("id" to scope400.argumentKey("id"),"offer" to scope400.argumentKey("offer"),"ownPeerId" to scope400.argumentKey("ownPeerId"),"peerId" to scope400.argumentKey("peerId")))
    scope401.set("__typename", scope401.readString("__typename"))
    normalizeConferenceFull(scope401)
}
fun normalizeCreateApp(scope402: Scope) {
    scope402.assertObject("createApp")
    val scope403 = scope402.child("createApp", "createApp" + scope402.formatArguments("about" to scope402.argumentKey("about"),"name" to scope402.argumentKey("name"),"photoRef" to scope402.argumentKey("photoRef"),"shortname" to scope402.argumentKey("shortname")))
    scope403.set("__typename", scope403.readString("__typename"))
    normalizeAppFull(scope403)
}
fun normalizeCreateOrganization(scope404: Scope) {
    scope404.assertObject("organization")
    val scope405 = scope404.child("organization", "createOrganization" + scope404.formatArguments("input" to scope404.argumentKey("input")))
    scope405.set("__typename", scope405.readString("__typename"))
    scope405.set("id", scope405.readString("id"))
    scope405.set("name", scope405.readString("name"))
}
fun normalizeCreateUserProfileAndOrganization(scope406: Scope) {
    scope406.assertObject("alphaCreateUserProfileAndOrganization")
    val scope407 = scope406.child("alphaCreateUserProfileAndOrganization", "alphaCreateUserProfileAndOrganization" + scope406.formatArguments("organization" to scope406.argumentKey("organization"),"user" to scope406.argumentKey("user")))
    scope407.set("__typename", scope407.readString("__typename"))
    if (scope407.hasKey("organization")) {
        val scope408 = scope407.child("organization", "organization")
        scope408.set("__typename", scope408.readString("__typename"))
        scope408.set("id", scope408.readString("id"))
        scope408.set("name", scope408.readString("name"))
    } else {
        scope407.setNull("organization")
    }
    if (scope407.hasKey("user")) {
        val scope409 = scope407.child("user", "user")
        scope409.set("__typename", scope409.readString("__typename"))
        normalizeUserFull(scope409)
    } else {
        scope407.setNull("user")
    }
}
fun normalizeDebugMails(scope410: Scope) {
    scope410.set("debugSendEmail" + scope410.formatArguments("type" to scope410.argumentKey("type")), scope410.readBooleanOptional("debugSendEmail"))
}
fun normalizeDeleteComment(scope411: Scope) {
    scope411.set("deleteComment" + scope411.formatArguments("id" to scope411.argumentKey("id")), scope411.readBoolean("deleteComment"))
}
fun normalizeDeleteOrganization(scope412: Scope) {
    scope412.set("deleteOrganization" + scope412.formatArguments("id" to scope412.argumentKey("organizationId")), scope412.readBoolean("deleteOrganization"))
}
fun normalizeDeleteUser(scope413: Scope) {
    scope413.set("superDeleteUser" + scope413.formatArguments("id" to scope413.argumentKey("id")), scope413.readBoolean("superDeleteUser"))
}
fun normalizeEditComment(scope414: Scope) {
    scope414.set("editComment" + scope414.formatArguments("id" to scope414.argumentKey("id"),"message" to scope414.argumentKey("message")), scope414.readBoolean("editComment"))
}
fun normalizeEditPostMessage(scope415: Scope) {
    scope415.assertObject("editPostMessage")
    val scope416 = scope415.child("editPostMessage", "alphaEditPostMessage" + scope415.formatArguments("attachments" to scope415.argumentKey("attachments"),"messageId" to scope415.argumentKey("messageId"),"postType" to scope415.argumentKey("postType"),"text" to scope415.argumentKey("text"),"title" to scope415.argumentKey("title")))
    scope416.set("__typename", scope416.readString("__typename"))
    scope416.set("seq", scope416.readInt("seq"))
}
fun normalizeFeatureFlagAdd(scope417: Scope) {
    scope417.assertObject("featureFlagAdd")
    val scope418 = scope417.child("featureFlagAdd", "featureFlagAdd" + scope417.formatArguments("key" to scope417.argumentKey("key"),"title" to scope417.argumentKey("title")))
    scope418.set("__typename", scope418.readString("__typename"))
    scope418.set("id", scope418.readString("id"))
    scope418.set("key", scope418.readString("key"))
    scope418.set("title", scope418.readString("title"))
}
fun normalizeFeatureFlagDisable(scope419: Scope) {
    scope419.assertObject("superAccountFeatureRemove")
    val scope420 = scope419.child("superAccountFeatureRemove", "superAccountFeatureRemove" + scope419.formatArguments("featureId" to scope419.argumentKey("featureId"),"id" to scope419.argumentKey("accountId")))
    scope420.set("__typename", scope420.readString("__typename"))
    if (scope420.assertList("features")) {
        val scope421 = scope420.childList("features", "features")
        for (i in 0 until scope421.size) {
            scope421.assertObject(i)
            val scope422 = scope421.child(i)
            scope422.set("__typename", scope422.readString("__typename"))
            scope422.set("id", scope422.readString("id"))
            scope422.set("key", scope422.readString("key"))
            scope422.set("title", scope422.readString("title"))
        }
        scope420.set("features", scope421.completed())
    }
    scope420.set("id", scope420.readString("id"))
}
fun normalizeFeatureFlagEnable(scope423: Scope) {
    scope423.assertObject("superAccountFeatureAdd")
    val scope424 = scope423.child("superAccountFeatureAdd", "superAccountFeatureAdd" + scope423.formatArguments("featureId" to scope423.argumentKey("featureId"),"id" to scope423.argumentKey("accountId")))
    scope424.set("__typename", scope424.readString("__typename"))
    if (scope424.assertList("features")) {
        val scope425 = scope424.childList("features", "features")
        for (i in 0 until scope425.size) {
            scope425.assertObject(i)
            val scope426 = scope425.child(i)
            scope426.set("__typename", scope426.readString("__typename"))
            scope426.set("id", scope426.readString("id"))
            scope426.set("key", scope426.readString("key"))
            scope426.set("title", scope426.readString("title"))
        }
        scope424.set("features", scope425.completed())
    }
    scope424.set("id", scope424.readString("id"))
}
fun normalizeFeedPost(scope427: Scope) {
    scope427.assertObject("alphaCreateFeedPost")
    val scope428 = scope427.child("alphaCreateFeedPost", "alphaCreateFeedPost" + scope427.formatArguments("message" to scope427.argumentKey("message")))
    scope428.set("__typename", scope428.readString("__typename"))
    scope428.set("id", scope428.readString("id"))
}
fun normalizeMarkSequenceRead(scope429: Scope) {
    scope429.set("alphaGlobalRead" + scope429.formatArguments("toSeq" to scope429.argumentKey("seq")), scope429.readString("alphaGlobalRead"))
}
fun normalizeMediaAnswer(scope430: Scope) {
    scope430.assertObject("mediaStreamAnswer")
    val scope431 = scope430.child("mediaStreamAnswer", "mediaStreamAnswer" + scope430.formatArguments("answer" to scope430.argumentKey("answer"),"id" to scope430.argumentKey("id"),"peerId" to scope430.argumentKey("peerId")))
    scope431.set("__typename", scope431.readString("__typename"))
    scope431.set("id", scope431.readString("id"))
    if (scope431.assertList("streams")) {
        val scope432 = scope431.childList("streams", "streams")
        for (i in 0 until scope432.size) {
            scope432.assertObject(i)
            val scope433 = scope432.child(i)
            scope433.set("__typename", scope433.readString("__typename"))
            if (scope433.assertList("ice")) {
                val scope434 = scope433.childList("ice", "ice")
                for (i in 0 until scope434.size) {
                    scope434.next(scope434.readString(i))
                }
                scope433.set("ice", scope434.completed())
            }
            scope433.set("id", scope433.readString("id"))
            scope433.set("sdp", scope433.readStringOptional("sdp"))
            scope433.set("state", scope433.readString("state"))
        }
        scope431.set("streams", scope432.completed())
    }
}
fun normalizeMediaCandidate(scope435: Scope) {
    scope435.assertObject("mediaStreamCandidate")
    val scope436 = scope435.child("mediaStreamCandidate", "mediaStreamCandidate" + scope435.formatArguments("candidate" to scope435.argumentKey("candidate"),"id" to scope435.argumentKey("id"),"peerId" to scope435.argumentKey("peerId")))
    scope436.set("__typename", scope436.readString("__typename"))
    scope436.set("id", scope436.readString("id"))
    if (scope436.assertList("streams")) {
        val scope437 = scope436.childList("streams", "streams")
        for (i in 0 until scope437.size) {
            scope437.assertObject(i)
            val scope438 = scope437.child(i)
            scope438.set("__typename", scope438.readString("__typename"))
            if (scope438.assertList("ice")) {
                val scope439 = scope438.childList("ice", "ice")
                for (i in 0 until scope439.size) {
                    scope439.next(scope439.readString(i))
                }
                scope438.set("ice", scope439.completed())
            }
            scope438.set("id", scope438.readString("id"))
            scope438.set("sdp", scope438.readStringOptional("sdp"))
            scope438.set("state", scope438.readString("state"))
        }
        scope436.set("streams", scope437.completed())
    }
}
fun normalizeMediaOffer(scope440: Scope) {
    scope440.assertObject("mediaStreamOffer")
    val scope441 = scope440.child("mediaStreamOffer", "mediaStreamOffer" + scope440.formatArguments("id" to scope440.argumentKey("id"),"offer" to scope440.argumentKey("offer"),"peerId" to scope440.argumentKey("peerId")))
    scope441.set("__typename", scope441.readString("__typename"))
    scope441.set("id", scope441.readString("id"))
    if (scope441.assertList("streams")) {
        val scope442 = scope441.childList("streams", "streams")
        for (i in 0 until scope442.size) {
            scope442.assertObject(i)
            val scope443 = scope442.child(i)
            scope443.set("__typename", scope443.readString("__typename"))
            if (scope443.assertList("ice")) {
                val scope444 = scope443.childList("ice", "ice")
                for (i in 0 until scope444.size) {
                    scope444.next(scope444.readString(i))
                }
                scope443.set("ice", scope444.completed())
            }
            scope443.set("id", scope443.readString("id"))
            scope443.set("sdp", scope443.readStringOptional("sdp"))
            scope443.set("state", scope443.readString("state"))
        }
        scope441.set("streams", scope442.completed())
    }
}
fun normalizeMessageSetReaction(scope445: Scope) {
    scope445.set("betaReactionSet" + scope445.formatArguments("mid" to scope445.argumentKey("messageId"),"reaction" to scope445.argumentKey("reaction")), scope445.readBoolean("betaReactionSet"))
}
fun normalizeMessageUnsetReaction(scope446: Scope) {
    scope446.set("betaReactionRemove" + scope446.formatArguments("mid" to scope446.argumentKey("messageId"),"reaction" to scope446.argumentKey("reaction")), scope446.readBoolean("betaReactionRemove"))
}
fun normalizeOrganizationActivateByInvite(scope447: Scope) {
    scope447.set("joinAppInvite" + scope447.formatArguments("key" to scope447.argumentKey("inviteKey")), scope447.readString("joinAppInvite"))
}
fun normalizeOrganizationAddMember(scope448: Scope) {
    scope448.assertObject("betaOrganizationMemberAdd")
    val scope449 = scope448.child("betaOrganizationMemberAdd", "betaOrganizationMemberAdd" + scope448.formatArguments("organizationId" to scope448.argumentKey("organizationId"),"userIds" to scope448.argumentKey("userIds")))
    scope449.set("__typename", scope449.readString("__typename"))
    normalizeOrganizationFull(scope449)
}
fun normalizeOrganizationAlterPublished(scope450: Scope) {
    scope450.assertObject("alphaAlterPublished")
    val scope451 = scope450.child("alphaAlterPublished", "alphaAlterPublished" + scope450.formatArguments("id" to scope450.argumentKey("organizationId"),"published" to scope450.argumentKey("published")))
    scope451.set("__typename", scope451.readString("__typename"))
    normalizeOrganizationSearch(scope451)
}
fun normalizeOrganizationChangeMemberRole(scope452: Scope) {
    scope452.set("alphaOrganizationChangeMemberRole" + scope452.formatArguments("memberId" to scope452.argumentKey("memberId"),"newRole" to scope452.argumentKey("newRole"),"organizationId" to scope452.argumentKey("organizationId")), scope452.readString("alphaOrganizationChangeMemberRole"))
}
fun normalizeOrganizationCreatePublicInvite(scope453: Scope) {
    scope453.assertObject("alphaOrganizationRefreshInviteLink")
    val scope454 = scope453.child("alphaOrganizationRefreshInviteLink", "alphaOrganizationRefreshInviteLink" + scope453.formatArguments("expirationDays" to scope453.argumentKey("expirationDays"),"organizationId" to scope453.argumentKey("organizationId")))
    scope454.set("__typename", scope454.readString("__typename"))
    scope454.set("id", scope454.readString("id"))
    scope454.set("key", scope454.readString("key"))
    scope454.set("ttl", scope454.readStringOptional("ttl"))
}
fun normalizeOrganizationInviteMembers(scope455: Scope) {
    scope455.set("alphaOrganizationInviteMembers" + scope455.formatArguments("inviteRequests" to scope455.argumentKey("inviteRequests"),"organizationId" to scope455.argumentKey("organizationId")), scope455.readString("alphaOrganizationInviteMembers"))
}
fun normalizeOrganizationMemberRemove(scope456: Scope) {
    scope456.assertObject("betaOrganizationMemberRemove")
    val scope457 = scope456.child("betaOrganizationMemberRemove", "betaOrganizationMemberRemove" + scope456.formatArguments("organizationId" to scope456.argumentKey("organizationId"),"userId" to scope456.argumentKey("userId")))
    scope457.set("__typename", scope457.readString("__typename"))
    scope457.set("id", scope457.readString("id"))
}
fun normalizeOrganizationRemoveMember(scope458: Scope) {
    scope458.set("alphaOrganizationRemoveMember" + scope458.formatArguments("memberId" to scope458.argumentKey("memberId"),"organizationId" to scope458.argumentKey("organizationId")), scope458.readString("alphaOrganizationRemoveMember"))
}
fun normalizePersistEvents(scope459: Scope) {
    scope459.set("track" + scope459.formatArguments("did" to scope459.argumentKey("did"),"events" to scope459.argumentKey("events"),"isProd" to scope459.argumentKey("isProd"),"platform" to scope459.argumentKey("platform")), scope459.readString("track"))
}
fun normalizePinMessage(scope460: Scope) {
    scope460.assertObject("pinMessage")
    val scope461 = scope460.child("pinMessage", "betaPinMessage" + scope460.formatArguments("chatId" to scope460.argumentKey("chatId"),"messageId" to scope460.argumentKey("messageId")))
    scope461.set("__typename", scope461.readString("__typename"))
    normalizeRoomShort(scope461)
}
fun normalizeProfileCreate(scope462: Scope) {
    scope462.assertObject("createProfile")
    val scope463 = scope462.child("createProfile", "createProfile" + scope462.formatArguments("input" to scope462.argumentKey("input")))
    scope463.set("__typename", scope463.readString("__typename"))
    scope463.set("about", scope463.readStringOptional("about"))
    scope463.set("email", scope463.readStringOptional("email"))
    scope463.set("firstName", scope463.readStringOptional("firstName"))
    scope463.set("id", scope463.readString("id"))
    scope463.set("lastName", scope463.readStringOptional("lastName"))
    scope463.set("location", scope463.readStringOptional("location"))
    scope463.set("phone", scope463.readStringOptional("phone"))
    if (scope463.hasKey("photoRef")) {
        val scope464 = scope463.child("photoRef", "photoRef")
        scope464.set("__typename", scope464.readString("__typename"))
        if (scope464.hasKey("crop")) {
            val scope465 = scope464.child("crop", "crop")
            scope465.set("__typename", scope465.readString("__typename"))
            scope465.set("h", scope465.readInt("h"))
            scope465.set("w", scope465.readInt("w"))
            scope465.set("x", scope465.readInt("x"))
            scope465.set("y", scope465.readInt("y"))
        } else {
            scope464.setNull("crop")
        }
        scope464.set("uuid", scope464.readString("uuid"))
    } else {
        scope463.setNull("photoRef")
    }
    scope463.set("website", scope463.readStringOptional("website"))
}
fun normalizeProfileUpdate(scope466: Scope) {
    scope466.assertObject("updateProfile")
    val scope467 = scope466.child("updateProfile", "updateProfile" + scope466.formatArguments("input" to scope466.argumentKey("input"),"uid" to scope466.argumentKey("uid")))
    scope467.set("__typename", scope467.readString("__typename"))
    scope467.set("about", scope467.readStringOptional("about"))
    if (scope467.hasKey("invitedBy")) {
        val scope468 = scope467.child("invitedBy", "alphaInvitedBy")
        scope468.set("__typename", scope468.readString("__typename"))
        scope468.set("name", scope468.readString("name"))
    } else {
        scope467.setNull("alphaInvitedBy")
    }
    scope467.set("alphaJoinedAt", scope467.readStringOptional("joinedAt"))
    scope467.set("alphaLinkedin", scope467.readStringOptional("linkedin"))
    scope467.set("alphaPrimaryOrganizationId", scope467.readStringOptional("primaryOrganizationId"))
    scope467.set("alphaRole", scope467.readStringOptional("role"))
    scope467.set("email", scope467.readStringOptional("email"))
    scope467.set("firstName", scope467.readStringOptional("firstName"))
    scope467.set("id", scope467.readString("id"))
    scope467.set("lastName", scope467.readStringOptional("lastName"))
    scope467.set("location", scope467.readStringOptional("location"))
    scope467.set("phone", scope467.readStringOptional("phone"))
    if (scope467.hasKey("photoRef")) {
        val scope469 = scope467.child("photoRef", "photoRef")
        scope469.set("__typename", scope469.readString("__typename"))
        if (scope469.hasKey("crop")) {
            val scope470 = scope469.child("crop", "crop")
            scope470.set("__typename", scope470.readString("__typename"))
            scope470.set("h", scope470.readInt("h"))
            scope470.set("w", scope470.readInt("w"))
            scope470.set("x", scope470.readInt("x"))
            scope470.set("y", scope470.readInt("y"))
        } else {
            scope469.setNull("crop")
        }
        scope469.set("uuid", scope469.readString("uuid"))
    } else {
        scope467.setNull("photoRef")
    }
    scope467.set("website", scope467.readStringOptional("website"))
}
fun normalizeRefreshAppToken(scope471: Scope) {
    scope471.assertObject("refreshAppToken")
    val scope472 = scope471.child("refreshAppToken", "refreshAppToken" + scope471.formatArguments("appId" to scope471.argumentKey("appId")))
    scope472.set("__typename", scope472.readString("__typename"))
    normalizeAppFull(scope472)
}
fun normalizeRegisterPush(scope473: Scope) {
    scope473.set("registerPush" + scope473.formatArguments("endpoint" to scope473.argumentKey("endpoint"),"type" to scope473.argumentKey("type")), scope473.readString("registerPush"))
}
fun normalizeRegisterWebPush(scope474: Scope) {
    scope474.set("registerWebPush" + scope474.formatArguments("endpoint" to scope474.argumentKey("endpoint")), scope474.readString("registerWebPush"))
}
fun normalizeReplyMessage(scope475: Scope) {
    scope475.set("betaMessageSend" + scope475.formatArguments("mentions" to scope475.argumentKey("mentions"),"message" to scope475.argumentKey("message"),"replyMessages" to scope475.argumentKey("replyMessages"),"room" to scope475.argumentKey("roomId")), scope475.readBoolean("replyMessage"))
}
fun normalizeReportOnline(scope476: Scope) {
    scope476.set("presenceReportOnline" + scope476.formatArguments("active" to scope476.argumentKey("active"),"platform" to scope476.argumentKey("platform"),"timeout" to "5000"), scope476.readString("presenceReportOnline"))
}
fun normalizeRespondPostMessage(scope477: Scope) {
    scope477.set("alphaRespondPostMessage" + scope477.formatArguments("buttonId" to scope477.argumentKey("buttonId"),"messageId" to scope477.argumentKey("messageId")), scope477.readBooleanOptional("alphaRespondPostMessage"))
    scope477.set("betaReactionSet" + scope477.formatArguments("mid" to scope477.argumentKey("messageId"),"reaction" to scope477.argumentKey("reaction")), scope477.readBoolean("betaReactionSet"))
}
fun normalizeRoomAddMember(scope478: Scope) {
    scope478.assertObject("betaRoomInvite")
    val scope479 = scope478.child("betaRoomInvite", "betaRoomInvite" + scope478.formatArguments("invites" to "["+scope478.formatObjectKey("userId" to scope478.argumentKey("userId"),"role" to "MEMBER")+"]","roomId" to scope478.argumentKey("roomId")))
    scope479.set("__typename", scope479.readString("__typename"))
    normalizeRoomFull(scope479)
}
fun normalizeRoomAddMembers(scope480: Scope) {
    scope480.assertObject("betaRoomInvite")
    val scope481 = scope480.child("betaRoomInvite", "betaRoomInvite" + scope480.formatArguments("invites" to scope480.argumentKey("invites"),"roomId" to scope480.argumentKey("roomId")))
    scope481.set("__typename", scope481.readString("__typename"))
    normalizeRoomFull(scope481)
}
fun normalizeRoomAlterFeatured(scope482: Scope) {
    scope482.assertObject("betaRoomAlterFeatured")
    val scope483 = scope482.child("betaRoomAlterFeatured", "betaRoomAlterFeatured" + scope482.formatArguments("featured" to scope482.argumentKey("featured"),"roomId" to scope482.argumentKey("roomId")))
    scope483.set("__typename", scope483.readString("__typename"))
    scope483.set("featured", scope483.readBoolean("featured"))
    scope483.set("id", scope483.readString("id"))
    scope483.set("listed", scope483.readBoolean("listed"))
}
fun normalizeRoomAlterHidden(scope484: Scope) {
    scope484.assertObject("betaRoomAlterListed")
    val scope485 = scope484.child("betaRoomAlterListed", "betaRoomAlterListed" + scope484.formatArguments("listed" to scope484.argumentKey("listed"),"roomId" to scope484.argumentKey("roomId")))
    scope485.set("__typename", scope485.readString("__typename"))
    scope485.set("featured", scope485.readBoolean("featured"))
    scope485.set("id", scope485.readString("id"))
    scope485.set("listed", scope485.readBoolean("listed"))
}
fun normalizeRoomChangeRole(scope486: Scope) {
    scope486.assertObject("betaRoomChangeRole")
    val scope487 = scope486.child("betaRoomChangeRole", "betaRoomChangeRole" + scope486.formatArguments("newRole" to scope486.argumentKey("newRole"),"roomId" to scope486.argumentKey("roomId"),"userId" to scope486.argumentKey("userId")))
    scope487.set("__typename", scope487.readString("__typename"))
    normalizeRoomFull(scope487)
}
fun normalizeRoomCreate(scope488: Scope) {
    scope488.assertObject("room")
    val scope489 = scope488.child("room", "betaRoomCreate" + scope488.formatArguments("channel" to scope488.argumentKey("channel"),"description" to scope488.argumentKey("description"),"kind" to scope488.argumentKey("kind"),"members" to scope488.argumentKey("members"),"message" to scope488.argumentKey("message"),"organizationId" to scope488.argumentKey("organizationId"),"photoRef" to scope488.argumentKey("photoRef"),"title" to scope488.argumentKey("title")))
    scope489.set("__typename", scope489.readString("__typename"))
    scope489.set("id", scope489.readString("id"))
}
fun normalizeRoomCreateIntro(scope490: Scope) {
    scope490.set("betaIntroSend" + scope490.formatArguments("about" to scope490.argumentKey("about"),"file" to scope490.argumentKey("file"),"message" to scope490.argumentKey("about"),"room" to scope490.argumentKey("roomId"),"uid" to scope490.argumentKey("uid")), scope490.readBoolean("intro"))
}
fun normalizeRoomDeclineJoinReuest(scope491: Scope) {
    scope491.assertObject("betaRoomDeclineJoinRequest")
    val scope492 = scope491.child("betaRoomDeclineJoinRequest", "betaRoomDeclineJoinRequest" + scope491.formatArguments("roomId" to scope491.argumentKey("roomId"),"userId" to scope491.argumentKey("userId")))
    scope492.set("__typename", scope492.readString("__typename"))
    normalizeRoomFull(scope492)
}
fun normalizeRoomDeleteMessage(scope493: Scope) {
    scope493.set("betaMessageDelete" + scope493.formatArguments("mid" to scope493.argumentKey("messageId")), scope493.readBoolean("betaMessageDelete"))
}
fun normalizeRoomDeleteMessages(scope494: Scope) {
    scope494.set("betaMessageDelete" + scope494.formatArguments("mids" to scope494.argumentKey("mids")), scope494.readBoolean("betaMessageDelete"))
}
fun normalizeRoomDeleteUrlAugmentation(scope495: Scope) {
    scope495.set("betaMessageDeleteAugmentation" + scope495.formatArguments("mid" to scope495.argumentKey("messageId")), scope495.readBoolean("betaMessageDeleteAugmentation"))
}
fun normalizeRoomEditIntro(scope496: Scope) {
    scope496.set("betaIntroEdit" + scope496.formatArguments("about" to scope496.argumentKey("about"),"file" to scope496.argumentKey("file"),"message" to scope496.argumentKey("about"),"mid" to scope496.argumentKey("messageId"),"uid" to scope496.argumentKey("uid")), scope496.readBoolean("intro"))
}
fun normalizeRoomEditMessage(scope497: Scope) {
    scope497.set("betaMessageEdit" + scope497.formatArguments("file" to scope497.argumentKey("file"),"mentions" to scope497.argumentKey("mentions"),"message" to scope497.argumentKey("message"),"mid" to scope497.argumentKey("messageId"),"replyMessages" to scope497.argumentKey("replyMessages")), scope497.readBoolean("betaMessageEdit"))
}
fun normalizeRoomJoin(scope498: Scope) {
    scope498.assertObject("join")
    val scope499 = scope498.child("join", "betaRoomJoin" + scope498.formatArguments("roomId" to scope498.argumentKey("roomId")))
    scope499.set("__typename", scope499.readString("__typename"))
    normalizeRoomFull(scope499)
}
fun normalizeRoomJoinInviteLink(scope500: Scope) {
    scope500.assertObject("join")
    val scope501 = scope500.child("join", "betaRoomInviteLinkJoin" + scope500.formatArguments("invite" to scope500.argumentKey("invite")))
    scope501.set("__typename", scope501.readString("__typename"))
    normalizeRoomFull(scope501)
}
fun normalizeRoomKick(scope502: Scope) {
    scope502.assertObject("betaRoomKick")
    val scope503 = scope502.child("betaRoomKick", "betaRoomKick" + scope502.formatArguments("roomId" to scope502.argumentKey("roomId"),"userId" to scope502.argumentKey("userId")))
    scope503.set("__typename", scope503.readString("__typename"))
    normalizeRoomFull(scope503)
}
fun normalizeRoomLeave(scope504: Scope) {
    scope504.assertObject("betaRoomLeave")
    val scope505 = scope504.child("betaRoomLeave", "betaRoomLeave" + scope504.formatArguments("roomId" to scope504.argumentKey("roomId")))
    scope505.set("__typename", scope505.readString("__typename"))
    normalizeRoomFull(scope505)
}
fun normalizeRoomRead(scope506: Scope) {
    scope506.set("roomRead" + scope506.formatArguments("id" to scope506.argumentKey("id"),"mid" to scope506.argumentKey("mid")), scope506.readBoolean("roomRead"))
}
fun normalizeRoomRenewInviteLink(scope507: Scope) {
    scope507.set("betaRoomInviteLinkRenew" + scope507.formatArguments("roomId" to scope507.argumentKey("roomId")), scope507.readString("link"))
}
fun normalizeRoomSendEmailInvite(scope508: Scope) {
    scope508.set("betaRoomInviteLinkSendEmail" + scope508.formatArguments("inviteRequests" to scope508.argumentKey("inviteRequests"),"roomId" to scope508.argumentKey("roomId")), scope508.readString("betaRoomInviteLinkSendEmail"))
}
fun normalizeRoomSettingsUpdate(scope509: Scope) {
    scope509.assertObject("betaRoomUpdateUserNotificationSettings")
    val scope510 = scope509.child("betaRoomUpdateUserNotificationSettings", "betaRoomUpdateUserNotificationSettings" + scope509.formatArguments("roomId" to scope509.argumentKey("roomId"),"settings" to scope509.argumentKey("settings")))
    scope510.set("__typename", scope510.readString("__typename"))
    scope510.set("id", scope510.readString("id"))
    scope510.set("mute", scope510.readBooleanOptional("mute"))
}
fun normalizeRoomUpdate(scope511: Scope) {
    scope511.assertObject("betaRoomUpdate")
    val scope512 = scope511.child("betaRoomUpdate", "betaRoomUpdate" + scope511.formatArguments("input" to scope511.argumentKey("input"),"roomId" to scope511.argumentKey("roomId")))
    scope512.set("__typename", scope512.readString("__typename"))
    if (scope512.isType("PrivateRoom")) {
        scope512.set("id", scope512.readString("id"))
    }
    if (scope512.isType("SharedRoom")) {
        scope512.set("description", scope512.readStringOptional("description"))
        scope512.set("id", scope512.readString("id"))
        scope512.set("photo", scope512.readString("photo"))
        scope512.set("socialImage", scope512.readStringOptional("socialImage"))
        scope512.set("title", scope512.readString("title"))
    }
}
fun normalizeSaveDraftMessage(scope513: Scope) {
    scope513.set("conversationDraftUpdate" + scope513.formatArguments("conversationId" to scope513.argumentKey("conversationId"),"message" to scope513.argumentKey("message")), scope513.readString("conversationDraftUpdate"))
}
fun normalizeSendMessage(scope514: Scope) {
    scope514.set("betaMessageSend" + scope514.formatArguments("file" to scope514.argumentKey("file"),"mentions" to scope514.argumentKey("mentions"),"message" to scope514.argumentKey("message"),"repeatKey" to scope514.argumentKey("repeatKey"),"replyMessages" to scope514.argumentKey("replyMessages"),"room" to scope514.argumentKey("room")), scope514.readBoolean("sentMessage"))
}
fun normalizeSendPostMessage(scope515: Scope) {
    scope515.assertObject("sendPostMessage")
    val scope516 = scope515.child("sendPostMessage", "alphaSendPostMessage" + scope515.formatArguments("attachments" to scope515.argumentKey("attachments"),"conversationId" to scope515.argumentKey("conversationId"),"postType" to scope515.argumentKey("postType"),"text" to scope515.argumentKey("text"),"title" to scope515.argumentKey("title")))
    scope516.set("__typename", scope516.readString("__typename"))
    scope516.set("seq", scope516.readInt("seq"))
}
fun normalizeSetOrgShortname(scope517: Scope) {
    scope517.set("alphaSetOrgShortName" + scope517.formatArguments("id" to scope517.argumentKey("organizationId"),"shortname" to scope517.argumentKey("shortname")), scope517.readStringOptional("alphaSetOrgShortName"))
}
fun normalizeSetTyping(scope518: Scope) {
    scope518.set("typingSend" + scope518.formatArguments("conversationId" to scope518.argumentKey("conversationId"),"type" to "TEXT"), scope518.readString("typingSend"))
}
fun normalizeSetUserShortname(scope519: Scope) {
    scope519.set("alphaSetUserShortName" + scope519.formatArguments("shortname" to scope519.argumentKey("shortname")), scope519.readStringOptional("alphaSetUserShortName"))
}
fun normalizeSettingsUpdate(scope520: Scope) {
    scope520.assertObject("updateSettings")
    val scope521 = scope520.child("updateSettings", "updateSettings" + scope520.formatArguments("settings" to scope520.argumentKey("input")))
    scope521.set("__typename", scope521.readString("__typename"))
    normalizeSettingsFull(scope521)
}
fun normalizeSuperAccountActivate(scope522: Scope) {
    scope522.assertObject("superAccountActivate")
    val scope523 = scope522.child("superAccountActivate", "superAccountActivate" + scope522.formatArguments("id" to scope522.argumentKey("accountId")))
    scope523.set("__typename", scope523.readString("__typename"))
    scope523.set("id", scope523.readString("id"))
    scope523.set("state", scope523.readString("state"))
}
fun normalizeSuperAccountAdd(scope524: Scope) {
    scope524.assertObject("superAccountAdd")
    val scope525 = scope524.child("superAccountAdd", "superAccountAdd" + scope524.formatArguments("title" to scope524.argumentKey("title")))
    scope525.set("__typename", scope525.readString("__typename"))
    scope525.set("id", scope525.readString("id"))
}
fun normalizeSuperAccountMemberAdd(scope526: Scope) {
    scope526.assertObject("superAccountMemberAdd")
    val scope527 = scope526.child("superAccountMemberAdd", "superAccountMemberAdd" + scope526.formatArguments("id" to scope526.argumentKey("accountId"),"userId" to scope526.argumentKey("userId")))
    scope527.set("__typename", scope527.readString("__typename"))
    scope527.set("id", scope527.readString("id"))
    if (scope527.assertList("members")) {
        val scope528 = scope527.childList("members", "members")
        for (i in 0 until scope528.size) {
            scope528.assertObject(i)
            val scope529 = scope528.child(i)
            scope529.set("__typename", scope529.readString("__typename"))
            normalizeUserShort(scope529)
        }
        scope527.set("members", scope528.completed())
    }
}
fun normalizeSuperAccountMemberRemove(scope530: Scope) {
    scope530.assertObject("superAccountMemberRemove")
    val scope531 = scope530.child("superAccountMemberRemove", "superAccountMemberRemove" + scope530.formatArguments("id" to scope530.argumentKey("accountId"),"userId" to scope530.argumentKey("userId")))
    scope531.set("__typename", scope531.readString("__typename"))
    scope531.set("id", scope531.readString("id"))
    if (scope531.assertList("members")) {
        val scope532 = scope531.childList("members", "members")
        for (i in 0 until scope532.size) {
            scope532.assertObject(i)
            val scope533 = scope532.child(i)
            scope533.set("__typename", scope533.readString("__typename"))
            normalizeUserShort(scope533)
        }
        scope531.set("members", scope532.completed())
    }
}
fun normalizeSuperAccountPend(scope534: Scope) {
    scope534.assertObject("superAccountPend")
    val scope535 = scope534.child("superAccountPend", "superAccountPend" + scope534.formatArguments("id" to scope534.argumentKey("accountId")))
    scope535.set("__typename", scope535.readString("__typename"))
    scope535.set("id", scope535.readString("id"))
    scope535.set("state", scope535.readString("state"))
}
fun normalizeSuperAccountRename(scope536: Scope) {
    scope536.assertObject("superAccountRename")
    val scope537 = scope536.child("superAccountRename", "superAccountRename" + scope536.formatArguments("id" to scope536.argumentKey("accountId"),"title" to scope536.argumentKey("title")))
    scope537.set("__typename", scope537.readString("__typename"))
    scope537.set("id", scope537.readString("id"))
    scope537.set("title", scope537.readString("title"))
}
fun normalizeSuperAccountSuspend(scope538: Scope) {
    scope538.assertObject("superAccountSuspend")
    val scope539 = scope538.child("superAccountSuspend", "superAccountSuspend" + scope538.formatArguments("id" to scope538.argumentKey("accountId")))
    scope539.set("__typename", scope539.readString("__typename"))
    scope539.set("id", scope539.readString("id"))
    scope539.set("state", scope539.readString("state"))
}
fun normalizeSuperAdminAdd(scope540: Scope) {
    scope540.set("superAdminAdd" + scope540.formatArguments("role" to scope540.argumentKey("role"),"userId" to scope540.argumentKey("userId")), scope540.readString("superAdminAdd"))
}
fun normalizeSuperAdminRemove(scope541: Scope) {
    scope541.set("superAdminRemove" + scope541.formatArguments("userId" to scope541.argumentKey("userId")), scope541.readString("superAdminRemove"))
}
fun normalizeSwitchReaction(scope542: Scope) {
    scope542.set("betaReactionRemove" + scope542.formatArguments("mid" to scope542.argumentKey("messageId"),"reaction" to scope542.argumentKey("from")), scope542.readBoolean("betaReactionRemove"))
    scope542.set("betaReactionSet" + scope542.formatArguments("mid" to scope542.argumentKey("messageId"),"reaction" to scope542.argumentKey("to")), scope542.readBoolean("betaReactionSet"))
}
fun normalizeUnpinMessage(scope543: Scope) {
    scope543.assertObject("unpinMessage")
    val scope544 = scope543.child("unpinMessage", "betaUnpinMessage" + scope543.formatArguments("chatId" to scope543.argumentKey("chatId")))
    scope544.set("__typename", scope544.readString("__typename"))
    normalizeRoomShort(scope544)
}
fun normalizeUpdateApp(scope545: Scope) {
    scope545.assertObject("updateAppProfile")
    val scope546 = scope545.child("updateAppProfile", "updateAppProfile" + scope545.formatArguments("appId" to scope545.argumentKey("appId"),"input" to scope545.argumentKey("input")))
    scope546.set("__typename", scope546.readString("__typename"))
    normalizeAppFull(scope546)
}
fun normalizeUpdateOrganization(scope547: Scope) {
    scope547.assertObject("updateOrganizationProfile")
    val scope548 = scope547.child("updateOrganizationProfile", "updateOrganizationProfile" + scope547.formatArguments("id" to scope547.argumentKey("organizationId"),"input" to scope547.argumentKey("input")))
    scope548.set("__typename", scope548.readString("__typename"))
    normalizeOrganizationProfileFull(scope548)
}
fun normalizeUpdateWelcomeMessage(scope549: Scope) {
    scope549.set("updateWelcomeMessage" + scope549.formatArguments("roomId" to scope549.argumentKey("roomId"),"welcomeMessageIsOn" to scope549.argumentKey("welcomeMessageIsOn"),"welcomeMessageSender" to scope549.argumentKey("welcomeMessageSender"),"welcomeMessageText" to scope549.argumentKey("welcomeMessageText")), scope549.readBoolean("updateWelcomeMessage"))
}
fun normalizeUserStorageSet(scope550: Scope) {
    if (scope550.assertList("userStorageSet")) {
        val scope551 = scope550.childList("userStorageSet", "userStorageSet" + scope550.formatArguments("data" to scope550.argumentKey("data"),"namespace" to scope550.argumentKey("namespace")))
        for (i in 0 until scope551.size) {
            scope551.assertObject(i)
            val scope552 = scope551.child(i)
            scope552.set("__typename", scope552.readString("__typename"))
            scope552.set("id", scope552.readString("id"))
            scope552.set("key", scope552.readString("key"))
            scope552.set("value", scope552.readStringOptional("value"))
        }
        scope550.set("userStorageSet" + scope550.formatArguments("data" to scope550.argumentKey("data"),"namespace" to scope550.argumentKey("namespace")), scope551.completed())
    }
}
fun normalizeChatOnlinesCountWatch(scope553: Scope) {
    scope553.assertObject("chatOnlinesCount")
    val scope554 = scope553.child("chatOnlinesCount", "chatOnlinesCount" + scope553.formatArguments("chatId" to scope553.argumentKey("chatId")))
    scope554.set("__typename", scope554.readString("__typename"))
    scope554.set("onlineMembers", scope554.readInt("onlineMembers"))
}
fun normalizeChatWatch(scope555: Scope) {
    scope555.assertObject("event")
    val scope556 = scope555.child("event", "chatUpdates" + scope555.formatArguments("chatId" to scope555.argumentKey("chatId"),"fromState" to scope555.argumentKey("state")))
    scope556.set("__typename", scope556.readString("__typename"))
    if (scope556.isType("ChatUpdateSingle")) {
        scope556.set("seq", scope556.readInt("seq"))
        scope556.set("state", scope556.readString("state"))
        scope556.assertObject("update")
        val scope557 = scope556.child("update", "update")
        scope557.set("__typename", scope557.readString("__typename"))
        normalizeChatUpdateFragment(scope557)
    }
    if (scope556.isType("ChatUpdateBatch")) {
        scope556.set("fromSeq", scope556.readInt("fromSeq"))
        scope556.set("seq", scope556.readInt("seq"))
        scope556.set("state", scope556.readString("state"))
        if (scope556.assertList("updates")) {
            val scope558 = scope556.childList("updates", "updates")
            for (i in 0 until scope558.size) {
                scope558.assertObject(i)
                val scope559 = scope558.child(i)
                scope559.set("__typename", scope559.readString("__typename"))
                normalizeChatUpdateFragment(scope559)
            }
            scope556.set("updates", scope558.completed())
        }
    }
}
fun normalizeCommentWatch(scope560: Scope) {
    if (scope560.hasKey("event")) {
        val scope561 = scope560.child("event", "commentUpdates" + scope560.formatArguments("fromState" to scope560.argumentKey("fromState"),"peerId" to scope560.argumentKey("peerId")))
        scope561.set("__typename", scope561.readString("__typename"))
        if (scope561.isType("CommentUpdateSingle")) {
            scope561.set("seq", scope561.readInt("seq"))
            scope561.set("state", scope561.readString("state"))
            scope561.assertObject("update")
            val scope562 = scope561.child("update", "update")
            scope562.set("__typename", scope562.readString("__typename"))
            normalizeCommentUpdateFragment(scope562)
        }
        if (scope561.isType("CommentUpdateBatch")) {
            scope561.set("fromSeq", scope561.readInt("fromSeq"))
            scope561.set("seq", scope561.readInt("seq"))
            scope561.set("state", scope561.readString("state"))
            if (scope561.assertList("updates")) {
                val scope563 = scope561.childList("updates", "updates")
                for (i in 0 until scope563.size) {
                    scope563.assertObject(i)
                    val scope564 = scope563.child(i)
                    scope564.set("__typename", scope564.readString("__typename"))
                    normalizeCommentUpdateFragment(scope564)
                }
                scope561.set("updates", scope563.completed())
            }
        }
    } else {
        scope560.setNull("commentUpdates" + scope560.formatArguments("fromState" to scope560.argumentKey("fromState"),"peerId" to scope560.argumentKey("peerId")))
    }
}
fun normalizeConferenceMediaWatch(scope565: Scope) {
    scope565.assertObject("media")
    val scope566 = scope565.child("media", "alphaConferenceMediaWatch" + scope565.formatArguments("id" to scope565.argumentKey("id"),"peerId" to scope565.argumentKey("peerId")))
    scope566.set("__typename", scope566.readString("__typename"))
    scope566.set("id", scope566.readString("id"))
    if (scope566.assertList("streams")) {
        val scope567 = scope566.childList("streams", "streams")
        for (i in 0 until scope567.size) {
            scope567.assertObject(i)
            val scope568 = scope567.child(i)
            scope568.set("__typename", scope568.readString("__typename"))
            if (scope568.assertList("ice")) {
                val scope569 = scope568.childList("ice", "ice")
                for (i in 0 until scope569.size) {
                    scope569.next(scope569.readString(i))
                }
                scope568.set("ice", scope569.completed())
            }
            scope568.set("id", scope568.readString("id"))
            scope568.set("sdp", scope568.readStringOptional("sdp"))
            scope568.set("state", scope568.readString("state"))
        }
        scope566.set("streams", scope567.completed())
    }
}
fun normalizeConferenceWatch(scope570: Scope) {
    scope570.assertObject("alphaConferenceWatch")
    val scope571 = scope570.child("alphaConferenceWatch", "alphaConferenceWatch" + scope570.formatArguments("id" to scope570.argumentKey("id")))
    scope571.set("__typename", scope571.readString("__typename"))
    normalizeConferenceFull(scope571)
}
fun normalizeDialogsWatch(scope572: Scope) {
    scope572.assertObject("event")
    val scope573 = scope572.child("event", "dialogsUpdates" + scope572.formatArguments("fromState" to scope572.argumentKey("state")))
    scope573.set("__typename", scope573.readString("__typename"))
    if (scope573.isType("DialogUpdateSingle")) {
        scope573.set("seq", scope573.readInt("seq"))
        scope573.set("state", scope573.readString("state"))
        scope573.assertObject("update")
        val scope574 = scope573.child("update", "update")
        scope574.set("__typename", scope574.readString("__typename"))
        normalizeDialogUpdateFragment(scope574)
    }
    if (scope573.isType("DialogUpdateBatch")) {
        scope573.set("fromSeq", scope573.readInt("fromSeq"))
        scope573.set("seq", scope573.readInt("seq"))
        scope573.set("state", scope573.readString("state"))
        if (scope573.assertList("updates")) {
            val scope575 = scope573.childList("updates", "updates")
            for (i in 0 until scope575.size) {
                scope575.assertObject(i)
                val scope576 = scope575.child(i)
                scope576.set("__typename", scope576.readString("__typename"))
                normalizeDialogUpdateFragment(scope576)
            }
            scope573.set("updates", scope575.completed())
        }
    }
}
fun normalizeOnlineWatch(scope577: Scope) {
    scope577.assertObject("alphaSubscribeChatOnline")
    val scope578 = scope577.child("alphaSubscribeChatOnline", "alphaSubscribeChatOnline" + scope577.formatArguments("conversations" to scope577.argumentKey("conversations")))
    scope578.set("__typename", scope578.readString("__typename"))
    scope578.set("timeout", scope578.readInt("timeout"))
    scope578.set("type", scope578.readString("type"))
    scope578.assertObject("user")
    val scope579 = scope578.child("user", "user")
    scope579.set("__typename", scope579.readString("__typename"))
    scope579.set("id", scope579.readString("id"))
    scope579.set("lastSeen", scope579.readStringOptional("lastSeen"))
    scope579.set("online", scope579.readBoolean("online"))
}
fun normalizeSettingsWatch(scope580: Scope) {
    scope580.assertObject("watchSettings")
    val scope581 = scope580.child("watchSettings", "watchSettings")
    scope581.set("__typename", scope581.readString("__typename"))
    normalizeSettingsFull(scope581)
}
fun normalizeTypingsWatch(scope582: Scope) {
    scope582.assertObject("typings")
    val scope583 = scope582.child("typings", "typings")
    scope583.set("__typename", scope583.readString("__typename"))
    scope583.set("cancel", scope583.readBoolean("cancel"))
    scope583.assertObject("conversation")
    val scope584 = scope583.child("conversation", "conversation")
    scope584.set("__typename", scope584.readString("__typename"))
    scope584.set("id", scope584.readString("id"))
    scope583.assertObject("user")
    val scope585 = scope583.child("user", "user")
    scope585.set("__typename", scope585.readString("__typename"))
    scope585.set("id", scope585.readString("id"))
    scope585.set("name", scope585.readString("name"))
    scope585.set("photo", scope585.readStringOptional("photo"))
}
val AppChatSelector = obj(listOf(
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

val AppFullSelector = obj(listOf(
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

val OrganizationShortSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("alphaIsCommunity","isCommunity", notNull(scalar("Boolean"))),
            field("id","id", notNull(scalar("ID"))),
            field("name","name", notNull(scalar("String"))),
            field("photo","photo", scalar("String"))
        ))

val UserShortSelector = obj(listOf(
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

val UserTinySelector = obj(listOf(
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

val FullMessageSelector = obj(listOf(
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
                                fragment("User", UserTinySelector)
                            ))))
                    ))),
                    inline("MessageSpanMultiUserMention", obj(listOf(
                        field("users","users", notNull(list(notNull(obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserTinySelector)
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
                    inline("MessageSpanBold", obj(listOf(
                        field("length","length", notNull(scalar("Int"))),
                        field("offset","offset", notNull(scalar("Int")))
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
                                        field("filePreview","filePreview", scalar("String"))
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
                            field("edited","edited", notNull(scalar("Boolean")))
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

val RoomShortSelector = obj(listOf(
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

val ChatUpdateFragmentSelector = obj(listOf(
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

val CommentEntryFragmentSelector = obj(listOf(
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

val CommentUpdateFragmentSelector = obj(listOf(
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

val CommunitySearchSelector = obj(listOf(
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

val ConferenceFullSelector = obj(listOf(
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

val TinyMessageSelector = obj(listOf(
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
                            field("filePreview","filePreview", scalar("String"))
                        )))
                    )))))),
                field("commentsCount","commentsCount", notNull(scalar("Int"))),
                field("quotedMessages","quotedMessages", notNull(list(notNull(obj(listOf(
                        field("__typename","__typename", notNull(scalar("String"))),
                        field("id","id", notNull(scalar("ID")))
                    ))))))
            )))
        ))

val DialogUpdateFragmentSelector = obj(listOf(
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

val UserFullSelector = obj(listOf(
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

val OrganizationFullSelector = obj(listOf(
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

val OrganizationMediumSelector = obj(listOf(
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

val OrganizationProfileFullSelector = obj(listOf(
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

val OrganizationSearchSelector = obj(listOf(
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

val OrganizationWithoutMembersFragmentSelector = obj(listOf(
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

val RoomFullSelector = obj(listOf(
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

val RoomFullWithoutMembersSelector = obj(listOf(
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

val SessionStateFullSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("isAccountActivated","isAccountActivated", notNull(scalar("Boolean"))),
            field("isAccountExists","isAccountExists", notNull(scalar("Boolean"))),
            field("isAccountPicked","isAccountPicked", notNull(scalar("Boolean"))),
            field("isBlocked","isBlocked", notNull(scalar("Boolean"))),
            field("isCompleted","isCompleted", notNull(scalar("Boolean"))),
            field("isLoggedIn","isLoggedIn", notNull(scalar("Boolean"))),
            field("isProfileCreated","isProfileCreated", notNull(scalar("Boolean")))
        ))

val SettingsFullSelector = obj(listOf(
            field("__typename","__typename", notNull(scalar("String"))),
            field("desktopNotifications","desktopNotifications", notNull(scalar("String"))),
            field("emailFrequency","emailFrequency", notNull(scalar("String"))),
            field("id","id", notNull(scalar("ID"))),
            field("mobileAlert","mobileAlert", notNull(scalar("Boolean"))),
            field("mobileIncludeText","mobileIncludeText", notNull(scalar("Boolean"))),
            field("mobileNotifications","mobileNotifications", notNull(scalar("String"))),
            field("primaryEmail","primaryEmail", notNull(scalar("String")))
        ))

val AccountSelector = obj(listOf(
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
val AccountAppInviteSelector = obj(listOf(
            field("appInvite","invite", notNull(scalar("String")))
        ))
val AccountAppInviteInfoSelector = obj(listOf(
            field("alphaInviteInfo","invite", mapOf("key" to reference("inviteKey")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("creator","creator", obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        )))
                ))),
            field("appInviteInfo","appInvite", mapOf("key" to reference("inviteKey")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("inviter","inviter", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            fragment("User", UserShortSelector)
                        ))))
                )))
        ))
val AccountInviteInfoSelector = obj(listOf(
            field("alphaInviteInfo","invite", mapOf("key" to reference("inviteKey")), obj(listOf(
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
                            field("alphaIsCommunity","isCommunity", notNull(scalar("Boolean")))
                        ))),
                    field("photo","photo", scalar("String")),
                    field("title","title", notNull(scalar("String")))
                )))
        ))
val AccountInvitesSelector = obj(listOf(
            field("alphaInvites","invites", list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String")))
                )))))
        ))
val AccountInvitesHistorySelector = obj(listOf(
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
val AccountSettingsSelector = obj(listOf(
            field("me","me", obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("User", UserShortSelector)
                ))),
            field("myOrganizations","organizations", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationShortSelector)
                ))))))
        ))
val AvailableRoomsSelector = obj(listOf(
            field("betaAvailableRooms","rooms", notNull(list(notNull(obj(listOf(
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
val ChatHistorySelector = obj(listOf(
            field("conversationState","state", mapOf("id" to reference("chatId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("state","state", scalar("String"))
                )))),
            field("messages","messages", mapOf("before" to reference("before"), "chatId" to reference("chatId"), "first" to reference("first")), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("ModernMessage", FullMessageSelector)
                ))))))
        ))
val ChatInitSelector = obj(listOf(
            field("conversationState","state", mapOf("id" to reference("chatId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("state","state", scalar("String"))
                )))),
            field("messages","messages", mapOf("before" to reference("before"), "chatId" to reference("chatId"), "first" to reference("first")), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("ModernMessage", FullMessageSelector)
                )))))),
            field("room","room", mapOf("id" to reference("chatId")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))
        ))
val ChatSearchGroupSelector = obj(listOf(
            field("alphaChatSearch","group", mapOf("members" to reference("members")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("flexibleId","flexibleId", notNull(scalar("ID"))),
                    field("id","id", notNull(scalar("ID")))
                )))
        ))
val ConferenceSelector = obj(listOf(
            field("conference","conference", mapOf("id" to reference("id")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Conference", ConferenceFullSelector)
                ))))
        ))
val ConferenceMediaSelector = obj(listOf(
            field("conferenceMedia","conferenceMedia", mapOf("id" to reference("id"), "peerId" to reference("peerId")), notNull(obj(listOf(
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
val DialogsSelector = obj(listOf(
            field("alphaNotificationCounter","counter", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("unreadCount","unreadCount", notNull(scalar("Int")))
                )))),
            field("dialogs","dialogs", mapOf("after" to reference("after"), "first" to i(20)), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("cursor","cursor", scalar("String")),
                    field("items","items", notNull(list(notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("alphaTopMessage","topMessage", obj(listOf(
                                    field("__typename","__typename", notNull(scalar("String"))),
                                    fragment("ModernMessage", TinyMessageSelector)
                                ))),
                            field("cid","cid", notNull(scalar("ID"))),
                            field("fid","fid", notNull(scalar("ID"))),
                            field("haveMention","haveMention", notNull(scalar("Boolean"))),
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
val ExploreCommunitySelector = obj(listOf(
            field("alphaComunityPrefixSearch","items", mapOf("first" to i(25), "page" to reference("page"), "query" to reference("query"), "sort" to reference("sort")), notNull(obj(listOf(
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
val ExploreOrganizationsSelector = obj(listOf(
            field("alphaOrganizations","items", mapOf("after" to reference("after"), "all" to reference("all"), "first" to i(25), "page" to reference("page"), "prefix" to reference("prefix"), "query" to reference("query"), "sort" to reference("sort")), notNull(obj(listOf(
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
val ExplorePeopleSelector = obj(listOf(
            field("userSearch","items", mapOf("after" to reference("after"), "first" to i(25), "page" to reference("page"), "query" to reference("query"), "sort" to reference("sort")), notNull(obj(listOf(
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
val FeatureFlagsSelector = obj(listOf(
            field("featureFlags","featureFlags", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("title","title", notNull(scalar("String")))
                ))))))
        ))
val FeedHomeSelector = obj(listOf(
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
val FetchPushSettingsSelector = obj(listOf(
            field("pushSettings","pushSettings", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("webPushKey","webPushKey", scalar("String"))
                ))))
        ))
val GetDraftMessageSelector = obj(listOf(
            field("conversationDraft","message", mapOf("conversationId" to reference("conversationId")), scalar("String"))
        ))
val GlobalCounterSelector = obj(listOf(
            field("alphaNotificationCounter","alphaNotificationCounter", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("unreadCount","unreadCount", notNull(scalar("Int")))
                ))))
        ))
val GlobalSearchSelector = obj(listOf(
            field("alphaGlobalSearch","items", mapOf("query" to reference("query")), notNull(list(notNull(obj(listOf(
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
val MessageSelector = obj(listOf(
            field("message","message", mapOf("messageId" to reference("messageId")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("ModernMessage", FullMessageSelector)
                )))
        ))
val MessageCommentsSelector = obj(listOf(
            field("messageComments","messageComments", mapOf("messageId" to reference("messageId")), notNull(obj(listOf(
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
val MyAppsSelector = obj(listOf(
            field("myApps","apps", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("AppProfile", AppFullSelector)
                ))))))
        ))
val MyOrganizationsSelector = obj(listOf(
            field("myOrganizations","myOrganizations", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("betaIsPrimary","isPrimary", notNull(scalar("Boolean"))),
                    fragment("Organization", OrganizationShortSelector)
                ))))))
        ))
val OnlineSelector = obj(listOf(
            field("user","user", mapOf("id" to reference("userId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("lastSeen","lastSeen", scalar("String")),
                    field("online","online", notNull(scalar("Boolean")))
                ))))
        ))
val OrganizationSelector = obj(listOf(
            field("organization","organization", mapOf("id" to reference("organizationId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationFullSelector)
                ))))
        ))
val OrganizationByPrefixSelector = obj(listOf(
            field("alphaOrganizationByPrefix","organizationByPrefix", mapOf("query" to reference("query")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationSearchSelector)
                )))
        ))
val OrganizationMembersShortSelector = obj(listOf(
            field("organization","organization", mapOf("id" to reference("organizationId")), notNull(obj(listOf(
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
val OrganizationMembersShortPaginatedSelector = obj(listOf(
            field("organization","organization", mapOf("id" to reference("organizationId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("alphaOrganizationMembers","members", mapOf("after" to reference("after"), "first" to reference("first")), notNull(list(notNull(obj(listOf(
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
val OrganizationProfileSelector = obj(listOf(
            field("organizationProfile","organizationProfile", mapOf("id" to reference("organizationId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("OrganizationProfile", OrganizationProfileFullSelector)
                ))))
        ))
val OrganizationPublicInviteSelector = obj(listOf(
            field("alphaOrganizationInviteLink","publicInvite", mapOf("organizationId" to reference("organizationId")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("ttl","ttl", scalar("String"))
                )))
        ))
val OrganizationWithoutMembersSelector = obj(listOf(
            field("organization","organization", mapOf("id" to reference("organizationId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Organization", OrganizationWithoutMembersFragmentSelector)
                ))))
        ))
val PermissionsSelector = obj(listOf(
            field("myPermissions","myPermissions", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("roles","roles", notNull(list(notNull(scalar("String")))))
                ))))
        ))
val ProfileSelector = obj(listOf(
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
val ProfilePrefillSelector = obj(listOf(
            field("myProfilePrefill","prefill", obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("firstName","firstName", scalar("String")),
                    field("lastName","lastName", scalar("String")),
                    field("picture","picture", scalar("String"))
                )))
        ))
val ResolveShortNameSelector = obj(listOf(
            field("alphaResolveShortName","item", mapOf("shortname" to reference("shortname")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("User", obj(listOf(
                        fragment("User", UserFullSelector)
                    ))),
                    inline("Organization", obj(listOf(
                        fragment("Organization", OrganizationFullSelector)
                    )))
                )))
        ))
val ResolvedInviteSelector = obj(listOf(
            field("alphaResolveInvite","invite", mapOf("key" to reference("key")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    inline("InviteInfo", obj(listOf(
                        field("creator","creator", obj(listOf(
                                field("__typename","__typename", notNull(scalar("String"))),
                                fragment("User", UserShortSelector)
                            ))),
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
val RoomSelector = obj(listOf(
            field("room","room", mapOf("id" to reference("id")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullSelector)
                )))
        ))
val RoomChatSelector = obj(listOf(
            field("room","room", mapOf("id" to reference("id")), obj(listOf(
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
val RoomHeaderSelector = obj(listOf(
            field("room","room", mapOf("id" to reference("id")), obj(listOf(
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
val RoomInviteInfoSelector = obj(listOf(
            field("betaRoomInviteInfo","invite", mapOf("invite" to reference("invite")), obj(listOf(
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
val RoomInviteLinkSelector = obj(listOf(
            field("betaRoomInviteLink","link", mapOf("roomId" to reference("roomId")), notNull(scalar("String")))
        ))
val RoomMemberShortSelector = obj(listOf(
            field("roomMember","member", mapOf("memberId" to reference("memberId"), "roomId" to reference("roomId")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("user","user", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("firstName","firstName", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID"))),
                            field("name","name", notNull(scalar("String")))
                        ))))
                )))
        ))
val RoomMembersSelector = obj(listOf(
            field("roomMembers","members", mapOf("roomId" to reference("roomId")), notNull(list(notNull(obj(listOf(
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
val RoomMembersPaginatedSelector = obj(listOf(
            field("roomMembers","members", mapOf("after" to reference("after"), "first" to reference("first"), "roomId" to reference("roomId")), notNull(list(notNull(obj(listOf(
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
val RoomMembersShortSelector = obj(listOf(
            field("roomMembers","members", mapOf("roomId" to reference("roomId")), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("user","user", notNull(obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
                            field("id","id", notNull(scalar("ID")))
                        ))))
                ))))))
        ))
val RoomSearchSelector = obj(listOf(
            field("betaRoomSearch","items", mapOf("first" to i(25), "page" to reference("page"), "query" to reference("query"), "sort" to reference("sort")), notNull(obj(listOf(
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
val RoomSearchTextSelector = obj(listOf(
            field("betaDialogTextSearch","items", mapOf("query" to reference("query")), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("cid","id", notNull(scalar("ID"))),
                    field("fid","flexibleId", notNull(scalar("ID"))),
                    field("kind","kind", notNull(scalar("String"))),
                    field("photo","photo", notNull(scalar("String"))),
                    field("title","title", notNull(scalar("String")))
                ))))))
        ))
val RoomSuperSelector = obj(listOf(
            field("roomSuper","roomSuper", mapOf("id" to reference("id")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("featured","featured", notNull(scalar("Boolean"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("listed","listed", notNull(scalar("Boolean")))
                )))
        ))
val RoomTinySelector = obj(listOf(
            field("room","room", mapOf("id" to reference("id")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomShortSelector)
                )))
        ))
val RoomWithoutMembersSelector = obj(listOf(
            field("room","room", mapOf("id" to reference("id")), obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Room", RoomFullWithoutMembersSelector)
                )))
        ))
val SettingsSelector = obj(listOf(
            field("settings","settings", notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("Settings", SettingsFullSelector)
                ))))
        ))
val SuperAccountSelector = obj(listOf(
            field("superAccount","superAccount", mapOf("id" to reference("accountId"), "viaOrgId" to reference("viaOrgId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("alphaPublished","published", notNull(scalar("Boolean"))),
                    field("createdAt","createdAt", scalar("String")),
                    field("createdBy","createdBy", obj(listOf(
                            field("__typename","__typename", notNull(scalar("String"))),
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
val SuperAccountsSelector = obj(listOf(
            field("superAccounts","superAccounts", notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("orgId","orgId", notNull(scalar("ID"))),
                    field("state","state", notNull(scalar("String"))),
                    field("title","title", notNull(scalar("String")))
                ))))))
        ))
val SuperAdminsSelector = obj(listOf(
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
val UserSelector = obj(listOf(
            field("room","conversation", mapOf("id" to reference("userId")), obj(listOf(
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
            field("user","user", mapOf("id" to reference("userId")), notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    fragment("User", UserFullSelector)
                ))))
        ))
val UserStorageSelector = obj(listOf(
            field("userStorage","userStorage", mapOf("keys" to reference("keys"), "namespace" to reference("namespace")), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("id","id", notNull(scalar("ID"))),
                    field("key","key", notNull(scalar("String"))),
                    field("value","value", scalar("String"))
                ))))))
        ))
val UsersSelector = obj(listOf(
            field("users","items", mapOf("query" to reference("query")), notNull(list(notNull(obj(listOf(
                    field("__typename","__typename", notNull(scalar("String"))),
                    field("email","subtitle", scalar("String")),
                    field("id","id", notNull(scalar("ID"))),
                    field("name","title", notNull(scalar("String")))
                ))))))
        ))

object Operations {
    val Account = object: OperationDefinition {
        override val name = "Account"
        override val kind = OperationKind.QUERY
        override val body = "query Account{me:me{__typename ...UserShort}myPermissions{__typename roles}sessionState:sessionState{__typename ...SessionStateFull}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment SessionStateFull on SessionState{__typename isAccountActivated isAccountExists isAccountPicked isBlocked isCompleted isLoggedIn isProfileCreated}"
        override val selector = AccountSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeAccount(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val AccountAppInvite = object: OperationDefinition {
        override val name = "AccountAppInvite"
        override val kind = OperationKind.QUERY
        override val body = "query AccountAppInvite{invite:appInvite}"
        override val selector = AccountAppInviteSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeAccountAppInvite(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val AccountAppInviteInfo = object: OperationDefinition {
        override val name = "AccountAppInviteInfo"
        override val kind = OperationKind.QUERY
        override val body = "query AccountAppInviteInfo(\$inviteKey:String!){invite:alphaInviteInfo(key:\$inviteKey){__typename creator{__typename ...UserShort}}appInvite:appInviteInfo(key:\$inviteKey){__typename inviter{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = AccountAppInviteInfoSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeAccountAppInviteInfo(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val AccountInviteInfo = object: OperationDefinition {
        override val name = "AccountInviteInfo"
        override val kind = OperationKind.QUERY
        override val body = "query AccountInviteInfo(\$inviteKey:String!){invite:alphaInviteInfo(key:\$inviteKey){__typename creator{__typename ...UserShort}forEmail forName id joined key membersCount orgId organization{__typename about isCommunity:alphaIsCommunity}photo title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = AccountInviteInfoSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeAccountInviteInfo(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val AccountInvites = object: OperationDefinition {
        override val name = "AccountInvites"
        override val kind = OperationKind.QUERY
        override val body = "query AccountInvites{invites:alphaInvites{__typename id key}}"
        override val selector = AccountInvitesSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeAccountInvites(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val AccountInvitesHistory = object: OperationDefinition {
        override val name = "AccountInvitesHistory"
        override val kind = OperationKind.QUERY
        override val body = "query AccountInvitesHistory{invites:alphaInvitesHistory{__typename acceptedBy{__typename id name picture}forEmail isGlobal}}"
        override val selector = AccountInvitesHistorySelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeAccountInvitesHistory(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val AccountSettings = object: OperationDefinition {
        override val name = "AccountSettings"
        override val kind = OperationKind.QUERY
        override val body = "query AccountSettings{me:me{__typename ...UserShort}organizations:myOrganizations{__typename ...OrganizationShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = AccountSettingsSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeAccountSettings(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val AvailableRooms = object: OperationDefinition {
        override val name = "AvailableRooms"
        override val kind = OperationKind.QUERY
        override val body = "query AvailableRooms{rooms:betaAvailableRooms{__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}}"
        override val selector = AvailableRoomsSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeAvailableRooms(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ChatHistory = object: OperationDefinition {
        override val name = "ChatHistory"
        override val kind = OperationKind.QUERY
        override val body = "query ChatHistory(\$before:ID,\$chatId:ID!,\$first:Int!){state:conversationState(id:\$chatId){__typename state}messages(before:\$before,chatId:\$chatId,first:\$first){__typename ...FullMessage}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = ChatHistorySelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeChatHistory(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ChatInit = object: OperationDefinition {
        override val name = "ChatInit"
        override val kind = OperationKind.QUERY
        override val body = "query ChatInit(\$before:ID,\$chatId:ID!,\$first:Int!){state:conversationState(id:\$chatId){__typename state}messages(before:\$before,chatId:\$chatId,first:\$first){__typename ...FullMessage}room(id:\$chatId){__typename ...RoomShort}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}"
        override val selector = ChatInitSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeChatInit(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ChatSearchGroup = object: OperationDefinition {
        override val name = "ChatSearchGroup"
        override val kind = OperationKind.QUERY
        override val body = "query ChatSearchGroup(\$members:[ID!]!){group:alphaChatSearch(members:\$members){__typename flexibleId id}}"
        override val selector = ChatSearchGroupSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeChatSearchGroup(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val Conference = object: OperationDefinition {
        override val name = "Conference"
        override val kind = OperationKind.QUERY
        override val body = "query Conference(\$id:ID!){conference(id:\$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename iceServers{__typename credential urls username}id peers{__typename connection{__typename ice sdp state}id user{__typename ...UserShort}}startTime}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = ConferenceSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeConference(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ConferenceMedia = object: OperationDefinition {
        override val name = "ConferenceMedia"
        override val kind = OperationKind.QUERY
        override val body = "query ConferenceMedia(\$id:ID!,\$peerId:ID!){conferenceMedia(id:\$id,peerId:\$peerId){__typename iceServers{__typename credential urls username}id streams{__typename ice id sdp state}}}"
        override val selector = ConferenceMediaSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeConferenceMedia(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val Dialogs = object: OperationDefinition {
        override val name = "Dialogs"
        override val kind = OperationKind.QUERY
        override val body = "query Dialogs(\$after:String){counter:alphaNotificationCounter{__typename id unreadCount}dialogs(after:\$after,first:20){__typename cursor items{__typename topMessage:alphaTopMessage{__typename ...TinyMessage}cid fid haveMention isChannel isMuted kind photo title unreadCount}}state:dialogsState{__typename state}}fragment TinyMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserTiny}... on GeneralMessage{attachments{__typename fallback id ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat isImage}filePreview}}commentsCount quotedMessages{__typename id}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = DialogsSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeDialogs(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ExploreCommunity = object: OperationDefinition {
        override val name = "ExploreCommunity"
        override val kind = OperationKind.QUERY
        override val body = "query ExploreCommunity(\$page:Int,\$query:String,\$sort:String){items:alphaComunityPrefixSearch(first:25,page:\$page,query:\$query,sort:\$sort){__typename edges{__typename cursor node{__typename ...CommunitySearch}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment CommunitySearch on Organization{__typename about featured:alphaFeatured id isMine membersCount name photo status superAccountId}"
        override val selector = ExploreCommunitySelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeExploreCommunity(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ExploreOrganizations = object: OperationDefinition {
        override val name = "ExploreOrganizations"
        override val kind = OperationKind.QUERY
        override val body = "query ExploreOrganizations(\$after:String,\$all:Boolean,\$page:Int,\$prefix:String,\$query:String,\$sort:String){items:alphaOrganizations(after:\$after,all:\$all,first:25,page:\$page,prefix:\$prefix,query:\$query,sort:\$sort){__typename edges{__typename cursor node{__typename ...OrganizationSearch}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment OrganizationSearch on Organization{__typename about featured:alphaFeatured members:alphaOrganizationMembers{__typename user{__typename id name photo}}id isMine membersCount name photo status superAccountId}"
        override val selector = ExploreOrganizationsSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeExploreOrganizations(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ExplorePeople = object: OperationDefinition {
        override val name = "ExplorePeople"
        override val kind = OperationKind.QUERY
        override val body = "query ExplorePeople(\$after:String,\$page:Int,\$query:String,\$sort:String){items:userSearch(after:\$after,first:25,page:\$page,query:\$query,sort:\$sort){__typename edges{__typename cursor node{__typename isYou ...UserShort}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = ExplorePeopleSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeExplorePeople(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val FeatureFlags = object: OperationDefinition {
        override val name = "FeatureFlags"
        override val kind = OperationKind.QUERY
        override val body = "query FeatureFlags{featureFlags{__typename id key title}}"
        override val selector = FeatureFlagsSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeFeatureFlags(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val FeedHome = object: OperationDefinition {
        override val name = "FeedHome"
        override val kind = OperationKind.QUERY
        override val body = "query FeedHome{homeFeed:alphaHomeFeed{__typename by:alphaBy{__typename ...UserShort}date id text}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = FeedHomeSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeFeedHome(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val FetchPushSettings = object: OperationDefinition {
        override val name = "FetchPushSettings"
        override val kind = OperationKind.QUERY
        override val body = "query FetchPushSettings{pushSettings{__typename webPushKey}}"
        override val selector = FetchPushSettingsSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeFetchPushSettings(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val GetDraftMessage = object: OperationDefinition {
        override val name = "GetDraftMessage"
        override val kind = OperationKind.QUERY
        override val body = "query GetDraftMessage(\$conversationId:ID!){message:conversationDraft(conversationId:\$conversationId)}"
        override val selector = GetDraftMessageSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeGetDraftMessage(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val GlobalCounter = object: OperationDefinition {
        override val name = "GlobalCounter"
        override val kind = OperationKind.QUERY
        override val body = "query GlobalCounter{alphaNotificationCounter{__typename id unreadCount}}"
        override val selector = GlobalCounterSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeGlobalCounter(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val GlobalSearch = object: OperationDefinition {
        override val name = "GlobalSearch"
        override val kind = OperationKind.QUERY
        override val body = "query GlobalSearch(\$query:String!){items:alphaGlobalSearch(query:\$query){__typename ... on Organization{...OrganizationShort}... on User{...UserShort}... on SharedRoom{id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}}}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = GlobalSearchSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeGlobalSearch(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val Message = object: OperationDefinition {
        override val name = "Message"
        override val kind = OperationKind.QUERY
        override val body = "query Message(\$messageId:ID!){message(messageId:\$messageId){__typename ...FullMessage}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = MessageSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeMessage(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val MessageComments = object: OperationDefinition {
        override val name = "MessageComments"
        override val kind = OperationKind.QUERY
        override val body = "query MessageComments(\$messageId:ID!){messageComments(messageId:\$messageId){__typename comments{__typename ...CommentEntryFragment}count id state{__typename state}}}fragment CommentEntryFragment on CommentEntry{__typename childComments{__typename id}comment{__typename id ...FullMessage}deleted id parentComment{__typename id}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = MessageCommentsSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeMessageComments(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val MyApps = object: OperationDefinition {
        override val name = "MyApps"
        override val kind = OperationKind.QUERY
        override val body = "query MyApps{apps:myApps{__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}"
        override val selector = MyAppsSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeMyApps(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val MyOrganizations = object: OperationDefinition {
        override val name = "MyOrganizations"
        override val kind = OperationKind.QUERY
        override val body = "query MyOrganizations{myOrganizations{__typename isPrimary:betaIsPrimary ...OrganizationShort}}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = MyOrganizationsSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeMyOrganizations(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val Online = object: OperationDefinition {
        override val name = "Online"
        override val kind = OperationKind.QUERY
        override val body = "query Online(\$userId:ID!){user:user(id:\$userId){__typename id lastSeen online}}"
        override val selector = OnlineSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeOnline(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val Organization = object: OperationDefinition {
        override val name = "Organization"
        override val kind = OperationKind.QUERY
        override val body = "query Organization(\$organizationId:ID!){organization(id:\$organizationId){__typename ...OrganizationFull}}fragment OrganizationFull on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}members:alphaOrganizationMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = OrganizationSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeOrganization(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val OrganizationByPrefix = object: OperationDefinition {
        override val name = "OrganizationByPrefix"
        override val kind = OperationKind.QUERY
        override val body = "query OrganizationByPrefix(\$query:String!){organizationByPrefix:alphaOrganizationByPrefix(query:\$query){__typename ...OrganizationSearch}}fragment OrganizationSearch on Organization{__typename about featured:alphaFeatured members:alphaOrganizationMembers{__typename user{__typename id name photo}}id isMine membersCount name photo status superAccountId}"
        override val selector = OrganizationByPrefixSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeOrganizationByPrefix(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val OrganizationMembersShort = object: OperationDefinition {
        override val name = "OrganizationMembersShort"
        override val kind = OperationKind.QUERY
        override val body = "query OrganizationMembersShort(\$organizationId:ID!){organization(id:\$organizationId){__typename members:alphaOrganizationMembers{__typename user{__typename id}}...OrganizationWithoutMembersFragment}}fragment OrganizationWithoutMembersFragment on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = OrganizationMembersShortSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeOrganizationMembersShort(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val OrganizationMembersShortPaginated = object: OperationDefinition {
        override val name = "OrganizationMembersShortPaginated"
        override val kind = OperationKind.QUERY
        override val body = "query OrganizationMembersShortPaginated(\$after:ID,\$first:Int,\$organizationId:ID!){organization(id:\$organizationId){__typename members:alphaOrganizationMembers(after:\$after,first:\$first){__typename role user{__typename ...UserFull}}...OrganizationWithoutMembersFragment}}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationWithoutMembersFragment on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = OrganizationMembersShortPaginatedSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeOrganizationMembersShortPaginated(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val OrganizationProfile = object: OperationDefinition {
        override val name = "OrganizationProfile"
        override val kind = OperationKind.QUERY
        override val body = "query OrganizationProfile(\$organizationId:ID!){organizationProfile(id:\$organizationId){__typename ...OrganizationProfileFull}}fragment OrganizationProfileFull on OrganizationProfile{__typename about featured:alphaFeatured facebook id linkedin name photoRef{__typename crop{__typename h w x y}uuid}shortname twitter website websiteTitle}"
        override val selector = OrganizationProfileSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeOrganizationProfile(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val OrganizationPublicInvite = object: OperationDefinition {
        override val name = "OrganizationPublicInvite"
        override val kind = OperationKind.QUERY
        override val body = "query OrganizationPublicInvite(\$organizationId:ID){publicInvite:alphaOrganizationInviteLink(organizationId:\$organizationId){__typename id key ttl}}"
        override val selector = OrganizationPublicInviteSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeOrganizationPublicInvite(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val OrganizationWithoutMembers = object: OperationDefinition {
        override val name = "OrganizationWithoutMembers"
        override val kind = OperationKind.QUERY
        override val body = "query OrganizationWithoutMembers(\$organizationId:ID!){organization(id:\$organizationId){__typename ...OrganizationWithoutMembersFragment}}fragment OrganizationWithoutMembersFragment on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = OrganizationWithoutMembersSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeOrganizationWithoutMembers(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val Permissions = object: OperationDefinition {
        override val name = "Permissions"
        override val kind = OperationKind.QUERY
        override val body = "query Permissions{myPermissions{__typename roles}}"
        override val selector = PermissionsSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizePermissions(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val Profile = object: OperationDefinition {
        override val name = "Profile"
        override val kind = OperationKind.QUERY
        override val body = "query Profile{user:me{__typename id shortname}profile:myProfile{__typename about invitedBy:alphaInvitedBy{__typename name}joinedAt:alphaJoinedAt linkedin:alphaLinkedin role:alphaRole email firstName id lastName location phone photoRef{__typename crop{__typename h w x y}uuid}primaryOrganization{__typename id name}website}}"
        override val selector = ProfileSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeProfile(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ProfilePrefill = object: OperationDefinition {
        override val name = "ProfilePrefill"
        override val kind = OperationKind.QUERY
        override val body = "query ProfilePrefill{prefill:myProfilePrefill{__typename firstName lastName picture}}"
        override val selector = ProfilePrefillSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeProfilePrefill(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ResolveShortName = object: OperationDefinition {
        override val name = "ResolveShortName"
        override val kind = OperationKind.QUERY
        override val body = "query ResolveShortName(\$shortname:String!){item:alphaResolveShortName(shortname:\$shortname){__typename ... on User{...UserFull}... on Organization{...OrganizationFull}}}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationFull on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}members:alphaOrganizationMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = ResolveShortNameSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeResolveShortName(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ResolvedInvite = object: OperationDefinition {
        override val name = "ResolvedInvite"
        override val kind = OperationKind.QUERY
        override val body = "query ResolvedInvite(\$key:String!){invite:alphaResolveInvite(key:\$key){__typename ... on InviteInfo{creator{__typename ...UserShort}orgId title}... on AppInvite{inviter{__typename ...UserShort}}... on RoomInvite{invitedByUser{__typename ...UserShort}room{__typename ... on SharedRoom{description id isChannel kind membersCount membership photo socialImage title}}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = ResolvedInviteSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeResolvedInvite(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val Room = object: OperationDefinition {
        override val name = "Room"
        override val kind = OperationKind.QUERY
        override val body = "query Room(\$id:ID!){room(id:\$id){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoom(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomChat = object: OperationDefinition {
        override val name = "RoomChat"
        override val kind = OperationKind.QUERY
        override val body = "query RoomChat(\$id:ID!){room(id:\$id){__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{canEdit id isChannel kind membership photo pinnedMessage{__typename ...FullMessage}title}}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomChatSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomChat(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomHeader = object: OperationDefinition {
        override val name = "RoomHeader"
        override val kind = OperationKind.QUERY
        override val body = "query RoomHeader(\$id:ID!){room(id:\$id){__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo primaryOrganization{__typename id name}}}... on SharedRoom{canEdit description id isChannel kind membersCount organization{__typename isAdmin:betaIsAdmin isOwner:betaIsOwner id name}photo role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}}"
        override val selector = RoomHeaderSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomHeader(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomInviteInfo = object: OperationDefinition {
        override val name = "RoomInviteInfo"
        override val kind = OperationKind.QUERY
        override val body = "query RoomInviteInfo(\$invite:String!){invite:betaRoomInviteInfo(invite:\$invite){__typename id invitedByUser{__typename ...UserShort}room{__typename ... on SharedRoom{description id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo socialImage title}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = RoomInviteInfoSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomInviteInfo(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomInviteLink = object: OperationDefinition {
        override val name = "RoomInviteLink"
        override val kind = OperationKind.QUERY
        override val body = "query RoomInviteLink(\$roomId:ID!){link:betaRoomInviteLink(roomId:\$roomId)}"
        override val selector = RoomInviteLinkSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomInviteLink(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomMemberShort = object: OperationDefinition {
        override val name = "RoomMemberShort"
        override val kind = OperationKind.QUERY
        override val body = "query RoomMemberShort(\$memberId:ID!,\$roomId:ID!){member:roomMember(memberId:\$memberId,roomId:\$roomId){__typename user{__typename firstName id name}}}"
        override val selector = RoomMemberShortSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomMemberShort(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomMembers = object: OperationDefinition {
        override val name = "RoomMembers"
        override val kind = OperationKind.QUERY
        override val body = "query RoomMembers(\$roomId:ID!){members:roomMembers(roomId:\$roomId){__typename canKick membership role user{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = RoomMembersSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomMembers(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomMembersPaginated = object: OperationDefinition {
        override val name = "RoomMembersPaginated"
        override val kind = OperationKind.QUERY
        override val body = "query RoomMembersPaginated(\$after:ID,\$first:Int,\$roomId:ID!){members:roomMembers(after:\$after,first:\$first,roomId:\$roomId){__typename canKick membership role user{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = RoomMembersPaginatedSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomMembersPaginated(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomMembersShort = object: OperationDefinition {
        override val name = "RoomMembersShort"
        override val kind = OperationKind.QUERY
        override val body = "query RoomMembersShort(\$roomId:ID!){members:roomMembers(roomId:\$roomId){__typename user{__typename id}}}"
        override val selector = RoomMembersShortSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomMembersShort(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomSearch = object: OperationDefinition {
        override val name = "RoomSearch"
        override val kind = OperationKind.QUERY
        override val body = "query RoomSearch(\$page:Int,\$query:String,\$sort:String){items:betaRoomSearch(first:25,page:\$page,query:\$query,sort:\$sort){__typename edges{__typename cursor node{__typename ... on SharedRoom{id isChannel kind membersCount membership organization{__typename name photo}photo title}}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}"
        override val selector = RoomSearchSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomSearch(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomSearchText = object: OperationDefinition {
        override val name = "RoomSearchText"
        override val kind = OperationKind.QUERY
        override val body = "query RoomSearchText(\$query:String!){items:betaDialogTextSearch(query:\$query){__typename id:cid flexibleId:fid kind photo title}}"
        override val selector = RoomSearchTextSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomSearchText(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomSuper = object: OperationDefinition {
        override val name = "RoomSuper"
        override val kind = OperationKind.QUERY
        override val body = "query RoomSuper(\$id:ID!){roomSuper(id:\$id){__typename featured id listed}}"
        override val selector = RoomSuperSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomSuper(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomTiny = object: OperationDefinition {
        override val name = "RoomTiny"
        override val kind = OperationKind.QUERY
        override val body = "query RoomTiny(\$id:ID!){room(id:\$id){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomTinySelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomTiny(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomWithoutMembers = object: OperationDefinition {
        override val name = "RoomWithoutMembers"
        override val kind = OperationKind.QUERY
        override val body = "query RoomWithoutMembers(\$id:ID!){room(id:\$id){__typename ...RoomFullWithoutMembers}}fragment RoomFullWithoutMembers on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = RoomWithoutMembersSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomWithoutMembers(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val Settings = object: OperationDefinition {
        override val name = "Settings"
        override val kind = OperationKind.QUERY
        override val body = "query Settings{settings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename desktopNotifications emailFrequency id mobileAlert mobileIncludeText mobileNotifications primaryEmail}"
        override val selector = SettingsSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSettings(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SuperAccount = object: OperationDefinition {
        override val name = "SuperAccount"
        override val kind = OperationKind.QUERY
        override val body = "query SuperAccount(\$accountId:ID!,\$viaOrgId:Boolean){superAccount(id:\$accountId,viaOrgId:\$viaOrgId){__typename published:alphaPublished createdAt createdBy{__typename name}features{__typename id key title}id members{__typename ...UserShort}orgId state title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = SuperAccountSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSuperAccount(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SuperAccounts = object: OperationDefinition {
        override val name = "SuperAccounts"
        override val kind = OperationKind.QUERY
        override val body = "query SuperAccounts{superAccounts{__typename id orgId state title}}"
        override val selector = SuperAccountsSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSuperAccounts(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SuperAdmins = object: OperationDefinition {
        override val name = "SuperAdmins"
        override val kind = OperationKind.QUERY
        override val body = "query SuperAdmins{superAdmins{__typename email role user{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = SuperAdminsSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSuperAdmins(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val User = object: OperationDefinition {
        override val name = "User"
        override val kind = OperationKind.QUERY
        override val body = "query User(\$userId:ID!){conversation:room(id:\$userId){__typename ... on PrivateRoom{id settings{__typename id mute}}}user:user(id:\$userId){__typename ...UserFull}}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = UserSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeUser(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val UserStorage = object: OperationDefinition {
        override val name = "UserStorage"
        override val kind = OperationKind.QUERY
        override val body = "query UserStorage(\$keys:[String!]!,\$namespace:String!){userStorage(keys:\$keys,namespace:\$namespace){__typename id key value}}"
        override val selector = UserStorageSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeUserStorage(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val Users = object: OperationDefinition {
        override val name = "Users"
        override val kind = OperationKind.QUERY
        override val body = "query Users(\$query:String!){items:users(query:\$query){__typename subtitle:email id title:name}}"
        override val selector = UsersSelector
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeUsers(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val AccountCreateInvite = object: OperationDefinition {
        override val name = "AccountCreateInvite"
        override val kind = OperationKind.MUTATION
        override val body = "mutation AccountCreateInvite{alphaCreateInvite{__typename id key}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeAccountCreateInvite(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val AccountDestroyInvite = object: OperationDefinition {
        override val name = "AccountDestroyInvite"
        override val kind = OperationKind.MUTATION
        override val body = "mutation AccountDestroyInvite(\$id:ID!){alphaDeleteInvite(id:\$id)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeAccountDestroyInvite(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val AccountInviteJoin = object: OperationDefinition {
        override val name = "AccountInviteJoin"
        override val kind = OperationKind.MUTATION
        override val body = "mutation AccountInviteJoin(\$inviteKey:String!){alphaJoinInvite(key:\$inviteKey)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeAccountInviteJoin(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val AddAppToChat = object: OperationDefinition {
        override val name = "AddAppToChat"
        override val kind = OperationKind.MUTATION
        override val body = "mutation AddAppToChat(\$appId:ID!,\$chatId:ID!){addAppToChat(appId:\$appId,chatId:\$chatId){__typename ...AppChat}}fragment AppChat on AppChat{__typename chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}webhook}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeAddAppToChat(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val AddMessageComment = object: OperationDefinition {
        override val name = "AddMessageComment"
        override val kind = OperationKind.MUTATION
        override val body = "mutation AddMessageComment(\$fileAttachments:[FileAttachmentInput!],\$mentions:[MentionInput!],\$message:String,\$messageId:ID!,\$replyComment:ID){addMessageComment(fileAttachments:\$fileAttachments,mentions:\$mentions,message:\$message,messageId:\$messageId,replyComment:\$replyComment)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeAddMessageComment(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val BetaAddMessageComment = object: OperationDefinition {
        override val name = "BetaAddMessageComment"
        override val kind = OperationKind.MUTATION
        override val body = "mutation BetaAddMessageComment(\$fileAttachments:[FileAttachmentInput!],\$mentions:[MentionInput!],\$message:String,\$messageId:ID!,\$replyComment:ID){betaAddMessageComment(fileAttachments:\$fileAttachments,mentions:\$mentions,message:\$message,messageId:\$messageId,replyComment:\$replyComment){__typename id}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeBetaAddMessageComment(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val CancelTyping = object: OperationDefinition {
        override val name = "CancelTyping"
        override val kind = OperationKind.MUTATION
        override val body = "mutation CancelTyping(\$conversationId:ID!){typingCancel(conversationId:\$conversationId)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeCancelTyping(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val CommentSetReaction = object: OperationDefinition {
        override val name = "CommentSetReaction"
        override val kind = OperationKind.MUTATION
        override val body = "mutation CommentSetReaction(\$commentId:ID!,\$reaction:MessageReactionType!){commentReactionAdd(commentId:\$commentId,reaction:\$reaction)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeCommentSetReaction(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val CommentUnsetReaction = object: OperationDefinition {
        override val name = "CommentUnsetReaction"
        override val kind = OperationKind.MUTATION
        override val body = "mutation CommentUnsetReaction(\$commentId:ID!,\$reaction:MessageReactionType!){commentReactionRemove(commentId:\$commentId,reaction:\$reaction)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeCommentUnsetReaction(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ConferenceAnswer = object: OperationDefinition {
        override val name = "ConferenceAnswer"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ConferenceAnswer(\$answer:String!,\$id:ID!,\$ownPeerId:ID!,\$peerId:ID!){peerConnectionAnswer(answer:\$answer,id:\$id,ownPeerId:\$ownPeerId,peerId:\$peerId){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename iceServers{__typename credential urls username}id peers{__typename connection{__typename ice sdp state}id user{__typename ...UserShort}}startTime}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeConferenceAnswer(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ConferenceCandidate = object: OperationDefinition {
        override val name = "ConferenceCandidate"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ConferenceCandidate(\$candidate:String!,\$id:ID!,\$ownPeerId:ID!,\$peerId:ID!){peerConnectionCandidate(candidate:\$candidate,id:\$id,ownPeerId:\$ownPeerId,peerId:\$peerId){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename iceServers{__typename credential urls username}id peers{__typename connection{__typename ice sdp state}id user{__typename ...UserShort}}startTime}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeConferenceCandidate(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ConferenceJoin = object: OperationDefinition {
        override val name = "ConferenceJoin"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ConferenceJoin(\$id:ID!){conferenceJoin(id:\$id){__typename conference{__typename ...ConferenceFull}peerId}}fragment ConferenceFull on Conference{__typename iceServers{__typename credential urls username}id peers{__typename connection{__typename ice sdp state}id user{__typename ...UserShort}}startTime}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeConferenceJoin(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ConferenceKeepAlive = object: OperationDefinition {
        override val name = "ConferenceKeepAlive"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ConferenceKeepAlive(\$id:ID!,\$peerId:ID!){conferenceKeepAlive(id:\$id,peerId:\$peerId){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename iceServers{__typename credential urls username}id peers{__typename connection{__typename ice sdp state}id user{__typename ...UserShort}}startTime}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeConferenceKeepAlive(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ConferenceLeave = object: OperationDefinition {
        override val name = "ConferenceLeave"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ConferenceLeave(\$id:ID!,\$peerId:ID!){conferenceLeave(id:\$id,peerId:\$peerId){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename iceServers{__typename credential urls username}id peers{__typename connection{__typename ice sdp state}id user{__typename ...UserShort}}startTime}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeConferenceLeave(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ConferenceOffer = object: OperationDefinition {
        override val name = "ConferenceOffer"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ConferenceOffer(\$id:ID!,\$offer:String!,\$ownPeerId:ID!,\$peerId:ID!){peerConnectionOffer(id:\$id,offer:\$offer,ownPeerId:\$ownPeerId,peerId:\$peerId){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename iceServers{__typename credential urls username}id peers{__typename connection{__typename ice sdp state}id user{__typename ...UserShort}}startTime}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeConferenceOffer(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val CreateApp = object: OperationDefinition {
        override val name = "CreateApp"
        override val kind = OperationKind.MUTATION
        override val body = "mutation CreateApp(\$about:String,\$name:String!,\$photoRef:ImageRefInput,\$shortname:String){createApp(about:\$about,name:\$name,photoRef:\$photoRef,shortname:\$shortname){__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeCreateApp(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val CreateOrganization = object: OperationDefinition {
        override val name = "CreateOrganization"
        override val kind = OperationKind.MUTATION
        override val body = "mutation CreateOrganization(\$input:CreateOrganizationInput!){organization:createOrganization(input:\$input){__typename id name}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeCreateOrganization(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val CreateUserProfileAndOrganization = object: OperationDefinition {
        override val name = "CreateUserProfileAndOrganization"
        override val kind = OperationKind.MUTATION
        override val body = "mutation CreateUserProfileAndOrganization(\$organization:CreateOrganizationInput!,\$user:ProfileInput!){alphaCreateUserProfileAndOrganization(organization:\$organization,user:\$user){__typename organization{__typename id name}user{__typename ...UserFull}}}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeCreateUserProfileAndOrganization(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val DebugMails = object: OperationDefinition {
        override val name = "DebugMails"
        override val kind = OperationKind.MUTATION
        override val body = "mutation DebugMails(\$type:DebugEmailType!){debugSendEmail(type:\$type)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeDebugMails(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val DeleteComment = object: OperationDefinition {
        override val name = "DeleteComment"
        override val kind = OperationKind.MUTATION
        override val body = "mutation DeleteComment(\$id:ID!){deleteComment(id:\$id)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeDeleteComment(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val DeleteOrganization = object: OperationDefinition {
        override val name = "DeleteOrganization"
        override val kind = OperationKind.MUTATION
        override val body = "mutation DeleteOrganization(\$organizationId:ID!){deleteOrganization(id:\$organizationId)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeDeleteOrganization(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val DeleteUser = object: OperationDefinition {
        override val name = "DeleteUser"
        override val kind = OperationKind.MUTATION
        override val body = "mutation DeleteUser(\$id:ID!){superDeleteUser(id:\$id)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeDeleteUser(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val EditComment = object: OperationDefinition {
        override val name = "EditComment"
        override val kind = OperationKind.MUTATION
        override val body = "mutation EditComment(\$id:ID!,\$message:String){editComment(id:\$id,message:\$message)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeEditComment(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val EditPostMessage = object: OperationDefinition {
        override val name = "EditPostMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation EditPostMessage(\$attachments:[String!],\$messageId:ID!,\$postType:PostMessageType!,\$text:String!,\$title:String!){editPostMessage:alphaEditPostMessage(attachments:\$attachments,messageId:\$messageId,postType:\$postType,text:\$text,title:\$title){__typename seq}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeEditPostMessage(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val FeatureFlagAdd = object: OperationDefinition {
        override val name = "FeatureFlagAdd"
        override val kind = OperationKind.MUTATION
        override val body = "mutation FeatureFlagAdd(\$key:String!,\$title:String!){featureFlagAdd(key:\$key,title:\$title){__typename id key title}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeFeatureFlagAdd(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val FeatureFlagDisable = object: OperationDefinition {
        override val name = "FeatureFlagDisable"
        override val kind = OperationKind.MUTATION
        override val body = "mutation FeatureFlagDisable(\$accountId:ID!,\$featureId:ID!){superAccountFeatureRemove(featureId:\$featureId,id:\$accountId){__typename features{__typename id key title}id}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeFeatureFlagDisable(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val FeatureFlagEnable = object: OperationDefinition {
        override val name = "FeatureFlagEnable"
        override val kind = OperationKind.MUTATION
        override val body = "mutation FeatureFlagEnable(\$accountId:ID!,\$featureId:ID!){superAccountFeatureAdd(featureId:\$featureId,id:\$accountId){__typename features{__typename id key title}id}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeFeatureFlagEnable(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val FeedPost = object: OperationDefinition {
        override val name = "FeedPost"
        override val kind = OperationKind.MUTATION
        override val body = "mutation FeedPost(\$message:String!){alphaCreateFeedPost(message:\$message){__typename id}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeFeedPost(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val MarkSequenceRead = object: OperationDefinition {
        override val name = "MarkSequenceRead"
        override val kind = OperationKind.MUTATION
        override val body = "mutation MarkSequenceRead(\$seq:Int!){alphaGlobalRead(toSeq:\$seq)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeMarkSequenceRead(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val MediaAnswer = object: OperationDefinition {
        override val name = "MediaAnswer"
        override val kind = OperationKind.MUTATION
        override val body = "mutation MediaAnswer(\$answer:String!,\$id:ID!,\$peerId:ID!){mediaStreamAnswer(answer:\$answer,id:\$id,peerId:\$peerId){__typename id streams{__typename ice id sdp state}}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeMediaAnswer(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val MediaCandidate = object: OperationDefinition {
        override val name = "MediaCandidate"
        override val kind = OperationKind.MUTATION
        override val body = "mutation MediaCandidate(\$candidate:String!,\$id:ID!,\$peerId:ID!){mediaStreamCandidate(candidate:\$candidate,id:\$id,peerId:\$peerId){__typename id streams{__typename ice id sdp state}}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeMediaCandidate(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val MediaOffer = object: OperationDefinition {
        override val name = "MediaOffer"
        override val kind = OperationKind.MUTATION
        override val body = "mutation MediaOffer(\$id:ID!,\$offer:String!,\$peerId:ID!){mediaStreamOffer(id:\$id,offer:\$offer,peerId:\$peerId){__typename id streams{__typename ice id sdp state}}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeMediaOffer(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val MessageSetReaction = object: OperationDefinition {
        override val name = "MessageSetReaction"
        override val kind = OperationKind.MUTATION
        override val body = "mutation MessageSetReaction(\$messageId:ID!,\$reaction:String!){betaReactionSet(mid:\$messageId,reaction:\$reaction)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeMessageSetReaction(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val MessageUnsetReaction = object: OperationDefinition {
        override val name = "MessageUnsetReaction"
        override val kind = OperationKind.MUTATION
        override val body = "mutation MessageUnsetReaction(\$messageId:ID!,\$reaction:String!){betaReactionRemove(mid:\$messageId,reaction:\$reaction)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeMessageUnsetReaction(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val OrganizationActivateByInvite = object: OperationDefinition {
        override val name = "OrganizationActivateByInvite"
        override val kind = OperationKind.MUTATION
        override val body = "mutation OrganizationActivateByInvite(\$inviteKey:String!){joinAppInvite(key:\$inviteKey)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeOrganizationActivateByInvite(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val OrganizationAddMember = object: OperationDefinition {
        override val name = "OrganizationAddMember"
        override val kind = OperationKind.MUTATION
        override val body = "mutation OrganizationAddMember(\$organizationId:ID!,\$userIds:[ID!]){betaOrganizationMemberAdd(organizationId:\$organizationId,userIds:\$userIds){__typename ...OrganizationFull}}fragment OrganizationFull on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}members:alphaOrganizationMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeOrganizationAddMember(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val OrganizationAlterPublished = object: OperationDefinition {
        override val name = "OrganizationAlterPublished"
        override val kind = OperationKind.MUTATION
        override val body = "mutation OrganizationAlterPublished(\$organizationId:ID!,\$published:Boolean!){alphaAlterPublished(id:\$organizationId,published:\$published){__typename ...OrganizationSearch}}fragment OrganizationSearch on Organization{__typename about featured:alphaFeatured members:alphaOrganizationMembers{__typename user{__typename id name photo}}id isMine membersCount name photo status superAccountId}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeOrganizationAlterPublished(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val OrganizationChangeMemberRole = object: OperationDefinition {
        override val name = "OrganizationChangeMemberRole"
        override val kind = OperationKind.MUTATION
        override val body = "mutation OrganizationChangeMemberRole(\$memberId:ID!,\$newRole:OrganizationMemberRole!,\$organizationId:ID!){alphaOrganizationChangeMemberRole(memberId:\$memberId,newRole:\$newRole,organizationId:\$organizationId)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeOrganizationChangeMemberRole(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val OrganizationCreatePublicInvite = object: OperationDefinition {
        override val name = "OrganizationCreatePublicInvite"
        override val kind = OperationKind.MUTATION
        override val body = "mutation OrganizationCreatePublicInvite(\$expirationDays:Int,\$organizationId:ID){alphaOrganizationRefreshInviteLink(expirationDays:\$expirationDays,organizationId:\$organizationId){__typename id key ttl}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeOrganizationCreatePublicInvite(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val OrganizationInviteMembers = object: OperationDefinition {
        override val name = "OrganizationInviteMembers"
        override val kind = OperationKind.MUTATION
        override val body = "mutation OrganizationInviteMembers(\$inviteRequests:[InviteRequest!]!,\$organizationId:ID){alphaOrganizationInviteMembers(inviteRequests:\$inviteRequests,organizationId:\$organizationId)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeOrganizationInviteMembers(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val OrganizationMemberRemove = object: OperationDefinition {
        override val name = "OrganizationMemberRemove"
        override val kind = OperationKind.MUTATION
        override val body = "mutation OrganizationMemberRemove(\$organizationId:ID!,\$userId:ID!){betaOrganizationMemberRemove(organizationId:\$organizationId,userId:\$userId){__typename id}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeOrganizationMemberRemove(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val OrganizationRemoveMember = object: OperationDefinition {
        override val name = "OrganizationRemoveMember"
        override val kind = OperationKind.MUTATION
        override val body = "mutation OrganizationRemoveMember(\$memberId:ID!,\$organizationId:ID!){alphaOrganizationRemoveMember(memberId:\$memberId,organizationId:\$organizationId)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeOrganizationRemoveMember(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val PersistEvents = object: OperationDefinition {
        override val name = "PersistEvents"
        override val kind = OperationKind.MUTATION
        override val body = "mutation PersistEvents(\$did:String!,\$events:[Event!]!,\$isProd:Boolean,\$platform:EventPlatform){track(did:\$did,events:\$events,isProd:\$isProd,platform:\$platform)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizePersistEvents(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val PinMessage = object: OperationDefinition {
        override val name = "PinMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation PinMessage(\$chatId:ID!,\$messageId:ID!){pinMessage:betaPinMessage(chatId:\$chatId,messageId:\$messageId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizePinMessage(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ProfileCreate = object: OperationDefinition {
        override val name = "ProfileCreate"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ProfileCreate(\$input:CreateProfileInput!){createProfile(input:\$input){__typename about email firstName id lastName location phone photoRef{__typename crop{__typename h w x y}uuid}website}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeProfileCreate(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ProfileUpdate = object: OperationDefinition {
        override val name = "ProfileUpdate"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ProfileUpdate(\$input:UpdateProfileInput!,\$uid:ID){updateProfile(input:\$input,uid:\$uid){__typename about invitedBy:alphaInvitedBy{__typename name}joinedAt:alphaJoinedAt linkedin:alphaLinkedin primaryOrganizationId:alphaPrimaryOrganizationId role:alphaRole email firstName id lastName location phone photoRef{__typename crop{__typename h w x y}uuid}website}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeProfileUpdate(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RefreshAppToken = object: OperationDefinition {
        override val name = "RefreshAppToken"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RefreshAppToken(\$appId:ID!){refreshAppToken(appId:\$appId){__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRefreshAppToken(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RegisterPush = object: OperationDefinition {
        override val name = "RegisterPush"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RegisterPush(\$endpoint:String!,\$type:PushType!){registerPush(endpoint:\$endpoint,type:\$type)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRegisterPush(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RegisterWebPush = object: OperationDefinition {
        override val name = "RegisterWebPush"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RegisterWebPush(\$endpoint:String!){registerWebPush(endpoint:\$endpoint)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRegisterWebPush(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ReplyMessage = object: OperationDefinition {
        override val name = "ReplyMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ReplyMessage(\$mentions:[ID!],\$message:String,\$replyMessages:[ID!],\$roomId:ID!){replyMessage:betaMessageSend(mentions:\$mentions,message:\$message,replyMessages:\$replyMessages,room:\$roomId)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeReplyMessage(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ReportOnline = object: OperationDefinition {
        override val name = "ReportOnline"
        override val kind = OperationKind.MUTATION
        override val body = "mutation ReportOnline(\$active:Boolean,\$platform:String){presenceReportOnline(active:\$active,platform:\$platform,timeout:5000)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeReportOnline(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RespondPostMessage = object: OperationDefinition {
        override val name = "RespondPostMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RespondPostMessage(\$buttonId:ID!,\$messageId:ID!,\$reaction:String!){alphaRespondPostMessage(buttonId:\$buttonId,messageId:\$messageId)betaReactionSet(mid:\$messageId,reaction:\$reaction)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRespondPostMessage(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomAddMember = object: OperationDefinition {
        override val name = "RoomAddMember"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomAddMember(\$roomId:ID!,\$userId:ID!){betaRoomInvite(invites:[{userId:\$userId,role:MEMBER}],roomId:\$roomId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomAddMember(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomAddMembers = object: OperationDefinition {
        override val name = "RoomAddMembers"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomAddMembers(\$invites:[RoomInviteInput!]!,\$roomId:ID!){betaRoomInvite(invites:\$invites,roomId:\$roomId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomAddMembers(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomAlterFeatured = object: OperationDefinition {
        override val name = "RoomAlterFeatured"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomAlterFeatured(\$featured:Boolean!,\$roomId:ID!){betaRoomAlterFeatured(featured:\$featured,roomId:\$roomId){__typename featured id listed}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomAlterFeatured(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomAlterHidden = object: OperationDefinition {
        override val name = "RoomAlterHidden"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomAlterHidden(\$listed:Boolean!,\$roomId:ID!){betaRoomAlterListed(listed:\$listed,roomId:\$roomId){__typename featured id listed}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomAlterHidden(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomChangeRole = object: OperationDefinition {
        override val name = "RoomChangeRole"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomChangeRole(\$newRole:RoomMemberRole!,\$roomId:ID!,\$userId:ID!){betaRoomChangeRole(newRole:\$newRole,roomId:\$roomId,userId:\$userId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomChangeRole(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomCreate = object: OperationDefinition {
        override val name = "RoomCreate"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomCreate(\$channel:Boolean!,\$description:String,\$kind:SharedRoomKind!,\$members:[ID!]!,\$message:String,\$organizationId:ID,\$photoRef:ImageRefInput,\$title:String){room:betaRoomCreate(channel:\$channel,description:\$description,kind:\$kind,members:\$members,message:\$message,organizationId:\$organizationId,photoRef:\$photoRef,title:\$title){__typename id}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomCreate(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomCreateIntro = object: OperationDefinition {
        override val name = "RoomCreateIntro"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomCreateIntro(\$about:String,\$file:String,\$roomId:ID!,\$uid:ID!){intro:betaIntroSend(about:\$about,file:\$file,message:\$about,room:\$roomId,uid:\$uid)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomCreateIntro(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomDeclineJoinReuest = object: OperationDefinition {
        override val name = "RoomDeclineJoinReuest"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomDeclineJoinReuest(\$roomId:ID!,\$userId:ID!){betaRoomDeclineJoinRequest(roomId:\$roomId,userId:\$userId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomDeclineJoinReuest(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomDeleteMessage = object: OperationDefinition {
        override val name = "RoomDeleteMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomDeleteMessage(\$messageId:ID!){betaMessageDelete(mid:\$messageId)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomDeleteMessage(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomDeleteMessages = object: OperationDefinition {
        override val name = "RoomDeleteMessages"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomDeleteMessages(\$mids:[ID!]!){betaMessageDelete(mids:\$mids)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomDeleteMessages(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomDeleteUrlAugmentation = object: OperationDefinition {
        override val name = "RoomDeleteUrlAugmentation"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomDeleteUrlAugmentation(\$messageId:ID!){betaMessageDeleteAugmentation(mid:\$messageId)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomDeleteUrlAugmentation(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomEditIntro = object: OperationDefinition {
        override val name = "RoomEditIntro"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomEditIntro(\$about:String,\$file:String,\$messageId:ID!,\$uid:ID!){intro:betaIntroEdit(about:\$about,file:\$file,message:\$about,mid:\$messageId,uid:\$uid)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomEditIntro(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomEditMessage = object: OperationDefinition {
        override val name = "RoomEditMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomEditMessage(\$file:String,\$mentions:[ID!],\$message:String,\$messageId:ID!,\$replyMessages:[ID!]){betaMessageEdit(file:\$file,mentions:\$mentions,message:\$message,mid:\$messageId,replyMessages:\$replyMessages)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomEditMessage(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomJoin = object: OperationDefinition {
        override val name = "RoomJoin"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomJoin(\$roomId:ID!){join:betaRoomJoin(roomId:\$roomId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomJoin(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomJoinInviteLink = object: OperationDefinition {
        override val name = "RoomJoinInviteLink"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomJoinInviteLink(\$invite:String!){join:betaRoomInviteLinkJoin(invite:\$invite){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomJoinInviteLink(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomKick = object: OperationDefinition {
        override val name = "RoomKick"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomKick(\$roomId:ID!,\$userId:ID!){betaRoomKick(roomId:\$roomId,userId:\$userId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomKick(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomLeave = object: OperationDefinition {
        override val name = "RoomLeave"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomLeave(\$roomId:ID!){betaRoomLeave(roomId:\$roomId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description id isChannel kind members{__typename canKick membership role user{__typename ...UserShort}}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment OrganizationMedium on Organization{__typename isCommunity:alphaIsCommunity adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo}fragment UserFull on User{__typename about email firstName id isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomLeave(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomRead = object: OperationDefinition {
        override val name = "RoomRead"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomRead(\$id:ID!,\$mid:ID!){roomRead(id:\$id,mid:\$mid)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomRead(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomRenewInviteLink = object: OperationDefinition {
        override val name = "RoomRenewInviteLink"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomRenewInviteLink(\$roomId:ID!){link:betaRoomInviteLinkRenew(roomId:\$roomId)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomRenewInviteLink(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomSendEmailInvite = object: OperationDefinition {
        override val name = "RoomSendEmailInvite"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomSendEmailInvite(\$inviteRequests:[RoomInviteEmailRequest!]!,\$roomId:ID!){betaRoomInviteLinkSendEmail(inviteRequests:\$inviteRequests,roomId:\$roomId)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomSendEmailInvite(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomSettingsUpdate = object: OperationDefinition {
        override val name = "RoomSettingsUpdate"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomSettingsUpdate(\$roomId:ID!,\$settings:RoomUserNotificaionSettingsInput!){betaRoomUpdateUserNotificationSettings(roomId:\$roomId,settings:\$settings){__typename id mute}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomSettingsUpdate(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val RoomUpdate = object: OperationDefinition {
        override val name = "RoomUpdate"
        override val kind = OperationKind.MUTATION
        override val body = "mutation RoomUpdate(\$input:RoomUpdateInput!,\$roomId:ID!){betaRoomUpdate(input:\$input,roomId:\$roomId){__typename ... on PrivateRoom{id}... on SharedRoom{description id photo socialImage title}}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeRoomUpdate(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SaveDraftMessage = object: OperationDefinition {
        override val name = "SaveDraftMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SaveDraftMessage(\$conversationId:ID!,\$message:String!){conversationDraftUpdate(conversationId:\$conversationId,message:\$message)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSaveDraftMessage(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SendMessage = object: OperationDefinition {
        override val name = "SendMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SendMessage(\$file:String,\$mentions:[ID!],\$message:String,\$repeatKey:String,\$replyMessages:[ID!],\$room:ID!){sentMessage:betaMessageSend(file:\$file,mentions:\$mentions,message:\$message,repeatKey:\$repeatKey,replyMessages:\$replyMessages,room:\$room)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSendMessage(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SendPostMessage = object: OperationDefinition {
        override val name = "SendPostMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SendPostMessage(\$attachments:[String!],\$conversationId:ID!,\$postType:PostMessageType!,\$text:String!,\$title:String!){sendPostMessage:alphaSendPostMessage(attachments:\$attachments,conversationId:\$conversationId,postType:\$postType,text:\$text,title:\$title){__typename seq}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSendPostMessage(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SetOrgShortname = object: OperationDefinition {
        override val name = "SetOrgShortname"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SetOrgShortname(\$organizationId:ID!,\$shortname:String!){alphaSetOrgShortName(id:\$organizationId,shortname:\$shortname)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSetOrgShortname(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SetTyping = object: OperationDefinition {
        override val name = "SetTyping"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SetTyping(\$conversationId:ID!){typingSend(conversationId:\$conversationId,type:TEXT)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSetTyping(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SetUserShortname = object: OperationDefinition {
        override val name = "SetUserShortname"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SetUserShortname(\$shortname:String!){alphaSetUserShortName(shortname:\$shortname)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSetUserShortname(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SettingsUpdate = object: OperationDefinition {
        override val name = "SettingsUpdate"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SettingsUpdate(\$input:UpdateSettingsInput){updateSettings(settings:\$input){__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename desktopNotifications emailFrequency id mobileAlert mobileIncludeText mobileNotifications primaryEmail}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSettingsUpdate(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SuperAccountActivate = object: OperationDefinition {
        override val name = "SuperAccountActivate"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperAccountActivate(\$accountId:ID!){superAccountActivate(id:\$accountId){__typename id state}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSuperAccountActivate(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SuperAccountAdd = object: OperationDefinition {
        override val name = "SuperAccountAdd"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperAccountAdd(\$title:String!){superAccountAdd(title:\$title){__typename id}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSuperAccountAdd(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SuperAccountMemberAdd = object: OperationDefinition {
        override val name = "SuperAccountMemberAdd"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperAccountMemberAdd(\$accountId:ID!,\$userId:ID!){superAccountMemberAdd(id:\$accountId,userId:\$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSuperAccountMemberAdd(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SuperAccountMemberRemove = object: OperationDefinition {
        override val name = "SuperAccountMemberRemove"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperAccountMemberRemove(\$accountId:ID!,\$userId:ID!){superAccountMemberRemove(id:\$accountId,userId:\$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSuperAccountMemberRemove(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SuperAccountPend = object: OperationDefinition {
        override val name = "SuperAccountPend"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperAccountPend(\$accountId:ID!){superAccountPend(id:\$accountId){__typename id state}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSuperAccountPend(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SuperAccountRename = object: OperationDefinition {
        override val name = "SuperAccountRename"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperAccountRename(\$accountId:ID!,\$title:String!){superAccountRename(id:\$accountId,title:\$title){__typename id title}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSuperAccountRename(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SuperAccountSuspend = object: OperationDefinition {
        override val name = "SuperAccountSuspend"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperAccountSuspend(\$accountId:ID!){superAccountSuspend(id:\$accountId){__typename id state}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSuperAccountSuspend(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SuperAdminAdd = object: OperationDefinition {
        override val name = "SuperAdminAdd"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperAdminAdd(\$role:SuperAdminRole!,\$userId:ID!){superAdminAdd(role:\$role,userId:\$userId)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSuperAdminAdd(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SuperAdminRemove = object: OperationDefinition {
        override val name = "SuperAdminRemove"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SuperAdminRemove(\$userId:ID!){superAdminRemove(userId:\$userId)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSuperAdminRemove(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SwitchReaction = object: OperationDefinition {
        override val name = "SwitchReaction"
        override val kind = OperationKind.MUTATION
        override val body = "mutation SwitchReaction(\$from:String!,\$messageId:ID!,\$to:String!){betaReactionRemove(mid:\$messageId,reaction:\$from)betaReactionSet(mid:\$messageId,reaction:\$to)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSwitchReaction(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val UnpinMessage = object: OperationDefinition {
        override val name = "UnpinMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation UnpinMessage(\$chatId:ID!){unpinMessage:betaUnpinMessage(chatId:\$chatId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeUnpinMessage(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val UpdateApp = object: OperationDefinition {
        override val name = "UpdateApp"
        override val kind = OperationKind.MUTATION
        override val body = "mutation UpdateApp(\$appId:ID!,\$input:AppProfileInput!){updateAppProfile(appId:\$appId,input:\$input){__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeUpdateApp(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val UpdateOrganization = object: OperationDefinition {
        override val name = "UpdateOrganization"
        override val kind = OperationKind.MUTATION
        override val body = "mutation UpdateOrganization(\$input:UpdateOrganizationProfileInput!,\$organizationId:ID){updateOrganizationProfile(id:\$organizationId,input:\$input){__typename ...OrganizationProfileFull}}fragment OrganizationProfileFull on OrganizationProfile{__typename about featured:alphaFeatured facebook id linkedin name photoRef{__typename crop{__typename h w x y}uuid}shortname twitter website websiteTitle}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeUpdateOrganization(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val UpdateWelcomeMessage = object: OperationDefinition {
        override val name = "UpdateWelcomeMessage"
        override val kind = OperationKind.MUTATION
        override val body = "mutation UpdateWelcomeMessage(\$roomId:ID!,\$welcomeMessageIsOn:Boolean!,\$welcomeMessageSender:ID,\$welcomeMessageText:String){updateWelcomeMessage(roomId:\$roomId,welcomeMessageIsOn:\$welcomeMessageIsOn,welcomeMessageSender:\$welcomeMessageSender,welcomeMessageText:\$welcomeMessageText)}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeUpdateWelcomeMessage(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val UserStorageSet = object: OperationDefinition {
        override val name = "UserStorageSet"
        override val kind = OperationKind.MUTATION
        override val body = "mutation UserStorageSet(\$data:[AppStorageValueInput!]!,\$namespace:String!){userStorageSet(data:\$data,namespace:\$namespace){__typename id key value}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeUserStorageSet(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ChatOnlinesCountWatch = object: OperationDefinition {
        override val name = "ChatOnlinesCountWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription ChatOnlinesCountWatch(\$chatId:ID!){chatOnlinesCount(chatId:\$chatId){__typename onlineMembers}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeChatOnlinesCountWatch(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ChatWatch = object: OperationDefinition {
        override val name = "ChatWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription ChatWatch(\$chatId:ID!,\$state:String){event:chatUpdates(chatId:\$chatId,fromState:\$state){__typename ... on ChatUpdateSingle{seq state update{__typename ...ChatUpdateFragment}}... on ChatUpdateBatch{fromSeq seq state updates{__typename ...ChatUpdateFragment}}}}fragment ChatUpdateFragment on ChatUpdate{__typename ... on ChatMessageReceived{message{__typename ...FullMessage}repeatKey}... on ChatMessageUpdated{message{__typename ...FullMessage}}... on ChatMessageDeleted{message{__typename id}}... on ChatUpdated{chat{__typename ...RoomShort}}... on ChatLostAccess{lostAccess}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment RoomShort on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind membersCount membership organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeChatWatch(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val CommentWatch = object: OperationDefinition {
        override val name = "CommentWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription CommentWatch(\$fromState:String,\$peerId:ID!){event:commentUpdates(fromState:\$fromState,peerId:\$peerId){__typename ... on CommentUpdateSingle{seq state update{__typename ...CommentUpdateFragment}}... on CommentUpdateBatch{fromSeq seq state updates{__typename ...CommentUpdateFragment}}}}fragment CommentUpdateFragment on CommentUpdate{__typename ... on CommentReceived{comment{__typename ...CommentEntryFragment}}... on CommentUpdated{comment{__typename ...CommentEntryFragment}}}fragment CommentEntryFragment on CommentEntry{__typename childComments{__typename id}comment{__typename id ...FullMessage}deleted id parentComment{__typename id}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserTiny}}... on MessageSpanMultiUserMention{users{__typename ...UserTiny}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}... on MessageSpanBold{length offset}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}keyboard{__typename buttons{__typename style title url}}subTitle text title titleLink titleLinkHostname}}commentsCount edited quotedMessages{__typename date fallback id message message sender{__typename ...UserShort}spans{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserShort}}... on MessageSpanMultiUserMention{users{__typename ...UserShort}}... on MessageSpanRoomMention{room{__typename ... on PrivateRoom{id user{__typename id name}}... on SharedRoom{id title}}}... on MessageSpanLink{url}}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited}}reactions{__typename reaction user{__typename ...UserShort}}}... on ServiceMessage{serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeCommentWatch(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ConferenceMediaWatch = object: OperationDefinition {
        override val name = "ConferenceMediaWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription ConferenceMediaWatch(\$id:ID!,\$peerId:ID!){media:alphaConferenceMediaWatch(id:\$id,peerId:\$peerId){__typename id streams{__typename ice id sdp state}}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeConferenceMediaWatch(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val ConferenceWatch = object: OperationDefinition {
        override val name = "ConferenceWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription ConferenceWatch(\$id:ID!){alphaConferenceWatch(id:\$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename iceServers{__typename credential urls username}id peers{__typename connection{__typename ice sdp state}id user{__typename ...UserShort}}startTime}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeConferenceWatch(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val DialogsWatch = object: OperationDefinition {
        override val name = "DialogsWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription DialogsWatch(\$state:String){event:dialogsUpdates(fromState:\$state){__typename ... on DialogUpdateSingle{seq state update{__typename ...DialogUpdateFragment}}... on DialogUpdateBatch{fromSeq seq state updates{__typename ...DialogUpdateFragment}}}}fragment DialogUpdateFragment on DialogUpdate{__typename ... on DialogMessageReceived{message:alphaMessage{__typename ...TinyMessage}cid globalUnread unread}... on DialogMessageUpdated{message:alphaMessage{__typename ...TinyMessage}cid}... on DialogMessageDeleted{message:alphaMessage{__typename ...TinyMessage}prevMessage:alphaPrevMessage{__typename ...TinyMessage}cid globalUnread unread}... on DialogMessageRead{cid globalUnread unread}... on DialogMessageRead{cid globalUnread unread}... on DialogTitleUpdated{cid title}... on DialogMuteChanged{cid mute}... on DialogMentionedChanged{cid haveMention}... on DialogPhotoUpdated{cid photo}... on DialogDeleted{cid globalUnread}... on DialogBump{cid globalUnread topMessage{__typename ...TinyMessage}unread}}fragment TinyMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserTiny}... on GeneralMessage{attachments{__typename fallback id ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat isImage}filePreview}}commentsCount quotedMessages{__typename id}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename isCommunity:alphaIsCommunity id name photo}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeDialogsWatch(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val OnlineWatch = object: OperationDefinition {
        override val name = "OnlineWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription OnlineWatch(\$conversations:[ID!]!){alphaSubscribeChatOnline(conversations:\$conversations){__typename timeout type user:user{__typename id lastSeen online}}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeOnlineWatch(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val SettingsWatch = object: OperationDefinition {
        override val name = "SettingsWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription SettingsWatch{watchSettings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename desktopNotifications emailFrequency id mobileAlert mobileIncludeText mobileNotifications primaryEmail}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeSettingsWatch(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
    }
    val TypingsWatch = object: OperationDefinition {
        override val name = "TypingsWatch"
        override val kind = OperationKind.SUBSCRIPTION
        override val body = "subscription TypingsWatch{typings{__typename cancel conversation{__typename id}user{__typename id name photo}}}"
        override val selector = null
        override fun normalizeResponse(response: JsonObject): RecordSet {
            val collection = NormalizedCollection()
            normalizeTypingsWatch(Scope("ROOT_QUERY", collection, response))
            return collection.build()
        }
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
        if (name == "EditPostMessage") return EditPostMessage
        if (name == "FeatureFlagAdd") return FeatureFlagAdd
        if (name == "FeatureFlagDisable") return FeatureFlagDisable
        if (name == "FeatureFlagEnable") return FeatureFlagEnable
        if (name == "FeedPost") return FeedPost
        if (name == "MarkSequenceRead") return MarkSequenceRead
        if (name == "MediaAnswer") return MediaAnswer
        if (name == "MediaCandidate") return MediaCandidate
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
        if (name == "RoomEditMessage") return RoomEditMessage
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
        if (name == "DialogsWatch") return DialogsWatch
        if (name == "OnlineWatch") return OnlineWatch
        if (name == "SettingsWatch") return SettingsWatch
        if (name == "TypingsWatch") return TypingsWatch
        error("Unknown operation: \$name")
    }
}