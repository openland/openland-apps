import '../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XButton } from 'openland-x/XButton';
import { XInput } from 'openland-x/XInput';
import { withApp } from '../../components/withApp';

const RootContainer = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    position: 'relative',
    backgroundColor: '#fff'
});

const Logo = Glamorous.div<{ width?: number, height?: number }>((props) => ({
    width: props.width ? props.width : 45,
    height: props.height ? props.height : 45,
    backgroundImage: 'url(\'/static/logo-purple.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    position: 'absolute',
    top: 15,
    left: 23
}));

const Title = Glamorous.div({
    fontSize: 28,
    fontWeight: 500,
    letterSpacing: 0.9,
    color: '#1f3449',
    marginBottom: 15
});

const Description = Glamorous.div({
    opacity: 0.7,
    fontSize: 17,
    lineHeight: 1.41,
    letterSpacing: -0.1,
    color: '#1f3449'
});

const TextWrapper = Glamorous.div({
    marginBottom: 46
});

const Label = Glamorous.div({
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.27,
    letterSpacing: -0.1,
    color: '#334562',
    marginBottom: 12
});

const InputGroup = Glamorous.div({
    marginBottom: 26,
    width: 380,
    '&:last-child': {
        marginBottom: 0
    }
});

const ContentWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
});

const FormWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
});

class Account extends React.Component {
    render() {
        return (
            <RootContainer>
                <Logo />
                <ContentWrapper>
                    <TextWrapper>
                        <Title>Hey, what’s your name?</Title>
                        <Description>Tell us a little about yourself. Fill in the fields below.</Description>
                    </TextWrapper>
                    <XVertical>
                        <XHorizontal separator="large">
                            <FormWrapper>
                                <InputGroup>
                                    <Label>First Name</Label>
                                    <XInput size="medium" placeholder="For example: Vladimir" />
                                </InputGroup>
                                <InputGroup>
                                    <Label>Last Name</Label>
                                    <XInput size="medium" placeholder="For example: Putin" />
                                </InputGroup>
                            </FormWrapper>
                            {/* <FormWrapper>
                                <Label>Photo</Label>
                                <DropArea />
                            </FormWrapper> */}
                        </XHorizontal>
                        <XButton style="primary" text="Continue" size="medium" alignSelf="flex-end" />
                    </XVertical>
                </ContentWrapper>
            </RootContainer>
        );
    }
}

export default withApp('UI Framework - Account', 'viewer', (props) => {
    return (
        <>
            <XDocumentHead title="Create account" />
            <Account />
        </>
    );
});