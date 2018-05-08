import Glamorous from 'glamorous';
import { XStreetView } from './XStreetView';
export const XStreetViewFullScreen = Glamorous(XStreetView)({
    height: 'calc(100vh - 192px)',
    width: 'calc(100vw - 128px)',
});