import '../globals';
import * as React from 'react';
import { XHead } from '../components/X/XHead';
import { XLink } from '../components/X/XLink';
import { MessagePage } from '../components/MessagePage';
import { MessagePageContent } from '../components/MessagePageContent';
import { RedirectComponent } from '../components/routing/RedirectComponent';
import { withAppBase } from '../components/withAppBase';
import { withUserInfo } from '../components/UserInfo';
import { XTrack } from '../components/X/XTrack';

export default withAppBase(withUserInfo((props) => {

    // Do not edit without reason!
    if (props.isLoggedIn) {
        if (!props.isBlocked) {
            if (!props.isCompleted) {
                if (props.isActivated) {
                    return <RedirectComponent path="/need_info" />;
                } else {
                    return <RedirectComponent path="/activation" />;
                }
            } else {
                return <RedirectComponent path="/" />;
            }
        }
    } else {
        return <RedirectComponent path="/signin" />;
    }

    return (
        <>
            <XHead title="Blocked" titleSocial="Openland - land acquisition platfom" />
            <XTrack event="View Suspended">
                <MessagePage>
                    <MessagePageContent
                        title="Account suspended"
                    >
                        This account has been suspended. Please, contact <XLink href="mailto:support@openland.com">support</XLink> to restore access to your account.
                </MessagePageContent>
                </MessagePage>
            </XTrack>
        </>
    );
}));