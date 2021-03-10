import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { Header } from './Header';
import { Footer } from './Footer';

const page = css`
    overflow: hidden;
    width: 100%;
    min-height: 100vh;
    background-color: var(--backgroundPrimary);
    color: var(--foregroundPrimary);
`;

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
        <div className={cx(page, 'x landing')}>
            <Header transparent={props.transparentHeader} />
            <XView flexGrow={1}>{props.children}</XView>
            <Footer />
        </div>
    );
});
