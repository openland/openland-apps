import * as React from 'react';
import { Page } from './components/Page';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { css } from 'linaria';
import { Container } from './components/Container';
import { XView } from 'react-mental';
import { LandingLinks } from './components/_links';

let aboutRootClass = css`
    padding: 42px 0 13px;

    @media (max-width: 767px) {
        padding: 14px 0 5px;
    }
`;

let aboutRowClass = css`
    margin: 0 0 47px;
    display: flex;

    @media (max-width: 767px) {
        margin: 0 0 40px;
    }
    @media (max-width: 999px) {
        display: block;
    }
`;

let aboutLabelClass = css`
    color: #536086;
    padding: 3px 20px 0 0;
    font-size: 18px;
    line-height: 20px;
    font-weight: 600;
    width: 253px;

    @media (max-width: 999px) {
        padding: 0 0 15px;
        width: auto;
    }
    @media (min-width: 1000px) and (max-width: 1179px) {
        width: 215px;
    }
`;

let aboutInfoClass = css`
    margin: 13px 0 0;
    font-size: 16px;
    line-height: 22px;
    font-weight: 400;
    width: 180px;

    a {
        color: #1790ff;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }

    @media (max-width: 999px) {
        width: auto;
    }
`;

let aboutBoxClass = css`
    width: calc(100% - 253px);

    @media (max-width: 999px) {
        width: auto;
    }
    @media (min-width: 1000px) and (max-width: 1179px) {
        width: calc(100% - 215px);
    }
`;

let aboutAdditionalClass = css`
    font-style: italic;
    color: #536086;
    margin: 3px 0 0;
    font-size: 15px;
    line-height: 24px;

    a {
        color: inherit;
        text-decoration: none;
        font-weight: 600;
        display: inline-block;
        vertical-align: top;
    }
    a:hover {
        text-decoration: underline;
    }

    @media (max-width: 767px) {
        br {
            display: none;
        }
    }
`;

export default class AboutPage extends React.Component {
    render() {
        return (
            <Page>
                <XDocumentHead title="About" />
                <Container>
                    <div className={aboutRootClass}>
                        <div className={aboutRowClass}>
                            <div className={aboutLabelClass}>About Openland</div>
                            <div className={aboutBoxClass}>
                                <XView fontSize={16} lineHeight="24px">
                                    Openland is&nbsp;a&nbsp;professional messenger designed
                                    to&nbsp;support all communication needs of&nbsp;a&nbsp;modern
                                    business. It&nbsp;can be&nbsp;used for fundraising, sales,
                                    recruiting, customer service, and business operations. The
                                    company was founded in&nbsp;2017 and is&nbsp;based in&nbsp;San
                                    Francisco. Openland is&nbsp;backed by&nbsp;30&nbsp;prominent
                                    venture investors, including Y&nbsp;Combinator, Gagarin Capital,
                                    Sinai Ventures, Soma Capital, Liquid 2&nbsp;Ventures, and
                                    Rainfall Ventures.
                                </XView>
                            </div>
                        </div>
                        <div className={aboutRowClass}>
                            <div className={aboutLabelClass}>Founders</div>
                            <div className={aboutBoxClass}>Box</div>
                        </div>
                        <div className={aboutRowClass}>
                            <div className={aboutLabelClass}>
                                Open positions
                                <div className={aboutInfoClass}>
                                    Up-to-date opportunities are posted at&nbsp;
                                    <a href={LandingLinks.careers}>angel.co</a>
                                </div>
                            </div>
                            <div className={aboutBoxClass}>
                                <div className={aboutAdditionalClass}>
                                    If&nbsp;you don&rsquo;t see a&nbsp;matching opening for you
                                    or&nbsp;just want to&nbsp;say "Hi"
                                    <br /> please reach&nbsp;us at&nbsp;
                                    <a href="mailto:hello@openland.com">hello@openland.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Page>
        );
    }
}
