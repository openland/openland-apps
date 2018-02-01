import * as React from 'react';
import { XInfiniteListItem } from './withInfiniteList';
import { DataListCard } from './DataListCard';
import { ProjectShortFragment } from '../api/queries/Types';

export function ListProjects(props: { projects: ProjectShortFragment[] }) {
    return (
        <>
            {props.projects.map(p => {
                return (
                    <XInfiniteListItem key={p.id}>
                        <DataListCard
                            title={p.name}
                            url={p.extrasUrl}
                            picture={p.preview}
                            newUnits={p.proposedUnits}
                            endYear={p.extrasYearEnd}
                            verified={p.verified}
                            slug={p.slug}
                        />
                    </XInfiniteListItem>
                );
            })}
        </>
    );
}