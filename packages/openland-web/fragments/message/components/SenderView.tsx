import * as React from 'react';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { css, cx } from 'linaria';
import { FullMessage_GeneralMessage_sender } from 'openland-api/Types';
import { MAvatar } from 'openland-web/fragments/chat/messenger/message/MAvatar';
import { TextLabel1, TextCaption } from 'openland-web/utils/TextStyles';

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
    padding-left: 16px;
`;

const infoClass = css`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin-top: -3px;
    margin-bottom: -1px;
`;

const nameClass = css`
    margin-right: 12px;
`;

const nameLinkClass = css`
    color: #171B1F; // ThemeDefault.foregroundPrimary

    &:hover {
        text-decoration: none;
        color: #1885F2; // ThemeDefault.accentPrimary
    }
`;

const orgLinkClass = css`
    color: #676D7A; // ThemeDefault.foregroundSecondary

    &:hover {
        text-decoration: none;
        color: #1885F2; // ThemeDefault.accentPrimary
    }
`;

const dateClass = css`
    color: #676D7A; // ThemeDefault.foregroundSecondary
`;

const editClass = css`
    color: #676D7A; // ThemeDefault.foregroundSecondary

    &:before {
        content: "•";
        padding: 0 8px;
    }
`;

interface SenderViewProps {
    sender: FullMessage_GeneralMessage_sender;
    date: number;
    senderNameEmojify: string | JSX.Element;
}

export const SenderView = React.memo((props: SenderViewProps) => {
    const { sender, date, senderNameEmojify } = props;

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
                    <div className={cx(TextLabel1, nameClass)}>
                        <ULink path={`/${sender.shortname || sender.id}`} className={nameLinkClass}>
                            {senderNameEmojify}
                        </ULink>
                    </div>
                    <div className={TextCaption}>
                        {sender.primaryOrganization && (
                            <ULink path={`/${sender.primaryOrganization.shortname || sender.primaryOrganization.id}`} className={orgLinkClass}>
                                {sender.primaryOrganization.name}
                            </ULink>
                        )}
                    </div>
                </div>
                <div className={cx(TextCaption, dateClass)}>
                    {date}
                </div>
            </div>
        </div>
    );
});

interface SenderViewCompactProps {
    sender: FullMessage_GeneralMessage_sender;
    edited: boolean;
    senderNameEmojify: string | JSX.Element;
}

export const SenderViewCompact = React.memo((props: SenderViewCompactProps) => {
    const { sender, edited, senderNameEmojify } = props;

    return (
        <div className={infoClass}>
            <div className={cx(TextLabel1, nameClass)}>
                <ULink path={`/${sender.shortname || sender.id}`} className={nameLinkClass}>
                    {senderNameEmojify}
                </ULink>
            </div>
            <div className={TextCaption}>
                {sender.primaryOrganization && (
                    <ULink path={`/${sender.primaryOrganization.shortname || sender.primaryOrganization.id}`} className={orgLinkClass}>
                        {sender.primaryOrganization.name}
                    </ULink>
                )}
            </div>
            {edited && (
                <div className={cx(TextCaption, editClass)}>
                    Edited
                </div>
            )}
        </div>
    );
});