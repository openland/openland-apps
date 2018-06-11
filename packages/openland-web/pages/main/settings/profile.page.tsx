import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withUserInfo } from '../../../components/UserInfo';
import { XVertical } from 'openland-x-layout/XVertical';
import { XForm } from 'openland-x-forms/XForm2';
import { XContent } from 'openland-x-layout/XContent';
import { withSaveProfile } from '../../../api';
import { Navigation } from './_navigation';
import { XHeader } from 'openland-x/XHeader';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XFormFieldText } from 'openland-x-forms/XFormFieldText';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XTitle } from 'openland-x/XTitle';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormField } from 'openland-x-forms/XFormField';

export default withApp('Profile', 'viewer', withSaveProfile(withUserInfo((props) => {
    return (
        <Navigation title="Profile">
            <XHeader text="Profile" />
            <XContent>
                <XVertical alignSelf="stretch">
                    <XForm
                        defaultData={{ firstName: props.user!!.firstName, lastName: props.user!!.lastName }}
                        defaultAction={async (data) => {
                            await props.saveProfile({ variables: data });
                        }}
                        defaultLayout={false}
                    >
                        <XVertical>
                            <XFormLoadingContent>
                                <XVertical>
                                    <XHorizontal>
                                        <XVertical flexGrow={1} maxWidth={500}>
                                            <XFormFieldText field="firstName" title="First name" size="medium" />
                                            <XFormFieldText field="lastName" title="Last name" size="medium" />
                                            <XFormFieldText field="about" title="What I do" description="Let people know who are you" size="medium" />
                                            <XTitle>Contacts</XTitle>
                                            <XFormFieldText field="phone" title="Phone Number" size="medium" />
                                            <XFormFieldText field="email" title="Email" size="medium" />
                                            <XFormFieldText field="website" title="Web Site" size="medium" />
                                            <XFormFieldText field="location" title="Location" size="medium" />
                                        </XVertical>
                                        <XFormField title="Photo">
                                            <XAvatarUpload field="photo" />
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
})));