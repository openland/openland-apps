import { UButton } from 'openland-web/components/unicorn/UButton';
import { TextBody, TextTitle1 } from 'openland-web/utils/TextStyles';
import * as React from 'react';
import { XView } from 'react-mental';
import { showModalBox } from 'openland-x/showModalBox';
import { NewRoomForm } from './NewRoom';
import { useThemeSuffix } from 'openland-x-utils/useTheme';

export const StartRoomFragment = React.memo(() => {
    const startRoom = React.useCallback(async () => {
        showModalBox({ fullScreen: true, useTopCloser: false, hideOnEsc: false }, (ctx) => (
            <NewRoomForm ctx={ctx}/>
        ));
    }, []);
    const themeSuffix = useThemeSuffix();

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
                src={`//cdn.openland.com/shared/art/art-create-room${themeSuffix}.png`}
                srcSet={`//cdn.openland.com/shared/art/art-create-room${themeSuffix}@2x.png 2x, //cdn.openland.com/shared/art/art-create${themeSuffix}@3x.png 3x`}
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
