/* tslint:disable */
/* eslint-disable */
// @ts-ignore
import { WebDefinitions, OperationDefinition, Definitions as AllDefinitions } from '@openland/spacex';
// @ts-ignore
const { list, notNull, scalar, field, obj, inline, fragment, args, fieldValue, refValue, intValue, floatValue, stringValue, boolValue, listValue, objectValue } = WebDefinitions;

const AppChatSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('chat', 'chat', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('PrivateRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )),
                    inline('SharedRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    ))
                ))),
            field('webhook', 'webhook', args(), notNull(scalar('String')))
        );

const AppFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('shortname', 'shortname', args(), scalar('String')),
            field('photoRef', 'photoRef', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('uuid', 'uuid', args(), notNull(scalar('String'))),
                    field('crop', 'crop', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('x', 'x', args(), notNull(scalar('Int'))),
                            field('y', 'y', args(), notNull(scalar('Int'))),
                            field('w', 'w', args(), notNull(scalar('Int'))),
                            field('h', 'h', args(), notNull(scalar('Int')))
                        ))
                )),
            field('about', 'about', args(), scalar('String')),
            field('token', 'token', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('salt', 'salt', args(), notNull(scalar('String')))
                )))
        );

const OrganizationShortSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('shortname', 'shortname', args(), scalar('String')),
            field('about', 'about', args(), scalar('String')),
            field('alphaIsCommunity', 'isCommunity', args(), notNull(scalar('Boolean'))),
            field('membersCount', 'membersCount', args(), notNull(scalar('Int')))
        );

const UserShortSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('firstName', 'firstName', args(), notNull(scalar('String'))),
            field('lastName', 'lastName', args(), scalar('String')),
            field('photo', 'photo', args(), scalar('String')),
            field('email', 'email', args(), scalar('String')),
            field('online', 'online', args(), notNull(scalar('Boolean'))),
            field('lastSeen', 'lastSeen', args(), scalar('String')),
            field('isYou', 'isYou', args(), notNull(scalar('Boolean'))),
            field('isBot', 'isBot', args(), notNull(scalar('Boolean'))),
            field('shortname', 'shortname', args(), scalar('String')),
            field('primaryOrganization', 'primaryOrganization', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Organization', OrganizationShortSelector)
                ))
        );

const UserBadgeSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('verified', 'verified', args(), notNull(scalar('Boolean')))
        );

const UserForMentionSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('isYou', 'isYou', args(), notNull(scalar('Boolean'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('shortname', 'shortname', args(), scalar('String')),
            field('isBot', 'isBot', args(), notNull(scalar('Boolean'))),
            field('primaryOrganization', 'primaryOrganization', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('name', 'name', args(), notNull(scalar('String')))
                ))
        );

const RoomSharedNanoSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('kind', 'kind', args(), notNull(scalar('String'))),
            field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
            field('isPremium', 'isPremium', args(), notNull(scalar('Boolean'))),
            field('title', 'title', args(), notNull(scalar('String'))),
            field('photo', 'roomPhoto', args(), notNull(scalar('String'))),
            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
            field('settings', 'settings', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('mute', 'mute', args(), scalar('Boolean'))
                )))
        );

const RoomNanoSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('PrivateRoom', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('user', 'user', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('name', 'name', args(), notNull(scalar('String'))),
                        field('photo', 'photo', args(), scalar('String'))
                    ))),
                field('settings', 'settings', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('mute', 'mute', args(), scalar('Boolean'))
                    )))
            )),
            inline('SharedRoom', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                fragment('SharedRoom', RoomSharedNanoSelector)
            ))
        );

const SpanFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('offset', 'offset', args(), notNull(scalar('Int'))),
            field('length', 'length', args(), notNull(scalar('Int'))),
            inline('MessageSpanUserMention', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('user', 'user', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('User', UserForMentionSelector)
                    )))
            )),
            inline('MessageSpanMultiUserMention', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('users', 'users', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('User', UserForMentionSelector)
                    )))))
            )),
            inline('MessageSpanOrganizationMention', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('organization', 'organization', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Organization', OrganizationShortSelector)
                    )))
            )),
            inline('MessageSpanRoomMention', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('room', 'room', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Room', RoomNanoSelector)
                    )))
            )),
            inline('MessageSpanLink', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('url', 'url', args(), notNull(scalar('String')))
            )),
            inline('MessageSpanDate', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('date', 'date', args(), notNull(scalar('Date')))
            ))
        );

const QuotedMessageSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('date', 'date', args(), notNull(scalar('Date'))),
            field('message', 'message', args(), scalar('String')),
            field('sender', 'sender', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('User', UserShortSelector)
                ))),
            field('senderBadge', 'senderBadge', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('UserBadge', UserBadgeSelector)
                )),
            field('message', 'message', args(), scalar('String')),
            field('fallback', 'fallback', args(), notNull(scalar('String'))),
            field('source', 'source', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('MessageSourceChat', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('chat', 'chat', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                inline('PrivateRoom', obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID')))
                                )),
                                inline('SharedRoom', obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID')))
                                ))
                            )))
                    ))
                )),
            field('spans', 'spans', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('MessageSpan', SpanFragmentSelector)
                ))))),
            inline('GeneralMessage', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('overrideName', 'overrideName', args(), scalar('String')),
                field('overrideAvatar', 'overrideAvatar', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('uuid', 'uuid', args(), notNull(scalar('String'))),
                        field('crop', 'crop', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('x', 'x', args(), notNull(scalar('Int'))),
                                field('y', 'y', args(), notNull(scalar('Int'))),
                                field('w', 'w', args(), notNull(scalar('Int'))),
                                field('h', 'h', args(), notNull(scalar('Int')))
                            ))
                    )),
                field('commentsCount', 'commentsCount', args(), notNull(scalar('Int'))),
                field('edited', 'edited', args(), notNull(scalar('Boolean'))),
                field('attachments', 'attachments', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('fallback', 'fallback', args(), notNull(scalar('String'))),
                        inline('MessageAttachmentFile', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('fileId', 'fileId', args(), notNull(scalar('String'))),
                            field('fileMetadata', 'fileMetadata', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('name', 'name', args(), notNull(scalar('String'))),
                                    field('mimeType', 'mimeType', args(), scalar('String')),
                                    field('size', 'size', args(), notNull(scalar('Int'))),
                                    field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                    field('imageWidth', 'imageWidth', args(), scalar('Int')),
                                    field('imageHeight', 'imageHeight', args(), scalar('Int')),
                                    field('imageFormat', 'imageFormat', args(), scalar('String'))
                                ))),
                            field('filePreview', 'filePreview', args(), scalar('String'))
                        )),
                        inline('MessageRichAttachment', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('title', 'title', args(), scalar('String')),
                            field('subTitle', 'subTitle', args(), scalar('String')),
                            field('titleLink', 'titleLink', args(), scalar('String')),
                            field('titleLinkHostname', 'titleLinkHostname', args(), scalar('String')),
                            field('text', 'text', args(), scalar('String')),
                            field('icon', 'icon', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('url', 'url', args(), notNull(scalar('String'))),
                                    field('metadata', 'metadata', args(), obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('name', 'name', args(), notNull(scalar('String'))),
                                            field('mimeType', 'mimeType', args(), scalar('String')),
                                            field('size', 'size', args(), notNull(scalar('Int'))),
                                            field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                            field('imageWidth', 'imageWidth', args(), scalar('Int')),
                                            field('imageHeight', 'imageHeight', args(), scalar('Int')),
                                            field('imageFormat', 'imageFormat', args(), scalar('String'))
                                        ))
                                )),
                            field('image', 'image', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('url', 'url', args(), notNull(scalar('String'))),
                                    field('metadata', 'metadata', args(), obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('name', 'name', args(), notNull(scalar('String'))),
                                            field('mimeType', 'mimeType', args(), scalar('String')),
                                            field('size', 'size', args(), notNull(scalar('Int'))),
                                            field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                            field('imageWidth', 'imageWidth', args(), scalar('Int')),
                                            field('imageHeight', 'imageHeight', args(), scalar('Int')),
                                            field('imageFormat', 'imageFormat', args(), scalar('String'))
                                        ))
                                )),
                            field('keyboard', 'keyboard', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('buttons', 'buttons', args(), notNull(list(list(notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('id', 'id', args(), notNull(scalar('ID'))),
                                            field('title', 'title', args(), notNull(scalar('String'))),
                                            field('style', 'style', args(), notNull(scalar('String'))),
                                            field('url', 'url', args(), scalar('String'))
                                        ))))))
                                )),
                            field('imageFallback', 'imageFallback', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('photo', 'photo', args(), notNull(scalar('String'))),
                                    field('text', 'text', args(), notNull(scalar('String')))
                                )),
                            field('fallback', 'fallback', args(), notNull(scalar('String')))
                        ))
                    )))))
            )),
            inline('StickerMessage', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('date', 'date', args(), notNull(scalar('Date'))),
                field('overrideName', 'overrideName', args(), scalar('String')),
                field('overrideAvatar', 'overrideAvatar', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('uuid', 'uuid', args(), notNull(scalar('String'))),
                        field('crop', 'crop', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('x', 'x', args(), notNull(scalar('Int'))),
                                field('y', 'y', args(), notNull(scalar('Int'))),
                                field('w', 'w', args(), notNull(scalar('Int'))),
                                field('h', 'h', args(), notNull(scalar('Int')))
                            ))
                    )),
                field('sender', 'sender', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('User', UserShortSelector)
                    ))),
                field('senderBadge', 'senderBadge', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('UserBadge', UserBadgeSelector)
                    )),
                field('source', 'source', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        inline('MessageSourceChat', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('chat', 'chat', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    inline('PrivateRoom', obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID')))
                                    )),
                                    inline('SharedRoom', obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID')))
                                    ))
                                )))
                        ))
                    )),
                field('reactions', 'reactions', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('user', 'user', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserShortSelector)
                            ))),
                        field('reaction', 'reaction', args(), notNull(scalar('String')))
                    ))))),
                field('sticker', 'sticker', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        inline('ImageSticker', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('pack', 'pack', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    inline('StickerPack', obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('title', 'title', args(), notNull(scalar('String')))
                                    ))
                                ))),
                            field('image', 'image', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    inline('ImageRef', obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('uuid', 'uuid', args(), notNull(scalar('String')))
                                    ))
                                )))
                        ))
                    )))
            ))
        );

const StickerFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('ImageSticker', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('pack', 'pack', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('title', 'title', args(), notNull(scalar('String')))
                    ))),
                field('image', 'image', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('uuid', 'uuid', args(), notNull(scalar('String')))
                    )))
            ))
        );

const UserTinySelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('isYou', 'isYou', args(), notNull(scalar('Boolean'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('firstName', 'firstName', args(), notNull(scalar('String'))),
            field('lastName', 'lastName', args(), scalar('String')),
            field('photo', 'photo', args(), scalar('String')),
            field('shortname', 'shortname', args(), scalar('String')),
            field('primaryOrganization', 'primaryOrganization', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Organization', OrganizationShortSelector)
                ))
        );

const FullMessageSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('date', 'date', args(), notNull(scalar('Date'))),
            field('sender', 'sender', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('User', UserShortSelector)
                ))),
            field('senderBadge', 'senderBadge', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('UserBadge', UserBadgeSelector)
                )),
            field('message', 'message', args(), scalar('String')),
            field('fallback', 'fallback', args(), notNull(scalar('String'))),
            field('source', 'source', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('MessageSourceChat', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('chat', 'chat', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                inline('PrivateRoom', obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID')))
                                )),
                                inline('SharedRoom', obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                                    field('membersCount', 'membersCount', args(), notNull(scalar('Int')))
                                ))
                            )))
                    ))
                )),
            field('spans', 'spans', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('MessageSpan', SpanFragmentSelector)
                ))))),
            inline('GeneralMessage', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('overrideName', 'overrideName', args(), scalar('String')),
                field('overrideAvatar', 'overrideAvatar', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('uuid', 'uuid', args(), notNull(scalar('String'))),
                        field('crop', 'crop', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('x', 'x', args(), notNull(scalar('Int'))),
                                field('y', 'y', args(), notNull(scalar('Int'))),
                                field('w', 'w', args(), notNull(scalar('Int'))),
                                field('h', 'h', args(), notNull(scalar('Int')))
                            ))
                    )),
                field('edited', 'edited', args(), notNull(scalar('Boolean'))),
                field('commentsCount', 'commentsCount', args(), notNull(scalar('Int'))),
                field('attachments', 'attachments', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('fallback', 'fallback', args(), notNull(scalar('String'))),
                        inline('MessageAttachmentFile', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('fileId', 'fileId', args(), notNull(scalar('String'))),
                            field('fileMetadata', 'fileMetadata', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('name', 'name', args(), notNull(scalar('String'))),
                                    field('mimeType', 'mimeType', args(), scalar('String')),
                                    field('size', 'size', args(), notNull(scalar('Int'))),
                                    field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                    field('imageWidth', 'imageWidth', args(), scalar('Int')),
                                    field('imageHeight', 'imageHeight', args(), scalar('Int')),
                                    field('imageFormat', 'imageFormat', args(), scalar('String'))
                                ))),
                            field('filePreview', 'filePreview', args(), scalar('String'))
                        )),
                        inline('MessageRichAttachment', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('title', 'title', args(), scalar('String')),
                            field('subTitle', 'subTitle', args(), scalar('String')),
                            field('titleLink', 'titleLink', args(), scalar('String')),
                            field('titleLinkHostname', 'titleLinkHostname', args(), scalar('String')),
                            field('text', 'text', args(), scalar('String')),
                            field('icon', 'icon', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('url', 'url', args(), notNull(scalar('String'))),
                                    field('metadata', 'metadata', args(), obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('name', 'name', args(), notNull(scalar('String'))),
                                            field('mimeType', 'mimeType', args(), scalar('String')),
                                            field('size', 'size', args(), notNull(scalar('Int'))),
                                            field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                            field('imageWidth', 'imageWidth', args(), scalar('Int')),
                                            field('imageHeight', 'imageHeight', args(), scalar('Int')),
                                            field('imageFormat', 'imageFormat', args(), scalar('String'))
                                        ))
                                )),
                            field('image', 'image', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('url', 'url', args(), notNull(scalar('String'))),
                                    field('metadata', 'metadata', args(), obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('name', 'name', args(), notNull(scalar('String'))),
                                            field('mimeType', 'mimeType', args(), scalar('String')),
                                            field('size', 'size', args(), notNull(scalar('Int'))),
                                            field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                            field('imageWidth', 'imageWidth', args(), scalar('Int')),
                                            field('imageHeight', 'imageHeight', args(), scalar('Int')),
                                            field('imageFormat', 'imageFormat', args(), scalar('String'))
                                        ))
                                )),
                            field('socialImage', 'socialImage', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('url', 'url', args(), notNull(scalar('String'))),
                                    field('metadata', 'metadata', args(), obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('name', 'name', args(), notNull(scalar('String'))),
                                            field('mimeType', 'mimeType', args(), scalar('String')),
                                            field('size', 'size', args(), notNull(scalar('Int'))),
                                            field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                            field('imageWidth', 'imageWidth', args(), scalar('Int')),
                                            field('imageHeight', 'imageHeight', args(), scalar('Int')),
                                            field('imageFormat', 'imageFormat', args(), scalar('String'))
                                        ))
                                )),
                            field('imageFallback', 'imageFallback', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('photo', 'photo', args(), notNull(scalar('String'))),
                                    field('text', 'text', args(), notNull(scalar('String')))
                                )),
                            field('keyboard', 'keyboard', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('buttons', 'buttons', args(), notNull(list(list(notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('id', 'id', args(), notNull(scalar('ID'))),
                                            field('title', 'title', args(), notNull(scalar('String'))),
                                            field('style', 'style', args(), notNull(scalar('String'))),
                                            field('url', 'url', args(), scalar('String'))
                                        ))))))
                                )),
                            field('fallback', 'fallback', args(), notNull(scalar('String')))
                        ))
                    ))))),
                field('quotedMessages', 'quotedMessages', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', QuotedMessageSelector)
                    ))))),
                field('reactions', 'reactions', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('user', 'user', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserShortSelector)
                            ))),
                        field('reaction', 'reaction', args(), notNull(scalar('String')))
                    )))))
            )),
            inline('StickerMessage', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('overrideName', 'overrideName', args(), scalar('String')),
                field('overrideAvatar', 'overrideAvatar', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('uuid', 'uuid', args(), notNull(scalar('String'))),
                        field('crop', 'crop', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('x', 'x', args(), notNull(scalar('Int'))),
                                field('y', 'y', args(), notNull(scalar('Int'))),
                                field('w', 'w', args(), notNull(scalar('Int'))),
                                field('h', 'h', args(), notNull(scalar('Int')))
                            ))
                    )),
                field('date', 'date', args(), notNull(scalar('Date'))),
                field('commentsCount', 'commentsCount', args(), notNull(scalar('Int'))),
                field('sender', 'sender', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('User', UserShortSelector)
                    ))),
                field('senderBadge', 'senderBadge', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('UserBadge', UserBadgeSelector)
                    )),
                field('quotedMessages', 'quotedMessages', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', QuotedMessageSelector)
                    ))))),
                field('reactions', 'reactions', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('user', 'user', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserShortSelector)
                            ))),
                        field('reaction', 'reaction', args(), notNull(scalar('String')))
                    ))))),
                field('sticker', 'sticker', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Sticker', StickerFragmentSelector)
                    )))
            )),
            inline('ServiceMessage', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('overrideName', 'overrideName', args(), scalar('String')),
                field('overrideAvatar', 'overrideAvatar', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('uuid', 'uuid', args(), notNull(scalar('String'))),
                        field('crop', 'crop', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('x', 'x', args(), notNull(scalar('Int'))),
                                field('y', 'y', args(), notNull(scalar('Int'))),
                                field('w', 'w', args(), notNull(scalar('Int'))),
                                field('h', 'h', args(), notNull(scalar('Int')))
                            ))
                    )),
                field('serviceMetadata', 'serviceMetadata', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        inline('InviteServiceMetadata', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('users', 'users', args(), list(notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('User', UserTinySelector)
                                )))),
                            field('invitedBy', 'invitedBy', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('User', UserTinySelector)
                                )))
                        )),
                        inline('KickServiceMetadata', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('user', 'user', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('User', UserTinySelector)
                                ))),
                            field('kickedBy', 'kickedBy', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('User', UserTinySelector)
                                )))
                        )),
                        inline('TitleChangeServiceMetadata', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('title', 'title', args(), notNull(scalar('String')))
                        )),
                        inline('PhotoChangeServiceMetadata', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('photo', 'photo', args(), scalar('String'))
                        )),
                        inline('PostRespondServiceMetadata', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('respondType', 'respondType', args(), notNull(scalar('ID')))
                        ))
                    ))
            ))
        );

const MatchmakingProfileFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('chatCreated', 'chatCreated', args(), notNull(scalar('Boolean'))),
            field('user', 'user', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('isYou', 'isYou', args(), notNull(scalar('Boolean'))),
                    field('name', 'name', args(), notNull(scalar('String'))),
                    field('photo', 'photo', args(), scalar('String')),
                    field('isBot', 'isBot', args(), notNull(scalar('Boolean'))),
                    field('primaryOrganization', 'primaryOrganization', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('name', 'name', args(), notNull(scalar('String')))
                        ))
                ))),
            field('answers', 'answers', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('TextMatchmakingAnswer', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('question', 'question', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('title', 'title', args(), notNull(scalar('String'))),
                                field('subtitle', 'subtitle', args(), notNull(scalar('String')))
                            ))),
                        field('answer', 'answer', args(), notNull(scalar('String')))
                    )),
                    inline('MultiselectMatchmakingAnswer', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('question', 'question', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('title', 'title', args(), notNull(scalar('String'))),
                                field('subtitle', 'subtitle', args(), notNull(scalar('String')))
                            ))),
                        field('tags', 'tags', args(), notNull(list(notNull(scalar('String')))))
                    ))
                )))))
        );

const MatchmakingRoomFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('enabled', 'enabled', args(), notNull(scalar('Boolean'))),
            field('questions', 'questions', args(), list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('TextMatchmakingQuestion', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('title', 'title', args(), notNull(scalar('String'))),
                        field('subtitle', 'subtitle', args(), notNull(scalar('String')))
                    )),
                    inline('MultiselectMatchmakingQuestion', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('title', 'title', args(), notNull(scalar('String'))),
                        field('subtitle', 'subtitle', args(), notNull(scalar('String'))),
                        field('tags', 'tags', args(), notNull(list(notNull(scalar('String')))))
                    ))
                )))),
            field('myProfile', 'myProfile', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('MatchmakingProfile', MatchmakingProfileFragmentSelector)
                )),
            field('profiles', 'profiles', args(), list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('MatchmakingProfile', MatchmakingProfileFragmentSelector)
                ))))
        );

const RoomShortSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('PrivateRoom', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('user', 'user', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('User', UserShortSelector)
                    ))),
                field('settings', 'settings', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('mute', 'mute', args(), scalar('Boolean'))
                    ))),
                field('pinnedMessage', 'pinnedMessage', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', FullMessageSelector)
                    )),
                field('myBadge', 'myBadge', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('UserBadge', UserBadgeSelector)
                    ))
            )),
            inline('SharedRoom', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('kind', 'kind', args(), notNull(scalar('String'))),
                field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                field('isPremium', 'isPremium', args(), notNull(scalar('Boolean'))),
                field('title', 'title', args(), notNull(scalar('String'))),
                field('photo', 'photo', args(), notNull(scalar('String'))),
                field('membership', 'membership', args(), notNull(scalar('String'))),
                field('role', 'role', args(), notNull(scalar('String'))),
                field('canEdit', 'canEdit', args(), notNull(scalar('Boolean'))),
                field('canSendMessage', 'canSendMessage', args(), notNull(scalar('Boolean'))),
                field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                field('pinnedMessage', 'pinnedMessage', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', FullMessageSelector)
                    )),
                field('matchmaking', 'matchmaking', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('MatchmakingRoom', MatchmakingRoomFragmentSelector)
                    )),
                field('organization', 'organization', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Organization', OrganizationShortSelector)
                    )),
                field('settings', 'settings', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('mute', 'mute', args(), scalar('Boolean'))
                    ))),
                field('myBadge', 'myBadge', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('UserBadge', UserBadgeSelector)
                    )),
                field('owner', 'owner', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('firstName', 'firstName', args(), notNull(scalar('String')))
                    ))
            ))
        );

const ChatUpdateFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('ChatMessageReceived', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('message', 'message', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', FullMessageSelector)
                    ))),
                field('repeatKey', 'repeatKey', args(), scalar('String'))
            )),
            inline('ChatMessageUpdated', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('message', 'message', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', FullMessageSelector)
                    )))
            )),
            inline('ChatMessageDeleted', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('message', 'message', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )))
            )),
            inline('ChatUpdated', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('chat', 'chat', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Room', RoomShortSelector)
                    )))
            )),
            inline('ChatLostAccess', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('lostAccess', 'lostAccess', args(), notNull(scalar('Boolean')))
            ))
        );

const CommentEntryFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('deleted', 'deleted', args(), notNull(scalar('Boolean'))),
            field('betaComment', 'comment', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    fragment('ModernMessage', FullMessageSelector)
                ))),
            field('parentComment', 'parentComment', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('betaComment', 'comment', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('message', 'message', args(), scalar('String'))
                        ))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )),
            field('childComments', 'childComments', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))))
        );

const CommentUpdateFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('CommentReceived', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('comment', 'comment', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('CommentEntry', CommentEntryFragmentSelector)
                    )))
            )),
            inline('CommentUpdated', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('comment', 'comment', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('CommentEntry', CommentEntryFragmentSelector)
                    )))
            ))
        );

const CommunitySearchSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('superAccountId', 'superAccountId', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('isMine', 'isMine', args(), notNull(scalar('Boolean'))),
            field('about', 'about', args(), scalar('String')),
            field('status', 'status', args(), notNull(scalar('String'))),
            field('alphaFeatured', 'featured', args(), notNull(scalar('Boolean'))),
            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
            field('betaPublicRoomsCount', 'roomsCount', args(), notNull(scalar('Int')))
        );

const ConferenceFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('startTime', 'startTime', args(), scalar('Date')),
            field('peers', 'peers', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        ))),
                    field('connection', 'connection', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('state', 'state', args(), notNull(scalar('String'))),
                            field('sdp', 'sdp', args(), scalar('String')),
                            field('ice', 'ice', args(), notNull(list(notNull(scalar('String')))))
                        ))
                ))))),
            field('iceServers', 'iceServers', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('urls', 'urls', args(), notNull(list(notNull(scalar('String'))))),
                    field('username', 'username', args(), scalar('String')),
                    field('credential', 'credential', args(), scalar('String'))
                )))))
        );

const ConferenceShortSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('startTime', 'startTime', args(), scalar('Date')),
            field('iceServers', 'iceServers', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('urls', 'urls', args(), notNull(list(notNull(scalar('String'))))),
                    field('username', 'username', args(), scalar('String')),
                    field('credential', 'credential', args(), scalar('String'))
                )))))
        );

const DialogMessageSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('date', 'date', args(), notNull(scalar('Date'))),
            field('sender', 'sender', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('name', 'name', args(), notNull(scalar('String'))),
                    field('photo', 'photo', args(), scalar('String')),
                    field('firstName', 'firstName', args(), notNull(scalar('String')))
                ))),
            field('message', 'message', args(), scalar('String')),
            field('fallback', 'fallback', args(), notNull(scalar('String'))),
            inline('GeneralMessage', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('quotedMessages', 'quotedMessages', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )))))
            ))
        );

const DialogFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('cid', 'cid', args(), notNull(scalar('ID'))),
            field('fid', 'fid', args(), notNull(scalar('ID'))),
            field('kind', 'kind', args(), notNull(scalar('String'))),
            field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
            field('isPremium', 'isPremium', args(), notNull(scalar('Boolean'))),
            field('title', 'title', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), notNull(scalar('String'))),
            field('unreadCount', 'unreadCount', args(), notNull(scalar('Int'))),
            field('isMuted', 'isMuted', args(), notNull(scalar('Boolean'))),
            field('haveMention', 'haveMention', args(), notNull(scalar('Boolean'))),
            field('alphaTopMessage', 'topMessage', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('ModernMessage', DialogMessageSelector)
                )),
            field('membership', 'membership', args(), notNull(scalar('String')))
        );

const DialogUpdateFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('DialogMessageReceived', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('unread', 'unread', args(), notNull(scalar('Int'))),
                field('globalUnread', 'globalUnread', args(), notNull(scalar('Int'))),
                field('alphaMessage', 'message', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', DialogMessageSelector),
                        inline('ServiceMessage', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('serviceMetadata', 'serviceMetadata', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String')))
                                ))
                        ))
                    ))),
                field('haveMention', 'haveMention', args(), notNull(scalar('Boolean'))),
                field('silent', 'silent', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('mobile', 'mobile', args(), notNull(scalar('Boolean'))),
                        field('desktop', 'desktop', args(), notNull(scalar('Boolean')))
                    ))),
                field('showNotification', 'showNotification', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('mobile', 'mobile', args(), notNull(scalar('Boolean'))),
                        field('desktop', 'desktop', args(), notNull(scalar('Boolean')))
                    ))),
                field('membership', 'membership', args(), notNull(scalar('String')))
            )),
            inline('DialogMessageUpdated', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('alphaMessage', 'message', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', DialogMessageSelector)
                    ))),
                field('haveMention', 'haveMention', args(), notNull(scalar('Boolean')))
            )),
            inline('DialogMessageDeleted', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('alphaMessage', 'message', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', DialogMessageSelector)
                    ))),
                field('alphaPrevMessage', 'prevMessage', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', DialogMessageSelector)
                    )),
                field('unread', 'unread', args(), notNull(scalar('Int'))),
                field('globalUnread', 'globalUnread', args(), notNull(scalar('Int'))),
                field('haveMention', 'haveMention', args(), notNull(scalar('Boolean')))
            )),
            inline('DialogMessageRead', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('mid', 'mid', args(), scalar('ID')),
                field('unread', 'unread', args(), notNull(scalar('Int'))),
                field('globalUnread', 'globalUnread', args(), notNull(scalar('Int'))),
                field('haveMention', 'haveMention', args(), notNull(scalar('Boolean')))
            )),
            inline('DialogMuteChanged', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('mute', 'mute', args(), notNull(scalar('Boolean')))
            )),
            inline('DialogPeerUpdated', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('peer', 'peer', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        inline('PrivateRoom', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('user', 'user', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('name', 'name', args(), notNull(scalar('String'))),
                                    field('photo', 'photo', args(), scalar('String'))
                                )))
                        )),
                        inline('SharedRoom', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('title', 'title', args(), notNull(scalar('String'))),
                            field('photo', 'photo', args(), notNull(scalar('String')))
                        ))
                    )))
            )),
            inline('DialogDeleted', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('globalUnread', 'globalUnread', args(), notNull(scalar('Int')))
            )),
            inline('DialogBump', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('globalUnread', 'globalUnread', args(), notNull(scalar('Int'))),
                field('unread', 'unread', args(), notNull(scalar('Int'))),
                field('topMessage', 'topMessage', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', DialogMessageSelector),
                        inline('ServiceMessage', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('serviceMetadata', 'serviceMetadata', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String')))
                                ))
                        ))
                    )),
                field('haveMention', 'haveMention', args(), notNull(scalar('Boolean'))),
                field('membership', 'membership', args(), notNull(scalar('String')))
            ))
        );

const DiscoverSharedRoomSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('kind', 'kind', args(), notNull(scalar('String'))),
            field('title', 'title', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), notNull(scalar('String'))),
            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
            field('membership', 'membership', args(), notNull(scalar('String'))),
            field('organization', 'organization', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('name', 'name', args(), notNull(scalar('String'))),
                    field('photo', 'photo', args(), scalar('String'))
                )),
            field('premiumSettings', 'premiumSettings', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('price', 'price', args(), notNull(scalar('Int'))),
                    field('interval', 'interval', args(), scalar('String'))
                )),
            field('isPremium', 'isPremium', args(), notNull(scalar('Boolean'))),
            field('premiumPassIsActive', 'premiumPassIsActive', args(), notNull(scalar('Boolean')))
        );

const DiscoverChatsCollectionSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('title', 'title', args(), notNull(scalar('String'))),
            field('chatsCount', 'chatsCount', args(), notNull(scalar('Int'))),
            field('chats', 'chats', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('SharedRoom', DiscoverSharedRoomSelector)
                ))))),
            field('image', 'image', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('uuid', 'uuid', args(), notNull(scalar('String'))),
                    field('crop', 'crop', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('x', 'x', args(), notNull(scalar('Int'))),
                            field('y', 'y', args(), notNull(scalar('Int'))),
                            field('w', 'w', args(), notNull(scalar('Int'))),
                            field('h', 'h', args(), notNull(scalar('Int')))
                        ))
                )))
        );

const DiscoverChatsCollectionShortSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('title', 'title', args(), notNull(scalar('String'))),
            field('chatsCount', 'chatsCount', args(), notNull(scalar('Int'))),
            field('image', 'image', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('uuid', 'uuid', args(), notNull(scalar('String'))),
                    field('crop', 'crop', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('x', 'x', args(), notNull(scalar('Int'))),
                            field('y', 'y', args(), notNull(scalar('Int'))),
                            field('w', 'w', args(), notNull(scalar('Int'))),
                            field('h', 'h', args(), notNull(scalar('Int')))
                        ))
                )))
        );

const FeedChannelFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('title', 'title', args(), notNull(scalar('String'))),
            field('about', 'about', args(), scalar('String')),
            field('photo', 'photo', args(), scalar('String')),
            field('subscribed', 'subscribed', args(), notNull(scalar('Boolean'))),
            field('myRole', 'myRole', args(), notNull(scalar('String'))),
            field('subscribersCount', 'subscribersCount', args(), notNull(scalar('Int'))),
            field('shortname', 'shortname', args(), scalar('String')),
            field('isGlobal', 'isGlobal', args(), notNull(scalar('Boolean'))),
            field('socialImage', 'socialImage', args(), scalar('String')),
            field('postsCount', 'postsCount', args(), notNull(scalar('Int')))
        );

const FeedPostAuthorFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('User', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                fragment('User', UserShortSelector)
            ))
        );

const FeedPostSourceFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('FeedChannel', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                fragment('FeedChannel', FeedChannelFullSelector)
            ))
        );

const SlideFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('TextSlide', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('text', 'text', args(), notNull(scalar('String'))),
                field('spans', 'spans', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('MessageSpan', SpanFragmentSelector)
                    ))))),
                field('cover', 'cover', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('url', 'url', args(), notNull(scalar('String'))),
                        field('metadata', 'metadata', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('name', 'name', args(), notNull(scalar('String'))),
                                field('mimeType', 'mimeType', args(), scalar('String')),
                                field('size', 'size', args(), notNull(scalar('Int'))),
                                field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                field('imageWidth', 'imageWidth', args(), scalar('Int')),
                                field('imageHeight', 'imageHeight', args(), scalar('Int')),
                                field('imageFormat', 'imageFormat', args(), scalar('String'))
                            ))
                    )),
                field('coverAlign', 'coverAlign', args(), scalar('String')),
                field('attachments', 'attachments', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        inline('User', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        )),
                        inline('SharedRoom', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('kind', 'kind', args(), notNull(scalar('String'))),
                            field('title', 'title', args(), notNull(scalar('String'))),
                            field('photo', 'roomPhoto', args(), notNull(scalar('String'))),
                            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                            field('membership', 'membership', args(), notNull(scalar('String'))),
                            field('canSendMessage', 'canSendMessage', args(), notNull(scalar('Boolean'))),
                            field('organization', 'organization', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('name', 'name', args(), notNull(scalar('String'))),
                                    field('photo', 'photo', args(), scalar('String'))
                                ))
                        )),
                        inline('Organization', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('Organization', OrganizationShortSelector)
                        ))
                    )))))
            ))
        );

const FeedItemFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('FeedPost', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('date', 'date', args(), notNull(scalar('Date'))),
                field('author', 'author', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('FeedPostAuthor', FeedPostAuthorFragmentSelector)
                    ))),
                field('source', 'source', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('FeedPostSource', FeedPostSourceFragmentSelector)
                    )),
                field('edited', 'edited', args(), notNull(scalar('Boolean'))),
                field('canEdit', 'canEdit', args(), notNull(scalar('Boolean'))),
                field('commentsCount', 'commentsCount', args(), notNull(scalar('Int'))),
                field('message', 'message', args(), scalar('String')),
                field('fallback', 'fallback', args(), notNull(scalar('String'))),
                field('reactions', 'reactions', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('user', 'user', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserShortSelector)
                            ))),
                        field('reaction', 'reaction', args(), notNull(scalar('String')))
                    ))))),
                field('slides', 'slides', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Slide', SlideFragmentSelector)
                    )))))
            ))
        );

const FeedUpdateFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('FeedItemReceived', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('item', 'item', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('FeedItem', FeedItemFullSelector)
                    )))
            )),
            inline('FeedItemUpdated', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('item', 'item', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('FeedItem', FeedItemFullSelector)
                    )))
            )),
            inline('FeedItemDeleted', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('item', 'item', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('FeedItem', FeedItemFullSelector)
                    )))
            )),
            inline('FeedRebuildNeeded', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('homeFeed', 'feed', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('items', 'items', args(), notNull(list(notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('FeedItem', FeedItemFullSelector)
                            ))))),
                        field('cursor', 'cursor', args(), scalar('String'))
                    )))
            ))
        );

const NotificationFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('text', 'text', args(), scalar('String')),
            field('content', 'content', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('NewCommentNotification', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('comment', 'comment', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('CommentEntry', CommentEntryFragmentSelector)
                            ))),
                        field('peer', 'peer', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('peerRoot', 'peerRoot', args(), notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        inline('CommentPeerRootMessage', obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('message', 'message', args(), notNull(obj(
                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                    inline('GeneralMessage', obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                                        field('fallback', 'fallback', args(), notNull(scalar('String'))),
                                                        field('message', 'message', args(), scalar('String')),
                                                        field('sender', 'sender', args(), notNull(obj(
                                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                                field('id', 'id', args(), notNull(scalar('ID'))),
                                                                field('name', 'name', args(), notNull(scalar('String')))
                                                            ))),
                                                        field('senderBadge', 'senderBadge', args(), obj(
                                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                                fragment('UserBadge', UserBadgeSelector)
                                                            ))
                                                    ))
                                                ))),
                                            field('chat', 'chat', args(), notNull(obj(
                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                    fragment('Room', RoomNanoSelector)
                                                )))
                                        )),
                                        inline('CommentPeerRootFeedItem', obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('item', 'item', args(), notNull(obj(
                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                    fragment('FeedItem', FeedItemFullSelector)
                                                )))
                                        ))
                                    ))),
                                field('subscription', 'subscription', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('type', 'type', args(), scalar('String'))
                                    ))
                            )))
                    )),
                    inline('NewMatchmakingProfilesNotification', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('room', 'room', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('peer', 'peer', args(), notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        inline('SharedRoom', obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            fragment('Room', RoomNanoSelector)
                                        ))
                                    )))
                            ))),
                        field('profiles', 'profiles', args(), notNull(list(notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('MatchmakingProfile', MatchmakingProfileFragmentSelector)
                            )))))
                    ))
                )))))
        );

const NotificationCenterUpdateFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('NotificationReceived', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('center', 'center', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('unread', 'unread', args(), notNull(scalar('Int')))
                    ))),
                field('notification', 'notification', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Notification', NotificationFragmentSelector)
                    )))
            )),
            inline('NotificationUpdated', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('center', 'center', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('unread', 'unread', args(), notNull(scalar('Int')))
                    ))),
                field('notification', 'notification', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Notification', NotificationFragmentSelector)
                    )))
            )),
            inline('NotificationDeleted', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('center', 'center', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('unread', 'unread', args(), notNull(scalar('Int')))
                    ))),
                field('notification', 'notification', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )))
            )),
            inline('NotificationRead', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('center', 'center', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('unread', 'unread', args(), notNull(scalar('Int')))
                    )))
            )),
            inline('NotificationContentUpdated', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('content', 'content', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        inline('UpdatedNotificationContentComment', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('peer', 'peer', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('peerRoot', 'peerRoot', args(), notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            inline('CommentPeerRootMessage', obj(
                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                field('message', 'message', args(), notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        inline('GeneralMessage', obj(
                                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                            field('id', 'id', args(), notNull(scalar('ID'))),
                                                            field('fallback', 'fallback', args(), notNull(scalar('String'))),
                                                            field('message', 'message', args(), scalar('String')),
                                                            field('sender', 'sender', args(), notNull(obj(
                                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                                                    field('name', 'name', args(), notNull(scalar('String')))
                                                                ))),
                                                            field('senderBadge', 'senderBadge', args(), obj(
                                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                                    fragment('UserBadge', UserBadgeSelector)
                                                                ))
                                                        ))
                                                    ))),
                                                field('chat', 'chat', args(), notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        fragment('Room', RoomNanoSelector)
                                                    )))
                                            )),
                                            inline('CommentPeerRootFeedItem', obj(
                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                field('item', 'item', args(), notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        fragment('FeedItem', FeedItemFullSelector)
                                                    )))
                                            ))
                                        ))),
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('subscription', 'subscription', args(), obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('type', 'type', args(), scalar('String'))
                                        ))
                                ))),
                            field('comment', 'comment', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('CommentEntry', CommentEntryFragmentSelector)
                                ))
                        ))
                    )))
            ))
        );

const UserFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('firstName', 'firstName', args(), notNull(scalar('String'))),
            field('lastName', 'lastName', args(), scalar('String')),
            field('photo', 'photo', args(), scalar('String')),
            field('phone', 'phone', args(), scalar('String')),
            field('email', 'email', args(), scalar('String')),
            field('website', 'website', args(), scalar('String')),
            field('about', 'about', args(), scalar('String')),
            field('location', 'location', args(), scalar('String')),
            field('isBot', 'isBot', args(), notNull(scalar('Boolean'))),
            field('isYou', 'isYou', args(), notNull(scalar('Boolean'))),
            field('online', 'online', args(), notNull(scalar('Boolean'))),
            field('lastSeen', 'lastSeen', args(), scalar('String')),
            field('linkedin', 'linkedin', args(), scalar('String')),
            field('instagram', 'instagram', args(), scalar('String')),
            field('twitter', 'twitter', args(), scalar('String')),
            field('facebook', 'facebook', args(), scalar('String')),
            field('shortname', 'shortname', args(), scalar('String')),
            field('audienceSize', 'audienceSize', args(), notNull(scalar('Int'))),
            field('primaryOrganization', 'primaryOrganization', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Organization', OrganizationShortSelector)
                ))
        );

const OrganizationFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('superAccountId', 'superAccountId', args(), notNull(scalar('ID'))),
            field('isMine', 'isMine', args(), notNull(scalar('Boolean'))),
            field('alphaIsPrivate', 'isPrivate', args(), notNull(scalar('Boolean'))),
            field('betaIsOwner', 'isOwner', args(), notNull(scalar('Boolean'))),
            field('betaIsAdmin', 'isAdmin', args(), notNull(scalar('Boolean'))),
            field('alphaFeatured', 'featured', args(), notNull(scalar('Boolean'))),
            field('alphaIsCommunity', 'isCommunity', args(), notNull(scalar('Boolean'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('shortname', 'shortname', args(), scalar('String')),
            field('website', 'website', args(), scalar('String')),
            field('about', 'about', args(), scalar('String')),
            field('twitter', 'twitter', args(), scalar('String')),
            field('facebook', 'facebook', args(), scalar('String')),
            field('linkedin', 'linkedin', args(), scalar('String')),
            field('instagram', 'instagram', args(), scalar('String')),
            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
            field('alphaOrganizationMembers', 'members', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('role', 'role', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserFullSelector)
                        )))
                ))))),
            field('alphaOrganizationMemberRequests', 'requests', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('role', 'role', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserFullSelector)
                        )))
                )))))
        );

const OrganizationMediumSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('isMine', 'isMine', args(), notNull(scalar('Boolean'))),
            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
            field('shortname', 'shortname', args(), scalar('String')),
            field('about', 'about', args(), scalar('String')),
            field('betaIsOwner', 'isOwner', args(), notNull(scalar('Boolean'))),
            field('betaIsAdmin', 'isAdmin', args(), notNull(scalar('Boolean'))),
            field('alphaIsCommunity', 'isCommunity', args(), notNull(scalar('Boolean')))
        );

const OrganizationProfileFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photoRef', 'photoRef', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('uuid', 'uuid', args(), notNull(scalar('String'))),
                    field('crop', 'crop', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('x', 'x', args(), notNull(scalar('Int'))),
                            field('y', 'y', args(), notNull(scalar('Int'))),
                            field('w', 'w', args(), notNull(scalar('Int'))),
                            field('h', 'h', args(), notNull(scalar('Int')))
                        ))
                )),
            field('website', 'website', args(), scalar('String')),
            field('websiteTitle', 'websiteTitle', args(), scalar('String')),
            field('about', 'about', args(), scalar('String')),
            field('twitter', 'twitter', args(), scalar('String')),
            field('facebook', 'facebook', args(), scalar('String')),
            field('linkedin', 'linkedin', args(), scalar('String')),
            field('instagram', 'instagram', args(), scalar('String')),
            field('shortname', 'shortname', args(), scalar('String')),
            field('alphaIsPrivate', 'private', args(), notNull(scalar('Boolean'))),
            field('alphaFeatured', 'featured', args(), notNull(scalar('Boolean'))),
            field('alphaPublished', 'published', args(), notNull(scalar('Boolean'))),
            field('alphaEditorial', 'editorial', args(), notNull(scalar('Boolean')))
        );

const OrganizationSearchSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('superAccountId', 'superAccountId', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('isMine', 'isMine', args(), notNull(scalar('Boolean'))),
            field('about', 'about', args(), scalar('String')),
            field('status', 'status', args(), notNull(scalar('String'))),
            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
            field('alphaFeatured', 'featured', args(), notNull(scalar('Boolean'))),
            field('alphaOrganizationMembers', 'members', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('name', 'name', args(), notNull(scalar('String'))),
                            field('photo', 'photo', args(), scalar('String'))
                        )))
                )))))
        );

const OrganizationWithoutMembersFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('superAccountId', 'superAccountId', args(), notNull(scalar('ID'))),
            field('isMine', 'isMine', args(), notNull(scalar('Boolean'))),
            field('alphaIsPrivate', 'isPrivate', args(), notNull(scalar('Boolean'))),
            field('betaIsOwner', 'isOwner', args(), notNull(scalar('Boolean'))),
            field('betaIsAdmin', 'isAdmin', args(), notNull(scalar('Boolean'))),
            field('alphaFeatured', 'featured', args(), notNull(scalar('Boolean'))),
            field('alphaIsCommunity', 'isCommunity', args(), notNull(scalar('Boolean'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('shortname', 'shortname', args(), scalar('String')),
            field('website', 'website', args(), scalar('String')),
            field('about', 'about', args(), scalar('String')),
            field('twitter', 'twitter', args(), scalar('String')),
            field('facebook', 'facebook', args(), scalar('String')),
            field('linkedin', 'linkedin', args(), scalar('String')),
            field('instagram', 'instagram', args(), scalar('String')),
            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
            field('alphaOrganizationMemberRequests', 'requests', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('role', 'role', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserFullSelector)
                        )))
                ))))),
            field('betaPublicRoomsCount', 'roomsCount', args(), notNull(scalar('Int')))
        );

const PlatformNotificationSettingsFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('direct', 'direct', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('showNotification', 'showNotification', args(), notNull(scalar('Boolean'))),
                    field('sound', 'sound', args(), notNull(scalar('Boolean')))
                ))),
            field('secretChat', 'secretChat', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('showNotification', 'showNotification', args(), notNull(scalar('Boolean'))),
                    field('sound', 'sound', args(), notNull(scalar('Boolean')))
                ))),
            field('organizationChat', 'organizationChat', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('showNotification', 'showNotification', args(), notNull(scalar('Boolean'))),
                    field('sound', 'sound', args(), notNull(scalar('Boolean')))
                ))),
            field('communityChat', 'communityChat', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('showNotification', 'showNotification', args(), notNull(scalar('Boolean'))),
                    field('sound', 'sound', args(), notNull(scalar('Boolean')))
                ))),
            field('comments', 'comments', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('showNotification', 'showNotification', args(), notNull(scalar('Boolean'))),
                    field('sound', 'sound', args(), notNull(scalar('Boolean')))
                ))),
            field('notificationPreview', 'notificationPreview', args(), notNull(scalar('String')))
        );

const RoomFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('PrivateRoom', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('user', 'user', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('User', UserShortSelector)
                    ))),
                field('settings', 'settings', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('mute', 'mute', args(), scalar('Boolean'))
                    ))),
                field('pinnedMessage', 'pinnedMessage', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', FullMessageSelector)
                    )),
                field('myBadge', 'myBadge', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('UserBadge', UserBadgeSelector)
                    ))
            )),
            inline('SharedRoom', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('kind', 'kind', args(), notNull(scalar('String'))),
                field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                field('title', 'title', args(), notNull(scalar('String'))),
                field('photo', 'photo', args(), notNull(scalar('String'))),
                field('socialImage', 'socialImage', args(), scalar('String')),
                field('description', 'description', args(), scalar('String')),
                field('shortname', 'shortname', args(), scalar('String')),
                field('organization', 'organization', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Organization', OrganizationMediumSelector)
                    )),
                field('membership', 'membership', args(), notNull(scalar('String'))),
                field('role', 'role', args(), notNull(scalar('String'))),
                field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                field('featuredMembersCount', 'featuredMembersCount', args(), notNull(scalar('Int'))),
                field('onlineMembersCount', 'onlineMembersCount', args(), notNull(scalar('Int'))),
                field('previewMembers', 'previewMembers', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('photo', 'photo', args(), scalar('String')),
                        field('name', 'name', args(), notNull(scalar('String')))
                    ))))),
                field('members', 'members', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('role', 'role', args(), notNull(scalar('String'))),
                        field('membership', 'membership', args(), notNull(scalar('String'))),
                        field('user', 'user', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserShortSelector)
                            ))),
                        field('canKick', 'canKick', args(), notNull(scalar('Boolean'))),
                        field('badge', 'badge', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('UserBadge', UserBadgeSelector)
                            ))
                    ))))),
                field('requests', 'requests', args(), list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('user', 'user', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserShortSelector)
                            )))
                    )))),
                field('settings', 'settings', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('mute', 'mute', args(), scalar('Boolean'))
                    ))),
                field('canEdit', 'canEdit', args(), notNull(scalar('Boolean'))),
                field('canSendMessage', 'canSendMessage', args(), notNull(scalar('Boolean'))),
                field('welcomeMessage', 'welcomeMessage', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('isOn', 'isOn', args(), notNull(scalar('Boolean'))),
                        field('sender', 'sender', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('name', 'name', args(), notNull(scalar('String')))
                            )),
                        field('message', 'message', args(), scalar('String'))
                    )),
                field('matchmaking', 'matchmaking', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('MatchmakingRoom', MatchmakingRoomFragmentSelector)
                    )),
                field('pinnedMessage', 'pinnedMessage', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', FullMessageSelector)
                    )),
                field('myBadge', 'myBadge', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('UserBadge', UserBadgeSelector)
                    )),
                field('isPremium', 'isPremium', args(), notNull(scalar('Boolean'))),
                field('premiumPassIsActive', 'premiumPassIsActive', args(), notNull(scalar('Boolean'))),
                field('premiumSubscription', 'premiumSubscription', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('state', 'state', args(), notNull(scalar('String')))
                    )),
                field('premiumSettings', 'premiumSettings', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('price', 'price', args(), notNull(scalar('Int'))),
                        field('interval', 'interval', args(), scalar('String'))
                    )),
                field('owner', 'owner', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('firstName', 'firstName', args(), notNull(scalar('String')))
                    ))
            ))
        );

const RoomFullWithoutMembersSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('PrivateRoom', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('user', 'user', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('User', UserShortSelector)
                    ))),
                field('settings', 'settings', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('mute', 'mute', args(), scalar('Boolean'))
                    ))),
                field('myBadge', 'myBadge', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('UserBadge', UserBadgeSelector)
                    ))
            )),
            inline('SharedRoom', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('kind', 'kind', args(), notNull(scalar('String'))),
                field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                field('isPremium', 'isPremium', args(), notNull(scalar('Boolean'))),
                field('title', 'title', args(), notNull(scalar('String'))),
                field('photo', 'photo', args(), notNull(scalar('String'))),
                field('socialImage', 'socialImage', args(), scalar('String')),
                field('description', 'description', args(), scalar('String')),
                field('shortname', 'shortname', args(), scalar('String')),
                field('organization', 'organization', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Organization', OrganizationMediumSelector)
                    )),
                field('membership', 'membership', args(), notNull(scalar('String'))),
                field('role', 'role', args(), notNull(scalar('String'))),
                field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                field('featuredMembersCount', 'featuredMembersCount', args(), notNull(scalar('Int'))),
                field('settings', 'settings', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('mute', 'mute', args(), scalar('Boolean'))
                    ))),
                field('matchmaking', 'matchmaking', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('MatchmakingRoom', MatchmakingRoomFragmentSelector)
                    )),
                field('canEdit', 'canEdit', args(), notNull(scalar('Boolean'))),
                field('canSendMessage', 'canSendMessage', args(), notNull(scalar('Boolean'))),
                field('welcomeMessage', 'welcomeMessage', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('isOn', 'isOn', args(), notNull(scalar('Boolean'))),
                        field('sender', 'sender', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('name', 'name', args(), notNull(scalar('String')))
                            )),
                        field('message', 'message', args(), scalar('String'))
                    )),
                field('pinnedMessage', 'pinnedMessage', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', FullMessageSelector)
                    )),
                field('myBadge', 'myBadge', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('UserBadge', UserBadgeSelector)
                    )),
                field('isPremium', 'isPremium', args(), notNull(scalar('Boolean'))),
                field('premiumPassIsActive', 'premiumPassIsActive', args(), notNull(scalar('Boolean'))),
                field('premiumSubscription', 'premiumSubscription', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('state', 'state', args(), notNull(scalar('String')))
                    )),
                field('premiumSettings', 'premiumSettings', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('price', 'price', args(), notNull(scalar('Int'))),
                        field('interval', 'interval', args(), scalar('String'))
                    )),
                field('owner', 'owner', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('firstName', 'firstName', args(), notNull(scalar('String')))
                    ))
            ))
        );

const RoomPreviewSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('PrivateRoom', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('user', 'user', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('User', UserShortSelector)
                    )))
            )),
            inline('SharedRoom', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                field('isPremium', 'isPremium', args(), notNull(scalar('Boolean'))),
                field('premiumPassIsActive', 'premiumPassIsActive', args(), notNull(scalar('Boolean'))),
                field('premiumSubscription', 'premiumSubscription', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('state', 'state', args(), notNull(scalar('String')))
                    )),
                field('premiumSettings', 'premiumSettings', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('price', 'price', args(), notNull(scalar('Int'))),
                        field('interval', 'interval', args(), scalar('String'))
                    )),
                field('membership', 'membership', args(), notNull(scalar('String'))),
                field('owner', 'owner', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )),
                field('matchmaking', 'matchmaking', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('enabled', 'enabled', args(), notNull(scalar('Boolean')))
                    )),
                field('title', 'title', args(), notNull(scalar('String'))),
                field('photo', 'photo', args(), notNull(scalar('String'))),
                field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                field('description', 'description', args(), scalar('String')),
                field('previewMembers', 'previewMembers', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('name', 'name', args(), notNull(scalar('String'))),
                        field('photo', 'photo', args(), scalar('String'))
                    ))))),
                field('onlineMembersCount', 'onlineMembersCount', args(), notNull(scalar('Int')))
            ))
        );

const SessionStateFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('isLoggedIn', 'isLoggedIn', args(), notNull(scalar('Boolean'))),
            field('isActivated', 'isActivated', args(), notNull(scalar('Boolean'))),
            field('isProfileCreated', 'isProfileCreated', args(), notNull(scalar('Boolean'))),
            field('isAccountActivated', 'isAccountActivated', args(), notNull(scalar('Boolean'))),
            field('isAccountExists', 'isAccountExists', args(), notNull(scalar('Boolean'))),
            field('isAccountPicked', 'isAccountPicked', args(), notNull(scalar('Boolean'))),
            field('isCompleted', 'isCompleted', args(), notNull(scalar('Boolean'))),
            field('isBlocked', 'isBlocked', args(), notNull(scalar('Boolean')))
        );

const SettingsFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('primaryEmail', 'primaryEmail', args(), notNull(scalar('String'))),
            field('emailFrequency', 'emailFrequency', args(), notNull(scalar('String'))),
            field('excludeMutedChats', 'excludeMutedChats', args(), notNull(scalar('Boolean'))),
            field('countUnreadChats', 'countUnreadChats', args(), notNull(scalar('Boolean'))),
            field('desktop', 'desktop', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('PlatformNotificationSettings', PlatformNotificationSettingsFullSelector)
                ))),
            field('mobile', 'mobile', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('PlatformNotificationSettings', PlatformNotificationSettingsFullSelector)
                )))
        );

const SharedRoomViewSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('title', 'title', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), notNull(scalar('String'))),
            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
            field('photo', 'photo', args(), notNull(scalar('String')))
        );

const StickerPackFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('title', 'title', args(), notNull(scalar('String'))),
            field('stickers', 'stickers', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Sticker', StickerFragmentSelector)
                )))))
        );

const TinyMessageSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('date', 'date', args(), notNull(scalar('Date'))),
            field('sender', 'sender', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('User', UserTinySelector)
                ))),
            field('senderBadge', 'senderBadge', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('UserBadge', UserBadgeSelector)
                )),
            field('message', 'message', args(), scalar('String')),
            field('fallback', 'fallback', args(), notNull(scalar('String'))),
            inline('GeneralMessage', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('overrideName', 'overrideName', args(), scalar('String')),
                field('overrideAvatar', 'overrideAvatar', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('uuid', 'uuid', args(), notNull(scalar('String'))),
                        field('crop', 'crop', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('x', 'x', args(), notNull(scalar('Int'))),
                                field('y', 'y', args(), notNull(scalar('Int'))),
                                field('w', 'w', args(), notNull(scalar('Int'))),
                                field('h', 'h', args(), notNull(scalar('Int')))
                            ))
                    )),
                field('isMentioned', 'isMentioned', args(), notNull(scalar('Boolean'))),
                field('commentsCount', 'commentsCount', args(), notNull(scalar('Int'))),
                field('attachments', 'attachments', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('fallback', 'fallback', args(), notNull(scalar('String'))),
                        inline('MessageAttachmentFile', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('fileId', 'fileId', args(), notNull(scalar('String'))),
                            field('fileMetadata', 'fileMetadata', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                    field('imageFormat', 'imageFormat', args(), scalar('String'))
                                ))),
                            field('filePreview', 'filePreview', args(), scalar('String'))
                        ))
                    ))))),
                field('quotedMessages', 'quotedMessages', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )))))
            ))
        );

const UserNanoSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('firstName', 'firstName', args(), notNull(scalar('String'))),
            field('lastName', 'lastName', args(), scalar('String')),
            field('photo', 'photo', args(), scalar('String')),
            field('online', 'online', args(), notNull(scalar('Boolean')))
        );

const WalletTransactionFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('status', 'status', args(), notNull(scalar('String'))),
            field('date', 'date', args(), notNull(scalar('String'))),
            field('operation', 'operation', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('WalletTransactionDeposit', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('amount', 'amount', args(), notNull(scalar('Int'))),
                        field('payment', 'payment', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('status', 'status', args(), notNull(scalar('String'))),
                                field('card', 'card', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('brand', 'brand', args(), notNull(scalar('String'))),
                                        field('last4', 'last4', args(), notNull(scalar('String')))
                                    )),
                                field('intent', 'intent', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('clientSecret', 'clientSecret', args(), notNull(scalar('String')))
                                    ))
                            ))
                    )),
                    inline('WalletTransactionIncome', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('amount', 'amount', args(), notNull(scalar('Int'))),
                        field('payment', 'payment', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('status', 'status', args(), notNull(scalar('String'))),
                                field('card', 'card', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('brand', 'brand', args(), notNull(scalar('String'))),
                                        field('last4', 'last4', args(), notNull(scalar('String')))
                                    )),
                                field('intent', 'intent', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('clientSecret', 'clientSecret', args(), notNull(scalar('String')))
                                    ))
                            )),
                        field('source', 'source', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                inline('WalletSubscription', obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('product', 'product', args(), notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            inline('WalletProductGroup', obj(
                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                field('group', 'group', args(), notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                                        field('title', 'title', args(), notNull(scalar('String'))),
                                                        field('photo', 'photo', args(), notNull(scalar('String')))
                                                    )))
                                            )),
                                            inline('WalletProductDonation', obj(
                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                field('user', 'user', args(), notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                                        field('name', 'name', args(), notNull(scalar('String'))),
                                                        field('photo', 'photo', args(), scalar('String'))
                                                    )))
                                            ))
                                        )))
                                )),
                                inline('Purchase', obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('product', 'product', args(), notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            inline('WalletProductGroup', obj(
                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                field('group', 'group', args(), notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                                        field('title', 'title', args(), notNull(scalar('String'))),
                                                        field('photo', 'photo', args(), notNull(scalar('String')))
                                                    )))
                                            )),
                                            inline('WalletProductDonation', obj(
                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                field('user', 'user', args(), notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                                        field('name', 'name', args(), notNull(scalar('String'))),
                                                        field('photo', 'photo', args(), scalar('String'))
                                                    )))
                                            ))
                                        )))
                                ))
                            ))
                    )),
                    inline('WalletTransactionTransferIn', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('amount', 'amount', args(), notNull(scalar('Int'))),
                        field('payment', 'payment', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('status', 'status', args(), notNull(scalar('String'))),
                                field('card', 'card', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('brand', 'brand', args(), notNull(scalar('String'))),
                                        field('last4', 'last4', args(), notNull(scalar('String')))
                                    )),
                                field('intent', 'intent', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('clientSecret', 'clientSecret', args(), notNull(scalar('String')))
                                    ))
                            )),
                        field('fromUser', 'fromUser', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserShortSelector)
                            )))
                    )),
                    inline('WalletTransactionTransferOut', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('amount', 'amount', args(), notNull(scalar('Int'))),
                        field('walletAmount', 'walletAmount', args(), notNull(scalar('Int'))),
                        field('chargeAmount', 'chargeAmount', args(), notNull(scalar('Int'))),
                        field('payment', 'payment', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('status', 'status', args(), notNull(scalar('String'))),
                                field('card', 'card', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('brand', 'brand', args(), notNull(scalar('String'))),
                                        field('last4', 'last4', args(), notNull(scalar('String')))
                                    )),
                                field('intent', 'intent', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('clientSecret', 'clientSecret', args(), notNull(scalar('String')))
                                    ))
                            )),
                        field('toUser', 'toUser', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserShortSelector)
                            )))
                    )),
                    inline('WalletTransactionSubscription', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('amount', 'amount', args(), notNull(scalar('Int'))),
                        field('walletAmount', 'walletAmount', args(), notNull(scalar('Int'))),
                        field('chargeAmount', 'chargeAmount', args(), notNull(scalar('Int'))),
                        field('subscription', 'subscription', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('interval', 'interval', args(), notNull(scalar('String'))),
                                field('amount', 'amount', args(), notNull(scalar('Int'))),
                                field('product', 'product', args(), notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        inline('WalletProductGroup', obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('group', 'group', args(), notNull(obj(
                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                                    field('title', 'title', args(), notNull(scalar('String'))),
                                                    field('photo', 'photo', args(), notNull(scalar('String')))
                                                )))
                                        )),
                                        inline('WalletProductDonation', obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('user', 'user', args(), notNull(obj(
                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                                    field('name', 'name', args(), notNull(scalar('String'))),
                                                    field('photo', 'photo', args(), scalar('String'))
                                                )))
                                        ))
                                    )))
                            ))),
                        field('payment', 'payment', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('status', 'status', args(), notNull(scalar('String'))),
                                field('intent', 'intent', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('clientSecret', 'clientSecret', args(), notNull(scalar('String')))
                                    )),
                                field('card', 'card', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('brand', 'brand', args(), notNull(scalar('String'))),
                                        field('last4', 'last4', args(), notNull(scalar('String')))
                                    ))
                            ))
                    )),
                    inline('WalletTransactionPurchase', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('amount', 'amount', args(), notNull(scalar('Int'))),
                        field('walletAmount', 'walletAmount', args(), notNull(scalar('Int'))),
                        field('chargeAmount', 'chargeAmount', args(), notNull(scalar('Int'))),
                        field('purchase', 'purchase', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('product', 'product', args(), notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        inline('WalletProductGroup', obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('group', 'group', args(), notNull(obj(
                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                                    field('title', 'title', args(), notNull(scalar('String'))),
                                                    field('photo', 'photo', args(), notNull(scalar('String')))
                                                )))
                                        )),
                                        inline('WalletProductDonation', obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('user', 'user', args(), notNull(obj(
                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                                    field('name', 'name', args(), notNull(scalar('String'))),
                                                    field('photo', 'photo', args(), scalar('String'))
                                                )))
                                        ))
                                    )))
                            ))),
                        field('payment', 'payment', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('status', 'status', args(), notNull(scalar('String'))),
                                field('intent', 'intent', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('clientSecret', 'clientSecret', args(), notNull(scalar('String')))
                                    )),
                                field('card', 'card', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('brand', 'brand', args(), notNull(scalar('String'))),
                                        field('last4', 'last4', args(), notNull(scalar('String')))
                                    ))
                            ))
                    ))
                )))
        );

const WalletUpdateFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('WalletUpdateBalance', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('amount', 'amount', args(), notNull(scalar('Int')))
            )),
            inline('WalletUpdateLocked', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('isLocked', 'isLocked', args(), notNull(scalar('Boolean'))),
                field('failingPaymentsCount', 'failingPaymentsCount', args(), notNull(scalar('Int')))
            )),
            inline('WalletUpdateTransactionSuccess', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('transaction', 'transaction', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('WalletTransaction', WalletTransactionFragmentSelector)
                    )))
            )),
            inline('WalletUpdateTransactionCanceled', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('transaction', 'transaction', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('WalletTransaction', WalletTransactionFragmentSelector)
                    )))
            )),
            inline('WalletUpdateTransactionPending', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('transaction', 'transaction', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('WalletTransaction', WalletTransactionFragmentSelector)
                    )))
            )),
            inline('WalletUpdatePaymentStatus', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('payment', 'payment', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('status', 'status', args(), notNull(scalar('String'))),
                        field('intent', 'intent', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('clientSecret', 'clientSecret', args(), notNull(scalar('String')))
                            )),
                        field('card', 'card', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('brand', 'brand', args(), notNull(scalar('String'))),
                                field('last4', 'last4', args(), notNull(scalar('String')))
                            ))
                    )))
            ))
        );

const AccountSelector = obj(
            field('me', 'me', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('User', UserShortSelector)
                )),
            field('myProfile', 'myProfile', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('authEmail', 'authEmail', args(), scalar('String'))
                )),
            field('sessionState', 'sessionState', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('SessionState', SessionStateFullSelector)
                ))),
            field('myPermissions', 'myPermissions', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('roles', 'roles', args(), notNull(list(notNull(scalar('String')))))
                )))
        );
const AccountAppInviteSelector = obj(
            field('appInvite', 'invite', args(), notNull(scalar('String')))
        );
const AccountAppInviteInfoSelector = obj(
            field('alphaInviteInfo', 'invite', args(fieldValue("key", refValue('inviteKey'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('creator', 'creator', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        ))
                )),
            field('appInviteInfo', 'appInvite', args(fieldValue("key", refValue('inviteKey'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('inviter', 'inviter', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        )))
                ))
        );
const AccountInviteInfoSelector = obj(
            field('alphaInviteInfo', 'invite', args(fieldValue("key", refValue('inviteKey'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('key', 'key', args(), notNull(scalar('String'))),
                    field('orgId', 'orgId', args(), notNull(scalar('ID'))),
                    field('title', 'title', args(), notNull(scalar('String'))),
                    field('photo', 'photo', args(), scalar('String')),
                    field('joined', 'joined', args(), notNull(scalar('Boolean'))),
                    field('creator', 'creator', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        )),
                    field('forEmail', 'forEmail', args(), scalar('String')),
                    field('forName', 'forName', args(), scalar('String')),
                    field('membersCount', 'membersCount', args(), scalar('Int')),
                    field('organization', 'organization', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('alphaIsCommunity', 'isCommunity', args(), notNull(scalar('Boolean'))),
                            field('about', 'about', args(), scalar('String'))
                        ))
                ))
        );
const AccountSettingsSelector = obj(
            field('me', 'me', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('audienceSize', 'audienceSize', args(), notNull(scalar('Int'))),
                    fragment('User', UserShortSelector)
                )),
            field('myProfile', 'myProfile', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('authEmail', 'authEmail', args(), scalar('String'))
                )),
            field('myOrganizations', 'organizations', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Organization', OrganizationShortSelector)
                )))))
        );
const AuthResolveShortNameSelector = obj(
            field('alphaResolveShortName', 'item', args(fieldValue("shortname", refValue('shortname'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('User', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('User', UserNanoSelector)
                    )),
                    inline('SharedRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Room', RoomPreviewSelector)
                    ))
                ))
        );
const ChatInitSelector = obj(
            field('messages', 'messages', args(fieldValue("chatId", refValue('chatId')), fieldValue("first", refValue('first')), fieldValue("before", refValue('before'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('ModernMessage', FullMessageSelector)
                ))))),
            field('conversationState', 'state', args(fieldValue("id", refValue('chatId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('state', 'state', args(), scalar('String'))
                ))),
            field('room', 'room', args(fieldValue("id", refValue('chatId'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', RoomShortSelector)
                )),
            field('lastReadedMessage', 'lastReadedMessage', args(fieldValue("chatId", refValue('chatId'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                ))
        );
const ChatInitFromUnreadSelector = obj(
            field('gammaMessages', 'gammaMessages', args(fieldValue("chatId", refValue('chatId')), fieldValue("first", refValue('first')), fieldValue("before", refValue('before'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('messages', 'messages', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('ModernMessage', FullMessageSelector)
                        ))))),
                    field('haveMoreForward', 'haveMoreForward', args(), scalar('Boolean')),
                    field('haveMoreBackward', 'haveMoreBackward', args(), scalar('Boolean'))
                )),
            field('conversationState', 'state', args(fieldValue("id", refValue('chatId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('state', 'state', args(), scalar('String'))
                ))),
            field('room', 'room', args(fieldValue("id", refValue('chatId'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', RoomShortSelector)
                )),
            field('lastReadedMessage', 'lastReadedMessage', args(fieldValue("chatId", refValue('chatId'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                ))
        );
const ChatJoinSelector = obj(
            field('room', 'room', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('SharedRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('title', 'title', args(), notNull(scalar('String'))),
                        field('description', 'description', args(), scalar('String')),
                        field('photo', 'photo', args(), notNull(scalar('String'))),
                        field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                        field('onlineMembersCount', 'onlineMembersCount', args(), notNull(scalar('Int'))),
                        field('previewMembers', 'previewMembers', args(), notNull(list(notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('photo', 'photo', args(), scalar('String')),
                                field('name', 'name', args(), notNull(scalar('String')))
                            ))))),
                        field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                        field('isPremium', 'isPremium', args(), notNull(scalar('Boolean'))),
                        field('premiumPassIsActive', 'premiumPassIsActive', args(), notNull(scalar('Boolean'))),
                        field('premiumSubscription', 'premiumSubscription', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('state', 'state', args(), notNull(scalar('String')))
                            )),
                        field('premiumSettings', 'premiumSettings', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('price', 'price', args(), notNull(scalar('Int'))),
                                field('interval', 'interval', args(), scalar('String'))
                            )),
                        field('owner', 'owner', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('firstName', 'firstName', args(), notNull(scalar('String')))
                            ))
                    ))
                ))
        );
const ChatMembersSearchSelector = obj(
            field('chatMembersSearch', 'members', args(fieldValue("cid", refValue('cid')), fieldValue("query", refValue('query')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('node', 'user', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('name', 'name', args(), notNull(scalar('String'))),
                                    field('shortname', 'shortname', args(), scalar('String')),
                                    field('photo', 'photo', args(), scalar('String')),
                                    field('primaryOrganization', 'primaryOrganization', args(), obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('id', 'id', args(), notNull(scalar('ID'))),
                                            field('name', 'name', args(), notNull(scalar('String')))
                                        ))
                                ))),
                            field('cursor', 'cursor', args(), notNull(scalar('String')))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean')))
                        )))
                )))
        );
const ChatMentionSearchSelector = obj(
            field('chatMentionSearch', 'mentions', args(fieldValue("cid", refValue('cid')), fieldValue("query", refValue('query')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('globalItems', 'globalItems', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            inline('Organization', obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('Organization', OrganizationShortSelector)
                            )),
                            inline('User', obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserForMentionSelector)
                            )),
                            inline('SharedRoom', obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('SharedRoom', RoomSharedNanoSelector)
                            ))
                        ))))),
                    field('localItems', 'localItems', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserForMentionSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
        );
const CommentsSelector = obj(
            field('comments', 'comments', args(fieldValue("peerId", refValue('peerId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('state', 'state', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('state', 'state', args(), scalar('String'))
                        ))),
                    field('count', 'count', args(), notNull(scalar('Int'))),
                    field('comments', 'comments', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('CommentEntry', CommentEntryFragmentSelector)
                        )))))
                )))
        );
const ConferenceSelector = obj(
            field('conference', 'conference', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Conference', ConferenceFullSelector)
                )))
        );
const ConferenceMediaSelector = obj(
            field('conferenceMedia', 'conferenceMedia', args(fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('streams', 'streams', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('peerId', 'peerId', args(), scalar('ID')),
                            field('state', 'state', args(), notNull(scalar('String'))),
                            field('sdp', 'sdp', args(), scalar('String')),
                            field('ice', 'ice', args(), notNull(list(notNull(scalar('String')))))
                        ))))),
                    field('iceServers', 'iceServers', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('urls', 'urls', args(), notNull(list(notNull(scalar('String'))))),
                            field('username', 'username', args(), scalar('String')),
                            field('credential', 'credential', args(), scalar('String'))
                        )))))
                )))
        );
const DialogsSelector = obj(
            field('dialogs', 'dialogs', args(fieldValue("first", intValue(20)), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('Dialog', DialogFragmentSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                ))),
            field('dialogsState', 'state', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('state', 'state', args(), scalar('String'))
                ))),
            field('alphaNotificationCounter', 'counter', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('unreadCount', 'unreadCount', args(), notNull(scalar('Int')))
                )))
        );
const DiscoverCollectionSelector = obj(
            field('discoverCollection', 'discoverCollection', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('title', 'title', args(), notNull(scalar('String'))),
                    field('chats', 'chats', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('SharedRoom', DiscoverSharedRoomSelector)
                        )))))
                ))
        );
const DiscoverCollectionShortSelector = obj(
            field('discoverCollection', 'discoverCollection', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('title', 'title', args(), notNull(scalar('String'))),
                    field('image', 'image', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('uuid', 'uuid', args(), notNull(scalar('String'))),
                            field('crop', 'crop', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('x', 'x', args(), notNull(scalar('Int'))),
                                    field('y', 'y', args(), notNull(scalar('Int'))),
                                    field('w', 'w', args(), notNull(scalar('Int'))),
                                    field('h', 'h', args(), notNull(scalar('Int')))
                                ))
                        )))
                ))
        );
const DiscoverCollectionsSelector = obj(
            field('discoverCollections', 'discoverCollections', args(fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('DiscoverChatsCollection', DiscoverChatsCollectionSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                ))
        );
const DiscoverCollectionsShortSelector = obj(
            field('discoverCollections', 'discoverCollections', args(fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('DiscoverChatsCollection', DiscoverChatsCollectionShortSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                ))
        );
const DiscoverEditorsChoiceSelector = obj(
            field('discoverEditorsChoice', 'discoverEditorsChoice', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('image', 'image', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('uuid', 'uuid', args(), notNull(scalar('String'))),
                            field('crop', 'crop', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('x', 'x', args(), notNull(scalar('Int'))),
                                    field('y', 'y', args(), notNull(scalar('Int'))),
                                    field('w', 'w', args(), notNull(scalar('Int'))),
                                    field('h', 'h', args(), notNull(scalar('Int')))
                                ))
                        ))),
                    field('chat', 'chat', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('SharedRoom', DiscoverSharedRoomSelector)
                        )))
                )))))
        );
const DiscoverIsDoneSelector = obj(
            field('betaIsDiscoverDone', 'betaIsDiscoverDone', args(), notNull(scalar('Boolean')))
        );
const DiscoverNewAndGrowingSelector = obj(
            field('discoverNewAndGrowing', 'discoverNewAndGrowing', args(fieldValue("first", refValue('first')), fieldValue("seed", refValue('seed')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('SharedRoom', DiscoverSharedRoomSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
        );
const DiscoverNextPageSelector = obj(
            field('gammaNextDiscoverPage', 'betaNextDiscoverPage', args(fieldValue("selectedTagsIds", refValue('selectedTagsIds')), fieldValue("excudedGroupsIds", refValue('excudedGroupsIds'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('chats', 'chats', args(), list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('Room', RoomShortSelector)
                        )))),
                    field('tagGroup', 'tagGroup', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('String'))),
                            field('title', 'title', args(), scalar('String')),
                            field('subtitle', 'subtitle', args(), scalar('String')),
                            field('tags', 'tags', args(), notNull(list(notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('String'))),
                                    field('title', 'title', args(), notNull(scalar('String')))
                                )))))
                        ))
                ))
        );
const DiscoverPopularNowSelector = obj(
            field('discoverPopularNow', 'discoverPopularNow', args(fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('room', 'room', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('SharedRoom', DiscoverSharedRoomSelector)
                                ))),
                            field('newMessages', 'newMessages', args(), notNull(scalar('Int')))
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
        );
const DiscoverStateSelector = obj(
            field('dialogs', 'dialogs', args(fieldValue("first", intValue(1))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID')))
                        )))))
                )))
        );
const DiscoverSuggestedRoomsSelector = obj(
            field('betaSuggestedRooms', 'suggestedRooms', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('SharedRoom', DiscoverSharedRoomSelector)
                )))))
        );
const DiscoverTopFreeSelector = obj(
            field('discoverTopFree', 'discoverTopFree', args(fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('SharedRoom', DiscoverSharedRoomSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
        );
const DiscoverTopPremiumSelector = obj(
            field('discoverTopPremium', 'discoverTopPremium', args(fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('SharedRoom', DiscoverSharedRoomSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
        );
const ExplorePeopleSelector = obj(
            field('userSearch', 'items', args(fieldValue("query", refValue('query')), fieldValue("sort", refValue('sort')), fieldValue("page", refValue('page')), fieldValue("first", intValue(25)), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('isYou', 'isYou', args(), notNull(scalar('Boolean'))),
                                    fragment('User', UserShortSelector)
                                ))),
                            field('cursor', 'cursor', args(), notNull(scalar('String')))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean'))),
                            field('hasPreviousPage', 'hasPreviousPage', args(), notNull(scalar('Boolean'))),
                            field('itemsCount', 'itemsCount', args(), notNull(scalar('Int'))),
                            field('currentPage', 'currentPage', args(), notNull(scalar('Int'))),
                            field('pagesCount', 'pagesCount', args(), notNull(scalar('Int'))),
                            field('openEnded', 'openEnded', args(), notNull(scalar('Boolean')))
                        )))
                )))
        );
const ExploreRoomsSelector = obj(
            field('discoverNewAndGrowing', 'discoverNewAndGrowing', args(fieldValue("first", intValue(3)), fieldValue("seed", refValue('seed'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('SharedRoom', DiscoverSharedRoomSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                ))),
            field('discoverPopularNow', 'discoverPopularNow', args(fieldValue("first", intValue(3))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('room', 'room', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('SharedRoom', DiscoverSharedRoomSelector)
                                ))),
                            field('newMessages', 'newMessages', args(), notNull(scalar('Int')))
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                ))),
            field('betaSuggestedRooms', 'suggestedRooms', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('SharedRoom', DiscoverSharedRoomSelector)
                ))))),
            field('discoverTopPremium', 'discoverTopPremium', args(fieldValue("first", intValue(5))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('SharedRoom', DiscoverSharedRoomSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                ))),
            field('discoverTopFree', 'discoverTopFree', args(fieldValue("first", intValue(5))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('SharedRoom', DiscoverSharedRoomSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                ))),
            field('betaIsDiscoverDone', 'isDiscoverDone', args(), notNull(scalar('Boolean')))
        );
const FeatureFlagsSelector = obj(
            field('featureFlags', 'featureFlags', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('key', 'key', args(), notNull(scalar('String'))),
                    field('title', 'title', args(), notNull(scalar('String')))
                )))))
        );
const FeedChannelSelector = obj(
            field('alphaFeedChannel', 'channel', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('FeedChannel', FeedChannelFullSelector)
                )))
        );
const FeedChannelContentSelector = obj(
            field('alphaFeedChannelContent', 'content', args(fieldValue("id", refValue('id')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('FeedItem', FeedItemFullSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
        );
const FeedChannelSubscribersSelector = obj(
            field('alphaFeedChannelSubscribers', 'subscribers', args(fieldValue("channelId", refValue('channelId')), fieldValue("query", refValue('query')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('user', 'user', args(), notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            fragment('User', UserShortSelector)
                                        ))),
                                    field('role', 'role', args(), notNull(scalar('String')))
                                ))),
                            field('cursor', 'cursor', args(), notNull(scalar('String')))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean'))),
                            field('hasPreviousPage', 'hasPreviousPage', args(), notNull(scalar('Boolean'))),
                            field('itemsCount', 'itemsCount', args(), notNull(scalar('Int'))),
                            field('pagesCount', 'pagesCount', args(), notNull(scalar('Int'))),
                            field('currentPage', 'currentPage', args(), notNull(scalar('Int'))),
                            field('openEnded', 'openEnded', args(), notNull(scalar('Boolean')))
                        )))
                )))
        );
const FeedChannelWritersSelector = obj(
            field('alphaFeedChannelAdmins', 'writers', args(fieldValue("id", refValue('id')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('user', 'user', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('User', UserShortSelector)
                                ))),
                            field('role', 'role', args(), notNull(scalar('String')))
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
        );
const FeedChannelsSearchSelector = obj(
            field('alphaFeedChannelSearch', 'search', args(fieldValue("query", refValue('query')), fieldValue("sort", refValue('sort')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('FeedChannel', FeedChannelFullSelector)
                                ))),
                            field('cursor', 'cursor', args(), notNull(scalar('String')))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean'))),
                            field('hasPreviousPage', 'hasPreviousPage', args(), notNull(scalar('Boolean'))),
                            field('itemsCount', 'itemsCount', args(), notNull(scalar('Int'))),
                            field('pagesCount', 'pagesCount', args(), notNull(scalar('Int'))),
                            field('currentPage', 'currentPage', args(), notNull(scalar('Int'))),
                            field('openEnded', 'openEnded', args(), notNull(scalar('Boolean')))
                        )))
                )))
        );
const FeedItemSelector = obj(
            field('alphaFeedItem', 'item', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('FeedItem', FeedItemFullSelector)
                ))
        );
const FeedLoadMoreSelector = obj(
            field('alphaHomeFeed', 'feed', args(fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('FeedItem', FeedItemFullSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
        );
const FeedRecommendedChannelsSelector = obj(
            field('alphaRecommendedChannels', 'search', args(fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('FeedChannel', FeedChannelFullSelector)
                                ))),
                            field('cursor', 'cursor', args(), notNull(scalar('String')))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean'))),
                            field('hasPreviousPage', 'hasPreviousPage', args(), notNull(scalar('Boolean'))),
                            field('itemsCount', 'itemsCount', args(), notNull(scalar('Int'))),
                            field('pagesCount', 'pagesCount', args(), notNull(scalar('Int'))),
                            field('currentPage', 'currentPage', args(), notNull(scalar('Int'))),
                            field('openEnded', 'openEnded', args(), notNull(scalar('Boolean')))
                        )))
                )))
        );
const FeedSubscriptionsSelector = obj(
            field('alphaFeedMySubscriptions', 'channels', args(fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('FeedChannel', FeedChannelFullSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
        );
const FeedWritableChannelsSelector = obj(
            field('alphaWritableChannels', 'channels', args(fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('FeedChannel', FeedChannelFullSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
        );
const FetchPushSettingsSelector = obj(
            field('pushSettings', 'pushSettings', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('webPushKey', 'webPushKey', args(), scalar('String'))
                )))
        );
const GlobalCounterSelector = obj(
            field('alphaNotificationCounter', 'alphaNotificationCounter', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('unreadCount', 'unreadCount', args(), notNull(scalar('Int')))
                )))
        );
const GlobalSearchSelector = obj(
            field('alphaGlobalSearch', 'items', args(fieldValue("query", refValue('query')), fieldValue("kinds", refValue('kinds'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('Organization', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('name', 'name', args(), notNull(scalar('String'))),
                        field('about', 'about', args(), scalar('String')),
                        field('photo', 'photo', args(), scalar('String')),
                        field('shortname', 'shortname', args(), scalar('String')),
                        field('alphaIsCommunity', 'isCommunity', args(), notNull(scalar('Boolean')))
                    )),
                    inline('User', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('User', UserShortSelector)
                    )),
                    inline('SharedRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('kind', 'kind', args(), notNull(scalar('String'))),
                        field('title', 'title', args(), notNull(scalar('String'))),
                        field('canSendMessage', 'canSendMessage', args(), notNull(scalar('Boolean'))),
                        field('photo', 'roomPhoto', args(), notNull(scalar('String'))),
                        field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                        field('membership', 'membership', args(), notNull(scalar('String'))),
                        field('organization', 'organization', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('name', 'name', args(), notNull(scalar('String'))),
                                field('photo', 'photo', args(), scalar('String'))
                            ))
                    ))
                )))))
        );
const InitFeedSelector = obj(
            field('alphaHomeFeed', 'feed', args(fieldValue("first", refValue('first'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('FeedItem', FeedItemFullSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                ))),
            field('alphaFeedMyDraftsChannel', 'drafts', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('FeedChannel', FeedChannelFullSelector)
                )))
        );
const MatchmakingProfileSelector = obj(
            field('matchmakingProfile', 'matchmakingProfile', args(fieldValue("peerId", refValue('peerId')), fieldValue("uid", refValue('uid'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('MatchmakingProfile', MatchmakingProfileFragmentSelector)
                ))
        );
const MatchmakingRoomSelector = obj(
            field('matchmakingRoom', 'matchmakingRoom', args(fieldValue("peerId", refValue('peerId'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('MatchmakingRoom', MatchmakingRoomFragmentSelector)
                ))
        );
const MessageSelector = obj(
            field('message', 'message', args(fieldValue("messageId", refValue('messageId'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('ModernMessage', FullMessageSelector)
                ))
        );
const MessagesBatchSelector = obj(
            field('gammaMessages', 'gammaMessages', args(fieldValue("chatId", refValue('chatId')), fieldValue("first", refValue('first')), fieldValue("before", refValue('before')), fieldValue("after", refValue('after'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('messages', 'messages', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('ModernMessage', FullMessageSelector)
                        ))))),
                    field('haveMoreForward', 'haveMoreForward', args(), scalar('Boolean')),
                    field('haveMoreBackward', 'haveMoreBackward', args(), scalar('Boolean'))
                )),
            field('conversationState', 'state', args(fieldValue("id", refValue('chatId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('state', 'state', args(), scalar('String'))
                )))
        );
const MessagesSearchSelector = obj(
            field('messagesSearch', 'messagesSearch', args(fieldValue("query", refValue('query')), fieldValue("sort", refValue('sort')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('chat', 'chat', args(), notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            inline('PrivateRoom', obj(
                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                field('id', 'id', args(), notNull(scalar('ID'))),
                                                field('user', 'user', args(), notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                                        field('name', 'name', args(), notNull(scalar('String'))),
                                                        field('photo', 'photo', args(), scalar('String'))
                                                    ))),
                                                field('settings', 'settings', args(), notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                                        field('mute', 'mute', args(), scalar('Boolean'))
                                                    )))
                                            )),
                                            inline('SharedRoom', obj(
                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                field('id', 'id', args(), notNull(scalar('ID'))),
                                                field('kind', 'kind', args(), notNull(scalar('String'))),
                                                field('title', 'title', args(), notNull(scalar('String'))),
                                                field('membership', 'membership', args(), notNull(scalar('String'))),
                                                field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                                                field('role', 'role', args(), notNull(scalar('String'))),
                                                field('canEdit', 'canEdit', args(), notNull(scalar('Boolean'))),
                                                field('photo', 'photo', args(), notNull(scalar('String'))),
                                                field('settings', 'settings', args(), notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                                        field('mute', 'mute', args(), scalar('Boolean'))
                                                    )))
                                            ))
                                        ))),
                                    field('message', 'message', args(), notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('id', 'id', args(), notNull(scalar('ID'))),
                                            field('date', 'date', args(), notNull(scalar('Date'))),
                                            field('sender', 'sender', args(), notNull(obj(
                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                                    field('name', 'name', args(), notNull(scalar('String'))),
                                                    field('firstName', 'firstName', args(), notNull(scalar('String'))),
                                                    field('photo', 'photo', args(), scalar('String'))
                                                ))),
                                            field('senderBadge', 'senderBadge', args(), obj(
                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                    fragment('UserBadge', UserBadgeSelector)
                                                )),
                                            field('message', 'message', args(), scalar('String')),
                                            field('fallback', 'fallback', args(), notNull(scalar('String'))),
                                            inline('GeneralMessage', obj(
                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                field('id', 'id', args(), notNull(scalar('ID'))),
                                                field('attachments', 'attachments', args(), notNull(list(notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                                        field('fallback', 'fallback', args(), notNull(scalar('String'))),
                                                        inline('MessageAttachmentFile', obj(
                                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                            field('id', 'id', args(), notNull(scalar('ID'))),
                                                            field('fileId', 'fileId', args(), notNull(scalar('String'))),
                                                            field('fileMetadata', 'fileMetadata', args(), notNull(obj(
                                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                                    field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                                                    field('imageFormat', 'imageFormat', args(), scalar('String'))
                                                                )))
                                                        ))
                                                    ))))),
                                                field('quotedMessages', 'quotedMessages', args(), notNull(list(notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        field('id', 'id', args(), notNull(scalar('ID')))
                                                    )))))
                                            ))
                                        )))
                                ))),
                            field('cursor', 'cursor', args(), notNull(scalar('String')))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean'))),
                            field('hasPreviousPage', 'hasPreviousPage', args(), notNull(scalar('Boolean'))),
                            field('itemsCount', 'itemsCount', args(), notNull(scalar('Int'))),
                            field('currentPage', 'currentPage', args(), notNull(scalar('Int'))),
                            field('pagesCount', 'pagesCount', args(), notNull(scalar('Int'))),
                            field('openEnded', 'openEnded', args(), notNull(scalar('Boolean')))
                        )))
                )))
        );
const MyAppsSelector = obj(
            field('myApps', 'apps', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('AppProfile', AppFullSelector)
                )))))
        );
const MyCardsSelector = obj(
            field('myCards', 'myCards', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('pmid', 'pmid', args(), notNull(scalar('ID'))),
                    field('last4', 'last4', args(), notNull(scalar('String'))),
                    field('brand', 'brand', args(), notNull(scalar('String'))),
                    field('expYear', 'expYear', args(), notNull(scalar('Int'))),
                    field('expMonth', 'expMonth', args(), notNull(scalar('Int'))),
                    field('isDefault', 'isDefault', args(), notNull(scalar('Boolean'))),
                    field('deleted', 'deleted', args(), notNull(scalar('Boolean')))
                )))))
        );
const MyNotificationCenterSelector = obj(
            field('myNotificationCenter', 'myNotificationCenter', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('unread', 'unread', args(), notNull(scalar('Int'))),
                    field('state', 'state', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('state', 'state', args(), scalar('String'))
                        )))
                )))
        );
const MyNotificationsSelector = obj(
            field('myNotifications', 'myNotifications', args(fieldValue("first", refValue('first')), fieldValue("before", refValue('before'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('Notification', NotificationFragmentSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
        );
const MyOrganizationsSelector = obj(
            field('myOrganizations', 'myOrganizations', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('betaIsPrimary', 'isPrimary', args(), notNull(scalar('Boolean'))),
                    fragment('Organization', OrganizationShortSelector)
                )))))
        );
const MyStickersSelector = obj(
            field('myStickers', 'stickers', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('packs', 'packs', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('title', 'title', args(), notNull(scalar('String'))),
                            field('stickers', 'stickers', args(), notNull(list(notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('Sticker', StickerFragmentSelector)
                                )))))
                        )))))
                )))
        );
const MySuccessfulInvitesCountSelector = obj(
            field('mySuccessfulInvitesCount', 'mySuccessfulInvitesCount', args(), notNull(scalar('Int')))
        );
const MyWalletSelector = obj(
            field('myWallet', 'myWallet', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('balance', 'balance', args(), notNull(scalar('Int'))),
                    field('state', 'state', args(), notNull(scalar('String'))),
                    field('isLocked', 'isLocked', args(), notNull(scalar('Boolean'))),
                    field('failingPaymentsCount', 'failingPaymentsCount', args(), notNull(scalar('Int')))
                ))),
            field('transactionsPending', 'transactionsPending', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('WalletTransaction', WalletTransactionFragmentSelector)
                ))))),
            field('transactionsHistory', 'transactionsHistory', args(fieldValue("first", intValue(20))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('WalletTransaction', WalletTransactionFragmentSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
        );
const OauthContextSelector = obj(
            field('oauthContext', 'context', args(fieldValue("code", refValue('code'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('app', 'app', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('title', 'title', args(), notNull(scalar('String'))),
                            field('scopes', 'scopes', args(), list(notNull(scalar('String')))),
                            field('image', 'image', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('uuid', 'uuid', args(), notNull(scalar('String'))),
                                    field('crop', 'crop', args(), obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('x', 'x', args(), notNull(scalar('Int'))),
                                            field('y', 'y', args(), notNull(scalar('Int'))),
                                            field('w', 'w', args(), notNull(scalar('Int'))),
                                            field('h', 'h', args(), notNull(scalar('Int')))
                                        ))
                                ))
                        ))),
                    field('state', 'state', args(), notNull(scalar('String'))),
                    field('redirectUrl', 'redirectUrl', args(), notNull(scalar('String'))),
                    field('code', 'code', args(), notNull(scalar('String')))
                ))
        );
const OnlineSelector = obj(
            field('user', 'user', args(fieldValue("id", refValue('userId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('online', 'online', args(), notNull(scalar('Boolean'))),
                    field('lastSeen', 'lastSeen', args(), scalar('String')),
                    field('isBot', 'isBot', args(), notNull(scalar('Boolean')))
                )))
        );
const OrganizationSelector = obj(
            field('organization', 'organization', args(fieldValue("id", refValue('organizationId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Organization', OrganizationFullSelector)
                )))
        );
const OrganizationByPrefixSelector = obj(
            field('alphaOrganizationByPrefix', 'organizationByPrefix', args(fieldValue("query", refValue('query'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Organization', OrganizationSearchSelector)
                ))
        );
const OrganizationMembersSelector = obj(
            field('organization', 'organization', args(fieldValue("id", refValue('organizationId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('alphaOrganizationMembers', 'members', args(fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('role', 'role', args(), notNull(scalar('String'))),
                            field('user', 'user', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('User', UserShortSelector)
                                )))
                        )))))
                )))
        );
const OrganizationMembersShortSelector = obj(
            field('organization', 'organization', args(fieldValue("id", refValue('organizationId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('alphaOrganizationMembers', 'members', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('user', 'user', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID')))
                                )))
                        ))))),
                    fragment('Organization', OrganizationWithoutMembersFragmentSelector)
                )))
        );
const OrganizationProfileSelector = obj(
            field('organizationProfile', 'organizationProfile', args(fieldValue("id", refValue('organizationId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('OrganizationProfile', OrganizationProfileFullSelector)
                )))
        );
const OrganizationPublicInviteSelector = obj(
            field('alphaOrganizationInviteLink', 'publicInvite', args(fieldValue("organizationId", refValue('organizationId'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('key', 'key', args(), notNull(scalar('String'))),
                    field('ttl', 'ttl', args(), scalar('String'))
                ))
        );
const OrganizationPublicRoomsSelector = obj(
            field('organizationPublicRooms', 'organizationPublicRooms', args(fieldValue("id", refValue('organizationId')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('SharedRoom', SharedRoomViewSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
        );
const OrganizationWithoutMembersSelector = obj(
            field('organization', 'organization', args(fieldValue("id", refValue('organizationId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Organization', OrganizationWithoutMembersFragmentSelector)
                )))
        );
const PermissionsSelector = obj(
            field('myPermissions', 'myPermissions', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('roles', 'roles', args(), notNull(list(notNull(scalar('String')))))
                )))
        );
const PicSharedMediaSelector = obj(
            field('chatSharedMedia', 'chatSharedMedia', args(fieldValue("chatId", refValue('chatId')), fieldValue("mediaTypes", listValue(stringValue("IMAGE"))), fieldValue("first", refValue('first')), fieldValue("after", refValue('after')), fieldValue("before", refValue('before')), fieldValue("around", refValue('around'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean'))),
                            field('hasPreviousPage', 'hasPreviousPage', args(), notNull(scalar('Boolean'))),
                            field('currentPage', 'currentPage', args(), notNull(scalar('Int'))),
                            field('pagesCount', 'pagesCount', args(), notNull(scalar('Int'))),
                            field('itemsCount', 'itemsCount', args(), notNull(scalar('Int')))
                        ))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('cursor', 'cursor', args(), notNull(scalar('String'))),
                            field('index', 'index', args(), notNull(scalar('Int'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('message', 'message', args(), notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            inline('GeneralMessage', obj(
                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                field('id', 'id', args(), notNull(scalar('ID'))),
                                                field('date', 'date', args(), notNull(scalar('Date'))),
                                                field('sender', 'sender', args(), notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                                        field('name', 'name', args(), notNull(scalar('String')))
                                                    ))),
                                                field('attachments', 'attachments', args(), notNull(list(notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        inline('MessageAttachmentFile', obj(
                                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                            field('id', 'id', args(), notNull(scalar('ID'))),
                                                            field('fileMetadata', 'fileMetadata', args(), notNull(obj(
                                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                                    field('name', 'name', args(), notNull(scalar('String'))),
                                                                    field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                                                    field('imageFormat', 'imageFormat', args(), scalar('String')),
                                                                    field('mimeType', 'mimeType', args(), scalar('String')),
                                                                    field('imageWidth', 'imageWidth', args(), scalar('Int')),
                                                                    field('imageHeight', 'imageHeight', args(), scalar('Int')),
                                                                    field('size', 'size', args(), notNull(scalar('Int')))
                                                                ))),
                                                            field('filePreview', 'filePreview', args(), scalar('String')),
                                                            field('fileId', 'fileId', args(), notNull(scalar('String'))),
                                                            field('fallback', 'fallback', args(), notNull(scalar('String')))
                                                        ))
                                                    )))))
                                            ))
                                        )))
                                )))
                        )))))
                )))
        );
const ProfileSelector = obj(
            field('me', 'user', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('shortname', 'shortname', args(), scalar('String'))
                )),
            field('myProfile', 'profile', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('firstName', 'firstName', args(), scalar('String')),
                    field('lastName', 'lastName', args(), scalar('String')),
                    field('photoRef', 'photoRef', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('uuid', 'uuid', args(), notNull(scalar('String'))),
                            field('crop', 'crop', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('x', 'x', args(), notNull(scalar('Int'))),
                                    field('y', 'y', args(), notNull(scalar('Int'))),
                                    field('w', 'w', args(), notNull(scalar('Int'))),
                                    field('h', 'h', args(), notNull(scalar('Int')))
                                ))
                        )),
                    field('email', 'email', args(), scalar('String')),
                    field('phone', 'phone', args(), scalar('String')),
                    field('website', 'website', args(), scalar('String')),
                    field('about', 'about', args(), scalar('String')),
                    field('location', 'location', args(), scalar('String')),
                    field('alphaRole', 'role', args(), scalar('String')),
                    field('linkedin', 'linkedin', args(), scalar('String')),
                    field('instagram', 'instagram', args(), scalar('String')),
                    field('facebook', 'facebook', args(), scalar('String')),
                    field('twitter', 'twitter', args(), scalar('String')),
                    field('primaryOrganization', 'primaryOrganization', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('name', 'name', args(), notNull(scalar('String'))),
                            field('membersCount', 'membersCount', args(), notNull(scalar('Int')))
                        )),
                    field('alphaJoinedAt', 'joinedAt', args(), scalar('String')),
                    field('alphaInvitedBy', 'invitedBy', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('name', 'name', args(), notNull(scalar('String')))
                        ))
                ))
        );
const ProfilePrefillSelector = obj(
            field('myProfilePrefill', 'prefill', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('firstName', 'firstName', args(), scalar('String')),
                    field('lastName', 'lastName', args(), scalar('String')),
                    field('picture', 'picture', args(), scalar('String'))
                ))
        );
const ResolveShortNameSelector = obj(
            field('alphaResolveShortName', 'item', args(fieldValue("shortname", refValue('shortname'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('User', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('isDeleted', 'isDeleted', args(), notNull(scalar('Boolean')))
                    )),
                    inline('Organization', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('isDeleted', 'isDeleted', args(), notNull(scalar('Boolean')))
                    )),
                    inline('FeedChannel', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )),
                    inline('SharedRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    ))
                ))
        );
const ResolvedInviteSelector = obj(
            field('alphaResolveInvite', 'invite', args(fieldValue("key", refValue('key'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('InviteInfo', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('orgId', 'orgId', args(), notNull(scalar('ID'))),
                        field('title', 'title', args(), notNull(scalar('String'))),
                        field('creator', 'creator', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserShortSelector)
                            )),
                        field('organization', 'organization', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('photo', 'photo', args(), scalar('String')),
                                field('name', 'name', args(), notNull(scalar('String'))),
                                field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                                field('about', 'about', args(), scalar('String')),
                                field('alphaIsCommunity', 'isCommunity', args(), notNull(scalar('Boolean')))
                            ))
                    )),
                    inline('AppInvite', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('inviter', 'inviter', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserShortSelector)
                            )))
                    )),
                    inline('RoomInvite', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('invitedByUser', 'invitedByUser', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserShortSelector)
                            ))),
                        field('room', 'room', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                inline('SharedRoom', obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('kind', 'kind', args(), notNull(scalar('String'))),
                                    field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                                    field('title', 'title', args(), notNull(scalar('String'))),
                                    field('photo', 'photo', args(), notNull(scalar('String'))),
                                    field('socialImage', 'socialImage', args(), scalar('String')),
                                    field('description', 'description', args(), scalar('String')),
                                    field('membership', 'membership', args(), notNull(scalar('String'))),
                                    field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                                    field('onlineMembersCount', 'onlineMembersCount', args(), notNull(scalar('Int'))),
                                    field('previewMembers', 'previewMembers', args(), notNull(list(notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('id', 'id', args(), notNull(scalar('ID'))),
                                            field('photo', 'photo', args(), scalar('String')),
                                            field('name', 'name', args(), notNull(scalar('String')))
                                        ))))),
                                    field('matchmaking', 'matchmaking', args(), obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('enabled', 'enabled', args(), notNull(scalar('Boolean')))
                                        )),
                                    field('isPremium', 'isPremium', args(), notNull(scalar('Boolean'))),
                                    field('premiumPassIsActive', 'premiumPassIsActive', args(), notNull(scalar('Boolean'))),
                                    field('premiumSubscription', 'premiumSubscription', args(), obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('id', 'id', args(), notNull(scalar('ID'))),
                                            field('state', 'state', args(), notNull(scalar('String')))
                                        )),
                                    field('premiumSettings', 'premiumSettings', args(), obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('id', 'id', args(), notNull(scalar('ID'))),
                                            field('price', 'price', args(), notNull(scalar('Int'))),
                                            field('interval', 'interval', args(), scalar('String'))
                                        )),
                                    field('owner', 'owner', args(), obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('id', 'id', args(), notNull(scalar('ID'))),
                                            field('firstName', 'firstName', args(), notNull(scalar('String')))
                                        ))
                                ))
                            )))
                    ))
                )),
            field('alphaResolveShortName', 'shortnameItem', args(fieldValue("shortname", refValue('key'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('SharedRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Room', RoomPreviewSelector)
                    ))
                ))
        );
const RoomSelector = obj(
            field('room', 'room', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', RoomFullSelector)
                ))
        );
const RoomChatSelector = obj(
            field('room', 'room', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('PrivateRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('user', 'user', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('name', 'name', args(), notNull(scalar('String'))),
                                field('photo', 'photo', args(), scalar('String')),
                                field('shortname', 'shortname', args(), scalar('String')),
                                field('primaryOrganization', 'primaryOrganization', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('name', 'name', args(), notNull(scalar('String')))
                                    )),
                                field('isBot', 'isBot', args(), notNull(scalar('Boolean')))
                            ))),
                        field('pinnedMessage', 'pinnedMessage', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('ModernMessage', FullMessageSelector)
                            )),
                        field('settings', 'settings', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('mute', 'mute', args(), scalar('Boolean'))
                            )))
                    )),
                    inline('SharedRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('kind', 'kind', args(), notNull(scalar('String'))),
                        field('title', 'title', args(), notNull(scalar('String'))),
                        field('membership', 'membership', args(), notNull(scalar('String'))),
                        field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                        field('role', 'role', args(), notNull(scalar('String'))),
                        field('canEdit', 'canEdit', args(), notNull(scalar('Boolean'))),
                        field('photo', 'photo', args(), notNull(scalar('String'))),
                        field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                        field('organization', 'organization', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('Organization', OrganizationMediumSelector)
                            )),
                        field('matchmaking', 'matchmaking', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('MatchmakingRoom', MatchmakingRoomFragmentSelector)
                            )),
                        field('pinnedMessage', 'pinnedMessage', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('ModernMessage', FullMessageSelector)
                            )),
                        field('settings', 'settings', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('mute', 'mute', args(), scalar('Boolean'))
                            ))),
                        field('description', 'description', args(), scalar('String')),
                        field('onlineMembersCount', 'onlineMembersCount', args(), notNull(scalar('Int'))),
                        field('previewMembers', 'previewMembers', args(), notNull(list(notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('photo', 'photo', args(), scalar('String')),
                                field('name', 'name', args(), notNull(scalar('String')))
                            ))))),
                        field('isPremium', 'isPremium', args(), notNull(scalar('Boolean'))),
                        field('premiumPassIsActive', 'premiumPassIsActive', args(), notNull(scalar('Boolean'))),
                        field('premiumSubscription', 'premiumSubscription', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('state', 'state', args(), notNull(scalar('String')))
                            )),
                        field('premiumSettings', 'premiumSettings', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('price', 'price', args(), notNull(scalar('Int'))),
                                field('interval', 'interval', args(), scalar('String'))
                            )),
                        field('owner', 'owner', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID')))
                            ))
                    ))
                ))
        );
const RoomFeaturedMembersSelector = obj(
            field('roomFeaturedMembers', 'roomFeaturedMembers', args(fieldValue("roomId", refValue('roomId'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        ))),
                    field('role', 'role', args(), notNull(scalar('String'))),
                    field('membership', 'membership', args(), notNull(scalar('String'))),
                    field('canKick', 'canKick', args(), notNull(scalar('Boolean'))),
                    field('badge', 'badge', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('UserBadge', UserBadgeSelector)
                        ))
                )))))
        );
const RoomInviteInfoSelector = obj(
            field('betaRoomInviteInfo', 'invite', args(fieldValue("invite", refValue('invite'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('room', 'room', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            inline('SharedRoom', obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('kind', 'kind', args(), notNull(scalar('String'))),
                                field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                                field('title', 'title', args(), notNull(scalar('String'))),
                                field('photo', 'photo', args(), notNull(scalar('String'))),
                                field('socialImage', 'socialImage', args(), scalar('String')),
                                field('description', 'description', args(), scalar('String')),
                                field('organization', 'organization', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        fragment('Organization', OrganizationShortSelector)
                                    )),
                                field('membership', 'membership', args(), notNull(scalar('String'))),
                                field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                                field('onlineMembersCount', 'onlineMembersCount', args(), notNull(scalar('Int'))),
                                field('previewMembers', 'previewMembers', args(), notNull(list(notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('photo', 'photo', args(), scalar('String')),
                                        field('name', 'name', args(), notNull(scalar('String')))
                                    ))))),
                                field('matchmaking', 'matchmaking', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('enabled', 'enabled', args(), notNull(scalar('Boolean')))
                                    )),
                                field('isPremium', 'isPremium', args(), notNull(scalar('Boolean'))),
                                field('premiumPassIsActive', 'premiumPassIsActive', args(), notNull(scalar('Boolean'))),
                                field('premiumSubscription', 'premiumSubscription', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('state', 'state', args(), notNull(scalar('String')))
                                    )),
                                field('premiumSettings', 'premiumSettings', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('price', 'price', args(), notNull(scalar('Int'))),
                                        field('interval', 'interval', args(), scalar('String'))
                                    )),
                                field('owner', 'owner', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('firstName', 'firstName', args(), notNull(scalar('String')))
                                    ))
                            ))
                        ))),
                    field('invitedByUser', 'invitedByUser', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        )))
                ))
        );
const RoomInviteLinkSelector = obj(
            field('betaRoomInviteLink', 'link', args(fieldValue("roomId", refValue('roomId'))), notNull(scalar('String')))
        );
const RoomMembersSelector = obj(
            field('roomMembers', 'members', args(fieldValue("roomId", refValue('roomId'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        ))),
                    field('role', 'role', args(), notNull(scalar('String'))),
                    field('membership', 'membership', args(), notNull(scalar('String'))),
                    field('canKick', 'canKick', args(), notNull(scalar('Boolean')))
                )))))
        );
const RoomMembersPaginatedSelector = obj(
            field('roomMembers', 'members', args(fieldValue("roomId", refValue('roomId')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        ))),
                    field('role', 'role', args(), notNull(scalar('String'))),
                    field('membership', 'membership', args(), notNull(scalar('String'))),
                    field('canKick', 'canKick', args(), notNull(scalar('Boolean'))),
                    field('badge', 'badge', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('UserBadge', UserBadgeSelector)
                        ))
                )))))
        );
const RoomMembersShortSelector = obj(
            field('roomMembers', 'members', args(fieldValue("roomId", refValue('roomId'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID')))
                        )))
                )))))
        );
const RoomMembersTinySelector = obj(
            field('roomMembers', 'members', args(fieldValue("roomId", refValue('roomId'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('name', 'name', args(), notNull(scalar('String'))),
                            field('shortname', 'shortname', args(), scalar('String')),
                            field('photo', 'photo', args(), scalar('String')),
                            field('primaryOrganization', 'primaryOrganization', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('name', 'name', args(), notNull(scalar('String')))
                                ))
                        )))
                )))))
        );
const RoomOrganizationAdminMembersSelector = obj(
            field('room', 'room', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('SharedRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('organization', 'organization', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('alphaOrganizationAdminMembers', 'adminMembers', args(), notNull(list(notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('role', 'role', args(), notNull(scalar('String'))),
                                        field('user', 'user', args(), notNull(obj(
                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                fragment('User', UserShortSelector)
                                            )))
                                    )))))
                            ))
                    ))
                ))
        );
const RoomPicoSelector = obj(
            field('room', 'room', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', RoomNanoSelector)
                ))
        );
const RoomSearchSelector = obj(
            field('betaRoomSearch', 'items', args(fieldValue("query", refValue('query')), fieldValue("sort", refValue('sort')), fieldValue("page", refValue('page')), fieldValue("first", intValue(25))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    inline('SharedRoom', obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('kind', 'kind', args(), notNull(scalar('String'))),
                                        field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                                        field('title', 'title', args(), notNull(scalar('String'))),
                                        field('photo', 'photo', args(), notNull(scalar('String'))),
                                        field('membership', 'membership', args(), notNull(scalar('String'))),
                                        field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                                        field('organization', 'organization', args(), obj(
                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                field('id', 'id', args(), notNull(scalar('ID'))),
                                                field('photo', 'photo', args(), scalar('String')),
                                                field('name', 'name', args(), notNull(scalar('String')))
                                            ))
                                    ))
                                ))),
                            field('cursor', 'cursor', args(), notNull(scalar('String')))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean'))),
                            field('hasPreviousPage', 'hasPreviousPage', args(), notNull(scalar('Boolean'))),
                            field('itemsCount', 'itemsCount', args(), notNull(scalar('Int'))),
                            field('currentPage', 'currentPage', args(), notNull(scalar('Int'))),
                            field('pagesCount', 'pagesCount', args(), notNull(scalar('Int'))),
                            field('openEnded', 'openEnded', args(), notNull(scalar('Boolean')))
                        )))
                )))
        );
const RoomSocialImageSelector = obj(
            field('roomSocialImage', 'roomSocialImage', args(fieldValue("roomId", refValue('roomId'))), scalar('String'))
        );
const RoomSuperSelector = obj(
            field('roomSuper', 'roomSuper', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('featured', 'featured', args(), notNull(scalar('Boolean'))),
                    field('listed', 'listed', args(), notNull(scalar('Boolean')))
                ))
        );
const RoomTinySelector = obj(
            field('room', 'room', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', RoomShortSelector)
                ))
        );
const RoomWithoutMembersSelector = obj(
            field('room', 'room', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', RoomFullWithoutMembersSelector)
                ))
        );
const SettingsSelector = obj(
            field('settings', 'settings', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Settings', SettingsFullSelector)
                )))
        );
const SharedMediaSelector = obj(
            field('chatSharedMedia', 'sharedMedia', args(fieldValue("chatId", refValue('chatId')), fieldValue("mediaTypes", refValue('mediaTypes')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean'))),
                            field('currentPage', 'currentPage', args(), notNull(scalar('Int')))
                        ))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('message', 'message', args(), notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            inline('GeneralMessage', obj(
                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                field('id', 'id', args(), notNull(scalar('ID'))),
                                                field('fallback', 'fallback', args(), notNull(scalar('String'))),
                                                field('date', 'date', args(), notNull(scalar('Date'))),
                                                field('sender', 'sender', args(), notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                                        field('name', 'name', args(), notNull(scalar('String')))
                                                    ))),
                                                field('attachments', 'attachments', args(), notNull(list(notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        inline('MessageAttachmentFile', obj(
                                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                            field('id', 'id', args(), notNull(scalar('ID'))),
                                                            field('fileMetadata', 'fileMetadata', args(), notNull(obj(
                                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                                    field('name', 'name', args(), notNull(scalar('String'))),
                                                                    field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                                                    field('imageFormat', 'imageFormat', args(), scalar('String')),
                                                                    field('mimeType', 'mimeType', args(), scalar('String')),
                                                                    field('imageWidth', 'imageWidth', args(), scalar('Int')),
                                                                    field('imageHeight', 'imageHeight', args(), scalar('Int')),
                                                                    field('size', 'size', args(), notNull(scalar('Int')))
                                                                ))),
                                                            field('filePreview', 'filePreview', args(), scalar('String')),
                                                            field('fileId', 'fileId', args(), notNull(scalar('String'))),
                                                            field('fallback', 'fallback', args(), notNull(scalar('String')))
                                                        )),
                                                        inline('MessageRichAttachment', obj(
                                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                            field('id', 'id', args(), notNull(scalar('ID'))),
                                                            field('title', 'title', args(), scalar('String')),
                                                            field('text', 'text', args(), scalar('String')),
                                                            field('titleLink', 'titleLink', args(), scalar('String')),
                                                            field('imagePreview', 'imagePreview', args(), scalar('String')),
                                                            field('image', 'image', args(), obj(
                                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                                    field('url', 'url', args(), notNull(scalar('String')))
                                                                )),
                                                            field('imageFallback', 'imageFallback', args(), obj(
                                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                                    field('photo', 'photo', args(), notNull(scalar('String')))
                                                                )),
                                                            field('keyboard', 'keyboard', args(), obj(
                                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                                    field('buttons', 'buttons', args(), notNull(list(list(notNull(obj(
                                                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                                            field('id', 'id', args(), notNull(scalar('ID'))),
                                                                            field('title', 'title', args(), notNull(scalar('String'))),
                                                                            field('url', 'url', args(), scalar('String'))
                                                                        ))))))
                                                                ))
                                                        ))
                                                    )))))
                                            ))
                                        )))
                                ))),
                            field('cursor', 'cursor', args(), notNull(scalar('String')))
                        )))))
                )))
        );
const SharedMediaCountersSelector = obj(
            field('chatSharedMediaCounters', 'counters', args(fieldValue("chatId", refValue('chatId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('links', 'links', args(), notNull(scalar('Int'))),
                    field('images', 'images', args(), notNull(scalar('Int'))),
                    field('documents', 'documents', args(), notNull(scalar('Int'))),
                    field('videos', 'videos', args(), notNull(scalar('Int')))
                )))
        );
const StickerPackSelector = obj(
            field('stickerPack', 'stickerPack', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('StickerPack', StickerPackFragmentSelector)
                ))
        );
const StickerPackCatalogSelector = obj(
            field('stickerPackCatalog', 'stickers', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('title', 'title', args(), notNull(scalar('String'))),
                    field('published', 'published', args(), notNull(scalar('Boolean'))),
                    field('stickers', 'stickers', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('Sticker', StickerFragmentSelector)
                        )))))
                )))))
        );
const StripeTokenSelector = obj(
            field('stripeToken', 'stripeToken', args(), notNull(scalar('String')))
        );
const SubscriptionsSelector = obj(
            field('subscriptions', 'subscriptions', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('state', 'state', args(), notNull(scalar('String'))),
                    field('expires', 'expires', args(), notNull(scalar('Date'))),
                    field('amount', 'amount', args(), notNull(scalar('Int'))),
                    field('interval', 'interval', args(), notNull(scalar('String'))),
                    field('product', 'product', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            inline('WalletProductGroup', obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('group', 'group', args(), notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('title', 'title', args(), notNull(scalar('String'))),
                                        field('photo', 'photo', args(), notNull(scalar('String')))
                                    )))
                            ))
                        )))
                )))))
        );
const SuggestedRoomsSelector = obj(
            field('betaSuggestedRooms', 'suggestedRooms', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('SharedRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('kind', 'kind', args(), notNull(scalar('String'))),
                        field('title', 'title', args(), notNull(scalar('String'))),
                        field('photo', 'photo', args(), notNull(scalar('String'))),
                        field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                        field('membership', 'membership', args(), notNull(scalar('String'))),
                        field('organization', 'organization', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('name', 'name', args(), notNull(scalar('String'))),
                                field('photo', 'photo', args(), scalar('String'))
                            ))
                    ))
                ))))),
            field('betaIsDiscoverDone', 'isDiscoverDone', args(), notNull(scalar('Boolean')))
        );
const SuperAccountSelector = obj(
            field('superAccount', 'superAccount', args(fieldValue("id", refValue('accountId')), fieldValue("viaOrgId", refValue('viaOrgId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('title', 'title', args(), notNull(scalar('String'))),
                    field('state', 'state', args(), notNull(scalar('String'))),
                    field('members', 'members', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        ))))),
                    field('features', 'features', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('key', 'key', args(), notNull(scalar('String'))),
                            field('title', 'title', args(), notNull(scalar('String')))
                        ))))),
                    field('orgId', 'orgId', args(), notNull(scalar('ID'))),
                    field('createdAt', 'createdAt', args(), scalar('String')),
                    field('createdBy', 'createdBy', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('name', 'name', args(), notNull(scalar('String')))
                        )),
                    field('alphaPublished', 'published', args(), notNull(scalar('Boolean')))
                )))
        );
const SuperAccountsSelector = obj(
            field('superAccounts', 'superAccounts', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('orgId', 'orgId', args(), notNull(scalar('ID'))),
                    field('title', 'title', args(), notNull(scalar('String'))),
                    field('state', 'state', args(), notNull(scalar('String'))),
                    field('createdAt', 'createdAt', args(), scalar('String'))
                )))))
        );
const SuperAdminsSelector = obj(
            field('superAdmins', 'superAdmins', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('role', 'role', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        ))),
                    field('email', 'email', args(), scalar('String'))
                )))))
        );
const SuperBadgeInRoomSelector = obj(
            field('superBadgeInRoom', 'superBadgeInRoom', args(fieldValue("roomId", refValue('roomId')), fieldValue("userId", refValue('userId'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('UserBadge', UserBadgeSelector)
                ))
        );
const TransactionsHistorySelector = obj(
            field('transactionsHistory', 'transactionsHistory', args(fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('WalletTransaction', WalletTransactionFragmentSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
        );
const UserSelector = obj(
            field('user', 'user', args(fieldValue("id", refValue('userId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('chatsWithBadge', 'chatsWithBadge', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('chat', 'chat', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('Room', RoomShortSelector)
                                ))),
                            field('badge', 'badge', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('UserBadge', UserBadgeSelector)
                                )))
                        ))))),
                    fragment('User', UserFullSelector)
                ))),
            field('room', 'conversation', args(fieldValue("id", refValue('userId'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('PrivateRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('settings', 'settings', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('mute', 'mute', args(), scalar('Boolean'))
                            )))
                    ))
                ))
        );
const UserAvailableRoomsSelector = obj(
            field('alphaUserAvailableRooms', 'alphaUserAvailableRooms', args(fieldValue("first", refValue('first')), fieldValue("after", refValue('after')), fieldValue("query", refValue('query'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('SharedRoom', DiscoverSharedRoomSelector)
                                ))),
                            field('cursor', 'cursor', args(), notNull(scalar('String')))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean')))
                        )))
                )))
        );
const UserPicoSelector = obj(
            field('user', 'user', args(fieldValue("id", refValue('userId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('name', 'name', args(), notNull(scalar('String'))),
                    field('firstName', 'firstName', args(), notNull(scalar('String'))),
                    field('photo', 'photo', args(), scalar('String'))
                )))
        );
const UserStorageSelector = obj(
            field('userStorage', 'userStorage', args(fieldValue("namespace", refValue('namespace')), fieldValue("keys", refValue('keys'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('key', 'key', args(), notNull(scalar('String'))),
                    field('value', 'value', args(), scalar('String'))
                )))))
        );
const UsersSelector = obj(
            field('users', 'items', args(fieldValue("query", refValue('query'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('name', 'title', args(), notNull(scalar('String'))),
                    field('email', 'subtitle', args(), scalar('String'))
                )))))
        );
const AccountInviteJoinSelector = obj(
            field('alphaJoinInvite', 'alphaJoinInvite', args(fieldValue("key", refValue('inviteKey'))), notNull(scalar('ID')))
        );
const AddAppToChatSelector = obj(
            field('addAppToChat', 'addAppToChat', args(fieldValue("appId", refValue('appId')), fieldValue("chatId", refValue('chatId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('AppChat', AppChatSelector)
                )))
        );
const AddCommentSelector = obj(
            field('betaAddComment', 'betaAddComment', args(fieldValue("repeatKey", refValue('repeatKey')), fieldValue("peerId", refValue('peerId')), fieldValue("message", refValue('message')), fieldValue("replyComment", refValue('replyComment')), fieldValue("mentions", refValue('mentions')), fieldValue("fileAttachments", refValue('fileAttachments')), fieldValue("spans", refValue('spans'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const AddStickerCommentSelector = obj(
            field('betaAddStickerComment', 'addStickerComment', args(fieldValue("peerId", refValue('peerId')), fieldValue("stickerId", refValue('stickerId')), fieldValue("replyComment", refValue('replyComment')), fieldValue("repeatKey", refValue('repeatKey'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const BetaDiscoverSkipSelector = obj(
            field('betaDiscoverSkip', 'betaDiscoverSkip', args(fieldValue("selectedTagsIds", refValue('selectedTagsIds'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('tagGroup', 'tagGroup', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('String')))
                        ))
                ))
        );
const BetaNextDiscoverResetSelector = obj(
            field('betaNextDiscoverReset', 'betaNextDiscoverReset', args(), notNull(scalar('Boolean')))
        );
const BetaSubmitNextDiscoverSelector = obj(
            field('betaSubmitNextDiscover', 'betaSubmitNextDiscover', args(fieldValue("selectedTagsIds", refValue('selectedTagsIds')), fieldValue("excudedGroupsIds", refValue('excudedGroupsIds'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('tagGroup', 'tagGroup', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('String')))
                        ))
                ))
        );
const BuyPremiumChatPassSelector = obj(
            field('betaBuyPremiumChatPass', 'betaBuyPremiumChatPass', args(fieldValue("chatId", refValue('chatId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('premiumPassIsActive', 'premiumPassIsActive', args(), notNull(scalar('Boolean'))),
                    field('membership', 'membership', args(), notNull(scalar('String')))
                )))
        );
const BuyPremiumChatSubscriptionSelector = obj(
            field('betaBuyPremiumChatSubscription', 'betaBuyPremiumChatSubscription', args(fieldValue("chatId", refValue('chatId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('premiumPassIsActive', 'premiumPassIsActive', args(), notNull(scalar('Boolean'))),
                    field('premiumSubscription', 'premiumSubscription', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('state', 'state', args(), notNull(scalar('String')))
                        )),
                    field('membership', 'membership', args(), notNull(scalar('String')))
                )))
        );
const CancelSubscriptionSelector = obj(
            field('subscriptionCancel', 'subscriptionCancel', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const CommentSetReactionSelector = obj(
            field('commentReactionAdd', 'commentReactionAdd', args(fieldValue("commentId", refValue('commentId')), fieldValue("reaction", refValue('reaction'))), notNull(scalar('Boolean')))
        );
const CommentUnsetReactionSelector = obj(
            field('commentReactionRemove', 'commentReactionRemove', args(fieldValue("commentId", refValue('commentId')), fieldValue("reaction", refValue('reaction'))), notNull(scalar('Boolean')))
        );
const CommitCardSetupIntentSelector = obj(
            field('cardCommitSetupIntent', 'cardCommitSetupIntent', args(fieldValue("id", refValue('id')), fieldValue("pmid", refValue('pmid'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const ConferenceAnswerSelector = obj(
            field('peerConnectionAnswer', 'peerConnectionAnswer', args(fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId')), fieldValue("ownPeerId", refValue('ownPeerId')), fieldValue("answer", refValue('answer'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Conference', ConferenceShortSelector)
                )))
        );
const ConferenceCandidateSelector = obj(
            field('peerConnectionCandidate', 'peerConnectionCandidate', args(fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId')), fieldValue("ownPeerId", refValue('ownPeerId')), fieldValue("candidate", refValue('candidate'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Conference', ConferenceShortSelector)
                )))
        );
const ConferenceJoinSelector = obj(
            field('conferenceJoin', 'conferenceJoin', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('peerId', 'peerId', args(), notNull(scalar('ID'))),
                    field('conference', 'conference', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('Conference', ConferenceShortSelector)
                        )))
                )))
        );
const ConferenceKeepAliveSelector = obj(
            field('conferenceKeepAlive', 'conferenceKeepAlive', args(fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Conference', ConferenceShortSelector)
                )))
        );
const ConferenceLeaveSelector = obj(
            field('conferenceLeave', 'conferenceLeave', args(fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Conference', ConferenceShortSelector)
                )))
        );
const ConferenceOfferSelector = obj(
            field('peerConnectionOffer', 'peerConnectionOffer', args(fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId')), fieldValue("ownPeerId", refValue('ownPeerId')), fieldValue("offer", refValue('offer'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Conference', ConferenceShortSelector)
                )))
        );
const CreateAppSelector = obj(
            field('createApp', 'createApp', args(fieldValue("name", refValue('name')), fieldValue("shortname", refValue('shortname')), fieldValue("photoRef", refValue('photoRef')), fieldValue("about", refValue('about'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('AppProfile', AppFullSelector)
                )))
        );
const CreateCardSetupIntentSelector = obj(
            field('cardCreateSetupIntent', 'cardCreateSetupIntent', args(fieldValue("retryKey", refValue('retryKey'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('clientSecret', 'clientSecret', args(), notNull(scalar('String')))
                )))
        );
const CreateDepositIntentSelector = obj(
            field('cardDepositIntent', 'cardDepositIntent', args(fieldValue("id", refValue('cardId')), fieldValue("amount", refValue('amount')), fieldValue("retryKey", refValue('retryKey'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('clientSecret', 'clientSecret', args(), notNull(scalar('String')))
                )))
        );
const CreateOrganizationSelector = obj(
            field('createOrganization', 'organization', args(fieldValue("input", refValue('input'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('name', 'name', args(), notNull(scalar('String')))
                )))
        );
const CreateUserProfileAndOrganizationSelector = obj(
            field('alphaCreateUserProfileAndOrganization', 'alphaCreateUserProfileAndOrganization', args(fieldValue("user", refValue('user')), fieldValue("organization", refValue('organization'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserFullSelector)
                        )),
                    field('organization', 'organization', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('name', 'name', args(), notNull(scalar('String')))
                        ))
                )))
        );
const DebugMailsSelector = obj(
            field('debugSendEmail', 'debugSendEmail', args(fieldValue("type", refValue('type'))), scalar('Boolean'))
        );
const DeleteCommentSelector = obj(
            field('deleteComment', 'deleteComment', args(fieldValue("id", refValue('id'))), notNull(scalar('Boolean')))
        );
const DeleteNotificationSelector = obj(
            field('deleteNotification', 'deleteNotification', args(fieldValue("notificationId", refValue('notificationId'))), notNull(scalar('Boolean')))
        );
const DeleteOrganizationSelector = obj(
            field('deleteOrganization', 'deleteOrganization', args(fieldValue("id", refValue('organizationId'))), notNull(scalar('Boolean')))
        );
const DeleteUserSelector = obj(
            field('superDeleteUser', 'superDeleteUser', args(fieldValue("id", refValue('id'))), notNull(scalar('Boolean')))
        );
const DiscoverCollectionsCreateSelector = obj(
            field('discoverCollectionsCreate', 'discoverCollectionsCreate', args(fieldValue("collection", objectValue(fieldValue('title', refValue('title')),fieldValue('image', refValue('image')),fieldValue('chatIds', refValue('chatIds'))))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('title', 'title', args(), notNull(scalar('String')))
                )))
        );
const DiscoverCollectionsDeleteSelector = obj(
            field('discoverCollectionsDelete', 'discoverCollectionsDelete', args(fieldValue("id", refValue('id'))), notNull(scalar('Boolean')))
        );
const DiscoverCollectionsUpdateSelector = obj(
            field('discoverCollectionsUpdate', 'discoverCollectionsUpdate', args(fieldValue("id", refValue('id')), fieldValue("input", objectValue(fieldValue('title', refValue('title')),fieldValue('image', refValue('image')),fieldValue('chatIds', refValue('chatIds'))))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('title', 'title', args(), notNull(scalar('String')))
                )))
        );
const DiscoverEditorsChoiceCreateSelector = obj(
            field('discoverEditorsChoiceCreate', 'discoverEditorsChoiceCreate', args(fieldValue("input", objectValue(fieldValue('image', refValue('image')),fieldValue('cid', refValue('cid'))))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('image', 'image', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('uuid', 'uuid', args(), notNull(scalar('String'))),
                            field('crop', 'crop', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('x', 'x', args(), notNull(scalar('Int'))),
                                    field('y', 'y', args(), notNull(scalar('Int'))),
                                    field('w', 'w', args(), notNull(scalar('Int'))),
                                    field('h', 'h', args(), notNull(scalar('Int')))
                                ))
                        ))),
                    field('chat', 'chat', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('title', 'title', args(), notNull(scalar('String')))
                        )))
                )))
        );
const DiscoverEditorsChoiceDeleteSelector = obj(
            field('discoverEditorsChoiceDelete', 'discoverEditorsChoiceDelete', args(fieldValue("id", refValue('id'))), notNull(scalar('Boolean')))
        );
const DiscoverEditorsChoiceUpdateSelector = obj(
            field('discoverEditorsChoiceUpdate', 'discoverEditorsChoiceUpdate', args(fieldValue("id", refValue('id')), fieldValue("input", objectValue(fieldValue('image', refValue('image')),fieldValue('cid', refValue('cid'))))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('image', 'image', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('uuid', 'uuid', args(), notNull(scalar('String'))),
                            field('crop', 'crop', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('x', 'x', args(), notNull(scalar('Int'))),
                                    field('y', 'y', args(), notNull(scalar('Int'))),
                                    field('w', 'w', args(), notNull(scalar('Int'))),
                                    field('h', 'h', args(), notNull(scalar('Int')))
                                ))
                        ))),
                    field('chat', 'chat', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('title', 'title', args(), notNull(scalar('String')))
                        )))
                )))
        );
const DonateSelector = obj(
            field('donateToUser', 'donateToUser', args(fieldValue("id", refValue('id')), fieldValue("amount", intValue(100))), notNull(scalar('Boolean')))
        );
const EditCommentSelector = obj(
            field('editComment', 'editComment', args(fieldValue("id", refValue('id')), fieldValue("message", refValue('message')), fieldValue("mentions", refValue('mentions')), fieldValue("fileAttachments", refValue('fileAttachments')), fieldValue("spans", refValue('spans'))), notNull(scalar('Boolean')))
        );
const EditMessageSelector = obj(
            field('editMessage', 'editMessage', args(fieldValue("messageId", refValue('messageId')), fieldValue("message", refValue('message')), fieldValue("replyMessages", refValue('replyMessages')), fieldValue("mentions", refValue('mentions')), fieldValue("fileAttachments", refValue('fileAttachments')), fieldValue("spans", refValue('spans'))), notNull(scalar('Boolean')))
        );
const FeatureFlagAddSelector = obj(
            field('featureFlagAdd', 'featureFlagAdd', args(fieldValue("key", refValue('key')), fieldValue("title", refValue('title'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('key', 'key', args(), notNull(scalar('String'))),
                    field('title', 'title', args(), notNull(scalar('String')))
                )))
        );
const FeatureFlagDisableSelector = obj(
            field('superAccountFeatureRemove', 'superAccountFeatureRemove', args(fieldValue("id", refValue('accountId')), fieldValue("featureId", refValue('featureId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('features', 'features', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('key', 'key', args(), notNull(scalar('String'))),
                            field('title', 'title', args(), notNull(scalar('String')))
                        )))))
                )))
        );
const FeatureFlagEnableSelector = obj(
            field('superAccountFeatureAdd', 'superAccountFeatureAdd', args(fieldValue("id", refValue('accountId')), fieldValue("featureId", refValue('featureId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('features', 'features', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('key', 'key', args(), notNull(scalar('String'))),
                            field('title', 'title', args(), notNull(scalar('String')))
                        )))))
                )))
        );
const FeedChannelAddWriterSelector = obj(
            field('alphaFeedChannelAddEditor', 'alphaFeedChannelAddEditor', args(fieldValue("id", refValue('id')), fieldValue("userId", refValue('userId'))), notNull(scalar('Boolean')))
        );
const FeedChannelCreateSelector = obj(
            field('alphaFeedCreateChannel', 'channel', args(fieldValue("title", refValue('title')), fieldValue("about", refValue('about')), fieldValue("photoRef", refValue('photoRef')), fieldValue("global", refValue('global'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('FeedChannel', FeedChannelFullSelector)
                )))
        );
const FeedChannelRemoveWriterSelector = obj(
            field('alphaFeedChannelRemoveEditor', 'alphaFeedChannelRemoveEditor', args(fieldValue("id", refValue('id')), fieldValue("userId", refValue('userId'))), notNull(scalar('Boolean')))
        );
const FeedChannelSubscribeSelector = obj(
            field('alphaFeedChannelSubscribe', 'alphaFeedChannelSubscribe', args(fieldValue("id", refValue('id'))), notNull(scalar('Boolean')))
        );
const FeedChannelUnsubscribeSelector = obj(
            field('alphaFeedChannelUnsubscribe', 'alphaFeedChannelUnsubscribe', args(fieldValue("id", refValue('id'))), notNull(scalar('Boolean')))
        );
const FeedChannelUpdateSelector = obj(
            field('alphaFeedUpdateChannel', 'channel', args(fieldValue("id", refValue('id')), fieldValue("title", refValue('title')), fieldValue("about", refValue('about')), fieldValue("photoRef", refValue('photoRef')), fieldValue("global", refValue('global'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const FeedCreatePostSelector = obj(
            field('alphaCreateFeedPost', 'post', args(fieldValue("channel", refValue('channel')), fieldValue("slides", refValue('slides')), fieldValue("repeatKey", refValue('repeatKey'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('FeedItem', FeedItemFullSelector)
                )))
        );
const FeedDeletePostSelector = obj(
            field('alphaDeleteFeedPost', 'alphaDeleteFeedPost', args(fieldValue("feedItemId", refValue('feedItemId'))), notNull(scalar('Boolean')))
        );
const FeedEditPostSelector = obj(
            field('alphaEditFeedPost', 'editFeedPost', args(fieldValue("feedItemId", refValue('feedItemId')), fieldValue("slides", refValue('slides'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('FeedItem', FeedItemFullSelector)
                )))
        );
const FeedReactionAddSelector = obj(
            field('feedReactionAdd', 'feedReactionAdd', args(fieldValue("feedItemId", refValue('feedItemId')), fieldValue("reaction", refValue('reaction'))), notNull(scalar('Boolean')))
        );
const FeedReactionRemoveSelector = obj(
            field('feedReactionRemove', 'feedReactionRemove', args(fieldValue("feedItemId", refValue('feedItemId')), fieldValue("reaction", refValue('reaction'))), notNull(scalar('Boolean')))
        );
const MakeCardDefaultSelector = obj(
            field('cardMakeDefault', 'cardMakeDefault', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('isDefault', 'isDefault', args(), notNull(scalar('Boolean')))
                )))
        );
const MarkSequenceReadSelector = obj(
            field('alphaGlobalRead', 'alphaGlobalRead', args(fieldValue("toSeq", refValue('seq'))), notNull(scalar('String')))
        );
const MatchmakingConnectSelector = obj(
            field('matchmakingConnect', 'matchmakingConnect', args(fieldValue("peerId", refValue('peerId')), fieldValue("uid", refValue('uid'))), notNull(scalar('Boolean')))
        );
const MatchmakingProfileFillSelector = obj(
            field('matchmakingProfileFill', 'matchmakingProfileFill', args(fieldValue("peerId", refValue('peerId')), fieldValue("input", refValue('input'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('MatchmakingProfile', MatchmakingProfileFragmentSelector)
                )))
        );
const MatchmakingRoomSaveSelector = obj(
            field('matchmakingRoomSave', 'matchmakingRoomSave', args(fieldValue("peerId", refValue('peerId')), fieldValue("input", refValue('input'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('MatchmakingRoom', MatchmakingRoomFragmentSelector)
                )))
        );
const MediaAnswerSelector = obj(
            field('mediaStreamAnswer', 'mediaStreamAnswer', args(fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId')), fieldValue("answer", refValue('answer'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('streams', 'streams', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('peerId', 'peerId', args(), scalar('ID')),
                            field('state', 'state', args(), notNull(scalar('String'))),
                            field('sdp', 'sdp', args(), scalar('String')),
                            field('ice', 'ice', args(), notNull(list(notNull(scalar('String')))))
                        )))))
                )))
        );
const MediaCandidateSelector = obj(
            field('mediaStreamCandidate', 'mediaStreamCandidate', args(fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId')), fieldValue("candidate", refValue('candidate'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('streams', 'streams', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('peerId', 'peerId', args(), scalar('ID')),
                            field('state', 'state', args(), notNull(scalar('String'))),
                            field('sdp', 'sdp', args(), scalar('String')),
                            field('ice', 'ice', args(), notNull(list(notNull(scalar('String')))))
                        )))))
                )))
        );
const MediaFailedSelector = obj(
            field('mediaStreamFailed', 'mediaStreamFailed', args(fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('streams', 'streams', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('peerId', 'peerId', args(), scalar('ID')),
                            field('state', 'state', args(), notNull(scalar('String'))),
                            field('sdp', 'sdp', args(), scalar('String')),
                            field('ice', 'ice', args(), notNull(list(notNull(scalar('String')))))
                        )))))
                )))
        );
const MediaNegotiationNeededSelector = obj(
            field('mediaStreamNegotiationNeeded', 'mediaStreamNegotiationNeeded', args(fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('streams', 'streams', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('peerId', 'peerId', args(), scalar('ID')),
                            field('state', 'state', args(), notNull(scalar('String'))),
                            field('sdp', 'sdp', args(), scalar('String')),
                            field('ice', 'ice', args(), notNull(list(notNull(scalar('String')))))
                        )))))
                )))
        );
const MediaOfferSelector = obj(
            field('mediaStreamOffer', 'mediaStreamOffer', args(fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId')), fieldValue("offer", refValue('offer'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('streams', 'streams', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('peerId', 'peerId', args(), scalar('ID')),
                            field('state', 'state', args(), notNull(scalar('String'))),
                            field('sdp', 'sdp', args(), scalar('String')),
                            field('ice', 'ice', args(), notNull(list(notNull(scalar('String')))))
                        )))))
                )))
        );
const MessageSetReactionSelector = obj(
            field('messageReactionAdd', 'messageReactionAdd', args(fieldValue("messageId", refValue('messageId')), fieldValue("reaction", refValue('reaction'))), notNull(scalar('Boolean')))
        );
const MessageUnsetReactionSelector = obj(
            field('messageReactionRemove', 'messageReactionRemove', args(fieldValue("messageId", refValue('messageId')), fieldValue("reaction", refValue('reaction'))), notNull(scalar('Boolean')))
        );
const MyNotificationCenterMarkSeqReadSelector = obj(
            field('notificationCenterMarkSeqRead', 'notificationCenterMarkSeqRead', args(fieldValue("toSeq", refValue('seq'))), notNull(scalar('Boolean')))
        );
const OrganizationActivateByInviteSelector = obj(
            field('joinAppInvite', 'joinAppInvite', args(fieldValue("key", refValue('inviteKey'))), notNull(scalar('ID')))
        );
const OrganizationAddMemberSelector = obj(
            field('alphaOrganizationMemberAdd', 'alphaOrganizationMemberAdd', args(fieldValue("userIds", refValue('userIds')), fieldValue("organizationId", refValue('organizationId'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('role', 'role', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        )))
                )))))
        );
const OrganizationAlterPublishedSelector = obj(
            field('alphaAlterPublished', 'alphaAlterPublished', args(fieldValue("id", refValue('organizationId')), fieldValue("published", refValue('published'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Organization', OrganizationSearchSelector)
                )))
        );
const OrganizationChangeMemberRoleSelector = obj(
            field('alphaOrganizationChangeMemberRole', 'alphaOrganizationChangeMemberRole', args(fieldValue("memberId", refValue('memberId')), fieldValue("newRole", refValue('newRole')), fieldValue("organizationId", refValue('organizationId'))), notNull(scalar('String')))
        );
const OrganizationCreatePublicInviteSelector = obj(
            field('alphaOrganizationRefreshInviteLink', 'alphaOrganizationRefreshInviteLink', args(fieldValue("expirationDays", refValue('expirationDays')), fieldValue("organizationId", refValue('organizationId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('key', 'key', args(), notNull(scalar('String'))),
                    field('ttl', 'ttl', args(), scalar('String'))
                )))
        );
const OrganizationMemberRemoveSelector = obj(
            field('betaOrganizationMemberRemove', 'betaOrganizationMemberRemove', args(fieldValue("userId", refValue('userId')), fieldValue("organizationId", refValue('organizationId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const PaymentIntentCancelSelector = obj(
            field('paymentCancel', 'paymentCancel', args(fieldValue("id", refValue('id'))), notNull(scalar('Boolean')))
        );
const PaymentIntentCommitSelector = obj(
            field('paymentIntentCommit', 'paymentIntentCommit', args(fieldValue("id", refValue('id'))), notNull(scalar('Boolean')))
        );
const PersistEventsSelector = obj(
            field('track', 'track', args(fieldValue("did", refValue('did')), fieldValue("events", refValue('events')), fieldValue("isProd", refValue('isProd'))), notNull(scalar('String')))
        );
const PinMessageSelector = obj(
            field('gammaPinMessage', 'pinMessage', args(fieldValue("chatId", refValue('chatId')), fieldValue("messageId", refValue('messageId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', RoomShortSelector)
                )))
        );
const ProfileCreateSelector = obj(
            field('profileCreate', 'profileCreate', args(fieldValue("input", refValue('input')), fieldValue("inviteKey", refValue('inviteKey'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('firstName', 'firstName', args(), scalar('String')),
                    field('lastName', 'lastName', args(), scalar('String')),
                    field('photoRef', 'photoRef', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('uuid', 'uuid', args(), notNull(scalar('String'))),
                            field('crop', 'crop', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('x', 'x', args(), notNull(scalar('Int'))),
                                    field('y', 'y', args(), notNull(scalar('Int'))),
                                    field('w', 'w', args(), notNull(scalar('Int'))),
                                    field('h', 'h', args(), notNull(scalar('Int')))
                                ))
                        )),
                    field('email', 'email', args(), scalar('String')),
                    field('phone', 'phone', args(), scalar('String')),
                    field('website', 'website', args(), scalar('String')),
                    field('about', 'about', args(), scalar('String')),
                    field('location', 'location', args(), scalar('String'))
                )))
        );
const ProfileUpdateSelector = obj(
            field('profileUpdate', 'profileUpdate', args(fieldValue("input", refValue('input')), fieldValue("uid", refValue('uid')), fieldValue("inviteKey", refValue('inviteKey'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('firstName', 'firstName', args(), scalar('String')),
                    field('lastName', 'lastName', args(), scalar('String')),
                    field('photoRef', 'photoRef', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('uuid', 'uuid', args(), notNull(scalar('String'))),
                            field('crop', 'crop', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('x', 'x', args(), notNull(scalar('Int'))),
                                    field('y', 'y', args(), notNull(scalar('Int'))),
                                    field('w', 'w', args(), notNull(scalar('Int'))),
                                    field('h', 'h', args(), notNull(scalar('Int')))
                                ))
                        )),
                    field('email', 'email', args(), scalar('String')),
                    field('phone', 'phone', args(), scalar('String')),
                    field('website', 'website', args(), scalar('String')),
                    field('about', 'about', args(), scalar('String')),
                    field('location', 'location', args(), scalar('String')),
                    field('alphaRole', 'role', args(), scalar('String')),
                    field('linkedin', 'linkedin', args(), scalar('String')),
                    field('instagram', 'instagram', args(), scalar('String')),
                    field('facebook', 'facebook', args(), scalar('String')),
                    field('twitter', 'twitter', args(), scalar('String')),
                    field('alphaPrimaryOrganizationId', 'primaryOrganizationId', args(), scalar('ID')),
                    field('alphaJoinedAt', 'joinedAt', args(), scalar('String')),
                    field('alphaInvitedBy', 'invitedBy', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('name', 'name', args(), notNull(scalar('String')))
                        ))
                )))
        );
const ReadNotificationSelector = obj(
            field('readNotification', 'readNotification', args(fieldValue("notificationId", refValue('notificationId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('unread', 'unread', args(), notNull(scalar('Int')))
                )))
        );
const RefreshAppTokenSelector = obj(
            field('refreshAppToken', 'refreshAppToken', args(fieldValue("appId", refValue('appId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('AppProfile', AppFullSelector)
                )))
        );
const RegisterPushSelector = obj(
            field('registerPush', 'registerPush', args(fieldValue("endpoint", refValue('endpoint')), fieldValue("type", refValue('type'))), notNull(scalar('String')))
        );
const RegisterWebPushSelector = obj(
            field('registerWebPush', 'registerWebPush', args(fieldValue("endpoint", refValue('endpoint'))), notNull(scalar('String')))
        );
const RemoveCardSelector = obj(
            field('cardRemove', 'cardRemove', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('deleted', 'deleted', args(), notNull(scalar('Boolean')))
                )))
        );
const ReportContentSelector = obj(
            field('reportContent', 'reportContent', args(fieldValue("contentId", refValue('contentId')), fieldValue("type", refValue('type')), fieldValue("message", refValue('message'))), scalar('Boolean'))
        );
const ReportOnlineSelector = obj(
            field('presenceReportOnline', 'presenceReportOnline', args(fieldValue("timeout", intValue(5000)), fieldValue("active", refValue('active')), fieldValue("platform", refValue('platform'))), notNull(scalar('String')))
        );
const RoomAddMembersSelector = obj(
            field('alphaRoomInvite', 'alphaRoomInvite', args(fieldValue("roomId", refValue('roomId')), fieldValue("invites", refValue('invites'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        ))),
                    field('role', 'role', args(), notNull(scalar('String'))),
                    field('membership', 'membership', args(), notNull(scalar('String'))),
                    field('canKick', 'canKick', args(), notNull(scalar('Boolean'))),
                    field('badge', 'badge', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('UserBadge', UserBadgeSelector)
                        ))
                )))))
        );
const RoomAlterFeaturedSelector = obj(
            field('betaRoomAlterFeatured', 'betaRoomAlterFeatured', args(fieldValue("roomId", refValue('roomId')), fieldValue("featured", refValue('featured'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('listed', 'listed', args(), notNull(scalar('Boolean'))),
                    field('featured', 'featured', args(), notNull(scalar('Boolean')))
                )))
        );
const RoomAlterHiddenSelector = obj(
            field('betaRoomAlterListed', 'betaRoomAlterListed', args(fieldValue("roomId", refValue('roomId')), fieldValue("listed", refValue('listed'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('listed', 'listed', args(), notNull(scalar('Boolean'))),
                    field('featured', 'featured', args(), notNull(scalar('Boolean')))
                )))
        );
const RoomChangeRoleSelector = obj(
            field('betaRoomChangeRole', 'betaRoomChangeRole', args(fieldValue("roomId", refValue('roomId')), fieldValue("userId", refValue('userId')), fieldValue("newRole", refValue('newRole'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', RoomFullSelector)
                )))
        );
const RoomCreateSelector = obj(
            field('betaRoomCreate', 'room', args(fieldValue("kind", refValue('kind')), fieldValue("members", refValue('members')), fieldValue("message", refValue('message')), fieldValue("title", refValue('title')), fieldValue("description", refValue('description')), fieldValue("photoRef", refValue('photoRef')), fieldValue("organizationId", refValue('organizationId')), fieldValue("channel", refValue('channel')), fieldValue("price", refValue('price')), fieldValue("interval", refValue('interval'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const RoomDeleteMessageSelector = obj(
            field('betaMessageDelete', 'betaMessageDelete', args(fieldValue("mid", refValue('messageId'))), notNull(scalar('Boolean')))
        );
const RoomDeleteMessagesSelector = obj(
            field('betaMessageDelete', 'betaMessageDelete', args(fieldValue("mids", refValue('mids'))), notNull(scalar('Boolean')))
        );
const RoomDeleteUrlAugmentationSelector = obj(
            field('betaMessageDeleteAugmentation', 'betaMessageDeleteAugmentation', args(fieldValue("mid", refValue('messageId'))), notNull(scalar('Boolean')))
        );
const RoomJoinSelector = obj(
            field('betaRoomJoin', 'join', args(fieldValue("roomId", refValue('roomId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('PrivateRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )),
                    inline('SharedRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    ))
                )))
        );
const RoomJoinInviteLinkSelector = obj(
            field('betaRoomInviteLinkJoin', 'join', args(fieldValue("invite", refValue('invite'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', RoomShortSelector)
                )))
        );
const RoomKickSelector = obj(
            field('betaRoomKick', 'betaRoomKick', args(fieldValue("roomId", refValue('roomId')), fieldValue("userId", refValue('userId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', RoomFullSelector)
                )))
        );
const RoomLeaveSelector = obj(
            field('betaRoomLeave', 'betaRoomLeave', args(fieldValue("roomId", refValue('roomId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('PrivateRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )),
                    inline('SharedRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    ))
                )))
        );
const RoomReadSelector = obj(
            field('roomRead', 'roomRead', args(fieldValue("id", refValue('id')), fieldValue("mid", refValue('mid'))), notNull(scalar('Boolean')))
        );
const RoomRenewInviteLinkSelector = obj(
            field('betaRoomInviteLinkRenew', 'link', args(fieldValue("roomId", refValue('roomId'))), notNull(scalar('String')))
        );
const RoomSettingsUpdateSelector = obj(
            field('betaRoomUpdateUserNotificationSettings', 'betaRoomUpdateUserNotificationSettings', args(fieldValue("settings", refValue('settings')), fieldValue("roomId", refValue('roomId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('mute', 'mute', args(), scalar('Boolean'))
                )))
        );
const RoomUpdateSelector = obj(
            field('betaRoomUpdate', 'betaRoomUpdate', args(fieldValue("roomId", refValue('roomId')), fieldValue("input", refValue('input'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('PrivateRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )),
                    inline('SharedRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('title', 'title', args(), notNull(scalar('String'))),
                        field('photo', 'photo', args(), notNull(scalar('String'))),
                        field('description', 'description', args(), scalar('String')),
                        field('socialImage', 'socialImage', args(), scalar('String'))
                    ))
                )))
        );
const RoomsInviteUserSelector = obj(
            field('betaRoomsInviteUser', 'rooms', args(fieldValue("userId", refValue('userId')), fieldValue("roomIds", refValue('roomIds'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', RoomShortSelector)
                )))))
        );
const RoomsJoinSelector = obj(
            field('betaRoomsJoin', 'join', args(fieldValue("roomsIds", refValue('roomsIds'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('PrivateRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )),
                    inline('SharedRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    ))
                )))))
        );
const SendMessageSelector = obj(
            field('sendMessage', 'sentMessage', args(fieldValue("chatId", refValue('chatId')), fieldValue("message", refValue('message')), fieldValue("replyMessages", refValue('replyMessages')), fieldValue("mentions", refValue('mentions')), fieldValue("fileAttachments", refValue('fileAttachments')), fieldValue("spans", refValue('spans')), fieldValue("repeatKey", refValue('repeatKey'))), notNull(scalar('Boolean')))
        );
const SendStickerSelector = obj(
            field('sendSticker', 'sendSticker', args(fieldValue("chatId", refValue('chatId')), fieldValue("stickerId", refValue('stickerId')), fieldValue("replyMessages", refValue('replyMessages')), fieldValue("repeatKey", refValue('repeatKey'))), notNull(scalar('Boolean')))
        );
const SetFeedChannelShortnameSelector = obj(
            field('alphaSetFeedChannelShortName', 'alphaSetFeedChannelShortName', args(fieldValue("id", refValue('id')), fieldValue("shortname", refValue('shortname'))), scalar('String'))
        );
const SetOrgShortnameSelector = obj(
            field('alphaSetOrgShortName', 'alphaSetOrgShortName', args(fieldValue("id", refValue('organizationId')), fieldValue("shortname", refValue('shortname'))), scalar('String'))
        );
const SetRoomShortnameSelector = obj(
            field('alphaSetRoomShortName', 'alphaSetRoomShortName', args(fieldValue("id", refValue('id')), fieldValue("shortname", refValue('shortname'))), scalar('String'))
        );
const SetTypingSelector = obj(
            field('typingSend', 'typingSend', args(fieldValue("conversationId", refValue('conversationId')), fieldValue("type", refValue('type'))), notNull(scalar('String')))
        );
const SetUserShortnameSelector = obj(
            field('alphaSetUserShortName', 'alphaSetUserShortName', args(fieldValue("shortname", refValue('shortname'))), scalar('String'))
        );
const SettingsUpdateSelector = obj(
            field('updateSettings', 'updateSettings', args(fieldValue("settings", refValue('input'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Settings', SettingsFullSelector)
                )))
        );
const StickerPackAddToCollectionSelector = obj(
            field('stickerPackAddToCollection', 'stickerPackAddToCollection', args(fieldValue("id", refValue('id'))), notNull(scalar('Boolean')))
        );
const StickerPackRemoveFromCollectionSelector = obj(
            field('stickerPackRemoveFromCollection', 'stickerPackRemoveFromCollection', args(fieldValue("id", refValue('id'))), notNull(scalar('Boolean')))
        );
const SubscribeToCommentsSelector = obj(
            field('subscribeToComments', 'subscribeToComments', args(fieldValue("peerId", refValue('peerId')), fieldValue("type", refValue('type'))), notNull(scalar('Boolean')))
        );
const SuperAccountActivateSelector = obj(
            field('superAccountActivate', 'superAccountActivate', args(fieldValue("id", refValue('accountId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('state', 'state', args(), notNull(scalar('String')))
                )))
        );
const SuperAccountAddSelector = obj(
            field('superAccountAdd', 'superAccountAdd', args(fieldValue("title", refValue('title'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const SuperAccountMemberAddSelector = obj(
            field('superAccountMemberAdd', 'superAccountMemberAdd', args(fieldValue("id", refValue('accountId')), fieldValue("userId", refValue('userId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('members', 'members', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        )))))
                )))
        );
const SuperAccountMemberRemoveSelector = obj(
            field('superAccountMemberRemove', 'superAccountMemberRemove', args(fieldValue("id", refValue('accountId')), fieldValue("userId", refValue('userId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('members', 'members', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        )))))
                )))
        );
const SuperAccountPendSelector = obj(
            field('superAccountPend', 'superAccountPend', args(fieldValue("id", refValue('accountId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('state', 'state', args(), notNull(scalar('String')))
                )))
        );
const SuperAccountRenameSelector = obj(
            field('superAccountRename', 'superAccountRename', args(fieldValue("id", refValue('accountId')), fieldValue("title", refValue('title'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('title', 'title', args(), notNull(scalar('String')))
                )))
        );
const SuperAccountSuspendSelector = obj(
            field('superAccountSuspend', 'superAccountSuspend', args(fieldValue("id", refValue('accountId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('state', 'state', args(), notNull(scalar('String')))
                )))
        );
const SuperAdminAddSelector = obj(
            field('superAdminAdd', 'superAdminAdd', args(fieldValue("userId", refValue('userId')), fieldValue("role", refValue('role'))), notNull(scalar('String')))
        );
const SuperAdminRemoveSelector = obj(
            field('superAdminRemove', 'superAdminRemove', args(fieldValue("userId", refValue('userId'))), notNull(scalar('String')))
        );
const SuperBadgeCreateToRoomSelector = obj(
            field('superBadgeCreateToRoom', 'superBadgeCreateToRoom', args(fieldValue("roomId", refValue('roomId')), fieldValue("userId", refValue('userId')), fieldValue("name", refValue('name'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('UserBadge', UserBadgeSelector)
                )))
        );
const SuperBadgeUnsetToRoomSelector = obj(
            field('superBadgeUnsetToRoom', 'superBadgeUnsetToRoom', args(fieldValue("roomId", refValue('roomId')), fieldValue("userId", refValue('userId')), fieldValue("badgeId", refValue('badgeId'))), notNull(scalar('Boolean')))
        );
const UnSubscribeFromCommentsSelector = obj(
            field('unsubscribeFromComments', 'unsubscribeFromComments', args(fieldValue("peerId", refValue('peerId'))), notNull(scalar('Boolean')))
        );
const UnpinMessageSelector = obj(
            field('gammaUnpinMessage', 'unpinMessage', args(fieldValue("chatId", refValue('chatId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', RoomShortSelector)
                )))
        );
const UnsetTypingSelector = obj(
            field('typingCancel', 'typingCancel', args(fieldValue("conversationId", refValue('conversationId'))), notNull(scalar('String')))
        );
const UpdateAppSelector = obj(
            field('updateAppProfile', 'updateAppProfile', args(fieldValue("appId", refValue('appId')), fieldValue("input", refValue('input'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('AppProfile', AppFullSelector)
                )))
        );
const UpdateOrganizationSelector = obj(
            field('updateOrganizationProfile', 'updateOrganizationProfile', args(fieldValue("input", refValue('input')), fieldValue("id", refValue('organizationId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('OrganizationProfile', OrganizationProfileFullSelector)
                )))
        );
const UpdateWelcomeMessageSelector = obj(
            field('updateWelcomeMessage', 'updateWelcomeMessage', args(fieldValue("roomId", refValue('roomId')), fieldValue("welcomeMessageIsOn", refValue('welcomeMessageIsOn')), fieldValue("welcomeMessageSender", refValue('welcomeMessageSender')), fieldValue("welcomeMessageText", refValue('welcomeMessageText'))), notNull(scalar('Boolean')))
        );
const UserStorageSetSelector = obj(
            field('userStorageSet', 'userStorageSet', args(fieldValue("namespace", refValue('namespace')), fieldValue("data", refValue('data'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('key', 'key', args(), notNull(scalar('String'))),
                    field('value', 'value', args(), scalar('String'))
                )))))
        );
const ChatOnlinesCountWatchSelector = obj(
            field('chatOnlinesCount', 'chatOnlinesCount', args(fieldValue("chatId", refValue('chatId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('onlineMembers', 'onlineMembers', args(), notNull(scalar('Int')))
                )))
        );
const ChatWatchSelector = obj(
            field('chatUpdates', 'event', args(fieldValue("chatId", refValue('chatId')), fieldValue("fromState", refValue('state'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('ChatUpdateSingle', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('seq', 'seq', args(), notNull(scalar('Int'))),
                        field('state', 'state', args(), notNull(scalar('String'))),
                        field('update', 'update', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('ChatUpdate', ChatUpdateFragmentSelector)
                            )))
                    )),
                    inline('ChatUpdateBatch', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('fromSeq', 'fromSeq', args(), notNull(scalar('Int'))),
                        field('seq', 'seq', args(), notNull(scalar('Int'))),
                        field('state', 'state', args(), notNull(scalar('String'))),
                        field('updates', 'updates', args(), notNull(list(notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('ChatUpdate', ChatUpdateFragmentSelector)
                            )))))
                    ))
                )))
        );
const CommentWatchSelector = obj(
            field('commentUpdates', 'event', args(fieldValue("peerId", refValue('peerId')), fieldValue("fromState", refValue('fromState'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('CommentUpdateSingle', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('seq', 'seq', args(), notNull(scalar('Int'))),
                        field('state', 'state', args(), notNull(scalar('String'))),
                        field('update', 'update', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('CommentUpdate', CommentUpdateFragmentSelector)
                            )))
                    )),
                    inline('CommentUpdateBatch', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('fromSeq', 'fromSeq', args(), notNull(scalar('Int'))),
                        field('seq', 'seq', args(), notNull(scalar('Int'))),
                        field('state', 'state', args(), notNull(scalar('String'))),
                        field('updates', 'updates', args(), notNull(list(notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('CommentUpdate', CommentUpdateFragmentSelector)
                            )))))
                    ))
                ))
        );
const ConferenceMediaWatchSelector = obj(
            field('alphaConferenceMediaWatch', 'media', args(fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('streams', 'streams', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('peerId', 'peerId', args(), scalar('ID')),
                            field('state', 'state', args(), notNull(scalar('String'))),
                            field('sdp', 'sdp', args(), scalar('String')),
                            field('ice', 'ice', args(), notNull(list(notNull(scalar('String')))))
                        )))))
                )))
        );
const ConferenceWatchSelector = obj(
            field('alphaConferenceWatch', 'alphaConferenceWatch', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Conference', ConferenceFullSelector)
                )))
        );
const DebugEventsWatchSelector = obj(
            field('debugEvents', 'debugEvents', args(fieldValue("fromState", refValue('fromState')), fieldValue("eventsCount", refValue('eventsCount')), fieldValue("randomDelays", refValue('randomDelays')), fieldValue("seed", refValue('seed'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('seq', 'seq', args(), notNull(scalar('Int'))),
                    field('key', 'key', args(), notNull(scalar('String')))
                )))
        );
const DialogsWatchSelector = obj(
            field('dialogsUpdates', 'event', args(fieldValue("fromState", refValue('state'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('DialogUpdateSingle', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('state', 'state', args(), notNull(scalar('String'))),
                        field('update', 'update', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('DialogUpdate', DialogUpdateFragmentSelector)
                            )))
                    )),
                    inline('DialogUpdateBatch', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('state', 'state', args(), notNull(scalar('String'))),
                        field('updates', 'updates', args(), notNull(list(notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('DialogUpdate', DialogUpdateFragmentSelector)
                            )))))
                    ))
                )))
        );
const FeedUpdatesSelector = obj(
            field('homeFeedUpdates', 'event', args(fieldValue("fromState", refValue('state'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('updates', 'updates', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('FeedUpdate', FeedUpdateFragmentSelector)
                        ))))),
                    field('state', 'state', args(), notNull(scalar('String')))
                )))
        );
const MyNotificationsCenterSelector = obj(
            field('notificationCenterUpdates', 'event', args(fieldValue("fromState", refValue('state'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('NotificationCenterUpdateSingle', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('seq', 'seq', args(), notNull(scalar('Int'))),
                        field('state', 'state', args(), notNull(scalar('String'))),
                        field('update', 'update', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('NotificationCenterUpdate', NotificationCenterUpdateFragmentSelector)
                            )))
                    )),
                    inline('NotificationCenterUpdateBatch', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('fromSeq', 'fromSeq', args(), notNull(scalar('Int'))),
                        field('seq', 'seq', args(), notNull(scalar('Int'))),
                        field('state', 'state', args(), notNull(scalar('String'))),
                        field('updates', 'updates', args(), notNull(list(notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('NotificationCenterUpdate', NotificationCenterUpdateFragmentSelector)
                            )))))
                    ))
                ))
        );
const OnlineWatchSelector = obj(
            field('alphaSubscribeOnline', 'alphaSubscribeOnline', args(fieldValue("users", refValue('users'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('online', 'online', args(), notNull(scalar('Boolean'))),
                            field('lastSeen', 'lastSeen', args(), scalar('String'))
                        ))),
                    field('timeout', 'timeout', args(), notNull(scalar('Int')))
                )))
        );
const SettingsWatchSelector = obj(
            field('watchSettings', 'watchSettings', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Settings', SettingsFullSelector)
                )))
        );
const TypingsWatchSelector = obj(
            field('typings', 'typings', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('chat', 'conversation', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            inline('PrivateRoom', obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID')))
                            )),
                            inline('SharedRoom', obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID')))
                            ))
                        ))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('photo', 'photo', args(), scalar('String')),
                            field('firstName', 'firstName', args(), notNull(scalar('String')))
                        ))),
                    field('cancel', 'cancel', args(), notNull(scalar('Boolean'))),
                    field('type', 'type', args(), notNull(scalar('String')))
                )))
        );
const WalletUpdatesSelector = obj(
            field('walletUpdates', 'event', args(fieldValue("fromState", refValue('state'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('WalletUpdateSingle', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('state', 'state', args(), notNull(scalar('String'))),
                        field('update', 'update', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('WalletUpdate', WalletUpdateFragmentSelector)
                            )))
                    )),
                    inline('WalletUpdateBatch', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('state', 'state', args(), notNull(scalar('String'))),
                        field('updates', 'updates', args(), notNull(list(notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('WalletUpdate', WalletUpdateFragmentSelector)
                            )))))
                    ))
                )))
        );
export const Operations: { [key: string]: OperationDefinition } = {
    Account: {
        kind: 'query',
        name: 'Account',
        body: 'query Account{me:me{__typename ...UserShort}myProfile{__typename id authEmail}sessionState:sessionState{__typename ...SessionStateFull}myPermissions{__typename roles}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment SessionStateFull on SessionState{__typename isLoggedIn isActivated isProfileCreated isAccountActivated isAccountExists isAccountPicked isCompleted isBlocked}',
        selector: AccountSelector
    },
    AccountAppInvite: {
        kind: 'query',
        name: 'AccountAppInvite',
        body: 'query AccountAppInvite{invite:appInvite}',
        selector: AccountAppInviteSelector
    },
    AccountAppInviteInfo: {
        kind: 'query',
        name: 'AccountAppInviteInfo',
        body: 'query AccountAppInviteInfo($inviteKey:String!){invite:alphaInviteInfo(key:$inviteKey){__typename id creator{__typename ...UserShort}}appInvite:appInviteInfo(key:$inviteKey){__typename inviter{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: AccountAppInviteInfoSelector
    },
    AccountInviteInfo: {
        kind: 'query',
        name: 'AccountInviteInfo',
        body: 'query AccountInviteInfo($inviteKey:String!){invite:alphaInviteInfo(key:$inviteKey){__typename id key orgId title photo joined creator{__typename ...UserShort}forEmail forName membersCount organization{__typename id isCommunity:alphaIsCommunity about}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: AccountInviteInfoSelector
    },
    AccountSettings: {
        kind: 'query',
        name: 'AccountSettings',
        body: 'query AccountSettings{me:me{__typename ...UserShort audienceSize}myProfile{__typename id authEmail}organizations:myOrganizations{__typename ...OrganizationShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: AccountSettingsSelector
    },
    AuthResolveShortName: {
        kind: 'query',
        name: 'AuthResolveShortName',
        body: 'query AuthResolveShortName($shortname:String!){item:alphaResolveShortName(shortname:$shortname){__typename ... on User{__typename ...UserNano}... on SharedRoom{__typename ...RoomPreview}}}fragment UserNano on User{__typename id name firstName lastName photo online}fragment RoomPreview on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}}... on SharedRoom{__typename id isChannel isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}membership owner{__typename id}matchmaking{__typename enabled}title photo membersCount description previewMembers{__typename id name photo}onlineMembersCount}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: AuthResolveShortNameSelector
    },
    ChatInit: {
        kind: 'query',
        name: 'ChatInit',
        body: 'query ChatInit($chatId:ID!,$before:ID,$first:Int!){messages(chatId:$chatId,first:$first,before:$before){__typename ...FullMessage}state:conversationState(id:$chatId){__typename state}room(id:$chatId){__typename ...RoomShort}lastReadedMessage(chatId:$chatId){__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount pinnedMessage{__typename ...FullMessage}matchmaking{__typename ...MatchmakingRoomFragment}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName}}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}',
        selector: ChatInitSelector
    },
    ChatInitFromUnread: {
        kind: 'query',
        name: 'ChatInitFromUnread',
        body: 'query ChatInitFromUnread($chatId:ID!,$before:ID,$first:Int!){gammaMessages(chatId:$chatId,first:$first,before:$before){__typename messages{__typename ...FullMessage}haveMoreForward haveMoreBackward}state:conversationState(id:$chatId){__typename state}room(id:$chatId){__typename ...RoomShort}lastReadedMessage(chatId:$chatId){__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount pinnedMessage{__typename ...FullMessage}matchmaking{__typename ...MatchmakingRoomFragment}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName}}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}',
        selector: ChatInitFromUnreadSelector
    },
    ChatJoin: {
        kind: 'query',
        name: 'ChatJoin',
        body: 'query ChatJoin($id:ID!){room(id:$id){__typename ... on SharedRoom{__typename id title description photo membersCount onlineMembersCount previewMembers{__typename id photo name}isChannel isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}}',
        selector: ChatJoinSelector
    },
    ChatMembersSearch: {
        kind: 'query',
        name: 'ChatMembersSearch',
        body: 'query ChatMembersSearch($cid:ID!,$query:String,$first:Int!,$after:String){members:chatMembersSearch(cid:$cid,query:$query,first:$first,after:$after){__typename edges{__typename user:node{__typename id name shortname photo primaryOrganization{__typename id name}}cursor}pageInfo{__typename hasNextPage}}}',
        selector: ChatMembersSearchSelector
    },
    ChatMentionSearch: {
        kind: 'query',
        name: 'ChatMentionSearch',
        body: 'query ChatMentionSearch($cid:ID!,$query:String,$first:Int!,$after:String){mentions:chatMentionSearch(cid:$cid,query:$query,first:$first,after:$after){__typename globalItems{__typename ... on Organization{__typename ...OrganizationShort}... on User{__typename ...UserForMention}... on SharedRoom{__typename ...RoomSharedNano}}localItems{__typename ...UserForMention}cursor}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}',
        selector: ChatMentionSearchSelector
    },
    Comments: {
        kind: 'query',
        name: 'Comments',
        body: 'query Comments($peerId:ID!){comments(peerId:$peerId){__typename id state{__typename state}count comments{__typename ...CommentEntryFragment}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage id}parentComment{__typename comment:betaComment{__typename id message}id}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}',
        selector: CommentsSelector
    },
    Conference: {
        kind: 'query',
        name: 'Conference',
        body: 'query Conference($id:ID!){conference(id:$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename id startTime peers{__typename id user{__typename ...UserShort}connection{__typename state sdp ice}}iceServers{__typename urls username credential}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: ConferenceSelector
    },
    ConferenceMedia: {
        kind: 'query',
        name: 'ConferenceMedia',
        body: 'query ConferenceMedia($id:ID!,$peerId:ID!){conferenceMedia(id:$id,peerId:$peerId){__typename id streams{__typename id peerId state sdp ice}iceServers{__typename urls username credential}}}',
        selector: ConferenceMediaSelector
    },
    Dialogs: {
        kind: 'query',
        name: 'Dialogs',
        body: 'query Dialogs($after:String){dialogs(first:20,after:$after){__typename items{__typename ...DialogFragment}cursor}state:dialogsState{__typename state}counter:alphaNotificationCounter{__typename id unreadCount}}fragment DialogFragment on Dialog{__typename id cid fid kind isChannel isPremium title photo unreadCount isMuted haveMention topMessage:alphaTopMessage{__typename ...DialogMessage}membership}fragment DialogMessage on ModernMessage{__typename id date sender{__typename id name photo firstName}message fallback ... on GeneralMessage{__typename id quotedMessages{__typename id}}}',
        selector: DialogsSelector
    },
    DiscoverCollection: {
        kind: 'query',
        name: 'DiscoverCollection',
        body: 'query DiscoverCollection($id:ID!){discoverCollection(id:$id){__typename id title chats{__typename ...DiscoverSharedRoom}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}',
        selector: DiscoverCollectionSelector
    },
    DiscoverCollectionShort: {
        kind: 'query',
        name: 'DiscoverCollectionShort',
        body: 'query DiscoverCollectionShort($id:ID!){discoverCollection(id:$id){__typename id title image{__typename uuid crop{__typename x y w h}}}}',
        selector: DiscoverCollectionShortSelector
    },
    DiscoverCollections: {
        kind: 'query',
        name: 'DiscoverCollections',
        body: 'query DiscoverCollections($first:Int!,$after:String){discoverCollections(first:$first,after:$after){__typename items{__typename ...DiscoverChatsCollection}cursor}}fragment DiscoverChatsCollection on DiscoverChatsCollection{__typename id title chatsCount chats{__typename ...DiscoverSharedRoom}image{__typename uuid crop{__typename x y w h}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}',
        selector: DiscoverCollectionsSelector
    },
    DiscoverCollectionsShort: {
        kind: 'query',
        name: 'DiscoverCollectionsShort',
        body: 'query DiscoverCollectionsShort($first:Int!,$after:String){discoverCollections(first:$first,after:$after){__typename items{__typename ...DiscoverChatsCollectionShort}cursor}}fragment DiscoverChatsCollectionShort on DiscoverChatsCollection{__typename id title chatsCount image{__typename uuid crop{__typename x y w h}}}',
        selector: DiscoverCollectionsShortSelector
    },
    DiscoverEditorsChoice: {
        kind: 'query',
        name: 'DiscoverEditorsChoice',
        body: 'query DiscoverEditorsChoice{discoverEditorsChoice{__typename id image{__typename uuid crop{__typename x y w h}}chat{__typename ...DiscoverSharedRoom}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}',
        selector: DiscoverEditorsChoiceSelector
    },
    DiscoverIsDone: {
        kind: 'query',
        name: 'DiscoverIsDone',
        body: 'query DiscoverIsDone{betaIsDiscoverDone}',
        selector: DiscoverIsDoneSelector
    },
    DiscoverNewAndGrowing: {
        kind: 'query',
        name: 'DiscoverNewAndGrowing',
        body: 'query DiscoverNewAndGrowing($first:Int!,$seed:Int!,$after:String){discoverNewAndGrowing(first:$first,seed:$seed,after:$after){__typename items{__typename ...DiscoverSharedRoom}cursor}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}',
        selector: DiscoverNewAndGrowingSelector
    },
    DiscoverNextPage: {
        kind: 'query',
        name: 'DiscoverNextPage',
        body: 'query DiscoverNextPage($selectedTagsIds:[String!]!,$excudedGroupsIds:[String!]!){betaNextDiscoverPage:gammaNextDiscoverPage(selectedTagsIds:$selectedTagsIds,excudedGroupsIds:$excudedGroupsIds){__typename chats{__typename ...RoomShort}tagGroup{__typename id title subtitle tags{__typename id title}}}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount pinnedMessage{__typename ...FullMessage}matchmaking{__typename ...MatchmakingRoomFragment}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}',
        selector: DiscoverNextPageSelector
    },
    DiscoverPopularNow: {
        kind: 'query',
        name: 'DiscoverPopularNow',
        body: 'query DiscoverPopularNow($first:Int!,$after:String){discoverPopularNow(first:$first,after:$after){__typename items{__typename room{__typename ...DiscoverSharedRoom}newMessages}cursor}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}',
        selector: DiscoverPopularNowSelector
    },
    DiscoverState: {
        kind: 'query',
        name: 'DiscoverState',
        body: 'query DiscoverState{dialogs(first:1){__typename items{__typename id}}}',
        selector: DiscoverStateSelector
    },
    DiscoverSuggestedRooms: {
        kind: 'query',
        name: 'DiscoverSuggestedRooms',
        body: 'query DiscoverSuggestedRooms{suggestedRooms:betaSuggestedRooms{__typename ...DiscoverSharedRoom}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}',
        selector: DiscoverSuggestedRoomsSelector
    },
    DiscoverTopFree: {
        kind: 'query',
        name: 'DiscoverTopFree',
        body: 'query DiscoverTopFree($first:Int!,$after:String){discoverTopFree(first:$first,after:$after){__typename items{__typename ...DiscoverSharedRoom}cursor}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}',
        selector: DiscoverTopFreeSelector
    },
    DiscoverTopPremium: {
        kind: 'query',
        name: 'DiscoverTopPremium',
        body: 'query DiscoverTopPremium($first:Int!,$after:String){discoverTopPremium(first:$first,after:$after){__typename items{__typename ...DiscoverSharedRoom}cursor}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}',
        selector: DiscoverTopPremiumSelector
    },
    ExplorePeople: {
        kind: 'query',
        name: 'ExplorePeople',
        body: 'query ExplorePeople($query:String,$sort:String,$page:Int,$after:String){items:userSearch(query:$query,sort:$sort,page:$page,first:25,after:$after){__typename edges{__typename node{__typename ...UserShort isYou}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount currentPage pagesCount openEnded}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: ExplorePeopleSelector
    },
    ExploreRooms: {
        kind: 'query',
        name: 'ExploreRooms',
        body: 'query ExploreRooms($seed:Int!){discoverNewAndGrowing(first:3,seed:$seed){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverPopularNow(first:3){__typename items{__typename room{__typename ...DiscoverSharedRoom}newMessages}cursor}suggestedRooms:betaSuggestedRooms{__typename ...DiscoverSharedRoom}discoverTopPremium(first:5){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverTopFree(first:5){__typename items{__typename ...DiscoverSharedRoom}cursor}isDiscoverDone:betaIsDiscoverDone}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}',
        selector: ExploreRoomsSelector
    },
    FeatureFlags: {
        kind: 'query',
        name: 'FeatureFlags',
        body: 'query FeatureFlags{featureFlags{__typename id key title}}',
        selector: FeatureFlagsSelector
    },
    FeedChannel: {
        kind: 'query',
        name: 'FeedChannel',
        body: 'query FeedChannel($id:ID!){channel:alphaFeedChannel(id:$id){__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}',
        selector: FeedChannelSelector
    },
    FeedChannelContent: {
        kind: 'query',
        name: 'FeedChannelContent',
        body: 'query FeedChannelContent($id:ID!,$first:Int!,$after:String){content:alphaFeedChannelContent(id:$id,first:$first,after:$after){__typename items{__typename ...FeedItemFull}cursor}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{__typename id date author{__typename ...FeedPostAuthorFragment}source{__typename ...FeedPostSourceFragment}edited canEdit commentsCount message fallback reactions{__typename user{__typename ...UserShort}reaction}slides{__typename ...SlideFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{__typename ...UserShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}fragment SlideFragment on Slide{__typename ... on TextSlide{__typename id text spans{__typename ...SpanFragment}cover{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}coverAlign attachments{__typename ... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title roomPhoto:photo membersCount membership canSendMessage organization{__typename id name photo}}... on Organization{__typename ...OrganizationShort}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}',
        selector: FeedChannelContentSelector
    },
    FeedChannelSubscribers: {
        kind: 'query',
        name: 'FeedChannelSubscribers',
        body: 'query FeedChannelSubscribers($channelId:ID!,$query:String,$first:Int!,$after:String){subscribers:alphaFeedChannelSubscribers(channelId:$channelId,query:$query,first:$first,after:$after){__typename edges{__typename node{__typename user{__typename ...UserShort}role}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount pagesCount currentPage openEnded}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: FeedChannelSubscribersSelector
    },
    FeedChannelWriters: {
        kind: 'query',
        name: 'FeedChannelWriters',
        body: 'query FeedChannelWriters($id:ID!,$first:Int!,$after:ID){writers:alphaFeedChannelAdmins(id:$id,first:$first,after:$after){__typename items{__typename user{__typename ...UserShort}role}cursor}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: FeedChannelWritersSelector
    },
    FeedChannelsSearch: {
        kind: 'query',
        name: 'FeedChannelsSearch',
        body: 'query FeedChannelsSearch($query:String,$sort:String,$first:Int!,$after:String){search:alphaFeedChannelSearch(query:$query,sort:$sort,first:$first,after:$after){__typename edges{__typename node{__typename ...FeedChannelFull}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount pagesCount currentPage openEnded}}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}',
        selector: FeedChannelsSearchSelector
    },
    FeedItem: {
        kind: 'query',
        name: 'FeedItem',
        body: 'query FeedItem($id:ID!){item:alphaFeedItem(id:$id){__typename ...FeedItemFull}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{__typename id date author{__typename ...FeedPostAuthorFragment}source{__typename ...FeedPostSourceFragment}edited canEdit commentsCount message fallback reactions{__typename user{__typename ...UserShort}reaction}slides{__typename ...SlideFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{__typename ...UserShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}fragment SlideFragment on Slide{__typename ... on TextSlide{__typename id text spans{__typename ...SpanFragment}cover{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}coverAlign attachments{__typename ... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title roomPhoto:photo membersCount membership canSendMessage organization{__typename id name photo}}... on Organization{__typename ...OrganizationShort}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}',
        selector: FeedItemSelector
    },
    FeedLoadMore: {
        kind: 'query',
        name: 'FeedLoadMore',
        body: 'query FeedLoadMore($first:Int!,$after:String){feed:alphaHomeFeed(first:$first,after:$after){__typename items{__typename ...FeedItemFull}cursor}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{__typename id date author{__typename ...FeedPostAuthorFragment}source{__typename ...FeedPostSourceFragment}edited canEdit commentsCount message fallback reactions{__typename user{__typename ...UserShort}reaction}slides{__typename ...SlideFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{__typename ...UserShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}fragment SlideFragment on Slide{__typename ... on TextSlide{__typename id text spans{__typename ...SpanFragment}cover{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}coverAlign attachments{__typename ... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title roomPhoto:photo membersCount membership canSendMessage organization{__typename id name photo}}... on Organization{__typename ...OrganizationShort}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}',
        selector: FeedLoadMoreSelector
    },
    FeedRecommendedChannels: {
        kind: 'query',
        name: 'FeedRecommendedChannels',
        body: 'query FeedRecommendedChannels($first:Int!,$after:String){search:alphaRecommendedChannels(first:$first,after:$after){__typename edges{__typename node{__typename ...FeedChannelFull}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount pagesCount currentPage openEnded}}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}',
        selector: FeedRecommendedChannelsSelector
    },
    FeedSubscriptions: {
        kind: 'query',
        name: 'FeedSubscriptions',
        body: 'query FeedSubscriptions($first:Int!,$after:ID){channels:alphaFeedMySubscriptions(first:$first,after:$after){__typename items{__typename ...FeedChannelFull}cursor}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}',
        selector: FeedSubscriptionsSelector
    },
    FeedWritableChannels: {
        kind: 'query',
        name: 'FeedWritableChannels',
        body: 'query FeedWritableChannels($first:Int!,$after:ID){channels:alphaWritableChannels(first:$first,after:$after){__typename items{__typename ...FeedChannelFull}cursor}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}',
        selector: FeedWritableChannelsSelector
    },
    FetchPushSettings: {
        kind: 'query',
        name: 'FetchPushSettings',
        body: 'query FetchPushSettings{pushSettings{__typename webPushKey}}',
        selector: FetchPushSettingsSelector
    },
    GlobalCounter: {
        kind: 'query',
        name: 'GlobalCounter',
        body: 'query GlobalCounter{alphaNotificationCounter{__typename id unreadCount}}',
        selector: GlobalCounterSelector
    },
    GlobalSearch: {
        kind: 'query',
        name: 'GlobalSearch',
        body: 'query GlobalSearch($query:String!,$kinds:[GlobalSearchEntryKind!]){items:alphaGlobalSearch(query:$query,kinds:$kinds){__typename ... on Organization{__typename id name about photo shortname isCommunity:alphaIsCommunity}... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title canSendMessage roomPhoto:photo membersCount membership organization{__typename id name photo}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: GlobalSearchSelector
    },
    InitFeed: {
        kind: 'query',
        name: 'InitFeed',
        body: 'query InitFeed($first:Int!){feed:alphaHomeFeed(first:$first){__typename items{__typename ...FeedItemFull}cursor}drafts:alphaFeedMyDraftsChannel{__typename ...FeedChannelFull}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{__typename id date author{__typename ...FeedPostAuthorFragment}source{__typename ...FeedPostSourceFragment}edited canEdit commentsCount message fallback reactions{__typename user{__typename ...UserShort}reaction}slides{__typename ...SlideFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{__typename ...UserShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}fragment SlideFragment on Slide{__typename ... on TextSlide{__typename id text spans{__typename ...SpanFragment}cover{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}coverAlign attachments{__typename ... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title roomPhoto:photo membersCount membership canSendMessage organization{__typename id name photo}}... on Organization{__typename ...OrganizationShort}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}',
        selector: InitFeedSelector
    },
    MatchmakingProfile: {
        kind: 'query',
        name: 'MatchmakingProfile',
        body: 'query MatchmakingProfile($peerId:ID!,$uid:ID!){matchmakingProfile(peerId:$peerId,uid:$uid){__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}',
        selector: MatchmakingProfileSelector
    },
    MatchmakingRoom: {
        kind: 'query',
        name: 'MatchmakingRoom',
        body: 'query MatchmakingRoom($peerId:ID!){matchmakingRoom(peerId:$peerId){__typename ...MatchmakingRoomFragment}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}',
        selector: MatchmakingRoomSelector
    },
    Message: {
        kind: 'query',
        name: 'Message',
        body: 'query Message($messageId:ID!){message(messageId:$messageId){__typename ...FullMessage}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}',
        selector: MessageSelector
    },
    MessagesBatch: {
        kind: 'query',
        name: 'MessagesBatch',
        body: 'query MessagesBatch($chatId:ID!,$first:Int!,$before:ID,$after:ID){gammaMessages(chatId:$chatId,first:$first,before:$before,after:$after){__typename messages{__typename ...FullMessage}haveMoreForward haveMoreBackward}state:conversationState(id:$chatId){__typename state}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}',
        selector: MessagesBatchSelector
    },
    MessagesSearch: {
        kind: 'query',
        name: 'MessagesSearch',
        body: 'query MessagesSearch($query:String!,$sort:String,$first:Int!,$after:String){messagesSearch(query:$query,sort:$sort,first:$first,after:$after){__typename edges{__typename node{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename id kind title membership isChannel role canEdit photo settings{__typename id mute}}}message{__typename id date sender{__typename id name firstName photo}senderBadge{__typename ...UserBadge}message fallback ... on GeneralMessage{__typename id attachments{__typename id fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename isImage imageFormat}}}quotedMessages{__typename id}}}}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount currentPage pagesCount openEnded}}}fragment UserBadge on UserBadge{__typename id name verified}',
        selector: MessagesSearchSelector
    },
    MyApps: {
        kind: 'query',
        name: 'MyApps',
        body: 'query MyApps{apps:myApps{__typename ...AppFull}}fragment AppFull on AppProfile{__typename id name shortname photoRef{__typename uuid crop{__typename x y w h}}about token{__typename salt}}',
        selector: MyAppsSelector
    },
    MyCards: {
        kind: 'query',
        name: 'MyCards',
        body: 'query MyCards{myCards{__typename id pmid last4 brand expYear expMonth isDefault deleted}}',
        selector: MyCardsSelector
    },
    MyNotificationCenter: {
        kind: 'query',
        name: 'MyNotificationCenter',
        body: 'query MyNotificationCenter{myNotificationCenter{__typename id unread state{__typename state}}}',
        selector: MyNotificationCenterSelector
    },
    MyNotifications: {
        kind: 'query',
        name: 'MyNotifications',
        body: 'query MyNotifications($first:Int!,$before:ID){myNotifications(first:$first,before:$before){__typename items{__typename ...NotificationFragment}cursor}}fragment NotificationFragment on Notification{__typename id text content{__typename ... on NewCommentNotification{__typename comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{__typename message{__typename ... on GeneralMessage{__typename id fallback message sender{__typename id name}senderBadge{__typename ...UserBadge}}}chat{__typename ...RoomNano}}... on CommentPeerRootFeedItem{__typename item{__typename ...FeedItemFull}}}subscription{__typename type}}}... on NewMatchmakingProfilesNotification{__typename room{__typename peer{__typename ... on SharedRoom{__typename ...RoomNano}}}profiles{__typename ...MatchmakingProfileFragment}}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage id}parentComment{__typename comment:betaComment{__typename id message}id}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{__typename id date author{__typename ...FeedPostAuthorFragment}source{__typename ...FeedPostSourceFragment}edited canEdit commentsCount message fallback reactions{__typename user{__typename ...UserShort}reaction}slides{__typename ...SlideFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{__typename ...UserShort}}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}fragment SlideFragment on Slide{__typename ... on TextSlide{__typename id text spans{__typename ...SpanFragment}cover{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}coverAlign attachments{__typename ... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title roomPhoto:photo membersCount membership canSendMessage organization{__typename id name photo}}... on Organization{__typename ...OrganizationShort}}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}',
        selector: MyNotificationsSelector
    },
    MyOrganizations: {
        kind: 'query',
        name: 'MyOrganizations',
        body: 'query MyOrganizations{myOrganizations{__typename ...OrganizationShort isPrimary:betaIsPrimary}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: MyOrganizationsSelector
    },
    MyStickers: {
        kind: 'query',
        name: 'MyStickers',
        body: 'query MyStickers{stickers:myStickers{__typename packs{__typename id title stickers{__typename ...StickerFragment}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}',
        selector: MyStickersSelector
    },
    MySuccessfulInvitesCount: {
        kind: 'query',
        name: 'MySuccessfulInvitesCount',
        body: 'query MySuccessfulInvitesCount{mySuccessfulInvitesCount}',
        selector: MySuccessfulInvitesCountSelector
    },
    MyWallet: {
        kind: 'query',
        name: 'MyWallet',
        body: 'query MyWallet{myWallet{__typename id balance state isLocked failingPaymentsCount}transactionsPending{__typename ...WalletTransactionFragment}transactionsHistory(first:20){__typename items{__typename ...WalletTransactionFragment}cursor}}fragment WalletTransactionFragment on WalletTransaction{__typename id status date operation{__typename ... on WalletTransactionDeposit{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}}... on WalletTransactionIncome{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}source{__typename ... on WalletSubscription{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}}}... on Purchase{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}}}}}... on WalletTransactionTransferIn{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}fromUser{__typename ...UserShort}}... on WalletTransactionTransferOut{__typename amount walletAmount chargeAmount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}toUser{__typename ...UserShort}}... on WalletTransactionSubscription{__typename amount walletAmount chargeAmount subscription{__typename id interval amount product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}... on WalletTransactionPurchase{__typename amount walletAmount chargeAmount purchase{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: MyWalletSelector
    },
    OauthContext: {
        kind: 'query',
        name: 'OauthContext',
        body: 'query OauthContext($code:String!){context:oauthContext(code:$code){__typename app{__typename id title scopes image{__typename uuid crop{__typename x y w h}}}state redirectUrl code}}',
        selector: OauthContextSelector
    },
    Online: {
        kind: 'query',
        name: 'Online',
        body: 'query Online($userId:ID!){user:user(id:$userId){__typename id online lastSeen isBot}}',
        selector: OnlineSelector
    },
    Organization: {
        kind: 'query',
        name: 'Organization',
        body: 'query Organization($organizationId:ID!){organization(id:$organizationId){__typename ...OrganizationFull}}fragment OrganizationFull on Organization{__typename id superAccountId isMine isPrivate:alphaIsPrivate isOwner:betaIsOwner isAdmin:betaIsAdmin featured:alphaFeatured isCommunity:alphaIsCommunity name photo shortname website about twitter facebook linkedin instagram membersCount members:alphaOrganizationMembers{__typename role user{__typename ...UserFull}}requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}}fragment UserFull on User{__typename id name firstName lastName photo phone email website about location isBot isYou online lastSeen linkedin instagram twitter facebook shortname audienceSize primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: OrganizationSelector
    },
    OrganizationByPrefix: {
        kind: 'query',
        name: 'OrganizationByPrefix',
        body: 'query OrganizationByPrefix($query:String!){organizationByPrefix:alphaOrganizationByPrefix(query:$query){__typename ...OrganizationSearch}}fragment OrganizationSearch on Organization{__typename id superAccountId name photo isMine about status membersCount featured:alphaFeatured members:alphaOrganizationMembers{__typename user{__typename id name photo}}}',
        selector: OrganizationByPrefixSelector
    },
    OrganizationMembers: {
        kind: 'query',
        name: 'OrganizationMembers',
        body: 'query OrganizationMembers($organizationId:ID!,$first:Int,$after:ID){organization(id:$organizationId){__typename id members:alphaOrganizationMembers(first:$first,after:$after){__typename role user{__typename ...UserShort}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: OrganizationMembersSelector
    },
    OrganizationMembersShort: {
        kind: 'query',
        name: 'OrganizationMembersShort',
        body: 'query OrganizationMembersShort($organizationId:ID!){organization(id:$organizationId){__typename ...OrganizationWithoutMembersFragment members:alphaOrganizationMembers{__typename user{__typename id}}}}fragment OrganizationWithoutMembersFragment on Organization{__typename id superAccountId isMine isPrivate:alphaIsPrivate isOwner:betaIsOwner isAdmin:betaIsAdmin featured:alphaFeatured isCommunity:alphaIsCommunity name photo shortname website about twitter facebook linkedin instagram membersCount requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}roomsCount:betaPublicRoomsCount}fragment UserFull on User{__typename id name firstName lastName photo phone email website about location isBot isYou online lastSeen linkedin instagram twitter facebook shortname audienceSize primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: OrganizationMembersShortSelector
    },
    OrganizationProfile: {
        kind: 'query',
        name: 'OrganizationProfile',
        body: 'query OrganizationProfile($organizationId:ID!){organizationProfile(id:$organizationId){__typename ...OrganizationProfileFull}}fragment OrganizationProfileFull on OrganizationProfile{__typename id name photoRef{__typename uuid crop{__typename x y w h}}website websiteTitle about twitter facebook linkedin instagram shortname private:alphaIsPrivate featured:alphaFeatured published:alphaPublished editorial:alphaEditorial}',
        selector: OrganizationProfileSelector
    },
    OrganizationPublicInvite: {
        kind: 'query',
        name: 'OrganizationPublicInvite',
        body: 'query OrganizationPublicInvite($organizationId:ID){publicInvite:alphaOrganizationInviteLink(organizationId:$organizationId){__typename id key ttl}}',
        selector: OrganizationPublicInviteSelector
    },
    OrganizationPublicRooms: {
        kind: 'query',
        name: 'OrganizationPublicRooms',
        body: 'query OrganizationPublicRooms($organizationId:ID!,$first:Int!,$after:ID){organizationPublicRooms(id:$organizationId,first:$first,after:$after){__typename items{__typename ...SharedRoomView}cursor}}fragment SharedRoomView on SharedRoom{__typename id title photo membersCount photo}',
        selector: OrganizationPublicRoomsSelector
    },
    OrganizationWithoutMembers: {
        kind: 'query',
        name: 'OrganizationWithoutMembers',
        body: 'query OrganizationWithoutMembers($organizationId:ID!){organization(id:$organizationId){__typename ...OrganizationWithoutMembersFragment}}fragment OrganizationWithoutMembersFragment on Organization{__typename id superAccountId isMine isPrivate:alphaIsPrivate isOwner:betaIsOwner isAdmin:betaIsAdmin featured:alphaFeatured isCommunity:alphaIsCommunity name photo shortname website about twitter facebook linkedin instagram membersCount requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}roomsCount:betaPublicRoomsCount}fragment UserFull on User{__typename id name firstName lastName photo phone email website about location isBot isYou online lastSeen linkedin instagram twitter facebook shortname audienceSize primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: OrganizationWithoutMembersSelector
    },
    Permissions: {
        kind: 'query',
        name: 'Permissions',
        body: 'query Permissions{myPermissions{__typename roles}}',
        selector: PermissionsSelector
    },
    PicSharedMedia: {
        kind: 'query',
        name: 'PicSharedMedia',
        body: 'query PicSharedMedia($chatId:ID!,$first:Int!,$after:ID,$before:ID,$around:ID){chatSharedMedia(chatId:$chatId,mediaTypes:[IMAGE],first:$first,after:$after,before:$before,around:$around){__typename pageInfo{__typename hasNextPage hasPreviousPage currentPage pagesCount itemsCount}edges{__typename cursor index node{__typename message{__typename ... on GeneralMessage{__typename id date sender{__typename id name}attachments{__typename ... on MessageAttachmentFile{__typename id fileMetadata{__typename name isImage imageFormat mimeType imageWidth imageHeight size}filePreview fileId fallback}}}}}}}}',
        selector: PicSharedMediaSelector
    },
    Profile: {
        kind: 'query',
        name: 'Profile',
        body: 'query Profile{user:me{__typename id shortname}profile:myProfile{__typename id firstName lastName photoRef{__typename uuid crop{__typename x y w h}}email phone website about location role:alphaRole linkedin instagram facebook twitter primaryOrganization{__typename id name membersCount}joinedAt:alphaJoinedAt invitedBy:alphaInvitedBy{__typename id name}}}',
        selector: ProfileSelector
    },
    ProfilePrefill: {
        kind: 'query',
        name: 'ProfilePrefill',
        body: 'query ProfilePrefill{prefill:myProfilePrefill{__typename firstName lastName picture}}',
        selector: ProfilePrefillSelector
    },
    ResolveShortName: {
        kind: 'query',
        name: 'ResolveShortName',
        body: 'query ResolveShortName($shortname:String!){item:alphaResolveShortName(shortname:$shortname){__typename ... on User{__typename id isDeleted}... on Organization{__typename id isDeleted}... on FeedChannel{__typename id}... on SharedRoom{__typename id}}}',
        selector: ResolveShortNameSelector
    },
    ResolvedInvite: {
        kind: 'query',
        name: 'ResolvedInvite',
        body: 'query ResolvedInvite($key:String!){invite:alphaResolveInvite(key:$key){__typename ... on InviteInfo{__typename id orgId title creator{__typename ...UserShort}organization{__typename id photo name membersCount about isCommunity:alphaIsCommunity}}... on AppInvite{__typename inviter{__typename ...UserShort}}... on RoomInvite{__typename id invitedByUser{__typename ...UserShort}room{__typename ... on SharedRoom{__typename id kind isChannel title photo socialImage description membership membersCount onlineMembersCount previewMembers{__typename id photo name}matchmaking{__typename enabled}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}}}shortnameItem:alphaResolveShortName(shortname:$key){__typename ... on SharedRoom{__typename ...RoomPreview}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment RoomPreview on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}}... on SharedRoom{__typename id isChannel isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}membership owner{__typename id}matchmaking{__typename enabled}title photo membersCount description previewMembers{__typename id name photo}onlineMembersCount}}',
        selector: ResolvedInviteSelector
    },
    Room: {
        kind: 'query',
        name: 'Room',
        body: 'query Room($id:ID!){room(id:$id){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel title photo socialImage description shortname organization{__typename ...OrganizationMedium}membership role membersCount featuredMembersCount onlineMembersCount previewMembers{__typename id photo name}members{__typename role membership user{__typename ...UserShort}canKick badge{__typename ...UserBadge}}requests{__typename user{__typename ...UserShort}}settings{__typename id mute}canEdit canSendMessage welcomeMessage{__typename isOn sender{__typename id name}message}matchmaking{__typename ...MatchmakingRoomFragment}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationMedium on Organization{__typename id name photo isMine membersCount shortname about isOwner:betaIsOwner isAdmin:betaIsAdmin isCommunity:alphaIsCommunity}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}',
        selector: RoomSelector
    },
    RoomChat: {
        kind: 'query',
        name: 'RoomChat',
        body: 'query RoomChat($id:ID!){room(id:$id){__typename ... on PrivateRoom{__typename id user{__typename id name photo shortname primaryOrganization{__typename id name}isBot}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}}... on SharedRoom{__typename id kind title membership isChannel role canEdit photo membersCount organization{__typename ...OrganizationMedium}matchmaking{__typename ...MatchmakingRoomFragment}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}description onlineMembersCount previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id}}}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationMedium on Organization{__typename id name photo isMine membersCount shortname about isOwner:betaIsOwner isAdmin:betaIsAdmin isCommunity:alphaIsCommunity}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}',
        selector: RoomChatSelector
    },
    RoomFeaturedMembers: {
        kind: 'query',
        name: 'RoomFeaturedMembers',
        body: 'query RoomFeaturedMembers($roomId:ID!){roomFeaturedMembers(roomId:$roomId){__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}',
        selector: RoomFeaturedMembersSelector
    },
    RoomInviteInfo: {
        kind: 'query',
        name: 'RoomInviteInfo',
        body: 'query RoomInviteInfo($invite:String!){invite:betaRoomInviteInfo(invite:$invite){__typename id room{__typename ... on SharedRoom{__typename id kind isChannel title photo socialImage description organization{__typename ...OrganizationShort}membership membersCount onlineMembersCount previewMembers{__typename id photo name}matchmaking{__typename enabled}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}invitedByUser{__typename ...UserShort}}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}',
        selector: RoomInviteInfoSelector
    },
    RoomInviteLink: {
        kind: 'query',
        name: 'RoomInviteLink',
        body: 'query RoomInviteLink($roomId:ID!){link:betaRoomInviteLink(roomId:$roomId)}',
        selector: RoomInviteLinkSelector
    },
    RoomMembers: {
        kind: 'query',
        name: 'RoomMembers',
        body: 'query RoomMembers($roomId:ID!){members:roomMembers(roomId:$roomId){__typename user{__typename ...UserShort}role membership canKick}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: RoomMembersSelector
    },
    RoomMembersPaginated: {
        kind: 'query',
        name: 'RoomMembersPaginated',
        body: 'query RoomMembersPaginated($roomId:ID!,$first:Int,$after:ID){members:roomMembers(roomId:$roomId,first:$first,after:$after){__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}',
        selector: RoomMembersPaginatedSelector
    },
    RoomMembersShort: {
        kind: 'query',
        name: 'RoomMembersShort',
        body: 'query RoomMembersShort($roomId:ID!){members:roomMembers(roomId:$roomId){__typename user{__typename id}}}',
        selector: RoomMembersShortSelector
    },
    RoomMembersTiny: {
        kind: 'query',
        name: 'RoomMembersTiny',
        body: 'query RoomMembersTiny($roomId:ID!){members:roomMembers(roomId:$roomId){__typename user{__typename id name shortname photo primaryOrganization{__typename id name}}}}',
        selector: RoomMembersTinySelector
    },
    RoomOrganizationAdminMembers: {
        kind: 'query',
        name: 'RoomOrganizationAdminMembers',
        body: 'query RoomOrganizationAdminMembers($id:ID!){room(id:$id){__typename ... on SharedRoom{__typename id organization{__typename id adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserShort}}}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: RoomOrganizationAdminMembersSelector
    },
    RoomPico: {
        kind: 'query',
        name: 'RoomPico',
        body: 'query RoomPico($id:ID!){room(id:$id){__typename ...RoomNano}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}',
        selector: RoomPicoSelector
    },
    RoomSearch: {
        kind: 'query',
        name: 'RoomSearch',
        body: 'query RoomSearch($query:String,$sort:String,$page:Int){items:betaRoomSearch(query:$query,sort:$sort,page:$page,first:25){__typename edges{__typename node{__typename ... on SharedRoom{__typename id kind isChannel title photo membership membersCount organization{__typename id photo name}}}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount currentPage pagesCount openEnded}}}',
        selector: RoomSearchSelector
    },
    RoomSocialImage: {
        kind: 'query',
        name: 'RoomSocialImage',
        body: 'query RoomSocialImage($roomId:ID!){roomSocialImage(roomId:$roomId)}',
        selector: RoomSocialImageSelector
    },
    RoomSuper: {
        kind: 'query',
        name: 'RoomSuper',
        body: 'query RoomSuper($id:ID!){roomSuper(id:$id){__typename id featured listed}}',
        selector: RoomSuperSelector
    },
    RoomTiny: {
        kind: 'query',
        name: 'RoomTiny',
        body: 'query RoomTiny($id:ID!){room(id:$id){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount pinnedMessage{__typename ...FullMessage}matchmaking{__typename ...MatchmakingRoomFragment}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}',
        selector: RoomTinySelector
    },
    RoomWithoutMembers: {
        kind: 'query',
        name: 'RoomWithoutMembers',
        body: 'query RoomWithoutMembers($id:ID!){room(id:$id){__typename ...RoomFullWithoutMembers}}fragment RoomFullWithoutMembers on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo socialImage description shortname organization{__typename ...OrganizationMedium}membership role membersCount featuredMembersCount settings{__typename id mute}matchmaking{__typename ...MatchmakingRoomFragment}canEdit canSendMessage welcomeMessage{__typename isOn sender{__typename id name}message}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment OrganizationMedium on Organization{__typename id name photo isMine membersCount shortname about isOwner:betaIsOwner isAdmin:betaIsAdmin isCommunity:alphaIsCommunity}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}',
        selector: RoomWithoutMembersSelector
    },
    Settings: {
        kind: 'query',
        name: 'Settings',
        body: 'query Settings{settings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id primaryEmail emailFrequency excludeMutedChats countUnreadChats desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}organizationChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}notificationPreview}',
        selector: SettingsSelector
    },
    SharedMedia: {
        kind: 'query',
        name: 'SharedMedia',
        body: 'query SharedMedia($chatId:ID!,$mediaTypes:[SharedMediaType!]!,$first:Int!,$after:ID){sharedMedia:chatSharedMedia(chatId:$chatId,mediaTypes:$mediaTypes,first:$first,after:$after){__typename pageInfo{__typename hasNextPage currentPage}edges{__typename node{__typename message{__typename ... on GeneralMessage{__typename id fallback date sender{__typename id name}attachments{__typename ... on MessageAttachmentFile{__typename id fileMetadata{__typename name isImage imageFormat mimeType imageWidth imageHeight size}filePreview fileId fallback}... on MessageRichAttachment{__typename id title text titleLink imagePreview image{__typename url}imageFallback{__typename photo}keyboard{__typename buttons{__typename id title url}}}}}}}cursor}}}',
        selector: SharedMediaSelector
    },
    SharedMediaCounters: {
        kind: 'query',
        name: 'SharedMediaCounters',
        body: 'query SharedMediaCounters($chatId:ID!){counters:chatSharedMediaCounters(chatId:$chatId){__typename links images documents videos}}',
        selector: SharedMediaCountersSelector
    },
    StickerPack: {
        kind: 'query',
        name: 'StickerPack',
        body: 'query StickerPack($id:ID!){stickerPack(id:$id){__typename ...StickerPackFragment}}fragment StickerPackFragment on StickerPack{__typename id title stickers{__typename ...StickerFragment}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}',
        selector: StickerPackSelector
    },
    StickerPackCatalog: {
        kind: 'query',
        name: 'StickerPackCatalog',
        body: 'query StickerPackCatalog{stickers:stickerPackCatalog{__typename id title published stickers{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}',
        selector: StickerPackCatalogSelector
    },
    StripeToken: {
        kind: 'query',
        name: 'StripeToken',
        body: 'query StripeToken{stripeToken}',
        selector: StripeTokenSelector
    },
    Subscriptions: {
        kind: 'query',
        name: 'Subscriptions',
        body: 'query Subscriptions{subscriptions{__typename id state expires amount interval product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}}}}',
        selector: SubscriptionsSelector
    },
    SuggestedRooms: {
        kind: 'query',
        name: 'SuggestedRooms',
        body: 'query SuggestedRooms{suggestedRooms:betaSuggestedRooms{__typename ... on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}}}isDiscoverDone:betaIsDiscoverDone}',
        selector: SuggestedRoomsSelector
    },
    SuperAccount: {
        kind: 'query',
        name: 'SuperAccount',
        body: 'query SuperAccount($accountId:ID!,$viaOrgId:Boolean){superAccount(id:$accountId,viaOrgId:$viaOrgId){__typename id title state members{__typename ...UserShort}features{__typename id key title}orgId createdAt createdBy{__typename id name}published:alphaPublished}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: SuperAccountSelector
    },
    SuperAccounts: {
        kind: 'query',
        name: 'SuperAccounts',
        body: 'query SuperAccounts{superAccounts{__typename id orgId title state createdAt}}',
        selector: SuperAccountsSelector
    },
    SuperAdmins: {
        kind: 'query',
        name: 'SuperAdmins',
        body: 'query SuperAdmins{superAdmins{__typename role user{__typename ...UserShort}email}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: SuperAdminsSelector
    },
    SuperBadgeInRoom: {
        kind: 'query',
        name: 'SuperBadgeInRoom',
        body: 'query SuperBadgeInRoom($roomId:ID!,$userId:ID!){superBadgeInRoom(roomId:$roomId,userId:$userId){__typename ...UserBadge}}fragment UserBadge on UserBadge{__typename id name verified}',
        selector: SuperBadgeInRoomSelector
    },
    TransactionsHistory: {
        kind: 'query',
        name: 'TransactionsHistory',
        body: 'query TransactionsHistory($first:Int!,$after:String){transactionsHistory(first:$first,after:$after){__typename items{__typename ...WalletTransactionFragment}cursor}}fragment WalletTransactionFragment on WalletTransaction{__typename id status date operation{__typename ... on WalletTransactionDeposit{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}}... on WalletTransactionIncome{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}source{__typename ... on WalletSubscription{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}}}... on Purchase{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}}}}}... on WalletTransactionTransferIn{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}fromUser{__typename ...UserShort}}... on WalletTransactionTransferOut{__typename amount walletAmount chargeAmount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}toUser{__typename ...UserShort}}... on WalletTransactionSubscription{__typename amount walletAmount chargeAmount subscription{__typename id interval amount product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}... on WalletTransactionPurchase{__typename amount walletAmount chargeAmount purchase{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: TransactionsHistorySelector
    },
    User: {
        kind: 'query',
        name: 'User',
        body: 'query User($userId:ID!){user:user(id:$userId){__typename ...UserFull chatsWithBadge{__typename chat{__typename ...RoomShort}badge{__typename ...UserBadge}}}conversation:room(id:$userId){__typename ... on PrivateRoom{__typename id settings{__typename id mute}}}}fragment UserFull on User{__typename id name firstName lastName photo phone email website about location isBot isYou online lastSeen linkedin instagram twitter facebook shortname audienceSize primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount pinnedMessage{__typename ...FullMessage}matchmaking{__typename ...MatchmakingRoomFragment}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}',
        selector: UserSelector
    },
    UserAvailableRooms: {
        kind: 'query',
        name: 'UserAvailableRooms',
        body: 'query UserAvailableRooms($first:Int!,$after:String,$query:String){alphaUserAvailableRooms(first:$first,after:$after,query:$query){__typename edges{__typename node{__typename ...DiscoverSharedRoom}cursor}pageInfo{__typename hasNextPage}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}',
        selector: UserAvailableRoomsSelector
    },
    UserPico: {
        kind: 'query',
        name: 'UserPico',
        body: 'query UserPico($userId:ID!){user:user(id:$userId){__typename id name firstName photo}}',
        selector: UserPicoSelector
    },
    UserStorage: {
        kind: 'query',
        name: 'UserStorage',
        body: 'query UserStorage($namespace:String!,$keys:[String!]!){userStorage(namespace:$namespace,keys:$keys){__typename id key value}}',
        selector: UserStorageSelector
    },
    Users: {
        kind: 'query',
        name: 'Users',
        body: 'query Users($query:String!){items:users(query:$query){__typename id title:name subtitle:email}}',
        selector: UsersSelector
    },
    AccountInviteJoin: {
        kind: 'mutation',
        name: 'AccountInviteJoin',
        body: 'mutation AccountInviteJoin($inviteKey:String!){alphaJoinInvite(key:$inviteKey)}',
        selector: AccountInviteJoinSelector
    },
    AddAppToChat: {
        kind: 'mutation',
        name: 'AddAppToChat',
        body: 'mutation AddAppToChat($appId:ID!,$chatId:ID!){addAppToChat(appId:$appId,chatId:$chatId){__typename ...AppChat}}fragment AppChat on AppChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}webhook}',
        selector: AddAppToChatSelector
    },
    AddComment: {
        kind: 'mutation',
        name: 'AddComment',
        body: 'mutation AddComment($repeatKey:String,$peerId:ID!,$message:String,$replyComment:ID,$mentions:[MentionInput!],$fileAttachments:[FileAttachmentInput!],$spans:[MessageSpanInput!]){betaAddComment(repeatKey:$repeatKey,peerId:$peerId,message:$message,replyComment:$replyComment,mentions:$mentions,fileAttachments:$fileAttachments,spans:$spans){__typename id}}',
        selector: AddCommentSelector
    },
    AddStickerComment: {
        kind: 'mutation',
        name: 'AddStickerComment',
        body: 'mutation AddStickerComment($peerId:ID!,$stickerId:ID!,$replyComment:ID,$repeatKey:String){addStickerComment:betaAddStickerComment(peerId:$peerId,stickerId:$stickerId,replyComment:$replyComment,repeatKey:$repeatKey){__typename id}}',
        selector: AddStickerCommentSelector
    },
    BetaDiscoverSkip: {
        kind: 'mutation',
        name: 'BetaDiscoverSkip',
        body: 'mutation BetaDiscoverSkip($selectedTagsIds:[String!]!){betaDiscoverSkip(selectedTagsIds:$selectedTagsIds){__typename tagGroup{__typename id}}}',
        selector: BetaDiscoverSkipSelector
    },
    BetaNextDiscoverReset: {
        kind: 'mutation',
        name: 'BetaNextDiscoverReset',
        body: 'mutation BetaNextDiscoverReset{betaNextDiscoverReset}',
        selector: BetaNextDiscoverResetSelector
    },
    BetaSubmitNextDiscover: {
        kind: 'mutation',
        name: 'BetaSubmitNextDiscover',
        body: 'mutation BetaSubmitNextDiscover($selectedTagsIds:[String!]!,$excudedGroupsIds:[String!]!){betaSubmitNextDiscover(selectedTagsIds:$selectedTagsIds,excudedGroupsIds:$excudedGroupsIds){__typename tagGroup{__typename id}}}',
        selector: BetaSubmitNextDiscoverSelector
    },
    BuyPremiumChatPass: {
        kind: 'mutation',
        name: 'BuyPremiumChatPass',
        body: 'mutation BuyPremiumChatPass($chatId:ID!){betaBuyPremiumChatPass(chatId:$chatId){__typename id premiumPassIsActive membership}}',
        selector: BuyPremiumChatPassSelector
    },
    BuyPremiumChatSubscription: {
        kind: 'mutation',
        name: 'BuyPremiumChatSubscription',
        body: 'mutation BuyPremiumChatSubscription($chatId:ID!){betaBuyPremiumChatSubscription(chatId:$chatId){__typename id premiumPassIsActive premiumSubscription{__typename id state}membership}}',
        selector: BuyPremiumChatSubscriptionSelector
    },
    CancelSubscription: {
        kind: 'mutation',
        name: 'CancelSubscription',
        body: 'mutation CancelSubscription($id:ID!){subscriptionCancel(id:$id){__typename id}}',
        selector: CancelSubscriptionSelector
    },
    CommentSetReaction: {
        kind: 'mutation',
        name: 'CommentSetReaction',
        body: 'mutation CommentSetReaction($commentId:ID!,$reaction:MessageReactionType!){commentReactionAdd(commentId:$commentId,reaction:$reaction)}',
        selector: CommentSetReactionSelector
    },
    CommentUnsetReaction: {
        kind: 'mutation',
        name: 'CommentUnsetReaction',
        body: 'mutation CommentUnsetReaction($commentId:ID!,$reaction:MessageReactionType!){commentReactionRemove(commentId:$commentId,reaction:$reaction)}',
        selector: CommentUnsetReactionSelector
    },
    CommitCardSetupIntent: {
        kind: 'mutation',
        name: 'CommitCardSetupIntent',
        body: 'mutation CommitCardSetupIntent($id:ID!,$pmid:ID!){cardCommitSetupIntent(id:$id,pmid:$pmid){__typename id}}',
        selector: CommitCardSetupIntentSelector
    },
    ConferenceAnswer: {
        kind: 'mutation',
        name: 'ConferenceAnswer',
        body: 'mutation ConferenceAnswer($id:ID!,$ownPeerId:ID!,$peerId:ID!,$answer:String!){peerConnectionAnswer(id:$id,peerId:$peerId,ownPeerId:$ownPeerId,answer:$answer){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}',
        selector: ConferenceAnswerSelector
    },
    ConferenceCandidate: {
        kind: 'mutation',
        name: 'ConferenceCandidate',
        body: 'mutation ConferenceCandidate($id:ID!,$ownPeerId:ID!,$peerId:ID!,$candidate:String!){peerConnectionCandidate(id:$id,peerId:$peerId,ownPeerId:$ownPeerId,candidate:$candidate){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}',
        selector: ConferenceCandidateSelector
    },
    ConferenceJoin: {
        kind: 'mutation',
        name: 'ConferenceJoin',
        body: 'mutation ConferenceJoin($id:ID!){conferenceJoin(id:$id){__typename peerId conference{__typename ...ConferenceShort}}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}',
        selector: ConferenceJoinSelector
    },
    ConferenceKeepAlive: {
        kind: 'mutation',
        name: 'ConferenceKeepAlive',
        body: 'mutation ConferenceKeepAlive($id:ID!,$peerId:ID!){conferenceKeepAlive(id:$id,peerId:$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}',
        selector: ConferenceKeepAliveSelector
    },
    ConferenceLeave: {
        kind: 'mutation',
        name: 'ConferenceLeave',
        body: 'mutation ConferenceLeave($id:ID!,$peerId:ID!){conferenceLeave(id:$id,peerId:$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}',
        selector: ConferenceLeaveSelector
    },
    ConferenceOffer: {
        kind: 'mutation',
        name: 'ConferenceOffer',
        body: 'mutation ConferenceOffer($id:ID!,$ownPeerId:ID!,$peerId:ID!,$offer:String!){peerConnectionOffer(id:$id,peerId:$peerId,ownPeerId:$ownPeerId,offer:$offer){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}',
        selector: ConferenceOfferSelector
    },
    CreateApp: {
        kind: 'mutation',
        name: 'CreateApp',
        body: 'mutation CreateApp($name:String!,$shortname:String,$photoRef:ImageRefInput,$about:String){createApp(name:$name,shortname:$shortname,photoRef:$photoRef,about:$about){__typename ...AppFull}}fragment AppFull on AppProfile{__typename id name shortname photoRef{__typename uuid crop{__typename x y w h}}about token{__typename salt}}',
        selector: CreateAppSelector
    },
    CreateCardSetupIntent: {
        kind: 'mutation',
        name: 'CreateCardSetupIntent',
        body: 'mutation CreateCardSetupIntent($retryKey:String!){cardCreateSetupIntent(retryKey:$retryKey){__typename id clientSecret}}',
        selector: CreateCardSetupIntentSelector
    },
    CreateDepositIntent: {
        kind: 'mutation',
        name: 'CreateDepositIntent',
        body: 'mutation CreateDepositIntent($cardId:ID!,$amount:Int!,$retryKey:String!){cardDepositIntent(id:$cardId,amount:$amount,retryKey:$retryKey){__typename id clientSecret}}',
        selector: CreateDepositIntentSelector
    },
    CreateOrganization: {
        kind: 'mutation',
        name: 'CreateOrganization',
        body: 'mutation CreateOrganization($input:CreateOrganizationInput!){organization:createOrganization(input:$input){__typename id name}}',
        selector: CreateOrganizationSelector
    },
    CreateUserProfileAndOrganization: {
        kind: 'mutation',
        name: 'CreateUserProfileAndOrganization',
        body: 'mutation CreateUserProfileAndOrganization($user:ProfileInput!,$organization:CreateOrganizationInput!){alphaCreateUserProfileAndOrganization(user:$user,organization:$organization){__typename user{__typename ...UserFull}organization{__typename id name}}}fragment UserFull on User{__typename id name firstName lastName photo phone email website about location isBot isYou online lastSeen linkedin instagram twitter facebook shortname audienceSize primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: CreateUserProfileAndOrganizationSelector
    },
    DebugMails: {
        kind: 'mutation',
        name: 'DebugMails',
        body: 'mutation DebugMails($type:DebugEmailType!){debugSendEmail(type:$type)}',
        selector: DebugMailsSelector
    },
    DeleteComment: {
        kind: 'mutation',
        name: 'DeleteComment',
        body: 'mutation DeleteComment($id:ID!){deleteComment(id:$id)}',
        selector: DeleteCommentSelector
    },
    DeleteNotification: {
        kind: 'mutation',
        name: 'DeleteNotification',
        body: 'mutation DeleteNotification($notificationId:ID!){deleteNotification(notificationId:$notificationId)}',
        selector: DeleteNotificationSelector
    },
    DeleteOrganization: {
        kind: 'mutation',
        name: 'DeleteOrganization',
        body: 'mutation DeleteOrganization($organizationId:ID!){deleteOrganization(id:$organizationId)}',
        selector: DeleteOrganizationSelector
    },
    DeleteUser: {
        kind: 'mutation',
        name: 'DeleteUser',
        body: 'mutation DeleteUser($id:ID!){superDeleteUser(id:$id)}',
        selector: DeleteUserSelector
    },
    DiscoverCollectionsCreate: {
        kind: 'mutation',
        name: 'DiscoverCollectionsCreate',
        body: 'mutation DiscoverCollectionsCreate($title:String!,$image:ImageRefInput!,$chatIds:[ID!]!){discoverCollectionsCreate(collection:{title:$title,image:$image,chatIds:$chatIds}){__typename id title}}',
        selector: DiscoverCollectionsCreateSelector
    },
    DiscoverCollectionsDelete: {
        kind: 'mutation',
        name: 'DiscoverCollectionsDelete',
        body: 'mutation DiscoverCollectionsDelete($id:ID!){discoverCollectionsDelete(id:$id)}',
        selector: DiscoverCollectionsDeleteSelector
    },
    DiscoverCollectionsUpdate: {
        kind: 'mutation',
        name: 'DiscoverCollectionsUpdate',
        body: 'mutation DiscoverCollectionsUpdate($id:ID!,$title:String!,$image:ImageRefInput!,$chatIds:[ID!]!){discoverCollectionsUpdate(id:$id,input:{title:$title,image:$image,chatIds:$chatIds}){__typename id title}}',
        selector: DiscoverCollectionsUpdateSelector
    },
    DiscoverEditorsChoiceCreate: {
        kind: 'mutation',
        name: 'DiscoverEditorsChoiceCreate',
        body: 'mutation DiscoverEditorsChoiceCreate($image:ImageRefInput!,$cid:ID!){discoverEditorsChoiceCreate(input:{image:$image,cid:$cid}){__typename id image{__typename uuid crop{__typename x y w h}}chat{__typename id title}}}',
        selector: DiscoverEditorsChoiceCreateSelector
    },
    DiscoverEditorsChoiceDelete: {
        kind: 'mutation',
        name: 'DiscoverEditorsChoiceDelete',
        body: 'mutation DiscoverEditorsChoiceDelete($id:ID!){discoverEditorsChoiceDelete(id:$id)}',
        selector: DiscoverEditorsChoiceDeleteSelector
    },
    DiscoverEditorsChoiceUpdate: {
        kind: 'mutation',
        name: 'DiscoverEditorsChoiceUpdate',
        body: 'mutation DiscoverEditorsChoiceUpdate($id:ID!,$image:ImageRefInput!,$cid:ID!){discoverEditorsChoiceUpdate(id:$id,input:{image:$image,cid:$cid}){__typename id image{__typename uuid crop{__typename x y w h}}chat{__typename id title}}}',
        selector: DiscoverEditorsChoiceUpdateSelector
    },
    Donate: {
        kind: 'mutation',
        name: 'Donate',
        body: 'mutation Donate($id:ID!){donateToUser(id:$id,amount:100)}',
        selector: DonateSelector
    },
    EditComment: {
        kind: 'mutation',
        name: 'EditComment',
        body: 'mutation EditComment($id:ID!,$message:String,$mentions:[MentionInput!],$fileAttachments:[FileAttachmentInput!],$spans:[MessageSpanInput!]){editComment(id:$id,message:$message,mentions:$mentions,fileAttachments:$fileAttachments,spans:$spans)}',
        selector: EditCommentSelector
    },
    EditMessage: {
        kind: 'mutation',
        name: 'EditMessage',
        body: 'mutation EditMessage($messageId:ID!,$message:String,$replyMessages:[ID!],$mentions:[MentionInput!],$fileAttachments:[FileAttachmentInput!],$spans:[MessageSpanInput!]){editMessage(messageId:$messageId,message:$message,replyMessages:$replyMessages,mentions:$mentions,fileAttachments:$fileAttachments,spans:$spans)}',
        selector: EditMessageSelector
    },
    FeatureFlagAdd: {
        kind: 'mutation',
        name: 'FeatureFlagAdd',
        body: 'mutation FeatureFlagAdd($key:String!,$title:String!){featureFlagAdd(key:$key,title:$title){__typename id key title}}',
        selector: FeatureFlagAddSelector
    },
    FeatureFlagDisable: {
        kind: 'mutation',
        name: 'FeatureFlagDisable',
        body: 'mutation FeatureFlagDisable($accountId:ID!,$featureId:ID!){superAccountFeatureRemove(id:$accountId,featureId:$featureId){__typename id features{__typename id key title}}}',
        selector: FeatureFlagDisableSelector
    },
    FeatureFlagEnable: {
        kind: 'mutation',
        name: 'FeatureFlagEnable',
        body: 'mutation FeatureFlagEnable($accountId:ID!,$featureId:ID!){superAccountFeatureAdd(id:$accountId,featureId:$featureId){__typename id features{__typename id key title}}}',
        selector: FeatureFlagEnableSelector
    },
    FeedChannelAddWriter: {
        kind: 'mutation',
        name: 'FeedChannelAddWriter',
        body: 'mutation FeedChannelAddWriter($id:ID!,$userId:ID!){alphaFeedChannelAddEditor(id:$id,userId:$userId)}',
        selector: FeedChannelAddWriterSelector
    },
    FeedChannelCreate: {
        kind: 'mutation',
        name: 'FeedChannelCreate',
        body: 'mutation FeedChannelCreate($title:String!,$about:String,$photoRef:ImageRefInput,$global:Boolean){channel:alphaFeedCreateChannel(title:$title,about:$about,photoRef:$photoRef,global:$global){__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}',
        selector: FeedChannelCreateSelector
    },
    FeedChannelRemoveWriter: {
        kind: 'mutation',
        name: 'FeedChannelRemoveWriter',
        body: 'mutation FeedChannelRemoveWriter($id:ID!,$userId:ID!){alphaFeedChannelRemoveEditor(id:$id,userId:$userId)}',
        selector: FeedChannelRemoveWriterSelector
    },
    FeedChannelSubscribe: {
        kind: 'mutation',
        name: 'FeedChannelSubscribe',
        body: 'mutation FeedChannelSubscribe($id:ID!){alphaFeedChannelSubscribe(id:$id)}',
        selector: FeedChannelSubscribeSelector
    },
    FeedChannelUnsubscribe: {
        kind: 'mutation',
        name: 'FeedChannelUnsubscribe',
        body: 'mutation FeedChannelUnsubscribe($id:ID!){alphaFeedChannelUnsubscribe(id:$id)}',
        selector: FeedChannelUnsubscribeSelector
    },
    FeedChannelUpdate: {
        kind: 'mutation',
        name: 'FeedChannelUpdate',
        body: 'mutation FeedChannelUpdate($id:ID!,$title:String!,$about:String,$photoRef:ImageRefInput,$global:Boolean){channel:alphaFeedUpdateChannel(id:$id,title:$title,about:$about,photoRef:$photoRef,global:$global){__typename id}}',
        selector: FeedChannelUpdateSelector
    },
    FeedCreatePost: {
        kind: 'mutation',
        name: 'FeedCreatePost',
        body: 'mutation FeedCreatePost($channel:ID!,$slides:[SlideInput!]!,$repeatKey:String){post:alphaCreateFeedPost(channel:$channel,slides:$slides,repeatKey:$repeatKey){__typename ...FeedItemFull}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{__typename id date author{__typename ...FeedPostAuthorFragment}source{__typename ...FeedPostSourceFragment}edited canEdit commentsCount message fallback reactions{__typename user{__typename ...UserShort}reaction}slides{__typename ...SlideFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{__typename ...UserShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}fragment SlideFragment on Slide{__typename ... on TextSlide{__typename id text spans{__typename ...SpanFragment}cover{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}coverAlign attachments{__typename ... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title roomPhoto:photo membersCount membership canSendMessage organization{__typename id name photo}}... on Organization{__typename ...OrganizationShort}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}',
        selector: FeedCreatePostSelector
    },
    FeedDeletePost: {
        kind: 'mutation',
        name: 'FeedDeletePost',
        body: 'mutation FeedDeletePost($feedItemId:ID!){alphaDeleteFeedPost(feedItemId:$feedItemId)}',
        selector: FeedDeletePostSelector
    },
    FeedEditPost: {
        kind: 'mutation',
        name: 'FeedEditPost',
        body: 'mutation FeedEditPost($feedItemId:ID!,$slides:[SlideInput!]!){editFeedPost:alphaEditFeedPost(feedItemId:$feedItemId,slides:$slides){__typename ...FeedItemFull}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{__typename id date author{__typename ...FeedPostAuthorFragment}source{__typename ...FeedPostSourceFragment}edited canEdit commentsCount message fallback reactions{__typename user{__typename ...UserShort}reaction}slides{__typename ...SlideFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{__typename ...UserShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}fragment SlideFragment on Slide{__typename ... on TextSlide{__typename id text spans{__typename ...SpanFragment}cover{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}coverAlign attachments{__typename ... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title roomPhoto:photo membersCount membership canSendMessage organization{__typename id name photo}}... on Organization{__typename ...OrganizationShort}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}',
        selector: FeedEditPostSelector
    },
    FeedReactionAdd: {
        kind: 'mutation',
        name: 'FeedReactionAdd',
        body: 'mutation FeedReactionAdd($feedItemId:ID!,$reaction:MessageReactionType!){feedReactionAdd(feedItemId:$feedItemId,reaction:$reaction)}',
        selector: FeedReactionAddSelector
    },
    FeedReactionRemove: {
        kind: 'mutation',
        name: 'FeedReactionRemove',
        body: 'mutation FeedReactionRemove($feedItemId:ID!,$reaction:MessageReactionType!){feedReactionRemove(feedItemId:$feedItemId,reaction:$reaction)}',
        selector: FeedReactionRemoveSelector
    },
    MakeCardDefault: {
        kind: 'mutation',
        name: 'MakeCardDefault',
        body: 'mutation MakeCardDefault($id:ID!){cardMakeDefault(id:$id){__typename id isDefault}}',
        selector: MakeCardDefaultSelector
    },
    MarkSequenceRead: {
        kind: 'mutation',
        name: 'MarkSequenceRead',
        body: 'mutation MarkSequenceRead($seq:Int!){alphaGlobalRead(toSeq:$seq)}',
        selector: MarkSequenceReadSelector
    },
    MatchmakingConnect: {
        kind: 'mutation',
        name: 'MatchmakingConnect',
        body: 'mutation MatchmakingConnect($peerId:ID!,$uid:ID!){matchmakingConnect(peerId:$peerId,uid:$uid)}',
        selector: MatchmakingConnectSelector
    },
    MatchmakingProfileFill: {
        kind: 'mutation',
        name: 'MatchmakingProfileFill',
        body: 'mutation MatchmakingProfileFill($peerId:ID!,$input:MatchmakingProfileFillInput!){matchmakingProfileFill(peerId:$peerId,input:$input){__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}',
        selector: MatchmakingProfileFillSelector
    },
    MatchmakingRoomSave: {
        kind: 'mutation',
        name: 'MatchmakingRoomSave',
        body: 'mutation MatchmakingRoomSave($peerId:ID!,$input:MatchmakingRoomInput!){matchmakingRoomSave(peerId:$peerId,input:$input){__typename ...MatchmakingRoomFragment}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}',
        selector: MatchmakingRoomSaveSelector
    },
    MediaAnswer: {
        kind: 'mutation',
        name: 'MediaAnswer',
        body: 'mutation MediaAnswer($id:ID!,$peerId:ID!,$answer:String!){mediaStreamAnswer(id:$id,peerId:$peerId,answer:$answer){__typename id streams{__typename id peerId state sdp ice}}}',
        selector: MediaAnswerSelector
    },
    MediaCandidate: {
        kind: 'mutation',
        name: 'MediaCandidate',
        body: 'mutation MediaCandidate($id:ID!,$peerId:ID!,$candidate:String!){mediaStreamCandidate(id:$id,peerId:$peerId,candidate:$candidate){__typename id streams{__typename id peerId state sdp ice}}}',
        selector: MediaCandidateSelector
    },
    MediaFailed: {
        kind: 'mutation',
        name: 'MediaFailed',
        body: 'mutation MediaFailed($id:ID!,$peerId:ID!){mediaStreamFailed(id:$id,peerId:$peerId){__typename id streams{__typename id peerId state sdp ice}}}',
        selector: MediaFailedSelector
    },
    MediaNegotiationNeeded: {
        kind: 'mutation',
        name: 'MediaNegotiationNeeded',
        body: 'mutation MediaNegotiationNeeded($id:ID!,$peerId:ID!){mediaStreamNegotiationNeeded(id:$id,peerId:$peerId){__typename id streams{__typename id peerId state sdp ice}}}',
        selector: MediaNegotiationNeededSelector
    },
    MediaOffer: {
        kind: 'mutation',
        name: 'MediaOffer',
        body: 'mutation MediaOffer($id:ID!,$peerId:ID!,$offer:String!){mediaStreamOffer(id:$id,peerId:$peerId,offer:$offer){__typename id streams{__typename id peerId state sdp ice}}}',
        selector: MediaOfferSelector
    },
    MessageSetReaction: {
        kind: 'mutation',
        name: 'MessageSetReaction',
        body: 'mutation MessageSetReaction($messageId:ID!,$reaction:MessageReactionType!){messageReactionAdd(messageId:$messageId,reaction:$reaction)}',
        selector: MessageSetReactionSelector
    },
    MessageUnsetReaction: {
        kind: 'mutation',
        name: 'MessageUnsetReaction',
        body: 'mutation MessageUnsetReaction($messageId:ID!,$reaction:MessageReactionType!){messageReactionRemove(messageId:$messageId,reaction:$reaction)}',
        selector: MessageUnsetReactionSelector
    },
    MyNotificationCenterMarkSeqRead: {
        kind: 'mutation',
        name: 'MyNotificationCenterMarkSeqRead',
        body: 'mutation MyNotificationCenterMarkSeqRead($seq:Int!){notificationCenterMarkSeqRead(toSeq:$seq)}',
        selector: MyNotificationCenterMarkSeqReadSelector
    },
    OrganizationActivateByInvite: {
        kind: 'mutation',
        name: 'OrganizationActivateByInvite',
        body: 'mutation OrganizationActivateByInvite($inviteKey:String!){joinAppInvite(key:$inviteKey)}',
        selector: OrganizationActivateByInviteSelector
    },
    OrganizationAddMember: {
        kind: 'mutation',
        name: 'OrganizationAddMember',
        body: 'mutation OrganizationAddMember($userIds:[ID!],$organizationId:ID!){alphaOrganizationMemberAdd(userIds:$userIds,organizationId:$organizationId){__typename role user{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: OrganizationAddMemberSelector
    },
    OrganizationAlterPublished: {
        kind: 'mutation',
        name: 'OrganizationAlterPublished',
        body: 'mutation OrganizationAlterPublished($organizationId:ID!,$published:Boolean!){alphaAlterPublished(id:$organizationId,published:$published){__typename ...OrganizationSearch}}fragment OrganizationSearch on Organization{__typename id superAccountId name photo isMine about status membersCount featured:alphaFeatured members:alphaOrganizationMembers{__typename user{__typename id name photo}}}',
        selector: OrganizationAlterPublishedSelector
    },
    OrganizationChangeMemberRole: {
        kind: 'mutation',
        name: 'OrganizationChangeMemberRole',
        body: 'mutation OrganizationChangeMemberRole($memberId:ID!,$newRole:OrganizationMemberRole!,$organizationId:ID!){alphaOrganizationChangeMemberRole(memberId:$memberId,newRole:$newRole,organizationId:$organizationId)}',
        selector: OrganizationChangeMemberRoleSelector
    },
    OrganizationCreatePublicInvite: {
        kind: 'mutation',
        name: 'OrganizationCreatePublicInvite',
        body: 'mutation OrganizationCreatePublicInvite($expirationDays:Int,$organizationId:ID){alphaOrganizationRefreshInviteLink(expirationDays:$expirationDays,organizationId:$organizationId){__typename id key ttl}}',
        selector: OrganizationCreatePublicInviteSelector
    },
    OrganizationMemberRemove: {
        kind: 'mutation',
        name: 'OrganizationMemberRemove',
        body: 'mutation OrganizationMemberRemove($userId:ID!,$organizationId:ID!){betaOrganizationMemberRemove(userId:$userId,organizationId:$organizationId){__typename id}}',
        selector: OrganizationMemberRemoveSelector
    },
    PaymentIntentCancel: {
        kind: 'mutation',
        name: 'PaymentIntentCancel',
        body: 'mutation PaymentIntentCancel($id:ID!){paymentCancel(id:$id)}',
        selector: PaymentIntentCancelSelector
    },
    PaymentIntentCommit: {
        kind: 'mutation',
        name: 'PaymentIntentCommit',
        body: 'mutation PaymentIntentCommit($id:ID!){paymentIntentCommit(id:$id)}',
        selector: PaymentIntentCommitSelector
    },
    PersistEvents: {
        kind: 'mutation',
        name: 'PersistEvents',
        body: 'mutation PersistEvents($did:String!,$events:[Event!]!,$isProd:Boolean){track(did:$did,events:$events,isProd:$isProd)}',
        selector: PersistEventsSelector
    },
    PinMessage: {
        kind: 'mutation',
        name: 'PinMessage',
        body: 'mutation PinMessage($chatId:ID!,$messageId:ID!){pinMessage:gammaPinMessage(chatId:$chatId,messageId:$messageId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount pinnedMessage{__typename ...FullMessage}matchmaking{__typename ...MatchmakingRoomFragment}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}',
        selector: PinMessageSelector
    },
    ProfileCreate: {
        kind: 'mutation',
        name: 'ProfileCreate',
        body: 'mutation ProfileCreate($input:ProfileInput!,$inviteKey:String){profileCreate(input:$input,inviteKey:$inviteKey){__typename id firstName lastName photoRef{__typename uuid crop{__typename x y w h}}email phone website about location}}',
        selector: ProfileCreateSelector
    },
    ProfileUpdate: {
        kind: 'mutation',
        name: 'ProfileUpdate',
        body: 'mutation ProfileUpdate($input:ProfileInput!,$uid:ID,$inviteKey:String){profileUpdate(input:$input,uid:$uid,inviteKey:$inviteKey){__typename id firstName lastName photoRef{__typename uuid crop{__typename x y w h}}email phone website about location role:alphaRole linkedin instagram facebook twitter primaryOrganizationId:alphaPrimaryOrganizationId joinedAt:alphaJoinedAt invitedBy:alphaInvitedBy{__typename id name}}}',
        selector: ProfileUpdateSelector
    },
    ReadNotification: {
        kind: 'mutation',
        name: 'ReadNotification',
        body: 'mutation ReadNotification($notificationId:ID!){readNotification(notificationId:$notificationId){__typename id unread}}',
        selector: ReadNotificationSelector
    },
    RefreshAppToken: {
        kind: 'mutation',
        name: 'RefreshAppToken',
        body: 'mutation RefreshAppToken($appId:ID!){refreshAppToken(appId:$appId){__typename ...AppFull}}fragment AppFull on AppProfile{__typename id name shortname photoRef{__typename uuid crop{__typename x y w h}}about token{__typename salt}}',
        selector: RefreshAppTokenSelector
    },
    RegisterPush: {
        kind: 'mutation',
        name: 'RegisterPush',
        body: 'mutation RegisterPush($endpoint:String!,$type:PushType!){registerPush(endpoint:$endpoint,type:$type)}',
        selector: RegisterPushSelector
    },
    RegisterWebPush: {
        kind: 'mutation',
        name: 'RegisterWebPush',
        body: 'mutation RegisterWebPush($endpoint:String!){registerWebPush(endpoint:$endpoint)}',
        selector: RegisterWebPushSelector
    },
    RemoveCard: {
        kind: 'mutation',
        name: 'RemoveCard',
        body: 'mutation RemoveCard($id:ID!){cardRemove(id:$id){__typename id deleted}}',
        selector: RemoveCardSelector
    },
    ReportContent: {
        kind: 'mutation',
        name: 'ReportContent',
        body: 'mutation ReportContent($contentId:ID!,$type:String!,$message:String){reportContent(contentId:$contentId,type:$type,message:$message)}',
        selector: ReportContentSelector
    },
    ReportOnline: {
        kind: 'mutation',
        name: 'ReportOnline',
        body: 'mutation ReportOnline($active:Boolean,$platform:String){presenceReportOnline(timeout:5000,active:$active,platform:$platform)}',
        selector: ReportOnlineSelector
    },
    RoomAddMembers: {
        kind: 'mutation',
        name: 'RoomAddMembers',
        body: 'mutation RoomAddMembers($roomId:ID!,$invites:[RoomInviteInput!]!){alphaRoomInvite(roomId:$roomId,invites:$invites){__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}',
        selector: RoomAddMembersSelector
    },
    RoomAlterFeatured: {
        kind: 'mutation',
        name: 'RoomAlterFeatured',
        body: 'mutation RoomAlterFeatured($roomId:ID!,$featured:Boolean!){betaRoomAlterFeatured(roomId:$roomId,featured:$featured){__typename id listed featured}}',
        selector: RoomAlterFeaturedSelector
    },
    RoomAlterHidden: {
        kind: 'mutation',
        name: 'RoomAlterHidden',
        body: 'mutation RoomAlterHidden($roomId:ID!,$listed:Boolean!){betaRoomAlterListed(roomId:$roomId,listed:$listed){__typename id listed featured}}',
        selector: RoomAlterHiddenSelector
    },
    RoomChangeRole: {
        kind: 'mutation',
        name: 'RoomChangeRole',
        body: 'mutation RoomChangeRole($roomId:ID!,$userId:ID!,$newRole:RoomMemberRole!){betaRoomChangeRole(roomId:$roomId,userId:$userId,newRole:$newRole){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel title photo socialImage description shortname organization{__typename ...OrganizationMedium}membership role membersCount featuredMembersCount onlineMembersCount previewMembers{__typename id photo name}members{__typename role membership user{__typename ...UserShort}canKick badge{__typename ...UserBadge}}requests{__typename user{__typename ...UserShort}}settings{__typename id mute}canEdit canSendMessage welcomeMessage{__typename isOn sender{__typename id name}message}matchmaking{__typename ...MatchmakingRoomFragment}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationMedium on Organization{__typename id name photo isMine membersCount shortname about isOwner:betaIsOwner isAdmin:betaIsAdmin isCommunity:alphaIsCommunity}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}',
        selector: RoomChangeRoleSelector
    },
    RoomCreate: {
        kind: 'mutation',
        name: 'RoomCreate',
        body: 'mutation RoomCreate($kind:SharedRoomKind!,$members:[ID!]!,$message:String,$title:String,$description:String,$photoRef:ImageRefInput,$organizationId:ID,$channel:Boolean!,$price:Int,$interval:WalletSubscriptionInterval){room:betaRoomCreate(kind:$kind,members:$members,message:$message,title:$title,description:$description,photoRef:$photoRef,organizationId:$organizationId,channel:$channel,price:$price,interval:$interval){__typename id}}',
        selector: RoomCreateSelector
    },
    RoomDeleteMessage: {
        kind: 'mutation',
        name: 'RoomDeleteMessage',
        body: 'mutation RoomDeleteMessage($messageId:ID!){betaMessageDelete(mid:$messageId)}',
        selector: RoomDeleteMessageSelector
    },
    RoomDeleteMessages: {
        kind: 'mutation',
        name: 'RoomDeleteMessages',
        body: 'mutation RoomDeleteMessages($mids:[ID!]!){betaMessageDelete(mids:$mids)}',
        selector: RoomDeleteMessagesSelector
    },
    RoomDeleteUrlAugmentation: {
        kind: 'mutation',
        name: 'RoomDeleteUrlAugmentation',
        body: 'mutation RoomDeleteUrlAugmentation($messageId:ID!){betaMessageDeleteAugmentation(mid:$messageId)}',
        selector: RoomDeleteUrlAugmentationSelector
    },
    RoomJoin: {
        kind: 'mutation',
        name: 'RoomJoin',
        body: 'mutation RoomJoin($roomId:ID!){join:betaRoomJoin(roomId:$roomId){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}',
        selector: RoomJoinSelector
    },
    RoomJoinInviteLink: {
        kind: 'mutation',
        name: 'RoomJoinInviteLink',
        body: 'mutation RoomJoinInviteLink($invite:String!){join:betaRoomInviteLinkJoin(invite:$invite){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount pinnedMessage{__typename ...FullMessage}matchmaking{__typename ...MatchmakingRoomFragment}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}',
        selector: RoomJoinInviteLinkSelector
    },
    RoomKick: {
        kind: 'mutation',
        name: 'RoomKick',
        body: 'mutation RoomKick($roomId:ID!,$userId:ID!){betaRoomKick(roomId:$roomId,userId:$userId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel title photo socialImage description shortname organization{__typename ...OrganizationMedium}membership role membersCount featuredMembersCount onlineMembersCount previewMembers{__typename id photo name}members{__typename role membership user{__typename ...UserShort}canKick badge{__typename ...UserBadge}}requests{__typename user{__typename ...UserShort}}settings{__typename id mute}canEdit canSendMessage welcomeMessage{__typename isOn sender{__typename id name}message}matchmaking{__typename ...MatchmakingRoomFragment}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationMedium on Organization{__typename id name photo isMine membersCount shortname about isOwner:betaIsOwner isAdmin:betaIsAdmin isCommunity:alphaIsCommunity}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}',
        selector: RoomKickSelector
    },
    RoomLeave: {
        kind: 'mutation',
        name: 'RoomLeave',
        body: 'mutation RoomLeave($roomId:ID!){betaRoomLeave(roomId:$roomId){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}',
        selector: RoomLeaveSelector
    },
    RoomRead: {
        kind: 'mutation',
        name: 'RoomRead',
        body: 'mutation RoomRead($id:ID!,$mid:ID!){roomRead(id:$id,mid:$mid)}',
        selector: RoomReadSelector
    },
    RoomRenewInviteLink: {
        kind: 'mutation',
        name: 'RoomRenewInviteLink',
        body: 'mutation RoomRenewInviteLink($roomId:ID!){link:betaRoomInviteLinkRenew(roomId:$roomId)}',
        selector: RoomRenewInviteLinkSelector
    },
    RoomSettingsUpdate: {
        kind: 'mutation',
        name: 'RoomSettingsUpdate',
        body: 'mutation RoomSettingsUpdate($settings:RoomUserNotificaionSettingsInput!,$roomId:ID!){betaRoomUpdateUserNotificationSettings(settings:$settings,roomId:$roomId){__typename id mute}}',
        selector: RoomSettingsUpdateSelector
    },
    RoomUpdate: {
        kind: 'mutation',
        name: 'RoomUpdate',
        body: 'mutation RoomUpdate($roomId:ID!,$input:RoomUpdateInput!){betaRoomUpdate(roomId:$roomId,input:$input){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id title photo description socialImage}}}',
        selector: RoomUpdateSelector
    },
    RoomsInviteUser: {
        kind: 'mutation',
        name: 'RoomsInviteUser',
        body: 'mutation RoomsInviteUser($userId:ID!,$roomIds:[ID!]!){rooms:betaRoomsInviteUser(userId:$userId,roomIds:$roomIds){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount pinnedMessage{__typename ...FullMessage}matchmaking{__typename ...MatchmakingRoomFragment}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}',
        selector: RoomsInviteUserSelector
    },
    RoomsJoin: {
        kind: 'mutation',
        name: 'RoomsJoin',
        body: 'mutation RoomsJoin($roomsIds:[ID!]!){join:betaRoomsJoin(roomsIds:$roomsIds){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}',
        selector: RoomsJoinSelector
    },
    SendMessage: {
        kind: 'mutation',
        name: 'SendMessage',
        body: 'mutation SendMessage($chatId:ID!,$message:String,$replyMessages:[ID!],$mentions:[MentionInput!],$fileAttachments:[FileAttachmentInput!],$spans:[MessageSpanInput!],$repeatKey:String){sentMessage:sendMessage(chatId:$chatId,message:$message,replyMessages:$replyMessages,mentions:$mentions,fileAttachments:$fileAttachments,spans:$spans,repeatKey:$repeatKey)}',
        selector: SendMessageSelector
    },
    SendSticker: {
        kind: 'mutation',
        name: 'SendSticker',
        body: 'mutation SendSticker($chatId:ID!,$stickerId:ID!,$replyMessages:[ID!],$repeatKey:String){sendSticker(chatId:$chatId,stickerId:$stickerId,replyMessages:$replyMessages,repeatKey:$repeatKey)}',
        selector: SendStickerSelector
    },
    SetFeedChannelShortname: {
        kind: 'mutation',
        name: 'SetFeedChannelShortname',
        body: 'mutation SetFeedChannelShortname($id:ID!,$shortname:String!){alphaSetFeedChannelShortName(id:$id,shortname:$shortname)}',
        selector: SetFeedChannelShortnameSelector
    },
    SetOrgShortname: {
        kind: 'mutation',
        name: 'SetOrgShortname',
        body: 'mutation SetOrgShortname($organizationId:ID!,$shortname:String!){alphaSetOrgShortName(id:$organizationId,shortname:$shortname)}',
        selector: SetOrgShortnameSelector
    },
    SetRoomShortname: {
        kind: 'mutation',
        name: 'SetRoomShortname',
        body: 'mutation SetRoomShortname($id:ID!,$shortname:String!){alphaSetRoomShortName(id:$id,shortname:$shortname)}',
        selector: SetRoomShortnameSelector
    },
    SetTyping: {
        kind: 'mutation',
        name: 'SetTyping',
        body: 'mutation SetTyping($conversationId:ID!,$type:TypingType!){typingSend(conversationId:$conversationId,type:$type)}',
        selector: SetTypingSelector
    },
    SetUserShortname: {
        kind: 'mutation',
        name: 'SetUserShortname',
        body: 'mutation SetUserShortname($shortname:String!){alphaSetUserShortName(shortname:$shortname)}',
        selector: SetUserShortnameSelector
    },
    SettingsUpdate: {
        kind: 'mutation',
        name: 'SettingsUpdate',
        body: 'mutation SettingsUpdate($input:UpdateSettingsInput){updateSettings(settings:$input){__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id primaryEmail emailFrequency excludeMutedChats countUnreadChats desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}organizationChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}notificationPreview}',
        selector: SettingsUpdateSelector
    },
    StickerPackAddToCollection: {
        kind: 'mutation',
        name: 'StickerPackAddToCollection',
        body: 'mutation StickerPackAddToCollection($id:ID!){stickerPackAddToCollection:stickerPackAddToCollection(id:$id)}',
        selector: StickerPackAddToCollectionSelector
    },
    StickerPackRemoveFromCollection: {
        kind: 'mutation',
        name: 'StickerPackRemoveFromCollection',
        body: 'mutation StickerPackRemoveFromCollection($id:ID!){stickerPackRemoveFromCollection:stickerPackRemoveFromCollection(id:$id)}',
        selector: StickerPackRemoveFromCollectionSelector
    },
    SubscribeToComments: {
        kind: 'mutation',
        name: 'SubscribeToComments',
        body: 'mutation SubscribeToComments($peerId:ID!,$type:CommentSubscriptionType!){subscribeToComments(peerId:$peerId,type:$type)}',
        selector: SubscribeToCommentsSelector
    },
    SuperAccountActivate: {
        kind: 'mutation',
        name: 'SuperAccountActivate',
        body: 'mutation SuperAccountActivate($accountId:ID!){superAccountActivate(id:$accountId){__typename id state}}',
        selector: SuperAccountActivateSelector
    },
    SuperAccountAdd: {
        kind: 'mutation',
        name: 'SuperAccountAdd',
        body: 'mutation SuperAccountAdd($title:String!){superAccountAdd(title:$title){__typename id}}',
        selector: SuperAccountAddSelector
    },
    SuperAccountMemberAdd: {
        kind: 'mutation',
        name: 'SuperAccountMemberAdd',
        body: 'mutation SuperAccountMemberAdd($accountId:ID!,$userId:ID!){superAccountMemberAdd(id:$accountId,userId:$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: SuperAccountMemberAddSelector
    },
    SuperAccountMemberRemove: {
        kind: 'mutation',
        name: 'SuperAccountMemberRemove',
        body: 'mutation SuperAccountMemberRemove($accountId:ID!,$userId:ID!){superAccountMemberRemove(id:$accountId,userId:$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: SuperAccountMemberRemoveSelector
    },
    SuperAccountPend: {
        kind: 'mutation',
        name: 'SuperAccountPend',
        body: 'mutation SuperAccountPend($accountId:ID!){superAccountPend(id:$accountId){__typename id state}}',
        selector: SuperAccountPendSelector
    },
    SuperAccountRename: {
        kind: 'mutation',
        name: 'SuperAccountRename',
        body: 'mutation SuperAccountRename($accountId:ID!,$title:String!){superAccountRename(id:$accountId,title:$title){__typename id title}}',
        selector: SuperAccountRenameSelector
    },
    SuperAccountSuspend: {
        kind: 'mutation',
        name: 'SuperAccountSuspend',
        body: 'mutation SuperAccountSuspend($accountId:ID!){superAccountSuspend(id:$accountId){__typename id state}}',
        selector: SuperAccountSuspendSelector
    },
    SuperAdminAdd: {
        kind: 'mutation',
        name: 'SuperAdminAdd',
        body: 'mutation SuperAdminAdd($userId:ID!,$role:SuperAdminRole!){superAdminAdd(userId:$userId,role:$role)}',
        selector: SuperAdminAddSelector
    },
    SuperAdminRemove: {
        kind: 'mutation',
        name: 'SuperAdminRemove',
        body: 'mutation SuperAdminRemove($userId:ID!){superAdminRemove(userId:$userId)}',
        selector: SuperAdminRemoveSelector
    },
    SuperBadgeCreateToRoom: {
        kind: 'mutation',
        name: 'SuperBadgeCreateToRoom',
        body: 'mutation SuperBadgeCreateToRoom($roomId:ID!,$userId:ID!,$name:String!){superBadgeCreateToRoom(roomId:$roomId,userId:$userId,name:$name){__typename ...UserBadge}}fragment UserBadge on UserBadge{__typename id name verified}',
        selector: SuperBadgeCreateToRoomSelector
    },
    SuperBadgeUnsetToRoom: {
        kind: 'mutation',
        name: 'SuperBadgeUnsetToRoom',
        body: 'mutation SuperBadgeUnsetToRoom($roomId:ID!,$userId:ID!,$badgeId:ID!){superBadgeUnsetToRoom(roomId:$roomId,userId:$userId,badgeId:$badgeId)}',
        selector: SuperBadgeUnsetToRoomSelector
    },
    UnSubscribeFromComments: {
        kind: 'mutation',
        name: 'UnSubscribeFromComments',
        body: 'mutation UnSubscribeFromComments($peerId:ID!){unsubscribeFromComments(peerId:$peerId)}',
        selector: UnSubscribeFromCommentsSelector
    },
    UnpinMessage: {
        kind: 'mutation',
        name: 'UnpinMessage',
        body: 'mutation UnpinMessage($chatId:ID!){unpinMessage:gammaUnpinMessage(chatId:$chatId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount pinnedMessage{__typename ...FullMessage}matchmaking{__typename ...MatchmakingRoomFragment}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}',
        selector: UnpinMessageSelector
    },
    UnsetTyping: {
        kind: 'mutation',
        name: 'UnsetTyping',
        body: 'mutation UnsetTyping($conversationId:ID!){typingCancel(conversationId:$conversationId)}',
        selector: UnsetTypingSelector
    },
    UpdateApp: {
        kind: 'mutation',
        name: 'UpdateApp',
        body: 'mutation UpdateApp($appId:ID!,$input:AppProfileInput!){updateAppProfile(appId:$appId,input:$input){__typename ...AppFull}}fragment AppFull on AppProfile{__typename id name shortname photoRef{__typename uuid crop{__typename x y w h}}about token{__typename salt}}',
        selector: UpdateAppSelector
    },
    UpdateOrganization: {
        kind: 'mutation',
        name: 'UpdateOrganization',
        body: 'mutation UpdateOrganization($input:UpdateOrganizationProfileInput!,$organizationId:ID){updateOrganizationProfile(input:$input,id:$organizationId){__typename ...OrganizationProfileFull}}fragment OrganizationProfileFull on OrganizationProfile{__typename id name photoRef{__typename uuid crop{__typename x y w h}}website websiteTitle about twitter facebook linkedin instagram shortname private:alphaIsPrivate featured:alphaFeatured published:alphaPublished editorial:alphaEditorial}',
        selector: UpdateOrganizationSelector
    },
    UpdateWelcomeMessage: {
        kind: 'mutation',
        name: 'UpdateWelcomeMessage',
        body: 'mutation UpdateWelcomeMessage($roomId:ID!,$welcomeMessageIsOn:Boolean!,$welcomeMessageSender:ID,$welcomeMessageText:String){updateWelcomeMessage(roomId:$roomId,welcomeMessageIsOn:$welcomeMessageIsOn,welcomeMessageSender:$welcomeMessageSender,welcomeMessageText:$welcomeMessageText)}',
        selector: UpdateWelcomeMessageSelector
    },
    UserStorageSet: {
        kind: 'mutation',
        name: 'UserStorageSet',
        body: 'mutation UserStorageSet($namespace:String!,$data:[AppStorageValueInput!]!){userStorageSet(namespace:$namespace,data:$data){__typename id key value}}',
        selector: UserStorageSetSelector
    },
    ChatOnlinesCountWatch: {
        kind: 'subscription',
        name: 'ChatOnlinesCountWatch',
        body: 'subscription ChatOnlinesCountWatch($chatId:ID!){chatOnlinesCount(chatId:$chatId){__typename onlineMembers}}',
        selector: ChatOnlinesCountWatchSelector
    },
    ChatWatch: {
        kind: 'subscription',
        name: 'ChatWatch',
        body: 'subscription ChatWatch($chatId:ID!,$state:String){event:chatUpdates(chatId:$chatId,fromState:$state){__typename ... on ChatUpdateSingle{__typename seq state update{__typename ...ChatUpdateFragment}}... on ChatUpdateBatch{__typename fromSeq seq state updates{__typename ...ChatUpdateFragment}}}}fragment ChatUpdateFragment on ChatUpdate{__typename ... on ChatMessageReceived{__typename message{__typename ...FullMessage}repeatKey}... on ChatMessageUpdated{__typename message{__typename ...FullMessage}}... on ChatMessageDeleted{__typename message{__typename id}}... on ChatUpdated{__typename chat{__typename ...RoomShort}}... on ChatLostAccess{__typename lostAccess}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount pinnedMessage{__typename ...FullMessage}matchmaking{__typename ...MatchmakingRoomFragment}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName}}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled questions{__typename ... on TextMatchmakingQuestion{__typename id title subtitle}... on MultiselectMatchmakingQuestion{__typename id title subtitle tags}}myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}',
        selector: ChatWatchSelector
    },
    CommentWatch: {
        kind: 'subscription',
        name: 'CommentWatch',
        body: 'subscription CommentWatch($peerId:ID!,$fromState:String){event:commentUpdates(peerId:$peerId,fromState:$fromState){__typename ... on CommentUpdateSingle{__typename seq state update{__typename ...CommentUpdateFragment}}... on CommentUpdateBatch{__typename fromSeq seq state updates{__typename ...CommentUpdateFragment}}}}fragment CommentUpdateFragment on CommentUpdate{__typename ... on CommentReceived{__typename comment{__typename ...CommentEntryFragment}}... on CommentUpdated{__typename comment{__typename ...CommentEntryFragment}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage id}parentComment{__typename comment:betaComment{__typename id message}id}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}',
        selector: CommentWatchSelector
    },
    ConferenceMediaWatch: {
        kind: 'subscription',
        name: 'ConferenceMediaWatch',
        body: 'subscription ConferenceMediaWatch($id:ID!,$peerId:ID!){media:alphaConferenceMediaWatch(id:$id,peerId:$peerId){__typename id streams{__typename id peerId state sdp ice}}}',
        selector: ConferenceMediaWatchSelector
    },
    ConferenceWatch: {
        kind: 'subscription',
        name: 'ConferenceWatch',
        body: 'subscription ConferenceWatch($id:ID!){alphaConferenceWatch(id:$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename id startTime peers{__typename id user{__typename ...UserShort}connection{__typename state sdp ice}}iceServers{__typename urls username credential}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: ConferenceWatchSelector
    },
    DebugEventsWatch: {
        kind: 'subscription',
        name: 'DebugEventsWatch',
        body: 'subscription DebugEventsWatch($fromState:String,$eventsCount:Int!,$randomDelays:Boolean!,$seed:String!){debugEvents(fromState:$fromState,eventsCount:$eventsCount,randomDelays:$randomDelays,seed:$seed){__typename seq key}}',
        selector: DebugEventsWatchSelector
    },
    DialogsWatch: {
        kind: 'subscription',
        name: 'DialogsWatch',
        body: 'subscription DialogsWatch($state:String){event:dialogsUpdates(fromState:$state){__typename ... on DialogUpdateSingle{__typename state update{__typename ...DialogUpdateFragment}}... on DialogUpdateBatch{__typename state updates{__typename ...DialogUpdateFragment}}}}fragment DialogUpdateFragment on DialogUpdate{__typename ... on DialogMessageReceived{__typename cid unread globalUnread message:alphaMessage{__typename ...DialogMessage ... on ServiceMessage{__typename id serviceMetadata{__typename}}}haveMention silent{__typename mobile desktop}showNotification{__typename mobile desktop}membership}... on DialogMessageUpdated{__typename cid message:alphaMessage{__typename ...DialogMessage}haveMention}... on DialogMessageDeleted{__typename cid message:alphaMessage{__typename ...DialogMessage}prevMessage:alphaPrevMessage{__typename ...DialogMessage}unread globalUnread haveMention}... on DialogMessageRead{__typename cid mid unread globalUnread haveMention}... on DialogMuteChanged{__typename cid mute}... on DialogPeerUpdated{__typename cid peer{__typename ... on PrivateRoom{__typename id user{__typename id name photo}}... on SharedRoom{__typename id title photo}}}... on DialogDeleted{__typename cid globalUnread}... on DialogBump{__typename cid globalUnread unread topMessage{__typename ...DialogMessage ... on ServiceMessage{__typename id serviceMetadata{__typename}}}haveMention membership}}fragment DialogMessage on ModernMessage{__typename id date sender{__typename id name photo firstName}message fallback ... on GeneralMessage{__typename id quotedMessages{__typename id}}}',
        selector: DialogsWatchSelector
    },
    FeedUpdates: {
        kind: 'subscription',
        name: 'FeedUpdates',
        body: 'subscription FeedUpdates($state:String){event:homeFeedUpdates(fromState:$state){__typename updates{__typename ...FeedUpdateFragment}state}}fragment FeedUpdateFragment on FeedUpdate{__typename ... on FeedItemReceived{__typename item{__typename ...FeedItemFull}}... on FeedItemUpdated{__typename item{__typename ...FeedItemFull}}... on FeedItemDeleted{__typename item{__typename ...FeedItemFull}}... on FeedRebuildNeeded{__typename feed:homeFeed{__typename items{__typename ...FeedItemFull}cursor}}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{__typename id date author{__typename ...FeedPostAuthorFragment}source{__typename ...FeedPostSourceFragment}edited canEdit commentsCount message fallback reactions{__typename user{__typename ...UserShort}reaction}slides{__typename ...SlideFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{__typename ...UserShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}fragment SlideFragment on Slide{__typename ... on TextSlide{__typename id text spans{__typename ...SpanFragment}cover{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}coverAlign attachments{__typename ... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title roomPhoto:photo membersCount membership canSendMessage organization{__typename id name photo}}... on Organization{__typename ...OrganizationShort}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}',
        selector: FeedUpdatesSelector
    },
    MyNotificationsCenter: {
        kind: 'subscription',
        name: 'MyNotificationsCenter',
        body: 'subscription MyNotificationsCenter($state:String){event:notificationCenterUpdates(fromState:$state){__typename ... on NotificationCenterUpdateSingle{__typename seq state update{__typename ...NotificationCenterUpdateFragment}}... on NotificationCenterUpdateBatch{__typename fromSeq seq state updates{__typename ...NotificationCenterUpdateFragment}}}}fragment NotificationCenterUpdateFragment on NotificationCenterUpdate{__typename ... on NotificationReceived{__typename center{__typename id unread}notification{__typename ...NotificationFragment}}... on NotificationUpdated{__typename center{__typename id unread}notification{__typename ...NotificationFragment}}... on NotificationDeleted{__typename center{__typename id unread}notification{__typename id}}... on NotificationRead{__typename center{__typename id unread}}... on NotificationContentUpdated{__typename content{__typename ... on UpdatedNotificationContentComment{__typename peer{__typename peerRoot{__typename ... on CommentPeerRootMessage{__typename message{__typename ... on GeneralMessage{__typename id fallback message sender{__typename id name}senderBadge{__typename ...UserBadge}}}chat{__typename ...RoomNano}}... on CommentPeerRootFeedItem{__typename item{__typename ...FeedItemFull}}}id subscription{__typename type}}comment{__typename ...CommentEntryFragment}}}}}fragment NotificationFragment on Notification{__typename id text content{__typename ... on NewCommentNotification{__typename comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{__typename message{__typename ... on GeneralMessage{__typename id fallback message sender{__typename id name}senderBadge{__typename ...UserBadge}}}chat{__typename ...RoomNano}}... on CommentPeerRootFeedItem{__typename item{__typename ...FeedItemFull}}}subscription{__typename type}}}... on NewMatchmakingProfilesNotification{__typename room{__typename peer{__typename ... on SharedRoom{__typename ...RoomNano}}}profiles{__typename ...MatchmakingProfileFragment}}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage id}parentComment{__typename comment:betaComment{__typename id message}id}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}edited commentsCount attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}}spans{__typename ...SpanFragment}... on StickerMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}date commentsCount sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}quotedMessages{__typename ...QuotedMessage}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ...StickerFragment}}... on ServiceMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}serviceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename ...UserTiny}invitedBy{__typename ...UserTiny}}... on KickServiceMetadata{__typename user{__typename ...UserTiny}kickedBy{__typename ...UserTiny}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}fragment UserBadge on UserBadge{__typename id name verified}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{__typename id overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}commentsCount edited attachments{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}keyboard{__typename buttons{__typename id title style url}}imageFallback{__typename photo text}fallback}}}... on StickerMessage{__typename id date overrideName overrideAvatar{__typename uuid crop{__typename x y w h}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}}reactions{__typename user{__typename ...UserShort}reaction}sticker{__typename ... on ImageSticker{__typename id pack{__typename ... on StickerPack{__typename id title}}image{__typename ... on ImageRef{__typename uuid}}}}}}fragment SpanFragment on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{__typename organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{__typename room{__typename ...RoomNano}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment UserForMention on User{__typename isYou id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title roomPhoto:photo membersCount settings{__typename id mute}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment UserTiny on User{__typename id isYou name firstName lastName photo shortname primaryOrganization{__typename ...OrganizationShort}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{__typename id date author{__typename ...FeedPostAuthorFragment}source{__typename ...FeedPostSourceFragment}edited canEdit commentsCount message fallback reactions{__typename user{__typename ...UserShort}reaction}slides{__typename ...SlideFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{__typename ...UserShort}}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename id title about photo subscribed myRole subscribersCount shortname isGlobal socialImage postsCount}fragment SlideFragment on Slide{__typename ... on TextSlide{__typename id text spans{__typename ...SpanFragment}cover{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}coverAlign attachments{__typename ... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title roomPhoto:photo membersCount membership canSendMessage organization{__typename id name photo}}... on Organization{__typename ...OrganizationShort}}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename chatCreated user{__typename id isYou name photo isBot primaryOrganization{__typename id name}}answers{__typename ... on TextMatchmakingAnswer{__typename question{__typename id title subtitle}answer}... on MultiselectMatchmakingAnswer{__typename question{__typename id title subtitle}tags}}}',
        selector: MyNotificationsCenterSelector
    },
    OnlineWatch: {
        kind: 'subscription',
        name: 'OnlineWatch',
        body: 'subscription OnlineWatch($users:[ID!]!){alphaSubscribeOnline(users:$users){__typename user{__typename id online lastSeen}timeout}}',
        selector: OnlineWatchSelector
    },
    SettingsWatch: {
        kind: 'subscription',
        name: 'SettingsWatch',
        body: 'subscription SettingsWatch{watchSettings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id primaryEmail emailFrequency excludeMutedChats countUnreadChats desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}organizationChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}notificationPreview}',
        selector: SettingsWatchSelector
    },
    TypingsWatch: {
        kind: 'subscription',
        name: 'TypingsWatch',
        body: 'subscription TypingsWatch{typings{__typename conversation:chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}user{__typename id photo firstName}cancel type}}',
        selector: TypingsWatchSelector
    },
    WalletUpdates: {
        kind: 'subscription',
        name: 'WalletUpdates',
        body: 'subscription WalletUpdates($state:String!){event:walletUpdates(fromState:$state){__typename ... on WalletUpdateSingle{__typename state update{__typename ...WalletUpdateFragment}}... on WalletUpdateBatch{__typename state updates{__typename ...WalletUpdateFragment}}}}fragment WalletUpdateFragment on WalletUpdate{__typename ... on WalletUpdateBalance{__typename amount}... on WalletUpdateLocked{__typename isLocked failingPaymentsCount}... on WalletUpdateTransactionSuccess{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdateTransactionCanceled{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdateTransactionPending{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdatePaymentStatus{__typename payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}}fragment WalletTransactionFragment on WalletTransaction{__typename id status date operation{__typename ... on WalletTransactionDeposit{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}}... on WalletTransactionIncome{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}source{__typename ... on WalletSubscription{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}}}... on Purchase{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}}}}}... on WalletTransactionTransferIn{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}fromUser{__typename ...UserShort}}... on WalletTransactionTransferOut{__typename amount walletAmount chargeAmount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}toUser{__typename ...UserShort}}... on WalletTransactionSubscription{__typename amount walletAmount chargeAmount subscription{__typename id interval amount product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}... on WalletTransactionPurchase{__typename amount walletAmount chargeAmount purchase{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isYou isBot shortname primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity membersCount}',
        selector: WalletUpdatesSelector
    },
};
export const Definitions: AllDefinitions = { operations: Operations };