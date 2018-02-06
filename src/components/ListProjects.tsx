import * as React from 'react';
import { XListItem, XList } from './X/XList';
import { CardProject } from './CardProject';
import { ProjectShortFragment } from '../api/Types';

export function ListProjects(props: { projects: ProjectShortFragment[] }) {
    return (
        <>
        <XList>
            {props.projects.map(p =>
                <XListItem key={p.id}>
                    <CardProject project={p} />
                </XListItem>
            )}
        </XList>
        </>
    );
}