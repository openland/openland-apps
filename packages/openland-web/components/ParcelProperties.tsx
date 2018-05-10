import * as React from 'react';
import * as Types from 'openland-api/Types';
import { ZoningCode } from './ZoningCode';
import { OwnerTypeComponent } from './OwnerTypeComponent';
import { XTooltip } from './Incubator/XTooltip';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { ProjectTypes } from './ProjectTypes';
import { Text } from '../strings';
import { XVertical } from 'openland-x-layout/XVertical';
import { XArea } from 'openland-x-format/XArea';
import { XDimensions } from 'openland-x-format/XDimensions';
import { XDistance } from 'openland-x-format/XDistance';
import { XMoney } from 'openland-x-format/XMoney';
import { XNumber } from 'openland-x-format/XNumber';
import { XProperty, XPropertyList, XPropertyColumns } from 'openland-x/XProperty';

export function ParcelProperties(props: { item: Types.ParcelFullFragment }) {
    return (
        <>
            <XPropertyColumns>
                <XVertical>
                    <XPropertyList title="Parcel Details">
                        {props.item.extrasOwnerType && props.item.extrasOwnerType !== 'PRIVATE' &&
                            <XProperty title="Ownership Type"><OwnerTypeComponent type={props.item.extrasOwnerType!!} /></XProperty>
                        }
                        {props.item.extrasOwnerName &&
                            <XProperty title="Owner Name">{props.item.extrasOwnerName}</XProperty>
                        }
                        {props.item.area &&
                            <XProperty title="Area"><XArea value={props.item.area!!.value} /></XProperty>
                        }
                        <XWithRole role={['super-admin', 'software-developer', 'unit-capacity', 'feature-customer-kassita']}>
                            {Boolean(props.item.area && props.item.extrasUnitCapacityFar && props.item.extrasUnitCapacityDencity) &&
                                <XProperty title="Unit Capacity">
                                    {props.item.extrasUnitCapacity}
                                    <XTooltip placement="right" type="info">
                                        <XTooltip.Content><XArea value={props.item.area!!.value} />
                                            {' * ' + props.item.extrasUnitCapacityFar + '(FAR) / ' + props.item.extrasUnitCapacityDencity + '(DF)'}
                                        </XTooltip.Content>
                                    </XTooltip>
                                </XProperty>
                            }
                        </XWithRole>
                        {props.item.front &&
                            <XProperty title="Frontage"><XDistance value={props.item.front!!.value} /></XProperty>
                        }
                        {props.item.depth &&
                            <XProperty title="Depth"><XDistance value={props.item.depth!!.value} /></XProperty>
                        }
                        {props.item!!.extrasShapeSides && !props.item.front && !props.item.depth && props.item!!.extrasShapeSides!!.length > 0 &&
                            <XProperty title="Dimensions"> <XDimensions value={props.item!!.extrasShapeSides!!} /></XProperty>
                        }
                        {props.item.extrasNeighborhood &&
                            <XProperty title="Neighborhood">{props.item.extrasNeighborhood}</XProperty>
                        }
                        {props.item.extrasSupervisorDistrict &&
                            <XProperty title="Supervisor District">{props.item.extrasSupervisorDistrict}</XProperty>
                        }
                        {props.item.extrasZoning && props.item.extrasZoning!!.length > 0 &&
                            <XProperty title="Zoning"><ZoningCode codes={props.item!!.extrasZoning!!} /></XProperty>
                        }
                        {props.item!!.extrasLandUse !== null &&
                            <XProperty title="Land Use">{props.item!!.extrasLandUse!!.join(',\u00A0')}</XProperty>
                        }
                        {props.item.extrasLandValue !== null &&
                            <XProperty title="Land Value"><XMoney value={props.item.extrasLandValue!!} /></XProperty>
                        }
                        {props.item.extrasImprovementValue !== null &&
                            <XProperty title="Improvement Value"><XMoney value={props.item.extrasImprovementValue!!} /></XProperty>
                        }
                        {props.item.extrasFixturesValue !== null &&
                            <XProperty title="Fixtures Value"><XMoney value={props.item.extrasFixturesValue!!} /></XProperty>
                        }
                        {props.item.extrasPropertyValue !== null &&
                            <XProperty title="Personal Property Value"><XMoney value={props.item.extrasPropertyValue!!} /></XProperty>
                        }
                        {/* {props.item.extrasArea &&
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
                        } */}
                    </XPropertyList>
                    {props.item!!.city.name === 'New York' && (props.item!!.extrasVacant === null || props.item!!.extrasVacant) && (
                        <XWithRole role={['feature-customer-kassita', 'editor', 'software-developer', 'super-admin']}>
                            <XPropertyList title="Analysis">
                                {props.item!!.extrasAnalyzed !== true &&
                                    <XProperty title="Compatible buildings">
                                        <XTooltip title={Text.hint_too_complex} marginLeft={0} />
                                        {Text.text_too_complex}
                                    </XProperty>
                                }
                                {props.item!!.extrasAnalyzed === true && props.item!!.extrasFitProjects &&
                                    <XProperty title="Compatible buildings"><ProjectTypes types={props.item!!.extrasFitProjects!!} /></XProperty>
                                }
                            </XPropertyList>
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
                        <XPropertyList title="Current Building">
                            {props.item!!.extrasVacant !== null &&
                                <XProperty title="Vacant">{props.item!!.extrasVacant ? 'Yes' : 'No'}</XProperty>
                            }
                            {props.item!!.metadata.currentUse !== null &&
                                <XProperty title="Current Use">{props.item!!.metadata.currentUse}</XProperty>
                            }
                            {props.item!!.extrasSalesDate !== null &&
                                <XProperty title="Sale Date">{props.item!!.extrasSalesDate}</XProperty>
                            }
                            {props.item!!.extrasSalesPriorDate !== null &&
                                <XProperty title="Prior Sale Date">{props.item!!.extrasSalesPriorDate}</XProperty>
                            }
                            {props.item!!.extrasYear !== null &&
                                <XProperty title="Year Built"><XNumber value={props.item!!.extrasYear} /></XProperty>
                            }
                            {props.item!!.extrasUnits !== null &&
                                <XProperty title="Buildings Count"><XNumber value={props.item!!.extrasUnits} /></XProperty>
                            }
                            {props.item!!.extrasStories !== null &&
                                <XProperty title="Stories Count"><XNumber value={props.item!!.extrasStories} /></XProperty>
                            }
                            {props.item!!.extrasRooms !== null &&
                                <XProperty title="Rooms Count"><XNumber value={props.item!!.extrasRooms} /></XProperty>
                            }
                            {props.item!!.extrasBedrooms !== null &&
                                <XProperty title="Bedrooms Count"><XNumber value={props.item!!.extrasBedrooms} /></XProperty>
                            }
                            {props.item!!.extrasBathrooms !== null &&
                                <XProperty title="Bathrooms Count"><XNumber value={props.item!!.extrasBathrooms} /></XProperty>
                            }
                        </XPropertyList>
                    )}
            </XPropertyColumns>
            {(props.item.extrasMetroDistance !== null
                || props.item.extrasTrainLocalDistance !== null
                || props.item.extrasTrainDistance !== null)
                && (
                    <XPropertyList title="Nearby Transit">
                        {props.item.extrasMetroDistance !== null &&
                            <XProperty title="Muni Metro">{props.item.extrasMetroDistance} ({props.item.extrasMetroStation})</XProperty>
                        }
                        {props.item.extrasTrainLocalDistance !== null &&
                            <XProperty title="BART">{props.item.extrasTrainLocalDistance} ({props.item.extrasTrainLocalStation})</XProperty>
                        }
                        {props.item.extrasTrainDistance !== null &&
                            <XProperty title="Caltrain">{props.item.extrasTrainDistance} ({props.item.extrasTrainStation})</XProperty>
                        }
                    </XPropertyList>
                )}
        </>
    );
}