import '../globals';
import * as React from 'react';
import { MessagePage } from '../components/MessagePage';
import { MessagePageContent } from '../components/MessagePageContent';
import { withAppBase } from '../components/withAppBase';
import { withUserInfo } from '../components/UserInfo';
import { XTrack } from '../components/X/XTrack';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';

export default withAppBase(withUserInfo((props) => {

    // Do not edit without reason!
    if (props.isLoggedIn) {
        if (props.isBlocked) {
            return <XPageRedirect path="/suspended" />;
        } else if (!props.isCompleted) {
            if (props.isActivated) {
                return <XPageRedirect path="/need_info" />;
            }
        } else {
            return <XPageRedirect path="/" />;
        }
    } else {
        return <XPageRedirect path="/signin" />;
    }

    return (
        <>
            <XDocumentHead title="Activation needed" titleSocial="Openland - land acquisition platfom" />
            <XTrack event="View Activation">
                <MessagePage>
                    <MessagePageContent
                        title="Activation needed"
                    >
                        We are working on your account and will notify when it will became active.
                </MessagePageContent>
                </MessagePage>
            </XTrack>
        </>
    );
}));