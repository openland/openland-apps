import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from './components/TopBar';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { css } from 'linaria';
import { BackSkipLogo } from './components/BackSkipLogo';
import { getPercentageOfOnboarding } from './utils';

const backgroundClassName = css`
    background: white;
    width: 100%;
`;

export default withApp('Home', 'viewer', () => {
    return (
        <div className={backgroundClassName}>
            <XDocumentHead title="Areas of work" />
            <TopBar progressInPercents={getPercentageOfOnboarding(8)} />
            <XView marginBottom={150} marginTop={34}>
                <BackSkipLogo />
            </XView>

            <XView flexDirection="row" justifyContent="center">
                <XView flexDirection="column" alignSelf="center" alignItems="center">
                    <XView fontSize={24} marginBottom={12}>
                        Areas of work
                    </XView>
                    <XView fontSize={16} marginBottom={40}>
                        What areas have you worked on?
                    </XView>

                    <XButton text="Continue" style="primary" size="default" />
                </XView>
            </XView>
        </div>
    );
});
