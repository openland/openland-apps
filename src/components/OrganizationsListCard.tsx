import * as React from 'react';

import {
    XCard,
    XCardPhoto,
    XCardColumn,
    XCardTitle,
    XCardExternalLink,
    XCardButton
} from './X/XCard';
import { XRow } from './X/XRow';
import { Links } from '../Links';
import * as Types from '../api/Types';

export function OrganizationsListCard(props: { org: Types.OrganizationShortFragment }) {

    let subtitle = undefined

    if (props.org.isDeveloper) {
        if (props.org.isConstructor) {
            subtitle = 'Developer and Contractor'
        } else {
            subtitle = 'Developer'
        }
    } else {
        subtitle = 'Contractor'
    }

    let project = null

    if (props.org.developerIn && props.org.developerIn.length > 0) {
        project = props.org.developerIn!![0]
    } else if (props.org.constructorIn && props.org.constructorIn.length > 0) {
        project = props.org.constructorIn!![0]
    }

    let featured = undefined;
    if (project !== null) {
        featured = {
            title: project.name,
            url: project.slug,
            picture: project.preview
        };
    }

    let projectsLength: number = props.org.constructorIn!!.length + props.org.developerIn!!.length

    return (
        <XCard>
            <XCardPhoto path={Links.area('sf').org(props.org.slug).view} src={props.org.logo} />
            <XRow>
                <XCardColumn mode="fill">
                    <XCardTitle
                        title={props.org.title}
                        subtitle={subtitle}
                        path={Links.area('sf').org(props.org.slug).view}
                    />
                </XCardColumn>

                {props.org.url && (
                    <XCardColumn>
                        <XCardExternalLink href={props.org.url} />
                    </XCardColumn>
                )}
            </XRow>
            <XRow>
                {projectsLength > 0 && (
                    <XCardColumn mode="fixed">
                        <XCardTitle
                            title={projectsLength.toString()}
                            subtitle="Recent Projects"
                        />
                    </XCardColumn>
                )}
                <XCardColumn mode="fill">
                    {featured && (
                        <XCardTitle
                            title={featured.title}
                            subtitle="Featured Project"
                            path={Links.area('sf').project(featured.url).view}
                            preview={featured.picture ? featured.picture.url : null}
                        />
                    )}
                </XCardColumn>
                <XCardColumn mode="fixed">
                    <XCardButton
                        title="View Profile"
                        path={Links.area('sf').org(props.org.slug).view}
                    />
                </XCardColumn>
            </XRow>
        </XCard>
    );
}