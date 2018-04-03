import Glamorous from 'glamorous';
import { XStreetView } from './XStreetView';

export const XCardStreetView = Glamorous(XStreetView)({
    height: '480px',
});

export const XCardStreetViewFullScreen = Glamorous(XStreetView)({
    height: 'calc(100vh - 192px)',
    width: 'calc(100vw - 128px)',
});