import * as React from 'react';
import { NextPage } from 'openland-landing/next.page';

const Next = () => {
    return <NextPage />;
};

Next.getInitialProps = () => ({
    forceSSR: true,
});

export default Next;
