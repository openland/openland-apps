import '../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../components/X/XHead';
import { XLink } from '../components/X/XLink';
import { MessagePage } from '../components/MessagePage';
import { XCard } from '../components/X/XCard';
import { XButton } from '../components/X/XButton';
import { RedirectComponent } from '../components/routing/RedirectComponent';
import { withRouter } from '../components/withRouter';
import { withAppBase } from '../components/withAppBase';
import { withUserInfo } from '../components/UserInfo';

let Signup = Glamorous.span({
    opacity: 0.7
});

let SignupContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 8
});

let Title = Glamorous.div({
    fontSize: 20,
    lineHeight: 1.6,
    fontWeight: 600,
    color: '#182642',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16
});

export default withAppBase(withRouter(withUserInfo((props) => {
    
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

    let redirect = props.router.query ? (props.router.query.r ? props.router.query.r : null) : null;
    let url = redirect ? '/auth/login?r=' + encodeURIComponent(redirect) : '/auth/login';
    return (
        <>
            <XHead title="Sign in" titleSocial="Openland - land acquisition platfom" />
            <MessagePage>
                <Title>Sign in to Openland</Title>
                <XCard.Content>
                    <XButton path={url} style="dark" bounce={true}>Sign in</XButton>
                </XCard.Content>
                <XCard.Content>
                    <SignupContainer><Signup>Don't have an Openland account? </Signup>{'\u00A0'}<XLink path="/signup">Sign Up</XLink></SignupContainer>
                </XCard.Content>
            </MessagePage>
        </>
    );
})));