import * as React from 'react';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView } from 'openland-x/XScrollView';
import { ClientCacheProvider } from 'openland-graphql/ClientCache';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { XLoadingCircular } from 'openland-x/XLoadingCircular';

const bg = css`
    display: flex;
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;
    flex-direction: column;
    background-image: url('https://cdn.openland.com/shared/apps/tasks-bg.jpg');
    background-size: cover;
`;

const AppLoader = () => {
    return (
        <XView position="absolute" top={0} left={0} right={0} bottom={0} alignItems="center" justifyContent="center">
            <XLoadingCircular color="#fff" />
        </XView>
    )
}

export const AppContainer = React.memo<{ children?: any }>((props) => {
    return (
        <div className={bg} >
            <ClientCacheProvider>
                <React.Suspense fallback={<AppLoader />}>
                    <XScrollView flexGrow={1}>
                        {props.children}
                    </XScrollView>
                </React.Suspense>
            </ClientCacheProvider>
        </div>
    );
});