import * as React from 'react';
import { Container } from './views/Container';
import { preprocessMentions } from '../utils/preprocessMentions';
import { MentionedUser } from './views/MentionedUser';
import { emoji } from 'openland-y-utils/emoji';
import { FullMessage_ServiceMessage_spans } from 'openland-api/Types';

export interface ServiceMessageDefaultProps {
    message: string;
    spans?: FullMessage_ServiceMessage_spans[];
}

const EmojifiedText = React.memo(({ text }: { text: string }) => {
    let refactorText = text;
    let createGroupText = text.match('created the group');
    if (createGroupText) {
        refactorText = text.split('reated the group')[1];
    }
    return (
        <span>
            {createGroupText && <> created the group</>}
            {refactorText ? (
                <strong>
                    {emoji({
                        src: refactorText,
                        size: 16,
                    })}
                </strong>
            ) : (
                    <>
                        {emoji({
                            src: refactorText,
                            size: 16,
                        })}
                    </>
                )}
        </span>
    );
});

export const ServiceMessageDefault = React.memo(
    ({ message, spans }: ServiceMessageDefaultProps) => {
        let mentions = preprocessMentions(message, null, []);
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
