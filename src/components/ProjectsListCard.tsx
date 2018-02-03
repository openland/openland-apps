import * as React from 'react';
import { ListCardContainer } from './ListCardComponents';
import { ListCardImageBox } from './ListCardComponents';
import { ListCardBox } from './ListCardComponents';
import { ListCardRow } from './ListCardComponents';
import { ListCardMainTitle } from './ListCardComponents';
import { ListCardMainLink } from './ListCardComponents';
import { ListCardCount } from './ListCardComponents';
import { ListCardDetails } from './ListCardComponents';

import { Links } from '../Links';

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
            <ListCardImageBox path={Links.area('sf').project(props.slug!!).view}>
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
                    <ListCardDetails path={Links.area('sf').project(props.slug!!).view} title={'View details'}/>
                </ListCardRow>
            </ListCardBox>
        </ListCardContainer>
    )
}