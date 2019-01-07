import * as React from 'react';
import { css } from 'linaria';
import { Container } from '../Container';
import { XButton } from 'openland-x/XButton';
import { LandingLinks } from '../_links';

let homeAccessRootClass = css`
    border-top: 1px solid rgba(237, 239, 243, 0.6);
    padding: 100px 0 110px;

    @media (max-width: 767px) {
        padding: 70px 0;
    }
    @media (min-width: 768px) and (max-width: 999px) {
        padding: 100px 0;
    }
`;

let homeAccessBoxClass = css`
    padding: 0 0 0 76px;
    position: relative;

    @media (max-width: 999px) {
        padding: 0;
        text-align: center;
    }
    @media (min-width: 1000px) and (max-width: 1179px) {
        padding-left: 50px;
    }
`;

let homeAccessTitleClass = css`
    margin: 0 0 11px;
    font-size: 32px;
    line-height: 38px;
    font-weight: 600;

    @media (max-width: 767px) {
        margin: 0 0 10px;
        font-size: 22px;
        line-height: 30px;
    }
`;

let homeAccessTextClass = css`
    color: rgba(83, 96, 134, 0.8);
    font-size: 20px;
    line-height: 24px;

    @media (max-width: 767px) {
        font-size: 16px;
        line-height: 22px;
    }
`;

let homeAccessBtnClass = css`
    width: 182px;
    position: absolute;
    top: 20px;
    right: 140px;

    @media (max-width: 767px) {
        margin: 30px auto 0;
        position: relative;
        top: auto;
        right: auto;
    }
    @media (min-width: 768px) and (max-width: 999px) {
        margin: 45px auto 0;
        position: relative;
        top: auto;
        right: auto;
    }
    @media (min-width: 1000px) and (max-width: 1179px) {
        right: 50px;
    }
`;

export const HomeAccess = () => (
    <div className={homeAccessRootClass}>
        <Container>
            <div className={homeAccessBoxClass}>
                <div className={homeAccessTitleClass}>
                    Get early access to&nbsp;Openland&nbsp;Messenger
                </div>
                <div className={homeAccessTextClass}>
                    Join founders, investors, and experts from 1000+ organizations
                </div>
                <div className={homeAccessBtnClass}>
                    <XButton
                        path={LandingLinks.signup}
                        text="Sign up for free"
                        style="primary"
                        size="large"
                    />
                </div>
            </div>
        </Container>
    </div>
);
