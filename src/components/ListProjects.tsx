import * as React from 'react';
import { BuildingProject } from '../api/BuildingProjects';
import { XInfiniteListItem } from './withInfiniteList';
import { DataListCard } from './DataListCard';

export function ListProjects(props: { projects: BuildingProject[] }) {
    return (
        <>
            {props.projects.map(p => {
                return (
                    <XInfiniteListItem key={p.id}>
                        <DataListCard
                            title={p.name}
                            url={'/projects/' + p.slug}
                        />
                    </XInfiniteListItem>
                );
            })}
        </>
    );
}