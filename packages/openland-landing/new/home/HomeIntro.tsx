import * as React from 'react';
import { Container } from '../components/Container';
import { css, cx } from 'linaria';
import { LandingLinks } from '../components/_links';
import { detectOS } from 'openland-x-utils/detectOS';

const box = css`
    overflow: hidden;

    @media (max-width: 767px) {
        overflow: initial;
    }
`;

const inner = css`
    position: relative;
    padding: 136px 0 145px;

    @media (min-width: 768px) and (max-width: 1199px) {
        padding: 112px 0 60px;
    }

    @media (max-width: 767px) {
        padding: 33px 0 56px;
    }
`;

const image = css`
    position: absolute;
    top: 93px; right: 0;
    width: 527px; height: 527px;
    background: linear-gradient(135deg, #FFC619 0%, #FF7919 100%);
    border-radius: 527px;

    @media (min-width: 768px) and (max-width: 1199px) {
        top: 81px; right: -82px;
        width: 380px; height: 380px;
    }

    @media (max-width: 767px) {
        display: none;
    }

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

        @media (min-width: 768px) and (max-width: 1199px) {
            top: -55px; left: 30px;
            width: 309px; height: 496px;
        }
    }
`;

const info = css`
    width: 530px;

    @media (max-width: 767px) {
        width: 288px;
        margin: 0 auto;
    }
`;

const title = css`
    font-weight: 800;
    font-size: 88px;
    line-height: 91px;
    color: var(--foregroundPrimary);
    margin: 0 0 21px;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 62px;
        line-height: 66px;
        margin: 0 0 17px;
    }

    @media (max-width: 767px) {
        font-size: 46px;
        line-height: 48px;
        text-align: center;

        &:before {
            content: "👋";
            display: block;
            font-weight: 800;
            font-size: 65px;
            line-height: 48px;
            margin: 0 0 51px;
        }
    }

    span {
        display: block;

        @media (min-width: 768px) {
            background: -webkit-linear-gradient(-45deg, #24BFF2 0%, #2458F2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }
`;

const text = css`
    font-size: 30px;
    line-height: 46px;
    color: var(--foregroundSecondary);
    margin: 0 0 44px;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 22px;
        line-height: 32px;
        margin: 0 0 32px;
    }

    @media (max-width: 767px) {
        color: var(--foregroundPrimary);
        font-size: 16px;
        line-height: 26px;
        margin: 0 0 50px;
        text-align: center;
    }
`;

const apps = css`
    display: flex;

    @media (max-width: 767px) {
        justify-content: center;
    }
`;

const app = css`
    width: 168px;
    height: 56px;
    margin: 0 24px 0 0;
    transition: 150ms box-shadow ease;
    border-radius: 10px;
    background: var(--foregroundPrimary) url(https://cdn.openland.com/shared/landing/start/home-intro-ios-2.svg) no-repeat;
    background-size: 100% 100%;

    @media (min-width: 768px) and (max-width: 1199px) {
        width: 121px;
        height: 40px;
        margin: 0 16px 0 0;
    }

    @media (max-width: 767px) {
        margin: 0;

        &:not(.mobile-active) {
            display: none;
        }
    }

    &:hover {
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
    }
`;

const appAndroid = css`
    width: 180px;
    margin: 0;
    background-image: url(https://cdn.openland.com/shared/landing/start/home-intro-android-2.svg);

    @media (min-width: 768px) and (max-width: 1199px) {
        width: 130px;
    }
`;

const mobileDemo = css`
    display: none;
    background: linear-gradient(145.25deg, #24BFF2 0%, #2458F2 100%);
    padding: 36px 0 48px;

    @media (max-width: 767px) {
        display: block;
    }
`;

const mobileTitle = css`
    font-weight: 800;
    font-size: 28px;
    line-height: 32px;
    color: #FFFFFF;
    text-align: center;
    margin: 0 0 4px;
`;

const mobileText = css`
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #FFFFFF;
    text-align: center;
    margin: 0 0 28px;
`;

const mobileScreen = css`
    box-shadow: 0px 3.82066px 42.0273px rgba(0, 0, 0, 0.08);
    width: 226px; height: 490px;
    margin: 0 auto;
    border-radius: 20px;
    background: url(https://cdn.openland.com/shared/landing/start/home-intro-mobile.png) no-repeat;
    background-image: -webkit-image-set(
        url(https://cdn.openland.com/shared/landing/start/home-intro-mobile.png) 1x,
        url(https://cdn.openland.com/shared/landing/start/home-intro-mobile@2x.png) 2x
    );
    background-size: 100% 100%;
`;

export const HomeIntro = React.memo(() => {
    const mobileOS = detectOS() === 'Android' ? 'Android' : 'iOS';

    return (
        <div className={box}>
            <Container>
                <div className={inner}>
                    <div className={image} />
                    <div className={info}>
                        <div className={title}>A fresh start<span>for social</span></div>
                        <div className={text}>Openland is a modern social network<br /> built for people, not advertisers</div>
                        <div className={apps}>
                            <a
                                className={cx(app, mobileOS === 'iOS' && 'mobile-active')}
                                href={LandingLinks.apps.ios}
                            />
                            <a
                                className={cx(app, appAndroid, mobileOS === 'Android' && 'mobile-active')}
                                href={LandingLinks.apps.android}
                            />
                        </div>
                    </div>
                </div>
            </Container>

            <div className={mobileDemo}>
                <div className={mobileTitle}>Discover</div>
                <div className={mobileText}>Amazing people to meet</div>
                <div className={mobileScreen} />
            </div>
        </div>
    );
});
