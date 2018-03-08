import * as React from 'react';
import Glamorous from 'glamorous';
import { withUserInfo } from '../Base/UserInfo';
import { XCard } from '../X/XCard';
import { XButton } from '../X/XButton';
import { withRouter } from '../../utils/withRouter';
import { XHead } from '../X/XHead';
import { XLink } from '../X/XLink';

let ErrorDiv = Glamorous.div({
    position: 'relative',
    backgroundImage: 'url(\'/static/img/bg_topography.png\')',
    backgroundAttachment: 'fixed',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100vw',
    height: '100vh'
});

let Container = Glamorous(XCard)({
    width: 400
});

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

let Footer = Glamorous.div({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: '#000000',
    opacity: 0.4,
    fontSize: '14px',
    fontWeight: 600
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
                <ErrorDiv>
                    <Container shadow="medium">
                        <Title>Sign in to Openland</Title>
                        <XCard.Content>
                            <XButton path={'/auth/login?r=' + encodeURIComponent(props.router.pathname)} style="dark" bounce={true}>Sign in</XButton>
                        </XCard.Content>
                        <XCard.Content>
                            <SignupContainer><Signup>Don't have an Openland account? </Signup>{'\u00A0'}<XLink path="/signup">Sign Up</XLink></SignupContainer>
                        </XCard.Content>
                    </Container>
                    <Footer>
                        Data Makes Perfect LLC, CA 94102, 2017-2018
                    </Footer>
                </ErrorDiv>
            </>
        );
    }
}))