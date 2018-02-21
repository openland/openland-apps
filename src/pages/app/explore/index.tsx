import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/App/withApp';
import { AppContentMap } from '../../../components/App/AppContentMap';
import { XMapPolygonLayer } from '../../../components/X/XMapPolygonLayer';
import { XCard } from '../../../components/X/XCard';
import { XSelect } from '../../../components/X/XSelect';
import { ParcelCard } from '../../../components/ParcelCard';
import { ParcelTileSource, BlockTileSource, ParcelPointSource } from '../../../api';
import { XButton } from '../../../components/X/XButton';
import { XMapPointLayer } from '../../../components/X/XMapPointLayer';
import { XMap } from '../../../components/X/XMap';
import { XHead } from '../../../components/X/XHead';
import { XHorizontal } from '../../../components/X/XHorizontal';
import { XPopover } from '../../../components/X/XPopover';
import { XMenu } from '../../../components/X/XMenu';
import { XVertical } from '../../../components/X/XVertical';

const FilterSelector = Glamorous(XSelect)({
    width: '140px'
})

const FilterContainer = Glamorous(XCard)({
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: 60,
    left: 264,
    zIndex: 1,
    padding: 16,
    pointerEvents: 'auto',
    // backgroundColor: 'rgb(245, 246, 248)',
    // '& > div > div > span': {
    //     display: 'block',
    //     marginBottom: 3
    // }
})

const AllZones = ['NC-1', 'NC-3']

class ParcelCollection extends React.Component<{}, { selected?: string, zones?: any, stories?: any, currentUse?: any, query?: any }> {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    handleZonesChange = (src: any) => {
        this.setState({ zones: src });
    }

    handleCurrentUseChange = (src: any) => {
        this.setState({ currentUse: src });
    }

    handleStoriesChange = (src: any) => {
        this.setState({ stories: src });
    }

    handleUpdate = (e: any) => {
        e.preventDefault();
        if ((this.state.zones && this.state.zones.value) || (this.state.stories && this.state.stories.value) || (this.state.currentUse && this.state.currentUse.value)) {
            let clauses: any[] = [];
            if (this.state.zones && this.state.zones.value) {
                clauses.push({ 'zone': this.state.zones.value })
            }
            if (this.state.stories && this.state.stories.value) {
                clauses.push({ 'stories': this.state.stories.value })
            }
            if (this.state.currentUse && this.state.currentUse.value) {
                clauses.push({ 'currentUse': this.state.currentUse.value })
            }
            let query = { '$and': clauses };
            this.setState({ query: query });
        } else {
            this.setState({ query: undefined });
        }
    }

    // mapbox://styles/mapbox/light-v9
    // mapbox://styles/steve-kite/cjcsbw6zq00dg2squfjuum14i

    render() {
        return (
            <AppContentMap>
                <AppContentMap.Item>
                    <XPopover placement="bottom-end">
                        <XPopover.Target>
                            <XButton>Filter</XButton>
                        </XPopover.Target>
                        <XPopover.Content>
                            <XMenu>
                                <XVertical>
                                    <FilterSelector
                                        name="zoning-field"
                                        value={this.state.zones}
                                        options={AllZones.map((v) => ({ value: v, label: v }))}
                                        onChange={this.handleZonesChange}
                                        placeholder="Zoning"
                                    />
                                    <FilterSelector
                                        name="address-field"
                                        value={this.state.stories}
                                        options={[
                                            { value: '0', label: 'no stories' },
                                            { value: '1', label: '1 story' },
                                            { value: '2', label: '2 stories' },
                                            { value: '3', label: '3 stories' },
                                            { value: '4', label: '4 stories' }]}
                                        onChange={this.handleStoriesChange}
                                        placeholder="Stories"
                                    />
                                    <FilterSelector
                                        name="current-field"
                                        value={this.state.currentUse}
                                        options={[{ value: 'PARKING', label: 'Parking' }, { value: 'STORAGE', label: 'Storage' }]}
                                        onChange={this.handleCurrentUseChange}
                                        placeholder="Current Use"
                                    />
                                    <XButton onClick={this.handleUpdate} alignSelf="center">Apply</XButton>
                                </XVertical>
                            </XMenu>
                        </XPopover.Content>
                    </XPopover>
                    {/* <XButton>Filter</XButton> */}
                </AppContentMap.Item>
                <XMap mapStyle={'mapbox://styles/mapbox/light-v9'}>
                    <ParcelTileSource layer="parcels" minZoom={16} />
                    <BlockTileSource layer="blocks" minZoom={12} />
                    <XMapPolygonLayer
                        source="parcels"
                        layer="parcels"
                        minZoom={16}
                        flyOnClick={true}
                        onClick={(v) => this.setState({ selected: v })}
                        selectedId={this.state.selected}
                        flyToPadding={{
                            left: 140,
                            right: 140,
                            top: 100,
                            bottom: 400
                        }}
                        flyToMaxZoom={18}
                    />
                    <XMapPolygonLayer
                        source="blocks"
                        layer="blocks"
                        minZoom={12}
                        maxZoom={16}
                        style={{
                            fillOpacity: 0.1,
                            borderOpacity: 0.3
                        }}
                    />
                    <ParcelPointSource layer="parcels-found" query={this.state.query} minZoom={12} skip={this.state.query === undefined} />
                    <XMapPointLayer source="parcels-found" layer="parcels-found" />

                    {this.state.selected && <ParcelCard parcelId={this.state.selected} />}
                </XMap>
            </AppContentMap>
        )
    }
}

export default withApp((props) => {
    return (
        <>
            <XHead title={['Statecraft', 'Explore']} />
            <ParcelCollection />
        </>
    )
});