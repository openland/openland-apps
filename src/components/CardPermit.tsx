import * as React from 'react';

import { formatDuration } from '../utils/date';
import { PermitShortFragment } from '../api/Types';
import { PermitStatus2 } from './PermitStatus2';
import { PermitType } from './PermitType';
import { XCounter } from './X/XCounter';
import { ListCardContainer } from './Incubator/ListCardComponents';
import { ListCardBox } from './Incubator/ListCardComponents';
import { ListCardRow } from './Incubator/ListCardComponents';
import { ListCardMainTitle } from './Incubator/ListCardComponents';
import { ListCardCount } from './Incubator/ListCardComponents';
import { ListCardDetails } from './Incubator/ListCardComponents';

import { Links } from '../Links';

export function CardPermit(props: PermitShortFragment) {
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
                        <PermitStatus2 status={props.status} date={props.statusUpdatedAt} />
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