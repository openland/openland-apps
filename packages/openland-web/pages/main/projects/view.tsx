import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XTable } from '../../../components/X/XTable';
import { withSFBuildingProject } from '../../../api/index';
import { AppContent } from '../../../components/App/AppContent';
import { XButton } from '../../../components/X/XButton';
import { XLinkExternal } from '../../../components/X/XLinkExternal';

export default withApp('Project', 'viewer', withSFBuildingProject((props) => {

    return (
        <AppContent>
            <XCard shadow="medium" separators={true}>
                <XCard.Header
                    text={props.data.project.name}
                    description={props.data.project.description}
                >
                    <XButton>Edit</XButton>
                </XCard.Header>
                <XCard.PropertyList>
                    <XCard.Property title="Existing Units">{props.data.project.existingUnits}</XCard.Property>
                    <XCard.Property title="Proposed Units">{props.data.project.proposedUnits}</XCard.Property>
                    {props.data.project.extrasPermit && <XCard.Property title="Permit">{props.data.project.extrasPermit}</XCard.Property>}
                    {props.data.project.extrasAddress && <XCard.Property title="Address">{props.data.project.extrasAddress}</XCard.Property>}
                    {props.data.project.extrasAddressSecondary && <XCard.Property title="Address">{props.data.project.extrasAddressSecondary}</XCard.Property>}
                    {props.data.project.extrasUrl && <XCard.Property title="Link" ><XLinkExternal href={props.data.project.extrasUrl}>{props.data.project.extrasUrl}</XLinkExternal></XCard.Property>}
                </XCard.PropertyList>
            </XCard>

            {props.data.project.preview && (
                <XCard shadow="medium">
                    {props.data.project.extrasLocation && (<XCard.Map
                        focusLocation={{
                            latitude: props.data.project.extrasLocation!!.latitude,
                            longitude: props.data.project.extrasLocation!!.longitude,
                            zoom: 16
                        }} />
                    )}
                    <XCard.Gallery>
                        <XCard.GalleryItem srcUrl={props.data.project.preview.url} />
                    </XCard.Gallery>
                </XCard>
            )}

            {props.data.project.developers.length > 0 && (
                <XCard shadow="medium">
                    <XCard.Header text="Developers" />
                    <XTable>
                        <XTable.Header>
                            <XTable.Cell>Organization Name</XTable.Cell>
                        </XTable.Header>
                        <XTable.Body>
                            {props.data.project.developers.map((d) => (
                                <XTable.Row key={d.id}>
                                    <XTable.Cell>{d.title}</XTable.Cell>
                                </XTable.Row>
                            ))}
                        </XTable.Body>
                    </XTable>
                </XCard>
            )}

            {props.data.project.constructors.length > 0 && (
                <XCard shadow="medium">
                    <XCard.Header text="Contractors" />
                    <XTable>
                        <XTable.Header>
                            <XTable.Cell>Organization Name</XTable.Cell>
                        </XTable.Header>
                        <tbody>
                            {props.data.project.constructors.map((d) => (
                                <tr key={d.id}>
                                    <XTable.Cell>{d.title}</XTable.Cell>
                                </tr>
                            ))}
                        </tbody>
                    </XTable>
                </XCard>
            )}
        </AppContent>
    );
}));