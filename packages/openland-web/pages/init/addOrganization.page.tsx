import '../../globals';
import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withApp } from '../../components/withApp';
import { XForm } from 'openland-x-forms/XForm';
import { withCreateOrganization } from '../../api';
import {
    RootContainer,
    Logo,
    Title,
    TextWrapper,
    Label,
    InputGroup,
    ContentWrapper,
    FormWrapper,
    OptionalLabel,
    PhotoContiner,
    FieldHeader,
    Footer,
} from '../../components/CreateProfileComponents';
import { XButton } from 'openland-x/XButton';
import { withRouter } from 'next/router';

const CreateProfileForm = withCreateOrganization(withRouter((props) => {

    return (
        <RootContainer>
            <Logo />
            <ContentWrapper>
                <TextWrapper>
                    <Title>Add your organization</Title>
                </TextWrapper>
                <XForm submitMutation={props.createOrganization} mutationDirect={true} onCompleted={() => window.location.href = '/'}>
                    <XVertical>
                        <XHorizontal separator="none">
                            <FormWrapper>
                                <InputGroup>
                                    <Label>Organization name</Label>
                                    <XForm.Text field="title" size="medium" placeholder="Acme Corparation" required={true}/>
                                </InputGroup>
                                <InputGroup>
                                    <FieldHeader><Label>Website</Label><OptionalLabel>optional</OptionalLabel></FieldHeader>
                                    <XForm.Text field="website" size="medium" placeholder="http://acme.com/" />
                                </InputGroup>
                            </FormWrapper>
                            <PhotoContiner separator="none">
                                <FieldHeader><Label>Logo</Label><OptionalLabel>optional</OptionalLabel></FieldHeader>
                                <XForm.Avatar field="logo" placeholder={{ add: (<><p>Add</p> <p>organization logo</p></>), change: <><p>Change</p> <p>organization logo</p></> }} />
                            </PhotoContiner>
                        </XHorizontal>
                        <Footer>
                            <XButton style="link" text={['/authAddOrganization'].indexOf(props.router.path) > -1 ? 'Skip for now' : 'Cancel'} path="/" onClick={() => sessionStorage.setItem('__organization_add_skipped', 'true')} />
                            
                            <XForm.Submit style="primary" text="Continue" size="medium" alignSelf="flex-end" />
                        </Footer>
                    </XVertical>
                </XForm>
            </ContentWrapper>
        </RootContainer>
    );
}));

export default withApp('Create Profile', 'viewer', (props) => {
    return (
        <>
            <XDocumentHead title="Create profile" />
            <CreateProfileForm />
        </>
    );
});