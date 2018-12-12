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
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { XSelect } from 'openland-x/XSelect';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { NotificationMessages, Settings_settings, SettingsUpdate, SettingsUpdateVariables } from 'openland-api/Types';
import { MutationFunc } from 'react-apollo';
import { AppNotifications } from 'openland-y-runtime-web/AppNotifications';
import { AppNotifcationsState } from 'openland-y-runtime-api/AppNotificationsApi';
import { XModal, XModalFooter } from 'openland-x-modal/XModal';
import CloseIcon from './icons/ic-close.svg';
import LockIcon from './icons/ic-lock-settings.svg';
import NotificationsIcon from './icons/ic-notifications.svg';
import NotificationsFirefoxIcon from './icons/ic-notifications-firefox-2.svg';

const Container = (props: { children?: any }) => (
    <XView
        paddingTop={16}
        paddingLeft={30}
        paddingRight={30}
    >
        {props.children}
    </XView>
);

const Header = (props: { children?: any }) => (
    <XView
        fontSize={22}
        lineHeight="24px"
        opacity={0.9}
        marginBottom={31}
    >
        {props.children}
    </XView>
);

const Group = (props: { children?: any }) => (
    <XView maxWidth={570}>
        {props.children}
    </XView>
);

const GroupText = Glamorous.div({
    fontSize: 13,
    lineHeight: '20px',
    marginTop: -3,
    marginBottom: 16,
    opacity: 0.9,

    '&:last-child': {
        marginBottom: 0
    },

    '> strong': {
        fontWeight: 600
    }
});

const GroupTitle = (props: { children?: any }) => (
    <XView
        fontSize={14}
        lineHeight="20px"
        fontWeight={600}
        marginBottom={12}
    >
        {props.children}
    </XView>
);

const GroupSubTitle = (props: { children?: any }) => (
    <XView
        fontSize={14}
        lineHeight="16px"
        paddingTop={4}
        marginBottom={12}
    >
        {props.children}
    </XView>
);

const Instruction = Glamorous.div({
    paddingTop: 4,
    paddingBottom: 40
});

const InstructionItem = Glamorous.div({
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.9)',
    lineHeight: '20px',
    marginBottom: 20,

    '&:last-child': {
        marginBottom: 0
    },

    '& svg': {
        display: 'inline-block',
        verticalAlign: 'top',
        opacity: 0.7
    },

    '& strong': {
        fontWeight: 600
    }
});

class BrowserNotifications extends React.Component<{}, { notificationsState: AppNotifcationsState }> {
    constructor (props: {}) {
        super(props);

        this.state = {
            notificationsState: AppNotifications.state
        }

        AppNotifications.watch(this.handleNotificationsState);
    }

    componentWillUnmount () {
        AppNotifications.unwatch(this.handleNotificationsState);
    }

    handleNotificationsState = (state: AppNotifcationsState) => {
        if (state !== this.state.notificationsState) {
            this.setState({
                notificationsState: state
            });
        }
    }

    handleEnableClick = () => {
        AppNotifications.requestPermission();
    }

    render () {
        if (canUseDOM) {
            let isFirefox = /Firefox\/\d./i.test(navigator.userAgent);
            let isOpera = /Opera\/\d./i.test(navigator.userAgent) || /OPR\/\d./i.test(navigator.userAgent);
            let isChrome = !isOpera && /Chrome\/\d./i.test(navigator.userAgent);
            let isSafari = !isChrome && /Safari\/\d./i.test(navigator.userAgent);

            let SupportedBrowsers = isChrome || isFirefox;

            let { notificationsState } = this.state;

            return (
                <Group>
                    <GroupTitle>Desktop notifications</GroupTitle>

                    {notificationsState === 'granted' && (
                        <GroupText>
                            Notifications are turned on in this browser.
                            <br />
                            You can always change it in your browser preferences.
                        </GroupText>
                    )}

                    {notificationsState !== 'granted' && !SupportedBrowsers && (
                        <GroupText>
                            Notifications are turned off in this browser.
                            <br />
                            You can always change it in your browser preferences.
                        </GroupText>
                    )}

                    {notificationsState !== 'granted' && SupportedBrowsers && (
                        <>
                            <GroupText>
                                Notifications are disabled for this browser.
                            </GroupText>

                            {notificationsState === 'default' && (
                                <XButton
                                    alignSelf="flex-start"
                                    style="warning"
                                    size="small"
                                    text="Enable"
                                    onClick={this.handleEnableClick}
                                />
                            )}

                            {notificationsState !== 'default' && (
                                <XModal
                                    title="Turn on browser notifications for Openland"
                                    useTopCloser={true}
                                    target={(
                                        <XButton
                                            alignSelf="flex-start"
                                            style="warning"
                                            size="small"
                                            text="Enable"
                                        />
                                    )}
                                    footer={(
                                        <XModalFooter>
                                            <XButton text="Got it" style="primary" autoClose={true} />
                                        </XModalFooter>
                                    )}
                                >
                                    {isChrome && (
                                        <Instruction>
                                            <InstructionItem>1. Click <LockIcon /> in your browser's address bar.</InstructionItem>
                                            <InstructionItem>2. Locate <NotificationsIcon /> <strong>Notifications</strong> and select "Allow".</InstructionItem>
                                        </Instruction>
                                    )}
                                    {isFirefox && (
                                        <Instruction>
                                            <InstructionItem>1. Click <LockIcon /> in your browser's address bar.</InstructionItem>
                                            <InstructionItem>2. Locate <NotificationsFirefoxIcon /> <strong>Receive notifications</strong> and select <CloseIcon /> next to «Blocked».</InstructionItem>
                                        </Instruction>
                                    )}
                                </XModal>
                            )}
                        </>
                    )}
                </Group>
            );
        } else {
            return (
                <Group>
                    <GroupTitle>Desktop notifications</GroupTitle>
                </Group>
            );
        }
    }
};

const MobileApp = Glamorous.a<{ system: 'ios' | 'android'}>(props => ({
    width: 103,
    height: props.system === 'ios' ? 33 : 34,
    background: 'center center no-repeat',
    backgroundSize: '100% 100%',
    backgroundImage: props.system === 'ios' ? 'url(/static/X/settings/appstore@2x.png)' : 'url(/static/X/settings/googleplay@2x.png)',
    opacity: 0.5,
    marginRight: 18,

    '&:hover': {
        opacity: 0.8
    },

    '&:last-child': {
        marginRight: 0
    }
}));

const MobileApps = () => (
    <Group>
        <GroupTitle>Mobile apps</GroupTitle>
        <GroupText>Install Openland mobile app to receive new messages on the go.</GroupText>

        <XView flexDirection="row">
            <MobileApp system="ios" href="https://oplnd.com/ios" target="_blank" />
            <MobileApp system="android" href="https://oplnd.com/android_beta" target="_blank" />
        </XView>
    </Group>
);

interface NotificationsSettingsPageProps {
    settings: Settings_settings;
    update: MutationFunc<SettingsUpdate, Partial<SettingsUpdateVariables>>;
}

interface NotificationsSettingsPageState {
    isNotificationSelectChanged: boolean;
    isEmailSelectChanged: boolean;
}

class NotificationsSettingsPageInner extends React.Component<NotificationsSettingsPageProps, NotificationsSettingsPageState> {
    constructor(props: NotificationsSettingsPageProps) {
        super(props);

        this.state = {
            isNotificationSelectChanged: false,
            isEmailSelectChanged: false
        }
    }

    handleNotificationSelectChange = () => {
        this.setState({
            isNotificationSelectChanged: true
        });
    }

    handleEmailSelectChange = () => {
        this.setState({
            isEmailSelectChanged: true
        });
    }

    handleNotificationSelectSaved = () => {
        this.setState({
            isNotificationSelectChanged: false
        });
    }

    handleEmailSelectSaved = () => {
        this.setState({
            isEmailSelectChanged: false
        });
    }

    render () {
        let notificationParams = this.props.settings.desktopNotifications;

        if (notificationParams === NotificationMessages.NONE) {
            notificationParams = NotificationMessages.DIRECT;
        }

        return (
            <Navigation title="Notifications settings">
                <Container>
                    <Header>Notifications</Header>
                    <XVertical separator={15}>
                        <XForm
                            defaultData={{
                                input: {
                                    notifications: notificationParams,
                                }
                            }}
                            defaultAction={async data => {
                                await this.props.update({
                                    variables: {
                                        input: {
                                            desktopNotifications: data.input.notifications,
                                            mobileNotifications: data.input.notifications,
                                        }
                                    }
                                });
                            }}
                            defaultLayout={false}
                        >
                            <XFormError onlyGeneralErrors={true} />
                            <XVertical separator={8}>
                                <Group>
                                    <GroupTitle>Notify me about</GroupTitle>
                                    <XView maxWidth={440}>
                                        <XSelect
                                            field="input.notifications"
                                            searchable={false}
                                            clearable={false}
                                            withSubtitle={true}
                                            onChange={this.handleNotificationSelectChange}
                                            options={[
                                                {
                                                    value: 'ALL',
                                                    label: 'All new messages',
                                                    subtitle: 'You’ll be notified for every new message',
                                                },
                                                {
                                                    value: 'DIRECT',
                                                    label: 'Direct messages and mentions',
                                                    subtitle: 'You’ll be only notified for messages directly involving you',
                                                }
                                            ]}
                                        />
                                    </XView>
                                </Group>

                                {this.state.isNotificationSelectChanged && (
                                    <XFormSubmit
                                        succesText="Saved!"
                                        text="Save changes"
                                        style="primary"
                                        alignSelf="flex-start"
                                        onSuccessAnimationEnd={this.handleNotificationSelectSaved}
                                    />
                                )}
                            </XVertical>
                        </XForm>

                        <XForm
                            defaultData={{
                                input: {
                                    emailFrequency: this.props.settings.emailFrequency,
                                }
                            }}
                            defaultAction={async data => {
                                await this.props.update({
                                    variables: {
                                        input: {
                                            emailFrequency: data.input.emailFrequency,
                                        }
                                    }
                                });
                            }}
                            defaultLayout={false}
                        >
                            <XFormError onlyGeneralErrors={true} />
                            <XVertical separator={8}>
                                <Group>
                                    <GroupTitle>Email notifications</GroupTitle>
                                    <GroupText>
                                        When you’re not online, Openland can send you email notifications for new direct messages and mentions of your name.
                                        Notifications are sent to <strong>{this.props.settings.primaryEmail}.</strong>
                                    </GroupText>
                                    <GroupSubTitle>You can email me</GroupSubTitle>
                                    <XView maxWidth={440}>
                                        <XSelect
                                            field="input.emailFrequency"
                                            searchable={false}
                                            clearable={false}
                                            onChange={this.handleEmailSelectChange}
                                            options={[
                                                {
                                                    value: 'MIN_15',
                                                    label: 'At most once every 15 minutes',
                                                },
                                                {
                                                    value: 'HOUR_1',
                                                    label: 'At most once per hour',
                                                },
                                                {
                                                    value: 'HOUR_24',
                                                    label: 'At most once per day',
                                                },
                                                {
                                                    value: 'NEVER',
                                                    label: 'Never',
                                                }
                                            ]}
                                        />
                                    </XView>
                                </Group>

                                {this.state.isEmailSelectChanged && (
                                    <XFormSubmit
                                        succesText="Saved!"
                                        text="Save changes"
                                        style="primary"
                                        alignSelf="flex-start"
                                        onSuccessAnimationEnd={this.handleEmailSelectSaved}
                                    />
                                )}
                            </XVertical>
                        </XForm>

                        <BrowserNotifications />
                        <MobileApps />
                    </XVertical>
                </Container>
            </Navigation>
        );
    }
}

export default withApp('Notifications', 'viewer', withSettings(withQueryLoader(props => (
    <NotificationsSettingsPageInner settings={props.data.settings} update={props.update} />
))));