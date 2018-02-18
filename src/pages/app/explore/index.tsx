import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withApp } from '../../../components/App/withApp';
import { AppContentMap } from '../../../components/App/AppContentMap';
import { XMapSubscriber } from '../../../components/X/XMapLight';
import * as Turf from '@turf/turf';
import { XCard } from '../../../components/X/XCard';
import { withParcelDirect, ParcelTileSource } from '../../../api';
import { XButton } from '../../../components/X/XButton';
import Glamorous from 'glamorous';
import { XLink } from '../../../components/X/XLink';
import { XArea } from '../../../components/X/XArea';
import { XMoney } from '../../../components/X/XMoney';
import { AStreetViewModal } from '../../../components/App/AStreetViewModal';

class GraphQLTileSource extends React.Component<{ onClick: (parcelId: string) => void, selected?: string }> {
    static contextTypes = {
        mapSubscribe: PropTypes.func.isRequired,
        mapUnsubscribe: PropTypes.func.isRequired
    }

    private isInited = false;
    private _isMounted = false;
    private map: mapboxgl.Map | null = null;

    constructor(props: { onClick: (parcelId: string) => void, selected?: string }) {
        super(props);
    }

    listener: XMapSubscriber = (src, map) => {
        if (!this.isInited) {
            this.map = map;
            this.isInited = true;

            map.addLayer({
                'id': 'parcels-view',
                'type': 'fill',
                'source': 'parcels',
                'layout': {},
                'paint': {
                    'fill-color': '#4428e0',
                    'fill-opacity': 0.8
                }
            });
            map.addLayer({
                'id': 'parcels-borders',
                'type': 'line',
                'source': 'parcels',
                'layout': {},
                'paint': {
                    'line-color': '#4428e0',
                    'line-width': 1,
                    'line-opacity': 1
                }
            });
            map.addLayer({
                'id': 'parcels-view-hover',
                'type': 'fill',
                'source': 'parcels',
                'layout': {},
                'paint': {
                    'fill-color': '#088',
                    'fill-opacity': 1
                },
                'filter': ['==', 'parcelId', '']
            });

            map.addLayer({
                'id': 'parcels-view-selected',
                'type': 'fill',
                'source': 'parcels',
                'layout': {},
                'paint': {
                    'fill-color': '#ff0000',
                    'fill-opacity': 1
                },
                'filter': ['==', 'parcelId', '']
            });

            // When the user moves their mouse over the states-fill layer, we'll update the filter in
            // the state-fills-hover layer to only show the matching state, thus making a hover effect.
            map.on('mousemove', 'parcels-view', function (e: any) {
                map.setFilter('parcels-view-hover', ['==', 'parcelId', e.features[0].properties.parcelId]);
            });

            // Reset the state-fills-hover layer's filter when the mouse leaves the layer.
            map.on('mouseleave', 'parcels-view', function () {
                map.setFilter('parcels-view-hover', ['==', 'parcelId', '']);
            });

            map.on('click', 'parcels-view', (e: any) => {
                let center = Turf.bbox(e.features[0]);
                map.fitBounds([[center[0], center[1]], [center[2], center[3]]], {
                    padding: {
                        left: 100,
                        right: 100,
                        top: 100,
                        bottom: 400
                    },
                    maxZoom: 18,
                    duration: 300
                });
                this.props.onClick(e.features[0].properties.parcelId);
            })
            map.setFilter('parcels-view-selected', ['==', 'parcelId', this.props.selected]);
        }
    }

    render() {
        return null;
    }

    componentWillReceiveProps(nextProps: { selected?: string }) {
        if (this.props.selected !== nextProps.selected && this.isInited && this._isMounted) {
            this.map!!.setFilter('parcels-view-selected', ['==', 'parcelId', nextProps.selected]);
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.context.mapSubscribe(this.listener);
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.context.mapUnsubscribe(this.listener);
    }
}

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
                <ParcelTileSource layer="parcels" />
                <GraphQLTileSource onClick={(v: string) => this.setState({ selected: v })} selected={this.state.selected} />
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