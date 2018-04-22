import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withRouter } from '../../../components/withRouter';
import { XHead } from '../../../components/X/XHead';
import { Scaffold } from '../../../components/Scaffold';
import { ProspectingNavigationMap } from '../../../components/ProspectingNavigation';
import { XMap } from '../../../components/X/XMap';
import { SourcingTileSource } from '../../../api';
import { XMapPointLayer } from '../../../components/X/XMapPointLayer';
import { XMapPolygonLayer } from '../../../components/X/XMapPolygonLayer';

class ProspectingMap extends React.Component<{}, {}> {
    render() {
        return (
            <XMap
                mapStyle="mapbox://styles/mapbox/light-v9"
                focusPosition={{ latitude: 40.713919, longitude: -74.002332, zoom: 12 }}
            >
                <SourcingTileSource
                    layer="sourcing"
                    minZoom={12}
                />
                {/* <XMapPolygonLayer
                    source="sourcing"
                    layer="sourcing"
                    style={{
                        selectedFillOpacity: 0,
                        selectedBorderColor: '#4428E1',
                        selectedBorderWidth: 8,
                        selectedBorderOpacity: 1
                    }}
                    minZoom={16}
                    flyOnClick={true}
                    // onClick={this.handleClick}
                    // selectedId={this.props.router.query!!.selectedParcel}
                    flyToMaxZoom={18}
                /> */}
                <XMapPointLayer
                    source="sourcing"
                    layer="sourcing"
                />
            </XMap>
        );
    }
}

export default withApp('Prospecting Map', 'viewer', withRouter((props) => {
    return (
        <>
            <XHead title={['Prospecting Map']} />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <ProspectingNavigationMap />
                    <ProspectingMap />
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));