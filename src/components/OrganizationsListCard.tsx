import * as React from 'react';
import { ListCardContainer } from './ListCardComponents';
import { ListCardImageBox } from './ListCardComponents';
import { ListCardBox } from './ListCardComponents';
import { ListCardRow } from './ListCardComponents';
import { ListCardMainTitle } from './ListCardComponents';
import { ListCardMainLink } from './ListCardComponents';
import { ListCardCount } from './ListCardComponents';
import { ListCardDetails } from './ListCardComponents';

import { XCloudImage } from './X/XCloudImage';
import { XLink } from './X/XLink';

import { Links } from '../Links';

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
        <ListCardContainer withImage={true} className={'organization-card'}>
            {props.logo && (
                <ListCardImageBox path={Links.area('sf').org(props.slug).view}>
                    <XCloudImage src={props.logo} maxWidth={140} maxHeight={140} />
                </ListCardImageBox>
            )}
            {!props.logo && (
                <ListCardImageBox path={Links.area('sf').org(props.slug).view} noPhoto={true} />
            )}
            <ListCardBox>
                <ListCardRow className={'top'}>
                    <ListCardMainTitle
                        link={Links.area('sf').org(props.slug).view}
                        title={props.title}
                        subtitle={props.subtitle}
                    />
                    {props.url && (
                        <ListCardMainLink
                            link={props.url}
                        />
                    )}
                </ListCardRow>
                <ListCardRow className={'bottom'}>
                    {(props.projects || props.projects > 0) && (
                        <ListCardCount title={props.projects} subtitle={'recent projects'}/>
                    )}
                    {props.featuredProject && (
                        <XLink
                            className={'x-card-project' + (props.featuredProject.picture ? ' with-photo' : '')}
                            path={Links.area('sf').project(props.featuredProject.url).view}
                        >
                            {props.featuredProject.picture && (
                                <div className="project-img">
                                    <img src={props.featuredProject.picture.retina} alt="" />
                                </div>
                            )}
                            <ListCardCount title={props.featuredProject.title} subtitle={'featured project'}/>
                        </XLink>
                    )}
                    <ListCardDetails path={Links.area('sf').org(props.slug).view} title={'View profile'}/>
                </ListCardRow>
            </ListCardBox>
        </ListCardContainer>
    )
}