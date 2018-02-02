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
import { XCounter } from './X/XCounter';

import { Links } from '../Links';
import { formatDuration } from '../utils/date';
import { PermitShortFragment } from '../api/Types';
import { PermitStatusTest } from './PermitStatus';
import { PermitType } from './PermitType';

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
                <ListCardImageBox path={Links.area('sf').org(props.slug).view} noPhoto={true} >
                    <XCloudImage src={props.logo} maxWidth={140} maxHeight={140} />
                </ListCardImageBox>
            )}
            {!props.logo && (
                <ListCardImageBox path={Links.area('sf').org(props.slug).view} />
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

export interface ProjectsListCardProps {
    id: string;
    title: string;
    newUnits?: number;
    subtitle?: string;
    endYear: string;
    picture: {
        url: string,
        retina: string
    };
    verified?: boolean;
    url?: string;
    location?: { latitude: number, longitude: number };
    slug?: string;
}

export function ProjectsListCard(props: ProjectsListCardProps) {
    return (
        <ListCardContainer withImage={true} className={'wide-image project-card'}>
            <ListCardImageBox path={props.picture.url}>
                <img src={props.picture.retina} alt="" />
            </ListCardImageBox>
            <ListCardBox>
                <ListCardRow className={'top'}>
                    <ListCardMainTitle
                        link={Links.area('sf').project(props.slug!!).view}
                        title={props.title}
                        titleAdditionallyClass={props.verified ? ' is-checked' : ''}
                        subtitle={props.subtitle ? props.subtitle : undefined}
                    />
                    {props.url && (
                        <ListCardMainLink
                            link={props.url}
                        />
                    )}
                </ListCardRow>
                <ListCardRow className={'bottom'}>
                    <ListCardCount title={props.newUnits} subtitle={'Net new units'}/>
                    <ListCardCount title={props.endYear} subtitle={'Expected completion'}/>
                    <ListCardDetails path={Links.area('sf').project(props.slug!!).view} title={'Show details'}/>
                </ListCardRow>
            </ListCardBox>
        </ListCardContainer>
    )
}

export function PermitsListCard(props: PermitShortFragment) {
    return (
        <ListCardContainer className={'permit-card'}>
            <ListCardBox>
                <ListCardRow className={'top'}>
                    <ListCardMainTitle
                        link={Links.area('sf').permit(props.id).view}
                        title={props.id}
                        larger={true}
                        subtitle={props.createdAt}
                    />
                    {props.streetNumbers!!.length > 0 && (
                        <ListCardCount
                            title={
                                props.streetNumbers!![0].streetNumber + (props.streetNumbers!![0].streetNumberSuffix ? props.streetNumbers!![0].streetNumberSuffix!! : '') +
                                ' ' + props.streetNumbers!![0].streetName + (props.streetNumbers!![0].streetNameSuffix ? ' ' + props.streetNumbers!![0].streetNameSuffix : '')
                            }
                            subtitle={'Address'}
                            className={'smaller static-width'}
                        />
                    )}
                    {props.proposedUnits && (
                        <ListCardCount subtitle={'Units'} className={'smaller static-width small'}>
                            <XCounter value={props.proposedUnits!!} oldValue={props.existingUnits} />
                        </ListCardCount>
                    )}
                    {props.approvalTime != null && (
                        <ListCardCount subtitle={'Approval time'} className={'smaller static-width'}>
                            {formatDuration(props.approvalTime)}
                        </ListCardCount>
                    )}
                    {props.status && (
                        <PermitStatusTest status={props.status} date={props.statusUpdatedAt} />
                    )}
                </ListCardRow>
                <ListCardRow className={'bottom'}>
                    <div className="x-card-addition">
                        <span>
                            <PermitType type={props.type!!} />
                        </span>
                    </div>
                    <div className="x-card-description">{props.description}</div>
                    <ListCardDetails path={Links.area('sf').permit(props.id).view} title={'View details'}/>
                </ListCardRow>
            </ListCardBox>
        </ListCardContainer>
    )
}