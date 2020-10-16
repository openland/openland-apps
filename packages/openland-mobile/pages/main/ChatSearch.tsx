import React from 'react';

import { SSearchControler } from 'react-native-s/SSearchController';
import { SRouter } from 'react-native-s/SRouter';
import { withApp } from 'openland-mobile/components/withApp';

import { ChatSearchView } from 'openland-mobile/pages/main/components/ChatSearchView';

const SearchQueryContext = React.createContext<string>('');

const ChatSearchComponent = React.memo<{ router: SRouter }>(({ router }) => {
    return (
        <SSearchControler
            searchRender={({ query }) => (
                <SearchQueryContext.Provider value={query}>
                    <ChatSearchView
                        query={query}
                        router={router}
                    />
                </SearchQueryContext.Provider>
            )}
            openOnMount={true}
            onSearchClose={() => router.back()}
        />
    );
});

export const ChatSearch = withApp(ChatSearchComponent);