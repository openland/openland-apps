import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Founders } from './internal/Founders';
import { Email } from './internal/Email';
import { Page } from './components/Page';
import { ChatWithUs } from './internal/ChatWithUs';
import { Container } from './components/Container';
import { css } from 'linaria';

const box = css`
    padding: 112px 0 149px;

    @media (min-width: 768px) and (max-width: 1199px) {
        padding: 70px 0 90px;
    }

    @media (max-width: 767px) {
        padding: 20px 0 60px;
    }
`;

const heading = css`
    font-weight: 800;
    font-size: 84px;
    line-height: 100px;
    text-align: center;
    margin: 0 0 20px;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 62px;
        line-height: 66px;
        margin: 0 0 14px;
    }

    @media (max-width: 767px) {
        font-size: 46px;
        line-height: 46px;
        margin: 0 0 14px;
    }
`;

const subheading = css`
    font-weight: 600;
    font-size: 34px;
    line-height: 52px;
    text-align: center;
    margin: 0 0 40px;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 28px;
        line-height: 46px;
        margin: 0 0 26px;
    }

    @media (max-width: 767px) {
        font-size: 22px;
        line-height: 30px;
        margin: 0 0 20px;
    }
`;

const text = css`
    font-size: 24px;
    line-height: 40px;
    margin: 0 0 12px;

    &:last-of-type {
        margin: 0;
    }

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 20px;
        line-height: 34px;
        margin: 0 0 10px;
    }

    @media (max-width: 767px) {
        font-size: 16px;
        line-height: 28px;
    }
`;

export const AboutPage = React.memo(() => (
    <Page transparentHeader={true}>
        <XDocumentHead title="About Openland" disableBranding={true} />

        <Container isSmall={true}>
            <div className={box}>
                <div className={heading}>About Openland</div>
                <div className={subheading}>Building the future of social</div>
                <div>
                    <div className={text}>
                        Openland is a modern platform for chat communities. Anyone can start a community as a simple chat and add more activies as it grows. Openland provides tools for sharing and organizing community knowledge and connecting community members via 1-1 introductions.
                    </div>
                    <div className={text}>
                        The company was founded in 2017 and is based in San Francisco. Openland is backed by 30 prominent venture investors, including Y Combinator, Gagarin Capital, Sinai Ventures, Soma Capital, Liquid 2 Ventures, and Rainfall Ventures.
                    </div>
                </div>

                <Founders />
            </div>
        </Container>

        <ChatWithUs />
        <Email />
    </Page>
));
