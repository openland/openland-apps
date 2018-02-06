import Glamorous from 'glamorous';
import { Layout } from './_Layout';

export let XDesktopContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    [Layout.SMMinus]: {
        display: 'none',
    }
})