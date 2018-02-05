import * as React from 'react';
import { ListCardContainer } from './Incubator/ListCardComponents';
import { ListCardImageBox } from './Incubator/ListCardComponents';
import { ListCardBox } from './Incubator/ListCardComponents';
import { ListCardRow } from './Incubator/ListCardComponents';
import { ListCardMainTitle } from './Incubator/ListCardComponents';
import { ListCardMainLink } from './Incubator/ListCardComponents';
import { ListCardCount } from './Incubator/ListCardComponents';
import { ListCardDetails } from './Incubator/ListCardComponents';

import { Links } from '../Links';

export interface CardProject2Props {
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

export function CardProject2(props: CardProject2Props) {
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