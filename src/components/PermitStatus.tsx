import * as React from 'react';
import { Icon, SemanticICONS } from 'semantic-ui-react';
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

export function PermitStatus(props: { status: string }) {

    var icon: SemanticICONS = 'question';

    switch (props.status) {
        case 'FILED':
        case 'FILING': {
            icon = 'file text';
            break;
        }

        case 'UPHELD':
        case 'SUSPENDED':
        case 'REVOKED':
        case 'DISAPPROVED': {
            icon = 'ban';
            break;
        }

        case 'APPEAL': {
            icon = 'refresh';
            break;
        }

        case 'PLANCHECK': {
            break;
        }

        case 'EXPIRED':
        case 'CANCELLED':
        case 'WITHDRAWN': {
            icon = 'x';
            break;
        }

        case 'COMPLETED': {
            icon = 'check';
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
            icon = 'law';
            break;
        }

        default: {
            icon = 'question';
            break;
        }
    }

    var text = 'unknown';

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

    return <span><Icon name={icon} />{text}</span>;
}