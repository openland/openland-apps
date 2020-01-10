import * as React from 'react';
import { css, cx } from 'linaria';
import { XViewRouterContext } from 'react-mental';
import {
    FullMessage_GeneralMessage_attachments_MessageRichAttachment,
    FullMessage_GeneralMessage_attachments_MessageRichAttachment_keyboard,
} from 'openland-api/Types';
import { makeInternalLinkRelative } from 'openland-web/utils/makeInternalLinkRelative';
import { UButton, UButtonProps } from 'openland-web/components/unicorn/UButton';
import { TextTitle3, TextBody } from 'openland-web/utils/TextStyles';
import { resolveLinkAction } from 'openland-web/utils/resolveLinkAction';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';

const root = css`
    background-color: var(--backgroundTertiary);
    border-radius: 8px;
    overflow: hidden;
    min-width: 410px;
    max-width: 480px;
    cursor: pointer;
    transition: background-color 300ms ease;

    &:hover {
        background-color: var(--backgroundTertiaryHover);
        transition: background-color 100ms ease;
    }
`;

const wrapper = css`
    display: flex;
    flex-direction: row;
    flex-shrink: 1;

    overflow: hidden;
    position: relative;
    align-self: flex-start;
    align-items: center;
    width: 100%;
    padding: 16px 24px 16px 16px;
    justify-content: space-between;

    @media (max-width: 1050px) {
        width: 100%;
        max-width: initial;
        min-width: initial;
    }

    @media (max-width: 750px) {
        flex-direction: column;
        padding: 16px;
    }
`;

const socialImageStyle = css`
    width: 100%;
    height: auto;
    display: block;
`;

const content = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 1;

    @media (max-width: 750px) {
        width: 100%;
    }
`;

const dataContent = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
`;

const avatarContainer = css`
    margin-right: 16px;
    flex-shrink: 0;
`;

const titleStyle = css`
    color: var(--foregroundPrimary);
`;

const textStyle = css`
    color: var(--foregroundSecondary);
`;

const ellipsisStyle = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const keyboardContent = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-shrink: 0;
    padding-left: 24px;

    @media (max-width: 750px) {
        width: 100%;
        padding: 16px 0 0;
        flex-direction: row;
    }
`;

const keyboardRow = css`
    display: flex;
    flex-grow: 1;
    flex-direction: column;

    @media (max-width: 750px) {
        flex-direction: row;
    }
`;

const keyboardItem = css`
    display: flex;
    margin: 4px 0;
    align-self: flex-start;

    &:first-child { margin-top: 0; }
    &:last-child { margin-bottom: 0; }

    @media (max-width: 750px) {
        margin: 0 4px;
        flex-grow: 1;

        &:first-child { margin-left: 0; }
        &:last-child { margin-right: 0; }
        & > .x {
            width: 100%;
        }
    }
`;

const keyboardUnicornRow = css`
    display: flex;
`;

const keyboardUnicornItem = css`
    display: flex;
    margin: 12px 4px 4px;
    align-self: flex-start;

    &:first-child { margin-left: 0; }
    &:last-child { margin-right: 0; }
`;

const UnicornBotButton = (props: { keyboard: FullMessage_GeneralMessage_attachments_MessageRichAttachment_keyboard }) => {
    const { keyboard } = props;
    const engine = React.useContext(MessengerContext);
    const router = React.useContext(XViewRouterContext);
    return (
        <>
            {keyboard.buttons.map(i => {
                if (i) {
                    return (
                        <div className={keyboardUnicornRow}>
                            {i.map(j => (
                                <div key={j.id} className={keyboardUnicornItem}>
                                    <UButton
                                        text={j.title}
                                        onClick={(e: React.MouseEvent) => {
                                            e.stopPropagation();
                                            resolveLinkAction(j.url || '', engine.client, router!);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    );
                }
                return null;
            })}
        </>
    );
};

const MessageButton = (props: UButtonProps & { url: string | null, fallback: (e: React.MouseEvent, path: string | null) => void }) => {
    const { url, fallback, ...buttonProps } = props;
    const [loading, setLoading] = React.useState(false);
    const engine = React.useContext(MessengerContext);
    const router = React.useContext(XViewRouterContext);
    const onclick = React.useCallback(async (e: React.MouseEvent) => {
        let action = resolveLinkAction(url, engine.client, router!, () => fallback(e, url));
        if (action) {
            setLoading(true);
            try {
                e.stopPropagation();
                e.preventDefault();
                await action;
            } catch (e) {
                console.warn(e);
            }
            setLoading(false);
        }
    }, []);
    return <UButton
        {...buttonProps}
        loading={loading}
        onClick={onclick}
    />;
};

export const InternalAttachContent = (props: { attach: FullMessage_GeneralMessage_attachments_MessageRichAttachment }) => {
    const { title, subTitle, keyboard, image, imageFallback, socialImage, id, titleLink } = props.attach;
    const layout = useLayout();

    if (!title && !subTitle && keyboard) {
        return <UnicornBotButton keyboard={keyboard} />;
    }

    let avatarWrapper = null;
    let keyboardWrapper = null;
    const router = React.useContext(XViewRouterContext);

    const keyboardAction = React.useCallback((e: React.MouseEvent, path: string | null) => {
        e.stopPropagation();
        if (router) {
            router.navigate(makeInternalLinkRelative(path || ''));
        }
    }, []);

    if (image) {
        avatarWrapper = (
            <div className={avatarContainer}>
                <UAvatar
                    size="large"
                    photo={image.url}
                    title={title || ''}
                    id={id}
                />
            </div>
        );
    } else if (imageFallback) {
        avatarWrapper = (
            <div className={avatarContainer}>
                <UAvatar
                    size="large"
                    photo={imageFallback.photo}
                    title={imageFallback.text}
                    id={id}
                />
            </div>
        );
    }

    if (keyboard && keyboard.buttons) {
        keyboardWrapper = (
            <div className={keyboardContent}>
                {keyboard.buttons.map((i, j) => {
                    if (i) {
                        return (
                            <div className={keyboardRow} key={'keyboard_wrapper' + j}>
                                {i.map(k => (
                                    <div key={k.id} className={keyboardItem}>
                                        <MessageButton
                                            text={k.title}
                                            size={layout === 'mobile' ? 'large' : 'medium'}
                                            url={k.url}
                                            fallback={keyboardAction}
                                        />
                                    </div>
                                ))}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        );
    }
    return (
        <div className={root}>
            {socialImage && (
                <ImgWithRetry src={socialImage.url} className={socialImageStyle} />
            )}
            <div
                className={cx(wrapper, 'message-rich-wrapper')}
                onClick={(e) => keyboardAction(e, titleLink)}
            >
                <div className={content}>
                    {avatarWrapper}
                    <div className={dataContent}>
                        {title && (
                            <div className={cx(titleStyle, ellipsisStyle, TextTitle3)}>
                                {title}
                            </div>
                        )}
                        {subTitle && (
                            <div className={cx(textStyle, ellipsisStyle, TextBody)}>
                                {subTitle}
                            </div>
                        )}
                    </div>
                </div>
                {keyboardWrapper}
            </div>
        </div>
    );
};
