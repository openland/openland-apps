import * as React from 'react';
import { withApp } from '../../../components/App/withApp';
import { XCard } from '../../../components/X/XCard';
import { withSFBuildingProject } from '../../../api/index';
import { XLink } from '../../../components/X/XLink';
import { AppContent } from '../../../components/App/AppContent';
import { XButton } from '../../../components/X/XButton';
import { XLinkExternal } from '../../../components/X/XLinkExternal';

export default withApp(withSFBuildingProject((props) => {
    
    return (
        <AppContent>
            <XCard shadow="medium" separators={true}>
                <XCard.Header
                    title={props.data.project.name}
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
                    {props.data.project.extrasLocation && (<XCard.Map location={props.data.project.extrasLocation!!} />)}
                    <XCard.Gallery>
                        <XCard.GalleryItem srcUrl={props.data.project.preview.url} />
                    </XCard.Gallery>
                </XCard>
            )}

            {props.data.project.developers.length > 0 && (
                <XCard shadow="medium">
                    <XCard.Header title="Developers" />
                    <XCard.Table>
                        <XCard.Table.Header>
                            <XCard.Table.Cell>Organization Name</XCard.Table.Cell>
                        </XCard.Table.Header>
                        <tbody>
                            {props.data.project.developers.map((d) => (
                                <tr key={d.id}>
                                    <XCard.Table.Cell>{d.title}</XCard.Table.Cell>
                                </tr>
                            ))}
                        </tbody>
                    </XCard.Table>
                </XCard>
            )}

            {props.data.project.constructors.length > 0 && (
                <XCard shadow="medium">
                    <XCard.Header title="Contractors" />
                    <XCard.Table>
                        <XCard.Table.Header>
                            <XCard.Table.Cell>Organization Name</XCard.Table.Cell>
                        </XCard.Table.Header>
                        <tbody>
                            {props.data.project.constructors.map((d) => (
                                <tr key={d.id}>
                                    <XCard.Table.Cell>{d.title}</XCard.Table.Cell>
                                </tr>
                            ))}
                        </tbody>
                    </XCard.Table>
                </XCard>
            )}
        </AppContent>
    );
}));