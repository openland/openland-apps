import * as React from 'react';
import Glamorous from 'glamorous';
import { withUserInfo } from './UserInfo';
import { XCard } from './X/XCard';
import { XButton } from './X/XButton';
import { withRouter } from './../utils/withRouter';
import { XHead } from './X/XHead';
import { XLink } from './X/XLink';
import { MessagePage } from './MessagePage';

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

export const AuthenticationRequired = withRouter<{}>(withUserInfo((props) => {

    if (props.isLoggedIn) {
        return (
            <>
                {props.children}
            </>
        );
    } else {
        return (
            <>
                <XHead title="Sign in" titleSocial="Openland - land acquisition platfom" />
                <MessagePage>
                    <Title>Sign in to Openland</Title>
                    <XCard.Content>
                        <XButton path={'/auth/login?r=' + encodeURIComponent(props.router.pathname)} style="dark" bounce={true}>Sign in</XButton>
                    </XCard.Content>
                    <XCard.Content>
                        <SignupContainer><Signup>Don't have an Openland account? </Signup>{'\u00A0'}<XLink path="/signup">Sign Up</XLink></SignupContainer>
                    </XCard.Content>
                </MessagePage>
            </>
        );
    }
}))