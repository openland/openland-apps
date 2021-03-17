import { useClient } from 'openland-api/useClient';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { TextBody, TextTitle1 } from 'openland-web/utils/TextStyles';
import * as React from 'react';
import { XView, XViewRouterContext } from 'react-mental';

export const StartRoomFragment = React.memo(() => {
    const client = useClient();
    const router = React.useContext(XViewRouterContext)!;
    const startRoom = React.useCallback(async () => {
        const room = (await client.mutateVoiceChatCreate({ input: { title: 'Hi' } })).voiceChatCreate;
        router.navigate(`/rooms/${room.id}`);
    }, []);
    return (
        <XView
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
            backgroundColor="var(--backgroundPrimary)"
        >
            <img
                width="320"
                height="200"
                src="//cdn.openland.com/shared/art/art-create.png"
                srcSet="//cdn.openland.com/shared/art/art-create@2x.png 2x, //cdn.openland.com/shared/art/art-create@3x.png 3x"
                alt="Pick a room on the left"
            />
            <XView marginTop={16} color="var(--foregroundPrimary)">
                <h2 className={TextTitle1}>Pick a room on the left</h2>
            </XView>
            <XView marginTop={8} color="var(--foregroundSecondary)">
                <p className={TextBody}>Or start your own</p>
            </XView>
            <XView marginTop={32} justifyContent="center" flexDirection="row">
                <UButton text="Start room" size="large" onClick={startRoom} />
            </XView>
        </XView>
    );
});
