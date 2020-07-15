import * as React from 'react';
import { css, cx } from 'linaria';
import { Container } from '../components/Container';
import GroupIcon from 'openland-icons/s/ic-group-glyph-24.svg';
import MessageIcon from 'openland-icons/s/ic-message-filled-24.svg';
import MailIcon from 'openland-icons/s/ic-mail-glyph-24.svg';
import EditIcon from 'openland-icons/s/ic-edit-glyph-24.svg';
import ReadIcon from 'openland-icons/s/ic-read-filled-24.svg';
import MegaphoneIcon from 'openland-icons/s/ic-megaphone-glyph-24.svg';

const inner = css`
    position: relative;
    padding: 120px 0 100px;

    @media (min-width: 768px) and (max-width: 1199px) {
        padding: 140px 0 72px;
    }

    @media (max-width: 767px) {
        display: none;
    }
`;

const box = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 80px;

    @media (min-width: 768px) and (max-width: 1199px) {
        margin: 0 0 28px;
    }
`;

const preview = css`
    width: 524px; height: 300px;
    border-radius: 32px;

    @media (min-width: 768px) and (max-width: 1199px) {
        width: 344px; height: 196px;
        border-radius: 16px;
    }

    &:last-child {
        margin-right: 32px;

        @media (min-width: 768px) and (max-width: 1199px) {
            margin-right: 5px;
        }
    }

    &.is-c1 {
        background: url(https://cdn.openland.com/shared/landing/start/home-why-01.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/start/home-why-01.png) 1x,
            url(https://cdn.openland.com/shared/landing/start/home-why-01@2x.png) 2x
        );
        background-size: 100% 100%;
    }

    &.is-c2 {
        background: url(https://cdn.openland.com/shared/landing/start/home-why-02.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/start/home-why-02.png) 1x,
            url(https://cdn.openland.com/shared/landing/start/home-why-02@2x.png) 2x
        );
        background-size: 100% 100%;
    }

    &.is-c3 {
        background: url(https://cdn.openland.com/shared/landing/start/home-why-03.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/start/home-why-03.png) 1x,
            url(https://cdn.openland.com/shared/landing/start/home-why-03@2x.png) 2x
        );
        background-size: 100% 100%;
    }
`;

const info = css`
    width: 524px;
    padding: 0 0 4px 8px;

    @media (min-width: 768px) and (max-width: 1199px) {
        width: 344px; 
        padding: 0 0 12px 12px;
    }

    &:first-child {
        padding-left: 50px;

        @media (min-width: 768px) and (max-width: 1199px) {
            padding-left: 28px;
        }
    }
`;

const title = css`
    font-size: 62px;
    line-height: 64px;
    font-weight: 800;
    margin: 0 0 48px;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 40px;
        line-height: 44px;
        margin: 0 0 25px;
    }
`;

const subtitle = css`
    font-size: 38px;
    line-height: 40px;
    font-weight: 700;
    margin: 0 0 20px;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 28px;
        line-height: 28px;
        margin: 0 0 8px;
    }
`;

const text = css`
    font-size: 24px;
    line-height: 38px;
    margin: 0 0 24px;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 18px;
        line-height: 26px;
        margin: 0 0 12px;
    }
`;

const features = css`
    font-size: 20px;
    line-height: 36px;
    color: #5A6782;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 14px;
        line-height: 24px;
    }

    div {
        position: relative;
        padding: 0 0 0 40px;

        @media (min-width: 768px) and (max-width: 1199px) {
            padding: 0 0 0 28px;
        }
    }

    svg {
        position: absolute;
        top: 6px; left: 0;
        width: 24px; height: 24px;

        @media (min-width: 768px) and (max-width: 1199px) {
            top: 4px;
            width: 16px; height: 16px;
        }

        path {
            fill: var(--foregroundQuaternary);
        }
    }
`;

export const HomeWhy = React.memo(() => (
    <Container>
        <div className={inner}>
            <div className={title}>Why join Openland?</div>

            <div className={box}>
                <div className={cx(preview, 'is-c1')} />
                <div className={info}>
                    <div className={subtitle}>Meaningful relationships</div>
                    <div className={text}>
                        Meet new people in communities<br />
                        Build friendships that last
                    </div>
                    <div className={features}>
                        <div><GroupIcon />Community for every interest</div>
                        <div><MessageIcon />World-class messenger and video chat</div>
                    </div>
                </div>
            </div>

            <div className={box}>
                <div className={info}>
                    <div className={subtitle}>Positive culture</div>
                    <div className={text}>
                        Share your stories and emotions<br />
                        Be heard, accepted, and supported
                    </div>
                    <div className={features}>
                        <div><MailIcon />Invite-only groups and communities</div>
                        <div><EditIcon />Moderator-led rules and norms</div>
                    </div>
                </div>
                <div className={cx(preview, 'is-c2')} />
            </div>

            <div className={box}>
                <div className={cx(preview, 'is-c3')} />
                <div className={info}>
                    <div className={subtitle}>Inspiration and access</div>
                    <div className={text}>
                        Understand the world better, together<br />
                        Learn from people who've been there
                    </div>
                    <div className={features}>
                        <div><ReadIcon />Community-curated news</div>
                        <div><MegaphoneIcon />Events and conversations with experts</div>
                    </div>
                </div>
            </div>
        </div>
    </Container>
));
