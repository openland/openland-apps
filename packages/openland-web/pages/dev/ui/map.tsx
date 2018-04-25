import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from '../../../components/DevDocsScaffold';
import { ParcelMap } from '../../../components/ParcelMap';
import { XSwitcher } from '../../../components/X/XSwitcher';
import { withRouter } from '../../../components/withRouter';

const XMapContainer2 = Glamorous.div({
    position: 'relative',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: '100vh',
    // alignItems: 'stretch',
    // height: '100%'
    '& .mapboxgl-ctrl-top-right': {
        top: '65px !important',
        right: '6px !important'
    }
});

const MapSwitcher = Glamorous.div({
    position: 'absolute',
    top: 12,
    right: 16,

    display: 'flex',
    flexDirection: 'row'
});

export default withApp('UI Framework - Map', 'viewer', withRouter((props) => {
    return (
        <DevDocsScaffold title={'Map'} bottomOffset={false}>
            <XMapContainer2>
            <ParcelMap mode={props.router.query.mode} />
            <MapSwitcher>
                <XSwitcher fieldStyle={true}>
                    <XSwitcher.Item query={{ field: 'mode' }}>Map</XSwitcher.Item>
                    <XSwitcher.Item query={{ field: 'mode', value: 'satellite' }}>Satellite</XSwitcher.Item>
                </XSwitcher>
            </MapSwitcher>
            </XMapContainer2>
        </DevDocsScaffold>

    );
}));