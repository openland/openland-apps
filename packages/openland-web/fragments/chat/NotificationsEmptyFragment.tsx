import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { useThemeSuffix } from 'openland-x-utils/useTheme';
import { useWithHeight } from 'openland-web/hooks/useWithWidth';
import { TextStyles } from 'openland-web/utils/TextStyles';

const textWrapper = css`
    text-align: center;
`;

interface MessengerEmptyFragmentProps {
    text?: string;
}

export const NotificationsEmptyFragment = React.memo((props: MessengerEmptyFragmentProps) => {
    const { text } = props;
    const themeSuffix = useThemeSuffix();
    const [windowHeight] = useWithHeight();

    return (
        <XView
            position="relative"
            flexDirection="column"
            justifyContent="center"
            width="100%"
            height="100%"
            flexGrow={1}
            paddingTop={28}
            paddingLeft={28}
            paddingBottom={28}
            paddingRight={28}
            flexShrink={0}
        >
            <XView
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                alignSelf="center"
                zIndex={1}
                height={windowHeight! - 160}
            >
                <img
                    width="320"
                    height="200"
                    src={`//cdn.openland.com/shared/art/art-notifications-off${themeSuffix}.png`}
                    srcSet={`//cdn.openland.com/shared/art/art-notifications-off${themeSuffix}@2x.png 2x, //cdn.openland.com/shared/art/art-notifications-off${themeSuffix}@3x.png 3x`}
                    alt=""
                />
                <XView marginTop={16} marginBottom={16} {...TextStyles.Title1}>
                    No notifications yet
                </XView>
                <XView fontSize={16} lineHeight="24px" color="var(--foregroundSecondary)" marginBottom={32}>
                    <span className={textWrapper}>
                        {text || 'Select a chat to start messaging'}
                    </span>
                </XView>
            </XView>
        </XView>
    );
});
