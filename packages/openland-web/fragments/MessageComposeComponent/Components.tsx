import Glamorous from 'glamorous';
import { XThemeDefault } from 'openland-x/XTheme';
import { XHorizontal } from 'openland-x-layout/XHorizontal';

export const SendMessageContent = Glamorous(XHorizontal)(
    ({ fullWidth }: { fullWidth?: boolean }) => {
        return {
            width: '100%',
            maxWidth: fullWidth ? '100%' : 930,
            minWidth: 512,
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

export const SendMessageWrapper = Glamorous.div<{ fullWidth?: boolean }>(({ fullWidth }) => {
    return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        flexShrink: 0,
        minHeight: 114,
        backgroundColor: XThemeDefault.backyardColor,
        paddingLeft: fullWidth ? 32 : 16,
        paddingRight: fullWidth ? 32 : 16,
        paddingTop: 12,
        paddingBottom: 12,
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: XThemeDefault.separatorColor,
    };
});
