import * as React from 'react';
import { Container } from '../components/Container';
import { css, cx } from 'linaria';
import { LandingLinks } from '../components/_links';

const inner = css`
    position: relative;
    padding: 157px 0 166px;

    @media (min-width: 960px) and (max-width: 1599px) {
        padding: 112px 0 170px;
    }

    @media (min-width: 768px) and (max-width: 959px) {
        padding: 112px 0 140px;
    }

    @media (max-width: 767px) {
        padding: 0;
    }
`;

const image = css`
    position: absolute;
    top: 113px; right: 0;
    width: 527px; height: 527px;
    background: linear-gradient(135deg, #FFC619 0%, #FF7919 100%);
    border-radius: 527px;

    &:before {
        content: "";
        display: block;
        width: 427px; height: 686px;
        background: url(https://cdn.openland.com/shared/landing/start/home-intro.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/start/home-intro.png) 1x,
            url(https://cdn.openland.com/shared/landing/start/home-intro@2x.png) 2x
        );
        background-size: 100% 100%;
        position: absolute;
        top: -75px; left: 41px;
    }
`;

const info = css`
    width: 530px;
`;

const title = css`
    font-weight: 800;
    font-size: 88px;
    line-height: 91px;
    color: var(--foregroundPrimary);
    margin: 0 0 20px;

    span {
        display: block;
        background: -webkit-linear-gradient(-45deg, #24BFF2 0%, #2458F2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

const text = css`
    font-size: 30px;
    line-height: 46px;
    color: var(--foregroundSecondary);
    margin: 0 0 44px;
`;

const apps = css`
    display: flex;
`;

const app = css`
    width: 168px;
    height: 56px;
    background-color: var(--foregroundPrimary);
    border-radius: 10px;
    margin: 0 24px 0 0;
    transition: 150ms all ease;

    &:hover {
        background-color: var(--foregroundSecondary);
    }
`;

const appAndroid = css`
    width: 180px;
`;

export const HomeIntro = React.memo(() => (
    <Container>
        <div className={inner}>
            <div className={image} />
            <div className={info}>
                <div className={title}>A fresh start<span>for social</span></div>
                <div className={text}>Openland is a modern social network<br /> built for people, not advertisers</div>
                <div className={apps}>
                    <a
                        className={app}
                        href={LandingLinks.apps.ios}
                    />
                    <a
                        className={cx(app, appAndroid)}
                        href={LandingLinks.apps.android}
                    />
                </div>
            </div>
        </div>
    </Container>
));
