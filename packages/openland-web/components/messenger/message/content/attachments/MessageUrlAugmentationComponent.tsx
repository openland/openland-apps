import * as React from 'react';
import Glamorous from 'glamorous';
import { preprocessText } from '../../../../../utils/TextProcessor';
import { XLinkExternal } from 'openland-x/XLinkExternal';
import { XLink } from 'openland-x/XLink';
import WebsiteIcon from 'openland-icons/website-2.svg';
import {
    FullMessage_GeneralMessage_attachments_MessageRichAttachment,
    FullMessage_GeneralMessage_attachments_MessageRichAttachment_keyboard,
} from 'openland-api/Types';
import { layoutMediaReverse } from '../../../../../utils/MediaLayout';
import { XCloudImage } from 'openland-x/XCloudImage';
import DeleteIcon from 'openland-icons/ic-close.svg';
import { makeNavigable, NavigableChildProps } from 'openland-x/Navigable';
import { isInternalLink } from 'openland-web/utils/isInternalLink';
import { makeInternalLinkRelative } from 'openland-web/utils/makeInternalLinkRelative';
import { MobileSidebarContext } from 'openland-web/components/Scaffold/MobileSidebarContext';
import { emoji } from 'openland-y-utils/emoji';
import { XView } from 'react-mental';
import { XAvatar } from 'openland-x/XAvatar';
import ImgThn from 'openland-icons/img-thn.svg';

const Container = Glamorous(XLink)<{ isMobile: boolean }>(props => ({
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    marginTop: '10px !important',
    border: '1px solid #edeef3',
    background: '#ffffff',
    borderRadius: 10,
    padding: '9px 16px 12px',
    color: '#121e2b !important',
    width: '100%',
    '& .delete-button': {
        opacity: props.isMobile ? 1 : 0,
    },
    '&:hover .delete-button': {
        opacity: 1,
    },
}));

const DeleteButton = makeNavigable(
    Glamorous.div<NavigableChildProps>(props => ({
        position: 'absolute',
        right: 0,
        top: 0,
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        background: '#ffffff',
        '& > svg > path': {
            fill: 'rgba(0, 0, 0, 0.3)',
        },
        '&:hover & > svg > path': {
            fill: 'rgba(0, 0, 0, 0.4)',
        },
    })),
);

const ContentWrapper = Glamorous.div({
    flex: 1,
    paddingRight: 15,
    overflow: 'hidden',
});

const Hostname = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    height: 20,
    '& svg': {
        marginRight: 7,
        width: 12,
        height: 12,
        '& path': {
            opacity: 0.5,
            fill: '#334562',
        },
    },
    '& span': {
        opacity: 0.5,
        fontSize: 12,
        fontWeight: 600,
        lineHeight: '20px',
        letterSpacing: 0,
        color: '#334562',
    },
});

const Favicon = Glamorous.img({
    width: 14,
    height: 14,
    margin: '-1px 5px -1px 0',
    overflow: 'hidden',
    display: 'block',
});

const Title = Glamorous.div({
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: 0,
    color: '#1790ff',
    marginTop: 7,
    overflow: 'hidden',
    height: 20,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&:first-child': {
        marginTop: 0,
    },
});

const Description = Glamorous.div({
    opacity: 0.9,
    fontSize: 14,
    lineHeight: '21px',
    letterSpacing: 0,
    color: '#121e2b',
    marginTop: 3,
    maxHeight: 42,
    display: 'block',
    overflow: 'hidden',
    '&:first-child': {
        marginTop: 0,
    },
    // Webkit line clamp
    '&': {
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
});

const ImageWrapper = Glamorous.div({
    margin: '1px -6px -2px 0',
    borderRadius: 5,
    overflow: 'hidden',
    '& img': {
        display: 'block',
    },
});

interface MessageUrlAugmentationComponentProps
    extends FullMessage_GeneralMessage_attachments_MessageRichAttachment {
    messageId: string;
    isMe: boolean;
}

const InternalUrlCardContainer = Glamorous(XLink)<{ isMobile: boolean }>(props => ({
    marginTop: '10px !important',
    '& .delete-button': {
        opacity: props.isMobile ? 1 : 0,
    },
    '&:hover .delete-button': {
        opacity: 1,
    },
}));

type InternalUrlCardInnerProps = {
    id: string;
    name: string;
    photo: string | null;
    organization?: string | null;
    description?: string | null;
    isMe: boolean;
    messageId: string;
    href?: string;
    path?: string;
};

const InternalUrlCardInner = React.memo(
    ({
        isMobile,
        id,
        name,
        photo,
        organization,
        description,
        isMe,
        messageId,
        href,
        path,
    }: InternalUrlCardInnerProps & { isMobile: boolean }) => {
        return (
            <InternalUrlCardContainer
                isMobile={isMobile}
                href={href}
                path={path}
                onClick={(e: any) => e.stopPropagation()}
            >
                <XView
                    borderRadius={10}
                    backgroundColor={'#fcfcfc'}
                    flexDirection="row"
                    paddingTop={12}
                    paddingBottom={12}
                    paddingLeft={16}
                    paddingRight={20}
                    borderWidth={1}
                    borderColor={'#ececec'}
                >
                    <XView marginRight={14} justifyContent={'center'}>
                        <XAvatar
                            size="small"
                            style="colorus"
                            objectName={name}
                            objectId={id}
                            cloudImageUuid={photo}
                            path={'/mail/u/' + id}
                        />
                    </XView>
                    <XView flexShrink={1}>
                        <XView fontSize={14} fontWeight="600" color={'#000000'}>
                            {emoji({
                                src: name,
                                size: 16,
                            })}
                        </XView>
                        {organization && (
                            <XView fontSize={12} opacity={0.4} fontWeight="600" color={'#000000'}>
                                {organization}
                            </XView>
                        )}
                        {description && (
                            <XView fontSize={12} opacity={0.4} fontWeight="600" color={'#000000'}>
                                {description}
                            </XView>
                        )}
                    </XView>
                    {isMe && (
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
                </XView>
            </InternalUrlCardContainer>
        );
    },
);

const InternalUrlCard = (props: InternalUrlCardInnerProps) => {
    const { isMobile } = React.useContext(MobileSidebarContext);
    return <InternalUrlCardInner {...props} isMobile={isMobile} />;
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
                        <XView
                            key={i + ''}
                            flexDirection="row"
                            maxWidth={540}
                            marginTop={4}
                            alignSelf="stretch"
                            marginBottom={i === keyboard!.buttons.length - 1 ? 4 : 0}
                        >
                            {!!line &&
                                line.map((button, j) => (
                                    <XView
                                        as="a"
                                        marginTop={i !== 0 ? 4 : 0}
                                        key={'button-' + i + '-' + j}
                                        backgroundColor="rgba(244, 244, 244, 0.7)"
                                        borderRadius={10}
                                        marginLeft={j > 0 ? 4 : 0}
                                        marginRight={j < line.length - 1 ? 4 : 0}
                                        alignItems="center"
                                        justifyContent="center"
                                        height={41}
                                        flexGrow={1}
                                        hoverCursor="pointer"
                                        href={button.url}
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
                                ))}
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
                backgroundColor={'rgba(244, 244, 244, 0.7)'}
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
                        <XView fontSize={13} color={'rgba(0, 0, 0, 0.4)'}>
                            {subTitle}
                        </XView>
                    </XView>
                </XView>
                {description && (
                    <XView lineHeight={1.5} marginTop={8} color={'rgba(18, 30, 43, 0.9)'}>
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

        return (
            <Container
                isMobile={isMobile}
                href={href}
                path={path}
                onClick={(e: any) => e.stopPropagation()}
            >
                <ContentWrapper>
                    {titleLinkHostname && (
                        <Hostname>
                            {icon && <Favicon src={icon.url} />}
                            {!icon && <WebsiteIcon />}
                            <span>{titleLinkHostname}</span>
                        </Hostname>
                    )}
                    {title && (
                        <Title>
                            {emoji({
                                src: title,
                                size: 18,
                            })}
                        </Title>
                    )}
                    {parts && <Description>{parts}</Description>}
                </ContentWrapper>
                {image && dimensions && (
                    <ImageWrapper>
                        <XCloudImage
                            srcCloud={image.url}
                            resize="fill"
                            width={dimensions.width}
                            height={dimensions.height}
                        />
                    </ImageWrapper>
                )}
                {isMe && (
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
            </Container>
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
