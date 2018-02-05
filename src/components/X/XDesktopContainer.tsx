import Glamorous from 'glamorous';
import { XVertical } from './XVertical';
import { Layout } from './_Layout';

export let XDesktopContainer = Glamorous(XVertical)({
    display: 'flex',
    [Layout.SMMinus]: {
        display: 'none',
    }
})