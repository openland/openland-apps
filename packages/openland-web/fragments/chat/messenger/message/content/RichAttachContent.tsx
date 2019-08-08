import * as React from 'react';
import { css, cx } from 'linaria';
import { XViewRouterContext } from 'react-mental';
import { showModalBox } from 'openland-x/showModalBox';
import {
    FullMessage_GeneralMessage_attachments_MessageRichAttachment,
    FullMessage_GeneralMessage_attachments_MessageRichAttachment_keyboard,
} from 'openland-api/Types';
import { layoutMedia } from 'openland-web/utils/MediaLayout';
import { isInternalLink } from 'openland-web/utils/isInternalLink';
import { makeInternalLinkRelative } from 'openland-web/utils/makeInternalLinkRelative';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { TextCaption, TextTitle2, TextBody } from 'openland-web/utils/TextStyles';
import { resolveLinkAction } from 'openland-web/utils/resolveLinkAction';

type messageRichAttach = FullMessage_GeneralMessage_attachments_MessageRichAttachment;
type unicornKeyboard = FullMessage_GeneralMessage_attachments_MessageRichAttachment_keyboard;

const richWrapper = css`
    display: flex;
    flex-direction: row;
    flex-shrink: 1;
    max-width: 680px;
    background-color: #f0f2f5;
    border-radius: 8px;
    overflow: hidden;
`;

const richImageContainer = css`
    position: relative;
    overflow: hidden;
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    min-height: 100%;
    cursor: pointer;
    width: var(--image-width);
`;

const richImageStyle = css`
    position: absolute;
    left: 0;
    top: var(--image-top-position);
    object-fit: cover;
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%;
`;

const richContentContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 16px;
    padding-right: 16px;
`;

const siteIconContainer = css`
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 6px;
`;

const siteIconImageStyle = css`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
`;

const linkHostnameContainer = css`
    display: flex;
    align-items: center;
    color: #676d7a;
`;

const titleStyle = css`
    color: #171b1f;
    margin-top: 2px;
`;

const textStyle = css`
    color: #171b1f;
    margin-top: 2px;
`;

// internal styles

const internalWrapper = css`
    max-width: 480px;
    padding: 16px;
    align-items: center;
    justify-content: space-between;
`;

const internalContent = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 1;
`;

const internalImg = css`
    margin-right: 16px;
`;

const internalDataContent = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
`;

const keyboardContent = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: -8px;
`;

const UnicornBotButton = ({ keyboard }: { keyboard: unicornKeyboard }) => (
    <>
        {keyboard.buttons.map(i => {
            if (i) {
                return i.map(j => (
                    <UButton
                        key={j.id}
                        text={j.title}
                        marginTop={12}
                        marginBottom={4}
                        alignSelf="flex-start"
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            resolveLinkAction(j.url || '');
                        }}
                    />
                ));
            }
            return null;
        })}
    </>
);

const InternalComponent = ({ attach }: { attach: messageRichAttach }) => {
    if (!attach.title && !attach.subTitle && attach.keyboard) {
        return <UnicornBotButton keyboard={attach.keyboard} />;
    }

    let avatar = null;
    let keyboard = null;
    const router = React.useContext(XViewRouterContext);

    const keyboardAction = React.useCallback((e: React.MouseEvent, path: string | null) => {
        e.stopPropagation();
        if (router) {
            router.navigate(makeInternalLinkRelative(path || ''));
        }
    }, []);

    if (attach.image && attach.image.metadata) {
        avatar = (
            <div className={cx(richImageContainer, internalImg)}>
                <XAvatar2
                    size={56}
                    src={attach.image.url}
                    title={attach.title || ''}
                    id={attach.id}
                />
            </div>
        );
    }

    if (attach.keyboard && attach.keyboard.buttons) {
        keyboard = (
            <div className={keyboardContent}>
                {attach.keyboard.buttons.map(i => {
                    if (i) {
                        return i.map(j => (
                            <UButton
                                text={j.title}
                                marginTop={8}
                                key={j.id}
                                onClick={(e: React.MouseEvent) => keyboardAction(e, j.url)}
                            />
                        ));
                    }
                    return null;
                })}
            </div>
        );
    }
    return (
        <div className={cx(richWrapper, internalWrapper, 'message-rich-wrapper')}>
            <div className={internalContent}>
                {avatar}
                <div className={internalDataContent}>
                    {attach.title && (
                        <div className={cx(titleStyle, TextTitle2)}>{attach.title}</div>
                    )}
                    {attach.subTitle && (
                        <div className={cx(textStyle, TextBody)}>{attach.subTitle}</div>
                    )}
                </div>
            </div>
            {keyboard}
        </div>
    );
};

const modalImgContainer = css`
    background-color: #000;
    flex-shrink: 0;
    flex-grow: 1;
    display: flex;
    width: 100%;
    height: 100%;
`;

const modalImgStyle = css`
    flex-shrink: 0;
    object-fit: contain;
    width: 100%;
    max-height: 80vh;
`;

const showImageModal = (src: string, width: number, height: number) => {
    showModalBox({ width: 600 }, () => (
        <div className={modalImgContainer}>
            <img src={src} className={modalImgStyle} width={width} height={height} />
        </div>
    ));
};

export const RichAttachContent = ({ attach }: { attach: messageRichAttach }) => {
    if (!attach.title && !attach.titleLink && !attach.subTitle && !attach.keyboard) {
        return null;
    }

    if (isInternalLink(attach.titleLink || '') || attach.keyboard) {
        return <InternalComponent attach={attach} />;
    }
    let img = null;
    let siteIcon = null;
    const text = attach.text && attach.text.length > 150 ? attach.text.slice(0, 130) + '...' : null;
    if (attach.image && attach.image.metadata) {
        let layout = layoutMedia(
            attach.image.metadata.imageWidth || 0,
            attach.image.metadata.imageHeight || 0,
            300,
            200,
            24,
            24,
        );
        img = (
            <div
                className={richImageContainer}
                style={{ '--image-width': `${layout.width}px` } as React.CSSProperties}
                onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    showImageModal(attach.image!!.url, layout.width * 2, layout.height * 2);
                }}
            >
                <img
                    className={richImageStyle}
                    width={layout.width}
                    height={layout.height}
                    src={attach.image.url}
                    style={
                        {
                            '--image-top-position': `calc(50% - ${layout.height / 2})`,
                        } as React.CSSProperties
                    }
                />
            </div>
        );
    }
    if (attach.icon && attach.icon.url) {
        siteIcon = (
            <div className={siteIconContainer}>
                <img className={siteIconImageStyle} src={attach.icon.url} />
            </div>
        );
    }
    return (
        <div className={cx(richWrapper, 'message-rich-wrapper')}>
            {img}
            <div className={richContentContainer}>
                {(siteIcon || attach.titleLinkHostname) && (
                    <div className={cx(linkHostnameContainer, TextCaption)}>
                        {siteIcon}
                        <span>{attach.titleLinkHostname}</span>
                    </div>
                )}
                {attach.title && (
                    <div className={cx(titleStyle, TextTitle2)}>
                        <span>{attach.title}</span>
                    </div>
                )}
                {text && (
                    <div className={cx(textStyle, TextBody)}>
                        <span>{text}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
