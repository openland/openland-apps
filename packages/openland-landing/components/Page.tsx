import * as React from 'react';
import { XView } from 'react-mental';
import { Header } from './Header';
import { Footer } from './Footer';

interface PageProps {
    transparentHeader?: boolean;
    children?: any;
}

export const Page = React.memo((props: PageProps) => {
    React.useEffect(() => {
        document.documentElement.classList.add('landing');

        return () => {
            document.documentElement.classList.remove('landing');
        };
    }, []);

    return (
        <XView
            overflow="hidden"
            flexDirection="column"
            width="100%"
            minHeight="100vh"
            backgroundColor="var(--backgroundPrimary)"
            color="var(--foregroundPrimary)"
        >
            <Header transparent={props.transparentHeader} />

            <XView flexGrow={1}>
                {props.children}
            </XView>

            <Footer />
        </XView>
    );
});