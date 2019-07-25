import * as React from 'react';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { css } from 'linaria';
import { FullMessage_GeneralMessage_sender } from 'openland-api/Types';
import { MAvatar } from 'openland-web/fragments/chat/messenger/message/MAvatar';
import { emoji } from 'openland-y-utils/emoji';

const wrapperClass = css`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;

const innerClass = css`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
`;

const infoClass = css`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;

const nameClass = css`
    margin-right: 12px;
`;

const organizationClass = css`
    margin-right: 12px;
`;

const dateClass = css`
    
`;

interface SenderViewProps {
    sender: FullMessage_GeneralMessage_sender;
    date: number;
    edited: boolean;
}

export const SenderView = React.memo((props: SenderViewProps) => {
    const { sender, date } = props;
    const [senderNameEmojify, setSenderNameEmojify] = React.useState<string | JSX.Element>(sender.name);

    React.useEffect(() => {
        setSenderNameEmojify(emoji({ src: sender.name, size: 16 }));
    }, [sender.name]);

    return (
        <div className={wrapperClass}>
            <MAvatar
                senderId={sender.id}
                senderName={sender.name}
                senderNameEmojify={senderNameEmojify}
                senderPhoto={sender.photo}
            />
            <div className={innerClass}>
                <div className={infoClass}>
                    <div className={nameClass}>
                        <ULink path={`/${sender.shortname || sender.id}`}>{senderNameEmojify}</ULink>
                    </div>
                    <div className={organizationClass}>
                        {sender.primaryOrganization && <ULink path={`/${sender.primaryOrganization.shortname || sender.primaryOrganization.id}`}>{sender.primaryOrganization.name}</ULink>}
                    </div>
                </div>
                <div className={dateClass}>
                    {date}
                </div>
            </div>
        </div>
    );
});