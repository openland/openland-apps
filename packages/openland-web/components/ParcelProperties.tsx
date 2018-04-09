import * as React from 'react';
import Types from 'openland-api';
import { XCard } from './X/XCard';
import { XArea } from './X/XArea';
import { XMoney } from './X/XMoney';
import { XZoningCode } from './X/XZoningCode';
import { OwnerTypeComponent } from './OwnerTypeComponent';
import { XTooltip } from './Incubator/XTooltip';
import { XDimensions } from './X/XDimensions';
import { XWithRole } from './X/XWithRole';
import { ProjectTypes } from './ProjectTypes';
import { XNumber } from './X/XNumber';
import { XDistance } from './X/XDistance';
import { Text } from '../strings';
import { XVertical } from './X/XVertical';

export function ParcelProperties(props: { item: Types.ParcelFullFragment }) {

    return (
        <>
            <XCard.PropertyColumns>
                <XVertical>
                    <XCard.PropertyList title="Parcel Details">
                        {props.item.extrasOwnerType &&
                            <XCard.Property title="Ownership Type"><OwnerTypeComponent type={props.item.extrasOwnerType!!} /></XCard.Property>
                        }
                        {props.item.extrasOwnerName &&
                            <XCard.Property title="Owner Name">{props.item.extrasOwnerName}</XCard.Property>
                        }
                        {props.item.block &&
                            <XCard.Property title="Block">{props.item.block.title}</XCard.Property>
                        }
                        {props.item.extrasArea &&
                            <XCard.Property title="Area"><XArea area={props.item.extrasArea!!} /></XCard.Property>
                        }
                        {props.item!!.extrasShapeSides && props.item!!.extrasShapeSides!!.length > 0 &&
                            <XCard.Property title="Dimensions"> <XDimensions dimensions={props.item!!.extrasShapeSides!!} /></XCard.Property>
                        }
                        {props.item.extrasArea &&
                            <XCard.Property title="City Register Area"><XArea area={props.item.extrasAssessorArea!!} />
                                <XTooltip title={Text.hint_unrealiable_assesor} />
                            </XCard.Property>
                        }
                        {props.item.extrasAssessorDepth &&
                            <XCard.Property title="City Register Frontage"><XDistance value={props.item.extrasAssessorFront!!} />
                                <XTooltip title={Text.hint_unrealiable_assesor} />
                            </XCard.Property>
                        }
                        {props.item.extrasAssessorDepth &&
                            <XCard.Property title="City Register Depth"><XDistance value={props.item.extrasAssessorDepth!!} />
                                <XTooltip title={Text.hint_unrealiable_assesor} />
                            </XCard.Property>
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
                    {props.item!!.city.name === 'New York' && (props.item!!.extrasVacant === null || props.item!!.extrasVacant) && (
                        <XWithRole role={['feature-customer-kassita', 'editor', 'software-developer', 'super-admin']}>
                            <XCard.PropertyList title="Analyzys">
                                {props.item!!.extrasAnalyzed !== true &&
                                    <XCard.Property title="Compatible buildings">
                                        <XTooltip title={Text.hint_too_complex} marginLeft={0} />
                                        {Text.text_too_complex}
                                    </XCard.Property>
                                }
                                {props.item!!.extrasAnalyzed === true && props.item!!.extrasFitProjects &&
                                    <XCard.Property title="Compatible buildings"><ProjectTypes types={props.item!!.extrasFitProjects!!} /></XCard.Property>
                                }
                            </XCard.PropertyList>
                        </XWithRole>
                    )}
                </XVertical>

                {(props.item!!.extrasYear !== null
                    || props.item!!.extrasUnits !== null
                    || props.item!!.extrasStories !== null
                    || props.item!!.extrasRooms !== null
                    || props.item!!.extrasBedrooms !== null
                    || props.item!!.extrasBathrooms !== null
                    || props.item!!.extrasBathrooms !== null
                    || props.item!!.metadata.currentUse !== null
                    || props.item!!.extrasVacant !== null) && (
                        <XCard.PropertyList title="Current Building">
                            {props.item!!.extrasVacant !== null &&
                                <XCard.Property title="Vacant">{props.item!!.extrasVacant ? 'Yes' : 'No'}</XCard.Property>
                            }
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
                                <XCard.Property title="Year Built"><XNumber value={props.item!!.extrasYear} /></XCard.Property>
                            }
                            {props.item!!.extrasUnits !== null &&
                                <XCard.Property title="Buildings Count"><XNumber value={props.item!!.extrasUnits} /></XCard.Property>
                            }
                            {props.item!!.extrasStories !== null &&
                                <XCard.Property title="Stories Count"><XNumber value={props.item!!.extrasStories} /></XCard.Property>
                            }
                            {props.item!!.extrasRooms !== null &&
                                <XCard.Property title="Rooms Count"><XNumber value={props.item!!.extrasRooms} /></XCard.Property>
                            }
                            {props.item!!.extrasBedrooms !== null &&
                                <XCard.Property title="Bedrooms Count"><XNumber value={props.item!!.extrasBedrooms} /></XCard.Property>
                            }
                            {props.item!!.extrasBathrooms !== null &&
                                <XCard.Property title="Bathrooms Count"><XNumber value={props.item!!.extrasBathrooms} /></XCard.Property>
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