import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { withUserInfo } from '../../../components/UserInfo';
import { XVertical } from 'openland-x-layout/XVertical';
import { XForm } from 'openland-x-forms/XForm';
import { XContent } from 'openland-x-layout/XContent';
import { XHeader } from 'openland-x/XHeader';

export default withApp('Profile', 'viewer', withUserInfo((props) => {
    return (
        <>
            <XDocumentHead title="Profile" />
            <Scaffold>
                <Scaffold.Content>
                    <XHeader text="Your profile"/>
                    <XContent>
                        <XVertical width={400} alignSelf="flex-start">
                            <XForm defaultValues={{ firstName: props.user!!.firstName, lastName: props.user!!.lastName }}>
                                <XForm.Text field="firstName" />
                                <XForm.Text field="lastName" />
                                <XForm.Footer>
                                    <XForm.Submit text="Save" />
                                </XForm.Footer>
                            </XForm>
                        </XVertical>
                    </XContent>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));