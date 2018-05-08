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
            if (!props.isActivated) {
                return <XPageRedirect path="/activation" />;
            }
        } else {
            return <XPageRedirect path="/" />;
        }
    } else {
        return <XPageRedirect path="/signin" />;
    }

    return (
        <>
            <XDocumentHead title="Need Info" titleSocial="Openland - land acquisition platfom" />
            <XTrack event="View Need Info">
                <MessagePage>
                    <MessagePageContent
                        title="We need more info"
                    >
                        To continue working with system we need more information from you
                </MessagePageContent>
                </MessagePage>
            </XTrack>
        </>
    );
}));