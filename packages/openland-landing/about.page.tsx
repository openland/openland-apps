import * as React from 'react';
import { Page } from './components/Page';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { css } from 'linaria';
import { Container } from './components/Container';

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

export default class AboutPage extends React.Component {
    render() {
        return (
            <Page>
                <XDocumentHead title="About" />
                <Container>
                    <div className={aboutRootClass}>
                        <div className={aboutRowClass}>
                            <div className={aboutLabelClass}>About Openland</div>
                        </div>
                        <div className={aboutRowClass}>
                            <div className={aboutLabelClass}>Founders</div>
                        </div>
                        <div className={aboutRowClass}>
                            <div className={aboutLabelClass}>Open positions</div>
                        </div>
                    </div>
                </Container>
            </Page>
        );
    }
}
