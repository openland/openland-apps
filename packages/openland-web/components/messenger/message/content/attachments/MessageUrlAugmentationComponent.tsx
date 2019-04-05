import * as React from 'react';
import { css, cx } from 'linaria';
import Glamorous from 'glamorous';
import { preprocessText } from 'openland-web/utils/TextProcessor';
import SiteIcon from 'openland-icons/website-2.svg';
import {
    FullMessage_GeneralMessage_attachments_MessageRichAttachment,
    FullMessage_GeneralMessage_attachments_MessageRichAttachment_keyboard,
} from 'openland-api/Types';
import { layoutMediaReverse } from 'openland-web/utils/MediaLayout';
import { XCloudImage } from 'openland-x/XCloudImage';
import { isInternalLink } from 'openland-web/utils/isInternalLink';
import { makeInternalLinkRelative } from 'openland-web/utils/makeInternalLinkRelative';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { emoji } from 'openland-y-utils/emoji';
import { XView } from 'react-mental';
import { XLinkExternal } from 'openland-x/XLinkExternal';
import { XAvatar2 } from 'openland-x/XAvatar2';
import DeleteIcon from 'openland-icons/ic-close.svg';
import { makeNavigable, NavigableChildProps } from 'openland-x/Navigable';
import { XHorizontal } from 'openland-x-layout/XHorizontal';

const LinkContentWrapperClassName = css`
    width: 100%;
    background-color: #f7f7f7;
    border-radius: 10px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    position: relative;
    & .delete-button {
        opacity: 0;
    }
    &:hover .delete-button {
        opacity: 1;
    }
`;

const SplitTextClassName = css`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    -webkit-box-orient: vertical;
    max-height: 40px;
`;

const SplitTitleClassName = css`
    -webkit-line-clamp: 1;
    max-height: 20px;
`;

const DeleteButton = makeNavigable(
    Glamorous.div<NavigableChildProps>(props => ({
        position: 'absolute',
        right: 12,
        top: 12,
        width: 20,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        '& svg': {
            width: 15,
            height: 15,
        },
        '& svg > path': {
            fill: 'rgba(0, 0, 0, 0.3)',
        },
        '&:hover svg > path': {
            fill: 'rgba(0, 0, 0, 0.7)',
        },
    })),
);

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

interface KeyboardItemProps {
    title: string;
    path: string | undefined;
    href: string | undefined;
    key?: string;
}

const KeyboardItem = ({ title, path, href, key }: KeyboardItemProps) => {
    return (
        <XView
            as="a"
            key={key}
            href={href}
            path={path}
            target="_blank"
            flexGrow={1}
            backgroundColor="#F7F7F7"
            hoverBackgroundColor="#E8F4FF"
            selectedBackgroundColor="#EDEDED"
            borderRadius={10}
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            color="#1790ff"
            fontSize={14}
            fontWeight={'600'}
            height={41}
            marginTop={8}
            hoverTextDecoration="none"
        >
            {title}
        </XView>
    );
};

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
                        <XHorizontal key={i + ''} alignSelf="stretch" separator={4}>
                            {!!line &&
                                line.map((button, j) => {
                                    let href: string | undefined = button.url || undefined;
                                    let path: string | undefined = undefined;

                                    if (isInternalLink(href || '')) {
                                        path = makeInternalLinkRelative(href || '');
                                        href = undefined;
                                    }

                                    return (
                                        <KeyboardItem
                                            key={'button-' + i + '-' + j}
                                            href={href}
                                            path={path}
                                            title={button.title}
                                        />
                                    );
                                })}
                        </XHorizontal>
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
                maxWidth={696}
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
                            <img width={40} height={40} src="/static/img/img-thn@3x.png" />
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

const JoinChannelCard = ({
    card,
    keyboard,
}: {
    card: CardT;
    keyboard?: FullMessage_GeneralMessage_attachments_MessageRichAttachment_keyboard | null;
}) => {
    return (
        <XView marginTop={12} maxWidth={696}>
            <Card {...card} />
            {keyboard && <Keyboard keyboard={keyboard} />}
        </XView>
    );
};

const ImageClassName = css`
    display: block;
    flex-shrink: 0;
`;

const DomainNameClassName = css`
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
`;

interface MessageUrlAugmentationComponentInnerProps extends MessageUrlAugmentationComponentProps {
    isMobile: boolean;
}

const MessageUrlAugmentationComponentInner = React.memo(
    (props: MessageUrlAugmentationComponentInnerProps) => {
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

        let internalLink = isInternalLink(href || '');

        if (internalLink) {
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
                <JoinChannelCard
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

        let openlandLink: boolean = !!internalLink;
        let objectId = '';

        if (titleLink && titleLink.match('openland.com')) {
            if (titleLink.match('/u/')) {
                objectId = titleLink.substring(titleLink.search('/u/') + 3, titleLink.length);
            } else if (titleLink.match('/o/')) {
                objectId = titleLink.substring(titleLink.search('/o/') + 3, titleLink.length);
            } else if (titleLink.match('/c/')) {
                objectId = titleLink.substring(titleLink.search('/c/') + 3, titleLink.length);
            }
        }

        if (text && text.match('Openland is a professional messenger designed')) {
            openlandLink = false;
        }

        return (
            <XView width="100%" flexDirection="column" maxWidth={696}>
                <div className={LinkContentWrapperClassName}>
                    <XView flexDirection="row">
                        {image &&
                            dimensions &&
                            !openlandLink && (
                                <XView
                                    marginRight={20}
                                    flexDirection="row"
                                    alignItems="flex-start"
                                    maxWidth="60%"
                                >
                                    <XView
                                        flexDirection="row"
                                        justifyContent="center"
                                        borderRadius={4}
                                        overflow="hidden"
                                        alignSelf="flex-start"
                                        maxWidth="100%"
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
                            openlandLink && (
                                <XView marginRight={12} flexShrink={0}>
                                    {image.url ? (
                                        <XAvatar2
                                            id={objectId}
                                            title={title || ''}
                                            src={image.url}
                                        />
                                    ) : (
                                        <img
                                            width={40}
                                            height={40}
                                            src="/static/img/img-thn@3x.png"
                                        />
                                    )}
                                </XView>
                            )}
                        {!image &&
                            openlandLink && (
                                <XView marginRight={12} flexShrink={0}>
                                    <XAvatar2 id={objectId} title={title || ''} />
                                </XView>
                            )}
                        {(title || titleLinkHostname || subTitle || parts) && (
                            <XView flexDirection="column" flexGrow={1} flexShrink={1}>
                                {titleLinkHostname &&
                                    !keyboard && (
                                        <XView
                                            fontSize={13}
                                            fontWeight="600"
                                            color="rgba(0, 0, 0, 0.4)"
                                            flexDirection="row"
                                            alignItems="center"
                                            marginBottom={4}
                                        >
                                            {icon && <img src={icon.url} className={Favicon} />}
                                            {!icon && (
                                                <XView
                                                    flexShrink={0}
                                                    marginTop={-1}
                                                    marginRight={5}
                                                    marginBottom={-1}
                                                >
                                                    <SiteIcon />
                                                </XView>
                                            )}
                                            <span className={DomainNameClassName}>
                                                {titleLinkHostname}
                                            </span>
                                        </XView>
                                    )}
                                {title &&
                                    keyboard && (
                                        <XView fontSize={16} fontWeight="600">
                                            <span
                                                className={cx(
                                                    SplitTextClassName,
                                                    SplitTitleClassName,
                                                )}
                                            >
                                                {emoji({
                                                    src: title,
                                                    size: 18,
                                                })}
                                            </span>
                                        </XView>
                                    )}
                                {title &&
                                    !keyboard && (
                                        <XView
                                            as="a"
                                            href={href}
                                            path={path}
                                            target="_blank"
                                            fontSize={16}
                                            fontWeight="600"
                                            color="#000"
                                            hoverColor="#1790ff"
                                            hoverTextDecoration="none"
                                        >
                                            <span
                                                className={cx(
                                                    SplitTextClassName,
                                                    SplitTitleClassName,
                                                )}
                                            >
                                                {emoji({
                                                    src: title,
                                                    size: 18,
                                                })}
                                            </span>
                                        </XView>
                                    )}
                                {subTitle && (
                                    <XView
                                        fontSize={13}
                                        fontWeight="600"
                                        color="rgba(0, 0, 0, 0.4)"
                                        flexDirection="row"
                                        alignItems="center"
                                        marginTop={4}
                                    >
                                        <span>{subTitle}</span>
                                    </XView>
                                )}
                                {parts.length > 0 &&
                                    !openlandLink && (
                                        <XView
                                            flexShrink={1}
                                            fontSize={14}
                                            color="#121e2b"
                                            opacity={0.9}
                                            marginTop={4}
                                        >
                                            <span className={SplitTextClassName}>{parts}</span>
                                        </XView>
                                    )}
                            </XView>
                        )}
                    </XView>
                    {parts.length > 0 &&
                        openlandLink && (
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
                    {isMe &&
                        !openlandLink && (
                            <DeleteButton
                                query={{
                                    field: 'deleteUrlAugmentation',
                                    value: messageId,
                                }}
                                className="delete-button"
                            >
                                <DeleteIcon />
                            </DeleteButton>
                        )}
                </div>
                {keyboard && <Keyboard keyboard={keyboard} />}
            </XView>
        );
    },
);

export const MessageUrlAugmentationComponent = React.memo(
    (props: MessageUrlAugmentationComponentProps) => {
        const isMobile = React.useContext(IsMobileContext);

        return <MessageUrlAugmentationComponentInner {...props} isMobile={isMobile} />;
    },
);
