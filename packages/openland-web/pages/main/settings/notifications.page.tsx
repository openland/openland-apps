import '../../init';
import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { withSettings } from '../../../api/withSettings';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { XVertical } from 'openland-x-layout/XVertical';
import { XForm } from 'openland-x-forms/XForm2';
import { XContent } from 'openland-x-layout/XContent';
import { Navigation } from './_navigation';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormError } from 'openland-x-forms/XFormError';
import { XCheckbox } from 'openland-x/XCheckbox';
import { XPopper } from 'openland-x/XPopper';
import { XText } from 'openland-x/XText';
import TooltipIcon from './icons/ic-info.svg';

const Content = Glamorous(XContent)({
    paddingTop: 20
});

const MainTitle = Glamorous.div({
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: -0.2,
    color: '#1f3449'
});

const SettingCard = Glamorous(XVertical)({
    padding: 16,
    borderRadius: 10,
    border: 'solid 1px rgba(220, 222, 228, 0.45)'
});

const CardTitle = Glamorous.div({
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 1.25,
    letterSpacing: -0.1,
    color: '#1f3449'
});

const TooltipWrapper = Glamorous(XPopper.Content)({
    padding: 0,
    width: 390
});

const TooltipTarget = Glamorous.div({
    marginBottom: -7,
    cursor: 'pointer',
    '&:hover > svg > g > path:last-child': {
        fill: '#654bfa'
    }
});

const TooltipContentRow = Glamorous.div({
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    '&:last-child': {
        borderBottom: 'none'
    }
});

export default withApp('Notifications', 'viewer', withSettings(withQueryLoader((props) => {
    return (
        <Navigation title="Notifications">
            <Content>
                <XVertical alignSelf="stretch" separator={20}>
                    <MainTitle>Notifications</MainTitle>
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
                        <XVertical separator={12}>
                            <XFormError onlyGeneralErrors={true} />
                            <XFormLoadingContent>
                                <XVertical flexGrow={1} maxWidth={300} separator={13}>
                                    <XVertical separator={6}>
                                        <CardTitle>Desktop notifications</CardTitle>
                                        <SettingCard separator={9}>
                                            <XCheckbox square={true} label="Notify me about all new messages" trueValue="ALL" field="input.desktopNotifications" />
                                            <XCheckbox square={true} label="Notify me about direct messages" trueValue="DIRECT" field="input.desktopNotifications" />
                                            <XCheckbox square={true} label="Never notify me" trueValue="NONE" field="input.desktopNotifications" />
                                        </SettingCard>
                                    </XVertical>
                                    <XVertical separator={6}>
                                        <XHorizontal alignItems="center" separator={5}>
                                            <CardTitle>Email notifications</CardTitle>
                                            <XPopper
                                                placement="bottom"
                                                showOnHover={true}
                                                content={(
                                                    <div>
                                                        <TooltipContentRow>
                                                            <XText>When you’re busy or not online, Openland can send you email notifications about new messages.</XText>
                                                        </TooltipContentRow>
                                                        <TooltipContentRow>
                                                            <XText>We will use <strong>{props.data.settings.primaryEmail}</strong> for notifications.</XText>
                                                        </TooltipContentRow>
                                                    </div>
                                                )}
                                                contentContainer={<TooltipWrapper />}
                                            >
                                                <TooltipTarget>
                                                    <TooltipIcon />
                                                </TooltipTarget>
                                            </XPopper>
                                        </XHorizontal>
                                        <SettingCard separator={9}>
                                            <XCheckbox square={true} label="Notify every 15 minutes" trueValue="MIN_15" field="input.emailFrequency" />
                                            <XCheckbox square={true} label="Notify maximum once per hour" trueValue="HOUR_1" field="input.emailFrequency" />
                                            <XCheckbox square={true} label="Never notify me" trueValue="NEVER" field="input.emailFrequency" />
                                        </SettingCard>
                                    </XVertical>
                                </XVertical>
                            </XFormLoadingContent>
                            <XFormSubmit text="Save changes" style="primary-sky-blue" size="r-default" alignSelf="flex-start" />
                        </XVertical>
                    </XForm>
                </XVertical>
            </Content>
        </Navigation>
    );
})));