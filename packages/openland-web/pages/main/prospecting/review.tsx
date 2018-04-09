import '../../../globals';
import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { withRouter } from '../../../components/withRouter';
import { XVertical } from '../../../components/X/XVertical';
import { XCard } from '../../../components/X/XCard';
import { ParcelProperties } from '../../../components/ParcelProperties';
import { ParcelMaps } from '../../../components/ParcelMaps';
import { withOpportunity } from '../../../api';
import { XButtonMutation } from '../../../components/X/XButtonMutation';
import { AppContent } from '../../../components/App/AppContent';
import { XTab } from '../../../components/X/XTab';
import { XHorizontal } from '../../../components/X/XHorizontal';
import { XMapSource } from '../../../components/X/XMapSource';
import { XView } from '../../../components/X/XView';
import { XAngle } from '../../../components/X/XAngle';
import { XDimensions } from '../../../components/X/XDimensions';
import { XMapPolygonLayer } from '../../../components/X/XMapPolygonLayer';
import { XMapPointLayer } from '../../../components/X/XMapPointLayer';
import { sourceFromGeometry, sourceFromPoint } from '../../../utils/map';

const OpportunityInfo = withOpportunity((props) => {
    // let state = props.data.variables.state;
    // let title = 'Initial Review';
    let approveText = 'Move to next stage';
    if (props.data.variables.state === 'INCOMING') {
        approveText = 'Move to Zoning Review';
    } else if (props.data.variables.state === 'APPROVED_INITIAL') {
        approveText = 'Move to Unit Placement';
    } else if (props.data.variables.state === 'APPROVED_ZONING') {
        approveText = 'Approve';
    }

    // if (state === 'APPROVED_INITIAL') {
    //     title = 'Zoning Reivew';
    // }
    // if (state === 'APPROVED_ZONING') {
    //     title = 'Unit Placement';
    // }
    return (
        <XVertical>
            <XTab>
                <XTab.Item query={{ field: 'stage' }} asArrow={true}>Incoming</XTab.Item>
                <XTab.Item query={{ field: 'stage', value: 'zoning' }} asArrow={true}>Zoning Review</XTab.Item>
                <XTab.Item query={{ field: 'stage', value: 'unit' }} asArrow={true}>Unit Placement</XTab.Item>
                <XTab.Item path="/prospecting/approved">Approved</XTab.Item>
                <XTab.Item path="/prospecting/rejected">Rejected</XTab.Item>
                <XTab.Item path="/prospecting/snoozed">Snoozed</XTab.Item>
            </XTab>
            <XCard shadow="medium" separators={true}>
                <XCard.Loader loading={props.data.loading || false}>
                    {props.data.alphaNextReviewOpportunity && (!props.data.loading) && (
                        <XCard.Header text={'Parcel #' + props.data.alphaNextReviewOpportunity!!.parcel.title}>
                            <XButtonMutation
                                variables={{ state: props.data.variables.state, opportunityId: props.data.alphaNextReviewOpportunity!!.id }}
                                mutation={props.reject}
                                onSuccess={() => props.data.refetch({ forceFetch: true })}
                            >
                                Reject
                            </XButtonMutation>
                            <XButtonMutation
                                variables={{ state: props.data.variables.state, opportunityId: props.data.alphaNextReviewOpportunity!!.id }}
                                mutation={props.snooze}
                                onSuccess={() => props.data.refetch({ forceFetch: true })}
                            >
                                Snooze
                            </XButtonMutation>
                            <XButtonMutation
                                variables={{ state: props.data.variables.state, opportunityId: props.data.alphaNextReviewOpportunity!!.id }}
                                mutation={props.approve}
                                onSuccess={() => props.data.refetch({ forceFetch: true })}
                                style="dark"
                            >
                                {approveText}
                            </XButtonMutation>
                        </XCard.Header>
                    )}
                    {props.data.alphaNextReviewOpportunity && (!props.data.loading) && (
                        <ParcelProperties item={props.data.alphaNextReviewOpportunity.parcel} />
                    )}
                    {(!props.data.alphaNextReviewOpportunity || props.data.loading) && (
                        <XCard.Empty text="There are no parcels for review" icon="sort" />
                    )}
                </XCard.Loader>
            </XCard>
            {props.data.alphaNextReviewOpportunity && (!props.data.loading) && props.data.alphaNextReviewOpportunity.parcel.compatibleBuildings && props.data.alphaNextReviewOpportunity.parcel.compatibleBuildings.length > 0 && (
                <XVertical>
                    {props.data.alphaNextReviewOpportunity.parcel.compatibleBuildings.map((v, i) => (
                        <XCard key={v.key + '-' + i} shadow="medium">
                            <XHorizontal>
                                <XView grow={1} basis={0}>
                                    <XCard.PropertyList>
                                        <XCard.Property title="Construction Type">{v.title}</XCard.Property>
                                        {v.width && v.height && <XCard.Property title="Dimensions"><XDimensions dimensions={[v.width, v.height]} /></XCard.Property>}
                                        {v.angle && <XCard.Property title="Azimuth"><XAngle value={v.angle} /></XCard.Property>}
                                    </XCard.PropertyList>
                                </XView>
                                <XView grow={1} basis={0}>
                                    {v.center && <XCard.Map focusLocation={{ latitude: v.center.latitude, longitude: v.center.longitude, zoom: 18 }}>
                                        <XMapSource id={'parcel'} data={sourceFromGeometry(props.data.alphaNextReviewOpportunity!!.parcel.geometry!!)} />
                                        <XMapPolygonLayer source="parcel" layer="parcel" />

                                        {v.center && <XMapSource id={'center'} data={sourceFromPoint(v.center!!.latitude, v.center!!.longitude)} />}
                                        {v.center && <XMapPointLayer source="center" layer="center" />}

                                        {v.shape && <XMapSource id={'shape'} data={sourceFromGeometry(v.shape)} />}
                                        {v.shape && <XMapPolygonLayer source="shape" layer="shape" />}
                                    </XCard.Map>}
                                </XView>
                            </XHorizontal>
                        </XCard>
                    ))}
                </XVertical>
            )}
            {props.data.alphaNextReviewOpportunity && (!props.data.loading) && props.data.alphaNextReviewOpportunity.parcel.geometry && (
                <ParcelMaps id={props.data.alphaNextReviewOpportunity.parcel.id} geometry={props.data.alphaNextReviewOpportunity.parcel.geometry} disableNavigation={true} satellite={true} />
            )}
        </XVertical>
    );
}) as React.ComponentType<{ variables?: any }>;

export default withApp('Initial Review', 'viewer', withRouter((props) => {
    let state: 'INCOMING' | 'APPROVED_INITIAL' | 'APPROVED_ZONING' = 'INCOMING';
    let title = 'Initial Review';
    if (props.router.routeQuery.stage) {
        if (props.router.routeQuery.stage === 'zoning') {
            state = 'APPROVED_INITIAL';
            title = 'Zoning Review';
        } else if (props.router.routeQuery.stage === 'unit') {
            state = 'APPROVED_ZONING';
            title = 'Unit Placement Review';
        }
    }
    return (
        <>
            <XHead title={title} />
            <AppContent>
                <OpportunityInfo variables={{ state: state }} />
            </AppContent>
        </>
    );
}));