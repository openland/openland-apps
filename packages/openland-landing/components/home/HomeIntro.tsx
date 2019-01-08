import * as React from 'react';
import { Container } from '../Container';
import { css } from 'linaria';
import { HomeForm } from './HomeForm';

let homeIntroRootClass = css`
    padding: 79px 0 0;
    margin: 48px 0 0;
    z-index: 1;
    position: relative;
    height: 500px;
    overflow: hidden;

    @media (max-width: 767px) {
        padding: 25px 0 0;
        margin: 0;
        text-align: center;
        height: auto;
    }
    @media (min-width: 768px) and (max-width: 999px) {
        text-align: center;
        padding: 127px 0 0;
        margin: 0;
        height: auto;
    }
`;

let homeIntroForDesktop = css`
    @media (max-width: 767px) {
        display: none !important;
    }
`;

let homeIntroForMobile = css`
    @media (min-width: 768px) {
        display: none !important;
    }
`;

let homeIntroBackgroundClass = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1740px;
    height: 500px;
    display: block;

    @media (max-width: 999px) {
        display: none;
    }
`;

let homeIntroTitleClass = css`
    margin: 0 0 12px;
    font-size: 40px;
    line-height: 48px;
    font-weight: 700;

    @media (max-width: 767px) {
        margin: 0 auto 15px;
        font-size: 32px;
        line-height: 38px;
        width: 290px;
    }
`;

let homeIntroTextClass = css`
    color: rgba(83, 96, 134, 0.8);
    margin: 0 0 35px;
    font-size: 22px;
    line-height: 34px;

    @media (max-width: 767px) {
        margin: 0 0 30px;
        font-size: 19px;
        line-height: 27px;
    }
`;

let homeIntroLabelClass = css`
    color: rgba(83, 96, 134, 0.5);
    letter-spacing: 0.2px;
    font-size: 14px;
    line-height: 16px;

    @media (max-width: 767px) {
        font-size: 14px;
        line-height: 20px;
    }
`;

export const HomeIntro = () => (
    <div className={homeIntroRootClass}>
        <img
            src="/static/landing/intro-bg.png"
            srcSet="/static/landing/intro-bg.png 1x, /static/landing/intro-bg@2x.png 2x"
            className={homeIntroBackgroundClass}
        />
        <Container>
            <div className={homeIntroTitleClass}>Run Your Business on&nbsp;Messaging</div>
            <div className={homeIntroTextClass}>
                Openland is&nbsp;a&nbsp;professional messenger designed to&nbsp;support
                <br className={homeIntroForDesktop} /> all communication needs of&nbsp;a&nbsp;modern
                business
            </div>
            <HomeForm />
            <div className={homeIntroLabelClass}>
                Openland is&nbsp;in&nbsp;limited preview release.
                <br className={homeIntroForMobile} /> Sign up&nbsp;to&nbsp;get your invitation.
            </div>
        </Container>
    </div>
);
