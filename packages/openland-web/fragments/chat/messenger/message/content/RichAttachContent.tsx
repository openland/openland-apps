import * as React from 'react';
import { css, cx } from 'linaria';
import { XViewRouterContext } from 'react-mental';
import { FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/Types';
import { layoutMedia } from 'openland-web/utils/MediaLayout';
import { isInternalLink } from 'openland-web/utils/isInternalLink';
import { makeInternalLinkRelative } from 'openland-web/utils/makeInternalLinkRelative';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { TextCaption, TextTitle2, TextBody } from 'openland-web/utils/TextStyles';

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
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    min-height: 100%;
`;

const richImageStyle = css`
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

const InternalComponent = ({
    attach,
}: {
    attach: FullMessage_GeneralMessage_attachments_MessageRichAttachment;
}) => {
    let avatar = null;
    let keyboard = null;
    const router = React.useContext(XViewRouterContext);

    const keyboardAction = React.useCallback((e: any, path: string | null) => {
        e.preventDefault();
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
                                onClick={(e: any) => keyboardAction(e, j.url)}
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

export const RichAttachContent = ({
    attach,
}: {
    attach: FullMessage_GeneralMessage_attachments_MessageRichAttachment;
}) => {
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
            <div className={richImageContainer}>
                <img
                    className={richImageStyle}
                    width={layout.width}
                    height={layout.height}
                    src={attach.image.url}
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
