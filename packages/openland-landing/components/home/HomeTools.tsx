import * as React from 'react';
import { css } from 'linaria';
import { Container } from '../Container';

let homeToolsRootClass = css`
    padding: 149px 0 51px;
    margin: 0 0 80px;
    overflow: hidden;
    position: relative;

    @media (max-width: 767px) {
        padding: 30px 0 70px;
        margin: 0;
    }
    @media (min-width: 768px) and (max-width: 999px) {
        padding: 100px 0 84px;
        margin: 0;
    }
`;

let homeToolsPhotoDesktopClass = css`
    position: absolute;
    bottom: 0;
    left: calc(50% - 49px);
    display: block;
    width: 745px;
    height: 469px;

    @media (max-width: 999px) {
        display: none;
    }
    @media (min-width: 1000px) and (max-width: 1179px) {
        left: 55%;
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
    }
`;

let homeToolsForDesktop = css`
    @media (max-width: 767px) {
        display: none !important;
    }
`;

let homeToolsForMobile = css`
    @media (min-width: 768px) {
        display: none !important;
    }
`;

let homeToolsTitleClass = css`
    text-align: center;
    margin: 0 0 112px;
    font-size: 32px;
    line-height: 38px;
    font-weight: 600;

    @media (max-width: 767px) {
        margin: 0 0 20px;
        font-size: 22px;
        line-height: 30px;
    }
    @media (min-width: 768px) and (max-width: 999px) {
        margin: 0 0 40px;
    }
`;

let homeToolsPhotoMobileClass = css`
    margin: 0 0 53px;
    width: 718px;
    height: 469px;
    display: none;

    @media (max-width: 767px) {
        margin: 0 auto 53px;
        width: 305px;
        height: 201px;
    }
    @media (max-width: 999px) {
        display: block;
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
    }
`;

let homeToolsItemClass = css`
    color: rgba(31, 52, 73, 0.7);
    padding: 0 0 0 83px;
    margin: 0 0 47px;
    position: relative;
    font-size: 18px;
    line-height: 21px;

    @media (max-width: 767px) {
        padding: 0;
        margin: 0 0 34px;
        text-align: center;
        font-size: 16px;
        line-height: 22px;
    }

    &:last-child {
        margin: 0;
    }
    span {
        color: #1f3449;
        margin: 0 0 9px;
        display: block;
        font-size: 20px;
        line-height: 24px;
        font-weight: 600;

        @media (max-width: 767px) {
            margin: 0 0 10px;
            font-size: 18px;
            line-height: 21px;
        }
    }
`;

let homeToolsIconClass = css`
    border-radius: 58px;
    background: #f5f5f5;
    display: block;
    width: 58px;
    height: 58px;
    position: absolute;
    top: -2px;
    left: 0;

    @media (max-width: 767px) {
        margin: 0 auto 18px;
        position: relative;
        top: auto;
        left: auto;
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
    }
`;

export const HomeTools = () => (
    <div className={homeToolsRootClass}>
        <div className={homeToolsPhotoDesktopClass}>
            <img
                src="/static/landing/tools-bg.png"
                srcSet="/static/landing/tools-bg.png 1x, /static/landing/tools-bg@2x.png 2x"
            />
        </div>
        <Container>
            <div className={homeToolsTitleClass + ' ' + homeToolsForDesktop}>
                A&nbsp;simple and elegant system of&nbsp;tools
            </div>
            <div className={homeToolsTitleClass + ' ' + homeToolsForMobile}>
                A&nbsp;simple and elegant system of&nbsp;tools
            </div>
            <div className={homeToolsPhotoMobileClass}>
                <img
                    src="/static/landing/tools-bg.png"
                    srcSet="/static/landing/tools-bg.png 1x, /static/landing/tools-bg@2x.png 2x"
                />
            </div>
            <div>
                <div className={homeToolsItemClass}>
                    <div className={homeToolsIconClass}>
                        <img src="/static/landing/gradient-icons/ic-tools-01@2x.png" />
                    </div>
                    <span>Professional identity</span>
                    One account everywhere
                </div>
                <div className={homeToolsItemClass}>
                    <div className={homeToolsIconClass}>
                        <img src="/static/landing/gradient-icons/ic-tools-02@2x.png" />
                    </div>
                    <span>Connections you need</span>
                    Intros and invitations to&nbsp;expand your network
                </div>
                <div className={homeToolsItemClass}>
                    <div className={homeToolsIconClass}>
                        <img src="/static/landing/gradient-icons/ic-tools-03@2x.png" />
                    </div>
                    <span>Fast, expressive writing</span>
                    Keyboard shortcuts and stickers
                </div>
                <div className={homeToolsItemClass}>
                    <div className={homeToolsIconClass}>
                        <img src="/static/landing/gradient-icons/ic-tools-04@2x.png" />
                    </div>
                    <span>Chat rooms for every purpose</span>
                    Instant workspaces without corporate borders
                </div>
            </div>
        </Container>
    </div>
);
