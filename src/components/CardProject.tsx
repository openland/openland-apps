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
import * as Types from '../api/Types';

export function CardProject(props: { project: Types.ProjectShortFragment }) {
    let units: number | undefined = undefined;
    let subtitle: string | undefined = undefined;
    if (props.project.proposedUnits !== undefined && props.project.existingUnits !== undefined) {
        units = props.project.proposedUnits!! - props.project.existingUnits!!;
    }
    if (props.project.extrasAddress && (props.project.extrasAddress.toLowerCase() !== props.project.name.toLowerCase())) {
        subtitle = props.project.extrasAddress;
    }
    return (
        <ListCardContainer withImage={true} className={'wide-image project-card'}>
            <ListCardImageBox path={Links.area('sf').project(props.project.slug!!).view}>
                <img src={props.project.preview!!.retina} alt="" />
            </ListCardImageBox>
            <ListCardBox>
                <ListCardRow className={'top'}>
                    <ListCardMainTitle
                        link={Links.area('sf').project(props.project.slug).view}
                        title={props.project.name}
                        titleAdditionallyClass={props.project.verified ? ' is-checked' : ''}
                        subtitle={subtitle ? subtitle : undefined}
                    />
                    {props.project.extrasUrl && (
                        <ListCardMainLink
                            link={props.project.extrasUrl}
                        />
                    )}
                </ListCardRow>
                <ListCardRow className={'bottom'}>
                    <ListCardCount title={units} subtitle={'Net new units'} />
                    {props.project.extrasYearEnd && (<ListCardCount title={props.project.extrasYearEnd!!} subtitle={'Expected completion'} />)}
                    <ListCardDetails path={Links.area('sf').project(props.project.slug).view} title={'View details'} />
                </ListCardRow>
            </ListCardBox>
        </ListCardContainer>
    )
}