import Glamorous from 'glamorous';
import { XThemeDefault } from 'openland-x/XTheme';
import { XHorizontal } from 'openland-x-layout/XHorizontal';

export const SendMessageContent = Glamorous(XHorizontal)(
    ({ fullWidth }: { fullWidth?: boolean }) => {
        return {
            width: '100%',
            maxWidth: fullWidth ? '100%' : 930,
            minWidth: fullWidth ? '100%' : 512,
            flexBasis: '100%',
            paddingLeft: fullWidth ? 0 : 97,
            paddingRight: fullWidth ? 0 : 112,
            '@media (max-width: 750px)': {
                minWidth: 0,
                paddingLeft: 0,
                paddingRight: 0,
            },
        };
    },
);

export const SendMessageWrapper = Glamorous.div<{ fullWidth?: boolean; minimal?: boolean }>(
    ({ fullWidth, minimal }) => {
        return {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            flexShrink: 0,
            marginBottom: minimal ? -6 : undefined,
            minHeight: minimal ? undefined : 114,
            backgroundColor: minimal ? undefined : XThemeDefault.backyardColor,
            paddingLeft: minimal ? 26 : fullWidth ? 32 : 16,
            paddingRight: minimal ? 0 : fullWidth ? 32 : 16,
            paddingTop: 12,
            paddingBottom: minimal ? 0 : 12,
            borderTopStyle: 'solid',
            borderTopWidth: minimal ? undefined : '1px',
            borderTopColor: minimal ? undefined : XThemeDefault.separatorColor,
        };
    },
);
