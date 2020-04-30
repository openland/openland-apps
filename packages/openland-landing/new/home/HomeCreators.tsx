import * as React from 'react';
import { css } from 'linaria';
import { Container } from '../components/Container';
import Arrow from './icons/ic-arrow.svg';

const box = css`
    background: #F7FAFC;
    margin: 0 0 109px;

    @media (min-width: 960px) and (max-width: 1599px) {
        margin: 0 0 99px;
    }

    @media (min-width: 768px) and (max-width: 959px) {
        margin: 0;
    }

    @media (max-width: 767px) {
        margin: 0;
    }
`;

const inner = css`
    position: relative;
    padding: 96px 0 92px 570px;

    @media (min-width: 960px) and (max-width: 1599px) {
        padding: 80px 0 80px 412px;
    }

    @media (min-width: 768px) and (max-width: 959px) {
        padding: 60px 0 60px 220px;
    }

    @media (max-width: 767px) {
        padding: 52px 0 60px;
    }
`;

const image = css`
    width: 529px; height: 501px;
    background: url(https://cdn.openland.com/shared/landing/meets/home-creators-lg.png) no-repeat;
    background-image: -webkit-image-set(
        url(https://cdn.openland.com/shared/landing/meets/home-creators-lg.png) 1x,
        url(https://cdn.openland.com/shared/landing/meets/home-creators-lg@2x.png) 2x
    );
    background-size: 100% 100%;
    position: absolute;
    top: 40px; left: 0;

    @media (min-width: 960px) and (max-width: 1599px) {
        top: 31px;
        width: 440px; height: 446px;
        background: url(https://cdn.openland.com/shared/landing/meets/home-creators-md.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/meets/home-creators-md.png) 1x,
            url(https://cdn.openland.com/shared/landing/meets/home-creators-md@2x.png) 2x
        );
        background-size: 100% 100%;
    }

    @media (min-width: 768px) and (max-width: 959px) {
        top: 42px; left: -84px;
        width: 294px; height: 298px;
        background: url(https://cdn.openland.com/shared/landing/meets/home-creators-md.png) no-repeat;
        background-image: -webkit-image-set(
            url(https://cdn.openland.com/shared/landing/meets/home-creators-md.png) 1x,
            url(https://cdn.openland.com/shared/landing/meets/home-creators-md@2x.png) 2x
        );
        background-size: 100% 100%;
    }

    @media (max-width: 767px) {
        display: none;
    }
`;

const title = css`
    font-weight: 800;
    font-size: 36px;
    line-height: 40px;
    color: #272750;
    margin: 0 0 28px;

    @media (min-width: 768px) and (max-width: 1599px) {
        font-size: 32px;
        line-height: 40px;
        margin: 0 0 20px;
    }

    @media (max-width: 767px) {
        font-size: 24px;
        line-height: 32px;
        margin: 0 0 12px;
    }
`;

const text = css`
    font-size: 24px;
    line-height: 36px;
    color: #525273;
    margin: 0 0 24px;

    @media (min-width: 768px) and (max-width: 1599px) {
        font-size: 22px;
        line-height: 32px;
    }

    @media (max-width: 767px) {
        font-size: 18px;
        line-height: 28px;
        margin: 0 0 16px;
    }

    div {
        padding: 0 0 12px 36px;
        position: relative;

        @media (min-width: 768px) and (max-width: 1599px) {
            padding: 0 0 12px 30px;
        }

        @media (max-width: 767px) {
            padding: 0 0 8px 24px;
        }

        &:before {
            content: "";
            position: absolute;
            top: 11px; left: 0;
            width: 16px; height: 16px;
            border-radius: 16px;
            border: 3px solid #F17B79;
            box-sizing: border-box;

            @media (min-width: 768px) and (max-width: 1599px) {
                top: 10px;
                width: 14px; height: 14px;
                border-radius: 14px;
            }

            @media (max-width: 767px) {
                top: 8px;
                width: 12px; height: 12px;
                border-radius: 12px;
                border-width: 2px;
            }
        }
    }
`;

const button = css`
    padding: 16px 32px;
    background: #E9F3FE;
    border-radius: 12px;
    display: inline-block;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #248BF2;

    @media (min-width: 768px) and (max-width: 1599px) {
        font-size: 16px;
        padding: 12px 26px;
    }

    @media (max-width: 767px) {
        font-size: 16px;
        padding: 12px 28px;
    }

    will-change: color, background-color, box-shadow;
    transition: color 0.2s, background-color.2s, box-shadow 0.2s;

    svg {
        display: inline-block;
        vertical-align: top;
        width: 16px; height: 16px;
        margin: 4px 0 -4px 8px;
        opacity: 0.5;

        * {
            transition: fill 0.2s;
            fill: #248BF2;
        }
    }

    &:hover,
    &:focus {
        transition: color 0.01s, background-color 0.01s;
        box-shadow: 0px 6px 27px rgba(36, 139, 242, 0.32);
        color: #ffffff;
        background-color: #47a3ff;
        text-decoration: none;

        svg * {
            transition: fill 0.01s;
            fill: #ffffff;
        }
    }

    &:active {
        transition: color 0.01s, background-color 0.01s;
        color: #ffffff;
        background-color: #1d84ec;

        svg * {
            transition: fill 0.01s;
            fill: #ffffff;
        }
    }
`;

export const HomeCreators = React.memo(() => (
    <div className={box}>
        <Container>
            <div className={inner}>
                <div className={image} />
                <div className={title}>Openland for creators</div>
                <div className={text}>
                    <div>Organize interactive classes and community events</div>
                    <div>Sell tickets and memberships, collect donations</div>
                </div>
                <a href="#" className={button}>Join as a creator<Arrow /></a>
            </div>
        </Container>
    </div>
));
