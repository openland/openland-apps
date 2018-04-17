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
import { XHorizontal } from '../../../components/X/XHorizontal';
import { XMapSource } from '../../../components/X/XMapSource';
import { XView } from '../../../components/X/XView';
import { XAngle } from '../../../components/X/XAngle';
import { XDimensions } from '../../../components/X/XDimensions';
import { XMapPolygonLayer } from '../../../components/X/XMapPolygonLayer';
import { XMapPointLayer } from '../../../components/X/XMapPointLayer';
import { sourceFromGeometry, sourceFromPoint } from '../../../utils/map';
import { ProspectingNavigationReview } from '../../../components/ProspectingNavigation';
import { trackEvent } from '../../../utils/analytics';
import { XForm } from '../../../components/X/XForm';
import { XHeader } from '../../../components/X/XHeader';
import { Scaffold } from '../../../components/Scaffold';
import ATypes from 'openland-api';
import { XTitle } from '../../../components/X/XTitle';
import { XContent } from '../../../components/X/XContent';
import { ParcelNumber } from '../../../components/ParcelNumber';

const OpportunityDescription = (props: { parcel: ATypes.ParcelFullFragment }) => {
    return (
        <XVertical>
            {props.parcel.compatibleBuildings && props.parcel.compatibleBuildings.length > 0 && (
                <>
                    <XContent>
                        <XTitle>Compatible Constructions</XTitle>
                    </XContent>
                    <XVertical>
                        {props.parcel.compatibleBuildings.map((v, i) => (
                            <XHorizontal key={v.key + '-' + i}>
                                <XView grow={1} basis={0} css={{ minWidth: 0 }}>
                                    <XCard.PropertyList>
                                        <XCard.Property title="Construction Type">{v.title}</XCard.Property>
                                        {v.width && v.height && <XCard.Property title="Dimensions"><XDimensions dimensions={[v.width, v.height]} /></XCard.Property>}
                                        {v.angle && <XCard.Property title="Azimuth"><XAngle value={v.angle} /></XCard.Property>}
                                        {v.center && <XCard.Property title="Location">{v.center.latitude.toFixed(6)},{v.center.longitude.toFixed(6)}</XCard.Property>}
                                    </XCard.PropertyList>
                                </XView>
                                <XView grow={1} basis={0}>
                                    <XView css={{ paddingRight: 24 }}>
                                        {v.center && <XCard.Map focusLocation={{ latitude: v.center.latitude, longitude: v.center.longitude, zoom: 18 }}>
                                            <XMapSource id={'parcel'} data={sourceFromGeometry(props.parcel.geometry!!)} />
                                            <XMapPolygonLayer source="parcel" layer="parcel" />

                                            {v.center && <XMapSource id={'center'} data={sourceFromPoint(v.center!!.latitude, v.center!!.longitude)} />}
                                            {v.center && <XMapPointLayer source="center" layer="center" />}

                                            {v.shape && <XMapSource id={'shape'} data={sourceFromGeometry(v.shape)} />}
                                            {v.shape && <XMapPolygonLayer source="shape" layer="shape" />}
                                        </XCard.Map>}
                                    </XView>
                                </XView>
                            </XHorizontal>
                        ))}
                    </XVertical>
                </>
            )}
            {props.parcel.geometry && (
                <>
                    <XContent>
                        <XTitle>Location</XTitle>
                    </XContent>
                    <XContent>
                        <ParcelMaps id={props.parcel.id} geometry={props.parcel.geometry} disableNavigation={true} satellite={true} />
                    </XContent>
                </>
            )}
        </XVertical>
    );
};

const OpportunityInfo = withOpportunity((props) => {
    let approveText = 'Move to next stage';
    if (props.data.variables.state === 'INCOMING') {
        approveText = 'Move to Zoning Review';
    } else if (props.data.variables.state === 'APPROVED_INITIAL') {
        approveText = 'Move to Unit Placement';
    } else if (props.data.variables.state === 'APPROVED_ZONING') {
        approveText = 'Approve';
    }

    return (
        <XVertical>
            <ProspectingNavigationReview />
            <XCard.Loader loading={props.data.loading || false}>
                {props.data.alphaNextReviewOpportunity && (!props.data.loading) && (
                    <XHeader
                        text={props.data.alphaNextReviewOpportunity!!.parcel.address || 'No address'}
                        description={<ParcelNumber city={props.data.alphaNextReviewOpportunity!!.parcel.city.name} id={props.data.alphaNextReviewOpportunity!!.parcel.number}/>}
                    >
                        <XButtonMutation
                            variables={{ state: props.data.variables.state, opportunityId: props.data.alphaNextReviewOpportunity!!.id }}
                            mutation={props.reject}
                            onSuccess={() => {
                                trackEvent('Parcel Approved', { parcelId: props.data.alphaNextReviewOpportunity!!.parcel.id });
                                props.data.refetch({ forceFetch: true });
                            }}
                        >
                            Reject
                            </XButtonMutation>
                        <XButtonMutation
                            variables={{ state: props.data.variables.state, opportunityId: props.data.alphaNextReviewOpportunity!!.id }}
                            mutation={props.snooze}
                            onSuccess={() => {
                                trackEvent('Parcel Snoozed', { parcelId: props.data.alphaNextReviewOpportunity!!.parcel.id });
                                props.data.refetch({ forceFetch: true });
                            }}
                        >
                            Snooze
                            </XButtonMutation>
                        <XButtonMutation
                            variables={{ state: props.data.variables.state, opportunityId: props.data.alphaNextReviewOpportunity!!.id }}
                            mutation={props.approve}
                            onSuccess={() => {
                                trackEvent('Parcel Rejected', { parcelId: props.data.alphaNextReviewOpportunity!!.parcel.id });
                                props.data.refetch({ forceFetch: true });
                            }}
                            style="dark"
                        >
                            {approveText}
                        </XButtonMutation>
                    </XHeader>
                )}
                {props.data.alphaNextReviewOpportunity && (!props.data.loading) && (
                    <ParcelProperties item={props.data.alphaNextReviewOpportunity.parcel} />
                )}
            </XCard.Loader>
            {props.data.alphaNextReviewOpportunity && (!props.data.loading) && (
                <>
                    <XContent>
                        <XTitle>Notes</XTitle>
                    </XContent>

                    <XForm
                        defaultValues={{ parcelId: props.data.alphaNextReviewOpportunity.parcel.id, notes: props.data.alphaNextReviewOpportunity.parcel.userData ? props.data.alphaNextReviewOpportunity.parcel.userData.notes : '' }}
                        submitMutation={props.parcelNotes}
                        mutationDirect={true}
                    >
                        <XContent>
                            <XForm.TextArea field="notes" placeholder="Notes" />
                        </XContent>
                        <XForm.Footer>
                            <XForm.Submit style="dark">Save</XForm.Submit>
                        </XForm.Footer>
                    </XForm>

                </>
            )}
            {(!props.data.alphaNextReviewOpportunity && (!props.data.loading)) && (
                <XCard.Empty text="There are no parcels for review" icon="sort" />
            )}
            {props.data.alphaNextReviewOpportunity && (!props.data.loading) && (
                <OpportunityDescription parcel={props.data.alphaNextReviewOpportunity.parcel} />
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
            <Scaffold>
                <Scaffold.Content bottomOffset={true} padding={false}>
                    <OpportunityInfo variables={{ state: state }} />
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));