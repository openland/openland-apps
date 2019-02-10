import Glamorous from 'glamorous';
import { XThemeDefault } from 'openland-x/XTheme';
import { XHorizontal } from 'openland-x-layout/XHorizontal';

export const SendMessageContent = Glamorous(XHorizontal)({
    width: '100%',
    maxWidth: 930,
    minWidth: 512,
    flexBasis: '100%',
    paddingLeft: 97,
    paddingRight: 112,
    '@media (max-width: 750px)': {
        minWidth: 0,
        paddingLeft: 0,
        paddingRight: 0,
    },
});

export const SendMessageWrapper = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    flexShrink: 0,
    minHeight: 114,
    backgroundColor: XThemeDefault.backyardColor,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
    borderTopColor: XThemeDefault.separatorColor,
});
