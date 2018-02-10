import * as React from 'react';
import { withApp } from '../../../components/App/withApp';
import { XCard } from '../../../components/X/XCard';
import { withSFBuildingProject } from '../../../api/index';
import { XTitle } from '../../../components/X/XTitle';
import { XVertical } from '../../../components/X/XVertical';
import { XLink } from '../../../components/X/XLink';

export default withApp(withSFBuildingProject((props) => {
    return (
        <XVertical>
            <XCard shadow="medium">
                <XCard.Header
                    title={props.data.project.name}
                    description={props.data.project.description}
                />
                <XCard.PropertyList>
                    <XCard.Property title="Existing Units">{props.data.project.existingUnits}</XCard.Property>
                    <XCard.Property title="Proposed Units">{props.data.project.proposedUnits}</XCard.Property>
                    {props.data.project.extrasUrl && <XCard.Property title="Link" ><XLink href={props.data.project.extrasUrl}>{props.data.project.extrasUrl}</XLink></XCard.Property>}
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
                    <XCard.Content>
                        <XTitle>Developers</XTitle>
                    </XCard.Content>
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
                    <XCard.Content>
                        <XTitle>Contractors</XTitle>
                    </XCard.Content>
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
        </XVertical>
    );
}));