import * as React from 'react';
import { css } from 'linaria';
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
            width="100%"
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
                        <XView key={i + ''} flexDirection="row" maxWidth={696} alignSelf="stretch">
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

                                    // return (
                                    //     <XView
                                    //         as="a"
                                    //         key={'button-' + i + '-' + j}
                                    //         backgroundColor="rgba(244, 244, 244, 0.7)"
                                    //         borderRadius={10}
                                    //         alignItems="center"
                                    //         justifyContent="center"
                                    //         height={41}
                                    //         flexGrow={1}
                                    //         cursor="pointer"
                                    //         target="_blank"
                                    //         href={href}
                                    //         path={path}
                                    //         hoverTextDecoration="none"
                                    //     >
                                    //         <XView
                                    //             flexDirection="column"
                                    //             justifyContent="center"
                                    //             color={'#1790ff'}
                                    //             fontSize={14}
                                    //             fontWeight={'600'}
                                    //         >
                                    //             {button.title}
                                    //         </XView>
                                    //     </XView>
                                    // );
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
    flex-shrink: 0;
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

        // console.log(props);

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
            <XView width="100%" flexDirection="column" maxWidth={696}>
                <XView
                    width="100%"
                    backgroundColor="#F7F7F7"
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
                            (isUserLink || isOrgLink) && (
                                <XView marginRight={12} flexShrink={0}>
                                    {image.url ? (
                                        <XAvatar2
                                            id={objectId}
                                            title={title || ''}
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
                        {(title || titleLinkHostname || subTitle || parts) && (
                            <XView flexDirection="column" flexGrow={1} flexShrink={1}>
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
                                                    <SiteIcon />
                                                </XView>
                                            )}
                                            <span className={DomainNameClassName}>
                                                {titleLinkHostname}
                                            </span>
                                        </XView>
                                    )}
                                {title && (
                                    <XView fontSize={16} fontWeight="600" marginTop={4}>
                                        {emoji({
                                            src: title,
                                            size: 18,
                                        })}
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
                                {parts &&
                                    !isOrgLink &&
                                    !isOrgLink && (
                                        <XView
                                            flexShrink={1}
                                            fontSize={14}
                                            color="#121e2b"
                                            opacity={0.9}
                                            marginTop={4}
                                        >
                                            {parts}
                                        </XView>
                                    )}
                            </XView>
                        )}
                    </XView>
                    {parts &&
                        (isOrgLink || isOrgLink) && (
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
                    !hideButton &&
                    !isUserLink &&
                    !isOrgLink && <KeyboardItem href={href} path={path} title="Open link" />}
                {!keyboard &&
                    !hideButton &&
                    isUserLink && (
                        <XView flexDirection="row" justifyContent="space-between">
                            <XView width="calc(50% - 4px)">
                                <KeyboardItem
                                    href={href}
                                    path={`/mail/${objectId}`}
                                    title="Message"
                                />
                            </XView>
                            <XView width="calc(50% - 4px)">
                                <KeyboardItem
                                    href={href}
                                    path={`/mail/u/${objectId}`}
                                    title="View profile"
                                />
                            </XView>
                        </XView>
                    )}
                {keyboard && !hideButton && <Keyboard keyboard={keyboard} />}
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
