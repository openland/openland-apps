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

export function CardPermit(props: { permit: PermitShortFragment }) {
    return (
        <ListCardContainer className={'permit-card'}>
            <ListCardBox>
                <ListCardRow className={'top'}>
                    <ListCardMainTitle
                        link={Links.area('sf').permit(props.permit.id).view}
                        title={props.permit.id}
                        larger={true}
                        subtitle={props.permit.createdAt}
                    />
                    {props.permit.streetNumbers!!.length > 0 && (
                        <ListCardCount
                            title={
                                props.permit.streetNumbers!![0].streetNumber + (props.permit.streetNumbers!![0].streetNumberSuffix ? props.permit.streetNumbers!![0].streetNumberSuffix!! : '') +
                                ' ' + props.permit.streetNumbers!![0].streetName + (props.permit.streetNumbers!![0].streetNameSuffix ? ' ' + props.permit.streetNumbers!![0].streetNameSuffix : '')
                            }
                            subtitle={'Address'}
                            className={'smaller static-width'}
                        />
                    )}
                    {props.permit.proposedUnits && (
                        <ListCardCount subtitle={'Units'} className={'smaller static-width small'}>
                            <XCounter value={props.permit.proposedUnits!!} oldValue={props.permit.existingUnits} />
                        </ListCardCount>
                    )}
                    {props.permit.approvalTime != null && (
                        <ListCardCount subtitle={'Approval time'} className={'smaller static-width'}>
                            {formatDuration(props.permit.approvalTime)}
                        </ListCardCount>
                    )}
                    {props.permit.status && (
                        <PermitStatus2 status={props.permit.status} date={props.permit.statusUpdatedAt} />
                    )}
                </ListCardRow>
                <ListCardRow className={'bottom'}>
                    <div className="x-card-addition">
                        <span>
                            <PermitType type={props.permit.type!!} />
                        </span>
                    </div>
                    <div className="x-card-description">{props.permit.description}</div>
                    <ListCardDetails path={Links.area('sf').permit(props.permit.id).view} title={'View details'} />
                </ListCardRow>
            </ListCardBox>
        </ListCardContainer>
    )
}