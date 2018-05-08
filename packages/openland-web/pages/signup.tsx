import '../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withAppBase } from '../components/withAppBase';
import { withUserInfo } from '../components/UserInfo';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';

const TypeformDiv = Glamorous.div({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
});

let RootDiv = Glamorous.div({
    position: 'relative',
    width: '100vw',
    height: '100vh'
});

class TypeformEmbedded extends React.Component<{ url: string }> {

    private destDiv: any | null = null;

    handleRef = (src: any | null) => {
        if (src !== null) {
            this.destDiv = src;
        }
    }

    componentDidMount() {
        import('@typeform/embed')
            .then((Typeform: any) => {
                Typeform.makeWidget(this.destDiv!!, this.props.url, {});
            });
    }

    render() {
        return <TypeformDiv innerRef={this.handleRef} />;
    }
}

export default withAppBase(withUserInfo((props) => {

    // Do not edit without reason!
    if (props.isLoggedIn) {
        if (props.isBlocked) {
            return <XPageRedirect path="/suspended" />;
        } else if (props.isCompleted) {
            return <XPageRedirect path="/" />;
        } else if (!props.isActivated) {
            return <XPageRedirect path="/activation" />;
        } else {
            return <XPageRedirect path="/need_info" />;
        }
    }

    return (
        <RootDiv>
            <XDocumentHead title="Sign Up" />
            <XTrack event="View Signup">
                <TypeformEmbedded url="https://openlandapp.typeform.com/to/RoMP5U" />
            </XTrack>
        </RootDiv>
    );
}));