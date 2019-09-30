import * as React from 'react';
// import { XViewRouterContext } from 'react-mental';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UHeader } from 'openland-unicorn/UHeader';
// import { useClient } from 'openland-web/utils/useClient';

const MatchmakingComponent = React.memo(() => {
    // const client = useClient();

    return (
        <div>plomba</div>
    );
});

export const MatchmakingFragment = React.memo(() => {
    // const router = React.useContext(XViewRouterContext)!;
    const unicorn = useUnicorn();

    // const roomId = unicorn.query.roomId;
    // const askId = unicorn.query.res;

    // console.log(roomId, askId);

    return (
        <>
            <UHeader title="Matchmaking" appearance="wide" />
            <MatchmakingComponent />
        </>
    );
});