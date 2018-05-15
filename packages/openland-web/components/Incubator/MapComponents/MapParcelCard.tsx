import * as React from 'react';
import Glamorous from 'glamorous';
import { XArea } from 'openland-x-format/XArea';
import { XDimensions } from 'openland-x-format/XDimensions';
import { XDistance } from 'openland-x-format/XDistance';
import { XMoney } from 'openland-x-format/XMoney';
import { XNumber } from 'openland-x-format/XNumber';
import { XIcon } from '../../../../openland-x/XIcon';
import { withParcelDirect } from '../../../api';
import { Text } from '../../../strings';
import { XTooltip } from '../../Incubator/XTooltip';
import { OpportunitiButton } from '../../OpportunityButton';
import { OwnerTypeComponent } from '../../OwnerTypeComponent';
import { ParcelNumber } from '../../ParcelNumber';
import { ProjectTypes } from '../../ProjectTypes';
import { XHeader } from 'openland-x/XHeader';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { ZoningCode } from '../../ZoningCode';
import { XPopover } from './XPopover';
import { XButton } from 'openland-x/XButton';
import { XContent } from 'openland-x-layout/XContent';
import { XView } from 'openland-x-layout/XView';
import { XStreetViewModal } from 'openland-x-map/XStreetViewModal';
import { XStreetViewModalPreview } from 'openland-x-map/XStreetViewModalPreview';
import { XLoader } from 'openland-x/XLoader';
import { XPropertyList } from 'openland-x/XProperty';
import { trackEvent } from 'openland-x-analytics';

const panelWidth = 335;

const ContainerStyle = Glamorous.div<{ compact: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    zIndex: 1,
    position: 'relative',
    width: props.compact ? 0 : panelWidth,
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.08)',
}));

const ContainerHider = Glamorous.div({
    width: 20,
    border: '1px solid rgba(132, 142, 143, 0.1)',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRight: 'none',
    position: 'absolute',
    top: 18,
    left: -20,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '-3px 0 3px 0 rgba(0, 0, 0, 0.08)'
});

const ContainerHiderButton = Glamorous(XButton)({
    width: 20,
    minWidth: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    border: 'none',
    boxShadow: 'none',
    transform: 'none',
    backgroundColor: '#fff',
    '& .button-content': {
        paddingLeft: 9,
        paddingRight: 10,
    },
    '&:hover, &:active, &:focus': {
        border: 'none',
        boxShadow: 'none',
        transform: 'none',
    }
});

const Scrollable = Glamorous.div({
    width: '100%',
    height: '100vh',
    overflowY: 'auto',
    paddingBottom: 90
});

interface ContainerProps {
    children: any;
    parcel?: string;
    mapMode?: string;
}

class Container extends React.Component<ContainerProps, { compact: boolean }> {
    contentRef: any | null = null;

    constructor(props: ContainerProps) {
        super(props);

        this.state = {
            compact: false
        };
    }

    handleContentRef = (ref: any | null) => {
        this.contentRef = ref;
    }

    compacter = () => {
        this.setState({
            compact: !this.state.compact
        });
    }

    shouldComponentUpdate(nextProps: any) {
        let contentDiv = this.contentRef;

        if (this.props.parcel !== nextProps.parcel) {
            this.setState({
                compact: false
            });
            contentDiv.scrollTop = 0;
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <ContainerStyle compact={this.state.compact}>
                <ContainerHider>
                    <ContainerHiderButton query={{ field: 'mode', value: this.props.mapMode }} onClick={this.compacter} icon={this.state.compact ? 'keyboard_arrow_left' : 'keyboard_arrow_right'} />
                </ContainerHider>
                <Scrollable innerRef={this.handleContentRef}>
                    {this.props.children}
                </Scrollable>
            </ContainerStyle>
        );
    }
}

const StreetViewDiv = Glamorous.div({
    position: 'relative',
    '& > a': {
        position: 'absolute',
        top: 16,
        left: 171
    }
});

const Notes = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fdfaf6',
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 18,
    paddingBottom: 18
});

const ItemIcon = Glamorous(XIcon)({
    marginRight: 10,
    width: 16,
    fontSize: 16,
    color: '#E8695F'
});

const PropertyCellContainer = Glamorous.div({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 18,
    paddingRight: 18,
    marginBottom: 12,
    '&:last-child': {
        marginBottom: 0
    }
});

const PropertyCellTitle = Glamorous.div<{ width?: number }>((props) => ({
    width: props.width ? props.width : 150,
    flexShrink: 0,
    opacity: 0.4,
    fontSize: 16,
    lineHeight: 1.25,
    letterSpacing: -0.2,
    color: '#1f3449'
}));

const PropertyCellValue = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: 16,
    letterSpacing: -0.1,
    color: '#1f3449'
});

const PropertyCell = (props: { children: any, title?: string, width?: number, compact?: boolean }) => (
    <PropertyCellContainer>
        {props.title && (<PropertyCellTitle width={props.width}>{props.title}</PropertyCellTitle>)}
        {React.Children.count(props.children) > 0 && <PropertyCellValue>{props.children}</PropertyCellValue>}
    </PropertyCellContainer>
);

const DottedStyle = Glamorous.div({
    width: 4,
    height: 4,
    borderRadius: 100,
    backgroundColor: '#abbacb',
    marginBottom: 2,
    '&:last-child': {
        marginBottom: 0,
    }
});

const DottedMenuButtonStyle = Glamorous.div({
    width: 40,
    height: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
});

const DottedMenuButton = () => (
    <DottedMenuButtonStyle>
        <DottedStyle />
        <DottedStyle />
        <DottedStyle />
    </DottedMenuButtonStyle>
);

const ProspectingWrapper = Glamorous.div({
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 18,
    paddingBottom: 18,
    boxShadow: '2px 2px 8px 0 rgba(0, 0, 0, 0.22)',
    backgroundColor: '#fff'
});

const SeparatedDiv = Glamorous(XContent)({
    borderBottom: '1px solid rgba(97, 126, 156, 0.2)',
    marginTop: 2,
    paddingBottom: 18,
    paddingLeft: 18,
    paddingRight: 18,
});

const MenuButtonWrapper = Glamorous.div({
    position: 'absolute',
    right: -16,
    top: -20
});

const PropertySeparatedDiv = Glamorous(XPropertyList)();

export const ParcelCard = withParcelDirect((props) => (
    <Container parcel={props.variables.parcelId} mapMode={props.mapMode}>
        <XLoader loading={!props.data || props.data!!.loading} />
        {props.data && props.data!!.item &&
            <>
                <XHeader
                    text={props.data.item!!.address || 'No address'}
                    description={<ParcelNumber id={props.data.item!!.number} />}
                    truncateDescription={true}
                    bullet={props.data!!.item!!.extrasOwnerPublic ? 'public' : (props.data!!.item!!.metadata.available ? 'ON SALE' : undefined)}
                    style="compact"
                >
                    <MenuButtonWrapper>
                        <XPopover placement="bottom-start">
                            <XPopover.Target>
                                <DottedMenuButton />
                            </XPopover.Target>
                            <XPopover.Content>
                                <XButton
                                    path={'/parcels/' + props.data.item!!.id}
                                    flexGrow={1}
                                    flexBasis={0}
                                    text="Details"
                                />
                                <XButton query={{ field: 'selectedParcel' }} text="Close" />
                            </XPopover.Content>
                        </XPopover>
                    </MenuButtonWrapper>
                </XHeader>
                {props.data!!.item!!.geometry && (
                    <SeparatedDiv>
                        <StreetViewDiv>
                            <XStreetViewModal geometry={props.data!!.item!!.geometry!!} />
                            <XStreetViewModalPreview geometry={props.data!!.item!!.geometry!!} width={panelWidth - 32} height={170} />
                        </StreetViewDiv>
                    </SeparatedDiv>
                )}

                {props.data.item!!.userData && props.data.item!!.userData!!.notes && (
                    <Notes>
                        <ItemIcon icon="edit" />
                        <div>
                            {props.data.item!!.userData!!.notes}
                        </div>
                    </Notes>
                )}

                <PropertySeparatedDiv title="Parcel details" compact={true}>
                    {props.data.item!!.extrasOwnerType && props.data.item!!.extrasOwnerType !== 'PRIVATE' &&
                        <PropertyCell title="Ownership Type"><OwnerTypeComponent type={props.data.item!!.extrasOwnerType!!} /></PropertyCell>
                    }
                    {props.data.item!!.extrasOwnerName &&
                        <PropertyCell title="Owner Name">{props.data.item!!.extrasOwnerName}</PropertyCell>
                    }
                    {props.data.item!!.area &&
                        <PropertyCell title="Area"><XArea value={props.data.item!!.area!!.value} /></PropertyCell>
                    }
                    <XWithRole role={['super-admin', 'software-developer', 'unit-capacity', 'feature-customer-kassita']}>
                        {Boolean(props.data.item!!.area && props.data.item!!.extrasUnitCapacityDencity && props.data.item!!.extrasUnitCapacityFar) &&
                            <PropertyCell title="Unit Capacity">
                                {props.data.item!!.extrasUnitCapacity}
                                <XTooltip placement="left" type="info">
                                    <XTooltip.Content><XArea value={props.data.item!!.area!!.value} />
                                        {' * ' + props.data.item!!.extrasUnitCapacityFar + '(FAR) / ' + props.data.item!!.extrasUnitCapacityDencity + '(DF)'}
                                    </XTooltip.Content>
                                </XTooltip>
                            </PropertyCell>
                        }
                    </XWithRole>
                    {props.data.item!!.front &&
                        <PropertyCell title="Frontage"><XDistance value={props.data.item!!.front!!.value} /></PropertyCell>
                    }
                    {props.data.item!!.depth &&
                        <PropertyCell title="Depth"><XDistance value={props.data.item!!.depth!!.value} /></PropertyCell>
                    }
                    {props.data.item!!.extrasShapeSides && !props.data.item!!.front && !props.data.item!!.depth && props.data.item!!.extrasShapeSides!!.length > 0 &&
                        <PropertyCell title="Dimensions"> <XDimensions value={props.data.item!!.extrasShapeSides!!} /></PropertyCell>
                    }
                    {props.data.item!!.city.name === 'New York' && (props.data.item!!.extrasVacant === null || props.data.item!!.extrasVacant) && (
                        <XWithRole role={['feature-customer-kassita', 'editor', 'software-developer', 'super-admin']}>
                            {props.data.item!!.extrasAnalyzed !== true &&
                                <PropertyCell title="Compatible buildings">
                                    <XTooltip title={Text.hint_too_complex} marginLeft={0} />
                                    {Text.text_too_complex}
                                </PropertyCell>
                            }
                            {props.data.item!!.extrasAnalyzed === true && props.data.item!!.extrasFitProjects &&
                                <PropertyCell title="Compatible buildings"><ProjectTypes types={props.data.item!!.extrasFitProjects!!} /></PropertyCell>
                            }
                        </XWithRole>
                    )}
                    {props.data.item!!.extrasNeighborhood &&
                        <PropertyCell title="Neighborhood">{props.data.item!!.extrasNeighborhood}</PropertyCell>
                    }
                    {props.data.item!!.extrasSupervisorDistrict &&
                        <PropertyCell title="Supervisor District">{props.data.item!!.extrasSupervisorDistrict}</PropertyCell>
                    }
                    {props.data.item!!.extrasZoning && props.data.item!!.extrasZoning!!.length > 0 &&
                        <PropertyCell title="Zoning"><ZoningCode codes={props.data.item!!.extrasZoning!!} /></PropertyCell>
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
                </PropertySeparatedDiv>
                {(props.data.item!!.extrasYear !== null
                    || props.data.item!!.extrasUnits !== null
                    || props.data.item!!.extrasStories !== null
                    || props.data.item!!.extrasRooms !== null
                    || props.data.item!!.extrasBedrooms !== null
                    || props.data.item!!.extrasBathrooms !== null
                    || props.data.item!!.metadata.currentUse !== null
                    || props.data.item!!.extrasSalesDate !== null
                    || props.data.item!!.extrasSalesPriorDate !== null
                    || props.data.item!!.extrasVacant !== null) && (
                        <PropertySeparatedDiv title="Current Building" compact={true}>
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
                        </PropertySeparatedDiv>
                    )}
                {(props.data.item!!.extrasMetroDistance !== null
                    || props.data.item!!.extrasTrainLocalDistance !== null
                    || props.data.item!!.extrasTrainDistance !== null)
                    && (
                        <PropertySeparatedDiv title="Nearby Transit" compact={true}>
                            {props.data.item!!.extrasMetroDistance !== null &&
                                <PropertyCell title="Muni Metro"><XDistance value={props.data.item!!.extrasMetroDistance!!} /> ({props.data.item!!.extrasMetroStation})</PropertyCell>
                            }
                            {props.data.item!!.extrasTrainLocalDistance !== null &&
                                <PropertyCell title="BART"><XDistance value={props.data.item!!.extrasTrainLocalDistance!!} /> ({props.data.item!!.extrasTrainLocalStation})</PropertyCell>
                            }
                            {props.data.item!!.extrasTrainDistance !== null &&
                                <PropertyCell title="Caltrain"><XDistance value={props.data.item!!.extrasTrainDistance!!} /> ({props.data.item!!.extrasTrainStation})</PropertyCell>
                            }
                        </PropertySeparatedDiv>
                    )}
                <ProspectingWrapper>
                    <XView grow={1} basis={0}>
                        <XWithRole role={['super-admin', 'software-developer', 'feature-portfolio']} negate={true}>
                            <XButton
                                text="Favorite"
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
                            />
                        </XWithRole>
                        <XWithRole role={['super-admin', 'software-developer', 'feature-portfolio']}>
                            <OpportunitiButton
                                size="medium"
                                parcelId={props.data!!.item!!.id}
                                opportunityId={props.data!!.item!!.opportunity ? props.data!!.item!!.opportunity!!.id : undefined}
                                opportunityState={props.data!!.item!!.opportunity ? props.data!!.item!!.opportunity!!.state : undefined}
                            />
                        </XWithRole>
                    </XView>
                </ProspectingWrapper>
            </>}
    </Container>
)) as React.ComponentClass<{ variables: { parcelId: string }, mapMode?: string, compact?: boolean, onClose?: () => void }>;