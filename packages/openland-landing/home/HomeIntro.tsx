import * as React from 'react';
import { Container } from 'openland-landing/components/Container';
import { css } from 'linaria';
import { HomeAppsMobile } from 'openland-landing/home/HomeApps';

const box = css`
    position: relative;
    overflow: hidden;
    padding: 0 0 50px;

    @media (min-width: 960px) and (max-width: 1599px) {
        padding: 0 0 40px;
    }

    @media (min-width: 768px) and (max-width: 959px) {
        padding: 0 0 32px;
    }

    @media (max-width: 767px) {
        padding: 0 0 46px;
    }
`;

const wrapper = css`
    position: relative;
    z-index: 2;
`;

const gradient = css`
    position: absolute;
    z-index: 1;
    left: 0; right: 0; bottom: 0;
    height: 518px;
    background: linear-gradient(0deg, #F8F8F8 0%, rgba(255, 255, 255, 0) 90.74%);
`;

const inner = css`
    position: relative;
    padding: 118px 0 185px;

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
    top: 95px; right: 0;
    width: 625px; height: 450px;
    background: url(https://cdn.openland.com/shared/landing/meets/home-intro.png) no-repeat;
    background-image: -webkit-image-set(
        url(https://cdn.openland.com/shared/landing/meets/home-intro.png) 1x,
        url(https://cdn.openland.com/shared/landing/meets/home-intro@2x.png) 2x
    );
    background-size: 100% 100%;

    @media (min-width: 960px) and (max-width: 1599px) {
        top: 86px;
        width: 530px; height: 381px;
    }

    @media (min-width: 768px) and (max-width: 959px) {
        top: 75px; left: 400px; right: auto;
        width: 560px; height: 403px;
    }

    @media (max-width: 767px) {
        position: relative;
        top: auto; right: auto;
        width: auto; height: auto;
        margin: 0 0 28px;
        padding: calc((264 / 368) * 100%) 0 0;
    }
`;

const info = css`
    width: 450px;

    @media (min-width: 960px) and (max-width: 1599px) {
        width: 366px;
    }

    @media (min-width: 768px) and (max-width: 959px) {
        width: 366px;
    }

    @media (max-width: 767px) {
        width: auto;
    }
`;

const title = css`
    font-weight: 800;
    font-size: 62px;
    line-height: 68px;
    color: #272750;
    margin: 0 0 16px;

    @media (min-width: 960px) and (max-width: 1599px) {
        font-size: 52px;
        line-height: 54px;
    }

    @media (min-width: 768px) and (max-width: 959px) {
        font-size: 52px;
        line-height: 54px;
    }

    @media (max-width: 767px) {
        font-size: 40px;
        line-height: 46px;
        margin: 0 0 13px;
    }
`;

const text = css`
    font-size: 24px;
    line-height: 38px;
    color: #525273;
    margin: 0 0 40px;

    @media (min-width: 960px) and (max-width: 1599px) {
        font-size: 20px;
        line-height: 30px;
        margin: 0 0 32px;
    }

    @media (min-width: 768px) and (max-width: 959px) {
        font-size: 20px;
        line-height: 30px;
        margin: 0 0 32px;
    }

    @media (max-width: 767px) {
        font-size: 18px;
        line-height: 26px;
        margin: 0 0 32px;
    }
`;

const investors = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    @media (max-width: 767px) {
        display: none;
    }
`;

const investorsLabel = css`
    font-size: 20px;
    line-height: 40px;
    color: #959595;
    margin: -2px 0 2px;

    @media (min-width: 960px) and (max-width: 1599px) {
        font-size: 18px;
        line-height: 40px;
    }

    @media (min-width: 768px) and (max-width: 959px) {
        display: none;
    }

    &:first-child {
        margin-right: 32px;

        @media (min-width: 960px) and (max-width: 1599px) {
            margin-right: 36px;
        }
    }

    &:last-child {
        margin-left: 32px;

        @media (min-width: 960px) and (max-width: 1599px) {
            margin-left: 28px;
        }
    }
`;

const investorsLogos = css`
    width: 793px;
    height: 80px;
    background: url(https://cdn.openland.com/shared/landing/meets/home-intro-logos-lg.png) center center no-repeat;
    background-image: -webkit-image-set(
        url(https://cdn.openland.com/shared/landing/meets/home-intro-logos-lg.png) 1x,
        url(https://cdn.openland.com/shared/landing/meets/home-intro-logos-lg@2x.png) 2x
    );
    background-size: 100% auto;

    @media (min-width: 768px) and (max-width: 1599px) {
        width: 685px;
        background: url(https://cdn.openland.com/shared/landing/meets/home-intro-logos-md.png) center center no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/meets/home-intro-logos-md.png) 1x,
            url(https://cdn.openland.com/shared/landing/meets/home-intro-logos-md@2x.png) 2x
        );
        background-size: 100% auto;
    }
`;

export const HomeIntro = React.memo(() => (
    <div className={box}>
        <div className={wrapper}>
            <Container>
                <div className={inner}>
                    <div className={image} />
                    <div className={info}>
                        <div className={title}>The most creative way to&nbsp;meet online</div>
                        <div className={text}>Make your meetings spontaneous, interactive, and visual</div>
                        <HomeAppsMobile />
                    </div>
                </div>
                <div className={investors}>
                    <div className={investorsLabel}>Backed by</div>
                    <div className={investorsLogos} />
                    <div className={investorsLabel}>+ more</div>
                </div>
            </Container>
        </div>

        <div className={gradient} />
    </div>
));
