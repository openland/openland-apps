import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withUserInfo } from '../../../components/UserInfo';
import { XVertical } from 'openland-x-layout/XVertical';
import { XForm } from 'openland-x-forms/XForm2';
import { XContent } from 'openland-x-layout/XContent';
import { withSaveProfile } from '../../../api';
import { Navigation } from './Navigation';
import { XHeader } from 'openland-x/XHeader';
import { XFooter } from 'openland-x/XFooter';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XFormFieldText } from 'openland-x-forms/XFormFieldText';

export default withApp('Profile', 'viewer', withSaveProfile(withUserInfo((props) => {
    return (
        <Navigation title="Profile">
            <XHeader text="Profile" />
            <XContent>
                <XVertical width={400} alignSelf="flex-start">
                    <XForm
                        defaultData={{ firstName: props.user!!.firstName, lastName: props.user!!.lastName }}
                        defaultAction={(data) => props.saveProfile({ variables: data })}
                    >
                        <XFormFieldText field="firstName" title="First name" />
                        <XFormFieldText field="lastName" title="Last name" />
                        <XFooter>
                            <XFormSubmit text="Save" />
                        </XFooter>
                    </XForm>
                </XVertical>
            </XContent>
        </Navigation>
    );
})));