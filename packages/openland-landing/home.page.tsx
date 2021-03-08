import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { HomeApps } from './home/HomeApps';
import { Page } from './components/Page';
import { HomeIntro } from './home/HomeIntro';
import { HomeExceptional } from './home/HomeExceptional';
import { HomeHelp } from './home/HomeHelp';
import { canUseDOM } from 'openland-y-utils/canUseDOM';

export const HomePage = React.memo(() => {
    const sectionExceptionalRef = React.useRef<HTMLDivElement>(null);
    const sectionHelpRef = React.useRef<HTMLDivElement>(null);
    const sectionAppsRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const elementCanAnimate = (el: HTMLDivElement) => (el.className.indexOf('in-viewport') === -1) && (window.pageYOffset + window.innerHeight - 250 >= el.offsetTop);
        const handleScrollResize = () => {
            if (sectionExceptionalRef.current && elementCanAnimate(sectionExceptionalRef.current)) {
                sectionExceptionalRef.current.className += ' in-viewport';
            }
            if (sectionHelpRef.current && elementCanAnimate(sectionHelpRef.current)) {
                sectionHelpRef.current.className += ' in-viewport';
            }
            if (sectionAppsRef.current && elementCanAnimate(sectionAppsRef.current)) {
                sectionAppsRef.current.className += ' in-viewport';
            }
        };

        if (canUseDOM) {
            window.addEventListener('scroll', handleScrollResize, { passive: true });
            window.addEventListener('resize', handleScrollResize, { passive: true });

            handleScrollResize();
        }

        return () => {
            if (canUseDOM) {
                window.removeEventListener('scroll', handleScrollResize);
                window.removeEventListener('resize', handleScrollResize);
            }
        };
    }, []);

    return (
        <Page transparentHeader={true}>
            <XDocumentHead
                title="Find your community"
                titleWithoutReverse={true}
                description="Openland is a modern social network built for people, not advertisers. Join to make new friends, share stories, and do things together."
                imgUrl="https://cdn.openland.com/shared/og/og-global-2.png"
            />

            <HomeIntro />
            <HomeExceptional ref={sectionExceptionalRef} />
            <HomeHelp ref={sectionHelpRef} />
            <HomeApps ref={sectionAppsRef} />
        </Page>
    );
});
