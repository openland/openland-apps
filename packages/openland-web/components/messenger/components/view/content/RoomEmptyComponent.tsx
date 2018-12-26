import * as React from 'react';
import { XView } from 'react-mental';

export const EmptyComponent = React.memo(() => (
    <XView
        position="relative"
        paddingVertical={30}
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
    >
        <XView flexDirection="column" justifyContent="center" alignItems="center" flexShrink={0}>
            <XView
                backgroundImage="url('/static/X/messenger/channels-explore-empty.svg')"
                backgroundRepeat="no-repeat"
                width={329}
                height={329}
            />
            <XView fontSize={16} fontWeight="600" lineHeight={1.5} color="#99a2b0" marginTop={44}>
                No room matches your search
            </XView>
        </XView>
    </XView>
));
