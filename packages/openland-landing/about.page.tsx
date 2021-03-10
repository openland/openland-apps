import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Founders } from './internal/Founders';
import { Email } from './internal/Email';
import { Page } from './components/Page';
import { ChatWithUs } from './internal/ChatWithUs';
import { Container } from './components/Container';
import { css } from 'linaria';

const box = css`
    padding: 80px 0 149px;

    @media (min-width: 768px) and (max-width: 1199px) {
        padding: 80px 0 90px;
    }

    @media (max-width: 767px) {
        padding: 36px 0 60px;
    }
`;

const heading = css`
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
    margin: 0 0 24px;
    color: var(--foregroundSecondary);

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 24px;
        line-height: 32px;
        margin: 0 0 24px;
    }

    @media (max-width: 767px) {
        font-size: 20px;
        line-height: 28px;
        margin: 0 0 16px;
    }
`;

const subheading = css`
    font-weight: 700;
    font-size: 64px;
    line-height: 52px;
    text-align: center;
    margin: 0 0 40px;

    @media (min-width: 768px) and (max-width: 1199px) {
        font-size: 58px;
        line-height: 52px;
    }

    @media (max-width: 767px) {
        font-size: 46px;
        line-height: 48px;
        margin: 0 0 20px;
    }
`;

const text = css`
    font-size: 22px;
    line-height: 36px;
    margin: 0 0 12px;

    &:last-of-type {
        margin: 0;
    }

    @media (max-width: 767px) {
        font-size: 16px;
        line-height: 26px;
    }
`;

const hero = css`
    background: linear-gradient(180deg, #F7F8F9 0%, #F7F8F9 100%);
    height: 262px;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    @media (max-width: 767px) {
        height: 162px;
    }

    img {
        display: block;
        width: 375px; height: 190px;

        @media (max-width: 767px) {
            width: 259px; height: 131px;
        }
    }
`;

export const AboutPage = React.memo(() => (
    <Page>
        <XDocumentHead title="About Openland" disableBranding={true} />

        <div className={hero}>
            <img
                src="https://cdn.openland.com/shared/landing/start/about-hero.png"
                srcSet="https://cdn.openland.com/shared/landing/start/about-hero@2x.png 2x"
                alt=""
            />
        </div>

        <Container isSmall={true}>
            <div className={box}>
                <div className={heading}>About Openland</div>
                <div className={subheading}>Building the future of social</div>
                <div>
                    <div className={text}>
                        Openland is a modern social network built around voice chats. It is focused on fundamental human needs: making new friends and safe self-expression. Openland is a home for some of the most active and supportive voice-and-chat communities on the Internet. Anyone can start and grow their own community on Openland, for free.
                    </div>
                    <div className={text}>
                        Openland was founded in 2017 and is based in San Francisco. The company is backed by 30 prominent venture investors, including Y Combinator, Gagarin Capital, Sinai Ventures, Soma Capital, Liquid 2 Ventures, and Rainfall Ventures.
                    </div>
                </div>

                <Founders />
            </div>
        </Container>

        <ChatWithUs />
        <Email />
    </Page>
));
