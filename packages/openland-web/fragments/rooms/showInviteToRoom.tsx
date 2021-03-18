import copy from 'copy-to-clipboard';
import { cx, css } from 'linaria';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { TextBody, TextStyles } from 'openland-web/utils/TextStyles';
import { showModalBox } from 'openland-x/showModalBox';
import * as React from 'react';
import { XView } from 'react-mental';

const linkStyle = css`
    flex-grow: 1;
    height: 40px;
    border-radius: 8px;
    padding: 8px 40px 8px 16px;
    background-color: var(--backgroundTertiaryTrans);
    color: var(--foregroundPrimary);
    text-overflow: ellipsis;
    overflow: hidden;
`;

interface InviteToRoomProps {
    link: string;
}

const InviteToRoom = React.memo((props: InviteToRoomProps & { hide: () => void }) => {
    const { link, hide } = props;
    const [copied, setCopied] = React.useState(false);
    let timeoutId: any;
    const handleCopy = () => {
        setCopied(true);
        if (timeoutId) {
            window.clearTimeout(timeoutId);
        }
        copy(link, { format: 'text/plain' });
        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };
    return (
        <XView paddingHorizontal={8}>
            <XView paddingHorizontal={16} paddingVertical={12} color="var(--foregroundPrimary)" {...TextStyles.Title3}>
                Share room link
            </XView>
            <XView
                flexDirection="row"
                paddingHorizontal={16}
                marginBottom={24}
            >
                <div className={cx(linkStyle, TextBody)}>{link}</div>
            </XView>
            <XModalFooter>
                <UButton text="Cancel" style="tertiary" size="large" onClick={hide} />
                <UButton text={copied ? 'Copied' : 'Copy'} style={copied ? 'success' : 'primary'} size="large" onClick={handleCopy} />
            </XModalFooter>
        </XView>
    );
});

export const showInviteToRoom = (props: InviteToRoomProps) => {
    showModalBox({ title: 'Invite people', width: 480 }, ctx => (
        <InviteToRoom {...props} hide={ctx.hide} />
    ));
};
