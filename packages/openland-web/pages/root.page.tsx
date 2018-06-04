import '../globals';
import * as React from 'react';
import { withAppBase } from '../components/withAppBase';
import { withUserInfo } from '../components/UserInfo';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { XWithRole } from 'openland-x-permissions/XWithRole';

export default withAppBase(withUserInfo((props) => {
    // Do not edit without reason!
    if (props.isLoggedIn) {
        if (props.isBlocked) {
            return <XPageRedirect path="/suspended" />;
        } else if (!props.isCompleted) {
            if (props.isActivated) {
                return <XPageRedirect path="/need_info" />;
            } else {
                return <XPageRedirect path="/activation" />;
            }
        }
    } else {
        return <XPageRedirect path="/signin" />;
    }

    return (
        <>
            <XDocumentHead title="App" titleSocial="Openland - land acquisition platfom" />
            <XTrack event="View Root">
                <XWithRole role="feature-marketplace">
                    <XPageRedirect path="/home" />
                </XWithRole>
                <XWithRole role="feature-marketplace" negate={true}>
                    <XPageRedirect path="/map" />
                </XWithRole>
            </XTrack>
        </>
    );
}));