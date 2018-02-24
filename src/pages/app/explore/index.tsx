import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/App/withApp';
import { AppContentMap } from '../../../components/App/AppContentMap';
import { XMapPolygonLayer } from '../../../components/X/XMapPolygonLayer';
import { XSelect } from '../../../components/X/XSelect';
import { ParcelCard } from '../../../components/ParcelCard';
import { ParcelTileSource, BlockTileSource, ParcelPointSource } from '../../../api';
import { XButton } from '../../../components/X/XButton';
import { XMapPointLayer } from '../../../components/X/XMapPointLayer';
import { XMap } from '../../../components/X/XMap';
import { XHead } from '../../../components/X/XHead';
import { XPopover } from '../../../components/X/XPopover';
import { XMenu } from '../../../components/X/XMenu';
import { XVertical } from '../../../components/X/XVertical';
import { RouterState, withRouter } from '../../../utils/withRouter';
import { XSwitcher } from '../../../components/X/XSwitcher';
// import { XHorizontal } from '../../../components/X/XHorizontal';

const XMapContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    height: '100vh'
})

const XMapContainer2 = Glamorous.div({
    position: 'relative',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: '100vh'
    // alignItems: 'stretch',
    // height: '100%'
})

const MapSwitcher = Glamorous.div({
    position: 'absolute',
    top: 16,
    right: 16,

    display: 'flex',
    flexDirection: 'row'
})

const FilterSelector = Glamorous(XSelect)({
    width: '140px'
})

let AllZones = ['P',
    'RH-1(D)',
    'RH-1',
    'RH-1(S)',
    'RH-2',
    'RH-3',
    'RM-1',
    'RM-2',
    'RM-3',
    'RM-4',
    'RC-3',
    'RC-4',
    'RTO',
    'RTO-M',
    'RH DTR',
    'SB-DTR',
    'TB DTR',
    'NC-1',
    'NC-2',
    'NC-3',
    'NC-S',
    'NCD',
    'SPD',
    'RED',
    'RED-MX',
    'RSD',
    'SLR',
    'SLI',
    'SALI',
    'SSO',
    'MUG',
    'WMUG',
    'MUO',
    'WMUO',
    'MUR',
    'UMU',
    'RCD',
    'C-2',
    'C-3-S',
    'C-3-R',
    'C-3-G',
    'C-3-O',
    'C-3-O(S)',
    'MB-OS',
    'MB-O',
    'MB-RA',
    'HP-RA',
    'NCT-1',
    'NCT-2',
    'NCT-3',
    'NCT',
    'M-1',
    'M-2',
    'PDR-1-B',
    'PDR-1-D',
    'PDR-1-G',
    'PDR-2',
    'CRNC',
    'CVR',
    'CCB',
    'PM-MU1',
    'PM-MU2',
    'PM-S',
    'PM-CF',
    'PM-OS',
    'PM-R'
];

class ParcelCollection extends React.Component<{ router: RouterState }, { zones?: any, stories?: any, currentUse?: any, query?: any }> {
    constructor(props: { router: RouterState }) {
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

        let mapStyle = this.props.router.query!!.mode === 'full'
            ? 'mapbox://styles/mapbox/streets-v9'
            : (this.props.router.query!!.mode === 'satellite' ?
                'mapbox://styles/mapbox/satellite-v9'
                : 'mapbox://styles/mapbox/light-v9'
            )

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
                <XMapContainer>
                    <XMapContainer2>
                        <XMap key={this.props.router.query!!.mode || 'map'} mapStyle={mapStyle}>
                            <ParcelTileSource layer="parcels" minZoom={16} />
                            <BlockTileSource layer="blocks" minZoom={12} />
                            <XMapPolygonLayer
                                source="parcels"
                                layer="parcels"
                                minZoom={16}
                                flyOnClick={true}

                                onClick={(v) => this.props.router.pushQuery('selectedParcel', v)}
                                selectedId={this.props.router.query!!.selectedParcel}
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
                        </XMap>
                        <MapSwitcher>
                            <XSwitcher>
                                <XSwitcher.Item query={{ field: 'mode' }}>Light</XSwitcher.Item>
                                <XSwitcher.Item query={{ field: 'mode', value: 'full' }}>Full</XSwitcher.Item>
                                <XSwitcher.Item query={{ field: 'mode', value: 'satellite' }}>Satellite</XSwitcher.Item>
                            </XSwitcher>
                        </MapSwitcher>
                    </XMapContainer2>
                    {this.props.router.query!!.selectedParcel && <ParcelCard parcelId={this.props.router.query!!.selectedParcel} />}
                </XMapContainer>
            </AppContentMap>
        )
    }
}

export default withApp(withRouter((props) => {
    return (
        <>
            <XHead title={['Statecraft', 'Explore']} />
            <ParcelCollection router={props.router} />
        </>
    )
}));