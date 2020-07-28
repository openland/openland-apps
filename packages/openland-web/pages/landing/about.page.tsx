import * as React from 'react';
import { AboutPage } from 'openland-landing/about.page';

const About = () => {
    return <AboutPage />;
};

About.getInitialProps = () => ({
    forceSSR: true,
});

export default About;