import '../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withApp } from '../../components/withApp';
import { XForm } from 'openland-x-forms/XForm';
import { withSaveProfile } from '../../api';

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

const CreateProfileForm = withSaveProfile((props) => {
    return (
        <RootContainer>
            <Logo />
            <ContentWrapper>
                <TextWrapper>
                    <Title>Hey, what’s your name?</Title>
                    <Description>Tell us a little about yourself. Fill in the fields below.</Description>
                </TextWrapper>
                <XForm submitMutation={props.saveProfile} mutationDirect={true} onCompleted={() => window.location.href = '/'}>
                    <XVertical>
                        <XHorizontal separator="large">
                            <FormWrapper>
                                <InputGroup>
                                    <Label>First Name</Label>
                                    <XForm.Text field="firstName" size="medium" placeholder="For example: Steve" />
                                </InputGroup>
                                <InputGroup>
                                    <Label>Last Name</Label>
                                    <XForm.Text field="lastName" size="medium" placeholder="For example: Lifshits" />
                                </InputGroup>
                            </FormWrapper>
                        </XHorizontal>
                        <XForm.Submit style="primary" text="Continue" size="medium" alignSelf="flex-end" />
                    </XVertical>
                </XForm>
            </ContentWrapper>
        </RootContainer>
    );
});

export default withApp('UI Framework - Account', 'viewer', (props) => {
    return (
        <>
            <XDocumentHead title="Create account" />
            <CreateProfileForm />
        </>
    );
});