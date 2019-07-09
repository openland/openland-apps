import * as React from 'react';
import { XView } from 'react-mental';
import { Header } from './Header';
import { Footer } from './Footer';
import { css } from 'linaria';
import { MobileCustomPromo } from './MobileCustomPromo';
import { XScrollView3 } from 'openland-x/XScrollView3';

let pageBorderClass = css`
    background-color: rgba(237, 239, 243, 0.6);
    height: 1px;

    @media (max-width: 767px) {
        display: none;
    }
`;

interface PageProps {
    withBorder?: boolean;
    children?: any;
}

export const Page = (props: PageProps) => (
    <XView
        overflow="hidden"
        flexDirection="column"
        width="100vw"
        backgroundColor="#ffffff"
        color="#1f3449"
    >
        <XScrollView3 flexGrow={1} height="100vh">
            <MobileCustomPromo />
            <Header />
            {props.withBorder && <div className={pageBorderClass} />}
            <XView flexGrow={1}>{props.children}</XView>
            <Footer />
        </XScrollView3>
    </XView>
);
