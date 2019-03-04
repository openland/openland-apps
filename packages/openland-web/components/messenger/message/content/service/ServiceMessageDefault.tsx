import * as React from 'react';
import { Container } from './views/Container';
import { preprocessMentions } from '../utils/preprocessMentions';
import { MentionedUser } from './views/MentionedUser';
import { emoji } from 'openland-y-utils/emoji';
import { MessageFull_alphaMentions } from 'openland-api/Types';

export interface ServiceMessageDefaultProps {
    message: string;
    alphaMentions: MessageFull_alphaMentions[];
}

const EmojifiedText = React.memo(({ text }: { text: string }) => {
    return (
        <span>
            {emoji({
                src: text,
                size: 16,
            })}
        </span>
    );
});

export const ServiceMessageDefault = React.memo(
    ({ message, alphaMentions }: ServiceMessageDefaultProps) => {
        let mentions = preprocessMentions(message, null, alphaMentions);
        let res: any[] = [];
        let i = 0;
        for (let m of mentions) {
            if (m.type === 'text') {
                res.push(<EmojifiedText key={'text-' + i} text={m.text} />);
            } else {
                res.push(<MentionedUser key={'text-' + i} isYou={m.user.isYou} user={m.user} />);
            }

            i++;
        }
        return <Container>{res}</Container>;
    },
);
