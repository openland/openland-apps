import * as React from 'react';
import { XListItem } from './X/XList';
import { DataListCard } from './DataListCard';
import { ProjectShortFragment } from '../api/Types';

export function ListProjects(props: { projects: ProjectShortFragment[] }) {
    return (
        <>
            {props.projects.map(p => {
                return (
                    <XListItem key={p.id}>
                        <DataListCard
                            title={p.name}
                            url={p.extrasUrl}
                            picture={p.preview}
                            newUnits={p.proposedUnits}
                            endYear={p.extrasYearEnd}
                            verified={p.verified}
                            slug={p.slug}
                        />
                    </XListItem>
                );
            })}
        </>
    );
}