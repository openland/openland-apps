import React from 'react';
import { SRouter } from 'react-native-s/SRouter';

import { withApp } from 'openland-mobile/components/withApp';
import { ChatSearchView } from 'openland-mobile/pages/main/components/ChatSearchView';
import { ChatSearchController } from 'openland-mobile/components/ChatSearchController';

const ChatSearchComponent = React.memo<{ router: SRouter }>(({ router }) => {
    return (
        <ChatSearchController
            searchRender={({ query }) => <ChatSearchView query={query} router={router} />}
            openOnMount={true}
            initialValue={router.params.initialValue}
            onSearchClose={router.back}
        />
    );
});

export const ChatSearch = withApp(ChatSearchComponent);
