import '../globals';
import * as React from 'react';
import { XHead } from '../components/X/XHead';
import { MessagePage } from '../components/MessagePage';
import { MessagePageContent } from '../components/MessagePageContent';
import { withAppBase } from '../components/withAppBase';
import { withUserInfo } from '../components/UserInfo';
import { XTrack } from '../components/X/XTrack';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XLink } from 'openland-x/XLink';

export default withAppBase(withUserInfo((props) => {

    // Do not edit without reason!
    if (props.isLoggedIn) {
        if (!props.isBlocked) {
            if (!props.isCompleted) {
                if (props.isActivated) {
                    return <XPageRedirect path="/need_info" />;
                } else {
                    return <XPageRedirect path="/activation" />;
                }
            } else {
                return <XPageRedirect path="/" />;
            }
        }
    } else {
        return <XPageRedirect path="/signin" />;
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