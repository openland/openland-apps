import '../../../globals';
import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { withRouter } from '../../../components/withRouter';
import { XVertical } from '../../../components/X/XVertical';
import { XCard } from '../../../components/X/XCard';
import { ParcelMaps } from '../../../components/ParcelMaps';
import { withOpportunity } from '../../../api';
import { XButtonMutation } from '../../../components/X/XButtonMutation';
import { XMapSource } from '../../../components/X/XMapSource';
import { XView } from '../../../components/X/XView';
import { XDimensions } from '../../../components/X/XDimensions';
import { XMapPolygonLayer } from '../../../components/X/XMapPolygonLayer';
import { sourceFromGeometry } from '../../../utils/map';
import { ProspectingNavigationReview } from '../../../components/ProspectingNavigation';
import { trackEvent } from '../../../utils/analytics';
import { XForm } from '../../../components/X/XForm';
import { XHeader } from '../../../components/X/XHeader';
import { Scaffold } from '../../../components/Scaffold';
import ATypes from 'openland-api';
import { XTitle } from '../../../components/X/XTitle';
import { XContent } from '../../../components/X/XContent';
import { ParcelNumber } from '../../../components/ParcelNumber';
import { MutationFunc } from 'react-apollo';
import { XArea } from '../../../components/X/XArea';
import { XDistance } from '../../../components/X/XDistance';
import { XMoney } from '../../../components/X/XMoney';
import { OwnerTypeComponent } from '../../../components/OwnerTypeComponent';
import { XLinkExternal } from '../../../components/X/XLinkExternal';
import { XZoningCode } from '../../../components/X/XZoningCode';
import { XWithRole } from '../../../components/X/XWithRole';
import { XTooltip } from '../../../components/Incubator/XTooltip';
import { ProjectTypes } from '../../../components/ProjectTypes';
import { Text } from '../../../strings';
import { XButton } from '../../../components/X/XButton';
import { ParcelLayer } from '../../../components/ParcelLayer';
import { ProspectingScaffold } from '../../../components/ProspectingScaffold';

const OpportunityDescription = (props: { parcel: ATypes.ParcelFullFragment, parcelNotes: MutationFunc<{}> }) => {
    return (
        <XVertical>
            <XCard.PropertyColumns>
                <XVertical>
                    <XCard.PropertyList title="Parcel Details">
                        {props.parcel.extrasOwnerType && props.parcel.extrasOwnerType !== 'PRIVATE' &&
                            <XCard.Property title="Ownership Type"><OwnerTypeComponent type={props.parcel.extrasOwnerType!!} /></XCard.Property>
                        }
                        {props.parcel.extrasOwnerName &&
                            <XCard.Property title="Owner Name">{props.parcel.extrasOwnerName}</XCard.Property>
                        }
                        {props.parcel.area &&
                            <XCard.Property title="Area"><XArea area={props.parcel.area!!.value} /></XCard.Property>
                        }
                        {props.parcel.front &&
                            <XCard.Property title="Frontage"><XDistance value={props.parcel.front!!.value} /></XCard.Property>
                        }
                        {props.parcel.depth &&
                            <XCard.Property title="Depth"><XDistance value={props.parcel.depth!!.value} /></XCard.Property>
                        }
                        {props.parcel!!.extrasShapeSides && !props.parcel.front && !props.parcel.depth && props.parcel!!.extrasShapeSides!!.length > 0 &&
                            <XCard.Property title="Dimensions"> <XDimensions dimensions={props.parcel!!.extrasShapeSides!!} /></XCard.Property>
                        }
                        {props.parcel.extrasZoning && props.parcel.extrasZoning!!.length > 0 &&
                            <XCard.Property title="Zoning"><XZoningCode codes={props.parcel!!.extrasZoning!!} /></XCard.Property>
                        }
                        {props.parcel.extrasLandValue !== null &&
                            <XCard.Property title="Land Value"><XMoney value={props.parcel.extrasLandValue!!} /></XCard.Property>
                        }
                        {props.parcel!!.extrasVacant !== null &&
                            <XCard.Property title="Vacant">{props.parcel!!.extrasVacant ? 'Yes' : 'No'}</XCard.Property>
                        }
                        {props.parcel.city.name === 'New York' && (props.parcel.extrasVacant === null || props.parcel.extrasVacant) && (
                            <XWithRole role={['feature-customer-kassita', 'editor', 'software-developer', 'super-admin']}>
                                {props.parcel.extrasAnalyzed !== true &&
                                    <XCard.Property title="Compatible buildings">
                                        <XTooltip title={Text.hint_too_complex} marginLeft={0} />
                                        {Text.text_too_complex}
                                    </XCard.Property>
                                }
                                {props.parcel!!.extrasAnalyzed === true && props.parcel!!.extrasFitProjects &&
                                    <XCard.Property title="Compatible buildings"><ProjectTypes types={props.parcel!!.extrasFitProjects!!} /></XCard.Property>
                                }
                            </XWithRole>
                        )}
                    </XCard.PropertyList>
                </XVertical>
                <XVertical>
                    {props.parcel.compatibleBuildings && props.parcel.compatibleBuildings.length > 0 && (
                        <XView css={{ paddingRight: 24, paddingLeft: 8 }}>
                            <XCard.Map focusLocation={{ latitude: props.parcel.center!!.latitude, longitude: props.parcel.center!!.longitude, zoom: 18 }}>
                                <XMapSource id="parcels" data={sourceFromGeometry(props.parcel.geometry!!)} />
                                <ParcelLayer inverted={false} />
                                {props.parcel.compatibleBuildings.filter((v) => v.shape).map((v, i) => (
                                    <XMapSource
                                        key={'source-shape-' + i}
                                        id={'shape-' + i}
                                        data={sourceFromGeometry(v.shape!!)}
                                    />
                                ))}
                                {props.parcel.compatibleBuildings.filter((v) => v.shape).map((v, i) => (
                                    <XMapPolygonLayer
                                        key={'layer-shape-' + i}
                                        source={'shape-' + i}
                                        layer={'shape-' + i}
                                        style={{
                                            borderColor: v.key === 'kassita-1' ? '#E88989' : '#2886E0',
                                            borderWidth: 2,
                                            fillOpacity: 0

                                            // fillOpacity: 0.4
                                        }}
                                    />
                                ))}
                            </XCard.Map>
                        </XView>
                    )}
                </XVertical>
            </XCard.PropertyColumns>
            {props.parcel.geometry && (
                <XContent>
                    <ParcelMaps
                        id={props.parcel.id}
                        geometry={props.parcel.geometry}
                        disableNavigation={true}
                        satellite={true}
                    />
                </XContent>
            )}
            <XContent>
                <XTitle>Notes</XTitle>
            </XContent>
            <XForm
                defaultValues={{ parcelId: props.parcel.id, notes: props.parcel.userData ? props.parcel.userData.notes : '' }}
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
            {props.parcel.links.length > 0 && (
                <XCard.PropertyList title="Links">
                    {props.parcel.links.map((v, i) => (
                        <XCard.Property title={v.title}><XLinkExternal href={v.url}>{v.url}</XLinkExternal></XCard.Property>
                    ))}
                </XCard.PropertyList>
            )}
        </XVertical>
    );
};

const OpportunityInfo = withOpportunity((props) => {
    let approveText = 'Move to next stage';
    let hasPublic = props.router.query.public ? true : false;
    let mapUrl: string | undefined = undefined; // '/prospecting/map';
    if (props.data.alphaNextReviewOpportunity) {
        mapUrl = '/prospecting/map?selectedParcel=' + props.data.alphaNextReviewOpportunity.parcel.id;
    }
    if (hasPublic && mapUrl) {
        mapUrl = mapUrl + '&public=true';
    }
    if (props.data.variables.state === 'INCOMING') {
        approveText = 'Move to Zoning Review';
    } else if (props.data.variables.state === 'APPROVED_INITIAL') {
        approveText = 'Move to Unit Placement';
        if (mapUrl) {
            mapUrl = mapUrl + '&stage=zoning';
        }
    } else if (props.data.variables.state === 'APPROVED_ZONING') {
        approveText = 'Approve';
        if (mapUrl) {
            mapUrl = mapUrl + '&stage=unit';
        }
    }

    return (
        <XVertical>
            <ProspectingNavigationReview />
            <XCard.Loader loading={props.data.loading || false}>
                {props.data.alphaNextReviewOpportunity && (!props.data.loading) && (
                    <XHeader
                        text={props.data.alphaNextReviewOpportunity!!.parcel.address || 'No address'}
                        description={<ParcelNumber city={props.data.alphaNextReviewOpportunity!!.parcel.city.name} id={props.data.alphaNextReviewOpportunity!!.parcel.number} />}
                        bullet={props.data.alphaNextReviewOpportunity!!.parcel.extrasOwnerPublic ? 'public' : undefined}
                    >
                        {mapUrl && <XButton path={mapUrl} >View on map</XButton>}
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
                        <>
                            <XWithRole role="feature-customer-kassita" negate={true}>
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
                            </XWithRole>
                            <XWithRole role="feature-customer-kassita">
                                <XButtonMutation
                                    variables={{ state: props.data.variables.state, opportunityId: props.data.alphaNextReviewOpportunity!!.id }}
                                    mutation={props.snooze}
                                    onSuccess={() => {
                                        trackEvent('Parcel Snoozed', { parcelId: props.data.alphaNextReviewOpportunity!!.parcel.id });
                                        props.data.refetch({ forceFetch: true });
                                    }}
                                >
                                    Approve (NYC)
                            </XButtonMutation>
                            </XWithRole>
                        </>
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
                {(!props.data.alphaNextReviewOpportunity && (!props.data.loading)) && (
                    <XCard.Empty text="There are no parcels for review" icon="sort" />
                )}
            </XCard.Loader>
            {props.data.alphaNextReviewOpportunity && (!props.data.loading) && (
                <OpportunityDescription parcel={props.data.alphaNextReviewOpportunity.parcel} parcelNotes={props.parcelNotes} />
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
    let hasPublic = props.router.query.public ? true : false;
    let squery: string | null = null;
    if (hasPublic) {
        squery = '{"isPublic": true}';
    }

    return (
        <>
            <XHead title={title} />
            <ProspectingScaffold>
                <Scaffold.Content bottomOffset={true} padding={false}>
                    <OpportunityInfo variables={{ state: state, query: squery }} />
                </Scaffold.Content>
            </ProspectingScaffold>
        </>
    );
}));