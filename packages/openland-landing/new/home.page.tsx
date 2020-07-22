import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { HomeApps } from './home/HomeApps';
import { Page } from './components/Page';
import { HomeIntro } from './home/HomeIntro';
import { HomeWhy } from './home/HomeWhy';
import { HomeExceptional } from './home/HomeExceptional';
import { HomeHelp } from './home/HomeHelp';
import { canUseDOM } from 'openland-y-utils/canUseDOM';

export const HomePage = React.memo(() => {
    const sectionIntroRef = React.useRef<HTMLDivElement>(null);
    const sectionWhyRef = React.useRef<HTMLDivElement>(null);
    const sectionExceptionalRef = React.useRef<HTMLDivElement>(null);
    const sectionHelpRef = React.useRef<HTMLDivElement>(null);
    const sectionAppsRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const elementCanAnimate = (el: HTMLDivElement) => (el.className.indexOf('in-viewport') === -1) && (window.pageYOffset + window.innerHeight - 250 >= el.offsetTop);
        const handleScrollResize = () => {
            if (sectionIntroRef.current && elementCanAnimate(sectionIntroRef.current)) {
                sectionIntroRef.current.className += ' in-viewport';
            }
            if (sectionWhyRef.current && elementCanAnimate(sectionWhyRef.current)) {
                sectionWhyRef.current.className += ' in-viewport';
            }
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
                title="Inspiring chat communities"
                titleWithoutReverse={true}
                description="Discover and join communities for your industry, role, skills, interests, and location."
                imgUrl="https://cdn.openland.com/shared/og/og-global-2.png"
            />

            <HomeIntro ref={sectionIntroRef} />
            <HomeWhy ref={sectionWhyRef} />
            <HomeExceptional ref={sectionExceptionalRef} />
            <HomeHelp ref={sectionHelpRef} />
            <HomeApps ref={sectionAppsRef} />
        </Page>
    );
});