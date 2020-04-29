import * as React from 'react';
import { css, cx } from 'linaria';
import { Container } from 'openland-landing/components/Container';

const box = css`
    padding: 0 0 180px;

    @media (min-width: 768px) and (max-width: 1599px) {
        padding: 0 0 120px;
    }

    @media (max-width: 767px) {
        padding: 0 0 60px;
    }
`;

const title = css`
    font-weight: 800;
    font-size: 36px;
    line-height: 40px;
    color: #272750;
    margin: 0 0 11px;

    @media (min-width: 768px) and (max-width: 1599px) {
        font-size: 32px;
        line-height: 40px;
        margin: 0 0 8px;
    }

    @media (max-width: 767px) {
        font-size: 24px;
        line-height: 32px;
        margin: 0 0 8px;
    }
`;

const text = css`
    font-size: 24px;
    line-height: 36px;
    color: #525273;
    margin: 0 0 36px;

    @media (min-width: 768px) and (max-width: 1599px) {
        font-size: 22px;
        line-height: 32px;
    }

    @media (max-width: 767px) {
        font-size: 18px;
        line-height: 26px;
        margin: 0 0 24px;
    }
`;

const screenshots = css`
    margin: 0 0 181px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media (min-width: 960px) and (max-width: 1599px) {
        margin: 0 0 150px;
    }

    @media (min-width: 768px) and (max-width: 959px) {
        margin: 0 0 120px;
    }

    @media (max-width: 767px) {
        margin: 0 0 50px;
    }

    &:last-child { margin: 0; }
`;

const screenshot = css`
    border-radius: 24px;
    overflow: hidden;

    &.is-s1 {
        width: 245px;

        @media (min-width: 960px) and (max-width: 1599px) {
            width: 201px;
        }

        @media (min-width: 768px) and (max-width: 959px) {
            width: 158px;
        }

        @media (max-width: 767px) {
            width: 100%;
        }
    }

    &.is-s2 {
        width: 839px;

        @media (min-width: 960px) and (max-width: 1599px) {
            width: 688px;
        }

        @media (min-width: 768px) and (max-width: 959px) {
            width: 542px;
        }

        @media (max-width: 767px) {
            display: none;
        }
    }

    img {
        display: block;
        width: 100%;
    }
`;

export const HomeScreenshots = React.memo(() => (
    <div className={box}>
        <Container>
            <div className={title}>Do things together in video calls</div>
            <div className={text}>Play games, watch videos, share screen</div>
            <div className={screenshots}>
                <div className={cx(screenshot, 'is-s1')}>
                    <img
                        src="/static/landing/meets/home-screen-1.png"
                        srcSet="/static/landing/meets/home-screen-1.png, /static/landing/meets/home-screen-1@2x.png 2x"
                    />
                </div>
                <div className={cx(screenshot, 'is-s2')}>
                    <img
                        src="/static/landing/meets/home-screen-2.png"
                        srcSet="/static/landing/meets/home-screen-2.png, /static/landing/meets/home-screen-2@2x.png 2x"
                    />
                </div>
            </div>
            <div className={title}>Get creative in space chat</div>
            <div className={text}>Talk in small groups, explore the map, express yourself</div>
            <div className={screenshots}>
                <div className={cx(screenshot, 'is-s3')}>
                    <img
                        src="/static/landing/meets/home-screen-3.png"
                        srcSet="/static/landing/meets/home-screen-3.png, /static/landing/meets/home-screen-3@2x.png 2x"
                    />
                </div>
            </div>
        </Container>
    </div>
));
