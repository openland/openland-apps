import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/App/withApp';
import { AppContentMap } from '../../../components/App/AppContentMap';
import { XMapSelectableLayer } from '../../../components/X/XMapSelectableLayer';
import { XCard } from '../../../components/X/XCard';
import { XSlider } from '../../../components/X/XSlider';
import { XSelect } from '../../../components/X/XSelect';
import { XVertical } from '../../../components/X/XVertical';
import { ParcelCard } from '../../../components/ParcelCard';
import { ParcelTileSource, BlockTileSource } from '../../../api';

const FilterContainer = Glamorous(XCard)({
    position: 'absolute',
    top: 60,
    right: 30,
    zIndex: 1,
    width: 208,
    padding: 8,
    pointerEvents: 'auto',
    backgroundColor: 'rgb(245, 246, 248)',
    '& > div > div > span': {
        display: 'block',
        marginBottom: 3
    }
})

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
                {this.state.selected && <ParcelCard parcelId={this.state.selected} />}
                <FilterContainer>
                    <XVertical>
                        <div>
                            <span>Zoning</span>
                            <div>
                                <XSelect 
                                    name="form-field-name"
                                    value={'value'}
                                    options={[
                                        { value: 'one', label: 'One' },
                                        { value: 'two', label: 'Two' },
                                    ]}
                                />
                            </div>
                        </div>
                        <div>
                            <span>Area</span>
                            <XSlider>
                                <XSlider.Slider />
                            </XSlider>
                        </div>
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