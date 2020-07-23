import * as React from 'react';
import { Container } from '../components/Container';
import { css, cx } from 'linaria';
import { LandingLinks } from '../components/_links';
import { detectOS } from 'openland-x-utils/detectOS';
import { emojiAnimated } from 'openland-y-utils/emojiAnimated';

const box = css`
    @media (min-width: 768px) {
        overflow: hidden;
    }
`;

const inner = css`
    position: relative;
    padding: 136px 0 265px;

    @media (min-width: 768px) and (max-width: 1199px) {
        padding: 112px 0 200px;
    }

    @media (max-width: 767px) {
        padding: 6px 0 56px;
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

const emoji = css`
    display: none;
    width: 100px; height: 100px;
    margin: 0 auto 24px;

    @media (max-width: 767px) {
        display: block;
    }

    img {
        display: block;
        width: 100px; height: 100px;
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
        width: 150px;
        height: 50px;
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
        width: 160px;
    }
`;

const slider = css`
    background: linear-gradient(145.25deg, #24BFF2 0%, #2458F2 100%);
    height: 666px;
    position: relative;
    overflow: hidden;

    @media (min-width: 768px) {
        display: none;
    }
`;

const slide = css`
    visibility: hidden;
    padding: 36px 0 48px;
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;

    &.is-prev {
        visibility: visible;
        transform: translateX(0);
        opacity: 1;

        animation: animPrev 300ms ease-in-out forwards;
        @keyframes animPrev {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(-128px);
            }
        }
    }

    &.is-next {
        visibility: visible;
        transform: translateX(128px);
        opacity: 0;

        animation: animNext 300ms ease-in-out forwards;
        @keyframes animNext {
            from {
                opacity: 0;
                transform: translateX(128px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    }

    &.is-default {
        visibility: visible;
        transform: none;
        opacity: 1;
    }
`;

const slideTitle = css`
    font-weight: 800;
    font-size: 28px;
    line-height: 32px;
    color: #FFFFFF;
    text-align: center;
    margin: 0 auto 28px;
    width: 226px;
`;

const slideImage = css`
    box-shadow: 0px 3.82066px 42.0273px rgba(0, 0, 0, 0.08);
    width: 226px; height: 490px;
    margin: 0 auto;
    border-radius: 19px;

    &.is-01 {
        background: url(https://cdn.openland.com/shared/landing/start/home-slide-01.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/start/home-slide-01.png) 1x,
            url(https://cdn.openland.com/shared/landing/start/home-slide-01@2x.png) 2x
        );
    }

    &.is-02 {
        background: url(https://cdn.openland.com/shared/landing/start/home-slide-02.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/start/home-slide-02.png) 1x,
            url(https://cdn.openland.com/shared/landing/start/home-slide-02@2x.png) 2x
        );
    }

    &.is-03 {
        background: url(https://cdn.openland.com/shared/landing/start/home-slide-03.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/start/home-slide-03.png) 1x,
            url(https://cdn.openland.com/shared/landing/start/home-slide-03@2x.png) 2x
        );
    }

    &.is-04 {
        background: url(https://cdn.openland.com/shared/landing/start/home-slide-04.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/start/home-slide-04.png) 1x,
            url(https://cdn.openland.com/shared/landing/start/home-slide-04@2x.png) 2x
        );
    }

    &.is-05  {
        background: url(https://cdn.openland.com/shared/landing/start/home-slide-05.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/start/home-slide-05.png) 1x,
            url(https://cdn.openland.com/shared/landing/start/home-slide-05@2x.png) 2x
        );
    }
`;

const slides = [
    'Find your\xa0community',
    'Share your\xa0stories',
    'Meet new\xa0people',
    'See what others are\xa0doing',
    'Start your own community',
];

export const HomeIntro = React.forwardRef((props: {}, ref: React.Ref<HTMLDivElement>) => {
    const mobileOS = detectOS() === 'Android' ? 'Android' : 'iOS';
    const [activeSlide, setActiveSlide] = React.useState<number>(0);
    const [prevSlide, setPrevSlide] = React.useState<number>(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide(current => {
                const active = (current === slides.length - 1) ? 0 : current + 1;

                setPrevSlide(active === 0 ? slides.length - 1 : active - 1);

                return active;
            });
        }, 5000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const isFirstIteration = activeSlide === prevSlide;

    return (
        <div ref={ref} className={box}>
            <Container>
                <div className={inner}>
                    <div className={image} />
                    <div className={info}>
                        <div className={emoji}>{emojiAnimated('👋')}</div>
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

            <div className={slider}>
                {slides.map((s, i) => (
                    <div
                        key={i}
                        className={cx(
                            slide,
                            !isFirstIteration && activeSlide === i && 'is-next',
                            !isFirstIteration && prevSlide === i && 'is-prev',
                            isFirstIteration && i === 0 && 'is-default'
                        )}
                    >
                        <div className={slideTitle}>{s}</div>
                        <div className={cx(slideImage, `is-0${i + 1}`)} />
                    </div>
                ))}
            </div>
        </div>
    );
});
