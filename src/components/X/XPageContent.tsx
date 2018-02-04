import Glamorous from 'glamorous';
import { Layout } from './_Layout';

export let XPageContent = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,

    paddingTop: 32,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 75,

    position: 'relative',

    minWidth: 320,
    [Layout.XS]: { width: '100%' },
    [Layout.SM]: { width: 768 },
    [Layout.MD]: { width: 960 },
    [Layout.LG]: { width: 1056 },
    [Layout.XLG]: { width: 1248 },
});