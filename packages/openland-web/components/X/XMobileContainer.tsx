import Glamorous from 'glamorous';
import { XVertical } from './XVertical';
import { Layout } from './_Layout';

export let XMobileContainer = Glamorous(XVertical)({
    display: 'none',
    [Layout.SMMinus]: {
        display: 'flex',
    }
});