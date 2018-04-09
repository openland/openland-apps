import * as React from 'react';
import Glamorous from 'glamorous';
import { XCard } from './X/XCard';
import { withParcelDirect } from '../api';
import { XButton } from './X/XButton';
import { formatAddresses } from '../utils/Addresses';
import { XArea } from './X/XArea';
import { XMoney } from './X/XMoney';
import { XDistance } from './X/XDistance';
import { AStreetViewModalPreview } from './App/AStreetViewModal';
import { AStreetViewModal } from './App/AStreetViewModal';
import { XHorizontal } from './X/XHorizontal';
import { XZoningCode } from './X/XZoningCode';
import { trackEvent } from '../utils/analytics';
import { OwnerTypeComponent } from './OwnerTypeComponent';
import { XTooltip } from './Incubator/XTooltip';
import { XWithRole } from './X/XWithRole';
import { XDimensions } from './X/XDimensions';
import { ProjectTypes } from './ProjectTypes';
import { XNumber } from './X/XNumber';
import { XView } from './X/XView';
import { OpportunitiButton } from './OpportunityButton';

let Container = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    zIndex: 1,

    width: 305,

    backgroundColor: '#ffffff',
    boxShadow: '0 7px 14px 0 rgba(50,50,93,.1), 0 3px 6px 0 rgba(0,0,0,.07)'
});

let LoaderWrapper = Glamorous(XCard.Loader)({
    flexGrow: 1
});

let Scrollable = Glamorous.div({
    width: '100%',
    height: '100vh',
    overflowY: 'auto'
});

let StreetViewDiv = Glamorous.div({
    position: 'relative',
    '& > a': {
        position: 'absolute',
        top: 8,
        right: 8
    }
});

function PropertyCell(props: { title: string, children: any }) {
    return (
        <XCard.Property {...props} width={150}>{props.children}</XCard.Property>
    );
}

export const ParcelCard = withParcelDirect((props) => {
    return (
        <Container>
            <LoaderWrapper loading={!props.data || props.data!!.loading}>
                {props.data && props.data!!.item &&
                    <Scrollable>
                        <XCard.Header
                            text={'Parcel #' + props.data.item!!.title}
                            description={formatAddresses(props.data.item!!.addresses, props.data.item!!.extrasAddress)}
                            truncateDescription={true}
                            bullet={props.data!!.item!!.metadata.available ? 'ON SALE' : undefined}
                        >
                            <XButton borderless={true} size="large" query={{ field: 'selectedParcel' }} icon="clear" />
                        </XCard.Header>
                        {props.data!!.item!!.geometry && (
                            <XCard.Content>
                                <StreetViewDiv>
                                    <AStreetViewModal geometry={props.data!!.item!!.geometry!!} />
                                    <AStreetViewModalPreview geometry={props.data!!.item!!.geometry!!} width={273} height={144} />
                                </StreetViewDiv>
                            </XCard.Content>
                        )}
                        <XCard.Content>
                            <XHorizontal>
                                <XButton
                                    path={'/parcels/' + props.data.item!!.id}
                                    size="medium"
                                    flexGrow={1}
                                    flexBasis={0}
                                >
                                    Details
                                </XButton>
                                <XView grow={1} basis={0}>
                                    <XWithRole role={['super-admin', 'software-developer', 'feature-portfolio']} negate={true}>
                                        <XButton
                                            accent={true}
                                            icon={props.data!!.item!!.likes.liked ? 'favorite' : 'favorite_border'}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (props.data!!.item!!.likes.liked) {
                                                    trackEvent('Unlike Parcel', { id: props.data!!.item!!.id });
                                                    (props as any).doUnlike({
                                                        optimisticResponse: {
                                                            __typename: 'Mutation',
                                                            unlikeParcel: {
                                                                __typename: 'Parcel',
                                                                id: props.data!!.item!!.id,
                                                                likes: {
                                                                    __typename: 'Likes',
                                                                    liked: false,
                                                                    count: Math.max(0, props.data!!.item!!.likes!!.count!! - 1)
                                                                }
                                                            },
                                                        }
                                                    });
                                                } else {
                                                    trackEvent('Like Parcel', { id: props.data!!.item!!.id });
                                                    (props as any).doLike({
                                                        optimisticResponse: {
                                                            __typename: 'Mutation',
                                                            likeParcel: {
                                                                __typename: 'Parcel',
                                                                id: props.data!!.item!!.id,
                                                                likes: {
                                                                    __typename: 'Likes',
                                                                    liked: true,
                                                                    count: props.data!!.item!!.likes!!.count!! + 1
                                                                }
                                                            },
                                                        }
                                                    });
                                                }
                                            }}
                                            size="medium"
                                            flexGrow={1}
                                            flexBasis={0}
                                        >
                                            Favorite
                                    </XButton>
                                    </XWithRole>
                                    <XWithRole role={['super-admin', 'software-developer', 'feature-portfolio']}>
                                        <OpportunitiButton
                                            parcelId={props.data!!.item!!.id}
                                            opportunityId={props.data!!.item!!.opportunity ? props.data!!.item!!.opportunity!!.id : undefined}
                                        />
                                    </XWithRole>
                                </XView>
                            </XHorizontal>
                        </XCard.Content>

                        <XCard.PropertyList title="Parcel details">
                            {props.data.item!!.extrasOwnerType &&
                                <PropertyCell title="Owner Type"><OwnerTypeComponent type={props.data.item!!.extrasOwnerType!!} /></PropertyCell>
                            }
                            {props.data.item!!.extrasOwnerName &&
                                <PropertyCell title="Owner Name">{props.data.item!!.extrasOwnerName}</PropertyCell>
                            }
                            {props.data.item!!.block &&
                                <PropertyCell title="Block">{props.data.item!!.block!!.title}</PropertyCell>
                            }
                            {props.data.item!!.extrasArea &&
                                <PropertyCell title="Parcel Area"><XArea area={props.data.item!!.extrasArea!!} /></PropertyCell>
                            }
                            {/* {props.data.item!!.extrasShapeType &&
                                <PropertyCell title="Parcel Type">{props.data.item!!.extrasShapeType}</PropertyCell>
                            } */}
                            {props.data.item!!.extrasShapeSides && props.data.item!!.extrasShapeSides!!.length > 0 &&
                                <PropertyCell title="Parcel Dimensions"> <XDimensions dimensions={props.data.item!!.extrasShapeSides!!} /></PropertyCell>
                            }
                            <XWithRole role={['feature-customer-kassita', 'editor', 'software-developer', 'super-admin']}>
                                {props.data.item!!.extrasAnalyzed !== true &&
                                    <PropertyCell title="Compatible buildings">
                                        <XTooltip noMargin={true} title="Openland systems detected that this parcel is too complex for automatical building placement." />
                                        This parcel is too complex to analyze
                                    </PropertyCell>
                                }
                                {props.data.item!!.extrasAnalyzed === true && props.data.item!!.extrasFitProjects &&
                                    <PropertyCell title="Compatible buildings"><ProjectTypes types={props.data.item!!.extrasFitProjects!!} /></PropertyCell>
                                }
                            </XWithRole>
                            {props.data.item!!.extrasNeighborhood &&
                                <PropertyCell title="Neighborhood">{props.data.item!!.extrasNeighborhood}</PropertyCell>
                            }
                            {props.data.item!!.extrasSupervisorDistrict &&
                                <PropertyCell title="Supervisor District">{props.data.item!!.extrasSupervisorDistrict}</PropertyCell>
                            }
                            {props.data.item!!.extrasZoning && props.data.item!!.extrasZoning!!.length > 0 &&
                                <PropertyCell title="Zoning"><XZoningCode codes={props.data.item!!.extrasZoning!!} /></PropertyCell>
                            }
                            {props.data.item!!.extrasLandUse !== null &&
                                <PropertyCell title="Land Use">{props.data.item!!.extrasLandUse}</PropertyCell>
                            }

                            {props.data.item!!.extrasLandValue !== null &&
                                <PropertyCell title="Land Value"><XMoney value={props.data.item!!.extrasLandValue!!} /></PropertyCell>
                            }
                            {props.data.item!!.extrasImprovementValue !== null &&
                                <PropertyCell title="Improvement Value"><XMoney value={props.data.item!!.extrasImprovementValue!!} /></PropertyCell>
                            }
                            {props.data.item!!.extrasFixturesValue !== null &&
                                <PropertyCell title="Fixtures Value"><XMoney value={props.data.item!!.extrasFixturesValue!!} /></PropertyCell>
                            }
                            {props.data.item!!.extrasPropertyValue !== null &&
                                <PropertyCell title="Personal Property Value"><XMoney value={props.data.item!!.extrasPropertyValue!!} /></PropertyCell>
                            }
                        </XCard.PropertyList>
                        {(props.data.item!!.extrasYear !== null
                            || props.data.item!!.extrasUnits !== null
                            || props.data.item!!.extrasStories !== null
                            || props.data.item!!.extrasRooms !== null
                            || props.data.item!!.extrasBedrooms !== null
                            || props.data.item!!.extrasBathrooms !== null
                            || props.data.item!!.extrasBathrooms !== null
                            || props.data.item!!.metadata.currentUse !== null
                            || props.data.item!!.extrasSalesDate !== null
                            || props.data.item!!.extrasSalesPriorDate !== null
                            || props.data.item!!.extrasVacant !== null) && (
                                <XCard.PropertyList title="Current Building">
                                    {props.data.item!!.extrasVacant !== null &&
                                        <PropertyCell title="Vacant">{props.data.item!!.extrasVacant ? 'Yes' : 'No'}</PropertyCell>
                                    }
                                    {props.data.item!!.metadata.currentUse !== null &&
                                        <PropertyCell title="Current Use">{props.data.item!!.metadata.currentUse}</PropertyCell>
                                    }
                                    {props.data.item!!.extrasSalesDate !== null &&
                                        <PropertyCell title="Sale Date">{props.data.item!!.extrasSalesDate}</PropertyCell>
                                    }
                                    {props.data.item!!.extrasSalesPriorDate !== null &&
                                        <PropertyCell title="Prior Sale Date">{props.data.item!!.extrasSalesPriorDate}</PropertyCell>
                                    }
                                    {props.data.item!!.extrasYear !== null &&
                                        <PropertyCell title="Year Built"><XNumber value={props.data.item!!.extrasYear} /></PropertyCell>
                                    }
                                    {props.data.item!!.extrasUnits !== null &&
                                        <PropertyCell title="Buildings Count"><XNumber value={props.data.item!!.extrasUnits} /></PropertyCell>
                                    }
                                    {props.data.item!!.extrasStories !== null &&
                                        <PropertyCell title="Stories Count"><XNumber value={props.data.item!!.extrasStories} /></PropertyCell>
                                    }
                                    {props.data.item!!.extrasRooms !== null &&
                                        <PropertyCell title="Rooms Count"><XNumber value={props.data.item!!.extrasRooms} /></PropertyCell>
                                    }
                                    {props.data.item!!.extrasBedrooms !== null &&
                                        <PropertyCell title="Bedrooms Count"><XNumber value={props.data.item!!.extrasBedrooms} /></PropertyCell>
                                    }
                                    {props.data.item!!.extrasBathrooms !== null &&
                                        <PropertyCell title="Bathrooms Count"><XNumber value={props.data.item!!.extrasBathrooms} /></PropertyCell>
                                    }
                                </XCard.PropertyList>
                            )}
                        {(props.data.item!!.extrasMetroDistance !== null
                            || props.data.item!!.extrasTrainLocalDistance !== null
                            || props.data.item!!.extrasTrainDistance !== null)
                            && (
                                <XCard.PropertyList title="Nearby Transit">
                                    {props.data.item!!.extrasMetroDistance !== null &&
                                        <PropertyCell title="Muni Metro"><XDistance value={props.data.item!!.extrasMetroDistance!!} /> ({props.data.item!!.extrasMetroStation})</PropertyCell>
                                    }
                                    {props.data.item!!.extrasTrainLocalDistance !== null &&
                                        <PropertyCell title="BART"><XDistance value={props.data.item!!.extrasTrainLocalDistance!!} /> ({props.data.item!!.extrasTrainLocalStation})</PropertyCell>
                                    }
                                    {props.data.item!!.extrasTrainDistance !== null &&
                                        <PropertyCell title="Caltrain"><XDistance value={props.data.item!!.extrasTrainDistance!!} /> ({props.data.item!!.extrasTrainStation})</PropertyCell>
                                    }
                                </XCard.PropertyList>
                            )}
                    </Scrollable>}
            </LoaderWrapper>
        </Container>
    );
}) as React.ComponentClass<{ parcelId: string, onClose?: () => void }>;