import * as React from 'react';
import { PrivacyPage } from 'openland-landing/privacy.page';

const Privacy = () => {
    return <PrivacyPage />;
};

Privacy.getInitialProps = () => ({
    forceSSR: true,
});

export default Privacy;
