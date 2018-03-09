import '../globals';
import * as React from 'react';
import { XHead } from '../components/X/XHead';
import { MessagePage } from '../components/MessagePage';
import { MessagePageContent } from '../components/MessagePageContent';
import { RedirectComponent } from '../components/routing/RedirectComponent';
import { withAppBase } from '../components/withAppBase';
import { withUserInfo } from '../components/UserInfo';

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
            <MessagePage>
                <MessagePageContent
                    title="Your account is not active"
                    message="Your account is no longer active"
                />
            </MessagePage>
        </>
    );
}));