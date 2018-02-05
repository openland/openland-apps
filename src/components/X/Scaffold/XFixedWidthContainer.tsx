import Glamorous from 'glamorous';
import { Layout } from '../_Layout';

export let XFixedWidthContainer = Glamorous.div({
    minWidth: 320,
    [Layout.XS]: { width: '100%' },
    [Layout.SM]: { width: 768 },
    [Layout.MD]: { width: 960 },
    [Layout.LG]: { width: 1056 },
    [Layout.XLG]: { width: 1248 },
});