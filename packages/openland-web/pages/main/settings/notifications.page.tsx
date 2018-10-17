import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { withSettings } from '../../../api/withSettings';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { XVertical } from 'openland-x-layout/XVertical';
import { XForm } from 'openland-x-forms/XForm2';
import { Navigation } from './_navigation';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XFormError } from 'openland-x-forms/XFormError';
import { XContent } from 'openland-x-layout/XContent';
import { XCheckbox } from 'openland-x/XCheckbox';

const Content = Glamorous(XContent)({
    paddingTop: 20
});

const HeadTitle = Glamorous.div({
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: -0.2,
    color: '#1f3449'
});

const GroupTitle = Glamorous.div({
    opacity: 0.9,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.57,
    letterSpacing: -0.2,
    color: '#121e2b'
});

const GroupText = Glamorous.div({
    opacity: 0.5,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1.54,
    letterSpacing: -0.2,
    color: '#121e2b'
});

const CheckboxWrapper = Glamorous(XVertical)({
    padding: 16,
    borderRadius: 10,
    border: 'solid 1px rgba(220, 222, 228, 0.45)',
    alignSelf: 'flex-start'
});

export default withApp('Notifications', 'viewer', withSettings(withQueryLoader((props) => {
    return (
        <Navigation title="Notifications">
            <Content>
                <XVertical separator={12} maxWidth={480}>
                    <HeadTitle>Notifications</HeadTitle>

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
                        <XVertical separator={16}>
                            <XVertical separator={6}>
                                <XVertical separator={1}>
                                    <GroupTitle>Desktop notifications</GroupTitle>
                                    <GroupText>Notify me about...</GroupText>
                                </XVertical>
                                <CheckboxWrapper>
                                    <XCheckbox square={true} label="All new messages" trueValue="ALL" field="input.desktopNotifications" />
                                    <XCheckbox square={true} label="Direct messages" trueValue="DIRECT" field="input.desktopNotifications" />
                                    <XCheckbox square={true} label="Nothing" trueValue="NONE" field="input.desktopNotifications" />
                                </CheckboxWrapper>
                            </XVertical>
                            <XVertical separator={6}>
                                <XVertical separator={1}>
                                    <GroupTitle>Mobile push notifications</GroupTitle>
                                    <GroupText>Notify me about...</GroupText>
                                </XVertical>
                                <CheckboxWrapper>
                                    <XCheckbox square={true} label="All new messages" trueValue="ALL" field="input.mobileNotifications" />
                                    <XCheckbox square={true} label="Direct messages" trueValue="DIRECT" field="input.mobileNotifications" />
                                    <XCheckbox square={true} label="Nothing" trueValue="NONE" field="input.mobileNotifications" />
                                </CheckboxWrapper>
                            </XVertical>
                            <XVertical separator={6}>
                                <XVertical separator={1}>
                                    <GroupTitle>Email notifications</GroupTitle>
                                    <GroupText>When you’re busy or not online, Openland can send you email notifications about new messages. We will use <strong>{props.data.settings.primaryEmail}</strong> for notifications.</GroupText>
                                </XVertical>
                                <CheckboxWrapper>
                                    <XCheckbox square={true} label="Notify every 15 minutes" trueValue="MIN_15" field="input.emailFrequency" />
                                    <XCheckbox square={true} label="Notify maximum once per hour" trueValue="HOUR_1" field="input.emailFrequency" />
                                    <XCheckbox square={true} label="Notify maximum once per day" trueValue="HOUR_24" field="input.emailFrequency" />
                                    {/* <XCheckbox square={true} label="Notify maximum once per week" trueValue="WEEK_1" field="input.emailFrequency" /> */}
                                    <XCheckbox square={true} label="Never notify me" trueValue="NEVER" field="input.emailFrequency" />
                                </CheckboxWrapper>
                            </XVertical>
                            <XFormSubmit succesText="Saved!" text="Save changes" style="primary" alignSelf="flex-start" />
                        </XVertical>
                    </XForm>
                </XVertical>
            </Content>
        </Navigation>
    );
})));