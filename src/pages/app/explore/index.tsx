import * as React from 'react';
import { withApp } from '../../../components/App/withApp';
import { AppContentMap } from '../../../components/App/AppContentMap';
import { XCard } from '../../../components/X/XCard';
import { withParcelDirect, ParcelTileSource, BlockTileSource } from '../../../api';
import { XButton } from '../../../components/X/XButton';
import Glamorous from 'glamorous';
import { XLink } from '../../../components/X/XLink';
import { XArea } from '../../../components/X/XArea';
import { XMoney } from '../../../components/X/XMoney';
import { AStreetViewModal } from '../../../components/App/AStreetViewModal';
import { XMapLayer } from '../../../components/X/XMapLayer';

let Container = Glamorous.div({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    zIndex: 1,
    bottom: '64px',
    left: 'calc(50vw - 400px)',
    width: '800px'
})

let ParcelViewer = withParcelDirect((props) => {
    return (
        <Container>
            <XCard shadow="medium">
                <XCard.Loader loading={props.data!!.loading}>
                    {props.data && props.data!!.item && <>
                        <XCard.Header title={'Parcel #' + props.data.item!!.title}>
                            <AStreetViewModal geometry={props.data.item!!.geometry!!} />
                            <XButton style="dark" path={'/app/parcels/' + props.data.item!!.id}>View</XButton>
                        </XCard.Header>
                        <XCard.PropertyColumns>
                            <XCard.PropertyList>
                                <XCard.Property title="Block"><XLink path={'/app/blocks/' + props.data.item!!.block.id}>{props.data.item!!.block.title}</XLink></XCard.Property>
                                {props.data.item!!.extrasArea &&
                                    <XCard.Property title="Parcel Area"><XArea area={props.data.item!!.extrasArea!!} /></XCard.Property>
                                }
                                {props.data.item!!.extrasNeighborhood &&
                                    <XCard.Property title="Neighborhood">{props.data.item!!.extrasNeighborhood}</XCard.Property>
                                }
                                {props.data.item!!.extrasSupervisorDistrict &&
                                    <XCard.Property title="Supervisor District">{props.data.item!!.extrasSupervisorDistrict}</XCard.Property>
                                }
                                {props.data.item!!.extrasZoning && props.data.item!!.extrasZoning!!.length > 0 &&
                                    <XCard.Property title="Zoning">{props.data.item!!.extrasZoning!!.join()}</XCard.Property>
                                }

                                {props.data.item!!.extrasLandValue !== null &&
                                    <XCard.Property title="Land Value"><XMoney value={props.data.item!!.extrasLandValue!!} /></XCard.Property>
                                }
                                {props.data.item!!.extrasImprovementValue !== null &&
                                    <XCard.Property title="Improvement Value"><XMoney value={props.data.item!!.extrasImprovementValue!!} /></XCard.Property>
                                }
                                {props.data.item!!.extrasFixturesValue !== null &&
                                    <XCard.Property title="Fixtures Value"><XMoney value={props.data.item!!.extrasFixturesValue!!} /></XCard.Property>
                                }
                                {props.data.item!!.extrasPropertyValue !== null &&
                                    <XCard.Property title="Personal Property Value"><XMoney value={props.data.item!!.extrasPropertyValue!!} /></XCard.Property>
                                }
                            </XCard.PropertyList>
                            <XCard.PropertyList>
                                {props.data.item!!.extrasYear !== null &&
                                    <XCard.Property title="Year Built">{props.data.item!!.extrasYear}</XCard.Property>
                                }
                                {props.data.item!!.extrasStories !== null &&
                                    <XCard.Property title="Stories Count">{props.data.item!!.extrasStories}</XCard.Property>
                                }
                                {props.data.item!!.extrasUnits !== null &&
                                    <XCard.Property title="Units Count">{props.data.item!!.extrasUnits}</XCard.Property>
                                }
                                {props.data.item!!.extrasRooms !== null &&
                                    <XCard.Property title="Rooms Count">{props.data.item!!.extrasRooms}</XCard.Property>
                                }
                                {props.data.item!!.extrasBedrooms !== null &&
                                    <XCard.Property title="Bedrooms Count">{props.data.item!!.extrasBedrooms}</XCard.Property>
                                }
                                {props.data.item!!.extrasBathrooms !== null &&
                                    <XCard.Property title="Bathrooms Count">{props.data.item!!.extrasBathrooms}</XCard.Property>
                                }
                            </XCard.PropertyList>
                        </XCard.PropertyColumns>
                    </>}
                </XCard.Loader>
            </XCard>
        </Container>
    )
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
                <XMapLayer
                    source="parcels"
                    layer="parcels"
                    minZoom={16}
                    flyOnClick={true}
                    onClick={(v) => this.setState({ selected: v })}
                    selectedId={this.state.selected}
                />
                <XMapLayer
                    source="blocks"
                    layer="blocks"
                    minZoom={12}
                    maxZoom={16}
                    flyOnClick={true}
                />
                {this.state.selected && <ParcelViewer parcelId={this.state.selected} />}
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