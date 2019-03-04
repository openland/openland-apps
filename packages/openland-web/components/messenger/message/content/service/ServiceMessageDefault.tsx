import * as React from 'react';
import { Container } from './views/Container';
import { preprocessMentions } from '../utils/preprocessMentions';
import { MentionedUser } from './views/MentionedUser';
import { emoji } from 'openland-y-utils/emoji';

export interface ServiceMessageDefaultProps {
    message: string;
    otherParams: any;
}

export const ServiceMessageDefault = (props: ServiceMessageDefaultProps) => {
    let mentions = preprocessMentions(props.message, null, props.otherParams.alphaMentions);
    let res: any[] = [];
    let i = 0;
    for (let m of mentions) {
        if (m.type === 'text') {
            res.push(
                <span key={'text-' + i}>
                    {emoji({
                        src: m.text,
                        size: 16,
                    })}
                </span>,
            );
        } else {
            res.push(<MentionedUser key={'text-' + i} isYou={m.user.isYou} user={m.user} />);
        }

        i++;
    }
    return <Container>{res}</Container>;
};
