import * as React from 'react';

import { Links } from '../Links';
import {
    XCard,
    XCardPhoto,
    XCardColumn,
    XCardTitle,
    XCardExternalLink,
    XCardButton
} from './X/XCard';
import { XListItem } from './X/XList';
import { XRow } from './X/XRow';

export interface OrganizationListCardProps {
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    projects: number;
    logo?: string;
    profile?: string;
    featuredProject?: {
        title: string,
        url: string,
        picture?: { url: string; retina: string; }
    };
    url?: string;
}

export function OrganizationsListCard(props: OrganizationListCardProps) {
    return (
        <XListItem>
            <XCard>
                <XCardPhoto path={Links.area('sf').org(props.slug).view} src={props.logo} />
                <XRow>
                    <XCardColumn mode="fill">
                        <XCardTitle
                            title={props.title}
                            subtitle={props.subtitle}
                            path={Links.area('sf').org(props.slug).view}
                        />
                    </XCardColumn>

                    {props.url && (
                        <XCardColumn>
                            <XCardExternalLink href={props.url} />
                        </XCardColumn>
                    )}
                </XRow>
                <XRow>
                    {props.projects !== null && props.projects > 0 && (
                        <XCardColumn mode="fixed">
                            <XCardTitle
                                title={props.projects.toString()}
                                subtitle="Recent Projects"
                            />
                        </XCardColumn>
                    )}
                    <XCardColumn mode="fill">
                        {props.featuredProject && (
                            <XCardTitle
                                title={props.featuredProject.title}
                                subtitle="Featured Project"
                                path={Links.area('sf').project(props.featuredProject.url).view}
                                preview={props.featuredProject.picture ? props.featuredProject.picture.url : null}
                            />
                        )}
                    </XCardColumn>
                    <XCardColumn mode="fixed">
                        <XCardButton
                            title="View Profile"
                            path={Links.area('sf').org(props.slug).view}
                        />
                    </XCardColumn>
                </XRow>
            </XCard>
        </XListItem>
    )
}