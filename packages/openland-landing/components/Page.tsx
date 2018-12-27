import * as React from 'react';
import { XView } from 'react-mental';
import { Header } from './Header';
import { Footer } from './Footer';

interface PageProps {
    children?: any;
}

export const Page = (props: PageProps) => (
    <XView overflow="hidden" flexDirection="column" minHeight="100vh">
        <Header />
        <XView flexGrow={1}>{props.children}</XView>
        <Footer />
    </XView>
);
