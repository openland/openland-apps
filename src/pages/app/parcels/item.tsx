import * as React from 'react';
import { withApp } from '../../../components/App/withApp';
import { XCard } from '../../../components/X/XCard';
import { withParcel } from '../../../api/index';
import { AppContent } from '../../../components/App/AppContent';
import { XButton } from '../../../components/X/XButton';
import { convertMapPatch, findCenter } from '../../../utils/map';
import { XMap } from '../../../components/X/XMap';
import { XLink } from '../../../components/X/XLink';
import { XArea } from '../../../components/X/XArea';
import { XMoney } from '../../../components/X/XMoney';
import { formatAddresses } from '../../../utils/Addresses';
import { AStreetViewModal } from '../../../components/App/AStreetViewModal';

export default withApp(withParcel((props) => {

    return (
        <AppContent>
            <XCard shadow="medium" separators={true}>
                <XCard.Hint title="Public" />
                <XCard.Header title={'Parcel #' + props.data.item.title} description={formatAddresses(props.data.item.addresses)}>
                    {props.data.item.geometry && <AStreetViewModal geometry={props.data.item.geometry} />}
                    <XButton>Edit</XButton>
                </XCard.Header>
                <XCard.PropertyColumns>
                    <XCard.PropertyList>
                        <XCard.Property title="Block"><XLink path={'/app/blocks/' + props.data.item.block.id}>{props.data.item.block.title}</XLink></XCard.Property>
                        {props.data.item.extrasArea &&
                            <XCard.Property title="Parcel Area"><XArea area={props.data.item.extrasArea} /></XCard.Property>
                        }
                        {props.data.item!!.extrasNeighborhood &&
                            <XCard.Property title="Neighborhood">{props.data.item!!.extrasNeighborhood}</XCard.Property>
                        }
                        {props.data.item.extrasSupervisorDistrict &&
                            <XCard.Property title="Supervisor District">{props.data.item.extrasSupervisorDistrict}</XCard.Property>
                        }
                        {props.data.item.extrasZoning && props.data.item.extrasZoning.length > 0 &&
                            <XCard.Property title="Zoning">{props.data.item.extrasZoning.join()}</XCard.Property>
                        }

                        {props.data.item.extrasLandValue !== null &&
                            <XCard.Property title="Land Value"><XMoney value={props.data.item.extrasLandValue} /></XCard.Property>
                        }
                        {props.data.item.extrasImprovementValue !== null &&
                            <XCard.Property title="Improvement Value"><XMoney value={props.data.item.extrasImprovementValue} /></XCard.Property>
                        }
                        {props.data.item.extrasFixturesValue !== null &&
                            <XCard.Property title="Fixtures Value"><XMoney value={props.data.item.extrasFixturesValue} /></XCard.Property>
                        }
                        {props.data.item.extrasPropertyValue !== null &&
                            <XCard.Property title="Personal Property Value"><XMoney value={props.data.item.extrasPropertyValue} /></XCard.Property>
                        }
                    </XCard.PropertyList>
                    <XCard.PropertyList>
                        {props.data.item!!.extrasYear !== null &&
                            <XCard.Property title="Year Built">{props.data.item!!.extrasYear}</XCard.Property>
                        }
                        {props.data.item.extrasStories !== null &&
                            <XCard.Property title="Stories Count">{props.data.item.extrasStories}</XCard.Property>
                        }
                        {props.data.item.extrasUnits !== null &&
                            <XCard.Property title="Units Count">{props.data.item.extrasUnits}</XCard.Property>
                        }
                        {props.data.item.extrasRooms !== null &&
                            <XCard.Property title="Rooms Count">{props.data.item.extrasRooms}</XCard.Property>
                        }
                        {props.data.item.extrasBedrooms !== null &&
                            <XCard.Property title="Bedrooms Count">{props.data.item.extrasBedrooms}</XCard.Property>
                        }
                        {props.data.item.extrasBathrooms !== null &&
                            <XCard.Property title="Bathrooms Count">{props.data.item.extrasBathrooms}</XCard.Property>
                        }
                    </XCard.PropertyList>
                </XCard.PropertyColumns>
            </XCard>
            {props.data.item.geometry && (
                <XCard shadow="medium">
                    <XCard.Map location={findCenter(convertMapPatch(props.data.item.geometry))}>
                        <XMap.Overlay
                            id={'some'}
                            records={[{ id: 'parcel', geometry: props.data.item.geometry }]}
                        />
                    </XCard.Map>
                </XCard>
            )}
        </AppContent>
    )
}));