import * as React from 'react';
import { Container } from '../components/Container';
import { css, cx } from 'linaria';
import { getAppLink, detectOS } from 'openland-x-utils/detectOS';
import { emojiAnimated } from 'openland-y-utils/emojiAnimated';
// @ts-ignore
import Tilt from 'react-tilt';

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

const screens = css`
    position: absolute;
    top: 93px; right: 0;
    width: 527px; height: 527px;
    background: linear-gradient(135deg, #FFC619 0%, #FF7919 100%);
    border-radius: 527px;
    transform-style: preserve-3d;
    transform: perspective(1000px);

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
        position: absolute;
        top: -50px; left: 0; right: 0; bottom: -50px;
    }
`;

const screenback = css`
    width: 227px; height: 493px;
    top: 18px; left: 206px;
    position: absolute;
    box-shadow: 0px 4.56288px 34.2216px rgba(0, 0, 0, 0.08);
    border-radius: 19px;
    transform: translateZ(20px);
    background: #ffffff;
    overflow: hidden;

    @media (min-width: 768px) and (max-width: 1199px) {
        width: 164px; height: 356px;
        top: 13px; left: 150px;
    }

    img {
        display: block;
        width: 100%; height: 100%;
    }
`;

const screenfront = css`
    width: 270px; height: 585px;
    top: -29px; left: 92px;
    position: absolute;
    box-shadow: 0px 4.56288px 50.1917px rgba(0, 0, 0, 0.08);
    border-radius: 23px;
    transform: translateZ(40px);
    background: #ffffff;
    overflow: hidden;

    @media (min-width: 768px) and (max-width: 1199px) {
        width: 195px; height: 423px;
        top: -21px; left: 67px;
    }

    img {
        display: block;
        width: 100%; height: 100%;
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
    font-size: 35px;
    line-height: 46px;
    color: var(--foregroundSecondary);
    margin: 0 0 44px;
    max-width: 500px;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 22px;
        line-height: 32px;
        margin: 0 0 32px;
        max-width: 410px;
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
    white-space: pre-wrap;
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
    overflow: hidden;

    img {
        display: block;
        width: 100%; height: 100%;
    }
`;

const slides = [
    'Join\nconversations',
    'Get\ntalking',
    'Meet\nnew people',
    'Message\ndirectly',
    'Get\nfollowers',
    'Build\ncommunities',
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
                    <Tilt options={{ max: 20, scale: 1 }} className={screens}>
                        <div className={screenback}>
                            <img
                                src="https://cdn.openland.com/shared/landing/start/home-intro-screen-2.png"
                                srcSet="https://cdn.openland.com/shared/landing/start/home-intro-screen-2@2x.png 2x"
                                alt=""
                            />
                        </div>
                        <div className={screenfront}>
                            <img
                                src="https://cdn.openland.com/shared/landing/start/home-intro-screen-1.png"
                                srcSet="https://cdn.openland.com/shared/landing/start/home-intro-screen-1@2x.png 2x"
                                alt=""
                            />
                        </div>
                    </Tilt>
                    <div className={info}>
                        <div className={emoji}>{emojiAnimated('👋')}</div>
                        <div className={title}>Voice chats<span>for everyone</span></div>
                        <div className={text}>Join interesting conversations, meet new people, and build meaningful relationships</div>
                        <div className={apps}>
                            <a
                                className={cx(app, mobileOS === 'iOS' && 'mobile-active')}
                                href={getAppLink('iOS')}
                            />
                            <a
                                className={cx(app, appAndroid, mobileOS === 'Android' && 'mobile-active')}
                                href={getAppLink('Android')}
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
                        <div className={slideImage}>
                            <img
                                src={`https://cdn.openland.com/shared/landing/start/home-screen-${i + 1}.png`}
                                srcSet={`https://cdn.openland.com/shared/landing/start/home-screen-${i + 1}@2x.png 2x`}
                                alt=""
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});
