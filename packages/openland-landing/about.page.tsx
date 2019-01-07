import * as React from 'react';
import { Page } from './components/Page';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Container } from './components/Container';
import { XView } from 'react-mental';
import { LandingLinks } from './components/_links';
import { AboutStyles } from './components/about/styles';
import { Founders } from './components/about/Founders';

export default class AboutPage extends React.Component {
    render() {
        return (
            <Page>
                <XDocumentHead
                    title="About"
                    titleWithoutReverse={true}
                    description="Openland is a professional messenger designed to support all communication needs of a modern business. It can be used for fundraising, sales, recruiting, customer service, and business operations. The company is backed by 30 prominent venture investors, including Y Combinator, Gagarin Capital, Sinai Ventures, Soma Capital, Liquid 2 Ventures, and Rainfall Ventures."
                />
                <Container>
                    <div className={AboutStyles.root}>
                        <div className={AboutStyles.row}>
                            <div className={AboutStyles.label}>About Openland</div>
                            <div className={AboutStyles.box}>
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
                        <div className={AboutStyles.row}>
                            <div className={AboutStyles.label}>Founders</div>
                            <div className={AboutStyles.box}>
                                <Founders />
                            </div>
                        </div>
                        <div className={AboutStyles.row}>
                            <div className={AboutStyles.label}>
                                Open positions
                                <div className={AboutStyles.info}>
                                    Up-to-date opportunities are posted at&nbsp;
                                    <a href={LandingLinks.careers}>angel.co</a>
                                </div>
                            </div>
                            <div className={AboutStyles.box}>
                                <div className={AboutStyles.additional}>
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
