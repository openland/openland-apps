import * as React from 'react';
import { XView } from 'react-mental';
import { showModalBox, XModalBoxStyles } from 'openland-x/showModalBox';
import { useClient } from 'openland-web/utils/useClient';
import { OwnerLinkComponent } from './OwnerLinkComponent';

const OwnerLinkOrganization = (props: { onCopied: () => void }) => {
    const client = useClient();
    const data = client.useAccountAppInvite();

    if (!data) {
        return null;
    }

    return <OwnerLinkComponent appInvite={data ? data.invite : null} onCopied={props.onCopied} />;
};

export function showAppInviteModal() {
    showModalBox({ title: 'Invite people to Openland' }, ctx => {
        return (
            <XView
                maxWidth={575}
                paddingHorizontal={XModalBoxStyles.contentPadding}
                paddingBottom={24}
                paddingTop={6}
                borderRadius={8}
                overflow="hidden"
            >
                <OwnerLinkOrganization onCopied={ctx.hide} />
            </XView>
        );
    });
}
