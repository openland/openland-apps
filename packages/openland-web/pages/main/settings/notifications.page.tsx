import '../../init';
import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XVertical } from 'openland-x-layout/XVertical';
import { XForm } from 'openland-x-forms/XForm2';
import { XContent } from 'openland-x-layout/XContent';
import { Navigation } from './_navigation';
import { XHeader } from 'openland-x/XHeader';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormError } from 'openland-x-forms/XFormError';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { XSelect } from 'openland-x/XSelect';
import { XTitle } from 'openland-x/XTitle';
import { XText } from 'openland-x/XText';
import { withSettings } from '../../../api/withSettings';

export default withApp('Notifications', 'viewer', withSettings(withQueryLoader((props) => {
    return (
        <Navigation title="Notifications">
            <XHeader text="Notifications" />
            <XContent>
                <XVertical alignSelf="stretch">
                    <XForm
                        defaultData={{
                            input: {
                                emailFrequency: props.data.settings.emailFrequency,
                                desktopNotifications: props.data.settings.desktopNotifications
                            }
                        }}
                        defaultAction={async (data) => {
                            await props.update({ variables: data });
                        }}
                        defaultLayout={false}
                    >
                        <XVertical>
                            <XFormError onlyGeneralErrors={true} />
                            <XFormLoadingContent>
                                <XVertical>
                                    <XHorizontal>
                                        <XVertical flexGrow={1} maxWidth={500}>
                                            <XTitle>Desktop Notifications</XTitle>
                                            <XText>Notify me about...</XText>
                                            <XSelect
                                                field="input.desktopNotifications"
                                                options={[
                                                    { value: 'ALL', label: 'All new messages' },
                                                    { value: 'DIRECT', label: 'Direct messages' },
                                                    { value: 'NONE', label: 'Nothing' }
                                                ]}
                                            />
                                            <XTitle>Email Notifications</XTitle>
                                            <XText>When you’re busy or not online, Openland can send you email notifications for new messages.</XText>
                                            <XSelect
                                                field="input.emailFrequency"
                                                options={[
                                                    { value: 'MIN_15', label: 'Once every 15 minutes' },
                                                    { value: 'HOUR_1', label: 'Once an hour at most' },
                                                    { value: 'NEVER', label: 'Never' }
                                                ]}
                                            />
                                            <XText>We will use <strong>{props.data.settings.primaryEmail}</strong> for notifications.</XText>
                                        </XVertical>
                                    </XHorizontal>
                                </XVertical>
                            </XFormLoadingContent>
                            <XFormSubmit text="Save" style="primary" alignSelf="flex-start" />
                        </XVertical>
                    </XForm>
                </XVertical>
            </XContent>
        </Navigation>
    );
})));