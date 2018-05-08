import * as React from 'react';
import ATypes from 'openland-api';
import { buildProspectingQuery } from '../../../components/prospectingQuery';
import { MutationFunc } from 'react-apollo';
import { OwnerTypeComponent } from '../../../components/OwnerTypeComponent';
import { ParcelLayer } from '../../../components/ParcelLayer';
import { ParcelMaps } from '../../../components/ParcelMaps';
import { ParcelNumber } from '../../../components/ParcelNumber';
import { ProjectTypes } from '../../../components/ProjectTypes';
import { ProspectingNavigationReview } from '../../../components/ProspectingNavigation';
import { ProspectingScaffold } from '../../../components/ProspectingScaffold';
import { Scaffold } from '../../../components/Scaffold';
import { sourceFromGeometry } from '../../../utils/map';
import { Text } from '../../../strings';
import { trackEvent } from '../../../utils/analytics';
import { withApp } from '../../../components/withApp';
import { withOpportunity } from '../../../api';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';
import { XArea } from 'openland-x-format/XArea';
import { XMoney } from 'openland-x-format/XMoney';
import { XDistance } from 'openland-x-format/XDistance';
import { XButton } from 'openland-x/XButton';
import { XButtonMutation } from 'openland-x/XButtonMutation';
import { XCard } from '../../../components/X/XCard';
import { XCardProperty } from './../../../components/X/XCardProperty';
import { XContent } from 'openland-x/XContent';
import { XDimensions } from 'openland-x-format/XDimensions';
import { XHeader } from 'openland-x/XHeader';
import { XLinkExternal } from 'openland-x/XLinkExternal';
import { XSwitcher } from './../../../components/X/XSwitcher';
import { XTooltip } from '../../../components/Incubator/XTooltip';
import { XVertical } from 'openland-x/XVertical';
import { XWithRole } from '../../../components/X/XWithRole';
import '../../../globals';
import { XMapSource } from 'openland-x-map/XMapSource';
import { XMapPolygonLayer } from 'openland-x-map/XMapPolygonLayer';
import { ZoningCode } from '../../../components/ZoningCode';
import { ZoningMetrics } from '../../../components/ZoningMetrics';
import { XView } from 'openland-x/XView';
import { XEmpty } from 'openland-x/XEmpty';
import { XMapSmall } from 'openland-x-map/XMapSmall';
import { XLoader } from 'openland-x/XLoader';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XForm } from 'openland-x-forms/XForm';

const OpportunityDescription = (props: { parcel: ATypes.ParcelFullFragment, parcelNotes: MutationFunc<{}> } & XWithRouter) => {
    const detailsPath = 'review';
    const linksPath = 'links';
    const notesPath = 'notes';
    const zoningPath = 'zoning';

    return (
        <XVertical>

            <XCardProperty>
                <XSwitcher alignSelf="flex-start" flatStyle={true}>
                    <XSwitcher.Item query={{ field: 'tab' }} >Parcel</XSwitcher.Item>
                    <XSwitcher.Item query={{ field: 'tab', value: linksPath }} count={props.parcel.links.length}>Links</XSwitcher.Item>
                    <XSwitcher.Item query={{ field: 'tab', value: notesPath }} count={props.parcel.userData && props.parcel.userData.notes && props.parcel.userData.notes.length > 0 ? 1 : undefined}>Notes</XSwitcher.Item>
                    {/* <XWithRole role={['super-admin', 'software-developer', 'parcel-zoning-metrics']}> */}
                    <XSwitcher.Item query={{ field: 'tab', value: zoningPath }} >Zoning</XSwitcher.Item>
                    {/* </XWithRole> */}
                </XSwitcher>
            </XCardProperty>

            {(props.router.query.tab === detailsPath || props.router.query.tab === undefined) && (
                <>

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
                                    <XCard.Property title="Area"><XArea value={props.parcel.area!!.value} /></XCard.Property>
                                }
                                <XWithRole role={['super-admin', 'software-developer', 'unit-capacity', 'feature-customer-kassita']}>
                                    {Boolean(props.parcel.area && props.parcel.extrasUnitCapacityFar && props.parcel.extrasUnitCapacityDencity) &&
                                        <XCard.Property title="Unit Capacity">
                                            {props.parcel.extrasUnitCapacity}
                                            <XTooltip placement="right" type="info">
                                                <XTooltip.Content><XArea value={props.parcel.area!!.value} />
                                                    {' * ' + props.parcel.extrasUnitCapacityFar + '(FAR) / ' + props.parcel.extrasUnitCapacityDencity + '(DF)'}
                                                </XTooltip.Content>
                                            </XTooltip>
                                        </XCard.Property>
                                    }
                                </XWithRole>
                                {props.parcel.front &&
                                    <XCard.Property title="Frontage"><XDistance value={props.parcel.front!!.value} /></XCard.Property>
                                }
                                {props.parcel.depth &&
                                    <XCard.Property title="Depth"><XDistance value={props.parcel.depth!!.value} /></XCard.Property>
                                }
                                {props.parcel!!.extrasShapeSides && !props.parcel.front && !props.parcel.depth && props.parcel!!.extrasShapeSides!!.length > 0 &&
                                    <XCard.Property title="Dimensions"> <XDimensions value={props.parcel!!.extrasShapeSides!!} /></XCard.Property>
                                }
                                {props.parcel.extrasZoning && props.parcel.extrasZoning!!.length > 0 &&
                                    <XCard.Property title="Zoning"><ZoningCode codes={props.parcel!!.extrasZoning!!} /></XCard.Property>
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
                                    <XMapSmall focusPosition={{ latitude: props.parcel.center!!.latitude, longitude: props.parcel.center!!.longitude, zoom: 18 }}>
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
                                    </XMapSmall>
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

                </>
            )}

            {props.router.query.tab === notesPath && (
                <XForm
                    defaultValues={{ parcelId: props.parcel.id, notes: props.parcel.userData ? props.parcel.userData.notes : '' }}
                    submitMutation={props.parcelNotes}
                    mutationDirect={true}
                >
                    <XContent>
                        <XForm.TextArea field="notes" placeholder="Notes" />
                    </XContent>
                    <XForm.Footer>
                        <XForm.Submit style="primary" text="Save" />
                    </XForm.Footer>
                </XForm>)}

            {props.router.query.tab === linksPath && props.parcel.links.length > 0 && (
                <XCard.PropertyList title="Links">
                    {props.parcel.links.map((v, i) => (
                        <XCard.Property title={v.title}><XLinkExternal href={v.url}>{v.url}</XLinkExternal></XCard.Property>
                    ))}
                </XCard.PropertyList>
            )}

            {props.router.query.tab === zoningPath && props.parcel.extrasZoning && props.parcel.extrasZoning!!.length > 0 &&
                // <XWithRole role={['super-admin', 'software-developer', 'parcel-zoning-metrics']}>
                <ZoningMetrics codes={props.parcel.extrasZoning!!} />
                // </XWithRole>
            }
        </XVertical>
    );
};

const OpportunityInfo = withOpportunity((props) => {
    let approveText = 'Move to next stage';
    // let hasPublic = props.router.query.public ? true : false;
    let mapUrl: string | undefined = undefined; // '/prospecting/map';

    let canMoveNext = true;
    let canReset = true;

    if (props.data.alphaNextReviewOpportunity) {
        mapUrl = '/prospecting/map?selectedParcel=' + props.data.alphaNextReviewOpportunity.parcel.id;
    }
    if (props.router.query.pipeline && mapUrl) {
        mapUrl = mapUrl + '&pipeline=' + props.router.query.pipeline;
    }
    if (props.data.variables.state === 'INCOMING') {
        approveText = 'Move to Zoning Review';
        canReset = false;
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
    } else if (props.data.variables.state === 'APPROVED') {
        canMoveNext = false;
    } else if (props.data.variables.state === 'REJECTED') {
        canMoveNext = false;
    } else if (props.data.variables.state === 'SNOOZED') {
        canMoveNext = false;
    }

    return (
        <XVertical>
            <ProspectingNavigationReview />
            <XLoader loading={props.data.loading || false}>
                {props.data.alphaNextReviewOpportunity && (!props.data.loading) && (
                    <XHeader
                        text={props.data.alphaNextReviewOpportunity!!.parcel.address || 'No address'}
                        description={<ParcelNumber city={props.data.alphaNextReviewOpportunity!!.parcel.city.name} id={props.data.alphaNextReviewOpportunity!!.parcel.number} />}
                        bullet={props.data.alphaNextReviewOpportunity!!.parcel.extrasOwnerPublic ? 'public' : undefined}
                    >
                        {mapUrl && <XButton path={mapUrl} text="View on map" />}
                        {props.data.variables.state !== 'REJECTED' && (
                            <XButtonMutation
                                text="Reject"
                                style="danger"
                                variables={{ state: props.data.variables.state, opportunityId: props.data.alphaNextReviewOpportunity!!.id }}
                                mutation={props.reject}
                                onSuccess={() => {
                                    trackEvent('Parcel Rejected', { parcelId: props.data.alphaNextReviewOpportunity!!.parcel.id });
                                    props.data.refetch({ forceFetch: true });
                                }}
                            />
                        )}
                        <>
                            {/* <XWithRole role="feature-customer-kassita" negate={true}> */}
                            {props.data.variables.state !== 'SNOOZED' && (
                                <XButtonMutation
                                    text="Snooze"
                                    variables={{ state: props.data.variables.state, opportunityId: props.data.alphaNextReviewOpportunity!!.id }}
                                    mutation={props.snooze}
                                    onSuccess={() => {
                                        trackEvent('Parcel Snoozed', { parcelId: props.data.alphaNextReviewOpportunity!!.parcel.id });
                                        props.data.refetch({ forceFetch: true });
                                    }}
                                />
                            )}
                            {/* </XWithRole> */}
                            {/* <XWithRole role="feature-customer-kassita">
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
                            </XWithRole> */}
                        </>
                        {canMoveNext && (
                            <XButtonMutation
                                text={approveText}
                                variables={{ state: props.data.variables.state, opportunityId: props.data.alphaNextReviewOpportunity!!.id }}
                                mutation={props.approve}
                                onSuccess={() => {
                                    trackEvent('Parcel Approved', { parcelId: props.data.alphaNextReviewOpportunity!!.parcel.id });
                                    props.data.refetch({ forceFetch: true });
                                }}
                                style="primary"
                            />
                        )}

                        {canReset && (<XButtonMutation
                            text="Restart review"
                            variables={{ state: props.data.variables.state, opportunityId: props.data.alphaNextReviewOpportunity!!.id }}
                            mutation={props.reset}
                            onSuccess={() => {
                                trackEvent('Parsel Reset', { parcelId: props.data.alphaNextReviewOpportunity!!.parcel.id });
                                props.data.refetch({ forceFetch: true });
                            }}
                        />
                        )}
                    </XHeader>
                )}
                {(!props.data.alphaNextReviewOpportunity && (!props.data.loading)) && (
                    <XEmpty text="There are no parcels for review" icon="sort" />
                )}
            </XLoader>
            {props.data.alphaNextReviewOpportunity && (!props.data.loading) && (
                <OpportunityDescription parcel={props.data.alphaNextReviewOpportunity.parcel} parcelNotes={props.parcelNotes} router={props.router} />
            )}
        </XVertical>
    );
}) as React.ComponentType<{ variables?: any } & XWithRouter>;

export default withApp('Initial Review', 'viewer', withRouter((props) => {
    let state: 'INCOMING' | 'APPROVED_INITIAL' | 'APPROVED_ZONING' | 'APPROVED' | 'REJECTED' | 'SNOOZED' = 'INCOMING';
    let title = 'Initial Review';
    if (props.router.routeQuery.stage) {
        if (props.router.routeQuery.stage === 'zoning') {
            state = 'APPROVED_INITIAL';
            title = 'Zoning Review';
        } else if (props.router.routeQuery.stage === 'unit') {
            state = 'APPROVED_ZONING';
            title = 'Unit Placement Review';
        } else if (props.router.routeQuery.stage === 'approved') {
            state = 'APPROVED';
            title = 'Approved';
        } else if (props.router.routeQuery.stage === 'rejected') {
            state = 'REJECTED';
            title = 'Rejected';
        } else if (props.router.routeQuery.stage === 'snoozed') {
            state = 'SNOOZED';
            title = 'Snoozed';
        }
    }

    let q = buildProspectingQuery(props.router);

    return (
        <>
            <XDocumentHead title={title} />
            <ProspectingScaffold>
                <Scaffold.Content bottomOffset={true} padding={false}>
                    <OpportunityInfo variables={{ state: state, query: q.query }} router={props.router} />
                </Scaffold.Content>
            </ProspectingScaffold>
        </>
    );
}));