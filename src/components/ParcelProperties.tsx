import * as React from 'react';
import * as Types from '../api/Types';
import { XCard } from './X/XCard';
import { XArea } from './X/XArea';
import { XMoney } from './X/XMoney';
import { XZoningCode } from './X/XZoningCode';
import { OwnerTypeComponent } from './OwnerTypeComponent';
export function ParcelProperties(props: { item: Types.ParcelFullFragment }) {
    return (
        <>
            <XCard.PropertyColumns>
                <XCard.PropertyList title="Parcel details">
                    {props.item.extrasOwnerType &&
                        <XCard.Property title="Owner Type"><OwnerTypeComponent type={props.item.extrasOwnerType!!} /></XCard.Property>
                    }
                    {props.item.extrasOwnerName &&
                        <XCard.Property title="Owner Name">{props.item.extrasOwnerName}</XCard.Property>
                    }
                    {props.item.block &&
                        <XCard.Property title="Block">{props.item.block.title}</XCard.Property>
                    }
                    {props.item.extrasArea &&
                        <XCard.Property title="Parcel Area"><XArea area={props.item.extrasArea!!} /></XCard.Property>
                    }
                    {props.item.extrasNeighborhood &&
                        <XCard.Property title="Neighborhood">{props.item.extrasNeighborhood}</XCard.Property>
                    }
                    {props.item.extrasSupervisorDistrict &&
                        <XCard.Property title="Supervisor District">{props.item.extrasSupervisorDistrict}</XCard.Property>
                    }
                    {props.item.extrasZoning && props.item.extrasZoning!!.length > 0 &&
                        <XCard.Property title="Zoning"><XZoningCode codes={props.item!!.extrasZoning!!} /></XCard.Property>
                    }
                    {props.item!!.extrasLandUse !== null &&
                        <XCard.Property title="Land Use">{props.item!!.extrasLandUse!!.join(',\u00A0')}</XCard.Property>
                    }
                    {props.item.extrasLandValue !== null &&
                        <XCard.Property title="Land Value"><XMoney value={props.item.extrasLandValue!!} /></XCard.Property>
                    }
                    {props.item.extrasImprovementValue !== null &&
                        <XCard.Property title="Improvement Value"><XMoney value={props.item.extrasImprovementValue!!} /></XCard.Property>
                    }
                    {props.item.extrasFixturesValue !== null &&
                        <XCard.Property title="Fixtures Value"><XMoney value={props.item.extrasFixturesValue!!} /></XCard.Property>
                    }
                    {props.item.extrasPropertyValue !== null &&
                        <XCard.Property title="Personal Property Value"><XMoney value={props.item.extrasPropertyValue!!} /></XCard.Property>
                    }
                </XCard.PropertyList>
                {(props.item!!.extrasYear !== null
                    || props.item!!.extrasUnits !== null
                    || props.item!!.extrasStories !== null
                    || props.item!!.extrasRooms !== null
                    || props.item!!.extrasBedrooms !== null
                    || props.item!!.extrasBathrooms !== null
                    || props.item!!.extrasBathrooms !== null
                    || props.item!!.metadata.currentUse !== null) && (
                        <XCard.PropertyList title="Current Building">
                            {props.item!!.metadata.currentUse !== null &&
                                <XCard.Property title="Current Use">{props.item!!.metadata.currentUse}</XCard.Property>
                            }
                            {props.item!!.extrasSalesDate !== null &&
                                <XCard.Property title="Sale Date">{props.item!!.extrasSalesDate}</XCard.Property>
                            }
                            {props.item!!.extrasSalesPriorDate !== null &&
                                <XCard.Property title="Prior Sale Date">{props.item!!.extrasSalesPriorDate}</XCard.Property>
                            }
                            {props.item!!.extrasYear !== null &&
                                <XCard.Property title="Year Built">{props.item!!.extrasYear}</XCard.Property>
                            }
                            {props.item!!.extrasUnits !== null &&
                                <XCard.Property title="Buildings Count">{props.item!!.extrasUnits}</XCard.Property>
                            }
                            {props.item!!.extrasStories !== null &&
                                <XCard.Property title="Stories Count">{props.item!!.extrasStories}</XCard.Property>
                            }
                            {props.item!!.extrasRooms !== null &&
                                <XCard.Property title="Rooms Count">{props.item!!.extrasRooms}</XCard.Property>
                            }
                            {props.item!!.extrasBedrooms !== null &&
                                <XCard.Property title="Bedrooms Count">{props.item!!.extrasBedrooms}</XCard.Property>
                            }
                            {props.item!!.extrasBathrooms !== null &&
                                <XCard.Property title="Bathrooms Count">{props.item!!.extrasBathrooms}</XCard.Property>
                            }
                        </XCard.PropertyList>
                    )}
            </XCard.PropertyColumns>
            {(props.item.extrasMetroDistance !== null
                || props.item.extrasTrainLocalDistance !== null
                || props.item.extrasTrainDistance !== null)
                && (
                    <XCard.PropertyList title="Nearby Transit">
                        {props.item.extrasMetroDistance !== null &&
                            <XCard.Property title="Muni Metro">{props.item.extrasMetroDistance} ({props.item.extrasMetroStation})</XCard.Property>
                        }
                        {props.item.extrasTrainLocalDistance !== null &&
                            <XCard.Property title="BART">{props.item.extrasTrainLocalDistance} ({props.item.extrasTrainLocalStation})</XCard.Property>
                        }
                        {props.item.extrasTrainDistance !== null &&
                            <XCard.Property title="Caltrain">{props.item.extrasTrainDistance} ({props.item.extrasTrainStation})</XCard.Property>
                        }
                    </XCard.PropertyList>
                )}
        </>
    );
}