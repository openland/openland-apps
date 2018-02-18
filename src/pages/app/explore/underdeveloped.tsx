import * as React from 'react';
import { withApp } from '../../../components/App/withApp';
import { AppContentMap } from '../../../components/App/AppContentMap';
import { XMapLayer } from '../../../components/X/XMapLayer';
import { ParcelCard } from '../../../components/ParcelCard';
import { ParcelTileSource, BlockTileSource } from '../../../api';

let query = { '$and': [{ 'stories': { 'gt': 1, 'lte': 2 } }, { 'zone': 'NC-3' }] };

class ParcelCollection extends React.Component<{}, { selected?: string }> {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <>
                <ParcelTileSource layer="parcels" minZoom={16} />
                <BlockTileSource layer="blocks" minZoom={12} />
                <ParcelTileSource layer="parcels-found" query={query} />
                <XMapLayer
                    source="parcels"
                    layer="parcels"
                    minZoom={16}
                    flyOnClick={true}
                    onClick={(v) => this.setState({ selected: v })}
                    selectedId={this.state.selected}
                />
                <XMapLayer
                    source="parcels-found"
                    layer="parcels-found"
                    flyOnClick={true}
                    style={{
                        fillColor: '#ff0000',
                        fillOpacity: 1,
                        borderColor: '#ff0000',
                        borderOpacity: 1
                    }}
                />
                <XMapLayer
                    source="blocks"
                    layer="blocks"
                    minZoom={12}
                    maxZoom={16}
                    flyOnClick={true}
                    style={{
                        fillOpacity: 0.01,
                        borderOpacity: 0.02
                    }}
                />
                {this.state.selected && <ParcelCard parcelId={this.state.selected} />}
            </>
        )
    }
}

export default withApp((props) => {
    return (
        <AppContentMap>
            <ParcelCollection />
        </AppContentMap>
    )
})