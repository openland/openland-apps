import '../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../components/X/XHead';
import { RedirectComponent } from '../components/routing/RedirectComponent';
import { withAppBase } from '../components/withAppBase';
import { withUserInfo } from '../components/UserInfo';
import { XTrack } from '../components/X/XTrack';

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
            return <RedirectComponent path="/suspended" />;
        } else if (props.isCompleted) {
            return <RedirectComponent path="/" />;
        } else if (!props.isActivated) {
            return <RedirectComponent path="/activation" />;
        } else {
            return <RedirectComponent path="/need_info" />;
        }
    }

    return (
        <RootDiv>
            <XHead title="Sign Up" />
            <XTrack event="View Signup">
                <TypeformEmbedded url="https://openlandapp.typeform.com/to/RoMP5U" />
            </XTrack>
        </RootDiv>
    );
}));