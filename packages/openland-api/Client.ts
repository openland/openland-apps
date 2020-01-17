// @ts-ignore
import { list, notNull, scalar, field, obj, inline, fragment, args, fieldValue, refValue, intValue, floatValue, stringValue, boolValue, listValue, objectValue, OperationDefinition } from 'openland-graphql/spacex/types';

const AppChatSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('chat', 'chat', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('PrivateRoom', obj(
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )),
                    inline('SharedRoom', obj(
                        field('id', 'id', args(), notNull(scalar('ID')))
                    ))
                ))),
            field('webhook', 'webhook', args(), notNull(scalar('String')))
        );

const AppFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('about', 'about', args(), scalar('String')),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photoRef', 'photoRef', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('crop', 'crop', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('h', 'h', args(), notNull(scalar('Int'))),
                            field('w', 'w', args(), notNull(scalar('Int'))),
                            field('x', 'x', args(), notNull(scalar('Int'))),
                            field('y', 'y', args(), notNull(scalar('Int')))
                        )),
                    field('uuid', 'uuid', args(), notNull(scalar('String')))
                )),
            field('shortname', 'shortname', args(), scalar('String')),
            field('token', 'token', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('salt', 'salt', args(), notNull(scalar('String')))
                )))
        );

const OrganizationShortSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('about', 'about', args(), scalar('String')),
            field('alphaIsCommunity', 'isCommunity', args(), notNull(scalar('Boolean'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('shortname', 'shortname', args(), scalar('String'))
        );

const UserShortSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('email', 'email', args(), scalar('String')),
            field('firstName', 'firstName', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('isBot', 'isBot', args(), notNull(scalar('Boolean'))),
            field('isYou', 'isYou', args(), notNull(scalar('Boolean'))),
            field('lastName', 'lastName', args(), scalar('String')),
            field('lastSeen', 'lastSeen', args(), scalar('String')),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('online', 'online', args(), notNull(scalar('Boolean'))),
            field('photo', 'photo', args(), scalar('String')),
            field('primaryOrganization', 'primaryOrganization', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Organization', OrganizationShortSelector)
                )),
            field('shortname', 'shortname', args(), scalar('String'))
        );

const UserBadgeSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('verified', 'verified', args(), notNull(scalar('Boolean')))
        );

const UserForMentionSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('isBot', 'isBot', args(), notNull(scalar('Boolean'))),
            field('isYou', 'isYou', args(), notNull(scalar('Boolean'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('primaryOrganization', 'primaryOrganization', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('name', 'name', args(), notNull(scalar('String')))
                )),
            field('shortname', 'shortname', args(), scalar('String'))
        );

const RoomSharedNanoSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
            field('kind', 'kind', args(), notNull(scalar('String'))),
            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
            field('photo', 'roomPhoto', args(), notNull(scalar('String'))),
            field('settings', 'settings', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('mute', 'mute', args(), scalar('Boolean'))
                ))),
            field('title', 'title', args(), notNull(scalar('String')))
        );

const RoomNanoSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('PrivateRoom', obj(
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('settings', 'settings', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('mute', 'mute', args(), scalar('Boolean'))
                    ))),
                field('user', 'user', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('name', 'name', args(), notNull(scalar('String'))),
                        field('photo', 'photo', args(), scalar('String'))
                    )))
            )),
            inline('SharedRoom', obj(
                fragment('SharedRoom', RoomSharedNanoSelector)
            ))
        );

const SpanFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('length', 'length', args(), notNull(scalar('Int'))),
            field('offset', 'offset', args(), notNull(scalar('Int'))),
            inline('MessageSpanUserMention', obj(
                field('user', 'user', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('User', UserForMentionSelector)
                    )))
            )),
            inline('MessageSpanMultiUserMention', obj(
                field('users', 'users', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('User', UserForMentionSelector)
                    )))))
            )),
            inline('MessageSpanOrganizationMention', obj(
                field('organization', 'organization', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Organization', OrganizationShortSelector)
                    )))
            )),
            inline('MessageSpanRoomMention', obj(
                field('room', 'room', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Room', RoomNanoSelector)
                    )))
            )),
            inline('MessageSpanLink', obj(
                field('url', 'url', args(), notNull(scalar('String')))
            )),
            inline('MessageSpanDate', obj(
                field('date', 'date', args(), notNull(scalar('Date')))
            ))
        );

const QuotedMessageSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('date', 'date', args(), notNull(scalar('Date'))),
            field('fallback', 'fallback', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('message', 'message', args(), scalar('String')),
            field('message', 'message', args(), scalar('String')),
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
                        field('chat', 'chat', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                inline('PrivateRoom', obj(
                                    field('id', 'id', args(), notNull(scalar('ID')))
                                )),
                                inline('SharedRoom', obj(
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
                field('attachments', 'attachments', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('fallback', 'fallback', args(), notNull(scalar('String'))),
                        inline('MessageAttachmentFile', obj(
                            field('fileId', 'fileId', args(), notNull(scalar('String'))),
                            field('fileMetadata', 'fileMetadata', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('imageFormat', 'imageFormat', args(), scalar('String')),
                                    field('imageHeight', 'imageHeight', args(), scalar('Int')),
                                    field('imageWidth', 'imageWidth', args(), scalar('Int')),
                                    field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                    field('mimeType', 'mimeType', args(), scalar('String')),
                                    field('name', 'name', args(), notNull(scalar('String'))),
                                    field('size', 'size', args(), notNull(scalar('Int')))
                                ))),
                            field('filePreview', 'filePreview', args(), scalar('String')),
                            field('id', 'id', args(), notNull(scalar('ID')))
                        )),
                        inline('MessageRichAttachment', obj(
                            field('fallback', 'fallback', args(), notNull(scalar('String'))),
                            field('icon', 'icon', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('metadata', 'metadata', args(), obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('imageFormat', 'imageFormat', args(), scalar('String')),
                                            field('imageHeight', 'imageHeight', args(), scalar('Int')),
                                            field('imageWidth', 'imageWidth', args(), scalar('Int')),
                                            field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                            field('mimeType', 'mimeType', args(), scalar('String')),
                                            field('name', 'name', args(), notNull(scalar('String'))),
                                            field('size', 'size', args(), notNull(scalar('Int')))
                                        )),
                                    field('url', 'url', args(), notNull(scalar('String')))
                                )),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('image', 'image', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('metadata', 'metadata', args(), obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('imageFormat', 'imageFormat', args(), scalar('String')),
                                            field('imageHeight', 'imageHeight', args(), scalar('Int')),
                                            field('imageWidth', 'imageWidth', args(), scalar('Int')),
                                            field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                            field('mimeType', 'mimeType', args(), scalar('String')),
                                            field('name', 'name', args(), notNull(scalar('String'))),
                                            field('size', 'size', args(), notNull(scalar('Int')))
                                        )),
                                    field('url', 'url', args(), notNull(scalar('String')))
                                )),
                            field('imageFallback', 'imageFallback', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('photo', 'photo', args(), notNull(scalar('String'))),
                                    field('text', 'text', args(), notNull(scalar('String')))
                                )),
                            field('subTitle', 'subTitle', args(), scalar('String')),
                            field('text', 'text', args(), scalar('String')),
                            field('title', 'title', args(), scalar('String')),
                            field('titleLink', 'titleLink', args(), scalar('String')),
                            field('titleLinkHostname', 'titleLinkHostname', args(), scalar('String'))
                        ))
                    ))))),
                field('commentsCount', 'commentsCount', args(), notNull(scalar('Int'))),
                field('edited', 'edited', args(), notNull(scalar('Boolean'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('overrideAvatar', 'overrideAvatar', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('crop', 'crop', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('h', 'h', args(), notNull(scalar('Int'))),
                                field('w', 'w', args(), notNull(scalar('Int'))),
                                field('x', 'x', args(), notNull(scalar('Int'))),
                                field('y', 'y', args(), notNull(scalar('Int')))
                            )),
                        field('uuid', 'uuid', args(), notNull(scalar('String')))
                    )),
                field('overrideName', 'overrideName', args(), scalar('String'))
            )),
            inline('StickerMessage', obj(
                field('date', 'date', args(), notNull(scalar('Date'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('overrideAvatar', 'overrideAvatar', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('crop', 'crop', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('h', 'h', args(), notNull(scalar('Int'))),
                                field('w', 'w', args(), notNull(scalar('Int'))),
                                field('x', 'x', args(), notNull(scalar('Int'))),
                                field('y', 'y', args(), notNull(scalar('Int')))
                            )),
                        field('uuid', 'uuid', args(), notNull(scalar('String')))
                    )),
                field('overrideName', 'overrideName', args(), scalar('String')),
                field('reactions', 'reactions', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('reaction', 'reaction', args(), notNull(scalar('String'))),
                        field('user', 'user', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserShortSelector)
                            )))
                    ))))),
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
                            field('chat', 'chat', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    inline('PrivateRoom', obj(
                                        field('id', 'id', args(), notNull(scalar('ID')))
                                    )),
                                    inline('SharedRoom', obj(
                                        field('id', 'id', args(), notNull(scalar('ID')))
                                    ))
                                )))
                        ))
                    )),
                field('sticker', 'sticker', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        inline('ImageSticker', obj(
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('image', 'image', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    inline('ImageRef', obj(
                                        field('uuid', 'uuid', args(), notNull(scalar('String')))
                                    ))
                                ))),
                            field('pack', 'pack', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    inline('StickerPack', obj(
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('title', 'title', args(), notNull(scalar('String')))
                                    ))
                                )))
                        ))
                    )))
            ))
        );

const StickerFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('ImageSticker', obj(
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('image', 'image', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('uuid', 'uuid', args(), notNull(scalar('String')))
                    ))),
                field('pack', 'pack', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('title', 'title', args(), notNull(scalar('String')))
                    )))
            ))
        );

const UserTinySelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('firstName', 'firstName', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('isYou', 'isYou', args(), notNull(scalar('Boolean'))),
            field('lastName', 'lastName', args(), scalar('String')),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('primaryOrganization', 'primaryOrganization', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Organization', OrganizationShortSelector)
                )),
            field('shortname', 'shortname', args(), scalar('String'))
        );

const FullMessageSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('date', 'date', args(), notNull(scalar('Date'))),
            field('fallback', 'fallback', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('message', 'message', args(), scalar('String')),
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
                        field('chat', 'chat', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                inline('PrivateRoom', obj(
                                    field('id', 'id', args(), notNull(scalar('ID')))
                                )),
                                inline('SharedRoom', obj(
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
                field('attachments', 'attachments', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('fallback', 'fallback', args(), notNull(scalar('String'))),
                        inline('MessageAttachmentFile', obj(
                            field('fileId', 'fileId', args(), notNull(scalar('String'))),
                            field('fileMetadata', 'fileMetadata', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('imageFormat', 'imageFormat', args(), scalar('String')),
                                    field('imageHeight', 'imageHeight', args(), scalar('Int')),
                                    field('imageWidth', 'imageWidth', args(), scalar('Int')),
                                    field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                    field('mimeType', 'mimeType', args(), scalar('String')),
                                    field('name', 'name', args(), notNull(scalar('String'))),
                                    field('size', 'size', args(), notNull(scalar('Int')))
                                ))),
                            field('filePreview', 'filePreview', args(), scalar('String')),
                            field('id', 'id', args(), notNull(scalar('ID')))
                        )),
                        inline('MessageRichAttachment', obj(
                            field('fallback', 'fallback', args(), notNull(scalar('String'))),
                            field('icon', 'icon', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('metadata', 'metadata', args(), obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('imageFormat', 'imageFormat', args(), scalar('String')),
                                            field('imageHeight', 'imageHeight', args(), scalar('Int')),
                                            field('imageWidth', 'imageWidth', args(), scalar('Int')),
                                            field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                            field('mimeType', 'mimeType', args(), scalar('String')),
                                            field('name', 'name', args(), notNull(scalar('String'))),
                                            field('size', 'size', args(), notNull(scalar('Int')))
                                        )),
                                    field('url', 'url', args(), notNull(scalar('String')))
                                )),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('image', 'image', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('metadata', 'metadata', args(), obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('imageFormat', 'imageFormat', args(), scalar('String')),
                                            field('imageHeight', 'imageHeight', args(), scalar('Int')),
                                            field('imageWidth', 'imageWidth', args(), scalar('Int')),
                                            field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                            field('mimeType', 'mimeType', args(), scalar('String')),
                                            field('name', 'name', args(), notNull(scalar('String'))),
                                            field('size', 'size', args(), notNull(scalar('Int')))
                                        )),
                                    field('url', 'url', args(), notNull(scalar('String')))
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
                                            field('style', 'style', args(), notNull(scalar('String'))),
                                            field('title', 'title', args(), notNull(scalar('String'))),
                                            field('url', 'url', args(), scalar('String'))
                                        ))))))
                                )),
                            field('socialImage', 'socialImage', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('metadata', 'metadata', args(), obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('imageFormat', 'imageFormat', args(), scalar('String')),
                                            field('imageHeight', 'imageHeight', args(), scalar('Int')),
                                            field('imageWidth', 'imageWidth', args(), scalar('Int')),
                                            field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                            field('mimeType', 'mimeType', args(), scalar('String')),
                                            field('name', 'name', args(), notNull(scalar('String'))),
                                            field('size', 'size', args(), notNull(scalar('Int')))
                                        )),
                                    field('url', 'url', args(), notNull(scalar('String')))
                                )),
                            field('subTitle', 'subTitle', args(), scalar('String')),
                            field('text', 'text', args(), scalar('String')),
                            field('title', 'title', args(), scalar('String')),
                            field('titleLink', 'titleLink', args(), scalar('String')),
                            field('titleLinkHostname', 'titleLinkHostname', args(), scalar('String'))
                        ))
                    ))))),
                field('commentsCount', 'commentsCount', args(), notNull(scalar('Int'))),
                field('edited', 'edited', args(), notNull(scalar('Boolean'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('overrideAvatar', 'overrideAvatar', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('crop', 'crop', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('h', 'h', args(), notNull(scalar('Int'))),
                                field('w', 'w', args(), notNull(scalar('Int'))),
                                field('x', 'x', args(), notNull(scalar('Int'))),
                                field('y', 'y', args(), notNull(scalar('Int')))
                            )),
                        field('uuid', 'uuid', args(), notNull(scalar('String')))
                    )),
                field('overrideName', 'overrideName', args(), scalar('String')),
                field('quotedMessages', 'quotedMessages', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', QuotedMessageSelector)
                    ))))),
                field('reactions', 'reactions', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('reaction', 'reaction', args(), notNull(scalar('String'))),
                        field('user', 'user', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserShortSelector)
                            )))
                    )))))
            )),
            inline('StickerMessage', obj(
                field('commentsCount', 'commentsCount', args(), notNull(scalar('Int'))),
                field('date', 'date', args(), notNull(scalar('Date'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('overrideAvatar', 'overrideAvatar', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('crop', 'crop', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('h', 'h', args(), notNull(scalar('Int'))),
                                field('w', 'w', args(), notNull(scalar('Int'))),
                                field('x', 'x', args(), notNull(scalar('Int'))),
                                field('y', 'y', args(), notNull(scalar('Int')))
                            )),
                        field('uuid', 'uuid', args(), notNull(scalar('String')))
                    )),
                field('overrideName', 'overrideName', args(), scalar('String')),
                field('quotedMessages', 'quotedMessages', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', QuotedMessageSelector)
                    ))))),
                field('reactions', 'reactions', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('reaction', 'reaction', args(), notNull(scalar('String'))),
                        field('user', 'user', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserShortSelector)
                            )))
                    ))))),
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
                            field('chat', 'chat', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    inline('PrivateRoom', obj(
                                        field('id', 'id', args(), notNull(scalar('ID')))
                                    )),
                                    inline('SharedRoom', obj(
                                        field('id', 'id', args(), notNull(scalar('ID')))
                                    ))
                                )))
                        ))
                    )),
                field('sticker', 'sticker', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Sticker', StickerFragmentSelector)
                    )))
            )),
            inline('ServiceMessage', obj(
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('overrideAvatar', 'overrideAvatar', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('crop', 'crop', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('h', 'h', args(), notNull(scalar('Int'))),
                                field('w', 'w', args(), notNull(scalar('Int'))),
                                field('x', 'x', args(), notNull(scalar('Int'))),
                                field('y', 'y', args(), notNull(scalar('Int')))
                            )),
                        field('uuid', 'uuid', args(), notNull(scalar('String')))
                    )),
                field('overrideName', 'overrideName', args(), scalar('String')),
                field('serviceMetadata', 'serviceMetadata', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        inline('InviteServiceMetadata', obj(
                            field('invitedBy', 'invitedBy', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('User', UserTinySelector)
                                ))),
                            field('users', 'users', args(), list(notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('User', UserTinySelector)
                                ))))
                        )),
                        inline('KickServiceMetadata', obj(
                            field('kickedBy', 'kickedBy', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('User', UserTinySelector)
                                ))),
                            field('user', 'user', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('User', UserTinySelector)
                                )))
                        )),
                        inline('TitleChangeServiceMetadata', obj(
                            field('title', 'title', args(), notNull(scalar('String')))
                        )),
                        inline('PhotoChangeServiceMetadata', obj(
                            field('photo', 'photo', args(), scalar('String'))
                        )),
                        inline('PostRespondServiceMetadata', obj(
                            field('respondType', 'respondType', args(), notNull(scalar('ID')))
                        ))
                    ))
            ))
        );

const MatchmakingProfileFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('answers', 'answers', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('TextMatchmakingAnswer', obj(
                        field('answer', 'answer', args(), notNull(scalar('String'))),
                        field('question', 'question', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('subtitle', 'subtitle', args(), notNull(scalar('String'))),
                                field('title', 'title', args(), notNull(scalar('String')))
                            )))
                    )),
                    inline('MultiselectMatchmakingAnswer', obj(
                        field('question', 'question', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('subtitle', 'subtitle', args(), notNull(scalar('String'))),
                                field('title', 'title', args(), notNull(scalar('String')))
                            ))),
                        field('tags', 'tags', args(), notNull(list(notNull(scalar('String')))))
                    ))
                ))))),
            field('chatCreated', 'chatCreated', args(), notNull(scalar('Boolean'))),
            field('user', 'user', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('isBot', 'isBot', args(), notNull(scalar('Boolean'))),
                    field('isYou', 'isYou', args(), notNull(scalar('Boolean'))),
                    field('name', 'name', args(), notNull(scalar('String'))),
                    field('photo', 'photo', args(), scalar('String')),
                    field('primaryOrganization', 'primaryOrganization', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('name', 'name', args(), notNull(scalar('String')))
                        ))
                )))
        );

const MatchmakingRoomFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('enabled', 'enabled', args(), notNull(scalar('Boolean'))),
            field('myProfile', 'myProfile', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('MatchmakingProfile', MatchmakingProfileFragmentSelector)
                )),
            field('profiles', 'profiles', args(), list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('MatchmakingProfile', MatchmakingProfileFragmentSelector)
                )))),
            field('questions', 'questions', args(), list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('TextMatchmakingQuestion', obj(
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('subtitle', 'subtitle', args(), notNull(scalar('String'))),
                        field('title', 'title', args(), notNull(scalar('String')))
                    )),
                    inline('MultiselectMatchmakingQuestion', obj(
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('subtitle', 'subtitle', args(), notNull(scalar('String'))),
                        field('tags', 'tags', args(), notNull(list(notNull(scalar('String'))))),
                        field('title', 'title', args(), notNull(scalar('String')))
                    ))
                ))))
        );

const RoomShortSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('PrivateRoom', obj(
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('myBadge', 'myBadge', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('UserBadge', UserBadgeSelector)
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
                field('user', 'user', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('User', UserShortSelector)
                    )))
            )),
            inline('SharedRoom', obj(
                field('canEdit', 'canEdit', args(), notNull(scalar('Boolean'))),
                field('canSendMessage', 'canSendMessage', args(), notNull(scalar('Boolean'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                field('kind', 'kind', args(), notNull(scalar('String'))),
                field('matchmaking', 'matchmaking', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('MatchmakingRoom', MatchmakingRoomFragmentSelector)
                    )),
                field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                field('membership', 'membership', args(), notNull(scalar('String'))),
                field('myBadge', 'myBadge', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('UserBadge', UserBadgeSelector)
                    )),
                field('organization', 'organization', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Organization', OrganizationShortSelector)
                    )),
                field('photo', 'photo', args(), notNull(scalar('String'))),
                field('pinnedMessage', 'pinnedMessage', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', FullMessageSelector)
                    )),
                field('role', 'role', args(), notNull(scalar('String'))),
                field('settings', 'settings', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('mute', 'mute', args(), scalar('Boolean'))
                    ))),
                field('title', 'title', args(), notNull(scalar('String')))
            ))
        );

const ChatUpdateFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('ChatMessageReceived', obj(
                field('message', 'message', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', FullMessageSelector)
                    ))),
                field('repeatKey', 'repeatKey', args(), scalar('String'))
            )),
            inline('ChatMessageUpdated', obj(
                field('message', 'message', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', FullMessageSelector)
                    )))
            )),
            inline('ChatMessageDeleted', obj(
                field('message', 'message', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )))
            )),
            inline('ChatUpdated', obj(
                field('chat', 'chat', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Room', RoomShortSelector)
                    )))
            )),
            inline('ChatLostAccess', obj(
                field('lostAccess', 'lostAccess', args(), notNull(scalar('Boolean')))
            ))
        );

const CommentEntryFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('betaComment', 'comment', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    fragment('ModernMessage', FullMessageSelector)
                ))),
            field('childComments', 'childComments', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                ))))),
            field('deleted', 'deleted', args(), notNull(scalar('Boolean'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('parentComment', 'parentComment', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('betaComment', 'comment', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('message', 'message', args(), scalar('String'))
                        ))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                ))
        );

const CommentUpdateFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('CommentReceived', obj(
                field('comment', 'comment', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('CommentEntry', CommentEntryFragmentSelector)
                    )))
            )),
            inline('CommentUpdated', obj(
                field('comment', 'comment', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('CommentEntry', CommentEntryFragmentSelector)
                    )))
            ))
        );

const CommunitySearchSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('about', 'about', args(), scalar('String')),
            field('alphaFeatured', 'featured', args(), notNull(scalar('Boolean'))),
            field('betaPublicRooms', 'betaPublicRooms', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                ))))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('isMine', 'isMine', args(), notNull(scalar('Boolean'))),
            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('status', 'status', args(), notNull(scalar('String'))),
            field('superAccountId', 'superAccountId', args(), notNull(scalar('ID')))
        );

const ConferenceFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('iceServers', 'iceServers', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('credential', 'credential', args(), scalar('String')),
                    field('urls', 'urls', args(), notNull(list(notNull(scalar('String'))))),
                    field('username', 'username', args(), scalar('String'))
                ))))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('peers', 'peers', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('connection', 'connection', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('ice', 'ice', args(), notNull(list(notNull(scalar('String'))))),
                            field('sdp', 'sdp', args(), scalar('String')),
                            field('state', 'state', args(), notNull(scalar('String')))
                        )),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        )))
                ))))),
            field('startTime', 'startTime', args(), scalar('Date'))
        );

const ConferenceShortSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('iceServers', 'iceServers', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('credential', 'credential', args(), scalar('String')),
                    field('urls', 'urls', args(), notNull(list(notNull(scalar('String'))))),
                    field('username', 'username', args(), scalar('String'))
                ))))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('startTime', 'startTime', args(), scalar('Date'))
        );

const DaialogListMessageSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('date', 'date', args(), notNull(scalar('Date'))),
            field('fallback', 'fallback', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('message', 'message', args(), scalar('String')),
            field('sender', 'sender', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('firstName', 'firstName', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('name', 'name', args(), notNull(scalar('String')))
                ))),
            field('senderBadge', 'senderBadge', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('UserBadge', UserBadgeSelector)
                )),
            inline('GeneralMessage', obj(
                field('attachments', 'attachments', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('fallback', 'fallback', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        inline('MessageAttachmentFile', obj(
                            field('fileId', 'fileId', args(), notNull(scalar('String'))),
                            field('fileMetadata', 'fileMetadata', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('imageFormat', 'imageFormat', args(), scalar('String')),
                                    field('isImage', 'isImage', args(), notNull(scalar('Boolean')))
                                ))),
                            field('id', 'id', args(), notNull(scalar('ID')))
                        ))
                    ))))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('overrideAvatar', 'overrideAvatar', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('crop', 'crop', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('h', 'h', args(), notNull(scalar('Int'))),
                                field('w', 'w', args(), notNull(scalar('Int'))),
                                field('x', 'x', args(), notNull(scalar('Int'))),
                                field('y', 'y', args(), notNull(scalar('Int')))
                            )),
                        field('uuid', 'uuid', args(), notNull(scalar('String')))
                    )),
                field('overrideName', 'overrideName', args(), scalar('String')),
                field('quotedMessages', 'quotedMessages', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )))))
            ))
        );

const TinyMessageSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('date', 'date', args(), notNull(scalar('Date'))),
            field('fallback', 'fallback', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('message', 'message', args(), scalar('String')),
            field('sender', 'sender', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('User', UserTinySelector)
                ))),
            field('senderBadge', 'senderBadge', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('UserBadge', UserBadgeSelector)
                )),
            inline('GeneralMessage', obj(
                field('attachments', 'attachments', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('fallback', 'fallback', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        inline('MessageAttachmentFile', obj(
                            field('fileId', 'fileId', args(), notNull(scalar('String'))),
                            field('fileMetadata', 'fileMetadata', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('imageFormat', 'imageFormat', args(), scalar('String')),
                                    field('isImage', 'isImage', args(), notNull(scalar('Boolean')))
                                ))),
                            field('filePreview', 'filePreview', args(), scalar('String')),
                            field('id', 'id', args(), notNull(scalar('ID')))
                        ))
                    ))))),
                field('commentsCount', 'commentsCount', args(), notNull(scalar('Int'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('isMentioned', 'isMentioned', args(), notNull(scalar('Boolean'))),
                field('overrideAvatar', 'overrideAvatar', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('crop', 'crop', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('h', 'h', args(), notNull(scalar('Int'))),
                                field('w', 'w', args(), notNull(scalar('Int'))),
                                field('x', 'x', args(), notNull(scalar('Int'))),
                                field('y', 'y', args(), notNull(scalar('Int')))
                            )),
                        field('uuid', 'uuid', args(), notNull(scalar('String')))
                    )),
                field('overrideName', 'overrideName', args(), scalar('String')),
                field('quotedMessages', 'quotedMessages', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )))))
            ))
        );

const DialogUpdateFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('DialogMessageReceived', obj(
                field('alphaMessage', 'message', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', TinyMessageSelector)
                    ))),
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('globalUnread', 'globalUnread', args(), notNull(scalar('Int'))),
                field('haveMention', 'haveMention', args(), notNull(scalar('Boolean'))),
                field('showNotification', 'showNotification', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('desktop', 'desktop', args(), notNull(scalar('Boolean'))),
                        field('mobile', 'mobile', args(), notNull(scalar('Boolean')))
                    ))),
                field('silent', 'silent', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('desktop', 'desktop', args(), notNull(scalar('Boolean'))),
                        field('mobile', 'mobile', args(), notNull(scalar('Boolean')))
                    ))),
                field('unread', 'unread', args(), notNull(scalar('Int')))
            )),
            inline('DialogMessageUpdated', obj(
                field('alphaMessage', 'message', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', TinyMessageSelector)
                    ))),
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('haveMention', 'haveMention', args(), notNull(scalar('Boolean')))
            )),
            inline('DialogMessageDeleted', obj(
                field('alphaMessage', 'message', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', TinyMessageSelector)
                    ))),
                field('alphaPrevMessage', 'prevMessage', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', TinyMessageSelector)
                    )),
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('globalUnread', 'globalUnread', args(), notNull(scalar('Int'))),
                field('haveMention', 'haveMention', args(), notNull(scalar('Boolean'))),
                field('unread', 'unread', args(), notNull(scalar('Int')))
            )),
            inline('DialogMessageRead', obj(
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('globalUnread', 'globalUnread', args(), notNull(scalar('Int'))),
                field('haveMention', 'haveMention', args(), notNull(scalar('Boolean'))),
                field('mid', 'mid', args(), scalar('ID')),
                field('unread', 'unread', args(), notNull(scalar('Int')))
            )),
            inline('DialogMuteChanged', obj(
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('mute', 'mute', args(), notNull(scalar('Boolean')))
            )),
            inline('DialogPeerUpdated', obj(
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('peer', 'peer', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        inline('PrivateRoom', obj(
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('user', 'user', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('name', 'name', args(), notNull(scalar('String'))),
                                    field('photo', 'photo', args(), scalar('String'))
                                )))
                        )),
                        inline('SharedRoom', obj(
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('photo', 'photo', args(), notNull(scalar('String'))),
                            field('title', 'title', args(), notNull(scalar('String')))
                        ))
                    )))
            )),
            inline('DialogDeleted', obj(
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('globalUnread', 'globalUnread', args(), notNull(scalar('Int')))
            )),
            inline('DialogBump', obj(
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('globalUnread', 'globalUnread', args(), notNull(scalar('Int'))),
                field('haveMention', 'haveMention', args(), notNull(scalar('Boolean'))),
                field('topMessage', 'topMessage', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', TinyMessageSelector)
                    )),
                field('unread', 'unread', args(), notNull(scalar('Int')))
            ))
        );

const FeedChannelFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('about', 'about', args(), scalar('String')),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('isGlobal', 'isGlobal', args(), notNull(scalar('Boolean'))),
            field('myRole', 'myRole', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('postsCount', 'postsCount', args(), notNull(scalar('Int'))),
            field('shortname', 'shortname', args(), scalar('String')),
            field('socialImage', 'socialImage', args(), scalar('String')),
            field('subscribed', 'subscribed', args(), notNull(scalar('Boolean'))),
            field('subscribersCount', 'subscribersCount', args(), notNull(scalar('Int'))),
            field('title', 'title', args(), notNull(scalar('String')))
        );

const FeedPostAuthorFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('User', obj(
                fragment('User', UserShortSelector)
            ))
        );

const SlideFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('TextSlide', obj(
                field('attachments', 'attachments', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        inline('User', obj(
                            fragment('User', UserShortSelector)
                        )),
                        inline('SharedRoom', obj(
                            field('canSendMessage', 'canSendMessage', args(), notNull(scalar('Boolean'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('kind', 'kind', args(), notNull(scalar('String'))),
                            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                            field('membership', 'membership', args(), notNull(scalar('String'))),
                            field('organization', 'organization', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('name', 'name', args(), notNull(scalar('String'))),
                                    field('photo', 'photo', args(), scalar('String'))
                                )),
                            field('photo', 'roomPhoto', args(), notNull(scalar('String'))),
                            field('title', 'title', args(), notNull(scalar('String')))
                        )),
                        inline('Organization', obj(
                            fragment('Organization', OrganizationShortSelector)
                        ))
                    ))))),
                field('cover', 'cover', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('metadata', 'metadata', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('imageFormat', 'imageFormat', args(), scalar('String')),
                                field('imageHeight', 'imageHeight', args(), scalar('Int')),
                                field('imageWidth', 'imageWidth', args(), scalar('Int')),
                                field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                field('mimeType', 'mimeType', args(), scalar('String')),
                                field('name', 'name', args(), notNull(scalar('String'))),
                                field('size', 'size', args(), notNull(scalar('Int')))
                            )),
                        field('url', 'url', args(), notNull(scalar('String')))
                    )),
                field('coverAlign', 'coverAlign', args(), scalar('String')),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('spans', 'spans', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('MessageSpan', SpanFragmentSelector)
                    ))))),
                field('text', 'text', args(), notNull(scalar('String')))
            ))
        );

const FeedPostSourceFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('FeedChannel', obj(
                fragment('FeedChannel', FeedChannelFullSelector)
            ))
        );

const FeedItemFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('FeedPost', obj(
                field('author', 'author', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('FeedPostAuthor', FeedPostAuthorFragmentSelector)
                    ))),
                field('canEdit', 'canEdit', args(), notNull(scalar('Boolean'))),
                field('commentsCount', 'commentsCount', args(), notNull(scalar('Int'))),
                field('date', 'date', args(), notNull(scalar('Date'))),
                field('edited', 'edited', args(), notNull(scalar('Boolean'))),
                field('fallback', 'fallback', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('message', 'message', args(), scalar('String')),
                field('reactions', 'reactions', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('reaction', 'reaction', args(), notNull(scalar('String'))),
                        field('user', 'user', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserShortSelector)
                            )))
                    ))))),
                field('slides', 'slides', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Slide', SlideFragmentSelector)
                    ))))),
                field('source', 'source', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('FeedPostSource', FeedPostSourceFragmentSelector)
                    ))
            ))
        );

const FeedUpdateFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('FeedItemReceived', obj(
                field('item', 'item', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('FeedItem', FeedItemFullSelector)
                    )))
            )),
            inline('FeedItemUpdated', obj(
                field('item', 'item', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('FeedItem', FeedItemFullSelector)
                    )))
            )),
            inline('FeedItemDeleted', obj(
                field('item', 'item', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('FeedItem', FeedItemFullSelector)
                    )))
            )),
            inline('FeedRebuildNeeded', obj(
                field('homeFeed', 'feed', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('cursor', 'cursor', args(), scalar('String')),
                        field('items', 'items', args(), notNull(list(notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('FeedItem', FeedItemFullSelector)
                            )))))
                    )))
            ))
        );

const NotificationFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('content', 'content', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('NewCommentNotification', obj(
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
                                            field('chat', 'chat', args(), notNull(obj(
                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                    fragment('Room', RoomNanoSelector)
                                                ))),
                                            field('message', 'message', args(), notNull(obj(
                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                    inline('GeneralMessage', obj(
                                                        field('fallback', 'fallback', args(), notNull(scalar('String'))),
                                                        field('id', 'id', args(), notNull(scalar('ID'))),
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
                                                )))
                                        )),
                                        inline('CommentPeerRootFeedItem', obj(
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
                        field('profiles', 'profiles', args(), notNull(list(notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('MatchmakingProfile', MatchmakingProfileFragmentSelector)
                            ))))),
                        field('room', 'room', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('peer', 'peer', args(), notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        inline('SharedRoom', obj(
                                            fragment('Room', RoomNanoSelector)
                                        ))
                                    )))
                            )))
                    ))
                ))))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('text', 'text', args(), scalar('String'))
        );

const NotificationCenterUpdateFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('NotificationReceived', obj(
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
                field('center', 'center', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('unread', 'unread', args(), notNull(scalar('Int')))
                    )))
            )),
            inline('NotificationContentUpdated', obj(
                field('content', 'content', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        inline('UpdatedNotificationContentComment', obj(
                            field('comment', 'comment', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('CommentEntry', CommentEntryFragmentSelector)
                                )),
                            field('peer', 'peer', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('peerRoot', 'peerRoot', args(), notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            inline('CommentPeerRootMessage', obj(
                                                field('chat', 'chat', args(), notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        fragment('Room', RoomNanoSelector)
                                                    ))),
                                                field('message', 'message', args(), notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        inline('GeneralMessage', obj(
                                                            field('fallback', 'fallback', args(), notNull(scalar('String'))),
                                                            field('id', 'id', args(), notNull(scalar('ID'))),
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
                                                    )))
                                            )),
                                            inline('CommentPeerRootFeedItem', obj(
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
                        ))
                    )))
            ))
        );

const UserFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('about', 'about', args(), scalar('String')),
            field('audienceSize', 'audienceSize', args(), notNull(scalar('Int'))),
            field('email', 'email', args(), scalar('String')),
            field('facebook', 'facebook', args(), scalar('String')),
            field('firstName', 'firstName', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('instagram', 'instagram', args(), scalar('String')),
            field('isBot', 'isBot', args(), notNull(scalar('Boolean'))),
            field('isYou', 'isYou', args(), notNull(scalar('Boolean'))),
            field('lastName', 'lastName', args(), scalar('String')),
            field('lastSeen', 'lastSeen', args(), scalar('String')),
            field('linkedin', 'linkedin', args(), scalar('String')),
            field('location', 'location', args(), scalar('String')),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('online', 'online', args(), notNull(scalar('Boolean'))),
            field('phone', 'phone', args(), scalar('String')),
            field('photo', 'photo', args(), scalar('String')),
            field('primaryOrganization', 'primaryOrganization', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Organization', OrganizationShortSelector)
                )),
            field('shortname', 'shortname', args(), scalar('String')),
            field('twitter', 'twitter', args(), scalar('String')),
            field('website', 'website', args(), scalar('String'))
        );

const OrganizationFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('about', 'about', args(), scalar('String')),
            field('alphaFeatured', 'featured', args(), notNull(scalar('Boolean'))),
            field('alphaIsCommunity', 'isCommunity', args(), notNull(scalar('Boolean'))),
            field('alphaIsPrivate', 'isPrivate', args(), notNull(scalar('Boolean'))),
            field('alphaOrganizationMemberRequests', 'requests', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('role', 'role', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserFullSelector)
                        )))
                ))))),
            field('alphaOrganizationMembers', 'members', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('role', 'role', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserFullSelector)
                        )))
                ))))),
            field('betaIsAdmin', 'isAdmin', args(), notNull(scalar('Boolean'))),
            field('betaIsOwner', 'isOwner', args(), notNull(scalar('Boolean'))),
            field('betaPublicRooms', 'rooms', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', RoomShortSelector)
                ))))),
            field('facebook', 'facebook', args(), scalar('String')),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('instagram', 'instagram', args(), scalar('String')),
            field('isMine', 'isMine', args(), notNull(scalar('Boolean'))),
            field('linkedin', 'linkedin', args(), scalar('String')),
            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('shortname', 'shortname', args(), scalar('String')),
            field('superAccountId', 'superAccountId', args(), notNull(scalar('ID'))),
            field('twitter', 'twitter', args(), scalar('String')),
            field('website', 'website', args(), scalar('String'))
        );

const OrganizationMediumSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('about', 'about', args(), scalar('String')),
            field('alphaIsCommunity', 'isCommunity', args(), notNull(scalar('Boolean'))),
            field('betaIsAdmin', 'isAdmin', args(), notNull(scalar('Boolean'))),
            field('betaIsOwner', 'isOwner', args(), notNull(scalar('Boolean'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('isMine', 'isMine', args(), notNull(scalar('Boolean'))),
            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('shortname', 'shortname', args(), scalar('String'))
        );

const OrganizationProfileFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('about', 'about', args(), scalar('String')),
            field('alphaEditorial', 'editorial', args(), notNull(scalar('Boolean'))),
            field('alphaFeatured', 'featured', args(), notNull(scalar('Boolean'))),
            field('alphaIsPrivate', 'private', args(), notNull(scalar('Boolean'))),
            field('alphaPublished', 'published', args(), notNull(scalar('Boolean'))),
            field('facebook', 'facebook', args(), scalar('String')),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('instagram', 'instagram', args(), scalar('String')),
            field('linkedin', 'linkedin', args(), scalar('String')),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photoRef', 'photoRef', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('crop', 'crop', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('h', 'h', args(), notNull(scalar('Int'))),
                            field('w', 'w', args(), notNull(scalar('Int'))),
                            field('x', 'x', args(), notNull(scalar('Int'))),
                            field('y', 'y', args(), notNull(scalar('Int')))
                        )),
                    field('uuid', 'uuid', args(), notNull(scalar('String')))
                )),
            field('shortname', 'shortname', args(), scalar('String')),
            field('twitter', 'twitter', args(), scalar('String')),
            field('website', 'website', args(), scalar('String')),
            field('websiteTitle', 'websiteTitle', args(), scalar('String'))
        );

const OrganizationSearchSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('about', 'about', args(), scalar('String')),
            field('alphaFeatured', 'featured', args(), notNull(scalar('Boolean'))),
            field('alphaOrganizationMembers', 'members', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('name', 'name', args(), notNull(scalar('String'))),
                            field('photo', 'photo', args(), scalar('String'))
                        )))
                ))))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('isMine', 'isMine', args(), notNull(scalar('Boolean'))),
            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('status', 'status', args(), notNull(scalar('String'))),
            field('superAccountId', 'superAccountId', args(), notNull(scalar('ID')))
        );

const OrganizationWithoutMembersFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('about', 'about', args(), scalar('String')),
            field('alphaFeatured', 'featured', args(), notNull(scalar('Boolean'))),
            field('alphaIsCommunity', 'isCommunity', args(), notNull(scalar('Boolean'))),
            field('alphaIsPrivate', 'isPrivate', args(), notNull(scalar('Boolean'))),
            field('alphaOrganizationMemberRequests', 'requests', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('role', 'role', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserFullSelector)
                        )))
                ))))),
            field('betaIsAdmin', 'isAdmin', args(), notNull(scalar('Boolean'))),
            field('betaIsOwner', 'isOwner', args(), notNull(scalar('Boolean'))),
            field('betaPublicRooms', 'rooms', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', RoomShortSelector)
                ))))),
            field('facebook', 'facebook', args(), scalar('String')),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('instagram', 'instagram', args(), scalar('String')),
            field('isMine', 'isMine', args(), notNull(scalar('Boolean'))),
            field('linkedin', 'linkedin', args(), scalar('String')),
            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('shortname', 'shortname', args(), scalar('String')),
            field('superAccountId', 'superAccountId', args(), notNull(scalar('ID'))),
            field('twitter', 'twitter', args(), scalar('String')),
            field('website', 'website', args(), scalar('String'))
        );

const PlatformNotificationSettingsFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('comments', 'comments', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('showNotification', 'showNotification', args(), notNull(scalar('Boolean'))),
                    field('sound', 'sound', args(), notNull(scalar('Boolean')))
                ))),
            field('communityChat', 'communityChat', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('showNotification', 'showNotification', args(), notNull(scalar('Boolean'))),
                    field('sound', 'sound', args(), notNull(scalar('Boolean')))
                ))),
            field('direct', 'direct', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('showNotification', 'showNotification', args(), notNull(scalar('Boolean'))),
                    field('sound', 'sound', args(), notNull(scalar('Boolean')))
                ))),
            field('notificationPreview', 'notificationPreview', args(), notNull(scalar('String'))),
            field('organizationChat', 'organizationChat', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('showNotification', 'showNotification', args(), notNull(scalar('Boolean'))),
                    field('sound', 'sound', args(), notNull(scalar('Boolean')))
                ))),
            field('secretChat', 'secretChat', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('showNotification', 'showNotification', args(), notNull(scalar('Boolean'))),
                    field('sound', 'sound', args(), notNull(scalar('Boolean')))
                )))
        );

const RoomFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('PrivateRoom', obj(
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('myBadge', 'myBadge', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('UserBadge', UserBadgeSelector)
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
                field('user', 'user', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('User', UserShortSelector)
                    )))
            )),
            inline('SharedRoom', obj(
                field('canEdit', 'canEdit', args(), notNull(scalar('Boolean'))),
                field('canSendMessage', 'canSendMessage', args(), notNull(scalar('Boolean'))),
                field('description', 'description', args(), scalar('String')),
                field('featuredMembersCount', 'featuredMembersCount', args(), notNull(scalar('Int'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                field('kind', 'kind', args(), notNull(scalar('String'))),
                field('matchmaking', 'matchmaking', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('MatchmakingRoom', MatchmakingRoomFragmentSelector)
                    )),
                field('members', 'members', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('badge', 'badge', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('UserBadge', UserBadgeSelector)
                            )),
                        field('canKick', 'canKick', args(), notNull(scalar('Boolean'))),
                        field('membership', 'membership', args(), notNull(scalar('String'))),
                        field('role', 'role', args(), notNull(scalar('String'))),
                        field('user', 'user', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserShortSelector)
                            )))
                    ))))),
                field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                field('membership', 'membership', args(), notNull(scalar('String'))),
                field('myBadge', 'myBadge', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('UserBadge', UserBadgeSelector)
                    )),
                field('organization', 'organization', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Organization', OrganizationMediumSelector)
                    )),
                field('photo', 'photo', args(), notNull(scalar('String'))),
                field('pinnedMessage', 'pinnedMessage', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', FullMessageSelector)
                    )),
                field('requests', 'requests', args(), list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('user', 'user', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserShortSelector)
                            )))
                    )))),
                field('role', 'role', args(), notNull(scalar('String'))),
                field('settings', 'settings', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('mute', 'mute', args(), scalar('Boolean'))
                    ))),
                field('socialImage', 'socialImage', args(), scalar('String')),
                field('title', 'title', args(), notNull(scalar('String'))),
                field('welcomeMessage', 'welcomeMessage', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('isOn', 'isOn', args(), notNull(scalar('Boolean'))),
                        field('message', 'message', args(), scalar('String')),
                        field('sender', 'sender', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('name', 'name', args(), notNull(scalar('String')))
                            ))
                    ))
            ))
        );

const RoomFullWithoutMembersSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('PrivateRoom', obj(
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('myBadge', 'myBadge', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('UserBadge', UserBadgeSelector)
                    )),
                field('settings', 'settings', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('mute', 'mute', args(), scalar('Boolean'))
                    ))),
                field('user', 'user', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('User', UserShortSelector)
                    )))
            )),
            inline('SharedRoom', obj(
                field('canEdit', 'canEdit', args(), notNull(scalar('Boolean'))),
                field('canSendMessage', 'canSendMessage', args(), notNull(scalar('Boolean'))),
                field('description', 'description', args(), scalar('String')),
                field('featuredMembersCount', 'featuredMembersCount', args(), notNull(scalar('Int'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                field('kind', 'kind', args(), notNull(scalar('String'))),
                field('matchmaking', 'matchmaking', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('MatchmakingRoom', MatchmakingRoomFragmentSelector)
                    )),
                field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                field('membership', 'membership', args(), notNull(scalar('String'))),
                field('myBadge', 'myBadge', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('UserBadge', UserBadgeSelector)
                    )),
                field('organization', 'organization', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Organization', OrganizationMediumSelector)
                    )),
                field('photo', 'photo', args(), notNull(scalar('String'))),
                field('pinnedMessage', 'pinnedMessage', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', FullMessageSelector)
                    )),
                field('role', 'role', args(), notNull(scalar('String'))),
                field('settings', 'settings', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('mute', 'mute', args(), scalar('Boolean'))
                    ))),
                field('socialImage', 'socialImage', args(), scalar('String')),
                field('title', 'title', args(), notNull(scalar('String'))),
                field('welcomeMessage', 'welcomeMessage', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('isOn', 'isOn', args(), notNull(scalar('Boolean'))),
                        field('message', 'message', args(), scalar('String')),
                        field('sender', 'sender', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('name', 'name', args(), notNull(scalar('String')))
                            ))
                    ))
            ))
        );

const SessionStateFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('isAccountActivated', 'isAccountActivated', args(), notNull(scalar('Boolean'))),
            field('isAccountExists', 'isAccountExists', args(), notNull(scalar('Boolean'))),
            field('isAccountPicked', 'isAccountPicked', args(), notNull(scalar('Boolean'))),
            field('isBlocked', 'isBlocked', args(), notNull(scalar('Boolean'))),
            field('isCompleted', 'isCompleted', args(), notNull(scalar('Boolean'))),
            field('isLoggedIn', 'isLoggedIn', args(), notNull(scalar('Boolean'))),
            field('isProfileCreated', 'isProfileCreated', args(), notNull(scalar('Boolean')))
        );

const SettingsFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('countUnreadChats', 'countUnreadChats', args(), notNull(scalar('Boolean'))),
            field('desktop', 'desktop', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('PlatformNotificationSettings', PlatformNotificationSettingsFullSelector)
                ))),
            field('emailFrequency', 'emailFrequency', args(), notNull(scalar('String'))),
            field('excludeMutedChats', 'excludeMutedChats', args(), notNull(scalar('Boolean'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('mobile', 'mobile', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('PlatformNotificationSettings', PlatformNotificationSettingsFullSelector)
                ))),
            field('primaryEmail', 'primaryEmail', args(), notNull(scalar('String')))
        );

const StickerPackFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('stickers', 'stickers', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Sticker', StickerFragmentSelector)
                ))))),
            field('title', 'title', args(), notNull(scalar('String')))
        );

const AccountSelector = obj(
            field('me', 'me', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('User', UserShortSelector)
                )),
            field('myPermissions', 'myPermissions', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('roles', 'roles', args(), notNull(list(notNull(scalar('String')))))
                ))),
            field('sessionState', 'sessionState', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('SessionState', SessionStateFullSelector)
                )))
        );
const AccountAppInviteSelector = obj(
            field('appInvite', 'invite', args(), notNull(scalar('String')))
        );
const AccountAppInviteInfoSelector = obj(
            field('alphaInviteInfo', 'invite', args(fieldValue("key", refValue('inviteKey'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('creator', 'creator', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        )),
                    field('id', 'id', args(), notNull(scalar('ID')))
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
                    field('creator', 'creator', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        )),
                    field('forEmail', 'forEmail', args(), scalar('String')),
                    field('forName', 'forName', args(), scalar('String')),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('joined', 'joined', args(), notNull(scalar('Boolean'))),
                    field('key', 'key', args(), notNull(scalar('String'))),
                    field('membersCount', 'membersCount', args(), scalar('Int')),
                    field('orgId', 'orgId', args(), notNull(scalar('ID'))),
                    field('organization', 'organization', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('about', 'about', args(), scalar('String')),
                            field('alphaIsCommunity', 'isCommunity', args(), notNull(scalar('Boolean'))),
                            field('id', 'id', args(), notNull(scalar('ID')))
                        )),
                    field('photo', 'photo', args(), scalar('String')),
                    field('title', 'title', args(), notNull(scalar('String')))
                ))
        );
const AccountSettingsSelector = obj(
            field('me', 'me', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('audienceSize', 'audienceSize', args(), notNull(scalar('Int'))),
                    fragment('User', UserShortSelector)
                )),
            field('myOrganizations', 'organizations', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Organization', OrganizationShortSelector)
                )))))
        );
const AvailableRoomsSelector = obj(
            field('alphaComunityPrefixSearch', 'communities', args(fieldValue("first", intValue(3))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('Organization', CommunitySearchSelector)
                                )))
                        )))))
                ))),
            field('betaIsDiscoverDone', 'isDiscoverDone', args(), notNull(scalar('Boolean'))),
            field('betaSuggestedRooms', 'suggestedRooms', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('SharedRoom', obj(
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('kind', 'kind', args(), notNull(scalar('String'))),
                        field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                        field('membership', 'membership', args(), notNull(scalar('String'))),
                        field('organization', 'organization', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('name', 'name', args(), notNull(scalar('String'))),
                                field('photo', 'photo', args(), scalar('String'))
                            )),
                        field('photo', 'photo', args(), notNull(scalar('String'))),
                        field('title', 'title', args(), notNull(scalar('String')))
                    ))
                ))))),
            field('betaUserAvailableRooms', 'availableChats', args(fieldValue("isChannel", boolValue(false)), fieldValue("limit", intValue(3))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('SharedRoom', obj(
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('kind', 'kind', args(), notNull(scalar('String'))),
                        field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                        field('membership', 'membership', args(), notNull(scalar('String'))),
                        field('organization', 'organization', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('name', 'name', args(), notNull(scalar('String'))),
                                field('photo', 'photo', args(), scalar('String'))
                            )),
                        field('photo', 'photo', args(), notNull(scalar('String'))),
                        field('title', 'title', args(), notNull(scalar('String')))
                    ))
                ))))),
            field('betaUserAvailableRooms', 'availableChannels', args(fieldValue("isChannel", boolValue(true)), fieldValue("limit", intValue(3))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('SharedRoom', obj(
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('kind', 'kind', args(), notNull(scalar('String'))),
                        field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                        field('membership', 'membership', args(), notNull(scalar('String'))),
                        field('organization', 'organization', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('name', 'name', args(), notNull(scalar('String'))),
                                field('photo', 'photo', args(), scalar('String'))
                            )),
                        field('photo', 'photo', args(), notNull(scalar('String'))),
                        field('title', 'title', args(), notNull(scalar('String')))
                    ))
                )))))
        );
const ChatInitSelector = obj(
            field('conversationState', 'state', args(fieldValue("id", refValue('chatId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('state', 'state', args(), scalar('String'))
                ))),
            field('lastReadedMessage', 'lastReadedMessage', args(fieldValue("chatId", refValue('chatId'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )),
            field('messages', 'messages', args(fieldValue("before", refValue('before')), fieldValue("chatId", refValue('chatId')), fieldValue("first", refValue('first'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('ModernMessage', FullMessageSelector)
                ))))),
            field('room', 'room', args(fieldValue("id", refValue('chatId'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', RoomShortSelector)
                ))
        );
const ChatInitFromUnreadSelector = obj(
            field('conversationState', 'state', args(fieldValue("id", refValue('chatId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('state', 'state', args(), scalar('String'))
                ))),
            field('gammaMessages', 'gammaMessages', args(fieldValue("before", refValue('before')), fieldValue("chatId", refValue('chatId')), fieldValue("first", refValue('first'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('haveMoreBackward', 'haveMoreBackward', args(), scalar('Boolean')),
                    field('haveMoreForward', 'haveMoreForward', args(), scalar('Boolean')),
                    field('messages', 'messages', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('ModernMessage', FullMessageSelector)
                        )))))
                )),
            field('lastReadedMessage', 'lastReadedMessage', args(fieldValue("chatId", refValue('chatId'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )),
            field('room', 'room', args(fieldValue("id", refValue('chatId'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', RoomShortSelector)
                ))
        );
const ChatMembersSearchSelector = obj(
            field('chatMembersSearch', 'members', args(fieldValue("after", refValue('after')), fieldValue("cid", refValue('cid')), fieldValue("first", refValue('first')), fieldValue("query", refValue('query'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('cursor', 'cursor', args(), notNull(scalar('String'))),
                            field('node', 'user', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('name', 'name', args(), notNull(scalar('String'))),
                                    field('photo', 'photo', args(), scalar('String')),
                                    field('primaryOrganization', 'primaryOrganization', args(), obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('id', 'id', args(), notNull(scalar('ID'))),
                                            field('name', 'name', args(), notNull(scalar('String')))
                                        )),
                                    field('shortname', 'shortname', args(), scalar('String'))
                                )))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean')))
                        )))
                )))
        );
const ChatMentionSearchSelector = obj(
            field('chatMentionSearch', 'mentions', args(fieldValue("after", refValue('after')), fieldValue("cid", refValue('cid')), fieldValue("first", refValue('first')), fieldValue("query", refValue('query'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('cursor', 'cursor', args(), scalar('String')),
                    field('globalItems', 'globalItems', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            inline('Organization', obj(
                                fragment('Organization', OrganizationShortSelector)
                            )),
                            inline('User', obj(
                                fragment('User', UserForMentionSelector)
                            )),
                            inline('SharedRoom', obj(
                                fragment('SharedRoom', RoomSharedNanoSelector)
                            ))
                        ))))),
                    field('localItems', 'localItems', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserForMentionSelector)
                        )))))
                )))
        );
const CommentsSelector = obj(
            field('comments', 'comments', args(fieldValue("peerId", refValue('peerId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('comments', 'comments', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('CommentEntry', CommentEntryFragmentSelector)
                        ))))),
                    field('count', 'count', args(), notNull(scalar('Int'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('state', 'state', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('state', 'state', args(), scalar('String'))
                        )))
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
                    field('iceServers', 'iceServers', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('credential', 'credential', args(), scalar('String')),
                            field('urls', 'urls', args(), notNull(list(notNull(scalar('String'))))),
                            field('username', 'username', args(), scalar('String'))
                        ))))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('streams', 'streams', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('ice', 'ice', args(), notNull(list(notNull(scalar('String'))))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('peerId', 'peerId', args(), scalar('ID')),
                            field('sdp', 'sdp', args(), scalar('String')),
                            field('state', 'state', args(), notNull(scalar('String')))
                        )))))
                )))
        );
const DialogsSelector = obj(
            field('alphaNotificationCounter', 'counter', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('unreadCount', 'unreadCount', args(), notNull(scalar('Int')))
                ))),
            field('dialogs', 'dialogs', args(fieldValue("after", refValue('after')), fieldValue("first", intValue(20))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('cursor', 'cursor', args(), scalar('String')),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('alphaTopMessage', 'topMessage', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('ModernMessage', DaialogListMessageSelector)
                                )),
                            field('cid', 'cid', args(), notNull(scalar('ID'))),
                            field('fid', 'fid', args(), notNull(scalar('ID'))),
                            field('haveMention', 'haveMention', args(), notNull(scalar('Boolean'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                            field('isMuted', 'isMuted', args(), notNull(scalar('Boolean'))),
                            field('kind', 'kind', args(), notNull(scalar('String'))),
                            field('photo', 'photo', args(), notNull(scalar('String'))),
                            field('title', 'title', args(), notNull(scalar('String'))),
                            field('unreadCount', 'unreadCount', args(), notNull(scalar('Int')))
                        )))))
                ))),
            field('dialogsState', 'state', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('state', 'state', args(), scalar('String'))
                )))
        );
const DiscoverIsDoneSelector = obj(
            field('betaIsDiscoverDone', 'betaIsDiscoverDone', args(), notNull(scalar('Boolean')))
        );
const DiscoverNextPageSelector = obj(
            field('gammaNextDiscoverPage', 'betaNextDiscoverPage', args(fieldValue("excudedGroupsIds", refValue('excudedGroupsIds')), fieldValue("selectedTagsIds", refValue('selectedTagsIds'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('chats', 'chats', args(), list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('Room', RoomShortSelector)
                        )))),
                    field('tagGroup', 'tagGroup', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('String'))),
                            field('subtitle', 'subtitle', args(), scalar('String')),
                            field('tags', 'tags', args(), notNull(list(notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('String'))),
                                    field('title', 'title', args(), notNull(scalar('String')))
                                ))))),
                            field('title', 'title', args(), scalar('String'))
                        ))
                ))
        );
const ExploreCommunitySelector = obj(
            field('alphaComunityPrefixSearch', 'items', args(fieldValue("after", refValue('after')), fieldValue("featuredIfEmptyQuery", refValue('featuredIfEmptyQuery')), fieldValue("first", intValue(25)), fieldValue("page", refValue('page')), fieldValue("query", refValue('query')), fieldValue("sort", refValue('sort'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('cursor', 'cursor', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('Organization', CommunitySearchSelector)
                                )))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('currentPage', 'currentPage', args(), notNull(scalar('Int'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean'))),
                            field('hasPreviousPage', 'hasPreviousPage', args(), notNull(scalar('Boolean'))),
                            field('itemsCount', 'itemsCount', args(), notNull(scalar('Int'))),
                            field('openEnded', 'openEnded', args(), notNull(scalar('Boolean'))),
                            field('pagesCount', 'pagesCount', args(), notNull(scalar('Int')))
                        )))
                )))
        );
const ExplorePeopleSelector = obj(
            field('userSearch', 'items', args(fieldValue("after", refValue('after')), fieldValue("first", intValue(25)), fieldValue("page", refValue('page')), fieldValue("query", refValue('query')), fieldValue("sort", refValue('sort'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('cursor', 'cursor', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('isYou', 'isYou', args(), notNull(scalar('Boolean'))),
                                    fragment('User', UserShortSelector)
                                )))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('currentPage', 'currentPage', args(), notNull(scalar('Int'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean'))),
                            field('hasPreviousPage', 'hasPreviousPage', args(), notNull(scalar('Boolean'))),
                            field('itemsCount', 'itemsCount', args(), notNull(scalar('Int'))),
                            field('openEnded', 'openEnded', args(), notNull(scalar('Boolean'))),
                            field('pagesCount', 'pagesCount', args(), notNull(scalar('Int')))
                        )))
                )))
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
            field('alphaFeedChannelContent', 'content', args(fieldValue("after", refValue('after')), fieldValue("first", refValue('first')), fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('cursor', 'cursor', args(), scalar('String')),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('FeedItem', FeedItemFullSelector)
                        )))))
                )))
        );
const FeedChannelSubscribersSelector = obj(
            field('alphaFeedChannelSubscribers', 'subscribers', args(fieldValue("after", refValue('after')), fieldValue("channelId", refValue('channelId')), fieldValue("first", refValue('first')), fieldValue("query", refValue('query'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('cursor', 'cursor', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('role', 'role', args(), notNull(scalar('String'))),
                                    field('user', 'user', args(), notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            fragment('User', UserShortSelector)
                                        )))
                                )))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('currentPage', 'currentPage', args(), notNull(scalar('Int'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean'))),
                            field('hasPreviousPage', 'hasPreviousPage', args(), notNull(scalar('Boolean'))),
                            field('itemsCount', 'itemsCount', args(), notNull(scalar('Int'))),
                            field('openEnded', 'openEnded', args(), notNull(scalar('Boolean'))),
                            field('pagesCount', 'pagesCount', args(), notNull(scalar('Int')))
                        )))
                )))
        );
const FeedChannelWritersSelector = obj(
            field('alphaFeedChannelAdmins', 'writers', args(fieldValue("after", refValue('after')), fieldValue("first", refValue('first')), fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('cursor', 'cursor', args(), scalar('String')),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('role', 'role', args(), notNull(scalar('String'))),
                            field('user', 'user', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('User', UserShortSelector)
                                )))
                        )))))
                )))
        );
const FeedChannelsSearchSelector = obj(
            field('alphaFeedChannelSearch', 'search', args(fieldValue("after", refValue('after')), fieldValue("first", refValue('first')), fieldValue("query", refValue('query')), fieldValue("sort", refValue('sort'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('cursor', 'cursor', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('FeedChannel', FeedChannelFullSelector)
                                )))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('currentPage', 'currentPage', args(), notNull(scalar('Int'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean'))),
                            field('hasPreviousPage', 'hasPreviousPage', args(), notNull(scalar('Boolean'))),
                            field('itemsCount', 'itemsCount', args(), notNull(scalar('Int'))),
                            field('openEnded', 'openEnded', args(), notNull(scalar('Boolean'))),
                            field('pagesCount', 'pagesCount', args(), notNull(scalar('Int')))
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
            field('alphaHomeFeed', 'feed', args(fieldValue("after", refValue('after')), fieldValue("first", refValue('first'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('cursor', 'cursor', args(), scalar('String')),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('FeedItem', FeedItemFullSelector)
                        )))))
                )))
        );
const FeedRecommendedChannelsSelector = obj(
            field('alphaRecommendedChannels', 'search', args(fieldValue("after", refValue('after')), fieldValue("first", refValue('first'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('cursor', 'cursor', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('FeedChannel', FeedChannelFullSelector)
                                )))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('currentPage', 'currentPage', args(), notNull(scalar('Int'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean'))),
                            field('hasPreviousPage', 'hasPreviousPage', args(), notNull(scalar('Boolean'))),
                            field('itemsCount', 'itemsCount', args(), notNull(scalar('Int'))),
                            field('openEnded', 'openEnded', args(), notNull(scalar('Boolean'))),
                            field('pagesCount', 'pagesCount', args(), notNull(scalar('Int')))
                        )))
                )))
        );
const FeedSubscriptionsSelector = obj(
            field('alphaFeedMySubscriptions', 'channels', args(fieldValue("after", refValue('after')), fieldValue("first", refValue('first'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('cursor', 'cursor', args(), scalar('String')),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('FeedChannel', FeedChannelFullSelector)
                        )))))
                )))
        );
const FeedWritableChannelsSelector = obj(
            field('alphaWritableChannels', 'channels', args(fieldValue("after", refValue('after')), fieldValue("first", refValue('first'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('cursor', 'cursor', args(), scalar('String')),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('FeedChannel', FeedChannelFullSelector)
                        )))))
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
            field('alphaGlobalSearch', 'items', args(fieldValue("kinds", refValue('kinds')), fieldValue("query", refValue('query'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('Organization', obj(
                        field('about', 'about', args(), scalar('String')),
                        field('alphaIsCommunity', 'isCommunity', args(), notNull(scalar('Boolean'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('name', 'name', args(), notNull(scalar('String'))),
                        field('photo', 'photo', args(), scalar('String')),
                        field('shortname', 'shortname', args(), scalar('String'))
                    )),
                    inline('User', obj(
                        fragment('User', UserShortSelector)
                    )),
                    inline('SharedRoom', obj(
                        field('canSendMessage', 'canSendMessage', args(), notNull(scalar('Boolean'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('kind', 'kind', args(), notNull(scalar('String'))),
                        field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                        field('membership', 'membership', args(), notNull(scalar('String'))),
                        field('organization', 'organization', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('name', 'name', args(), notNull(scalar('String'))),
                                field('photo', 'photo', args(), scalar('String'))
                            )),
                        field('photo', 'roomPhoto', args(), notNull(scalar('String'))),
                        field('title', 'title', args(), notNull(scalar('String')))
                    ))
                )))))
        );
const InitFeedSelector = obj(
            field('alphaFeedMyDraftsChannel', 'drafts', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('FeedChannel', FeedChannelFullSelector)
                ))),
            field('alphaHomeFeed', 'feed', args(fieldValue("first", refValue('first'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('cursor', 'cursor', args(), scalar('String')),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('FeedItem', FeedItemFullSelector)
                        )))))
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
            field('conversationState', 'state', args(fieldValue("id", refValue('chatId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('state', 'state', args(), scalar('String'))
                ))),
            field('gammaMessages', 'gammaMessages', args(fieldValue("after", refValue('after')), fieldValue("before", refValue('before')), fieldValue("chatId", refValue('chatId')), fieldValue("first", refValue('first'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('haveMoreBackward', 'haveMoreBackward', args(), scalar('Boolean')),
                    field('haveMoreForward', 'haveMoreForward', args(), scalar('Boolean')),
                    field('messages', 'messages', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('ModernMessage', FullMessageSelector)
                        )))))
                ))
        );
const MessagesSearchSelector = obj(
            field('messagesSearch', 'messagesSearch', args(fieldValue("after", refValue('after')), fieldValue("first", refValue('first')), fieldValue("query", refValue('query')), fieldValue("sort", refValue('sort'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('cursor', 'cursor', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('chat', 'chat', args(), notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            inline('PrivateRoom', obj(
                                                field('id', 'id', args(), notNull(scalar('ID'))),
                                                field('settings', 'settings', args(), notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                                        field('mute', 'mute', args(), scalar('Boolean'))
                                                    ))),
                                                field('user', 'user', args(), notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                                        field('name', 'name', args(), notNull(scalar('String'))),
                                                        field('photo', 'photo', args(), scalar('String'))
                                                    )))
                                            )),
                                            inline('SharedRoom', obj(
                                                field('canEdit', 'canEdit', args(), notNull(scalar('Boolean'))),
                                                field('id', 'id', args(), notNull(scalar('ID'))),
                                                field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                                                field('kind', 'kind', args(), notNull(scalar('String'))),
                                                field('membership', 'membership', args(), notNull(scalar('String'))),
                                                field('photo', 'photo', args(), notNull(scalar('String'))),
                                                field('role', 'role', args(), notNull(scalar('String'))),
                                                field('settings', 'settings', args(), notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                                        field('mute', 'mute', args(), scalar('Boolean'))
                                                    ))),
                                                field('title', 'title', args(), notNull(scalar('String')))
                                            ))
                                        ))),
                                    field('message', 'message', args(), notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('date', 'date', args(), notNull(scalar('Date'))),
                                            field('fallback', 'fallback', args(), notNull(scalar('String'))),
                                            field('id', 'id', args(), notNull(scalar('ID'))),
                                            field('message', 'message', args(), scalar('String')),
                                            field('sender', 'sender', args(), notNull(obj(
                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                    field('firstName', 'firstName', args(), notNull(scalar('String'))),
                                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                                    field('name', 'name', args(), notNull(scalar('String'))),
                                                    field('photo', 'photo', args(), scalar('String'))
                                                ))),
                                            field('senderBadge', 'senderBadge', args(), obj(
                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                    fragment('UserBadge', UserBadgeSelector)
                                                )),
                                            inline('GeneralMessage', obj(
                                                field('attachments', 'attachments', args(), notNull(list(notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        field('fallback', 'fallback', args(), notNull(scalar('String'))),
                                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                                        inline('MessageAttachmentFile', obj(
                                                            field('fileId', 'fileId', args(), notNull(scalar('String'))),
                                                            field('fileMetadata', 'fileMetadata', args(), notNull(obj(
                                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                                    field('imageFormat', 'imageFormat', args(), scalar('String')),
                                                                    field('isImage', 'isImage', args(), notNull(scalar('Boolean')))
                                                                ))),
                                                            field('id', 'id', args(), notNull(scalar('ID')))
                                                        ))
                                                    ))))),
                                                field('id', 'id', args(), notNull(scalar('ID'))),
                                                field('quotedMessages', 'quotedMessages', args(), notNull(list(notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        field('id', 'id', args(), notNull(scalar('ID')))
                                                    )))))
                                            ))
                                        )))
                                )))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('currentPage', 'currentPage', args(), notNull(scalar('Int'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean'))),
                            field('hasPreviousPage', 'hasPreviousPage', args(), notNull(scalar('Boolean'))),
                            field('itemsCount', 'itemsCount', args(), notNull(scalar('Int'))),
                            field('openEnded', 'openEnded', args(), notNull(scalar('Boolean'))),
                            field('pagesCount', 'pagesCount', args(), notNull(scalar('Int')))
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
                    field('brand', 'brand', args(), notNull(scalar('String'))),
                    field('expMonth', 'expMonth', args(), notNull(scalar('Int'))),
                    field('expYear', 'expYear', args(), notNull(scalar('Int'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('last4', 'last4', args(), notNull(scalar('String')))
                )))))
        );
const MyNotificationCenterSelector = obj(
            field('myNotificationCenter', 'myNotificationCenter', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('state', 'state', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('state', 'state', args(), scalar('String'))
                        ))),
                    field('unread', 'unread', args(), notNull(scalar('Int')))
                )))
        );
const MyNotificationsSelector = obj(
            field('myNotifications', 'myNotifications', args(fieldValue("before", refValue('before')), fieldValue("first", refValue('first'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('cursor', 'cursor', args(), scalar('String')),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('Notification', NotificationFragmentSelector)
                        )))))
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
                            field('stickers', 'stickers', args(), notNull(list(notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('Sticker', StickerFragmentSelector)
                                ))))),
                            field('title', 'title', args(), notNull(scalar('String')))
                        )))))
                )))
        );
const MySuccessfulInvitesCountSelector = obj(
            field('mySuccessfulInvitesCount', 'mySuccessfulInvitesCount', args(), notNull(scalar('Int')))
        );
const MyWalletSelector = obj(
            field('myAccount', 'myAccount', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('balance', 'balance', args(), notNull(scalar('Int'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const OauthContextSelector = obj(
            field('oauthContext', 'context', args(fieldValue("code", refValue('code'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('app', 'app', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('image', 'image', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('crop', 'crop', args(), obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('h', 'h', args(), notNull(scalar('Int'))),
                                            field('w', 'w', args(), notNull(scalar('Int'))),
                                            field('x', 'x', args(), notNull(scalar('Int'))),
                                            field('y', 'y', args(), notNull(scalar('Int')))
                                        )),
                                    field('uuid', 'uuid', args(), notNull(scalar('String')))
                                )),
                            field('scopes', 'scopes', args(), list(notNull(scalar('String')))),
                            field('title', 'title', args(), notNull(scalar('String')))
                        ))),
                    field('code', 'code', args(), notNull(scalar('String'))),
                    field('redirectUrl', 'redirectUrl', args(), notNull(scalar('String'))),
                    field('state', 'state', args(), notNull(scalar('String')))
                ))
        );
const OnlineSelector = obj(
            field('user', 'user', args(fieldValue("id", refValue('userId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('isBot', 'isBot', args(), notNull(scalar('Boolean'))),
                    field('lastSeen', 'lastSeen', args(), scalar('String')),
                    field('online', 'online', args(), notNull(scalar('Boolean')))
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
                    field('alphaOrganizationMembers', 'members', args(fieldValue("after", refValue('after')), fieldValue("first", refValue('first'))), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('role', 'role', args(), notNull(scalar('String'))),
                            field('user', 'user', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('User', UserShortSelector)
                                )))
                        ))))),
                    field('id', 'id', args(), notNull(scalar('ID')))
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
const ProfileSelector = obj(
            field('me', 'user', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('shortname', 'shortname', args(), scalar('String'))
                )),
            field('myProfile', 'profile', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('about', 'about', args(), scalar('String')),
                    field('alphaInvitedBy', 'invitedBy', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('name', 'name', args(), notNull(scalar('String')))
                        )),
                    field('alphaJoinedAt', 'joinedAt', args(), scalar('String')),
                    field('alphaRole', 'role', args(), scalar('String')),
                    field('email', 'email', args(), scalar('String')),
                    field('facebook', 'facebook', args(), scalar('String')),
                    field('firstName', 'firstName', args(), scalar('String')),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('instagram', 'instagram', args(), scalar('String')),
                    field('lastName', 'lastName', args(), scalar('String')),
                    field('linkedin', 'linkedin', args(), scalar('String')),
                    field('location', 'location', args(), scalar('String')),
                    field('phone', 'phone', args(), scalar('String')),
                    field('photoRef', 'photoRef', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('crop', 'crop', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('h', 'h', args(), notNull(scalar('Int'))),
                                    field('w', 'w', args(), notNull(scalar('Int'))),
                                    field('x', 'x', args(), notNull(scalar('Int'))),
                                    field('y', 'y', args(), notNull(scalar('Int')))
                                )),
                            field('uuid', 'uuid', args(), notNull(scalar('String')))
                        )),
                    field('primaryOrganization', 'primaryOrganization', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                            field('name', 'name', args(), notNull(scalar('String')))
                        )),
                    field('twitter', 'twitter', args(), scalar('String')),
                    field('website', 'website', args(), scalar('String'))
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
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('isDeleted', 'isDeleted', args(), notNull(scalar('Boolean')))
                    )),
                    inline('Organization', obj(
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('isDeleted', 'isDeleted', args(), notNull(scalar('Boolean')))
                    )),
                    inline('FeedChannel', obj(
                        field('id', 'id', args(), notNull(scalar('ID')))
                    ))
                ))
        );
const ResolvedInviteSelector = obj(
            field('alphaResolveInvite', 'invite', args(fieldValue("key", refValue('key'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('InviteInfo', obj(
                        field('creator', 'creator', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserShortSelector)
                            )),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('orgId', 'orgId', args(), notNull(scalar('ID'))),
                        field('organization', 'organization', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('about', 'about', args(), scalar('String')),
                                field('alphaIsCommunity', 'isCommunity', args(), notNull(scalar('Boolean'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                                field('name', 'name', args(), notNull(scalar('String'))),
                                field('photo', 'photo', args(), scalar('String'))
                            )),
                        field('title', 'title', args(), notNull(scalar('String')))
                    )),
                    inline('AppInvite', obj(
                        field('inviter', 'inviter', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserShortSelector)
                            )))
                    )),
                    inline('RoomInvite', obj(
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('invitedByUser', 'invitedByUser', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('User', UserShortSelector)
                            ))),
                        field('room', 'room', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                inline('SharedRoom', obj(
                                    field('description', 'description', args(), scalar('String')),
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                                    field('kind', 'kind', args(), notNull(scalar('String'))),
                                    field('matchmaking', 'matchmaking', args(), obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('enabled', 'enabled', args(), notNull(scalar('Boolean')))
                                        )),
                                    field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                                    field('membership', 'membership', args(), notNull(scalar('String'))),
                                    field('photo', 'photo', args(), notNull(scalar('String'))),
                                    field('socialImage', 'socialImage', args(), scalar('String')),
                                    field('title', 'title', args(), notNull(scalar('String')))
                                ))
                            )))
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
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('pinnedMessage', 'pinnedMessage', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('ModernMessage', FullMessageSelector)
                            )),
                        field('settings', 'settings', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('mute', 'mute', args(), scalar('Boolean'))
                            ))),
                        field('user', 'user', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('isBot', 'isBot', args(), notNull(scalar('Boolean'))),
                                field('name', 'name', args(), notNull(scalar('String'))),
                                field('photo', 'photo', args(), scalar('String')),
                                field('primaryOrganization', 'primaryOrganization', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('name', 'name', args(), notNull(scalar('String')))
                                    )),
                                field('shortname', 'shortname', args(), scalar('String'))
                            )))
                    )),
                    inline('SharedRoom', obj(
                        field('canEdit', 'canEdit', args(), notNull(scalar('Boolean'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                        field('kind', 'kind', args(), notNull(scalar('String'))),
                        field('matchmaking', 'matchmaking', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('MatchmakingRoom', MatchmakingRoomFragmentSelector)
                            )),
                        field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                        field('membership', 'membership', args(), notNull(scalar('String'))),
                        field('organization', 'organization', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('Organization', OrganizationMediumSelector)
                            )),
                        field('photo', 'photo', args(), notNull(scalar('String'))),
                        field('pinnedMessage', 'pinnedMessage', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('ModernMessage', FullMessageSelector)
                            )),
                        field('role', 'role', args(), notNull(scalar('String'))),
                        field('settings', 'settings', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('mute', 'mute', args(), scalar('Boolean'))
                            ))),
                        field('title', 'title', args(), notNull(scalar('String')))
                    ))
                ))
        );
const RoomFeaturedMembersSelector = obj(
            field('roomFeaturedMembers', 'roomFeaturedMembers', args(fieldValue("roomId", refValue('roomId'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('badge', 'badge', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('UserBadge', UserBadgeSelector)
                        )),
                    field('canKick', 'canKick', args(), notNull(scalar('Boolean'))),
                    field('membership', 'membership', args(), notNull(scalar('String'))),
                    field('role', 'role', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        )))
                )))))
        );
const RoomInviteInfoSelector = obj(
            field('betaRoomInviteInfo', 'invite', args(fieldValue("invite", refValue('invite'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('invitedByUser', 'invitedByUser', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        ))),
                    field('room', 'room', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            inline('SharedRoom', obj(
                                field('description', 'description', args(), scalar('String')),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                                field('kind', 'kind', args(), notNull(scalar('String'))),
                                field('matchmaking', 'matchmaking', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('enabled', 'enabled', args(), notNull(scalar('Boolean')))
                                    )),
                                field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                                field('membership', 'membership', args(), notNull(scalar('String'))),
                                field('organization', 'organization', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        fragment('Organization', OrganizationShortSelector)
                                    )),
                                field('photo', 'photo', args(), notNull(scalar('String'))),
                                field('socialImage', 'socialImage', args(), scalar('String')),
                                field('title', 'title', args(), notNull(scalar('String')))
                            ))
                        )))
                ))
        );
const RoomInviteLinkSelector = obj(
            field('betaRoomInviteLink', 'link', args(fieldValue("roomId", refValue('roomId'))), notNull(scalar('String')))
        );
const RoomMembersSelector = obj(
            field('roomMembers', 'members', args(fieldValue("roomId", refValue('roomId'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('canKick', 'canKick', args(), notNull(scalar('Boolean'))),
                    field('membership', 'membership', args(), notNull(scalar('String'))),
                    field('role', 'role', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        )))
                )))))
        );
const RoomMembersPaginatedSelector = obj(
            field('roomMembers', 'members', args(fieldValue("after", refValue('after')), fieldValue("first", refValue('first')), fieldValue("roomId", refValue('roomId'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('badge', 'badge', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('UserBadge', UserBadgeSelector)
                        )),
                    field('canKick', 'canKick', args(), notNull(scalar('Boolean'))),
                    field('membership', 'membership', args(), notNull(scalar('String'))),
                    field('role', 'role', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        )))
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
                            field('photo', 'photo', args(), scalar('String')),
                            field('primaryOrganization', 'primaryOrganization', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('name', 'name', args(), notNull(scalar('String')))
                                )),
                            field('shortname', 'shortname', args(), scalar('String'))
                        )))
                )))))
        );
const RoomOrganizationAdminMembersSelector = obj(
            field('room', 'room', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('SharedRoom', obj(
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('organization', 'organization', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('alphaOrganizationAdminMembers', 'adminMembers', args(), notNull(list(notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('role', 'role', args(), notNull(scalar('String'))),
                                        field('user', 'user', args(), notNull(obj(
                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                fragment('User', UserShortSelector)
                                            )))
                                    ))))),
                                field('id', 'id', args(), notNull(scalar('ID')))
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
            field('betaRoomSearch', 'items', args(fieldValue("first", intValue(25)), fieldValue("page", refValue('page')), fieldValue("query", refValue('query')), fieldValue("sort", refValue('sort'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('cursor', 'cursor', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    inline('SharedRoom', obj(
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                                        field('kind', 'kind', args(), notNull(scalar('String'))),
                                        field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                                        field('membership', 'membership', args(), notNull(scalar('String'))),
                                        field('organization', 'organization', args(), obj(
                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                field('id', 'id', args(), notNull(scalar('ID'))),
                                                field('name', 'name', args(), notNull(scalar('String'))),
                                                field('photo', 'photo', args(), scalar('String'))
                                            )),
                                        field('photo', 'photo', args(), notNull(scalar('String'))),
                                        field('title', 'title', args(), notNull(scalar('String')))
                                    ))
                                )))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('currentPage', 'currentPage', args(), notNull(scalar('Int'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean'))),
                            field('hasPreviousPage', 'hasPreviousPage', args(), notNull(scalar('Boolean'))),
                            field('itemsCount', 'itemsCount', args(), notNull(scalar('Int'))),
                            field('openEnded', 'openEnded', args(), notNull(scalar('Boolean'))),
                            field('pagesCount', 'pagesCount', args(), notNull(scalar('Int')))
                        )))
                )))
        );
const RoomSuperSelector = obj(
            field('roomSuper', 'roomSuper', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('featured', 'featured', args(), notNull(scalar('Boolean'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
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
            field('chatSharedMedia', 'sharedMedia', args(fieldValue("after", refValue('after')), fieldValue("chatId", refValue('chatId')), fieldValue("first", refValue('first')), fieldValue("mediaTypes", refValue('mediaTypes'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('cursor', 'cursor', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('message', 'message', args(), notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            inline('GeneralMessage', obj(
                                                field('attachments', 'attachments', args(), notNull(list(notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        inline('MessageAttachmentFile', obj(
                                                            field('fallback', 'fallback', args(), notNull(scalar('String'))),
                                                            field('fileId', 'fileId', args(), notNull(scalar('String'))),
                                                            field('fileMetadata', 'fileMetadata', args(), notNull(obj(
                                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                                    field('imageFormat', 'imageFormat', args(), scalar('String')),
                                                                    field('imageHeight', 'imageHeight', args(), scalar('Int')),
                                                                    field('imageWidth', 'imageWidth', args(), scalar('Int')),
                                                                    field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                                                                    field('mimeType', 'mimeType', args(), scalar('String')),
                                                                    field('name', 'name', args(), notNull(scalar('String'))),
                                                                    field('size', 'size', args(), notNull(scalar('Int')))
                                                                ))),
                                                            field('filePreview', 'filePreview', args(), scalar('String')),
                                                            field('id', 'id', args(), notNull(scalar('ID')))
                                                        )),
                                                        inline('MessageRichAttachment', obj(
                                                            field('id', 'id', args(), notNull(scalar('ID'))),
                                                            field('image', 'image', args(), obj(
                                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                                    field('url', 'url', args(), notNull(scalar('String')))
                                                                )),
                                                            field('imageFallback', 'imageFallback', args(), obj(
                                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                                    field('photo', 'photo', args(), notNull(scalar('String')))
                                                                )),
                                                            field('imagePreview', 'imagePreview', args(), scalar('String')),
                                                            field('text', 'text', args(), scalar('String')),
                                                            field('title', 'title', args(), scalar('String')),
                                                            field('titleLink', 'titleLink', args(), scalar('String'))
                                                        ))
                                                    ))))),
                                                field('date', 'date', args(), notNull(scalar('Date'))),
                                                field('fallback', 'fallback', args(), notNull(scalar('String'))),
                                                field('id', 'id', args(), notNull(scalar('ID'))),
                                                field('sender', 'sender', args(), notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                                        field('name', 'name', args(), notNull(scalar('String')))
                                                    )))
                                            ))
                                        )))
                                )))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('currentPage', 'currentPage', args(), notNull(scalar('Int'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean')))
                        )))
                )))
        );
const SharedMediaCountersSelector = obj(
            field('chatSharedMediaCounters', 'counters', args(fieldValue("chatId", refValue('chatId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('documents', 'documents', args(), notNull(scalar('Int'))),
                    field('images', 'images', args(), notNull(scalar('Int'))),
                    field('links', 'links', args(), notNull(scalar('Int'))),
                    field('videos', 'videos', args(), notNull(scalar('Int')))
                )))
        );
const StickerPackSelector = obj(
            field('stickerPack', 'stickerPack', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('StickerPack', StickerPackFragmentSelector)
                ))
        );
const SuggestedRoomsSelector = obj(
            field('betaIsDiscoverDone', 'isDiscoverDone', args(), notNull(scalar('Boolean'))),
            field('betaSuggestedRooms', 'suggestedRooms', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('SharedRoom', obj(
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('kind', 'kind', args(), notNull(scalar('String'))),
                        field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                        field('membership', 'membership', args(), notNull(scalar('String'))),
                        field('organization', 'organization', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('name', 'name', args(), notNull(scalar('String'))),
                                field('photo', 'photo', args(), scalar('String'))
                            )),
                        field('photo', 'photo', args(), notNull(scalar('String'))),
                        field('title', 'title', args(), notNull(scalar('String')))
                    ))
                )))))
        );
const SuperAccountSelector = obj(
            field('superAccount', 'superAccount', args(fieldValue("id", refValue('accountId')), fieldValue("viaOrgId", refValue('viaOrgId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('alphaPublished', 'published', args(), notNull(scalar('Boolean'))),
                    field('createdAt', 'createdAt', args(), scalar('String')),
                    field('createdBy', 'createdBy', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('name', 'name', args(), notNull(scalar('String')))
                        )),
                    field('features', 'features', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('key', 'key', args(), notNull(scalar('String'))),
                            field('title', 'title', args(), notNull(scalar('String')))
                        ))))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('members', 'members', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        ))))),
                    field('orgId', 'orgId', args(), notNull(scalar('ID'))),
                    field('state', 'state', args(), notNull(scalar('String'))),
                    field('title', 'title', args(), notNull(scalar('String')))
                )))
        );
const SuperAccountsSelector = obj(
            field('superAccounts', 'superAccounts', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('createdAt', 'createdAt', args(), scalar('String')),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('orgId', 'orgId', args(), notNull(scalar('ID'))),
                    field('state', 'state', args(), notNull(scalar('String'))),
                    field('title', 'title', args(), notNull(scalar('String')))
                )))))
        );
const SuperAdminsSelector = obj(
            field('superAdmins', 'superAdmins', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('email', 'email', args(), scalar('String')),
                    field('role', 'role', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        )))
                )))))
        );
const SuperBadgeInRoomSelector = obj(
            field('superBadgeInRoom', 'superBadgeInRoom', args(fieldValue("roomId", refValue('roomId')), fieldValue("userId", refValue('userId'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('UserBadge', UserBadgeSelector)
                ))
        );
const UserSelector = obj(
            field('room', 'conversation', args(fieldValue("id", refValue('userId'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('PrivateRoom', obj(
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('settings', 'settings', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('mute', 'mute', args(), scalar('Boolean'))
                            )))
                    ))
                )),
            field('user', 'user', args(fieldValue("id", refValue('userId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('chatsWithBadge', 'chatsWithBadge', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('badge', 'badge', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('UserBadge', UserBadgeSelector)
                                ))),
                            field('chat', 'chat', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('Room', RoomShortSelector)
                                )))
                        ))))),
                    fragment('User', UserFullSelector)
                )))
        );
const UserAvailableRoomsSelector = obj(
            field('betaUserAvailableRooms', 'betaUserAvailableRooms', args(fieldValue("after", refValue('after')), fieldValue("isChannel", refValue('isChannel')), fieldValue("limit", refValue('limit'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('SharedRoom', obj(
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('kind', 'kind', args(), notNull(scalar('String'))),
                        field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                        field('membership', 'membership', args(), notNull(scalar('String'))),
                        field('organization', 'organization', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('name', 'name', args(), notNull(scalar('String'))),
                                field('photo', 'photo', args(), scalar('String'))
                            )),
                        field('photo', 'photo', args(), notNull(scalar('String'))),
                        field('title', 'title', args(), notNull(scalar('String')))
                    ))
                )))))
        );
const UserStorageSelector = obj(
            field('userStorage', 'userStorage', args(fieldValue("keys", refValue('keys')), fieldValue("namespace", refValue('namespace'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('key', 'key', args(), notNull(scalar('String'))),
                    field('value', 'value', args(), scalar('String'))
                )))))
        );
const UsersSelector = obj(
            field('users', 'items', args(fieldValue("query", refValue('query'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('email', 'subtitle', args(), scalar('String')),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('name', 'title', args(), notNull(scalar('String')))
                )))))
        );
const WalletTransactionsSelector = obj(
            field('walletTransactions', 'walletTransactions', args(fieldValue("after", refValue('after')), fieldValue("first", refValue('first')), fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('cursor', 'cursor', args(), scalar('String')),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('amount', 'amount', args(), notNull(scalar('Int'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('readableState', 'readableState', args(), notNull(scalar('String'))),
                            field('state', 'state', args(), notNull(scalar('String')))
                        )))))
                )))
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
            field('betaAddComment', 'betaAddComment', args(fieldValue("fileAttachments", refValue('fileAttachments')), fieldValue("mentions", refValue('mentions')), fieldValue("message", refValue('message')), fieldValue("peerId", refValue('peerId')), fieldValue("repeatKey", refValue('repeatKey')), fieldValue("replyComment", refValue('replyComment')), fieldValue("spans", refValue('spans'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const AddStickerCommentSelector = obj(
            field('betaAddStickerComment', 'addStickerComment', args(fieldValue("peerId", refValue('peerId')), fieldValue("repeatKey", refValue('repeatKey')), fieldValue("replyComment", refValue('replyComment')), fieldValue("stickerId", refValue('stickerId'))), notNull(obj(
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
            field('betaSubmitNextDiscover', 'betaSubmitNextDiscover', args(fieldValue("excudedGroupsIds", refValue('excudedGroupsIds')), fieldValue("selectedTagsIds", refValue('selectedTagsIds'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('tagGroup', 'tagGroup', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('String')))
                        ))
                ))
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
            field('peerConnectionAnswer', 'peerConnectionAnswer', args(fieldValue("answer", refValue('answer')), fieldValue("id", refValue('id')), fieldValue("ownPeerId", refValue('ownPeerId')), fieldValue("peerId", refValue('peerId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Conference', ConferenceShortSelector)
                )))
        );
const ConferenceCandidateSelector = obj(
            field('peerConnectionCandidate', 'peerConnectionCandidate', args(fieldValue("candidate", refValue('candidate')), fieldValue("id", refValue('id')), fieldValue("ownPeerId", refValue('ownPeerId')), fieldValue("peerId", refValue('peerId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Conference', ConferenceShortSelector)
                )))
        );
const ConferenceJoinSelector = obj(
            field('conferenceJoin', 'conferenceJoin', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('conference', 'conference', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('Conference', ConferenceShortSelector)
                        ))),
                    field('peerId', 'peerId', args(), notNull(scalar('ID')))
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
            field('peerConnectionOffer', 'peerConnectionOffer', args(fieldValue("id", refValue('id')), fieldValue("offer", refValue('offer')), fieldValue("ownPeerId", refValue('ownPeerId')), fieldValue("peerId", refValue('peerId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Conference', ConferenceShortSelector)
                )))
        );
const CreateAppSelector = obj(
            field('createApp', 'createApp', args(fieldValue("about", refValue('about')), fieldValue("name", refValue('name')), fieldValue("photoRef", refValue('photoRef')), fieldValue("shortname", refValue('shortname'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('AppProfile', AppFullSelector)
                )))
        );
const CreateCardSetupIntentSelector = obj(
            field('cardCreateSetupIntent', 'cardCreateSetupIntent', args(fieldValue("retryKey", refValue('retryKey'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('clientSecret', 'clientSecret', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const CreateDepositIntentSelector = obj(
            field('cardDepositIntent', 'cardDepositIntent', args(fieldValue("amount", refValue('amount')), fieldValue("id", refValue('cardId')), fieldValue("retryKey", refValue('retryKey'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('clientSecret', 'clientSecret', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
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
            field('alphaCreateUserProfileAndOrganization', 'alphaCreateUserProfileAndOrganization', args(fieldValue("organization", refValue('organization')), fieldValue("user", refValue('user'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('organization', 'organization', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('name', 'name', args(), notNull(scalar('String')))
                        )),
                    field('user', 'user', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserFullSelector)
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
const DepositIntentCommitSelector = obj(
            field('cardDepositIntentCommit', 'cardDepositIntentCommit', args(fieldValue("id", refValue('id'))), notNull(scalar('Boolean')))
        );
const EditCommentSelector = obj(
            field('editComment', 'editComment', args(fieldValue("fileAttachments", refValue('fileAttachments')), fieldValue("id", refValue('id')), fieldValue("mentions", refValue('mentions')), fieldValue("message", refValue('message')), fieldValue("spans", refValue('spans'))), notNull(scalar('Boolean')))
        );
const EditMessageSelector = obj(
            field('editMessage', 'editMessage', args(fieldValue("fileAttachments", refValue('fileAttachments')), fieldValue("mentions", refValue('mentions')), fieldValue("message", refValue('message')), fieldValue("messageId", refValue('messageId')), fieldValue("replyMessages", refValue('replyMessages')), fieldValue("spans", refValue('spans'))), notNull(scalar('Boolean')))
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
            field('superAccountFeatureRemove', 'superAccountFeatureRemove', args(fieldValue("featureId", refValue('featureId')), fieldValue("id", refValue('accountId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('features', 'features', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('key', 'key', args(), notNull(scalar('String'))),
                            field('title', 'title', args(), notNull(scalar('String')))
                        ))))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const FeatureFlagEnableSelector = obj(
            field('superAccountFeatureAdd', 'superAccountFeatureAdd', args(fieldValue("featureId", refValue('featureId')), fieldValue("id", refValue('accountId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('features', 'features', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('key', 'key', args(), notNull(scalar('String'))),
                            field('title', 'title', args(), notNull(scalar('String')))
                        ))))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const FeedChannelAddWriterSelector = obj(
            field('alphaFeedChannelAddEditor', 'alphaFeedChannelAddEditor', args(fieldValue("id", refValue('id')), fieldValue("userId", refValue('userId'))), notNull(scalar('Boolean')))
        );
const FeedChannelCreateSelector = obj(
            field('alphaFeedCreateChannel', 'channel', args(fieldValue("about", refValue('about')), fieldValue("global", refValue('global')), fieldValue("photoRef", refValue('photoRef')), fieldValue("title", refValue('title'))), notNull(obj(
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
            field('alphaFeedUpdateChannel', 'channel', args(fieldValue("about", refValue('about')), fieldValue("global", refValue('global')), fieldValue("id", refValue('id')), fieldValue("photoRef", refValue('photoRef')), fieldValue("title", refValue('title'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const FeedCreatePostSelector = obj(
            field('alphaCreateFeedPost', 'post', args(fieldValue("channel", refValue('channel')), fieldValue("repeatKey", refValue('repeatKey')), fieldValue("slides", refValue('slides'))), notNull(obj(
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
const MarkSequenceReadSelector = obj(
            field('alphaGlobalRead', 'alphaGlobalRead', args(fieldValue("toSeq", refValue('seq'))), notNull(scalar('String')))
        );
const MatchmakingConnectSelector = obj(
            field('matchmakingConnect', 'matchmakingConnect', args(fieldValue("peerId", refValue('peerId')), fieldValue("uid", refValue('uid'))), notNull(scalar('Boolean')))
        );
const MatchmakingProfileFillSelector = obj(
            field('matchmakingProfileFill', 'matchmakingProfileFill', args(fieldValue("input", refValue('input')), fieldValue("peerId", refValue('peerId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('MatchmakingProfile', MatchmakingProfileFragmentSelector)
                )))
        );
const MatchmakingRoomSaveSelector = obj(
            field('matchmakingRoomSave', 'matchmakingRoomSave', args(fieldValue("input", refValue('input')), fieldValue("peerId", refValue('peerId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('MatchmakingRoom', MatchmakingRoomFragmentSelector)
                )))
        );
const MediaAnswerSelector = obj(
            field('mediaStreamAnswer', 'mediaStreamAnswer', args(fieldValue("answer", refValue('answer')), fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('streams', 'streams', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('ice', 'ice', args(), notNull(list(notNull(scalar('String'))))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('peerId', 'peerId', args(), scalar('ID')),
                            field('sdp', 'sdp', args(), scalar('String')),
                            field('state', 'state', args(), notNull(scalar('String')))
                        )))))
                )))
        );
const MediaCandidateSelector = obj(
            field('mediaStreamCandidate', 'mediaStreamCandidate', args(fieldValue("candidate", refValue('candidate')), fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('streams', 'streams', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('ice', 'ice', args(), notNull(list(notNull(scalar('String'))))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('peerId', 'peerId', args(), scalar('ID')),
                            field('sdp', 'sdp', args(), scalar('String')),
                            field('state', 'state', args(), notNull(scalar('String')))
                        )))))
                )))
        );
const MediaFailedSelector = obj(
            field('mediaStreamFailed', 'mediaStreamFailed', args(fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('streams', 'streams', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('ice', 'ice', args(), notNull(list(notNull(scalar('String'))))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('peerId', 'peerId', args(), scalar('ID')),
                            field('sdp', 'sdp', args(), scalar('String')),
                            field('state', 'state', args(), notNull(scalar('String')))
                        )))))
                )))
        );
const MediaNegotiationNeededSelector = obj(
            field('mediaStreamNegotiationNeeded', 'mediaStreamNegotiationNeeded', args(fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('streams', 'streams', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('ice', 'ice', args(), notNull(list(notNull(scalar('String'))))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('peerId', 'peerId', args(), scalar('ID')),
                            field('sdp', 'sdp', args(), scalar('String')),
                            field('state', 'state', args(), notNull(scalar('String')))
                        )))))
                )))
        );
const MediaOfferSelector = obj(
            field('mediaStreamOffer', 'mediaStreamOffer', args(fieldValue("id", refValue('id')), fieldValue("offer", refValue('offer')), fieldValue("peerId", refValue('peerId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('streams', 'streams', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('ice', 'ice', args(), notNull(list(notNull(scalar('String'))))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('peerId', 'peerId', args(), scalar('ID')),
                            field('sdp', 'sdp', args(), scalar('String')),
                            field('state', 'state', args(), notNull(scalar('String')))
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
            field('alphaOrganizationMemberAdd', 'alphaOrganizationMemberAdd', args(fieldValue("organizationId", refValue('organizationId')), fieldValue("userIds", refValue('userIds'))), notNull(list(notNull(obj(
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
            field('betaOrganizationMemberRemove', 'betaOrganizationMemberRemove', args(fieldValue("organizationId", refValue('organizationId')), fieldValue("userId", refValue('userId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
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
            field('createProfile', 'createProfile', args(fieldValue("input", refValue('input'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('about', 'about', args(), scalar('String')),
                    field('email', 'email', args(), scalar('String')),
                    field('firstName', 'firstName', args(), scalar('String')),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('lastName', 'lastName', args(), scalar('String')),
                    field('location', 'location', args(), scalar('String')),
                    field('phone', 'phone', args(), scalar('String')),
                    field('photoRef', 'photoRef', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('crop', 'crop', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('h', 'h', args(), notNull(scalar('Int'))),
                                    field('w', 'w', args(), notNull(scalar('Int'))),
                                    field('x', 'x', args(), notNull(scalar('Int'))),
                                    field('y', 'y', args(), notNull(scalar('Int')))
                                )),
                            field('uuid', 'uuid', args(), notNull(scalar('String')))
                        )),
                    field('website', 'website', args(), scalar('String'))
                )))
        );
const ProfileUpdateSelector = obj(
            field('profileUpdate', 'profileUpdate', args(fieldValue("input", refValue('input')), fieldValue("uid", refValue('uid'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('about', 'about', args(), scalar('String')),
                    field('alphaInvitedBy', 'invitedBy', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('name', 'name', args(), notNull(scalar('String')))
                        )),
                    field('alphaJoinedAt', 'joinedAt', args(), scalar('String')),
                    field('alphaPrimaryOrganizationId', 'primaryOrganizationId', args(), scalar('ID')),
                    field('alphaRole', 'role', args(), scalar('String')),
                    field('email', 'email', args(), scalar('String')),
                    field('facebook', 'facebook', args(), scalar('String')),
                    field('firstName', 'firstName', args(), scalar('String')),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('instagram', 'instagram', args(), scalar('String')),
                    field('lastName', 'lastName', args(), scalar('String')),
                    field('linkedin', 'linkedin', args(), scalar('String')),
                    field('location', 'location', args(), scalar('String')),
                    field('phone', 'phone', args(), scalar('String')),
                    field('photoRef', 'photoRef', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('crop', 'crop', args(), obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('h', 'h', args(), notNull(scalar('Int'))),
                                    field('w', 'w', args(), notNull(scalar('Int'))),
                                    field('x', 'x', args(), notNull(scalar('Int'))),
                                    field('y', 'y', args(), notNull(scalar('Int')))
                                )),
                            field('uuid', 'uuid', args(), notNull(scalar('String')))
                        )),
                    field('twitter', 'twitter', args(), scalar('String')),
                    field('website', 'website', args(), scalar('String'))
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
const ReportContentSelector = obj(
            field('reportContent', 'reportContent', args(fieldValue("contentId", refValue('contentId')), fieldValue("message", refValue('message')), fieldValue("type", refValue('type'))), scalar('Boolean'))
        );
const ReportOnlineSelector = obj(
            field('presenceReportOnline', 'presenceReportOnline', args(fieldValue("active", refValue('active')), fieldValue("platform", refValue('platform')), fieldValue("timeout", intValue(5000))), notNull(scalar('String')))
        );
const RoomAddMembersSelector = obj(
            field('alphaRoomInvite', 'alphaRoomInvite', args(fieldValue("invites", refValue('invites')), fieldValue("roomId", refValue('roomId'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('badge', 'badge', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('UserBadge', UserBadgeSelector)
                        )),
                    field('canKick', 'canKick', args(), notNull(scalar('Boolean'))),
                    field('membership', 'membership', args(), notNull(scalar('String'))),
                    field('role', 'role', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        )))
                )))))
        );
const RoomAlterFeaturedSelector = obj(
            field('betaRoomAlterFeatured', 'betaRoomAlterFeatured', args(fieldValue("featured", refValue('featured')), fieldValue("roomId", refValue('roomId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('featured', 'featured', args(), notNull(scalar('Boolean'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('listed', 'listed', args(), notNull(scalar('Boolean')))
                )))
        );
const RoomAlterHiddenSelector = obj(
            field('betaRoomAlterListed', 'betaRoomAlterListed', args(fieldValue("listed", refValue('listed')), fieldValue("roomId", refValue('roomId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('featured', 'featured', args(), notNull(scalar('Boolean'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('listed', 'listed', args(), notNull(scalar('Boolean')))
                )))
        );
const RoomChangeRoleSelector = obj(
            field('betaRoomChangeRole', 'betaRoomChangeRole', args(fieldValue("newRole", refValue('newRole')), fieldValue("roomId", refValue('roomId')), fieldValue("userId", refValue('userId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', RoomFullSelector)
                )))
        );
const RoomCreateSelector = obj(
            field('betaRoomCreate', 'room', args(fieldValue("channel", refValue('channel')), fieldValue("description", refValue('description')), fieldValue("kind", refValue('kind')), fieldValue("members", refValue('members')), fieldValue("message", refValue('message')), fieldValue("organizationId", refValue('organizationId')), fieldValue("photoRef", refValue('photoRef')), fieldValue("title", refValue('title'))), notNull(obj(
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
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )),
                    inline('SharedRoom', obj(
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
                    fragment('Room', RoomFullSelector)
                )))
        );
const RoomReadSelector = obj(
            field('roomRead', 'roomRead', args(fieldValue("id", refValue('id')), fieldValue("mid", refValue('mid'))), notNull(scalar('Boolean')))
        );
const RoomRenewInviteLinkSelector = obj(
            field('betaRoomInviteLinkRenew', 'link', args(fieldValue("roomId", refValue('roomId'))), notNull(scalar('String')))
        );
const RoomSettingsUpdateSelector = obj(
            field('betaRoomUpdateUserNotificationSettings', 'betaRoomUpdateUserNotificationSettings', args(fieldValue("roomId", refValue('roomId')), fieldValue("settings", refValue('settings'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('mute', 'mute', args(), scalar('Boolean'))
                )))
        );
const RoomUpdateSelector = obj(
            field('betaRoomUpdate', 'betaRoomUpdate', args(fieldValue("input", refValue('input')), fieldValue("roomId", refValue('roomId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('PrivateRoom', obj(
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )),
                    inline('SharedRoom', obj(
                        field('description', 'description', args(), scalar('String')),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('photo', 'photo', args(), notNull(scalar('String'))),
                        field('socialImage', 'socialImage', args(), scalar('String')),
                        field('title', 'title', args(), notNull(scalar('String')))
                    ))
                )))
        );
const RoomsInviteUserSelector = obj(
            field('betaRoomsInviteUser', 'rooms', args(fieldValue("roomIds", refValue('roomIds')), fieldValue("userId", refValue('userId'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', RoomShortSelector)
                )))))
        );
const RoomsJoinSelector = obj(
            field('betaRoomsJoin', 'join', args(fieldValue("roomsIds", refValue('roomsIds'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('PrivateRoom', obj(
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )),
                    inline('SharedRoom', obj(
                        field('id', 'id', args(), notNull(scalar('ID')))
                    ))
                )))))
        );
const SendMessageSelector = obj(
            field('sendMessage', 'sentMessage', args(fieldValue("chatId", refValue('chatId')), fieldValue("fileAttachments", refValue('fileAttachments')), fieldValue("mentions", refValue('mentions')), fieldValue("message", refValue('message')), fieldValue("repeatKey", refValue('repeatKey')), fieldValue("replyMessages", refValue('replyMessages')), fieldValue("spans", refValue('spans'))), notNull(scalar('Boolean')))
        );
const SendStickerSelector = obj(
            field('sendSticker', 'sendSticker', args(fieldValue("chatId", refValue('chatId')), fieldValue("repeatKey", refValue('repeatKey')), fieldValue("replyMessages", refValue('replyMessages')), fieldValue("stickerId", refValue('stickerId'))), notNull(scalar('Boolean')))
        );
const SetFeedChannelShortnameSelector = obj(
            field('alphaSetFeedChannelShortName', 'alphaSetFeedChannelShortName', args(fieldValue("id", refValue('id')), fieldValue("shortname", refValue('shortname'))), scalar('String'))
        );
const SetOrgShortnameSelector = obj(
            field('alphaSetOrgShortName', 'alphaSetOrgShortName', args(fieldValue("id", refValue('organizationId')), fieldValue("shortname", refValue('shortname'))), scalar('String'))
        );
const SetTypingSelector = obj(
            field('typingSend', 'typingSend', args(fieldValue("conversationId", refValue('conversationId')), fieldValue("type", stringValue("TEXT"))), notNull(scalar('String')))
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
            field('superAdminAdd', 'superAdminAdd', args(fieldValue("role", refValue('role')), fieldValue("userId", refValue('userId'))), notNull(scalar('String')))
        );
const SuperAdminRemoveSelector = obj(
            field('superAdminRemove', 'superAdminRemove', args(fieldValue("userId", refValue('userId'))), notNull(scalar('String')))
        );
const SuperBadgeCreateToRoomSelector = obj(
            field('superBadgeCreateToRoom', 'superBadgeCreateToRoom', args(fieldValue("name", refValue('name')), fieldValue("roomId", refValue('roomId')), fieldValue("userId", refValue('userId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('UserBadge', UserBadgeSelector)
                )))
        );
const SuperBadgeUnsetToRoomSelector = obj(
            field('superBadgeUnsetToRoom', 'superBadgeUnsetToRoom', args(fieldValue("badgeId", refValue('badgeId')), fieldValue("roomId", refValue('roomId')), fieldValue("userId", refValue('userId'))), notNull(scalar('Boolean')))
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
const UpdateAppSelector = obj(
            field('updateAppProfile', 'updateAppProfile', args(fieldValue("appId", refValue('appId')), fieldValue("input", refValue('input'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('AppProfile', AppFullSelector)
                )))
        );
const UpdateOrganizationSelector = obj(
            field('updateOrganizationProfile', 'updateOrganizationProfile', args(fieldValue("id", refValue('organizationId')), fieldValue("input", refValue('input'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('OrganizationProfile', OrganizationProfileFullSelector)
                )))
        );
const UpdateWelcomeMessageSelector = obj(
            field('updateWelcomeMessage', 'updateWelcomeMessage', args(fieldValue("roomId", refValue('roomId')), fieldValue("welcomeMessageIsOn", refValue('welcomeMessageIsOn')), fieldValue("welcomeMessageSender", refValue('welcomeMessageSender')), fieldValue("welcomeMessageText", refValue('welcomeMessageText'))), notNull(scalar('Boolean')))
        );
const UserStorageSetSelector = obj(
            field('userStorageSet', 'userStorageSet', args(fieldValue("data", refValue('data')), fieldValue("namespace", refValue('namespace'))), notNull(list(notNull(obj(
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
                        field('seq', 'seq', args(), notNull(scalar('Int'))),
                        field('state', 'state', args(), notNull(scalar('String'))),
                        field('update', 'update', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('ChatUpdate', ChatUpdateFragmentSelector)
                            )))
                    )),
                    inline('ChatUpdateBatch', obj(
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
            field('commentUpdates', 'event', args(fieldValue("fromState", refValue('fromState')), fieldValue("peerId", refValue('peerId'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('CommentUpdateSingle', obj(
                        field('seq', 'seq', args(), notNull(scalar('Int'))),
                        field('state', 'state', args(), notNull(scalar('String'))),
                        field('update', 'update', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('CommentUpdate', CommentUpdateFragmentSelector)
                            )))
                    )),
                    inline('CommentUpdateBatch', obj(
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
                            field('ice', 'ice', args(), notNull(list(notNull(scalar('String'))))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('peerId', 'peerId', args(), scalar('ID')),
                            field('sdp', 'sdp', args(), scalar('String')),
                            field('state', 'state', args(), notNull(scalar('String')))
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
            field('debugEvents', 'debugEvents', args(fieldValue("eventsCount", refValue('eventsCount')), fieldValue("fromState", refValue('fromState')), fieldValue("randomDelays", refValue('randomDelays')), fieldValue("seed", refValue('seed'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('key', 'key', args(), notNull(scalar('String'))),
                    field('seq', 'seq', args(), notNull(scalar('Int')))
                )))
        );
const DialogsWatchSelector = obj(
            field('dialogsUpdates', 'event', args(fieldValue("fromState", refValue('state'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('DialogUpdateSingle', obj(
                        field('seq', 'seq', args(), notNull(scalar('Int'))),
                        field('state', 'state', args(), notNull(scalar('String'))),
                        field('update', 'update', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('DialogUpdate', DialogUpdateFragmentSelector)
                            )))
                    )),
                    inline('DialogUpdateBatch', obj(
                        field('fromSeq', 'fromSeq', args(), notNull(scalar('Int'))),
                        field('seq', 'seq', args(), notNull(scalar('Int'))),
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
                    field('state', 'state', args(), notNull(scalar('String'))),
                    field('updates', 'updates', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('FeedUpdate', FeedUpdateFragmentSelector)
                        )))))
                )))
        );
const MyNotificationsCenterSelector = obj(
            field('notificationCenterUpdates', 'event', args(fieldValue("fromState", refValue('state'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('NotificationCenterUpdateSingle', obj(
                        field('seq', 'seq', args(), notNull(scalar('Int'))),
                        field('state', 'state', args(), notNull(scalar('String'))),
                        field('update', 'update', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('NotificationCenterUpdate', NotificationCenterUpdateFragmentSelector)
                            )))
                    )),
                    inline('NotificationCenterUpdateBatch', obj(
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
                    field('timeout', 'timeout', args(), notNull(scalar('Int'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('lastSeen', 'lastSeen', args(), scalar('String')),
                            field('online', 'online', args(), notNull(scalar('Boolean')))
                        )))
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
                    field('cancel', 'cancel', args(), notNull(scalar('Boolean'))),
                    field('chat', 'conversation', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            inline('PrivateRoom', obj(
                                field('id', 'id', args(), notNull(scalar('ID')))
                            )),
                            inline('SharedRoom', obj(
                                field('id', 'id', args(), notNull(scalar('ID')))
                            ))
                        ))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('name', 'name', args(), notNull(scalar('String'))),
                            field('photo', 'photo', args(), scalar('String'))
                        )))
                )))
        );
export const Operations: { [key: string]: OperationDefinition } = {
    Account: {
        kind: 'query',
        name: 'Account',
        body: 'query Account{me:me{__typename ...UserShort}myPermissions{__typename roles}sessionState:sessionState{__typename ...SessionStateFull}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment SessionStateFull on SessionState{__typename isAccountActivated isAccountExists isAccountPicked isBlocked isCompleted isLoggedIn isProfileCreated}',
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
        body: 'query AccountAppInviteInfo($inviteKey:String!){invite:alphaInviteInfo(key:$inviteKey){__typename creator{__typename ...UserShort}id}appInvite:appInviteInfo(key:$inviteKey){__typename inviter{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
        selector: AccountAppInviteInfoSelector
    },
    AccountInviteInfo: {
        kind: 'query',
        name: 'AccountInviteInfo',
        body: 'query AccountInviteInfo($inviteKey:String!){invite:alphaInviteInfo(key:$inviteKey){__typename creator{__typename ...UserShort}forEmail forName id joined key membersCount orgId organization{__typename about isCommunity:alphaIsCommunity id}photo title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
        selector: AccountInviteInfoSelector
    },
    AccountSettings: {
        kind: 'query',
        name: 'AccountSettings',
        body: 'query AccountSettings{me:me{__typename audienceSize ...UserShort}organizations:myOrganizations{__typename ...OrganizationShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
        selector: AccountSettingsSelector
    },
    AvailableRooms: {
        kind: 'query',
        name: 'AvailableRooms',
        body: 'query AvailableRooms{communities:alphaComunityPrefixSearch(first:3){__typename edges{__typename node{__typename ...CommunitySearch}}}isDiscoverDone:betaIsDiscoverDone suggestedRooms:betaSuggestedRooms{__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}availableChats:betaUserAvailableRooms(isChannel:false,limit:3){__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}availableChannels:betaUserAvailableRooms(isChannel:true,limit:3){__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}}fragment CommunitySearch on Organization{__typename about featured:alphaFeatured betaPublicRooms{__typename id}id isMine membersCount name photo status superAccountId}',
        selector: AvailableRoomsSelector
    },
    ChatInit: {
        kind: 'query',
        name: 'ChatInit',
        body: 'query ChatInit($before:ID,$chatId:ID!,$first:Int!){state:conversationState(id:$chatId){__typename state}lastReadedMessage(chatId:$chatId){__typename id}messages(before:$before,chatId:$chatId,first:$first){__typename ...FullMessage}room(id:$chatId){__typename ...RoomShort}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind matchmaking{__typename ...MatchmakingRoomFragment}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}',
        selector: ChatInitSelector
    },
    ChatInitFromUnread: {
        kind: 'query',
        name: 'ChatInitFromUnread',
        body: 'query ChatInitFromUnread($before:ID,$chatId:ID!,$first:Int!){state:conversationState(id:$chatId){__typename state}gammaMessages(before:$before,chatId:$chatId,first:$first){__typename haveMoreBackward haveMoreForward messages{__typename ...FullMessage}}lastReadedMessage(chatId:$chatId){__typename id}room(id:$chatId){__typename ...RoomShort}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind matchmaking{__typename ...MatchmakingRoomFragment}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}',
        selector: ChatInitFromUnreadSelector
    },
    ChatMembersSearch: {
        kind: 'query',
        name: 'ChatMembersSearch',
        body: 'query ChatMembersSearch($after:String,$cid:ID!,$first:Int!,$query:String){members:chatMembersSearch(after:$after,cid:$cid,first:$first,query:$query){__typename edges{__typename cursor user:node{__typename id name photo primaryOrganization{__typename id name}shortname}}pageInfo{__typename hasNextPage}}}',
        selector: ChatMembersSearchSelector
    },
    ChatMentionSearch: {
        kind: 'query',
        name: 'ChatMentionSearch',
        body: 'query ChatMentionSearch($after:String,$cid:ID!,$first:Int!,$query:String){mentions:chatMentionSearch(after:$after,cid:$cid,first:$first,query:$query){__typename cursor globalItems{__typename ... on Organization{...OrganizationShort}... on User{...UserForMention}... on SharedRoom{...RoomSharedNano}}localItems{__typename ...UserForMention}}}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}',
        selector: ChatMentionSearchSelector
    },
    Comments: {
        kind: 'query',
        name: 'Comments',
        body: 'query Comments($peerId:ID!){comments(peerId:$peerId){__typename comments{__typename ...CommentEntryFragment}count id state{__typename state}}}fragment CommentEntryFragment on CommentEntry{__typename comment:betaComment{__typename id ...FullMessage}childComments{__typename id}deleted id parentComment{__typename comment:betaComment{__typename id message}id}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}',
        selector: CommentsSelector
    },
    Conference: {
        kind: 'query',
        name: 'Conference',
        body: 'query Conference($id:ID!){conference(id:$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename iceServers{__typename credential urls username}id peers{__typename connection{__typename ice sdp state}id user{__typename ...UserShort}}startTime}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
        selector: ConferenceSelector
    },
    ConferenceMedia: {
        kind: 'query',
        name: 'ConferenceMedia',
        body: 'query ConferenceMedia($id:ID!,$peerId:ID!){conferenceMedia(id:$id,peerId:$peerId){__typename iceServers{__typename credential urls username}id streams{__typename ice id peerId sdp state}}}',
        selector: ConferenceMediaSelector
    },
    Dialogs: {
        kind: 'query',
        name: 'Dialogs',
        body: 'query Dialogs($after:String){counter:alphaNotificationCounter{__typename id unreadCount}dialogs(after:$after,first:20){__typename cursor items{__typename topMessage:alphaTopMessage{__typename ...DaialogListMessage}cid fid haveMention id isChannel isMuted kind photo title unreadCount}}state:dialogsState{__typename state}}fragment DaialogListMessage on ModernMessage{__typename date fallback id message sender{__typename firstName id name}senderBadge{__typename ...UserBadge}... on GeneralMessage{attachments{__typename fallback id ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat isImage}id}}id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename id}}}fragment UserBadge on UserBadge{__typename id name verified}',
        selector: DialogsSelector
    },
    DiscoverIsDone: {
        kind: 'query',
        name: 'DiscoverIsDone',
        body: 'query DiscoverIsDone{betaIsDiscoverDone}',
        selector: DiscoverIsDoneSelector
    },
    DiscoverNextPage: {
        kind: 'query',
        name: 'DiscoverNextPage',
        body: 'query DiscoverNextPage($excudedGroupsIds:[String!]!,$selectedTagsIds:[String!]!){betaNextDiscoverPage:gammaNextDiscoverPage(excudedGroupsIds:$excudedGroupsIds,selectedTagsIds:$selectedTagsIds){__typename chats{__typename ...RoomShort}tagGroup{__typename id subtitle tags{__typename id title}title}}}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind matchmaking{__typename ...MatchmakingRoomFragment}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}',
        selector: DiscoverNextPageSelector
    },
    ExploreCommunity: {
        kind: 'query',
        name: 'ExploreCommunity',
        body: 'query ExploreCommunity($after:String,$featuredIfEmptyQuery:Boolean,$page:Int,$query:String,$sort:String){items:alphaComunityPrefixSearch(after:$after,featuredIfEmptyQuery:$featuredIfEmptyQuery,first:25,page:$page,query:$query,sort:$sort){__typename edges{__typename cursor node{__typename ...CommunitySearch}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment CommunitySearch on Organization{__typename about featured:alphaFeatured betaPublicRooms{__typename id}id isMine membersCount name photo status superAccountId}',
        selector: ExploreCommunitySelector
    },
    ExplorePeople: {
        kind: 'query',
        name: 'ExplorePeople',
        body: 'query ExplorePeople($after:String,$page:Int,$query:String,$sort:String){items:userSearch(after:$after,first:25,page:$page,query:$query,sort:$sort){__typename edges{__typename cursor node{__typename isYou ...UserShort}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
        selector: ExplorePeopleSelector
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
        body: 'query FeedChannel($id:ID!){channel:alphaFeedChannel(id:$id){__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo postsCount shortname socialImage subscribed subscribersCount title}',
        selector: FeedChannelSelector
    },
    FeedChannelContent: {
        kind: 'query',
        name: 'FeedChannelContent',
        body: 'query FeedChannelContent($after:String,$first:Int!,$id:ID!){content:alphaFeedChannelContent(after:$after,first:$first,id:$id){__typename cursor items{__typename ...FeedItemFull}}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{author{__typename ...FeedPostAuthorFragment}canEdit commentsCount date edited fallback id message reactions{__typename reaction user{__typename ...UserShort}}slides{__typename ...SlideFragment}source{__typename ...FeedPostSourceFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{...UserShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment SlideFragment on Slide{__typename ... on TextSlide{attachments{__typename ... on User{...UserShort}... on SharedRoom{canSendMessage id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}... on Organization{...OrganizationShort}}cover{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}coverAlign id spans{__typename ...SpanFragment}text}}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo postsCount shortname socialImage subscribed subscribersCount title}',
        selector: FeedChannelContentSelector
    },
    FeedChannelSubscribers: {
        kind: 'query',
        name: 'FeedChannelSubscribers',
        body: 'query FeedChannelSubscribers($after:String,$channelId:ID!,$first:Int!,$query:String){subscribers:alphaFeedChannelSubscribers(after:$after,channelId:$channelId,first:$first,query:$query){__typename edges{__typename cursor node{__typename role user{__typename ...UserShort}}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
        selector: FeedChannelSubscribersSelector
    },
    FeedChannelWriters: {
        kind: 'query',
        name: 'FeedChannelWriters',
        body: 'query FeedChannelWriters($after:ID,$first:Int!,$id:ID!){writers:alphaFeedChannelAdmins(after:$after,first:$first,id:$id){__typename cursor items{__typename role user{__typename ...UserShort}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
        selector: FeedChannelWritersSelector
    },
    FeedChannelsSearch: {
        kind: 'query',
        name: 'FeedChannelsSearch',
        body: 'query FeedChannelsSearch($after:String,$first:Int!,$query:String,$sort:String){search:alphaFeedChannelSearch(after:$after,first:$first,query:$query,sort:$sort){__typename edges{__typename cursor node{__typename ...FeedChannelFull}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo postsCount shortname socialImage subscribed subscribersCount title}',
        selector: FeedChannelsSearchSelector
    },
    FeedItem: {
        kind: 'query',
        name: 'FeedItem',
        body: 'query FeedItem($id:ID!){item:alphaFeedItem(id:$id){__typename ...FeedItemFull}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{author{__typename ...FeedPostAuthorFragment}canEdit commentsCount date edited fallback id message reactions{__typename reaction user{__typename ...UserShort}}slides{__typename ...SlideFragment}source{__typename ...FeedPostSourceFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{...UserShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment SlideFragment on Slide{__typename ... on TextSlide{attachments{__typename ... on User{...UserShort}... on SharedRoom{canSendMessage id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}... on Organization{...OrganizationShort}}cover{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}coverAlign id spans{__typename ...SpanFragment}text}}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo postsCount shortname socialImage subscribed subscribersCount title}',
        selector: FeedItemSelector
    },
    FeedLoadMore: {
        kind: 'query',
        name: 'FeedLoadMore',
        body: 'query FeedLoadMore($after:String,$first:Int!){feed:alphaHomeFeed(after:$after,first:$first){__typename cursor items{__typename ...FeedItemFull}}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{author{__typename ...FeedPostAuthorFragment}canEdit commentsCount date edited fallback id message reactions{__typename reaction user{__typename ...UserShort}}slides{__typename ...SlideFragment}source{__typename ...FeedPostSourceFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{...UserShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment SlideFragment on Slide{__typename ... on TextSlide{attachments{__typename ... on User{...UserShort}... on SharedRoom{canSendMessage id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}... on Organization{...OrganizationShort}}cover{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}coverAlign id spans{__typename ...SpanFragment}text}}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo postsCount shortname socialImage subscribed subscribersCount title}',
        selector: FeedLoadMoreSelector
    },
    FeedRecommendedChannels: {
        kind: 'query',
        name: 'FeedRecommendedChannels',
        body: 'query FeedRecommendedChannels($after:String,$first:Int!){search:alphaRecommendedChannels(after:$after,first:$first){__typename edges{__typename cursor node{__typename ...FeedChannelFull}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo postsCount shortname socialImage subscribed subscribersCount title}',
        selector: FeedRecommendedChannelsSelector
    },
    FeedSubscriptions: {
        kind: 'query',
        name: 'FeedSubscriptions',
        body: 'query FeedSubscriptions($after:ID,$first:Int!){channels:alphaFeedMySubscriptions(after:$after,first:$first){__typename cursor items{__typename ...FeedChannelFull}}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo postsCount shortname socialImage subscribed subscribersCount title}',
        selector: FeedSubscriptionsSelector
    },
    FeedWritableChannels: {
        kind: 'query',
        name: 'FeedWritableChannels',
        body: 'query FeedWritableChannels($after:ID,$first:Int!){channels:alphaWritableChannels(after:$after,first:$first){__typename cursor items{__typename ...FeedChannelFull}}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo postsCount shortname socialImage subscribed subscribersCount title}',
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
        body: 'query GlobalSearch($kinds:[GlobalSearchEntryKind!],$query:String!){items:alphaGlobalSearch(kinds:$kinds,query:$query){__typename ... on Organization{about isCommunity:alphaIsCommunity id name photo shortname}... on User{...UserShort}... on SharedRoom{canSendMessage id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
        selector: GlobalSearchSelector
    },
    InitFeed: {
        kind: 'query',
        name: 'InitFeed',
        body: 'query InitFeed($first:Int!){drafts:alphaFeedMyDraftsChannel{__typename ...FeedChannelFull}feed:alphaHomeFeed(first:$first){__typename cursor items{__typename ...FeedItemFull}}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo postsCount shortname socialImage subscribed subscribersCount title}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{author{__typename ...FeedPostAuthorFragment}canEdit commentsCount date edited fallback id message reactions{__typename reaction user{__typename ...UserShort}}slides{__typename ...SlideFragment}source{__typename ...FeedPostSourceFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{...UserShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment SlideFragment on Slide{__typename ... on TextSlide{attachments{__typename ... on User{...UserShort}... on SharedRoom{canSendMessage id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}... on Organization{...OrganizationShort}}cover{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}coverAlign id spans{__typename ...SpanFragment}text}}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{...FeedChannelFull}}',
        selector: InitFeedSelector
    },
    MatchmakingProfile: {
        kind: 'query',
        name: 'MatchmakingProfile',
        body: 'query MatchmakingProfile($peerId:ID!,$uid:ID!){matchmakingProfile(peerId:$peerId,uid:$uid){__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}',
        selector: MatchmakingProfileSelector
    },
    MatchmakingRoom: {
        kind: 'query',
        name: 'MatchmakingRoom',
        body: 'query MatchmakingRoom($peerId:ID!){matchmakingRoom(peerId:$peerId){__typename ...MatchmakingRoomFragment}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}',
        selector: MatchmakingRoomSelector
    },
    Message: {
        kind: 'query',
        name: 'Message',
        body: 'query Message($messageId:ID!){message(messageId:$messageId){__typename ...FullMessage}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}',
        selector: MessageSelector
    },
    MessagesBatch: {
        kind: 'query',
        name: 'MessagesBatch',
        body: 'query MessagesBatch($after:ID,$before:ID,$chatId:ID!,$first:Int!){state:conversationState(id:$chatId){__typename state}gammaMessages(after:$after,before:$before,chatId:$chatId,first:$first){__typename haveMoreBackward haveMoreForward messages{__typename ...FullMessage}}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}',
        selector: MessagesBatchSelector
    },
    MessagesSearch: {
        kind: 'query',
        name: 'MessagesSearch',
        body: 'query MessagesSearch($after:String,$first:Int!,$query:String!,$sort:String){messagesSearch(after:$after,first:$first,query:$query,sort:$sort){__typename edges{__typename cursor node{__typename chat{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{canEdit id isChannel kind membership photo role settings{__typename id mute}title}}message{__typename date fallback id message sender{__typename firstName id name photo}senderBadge{__typename ...UserBadge}... on GeneralMessage{attachments{__typename fallback id ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat isImage}id}}id quotedMessages{__typename id}}}}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}fragment UserBadge on UserBadge{__typename id name verified}',
        selector: MessagesSearchSelector
    },
    MyApps: {
        kind: 'query',
        name: 'MyApps',
        body: 'query MyApps{apps:myApps{__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}',
        selector: MyAppsSelector
    },
    MyCards: {
        kind: 'query',
        name: 'MyCards',
        body: 'query MyCards{myCards{__typename brand expMonth expYear id last4}}',
        selector: MyCardsSelector
    },
    MyNotificationCenter: {
        kind: 'query',
        name: 'MyNotificationCenter',
        body: 'query MyNotificationCenter{myNotificationCenter{__typename id state{__typename state}unread}}',
        selector: MyNotificationCenterSelector
    },
    MyNotifications: {
        kind: 'query',
        name: 'MyNotifications',
        body: 'query MyNotifications($before:ID,$first:Int!){myNotifications(before:$before,first:$first){__typename cursor items{__typename ...NotificationFragment}}}fragment NotificationFragment on Notification{__typename content{__typename ... on NewCommentNotification{comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{chat{__typename ...RoomNano}message{__typename ... on GeneralMessage{fallback id message sender{__typename id name}senderBadge{__typename ...UserBadge}}}}... on CommentPeerRootFeedItem{item{__typename ...FeedItemFull}}}subscription{__typename type}}}... on NewMatchmakingProfilesNotification{profiles{__typename ...MatchmakingProfileFragment}room{__typename peer{__typename ... on SharedRoom{...RoomNano}}}}}id text}fragment CommentEntryFragment on CommentEntry{__typename comment:betaComment{__typename id ...FullMessage}childComments{__typename id}deleted id parentComment{__typename comment:betaComment{__typename id message}id}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{author{__typename ...FeedPostAuthorFragment}canEdit commentsCount date edited fallback id message reactions{__typename reaction user{__typename ...UserShort}}slides{__typename ...SlideFragment}source{__typename ...FeedPostSourceFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{...UserShort}}fragment SlideFragment on Slide{__typename ... on TextSlide{attachments{__typename ... on User{...UserShort}... on SharedRoom{canSendMessage id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}... on Organization{...OrganizationShort}}cover{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}coverAlign id spans{__typename ...SpanFragment}text}}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo postsCount shortname socialImage subscribed subscribersCount title}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}',
        selector: MyNotificationsSelector
    },
    MyOrganizations: {
        kind: 'query',
        name: 'MyOrganizations',
        body: 'query MyOrganizations{myOrganizations{__typename isPrimary:betaIsPrimary ...OrganizationShort}}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
        selector: MyOrganizationsSelector
    },
    MyStickers: {
        kind: 'query',
        name: 'MyStickers',
        body: 'query MyStickers{stickers:myStickers{__typename packs{__typename id stickers{__typename ...StickerFragment}title}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}',
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
        body: 'query MyWallet{myAccount{__typename balance id}}',
        selector: MyWalletSelector
    },
    OauthContext: {
        kind: 'query',
        name: 'OauthContext',
        body: 'query OauthContext($code:String!){context:oauthContext(code:$code){__typename app{__typename id image{__typename crop{__typename h w x y}uuid}scopes title}code redirectUrl state}}',
        selector: OauthContextSelector
    },
    Online: {
        kind: 'query',
        name: 'Online',
        body: 'query Online($userId:ID!){user:user(id:$userId){__typename id isBot lastSeen online}}',
        selector: OnlineSelector
    },
    Organization: {
        kind: 'query',
        name: 'Organization',
        body: 'query Organization($organizationId:ID!){organization(id:$organizationId){__typename ...OrganizationFull}}fragment OrganizationFull on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity isPrivate:alphaIsPrivate requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}members:alphaOrganizationMembers{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id instagram isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment UserFull on User{__typename about audienceSize email facebook firstName id instagram isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind matchmaking{__typename ...MatchmakingRoomFragment}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}',
        selector: OrganizationSelector
    },
    OrganizationByPrefix: {
        kind: 'query',
        name: 'OrganizationByPrefix',
        body: 'query OrganizationByPrefix($query:String!){organizationByPrefix:alphaOrganizationByPrefix(query:$query){__typename ...OrganizationSearch}}fragment OrganizationSearch on Organization{__typename about featured:alphaFeatured members:alphaOrganizationMembers{__typename user{__typename id name photo}}id isMine membersCount name photo status superAccountId}',
        selector: OrganizationByPrefixSelector
    },
    OrganizationMembers: {
        kind: 'query',
        name: 'OrganizationMembers',
        body: 'query OrganizationMembers($after:ID,$first:Int,$organizationId:ID!){organization(id:$organizationId){__typename members:alphaOrganizationMembers(after:$after,first:$first){__typename role user{__typename ...UserShort}}id}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
        selector: OrganizationMembersSelector
    },
    OrganizationMembersShort: {
        kind: 'query',
        name: 'OrganizationMembersShort',
        body: 'query OrganizationMembersShort($organizationId:ID!){organization(id:$organizationId){__typename members:alphaOrganizationMembers{__typename user{__typename id}}...OrganizationWithoutMembersFragment}}fragment OrganizationWithoutMembersFragment on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity isPrivate:alphaIsPrivate requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id instagram isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment UserFull on User{__typename about audienceSize email facebook firstName id instagram isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind matchmaking{__typename ...MatchmakingRoomFragment}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}',
        selector: OrganizationMembersShortSelector
    },
    OrganizationProfile: {
        kind: 'query',
        name: 'OrganizationProfile',
        body: 'query OrganizationProfile($organizationId:ID!){organizationProfile(id:$organizationId){__typename ...OrganizationProfileFull}}fragment OrganizationProfileFull on OrganizationProfile{__typename about editorial:alphaEditorial featured:alphaFeatured private:alphaIsPrivate published:alphaPublished facebook id instagram linkedin name photoRef{__typename crop{__typename h w x y}uuid}shortname twitter website websiteTitle}',
        selector: OrganizationProfileSelector
    },
    OrganizationPublicInvite: {
        kind: 'query',
        name: 'OrganizationPublicInvite',
        body: 'query OrganizationPublicInvite($organizationId:ID){publicInvite:alphaOrganizationInviteLink(organizationId:$organizationId){__typename id key ttl}}',
        selector: OrganizationPublicInviteSelector
    },
    OrganizationWithoutMembers: {
        kind: 'query',
        name: 'OrganizationWithoutMembers',
        body: 'query OrganizationWithoutMembers($organizationId:ID!){organization(id:$organizationId){__typename ...OrganizationWithoutMembersFragment}}fragment OrganizationWithoutMembersFragment on Organization{__typename about featured:alphaFeatured isCommunity:alphaIsCommunity isPrivate:alphaIsPrivate requests:alphaOrganizationMemberRequests{__typename role user{__typename ...UserFull}}isAdmin:betaIsAdmin isOwner:betaIsOwner rooms:betaPublicRooms{__typename ...RoomShort}facebook id instagram isMine linkedin membersCount name photo shortname superAccountId twitter website}fragment UserFull on User{__typename about audienceSize email facebook firstName id instagram isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind matchmaking{__typename ...MatchmakingRoomFragment}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}',
        selector: OrganizationWithoutMembersSelector
    },
    Permissions: {
        kind: 'query',
        name: 'Permissions',
        body: 'query Permissions{myPermissions{__typename roles}}',
        selector: PermissionsSelector
    },
    Profile: {
        kind: 'query',
        name: 'Profile',
        body: 'query Profile{user:me{__typename id shortname}profile:myProfile{__typename about invitedBy:alphaInvitedBy{__typename id name}joinedAt:alphaJoinedAt role:alphaRole email facebook firstName id instagram lastName linkedin location phone photoRef{__typename crop{__typename h w x y}uuid}primaryOrganization{__typename id membersCount name}twitter website}}',
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
        body: 'query ResolveShortName($shortname:String!){item:alphaResolveShortName(shortname:$shortname){__typename ... on User{id isDeleted}... on Organization{id isDeleted}... on FeedChannel{id}}}',
        selector: ResolveShortNameSelector
    },
    ResolvedInvite: {
        kind: 'query',
        name: 'ResolvedInvite',
        body: 'query ResolvedInvite($key:String!){invite:alphaResolveInvite(key:$key){__typename ... on InviteInfo{creator{__typename ...UserShort}id orgId organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo}title}... on AppInvite{inviter{__typename ...UserShort}}... on RoomInvite{id invitedByUser{__typename ...UserShort}room{__typename ... on SharedRoom{description id isChannel kind matchmaking{__typename enabled}membersCount membership photo socialImage title}}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
        selector: ResolvedInviteSelector
    },
    Room: {
        kind: 'query',
        name: 'Room',
        body: 'query Room($id:ID!){room(id:$id){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description featuredMembersCount id isChannel kind matchmaking{__typename ...MatchmakingRoomFragment}members{__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}fragment OrganizationMedium on Organization{__typename about isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo shortname}',
        selector: RoomSelector
    },
    RoomChat: {
        kind: 'query',
        name: 'RoomChat',
        body: 'query RoomChat($id:ID!){room(id:$id){__typename ... on PrivateRoom{id pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename id isBot name photo primaryOrganization{__typename id name}shortname}}... on SharedRoom{canEdit id isChannel kind matchmaking{__typename ...MatchmakingRoomFragment}membersCount membership organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}fragment OrganizationMedium on Organization{__typename about isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo shortname}',
        selector: RoomChatSelector
    },
    RoomFeaturedMembers: {
        kind: 'query',
        name: 'RoomFeaturedMembers',
        body: 'query RoomFeaturedMembers($roomId:ID!){roomFeaturedMembers(roomId:$roomId){__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}}fragment UserBadge on UserBadge{__typename id name verified}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
        selector: RoomFeaturedMembersSelector
    },
    RoomInviteInfo: {
        kind: 'query',
        name: 'RoomInviteInfo',
        body: 'query RoomInviteInfo($invite:String!){invite:betaRoomInviteInfo(invite:$invite){__typename id invitedByUser{__typename ...UserShort}room{__typename ... on SharedRoom{description id isChannel kind matchmaking{__typename enabled}membersCount membership organization{__typename ...OrganizationShort}photo socialImage title}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
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
        body: 'query RoomMembers($roomId:ID!){members:roomMembers(roomId:$roomId){__typename canKick membership role user{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
        selector: RoomMembersSelector
    },
    RoomMembersPaginated: {
        kind: 'query',
        name: 'RoomMembersPaginated',
        body: 'query RoomMembersPaginated($after:ID,$first:Int,$roomId:ID!){members:roomMembers(after:$after,first:$first,roomId:$roomId){__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}}fragment UserBadge on UserBadge{__typename id name verified}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
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
        body: 'query RoomMembersTiny($roomId:ID!){members:roomMembers(roomId:$roomId){__typename user{__typename id name photo primaryOrganization{__typename id name}shortname}}}',
        selector: RoomMembersTinySelector
    },
    RoomOrganizationAdminMembers: {
        kind: 'query',
        name: 'RoomOrganizationAdminMembers',
        body: 'query RoomOrganizationAdminMembers($id:ID!){room(id:$id){__typename ... on SharedRoom{id organization{__typename adminMembers:alphaOrganizationAdminMembers{__typename role user{__typename ...UserShort}}id}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
        selector: RoomOrganizationAdminMembersSelector
    },
    RoomPico: {
        kind: 'query',
        name: 'RoomPico',
        body: 'query RoomPico($id:ID!){room(id:$id){__typename ...RoomNano}}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}',
        selector: RoomPicoSelector
    },
    RoomSearch: {
        kind: 'query',
        name: 'RoomSearch',
        body: 'query RoomSearch($page:Int,$query:String,$sort:String){items:betaRoomSearch(first:25,page:$page,query:$query,sort:$sort){__typename edges{__typename cursor node{__typename ... on SharedRoom{id isChannel kind membersCount membership organization{__typename id name photo}photo title}}}pageInfo{__typename currentPage hasNextPage hasPreviousPage itemsCount openEnded pagesCount}}}',
        selector: RoomSearchSelector
    },
    RoomSuper: {
        kind: 'query',
        name: 'RoomSuper',
        body: 'query RoomSuper($id:ID!){roomSuper(id:$id){__typename featured id listed}}',
        selector: RoomSuperSelector
    },
    RoomTiny: {
        kind: 'query',
        name: 'RoomTiny',
        body: 'query RoomTiny($id:ID!){room(id:$id){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind matchmaking{__typename ...MatchmakingRoomFragment}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}',
        selector: RoomTinySelector
    },
    RoomWithoutMembers: {
        kind: 'query',
        name: 'RoomWithoutMembers',
        body: 'query RoomWithoutMembers($id:ID!){room(id:$id){__typename ...RoomFullWithoutMembers}}fragment RoomFullWithoutMembers on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description featuredMembersCount id isChannel kind matchmaking{__typename ...MatchmakingRoomFragment}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}fragment OrganizationMedium on Organization{__typename about isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo shortname}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}',
        selector: RoomWithoutMembersSelector
    },
    Settings: {
        kind: 'query',
        name: 'Settings',
        body: 'query Settings{settings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename countUnreadChats desktop{__typename ...PlatformNotificationSettingsFull}emailFrequency excludeMutedChats id mobile{__typename ...PlatformNotificationSettingsFull}primaryEmail}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename comments{__typename showNotification sound}communityChat{__typename showNotification sound}direct{__typename showNotification sound}notificationPreview organizationChat{__typename showNotification sound}secretChat{__typename showNotification sound}}',
        selector: SettingsSelector
    },
    SharedMedia: {
        kind: 'query',
        name: 'SharedMedia',
        body: 'query SharedMedia($after:String,$chatId:ID!,$first:Int!,$mediaTypes:[SharedMediaType!]!){sharedMedia:chatSharedMedia(after:$after,chatId:$chatId,first:$first,mediaTypes:$mediaTypes){__typename edges{__typename cursor node{__typename message{__typename ... on GeneralMessage{attachments{__typename ... on MessageAttachmentFile{fallback fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{id image{__typename url}imageFallback{__typename photo}imagePreview text title titleLink}}date fallback id sender{__typename id name}}}}}pageInfo{__typename currentPage hasNextPage}}}',
        selector: SharedMediaSelector
    },
    SharedMediaCounters: {
        kind: 'query',
        name: 'SharedMediaCounters',
        body: 'query SharedMediaCounters($chatId:ID!){counters:chatSharedMediaCounters(chatId:$chatId){__typename documents images links videos}}',
        selector: SharedMediaCountersSelector
    },
    StickerPack: {
        kind: 'query',
        name: 'StickerPack',
        body: 'query StickerPack($id:ID!){stickerPack(id:$id){__typename ...StickerPackFragment}}fragment StickerPackFragment on StickerPack{__typename id stickers{__typename ...StickerFragment}title}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}',
        selector: StickerPackSelector
    },
    SuggestedRooms: {
        kind: 'query',
        name: 'SuggestedRooms',
        body: 'query SuggestedRooms{isDiscoverDone:betaIsDiscoverDone suggestedRooms:betaSuggestedRooms{__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}}',
        selector: SuggestedRoomsSelector
    },
    SuperAccount: {
        kind: 'query',
        name: 'SuperAccount',
        body: 'query SuperAccount($accountId:ID!,$viaOrgId:Boolean){superAccount(id:$accountId,viaOrgId:$viaOrgId){__typename published:alphaPublished createdAt createdBy{__typename id name}features{__typename id key title}id members{__typename ...UserShort}orgId state title}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
        selector: SuperAccountSelector
    },
    SuperAccounts: {
        kind: 'query',
        name: 'SuperAccounts',
        body: 'query SuperAccounts{superAccounts{__typename createdAt id orgId state title}}',
        selector: SuperAccountsSelector
    },
    SuperAdmins: {
        kind: 'query',
        name: 'SuperAdmins',
        body: 'query SuperAdmins{superAdmins{__typename email role user{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
        selector: SuperAdminsSelector
    },
    SuperBadgeInRoom: {
        kind: 'query',
        name: 'SuperBadgeInRoom',
        body: 'query SuperBadgeInRoom($roomId:ID!,$userId:ID!){superBadgeInRoom(roomId:$roomId,userId:$userId){__typename ...UserBadge}}fragment UserBadge on UserBadge{__typename id name verified}',
        selector: SuperBadgeInRoomSelector
    },
    User: {
        kind: 'query',
        name: 'User',
        body: 'query User($userId:ID!){conversation:room(id:$userId){__typename ... on PrivateRoom{id settings{__typename id mute}}}user:user(id:$userId){__typename chatsWithBadge{__typename badge{__typename ...UserBadge}chat{__typename ...RoomShort}}...UserFull}}fragment UserBadge on UserBadge{__typename id name verified}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind matchmaking{__typename ...MatchmakingRoomFragment}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}fragment UserFull on User{__typename about audienceSize email facebook firstName id instagram isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}',
        selector: UserSelector
    },
    UserAvailableRooms: {
        kind: 'query',
        name: 'UserAvailableRooms',
        body: 'query UserAvailableRooms($after:ID,$isChannel:Boolean,$limit:Int!){betaUserAvailableRooms(after:$after,isChannel:$isChannel,limit:$limit){__typename ... on SharedRoom{id kind membersCount membership organization{__typename id name photo}photo title}}}',
        selector: UserAvailableRoomsSelector
    },
    UserStorage: {
        kind: 'query',
        name: 'UserStorage',
        body: 'query UserStorage($keys:[String!]!,$namespace:String!){userStorage(keys:$keys,namespace:$namespace){__typename id key value}}',
        selector: UserStorageSelector
    },
    Users: {
        kind: 'query',
        name: 'Users',
        body: 'query Users($query:String!){items:users(query:$query){__typename subtitle:email id title:name}}',
        selector: UsersSelector
    },
    WalletTransactions: {
        kind: 'query',
        name: 'WalletTransactions',
        body: 'query WalletTransactions($after:String,$first:Int!,$id:ID!){walletTransactions(after:$after,first:$first,id:$id){__typename cursor items{__typename amount id readableState state}}}',
        selector: WalletTransactionsSelector
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
        body: 'mutation AddAppToChat($appId:ID!,$chatId:ID!){addAppToChat(appId:$appId,chatId:$chatId){__typename ...AppChat}}fragment AppChat on AppChat{__typename chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}webhook}',
        selector: AddAppToChatSelector
    },
    AddComment: {
        kind: 'mutation',
        name: 'AddComment',
        body: 'mutation AddComment($fileAttachments:[FileAttachmentInput!],$mentions:[MentionInput!],$message:String,$peerId:ID!,$repeatKey:String,$replyComment:ID,$spans:[MessageSpanInput!]){betaAddComment(fileAttachments:$fileAttachments,mentions:$mentions,message:$message,peerId:$peerId,repeatKey:$repeatKey,replyComment:$replyComment,spans:$spans){__typename id}}',
        selector: AddCommentSelector
    },
    AddStickerComment: {
        kind: 'mutation',
        name: 'AddStickerComment',
        body: 'mutation AddStickerComment($peerId:ID!,$repeatKey:String,$replyComment:ID,$stickerId:ID!){addStickerComment:betaAddStickerComment(peerId:$peerId,repeatKey:$repeatKey,replyComment:$replyComment,stickerId:$stickerId){__typename id}}',
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
        body: 'mutation BetaSubmitNextDiscover($excudedGroupsIds:[String!]!,$selectedTagsIds:[String!]!){betaSubmitNextDiscover(excudedGroupsIds:$excudedGroupsIds,selectedTagsIds:$selectedTagsIds){__typename tagGroup{__typename id}}}',
        selector: BetaSubmitNextDiscoverSelector
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
        body: 'mutation ConferenceAnswer($answer:String!,$id:ID!,$ownPeerId:ID!,$peerId:ID!){peerConnectionAnswer(answer:$answer,id:$id,ownPeerId:$ownPeerId,peerId:$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}',
        selector: ConferenceAnswerSelector
    },
    ConferenceCandidate: {
        kind: 'mutation',
        name: 'ConferenceCandidate',
        body: 'mutation ConferenceCandidate($candidate:String!,$id:ID!,$ownPeerId:ID!,$peerId:ID!){peerConnectionCandidate(candidate:$candidate,id:$id,ownPeerId:$ownPeerId,peerId:$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}',
        selector: ConferenceCandidateSelector
    },
    ConferenceJoin: {
        kind: 'mutation',
        name: 'ConferenceJoin',
        body: 'mutation ConferenceJoin($id:ID!){conferenceJoin(id:$id){__typename conference{__typename ...ConferenceShort}peerId}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}',
        selector: ConferenceJoinSelector
    },
    ConferenceKeepAlive: {
        kind: 'mutation',
        name: 'ConferenceKeepAlive',
        body: 'mutation ConferenceKeepAlive($id:ID!,$peerId:ID!){conferenceKeepAlive(id:$id,peerId:$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}',
        selector: ConferenceKeepAliveSelector
    },
    ConferenceLeave: {
        kind: 'mutation',
        name: 'ConferenceLeave',
        body: 'mutation ConferenceLeave($id:ID!,$peerId:ID!){conferenceLeave(id:$id,peerId:$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}',
        selector: ConferenceLeaveSelector
    },
    ConferenceOffer: {
        kind: 'mutation',
        name: 'ConferenceOffer',
        body: 'mutation ConferenceOffer($id:ID!,$offer:String!,$ownPeerId:ID!,$peerId:ID!){peerConnectionOffer(id:$id,offer:$offer,ownPeerId:$ownPeerId,peerId:$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename iceServers{__typename credential urls username}id startTime}',
        selector: ConferenceOfferSelector
    },
    CreateApp: {
        kind: 'mutation',
        name: 'CreateApp',
        body: 'mutation CreateApp($about:String,$name:String!,$photoRef:ImageRefInput,$shortname:String){createApp(about:$about,name:$name,photoRef:$photoRef,shortname:$shortname){__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}',
        selector: CreateAppSelector
    },
    CreateCardSetupIntent: {
        kind: 'mutation',
        name: 'CreateCardSetupIntent',
        body: 'mutation CreateCardSetupIntent($retryKey:String!){cardCreateSetupIntent(retryKey:$retryKey){__typename clientSecret id}}',
        selector: CreateCardSetupIntentSelector
    },
    CreateDepositIntent: {
        kind: 'mutation',
        name: 'CreateDepositIntent',
        body: 'mutation CreateDepositIntent($amount:Int!,$cardId:ID!,$retryKey:String!){cardDepositIntent(amount:$amount,id:$cardId,retryKey:$retryKey){__typename clientSecret id}}',
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
        body: 'mutation CreateUserProfileAndOrganization($organization:CreateOrganizationInput!,$user:ProfileInput!){alphaCreateUserProfileAndOrganization(organization:$organization,user:$user){__typename organization{__typename id name}user{__typename ...UserFull}}}fragment UserFull on User{__typename about audienceSize email facebook firstName id instagram isBot isYou lastName lastSeen linkedin location name online phone photo primaryOrganization{__typename ...OrganizationShort}shortname twitter website}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
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
    DepositIntentCommit: {
        kind: 'mutation',
        name: 'DepositIntentCommit',
        body: 'mutation DepositIntentCommit($id:ID!){cardDepositIntentCommit(id:$id)}',
        selector: DepositIntentCommitSelector
    },
    EditComment: {
        kind: 'mutation',
        name: 'EditComment',
        body: 'mutation EditComment($fileAttachments:[FileAttachmentInput!],$id:ID!,$mentions:[MentionInput!],$message:String,$spans:[MessageSpanInput!]){editComment(fileAttachments:$fileAttachments,id:$id,mentions:$mentions,message:$message,spans:$spans)}',
        selector: EditCommentSelector
    },
    EditMessage: {
        kind: 'mutation',
        name: 'EditMessage',
        body: 'mutation EditMessage($fileAttachments:[FileAttachmentInput!],$mentions:[MentionInput!],$message:String,$messageId:ID!,$replyMessages:[ID!],$spans:[MessageSpanInput!]){editMessage(fileAttachments:$fileAttachments,mentions:$mentions,message:$message,messageId:$messageId,replyMessages:$replyMessages,spans:$spans)}',
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
        body: 'mutation FeatureFlagDisable($accountId:ID!,$featureId:ID!){superAccountFeatureRemove(featureId:$featureId,id:$accountId){__typename features{__typename id key title}id}}',
        selector: FeatureFlagDisableSelector
    },
    FeatureFlagEnable: {
        kind: 'mutation',
        name: 'FeatureFlagEnable',
        body: 'mutation FeatureFlagEnable($accountId:ID!,$featureId:ID!){superAccountFeatureAdd(featureId:$featureId,id:$accountId){__typename features{__typename id key title}id}}',
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
        body: 'mutation FeedChannelCreate($about:String,$global:Boolean,$photoRef:ImageRefInput,$title:String!){channel:alphaFeedCreateChannel(about:$about,global:$global,photoRef:$photoRef,title:$title){__typename ...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo postsCount shortname socialImage subscribed subscribersCount title}',
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
        body: 'mutation FeedChannelUpdate($about:String,$global:Boolean,$id:ID!,$photoRef:ImageRefInput,$title:String!){channel:alphaFeedUpdateChannel(about:$about,global:$global,id:$id,photoRef:$photoRef,title:$title){__typename id}}',
        selector: FeedChannelUpdateSelector
    },
    FeedCreatePost: {
        kind: 'mutation',
        name: 'FeedCreatePost',
        body: 'mutation FeedCreatePost($channel:ID!,$repeatKey:String,$slides:[SlideInput!]!){post:alphaCreateFeedPost(channel:$channel,repeatKey:$repeatKey,slides:$slides){__typename ...FeedItemFull}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{author{__typename ...FeedPostAuthorFragment}canEdit commentsCount date edited fallback id message reactions{__typename reaction user{__typename ...UserShort}}slides{__typename ...SlideFragment}source{__typename ...FeedPostSourceFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{...UserShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment SlideFragment on Slide{__typename ... on TextSlide{attachments{__typename ... on User{...UserShort}... on SharedRoom{canSendMessage id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}... on Organization{...OrganizationShort}}cover{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}coverAlign id spans{__typename ...SpanFragment}text}}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo postsCount shortname socialImage subscribed subscribersCount title}',
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
        body: 'mutation FeedEditPost($feedItemId:ID!,$slides:[SlideInput!]!){editFeedPost:alphaEditFeedPost(feedItemId:$feedItemId,slides:$slides){__typename ...FeedItemFull}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{author{__typename ...FeedPostAuthorFragment}canEdit commentsCount date edited fallback id message reactions{__typename reaction user{__typename ...UserShort}}slides{__typename ...SlideFragment}source{__typename ...FeedPostSourceFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{...UserShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment SlideFragment on Slide{__typename ... on TextSlide{attachments{__typename ... on User{...UserShort}... on SharedRoom{canSendMessage id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}... on Organization{...OrganizationShort}}cover{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}coverAlign id spans{__typename ...SpanFragment}text}}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo postsCount shortname socialImage subscribed subscribersCount title}',
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
        body: 'mutation MatchmakingProfileFill($input:MatchmakingProfileFillInput!,$peerId:ID!){matchmakingProfileFill(input:$input,peerId:$peerId){__typename ...MatchmakingProfileFragment}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}',
        selector: MatchmakingProfileFillSelector
    },
    MatchmakingRoomSave: {
        kind: 'mutation',
        name: 'MatchmakingRoomSave',
        body: 'mutation MatchmakingRoomSave($input:MatchmakingRoomInput!,$peerId:ID!){matchmakingRoomSave(input:$input,peerId:$peerId){__typename ...MatchmakingRoomFragment}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}',
        selector: MatchmakingRoomSaveSelector
    },
    MediaAnswer: {
        kind: 'mutation',
        name: 'MediaAnswer',
        body: 'mutation MediaAnswer($answer:String!,$id:ID!,$peerId:ID!){mediaStreamAnswer(answer:$answer,id:$id,peerId:$peerId){__typename id streams{__typename ice id peerId sdp state}}}',
        selector: MediaAnswerSelector
    },
    MediaCandidate: {
        kind: 'mutation',
        name: 'MediaCandidate',
        body: 'mutation MediaCandidate($candidate:String!,$id:ID!,$peerId:ID!){mediaStreamCandidate(candidate:$candidate,id:$id,peerId:$peerId){__typename id streams{__typename ice id peerId sdp state}}}',
        selector: MediaCandidateSelector
    },
    MediaFailed: {
        kind: 'mutation',
        name: 'MediaFailed',
        body: 'mutation MediaFailed($id:ID!,$peerId:ID!){mediaStreamFailed(id:$id,peerId:$peerId){__typename id streams{__typename ice id peerId sdp state}}}',
        selector: MediaFailedSelector
    },
    MediaNegotiationNeeded: {
        kind: 'mutation',
        name: 'MediaNegotiationNeeded',
        body: 'mutation MediaNegotiationNeeded($id:ID!,$peerId:ID!){mediaStreamNegotiationNeeded(id:$id,peerId:$peerId){__typename id streams{__typename ice id peerId sdp state}}}',
        selector: MediaNegotiationNeededSelector
    },
    MediaOffer: {
        kind: 'mutation',
        name: 'MediaOffer',
        body: 'mutation MediaOffer($id:ID!,$offer:String!,$peerId:ID!){mediaStreamOffer(id:$id,offer:$offer,peerId:$peerId){__typename id streams{__typename ice id peerId sdp state}}}',
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
        body: 'mutation OrganizationAddMember($organizationId:ID!,$userIds:[ID!]){alphaOrganizationMemberAdd(organizationId:$organizationId,userIds:$userIds){__typename role user{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
        selector: OrganizationAddMemberSelector
    },
    OrganizationAlterPublished: {
        kind: 'mutation',
        name: 'OrganizationAlterPublished',
        body: 'mutation OrganizationAlterPublished($organizationId:ID!,$published:Boolean!){alphaAlterPublished(id:$organizationId,published:$published){__typename ...OrganizationSearch}}fragment OrganizationSearch on Organization{__typename about featured:alphaFeatured members:alphaOrganizationMembers{__typename user{__typename id name photo}}id isMine membersCount name photo status superAccountId}',
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
        body: 'mutation OrganizationMemberRemove($organizationId:ID!,$userId:ID!){betaOrganizationMemberRemove(organizationId:$organizationId,userId:$userId){__typename id}}',
        selector: OrganizationMemberRemoveSelector
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
        body: 'mutation PinMessage($chatId:ID!,$messageId:ID!){pinMessage:gammaPinMessage(chatId:$chatId,messageId:$messageId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind matchmaking{__typename ...MatchmakingRoomFragment}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}',
        selector: PinMessageSelector
    },
    ProfileCreate: {
        kind: 'mutation',
        name: 'ProfileCreate',
        body: 'mutation ProfileCreate($input:CreateProfileInput!){createProfile(input:$input){__typename about email firstName id lastName location phone photoRef{__typename crop{__typename h w x y}uuid}website}}',
        selector: ProfileCreateSelector
    },
    ProfileUpdate: {
        kind: 'mutation',
        name: 'ProfileUpdate',
        body: 'mutation ProfileUpdate($input:ProfileInput!,$uid:ID){profileUpdate(input:$input,uid:$uid){__typename about invitedBy:alphaInvitedBy{__typename id name}joinedAt:alphaJoinedAt primaryOrganizationId:alphaPrimaryOrganizationId role:alphaRole email facebook firstName id instagram lastName linkedin location phone photoRef{__typename crop{__typename h w x y}uuid}twitter website}}',
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
        body: 'mutation RefreshAppToken($appId:ID!){refreshAppToken(appId:$appId){__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}',
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
    ReportContent: {
        kind: 'mutation',
        name: 'ReportContent',
        body: 'mutation ReportContent($contentId:ID!,$message:String,$type:String!){reportContent(contentId:$contentId,message:$message,type:$type)}',
        selector: ReportContentSelector
    },
    ReportOnline: {
        kind: 'mutation',
        name: 'ReportOnline',
        body: 'mutation ReportOnline($active:Boolean,$platform:String){presenceReportOnline(active:$active,platform:$platform,timeout:5000)}',
        selector: ReportOnlineSelector
    },
    RoomAddMembers: {
        kind: 'mutation',
        name: 'RoomAddMembers',
        body: 'mutation RoomAddMembers($invites:[RoomInviteInput!]!,$roomId:ID!){alphaRoomInvite(invites:$invites,roomId:$roomId){__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}}fragment UserBadge on UserBadge{__typename id name verified}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
        selector: RoomAddMembersSelector
    },
    RoomAlterFeatured: {
        kind: 'mutation',
        name: 'RoomAlterFeatured',
        body: 'mutation RoomAlterFeatured($featured:Boolean!,$roomId:ID!){betaRoomAlterFeatured(featured:$featured,roomId:$roomId){__typename featured id listed}}',
        selector: RoomAlterFeaturedSelector
    },
    RoomAlterHidden: {
        kind: 'mutation',
        name: 'RoomAlterHidden',
        body: 'mutation RoomAlterHidden($listed:Boolean!,$roomId:ID!){betaRoomAlterListed(listed:$listed,roomId:$roomId){__typename featured id listed}}',
        selector: RoomAlterHiddenSelector
    },
    RoomChangeRole: {
        kind: 'mutation',
        name: 'RoomChangeRole',
        body: 'mutation RoomChangeRole($newRole:RoomMemberRole!,$roomId:ID!,$userId:ID!){betaRoomChangeRole(newRole:$newRole,roomId:$roomId,userId:$userId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description featuredMembersCount id isChannel kind matchmaking{__typename ...MatchmakingRoomFragment}members{__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}fragment OrganizationMedium on Organization{__typename about isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo shortname}',
        selector: RoomChangeRoleSelector
    },
    RoomCreate: {
        kind: 'mutation',
        name: 'RoomCreate',
        body: 'mutation RoomCreate($channel:Boolean!,$description:String,$kind:SharedRoomKind!,$members:[ID!]!,$message:String,$organizationId:ID,$photoRef:ImageRefInput,$title:String){room:betaRoomCreate(channel:$channel,description:$description,kind:$kind,members:$members,message:$message,organizationId:$organizationId,photoRef:$photoRef,title:$title){__typename id}}',
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
        body: 'mutation RoomJoin($roomId:ID!){join:betaRoomJoin(roomId:$roomId){__typename ... on PrivateRoom{id}... on SharedRoom{id}}}',
        selector: RoomJoinSelector
    },
    RoomJoinInviteLink: {
        kind: 'mutation',
        name: 'RoomJoinInviteLink',
        body: 'mutation RoomJoinInviteLink($invite:String!){join:betaRoomInviteLinkJoin(invite:$invite){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind matchmaking{__typename ...MatchmakingRoomFragment}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}',
        selector: RoomJoinInviteLinkSelector
    },
    RoomKick: {
        kind: 'mutation',
        name: 'RoomKick',
        body: 'mutation RoomKick($roomId:ID!,$userId:ID!){betaRoomKick(roomId:$roomId,userId:$userId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description featuredMembersCount id isChannel kind matchmaking{__typename ...MatchmakingRoomFragment}members{__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}fragment OrganizationMedium on Organization{__typename about isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo shortname}',
        selector: RoomKickSelector
    },
    RoomLeave: {
        kind: 'mutation',
        name: 'RoomLeave',
        body: 'mutation RoomLeave($roomId:ID!){betaRoomLeave(roomId:$roomId){__typename ...RoomFull}}fragment RoomFull on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage description featuredMembersCount id isChannel kind matchmaking{__typename ...MatchmakingRoomFragment}members{__typename badge{__typename ...UserBadge}canKick membership role user{__typename ...UserShort}}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationMedium}photo pinnedMessage{__typename ...FullMessage}requests{__typename user{__typename ...UserShort}}role settings{__typename id mute}socialImage title welcomeMessage{__typename isOn message sender{__typename id name}}}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}fragment OrganizationMedium on Organization{__typename about isCommunity:alphaIsCommunity isAdmin:betaIsAdmin isOwner:betaIsOwner id isMine membersCount name photo shortname}',
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
        body: 'mutation RoomSettingsUpdate($roomId:ID!,$settings:RoomUserNotificaionSettingsInput!){betaRoomUpdateUserNotificationSettings(roomId:$roomId,settings:$settings){__typename id mute}}',
        selector: RoomSettingsUpdateSelector
    },
    RoomUpdate: {
        kind: 'mutation',
        name: 'RoomUpdate',
        body: 'mutation RoomUpdate($input:RoomUpdateInput!,$roomId:ID!){betaRoomUpdate(input:$input,roomId:$roomId){__typename ... on PrivateRoom{id}... on SharedRoom{description id photo socialImage title}}}',
        selector: RoomUpdateSelector
    },
    RoomsInviteUser: {
        kind: 'mutation',
        name: 'RoomsInviteUser',
        body: 'mutation RoomsInviteUser($roomIds:[ID!]!,$userId:ID!){rooms:betaRoomsInviteUser(roomIds:$roomIds,userId:$userId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind matchmaking{__typename ...MatchmakingRoomFragment}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}',
        selector: RoomsInviteUserSelector
    },
    RoomsJoin: {
        kind: 'mutation',
        name: 'RoomsJoin',
        body: 'mutation RoomsJoin($roomsIds:[ID!]!){join:betaRoomsJoin(roomsIds:$roomsIds){__typename ... on PrivateRoom{id}... on SharedRoom{id}}}',
        selector: RoomsJoinSelector
    },
    SendMessage: {
        kind: 'mutation',
        name: 'SendMessage',
        body: 'mutation SendMessage($chatId:ID!,$fileAttachments:[FileAttachmentInput!],$mentions:[MentionInput!],$message:String,$repeatKey:String,$replyMessages:[ID!],$spans:[MessageSpanInput!]){sentMessage:sendMessage(chatId:$chatId,fileAttachments:$fileAttachments,mentions:$mentions,message:$message,repeatKey:$repeatKey,replyMessages:$replyMessages,spans:$spans)}',
        selector: SendMessageSelector
    },
    SendSticker: {
        kind: 'mutation',
        name: 'SendSticker',
        body: 'mutation SendSticker($chatId:ID!,$repeatKey:String,$replyMessages:[ID!],$stickerId:ID!){sendSticker(chatId:$chatId,repeatKey:$repeatKey,replyMessages:$replyMessages,stickerId:$stickerId)}',
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
    SetTyping: {
        kind: 'mutation',
        name: 'SetTyping',
        body: 'mutation SetTyping($conversationId:ID!){typingSend(conversationId:$conversationId,type:TEXT)}',
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
        body: 'mutation SettingsUpdate($input:UpdateSettingsInput){updateSettings(settings:$input){__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename countUnreadChats desktop{__typename ...PlatformNotificationSettingsFull}emailFrequency excludeMutedChats id mobile{__typename ...PlatformNotificationSettingsFull}primaryEmail}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename comments{__typename showNotification sound}communityChat{__typename showNotification sound}direct{__typename showNotification sound}notificationPreview organizationChat{__typename showNotification sound}secretChat{__typename showNotification sound}}',
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
        body: 'mutation SuperAccountMemberAdd($accountId:ID!,$userId:ID!){superAccountMemberAdd(id:$accountId,userId:$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
        selector: SuperAccountMemberAddSelector
    },
    SuperAccountMemberRemove: {
        kind: 'mutation',
        name: 'SuperAccountMemberRemove',
        body: 'mutation SuperAccountMemberRemove($accountId:ID!,$userId:ID!){superAccountMemberRemove(id:$accountId,userId:$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
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
        body: 'mutation SuperAdminAdd($role:SuperAdminRole!,$userId:ID!){superAdminAdd(role:$role,userId:$userId)}',
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
        body: 'mutation SuperBadgeCreateToRoom($name:String!,$roomId:ID!,$userId:ID!){superBadgeCreateToRoom(name:$name,roomId:$roomId,userId:$userId){__typename ...UserBadge}}fragment UserBadge on UserBadge{__typename id name verified}',
        selector: SuperBadgeCreateToRoomSelector
    },
    SuperBadgeUnsetToRoom: {
        kind: 'mutation',
        name: 'SuperBadgeUnsetToRoom',
        body: 'mutation SuperBadgeUnsetToRoom($badgeId:ID!,$roomId:ID!,$userId:ID!){superBadgeUnsetToRoom(badgeId:$badgeId,roomId:$roomId,userId:$userId)}',
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
        body: 'mutation UnpinMessage($chatId:ID!){unpinMessage:gammaUnpinMessage(chatId:$chatId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind matchmaking{__typename ...MatchmakingRoomFragment}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment UserBadge on UserBadge{__typename id name verified}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}',
        selector: UnpinMessageSelector
    },
    UpdateApp: {
        kind: 'mutation',
        name: 'UpdateApp',
        body: 'mutation UpdateApp($appId:ID!,$input:AppProfileInput!){updateAppProfile(appId:$appId,input:$input){__typename ...AppFull}}fragment AppFull on AppProfile{__typename about id name photoRef{__typename crop{__typename h w x y}uuid}shortname token{__typename salt}}',
        selector: UpdateAppSelector
    },
    UpdateOrganization: {
        kind: 'mutation',
        name: 'UpdateOrganization',
        body: 'mutation UpdateOrganization($input:UpdateOrganizationProfileInput!,$organizationId:ID){updateOrganizationProfile(id:$organizationId,input:$input){__typename ...OrganizationProfileFull}}fragment OrganizationProfileFull on OrganizationProfile{__typename about editorial:alphaEditorial featured:alphaFeatured private:alphaIsPrivate published:alphaPublished facebook id instagram linkedin name photoRef{__typename crop{__typename h w x y}uuid}shortname twitter website websiteTitle}',
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
        body: 'mutation UserStorageSet($data:[AppStorageValueInput!]!,$namespace:String!){userStorageSet(data:$data,namespace:$namespace){__typename id key value}}',
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
        body: 'subscription ChatWatch($chatId:ID!,$state:String){event:chatUpdates(chatId:$chatId,fromState:$state){__typename ... on ChatUpdateSingle{seq state update{__typename ...ChatUpdateFragment}}... on ChatUpdateBatch{fromSeq seq state updates{__typename ...ChatUpdateFragment}}}}fragment ChatUpdateFragment on ChatUpdate{__typename ... on ChatMessageReceived{message{__typename ...FullMessage}repeatKey}... on ChatMessageUpdated{message{__typename ...FullMessage}}... on ChatMessageDeleted{message{__typename id}}... on ChatUpdated{chat{__typename ...RoomShort}}... on ChatLostAccess{lostAccess}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment RoomShort on Room{__typename ... on PrivateRoom{id myBadge{__typename ...UserBadge}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}user{__typename ...UserShort}}... on SharedRoom{canEdit canSendMessage id isChannel kind matchmaking{__typename ...MatchmakingRoomFragment}membersCount membership myBadge{__typename ...UserBadge}organization{__typename ...OrganizationShort}photo pinnedMessage{__typename ...FullMessage}role settings{__typename id mute}title}}fragment MatchmakingRoomFragment on MatchmakingRoom{__typename enabled myProfile{__typename ...MatchmakingProfileFragment}profiles{__typename ...MatchmakingProfileFragment}questions{__typename ... on TextMatchmakingQuestion{id subtitle title}... on MultiselectMatchmakingQuestion{id subtitle tags title}}}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}',
        selector: ChatWatchSelector
    },
    CommentWatch: {
        kind: 'subscription',
        name: 'CommentWatch',
        body: 'subscription CommentWatch($fromState:String,$peerId:ID!){event:commentUpdates(fromState:$fromState,peerId:$peerId){__typename ... on CommentUpdateSingle{seq state update{__typename ...CommentUpdateFragment}}... on CommentUpdateBatch{fromSeq seq state updates{__typename ...CommentUpdateFragment}}}}fragment CommentUpdateFragment on CommentUpdate{__typename ... on CommentReceived{comment{__typename ...CommentEntryFragment}}... on CommentUpdated{comment{__typename ...CommentEntryFragment}}}fragment CommentEntryFragment on CommentEntry{__typename comment:betaComment{__typename id ...FullMessage}childComments{__typename id}deleted id parentComment{__typename comment:betaComment{__typename id message}id}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}',
        selector: CommentWatchSelector
    },
    ConferenceMediaWatch: {
        kind: 'subscription',
        name: 'ConferenceMediaWatch',
        body: 'subscription ConferenceMediaWatch($id:ID!,$peerId:ID!){media:alphaConferenceMediaWatch(id:$id,peerId:$peerId){__typename id streams{__typename ice id peerId sdp state}}}',
        selector: ConferenceMediaWatchSelector
    },
    ConferenceWatch: {
        kind: 'subscription',
        name: 'ConferenceWatch',
        body: 'subscription ConferenceWatch($id:ID!){alphaConferenceWatch(id:$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename iceServers{__typename credential urls username}id peers{__typename connection{__typename ice sdp state}id user{__typename ...UserShort}}startTime}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}',
        selector: ConferenceWatchSelector
    },
    DebugEventsWatch: {
        kind: 'subscription',
        name: 'DebugEventsWatch',
        body: 'subscription DebugEventsWatch($eventsCount:Int!,$fromState:String,$randomDelays:Boolean!,$seed:String!){debugEvents(eventsCount:$eventsCount,fromState:$fromState,randomDelays:$randomDelays,seed:$seed){__typename key seq}}',
        selector: DebugEventsWatchSelector
    },
    DialogsWatch: {
        kind: 'subscription',
        name: 'DialogsWatch',
        body: 'subscription DialogsWatch($state:String){event:dialogsUpdates(fromState:$state){__typename ... on DialogUpdateSingle{seq state update{__typename ...DialogUpdateFragment}}... on DialogUpdateBatch{fromSeq seq state updates{__typename ...DialogUpdateFragment}}}}fragment DialogUpdateFragment on DialogUpdate{__typename ... on DialogMessageReceived{message:alphaMessage{__typename ...TinyMessage}cid globalUnread haveMention showNotification{__typename desktop mobile}silent{__typename desktop mobile}unread}... on DialogMessageUpdated{message:alphaMessage{__typename ...TinyMessage}cid haveMention}... on DialogMessageDeleted{message:alphaMessage{__typename ...TinyMessage}prevMessage:alphaPrevMessage{__typename ...TinyMessage}cid globalUnread haveMention unread}... on DialogMessageRead{cid globalUnread haveMention mid unread}... on DialogMuteChanged{cid mute}... on DialogPeerUpdated{cid peer{__typename ... on PrivateRoom{id user{__typename id name photo}}... on SharedRoom{id photo title}}}... on DialogDeleted{cid globalUnread}... on DialogBump{cid globalUnread haveMention topMessage{__typename ...TinyMessage}unread}}fragment TinyMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserTiny}senderBadge{__typename ...UserBadge}... on GeneralMessage{attachments{__typename fallback id ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat isImage}filePreview id}}commentsCount id isMentioned overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename id}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}',
        selector: DialogsWatchSelector
    },
    FeedUpdates: {
        kind: 'subscription',
        name: 'FeedUpdates',
        body: 'subscription FeedUpdates($state:String){event:homeFeedUpdates(fromState:$state){__typename state updates{__typename ...FeedUpdateFragment}}}fragment FeedUpdateFragment on FeedUpdate{__typename ... on FeedItemReceived{item{__typename ...FeedItemFull}}... on FeedItemUpdated{item{__typename ...FeedItemFull}}... on FeedItemDeleted{item{__typename ...FeedItemFull}}... on FeedRebuildNeeded{feed:homeFeed{__typename cursor items{__typename ...FeedItemFull}}}}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{author{__typename ...FeedPostAuthorFragment}canEdit commentsCount date edited fallback id message reactions{__typename reaction user{__typename ...UserShort}}slides{__typename ...SlideFragment}source{__typename ...FeedPostSourceFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{...UserShort}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment SlideFragment on Slide{__typename ... on TextSlide{attachments{__typename ... on User{...UserShort}... on SharedRoom{canSendMessage id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}... on Organization{...OrganizationShort}}cover{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}coverAlign id spans{__typename ...SpanFragment}text}}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo postsCount shortname socialImage subscribed subscribersCount title}',
        selector: FeedUpdatesSelector
    },
    MyNotificationsCenter: {
        kind: 'subscription',
        name: 'MyNotificationsCenter',
        body: 'subscription MyNotificationsCenter($state:String){event:notificationCenterUpdates(fromState:$state){__typename ... on NotificationCenterUpdateSingle{seq state update{__typename ...NotificationCenterUpdateFragment}}... on NotificationCenterUpdateBatch{fromSeq seq state updates{__typename ...NotificationCenterUpdateFragment}}}}fragment NotificationCenterUpdateFragment on NotificationCenterUpdate{__typename ... on NotificationReceived{center{__typename id unread}notification{__typename ...NotificationFragment}}... on NotificationUpdated{center{__typename id unread}notification{__typename ...NotificationFragment}}... on NotificationDeleted{center{__typename id unread}notification{__typename id}}... on NotificationRead{center{__typename id unread}}... on NotificationContentUpdated{content{__typename ... on UpdatedNotificationContentComment{comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{chat{__typename ...RoomNano}message{__typename ... on GeneralMessage{fallback id message sender{__typename id name}senderBadge{__typename ...UserBadge}}}}... on CommentPeerRootFeedItem{item{__typename ...FeedItemFull}}}subscription{__typename type}}}}}}fragment NotificationFragment on Notification{__typename content{__typename ... on NewCommentNotification{comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{chat{__typename ...RoomNano}message{__typename ... on GeneralMessage{fallback id message sender{__typename id name}senderBadge{__typename ...UserBadge}}}}... on CommentPeerRootFeedItem{item{__typename ...FeedItemFull}}}subscription{__typename type}}}... on NewMatchmakingProfilesNotification{profiles{__typename ...MatchmakingProfileFragment}room{__typename peer{__typename ... on SharedRoom{...RoomNano}}}}}id text}fragment CommentEntryFragment on CommentEntry{__typename comment:betaComment{__typename id ...FullMessage}childComments{__typename id}deleted id parentComment{__typename comment:betaComment{__typename id message}id}}fragment FullMessage on ModernMessage{__typename date fallback id message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id isChannel membersCount}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id style title url}}socialImage{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}}... on StickerMessage{commentsCount date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName quotedMessages{__typename ...QuotedMessage}reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ...StickerFragment}}... on ServiceMessage{id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName serviceMetadata{__typename ... on InviteServiceMetadata{invitedBy{__typename ...UserTiny}users{__typename ...UserTiny}}... on KickServiceMetadata{kickedBy{__typename ...UserTiny}user{__typename ...UserTiny}}... on TitleChangeServiceMetadata{title}... on PhotoChangeServiceMetadata{photo}... on PostRespondServiceMetadata{respondType}}}}fragment UserShort on User{__typename email firstName id isBot isYou lastName lastSeen name online photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment OrganizationShort on Organization{__typename about isCommunity:alphaIsCommunity id membersCount name photo shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment SpanFragment on MessageSpan{__typename length offset ... on MessageSpanUserMention{user{__typename ...UserForMention}}... on MessageSpanMultiUserMention{users{__typename ...UserForMention}}... on MessageSpanOrganizationMention{organization{__typename ...OrganizationShort}}... on MessageSpanRoomMention{room{__typename ...RoomNano}}... on MessageSpanLink{url}... on MessageSpanDate{date}}fragment UserForMention on User{__typename id isBot isYou name photo primaryOrganization{__typename id name}shortname}fragment RoomNano on Room{__typename ... on PrivateRoom{id settings{__typename id mute}user{__typename id name photo}}... on SharedRoom{...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id isChannel kind membersCount roomPhoto:photo settings{__typename id mute}title}fragment QuotedMessage on ModernMessage{__typename date fallback id message message sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}spans{__typename ...SpanFragment}... on GeneralMessage{attachments{__typename fallback ... on MessageAttachmentFile{fileId fileMetadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}filePreview id}... on MessageRichAttachment{fallback icon{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}id image{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}imageFallback{__typename photo text}subTitle text title titleLink titleLinkHostname}}commentsCount edited id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName}... on StickerMessage{date id overrideAvatar{__typename crop{__typename h w x y}uuid}overrideName reactions{__typename reaction user{__typename ...UserShort}}sender{__typename ...UserShort}senderBadge{__typename ...UserBadge}source{__typename ... on MessageSourceChat{chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}}}sticker{__typename ... on ImageSticker{id image{__typename ... on ImageRef{uuid}}pack{__typename ... on StickerPack{id title}}}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{id image{__typename uuid}pack{__typename id title}}}fragment UserTiny on User{__typename firstName id isYou lastName name photo primaryOrganization{__typename ...OrganizationShort}shortname}fragment FeedItemFull on FeedItem{__typename ... on FeedPost{author{__typename ...FeedPostAuthorFragment}canEdit commentsCount date edited fallback id message reactions{__typename reaction user{__typename ...UserShort}}slides{__typename ...SlideFragment}source{__typename ...FeedPostSourceFragment}}}fragment FeedPostAuthorFragment on FeedPostAuthor{__typename ... on User{...UserShort}}fragment SlideFragment on Slide{__typename ... on TextSlide{attachments{__typename ... on User{...UserShort}... on SharedRoom{canSendMessage id kind membersCount membership organization{__typename id name photo}roomPhoto:photo title}... on Organization{...OrganizationShort}}cover{__typename metadata{__typename imageFormat imageHeight imageWidth isImage mimeType name size}url}coverAlign id spans{__typename ...SpanFragment}text}}fragment FeedPostSourceFragment on FeedPostSource{__typename ... on FeedChannel{...FeedChannelFull}}fragment FeedChannelFull on FeedChannel{__typename about id isGlobal myRole photo postsCount shortname socialImage subscribed subscribersCount title}fragment MatchmakingProfileFragment on MatchmakingProfile{__typename answers{__typename ... on TextMatchmakingAnswer{answer question{__typename id subtitle title}}... on MultiselectMatchmakingAnswer{question{__typename id subtitle title}tags}}chatCreated user{__typename id isBot isYou name photo primaryOrganization{__typename id name}}}',
        selector: MyNotificationsCenterSelector
    },
    OnlineWatch: {
        kind: 'subscription',
        name: 'OnlineWatch',
        body: 'subscription OnlineWatch($users:[ID!]!){alphaSubscribeOnline(users:$users){__typename timeout user{__typename id lastSeen online}}}',
        selector: OnlineWatchSelector
    },
    SettingsWatch: {
        kind: 'subscription',
        name: 'SettingsWatch',
        body: 'subscription SettingsWatch{watchSettings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename countUnreadChats desktop{__typename ...PlatformNotificationSettingsFull}emailFrequency excludeMutedChats id mobile{__typename ...PlatformNotificationSettingsFull}primaryEmail}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename comments{__typename showNotification sound}communityChat{__typename showNotification sound}direct{__typename showNotification sound}notificationPreview organizationChat{__typename showNotification sound}secretChat{__typename showNotification sound}}',
        selector: SettingsWatchSelector
    },
    TypingsWatch: {
        kind: 'subscription',
        name: 'TypingsWatch',
        body: 'subscription TypingsWatch{typings{__typename cancel conversation:chat{__typename ... on PrivateRoom{id}... on SharedRoom{id}}user{__typename id name photo}}}',
        selector: TypingsWatchSelector
    },
};