import * as React from 'react';
import * as Types from 'openland-api/Types';
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
import { withApp } from '../../../components/withApp';
import { withOpportunity } from '../../../api/withOpportunity';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';
import { XArea } from 'openland-x-format/XArea';
import { XMoney } from 'openland-x-format/XMoney';
import { XDistance } from 'openland-x-format/XDistance';
import { XButton } from 'openland-x/XButton';
import { XContent } from 'openland-x-layout/XContent';
import { XDimensions } from 'openland-x-format/XDimensions';
import { XHeader } from 'openland-x/XHeader';
import { XLinkExternal } from 'openland-x/XLinkExternal';
import { XSwitcher } from 'openland-x/XSwitcher';
import { XVertical } from 'openland-x-layout/XVertical';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import '../../../globals';
import { XMapSource } from 'openland-x-map/XMapSource';
import { XMapPolygonLayer } from 'openland-x-map/XMapPolygonLayer';
import { ZoningCode } from '../../../components/ZoningCode';
import { ZoningMetrics } from '../../../components/ZoningMetrics';
import { XView } from 'openland-x-layout/XView';
import { XEmpty } from 'openland-x/XEmpty';
import { XMapSmall } from 'openland-x-map/XMapSmall';
import { XLoader } from 'openland-x/XLoader';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XForm } from 'openland-x-forms/XForm';
import { XProperty, XPropertyColumns, XPropertyList } from 'openland-x/XProperty';
import { trackEvent } from 'openland-x-analytics';
import { XTooltipHint } from 'openland-x/XTooltipHint';
import { XFooter } from 'openland-x/XFooter';
import { withQueryLoader } from '../../../components/withQueryLoader';

const OpportunityDescription = (props: { parcel: Types.ParcelFullFragment, parcelNotes: MutationFunc<{}> } & XWithRouter) => {
    const detailsPath = 'review';
    const linksPath = 'links';
    const notesPath = 'notes';
    const zoningPath = 'zoning';

    return (
        <XVertical>

            <XProperty>
                <XSwitcher alignSelf="flex-start" flatStyle={true}>
                    <XSwitcher.Item query={{ field: 'tab' }} >Parcel</XSwitcher.Item>
                    <XSwitcher.Item query={{ field: 'tab', value: linksPath }} count={props.parcel.links.length}>Links</XSwitcher.Item>
                    <XSwitcher.Item query={{ field: 'tab', value: notesPath }} count={props.parcel.userData && props.parcel.userData.notes && props.parcel.userData.notes.length > 0 ? 1 : undefined}>Notes</XSwitcher.Item>
                    {/* <XWithRole role={['super-admin', 'software-developer', 'parcel-zoning-metrics']}> */}
                    <XSwitcher.Item query={{ field: 'tab', value: zoningPath }} >Zoning</XSwitcher.Item>
                    {/* </XWithRole> */}
                </XSwitcher>
            </XProperty>

            {(props.router.query.tab === detailsPath || props.router.query.tab === undefined) && (
                <>

                    <XPropertyColumns>
                        <XVertical>

                            <XPropertyList title="Parcel Details">
                                {props.parcel.extrasOwnerType && props.parcel.extrasOwnerType !== 'PRIVATE' &&
                                    <XProperty title="Ownership Type"><OwnerTypeComponent type={props.parcel.extrasOwnerType!!} /></XProperty>
                                }
                                {props.parcel.extrasOwnerName &&
                                    <XProperty title="Owner Name">{props.parcel.extrasOwnerName}</XProperty>
                                }
                                {props.parcel.area &&
                                    <XProperty title="Area"><XArea value={props.parcel.area!!.value} /></XProperty>
                                }
                                <XWithRole role={['super-admin', 'software-developer', 'unit-capacity', 'feature-customer-kassita']}>
                                    {Boolean(props.parcel.area && props.parcel.extrasUnitCapacityFar && props.parcel.extrasUnitCapacityDencity) &&
                                        <XProperty title="Unit Capacity">
                                            {props.parcel.extrasUnitCapacity}
                                            <XTooltipHint><XArea value={props.parcel.area!!.value} />{' * ' + props.parcel.extrasUnitCapacityFar + '(FAR) / ' + props.parcel.extrasUnitCapacityDencity + '(DF)'}</XTooltipHint>

                                        </XProperty>
                                    }
                                </XWithRole>
                                {props.parcel.front &&
                                    <XProperty title="Frontage"><XDistance value={props.parcel.front!!.value} /></XProperty>
                                }
                                {props.parcel.depth &&
                                    <XProperty title="Depth"><XDistance value={props.parcel.depth!!.value} /></XProperty>
                                }
                                {props.parcel!!.extrasShapeSides && !props.parcel.front && !props.parcel.depth && props.parcel!!.extrasShapeSides!!.length > 0 &&
                                    <XProperty title="Dimensions"> <XDimensions value={props.parcel!!.extrasShapeSides!!} /></XProperty>
                                }
                                {props.parcel.extrasZoning && props.parcel.extrasZoning!!.length > 0 &&
                                    <XProperty title="Zoning"><ZoningCode codes={props.parcel!!.extrasZoning!!} /></XProperty>
                                }
                                {props.parcel.extrasLandValue !== null &&
                                    <XProperty title="Land Value"><XMoney value={props.parcel.extrasLandValue!!} /></XProperty>
                                }
                                {props.parcel!!.extrasVacant !== null &&
                                    <XProperty title="Vacant">{props.parcel!!.extrasVacant ? 'Yes' : 'No'}</XProperty>
                                }
                                {props.parcel.city.name === 'New York' && (props.parcel.extrasVacant === null || props.parcel.extrasVacant) && (
                                    <XWithRole role={['feature-customer-kassita', 'editor', 'software-developer', 'super-admin']}>
                                        {props.parcel.extrasAnalyzed !== true &&
                                            <XProperty title="Compatible buildings">
                                                <XTooltipHint>{Text.hint_too_complex}</XTooltipHint>
                                                {Text.text_too_complex}
                                            </XProperty>
                                        }
                                        {props.parcel!!.extrasAnalyzed === true && props.parcel!!.extrasFitProjects &&
                                            <XProperty title="Compatible buildings"><ProjectTypes types={props.parcel!!.extrasFitProjects!!} /></XProperty>
                                        }
                                    </XWithRole>
                                )}
                            </XPropertyList>
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
                    </XPropertyColumns>
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
                    <XFooter>
                        <XForm.Submit style="primary" text="Save" />
                    </XFooter>
                </XForm>)}

            {props.router.query.tab === linksPath && props.parcel.links.length > 0 && (
                <XPropertyList title="Links">
                    {props.parcel.links.map((v, i) => (
                        <XProperty title={v.title}><XLinkExternal href={v.url}>{v.url}</XLinkExternal></XProperty>
                    ))}
                </XPropertyList>
            )}

            {props.router.query.tab === zoningPath && props.parcel.extrasZoning && props.parcel.extrasZoning!!.length > 0 &&
                // <XWithRole role={['super-admin', 'software-developer', 'parcel-zoning-metrics']}>
                <ZoningMetrics codes={props.parcel.extrasZoning!!} />
                // </XWithRole>
            }
        </XVertical>
    );
};

const OpportunityInfo = withOpportunity(withQueryLoader((props) => {
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
            <XVertical>
                <XLoader loading={props.data.loading || false} height={600} />
                {props.data.alphaNextReviewOpportunity && (!props.data.loading) && (
                    <XHeader
                        text={props.data.alphaNextReviewOpportunity!!.parcel.address || 'No address'}
                        description={<ParcelNumber city={props.data.alphaNextReviewOpportunity!!.parcel.city.name} id={props.data.alphaNextReviewOpportunity!!.parcel.number} />}
                        bullet={props.data.alphaNextReviewOpportunity!!.parcel.extrasOwnerPublic ? 'public' : undefined}
                    >
                        {mapUrl && <XButton path={mapUrl} text="View on map" />}
                        {props.data.variables.state !== 'REJECTED' && (
                            <XButton
                                text="Reject"
                                style="danger"
                                action={() =>
                                    props.reject({
                                        variables: {
                                            state: props.data.variables.state,
                                            opportunityId: props.data.alphaNextReviewOpportunity!!.id
                                        }
                                    })
                                }
                                onSuccess={() => {
                                    trackEvent('Parcel Rejected', { parcelId: props.data.alphaNextReviewOpportunity!!.parcel.id });
                                    props.data.refetch({ forceFetch: true });
                                }}
                            />
                        )}
                        <>
                            {/* <XWithRole role="feature-customer-kassita" negate={true}> */}
                            {props.data.variables.state !== 'SNOOZED' && (
                                <XButton
                                    text="Snooze"
                                    action={() => props.snooze({
                                        variables: {
                                            state: props.data.variables.state,
                                            opportunityId: props.data.alphaNextReviewOpportunity!!.id
                                        }
                                    })}
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
                            <XButton
                                text={approveText}
                                action={() => props.approve({
                                    variables: {
                                        state: props.data.variables.state,
                                        opportunityId: props.data.alphaNextReviewOpportunity!!.id
                                    }
                                })}
                                onSuccess={() => {
                                    trackEvent('Parcel Approved', { parcelId: props.data.alphaNextReviewOpportunity!!.parcel.id });
                                    props.data.refetch({ forceFetch: true });
                                }}
                                style="primary"
                            />
                        )}

                        {canReset && (<XButton
                            text="Restart review"
                            action={() => props.reset({
                                variables: {
                                    state: props.data.variables.state,
                                    opportunityId: props.data.alphaNextReviewOpportunity!!.id
                                }
                            })}
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
                {props.data.alphaNextReviewOpportunity && (!props.data.loading) && (
                    <OpportunityDescription parcel={props.data.alphaNextReviewOpportunity.parcel} parcelNotes={props.parcelNotes} router={props.router} />
                )}
            </XVertical>
        </XVertical>
    );
})) as React.ComponentType<{ variables?: any } & XWithRouter>;

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