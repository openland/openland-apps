import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XVertical } from 'openland-x-layout/XVertical';
import { XForm } from 'openland-x-forms/XForm2';
import { XContent } from 'openland-x-layout/XContent';
import { withProfile } from '../../../api';
import { Navigation } from './_navigation';
import { XHeader } from 'openland-x/XHeader';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XFormFieldText } from 'openland-x-forms/XFormFieldText';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XTitle } from 'openland-x/XTitle';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormField } from 'openland-x-forms/XFormField';
import { sanitizeIamgeRef } from '../../../utils/sanitizer';
import { XFormError } from 'openland-x-forms/XFormError';

export default withApp('Profile', 'viewer', withProfile((props) => {
    return (
        <Navigation title="Profile">
            <XHeader text="Profile" />
            <XContent>
                <XVertical alignSelf="stretch">
                    <XForm
                        defaultData={{
                            input: {
                                firstName: props.data.profile!!.firstName,
                                lastName: props.data.profile!!.lastName,
                                about: props.data.profile!!.about,
                                phone: props.data.profile!!.phone,
                                email: props.data.profile!!.email,
                                website: props.data.profile!!.website,
                                location: props.data.profile!!.location,
                                photoRef: sanitizeIamgeRef(props.data.profile!!.photoRef),
                            }
                        }}
                        defaultAction={async (data) => {
                            await props.updateProfile({ variables: data });
                        }}
                        defaultLayout={false}
                    >
                        <XVertical>
                            <XFormError />
                            <XFormLoadingContent>
                                <XVertical>
                                    <XHorizontal>
                                        <XVertical flexGrow={1} maxWidth={500}>
                                            <XFormFieldText field="input.firstName" title="First name" size="medium" />
                                            <XFormFieldText field="input.lastName" title="Last name" size="medium" />
                                            <XFormFieldText field="input.about" title="What I do" description="Let people know who are you" size="medium" />
                                            <XTitle>Contacts</XTitle>
                                            <XFormFieldText field="input.phone" title="Phone Number" size="medium" />
                                            <XFormFieldText field="input.email" title="Email" size="medium" />
                                            <XFormFieldText field="input.website" title="Web Site" size="medium" />
                                            <XFormFieldText field="input.location" title="Location" size="medium" />
                                        </XVertical>
                                        <XFormField title="Photo">
                                            <XAvatarUpload field="input.photoRef" />
                                        </XFormField>
                                    </XHorizontal>
                                </XVertical>
                            </XFormLoadingContent>
                            <XFormSubmit text="Save" style="primary" alignSelf="flex-start" size="medium" />
                        </XVertical>
                    </XForm>
                </XVertical>
            </XContent>
        </Navigation>
    );
}));