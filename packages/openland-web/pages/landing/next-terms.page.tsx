import * as React from 'react';
import { TermsPage } from 'openland-landing/next-terms.page';

const Terms = () => {
    return <TermsPage />;
};

Terms.getInitialProps = () => ({
    forceSSR: true,
});

export default Terms;
