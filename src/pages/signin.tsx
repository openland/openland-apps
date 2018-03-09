import '../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../components/X/XHead';
import { XLink } from '../components/X/XLink';
import { MessagePage } from '../components/MessagePage';
import { XCard } from '../components/X/XCard';
import { XButton } from '../components/X/XButton';
import { withData } from '../utils/withData';
import { RedirectComponent } from '../components/routing/RedirectComponent';
import { withRouter } from '../utils/withRouter';
import { withAccountQuery } from '../api';

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

export default withData(withAccountQuery(withRouter((props) => {
    if (props.data.me !== null) {
        if (props.data.myAccount !== null) {
            return <RedirectComponent path="/" />;
        } else {
            return <RedirectComponent path="/activation" />;
        }
    } else {
        let redirect = props.router.queryString ? (props.router.queryString.r ? props.router.queryString.r : null) : null;
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
    }
})));