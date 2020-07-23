import * as React from 'react';
import { css, cx } from 'linaria';
// @ts-ignore
import Tilt from 'react-tilt';

const box = css`
    width: 524px; height: 300px;
    border-radius: 32px;
    transform-style: preserve-3d;
    display: flex;
    padding: 0 40px;
    justify-content: center;
    flex-direction: column;
    user-select: none;
    transform: perspective(1000px);

    @media (min-width: 768px) and (max-width: 1199px) {
        width: 344px; height: 196px;
        border-radius: 16px;
        padding: 0 26px;
    }

    &:last-child {
        margin-right: 32px;

        @media (min-width: 768px) and (max-width: 1199px) {
            margin-right: 5px;
        }
    }

    &.is-relationships {
        background: rgba(185, 224, 229, 0.5);
    }

    &.is-culture {
        background: rgba(227, 194, 227, 0.5);
    }

    &.is-inspiration {
        background: rgba(237, 213, 154, 0.5);
    }
`;

const serviceMessage = css`
    transform: translateZ(20px);
    font-weight: 600;
    font-size: 22px;
    line-height: 24px;
    text-align: center;
    color: #035667;
    margin: 0 0 37px;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 13px;
        line-height: 16px;
        margin: 0 0 26px;
    }
`;

const group = css`
    transform: translateZ(30px);
    margin: 0 0 24px;

    @media (min-width: 768px) and (max-width: 1199px) {
        margin: 0 0 16px;
    }

    &:last-of-type {
        margin: 0;
    }
`;

const message = css`
    display: flex;
    align-items: flex-end;
    margin-top: 6px;

    @media (min-width: 768px) and (max-width: 1199px) {
        margin-top: 3px;
    }

    &:first-of-type {
        margin-top: 0;
    }

    &.is-reversed {
        justify-content: flex-end;
    }
`;

const avatar = css`
    width: 46px; height: 46px;
    border-radius: 23px;
    border: 1px solid var(--border);
    background-size: 100% 100%!important;

    @media (min-width: 768px) and (max-width: 1199px) {
        width: 30px; height: 30px;
        border-radius: 15px;
    }

    &.is-01 {
        background: url(https://cdn.openland.com/shared/landing/start/avatar-01.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/start/avatar-01.png) 1x,
            url(https://cdn.openland.com/shared/landing/start/avatar-01@2x.png) 2x
        );
    }

    &.is-02 {
        background: url(https://cdn.openland.com/shared/landing/start/avatar-02.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/start/avatar-02.png) 1x,
            url(https://cdn.openland.com/shared/landing/start/avatar-02@2x.png) 2x
        );
    }

    &.is-03 {
        background: url(https://cdn.openland.com/shared/landing/start/avatar-03.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/start/avatar-03.png) 1x,
            url(https://cdn.openland.com/shared/landing/start/avatar-03@2x.png) 2x
        );
    }

    &.is-04 {
        background: url(https://cdn.openland.com/shared/landing/start/avatar-04.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/start/avatar-04.png) 1x,
            url(https://cdn.openland.com/shared/landing/start/avatar-04@2x.png) 2x
        );
    }

    &.is-05 {
        background: url(https://cdn.openland.com/shared/landing/start/avatar-05.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/start/avatar-05.png) 1x,
            url(https://cdn.openland.com/shared/landing/start/avatar-05@2x.png) 2x
        );
    }

    &.is-06 {
        background: url(https://cdn.openland.com/shared/landing/start/avatar-06.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/start/avatar-06.png) 1x,
            url(https://cdn.openland.com/shared/landing/start/avatar-06@2x.png) 2x
        );
    }
`;

const avatarPlaceholder = css`
    width: 46px; height: 46px;

    @media (min-width: 768px) and (max-width: 1199px) {
        width: 30px; height: 30px;
    }
`;

const bubble = css`
    padding: 12px 20px;
    background: var(--foregroundContrast);
    font-weight: 500;
    font-size: 20px;
    line-height: 22px;
    color: rgba(23, 26, 31, 0.85);
    border-radius: 23px;
    margin: 0 12px;
    max-width: 300px;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 14px;
        line-height: 18px;
        margin: 0 8px;
        padding: 6px 11px;
        max-width: 210px;
    }

    &.is-big {
        border-radius: 20px;

        @media (min-width: 768px) and (max-width: 1199px) {
            border-radius: 13px;
        }
    }

    &.is-cyan {
        background: var(--tintCyan);
        color: var(--foregroundContrast);
    }

    &.is-purple {
        background: #CF54CF;
        color: var(--foregroundContrast);
    }

    &.is-orange {
        background: #ECB734;
        color: var(--foregroundContrast);
    }
`;

interface TiltPreviewProps {
    variant: 'relationships' | 'culture' | 'inspiration';
}

export const TiltPreview = React.memo((props: TiltPreviewProps) => (
    <Tilt options={{ max: 20, scale: 1 }} className={cx(box, `is-${props.variant}`)}>
        {props.variant === 'relationships' && (
            <>
                <div className={serviceMessage}>People who loved The Last Jedi</div>
                <div className={group}>
                    <div className={message}>
                        <div className={cx(avatar, 'is-01')} />
                        <div className={bubble}>I am not alone 🤩</div>
                    </div>
                </div>
                <div className={group}>
                    <div className={cx(message, 'is-reversed')}>
                        <div className={cx(bubble, 'is-cyan')}>Let's jump on a call!</div>
                        <div className={cx(avatar, 'is-02')} />
                    </div>
                </div>
            </>
        )}
        {props.variant === 'culture' && (
            <>
                <div className={group}>
                    <div className={message}>
                        <div className={cx(avatar, 'is-03')} />
                        <div className={bubble}>Got a new idea today ✨</div>
                    </div>
                </div>
                <div className={group}>
                    <div className={cx(message, 'is-reversed')}>
                        <div className={cx(bubble, 'is-purple')}>Can't wait to hear more!</div>
                        <div className={avatarPlaceholder} />
                    </div>
                    <div className={cx(message, 'is-reversed')}>
                        <div className={cx(bubble, 'is-purple')}>How can I help?</div>
                        <div className={cx(avatar, 'is-04')} />
                    </div>
                </div>
            </>
        )}
        {props.variant === 'inspiration' && (
            <>
                <div className={group}>
                    <div className={message}>
                        <div className={cx(avatar, 'is-05')} />
                        <div className={cx(bubble, 'is-big')}>
                            <strong>Megan Lee</strong> will be here next week with Q&A and a few personal sessions!
                        </div>
                    </div>
                </div>
                <div className={group}>
                    <div className={cx(message, 'is-reversed')}>
                        <div className={cx(bubble, 'is-orange')}>Awesome, can I book a slot?</div>
                        <div className={cx(avatar, 'is-06')} />
                    </div>
                </div>
            </>
        )}
    </Tilt>
));