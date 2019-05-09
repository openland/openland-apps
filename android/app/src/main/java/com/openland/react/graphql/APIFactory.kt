package com.openland.react.graphql

import com.facebook.react.bridge.ReadableMap
import com.apollographql.apollo.api.*
import com.openland.api.*
import com.openland.api.type.*
import com.openland.api.fragment.*

fun readNotificationMessages(src: ReadableMap, name: String): NotificationMessages? {
    val v = readString(src, name);
    if (v != null) {
        return NotificationMessages.safeValueOf(v)
    } else {
        return null
    }
}
fun readNotificationMessagesOptional(src: ReadableMap, name: String): Input<NotificationMessages> {
    val v = readOptionalString(src, name);
    if (v.defined) {
        if (v.value != null) {
          return Input.fromNullable(NotificationMessages.safeValueOf(v.value))
        } else {
          return Input.fromNullable(null)
        }
    } else {
        return Input.absent()
    }
}
fun readOrganizationMemberRole(src: ReadableMap, name: String): OrganizationMemberRole? {
    val v = readString(src, name);
    if (v != null) {
        return OrganizationMemberRole.safeValueOf(v)
    } else {
        return null
    }
}
fun readOrganizationMemberRoleOptional(src: ReadableMap, name: String): Input<OrganizationMemberRole> {
    val v = readOptionalString(src, name);
    if (v.defined) {
        if (v.value != null) {
          return Input.fromNullable(OrganizationMemberRole.safeValueOf(v.value))
        } else {
          return Input.fromNullable(null)
        }
    } else {
        return Input.absent()
    }
}
fun readSharedRoomKind(src: ReadableMap, name: String): SharedRoomKind? {
    val v = readString(src, name);
    if (v != null) {
        return SharedRoomKind.safeValueOf(v)
    } else {
        return null
    }
}
fun readSharedRoomKindOptional(src: ReadableMap, name: String): Input<SharedRoomKind> {
    val v = readOptionalString(src, name);
    if (v.defined) {
        if (v.value != null) {
          return Input.fromNullable(SharedRoomKind.safeValueOf(v.value))
        } else {
          return Input.fromNullable(null)
        }
    } else {
        return Input.absent()
    }
}
fun readRoomMemberRole(src: ReadableMap, name: String): RoomMemberRole? {
    val v = readString(src, name);
    if (v != null) {
        return RoomMemberRole.safeValueOf(v)
    } else {
        return null
    }
}
fun readRoomMemberRoleOptional(src: ReadableMap, name: String): Input<RoomMemberRole> {
    val v = readOptionalString(src, name);
    if (v.defined) {
        if (v.value != null) {
          return Input.fromNullable(RoomMemberRole.safeValueOf(v.value))
        } else {
          return Input.fromNullable(null)
        }
    } else {
        return Input.absent()
    }
}
fun readPostMessageType(src: ReadableMap, name: String): PostMessageType? {
    val v = readString(src, name);
    if (v != null) {
        return PostMessageType.safeValueOf(v)
    } else {
        return null
    }
}
fun readPostMessageTypeOptional(src: ReadableMap, name: String): Input<PostMessageType> {
    val v = readOptionalString(src, name);
    if (v.defined) {
        if (v.value != null) {
          return Input.fromNullable(PostMessageType.safeValueOf(v.value))
        } else {
          return Input.fromNullable(null)
        }
    } else {
        return Input.absent()
    }
}
fun readEmailFrequency(src: ReadableMap, name: String): EmailFrequency? {
    val v = readString(src, name);
    if (v != null) {
        return EmailFrequency.safeValueOf(v)
    } else {
        return null
    }
}
fun readEmailFrequencyOptional(src: ReadableMap, name: String): Input<EmailFrequency> {
    val v = readOptionalString(src, name);
    if (v.defined) {
        if (v.value != null) {
          return Input.fromNullable(EmailFrequency.safeValueOf(v.value))
        } else {
          return Input.fromNullable(null)
        }
    } else {
        return Input.absent()
    }
}
fun readNotificationsDelay(src: ReadableMap, name: String): NotificationsDelay? {
    val v = readString(src, name);
    if (v != null) {
        return NotificationsDelay.safeValueOf(v)
    } else {
        return null
    }
}
fun readNotificationsDelayOptional(src: ReadableMap, name: String): Input<NotificationsDelay> {
    val v = readOptionalString(src, name);
    if (v.defined) {
        if (v.value != null) {
          return Input.fromNullable(NotificationsDelay.safeValueOf(v.value))
        } else {
          return Input.fromNullable(null)
        }
    } else {
        return Input.absent()
    }
}
fun readSuperAdminRole(src: ReadableMap, name: String): SuperAdminRole? {
    val v = readString(src, name);
    if (v != null) {
        return SuperAdminRole.safeValueOf(v)
    } else {
        return null
    }
}
fun readSuperAdminRoleOptional(src: ReadableMap, name: String): Input<SuperAdminRole> {
    val v = readOptionalString(src, name);
    if (v.defined) {
        if (v.value != null) {
          return Input.fromNullable(SuperAdminRole.safeValueOf(v.value))
        } else {
          return Input.fromNullable(null)
        }
    } else {
        return Input.absent()
    }
}
fun readMessageReactionType(src: ReadableMap, name: String): MessageReactionType? {
    val v = readString(src, name);
    if (v != null) {
        return MessageReactionType.safeValueOf(v)
    } else {
        return null
    }
}
fun readMessageReactionTypeOptional(src: ReadableMap, name: String): Input<MessageReactionType> {
    val v = readOptionalString(src, name);
    if (v.defined) {
        if (v.value != null) {
          return Input.fromNullable(MessageReactionType.safeValueOf(v.value))
        } else {
          return Input.fromNullable(null)
        }
    } else {
        return Input.absent()
    }
}
fun readDebugEmailType(src: ReadableMap, name: String): DebugEmailType? {
    val v = readString(src, name);
    if (v != null) {
        return DebugEmailType.safeValueOf(v)
    } else {
        return null
    }
}
fun readDebugEmailTypeOptional(src: ReadableMap, name: String): Input<DebugEmailType> {
    val v = readOptionalString(src, name);
    if (v.defined) {
        if (v.value != null) {
          return Input.fromNullable(DebugEmailType.safeValueOf(v.value))
        } else {
          return Input.fromNullable(null)
        }
    } else {
        return Input.absent()
    }
}
fun readEventPlatform(src: ReadableMap, name: String): EventPlatform? {
    val v = readString(src, name);
    if (v != null) {
        return EventPlatform.safeValueOf(v)
    } else {
        return null
    }
}
fun readEventPlatformOptional(src: ReadableMap, name: String): Input<EventPlatform> {
    val v = readOptionalString(src, name);
    if (v.defined) {
        if (v.value != null) {
          return Input.fromNullable(EventPlatform.safeValueOf(v.value))
        } else {
          return Input.fromNullable(null)
        }
    } else {
        return Input.absent()
    }
}
fun readPushType(src: ReadableMap, name: String): PushType? {
    val v = readString(src, name);
    if (v != null) {
        return PushType.safeValueOf(v)
    } else {
        return null
    }
}
fun readPushTypeOptional(src: ReadableMap, name: String): Input<PushType> {
    val v = readOptionalString(src, name);
    if (v.defined) {
        if (v.value != null) {
          return Input.fromNullable(PushType.safeValueOf(v.value))
        } else {
          return Input.fromNullable(null)
        }
    } else {
        return Input.absent()
    }
}
fun parseImageRefInput(src: ReadableMap): ImageRefInput {
    val builder = ImageRefInput.builder()
    builder.uuid(notNull(readOptionalString(src, "uuid")))
    builder.cropInput(readImageCropInputOptional(src, "crop"))
    return builder.build()
}
fun readImageRefInput(src: ReadableMap, name: String): ImageRefInput? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            return parseImageRefInput(src.getMap(name)!!)
        }
    } else {
        return null
    }
}
fun readImageRefInputList(src: ReadableMap, name: String): List<ImageRefInput?>? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<ImageRefInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseImageRefInput(items.getMap(i)!!))
                }
            }
            return res
        }
    } else {
        return null
    }
}
fun readImageRefInputOptional(src: ReadableMap, name: String): Input<ImageRefInput> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            return Input.fromNullable(parseImageRefInput(src.getMap(name)!!))
        }
    } else {
        return Input.absent()
    }
}
fun readImageRefInputListOptional(src: ReadableMap, name: String): Input<List<ImageRefInput?>> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<ImageRefInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseImageRefInput(items.getMap(i)!!))
                }
            }
            return Input.fromNullable(res)
        }
    } else {
        return Input.absent()
    }
}
fun parseImageCropInput(src: ReadableMap): ImageCropInput {
    val builder = ImageCropInput.builder()
    builder.x(notNull(readOptionalInt(src, "x")))
    builder.y(notNull(readOptionalInt(src, "y")))
    builder.w(notNull(readOptionalInt(src, "w")))
    builder.h(notNull(readOptionalInt(src, "h")))
    return builder.build()
}
fun readImageCropInput(src: ReadableMap, name: String): ImageCropInput? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            return parseImageCropInput(src.getMap(name)!!)
        }
    } else {
        return null
    }
}
fun readImageCropInputList(src: ReadableMap, name: String): List<ImageCropInput?>? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<ImageCropInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseImageCropInput(items.getMap(i)!!))
                }
            }
            return res
        }
    } else {
        return null
    }
}
fun readImageCropInputOptional(src: ReadableMap, name: String): Input<ImageCropInput> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            return Input.fromNullable(parseImageCropInput(src.getMap(name)!!))
        }
    } else {
        return Input.absent()
    }
}
fun readImageCropInputListOptional(src: ReadableMap, name: String): Input<List<ImageCropInput?>> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<ImageCropInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseImageCropInput(items.getMap(i)!!))
                }
            }
            return Input.fromNullable(res)
        }
    } else {
        return Input.absent()
    }
}
fun parseProfileInput(src: ReadableMap): ProfileInput {
    val builder = ProfileInput.builder()
    builder.firstNameInput(readOptionalString(src, "firstName"))
    builder.lastNameInput(readOptionalString(src, "lastName"))
    builder.photoRefInput(readImageRefInputOptional(src, "photoRef"))
    builder.phoneInput(readOptionalString(src, "phone"))
    builder.emailInput(readOptionalString(src, "email"))
    builder.websiteInput(readOptionalString(src, "website"))
    builder.aboutInput(readOptionalString(src, "about"))
    builder.locationInput(readOptionalString(src, "location"))
    builder.linkedinInput(readOptionalString(src, "linkedin"))
    builder.twitterInput(readOptionalString(src, "twitter"))
    builder.primaryOrganizationInput(readOptionalString(src, "primaryOrganization"))
    return builder.build()
}
fun readProfileInput(src: ReadableMap, name: String): ProfileInput? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            return parseProfileInput(src.getMap(name)!!)
        }
    } else {
        return null
    }
}
fun readProfileInputList(src: ReadableMap, name: String): List<ProfileInput?>? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<ProfileInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseProfileInput(items.getMap(i)!!))
                }
            }
            return res
        }
    } else {
        return null
    }
}
fun readProfileInputOptional(src: ReadableMap, name: String): Input<ProfileInput> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            return Input.fromNullable(parseProfileInput(src.getMap(name)!!))
        }
    } else {
        return Input.absent()
    }
}
fun readProfileInputListOptional(src: ReadableMap, name: String): Input<List<ProfileInput?>> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<ProfileInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseProfileInput(items.getMap(i)!!))
                }
            }
            return Input.fromNullable(res)
        }
    } else {
        return Input.absent()
    }
}
fun parseCreateProfileInput(src: ReadableMap): CreateProfileInput {
    val builder = CreateProfileInput.builder()
    builder.firstName(notNull(readOptionalString(src, "firstName")))
    builder.lastNameInput(readOptionalString(src, "lastName"))
    builder.photoRefInput(readImageRefInputOptional(src, "photoRef"))
    builder.phoneInput(readOptionalString(src, "phone"))
    builder.emailInput(readOptionalString(src, "email"))
    builder.aboutInput(readOptionalString(src, "about"))
    builder.locationInput(readOptionalString(src, "location"))
    builder.websiteInput(readOptionalString(src, "website"))
    builder.linkedinInput(readOptionalString(src, "linkedin"))
    builder.twitterInput(readOptionalString(src, "twitter"))
    builder.primaryOrganizationInput(readOptionalString(src, "primaryOrganization"))
    return builder.build()
}
fun readCreateProfileInput(src: ReadableMap, name: String): CreateProfileInput? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            return parseCreateProfileInput(src.getMap(name)!!)
        }
    } else {
        return null
    }
}
fun readCreateProfileInputList(src: ReadableMap, name: String): List<CreateProfileInput?>? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<CreateProfileInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseCreateProfileInput(items.getMap(i)!!))
                }
            }
            return res
        }
    } else {
        return null
    }
}
fun readCreateProfileInputOptional(src: ReadableMap, name: String): Input<CreateProfileInput> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            return Input.fromNullable(parseCreateProfileInput(src.getMap(name)!!))
        }
    } else {
        return Input.absent()
    }
}
fun readCreateProfileInputListOptional(src: ReadableMap, name: String): Input<List<CreateProfileInput?>> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<CreateProfileInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseCreateProfileInput(items.getMap(i)!!))
                }
            }
            return Input.fromNullable(res)
        }
    } else {
        return Input.absent()
    }
}
fun parseUpdateProfileInput(src: ReadableMap): UpdateProfileInput {
    val builder = UpdateProfileInput.builder()
    builder.firstNameInput(readOptionalString(src, "firstName"))
    builder.lastNameInput(readOptionalString(src, "lastName"))
    builder.photoRefInput(readImageRefInputOptional(src, "photoRef"))
    builder.phoneInput(readOptionalString(src, "phone"))
    builder.emailInput(readOptionalString(src, "email"))
    builder.websiteInput(readOptionalString(src, "website"))
    builder.aboutInput(readOptionalString(src, "about"))
    builder.locationInput(readOptionalString(src, "location"))
    builder.linkedinInput(readOptionalString(src, "linkedin"))
    builder.twitterInput(readOptionalString(src, "twitter"))
    builder.primaryOrganizationInput(readOptionalString(src, "primaryOrganization"))
    builder.alphaRoleInput(readOptionalString(src, "alphaRole"))
    builder.alphaLocationsInput(notNullListItems(readOptionalStringList(src, "alphaLocations")))
    builder.alphaLinkedinInput(readOptionalString(src, "alphaLinkedin"))
    builder.alphaTwitterInput(readOptionalString(src, "alphaTwitter"))
    builder.alphaPrimaryOrganizationIdInput(readOptionalString(src, "alphaPrimaryOrganizationId"))
    return builder.build()
}
fun readUpdateProfileInput(src: ReadableMap, name: String): UpdateProfileInput? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            return parseUpdateProfileInput(src.getMap(name)!!)
        }
    } else {
        return null
    }
}
fun readUpdateProfileInputList(src: ReadableMap, name: String): List<UpdateProfileInput?>? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<UpdateProfileInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseUpdateProfileInput(items.getMap(i)!!))
                }
            }
            return res
        }
    } else {
        return null
    }
}
fun readUpdateProfileInputOptional(src: ReadableMap, name: String): Input<UpdateProfileInput> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            return Input.fromNullable(parseUpdateProfileInput(src.getMap(name)!!))
        }
    } else {
        return Input.absent()
    }
}
fun readUpdateProfileInputListOptional(src: ReadableMap, name: String): Input<List<UpdateProfileInput?>> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<UpdateProfileInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseUpdateProfileInput(items.getMap(i)!!))
                }
            }
            return Input.fromNullable(res)
        }
    } else {
        return Input.absent()
    }
}
fun parseCreateOrganizationInput(src: ReadableMap): CreateOrganizationInput {
    val builder = CreateOrganizationInput.builder()
    builder.idInput(readOptionalString(src, "id"))
    builder.name(notNull(readOptionalString(src, "name")))
    builder.websiteInput(readOptionalString(src, "website"))
    builder.personal(notNull(readOptionalBool(src, "personal")))
    builder.photoRefInput(readImageRefInputOptional(src, "photoRef"))
    builder.aboutInput(readOptionalString(src, "about"))
    builder.isCommunityInput(readOptionalBool(src, "isCommunity"))
    return builder.build()
}
fun readCreateOrganizationInput(src: ReadableMap, name: String): CreateOrganizationInput? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            return parseCreateOrganizationInput(src.getMap(name)!!)
        }
    } else {
        return null
    }
}
fun readCreateOrganizationInputList(src: ReadableMap, name: String): List<CreateOrganizationInput?>? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<CreateOrganizationInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseCreateOrganizationInput(items.getMap(i)!!))
                }
            }
            return res
        }
    } else {
        return null
    }
}
fun readCreateOrganizationInputOptional(src: ReadableMap, name: String): Input<CreateOrganizationInput> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            return Input.fromNullable(parseCreateOrganizationInput(src.getMap(name)!!))
        }
    } else {
        return Input.absent()
    }
}
fun readCreateOrganizationInputListOptional(src: ReadableMap, name: String): Input<List<CreateOrganizationInput?>> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<CreateOrganizationInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseCreateOrganizationInput(items.getMap(i)!!))
                }
            }
            return Input.fromNullable(res)
        }
    } else {
        return Input.absent()
    }
}
fun parseUpdateSettingsInput(src: ReadableMap): UpdateSettingsInput {
    val builder = UpdateSettingsInput.builder()
    builder.emailFrequencyInput(readEmailFrequencyOptional(src, "emailFrequency"))
    builder.desktopNotificationsInput(readNotificationMessagesOptional(src, "desktopNotifications"))
    builder.mobileNotificationsInput(readNotificationMessagesOptional(src, "mobileNotifications"))
    builder.mobileAlertInput(readOptionalBool(src, "mobileAlert"))
    builder.mobileIncludeTextInput(readOptionalBool(src, "mobileIncludeText"))
    builder.muteInput(readOptionalBool(src, "mute"))
    builder.notificationsDelayInput(readNotificationsDelayOptional(src, "notificationsDelay"))
    return builder.build()
}
fun readUpdateSettingsInput(src: ReadableMap, name: String): UpdateSettingsInput? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            return parseUpdateSettingsInput(src.getMap(name)!!)
        }
    } else {
        return null
    }
}
fun readUpdateSettingsInputList(src: ReadableMap, name: String): List<UpdateSettingsInput?>? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<UpdateSettingsInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseUpdateSettingsInput(items.getMap(i)!!))
                }
            }
            return res
        }
    } else {
        return null
    }
}
fun readUpdateSettingsInputOptional(src: ReadableMap, name: String): Input<UpdateSettingsInput> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            return Input.fromNullable(parseUpdateSettingsInput(src.getMap(name)!!))
        }
    } else {
        return Input.absent()
    }
}
fun readUpdateSettingsInputListOptional(src: ReadableMap, name: String): Input<List<UpdateSettingsInput?>> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<UpdateSettingsInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseUpdateSettingsInput(items.getMap(i)!!))
                }
            }
            return Input.fromNullable(res)
        }
    } else {
        return Input.absent()
    }
}
fun parseInviteRequest(src: ReadableMap): InviteRequest {
    val builder = InviteRequest.builder()
    builder.email(notNull(readOptionalString(src, "email")))
    builder.emailTextInput(readOptionalString(src, "emailText"))
    builder.role(notNull(readOrganizationMemberRoleOptional(src, "role")))
    builder.firstNameInput(readOptionalString(src, "firstName"))
    builder.lastNameInput(readOptionalString(src, "lastName"))
    return builder.build()
}
fun readInviteRequest(src: ReadableMap, name: String): InviteRequest? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            return parseInviteRequest(src.getMap(name)!!)
        }
    } else {
        return null
    }
}
fun readInviteRequestList(src: ReadableMap, name: String): List<InviteRequest?>? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<InviteRequest?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseInviteRequest(items.getMap(i)!!))
                }
            }
            return res
        }
    } else {
        return null
    }
}
fun readInviteRequestOptional(src: ReadableMap, name: String): Input<InviteRequest> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            return Input.fromNullable(parseInviteRequest(src.getMap(name)!!))
        }
    } else {
        return Input.absent()
    }
}
fun readInviteRequestListOptional(src: ReadableMap, name: String): Input<List<InviteRequest?>> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<InviteRequest?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseInviteRequest(items.getMap(i)!!))
                }
            }
            return Input.fromNullable(res)
        }
    } else {
        return Input.absent()
    }
}
fun parseEvent(src: ReadableMap): Event {
    val builder = Event.builder()
    builder.id(notNull(readOptionalString(src, "id")))
    builder.event(notNull(readOptionalString(src, "event")))
    builder.paramsInput(readOptionalString(src, "params"))
    builder.timeInput(readOptionalString(src, "time"))
    return builder.build()
}
fun readEvent(src: ReadableMap, name: String): Event? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            return parseEvent(src.getMap(name)!!)
        }
    } else {
        return null
    }
}
fun readEventList(src: ReadableMap, name: String): List<Event?>? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<Event?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseEvent(items.getMap(i)!!))
                }
            }
            return res
        }
    } else {
        return null
    }
}
fun readEventOptional(src: ReadableMap, name: String): Input<Event> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            return Input.fromNullable(parseEvent(src.getMap(name)!!))
        }
    } else {
        return Input.absent()
    }
}
fun readEventListOptional(src: ReadableMap, name: String): Input<List<Event?>> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<Event?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseEvent(items.getMap(i)!!))
                }
            }
            return Input.fromNullable(res)
        }
    } else {
        return Input.absent()
    }
}
fun parseMentionInput(src: ReadableMap): MentionInput {
    val builder = MentionInput.builder()
    builder.chatIdInput(readOptionalString(src, "chatId"))
    builder.userIdInput(readOptionalString(src, "userId"))
    builder.userIdsInput(notNullListItems(readOptionalStringList(src, "userIds")))
    builder.offset(notNull(readOptionalInt(src, "offset")))
    builder.length(notNull(readOptionalInt(src, "length")))
    return builder.build()
}
fun readMentionInput(src: ReadableMap, name: String): MentionInput? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            return parseMentionInput(src.getMap(name)!!)
        }
    } else {
        return null
    }
}
fun readMentionInputList(src: ReadableMap, name: String): List<MentionInput?>? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<MentionInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseMentionInput(items.getMap(i)!!))
                }
            }
            return res
        }
    } else {
        return null
    }
}
fun readMentionInputOptional(src: ReadableMap, name: String): Input<MentionInput> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            return Input.fromNullable(parseMentionInput(src.getMap(name)!!))
        }
    } else {
        return Input.absent()
    }
}
fun readMentionInputListOptional(src: ReadableMap, name: String): Input<List<MentionInput?>> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<MentionInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseMentionInput(items.getMap(i)!!))
                }
            }
            return Input.fromNullable(res)
        }
    } else {
        return Input.absent()
    }
}
fun parseFileAttachmentInput(src: ReadableMap): FileAttachmentInput {
    val builder = FileAttachmentInput.builder()
    builder.fileId(notNull(readOptionalString(src, "fileId")))
    return builder.build()
}
fun readFileAttachmentInput(src: ReadableMap, name: String): FileAttachmentInput? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            return parseFileAttachmentInput(src.getMap(name)!!)
        }
    } else {
        return null
    }
}
fun readFileAttachmentInputList(src: ReadableMap, name: String): List<FileAttachmentInput?>? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<FileAttachmentInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseFileAttachmentInput(items.getMap(i)!!))
                }
            }
            return res
        }
    } else {
        return null
    }
}
fun readFileAttachmentInputOptional(src: ReadableMap, name: String): Input<FileAttachmentInput> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            return Input.fromNullable(parseFileAttachmentInput(src.getMap(name)!!))
        }
    } else {
        return Input.absent()
    }
}
fun readFileAttachmentInputListOptional(src: ReadableMap, name: String): Input<List<FileAttachmentInput?>> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<FileAttachmentInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseFileAttachmentInput(items.getMap(i)!!))
                }
            }
            return Input.fromNullable(res)
        }
    } else {
        return Input.absent()
    }
}
fun parseAppProfileInput(src: ReadableMap): AppProfileInput {
    val builder = AppProfileInput.builder()
    builder.nameInput(readOptionalString(src, "name"))
    builder.shortnameInput(readOptionalString(src, "shortname"))
    builder.photoRefInput(readImageRefInputOptional(src, "photoRef"))
    builder.aboutInput(readOptionalString(src, "about"))
    return builder.build()
}
fun readAppProfileInput(src: ReadableMap, name: String): AppProfileInput? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            return parseAppProfileInput(src.getMap(name)!!)
        }
    } else {
        return null
    }
}
fun readAppProfileInputList(src: ReadableMap, name: String): List<AppProfileInput?>? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<AppProfileInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseAppProfileInput(items.getMap(i)!!))
                }
            }
            return res
        }
    } else {
        return null
    }
}
fun readAppProfileInputOptional(src: ReadableMap, name: String): Input<AppProfileInput> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            return Input.fromNullable(parseAppProfileInput(src.getMap(name)!!))
        }
    } else {
        return Input.absent()
    }
}
fun readAppProfileInputListOptional(src: ReadableMap, name: String): Input<List<AppProfileInput?>> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<AppProfileInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseAppProfileInput(items.getMap(i)!!))
                }
            }
            return Input.fromNullable(res)
        }
    } else {
        return Input.absent()
    }
}
fun parseAppStorageValueInput(src: ReadableMap): AppStorageValueInput {
    val builder = AppStorageValueInput.builder()
    builder.key(notNull(readOptionalString(src, "key")))
    builder.valueInput(readOptionalString(src, "value"))
    return builder.build()
}
fun readAppStorageValueInput(src: ReadableMap, name: String): AppStorageValueInput? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            return parseAppStorageValueInput(src.getMap(name)!!)
        }
    } else {
        return null
    }
}
fun readAppStorageValueInputList(src: ReadableMap, name: String): List<AppStorageValueInput?>? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<AppStorageValueInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseAppStorageValueInput(items.getMap(i)!!))
                }
            }
            return res
        }
    } else {
        return null
    }
}
fun readAppStorageValueInputOptional(src: ReadableMap, name: String): Input<AppStorageValueInput> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            return Input.fromNullable(parseAppStorageValueInput(src.getMap(name)!!))
        }
    } else {
        return Input.absent()
    }
}
fun readAppStorageValueInputListOptional(src: ReadableMap, name: String): Input<List<AppStorageValueInput?>> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<AppStorageValueInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseAppStorageValueInput(items.getMap(i)!!))
                }
            }
            return Input.fromNullable(res)
        }
    } else {
        return Input.absent()
    }
}
fun parseUpdateOrganizationProfileInput(src: ReadableMap): UpdateOrganizationProfileInput {
    val builder = UpdateOrganizationProfileInput.builder()
    builder.nameInput(readOptionalString(src, "name"))
    builder.photoRefInput(readImageRefInputOptional(src, "photoRef"))
    builder.websiteInput(readOptionalString(src, "website"))
    builder.websiteTitleInput(readOptionalString(src, "websiteTitle"))
    builder.aboutInput(readOptionalString(src, "about"))
    builder.twitterInput(readOptionalString(src, "twitter"))
    builder.facebookInput(readOptionalString(src, "facebook"))
    builder.linkedinInput(readOptionalString(src, "linkedin"))
    builder.locationInput(readOptionalString(src, "location"))
    builder.contactsInput(notNullListItems(readContactPersonInputListOptional(src, "contacts")))
    builder.alphaPublishedInput(readOptionalBool(src, "alphaPublished"))
    builder.alphaEditorialInput(readOptionalBool(src, "alphaEditorial"))
    builder.alphaFeaturedInput(readOptionalBool(src, "alphaFeatured"))
    return builder.build()
}
fun readUpdateOrganizationProfileInput(src: ReadableMap, name: String): UpdateOrganizationProfileInput? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            return parseUpdateOrganizationProfileInput(src.getMap(name)!!)
        }
    } else {
        return null
    }
}
fun readUpdateOrganizationProfileInputList(src: ReadableMap, name: String): List<UpdateOrganizationProfileInput?>? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<UpdateOrganizationProfileInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseUpdateOrganizationProfileInput(items.getMap(i)!!))
                }
            }
            return res
        }
    } else {
        return null
    }
}
fun readUpdateOrganizationProfileInputOptional(src: ReadableMap, name: String): Input<UpdateOrganizationProfileInput> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            return Input.fromNullable(parseUpdateOrganizationProfileInput(src.getMap(name)!!))
        }
    } else {
        return Input.absent()
    }
}
fun readUpdateOrganizationProfileInputListOptional(src: ReadableMap, name: String): Input<List<UpdateOrganizationProfileInput?>> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<UpdateOrganizationProfileInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseUpdateOrganizationProfileInput(items.getMap(i)!!))
                }
            }
            return Input.fromNullable(res)
        }
    } else {
        return Input.absent()
    }
}
fun parseContactPersonInput(src: ReadableMap): ContactPersonInput {
    val builder = ContactPersonInput.builder()
    builder.name(notNull(readOptionalString(src, "name")))
    builder.photoRefInput(readImageRefInputOptional(src, "photoRef"))
    builder.positionInput(readOptionalString(src, "position"))
    builder.emailInput(readOptionalString(src, "email"))
    builder.phoneInput(readOptionalString(src, "phone"))
    builder.linkInput(readOptionalString(src, "link"))
    builder.twitterInput(readOptionalString(src, "twitter"))
    return builder.build()
}
fun readContactPersonInput(src: ReadableMap, name: String): ContactPersonInput? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            return parseContactPersonInput(src.getMap(name)!!)
        }
    } else {
        return null
    }
}
fun readContactPersonInputList(src: ReadableMap, name: String): List<ContactPersonInput?>? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<ContactPersonInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseContactPersonInput(items.getMap(i)!!))
                }
            }
            return res
        }
    } else {
        return null
    }
}
fun readContactPersonInputOptional(src: ReadableMap, name: String): Input<ContactPersonInput> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            return Input.fromNullable(parseContactPersonInput(src.getMap(name)!!))
        }
    } else {
        return Input.absent()
    }
}
fun readContactPersonInputListOptional(src: ReadableMap, name: String): Input<List<ContactPersonInput?>> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<ContactPersonInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseContactPersonInput(items.getMap(i)!!))
                }
            }
            return Input.fromNullable(res)
        }
    } else {
        return Input.absent()
    }
}
fun parseRoomUpdateInput(src: ReadableMap): RoomUpdateInput {
    val builder = RoomUpdateInput.builder()
    builder.titleInput(readOptionalString(src, "title"))
    builder.photoRefInput(readImageRefInputOptional(src, "photoRef"))
    builder.descriptionInput(readOptionalString(src, "description"))
    builder.socialImageRefInput(readImageRefInputOptional(src, "socialImageRef"))
    builder.kindInput(readSharedRoomKindOptional(src, "kind"))
    return builder.build()
}
fun readRoomUpdateInput(src: ReadableMap, name: String): RoomUpdateInput? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            return parseRoomUpdateInput(src.getMap(name)!!)
        }
    } else {
        return null
    }
}
fun readRoomUpdateInputList(src: ReadableMap, name: String): List<RoomUpdateInput?>? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<RoomUpdateInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseRoomUpdateInput(items.getMap(i)!!))
                }
            }
            return res
        }
    } else {
        return null
    }
}
fun readRoomUpdateInputOptional(src: ReadableMap, name: String): Input<RoomUpdateInput> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            return Input.fromNullable(parseRoomUpdateInput(src.getMap(name)!!))
        }
    } else {
        return Input.absent()
    }
}
fun readRoomUpdateInputListOptional(src: ReadableMap, name: String): Input<List<RoomUpdateInput?>> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<RoomUpdateInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseRoomUpdateInput(items.getMap(i)!!))
                }
            }
            return Input.fromNullable(res)
        }
    } else {
        return Input.absent()
    }
}
fun parseRoomInviteInput(src: ReadableMap): RoomInviteInput {
    val builder = RoomInviteInput.builder()
    builder.userId(notNull(readOptionalString(src, "userId")))
    builder.role(notNull(readRoomMemberRoleOptional(src, "role")))
    return builder.build()
}
fun readRoomInviteInput(src: ReadableMap, name: String): RoomInviteInput? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            return parseRoomInviteInput(src.getMap(name)!!)
        }
    } else {
        return null
    }
}
fun readRoomInviteInputList(src: ReadableMap, name: String): List<RoomInviteInput?>? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<RoomInviteInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseRoomInviteInput(items.getMap(i)!!))
                }
            }
            return res
        }
    } else {
        return null
    }
}
fun readRoomInviteInputOptional(src: ReadableMap, name: String): Input<RoomInviteInput> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            return Input.fromNullable(parseRoomInviteInput(src.getMap(name)!!))
        }
    } else {
        return Input.absent()
    }
}
fun readRoomInviteInputListOptional(src: ReadableMap, name: String): Input<List<RoomInviteInput?>> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<RoomInviteInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseRoomInviteInput(items.getMap(i)!!))
                }
            }
            return Input.fromNullable(res)
        }
    } else {
        return Input.absent()
    }
}
fun parseRoomInviteEmailRequest(src: ReadableMap): RoomInviteEmailRequest {
    val builder = RoomInviteEmailRequest.builder()
    builder.email(notNull(readOptionalString(src, "email")))
    builder.emailTextInput(readOptionalString(src, "emailText"))
    builder.firstNameInput(readOptionalString(src, "firstName"))
    builder.lastNameInput(readOptionalString(src, "lastName"))
    return builder.build()
}
fun readRoomInviteEmailRequest(src: ReadableMap, name: String): RoomInviteEmailRequest? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            return parseRoomInviteEmailRequest(src.getMap(name)!!)
        }
    } else {
        return null
    }
}
fun readRoomInviteEmailRequestList(src: ReadableMap, name: String): List<RoomInviteEmailRequest?>? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<RoomInviteEmailRequest?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseRoomInviteEmailRequest(items.getMap(i)!!))
                }
            }
            return res
        }
    } else {
        return null
    }
}
fun readRoomInviteEmailRequestOptional(src: ReadableMap, name: String): Input<RoomInviteEmailRequest> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            return Input.fromNullable(parseRoomInviteEmailRequest(src.getMap(name)!!))
        }
    } else {
        return Input.absent()
    }
}
fun readRoomInviteEmailRequestListOptional(src: ReadableMap, name: String): Input<List<RoomInviteEmailRequest?>> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<RoomInviteEmailRequest?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseRoomInviteEmailRequest(items.getMap(i)!!))
                }
            }
            return Input.fromNullable(res)
        }
    } else {
        return Input.absent()
    }
}
fun parseRoomUserNotificaionSettingsInput(src: ReadableMap): RoomUserNotificaionSettingsInput {
    val builder = RoomUserNotificaionSettingsInput.builder()
    builder.muteInput(readOptionalBool(src, "mute"))
    return builder.build()
}
fun readRoomUserNotificaionSettingsInput(src: ReadableMap, name: String): RoomUserNotificaionSettingsInput? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            return parseRoomUserNotificaionSettingsInput(src.getMap(name)!!)
        }
    } else {
        return null
    }
}
fun readRoomUserNotificaionSettingsInputList(src: ReadableMap, name: String): List<RoomUserNotificaionSettingsInput?>? {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return null
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<RoomUserNotificaionSettingsInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseRoomUserNotificaionSettingsInput(items.getMap(i)!!))
                }
            }
            return res
        }
    } else {
        return null
    }
}
fun readRoomUserNotificaionSettingsInputOptional(src: ReadableMap, name: String): Input<RoomUserNotificaionSettingsInput> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            return Input.fromNullable(parseRoomUserNotificaionSettingsInput(src.getMap(name)!!))
        }
    } else {
        return Input.absent()
    }
}
fun readRoomUserNotificaionSettingsInputListOptional(src: ReadableMap, name: String): Input<List<RoomUserNotificaionSettingsInput?>> {
    if (src.hasKey(name)) {
        if (src.isNull(name)) {
            return Input.fromNullable(null)
        } else {
            val items = src.getArray(name)!!
            val res = mutableListOf<RoomUserNotificaionSettingsInput?>()
            for(i in 0 until items.size()) {
                if (items.isNull(i)) {
                    res.add(null)
                } else {
                    res.add(parseRoomUserNotificaionSettingsInput(items.getMap(i)!!))
                }
            }
            return Input.fromNullable(res)
        }
    } else {
        return Input.absent()
    }
}
fun readQuery(name: String, src: ReadableMap): Query<Operation.Data, Operation.Data, Operation.Variables> {
    if (name == "Account") {
       val builder = AccountQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "AccountSettings") {
       val builder = AccountSettingsQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "AccountInviteInfo") {
       val builder = AccountInviteInfoQuery.builder()
       builder.inviteKey(notNull(readString(src, "inviteKey")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "AccountAppInviteInfo") {
       val builder = AccountAppInviteInfoQuery.builder()
       builder.inviteKey(notNull(readString(src, "inviteKey")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "AccountAppInvite") {
       val builder = AccountAppInviteQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "AccountInvites") {
       val builder = AccountInvitesQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "AccountInvitesHistory") {
       val builder = AccountInvitesHistoryQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ProfilePrefill") {
       val builder = ProfilePrefillQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "FetchPushSettings") {
       val builder = FetchPushSettingsQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "MyApps") {
       val builder = MyAppsQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "UserStorage") {
       val builder = UserStorageQuery.builder()
       builder.namespace(notNull(readString(src, "namespace")))
       builder.keys(notNull(notNullListItems(readStringList(src, "keys"))))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "Dialogs") {
       val builder = DialogsQuery.builder()
       builder.after(readString(src, "after"))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "Room") {
       val builder = RoomQuery.builder()
       builder.id(notNull(readString(src, "id")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomChat") {
       val builder = RoomChatQuery.builder()
       builder.id(notNull(readString(src, "id")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomHeader") {
       val builder = RoomHeaderQuery.builder()
       builder.id(notNull(readString(src, "id")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomWithoutMembers") {
       val builder = RoomWithoutMembersQuery.builder()
       builder.id(notNull(readString(src, "id")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomTiny") {
       val builder = RoomTinyQuery.builder()
       builder.id(notNull(readString(src, "id")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomSuper") {
       val builder = RoomSuperQuery.builder()
       builder.id(notNull(readString(src, "id")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "GetDraftMessage") {
       val builder = GetDraftMessageQuery.builder()
       builder.conversationId(notNull(readString(src, "conversationId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "GlobalCounter") {
       val builder = GlobalCounterQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ChatHistory") {
       val builder = ChatHistoryQuery.builder()
       builder.chatId(notNull(readString(src, "chatId")))
       builder.before(readString(src, "before"))
       builder.first(notNull(readInt(src, "first")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ChatInit") {
       val builder = ChatInitQuery.builder()
       builder.chatId(notNull(readString(src, "chatId")))
       builder.before(readString(src, "before"))
       builder.first(notNull(readInt(src, "first")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ChatSearchGroup") {
       val builder = ChatSearchGroupQuery.builder()
       builder.members(notNull(notNullListItems(readStringList(src, "members"))))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomSearchText") {
       val builder = RoomSearchTextQuery.builder()
       builder.query(notNull(readString(src, "query")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomSearch") {
       val builder = RoomSearchQuery.builder()
       builder.query(readString(src, "query"))
       builder.sort(readString(src, "sort"))
       builder.page(readInt(src, "page"))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomMembersShort") {
       val builder = RoomMembersShortQuery.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomMemberShort") {
       val builder = RoomMemberShortQuery.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       builder.memberId(notNull(readString(src, "memberId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomMembers") {
       val builder = RoomMembersQuery.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomMembersPaginated") {
       val builder = RoomMembersPaginatedQuery.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       builder.first(readInt(src, "first"))
       builder.after(readString(src, "after"))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomInviteLink") {
       val builder = RoomInviteLinkQuery.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomInviteInfo") {
       val builder = RoomInviteInfoQuery.builder()
       builder.invite(notNull(readString(src, "invite")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ResolvedInvite") {
       val builder = ResolvedInviteQuery.builder()
       builder.key(notNull(readString(src, "key")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "MessageComments") {
       val builder = MessageCommentsQuery.builder()
       builder.messageId(notNull(readString(src, "messageId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "Message") {
       val builder = MessageQuery.builder()
       builder.messageId(notNull(readString(src, "messageId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "Conference") {
       val builder = ConferenceQuery.builder()
       builder.id(notNull(readString(src, "id")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ConferenceMedia") {
       val builder = ConferenceMediaQuery.builder()
       builder.id(notNull(readString(src, "id")))
       builder.peerId(notNull(readString(src, "peerId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "AvailableRooms") {
       val builder = AvailableRoomsQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "GlobalSearch") {
       val builder = GlobalSearchQuery.builder()
       builder.query(notNull(readString(src, "query")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "FeatureFlags") {
       val builder = FeatureFlagsQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "FeedHome") {
       val builder = FeedHomeQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "MyOrganizations") {
       val builder = MyOrganizationsQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "Organization") {
       val builder = OrganizationQuery.builder()
       builder.organizationId(notNull(readString(src, "organizationId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "OrganizationWithoutMembers") {
       val builder = OrganizationWithoutMembersQuery.builder()
       builder.organizationId(notNull(readString(src, "organizationId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "OrganizationMembersShort") {
       val builder = OrganizationMembersShortQuery.builder()
       builder.organizationId(notNull(readString(src, "organizationId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "OrganizationMembersShortPaginated") {
       val builder = OrganizationMembersShortPaginatedQuery.builder()
       builder.organizationId(notNull(readString(src, "organizationId")))
       builder.first(readInt(src, "first"))
       builder.after(readString(src, "after"))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "OrganizationProfile") {
       val builder = OrganizationProfileQuery.builder()
       builder.organizationId(notNull(readString(src, "organizationId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ExploreOrganizations") {
       val builder = ExploreOrganizationsQuery.builder()
       builder.query(readString(src, "query"))
       builder.prefix(readString(src, "prefix"))
       builder.sort(readString(src, "sort"))
       builder.page(readInt(src, "page"))
       builder.after(readString(src, "after"))
       builder.all(readBool(src, "all"))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ExploreCommunity") {
       val builder = ExploreCommunityQuery.builder()
       builder.query(readString(src, "query"))
       builder.sort(readString(src, "sort"))
       builder.page(readInt(src, "page"))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "OrganizationPublicInvite") {
       val builder = OrganizationPublicInviteQuery.builder()
       builder.organizationId(readString(src, "organizationId"))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "OrganizationByPrefix") {
       val builder = OrganizationByPrefixQuery.builder()
       builder.query(notNull(readString(src, "query")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "Permissions") {
       val builder = PermissionsQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SuperAdmins") {
       val builder = SuperAdminsQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SuperAccounts") {
       val builder = SuperAccountsQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SuperAccount") {
       val builder = SuperAccountQuery.builder()
       builder.accountId(notNull(readString(src, "accountId")))
       builder.viaOrgId(readBool(src, "viaOrgId"))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "Profile") {
       val builder = ProfileQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "Settings") {
       val builder = SettingsQuery.builder()
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "Users") {
       val builder = UsersQuery.builder()
       builder.query(notNull(readString(src, "query")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "User") {
       val builder = UserQuery.builder()
       builder.userId(notNull(readString(src, "userId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "Online") {
       val builder = OnlineQuery.builder()
       builder.userId(notNull(readString(src, "userId")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ExplorePeople") {
       val builder = ExplorePeopleQuery.builder()
       builder.query(readString(src, "query"))
       builder.sort(readString(src, "sort"))
       builder.page(readInt(src, "page"))
       builder.after(readString(src, "after"))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ResolveShortName") {
       val builder = ResolveShortNameQuery.builder()
       builder.shortname(notNull(readString(src, "shortname")))
       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>
    }
    throw Error("Unknown query: $name")
}
fun readSubscription(name: String, src: ReadableMap): Subscription<Operation.Data, Operation.Data, Operation.Variables> {
    if (name == "SettingsWatch") {
       val builder = SettingsWatchSubscription.builder()
       return builder.build() as Subscription<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "CommentWatch") {
       val builder = CommentWatchSubscription.builder()
       builder.peerId(notNull(readString(src, "peerId")))
       builder.fromState(readString(src, "fromState"))
       return builder.build() as Subscription<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ChatWatch") {
       val builder = ChatWatchSubscription.builder()
       builder.chatId(notNull(readString(src, "chatId")))
       builder.state(readString(src, "state"))
       return builder.build() as Subscription<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "DialogsWatch") {
       val builder = DialogsWatchSubscription.builder()
       builder.state(readString(src, "state"))
       return builder.build() as Subscription<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "TypingsWatch") {
       val builder = TypingsWatchSubscription.builder()
       return builder.build() as Subscription<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ChatOnlinesCountWatch") {
       val builder = ChatOnlinesCountWatchSubscription.builder()
       builder.chatId(notNull(readString(src, "chatId")))
       return builder.build() as Subscription<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ConferenceMediaWatch") {
       val builder = ConferenceMediaWatchSubscription.builder()
       builder.id(notNull(readString(src, "id")))
       builder.peerId(notNull(readString(src, "peerId")))
       return builder.build() as Subscription<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ConferenceWatch") {
       val builder = ConferenceWatchSubscription.builder()
       builder.id(notNull(readString(src, "id")))
       return builder.build() as Subscription<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "DebugEventsWatch") {
       val builder = DebugEventsWatchSubscription.builder()
       builder.fromState(readString(src, "fromState"))
       builder.eventsCount(notNull(readInt(src, "eventsCount")))
       builder.randomDelays(notNull(readBool(src, "randomDelays")))
       builder.seed(notNull(readString(src, "seed")))
       return builder.build() as Subscription<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "OnlineWatch") {
       val builder = OnlineWatchSubscription.builder()
       builder.conversations(notNull(notNullListItems(readStringList(src, "conversations"))))
       return builder.build() as Subscription<Operation.Data, Operation.Data, Operation.Variables>
    }
    throw Error("Unknown subscription: $name")
}
fun readMutation(name: String, src: ReadableMap): Mutation<Operation.Data, Operation.Data, Operation.Variables> {
    if (name == "CreateOrganization") {
       val builder = CreateOrganizationMutation.builder()
       builder.input(notNull(readCreateOrganizationInput(src, "input")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "AccountInviteJoin") {
       val builder = AccountInviteJoinMutation.builder()
       builder.inviteKey(notNull(readString(src, "inviteKey")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "AccountCreateInvite") {
       val builder = AccountCreateInviteMutation.builder()
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "AccountDestroyInvite") {
       val builder = AccountDestroyInviteMutation.builder()
       builder.id(notNull(readString(src, "id")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "CreateUserProfileAndOrganization") {
       val builder = CreateUserProfileAndOrganizationMutation.builder()
       builder.user(notNull(readProfileInput(src, "user")))
       builder.organization(notNull(readCreateOrganizationInput(src, "organization")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ReportOnline") {
       val builder = ReportOnlineMutation.builder()
       builder.active(readBool(src, "active"))
       builder.platform(readString(src, "platform"))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RegisterPush") {
       val builder = RegisterPushMutation.builder()
       builder.endpoint(notNull(readString(src, "endpoint")))
       builder.type(notNull(readPushType(src, "type")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RegisterWebPush") {
       val builder = RegisterWebPushMutation.builder()
       builder.endpoint(notNull(readString(src, "endpoint")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "CreateApp") {
       val builder = CreateAppMutation.builder()
       builder.name(notNull(readString(src, "name")))
       builder.shortname(readString(src, "shortname"))
       builder.photoRef(readImageRefInput(src, "photoRef"))
       builder.about(readString(src, "about"))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "UpdateApp") {
       val builder = UpdateAppMutation.builder()
       builder.appId(notNull(readString(src, "appId")))
       builder.input(notNull(readAppProfileInput(src, "input")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RefreshAppToken") {
       val builder = RefreshAppTokenMutation.builder()
       builder.appId(notNull(readString(src, "appId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "AddAppToChat") {
       val builder = AddAppToChatMutation.builder()
       builder.appId(notNull(readString(src, "appId")))
       builder.chatId(notNull(readString(src, "chatId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "UserStorageSet") {
       val builder = UserStorageSetMutation.builder()
       builder.namespace(notNull(readString(src, "namespace")))
       builder.data(notNull(notNullListItems(readAppStorageValueInputList(src, "data"))))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "PinMessage") {
       val builder = PinMessageMutation.builder()
       builder.chatId(notNull(readString(src, "chatId")))
       builder.messageId(notNull(readString(src, "messageId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "UnpinMessage") {
       val builder = UnpinMessageMutation.builder()
       builder.chatId(notNull(readString(src, "chatId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "MessageSetReaction") {
       val builder = MessageSetReactionMutation.builder()
       builder.messageId(notNull(readString(src, "messageId")))
       builder.reaction(notNull(readString(src, "reaction")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SwitchReaction") {
       val builder = SwitchReactionMutation.builder()
       builder.messageId(notNull(readString(src, "messageId")))
       builder.from(notNull(readString(src, "from")))
       builder.to(notNull(readString(src, "to")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "MessageUnsetReaction") {
       val builder = MessageUnsetReactionMutation.builder()
       builder.messageId(notNull(readString(src, "messageId")))
       builder.reaction(notNull(readString(src, "reaction")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SendPostMessage") {
       val builder = SendPostMessageMutation.builder()
       builder.conversationId(notNull(readString(src, "conversationId")))
       builder.title(notNull(readString(src, "title")))
       builder.text(notNull(readString(src, "text")))
       builder.attachments(notNullListItems(readStringList(src, "attachments")))
       builder.postType(notNull(readPostMessageType(src, "postType")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "EditPostMessage") {
       val builder = EditPostMessageMutation.builder()
       builder.messageId(notNull(readString(src, "messageId")))
       builder.title(notNull(readString(src, "title")))
       builder.text(notNull(readString(src, "text")))
       builder.attachments(notNullListItems(readStringList(src, "attachments")))
       builder.postType(notNull(readPostMessageType(src, "postType")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RespondPostMessage") {
       val builder = RespondPostMessageMutation.builder()
       builder.messageId(notNull(readString(src, "messageId")))
       builder.buttonId(notNull(readString(src, "buttonId")))
       builder.reaction(notNull(readString(src, "reaction")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SaveDraftMessage") {
       val builder = SaveDraftMessageMutation.builder()
       builder.conversationId(notNull(readString(src, "conversationId")))
       builder.message(notNull(readString(src, "message")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SendMessage") {
       val builder = SendMessageMutation.builder()
       builder.message(readString(src, "message"))
       builder.file(readString(src, "file"))
       builder.repeatKey(readString(src, "repeatKey"))
       builder.replyMessages(notNullListItems(readStringList(src, "replyMessages")))
       builder.mentions(notNullListItems(readStringList(src, "mentions")))
       builder.room(notNull(readString(src, "room")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ReplyMessage") {
       val builder = ReplyMessageMutation.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       builder.message(readString(src, "message"))
       builder.replyMessages(notNullListItems(readStringList(src, "replyMessages")))
       builder.mentions(notNullListItems(readStringList(src, "mentions")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomRead") {
       val builder = RoomReadMutation.builder()
       builder.id(notNull(readString(src, "id")))
       builder.mid(notNull(readString(src, "mid")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomCreate") {
       val builder = RoomCreateMutation.builder()
       builder.kind(notNull(readSharedRoomKind(src, "kind")))
       builder.members(notNull(notNullListItems(readStringList(src, "members"))))
       builder.message(readString(src, "message"))
       builder.title(readString(src, "title"))
       builder.description(readString(src, "description"))
       builder.photoRef(readImageRefInput(src, "photoRef"))
       builder.organizationId(readString(src, "organizationId"))
       builder.channel(notNull(readBool(src, "channel")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomCreateIntro") {
       val builder = RoomCreateIntroMutation.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       builder.uid(notNull(readString(src, "uid")))
       builder.about(readString(src, "about"))
       builder.file(readString(src, "file"))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomEditIntro") {
       val builder = RoomEditIntroMutation.builder()
       builder.messageId(notNull(readString(src, "messageId")))
       builder.uid(notNull(readString(src, "uid")))
       builder.about(readString(src, "about"))
       builder.file(readString(src, "file"))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SetTyping") {
       val builder = SetTypingMutation.builder()
       builder.conversationId(notNull(readString(src, "conversationId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "CancelTyping") {
       val builder = CancelTypingMutation.builder()
       builder.conversationId(notNull(readString(src, "conversationId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomAddMember") {
       val builder = RoomAddMemberMutation.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       builder.userId(notNull(readString(src, "userId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomDeclineJoinReuest") {
       val builder = RoomDeclineJoinReuestMutation.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       builder.userId(notNull(readString(src, "userId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomAddMembers") {
       val builder = RoomAddMembersMutation.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       builder.invites(notNull(notNullListItems(readRoomInviteInputList(src, "invites"))))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomKick") {
       val builder = RoomKickMutation.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       builder.userId(notNull(readString(src, "userId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomChangeRole") {
       val builder = RoomChangeRoleMutation.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       builder.userId(notNull(readString(src, "userId")))
       builder.newRole(notNull(readRoomMemberRole(src, "newRole")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomLeave") {
       val builder = RoomLeaveMutation.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomAlterFeatured") {
       val builder = RoomAlterFeaturedMutation.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       builder.featured(notNull(readBool(src, "featured")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomAlterHidden") {
       val builder = RoomAlterHiddenMutation.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       builder.listed(notNull(readBool(src, "listed")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomSettingsUpdate") {
       val builder = RoomSettingsUpdateMutation.builder()
       builder.settings(notNull(readRoomUserNotificaionSettingsInput(src, "settings")))
       builder.roomId(notNull(readString(src, "roomId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomJoin") {
       val builder = RoomJoinMutation.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomSendEmailInvite") {
       val builder = RoomSendEmailInviteMutation.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       builder.inviteRequests(notNull(notNullListItems(readRoomInviteEmailRequestList(src, "inviteRequests"))))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomJoinInviteLink") {
       val builder = RoomJoinInviteLinkMutation.builder()
       builder.invite(notNull(readString(src, "invite")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomRenewInviteLink") {
       val builder = RoomRenewInviteLinkMutation.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "AddMessageComment") {
       val builder = AddMessageCommentMutation.builder()
       builder.messageId(notNull(readString(src, "messageId")))
       builder.message(readString(src, "message"))
       builder.replyComment(readString(src, "replyComment"))
       builder.mentions(notNullListItems(readMentionInputList(src, "mentions")))
       builder.fileAttachments(notNullListItems(readFileAttachmentInputList(src, "fileAttachments")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "BetaAddMessageComment") {
       val builder = BetaAddMessageCommentMutation.builder()
       builder.messageId(notNull(readString(src, "messageId")))
       builder.message(readString(src, "message"))
       builder.replyComment(readString(src, "replyComment"))
       builder.mentions(notNullListItems(readMentionInputList(src, "mentions")))
       builder.fileAttachments(notNullListItems(readFileAttachmentInputList(src, "fileAttachments")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "EditComment") {
       val builder = EditCommentMutation.builder()
       builder.id(notNull(readString(src, "id")))
       builder.message(readString(src, "message"))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "DeleteComment") {
       val builder = DeleteCommentMutation.builder()
       builder.id(notNull(readString(src, "id")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "CommentSetReaction") {
       val builder = CommentSetReactionMutation.builder()
       builder.commentId(notNull(readString(src, "commentId")))
       builder.reaction(notNull(readMessageReactionType(src, "reaction")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "CommentUnsetReaction") {
       val builder = CommentUnsetReactionMutation.builder()
       builder.commentId(notNull(readString(src, "commentId")))
       builder.reaction(notNull(readMessageReactionType(src, "reaction")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomUpdate") {
       val builder = RoomUpdateMutation.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       builder.input(notNull(readRoomUpdateInput(src, "input")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomDeleteMessage") {
       val builder = RoomDeleteMessageMutation.builder()
       builder.messageId(notNull(readString(src, "messageId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomDeleteMessages") {
       val builder = RoomDeleteMessagesMutation.builder()
       builder.mids(notNull(notNullListItems(readStringList(src, "mids"))))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomDeleteUrlAugmentation") {
       val builder = RoomDeleteUrlAugmentationMutation.builder()
       builder.messageId(notNull(readString(src, "messageId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "RoomEditMessage") {
       val builder = RoomEditMessageMutation.builder()
       builder.messageId(notNull(readString(src, "messageId")))
       builder.message(readString(src, "message"))
       builder.file(readString(src, "file"))
       builder.replyMessages(notNullListItems(readStringList(src, "replyMessages")))
       builder.mentions(notNullListItems(readStringList(src, "mentions")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "MarkSequenceRead") {
       val builder = MarkSequenceReadMutation.builder()
       builder.seq(notNull(readInt(src, "seq")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "UpdateWelcomeMessage") {
       val builder = UpdateWelcomeMessageMutation.builder()
       builder.roomId(notNull(readString(src, "roomId")))
       builder.welcomeMessageIsOn(notNull(readBool(src, "welcomeMessageIsOn")))
       builder.welcomeMessageSender(readString(src, "welcomeMessageSender"))
       builder.welcomeMessageText(readString(src, "welcomeMessageText"))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ConferenceJoin") {
       val builder = ConferenceJoinMutation.builder()
       builder.id(notNull(readString(src, "id")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ConferenceLeave") {
       val builder = ConferenceLeaveMutation.builder()
       builder.id(notNull(readString(src, "id")))
       builder.peerId(notNull(readString(src, "peerId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ConferenceKeepAlive") {
       val builder = ConferenceKeepAliveMutation.builder()
       builder.id(notNull(readString(src, "id")))
       builder.peerId(notNull(readString(src, "peerId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ConferenceOffer") {
       val builder = ConferenceOfferMutation.builder()
       builder.id(notNull(readString(src, "id")))
       builder.ownPeerId(notNull(readString(src, "ownPeerId")))
       builder.peerId(notNull(readString(src, "peerId")))
       builder.offer(notNull(readString(src, "offer")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ConferenceAnswer") {
       val builder = ConferenceAnswerMutation.builder()
       builder.id(notNull(readString(src, "id")))
       builder.ownPeerId(notNull(readString(src, "ownPeerId")))
       builder.peerId(notNull(readString(src, "peerId")))
       builder.answer(notNull(readString(src, "answer")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ConferenceCandidate") {
       val builder = ConferenceCandidateMutation.builder()
       builder.id(notNull(readString(src, "id")))
       builder.ownPeerId(notNull(readString(src, "ownPeerId")))
       builder.peerId(notNull(readString(src, "peerId")))
       builder.candidate(notNull(readString(src, "candidate")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "MediaOffer") {
       val builder = MediaOfferMutation.builder()
       builder.id(notNull(readString(src, "id")))
       builder.peerId(notNull(readString(src, "peerId")))
       builder.offer(notNull(readString(src, "offer")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "MediaAnswer") {
       val builder = MediaAnswerMutation.builder()
       builder.id(notNull(readString(src, "id")))
       builder.peerId(notNull(readString(src, "peerId")))
       builder.answer(notNull(readString(src, "answer")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "MediaCandidate") {
       val builder = MediaCandidateMutation.builder()
       builder.id(notNull(readString(src, "id")))
       builder.peerId(notNull(readString(src, "peerId")))
       builder.candidate(notNull(readString(src, "candidate")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "FeatureFlagAdd") {
       val builder = FeatureFlagAddMutation.builder()
       builder.key(notNull(readString(src, "key")))
       builder.title(notNull(readString(src, "title")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "FeatureFlagEnable") {
       val builder = FeatureFlagEnableMutation.builder()
       builder.accountId(notNull(readString(src, "accountId")))
       builder.featureId(notNull(readString(src, "featureId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "FeatureFlagDisable") {
       val builder = FeatureFlagDisableMutation.builder()
       builder.accountId(notNull(readString(src, "accountId")))
       builder.featureId(notNull(readString(src, "featureId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "FeedPost") {
       val builder = FeedPostMutation.builder()
       builder.message(notNull(readString(src, "message")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "UpdateOrganization") {
       val builder = UpdateOrganizationMutation.builder()
       builder.input(notNull(readUpdateOrganizationProfileInput(src, "input")))
       builder.organizationId(readString(src, "organizationId"))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SetOrgShortname") {
       val builder = SetOrgShortnameMutation.builder()
       builder.organizationId(notNull(readString(src, "organizationId")))
       builder.shortname(notNull(readString(src, "shortname")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "OrganizationChangeMemberRole") {
       val builder = OrganizationChangeMemberRoleMutation.builder()
       builder.memberId(notNull(readString(src, "memberId")))
       builder.newRole(notNull(readOrganizationMemberRole(src, "newRole")))
       builder.organizationId(notNull(readString(src, "organizationId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "OrganizationAddMember") {
       val builder = OrganizationAddMemberMutation.builder()
       builder.userIds(notNullListItems(readStringList(src, "userIds")))
       builder.organizationId(notNull(readString(src, "organizationId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "OrganizationRemoveMember") {
       val builder = OrganizationRemoveMemberMutation.builder()
       builder.memberId(notNull(readString(src, "memberId")))
       builder.organizationId(notNull(readString(src, "organizationId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "OrganizationInviteMembers") {
       val builder = OrganizationInviteMembersMutation.builder()
       builder.inviteRequests(notNull(notNullListItems(readInviteRequestList(src, "inviteRequests"))))
       builder.organizationId(readString(src, "organizationId"))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "OrganizationCreatePublicInvite") {
       val builder = OrganizationCreatePublicInviteMutation.builder()
       builder.expirationDays(readInt(src, "expirationDays"))
       builder.organizationId(readString(src, "organizationId"))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "DeleteOrganization") {
       val builder = DeleteOrganizationMutation.builder()
       builder.organizationId(notNull(readString(src, "organizationId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "OrganizationMemberRemove") {
       val builder = OrganizationMemberRemoveMutation.builder()
       builder.userId(notNull(readString(src, "userId")))
       builder.organizationId(notNull(readString(src, "organizationId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "OrganizationActivateByInvite") {
       val builder = OrganizationActivateByInviteMutation.builder()
       builder.inviteKey(notNull(readString(src, "inviteKey")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "OrganizationAlterPublished") {
       val builder = OrganizationAlterPublishedMutation.builder()
       builder.organizationId(notNull(readString(src, "organizationId")))
       builder.published(notNull(readBool(src, "published")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "DebugMails") {
       val builder = DebugMailsMutation.builder()
       builder.type(notNull(readDebugEmailType(src, "type")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SuperAccountRename") {
       val builder = SuperAccountRenameMutation.builder()
       builder.accountId(notNull(readString(src, "accountId")))
       builder.title(notNull(readString(src, "title")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SuperAccountActivate") {
       val builder = SuperAccountActivateMutation.builder()
       builder.accountId(notNull(readString(src, "accountId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SuperAccountSuspend") {
       val builder = SuperAccountSuspendMutation.builder()
       builder.accountId(notNull(readString(src, "accountId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SuperAccountPend") {
       val builder = SuperAccountPendMutation.builder()
       builder.accountId(notNull(readString(src, "accountId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SuperAccountAdd") {
       val builder = SuperAccountAddMutation.builder()
       builder.title(notNull(readString(src, "title")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SuperAccountMemberAdd") {
       val builder = SuperAccountMemberAddMutation.builder()
       builder.accountId(notNull(readString(src, "accountId")))
       builder.userId(notNull(readString(src, "userId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SuperAccountMemberRemove") {
       val builder = SuperAccountMemberRemoveMutation.builder()
       builder.accountId(notNull(readString(src, "accountId")))
       builder.userId(notNull(readString(src, "userId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SuperAdminAdd") {
       val builder = SuperAdminAddMutation.builder()
       builder.userId(notNull(readString(src, "userId")))
       builder.role(notNull(readSuperAdminRole(src, "role")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SuperAdminRemove") {
       val builder = SuperAdminRemoveMutation.builder()
       builder.userId(notNull(readString(src, "userId")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ProfileUpdate") {
       val builder = ProfileUpdateMutation.builder()
       builder.input(notNull(readUpdateProfileInput(src, "input")))
       builder.uid(readString(src, "uid"))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SetUserShortname") {
       val builder = SetUserShortnameMutation.builder()
       builder.shortname(notNull(readString(src, "shortname")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "ProfileCreate") {
       val builder = ProfileCreateMutation.builder()
       builder.input(notNull(readCreateProfileInput(src, "input")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "SettingsUpdate") {
       val builder = SettingsUpdateMutation.builder()
       builder.input(readUpdateSettingsInput(src, "input"))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "PersistEvents") {
       val builder = PersistEventsMutation.builder()
       builder.did(notNull(readString(src, "did")))
       builder.events(notNull(notNullListItems(readEventList(src, "events"))))
       builder.platform(readEventPlatform(src, "platform"))
       builder.isProd(readBool(src, "isProd"))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    if (name == "DeleteUser") {
       val builder = DeleteUserMutation.builder()
       builder.id(notNull(readString(src, "id")))
       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>
    }
    throw Error("Unknown mutation: $name")
}
fun readFragment(name: String, src: ReadableMap): Pair<String, GraphqlFragment> {
    if (name == "AppFull") {
        val res = AppFull.Mapper().map(responseReader(src))
        return (res.__typename() + "$" + res.id()) to res
    }
    if (name == "CommentEntryFragment") {
        val res = CommentEntryFragment.Mapper().map(responseReader(src))
        return (res.__typename() + "$" + res.id()) to res
    }
    if (name == "CommunitySearch") {
        val res = CommunitySearch.Mapper().map(responseReader(src))
        return (res.__typename() + "$" + res.id()) to res
    }
    if (name == "ConferenceFull") {
        val res = ConferenceFull.Mapper().map(responseReader(src))
        return (res.__typename() + "$" + res.id()) to res
    }
    if (name == "TinyMessage") {
        val res = TinyMessage.Mapper().map(responseReader(src))
        return (res.__typename() + "$" + res.id()) to res
    }
    if (name == "FullMessage") {
        val res = FullMessage.Mapper().map(responseReader(src))
        return (res.__typename() + "$" + res.id()) to res
    }
    if (name == "OrganizationFull") {
        val res = OrganizationFull.Mapper().map(responseReader(src))
        return (res.__typename() + "$" + res.id()) to res
    }
    if (name == "OrganizationMedium") {
        val res = OrganizationMedium.Mapper().map(responseReader(src))
        return (res.__typename() + "$" + res.id()) to res
    }
    if (name == "OrganizationProfileFull") {
        val res = OrganizationProfileFull.Mapper().map(responseReader(src))
        return (res.__typename() + "$" + res.id()) to res
    }
    if (name == "OrganizationSearch") {
        val res = OrganizationSearch.Mapper().map(responseReader(src))
        return (res.__typename() + "$" + res.id()) to res
    }
    if (name == "OrganizationShort") {
        val res = OrganizationShort.Mapper().map(responseReader(src))
        return (res.__typename() + "$" + res.id()) to res
    }
    if (name == "OrganizationWithoutMembersFragment") {
        val res = OrganizationWithoutMembersFragment.Mapper().map(responseReader(src))
        return (res.__typename() + "$" + res.id()) to res
    }
    if (name == "SettingsFull") {
        val res = SettingsFull.Mapper().map(responseReader(src))
        return (res.__typename() + "$" + res.id()) to res
    }
    if (name == "UserFull") {
        val res = UserFull.Mapper().map(responseReader(src))
        return (res.__typename() + "$" + res.id()) to res
    }
    if (name == "UserShort") {
        val res = UserShort.Mapper().map(responseReader(src))
        return (res.__typename() + "$" + res.id()) to res
    }
    if (name == "UserTiny") {
        val res = UserTiny.Mapper().map(responseReader(src))
        return (res.__typename() + "$" + res.id()) to res
    }
    throw Error("Unknown Fragment: $name")
}
