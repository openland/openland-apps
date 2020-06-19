import * as React from 'react';
import { HomePage } from 'openland-landing/new/home.page';

const Home = () => {
    return <HomePage />;
};

Home.getInitialProps = () => ({
    forceSSR: true,
});

export default Home;
