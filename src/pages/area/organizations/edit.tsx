import * as React from 'react';
import { withOrganizationAlter } from '../../../api';
import { withLoader } from '../../../components/Base/withLoader';
import { XForm, XFormField, XFormFieldCheck, XFormImage, XFormSubmit } from '../../../components/X/XForm';
import { XButton2 } from '../../../components/X/XButton2';
import { XHead } from '../../../components/X/XHead';
import { Links } from '../../../Links';
import { withAreaPage } from '../../../components/Navigation/withAreaPage';
import { XPageContent } from '../../../components/X/XPageContent';
import { XCard } from '../../../components/X/XCard';
import { XSection } from '../../../components/X/XSection';
import { XTitle } from '../../../components/X/XTitle';

export default withAreaPage(withOrganizationAlter(withLoader((props) => {

    return (
        <>
        <XHead title="Edit Organization" imgCloud={props.data.organization.cover} />
        <XPageContent>
            <XSection>
                <XTitle>Edit Organization</XTitle>
                <XCard>
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
                        <XButton2
                            mutation={props.remove}
                            afterPath={Links.area('sf').organizations}
                            negative={true}
                        >
                            Remove
                        </XButton2>
                    </XForm>
                </XCard>
            </XSection>
        </XPageContent>
        </>
    );
})));