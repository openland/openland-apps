import * as React from 'react';
import { XView } from 'react-mental';
import { Header } from './Header';
import { Footer } from './Footer';

interface PageProps {
    transparentHeader?: boolean;
    children?: any;
}

export const Page = React.memo((props: PageProps) => (
    <XView
        overflow="hidden"
        flexDirection="column"
        width="100%"
        minHeight="100vh"
        backgroundColor="#ffffff"
        color="#1f3449"
    >
        <Header transparent={props.transparentHeader} />

        <XView flexGrow={1}>
            {props.children}
        </XView>

        <Footer />
    </XView>
));