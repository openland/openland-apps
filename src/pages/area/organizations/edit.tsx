import * as React from 'react';
import { withOrganizationAlter } from '../../../api/Organizations';
import { withLoader } from '../../../components/withLoader';
import { Segment } from 'semantic-ui-react';
import { XForm, XFormField, XFormFieldCheck, XFormImage, XFormSubmit } from '../../../components/X/XForm';
import { XContainer } from '../../../components/X/XContainer';
import { XButton } from '../../../components/X/XButton';
import { XHead } from '../../../components/X/XHead';
import { Links } from '../../../Links';
import { withAreaPage } from '../../../components/withAreaPage';

export default withAreaPage(withOrganizationAlter(withLoader((props) => {

    return (
        <>
        <XHead title="Edit Organization" imgCloud={props.data.organization.cover} />
        <div style={{ paddingTop: 32, paddingBottom: 32 }}>
            <XContainer wide={true}>
                <Segment>
                    <XForm
                        defaultValues={props.data.organization}
                        mutate={props.alter}
                        afterPath={Links.area('sf').org(props.data.organization.slug).view}
                    >
                        <XFormField name="title" title="Developer Name" hint="ACME Inc." />
                        <XFormImage name="logo" title="Logo" />
                        <XFormImage name="cover" title="Cover" />
                        <XFormFieldCheck name="isDeveloper" hint="Developer" />
                        <XFormFieldCheck name="isConstructor" hint="Constructor" />
                        <XFormField name="city" title="City" hint="City" />
                        <XFormField name="address" title="Address" hint="Address" />
                        <XFormField name="url" title="Web Site" hint="Url" />
                        <XFormField name="twitter" title="Twitter" hint="Twitter" />
                        <XFormField name="linkedin" title="LinkedIn" hint="LinkedIn" />
                        <XFormField name="facebook" title="Facebook" hint="Facebook" />
                        <XFormField name="description" title="Description" hint="Description" />
                        <XFormField name="comments" title="Comments" hint="Comments" />
                        <XFormSubmit title="Save" />
                        <XButton
                            mutation={props.remove}
                            afterPath={Links.area('sf').organizations}
                            negative={true}
                        >
                            Remove
                        </XButton>
                    </XForm>
                </Segment>
            </XContainer>
        </div>
        </>
    );
})));