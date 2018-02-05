import * as React from 'react';
import { XListItem } from './X/XList';
import { CardProject } from './CardProject';
import { ProjectShortFragment } from '../api/Types';

export function ListProjects(props: { projects: ProjectShortFragment[] }) {
    return (
        <>
        {props.projects.map(p =>
            <XListItem key={p.id}>
                <CardProject project={p} />
            </XListItem>
        )}
        </>
    );
}