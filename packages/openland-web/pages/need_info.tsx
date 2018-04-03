import '../globals';
import * as React from 'react';
import { XHead } from '../components/X/XHead';
import { MessagePage } from '../components/MessagePage';
import { MessagePageContent } from '../components/MessagePageContent';
import { RedirectComponent } from '../components/routing/RedirectComponent';
import { withAppBase } from '../components/withAppBase';
import { withUserInfo } from '../components/UserInfo';
import { XTrack } from '../components/X/XTrack';

export default withAppBase(withUserInfo((props) => {

    // Do not edit without reason!
    if (props.isLoggedIn) {
        if (props.isBlocked) {
            return <RedirectComponent path="/suspended" />;
        } else if (!props.isCompleted) {
            if (!props.isActivated) {
                return <RedirectComponent path="/activation" />;
            }
        } else {
            return <RedirectComponent path="/" />;
        }
    } else {
        return <RedirectComponent path="/signin" />;
    }

    return (
        <>
            <XHead title="Need Info" titleSocial="Openland - land acquisition platfom" />
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