import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withOrganizationAlter } from '../../../api/Organizations';
import { withLoader } from '../../../components/withLoader';
import { Segment } from 'semantic-ui-react';
import { XForm, XFormField, XFormFieldCheck, XFormImage, XFormSubmit } from '../../../components/X/XForm';
import { XContainer } from '../../../components/X/XContainer';
import { XButton } from '../../../components/X/XButton';

export default withPage(withOrganizationAlter(withLoader((props) => {

    return (
        <div style={{paddingTop: 32, paddingBottom: 32}}>
            <XContainer wide={true}>
                <Segment>
                    <XForm
                        defaultValues={props.data.organization}
                        mutate={props.alter}
                        afterPath={'/organizations/' + props.data.organization.slug}
                    >
                        <XFormField name="title" title="Developer Name" hint="ACME Inc."/>
                        <XFormImage name="logo" title="Logo"/>
                        <XFormFieldCheck name="isDeveloper" hint="Developer"/>
                        <XFormFieldCheck name="isConstructor" hint="Constructor"/>
                        <XFormField name="city" title="City" hint="City"/>
                        <XFormField name="address" title="Address" hint="Address"/>
                        <XFormField name="url" title="Web Site" hint="Url"/>
                        <XFormField name="twitter" title="Twitter" hint="Twitter"/>
                        <XFormField name="linkedin" title="LinkedIn" hint="LinkedIn"/>
                        <XFormField name="facebook" title="Facebook" hint="Facebook"/>
                        <XFormField name="comments" title="Comments" hint="Comments"/>
                        <XFormSubmit title="Save"/>
                        <XButton mutation={props.remove} afterPath="/organizations/" negative={true}>Remove</XButton>
                    </XForm>
                </Segment>
            </XContainer>
        </div>
    );
})));