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

export default withApp(withParcel((props) => {
    return (
        <AppContent>
            <XCard shadow="medium" separators={true}>
                <XCard.Header title={'Parcel #' + props.data.item.title}>
                    <XButton>Edit</XButton>
                </XCard.Header>
                <XCard.PropertyList>
                    <XCard.Property title="Block"><XLink path={'/app/blocks/' + props.data.item.block.id}>{props.data.item.block.title}</XLink></XCard.Property>
                    {props.data.item.extrasArea &&
                        <XCard.Property title="Parcel Area"><XArea area={props.data.item.extrasArea} /></XCard.Property>
                    }
                    {props.data.item.extrasSupervisorDistrict &&
                        <XCard.Property title="Supervisor District">{props.data.item.extrasSupervisorDistrict}</XCard.Property>
                    }
                    {props.data.item.extrasZoning && props.data.item.extrasZoning.length > 0 &&
                        <XCard.Property title="Zoning">{props.data.item.extrasZoning.join()}</XCard.Property>
                    }

                    {props.data.item.extrasLandValue !== null &&
                        <XCard.Property title="Land Value">{props.data.item.extrasLandValue}</XCard.Property>
                    }
                    {props.data.item.extrasImprovementValue !== null &&
                        <XCard.Property title="Improvement Value">{props.data.item.extrasImprovementValue}</XCard.Property>
                    }
                    {props.data.item.extrasFixturesValue !== null &&
                        <XCard.Property title="Fixtures Value">{props.data.item.extrasFixturesValue}</XCard.Property>
                    }
                    {props.data.item.extrasPropertyValue !== null &&
                        <XCard.Property title="Personal Property Value">{props.data.item.extrasPropertyValue}</XCard.Property>
                    }
                </XCard.PropertyList>
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