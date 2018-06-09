import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withUserInfo } from '../../../components/UserInfo';
import { XVertical } from 'openland-x-layout/XVertical';
import { XForm } from 'openland-x-forms/XForm';
import { XContent } from 'openland-x-layout/XContent';
import { withSaveProfile } from '../../../api';
import { Navigation } from './Navigation';
import { XHeader } from 'openland-x/XHeader';
import { XFooter } from 'openland-x/XFooter';

export default withApp('Profile', 'viewer', withSaveProfile(withUserInfo((props) => {
    return (
        <Navigation title="Profile">
            <XHeader text="Profile" />
            <XContent>
                <XVertical width={400} alignSelf="flex-start">
                    <XForm defaultValues={{ firstName: props.user!!.firstName, lastName: props.user!!.lastName }} mutationDirect={true} submitMutation={props.saveProfile}>
                        <XForm.Text field="firstName" />
                        <XForm.Text field="lastName" />
                        <XFooter>
                            <XForm.Submit text="Save" />
                        </XFooter>
                    </XForm>
                </XVertical>
            </XContent>
        </Navigation>
    );
})));