import * as React from 'react';
import { css } from 'linaria';
import { preprocessText } from 'openland-web/utils/TextProcessor';
import WebsiteIcon from 'openland-icons/website-2.svg';
import {
    FullMessage_GeneralMessage_attachments_MessageRichAttachment,
    FullMessage_GeneralMessage_attachments_MessageRichAttachment_keyboard,
} from 'openland-api/Types';
import { layoutMediaReverse } from 'openland-web/utils/MediaLayout';
import { XCloudImage } from 'openland-x/XCloudImage';
import { isInternalLink } from 'openland-web/utils/isInternalLink';
import { makeInternalLinkRelative } from 'openland-web/utils/makeInternalLinkRelative';
import { MobileSidebarContext } from 'openland-web/components/Scaffold/MobileSidebarContext';
import { emoji } from 'openland-y-utils/emoji';
import { XView } from 'react-mental';
import ImgThn from 'openland-icons/img-thn.svg';
import { XLinkExternal } from 'openland-x/XLinkExternal';
import { XAvatar2 } from 'openland-x/XAvatar2';

const Favicon = css`
    width: 14px;
    height: 14px;
    margin: -1px 5px -1px 0;
    overflow: hidden;
    display: block;
    flex-shrink: 0;
`;

interface MessageUrlAugmentationComponentProps
    extends FullMessage_GeneralMessage_attachments_MessageRichAttachment {
    messageId: string;
    isMe: boolean;
}

const Keyboard = React.memo(
    ({
        keyboard,
    }: {
        keyboard?: FullMessage_GeneralMessage_attachments_MessageRichAttachment_keyboard | null;
    }) => {
        return (
            <>
                {!!keyboard &&
                    keyboard.buttons.map((line, i) => (
                        <XView key={i + ''} flexDirection="row" maxWidth={540} alignSelf="stretch">
                            {!!line &&
                                line.map((button, j) => {
                                    let href: string | undefined = button.url || undefined;
                                    let path: string | undefined = undefined;

                                    if (isInternalLink(href || '')) {
                                        path = makeInternalLinkRelative(href || '');
                                        href = undefined;
                                    }

                                    return (
                                        <XView
                                            as="a"
                                            key={'button-' + i + '-' + j}
                                            backgroundColor="rgba(244, 244, 244, 0.7)"
                                            borderRadius={10}
                                            alignItems="center"
                                            justifyContent="center"
                                            height={41}
                                            flexGrow={1}
                                            hoverCursor="pointer"
                                            target="_blank"
                                            href={href}
                                            path={path}
                                        >
                                            <XView
                                                flexDirection="column"
                                                justifyContent="center"
                                                color={'#1790ff'}
                                                fontSize={14}
                                                fontWeight={'600'}
                                            >
                                                {button.title}
                                            </XView>
                                        </XView>
                                    );
                                })}
                        </XView>
                    ))}
            </>
        );
    },
);

type CardT = {
    imageUrl?: string;
    title: string;
    subTitle: string;
    description?: string | null;
};

const Card = ({ imageUrl, title, subTitle, description }: CardT) => {
    return (
        <>
            <XView
                maxWidth={540}
                paddingTop={16}
                paddingBottom={16}
                paddingLeft={20}
                paddingRight={20}
                borderRadius={10}
                backgroundColor="rgba(244, 244, 244, 0.7)"
            >
                <XView flexDirection="row">
                    <XView marginRight={12}>
                        {imageUrl ? (
                            <XView
                                as="img"
                                width={40}
                                height={40}
                                borderRadius={20}
                                src={imageUrl}
                            />
                        ) : (
                            <ImgThn />
                        )}
                    </XView>
                    <XView flexDirection="column" justifyContent="space-between" height={40}>
                        <XView
                            fontWeight={'600'}
                            lineHeight={1.25}
                            fontSize={16}
                            color={'rgba(0, 0, 0)'}
                        >
                            {title}
                        </XView>
                        <XView fontWeight="600" fontSize={13} color="rgba(0, 0, 0, 0.4)">
                            {subTitle}
                        </XView>
                    </XView>
                </XView>
                {description && (
                    <XView lineHeight={1.5} marginTop={8} color="rgba(18, 30, 43, 0.9)">
                        {description}
                    </XView>
                )}
            </XView>
        </>
    );
};

const CardWithKeyboard = ({
    card,
    keyboard,
}: {
    card: CardT;
    keyboard?: FullMessage_GeneralMessage_attachments_MessageRichAttachment_keyboard | null;
}) => {
    return (
        <XView marginTop={12}>
            <Card {...card} />
            {keyboard && (
                <XView marginTop={8}>
                    <Keyboard keyboard={keyboard} />
                </XView>
            )}
        </XView>
    );
};

const ImageClassName = css`
    display: block;
`;

const DomainNameClassName = css`
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
`;

const MessageUrlAugmentationComponentInner = React.memo(
    (props: MessageUrlAugmentationComponentProps & { isMobile: boolean }) => {
        let {
            isMobile,
            subTitle,
            titleLink,
            titleLinkHostname,
            title,
            image,
            text,
            icon,
            isMe,
            messageId,
            keyboard,
        } = props;

        let href: string | undefined = props.titleLink || undefined;
        let path: string | undefined = undefined;

        if (isInternalLink(href || '')) {
            path = makeInternalLinkRelative(href || '');
            href = undefined;
        }

        const preprocessed = text ? preprocessText(text) : [];

        let parts = preprocessed.map((v, i) => {
            if (v.type === 'new_line') {
                return <br key={'br-' + i} />;
            } else if (v.type === 'link') {
                return (
                    <XLinkExternal
                        className="link"
                        key={'link-' + i}
                        href={v.link!!}
                        content={v.text!!}
                        showIcon={false}
                    />
                );
            } else {
                return (
                    <span key={'text-' + i}>
                        {emoji({
                            src: v.text!!,
                            size: 18,
                        })}
                    </span>
                );
            }
        });

        let dimensions = undefined;
        if (image && image.metadata && image.metadata.imageWidth && image.metadata.imageHeight) {
            dimensions = layoutMediaReverse(
                image.metadata.imageWidth,
                image.metadata.imageHeight,
                94,
                94,
            );
        }

        if (titleLink && titleLink.indexOf('joinChannel') !== -1) {
            return (
                <CardWithKeyboard
                    card={{
                        imageUrl: image ? image.url : undefined,
                        title: title!!,
                        subTitle: subTitle!!,
                        description: text,
                    }}
                    keyboard={keyboard}
                />
            );
        }

        let hideButton = false;
        let isUserLink = false;
        let isOrgLink = false;
        let objectId = '';

        if (titleLink && titleLink.match('openland.com')) {
            if (titleLink.match('/u/')) {
                isUserLink = true;
                objectId = titleLink.substring(titleLink.search('/u/') + 3, titleLink.length);
            }

            if (titleLink.match('/o/')) {
                isOrgLink = true;
                objectId = titleLink.substring(titleLink.search('/o/') + 3, titleLink.length);
            }
            if (titleLink.match('/mail/') && !isUserLink && !isOrgLink) {
                hideButton = true;
            }
        }

        return (
            <XView width="100%" flexDirection="column" maxWidth={540}>
                <XView
                    width="100%"
                    backgroundColor="rgba(244, 244, 244, 0.7)"
                    borderRadius={10}
                    paddingVertical={16}
                    paddingHorizontal={20}
                    flexDirection="column"
                    marginTop={10}
                >
                    <XView flexDirection="row">
                        {image &&
                            dimensions &&
                            !isOrgLink &&
                            !isUserLink && (
                                <XView marginRight={20} flexDirection="row" alignItems="flex-start">
                                    <XView
                                        borderRadius={4}
                                        overflow="hidden"
                                        alignSelf="flex-start"
                                    >
                                        <XCloudImage
                                            srcCloud={image.url}
                                            resize="fill"
                                            width={dimensions.width}
                                            height={dimensions.height}
                                            className={ImageClassName}
                                        />
                                    </XView>
                                </XView>
                            )}
                        {image &&
                            (isUserLink || isOrgLink) && (
                                <XView marginRight={12} flexShrink={0}>
                                    {image.url ? (
                                        <XView
                                            as="img"
                                            width={40}
                                            height={40}
                                            borderRadius={20}
                                            src={image.url}
                                        />
                                    ) : (
                                        <ImgThn />
                                    )}
                                </XView>
                            )}
                        {!image &&
                            (isUserLink || isOrgLink) && (
                                <XView marginRight={12} flexShrink={0}>
                                    <XAvatar2 id={objectId} title={title || ''} />
                                </XView>
                            )}
                        {(title || titleLinkHostname || subTitle) && (
                            <XView flexDirection="column" flexGrow={1} flexShrink={1}>
                                {title && (
                                    <XView fontSize={16} fontWeight="600" marginBottom={4}>
                                        {emoji({
                                            src: title,
                                            size: 18,
                                        })}
                                    </XView>
                                )}
                                {titleLinkHostname &&
                                    !isUserLink &&
                                    !isOrgLink && (
                                        <XView
                                            fontSize={13}
                                            fontWeight="600"
                                            color="rgba(0, 0, 0, 0.4)"
                                            flexDirection="row"
                                            alignItems="center"
                                        >
                                            {icon && <img src={icon.url} className={Favicon} />}
                                            {!icon && (
                                                <XView
                                                    flexShrink={0}
                                                    marginTop={-1}
                                                    marginRight={5}
                                                    marginBottom={-1}
                                                >
                                                    <WebsiteIcon />
                                                </XView>
                                            )}
                                            <span className={DomainNameClassName}>
                                                {titleLinkHostname}
                                            </span>
                                        </XView>
                                    )}
                                {subTitle &&
                                    isUserLink && (
                                        <XView
                                            fontSize={13}
                                            fontWeight="600"
                                            color="rgba(0, 0, 0, 0.4)"
                                            flexDirection="row"
                                            alignItems="center"
                                        >
                                            <span>{subTitle}</span>
                                        </XView>
                                    )}
                            </XView>
                        )}
                    </XView>
                    {parts &&
                        !isUserLink && (
                            <XView
                                flexShrink={1}
                                fontSize={14}
                                color="#121e2b"
                                opacity={0.9}
                                marginTop={8}
                            >
                                {parts}
                            </XView>
                        )}
                </XView>
                {!keyboard &&
                    !hideButton && (
                        <XView
                            width="100%"
                            backgroundColor="rgba(244, 244, 244, 0.7)"
                            borderRadius={10}
                            flexDirection="row"
                            justifyContent="center"
                            alignItems="center"
                            color={'#1790ff'}
                            fontSize={14}
                            fontWeight={'600'}
                            as="a"
                            href={href}
                            path={isUserLink ? `/mail/${objectId}` : path}
                            target="_blank"
                            height={41}
                            marginTop={8}
                        >
                            {isUserLink ? 'Message' : 'Open link'}
                        </XView>
                    )}
                {keyboard &&
                    !hideButton && (
                        <XView marginTop={8}>
                            <Keyboard keyboard={keyboard} />
                        </XView>
                    )}
            </XView>
        );
    },
);

export const MessageUrlAugmentationComponent = React.memo(
    (props: MessageUrlAugmentationComponentProps) => {
        const sidebarContext = React.useContext(MobileSidebarContext);

        const { isMobile } = sidebarContext;

        return <MessageUrlAugmentationComponentInner {...props} isMobile={isMobile} />;
    },
);
