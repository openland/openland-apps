import * as React from 'react';
import * as Types from '../api/Types';
import { XCard } from './X/XCard';
import { XLink } from './X/XLink';
import { XArea } from './X/XArea';
import { XMoney } from './X/XMoney';

export function ParcelProperties(props: { item: Types.ParcelFullFragment }) {
    return (
        <XCard.PropertyColumns>
            <XCard.PropertyList>
                <XCard.Property title="Block"><XLink path={'/app/blocks/' + props.item.block.id}>{props.item.block.title}</XLink></XCard.Property>
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
                    <XCard.Property title="Zoning">{props.item.extrasZoning!!.join()}</XCard.Property>
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
            <XCard.PropertyList>
                {props.item.extrasYear !== null &&
                    <XCard.Property title="Year Built">{props.item.extrasYear}</XCard.Property>
                }
                {props.item.extrasUnits !== null &&
                    <XCard.Property title="Buildings Count">{props.item.extrasUnits}</XCard.Property>
                }
                {props.item.extrasStories !== null &&
                    <XCard.Property title="Stories Count">{props.item.extrasStories}</XCard.Property>
                }
                {props.item.extrasRooms !== null &&
                    <XCard.Property title="Rooms Count">{props.item.extrasRooms}</XCard.Property>
                }
                {props.item.extrasBedrooms !== null &&
                    <XCard.Property title="Bedrooms Count">{props.item.extrasBedrooms}</XCard.Property>
                }
                {props.item.extrasBathrooms !== null &&
                    <XCard.Property title="Bathrooms Count">{props.item.extrasBathrooms}</XCard.Property>
                }
                {props.item.metadata.description !== null &&
                    <XCard.Property title="Description">{props.item.metadata.description}</XCard.Property>
                }
                {props.item.metadata.currentUse !== null &&
                    <XCard.Property title="Current Use">{props.item.metadata.currentUse}</XCard.Property>
                }
                {/* {props.item.metadata.available !== null &&
                    <XCard.Property title="Listed">{props.item.metadata.available.toString()}</XCard.Property>
                } */}
            </XCard.PropertyList>
        </XCard.PropertyColumns>
    )
}