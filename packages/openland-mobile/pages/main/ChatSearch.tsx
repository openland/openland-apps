import React from 'react';

import { SSearchControler } from 'react-native-s/SSearchController';
import { SRouter } from 'react-native-s/SRouter';
import { withApp } from 'openland-mobile/components/withApp';

import { ChatSearchView } from 'openland-mobile/pages/main/components/ChatSearchView';

const ChatSearchComponent = React.memo<{ router: SRouter }>(({ router }) => {
    return (
        <SSearchControler
            searchRender={({ query }) => (
                <ChatSearchView
                    query={query}
                    router={router}
                />
            )}
            openOnMount={true}
            onSearchClose={() => router.back()}
        />
    );
});

export const ChatSearch = withApp(ChatSearchComponent);