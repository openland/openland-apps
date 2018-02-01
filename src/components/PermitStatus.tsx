import * as React from 'react';
import { XDate } from './X/XDate';
// FILING
// FILED
// ISSUED
// COMPLETED
// EXPIRED
// CANCELLED
// DISAPPROVED
// APPROVED
// ISSUING
// REVOKED
// WITHDRAWN
// PLANCHECK
// SUSPENDED
// REINSTATED
// INSPECTING
// UPHELD
// INCOMPLETE
// GRANTED
// APPEAL

// ICON LIST:
// appealed
// canceled
// completed
// expired
// filed
// issued
// suspended
// withdrawn

export function PermitStatus(props: { status: string | null, date?: string | null }) {

    let icon: string = 'question';

    switch (props.status) {
        case 'FILED':
        case 'FILING': {
            icon = 'filed';
            break;
        }

        case 'UPHELD':
        case 'SUSPENDED':
        case 'REVOKED':
        case 'DISAPPROVED': {
            icon = 'suspended';
            break;
        }

        case 'APPEAL': {
            icon = 'appealed';
            break;
        }

        case 'PLANCHECK': {
            break;
        }

        case 'EXPIRED':
        case 'CANCELLED':
        case 'WITHDRAWN': {
            icon = 'withdrawn';
            break;
        }

        case 'COMPLETED': {
            icon = 'completed';
            break;
        }

        case 'INSPECTING': {
            icon = 'id badge';
            break;
        }

        case 'INCOMPLETE':
        case 'GRANTED':
        case 'REINSTATED':
        case 'ISSUED':
        case 'ISSUING':
        case 'APPROVED': {
            icon = 'issued';
            break;
        }

        default: {
            icon = 'question';
            break;
        }
    }

    let text = 'unknown';

    switch (props.status) {
        case 'FILED': {
            text = 'Filed';
            break;
        }
        case 'FILING': {
            text = 'Filing';
            break;
        }
        case 'UPHELD': {
            text = 'Upheld';
            break;
        }
        case 'SUSPENDED': {
            text = 'Suspended';
            break;
        }
        case 'REVOKED': {
            text = 'Revoked';
            break;
        }
        case 'DISAPPROVED': {
            text = 'Disapproved';
            break;
        }
        case 'APPEAL': {
            text = 'Appeal';
            break;
        }
        case 'PLANCHECK': {
            text = 'Plan Check';
            break;
        }

        case 'EXPIRED': {
            text = 'Expired';
            break;
        }
        case 'CANCELLED': {
            text = 'Cancelled';
            break;
        }
        case 'WITHDRAWN': {
            text = 'Withdrawn';
            break;
        }

        case 'COMPLETED': {
            text = 'Completed';
            break;
        }

        case 'INSPECTING': {
            text = 'Inspecting';
            break;
        }

        case 'INCOMPLETE': {
            text = 'Incomplete';
            break;
        }
        case 'GRANTED': {
            text = 'Granted';
            break;
        }
        case 'REINSTATED': {
            text = 'Reinstated';
            break;
        }
        case 'ISSUED': {
            text = 'Issued';
            break;
        }
        case 'ISSUING': {
            text = 'Issuing';
            break;
        }
        case 'APPROVED': {
            text = 'Approved';
            break;
        }
        default: {
            text = 'Unknown';
            break;
        }
    }

    return (
        <>
        {props.date && (
            <div className="x-permit--status">
                <i className={'icon-' + icon} />
                <span><XDate date={props.date} format={'date'} /></span>
                {text}
            </div>
        )}

        {!props.date && (
            <div className="x-permit--status no-date">
                <i className={'icon-' + icon} />
                {text}
            </div>
        )}
        </>
    );
}

export function PermitStatusTest(props: { status: string, date?: string }) {

    let icon: string = 'question';

    switch (props.status) {
        case 'FILED':
        case 'FILING': {
            icon = 'filed';
            break;
        }

        case 'UPHELD':
        case 'SUSPENDED':
        case 'REVOKED':
        case 'DISAPPROVED': {
            icon = 'suspended';
            break;
        }

        case 'APPEAL': {
            icon = 'appealed';
            break;
        }

        case 'PLANCHECK': {
            break;
        }

        case 'EXPIRED':
        case 'CANCELLED':
        case 'WITHDRAWN': {
            icon = 'withdrawn';
            break;
        }

        case 'COMPLETED': {
            icon = 'completed';
            break;
        }

        case 'INSPECTING': {
            icon = 'id badge';
            break;
        }

        case 'INCOMPLETE':
        case 'GRANTED':
        case 'REINSTATED':
        case 'ISSUED':
        case 'ISSUING':
        case 'APPROVED': {
            icon = 'issued';
            break;
        }

        default: {
            icon = 'question';
            break;
        }
    }

    let text = 'unknown';

    switch (props.status) {
        case 'FILED': {
            text = 'Filed';
            break;
        }
        case 'FILING': {
            text = 'Filing';
            break;
        }
        case 'UPHELD': {
            text = 'Upheld';
            break;
        }
        case 'SUSPENDED': {
            text = 'Suspended';
            break;
        }
        case 'REVOKED': {
            text = 'Revoked';
            break;
        }
        case 'DISAPPROVED': {
            text = 'Disapproved';
            break;
        }
        case 'APPEAL': {
            text = 'Appeal';
            break;
        }
        case 'PLANCHECK': {
            text = 'Plan Check';
            break;
        }

        case 'EXPIRED': {
            text = 'Expired';
            break;
        }
        case 'CANCELLED': {
            text = 'Cancelled';
            break;
        }
        case 'WITHDRAWN': {
            text = 'Withdrawn';
            break;
        }

        case 'COMPLETED': {
            text = 'Completed';
            break;
        }

        case 'INSPECTING': {
            text = 'Inspecting';
            break;
        }

        case 'INCOMPLETE': {
            text = 'Incomplete';
            break;
        }
        case 'GRANTED': {
            text = 'Granted';
            break;
        }
        case 'REINSTATED': {
            text = 'Reinstated';
            break;
        }
        case 'ISSUED': {
            text = 'Issued';
            break;
        }
        case 'ISSUING': {
            text = 'Issuing';
            break;
        }
        case 'APPROVED': {
            text = 'Approved';
            break;
        }
        default: {
            text = 'Unknown';
            break;
        }
    }

    return (
        <>
        {props.date && (
            <div className="x-card-date">
                <i className={'icon-' + icon} />
                <div className="x-card-count smaller">
                    <div className="title">
                        <XDate date={props.date} format={'date'} />
                    </div>
                    <div className="text">{text}</div>
                </div>
            </div>
        )}

        {!props.date && (
            <div className="x-card-date">
                <i className={'icon-' + icon} />
                <div className="text">{text}</div>
            </div>
        )}
        </>
    );
}