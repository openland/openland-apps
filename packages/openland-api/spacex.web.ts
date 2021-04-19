/* tslint:disable */
/* eslint-disable */
// @ts-ignore
import { WebDefinitions, OperationDefinition, Definitions as AllDefinitions } from '@openland/spacex';
// @ts-ignore
const { list, notNull, scalar, field, obj, inline, fragment, args, fieldValue, refValue, intValue, floatValue, stringValue, boolValue, listValue, objectValue } = WebDefinitions;

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

const ChannelSimpleSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('title', 'title', args(), notNull(scalar('String'))),
            field('shortname', 'shortname', args(), notNull(scalar('String'))),
            field('type', 'type', args(), notNull(scalar('String'))),
            field('owner', 'owner', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('firstName', 'firstName', args(), notNull(scalar('String'))),
                    field('lastName', 'lastName', args(), scalar('String'))
                ))
        );

const ChatNewMessageFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('date', 'date', args(), notNull(scalar('Date'))),
            field('seq', 'seq', args(), scalar('Int')),
            field('sender', 'sender', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                ))),
            field('message', 'message', args(), scalar('String')),
            field('fallback', 'fallback', args(), notNull(scalar('String')))
        );

const MessageSenderSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('isBot', 'isBot', args(), notNull(scalar('Boolean'))),
            field('shortname', 'shortname', args(), scalar('String'))
        );

const UserBadgeSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('verified', 'verified', args(), notNull(scalar('Boolean')))
        );

const MessageSpanSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('offset', 'offset', args(), notNull(scalar('Int'))),
            field('length', 'length', args(), notNull(scalar('Int'))),
            inline('MessageSpanUserMention', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('user', 'user', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('name', 'name', args(), notNull(scalar('String')))
                    )))
            )),
            inline('MessageSpanMultiUserMention', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('offset', 'offset', args(), notNull(scalar('Int'))),
                field('length', 'length', args(), notNull(scalar('Int')))
            )),
            inline('MessageSpanOrganizationMention', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('organization', 'organization', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('name', 'name', args(), notNull(scalar('String')))
                    )))
            )),
            inline('MessageSpanRoomMention', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('room', 'room', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        inline('PrivateRoom', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('user', 'user', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('name', 'name', args(), notNull(scalar('String')))
                                )))
                        )),
                        inline('SharedRoom', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('title', 'title', args(), notNull(scalar('String'))),
                            field('isPremium', 'isPremium', args(), notNull(scalar('Boolean')))
                        ))
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

const MessageAttachmentsSelector = obj(
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
                field('filePreview', 'filePreview', args(), scalar('String')),
                field('previewFileId', 'previewFileId', args(), scalar('String')),
                field('previewFileMetadata', 'previewFileMetadata', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('name', 'name', args(), notNull(scalar('String'))),
                        field('mimeType', 'mimeType', args(), scalar('String')),
                        field('size', 'size', args(), notNull(scalar('Int'))),
                        field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                        field('imageWidth', 'imageWidth', args(), scalar('Int')),
                        field('imageHeight', 'imageHeight', args(), scalar('Int')),
                        field('imageFormat', 'imageFormat', args(), scalar('String'))
                    )),
                field('videoMetadata', 'videoMetadata', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('duration', 'duration', args(), notNull(scalar('Int')))
                    ))
            )),
            inline('MessageRichAttachment', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('title', 'title', args(), scalar('String')),
                field('subTitle', 'subTitle', args(), scalar('String')),
                field('titleLink', 'titleLink', args(), scalar('String')),
                field('titleLinkHostname', 'titleLinkHostname', args(), scalar('String')),
                field('text', 'text', args(), scalar('String')),
                field('featuredIcon', 'featuredIcon', args(), scalar('Boolean')),
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
            )),
            inline('MessageAttachmentPurchase', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('purchase', 'purchase', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('state', 'state', args(), notNull(scalar('String'))),
                        field('amount', 'amount', args(), notNull(scalar('Int')))
                    ))),
                field('fallback', 'fallback', args(), notNull(scalar('String')))
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

const QuotedMessageSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('date', 'date', args(), notNull(scalar('Date'))),
            field('message', 'message', args(), scalar('String')),
            field('sender', 'sender', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('User', MessageSenderSelector)
                ))),
            field('senderBadge', 'senderBadge', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('UserBadge', UserBadgeSelector)
                )),
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
                    fragment('MessageSpan', MessageSpanSelector)
                ))))),
            inline('GeneralMessage', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('edited', 'edited', args(), notNull(scalar('Boolean'))),
                field('commentsCount', 'commentsCount', args(), notNull(scalar('Int'))),
                field('attachments', 'attachments', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessageAttachment', MessageAttachmentsSelector)
                    )))))
            )),
            inline('StickerMessage', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('sticker', 'sticker', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Sticker', StickerFragmentSelector)
                    )))
            ))
        );

const MessageReactionCounterSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('reaction', 'reaction', args(), notNull(scalar('String'))),
            field('count', 'count', args(), notNull(scalar('Int'))),
            field('setByMe', 'setByMe', args(), notNull(scalar('Boolean')))
        );

const ServiceMessageMetadataSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('InviteServiceMetadata', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('users', 'users', args(), list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )))),
                field('invitedBy', 'invitedBy', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )))
            )),
            inline('KickServiceMetadata', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('user', 'user', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    ))),
                field('kickedBy', 'kickedBy', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
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
        );

const FullMessageSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('seq', 'seq', args(), scalar('Int')),
            field('date', 'date', args(), notNull(scalar('Date'))),
            field('sender', 'sender', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('User', MessageSenderSelector)
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
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('user', 'user', args(), notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('id', 'id', args(), notNull(scalar('ID')))
                                        )))
                                )),
                                inline('SharedRoom', obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('title', 'title', args(), notNull(scalar('String'))),
                                    field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                                    field('membersCount', 'membersCount', args(), notNull(scalar('Int')))
                                ))
                            )))
                    ))
                )),
            field('spans', 'spans', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('MessageSpan', MessageSpanSelector)
                ))))),
            inline('GeneralMessage', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('edited', 'edited', args(), notNull(scalar('Boolean'))),
                field('commentsCount', 'commentsCount', args(), notNull(scalar('Int'))),
                field('attachments', 'attachments', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessageAttachment', MessageAttachmentsSelector)
                    ))))),
                field('quotedMessages', 'quotedMessages', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', QuotedMessageSelector)
                    ))))),
                field('reactionCounters', 'reactionCounters', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ReactionCounter', MessageReactionCounterSelector)
                    ))))),
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
                field('overrideName', 'overrideName', args(), scalar('String'))
            )),
            inline('StickerMessage', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('commentsCount', 'commentsCount', args(), notNull(scalar('Int'))),
                field('quotedMessages', 'quotedMessages', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', QuotedMessageSelector)
                    ))))),
                field('sticker', 'sticker', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Sticker', StickerFragmentSelector)
                    ))),
                field('reactionCounters', 'reactionCounters', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ReactionCounter', MessageReactionCounterSelector)
                    ))))),
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
                field('overrideName', 'overrideName', args(), scalar('String'))
            )),
            inline('ServiceMessage', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('serviceMetadata', 'serviceMetadata', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ServiceMetadata', ServiceMessageMetadataSelector)
                    ))
            ))
        );

const UserSmallSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('firstName', 'firstName', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('shortname', 'shortname', args(), scalar('String')),
            field('isBot', 'isBot', args(), notNull(scalar('Boolean')))
        );

const UserShortSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('online', 'online', args(), notNull(scalar('Boolean'))),
            field('lastSeen', 'lastSeen', args(), scalar('String')),
            fragment('User', UserSmallSelector)
        );

const VoiceChatParticipantSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('user', 'user', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('followedByMe', 'followedByMe', args(), notNull(scalar('Boolean'))),
                    field('followersCount', 'followersCount', args(), notNull(scalar('Int'))),
                    fragment('User', UserSmallSelector)
                ))),
            field('status', 'status', args(), notNull(scalar('String'))),
            field('handRaised', 'handRaised', args(), scalar('Boolean'))
        );

const VoiceChatEntitySelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('title', 'title', args(), scalar('String')),
            field('active', 'active', args(), notNull(scalar('Boolean'))),
            field('adminsCount', 'adminsCount', args(), notNull(scalar('Int'))),
            field('speakersCount', 'speakersCount', args(), notNull(scalar('Int'))),
            field('listenersCount', 'listenersCount', args(), notNull(scalar('Int'))),
            field('parentRoom', 'parentRoom', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('title', 'title', args(), notNull(scalar('String'))),
                    field('photo', 'photo', args(), notNull(scalar('String'))),
                    field('membership', 'membership', args(), notNull(scalar('String'))),
                    field('kind', 'kind', args(), notNull(scalar('String'))),
                    field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                    field('shortname', 'shortname', args(), scalar('String'))
                )),
            field('pinnedMessage', 'pinnedMessage', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('message', 'message', args(), scalar('String')),
                    field('spans', 'spans', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('MessageSpan', MessageSpanSelector)
                        )))))
                )),
            field('me', 'me', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('VoiceChatParticipant', VoiceChatParticipantSelector)
                ))
        );

const VoiceChatWithSpeakersSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('speakers', 'speakers', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('VoiceChatParticipant', VoiceChatParticipantSelector)
                ))))),
            fragment('VoiceChat', VoiceChatEntitySelector)
        );

const OrganizationSmallSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('about', 'about', args(), scalar('String')),
            field('shortname', 'shortname', args(), scalar('String')),
            field('alphaIsCommunity', 'isCommunity', args(), notNull(scalar('Boolean'))),
            field('alphaFeatured', 'featured', args(), notNull(scalar('Boolean')))
        );

const RoomShortSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('PrivateRoom', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('user', 'user', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('isYou', 'isYou', args(), notNull(scalar('Boolean'))),
                        field('inContacts', 'inContacts', args(), notNull(scalar('Boolean'))),
                        field('isBanned', 'isBanned', args(), notNull(scalar('Boolean'))),
                        field('isMeBanned', 'isMeBanned', args(), notNull(scalar('Boolean'))),
                        fragment('User', UserShortSelector)
                    ))),
                field('pinnedMessage', 'pinnedMessage', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', FullMessageSelector)
                    )),
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
                field('title', 'title', args(), notNull(scalar('String'))),
                field('membership', 'membership', args(), notNull(scalar('String'))),
                field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                field('role', 'role', args(), notNull(scalar('String'))),
                field('canEdit', 'canEdit', args(), notNull(scalar('Boolean'))),
                field('canSendMessage', 'canSendMessage', args(), notNull(scalar('Boolean'))),
                field('photo', 'photo', args(), notNull(scalar('String'))),
                field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                field('shortname', 'shortname', args(), scalar('String')),
                field('featuredMembersCount', 'featuredMembersCount', args(), notNull(scalar('Int'))),
                field('socialImage', 'socialImage', args(), scalar('String')),
                field('activeVoiceChat', 'activeVoiceChat', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('VoiceChat', VoiceChatWithSpeakersSelector)
                    )),
                field('featured', 'featured', args(), notNull(scalar('Boolean'))),
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
                field('organization', 'organization', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('alphaIsPrivate', 'private', args(), notNull(scalar('Boolean'))),
                        field('betaIsAdmin', 'isAdmin', args(), notNull(scalar('Boolean'))),
                        field('betaMembersCanInvite', 'membersCanInvite', args(), notNull(scalar('Boolean'))),
                        fragment('Organization', OrganizationSmallSelector)
                    )),
                field('canUnpinMessage', 'canUnpinMessage', args(), notNull(scalar('Boolean'))),
                field('pinnedMessage', 'pinnedMessage', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', FullMessageSelector)
                    )),
                field('myBadge', 'myBadge', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('UserBadge', UserBadgeSelector)
                    )),
                field('settings', 'settings', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('mute', 'mute', args(), scalar('Boolean'))
                    ))),
                field('description', 'description', args(), scalar('String')),
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
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('firstName', 'firstName', args(), notNull(scalar('String'))),
                        field('isYou', 'isYou', args(), notNull(scalar('Boolean')))
                    )),
                field('serviceMessageSettings', 'serviceMessageSettings', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('joinsMessageEnabled', 'joinsMessageEnabled', args(), notNull(scalar('Boolean'))),
                        field('leavesMessageEnabled', 'leavesMessageEnabled', args(), notNull(scalar('Boolean')))
                    ))),
                field('callSettings', 'callSettings', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('mode', 'mode', args(), notNull(scalar('String'))),
                        field('callLink', 'callLink', args(), scalar('String'))
                    ))),
                field('repliesEnabled', 'repliesEnabled', args(), notNull(scalar('Boolean')))
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
                    fragment('ModernMessage', FullMessageSelector)
                ))),
            field('parentComment', 'parentComment', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('betaComment', 'comment', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('message', 'message', args(), scalar('String'))
                        )))
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

const ConferenceFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('startTime', 'startTime', args(), scalar('Date')),
            field('peers', 'peers', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserSmallSelector)
                        ))),
                    field('mediaState', 'mediaState', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('audioPaused', 'audioPaused', args(), notNull(scalar('Boolean'))),
                            field('videoPaused', 'videoPaused', args(), notNull(scalar('Boolean'))),
                            field('screencastEnabled', 'screencastEnabled', args(), notNull(scalar('Boolean')))
                        )))
                ))))),
            field('iceServers', 'iceServers', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('urls', 'urls', args(), notNull(list(notNull(scalar('String'))))),
                    field('username', 'username', args(), scalar('String')),
                    field('credential', 'credential', args(), scalar('String'))
                ))))),
            field('parent', 'parent', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('SharedRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('title', 'title', args(), notNull(scalar('String'))),
                        field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                        field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                        field('photo', 'photo', args(), notNull(scalar('String'))),
                        field('owner', 'owner', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('name', 'name', args(), notNull(scalar('String')))
                            ))
                    )),
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
                    inline('VoiceChat', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    ))
                ))
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
            field('hasActiveCall', 'hasActiveCall', args(), notNull(scalar('Boolean'))),
            field('hasActiveVoiceChat', 'hasActiveVoiceChat', args(), notNull(scalar('Boolean'))),
            field('haveMention', 'haveMention', args(), notNull(scalar('Boolean'))),
            field('alphaTopMessage', 'topMessage', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('ModernMessage', DialogMessageSelector)
                )),
            field('membership', 'membership', args(), notNull(scalar('String'))),
            field('featured', 'featured', args(), notNull(scalar('Boolean')))
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
                            field('photo', 'photo', args(), notNull(scalar('String'))),
                            field('kind', 'kind', args(), notNull(scalar('String'))),
                            field('featured', 'featured', args(), notNull(scalar('Boolean')))
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
            )),
            inline('DialogCallStateChanged', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('hasActiveCall', 'hasActiveCall', args(), notNull(scalar('Boolean')))
            )),
            inline('DialogVoiceChatStateChanged', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('hasActiveVoiceChat', 'hasActiveVoiceChat', args(), notNull(scalar('Boolean')))
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
            field('premiumPassIsActive', 'premiumPassIsActive', args(), notNull(scalar('Boolean'))),
            field('featured', 'featured', args(), notNull(scalar('Boolean')))
        );

const DiscoverChatsCollectionSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('title', 'title', args(), notNull(scalar('String'))),
            field('shortname', 'shortname', args(), scalar('String')),
            field('chatsCount', 'chatsCount', args(), notNull(scalar('Int'))),
            field('chats', 'chats', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('SharedRoom', DiscoverSharedRoomSelector)
                ))))),
            field('description', 'description', args(), scalar('String')),
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
            field('shortname', 'shortname', args(), scalar('String')),
            field('chatsCount', 'chatsCount', args(), notNull(scalar('Int'))),
            field('description', 'description', args(), scalar('String')),
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

const DiscoverOrganizationSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
            field('shortname', 'shortname', args(), scalar('String')),
            field('alphaFeatured', 'featured', args(), notNull(scalar('Boolean')))
        );

const FullMessageWithoutSourceSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('seq', 'seq', args(), scalar('Int')),
            field('date', 'date', args(), notNull(scalar('Date'))),
            field('sender', 'sender', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('User', MessageSenderSelector)
                ))),
            field('senderBadge', 'senderBadge', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('UserBadge', UserBadgeSelector)
                )),
            field('message', 'message', args(), scalar('String')),
            field('fallback', 'fallback', args(), notNull(scalar('String'))),
            field('spans', 'spans', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('MessageSpan', MessageSpanSelector)
                ))))),
            inline('GeneralMessage', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('edited', 'edited', args(), notNull(scalar('Boolean'))),
                field('commentsCount', 'commentsCount', args(), notNull(scalar('Int'))),
                field('attachments', 'attachments', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessageAttachment', MessageAttachmentsSelector)
                    ))))),
                field('quotedMessages', 'quotedMessages', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', QuotedMessageSelector)
                    ))))),
                field('reactionCounters', 'reactionCounters', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ReactionCounter', MessageReactionCounterSelector)
                    ))))),
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
                field('overrideName', 'overrideName', args(), scalar('String'))
            )),
            inline('StickerMessage', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('commentsCount', 'commentsCount', args(), notNull(scalar('Int'))),
                field('quotedMessages', 'quotedMessages', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', QuotedMessageSelector)
                    ))))),
                field('sticker', 'sticker', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Sticker', StickerFragmentSelector)
                    ))),
                field('reactionCounters', 'reactionCounters', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ReactionCounter', MessageReactionCounterSelector)
                    ))))),
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
                field('overrideName', 'overrideName', args(), scalar('String'))
            )),
            inline('ServiceMessage', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('serviceMetadata', 'serviceMetadata', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ServiceMetadata', ServiceMessageMetadataSelector)
                    ))
            ))
        );

const FullVoiceChatSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('speakers', 'speakers', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('VoiceChatParticipant', VoiceChatParticipantSelector)
                ))))),
            field('listeners', 'listeners', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('VoiceChatParticipant', VoiceChatParticipantSelector)
                ))))),
            fragment('VoiceChat', VoiceChatEntitySelector)
        );

const MediaStreamFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('seq', 'seq', args(), notNull(scalar('Int'))),
            field('state', 'state', args(), notNull(scalar('String'))),
            field('sdp', 'sdp', args(), scalar('String')),
            field('ice', 'ice', args(), notNull(list(notNull(scalar('String'))))),
            field('iceTransportPolicy', 'iceTransportPolicy', args(), notNull(scalar('String'))),
            field('receivers', 'receivers', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('peerId', 'peerId', args(), scalar('ID')),
                    field('kind', 'kind', args(), notNull(scalar('String'))),
                    field('videoSource', 'videoSource', args(), scalar('String')),
                    field('mid', 'mid', args(), scalar('String'))
                ))))),
            field('senders', 'senders', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('kind', 'kind', args(), notNull(scalar('String'))),
                    field('videoSource', 'videoSource', args(), scalar('String')),
                    field('codecParams', 'codecParams', args(), scalar('String')),
                    field('mid', 'mid', args(), scalar('String'))
                )))))
        );

const MessageUsersReactionsSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('user', 'user', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('name', 'name', args(), notNull(scalar('String'))),
                    field('photo', 'photo', args(), scalar('String'))
                ))),
            field('reaction', 'reaction', args(), notNull(scalar('String')))
        );

const MyStickersFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('unviewedCount', 'unviewedCount', args(), notNull(scalar('Int'))),
            field('packs', 'packs', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('title', 'title', args(), notNull(scalar('String'))),
                    field('stickers', 'stickers', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('Sticker', StickerFragmentSelector)
                        )))))
                )))))
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
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('kind', 'kind', args(), notNull(scalar('String'))),
                field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                field('isPremium', 'isPremium', args(), notNull(scalar('Boolean'))),
                field('title', 'title', args(), notNull(scalar('String'))),
                field('photo', 'photo', args(), notNull(scalar('String'))),
                field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                field('featured', 'featured', args(), notNull(scalar('Boolean'))),
                field('settings', 'settings', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('mute', 'mute', args(), scalar('Boolean'))
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
                                        inline('CommentPeerRootPost', obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('post', 'post', args(), notNull(obj(
                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                    field('id', 'id', args(), notNull(scalar('ID')))
                                                )))
                                        ))
                                    ))),
                                field('subscription', 'subscription', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('type', 'type', args(), scalar('String'))
                                    ))
                            )))
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
                                            inline('CommentPeerRootPost', obj(
                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                field('post', 'post', args(), notNull(obj(
                                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                        field('id', 'id', args(), notNull(scalar('ID')))
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

const OrganizationFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('isMine', 'isMine', args(), notNull(scalar('Boolean'))),
            field('isDeleted', 'isDeleted', args(), notNull(scalar('Boolean'))),
            field('superAccountId', 'superAccountId', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String')),
            field('shortname', 'shortname', args(), scalar('String')),
            field('website', 'website', args(), scalar('String')),
            field('websiteTitle', 'websiteTitle', args(), scalar('String')),
            field('about', 'about', args(), scalar('String')),
            field('twitter', 'twitter', args(), scalar('String')),
            field('facebook', 'facebook', args(), scalar('String')),
            field('linkedin', 'linkedin', args(), scalar('String')),
            field('instagram', 'instagram', args(), scalar('String')),
            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
            field('applyLink', 'applyLink', args(), scalar('String')),
            field('applyLinkEnabled', 'applyLinkEnabled', args(), notNull(scalar('Boolean'))),
            field('owner', 'owner', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                ))),
            field('alphaIsPrivate', 'private', args(), notNull(scalar('Boolean'))),
            field('betaIsOwner', 'isOwner', args(), notNull(scalar('Boolean'))),
            field('betaIsAdmin', 'isAdmin', args(), notNull(scalar('Boolean'))),
            field('alphaFeatured', 'featured', args(), notNull(scalar('Boolean'))),
            field('alphaIsCommunity', 'isCommunity', args(), notNull(scalar('Boolean'))),
            field('betaPublicRoomsCount', 'roomsCount', args(), notNull(scalar('Int'))),
            field('betaMembersCanInvite', 'membersCanInvite', args(), notNull(scalar('Boolean')))
        );

const OrganizationProfileFragmentSelector = obj(
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
            field('applyLink', 'applyLink', args(), scalar('String')),
            field('applyLinkEnabled', 'applyLinkEnabled', args(), notNull(scalar('Boolean'))),
            field('autosubscribeRooms', 'autosubscribeRooms', args(), notNull(list(notNull(scalar('ID'))))),
            field('alphaIsCommunity', 'isCommunity', args(), notNull(scalar('Boolean'))),
            field('alphaIsPrivate', 'private', args(), notNull(scalar('Boolean'))),
            field('alphaFeatured', 'featured', args(), notNull(scalar('Boolean'))),
            field('alphaPublished', 'published', args(), notNull(scalar('Boolean'))),
            field('alphaEditorial', 'editorial', args(), notNull(scalar('Boolean'))),
            field('betaMembersCanInvite', 'membersCanInvite', args(), notNull(scalar('Boolean')))
        );

const ParagraphSimpleSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('TextParagraph', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('text', 'text', args(), notNull(scalar('String'))),
                field('spans', 'spans', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        inline('PostSpanBold', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('offset', 'offset', args(), notNull(scalar('Int'))),
                            field('length', 'length', args(), notNull(scalar('Int')))
                        )),
                        inline('PostSpanItalic', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('offset', 'offset', args(), notNull(scalar('Int'))),
                            field('length', 'length', args(), notNull(scalar('Int')))
                        )),
                        inline('PostSpanIrony', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('offset', 'offset', args(), notNull(scalar('Int'))),
                            field('length', 'length', args(), notNull(scalar('Int')))
                        )),
                        inline('PostSpanLink', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('offset', 'offset', args(), notNull(scalar('Int'))),
                            field('length', 'length', args(), notNull(scalar('Int'))),
                            field('url', 'url', args(), notNull(scalar('String')))
                        ))
                    )))))
            )),
            inline('ImageParagraph', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('url', 'url', args(), notNull(scalar('String'))),
                field('image', 'image', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('uuid', 'uuid', args(), notNull(scalar('String')))
                    ))),
                field('fileMetadata', 'fileMetadata', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('isImage', 'isImage', args(), notNull(scalar('Boolean'))),
                        field('imageWidth', 'imageWidth', args(), scalar('Int')),
                        field('imageHeight', 'imageHeight', args(), scalar('Int')),
                        field('imageFormat', 'imageFormat', args(), scalar('String'))
                    )))
            )),
            inline('H1Paragraph', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('text', 'text', args(), notNull(scalar('String')))
            )),
            inline('H2Paragraph', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('text', 'text', args(), notNull(scalar('String')))
            ))
        );

const PaymentSelector = obj(
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
            field('channels', 'channels', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('showNotification', 'showNotification', args(), notNull(scalar('Boolean'))),
                    field('sound', 'sound', args(), notNull(scalar('Boolean')))
                ))),
            field('notificationPreview', 'notificationPreview', args(), notNull(scalar('String')))
        );

const PostDraftSimpleSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('title', 'title', args(), notNull(scalar('String'))),
            field('content', 'content', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Paragraph', ParagraphSimpleSelector)
                ))))),
            field('publishedCopy', 'publishedCopy', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )),
            field('channel', 'channel', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('title', 'title', args(), notNull(scalar('String'))),
                    field('shortname', 'shortname', args(), notNull(scalar('String')))
                )),
            field('createdAt', 'createdAt', args(), notNull(scalar('Date'))),
            field('updatedAt', 'updatedAt', args(), scalar('Date')),
            field('deletedAt', 'deletedAt', args(), scalar('Date'))
        );

const PostSimpleSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('title', 'title', args(), notNull(scalar('String'))),
            field('content', 'content', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Paragraph', ParagraphSimpleSelector)
                ))))),
            field('channel', 'channel', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('title', 'title', args(), notNull(scalar('String'))),
                    field('shortname', 'shortname', args(), notNull(scalar('String')))
                )),
            field('author', 'author', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('name', 'name', args(), notNull(scalar('String')))
                )),
            field('draft', 'draft', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )),
            field('canEdit', 'canEdit', args(), notNull(scalar('Boolean'))),
            field('createdAt', 'createdAt', args(), notNull(scalar('Date'))),
            field('updatedAt', 'updatedAt', args(), scalar('Date')),
            field('deletedAt', 'deletedAt', args(), scalar('Date'))
        );

const RoomSmallSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('title', 'title', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), notNull(scalar('String'))),
            field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
            field('isPremium', 'isPremium', args(), notNull(scalar('Boolean'))),
            field('featured', 'featured', args(), notNull(scalar('Boolean')))
        );

const SettingsFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('version', 'version', args(), notNull(scalar('Int'))),
            field('primaryEmail', 'primaryEmail', args(), notNull(scalar('String'))),
            field('emailFrequency', 'emailFrequency', args(), notNull(scalar('String'))),
            field('excludeMutedChats', 'excludeMutedChats', args(), notNull(scalar('Boolean'))),
            field('countUnreadChats', 'countUnreadChats', args(), notNull(scalar('Boolean'))),
            field('whoCanSeeEmail', 'whoCanSeeEmail', args(), notNull(scalar('String'))),
            field('whoCanSeePhone', 'whoCanSeePhone', args(), notNull(scalar('String'))),
            field('whoCanAddToGroups', 'whoCanAddToGroups', args(), notNull(scalar('String'))),
            field('communityAdminsCanSeeContactInfo', 'communityAdminsCanSeeContactInfo', args(), notNull(scalar('Boolean'))),
            field('desktop', 'desktop', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('PlatformNotificationSettings', PlatformNotificationSettingsFullSelector)
                ))),
            field('mobile', 'mobile', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('PlatformNotificationSettings', PlatformNotificationSettingsFullSelector)
                )))
        );

const SharedRoomPreviewSelector = obj(
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
            field('title', 'title', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), notNull(scalar('String'))),
            field('externalSocialImage', 'externalSocialImage', args(), scalar('String')),
            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
            field('description', 'description', args(), scalar('String')),
            field('featured', 'featured', args(), notNull(scalar('Boolean'))),
            field('previewMembers', 'previewMembers', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('name', 'name', args(), notNull(scalar('String'))),
                    field('photo', 'photo', args(), scalar('String'))
                )))))
        );

const SharedRoomViewSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('title', 'title', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), notNull(scalar('String'))),
            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
            field('featured', 'featured', args(), notNull(scalar('Boolean')))
        );

const UpdateRoomSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('PrivateRoom', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('hasActiveCall', 'hasActiveCall', args(), notNull(scalar('Boolean'))),
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
                field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                field('isPremium', 'isPremium', args(), notNull(scalar('Boolean'))),
                field('title', 'title', args(), notNull(scalar('String'))),
                field('photo', 'photo', args(), notNull(scalar('String'))),
                field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                field('featured', 'featured', args(), notNull(scalar('Boolean'))),
                field('hasActiveCall', 'hasActiveCall', args(), notNull(scalar('Boolean'))),
                field('hasActiveVoiceChat', 'hasActiveVoiceChat', args(), notNull(scalar('Boolean'))),
                field('settings', 'settings', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('mute', 'mute', args(), scalar('Boolean'))
                    )))
            ))
        );

const UpdateMessageSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('seq', 'seq', args(), scalar('Int')),
            field('date', 'date', args(), notNull(scalar('Date'))),
            field('sender', 'sender', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                ))),
            field('message', 'message', args(), scalar('String')),
            field('fallback', 'fallback', args(), notNull(scalar('String'))),
            field('spans', 'spans', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('MessageSpan', MessageSpanSelector)
                ))))),
            inline('GeneralMessage', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('edited', 'edited', args(), notNull(scalar('Boolean'))),
                field('isMentioned', 'isMentioned', args(), notNull(scalar('Boolean'))),
                field('commentsCount', 'commentsCount', args(), notNull(scalar('Int'))),
                field('attachments', 'attachments', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessageAttachment', MessageAttachmentsSelector)
                    ))))),
                field('quotedMessages', 'quotedMessages', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', QuotedMessageSelector)
                    ))))),
                field('reactionCounters', 'reactionCounters', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ReactionCounter', MessageReactionCounterSelector)
                    ))))),
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
                field('overrideName', 'overrideName', args(), scalar('String'))
            )),
            inline('StickerMessage', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('commentsCount', 'commentsCount', args(), notNull(scalar('Int'))),
                field('quotedMessages', 'quotedMessages', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', QuotedMessageSelector)
                    ))))),
                field('sticker', 'sticker', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Sticker', StickerFragmentSelector)
                    ))),
                field('reactionCounters', 'reactionCounters', args(), notNull(list(notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ReactionCounter', MessageReactionCounterSelector)
                    ))))),
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
                field('overrideName', 'overrideName', args(), scalar('String'))
            )),
            inline('ServiceMessage', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                field('isMentioned', 'isMentioned', args(), notNull(scalar('Boolean'))),
                field('serviceMetadata', 'serviceMetadata', args(), obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ServiceMetadata', ServiceMessageMetadataSelector)
                    ))
            ))
        );

const ShortSequenceChatSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('cid', 'cid', args(), notNull(scalar('ID'))),
            field('draft', 'draft', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('version', 'version', args(), notNull(scalar('Int'))),
                    field('message', 'message', args(), scalar('String')),
                    field('date', 'date', args(), notNull(scalar('Date')))
                )),
            field('states', 'states', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('counter', 'counter', args(), notNull(scalar('Int'))),
                    field('mentions', 'mentions', args(), notNull(scalar('Int'))),
                    field('readSeq', 'readSeq', args(), notNull(scalar('Int')))
                )),
            field('room', 'room', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', UpdateRoomSelector)
                )),
            field('topMessage', 'topMessage', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('ModernMessage', UpdateMessageSelector)
                ))
        );

const ShortSequenceCommonSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('settings', 'settings', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Settings', SettingsFullSelector)
                )))
        );

const ShortSequenceSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            inline('SequenceChat', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                fragment('SequenceChat', ShortSequenceChatSelector)
            )),
            inline('SequenceCommon', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('id', 'id', args(), notNull(scalar('ID'))),
                fragment('SequenceCommon', ShortSequenceCommonSelector)
            ))
        );

const ShortUpdateSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('UpdateMyProfileChanged', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('user', 'user', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('firstName', 'firstName', args(), notNull(scalar('String'))),
                        field('lastName', 'lastName', args(), scalar('String'))
                    )))
            )),
            inline('UpdateChatDraftChanged', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('draft', 'draft', args(), scalar('String')),
                field('version', 'version', args(), notNull(scalar('Int'))),
                field('date', 'date', args(), notNull(scalar('Date')))
            )),
            inline('UpdateSettingsChanged', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('settings', 'settings', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Settings', SettingsFullSelector)
                    )))
            )),
            inline('UpdateChatMessage', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('message', 'message', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('ModernMessage', UpdateMessageSelector)
                    )))
            )),
            inline('UpdateChatMessageDeleted', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('mid', 'mid', args(), notNull(scalar('ID'))),
                field('seq', 'seq', args(), notNull(scalar('Int')))
            )),
            inline('UpdateChatRead', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('cid', 'cid', args(), notNull(scalar('ID'))),
                field('seq', 'seq', args(), notNull(scalar('Int')))
            )),
            inline('UpdateRoomChanged', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('room', 'room', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('Room', UpdateRoomSelector)
                    )))
            ))
        );

const StickerPackFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('title', 'title', args(), notNull(scalar('String'))),
            field('added', 'added', args(), notNull(scalar('Boolean'))),
            field('private', 'private', args(), notNull(scalar('Boolean'))),
            field('canAdd', 'canAdd', args(), notNull(scalar('Boolean'))),
            field('stickers', 'stickers', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Sticker', StickerFragmentSelector)
                )))))
        );

const SuperStickerPackFragmentSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('title', 'title', args(), notNull(scalar('String'))),
            field('published', 'published', args(), notNull(scalar('Boolean'))),
            field('private', 'private', args(), notNull(scalar('Boolean'))),
            field('listed', 'listed', args(), notNull(scalar('Boolean'))),
            field('added', 'added', args(), notNull(scalar('Boolean'))),
            field('author', 'author', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('name', 'name', args(), notNull(scalar('String')))
                ))),
            field('stickers', 'stickers', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('ImageSticker', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('emoji', 'emoji', args(), notNull(scalar('String'))),
                        field('image', 'image', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('uuid', 'uuid', args(), notNull(scalar('String')))
                            )))
                    ))
                )))))
        );

const UpdateUserSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('firstName', 'firstName', args(), notNull(scalar('String'))),
            field('lastName', 'lastName', args(), scalar('String')),
            field('photo', 'photo', args(), scalar('String'))
        );

const UserFollowerSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('shortname', 'shortname', args(), scalar('String')),
            field('about', 'about', args(), scalar('String')),
            field('followersCount', 'followersCount', args(), notNull(scalar('Int'))),
            field('followedByMe', 'followedByMe', args(), notNull(scalar('Boolean'))),
            field('photo', 'photo', args(), scalar('String'))
        );

const UserFullSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('firstName', 'firstName', args(), notNull(scalar('String'))),
            field('lastName', 'lastName', args(), scalar('String')),
            field('photo', 'photo', args(), scalar('String')),
            field('phone', 'phone', args(), scalar('String')),
            field('birthDay', 'birthDay', args(), scalar('Date')),
            field('email', 'email', args(), scalar('String')),
            field('website', 'website', args(), scalar('String')),
            field('about', 'about', args(), scalar('String')),
            field('birthDay', 'birthDay', args(), scalar('Date')),
            field('location', 'location', args(), scalar('String')),
            field('isBot', 'isBot', args(), notNull(scalar('Boolean'))),
            field('isDeleted', 'isDeleted', args(), notNull(scalar('Boolean'))),
            field('online', 'online', args(), notNull(scalar('Boolean'))),
            field('lastSeen', 'lastSeen', args(), scalar('String')),
            field('joinDate', 'joinDate', args(), notNull(scalar('Date'))),
            field('linkedin', 'linkedin', args(), scalar('String')),
            field('instagram', 'instagram', args(), scalar('String')),
            field('twitter', 'twitter', args(), scalar('String')),
            field('facebook', 'facebook', args(), scalar('String')),
            field('shortname', 'shortname', args(), scalar('String')),
            field('audienceSize', 'audienceSize', args(), notNull(scalar('Int'))),
            field('inContacts', 'inContacts', args(), notNull(scalar('Boolean'))),
            field('isBanned', 'isBanned', args(), notNull(scalar('Boolean'))),
            field('isMeBanned', 'isMeBanned', args(), notNull(scalar('Boolean'))),
            field('followedByMe', 'followedByMe', args(), notNull(scalar('Boolean'))),
            field('followersCount', 'followersCount', args(), notNull(scalar('Int'))),
            field('followingCount', 'followingCount', args(), notNull(scalar('Int'))),
            field('currentVoiceChat', 'currentVoiceChat', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('VoiceChat', VoiceChatWithSpeakersSelector)
                ))
        );

const WalletGroupSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('title', 'title', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), notNull(scalar('String')))
        );

const WalletUserSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            field('id', 'id', args(), notNull(scalar('ID'))),
            field('name', 'name', args(), notNull(scalar('String'))),
            field('photo', 'photo', args(), scalar('String'))
        );

const WalletProductSelector = obj(
            field('__typename', '__typename', args(), notNull(scalar('String'))),
            inline('WalletProductGroup', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('group', 'group', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('SharedRoom', WalletGroupSelector)
                    )))
            )),
            inline('WalletProductDonation', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('user', 'user', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('User', WalletUserSelector)
                    )))
            )),
            inline('WalletProductDonationMessage', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('user', 'user', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('User', WalletUserSelector)
                    ))),
                field('chat', 'chat', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        inline('SharedRoom', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('title', 'title', args(), notNull(scalar('String')))
                        ))
                    )))
            )),
            inline('WalletProductDonationReaction', obj(
                field('__typename', '__typename', args(), notNull(scalar('String'))),
                field('user', 'user', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('User', WalletUserSelector)
                    ))),
                field('chat', 'chat', args(), notNull(obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        inline('SharedRoom', obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('title', 'title', args(), notNull(scalar('String')))
                        ))
                    )))
            ))
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
                                fragment('Payment', PaymentSelector)
                            ))
                    )),
                    inline('WalletTransactionIncome', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('amount', 'amount', args(), notNull(scalar('Int'))),
                        field('payment', 'payment', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('Payment', PaymentSelector)
                            )),
                        field('source', 'source', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                inline('WalletSubscription', obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('product', 'product', args(), notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            fragment('WalletProduct', WalletProductSelector)
                                        )))
                                )),
                                inline('Purchase', obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('user', 'user', args(), notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            fragment('User', WalletUserSelector)
                                        ))),
                                    field('product', 'product', args(), notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            fragment('WalletProduct', WalletProductSelector)
                                        )))
                                ))
                            ))
                    )),
                    inline('WalletTransactionTransferIn', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('amount', 'amount', args(), notNull(scalar('Int'))),
                        field('payment', 'payment', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('Payment', PaymentSelector)
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
                                fragment('Payment', PaymentSelector)
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
                                        fragment('WalletProduct', WalletProductSelector)
                                    )))
                            ))),
                        field('payment', 'payment', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('Payment', PaymentSelector)
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
                                        fragment('WalletProduct', WalletProductSelector)
                                    )))
                            ))),
                        field('payment', 'payment', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('Payment', PaymentSelector)
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
                        fragment('Payment', PaymentSelector)
                    )))
            ))
        );

const AccountSelector = obj(
            field('me', 'me', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('name', 'name', args(), notNull(scalar('String'))),
                    field('photo', 'photo', args(), scalar('String')),
                    field('shortname', 'shortname', args(), scalar('String')),
                    field('email', 'email', args(), scalar('String'))
                )),
            field('myProfile', 'myProfile', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('authEmail', 'authEmail', args(), scalar('String'))
                )),
            field('sessionState', 'sessionState', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('isLoggedIn', 'isLoggedIn', args(), notNull(scalar('Boolean'))),
                    field('isActivated', 'isActivated', args(), notNull(scalar('Boolean'))),
                    field('isProfileCreated', 'isProfileCreated', args(), notNull(scalar('Boolean'))),
                    field('isAccountActivated', 'isAccountActivated', args(), notNull(scalar('Boolean'))),
                    field('isAccountExists', 'isAccountExists', args(), notNull(scalar('Boolean'))),
                    field('isAccountPicked', 'isAccountPicked', args(), notNull(scalar('Boolean'))),
                    field('isCompleted', 'isCompleted', args(), notNull(scalar('Boolean'))),
                    field('isBlocked', 'isBlocked', args(), notNull(scalar('Boolean')))
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
                            fragment('User', UserSmallSelector)
                        ))
                )),
            field('appInviteInfo', 'appInvite', args(fieldValue("key", refValue('inviteKey'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('inviter', 'inviter', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserSmallSelector)
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
                            fragment('User', UserSmallSelector)
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
const ActiveVoiceChatsSelector = obj(
            field('activeVoiceChats', 'activeVoiceChats', args(fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('cursor', 'cursor', args(), scalar('String')),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('VoiceChat', VoiceChatWithSpeakersSelector)
                        )))))
                )))
        );
const AuthPointsSelector = obj(
            field('authPoints', 'authPoints', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('email', 'email', args(), scalar('String')),
                    field('phone', 'phone', args(), scalar('String'))
                )))
        );
const AuthResolveShortNameSelector = obj(
            field('alphaResolveShortName', 'item', args(fieldValue("shortname", refValue('shortname'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('User', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('name', 'name', args(), notNull(scalar('String'))),
                        field('firstName', 'firstName', args(), notNull(scalar('String'))),
                        field('lastName', 'lastName', args(), scalar('String')),
                        field('photo', 'photo', args(), scalar('String')),
                        field('externalSocialImage', 'externalSocialImage', args(), scalar('String')),
                        field('online', 'online', args(), notNull(scalar('Boolean'))),
                        field('currentVoiceChat', 'currentVoiceChat', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('title', 'title', args(), scalar('String')),
                                field('speakersCount', 'speakersCount', args(), notNull(scalar('Int'))),
                                field('listenersCount', 'listenersCount', args(), notNull(scalar('Int'))),
                                field('speakers', 'speakers', args(), notNull(list(notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('user', 'user', args(), notNull(obj(
                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                field('id', 'id', args(), notNull(scalar('ID'))),
                                                field('name', 'name', args(), notNull(scalar('String'))),
                                                field('photo', 'photo', args(), scalar('String'))
                                            )))
                                    )))))
                            ))
                    )),
                    inline('Organization', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('name', 'name', args(), notNull(scalar('String'))),
                        field('photo', 'photo', args(), scalar('String')),
                        field('about', 'about', args(), scalar('String')),
                        field('applyLinkEnabled', 'applyLinkEnabled', args(), notNull(scalar('Boolean'))),
                        field('applyLink', 'applyLink', args(), scalar('String')),
                        field('externalSocialImage', 'externalSocialImage', args(), scalar('String')),
                        field('alphaIsCommunity', 'isCommunity', args(), notNull(scalar('Boolean'))),
                        field('alphaFeatured', 'featured', args(), notNull(scalar('Boolean'))),
                        field('owner', 'orgOwner', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID')))
                            )))
                    )),
                    inline('SharedRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        fragment('SharedRoom', SharedRoomPreviewSelector)
                    )),
                    inline('DiscoverChatsCollection', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    ))
                ))
        );
const BlackListUpdatesStateSelector = obj(
            field('blackListUpdatesState', 'blackListUpdatesState', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('state', 'state', args(), notNull(scalar('String')))
                )))
        );
const ChannelSelector = obj(
            field('channel', 'channel', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Channel', ChannelSimpleSelector)
                ))
        );
const ChannelsSelector = obj(
            field('channels', 'channels', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Channel', ChannelSimpleSelector)
                )))))
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
                        field('previewMembers', 'previewMembers', args(), notNull(list(notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID'))),
                                field('photo', 'photo', args(), scalar('String')),
                                field('name', 'name', args(), notNull(scalar('String')))
                            ))))),
                        field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                        field('isPremium', 'isPremium', args(), notNull(scalar('Boolean'))),
                        field('featured', 'featured', args(), notNull(scalar('Boolean'))),
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
const ChatMentionSearchSelector = obj(
            field('betaChatMentionSearch', 'mentions', args(fieldValue("cid", refValue('cid')), fieldValue("query", refValue('query')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            inline('MentionSearchOrganization', obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('organization', 'organization', args(), notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        fragment('Organization', OrganizationSmallSelector)
                                    )))
                            )),
                            inline('MentionSearchUser', obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('user', 'user', args(), notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        fragment('User', UserSmallSelector)
                                    ))),
                                field('fromSameChat', 'fromSameChat', args(), notNull(scalar('Boolean')))
                            )),
                            inline('MentionSearchSharedRoom', obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('room', 'room', args(), notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('featured', 'featured', args(), notNull(scalar('Boolean'))),
                                        fragment('SharedRoom', RoomSmallSelector)
                                    )))
                            ))
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
        );
const ChatNewGetMessageSelector = obj(
            field('message', 'message', args(fieldValue("messageId", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('ModernMessage', ChatNewMessageFragmentSelector)
                ))
        );
const ChatNewLoadAfterSelector = obj(
            field('gammaMessages', 'batch', args(fieldValue("chatId", refValue('chatId')), fieldValue("first", refValue('limit')), fieldValue("after", refValue('after'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('messages', 'messages', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('ModernMessage', ChatNewMessageFragmentSelector)
                        ))))),
                    field('haveMoreForward', 'haveMoreForward', args(), scalar('Boolean'))
                ))
        );
const ChatNewLoadBeforeSelector = obj(
            field('gammaMessages', 'batch', args(fieldValue("chatId", refValue('chatId')), fieldValue("first", refValue('limit')), fieldValue("before", refValue('before'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('messages', 'messages', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('ModernMessage', ChatNewMessageFragmentSelector)
                        ))))),
                    field('haveMoreBackward', 'haveMoreBackward', args(), scalar('Boolean'))
                ))
        );
const ChatNewReadLastReadSelector = obj(
            field('lastReadedMessage', 'message', args(fieldValue("chatId", refValue('chatId'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                ))
        );
const CommentFullReactionsSelector = obj(
            field('commentEntry', 'commentEntry', args(fieldValue("entryId", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('comment', 'comment', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('reactions', 'reactions', args(), notNull(list(notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('ModernMessageReaction', MessageUsersReactionsSelector)
                                )))))
                        )))
                ))
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
                    field('peerRoot', 'peerRoot', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            inline('CommentPeerRootMessage', obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('chat', 'chat', args(), notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        inline('SharedRoom', obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('id', 'id', args(), notNull(scalar('ID'))),
                                            field('role', 'role', args(), notNull(scalar('String')))
                                        )),
                                        inline('PrivateRoom', obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('id', 'id', args(), notNull(scalar('ID')))
                                        ))
                                    )))
                            ))
                        ))),
                    field('subscription', 'subscription', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('type', 'type', args(), scalar('String'))
                        )),
                    field('comments', 'comments', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('CommentEntry', CommentEntryFragmentSelector)
                        )))))
                )))
        );
const CommonChatsWithUserSelector = obj(
            field('commonChatsWithUser', 'commonChatsWithUser', args(fieldValue("uid", refValue('uid')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('title', 'title', args(), notNull(scalar('String'))),
                            field('description', 'description', args(), scalar('String')),
                            field('photo', 'photo', args(), notNull(scalar('String'))),
                            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                            field('featured', 'featured', args(), notNull(scalar('Boolean')))
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String')),
                    field('count', 'count', args(), notNull(scalar('Int')))
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
                            fragment('MediaStream', MediaStreamFullSelector)
                        ))))),
                    field('iceServers', 'iceServers', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('urls', 'urls', args(), notNull(list(notNull(scalar('String'))))),
                            field('username', 'username', args(), scalar('String')),
                            field('credential', 'credential', args(), scalar('String'))
                        )))))
                )))
        );
const CreatedStickerPacksSelector = obj(
            field('createdStickerPacks', 'createdStickerPacks', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('StickerPack', SuperStickerPackFragmentSelector)
                )))))
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
                    field('shortname', 'shortname', args(), scalar('String')),
                    field('description', 'description', args(), scalar('String')),
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
const DiscoverNewOrganizationsSelector = obj(
            field('discoverNewAndGrowingOrganizations', 'discoverNewAndGrowingOrganizations', args(fieldValue("first", refValue('first')), fieldValue("seed", refValue('seed')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('Organization', DiscoverOrganizationSelector)
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
const DiscoverNoAuthSelector = obj(
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
            field('discoverTopPremium', 'discoverTopPremium', args(fieldValue("first", intValue(3))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('SharedRoom', DiscoverSharedRoomSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                ))),
            field('discoverTopFree', 'discoverTopFree', args(fieldValue("first", intValue(3))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('SharedRoom', DiscoverSharedRoomSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                ))),
            field('discoverCollections', 'discoverCollections', args(fieldValue("first", intValue(20))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('DiscoverChatsCollection', DiscoverChatsCollectionShortSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )),
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
                ))))),
            field('discoverTopOrganizations', 'discoverTopOrganizations', args(fieldValue("first", intValue(3))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('Organization', DiscoverOrganizationSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                ))),
            field('discoverNewAndGrowingOrganizations', 'discoverNewAndGrowingOrganizations', args(fieldValue("first", intValue(3)), fieldValue("seed", refValue('seed'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('Organization', DiscoverOrganizationSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
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
const DiscoverPopularOrganizationsSelector = obj(
            field('discoverTopOrganizations', 'discoverTopOrganizations', args(fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('Organization', DiscoverOrganizationSelector)
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
            field('discoverTopPremium', 'discoverTopPremium', args(fieldValue("first", intValue(3))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('SharedRoom', DiscoverSharedRoomSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                ))),
            field('discoverTopFree', 'discoverTopFree', args(fieldValue("first", intValue(3))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('SharedRoom', DiscoverSharedRoomSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                ))),
            field('discoverTopOrganizations', 'discoverTopOrganizations', args(fieldValue("first", intValue(3))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('Organization', DiscoverOrganizationSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                ))),
            field('discoverNewAndGrowingOrganizations', 'discoverNewAndGrowingOrganizations', args(fieldValue("first", intValue(3)), fieldValue("seed", refValue('seed'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('Organization', DiscoverOrganizationSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                ))),
            field('betaIsDiscoverDone', 'isDiscoverDone', args(), notNull(scalar('Boolean')))
        );
const FetchPushSettingsSelector = obj(
            field('pushSettings', 'pushSettings', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('webPushKey', 'webPushKey', args(), scalar('String'))
                )))
        );
const GetDifferenceSelector = obj(
            field('updatesDifference', 'updatesDifference', args(fieldValue("state", refValue('state'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('seq', 'seq', args(), notNull(scalar('Int'))),
                    field('state', 'state', args(), notNull(scalar('String'))),
                    field('hasMore', 'hasMore', args(), notNull(scalar('Boolean'))),
                    field('sequences', 'sequences', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('after', 'after', args(), notNull(scalar('Int'))),
                            field('events', 'events', args(), notNull(list(notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('pts', 'pts', args(), notNull(scalar('Int'))),
                                    field('event', 'event', args(), notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            fragment('UpdateEvent', ShortUpdateSelector)
                                        )))
                                ))))),
                            field('sequence', 'sequence', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('Sequence', ShortSequenceSelector)
                                )))
                        )))))
                )))
        );
const GetInitialDialogsSelector = obj(
            field('syncUserChats', 'syncUserChats', args(fieldValue("first", intValue(500)), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('sequence', 'sequence', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('Sequence', ShortSequenceSelector)
                                ))),
                            field('pts', 'pts', args(), notNull(scalar('Int')))
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
        );
const GetSequenceDifferenceSelector = obj(
            field('sequenceDifference', 'sequenceDifference', args(fieldValue("id", refValue('id')), fieldValue("pts", refValue('pts'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('sequence', 'sequence', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('Sequence', ShortSequenceSelector)
                        ))),
                    field('events', 'events', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('pts', 'pts', args(), notNull(scalar('Int'))),
                            field('event', 'event', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('UpdateEvent', ShortUpdateSelector)
                                )))
                        ))))),
                    field('after', 'after', args(), notNull(scalar('Int'))),
                    field('hasMore', 'hasMore', args(), notNull(scalar('Boolean'))),
                    field('seq', 'seq', args(), notNull(scalar('Int')))
                )))
        );
const GetSequenceStateSelector = obj(
            field('sequenceState', 'sequenceState', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('pts', 'pts', args(), notNull(scalar('Int'))),
                    field('seq', 'seq', args(), notNull(scalar('Int'))),
                    field('sequence', 'sequence', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('Sequence', ShortSequenceSelector)
                        )))
                )))
        );
const GetStateSelector = obj(
            field('updatesState', 'updatesState', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('seq', 'seq', args(), notNull(scalar('Int'))),
                    field('state', 'state', args(), notNull(scalar('String'))),
                    field('sequences', 'sequences', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('pts', 'pts', args(), notNull(scalar('Int'))),
                            field('sequence', 'sequence', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('Sequence', ShortSequenceSelector)
                                )))
                        )))))
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
                        field('alphaIsCommunity', 'isCommunity', args(), notNull(scalar('Boolean'))),
                        field('alphaFeatured', 'featured', args(), notNull(scalar('Boolean')))
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
                            )),
                        field('featured', 'featured', args(), notNull(scalar('Boolean')))
                    ))
                )))))
        );
const IpLocationSelector = obj(
            field('ipLocation', 'ipLocation', args(), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('countryCode', 'countryCode', args(), scalar('String'))
                ))
        );
const MessageSelector = obj(
            field('message', 'message', args(fieldValue("messageId", refValue('messageId'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('source', 'source', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            inline('MessageSourceChat', obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('chat', 'chat', args(), notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        inline('PrivateRoom', obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('id', 'id', args(), notNull(scalar('ID'))),
                                            field('user', 'user', args(), notNull(obj(
                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                                    field('isBot', 'isBot', args(), notNull(scalar('Boolean'))),
                                                    field('name', 'name', args(), notNull(scalar('String')))
                                                ))),
                                            field('pinnedMessage', 'pinnedMessage', args(), obj(
                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                    field('id', 'id', args(), notNull(scalar('ID')))
                                                ))
                                        )),
                                        inline('SharedRoom', obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            field('id', 'id', args(), notNull(scalar('ID'))),
                                            field('title', 'title', args(), notNull(scalar('String'))),
                                            field('isChannel', 'isChannel', args(), notNull(scalar('Boolean'))),
                                            field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                                            field('canSendMessage', 'canSendMessage', args(), notNull(scalar('Boolean'))),
                                            field('canEdit', 'canEdit', args(), notNull(scalar('Boolean'))),
                                            field('repliesEnabled', 'repliesEnabled', args(), notNull(scalar('Boolean'))),
                                            field('pinnedMessage', 'pinnedMessage', args(), obj(
                                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                    field('id', 'id', args(), notNull(scalar('ID')))
                                                )),
                                            field('role', 'role', args(), notNull(scalar('String')))
                                        ))
                                    )))
                            ))
                        )),
                    fragment('ModernMessage', FullMessageWithoutSourceSelector)
                )),
            field('comments', 'comments', args(fieldValue("peerId", refValue('messageId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('subscription', 'subscription', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('type', 'type', args(), scalar('String'))
                        ))
                )))
        );
const MessageFullReactionsSelector = obj(
            field('message', 'message', args(fieldValue("messageId", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    inline('GeneralMessage', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('reactions', 'reactions', args(), notNull(list(notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('ModernMessageReaction', MessageUsersReactionsSelector)
                            )))))
                    )),
                    inline('StickerMessage', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('reactions', 'reactions', args(), notNull(list(notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('ModernMessageReaction', MessageUsersReactionsSelector)
                            )))))
                    ))
                ))
        );
const MessageMultiSpanSelector = obj(
            field('message', 'message', args(fieldValue("messageId", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('spans', 'spans', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            inline('MessageSpanMultiUserMention', obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('users', 'users', args(), notNull(list(notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        fragment('User', UserSmallSelector)
                                    )))))
                            ))
                        )))))
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
            field('messagesSearch', 'messagesSearch', args(fieldValue("query", refValue('query')), fieldValue("sort", refValue('sort')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after')), fieldValue("cid", refValue('cid'))), notNull(obj(
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
                                                field('featured', 'featured', args(), notNull(scalar('Boolean'))),
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
const MessagesSearchFullSelector = obj(
            field('messagesSearch', 'messagesSearch', args(fieldValue("query", refValue('query')), fieldValue("sort", refValue('sort')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after')), fieldValue("cid", refValue('cid'))), notNull(obj(
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
                                            fragment('ModernMessage', FullMessageSelector)
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
const MyBlackListSelector = obj(
            field('myBlackList', 'myBlackList', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('isBanned', 'isBanned', args(), notNull(scalar('Boolean'))),
                    field('isMeBanned', 'isMeBanned', args(), notNull(scalar('Boolean'))),
                    fragment('User', UserShortSelector)
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
const MyCommunitiesSelector = obj(
            field('myCommunities', 'myCommunities', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                    field('betaIsOwner', 'isOwner', args(), notNull(scalar('Boolean'))),
                    field('betaIsAdmin', 'isAdmin', args(), notNull(scalar('Boolean'))),
                    fragment('Organization', OrganizationSmallSelector)
                )))))
        );
const MyContactsSelector = obj(
            field('myContacts', 'myContacts', args(fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('user', 'user', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('User', UserShortSelector)
                                )))
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
        );
const MyContactsSearchSelector = obj(
            field('myContactsSearch', 'myContactsSearch', args(fieldValue("query", refValue('query')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after')), fieldValue("page", refValue('page'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    fragment('User', UserShortSelector)
                                )))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean'))),
                            field('currentPage', 'currentPage', args(), notNull(scalar('Int')))
                        )))
                )))
        );
const MyContactsStateSelector = obj(
            field('myContactsState', 'myContactsState', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('state', 'state', args(), notNull(scalar('String')))
                )))
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
const MyPostDraftsSelector = obj(
            field('postMyDrafts', 'postMyDrafts', args(fieldValue("first", intValue(20)), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('PostDraft', PostDraftSimpleSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
        );
const MyStickersSelector = obj(
            field('myStickers', 'stickers', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('UserStickers', MyStickersFragmentSelector)
                )))
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
                    fragment('Organization', OrganizationFragmentSelector)
                )))
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
const OrganizationMembersSearchSelector = obj(
            field('orgMembersSearch', 'orgMembersSearch', args(fieldValue("orgId", refValue('orgId')), fieldValue("query", refValue('query')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after')), fieldValue("page", refValue('page'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('role', 'role', args(), notNull(scalar('String'))),
                                    field('user', 'user', args(), notNull(obj(
                                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                                            fragment('User', UserShortSelector)
                                        )))
                                ))),
                            field('cursor', 'cursor', args(), notNull(scalar('String')))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean')))
                        )))
                )))
        );
const OrganizationPicoSelector = obj(
            field('organization', 'organization', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
                    fragment('Organization', OrganizationSmallSelector)
                )))
        );
const OrganizationProfileSelector = obj(
            field('organizationProfile', 'organizationProfile', args(fieldValue("id", refValue('organizationId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('OrganizationProfile', OrganizationProfileFragmentSelector)
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
const PhonebookWasExportedSelector = obj(
            field('phonebookWasExported', 'phonebookWasExported', args(), notNull(scalar('Boolean')))
        );
const PicSharedMediaSelector = obj(
            field('chatSharedMedia', 'chatSharedMedia', args(fieldValue("chatId", refValue('chatId')), fieldValue("mediaTypes", listValue(stringValue("IMAGE"))), fieldValue("first", refValue('first')), fieldValue("after", refValue('after')), fieldValue("before", refValue('before')), fieldValue("around", refValue('around'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
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
const PostSelector = obj(
            field('post', 'post', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Post', PostSimpleSelector)
                ))
        );
const PostDraftSelector = obj(
            field('postDraft', 'postDraft', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('PostDraft', PostDraftSimpleSelector)
                ))
        );
const PostsSelector = obj(
            field('posts', 'posts', args(fieldValue("hubs", refValue('channels')), fieldValue("first", intValue(20)), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('Post', PostSimpleSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
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
                    field('birthDay', 'birthDay', args(), scalar('Date')),
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
                    )),
                    inline('DiscoverChatsCollection', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    )),
                    inline('Channel', obj(
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
                                field('isMine', 'isMine', args(), notNull(scalar('Boolean'))),
                                field('alphaIsCommunity', 'isCommunity', args(), notNull(scalar('Boolean'))),
                                field('alphaFeatured', 'featured', args(), notNull(scalar('Boolean')))
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
                                    field('featured', 'featured', args(), notNull(scalar('Boolean'))),
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
                        fragment('SharedRoom', SharedRoomPreviewSelector)
                    ))
                ))
        );
const RoomAdminMembersSelector = obj(
            field('roomAdmins', 'roomAdmins', args(fieldValue("roomId", refValue('roomId'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('user', 'user', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserShortSelector)
                        )))
                )))))
        );
const RoomChatSelector = obj(
            field('room', 'room', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', RoomShortSelector)
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
                                field('featured', 'featured', args(), notNull(scalar('Boolean'))),
                                field('organization', 'organization', args(), obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        fragment('Organization', OrganizationSmallSelector)
                                    )),
                                field('membership', 'membership', args(), notNull(scalar('String'))),
                                field('membersCount', 'membersCount', args(), notNull(scalar('Int'))),
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
const RoomMembersSearchSelector = obj(
            field('chatMembersSearch', 'chatMembersSearch', args(fieldValue("cid", refValue('cid')), fieldValue("query", refValue('query')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
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
                                ))),
                            field('cursor', 'cursor', args(), notNull(scalar('String')))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean')))
                        )))
                )))
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
                    field('giftStickerPackId', 'giftStickerPackId', args(), scalar('ID'))
                )),
            field('room', 'room', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('SharedRoom', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID'))),
                        field('stickerPack', 'stickerPack', args(), obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID')))
                            ))
                    ))
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
const ShouldAskForAppReviewSelector = obj(
            field('shouldAskForAppReview', 'shouldAskForAppReview', args(), notNull(scalar('Boolean')))
        );
const SocialUserFollowersSelector = obj(
            field('socialUserFollowers', 'socialUserFollowers', args(fieldValue("uid", refValue('uid')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserFollowerSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
        );
const SocialUserFollowingSelector = obj(
            field('socialUserFollowing', 'socialUserFollowing', args(fieldValue("uid", refValue('uid')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('User', UserFollowerSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
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
                    field('added', 'added', args(), notNull(scalar('Boolean'))),
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
const SuperAllStickerPacksSelector = obj(
            field('superAllStickerPacks', 'superAllStickerPacks', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('StickerPack', SuperStickerPackFragmentSelector)
                )))))
        );
const SuperBadgeInRoomSelector = obj(
            field('superBadgeInRoom', 'superBadgeInRoom', args(fieldValue("roomId", refValue('roomId')), fieldValue("userId", refValue('userId'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('UserBadge', UserBadgeSelector)
                ))
        );
const SuperStickerPackSelector = obj(
            field('stickerPack', 'stickerPack', args(fieldValue("id", refValue('id'))), obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('StickerPack', SuperStickerPackFragmentSelector)
                ))
        );
const SuperStickerPackCatalogSelector = obj(
            field('stickerPackCatalog', 'stickers', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('StickerPack', SuperStickerPackFragmentSelector)
                )))))
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
const UnviewedStickersSelector = obj(
            field('myStickers', 'stickers', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('unviewedCount', 'unviewedCount', args(), notNull(scalar('Int')))
                )))
        );
const UpdateUsersSelector = obj(
            field('users', 'users', args(fieldValue("ids", refValue('ids'))), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('User', UpdateUserSelector)
                )))))
        );
const UserSelector = obj(
            field('user', 'user', args(fieldValue("id", refValue('userId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
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
const UserFollowersSelector = obj(
            field('user', 'user', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('name', 'name', args(), notNull(scalar('String'))),
                    field('followersCount', 'followersCount', args(), notNull(scalar('Int'))),
                    field('followingCount', 'followingCount', args(), notNull(scalar('Int')))
                )))
        );
const UserNanoSelector = obj(
            field('user', 'user', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('name', 'name', args(), notNull(scalar('String'))),
                    field('photo', 'photo', args(), scalar('String')),
                    field('shortname', 'shortname', args(), scalar('String')),
                    field('isBot', 'isBot', args(), notNull(scalar('Boolean'))),
                    field('inContacts', 'inContacts', args(), notNull(scalar('Boolean'))),
                    field('isBanned', 'isBanned', args(), notNull(scalar('Boolean'))),
                    field('isMeBanned', 'isMeBanned', args(), notNull(scalar('Boolean')))
                )))
        );
const UserSearchForChatSelector = obj(
            field('userSearchForChat', 'userSearchForChat', args(fieldValue("chatId", refValue('chatId')), fieldValue("query", refValue('query')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after')), fieldValue("sort", refValue('sort'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('isBanned', 'isBanned', args(), notNull(scalar('Boolean'))),
                                    field('isMeBanned', 'isMeBanned', args(), notNull(scalar('Boolean'))),
                                    fragment('User', UserShortSelector)
                                ))),
                            field('isMember', 'isMember', args(), notNull(scalar('Boolean'))),
                            field('cursor', 'cursor', args(), notNull(scalar('String'))),
                            field('inviteRestricted', 'inviteRestricted', args(), notNull(scalar('Boolean')))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean')))
                        )))
                )))
        );
const UserSearchForOrganizationSelector = obj(
            field('userSearchForOrg', 'userSearchForOrg', args(fieldValue("orgId", refValue('orgId')), fieldValue("query", refValue('query')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after')), fieldValue("sort", refValue('sort'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('edges', 'edges', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('node', 'node', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('isBanned', 'isBanned', args(), notNull(scalar('Boolean'))),
                                    field('isMeBanned', 'isMeBanned', args(), notNull(scalar('Boolean'))),
                                    fragment('User', UserShortSelector)
                                ))),
                            field('isMember', 'isMember', args(), notNull(scalar('Boolean'))),
                            field('cursor', 'cursor', args(), notNull(scalar('String')))
                        ))))),
                    field('pageInfo', 'pageInfo', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('hasNextPage', 'hasNextPage', args(), notNull(scalar('Boolean')))
                        )))
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
const VoiceChatSelector = obj(
            field('voiceChat', 'voiceChat', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('VoiceChat', VoiceChatWithSpeakersSelector)
                )))
        );
const VoiceChatControlsSelector = obj(
            field('voiceChat', 'voiceChat', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('me', 'me', args(), obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('id', 'id', args(), notNull(scalar('ID'))),
                            field('user', 'user', args(), notNull(obj(
                                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                                    field('id', 'id', args(), notNull(scalar('ID'))),
                                    field('shortname', 'shortname', args(), scalar('String'))
                                ))),
                            field('status', 'status', args(), notNull(scalar('String'))),
                            field('handRaised', 'handRaised', args(), scalar('Boolean'))
                        ))
                )))
        );
const VoiceChatEventsStateSelector = obj(
            field('voiceChatEventsState', 'voiceChatEventsState', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('state', 'state', args(), notNull(scalar('String')))
                )))
        );
const VoiceChatFullSelector = obj(
            field('voiceChat', 'voiceChat', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('VoiceChat', FullVoiceChatSelector)
                )))
        );
const VoiceChatListenersSelector = obj(
            field('voiceChatListeners', 'voiceChatListeners', args(fieldValue("id", refValue('id')), fieldValue("first", refValue('first')), fieldValue("after", refValue('after'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('items', 'items', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('VoiceChatParticipant', VoiceChatParticipantSelector)
                        ))))),
                    field('cursor', 'cursor', args(), scalar('String'))
                )))
        );
const VoiceChatUserSelector = obj(
            field('user', 'user', args(fieldValue("id", refValue('uid'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('name', 'name', args(), notNull(scalar('String'))),
                    field('photo', 'photo', args(), scalar('String')),
                    field('followersCount', 'followersCount', args(), notNull(scalar('Int'))),
                    field('followedByMe', 'followedByMe', args(), notNull(scalar('Boolean'))),
                    field('about', 'about', args(), scalar('String'))
                ))),
            field('room', 'conversation', args(fieldValue("id", refValue('uid'))), obj(
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
const AccountInviteJoinSelector = obj(
            field('alphaJoinInvite', 'alphaJoinInvite', args(fieldValue("key", refValue('inviteKey'))), notNull(scalar('ID')))
        );
const AddAppToChatSelector = obj(
            field('addAppToChat', 'addAppToChat', args(fieldValue("appId", refValue('appId')), fieldValue("chatId", refValue('chatId'))), notNull(obj(
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
                )))
        );
const AddCommentSelector = obj(
            field('betaAddComment', 'betaAddComment', args(fieldValue("repeatKey", refValue('repeatKey')), fieldValue("peerId", refValue('peerId')), fieldValue("message", refValue('message')), fieldValue("replyComment", refValue('replyComment')), fieldValue("mentions", refValue('mentions')), fieldValue("fileAttachments", refValue('fileAttachments')), fieldValue("spans", refValue('spans'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const AddStickerSelector = obj(
            field('stickerPackAddSticker', 'stickerPackAddSticker', args(fieldValue("id", refValue('packId')), fieldValue("input", refValue('input'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('ImageSticker', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('id', 'id', args(), notNull(scalar('ID')))
                    ))
                )))
        );
const AddStickerCommentSelector = obj(
            field('betaAddStickerComment', 'addStickerComment', args(fieldValue("peerId", refValue('peerId')), fieldValue("stickerId", refValue('stickerId')), fieldValue("replyComment", refValue('replyComment')), fieldValue("repeatKey", refValue('repeatKey'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const AddToContactsSelector = obj(
            field('addToContacts', 'addToContacts', args(fieldValue("userId", refValue('userId'))), notNull(scalar('Boolean')))
        );
const BanUserSelector = obj(
            field('banUser', 'banUser', args(fieldValue("id", refValue('id'))), notNull(scalar('Boolean')))
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
const ChatDeleteSelector = obj(
            field('deleteChat', 'deleteChat', args(fieldValue("chatId", refValue('chatId')), fieldValue("oneSide", refValue('oneSide'))), notNull(scalar('Boolean')))
        );
const CommentDeleteUrlAugmentationSelector = obj(
            field('deleteCommentAugmentation', 'deleteCommentAugmentation', args(fieldValue("id", refValue('id'))), notNull(scalar('Boolean')))
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
const ConferenceJoinSelector = obj(
            field('conferenceJoin', 'conferenceJoin', args(fieldValue("id", refValue('id')), fieldValue("input", refValue('input'))), notNull(obj(
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
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const ConferenceLeaveSelector = obj(
            field('conferenceLeave', 'conferenceLeave', args(fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId'))), notNull(obj(
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
const DiscoverCollectionSetShortnameSelector = obj(
            field('alphaSetCollectionShortName', 'alphaSetCollectionShortName', args(fieldValue("id", refValue('id')), fieldValue("shortname", refValue('shortname'))), scalar('String'))
        );
const DiscoverCollectionsCreateSelector = obj(
            field('discoverCollectionsCreate', 'discoverCollectionsCreate', args(fieldValue("collection", objectValue(fieldValue('title', refValue('title')),fieldValue('description', refValue('description')),fieldValue('image', refValue('image')),fieldValue('chatIds', refValue('chatIds'))))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('title', 'title', args(), notNull(scalar('String')))
                )))
        );
const DiscoverCollectionsDeleteSelector = obj(
            field('discoverCollectionsDelete', 'discoverCollectionsDelete', args(fieldValue("id", refValue('id'))), notNull(scalar('Boolean')))
        );
const DiscoverCollectionsUpdateSelector = obj(
            field('discoverCollectionsUpdate', 'discoverCollectionsUpdate', args(fieldValue("id", refValue('id')), fieldValue("input", objectValue(fieldValue('title', refValue('title')),fieldValue('description', refValue('description')),fieldValue('image', refValue('image')),fieldValue('chatIds', refValue('chatIds'))))), notNull(obj(
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
const EditCommentSelector = obj(
            field('editComment', 'editComment', args(fieldValue("id", refValue('id')), fieldValue("message", refValue('message')), fieldValue("mentions", refValue('mentions')), fieldValue("fileAttachments", refValue('fileAttachments')), fieldValue("spans", refValue('spans'))), notNull(scalar('Boolean')))
        );
const EditMessageSelector = obj(
            field('editMessage', 'editMessage', args(fieldValue("messageId", refValue('messageId')), fieldValue("message", refValue('message')), fieldValue("replyMessages", refValue('replyMessages')), fieldValue("mentions", refValue('mentions')), fieldValue("fileAttachments", refValue('fileAttachments')), fieldValue("spans", refValue('spans'))), notNull(scalar('Boolean')))
        );
const MakeCardDefaultSelector = obj(
            field('cardMakeDefault', 'cardMakeDefault', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('isDefault', 'isDefault', args(), notNull(scalar('Boolean')))
                )))
        );
const MarkStickersViewedSelector = obj(
            field('myStickersMarkAsViewed', 'myStickersMarkAsViewed', args(), notNull(scalar('Boolean')))
        );
const MediaAnswerSelector = obj(
            field('mediaStreamAnswer', 'mediaStreamAnswer', args(fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId')), fieldValue("answer", refValue('answer')), fieldValue("seq", refValue('seq'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('streams', 'streams', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('MediaStream', MediaStreamFullSelector)
                        )))))
                )))
        );
const MediaCandidateSelector = obj(
            field('mediaStreamCandidate', 'mediaStreamCandidate', args(fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId')), fieldValue("candidate", refValue('candidate'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('streams', 'streams', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('MediaStream', MediaStreamFullSelector)
                        )))))
                )))
        );
const MediaFailedSelector = obj(
            field('mediaStreamFailed', 'mediaStreamFailed', args(fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('streams', 'streams', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('MediaStream', MediaStreamFullSelector)
                        )))))
                )))
        );
const MediaOfferSelector = obj(
            field('mediaStreamOffer', 'mediaStreamOffer', args(fieldValue("id", refValue('id')), fieldValue("peerId", refValue('peerId')), fieldValue("offer", refValue('offer')), fieldValue("seq", refValue('seq')), fieldValue("hints", refValue('hints'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('streams', 'streams', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('MediaStream', MediaStreamFullSelector)
                        )))))
                )))
        );
const MessageSetDonationReactionSelector = obj(
            field('messageDonationReactionAdd', 'messageDonationReactionAdd', args(fieldValue("messageId", refValue('messageId'))), notNull(scalar('Boolean')))
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
const OnLogoutSelector = obj(
            field('onLogOut', 'onLogOut', args(), notNull(scalar('Boolean')))
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
const OrganizationRequestMembersExportSelector = obj(
            field('requestOrganizationMembersExport', 'requestOrganizationMembersExport', args(fieldValue("id", refValue('organizationId'))), notNull(scalar('Boolean')))
        );
const PairEmailSelector = obj(
            field('pairEmail', 'pairEmail', args(fieldValue("sessionId", refValue('sessionId')), fieldValue("confirmationCode", refValue('confirmationCode'))), notNull(scalar('Boolean')))
        );
const PairPhoneSelector = obj(
            field('pairPhone', 'pairPhone', args(fieldValue("sessionId", refValue('sessionId')), fieldValue("confirmationCode", refValue('confirmationCode'))), notNull(scalar('Boolean')))
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
const PhonebookAddSelector = obj(
            field('phonebookAdd', 'phonebookAdd', args(fieldValue("records", refValue('records'))), notNull(scalar('Boolean')))
        );
const PinMessageSelector = obj(
            field('gammaPinMessage', 'pinMessage', args(fieldValue("chatId", refValue('chatId')), fieldValue("messageId", refValue('messageId'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Room', RoomShortSelector)
                )))
        );
const PostCreateDraftSelector = obj(
            field('postDraftCreate', 'postDraftCreate', args(fieldValue("input", objectValue())), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('PostDraft', PostDraftSimpleSelector)
                )))
        );
const PostDraftUpdateSelector = obj(
            field('postDraftUpdate', 'postDraftUpdate', args(fieldValue("id", refValue('id')), fieldValue("input", objectValue(fieldValue('hub', refValue('channel')),fieldValue('title', refValue('title')),fieldValue('content', refValue('content'))))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('PostDraft', PostDraftSimpleSelector)
                )))
        );
const PostPublishSelector = obj(
            field('postDraftPublish', 'postDraftPublish', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Post', PostSimpleSelector)
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
                    field('birthDay', 'birthDay', args(), scalar('Date')),
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
const RemoveFromContactsSelector = obj(
            field('removeFromContacts', 'removeFromContacts', args(fieldValue("userId", refValue('userId'))), notNull(scalar('Boolean')))
        );
const RemoveStickerSelector = obj(
            field('stickerPackRemoveSticker', 'stickerPackRemoveSticker', args(fieldValue("id", refValue('id'))), notNull(scalar('Boolean')))
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
            field('betaRoomAlterFeatured', 'betaRoomAlterFeatured', args(fieldValue("roomId", refValue('id')), fieldValue("featured", refValue('featured'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID'))),
                    field('featured', 'featured', args(), notNull(scalar('Boolean')))
                )))
        );
const RoomChangeRoleSelector = obj(
            field('betaRoomChangeRole', 'betaRoomChangeRole', args(fieldValue("roomId", refValue('roomId')), fieldValue("userId", refValue('userId')), fieldValue("newRole", refValue('newRole'))), notNull(obj(
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
const RoomCreateSelector = obj(
            field('betaRoomCreate', 'room', args(fieldValue("kind", refValue('kind')), fieldValue("members", refValue('members')), fieldValue("message", refValue('message')), fieldValue("title", refValue('title')), fieldValue("description", refValue('description')), fieldValue("photoRef", refValue('photoRef')), fieldValue("organizationId", refValue('organizationId')), fieldValue("channel", refValue('channel')), fieldValue("price", refValue('price')), fieldValue("interval", refValue('interval'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const RoomDeleteSelector = obj(
            field('deleteChat', 'deleteChat', args(fieldValue("chatId", refValue('chatId'))), notNull(scalar('Boolean')))
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
                        field('socialImage', 'socialImage', args(), scalar('String')),
                        field('repliesEnabled', 'repliesEnabled', args(), notNull(scalar('Boolean')))
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
const SendDonationSelector = obj(
            field('sendDonation', 'sendDonation', args(fieldValue("chatId", refValue('chatId')), fieldValue("userId", refValue('userId')), fieldValue("amount", refValue('amount')), fieldValue("message", refValue('message')), fieldValue("repeatKey", refValue('repeatKey'))), notNull(scalar('Boolean')))
        );
const SendEmailPairCodeSelector = obj(
            field('sendEmailPairCode', 'sendEmailPairCode', args(fieldValue("email", refValue('email'))), notNull(scalar('String')))
        );
const SendMessageSelector = obj(
            field('sendMessage', 'sentMessage', args(fieldValue("chatId", refValue('chatId')), fieldValue("message", refValue('message')), fieldValue("replyMessages", refValue('replyMessages')), fieldValue("mentions", refValue('mentions')), fieldValue("fileAttachments", refValue('fileAttachments')), fieldValue("spans", refValue('spans')), fieldValue("repeatKey", refValue('repeatKey'))), notNull(scalar('Boolean')))
        );
const SendPhonePairCodeSelector = obj(
            field('sendPhonePairCode', 'sendPhonePairCode', args(fieldValue("phone", refValue('phone'))), notNull(scalar('String')))
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
const SocialFollowSelector = obj(
            field('socialFollow', 'socialFollow', args(fieldValue("uid", refValue('uid'))), notNull(scalar('Boolean')))
        );
const SocialUnfollowSelector = obj(
            field('socialUnfollow', 'socialUnfollow', args(fieldValue("uid", refValue('uid'))), notNull(scalar('Boolean')))
        );
const StickerPackAddToCollectionSelector = obj(
            field('stickerPackAddToCollection', 'stickerPackAddToCollection', args(fieldValue("id", refValue('id'))), notNull(scalar('Boolean')))
        );
const StickerPackCreateSelector = obj(
            field('stickerPackCreate', 'stickerPackCreate', args(fieldValue("title", refValue('title')), fieldValue("stickers", refValue('stickers'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const StickerPackRemoveFromCollectionSelector = obj(
            field('stickerPackRemoveFromCollection', 'stickerPackRemoveFromCollection', args(fieldValue("id", refValue('id'))), notNull(scalar('Boolean')))
        );
const StickerPackUpdateSelector = obj(
            field('stickerPackUpdate', 'stickerPackUpdate', args(fieldValue("id", refValue('id')), fieldValue("input", refValue('input'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const SubscribeToCommentsSelector = obj(
            field('subscribeToComments', 'subscribeToComments', args(fieldValue("peerId", refValue('peerId')), fieldValue("type", refValue('type'))), notNull(scalar('Boolean')))
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
const UnBanUserSelector = obj(
            field('unBanUser', 'unBanUser', args(fieldValue("id", refValue('id'))), notNull(scalar('Boolean')))
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
                    field('id', 'id', args(), notNull(scalar('ID')))
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
const VoiceChatCreateSelector = obj(
            field('voiceChatCreate', 'voiceChatCreate', args(fieldValue("input", refValue('input'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('VoiceChat', VoiceChatWithSpeakersSelector)
                )))
        );
const VoiceChatCreateInChatSelector = obj(
            field('voiceChatCreateInChat', 'voiceChatCreateInChat', args(fieldValue("input", refValue('input')), fieldValue("cid", refValue('cid'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('chat', 'chat', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('VoiceChat', VoiceChatWithSpeakersSelector)
                        ))),
                    field('peerId', 'peerId', args(), notNull(scalar('ID'))),
                    field('conference', 'conference', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            fragment('Conference', ConferenceShortSelector)
                        )))
                )))
        );
const VoiceChatDeletePinnedMessageSelector = obj(
            field('voiceChatDeletePinnedMessage', 'voiceChatDeletePinnedMessage', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const VoiceChatDemoteSelector = obj(
            field('voiceChatDemote', 'voiceChatDemote', args(fieldValue("id", refValue('id')), fieldValue("uid", refValue('uid'))), notNull(scalar('Boolean')))
        );
const VoiceChatEndSelector = obj(
            field('voiceChatEnd', 'voiceChatEnd', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const VoiceChatJoinSelector = obj(
            field('voiceChatJoin', 'voiceChatJoin', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const VoiceChatKickSelector = obj(
            field('voiceChatKick', 'voiceChatKick', args(fieldValue("id", refValue('id')), fieldValue("uid", refValue('uid'))), notNull(scalar('Boolean')))
        );
const VoiceChatLeaveSelector = obj(
            field('voiceChatLeave', 'voiceChatLeave', args(fieldValue("id", refValue('id'))), notNull(scalar('Boolean')))
        );
const VoiceChatPromoteSelector = obj(
            field('voiceChatPromote', 'voiceChatPromote', args(fieldValue("id", refValue('id')), fieldValue("uid", refValue('uid'))), notNull(scalar('Boolean')))
        );
const VoiceChatRaiseHandSelector = obj(
            field('voiceChatRaiseHand', 'voiceChatRaiseHand', args(fieldValue("id", refValue('id')), fieldValue("raised", refValue('raised'))), notNull(scalar('Boolean')))
        );
const VoiceChatSetPinnedMessageSelector = obj(
            field('voiceChatSetPinnedMessage', 'voiceChatSetPinnedMessage', args(fieldValue("id", refValue('id')), fieldValue("message", refValue('message')), fieldValue("spans", refValue('spans'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const VoiceChatUpdateSelector = obj(
            field('voiceChatUpdate', 'voiceChatUpdate', args(fieldValue("id", refValue('id')), fieldValue("input", refValue('input'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('id', 'id', args(), notNull(scalar('ID')))
                )))
        );
const VoiceChatUpdateAdminSelector = obj(
            field('voiceChatUpdateAdmin', 'voiceChatUpdateAdmin', args(fieldValue("id", refValue('id')), fieldValue("uid", refValue('uid')), fieldValue("admin", refValue('admin'))), notNull(scalar('Boolean')))
        );
const conferenceAddScreenShareSelector = obj(
            field('conferenceAddScreenShare', 'conferenceAddScreenShare', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Conference', ConferenceShortSelector)
                )))
        );
const conferenceAlterMediaStateSelector = obj(
            field('conferenceAlterMediaState', 'conferenceAlterMediaState', args(fieldValue("id", refValue('id')), fieldValue("state", refValue('state'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Conference', ConferenceShortSelector)
                )))
        );
const conferenceRemoveScreenShareSelector = obj(
            field('conferenceRemoveScreenShare', 'conferenceRemoveScreenShare', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Conference', ConferenceShortSelector)
                )))
        );
const conferenceRequestLocalMediaChangeSelector = obj(
            field('conferenceRequestLocalMediaChange', 'conferenceRequestLocalMediaChange', args(fieldValue("id", refValue('id')), fieldValue("media", refValue('media'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Conference', ConferenceShortSelector)
                )))
        );
const ActiveVoiceChatsEventsSelector = obj(
            field('activeVoiceChatsEvents', 'activeVoiceChatsEvents', args(), notNull(list(notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('VoiceChatUpdatedEvent', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('chat', 'chat', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('VoiceChat', VoiceChatWithSpeakersSelector)
                            )))
                    ))
                )))))
        );
const BlackListUpdatesSelector = obj(
            field('blackListUpdates', 'blackListUpdates', args(fieldValue("fromState", refValue('fromState'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('state', 'state', args(), notNull(scalar('String'))),
                    field('updates', 'updates', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            inline('BlackListAdded', obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('bannedBy', 'bannedBy', args(), notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        fragment('User', UserShortSelector)
                                    ))),
                                field('bannedUser', 'bannedUser', args(), notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        fragment('User', UserShortSelector)
                                    )))
                            )),
                            inline('BlackListRemoved', obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('bannedBy', 'bannedBy', args(), notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        fragment('User', UserShortSelector)
                                    ))),
                                field('bannedUser', 'bannedUser', args(), notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        fragment('User', UserShortSelector)
                                    )))
                            ))
                        )))))
                )))
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
                            fragment('MediaStream', MediaStreamFullSelector)
                        ))))),
                    field('localMedia', 'localMedia', args(), notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            field('sendVideo', 'sendVideo', args(), notNull(scalar('Boolean'))),
                            field('sendAudio', 'sendAudio', args(), notNull(scalar('Boolean'))),
                            field('sendScreencast', 'sendScreencast', args(), notNull(scalar('Boolean')))
                        )))
                )))
        );
const ConferenceWatchSelector = obj(
            field('alphaConferenceWatch', 'alphaConferenceWatch', args(fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('Conference', ConferenceFullSelector)
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
const MyContactsUpdatesSelector = obj(
            field('myContactsUpdates', 'myContactsUpdates', args(fieldValue("fromState", refValue('state'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('updates', 'updates', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            inline('ContactRemoved', obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('contact', 'contact', args(), notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('user', 'user', args(), notNull(obj(
                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                fragment('User', UserShortSelector)
                                            )))
                                    )))
                            )),
                            inline('ContactAdded', obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('contact', 'contact', args(), notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        field('id', 'id', args(), notNull(scalar('ID'))),
                                        field('user', 'user', args(), notNull(obj(
                                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                                fragment('User', UserShortSelector)
                                            )))
                                    )))
                            ))
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
const StickersWatchSelector = obj(
            field('myStickersUpdates', 'event', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    fragment('UserStickers', MyStickersFragmentSelector)
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
const VoiceChatEventsSelector = obj(
            field('voiceChatEvents', 'voiceChatEvents', args(fieldValue("fromState", refValue('fromState')), fieldValue("id", refValue('id'))), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    field('state', 'state', args(), notNull(scalar('String'))),
                    field('events', 'events', args(), notNull(list(notNull(obj(
                            field('__typename', '__typename', args(), notNull(scalar('String'))),
                            inline('VoiceChatParticipantUpdatedEvent', obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('chat', 'chat', args(), notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        fragment('VoiceChat', VoiceChatEntitySelector)
                                    ))),
                                field('participant', 'participant', args(), notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        fragment('VoiceChatParticipant', VoiceChatParticipantSelector)
                                    )))
                            )),
                            inline('VoiceChatUpdatedEvent', obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('chat', 'chat', args(), notNull(obj(
                                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                                        fragment('VoiceChat', VoiceChatEntitySelector)
                                    )))
                            ))
                        )))))
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
const WatchUpdatesSelector = obj(
            field('watchUpdates', 'watchUpdates', args(), notNull(obj(
                    field('__typename', '__typename', args(), notNull(scalar('String'))),
                    inline('UpdateSubscriptionStarted', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('seq', 'seq', args(), notNull(scalar('Int'))),
                        field('state', 'state', args(), notNull(scalar('String')))
                    )),
                    inline('UpdateSubscriptionEvent', obj(
                        field('__typename', '__typename', args(), notNull(scalar('String'))),
                        field('seq', 'seq', args(), notNull(scalar('Int'))),
                        field('pts', 'pts', args(), notNull(scalar('Int'))),
                        field('state', 'state', args(), notNull(scalar('String'))),
                        field('sequence', 'sequence', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                field('id', 'id', args(), notNull(scalar('ID')))
                            ))),
                        field('event', 'event', args(), notNull(obj(
                                field('__typename', '__typename', args(), notNull(scalar('String'))),
                                fragment('UpdateEvent', ShortUpdateSelector)
                            )))
                    ))
                )))
        );
export const Operations: { [key: string]: OperationDefinition } = {
    Account: {
        kind: 'query',
        name: 'Account',
        body: 'query Account{me:me{__typename id name photo shortname email}myProfile{__typename id authEmail}sessionState:sessionState{__typename isLoggedIn isActivated isProfileCreated isAccountActivated isAccountExists isAccountPicked isCompleted isBlocked}myPermissions{__typename roles}}',
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
        body: 'query AccountAppInviteInfo($inviteKey:String!){invite:alphaInviteInfo(key:$inviteKey){__typename id creator{__typename ...UserSmall}}appInvite:appInviteInfo(key:$inviteKey){__typename inviter{__typename ...UserSmall}}}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: AccountAppInviteInfoSelector
    },
    AccountInviteInfo: {
        kind: 'query',
        name: 'AccountInviteInfo',
        body: 'query AccountInviteInfo($inviteKey:String!){invite:alphaInviteInfo(key:$inviteKey){__typename id key orgId title photo joined creator{__typename ...UserSmall}forEmail forName membersCount organization{__typename id isCommunity:alphaIsCommunity about}}}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: AccountInviteInfoSelector
    },
    ActiveVoiceChats: {
        kind: 'query',
        name: 'ActiveVoiceChats',
        body: 'query ActiveVoiceChats($first:Int!,$after:String){activeVoiceChats(first:$first,after:$after){__typename cursor items{__typename ...VoiceChatWithSpeakers}}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership kind isChannel shortname}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followedByMe followersCount}status handRaised}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: ActiveVoiceChatsSelector
    },
    AuthPoints: {
        kind: 'query',
        name: 'AuthPoints',
        body: 'query AuthPoints{authPoints{__typename email phone}}',
        selector: AuthPointsSelector
    },
    AuthResolveShortName: {
        kind: 'query',
        name: 'AuthResolveShortName',
        body: 'query AuthResolveShortName($shortname:String!){item:alphaResolveShortName(shortname:$shortname){__typename ... on User{__typename id name firstName lastName photo externalSocialImage online currentVoiceChat{__typename id title speakersCount listenersCount speakers{__typename id user{__typename id name photo}}}}... on Organization{__typename id name photo about applyLinkEnabled applyLink externalSocialImage isCommunity:alphaIsCommunity featured:alphaFeatured orgOwner:owner{__typename id}}... on SharedRoom{__typename ...SharedRoomPreview}... on DiscoverChatsCollection{__typename id}}}fragment SharedRoomPreview on SharedRoom{__typename id isChannel isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}membership owner{__typename id}title photo externalSocialImage membersCount description featured previewMembers{__typename id name photo}}',
        selector: AuthResolveShortNameSelector
    },
    BlackListUpdatesState: {
        kind: 'query',
        name: 'BlackListUpdatesState',
        body: 'query BlackListUpdatesState{blackListUpdatesState{__typename state}}',
        selector: BlackListUpdatesStateSelector
    },
    Channel: {
        kind: 'query',
        name: 'Channel',
        body: 'query Channel($id:ID!){channel(id:$id){__typename ...ChannelSimple}}fragment ChannelSimple on Channel{__typename id title shortname type owner{__typename id firstName lastName}}',
        selector: ChannelSelector
    },
    Channels: {
        kind: 'query',
        name: 'Channels',
        body: 'query Channels{channels{__typename ...ChannelSimple}}fragment ChannelSimple on Channel{__typename id title shortname type owner{__typename id firstName lastName}}',
        selector: ChannelsSelector
    },
    ChatInit: {
        kind: 'query',
        name: 'ChatInit',
        body: 'query ChatInit($chatId:ID!,$before:ID,$first:Int!){messages(chatId:$chatId,first:$first,before:$before){__typename ...FullMessage}state:conversationState(id:$chatId){__typename state}room(id:$chatId){__typename ...RoomShort}lastReadedMessage(chatId:$chatId){__typename id}}fragment FullMessage on ModernMessage{__typename id seq date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort isYou inContacts isBanned isMeBanned}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind title membership isChannel role canEdit canSendMessage photo membersCount shortname featuredMembersCount socialImage activeVoiceChat{__typename ...VoiceChatWithSpeakers}featured welcomeMessage{__typename isOn sender{__typename id name}message}organization{__typename ...OrganizationSmall private:alphaIsPrivate isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}canUnpinMessage pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}settings{__typename id mute}description previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName isYou}serviceMessageSettings{__typename joinsMessageEnabled leavesMessageEnabled}callSettings{__typename mode callLink}repliesEnabled}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership kind isChannel shortname}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followedByMe followersCount}status handRaised}fragment OrganizationSmall on Organization{__typename id name photo about shortname isCommunity:alphaIsCommunity featured:alphaFeatured}',
        selector: ChatInitSelector
    },
    ChatInitFromUnread: {
        kind: 'query',
        name: 'ChatInitFromUnread',
        body: 'query ChatInitFromUnread($chatId:ID!,$before:ID,$first:Int!){gammaMessages(chatId:$chatId,first:$first,before:$before){__typename messages{__typename ...FullMessage}haveMoreForward haveMoreBackward}state:conversationState(id:$chatId){__typename state}room(id:$chatId){__typename ...RoomShort}lastReadedMessage(chatId:$chatId){__typename id}}fragment FullMessage on ModernMessage{__typename id seq date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort isYou inContacts isBanned isMeBanned}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind title membership isChannel role canEdit canSendMessage photo membersCount shortname featuredMembersCount socialImage activeVoiceChat{__typename ...VoiceChatWithSpeakers}featured welcomeMessage{__typename isOn sender{__typename id name}message}organization{__typename ...OrganizationSmall private:alphaIsPrivate isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}canUnpinMessage pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}settings{__typename id mute}description previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName isYou}serviceMessageSettings{__typename joinsMessageEnabled leavesMessageEnabled}callSettings{__typename mode callLink}repliesEnabled}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership kind isChannel shortname}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followedByMe followersCount}status handRaised}fragment OrganizationSmall on Organization{__typename id name photo about shortname isCommunity:alphaIsCommunity featured:alphaFeatured}',
        selector: ChatInitFromUnreadSelector
    },
    ChatJoin: {
        kind: 'query',
        name: 'ChatJoin',
        body: 'query ChatJoin($id:ID!){room(id:$id){__typename ... on SharedRoom{__typename id title description photo membersCount previewMembers{__typename id photo name}isChannel isPremium featured premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}}',
        selector: ChatJoinSelector
    },
    ChatMentionSearch: {
        kind: 'query',
        name: 'ChatMentionSearch',
        body: 'query ChatMentionSearch($cid:ID!,$query:String,$first:Int!,$after:String){mentions:betaChatMentionSearch(cid:$cid,query:$query,first:$first,after:$after){__typename items{__typename ... on MentionSearchOrganization{__typename organization{__typename ...OrganizationSmall}}... on MentionSearchUser{__typename user{__typename ...UserSmall}fromSameChat}... on MentionSearchSharedRoom{__typename room{__typename ...RoomSmall featured}}}cursor}}fragment OrganizationSmall on Organization{__typename id name photo about shortname isCommunity:alphaIsCommunity featured:alphaFeatured}fragment UserSmall on User{__typename id name firstName photo shortname isBot}fragment RoomSmall on SharedRoom{__typename id title photo isChannel isPremium featured}',
        selector: ChatMentionSearchSelector
    },
    ChatNewGetMessage: {
        kind: 'query',
        name: 'ChatNewGetMessage',
        body: 'query ChatNewGetMessage($id:ID!){message(messageId:$id){__typename ...ChatNewMessageFragment}}fragment ChatNewMessageFragment on ModernMessage{__typename id date seq sender{__typename id}message fallback}',
        selector: ChatNewGetMessageSelector
    },
    ChatNewLoadAfter: {
        kind: 'query',
        name: 'ChatNewLoadAfter',
        body: 'query ChatNewLoadAfter($chatId:ID!,$after:ID!,$limit:Int!){batch:gammaMessages(chatId:$chatId,first:$limit,after:$after){__typename messages{__typename ...ChatNewMessageFragment}haveMoreForward}}fragment ChatNewMessageFragment on ModernMessage{__typename id date seq sender{__typename id}message fallback}',
        selector: ChatNewLoadAfterSelector
    },
    ChatNewLoadBefore: {
        kind: 'query',
        name: 'ChatNewLoadBefore',
        body: 'query ChatNewLoadBefore($chatId:ID!,$before:ID!,$limit:Int!){batch:gammaMessages(chatId:$chatId,first:$limit,before:$before){__typename messages{__typename ...ChatNewMessageFragment}haveMoreBackward}}fragment ChatNewMessageFragment on ModernMessage{__typename id date seq sender{__typename id}message fallback}',
        selector: ChatNewLoadBeforeSelector
    },
    ChatNewReadLastRead: {
        kind: 'query',
        name: 'ChatNewReadLastRead',
        body: 'query ChatNewReadLastRead($chatId:ID!){message:lastReadedMessage(chatId:$chatId){__typename id}}',
        selector: ChatNewReadLastReadSelector
    },
    CommentFullReactions: {
        kind: 'query',
        name: 'CommentFullReactions',
        body: 'query CommentFullReactions($id:ID!){commentEntry(entryId:$id){__typename id comment{__typename id reactions{__typename ...MessageUsersReactions}}}}fragment MessageUsersReactions on ModernMessageReaction{__typename user{__typename id name photo}reaction}',
        selector: CommentFullReactionsSelector
    },
    Comments: {
        kind: 'query',
        name: 'Comments',
        body: 'query Comments($peerId:ID!){comments(peerId:$peerId){__typename id state{__typename state}count peerRoot{__typename ... on CommentPeerRootMessage{__typename chat{__typename ... on SharedRoom{__typename id role}... on PrivateRoom{__typename id}}}}subscription{__typename type}comments{__typename ...CommentEntryFragment}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage}parentComment{__typename id comment:betaComment{__typename id message}}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id seq date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}',
        selector: CommentsSelector
    },
    CommonChatsWithUser: {
        kind: 'query',
        name: 'CommonChatsWithUser',
        body: 'query CommonChatsWithUser($uid:ID!,$first:Int!,$after:ID){commonChatsWithUser(uid:$uid,first:$first,after:$after){__typename items{__typename id title description photo membersCount featured}cursor count}}',
        selector: CommonChatsWithUserSelector
    },
    Conference: {
        kind: 'query',
        name: 'Conference',
        body: 'query Conference($id:ID!){conference(id:$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename id startTime peers{__typename id user{__typename ...UserSmall}mediaState{__typename audioPaused videoPaused screencastEnabled}}iceServers{__typename urls username credential}parent{__typename ... on SharedRoom{__typename id title isChannel membersCount photo owner{__typename id name}}... on PrivateRoom{__typename id user{__typename id name photo}}... on VoiceChat{__typename id}}}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: ConferenceSelector
    },
    ConferenceMedia: {
        kind: 'query',
        name: 'ConferenceMedia',
        body: 'query ConferenceMedia($id:ID!,$peerId:ID!){conferenceMedia(id:$id,peerId:$peerId){__typename id streams{__typename ...MediaStreamFull}iceServers{__typename urls username credential}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource mid}senders{__typename kind videoSource codecParams mid}}',
        selector: ConferenceMediaSelector
    },
    CreatedStickerPacks: {
        kind: 'query',
        name: 'CreatedStickerPacks',
        body: 'query CreatedStickerPacks{createdStickerPacks{__typename ...SuperStickerPackFragment}}fragment SuperStickerPackFragment on StickerPack{__typename id title published private listed added author{__typename id name}stickers{__typename ... on ImageSticker{__typename id emoji image{__typename uuid}}}}',
        selector: CreatedStickerPacksSelector
    },
    Dialogs: {
        kind: 'query',
        name: 'Dialogs',
        body: 'query Dialogs($after:String){dialogs(first:20,after:$after){__typename items{__typename ...DialogFragment}cursor}state:dialogsState{__typename state}counter:alphaNotificationCounter{__typename id unreadCount}}fragment DialogFragment on Dialog{__typename id cid fid kind isChannel isPremium title photo unreadCount isMuted hasActiveCall hasActiveVoiceChat haveMention topMessage:alphaTopMessage{__typename ...DialogMessage}membership featured}fragment DialogMessage on ModernMessage{__typename id date sender{__typename id name photo firstName}message fallback ... on GeneralMessage{__typename id quotedMessages{__typename id}}}',
        selector: DialogsSelector
    },
    DiscoverCollection: {
        kind: 'query',
        name: 'DiscoverCollection',
        body: 'query DiscoverCollection($id:ID!){discoverCollection(id:$id){__typename id title shortname description image{__typename uuid crop{__typename x y w h}}chats{__typename ...DiscoverSharedRoom}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive featured}',
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
        body: 'query DiscoverCollections($first:Int!,$after:String){discoverCollections(first:$first,after:$after){__typename items{__typename ...DiscoverChatsCollection}cursor}}fragment DiscoverChatsCollection on DiscoverChatsCollection{__typename id title shortname chatsCount chats{__typename ...DiscoverSharedRoom}description image{__typename uuid crop{__typename x y w h}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive featured}',
        selector: DiscoverCollectionsSelector
    },
    DiscoverCollectionsShort: {
        kind: 'query',
        name: 'DiscoverCollectionsShort',
        body: 'query DiscoverCollectionsShort($first:Int!,$after:String){discoverCollections(first:$first,after:$after){__typename items{__typename ...DiscoverChatsCollectionShort}cursor}}fragment DiscoverChatsCollectionShort on DiscoverChatsCollection{__typename id title shortname chatsCount description image{__typename uuid crop{__typename x y w h}}}',
        selector: DiscoverCollectionsShortSelector
    },
    DiscoverEditorsChoice: {
        kind: 'query',
        name: 'DiscoverEditorsChoice',
        body: 'query DiscoverEditorsChoice{discoverEditorsChoice{__typename id image{__typename uuid crop{__typename x y w h}}chat{__typename ...DiscoverSharedRoom}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive featured}',
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
        body: 'query DiscoverNewAndGrowing($first:Int!,$seed:Int!,$after:String){discoverNewAndGrowing(first:$first,seed:$seed,after:$after){__typename items{__typename ...DiscoverSharedRoom}cursor}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive featured}',
        selector: DiscoverNewAndGrowingSelector
    },
    DiscoverNewOrganizations: {
        kind: 'query',
        name: 'DiscoverNewOrganizations',
        body: 'query DiscoverNewOrganizations($first:Int!,$seed:Int!,$after:String){discoverNewAndGrowingOrganizations(first:$first,seed:$seed,after:$after){__typename items{__typename ...DiscoverOrganization}cursor}}fragment DiscoverOrganization on Organization{__typename id name photo membersCount shortname featured:alphaFeatured}',
        selector: DiscoverNewOrganizationsSelector
    },
    DiscoverNextPage: {
        kind: 'query',
        name: 'DiscoverNextPage',
        body: 'query DiscoverNextPage($selectedTagsIds:[String!]!,$excudedGroupsIds:[String!]!){betaNextDiscoverPage:gammaNextDiscoverPage(selectedTagsIds:$selectedTagsIds,excudedGroupsIds:$excudedGroupsIds){__typename chats{__typename ...RoomShort}tagGroup{__typename id title subtitle tags{__typename id title}}}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort isYou inContacts isBanned isMeBanned}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind title membership isChannel role canEdit canSendMessage photo membersCount shortname featuredMembersCount socialImage activeVoiceChat{__typename ...VoiceChatWithSpeakers}featured welcomeMessage{__typename isOn sender{__typename id name}message}organization{__typename ...OrganizationSmall private:alphaIsPrivate isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}canUnpinMessage pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}settings{__typename id mute}description previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName isYou}serviceMessageSettings{__typename joinsMessageEnabled leavesMessageEnabled}callSettings{__typename mode callLink}repliesEnabled}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}fragment FullMessage on ModernMessage{__typename id seq date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership kind isChannel shortname}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followedByMe followersCount}status handRaised}fragment OrganizationSmall on Organization{__typename id name photo about shortname isCommunity:alphaIsCommunity featured:alphaFeatured}',
        selector: DiscoverNextPageSelector
    },
    DiscoverNoAuth: {
        kind: 'query',
        name: 'DiscoverNoAuth',
        body: 'query DiscoverNoAuth($seed:Int!){discoverNewAndGrowing(first:3,seed:$seed){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverPopularNow(first:3){__typename items{__typename room{__typename ...DiscoverSharedRoom}newMessages}cursor}discoverTopPremium(first:3){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverTopFree(first:3){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverCollections(first:20){__typename items{__typename ...DiscoverChatsCollectionShort}cursor}discoverEditorsChoice{__typename id image{__typename uuid crop{__typename x y w h}}chat{__typename ...DiscoverSharedRoom}}discoverTopOrganizations(first:3){__typename items{__typename ...DiscoverOrganization}cursor}discoverNewAndGrowingOrganizations(first:3,seed:$seed){__typename items{__typename ...DiscoverOrganization}cursor}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive featured}fragment DiscoverChatsCollectionShort on DiscoverChatsCollection{__typename id title shortname chatsCount description image{__typename uuid crop{__typename x y w h}}}fragment DiscoverOrganization on Organization{__typename id name photo membersCount shortname featured:alphaFeatured}',
        selector: DiscoverNoAuthSelector
    },
    DiscoverPopularNow: {
        kind: 'query',
        name: 'DiscoverPopularNow',
        body: 'query DiscoverPopularNow($first:Int!,$after:String){discoverPopularNow(first:$first,after:$after){__typename items{__typename room{__typename ...DiscoverSharedRoom}newMessages}cursor}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive featured}',
        selector: DiscoverPopularNowSelector
    },
    DiscoverPopularOrganizations: {
        kind: 'query',
        name: 'DiscoverPopularOrganizations',
        body: 'query DiscoverPopularOrganizations($first:Int!,$after:String){discoverTopOrganizations(first:$first,after:$after){__typename items{__typename ...DiscoverOrganization}cursor}}fragment DiscoverOrganization on Organization{__typename id name photo membersCount shortname featured:alphaFeatured}',
        selector: DiscoverPopularOrganizationsSelector
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
        body: 'query DiscoverSuggestedRooms{suggestedRooms:betaSuggestedRooms{__typename ...DiscoverSharedRoom}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive featured}',
        selector: DiscoverSuggestedRoomsSelector
    },
    DiscoverTopFree: {
        kind: 'query',
        name: 'DiscoverTopFree',
        body: 'query DiscoverTopFree($first:Int!,$after:String){discoverTopFree(first:$first,after:$after){__typename items{__typename ...DiscoverSharedRoom}cursor}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive featured}',
        selector: DiscoverTopFreeSelector
    },
    DiscoverTopPremium: {
        kind: 'query',
        name: 'DiscoverTopPremium',
        body: 'query DiscoverTopPremium($first:Int!,$after:String){discoverTopPremium(first:$first,after:$after){__typename items{__typename ...DiscoverSharedRoom}cursor}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive featured}',
        selector: DiscoverTopPremiumSelector
    },
    ExplorePeople: {
        kind: 'query',
        name: 'ExplorePeople',
        body: 'query ExplorePeople($query:String,$sort:String,$page:Int,$after:String){items:userSearch(query:$query,sort:$sort,page:$page,first:25,after:$after){__typename edges{__typename node{__typename ...UserShort isYou}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount currentPage pagesCount openEnded}}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: ExplorePeopleSelector
    },
    ExploreRooms: {
        kind: 'query',
        name: 'ExploreRooms',
        body: 'query ExploreRooms($seed:Int!){discoverNewAndGrowing(first:3,seed:$seed){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverPopularNow(first:3){__typename items{__typename room{__typename ...DiscoverSharedRoom}newMessages}cursor}suggestedRooms:betaSuggestedRooms{__typename ...DiscoverSharedRoom}discoverTopPremium(first:3){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverTopFree(first:3){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverTopOrganizations(first:3){__typename items{__typename ...DiscoverOrganization}cursor}discoverNewAndGrowingOrganizations(first:3,seed:$seed){__typename items{__typename ...DiscoverOrganization}cursor}isDiscoverDone:betaIsDiscoverDone}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive featured}fragment DiscoverOrganization on Organization{__typename id name photo membersCount shortname featured:alphaFeatured}',
        selector: ExploreRoomsSelector
    },
    FetchPushSettings: {
        kind: 'query',
        name: 'FetchPushSettings',
        body: 'query FetchPushSettings{pushSettings{__typename webPushKey}}',
        selector: FetchPushSettingsSelector
    },
    GetDifference: {
        kind: 'query',
        name: 'GetDifference',
        body: 'query GetDifference($state:String!){updatesDifference(state:$state){__typename seq state hasMore sequences{__typename after events{__typename pts event{__typename ...ShortUpdate}}sequence{__typename ...ShortSequence}}}}fragment ShortUpdate on UpdateEvent{__typename ... on UpdateMyProfileChanged{__typename user{__typename id firstName lastName}}... on UpdateChatDraftChanged{__typename cid draft version date}... on UpdateSettingsChanged{__typename settings{__typename ...SettingsFull}}... on UpdateChatMessage{__typename cid message{__typename ...UpdateMessage}}... on UpdateChatMessageDeleted{__typename cid mid seq}... on UpdateChatRead{__typename cid seq}... on UpdateRoomChanged{__typename room{__typename ...UpdateRoom}}}fragment SettingsFull on Settings{__typename id version primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone whoCanAddToGroups communityAdminsCanSeeContactInfo desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}channels{__typename showNotification sound}notificationPreview}fragment UpdateMessage on ModernMessage{__typename id seq date sender{__typename id}message fallback spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited isMentioned commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id isMentioned serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment UpdateRoom on Room{__typename ... on PrivateRoom{__typename id hasActiveCall user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename id kind isChannel isPremium title photo membersCount featured hasActiveCall hasActiveVoiceChat settings{__typename id mute}}}fragment ShortSequence on Sequence{__typename id ... on SequenceChat{__typename id ...ShortSequenceChat}... on SequenceCommon{__typename id ...ShortSequenceCommon}}fragment ShortSequenceChat on SequenceChat{__typename id cid draft{__typename version message date}states{__typename counter mentions readSeq}room{__typename ...UpdateRoom}topMessage{__typename ...UpdateMessage}}fragment ShortSequenceCommon on SequenceCommon{__typename id settings{__typename ...SettingsFull}}',
        selector: GetDifferenceSelector
    },
    GetInitialDialogs: {
        kind: 'query',
        name: 'GetInitialDialogs',
        body: 'query GetInitialDialogs($after:String){syncUserChats(first:500,after:$after){__typename items{__typename sequence{__typename ...ShortSequence}pts}cursor}}fragment ShortSequence on Sequence{__typename id ... on SequenceChat{__typename id ...ShortSequenceChat}... on SequenceCommon{__typename id ...ShortSequenceCommon}}fragment ShortSequenceChat on SequenceChat{__typename id cid draft{__typename version message date}states{__typename counter mentions readSeq}room{__typename ...UpdateRoom}topMessage{__typename ...UpdateMessage}}fragment UpdateRoom on Room{__typename ... on PrivateRoom{__typename id hasActiveCall user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename id kind isChannel isPremium title photo membersCount featured hasActiveCall hasActiveVoiceChat settings{__typename id mute}}}fragment UpdateMessage on ModernMessage{__typename id seq date sender{__typename id}message fallback spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited isMentioned commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id isMentioned serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment ShortSequenceCommon on SequenceCommon{__typename id settings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id version primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone whoCanAddToGroups communityAdminsCanSeeContactInfo desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}channels{__typename showNotification sound}notificationPreview}',
        selector: GetInitialDialogsSelector
    },
    GetSequenceDifference: {
        kind: 'query',
        name: 'GetSequenceDifference',
        body: 'query GetSequenceDifference($id:ID!,$pts:Int!){sequenceDifference(id:$id,pts:$pts){__typename sequence{__typename ...ShortSequence}events{__typename pts event{__typename ...ShortUpdate}}after hasMore seq}}fragment ShortSequence on Sequence{__typename id ... on SequenceChat{__typename id ...ShortSequenceChat}... on SequenceCommon{__typename id ...ShortSequenceCommon}}fragment ShortSequenceChat on SequenceChat{__typename id cid draft{__typename version message date}states{__typename counter mentions readSeq}room{__typename ...UpdateRoom}topMessage{__typename ...UpdateMessage}}fragment UpdateRoom on Room{__typename ... on PrivateRoom{__typename id hasActiveCall user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename id kind isChannel isPremium title photo membersCount featured hasActiveCall hasActiveVoiceChat settings{__typename id mute}}}fragment UpdateMessage on ModernMessage{__typename id seq date sender{__typename id}message fallback spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited isMentioned commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id isMentioned serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment ShortSequenceCommon on SequenceCommon{__typename id settings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id version primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone whoCanAddToGroups communityAdminsCanSeeContactInfo desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}channels{__typename showNotification sound}notificationPreview}fragment ShortUpdate on UpdateEvent{__typename ... on UpdateMyProfileChanged{__typename user{__typename id firstName lastName}}... on UpdateChatDraftChanged{__typename cid draft version date}... on UpdateSettingsChanged{__typename settings{__typename ...SettingsFull}}... on UpdateChatMessage{__typename cid message{__typename ...UpdateMessage}}... on UpdateChatMessageDeleted{__typename cid mid seq}... on UpdateChatRead{__typename cid seq}... on UpdateRoomChanged{__typename room{__typename ...UpdateRoom}}}',
        selector: GetSequenceDifferenceSelector
    },
    GetSequenceState: {
        kind: 'query',
        name: 'GetSequenceState',
        body: 'query GetSequenceState($id:ID!){sequenceState(id:$id){__typename pts seq sequence{__typename ...ShortSequence}}}fragment ShortSequence on Sequence{__typename id ... on SequenceChat{__typename id ...ShortSequenceChat}... on SequenceCommon{__typename id ...ShortSequenceCommon}}fragment ShortSequenceChat on SequenceChat{__typename id cid draft{__typename version message date}states{__typename counter mentions readSeq}room{__typename ...UpdateRoom}topMessage{__typename ...UpdateMessage}}fragment UpdateRoom on Room{__typename ... on PrivateRoom{__typename id hasActiveCall user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename id kind isChannel isPremium title photo membersCount featured hasActiveCall hasActiveVoiceChat settings{__typename id mute}}}fragment UpdateMessage on ModernMessage{__typename id seq date sender{__typename id}message fallback spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited isMentioned commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id isMentioned serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment ShortSequenceCommon on SequenceCommon{__typename id settings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id version primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone whoCanAddToGroups communityAdminsCanSeeContactInfo desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}channels{__typename showNotification sound}notificationPreview}',
        selector: GetSequenceStateSelector
    },
    GetState: {
        kind: 'query',
        name: 'GetState',
        body: 'query GetState{updatesState{__typename seq state sequences{__typename pts sequence{__typename ...ShortSequence}}}}fragment ShortSequence on Sequence{__typename id ... on SequenceChat{__typename id ...ShortSequenceChat}... on SequenceCommon{__typename id ...ShortSequenceCommon}}fragment ShortSequenceChat on SequenceChat{__typename id cid draft{__typename version message date}states{__typename counter mentions readSeq}room{__typename ...UpdateRoom}topMessage{__typename ...UpdateMessage}}fragment UpdateRoom on Room{__typename ... on PrivateRoom{__typename id hasActiveCall user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename id kind isChannel isPremium title photo membersCount featured hasActiveCall hasActiveVoiceChat settings{__typename id mute}}}fragment UpdateMessage on ModernMessage{__typename id seq date sender{__typename id}message fallback spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited isMentioned commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id isMentioned serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment ShortSequenceCommon on SequenceCommon{__typename id settings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id version primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone whoCanAddToGroups communityAdminsCanSeeContactInfo desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}channels{__typename showNotification sound}notificationPreview}',
        selector: GetStateSelector
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
        body: 'query GlobalSearch($query:String!,$kinds:[GlobalSearchEntryKind!]){items:alphaGlobalSearch(query:$query,kinds:$kinds){__typename ... on Organization{__typename id name about photo shortname isCommunity:alphaIsCommunity featured:alphaFeatured}... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title canSendMessage roomPhoto:photo membersCount membership organization{__typename id name photo}featured}}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: GlobalSearchSelector
    },
    IpLocation: {
        kind: 'query',
        name: 'IpLocation',
        body: 'query IpLocation{ipLocation{__typename countryCode}}',
        selector: IpLocationSelector
    },
    Message: {
        kind: 'query',
        name: 'Message',
        body: 'query Message($messageId:ID!){message(messageId:$messageId){__typename ...FullMessageWithoutSource source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id isBot name}pinnedMessage{__typename id}}... on SharedRoom{__typename id title isChannel membersCount canSendMessage canEdit repliesEnabled pinnedMessage{__typename id}role}}}}}comments(peerId:$messageId){__typename id subscription{__typename type}}}fragment FullMessageWithoutSource on ModernMessage{__typename id seq date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}',
        selector: MessageSelector
    },
    MessageFullReactions: {
        kind: 'query',
        name: 'MessageFullReactions',
        body: 'query MessageFullReactions($id:ID!){message(messageId:$id){__typename id ... on GeneralMessage{__typename id reactions{__typename ...MessageUsersReactions}}... on StickerMessage{__typename id reactions{__typename ...MessageUsersReactions}}}}fragment MessageUsersReactions on ModernMessageReaction{__typename user{__typename id name photo}reaction}',
        selector: MessageFullReactionsSelector
    },
    MessageMultiSpan: {
        kind: 'query',
        name: 'MessageMultiSpan',
        body: 'query MessageMultiSpan($id:ID!){message(messageId:$id){__typename id spans{__typename ... on MessageSpanMultiUserMention{__typename users{__typename ...UserSmall}}}}}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: MessageMultiSpanSelector
    },
    MessagesBatch: {
        kind: 'query',
        name: 'MessagesBatch',
        body: 'query MessagesBatch($chatId:ID!,$first:Int!,$before:ID,$after:ID){gammaMessages(chatId:$chatId,first:$first,before:$before,after:$after){__typename messages{__typename ...FullMessage}haveMoreForward haveMoreBackward}state:conversationState(id:$chatId){__typename state}}fragment FullMessage on ModernMessage{__typename id seq date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}',
        selector: MessagesBatchSelector
    },
    MessagesSearch: {
        kind: 'query',
        name: 'MessagesSearch',
        body: 'query MessagesSearch($query:String!,$sort:String,$first:Int!,$after:String,$cid:ID){messagesSearch(query:$query,sort:$sort,first:$first,after:$after,cid:$cid){__typename edges{__typename node{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename id kind title membership isChannel role canEdit photo featured settings{__typename id mute}}}message{__typename id date sender{__typename id name firstName photo}senderBadge{__typename ...UserBadge}message fallback ... on GeneralMessage{__typename id attachments{__typename id fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename isImage imageFormat}}}quotedMessages{__typename id}}}}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount currentPage pagesCount openEnded}}}fragment UserBadge on UserBadge{__typename id name verified}',
        selector: MessagesSearchSelector
    },
    MessagesSearchFull: {
        kind: 'query',
        name: 'MessagesSearchFull',
        body: 'query MessagesSearchFull($query:String!,$sort:String,$first:Int!,$after:String,$cid:ID){messagesSearch(query:$query,sort:$sort,first:$first,after:$after,cid:$cid){__typename edges{__typename node{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename id kind title membership isChannel role canEdit photo settings{__typename id mute}}}message{__typename ...FullMessage}}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount currentPage pagesCount openEnded}}}fragment FullMessage on ModernMessage{__typename id seq date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}',
        selector: MessagesSearchFullSelector
    },
    MyApps: {
        kind: 'query',
        name: 'MyApps',
        body: 'query MyApps{apps:myApps{__typename ...AppFull}}fragment AppFull on AppProfile{__typename id name shortname photoRef{__typename uuid crop{__typename x y w h}}about token{__typename salt}}',
        selector: MyAppsSelector
    },
    MyBlackList: {
        kind: 'query',
        name: 'MyBlackList',
        body: 'query MyBlackList{myBlackList{__typename ...UserShort isBanned isMeBanned}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: MyBlackListSelector
    },
    MyCards: {
        kind: 'query',
        name: 'MyCards',
        body: 'query MyCards{myCards{__typename id pmid last4 brand expYear expMonth isDefault deleted}}',
        selector: MyCardsSelector
    },
    MyCommunities: {
        kind: 'query',
        name: 'MyCommunities',
        body: 'query MyCommunities{myCommunities{__typename ...OrganizationSmall membersCount isOwner:betaIsOwner isAdmin:betaIsAdmin}}fragment OrganizationSmall on Organization{__typename id name photo about shortname isCommunity:alphaIsCommunity featured:alphaFeatured}',
        selector: MyCommunitiesSelector
    },
    MyContacts: {
        kind: 'query',
        name: 'MyContacts',
        body: 'query MyContacts($first:Int!,$after:String){myContacts(first:$first,after:$after){__typename items{__typename id user{__typename ...UserShort}}cursor}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: MyContactsSelector
    },
    MyContactsSearch: {
        kind: 'query',
        name: 'MyContactsSearch',
        body: 'query MyContactsSearch($query:String,$first:Int!,$after:String,$page:Int){myContactsSearch(query:$query,first:$first,after:$after,page:$page){__typename edges{__typename node{__typename ...UserShort}}pageInfo{__typename hasNextPage currentPage}}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: MyContactsSearchSelector
    },
    MyContactsState: {
        kind: 'query',
        name: 'MyContactsState',
        body: 'query MyContactsState{myContactsState{__typename state}}',
        selector: MyContactsStateSelector
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
        body: 'query MyNotifications($first:Int!,$before:ID){myNotifications(first:$first,before:$before){__typename items{__typename ...NotificationFragment}cursor}}fragment NotificationFragment on Notification{__typename id text content{__typename ... on NewCommentNotification{__typename comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{__typename message{__typename ... on GeneralMessage{__typename id fallback message sender{__typename id name}senderBadge{__typename ...UserBadge}}}chat{__typename ...RoomNano}}... on CommentPeerRootPost{__typename post{__typename id}}}subscription{__typename type}}}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage}parentComment{__typename id comment:betaComment{__typename id message}}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id seq date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename id kind isChannel isPremium title photo membersCount featured settings{__typename id mute}}}',
        selector: MyNotificationsSelector
    },
    MyPostDrafts: {
        kind: 'query',
        name: 'MyPostDrafts',
        body: 'query MyPostDrafts($after:String){postMyDrafts(first:20,after:$after){__typename items{__typename ...PostDraftSimple}cursor}}fragment PostDraftSimple on PostDraft{__typename id title content{__typename ...ParagraphSimple}publishedCopy{__typename id}channel{__typename id title shortname}createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}',
        selector: MyPostDraftsSelector
    },
    MyStickers: {
        kind: 'query',
        name: 'MyStickers',
        body: 'query MyStickers{stickers:myStickers{__typename ...MyStickersFragment}}fragment MyStickersFragment on UserStickers{__typename unviewedCount packs{__typename id title stickers{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}',
        selector: MyStickersSelector
    },
    MyWallet: {
        kind: 'query',
        name: 'MyWallet',
        body: 'query MyWallet{myWallet{__typename id balance state isLocked failingPaymentsCount}transactionsPending{__typename ...WalletTransactionFragment}transactionsHistory(first:20){__typename items{__typename ...WalletTransactionFragment}cursor}}fragment WalletTransactionFragment on WalletTransaction{__typename id status date operation{__typename ... on WalletTransactionDeposit{__typename amount payment{__typename ...Payment}}... on WalletTransactionIncome{__typename amount payment{__typename ...Payment}source{__typename ... on WalletSubscription{__typename id product{__typename ...WalletProduct}}... on Purchase{__typename id user{__typename ...WalletUser}product{__typename ...WalletProduct}}}}... on WalletTransactionTransferIn{__typename amount payment{__typename ...Payment}fromUser{__typename ...UserShort}}... on WalletTransactionTransferOut{__typename amount walletAmount chargeAmount payment{__typename ...Payment}toUser{__typename ...UserShort}}... on WalletTransactionSubscription{__typename amount walletAmount chargeAmount subscription{__typename id interval amount product{__typename ...WalletProduct}}payment{__typename ...Payment}}... on WalletTransactionPurchase{__typename amount walletAmount chargeAmount purchase{__typename id product{__typename ...WalletProduct}}payment{__typename ...Payment}}}}fragment Payment on Payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}fragment WalletProduct on WalletProduct{__typename ... on WalletProductGroup{__typename group{__typename ...WalletGroup}}... on WalletProductDonation{__typename user{__typename ...WalletUser}}... on WalletProductDonationMessage{__typename user{__typename ...WalletUser}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename ...WalletUser}chat{__typename ... on SharedRoom{__typename id title}}}}fragment WalletGroup on SharedRoom{__typename id title photo}fragment WalletUser on User{__typename id name photo}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
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
        body: 'query Organization($organizationId:ID!){organization(id:$organizationId){__typename ...OrganizationFragment}}fragment OrganizationFragment on Organization{__typename id isMine isDeleted superAccountId name photo shortname website websiteTitle about twitter facebook linkedin instagram membersCount applyLink applyLinkEnabled owner{__typename id}private:alphaIsPrivate isOwner:betaIsOwner isAdmin:betaIsAdmin featured:alphaFeatured isCommunity:alphaIsCommunity roomsCount:betaPublicRoomsCount membersCanInvite:betaMembersCanInvite}',
        selector: OrganizationSelector
    },
    OrganizationMembers: {
        kind: 'query',
        name: 'OrganizationMembers',
        body: 'query OrganizationMembers($organizationId:ID!,$first:Int,$after:ID){organization(id:$organizationId){__typename id members:alphaOrganizationMembers(first:$first,after:$after){__typename role user{__typename ...UserShort}}}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: OrganizationMembersSelector
    },
    OrganizationMembersSearch: {
        kind: 'query',
        name: 'OrganizationMembersSearch',
        body: 'query OrganizationMembersSearch($orgId:ID!,$query:String,$first:Int!,$after:String,$page:Int){orgMembersSearch(orgId:$orgId,query:$query,first:$first,after:$after,page:$page){__typename edges{__typename node{__typename role user{__typename ...UserShort}}cursor}pageInfo{__typename hasNextPage}}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: OrganizationMembersSearchSelector
    },
    OrganizationPico: {
        kind: 'query',
        name: 'OrganizationPico',
        body: 'query OrganizationPico($id:ID!){organization(id:$id){__typename ...OrganizationSmall membersCount}}fragment OrganizationSmall on Organization{__typename id name photo about shortname isCommunity:alphaIsCommunity featured:alphaFeatured}',
        selector: OrganizationPicoSelector
    },
    OrganizationProfile: {
        kind: 'query',
        name: 'OrganizationProfile',
        body: 'query OrganizationProfile($organizationId:ID!){organizationProfile(id:$organizationId){__typename ...OrganizationProfileFragment}}fragment OrganizationProfileFragment on OrganizationProfile{__typename id name photoRef{__typename uuid crop{__typename x y w h}}website websiteTitle about twitter facebook linkedin instagram shortname applyLink applyLinkEnabled autosubscribeRooms isCommunity:alphaIsCommunity private:alphaIsPrivate featured:alphaFeatured published:alphaPublished editorial:alphaEditorial membersCanInvite:betaMembersCanInvite}',
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
        body: 'query OrganizationPublicRooms($organizationId:ID!,$first:Int!,$after:ID){organizationPublicRooms(id:$organizationId,first:$first,after:$after){__typename items{__typename ...SharedRoomView}cursor}}fragment SharedRoomView on SharedRoom{__typename id title photo membersCount featured}',
        selector: OrganizationPublicRoomsSelector
    },
    PhonebookWasExported: {
        kind: 'query',
        name: 'PhonebookWasExported',
        body: 'query PhonebookWasExported{phonebookWasExported}',
        selector: PhonebookWasExportedSelector
    },
    PicSharedMedia: {
        kind: 'query',
        name: 'PicSharedMedia',
        body: 'query PicSharedMedia($chatId:ID!,$first:Int!,$after:ID,$before:ID,$around:ID){chatSharedMedia(chatId:$chatId,mediaTypes:[IMAGE],first:$first,after:$after,before:$before,around:$around){__typename edges{__typename cursor index node{__typename message{__typename ... on GeneralMessage{__typename id date sender{__typename id name}attachments{__typename ... on MessageAttachmentFile{__typename id fileMetadata{__typename name isImage imageFormat mimeType imageWidth imageHeight size}filePreview fileId fallback}}}}}}}}',
        selector: PicSharedMediaSelector
    },
    Post: {
        kind: 'query',
        name: 'Post',
        body: 'query Post($id:ID!){post(id:$id){__typename ...PostSimple}}fragment PostSimple on Post{__typename id title content{__typename ...ParagraphSimple}channel{__typename id title shortname}author{__typename id name}draft{__typename id}canEdit createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}',
        selector: PostSelector
    },
    PostDraft: {
        kind: 'query',
        name: 'PostDraft',
        body: 'query PostDraft($id:ID!){postDraft(id:$id){__typename ...PostDraftSimple}}fragment PostDraftSimple on PostDraft{__typename id title content{__typename ...ParagraphSimple}publishedCopy{__typename id}channel{__typename id title shortname}createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}',
        selector: PostDraftSelector
    },
    Posts: {
        kind: 'query',
        name: 'Posts',
        body: 'query Posts($channels:[ID!]!,$after:String){posts(hubs:$channels,first:20,after:$after){__typename items{__typename ...PostSimple}cursor}}fragment PostSimple on Post{__typename id title content{__typename ...ParagraphSimple}channel{__typename id title shortname}author{__typename id name}draft{__typename id}canEdit createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}',
        selector: PostsSelector
    },
    Profile: {
        kind: 'query',
        name: 'Profile',
        body: 'query Profile{user:me{__typename id shortname}profile:myProfile{__typename id firstName lastName photoRef{__typename uuid crop{__typename x y w h}}birthDay email phone website about location role:alphaRole linkedin instagram facebook twitter joinedAt:alphaJoinedAt invitedBy:alphaInvitedBy{__typename id name}}}',
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
        body: 'query ResolveShortName($shortname:String!){item:alphaResolveShortName(shortname:$shortname){__typename ... on User{__typename id isDeleted}... on Organization{__typename id isDeleted}... on FeedChannel{__typename id}... on SharedRoom{__typename id}... on DiscoverChatsCollection{__typename id}... on Channel{__typename id}}}',
        selector: ResolveShortNameSelector
    },
    ResolvedInvite: {
        kind: 'query',
        name: 'ResolvedInvite',
        body: 'query ResolvedInvite($key:String!){invite:alphaResolveInvite(key:$key){__typename ... on InviteInfo{__typename id orgId title creator{__typename ...UserShort}organization{__typename id photo name membersCount about isMine isCommunity:alphaIsCommunity featured:alphaFeatured}}... on AppInvite{__typename inviter{__typename ...UserShort}}... on RoomInvite{__typename id invitedByUser{__typename ...UserShort}room{__typename ... on SharedRoom{__typename id kind isChannel title photo socialImage description membership membersCount featured previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}}}shortnameItem:alphaResolveShortName(shortname:$key){__typename ... on SharedRoom{__typename ...SharedRoomPreview}}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}fragment SharedRoomPreview on SharedRoom{__typename id isChannel isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}membership owner{__typename id}title photo externalSocialImage membersCount description featured previewMembers{__typename id name photo}}',
        selector: ResolvedInviteSelector
    },
    RoomAdminMembers: {
        kind: 'query',
        name: 'RoomAdminMembers',
        body: 'query RoomAdminMembers($roomId:ID!){roomAdmins(roomId:$roomId){__typename user{__typename ...UserShort}}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: RoomAdminMembersSelector
    },
    RoomChat: {
        kind: 'query',
        name: 'RoomChat',
        body: 'query RoomChat($id:ID!){room(id:$id){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort isYou inContacts isBanned isMeBanned}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind title membership isChannel role canEdit canSendMessage photo membersCount shortname featuredMembersCount socialImage activeVoiceChat{__typename ...VoiceChatWithSpeakers}featured welcomeMessage{__typename isOn sender{__typename id name}message}organization{__typename ...OrganizationSmall private:alphaIsPrivate isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}canUnpinMessage pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}settings{__typename id mute}description previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName isYou}serviceMessageSettings{__typename joinsMessageEnabled leavesMessageEnabled}callSettings{__typename mode callLink}repliesEnabled}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}fragment FullMessage on ModernMessage{__typename id seq date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership kind isChannel shortname}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followedByMe followersCount}status handRaised}fragment OrganizationSmall on Organization{__typename id name photo about shortname isCommunity:alphaIsCommunity featured:alphaFeatured}',
        selector: RoomChatSelector
    },
    RoomFeaturedMembers: {
        kind: 'query',
        name: 'RoomFeaturedMembers',
        body: 'query RoomFeaturedMembers($roomId:ID!){roomFeaturedMembers(roomId:$roomId){__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}fragment UserBadge on UserBadge{__typename id name verified}',
        selector: RoomFeaturedMembersSelector
    },
    RoomInviteInfo: {
        kind: 'query',
        name: 'RoomInviteInfo',
        body: 'query RoomInviteInfo($invite:String!){invite:betaRoomInviteInfo(invite:$invite){__typename id room{__typename ... on SharedRoom{__typename id kind isChannel title photo socialImage description featured organization{__typename ...OrganizationSmall}membership membersCount previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}invitedByUser{__typename ...UserShort}}}fragment OrganizationSmall on Organization{__typename id name photo about shortname isCommunity:alphaIsCommunity featured:alphaFeatured}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: RoomInviteInfoSelector
    },
    RoomInviteLink: {
        kind: 'query',
        name: 'RoomInviteLink',
        body: 'query RoomInviteLink($roomId:ID!){link:betaRoomInviteLink(roomId:$roomId)}',
        selector: RoomInviteLinkSelector
    },
    RoomMembersPaginated: {
        kind: 'query',
        name: 'RoomMembersPaginated',
        body: 'query RoomMembersPaginated($roomId:ID!,$first:Int,$after:ID){members:roomMembers(roomId:$roomId,first:$first,after:$after){__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}fragment UserBadge on UserBadge{__typename id name verified}',
        selector: RoomMembersPaginatedSelector
    },
    RoomMembersSearch: {
        kind: 'query',
        name: 'RoomMembersSearch',
        body: 'query RoomMembersSearch($cid:ID!,$query:String,$first:Int!,$after:String){chatMembersSearch(cid:$cid,query:$query,first:$first,after:$after){__typename edges{__typename node{__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}cursor}pageInfo{__typename hasNextPage}}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}fragment UserBadge on UserBadge{__typename id name verified}',
        selector: RoomMembersSearchSelector
    },
    RoomPico: {
        kind: 'query',
        name: 'RoomPico',
        body: 'query RoomPico($id:ID!){room(id:$id){__typename ...RoomNano}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename id kind isChannel isPremium title photo membersCount featured settings{__typename id mute}}}',
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
        body: 'query RoomSuper($id:ID!){roomSuper(id:$id){__typename id featured giftStickerPackId}room(id:$id){__typename ... on SharedRoom{__typename id stickerPack{__typename id}}}}',
        selector: RoomSuperSelector
    },
    Settings: {
        kind: 'query',
        name: 'Settings',
        body: 'query Settings{settings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id version primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone whoCanAddToGroups communityAdminsCanSeeContactInfo desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}channels{__typename showNotification sound}notificationPreview}',
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
    ShouldAskForAppReview: {
        kind: 'query',
        name: 'ShouldAskForAppReview',
        body: 'query ShouldAskForAppReview{shouldAskForAppReview}',
        selector: ShouldAskForAppReviewSelector
    },
    SocialUserFollowers: {
        kind: 'query',
        name: 'SocialUserFollowers',
        body: 'query SocialUserFollowers($uid:ID!,$first:Int!,$after:String){socialUserFollowers(uid:$uid,first:$first,after:$after){__typename items{__typename ...UserFollower}cursor}}fragment UserFollower on User{__typename id name shortname about followersCount followedByMe photo}',
        selector: SocialUserFollowersSelector
    },
    SocialUserFollowing: {
        kind: 'query',
        name: 'SocialUserFollowing',
        body: 'query SocialUserFollowing($uid:ID!,$first:Int!,$after:String){socialUserFollowing(uid:$uid,first:$first,after:$after){__typename items{__typename ...UserFollower}cursor}}fragment UserFollower on User{__typename id name shortname about followersCount followedByMe photo}',
        selector: SocialUserFollowingSelector
    },
    StickerPack: {
        kind: 'query',
        name: 'StickerPack',
        body: 'query StickerPack($id:ID!){stickerPack(id:$id){__typename ...StickerPackFragment}}fragment StickerPackFragment on StickerPack{__typename id title added private canAdd stickers{__typename ...StickerFragment}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}',
        selector: StickerPackSelector
    },
    StickerPackCatalog: {
        kind: 'query',
        name: 'StickerPackCatalog',
        body: 'query StickerPackCatalog{stickers:stickerPackCatalog{__typename id title published added stickers{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}',
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
    SuperAdmins: {
        kind: 'query',
        name: 'SuperAdmins',
        body: 'query SuperAdmins{superAdmins{__typename role user{__typename ...UserShort}email}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: SuperAdminsSelector
    },
    SuperAllStickerPacks: {
        kind: 'query',
        name: 'SuperAllStickerPacks',
        body: 'query SuperAllStickerPacks{superAllStickerPacks{__typename ...SuperStickerPackFragment}}fragment SuperStickerPackFragment on StickerPack{__typename id title published private listed added author{__typename id name}stickers{__typename ... on ImageSticker{__typename id emoji image{__typename uuid}}}}',
        selector: SuperAllStickerPacksSelector
    },
    SuperBadgeInRoom: {
        kind: 'query',
        name: 'SuperBadgeInRoom',
        body: 'query SuperBadgeInRoom($roomId:ID!,$userId:ID!){superBadgeInRoom(roomId:$roomId,userId:$userId){__typename ...UserBadge}}fragment UserBadge on UserBadge{__typename id name verified}',
        selector: SuperBadgeInRoomSelector
    },
    SuperStickerPack: {
        kind: 'query',
        name: 'SuperStickerPack',
        body: 'query SuperStickerPack($id:ID!){stickerPack(id:$id){__typename ...SuperStickerPackFragment}}fragment SuperStickerPackFragment on StickerPack{__typename id title published private listed added author{__typename id name}stickers{__typename ... on ImageSticker{__typename id emoji image{__typename uuid}}}}',
        selector: SuperStickerPackSelector
    },
    SuperStickerPackCatalog: {
        kind: 'query',
        name: 'SuperStickerPackCatalog',
        body: 'query SuperStickerPackCatalog{stickers:stickerPackCatalog{__typename ...SuperStickerPackFragment}}fragment SuperStickerPackFragment on StickerPack{__typename id title published private listed added author{__typename id name}stickers{__typename ... on ImageSticker{__typename id emoji image{__typename uuid}}}}',
        selector: SuperStickerPackCatalogSelector
    },
    TransactionsHistory: {
        kind: 'query',
        name: 'TransactionsHistory',
        body: 'query TransactionsHistory($first:Int!,$after:String){transactionsHistory(first:$first,after:$after){__typename items{__typename ...WalletTransactionFragment}cursor}}fragment WalletTransactionFragment on WalletTransaction{__typename id status date operation{__typename ... on WalletTransactionDeposit{__typename amount payment{__typename ...Payment}}... on WalletTransactionIncome{__typename amount payment{__typename ...Payment}source{__typename ... on WalletSubscription{__typename id product{__typename ...WalletProduct}}... on Purchase{__typename id user{__typename ...WalletUser}product{__typename ...WalletProduct}}}}... on WalletTransactionTransferIn{__typename amount payment{__typename ...Payment}fromUser{__typename ...UserShort}}... on WalletTransactionTransferOut{__typename amount walletAmount chargeAmount payment{__typename ...Payment}toUser{__typename ...UserShort}}... on WalletTransactionSubscription{__typename amount walletAmount chargeAmount subscription{__typename id interval amount product{__typename ...WalletProduct}}payment{__typename ...Payment}}... on WalletTransactionPurchase{__typename amount walletAmount chargeAmount purchase{__typename id product{__typename ...WalletProduct}}payment{__typename ...Payment}}}}fragment Payment on Payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}fragment WalletProduct on WalletProduct{__typename ... on WalletProductGroup{__typename group{__typename ...WalletGroup}}... on WalletProductDonation{__typename user{__typename ...WalletUser}}... on WalletProductDonationMessage{__typename user{__typename ...WalletUser}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename ...WalletUser}chat{__typename ... on SharedRoom{__typename id title}}}}fragment WalletGroup on SharedRoom{__typename id title photo}fragment WalletUser on User{__typename id name photo}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: TransactionsHistorySelector
    },
    UnviewedStickers: {
        kind: 'query',
        name: 'UnviewedStickers',
        body: 'query UnviewedStickers{stickers:myStickers{__typename unviewedCount}}',
        selector: UnviewedStickersSelector
    },
    UpdateUsers: {
        kind: 'query',
        name: 'UpdateUsers',
        body: 'query UpdateUsers($ids:[ID!]!){users(ids:$ids){__typename ...UpdateUser}}fragment UpdateUser on User{__typename id name firstName lastName photo}',
        selector: UpdateUsersSelector
    },
    User: {
        kind: 'query',
        name: 'User',
        body: 'query User($userId:ID!){user:user(id:$userId){__typename ...UserFull}conversation:room(id:$userId){__typename ... on PrivateRoom{__typename id settings{__typename id mute}}}}fragment UserFull on User{__typename id name firstName lastName photo phone birthDay email website about birthDay location isBot isDeleted online lastSeen joinDate linkedin instagram twitter facebook shortname audienceSize inContacts isBanned isMeBanned followedByMe followersCount followingCount currentVoiceChat{__typename ...VoiceChatWithSpeakers}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership kind isChannel shortname}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followedByMe followersCount}status handRaised}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: UserSelector
    },
    UserAvailableRooms: {
        kind: 'query',
        name: 'UserAvailableRooms',
        body: 'query UserAvailableRooms($first:Int!,$after:String,$query:String){alphaUserAvailableRooms(first:$first,after:$after,query:$query){__typename edges{__typename node{__typename ...DiscoverSharedRoom}cursor}pageInfo{__typename hasNextPage}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive featured}',
        selector: UserAvailableRoomsSelector
    },
    UserFollowers: {
        kind: 'query',
        name: 'UserFollowers',
        body: 'query UserFollowers($id:ID!){user(id:$id){__typename id name followersCount followingCount}}',
        selector: UserFollowersSelector
    },
    UserNano: {
        kind: 'query',
        name: 'UserNano',
        body: 'query UserNano($id:ID!){user(id:$id){__typename id name photo shortname isBot inContacts isBanned isMeBanned}}',
        selector: UserNanoSelector
    },
    UserSearchForChat: {
        kind: 'query',
        name: 'UserSearchForChat',
        body: 'query UserSearchForChat($chatId:ID!,$query:String,$first:Int!,$after:String,$sort:String){userSearchForChat(chatId:$chatId,query:$query,first:$first,after:$after,sort:$sort){__typename edges{__typename node{__typename ...UserShort isBanned isMeBanned}isMember cursor inviteRestricted}pageInfo{__typename hasNextPage}}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: UserSearchForChatSelector
    },
    UserSearchForOrganization: {
        kind: 'query',
        name: 'UserSearchForOrganization',
        body: 'query UserSearchForOrganization($orgId:ID!,$query:String,$first:Int!,$after:String,$sort:String){userSearchForOrg(orgId:$orgId,query:$query,first:$first,after:$after,sort:$sort){__typename edges{__typename node{__typename ...UserShort isBanned isMeBanned}isMember cursor}pageInfo{__typename hasNextPage}}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: UserSearchForOrganizationSelector
    },
    UserStorage: {
        kind: 'query',
        name: 'UserStorage',
        body: 'query UserStorage($namespace:String!,$keys:[String!]!){userStorage(namespace:$namespace,keys:$keys){__typename id key value}}',
        selector: UserStorageSelector
    },
    VoiceChat: {
        kind: 'query',
        name: 'VoiceChat',
        body: 'query VoiceChat($id:ID!){voiceChat(id:$id){__typename ...VoiceChatWithSpeakers}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership kind isChannel shortname}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followedByMe followersCount}status handRaised}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: VoiceChatSelector
    },
    VoiceChatControls: {
        kind: 'query',
        name: 'VoiceChatControls',
        body: 'query VoiceChatControls($id:ID!){voiceChat(id:$id){__typename id me{__typename id user{__typename id shortname}status handRaised}}}',
        selector: VoiceChatControlsSelector
    },
    VoiceChatEventsState: {
        kind: 'query',
        name: 'VoiceChatEventsState',
        body: 'query VoiceChatEventsState($id:ID!){voiceChatEventsState(id:$id){__typename state}}',
        selector: VoiceChatEventsStateSelector
    },
    VoiceChatFull: {
        kind: 'query',
        name: 'VoiceChatFull',
        body: 'query VoiceChatFull($id:ID!){voiceChat(id:$id){__typename ...FullVoiceChat}}fragment FullVoiceChat on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}listeners{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership kind isChannel shortname}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followedByMe followersCount}status handRaised}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: VoiceChatFullSelector
    },
    VoiceChatListeners: {
        kind: 'query',
        name: 'VoiceChatListeners',
        body: 'query VoiceChatListeners($id:ID!,$first:Int!,$after:String){voiceChatListeners(id:$id,first:$first,after:$after){__typename items{__typename ...VoiceChatParticipant}cursor}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followedByMe followersCount}status handRaised}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: VoiceChatListenersSelector
    },
    VoiceChatUser: {
        kind: 'query',
        name: 'VoiceChatUser',
        body: 'query VoiceChatUser($uid:ID!){user(id:$uid){__typename id name photo followersCount followedByMe about}conversation:room(id:$uid){__typename ... on PrivateRoom{__typename id settings{__typename id mute}}}}',
        selector: VoiceChatUserSelector
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
        body: 'mutation AddAppToChat($appId:ID!,$chatId:ID!){addAppToChat(appId:$appId,chatId:$chatId){__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}webhook}}',
        selector: AddAppToChatSelector
    },
    AddComment: {
        kind: 'mutation',
        name: 'AddComment',
        body: 'mutation AddComment($repeatKey:String,$peerId:ID!,$message:String,$replyComment:ID,$mentions:[MentionInput!],$fileAttachments:[FileAttachmentInput!],$spans:[MessageSpanInput!]){betaAddComment(repeatKey:$repeatKey,peerId:$peerId,message:$message,replyComment:$replyComment,mentions:$mentions,fileAttachments:$fileAttachments,spans:$spans){__typename id}}',
        selector: AddCommentSelector
    },
    AddSticker: {
        kind: 'mutation',
        name: 'AddSticker',
        body: 'mutation AddSticker($packId:ID!,$input:StickerInput!){stickerPackAddSticker(id:$packId,input:$input){__typename ... on ImageSticker{__typename id}}}',
        selector: AddStickerSelector
    },
    AddStickerComment: {
        kind: 'mutation',
        name: 'AddStickerComment',
        body: 'mutation AddStickerComment($peerId:ID!,$stickerId:ID!,$replyComment:ID,$repeatKey:String){addStickerComment:betaAddStickerComment(peerId:$peerId,stickerId:$stickerId,replyComment:$replyComment,repeatKey:$repeatKey){__typename id}}',
        selector: AddStickerCommentSelector
    },
    AddToContacts: {
        kind: 'mutation',
        name: 'AddToContacts',
        body: 'mutation AddToContacts($userId:ID!){addToContacts(userId:$userId)}',
        selector: AddToContactsSelector
    },
    BanUser: {
        kind: 'mutation',
        name: 'BanUser',
        body: 'mutation BanUser($id:ID!){banUser(id:$id)}',
        selector: BanUserSelector
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
    ChatDelete: {
        kind: 'mutation',
        name: 'ChatDelete',
        body: 'mutation ChatDelete($chatId:ID!,$oneSide:Boolean){deleteChat(chatId:$chatId,oneSide:$oneSide)}',
        selector: ChatDeleteSelector
    },
    CommentDeleteUrlAugmentation: {
        kind: 'mutation',
        name: 'CommentDeleteUrlAugmentation',
        body: 'mutation CommentDeleteUrlAugmentation($id:ID!){deleteCommentAugmentation(id:$id)}',
        selector: CommentDeleteUrlAugmentationSelector
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
    ConferenceJoin: {
        kind: 'mutation',
        name: 'ConferenceJoin',
        body: 'mutation ConferenceJoin($id:ID!,$input:ConferenceJoinInput){conferenceJoin(id:$id,input:$input){__typename peerId conference{__typename ...ConferenceShort}}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}',
        selector: ConferenceJoinSelector
    },
    ConferenceKeepAlive: {
        kind: 'mutation',
        name: 'ConferenceKeepAlive',
        body: 'mutation ConferenceKeepAlive($id:ID!,$peerId:ID!){conferenceKeepAlive(id:$id,peerId:$peerId){__typename id}}',
        selector: ConferenceKeepAliveSelector
    },
    ConferenceLeave: {
        kind: 'mutation',
        name: 'ConferenceLeave',
        body: 'mutation ConferenceLeave($id:ID!,$peerId:ID!){conferenceLeave(id:$id,peerId:$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}',
        selector: ConferenceLeaveSelector
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
    DiscoverCollectionSetShortname: {
        kind: 'mutation',
        name: 'DiscoverCollectionSetShortname',
        body: 'mutation DiscoverCollectionSetShortname($id:ID!,$shortname:String!){alphaSetCollectionShortName(id:$id,shortname:$shortname)}',
        selector: DiscoverCollectionSetShortnameSelector
    },
    DiscoverCollectionsCreate: {
        kind: 'mutation',
        name: 'DiscoverCollectionsCreate',
        body: 'mutation DiscoverCollectionsCreate($title:String!,$description:String,$image:ImageRefInput!,$chatIds:[ID!]!){discoverCollectionsCreate(collection:{title:$title,description:$description,image:$image,chatIds:$chatIds}){__typename id title}}',
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
        body: 'mutation DiscoverCollectionsUpdate($id:ID!,$title:String!,$description:String,$image:ImageRefInput!,$chatIds:[ID!]!){discoverCollectionsUpdate(id:$id,input:{title:$title,description:$description,image:$image,chatIds:$chatIds}){__typename id title}}',
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
    MakeCardDefault: {
        kind: 'mutation',
        name: 'MakeCardDefault',
        body: 'mutation MakeCardDefault($id:ID!){cardMakeDefault(id:$id){__typename id isDefault}}',
        selector: MakeCardDefaultSelector
    },
    MarkStickersViewed: {
        kind: 'mutation',
        name: 'MarkStickersViewed',
        body: 'mutation MarkStickersViewed{myStickersMarkAsViewed}',
        selector: MarkStickersViewedSelector
    },
    MediaAnswer: {
        kind: 'mutation',
        name: 'MediaAnswer',
        body: 'mutation MediaAnswer($id:ID!,$peerId:ID!,$answer:String!,$seq:Int!){mediaStreamAnswer(id:$id,peerId:$peerId,answer:$answer,seq:$seq){__typename id streams{__typename ...MediaStreamFull}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource mid}senders{__typename kind videoSource codecParams mid}}',
        selector: MediaAnswerSelector
    },
    MediaCandidate: {
        kind: 'mutation',
        name: 'MediaCandidate',
        body: 'mutation MediaCandidate($id:ID!,$peerId:ID!,$candidate:String!){mediaStreamCandidate(id:$id,peerId:$peerId,candidate:$candidate){__typename id streams{__typename ...MediaStreamFull}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource mid}senders{__typename kind videoSource codecParams mid}}',
        selector: MediaCandidateSelector
    },
    MediaFailed: {
        kind: 'mutation',
        name: 'MediaFailed',
        body: 'mutation MediaFailed($id:ID!,$peerId:ID!){mediaStreamFailed(id:$id,peerId:$peerId){__typename id streams{__typename ...MediaStreamFull}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource mid}senders{__typename kind videoSource codecParams mid}}',
        selector: MediaFailedSelector
    },
    MediaOffer: {
        kind: 'mutation',
        name: 'MediaOffer',
        body: 'mutation MediaOffer($id:ID!,$peerId:ID!,$offer:String!,$seq:Int!,$hints:[MediaStreamHint!]){mediaStreamOffer(id:$id,peerId:$peerId,offer:$offer,seq:$seq,hints:$hints){__typename id streams{__typename ...MediaStreamFull}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource mid}senders{__typename kind videoSource codecParams mid}}',
        selector: MediaOfferSelector
    },
    MessageSetDonationReaction: {
        kind: 'mutation',
        name: 'MessageSetDonationReaction',
        body: 'mutation MessageSetDonationReaction($messageId:ID!){messageDonationReactionAdd(messageId:$messageId)}',
        selector: MessageSetDonationReactionSelector
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
    OnLogout: {
        kind: 'mutation',
        name: 'OnLogout',
        body: 'mutation OnLogout{onLogOut}',
        selector: OnLogoutSelector
    },
    OrganizationAddMember: {
        kind: 'mutation',
        name: 'OrganizationAddMember',
        body: 'mutation OrganizationAddMember($userIds:[ID!],$organizationId:ID!){alphaOrganizationMemberAdd(userIds:$userIds,organizationId:$organizationId){__typename role user{__typename ...UserShort}}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: OrganizationAddMemberSelector
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
    OrganizationRequestMembersExport: {
        kind: 'mutation',
        name: 'OrganizationRequestMembersExport',
        body: 'mutation OrganizationRequestMembersExport($organizationId:ID!){requestOrganizationMembersExport(id:$organizationId)}',
        selector: OrganizationRequestMembersExportSelector
    },
    PairEmail: {
        kind: 'mutation',
        name: 'PairEmail',
        body: 'mutation PairEmail($sessionId:String!,$confirmationCode:String!){pairEmail(sessionId:$sessionId,confirmationCode:$confirmationCode)}',
        selector: PairEmailSelector
    },
    PairPhone: {
        kind: 'mutation',
        name: 'PairPhone',
        body: 'mutation PairPhone($sessionId:String!,$confirmationCode:String!){pairPhone(sessionId:$sessionId,confirmationCode:$confirmationCode)}',
        selector: PairPhoneSelector
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
    PhonebookAdd: {
        kind: 'mutation',
        name: 'PhonebookAdd',
        body: 'mutation PhonebookAdd($records:[PhonebookRecordInput!]!){phonebookAdd(records:$records)}',
        selector: PhonebookAddSelector
    },
    PinMessage: {
        kind: 'mutation',
        name: 'PinMessage',
        body: 'mutation PinMessage($chatId:ID!,$messageId:ID!){pinMessage:gammaPinMessage(chatId:$chatId,messageId:$messageId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort isYou inContacts isBanned isMeBanned}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind title membership isChannel role canEdit canSendMessage photo membersCount shortname featuredMembersCount socialImage activeVoiceChat{__typename ...VoiceChatWithSpeakers}featured welcomeMessage{__typename isOn sender{__typename id name}message}organization{__typename ...OrganizationSmall private:alphaIsPrivate isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}canUnpinMessage pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}settings{__typename id mute}description previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName isYou}serviceMessageSettings{__typename joinsMessageEnabled leavesMessageEnabled}callSettings{__typename mode callLink}repliesEnabled}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}fragment FullMessage on ModernMessage{__typename id seq date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership kind isChannel shortname}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followedByMe followersCount}status handRaised}fragment OrganizationSmall on Organization{__typename id name photo about shortname isCommunity:alphaIsCommunity featured:alphaFeatured}',
        selector: PinMessageSelector
    },
    PostCreateDraft: {
        kind: 'mutation',
        name: 'PostCreateDraft',
        body: 'mutation PostCreateDraft{postDraftCreate(input:{}){__typename ...PostDraftSimple}}fragment PostDraftSimple on PostDraft{__typename id title content{__typename ...ParagraphSimple}publishedCopy{__typename id}channel{__typename id title shortname}createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}',
        selector: PostCreateDraftSelector
    },
    PostDraftUpdate: {
        kind: 'mutation',
        name: 'PostDraftUpdate',
        body: 'mutation PostDraftUpdate($id:ID!,$channel:ID,$title:String!,$content:[PostContentInput!]){postDraftUpdate(id:$id,input:{hub:$channel,title:$title,content:$content}){__typename ...PostDraftSimple}}fragment PostDraftSimple on PostDraft{__typename id title content{__typename ...ParagraphSimple}publishedCopy{__typename id}channel{__typename id title shortname}createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}',
        selector: PostDraftUpdateSelector
    },
    PostPublish: {
        kind: 'mutation',
        name: 'PostPublish',
        body: 'mutation PostPublish($id:ID!){postDraftPublish(id:$id){__typename ...PostSimple}}fragment PostSimple on Post{__typename id title content{__typename ...ParagraphSimple}channel{__typename id title shortname}author{__typename id name}draft{__typename id}canEdit createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}',
        selector: PostPublishSelector
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
        body: 'mutation ProfileUpdate($input:ProfileInput!,$uid:ID,$inviteKey:String){profileUpdate(input:$input,uid:$uid,inviteKey:$inviteKey){__typename id firstName lastName photoRef{__typename uuid crop{__typename x y w h}}birthDay email phone website about location role:alphaRole linkedin instagram facebook twitter joinedAt:alphaJoinedAt invitedBy:alphaInvitedBy{__typename id name}}}',
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
    RemoveFromContacts: {
        kind: 'mutation',
        name: 'RemoveFromContacts',
        body: 'mutation RemoveFromContacts($userId:ID!){removeFromContacts(userId:$userId)}',
        selector: RemoveFromContactsSelector
    },
    RemoveSticker: {
        kind: 'mutation',
        name: 'RemoveSticker',
        body: 'mutation RemoveSticker($id:ID!){stickerPackRemoveSticker(id:$id)}',
        selector: RemoveStickerSelector
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
        body: 'mutation RoomAddMembers($roomId:ID!,$invites:[RoomInviteInput!]!){alphaRoomInvite(roomId:$roomId,invites:$invites){__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}fragment UserBadge on UserBadge{__typename id name verified}',
        selector: RoomAddMembersSelector
    },
    RoomAlterFeatured: {
        kind: 'mutation',
        name: 'RoomAlterFeatured',
        body: 'mutation RoomAlterFeatured($id:ID!,$featured:Boolean!){betaRoomAlterFeatured(roomId:$id,featured:$featured){__typename id featured}}',
        selector: RoomAlterFeaturedSelector
    },
    RoomChangeRole: {
        kind: 'mutation',
        name: 'RoomChangeRole',
        body: 'mutation RoomChangeRole($roomId:ID!,$userId:ID!,$newRole:RoomMemberRole!){betaRoomChangeRole(roomId:$roomId,userId:$userId,newRole:$newRole){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}',
        selector: RoomChangeRoleSelector
    },
    RoomCreate: {
        kind: 'mutation',
        name: 'RoomCreate',
        body: 'mutation RoomCreate($kind:SharedRoomKind!,$members:[ID!]!,$message:String,$title:String,$description:String,$photoRef:ImageRefInput,$organizationId:ID,$channel:Boolean!,$price:Int,$interval:WalletSubscriptionInterval){room:betaRoomCreate(kind:$kind,members:$members,message:$message,title:$title,description:$description,photoRef:$photoRef,organizationId:$organizationId,channel:$channel,price:$price,interval:$interval){__typename id}}',
        selector: RoomCreateSelector
    },
    RoomDelete: {
        kind: 'mutation',
        name: 'RoomDelete',
        body: 'mutation RoomDelete($chatId:ID!){deleteChat(chatId:$chatId)}',
        selector: RoomDeleteSelector
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
        body: 'mutation RoomJoinInviteLink($invite:String!){join:betaRoomInviteLinkJoin(invite:$invite){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort isYou inContacts isBanned isMeBanned}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind title membership isChannel role canEdit canSendMessage photo membersCount shortname featuredMembersCount socialImage activeVoiceChat{__typename ...VoiceChatWithSpeakers}featured welcomeMessage{__typename isOn sender{__typename id name}message}organization{__typename ...OrganizationSmall private:alphaIsPrivate isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}canUnpinMessage pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}settings{__typename id mute}description previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName isYou}serviceMessageSettings{__typename joinsMessageEnabled leavesMessageEnabled}callSettings{__typename mode callLink}repliesEnabled}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}fragment FullMessage on ModernMessage{__typename id seq date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership kind isChannel shortname}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followedByMe followersCount}status handRaised}fragment OrganizationSmall on Organization{__typename id name photo about shortname isCommunity:alphaIsCommunity featured:alphaFeatured}',
        selector: RoomJoinInviteLinkSelector
    },
    RoomKick: {
        kind: 'mutation',
        name: 'RoomKick',
        body: 'mutation RoomKick($roomId:ID!,$userId:ID!){betaRoomKick(roomId:$roomId,userId:$userId){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}',
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
        body: 'mutation RoomUpdate($roomId:ID!,$input:RoomUpdateInput!){betaRoomUpdate(roomId:$roomId,input:$input){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id title photo description socialImage repliesEnabled}}}',
        selector: RoomUpdateSelector
    },
    RoomsInviteUser: {
        kind: 'mutation',
        name: 'RoomsInviteUser',
        body: 'mutation RoomsInviteUser($userId:ID!,$roomIds:[ID!]!){rooms:betaRoomsInviteUser(userId:$userId,roomIds:$roomIds){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort isYou inContacts isBanned isMeBanned}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind title membership isChannel role canEdit canSendMessage photo membersCount shortname featuredMembersCount socialImage activeVoiceChat{__typename ...VoiceChatWithSpeakers}featured welcomeMessage{__typename isOn sender{__typename id name}message}organization{__typename ...OrganizationSmall private:alphaIsPrivate isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}canUnpinMessage pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}settings{__typename id mute}description previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName isYou}serviceMessageSettings{__typename joinsMessageEnabled leavesMessageEnabled}callSettings{__typename mode callLink}repliesEnabled}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}fragment FullMessage on ModernMessage{__typename id seq date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership kind isChannel shortname}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followedByMe followersCount}status handRaised}fragment OrganizationSmall on Organization{__typename id name photo about shortname isCommunity:alphaIsCommunity featured:alphaFeatured}',
        selector: RoomsInviteUserSelector
    },
    RoomsJoin: {
        kind: 'mutation',
        name: 'RoomsJoin',
        body: 'mutation RoomsJoin($roomsIds:[ID!]!){join:betaRoomsJoin(roomsIds:$roomsIds){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}',
        selector: RoomsJoinSelector
    },
    SendDonation: {
        kind: 'mutation',
        name: 'SendDonation',
        body: 'mutation SendDonation($amount:Int!,$chatId:ID,$userId:ID,$message:String,$repeatKey:String){sendDonation(chatId:$chatId,userId:$userId,amount:$amount,message:$message,repeatKey:$repeatKey)}',
        selector: SendDonationSelector
    },
    SendEmailPairCode: {
        kind: 'mutation',
        name: 'SendEmailPairCode',
        body: 'mutation SendEmailPairCode($email:String!){sendEmailPairCode(email:$email)}',
        selector: SendEmailPairCodeSelector
    },
    SendMessage: {
        kind: 'mutation',
        name: 'SendMessage',
        body: 'mutation SendMessage($chatId:ID!,$message:String,$replyMessages:[ID!],$mentions:[MentionInput!],$fileAttachments:[FileAttachmentInput!],$spans:[MessageSpanInput!],$repeatKey:String){sentMessage:sendMessage(chatId:$chatId,message:$message,replyMessages:$replyMessages,mentions:$mentions,fileAttachments:$fileAttachments,spans:$spans,repeatKey:$repeatKey)}',
        selector: SendMessageSelector
    },
    SendPhonePairCode: {
        kind: 'mutation',
        name: 'SendPhonePairCode',
        body: 'mutation SendPhonePairCode($phone:String!){sendPhonePairCode(phone:$phone)}',
        selector: SendPhonePairCodeSelector
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
        body: 'mutation SettingsUpdate($input:UpdateSettingsInput){updateSettings(settings:$input){__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id version primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone whoCanAddToGroups communityAdminsCanSeeContactInfo desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}channels{__typename showNotification sound}notificationPreview}',
        selector: SettingsUpdateSelector
    },
    SocialFollow: {
        kind: 'mutation',
        name: 'SocialFollow',
        body: 'mutation SocialFollow($uid:ID!){socialFollow(uid:$uid)}',
        selector: SocialFollowSelector
    },
    SocialUnfollow: {
        kind: 'mutation',
        name: 'SocialUnfollow',
        body: 'mutation SocialUnfollow($uid:ID!){socialUnfollow(uid:$uid)}',
        selector: SocialUnfollowSelector
    },
    StickerPackAddToCollection: {
        kind: 'mutation',
        name: 'StickerPackAddToCollection',
        body: 'mutation StickerPackAddToCollection($id:ID!){stickerPackAddToCollection:stickerPackAddToCollection(id:$id)}',
        selector: StickerPackAddToCollectionSelector
    },
    StickerPackCreate: {
        kind: 'mutation',
        name: 'StickerPackCreate',
        body: 'mutation StickerPackCreate($title:String!,$stickers:[StickerInput!]){stickerPackCreate(title:$title,stickers:$stickers){__typename id}}',
        selector: StickerPackCreateSelector
    },
    StickerPackRemoveFromCollection: {
        kind: 'mutation',
        name: 'StickerPackRemoveFromCollection',
        body: 'mutation StickerPackRemoveFromCollection($id:ID!){stickerPackRemoveFromCollection:stickerPackRemoveFromCollection(id:$id)}',
        selector: StickerPackRemoveFromCollectionSelector
    },
    StickerPackUpdate: {
        kind: 'mutation',
        name: 'StickerPackUpdate',
        body: 'mutation StickerPackUpdate($id:ID!,$input:StickerPackInput!){stickerPackUpdate(id:$id,input:$input){__typename id}}',
        selector: StickerPackUpdateSelector
    },
    SubscribeToComments: {
        kind: 'mutation',
        name: 'SubscribeToComments',
        body: 'mutation SubscribeToComments($peerId:ID!,$type:CommentSubscriptionType!){subscribeToComments(peerId:$peerId,type:$type)}',
        selector: SubscribeToCommentsSelector
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
    UnBanUser: {
        kind: 'mutation',
        name: 'UnBanUser',
        body: 'mutation UnBanUser($id:ID!){unBanUser(id:$id)}',
        selector: UnBanUserSelector
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
        body: 'mutation UnpinMessage($chatId:ID!){unpinMessage:gammaUnpinMessage(chatId:$chatId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort isYou inContacts isBanned isMeBanned}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind title membership isChannel role canEdit canSendMessage photo membersCount shortname featuredMembersCount socialImage activeVoiceChat{__typename ...VoiceChatWithSpeakers}featured welcomeMessage{__typename isOn sender{__typename id name}message}organization{__typename ...OrganizationSmall private:alphaIsPrivate isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}canUnpinMessage pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}settings{__typename id mute}description previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName isYou}serviceMessageSettings{__typename joinsMessageEnabled leavesMessageEnabled}callSettings{__typename mode callLink}repliesEnabled}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}fragment FullMessage on ModernMessage{__typename id seq date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership kind isChannel shortname}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followedByMe followersCount}status handRaised}fragment OrganizationSmall on Organization{__typename id name photo about shortname isCommunity:alphaIsCommunity featured:alphaFeatured}',
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
        body: 'mutation UpdateOrganization($input:UpdateOrganizationProfileInput!,$organizationId:ID){updateOrganizationProfile(input:$input,id:$organizationId){__typename id}}',
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
    VoiceChatCreate: {
        kind: 'mutation',
        name: 'VoiceChatCreate',
        body: 'mutation VoiceChatCreate($input:VoiceChatInput!){voiceChatCreate(input:$input){__typename ...VoiceChatWithSpeakers}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership kind isChannel shortname}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followedByMe followersCount}status handRaised}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: VoiceChatCreateSelector
    },
    VoiceChatCreateInChat: {
        kind: 'mutation',
        name: 'VoiceChatCreateInChat',
        body: 'mutation VoiceChatCreateInChat($input:VoiceChatInput!,$cid:ID!){voiceChatCreateInChat(input:$input,cid:$cid){__typename chat{__typename ...VoiceChatWithSpeakers}peerId conference{__typename ...ConferenceShort}}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership kind isChannel shortname}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followedByMe followersCount}status handRaised}fragment UserSmall on User{__typename id name firstName photo shortname isBot}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}',
        selector: VoiceChatCreateInChatSelector
    },
    VoiceChatDeletePinnedMessage: {
        kind: 'mutation',
        name: 'VoiceChatDeletePinnedMessage',
        body: 'mutation VoiceChatDeletePinnedMessage($id:ID!){voiceChatDeletePinnedMessage(id:$id){__typename id}}',
        selector: VoiceChatDeletePinnedMessageSelector
    },
    VoiceChatDemote: {
        kind: 'mutation',
        name: 'VoiceChatDemote',
        body: 'mutation VoiceChatDemote($id:ID!,$uid:ID!){voiceChatDemote(id:$id,uid:$uid)}',
        selector: VoiceChatDemoteSelector
    },
    VoiceChatEnd: {
        kind: 'mutation',
        name: 'VoiceChatEnd',
        body: 'mutation VoiceChatEnd($id:ID!){voiceChatEnd(id:$id){__typename id}}',
        selector: VoiceChatEndSelector
    },
    VoiceChatJoin: {
        kind: 'mutation',
        name: 'VoiceChatJoin',
        body: 'mutation VoiceChatJoin($id:ID!){voiceChatJoin(id:$id){__typename id}}',
        selector: VoiceChatJoinSelector
    },
    VoiceChatKick: {
        kind: 'mutation',
        name: 'VoiceChatKick',
        body: 'mutation VoiceChatKick($id:ID!,$uid:ID!){voiceChatKick(id:$id,uid:$uid)}',
        selector: VoiceChatKickSelector
    },
    VoiceChatLeave: {
        kind: 'mutation',
        name: 'VoiceChatLeave',
        body: 'mutation VoiceChatLeave($id:ID!){voiceChatLeave(id:$id)}',
        selector: VoiceChatLeaveSelector
    },
    VoiceChatPromote: {
        kind: 'mutation',
        name: 'VoiceChatPromote',
        body: 'mutation VoiceChatPromote($id:ID!,$uid:ID!){voiceChatPromote(id:$id,uid:$uid)}',
        selector: VoiceChatPromoteSelector
    },
    VoiceChatRaiseHand: {
        kind: 'mutation',
        name: 'VoiceChatRaiseHand',
        body: 'mutation VoiceChatRaiseHand($id:ID!,$raised:Boolean!){voiceChatRaiseHand(id:$id,raised:$raised)}',
        selector: VoiceChatRaiseHandSelector
    },
    VoiceChatSetPinnedMessage: {
        kind: 'mutation',
        name: 'VoiceChatSetPinnedMessage',
        body: 'mutation VoiceChatSetPinnedMessage($id:ID!,$message:String,$spans:[MessageSpanInput!]){voiceChatSetPinnedMessage(id:$id,message:$message,spans:$spans){__typename id}}',
        selector: VoiceChatSetPinnedMessageSelector
    },
    VoiceChatUpdate: {
        kind: 'mutation',
        name: 'VoiceChatUpdate',
        body: 'mutation VoiceChatUpdate($id:ID!,$input:VoiceChatInput!){voiceChatUpdate(id:$id,input:$input){__typename id}}',
        selector: VoiceChatUpdateSelector
    },
    VoiceChatUpdateAdmin: {
        kind: 'mutation',
        name: 'VoiceChatUpdateAdmin',
        body: 'mutation VoiceChatUpdateAdmin($id:ID!,$uid:ID!,$admin:Boolean!){voiceChatUpdateAdmin(id:$id,uid:$uid,admin:$admin)}',
        selector: VoiceChatUpdateAdminSelector
    },
    conferenceAddScreenShare: {
        kind: 'mutation',
        name: 'conferenceAddScreenShare',
        body: 'mutation conferenceAddScreenShare($id:ID!){conferenceAddScreenShare(id:$id){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}',
        selector: conferenceAddScreenShareSelector
    },
    conferenceAlterMediaState: {
        kind: 'mutation',
        name: 'conferenceAlterMediaState',
        body: 'mutation conferenceAlterMediaState($id:ID!,$state:MediaStreamMediaStateInput!){conferenceAlterMediaState(id:$id,state:$state){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}',
        selector: conferenceAlterMediaStateSelector
    },
    conferenceRemoveScreenShare: {
        kind: 'mutation',
        name: 'conferenceRemoveScreenShare',
        body: 'mutation conferenceRemoveScreenShare($id:ID!){conferenceRemoveScreenShare(id:$id){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}',
        selector: conferenceRemoveScreenShareSelector
    },
    conferenceRequestLocalMediaChange: {
        kind: 'mutation',
        name: 'conferenceRequestLocalMediaChange',
        body: 'mutation conferenceRequestLocalMediaChange($id:ID!,$media:LocalMediaInput!){conferenceRequestLocalMediaChange(id:$id,media:$media){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}',
        selector: conferenceRequestLocalMediaChangeSelector
    },
    ActiveVoiceChatsEvents: {
        kind: 'subscription',
        name: 'ActiveVoiceChatsEvents',
        body: 'subscription ActiveVoiceChatsEvents{activeVoiceChatsEvents{__typename ... on VoiceChatUpdatedEvent{__typename chat{__typename ...VoiceChatWithSpeakers}}}}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership kind isChannel shortname}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followedByMe followersCount}status handRaised}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: ActiveVoiceChatsEventsSelector
    },
    BlackListUpdates: {
        kind: 'subscription',
        name: 'BlackListUpdates',
        body: 'subscription BlackListUpdates($fromState:String!){blackListUpdates(fromState:$fromState){__typename state updates{__typename ... on BlackListAdded{__typename bannedBy{__typename ...UserShort}bannedUser{__typename ...UserShort}}... on BlackListRemoved{__typename bannedBy{__typename ...UserShort}bannedUser{__typename ...UserShort}}}}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: BlackListUpdatesSelector
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
        body: 'subscription ChatWatch($chatId:ID!,$state:String){event:chatUpdates(chatId:$chatId,fromState:$state){__typename ... on ChatUpdateSingle{__typename seq state update{__typename ...ChatUpdateFragment}}... on ChatUpdateBatch{__typename fromSeq seq state updates{__typename ...ChatUpdateFragment}}}}fragment ChatUpdateFragment on ChatUpdate{__typename ... on ChatMessageReceived{__typename message{__typename ...FullMessage}repeatKey}... on ChatMessageUpdated{__typename message{__typename ...FullMessage}}... on ChatMessageDeleted{__typename message{__typename id}}... on ChatUpdated{__typename chat{__typename ...RoomShort}}... on ChatLostAccess{__typename lostAccess}}fragment FullMessage on ModernMessage{__typename id seq date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort isYou inContacts isBanned isMeBanned}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind title membership isChannel role canEdit canSendMessage photo membersCount shortname featuredMembersCount socialImage activeVoiceChat{__typename ...VoiceChatWithSpeakers}featured welcomeMessage{__typename isOn sender{__typename id name}message}organization{__typename ...OrganizationSmall private:alphaIsPrivate isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}canUnpinMessage pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}settings{__typename id mute}description previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName isYou}serviceMessageSettings{__typename joinsMessageEnabled leavesMessageEnabled}callSettings{__typename mode callLink}repliesEnabled}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}fragment VoiceChatWithSpeakers on VoiceChat{__typename ...VoiceChatEntity speakers{__typename ...VoiceChatParticipant}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership kind isChannel shortname}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followedByMe followersCount}status handRaised}fragment OrganizationSmall on Organization{__typename id name photo about shortname isCommunity:alphaIsCommunity featured:alphaFeatured}',
        selector: ChatWatchSelector
    },
    CommentWatch: {
        kind: 'subscription',
        name: 'CommentWatch',
        body: 'subscription CommentWatch($peerId:ID!,$fromState:String){event:commentUpdates(peerId:$peerId,fromState:$fromState){__typename ... on CommentUpdateSingle{__typename seq state update{__typename ...CommentUpdateFragment}}... on CommentUpdateBatch{__typename fromSeq seq state updates{__typename ...CommentUpdateFragment}}}}fragment CommentUpdateFragment on CommentUpdate{__typename ... on CommentReceived{__typename comment{__typename ...CommentEntryFragment}}... on CommentUpdated{__typename comment{__typename ...CommentEntryFragment}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage}parentComment{__typename id comment:betaComment{__typename id message}}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id seq date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}',
        selector: CommentWatchSelector
    },
    ConferenceMediaWatch: {
        kind: 'subscription',
        name: 'ConferenceMediaWatch',
        body: 'subscription ConferenceMediaWatch($id:ID!,$peerId:ID!){media:alphaConferenceMediaWatch(id:$id,peerId:$peerId){__typename id streams{__typename ...MediaStreamFull}localMedia{__typename sendVideo sendAudio sendScreencast}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource mid}senders{__typename kind videoSource codecParams mid}}',
        selector: ConferenceMediaWatchSelector
    },
    ConferenceWatch: {
        kind: 'subscription',
        name: 'ConferenceWatch',
        body: 'subscription ConferenceWatch($id:ID!){alphaConferenceWatch(id:$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename id startTime peers{__typename id user{__typename ...UserSmall}mediaState{__typename audioPaused videoPaused screencastEnabled}}iceServers{__typename urls username credential}parent{__typename ... on SharedRoom{__typename id title isChannel membersCount photo owner{__typename id name}}... on PrivateRoom{__typename id user{__typename id name photo}}... on VoiceChat{__typename id}}}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: ConferenceWatchSelector
    },
    DialogsWatch: {
        kind: 'subscription',
        name: 'DialogsWatch',
        body: 'subscription DialogsWatch($state:String){event:dialogsUpdates(fromState:$state){__typename ... on DialogUpdateSingle{__typename state update{__typename ...DialogUpdateFragment}}... on DialogUpdateBatch{__typename state updates{__typename ...DialogUpdateFragment}}}}fragment DialogUpdateFragment on DialogUpdate{__typename ... on DialogMessageReceived{__typename cid unread globalUnread message:alphaMessage{__typename ...DialogMessage ... on ServiceMessage{__typename id serviceMetadata{__typename}}}haveMention silent{__typename mobile desktop}showNotification{__typename mobile desktop}membership}... on DialogMessageUpdated{__typename cid message:alphaMessage{__typename ...DialogMessage}haveMention}... on DialogMessageDeleted{__typename cid message:alphaMessage{__typename ...DialogMessage}prevMessage:alphaPrevMessage{__typename ...DialogMessage}unread globalUnread haveMention}... on DialogMessageRead{__typename cid mid unread globalUnread haveMention}... on DialogMuteChanged{__typename cid mute}... on DialogPeerUpdated{__typename cid peer{__typename ... on PrivateRoom{__typename id user{__typename id name photo}}... on SharedRoom{__typename id title photo kind featured}}}... on DialogDeleted{__typename cid globalUnread}... on DialogBump{__typename cid globalUnread unread topMessage{__typename ...DialogMessage ... on ServiceMessage{__typename id serviceMetadata{__typename}}}haveMention membership}... on DialogCallStateChanged{__typename cid hasActiveCall}... on DialogVoiceChatStateChanged{__typename cid hasActiveVoiceChat}}fragment DialogMessage on ModernMessage{__typename id date sender{__typename id name photo firstName}message fallback ... on GeneralMessage{__typename id quotedMessages{__typename id}}}',
        selector: DialogsWatchSelector
    },
    MyContactsUpdates: {
        kind: 'subscription',
        name: 'MyContactsUpdates',
        body: 'subscription MyContactsUpdates($state:String!){myContactsUpdates(fromState:$state){__typename updates{__typename ... on ContactRemoved{__typename contact{__typename id user{__typename ...UserShort}}}... on ContactAdded{__typename contact{__typename id user{__typename ...UserShort}}}}state}}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: MyContactsUpdatesSelector
    },
    MyNotificationsCenter: {
        kind: 'subscription',
        name: 'MyNotificationsCenter',
        body: 'subscription MyNotificationsCenter($state:String){event:notificationCenterUpdates(fromState:$state){__typename ... on NotificationCenterUpdateSingle{__typename seq state update{__typename ...NotificationCenterUpdateFragment}}... on NotificationCenterUpdateBatch{__typename fromSeq seq state updates{__typename ...NotificationCenterUpdateFragment}}}}fragment NotificationCenterUpdateFragment on NotificationCenterUpdate{__typename ... on NotificationReceived{__typename center{__typename id unread}notification{__typename ...NotificationFragment}}... on NotificationUpdated{__typename center{__typename id unread}notification{__typename ...NotificationFragment}}... on NotificationDeleted{__typename center{__typename id unread}notification{__typename id}}... on NotificationRead{__typename center{__typename id unread}}... on NotificationContentUpdated{__typename content{__typename ... on UpdatedNotificationContentComment{__typename peer{__typename peerRoot{__typename ... on CommentPeerRootMessage{__typename message{__typename ... on GeneralMessage{__typename id fallback message sender{__typename id name}senderBadge{__typename ...UserBadge}}}chat{__typename ...RoomNano}}... on CommentPeerRootPost{__typename post{__typename id}}}id subscription{__typename type}}comment{__typename ...CommentEntryFragment}}}}}fragment NotificationFragment on Notification{__typename id text content{__typename ... on NewCommentNotification{__typename comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{__typename message{__typename ... on GeneralMessage{__typename id fallback message sender{__typename id name}senderBadge{__typename ...UserBadge}}}chat{__typename ...RoomNano}}... on CommentPeerRootPost{__typename post{__typename id}}}subscription{__typename type}}}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage}parentComment{__typename id comment:betaComment{__typename id message}}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id seq date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename id kind isChannel isPremium title photo membersCount featured settings{__typename id mute}}}',
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
        body: 'subscription SettingsWatch{watchSettings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id version primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone whoCanAddToGroups communityAdminsCanSeeContactInfo desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}channels{__typename showNotification sound}notificationPreview}',
        selector: SettingsWatchSelector
    },
    StickersWatch: {
        kind: 'subscription',
        name: 'StickersWatch',
        body: 'subscription StickersWatch{event:myStickersUpdates{__typename ...MyStickersFragment}}fragment MyStickersFragment on UserStickers{__typename unviewedCount packs{__typename id title stickers{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}',
        selector: StickersWatchSelector
    },
    TypingsWatch: {
        kind: 'subscription',
        name: 'TypingsWatch',
        body: 'subscription TypingsWatch{typings{__typename conversation:chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}user{__typename id photo firstName}cancel type}}',
        selector: TypingsWatchSelector
    },
    VoiceChatEvents: {
        kind: 'subscription',
        name: 'VoiceChatEvents',
        body: 'subscription VoiceChatEvents($id:ID!,$fromState:String!){voiceChatEvents(fromState:$fromState,id:$id){__typename state events{__typename ... on VoiceChatParticipantUpdatedEvent{__typename chat{__typename ...VoiceChatEntity}participant{__typename ...VoiceChatParticipant}}... on VoiceChatUpdatedEvent{__typename chat{__typename ...VoiceChatEntity}}}}}fragment VoiceChatEntity on VoiceChat{__typename id title active adminsCount speakersCount listenersCount parentRoom{__typename id title photo membership kind isChannel shortname}pinnedMessage{__typename id message spans{__typename ...MessageSpan}}me{__typename ...VoiceChatParticipant}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment VoiceChatParticipant on VoiceChatParticipant{__typename id user{__typename ...UserSmall followedByMe followersCount}status handRaised}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: VoiceChatEventsSelector
    },
    WalletUpdates: {
        kind: 'subscription',
        name: 'WalletUpdates',
        body: 'subscription WalletUpdates($state:String!){event:walletUpdates(fromState:$state){__typename ... on WalletUpdateSingle{__typename state update{__typename ...WalletUpdateFragment}}... on WalletUpdateBatch{__typename state updates{__typename ...WalletUpdateFragment}}}}fragment WalletUpdateFragment on WalletUpdate{__typename ... on WalletUpdateBalance{__typename amount}... on WalletUpdateLocked{__typename isLocked failingPaymentsCount}... on WalletUpdateTransactionSuccess{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdateTransactionCanceled{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdateTransactionPending{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdatePaymentStatus{__typename payment{__typename ...Payment}}}fragment WalletTransactionFragment on WalletTransaction{__typename id status date operation{__typename ... on WalletTransactionDeposit{__typename amount payment{__typename ...Payment}}... on WalletTransactionIncome{__typename amount payment{__typename ...Payment}source{__typename ... on WalletSubscription{__typename id product{__typename ...WalletProduct}}... on Purchase{__typename id user{__typename ...WalletUser}product{__typename ...WalletProduct}}}}... on WalletTransactionTransferIn{__typename amount payment{__typename ...Payment}fromUser{__typename ...UserShort}}... on WalletTransactionTransferOut{__typename amount walletAmount chargeAmount payment{__typename ...Payment}toUser{__typename ...UserShort}}... on WalletTransactionSubscription{__typename amount walletAmount chargeAmount subscription{__typename id interval amount product{__typename ...WalletProduct}}payment{__typename ...Payment}}... on WalletTransactionPurchase{__typename amount walletAmount chargeAmount purchase{__typename id product{__typename ...WalletProduct}}payment{__typename ...Payment}}}}fragment Payment on Payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}fragment WalletProduct on WalletProduct{__typename ... on WalletProductGroup{__typename group{__typename ...WalletGroup}}... on WalletProductDonation{__typename user{__typename ...WalletUser}}... on WalletProductDonationMessage{__typename user{__typename ...WalletUser}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename ...WalletUser}chat{__typename ... on SharedRoom{__typename id title}}}}fragment WalletGroup on SharedRoom{__typename id title photo}fragment WalletUser on User{__typename id name photo}fragment UserShort on User{__typename ...UserSmall online lastSeen}fragment UserSmall on User{__typename id name firstName photo shortname isBot}',
        selector: WalletUpdatesSelector
    },
    WatchUpdates: {
        kind: 'subscription',
        name: 'WatchUpdates',
        body: 'subscription WatchUpdates{watchUpdates{__typename ... on UpdateSubscriptionStarted{__typename seq state}... on UpdateSubscriptionEvent{__typename seq pts state sequence{__typename id}event{__typename ...ShortUpdate}}}}fragment ShortUpdate on UpdateEvent{__typename ... on UpdateMyProfileChanged{__typename user{__typename id firstName lastName}}... on UpdateChatDraftChanged{__typename cid draft version date}... on UpdateSettingsChanged{__typename settings{__typename ...SettingsFull}}... on UpdateChatMessage{__typename cid message{__typename ...UpdateMessage}}... on UpdateChatMessageDeleted{__typename cid mid seq}... on UpdateChatRead{__typename cid seq}... on UpdateRoomChanged{__typename room{__typename ...UpdateRoom}}}fragment SettingsFull on Settings{__typename id version primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone whoCanAddToGroups communityAdminsCanSeeContactInfo desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}channels{__typename showNotification sound}notificationPreview}fragment UpdateMessage on ModernMessage{__typename id seq date sender{__typename id}message fallback spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited isMentioned commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id isMentioned serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview previewFileId previewFileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}videoMetadata{__typename duration}}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text featuredIcon icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment MessageSender on User{__typename id name photo isBot shortname}fragment UserBadge on UserBadge{__typename id name verified}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment UpdateRoom on Room{__typename ... on PrivateRoom{__typename id hasActiveCall user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename id kind isChannel isPremium title photo membersCount featured hasActiveCall hasActiveVoiceChat settings{__typename id mute}}}',
        selector: WatchUpdatesSelector
    },
};
export const Definitions: AllDefinitions = { operations: Operations };