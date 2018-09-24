import '../../init';
import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withSettings } from '../../../api/withSettings';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { XVertical } from 'openland-x-layout/XVertical';
import { XForm } from 'openland-x-forms/XForm2';
import { Navigation } from './_navigation';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormError } from 'openland-x-forms/XFormError';
import { XSContainer } from 'openland-xs/XSContainer';
import { XSHeader } from 'openland-xs/XSHeader';
import { XSGroup } from 'openland-xs/XSGroup';
import { XSCheckbox } from 'openland-xs/XSCheckbox';
import { XSGroupTitle } from 'openland-xs/XSGroupTitle';
import { XSGroupText } from 'openland-xs/XSGroupText';
import { XSWrapper } from 'openland-xs/XSWrapper';

export default withApp('Notifications', 'viewer', withSettings(withQueryLoader((props) => {
    return (
        <Navigation title="Notifications">
            <XSContainer>
                <XSHeader title="Notifications" />

                <XForm
                    defaultData={{
                        input: {
                            emailFrequency: props.data.settings.emailFrequency,
                            desktopNotifications: props.data.settings.desktopNotifications,
                            mobileNotifications: props.data.settings.mobileNotifications
                        }
                    }}
                    defaultAction={async (data) => {
                        await props.update({ variables: data });
                    }}
                    defaultLayout={false}
                >
                    <XFormError onlyGeneralErrors={true} />
                    <XFormLoadingContent>
                        <XSGroup>
                            <XSGroupTitle>Desktop notifications</XSGroupTitle>
                            <XSGroupText>Notify me about...</XSGroupText>
                            <XSCheckbox square={true} label="All new messages" trueValue="ALL" field="input.desktopNotifications" />
                            <XSCheckbox square={true} label="Direct messages" trueValue="DIRECT" field="input.desktopNotifications" />
                            <XSCheckbox square={true} label="Nothing" trueValue="NONE" field="input.desktopNotifications" />
                        </XSGroup>
                        <XSGroup>
                            <XSGroupTitle>Mobile push notifications</XSGroupTitle>
                            <XSGroupText>Notify me about...</XSGroupText>
                            <XSCheckbox square={true} label="All new messages" trueValue="ALL" field="input.mobileNotifications" />
                            <XSCheckbox square={true} label="Direct messages" trueValue="DIRECT" field="input.mobileNotifications" />
                            <XSCheckbox square={true} label="Nothing" trueValue="NONE" field="input.mobileNotifications" />
                        </XSGroup>
                        <XSGroup>
                            <XSGroupTitle>Email notifications</XSGroupTitle>
                            <XSGroupText>When you’re busy or not online, Openland can send you email notifications about new messages. We will use <strong>{props.data.settings.primaryEmail}</strong> for notifications.</XSGroupText>
                            <XSCheckbox square={true} label="Notify every 15 minutes" trueValue="MIN_15" field="input.emailFrequency" />
                            <XSCheckbox square={true} label="Notify maximum once per hour" trueValue="HOUR_1" field="input.emailFrequency" />
                            <XSCheckbox square={true} label="Never notify me" trueValue="NEVER" field="input.emailFrequency" />
                        </XSGroup>
                    </XFormLoadingContent>
                    <XSWrapper>
                        <XFormSubmit text="Save changes" style="primary-sky-blue" size="r-default" alignSelf="flex-start" />
                    </XSWrapper>
                </XForm>
            </XSContainer>
        </Navigation>
    );
})));