import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from '../../../components/DevDocsScaffold';
import { ParcelMap } from '../../../components/ParcelMap';
import { XSwitcher } from '../../../components/X/XSwitcher';
import { withRouter } from '../../../components/withRouter';
import { MapFilters } from '../../../components/Incubator/MapComponents/MapFilters';

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
        right: '6px !important',
        zIndex: 0
    }
});

const MapSwitcher = Glamorous.div({
    position: 'absolute',
    top: 12,
    right: 16,

    display: 'flex',
    flexDirection: 'row'
});

const Shadow = Glamorous.div<{ active: boolean }>((props) => ({
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    visibility: props.active ? 'visible' : 'hidden',
    opacity: props.active ? 1 : 0,
    transition: 'all 220ms',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1
}));

class WrappedContainer extends React.Component<any, { shadowed: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            shadowed: false
        };

        this.shadowHandler = this.shadowHandler.bind(this);
    }

    shadowHandler(e: boolean) {
        this.setState({
            shadowed: e
        });
    }

    render() {
        return (
            <XMapContainer2>
                <Shadow active={this.state.shadowed} />
                <MapFilters shadowHandler={(e: boolean) => this.shadowHandler(e)} />

                <ParcelMap mode={this.props.router.query.mode} />
                <MapSwitcher>
                    <XSwitcher fieldStyle={true}>
                        <XSwitcher.Item query={{ field: 'mode' }}>Map</XSwitcher.Item>
                        <XSwitcher.Item query={{ field: 'mode', value: 'satellite' }}>Satellite</XSwitcher.Item>
                    </XSwitcher>
                </MapSwitcher>
            </XMapContainer2>
        );
    }
}

export default withApp('UI Framework - Map', 'viewer', withRouter((props) => {
    return (
        <DevDocsScaffold bottomOffset={false}>
            <WrappedContainer {...props} />
        </DevDocsScaffold>
    );
}));