import * as React from 'react';
import Glamorous from 'glamorous';
import { XCard } from './X/XCard';
import { withParcelDirect } from '../api';
import { XButton } from './X/XButton';
import { formatAddresses } from '../utils/Addresses';
import { XLink } from './X/XLink';
import { XArea } from './X/XArea';
import { XMoney } from './X/XMoney';
import { XDistance } from './X/XDistance';
import { AStreetViewModalPreview } from './App/AStreetViewModal';
import { XHorizontal } from './X/XHorizontal';

let Container = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    zIndex: 1,

    width: '416px',

    backgroundColor: '#ffffff',
    boxShadow: '0 7px 14px 0 rgba(50,50,93,.1), 0 3px 6px 0 rgba(0,0,0,.07)'
});

let LoaderWrapper = Glamorous(XCard.Loader)({
    flexGrow: 1
})

let Scrollable = Glamorous.div({
    width: '100%',
    height: '100vh',
    overflowY: 'auto'
});

export const ParcelCard = withParcelDirect((props) => {
    return (
        <Container>
            <LoaderWrapper loading={props.data!!.loading}>
                {props.data && props.data!!.item &&
                    <Scrollable>
                        <XCard.Header
                            text={'Parcel Info'}
                            // description={formatAddresses(props.data.item!!.addresses)}
                            // bullet={props.data.item!!.metadata.available ? 'ON SALE' : undefined}
                            // truncateDescription={true}
                        >
                            <XButton query={{ field: 'selectedParcel' }} icon="clear" />
                        </XCard.Header>
                        {props.data!!.item!!.geometry && (
                            <XCard.Content>
                                <AStreetViewModalPreview geometry={props.data!!.item!!.geometry!!} />
                            </XCard.Content>
                        )}
                        <XCard.Content>
                            <div>{'Parcel #' + props.data.item!!.title}</div>
                            <div>{formatAddresses(props.data.item!!.addresses)}</div>
                        </XCard.Content>
                        <XCard.Content>
                            <XHorizontal>
                                <XButton path={'/app/parcels/' + props.data.item!!.id}>Details</XButton>
                                <XButton
                                    icon={props.data!!.item!!.likes.liked ? 'favorite' : 'favorite_border'}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (props.data!!.item!!.likes.liked) {
                                            (props as any).doUnlike();
                                        } else {
                                            (props as any).doLike();
                                        }
                                    }}
                                >
                                    Favorite
                                </XButton>
                            </XHorizontal>
                        </XCard.Content>

                        <XCard.PropertyList title="Parcel details">
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
                        {(props.data.item!!.extrasYear !== null
                            || props.data.item!!.extrasUnits !== null
                            || props.data.item!!.extrasStories !== null
                            || props.data.item!!.extrasRooms !== null
                            || props.data.item!!.extrasBedrooms !== null
                            || props.data.item!!.extrasBathrooms !== null
                            || props.data.item!!.extrasBathrooms !== null
                            || props.data.item!!.metadata.currentUse !== null) && (
                                <XCard.PropertyList title="Current Building">
                                    {props.data.item!!.metadata.currentUse !== null &&
                                        <XCard.Property title="Current Use">{props.data.item!!.metadata.currentUse}</XCard.Property>
                                    }
                                    {props.data.item!!.extrasYear !== null &&
                                        <XCard.Property title="Year Built">{props.data.item!!.extrasYear}</XCard.Property>
                                    }
                                    {props.data.item!!.extrasUnits !== null &&
                                        <XCard.Property title="Buildings Count">{props.data.item!!.extrasUnits}</XCard.Property>
                                    }
                                    {props.data.item!!.extrasStories !== null &&
                                        <XCard.Property title="Stories Count">{props.data.item!!.extrasStories}</XCard.Property>
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
                            )}
                        <XCard.PropertyList title="Transit">
                            {props.data.item!!.extrasMetroDistance !== null &&
                                <XCard.Property title="Nearest Muni Metro"><XDistance value={props.data.item!!.extrasMetroDistance!!} /> ({props.data.item!!.extrasMetroStation})</XCard.Property>
                            }
                            {props.data.item!!.extrasTrainLocalDistance !== null &&
                                <XCard.Property title="Nearest BART"><XDistance value={props.data.item!!.extrasTrainLocalDistance!!} /> ({props.data.item!!.extrasTrainLocalStation})</XCard.Property>
                            }
                            {props.data.item!!.extrasTrainDistance !== null &&
                                <XCard.Property title="Nearest Caltrain"><XDistance value={props.data.item!!.extrasTrainDistance!!} /> ({props.data.item!!.extrasTrainStation})</XCard.Property>
                            }
                        </XCard.PropertyList>
                    </Scrollable>}
            </LoaderWrapper>
        </Container>
    )
}) as React.ComponentClass<{ parcelId: string, onClose?: () => void }>;