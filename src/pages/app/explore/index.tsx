import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/App/withApp';
import { AppContentMap } from '../../../components/App/AppContentMap';
import { XMapSelectableLayer } from '../../../components/X/XMapSelectableLayer';
import { XCard } from '../../../components/X/XCard';
import { XSelect } from '../../../components/X/XSelect';
import { XVertical } from '../../../components/X/XVertical';
import { ParcelCard } from '../../../components/ParcelCard';
import { ParcelTileSource, BlockTileSource, ParcelPointSource } from '../../../api';
import { XButton } from '../../../components/X/XButton';
import { XMapPointLayer } from '../../../components/X/XMapPointLayer';

const FilterContainer = Glamorous(XCard)({
    position: 'absolute',
    top: 60,
    right: 30,
    zIndex: 1,
    width: 208,
    padding: 16,
    pointerEvents: 'auto',
    // backgroundColor: 'rgb(245, 246, 248)',
    // '& > div > div > span': {
    //     display: 'block',
    //     marginBottom: 3
    // }
})

const AllZones = ['NC-1', 'NC-3']

class ParcelCollection extends React.Component<{}, { selected?: string, zones?: any, stories?: any, query?: any }> {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    handleZonesChange = (src: any) => {
        this.setState({ zones: src });
    }

    handleStoriesChange = (src: any) => {
        this.setState({ stories: src });
    }

    handleUpdate = (e: any) => {
        e.preventDefault();
        if ((this.state.zones && this.state.zones.value) || (this.state.stories && this.state.stories.value)) {
            let clauses: any[] = [];
            if (this.state.zones && this.state.zones.value) {
                clauses.push({ 'zone': this.state.zones.value })
            }
            if (this.state.stories && this.state.stories.value) {
                clauses.push({ 'stories': this.state.stories.value })
            }
            let query = { '$and': clauses };
            console.warn(query);
            this.setState({ query: query });
        } else {
            this.setState({ query: undefined });
        }
    }

    render() {
        return (
            <>
                <ParcelTileSource layer="parcels" minZoom={16} />
                <BlockTileSource layer="blocks" minZoom={12} />
                <XMapSelectableLayer
                    source="parcels"
                    layer="parcels"
                    minZoom={16}
                    flyOnClick={true}
                    onClick={(v) => this.setState({ selected: v })}
                    selectedId={this.state.selected}
                />
                <XMapSelectableLayer
                    source="blocks"
                    layer="blocks"
                    minZoom={12}
                    maxZoom={16}
                    flyOnClick={true}
                    style={{
                        fillOpacity: 0.1,
                        borderOpacity: 0.3
                    }}
                />

                <ParcelPointSource layer="parcels-found" query={this.state.query} minZoom={12} skip={this.state.query === undefined} />
                <XMapPointLayer source="parcels-found" layer="parcels-found" />

                {this.state.selected && <ParcelCard parcelId={this.state.selected} />}
                <FilterContainer>
                    <XVertical>
                        <div>
                            <span>Zoning</span>
                            <div>
                                <XSelect
                                    name="zoning-field"
                                    value={this.state.zones}
                                    options={AllZones.map((v) => ({ value: v, label: v }))}
                                    onChange={this.handleZonesChange}
                                />
                            </div>
                        </div>
                        <div>
                            <span>Stories</span>
                            <div>
                                <XSelect
                                    name="address-field"
                                    value={this.state.stories}
                                    options={[
                                        { value: '0', label: 'no stories' },
                                        { value: '1', label: '1 story' },
                                        { value: '2', label: '2 stories' },
                                        { value: '3', label: '3 stories' },
                                        { value: '4', label: '4 stories' }]}
                                    onChange={this.handleStoriesChange}
                                />
                            </div>
                        </div>
                        {/* <div>
                            <span>Area</span>
                            <XSlider>
                                <XSlider.Range />
                            </XSlider>
                        </div> */}
                        <XButton onClick={this.handleUpdate}>Apply</XButton>
                    </XVertical>
                </FilterContainer>
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