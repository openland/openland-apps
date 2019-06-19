import * as React from 'react';
import { css } from 'linaria';
import { XView, XImage } from 'react-mental';
import { withApp } from 'openland-web/components/withApp';
import { XVertical } from 'openland-x-layout/XVertical';
import { XForm } from 'openland-x-forms/XForm2';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XFormError } from 'openland-x-forms/XFormError';
import { XButton } from 'openland-x/XButton';
import { XSelect } from 'openland-x/XSelect';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { NotificationMessages, Settings_settings } from 'openland-api/Types';
import { AppNotifications } from 'openland-y-runtime-web/AppNotifications';
import { AppNotifcationsState } from 'openland-y-runtime-api/AppNotificationsApi';
import { XModal, XModalFooter } from 'openland-x-modal/XModal';
import CloseIcon from 'openland-icons/ic-close.svg';
import LockIcon from 'openland-icons/ic-lock-settings.svg';
import NotificationsIcon from 'openland-icons/ic-notifications.svg';
import NotificationsFirefoxIcon from 'openland-icons/ic-notifications-firefox-2.svg';
import { SettingsNavigation } from './components/SettingsNavigation';
import {
    Content,
    Header,
    Group,
    GroupSubTitle,
    GroupTitle,
    GroupText,
} from './components/SettingComponents';
import { useClient } from 'openland-web/utils/useClient';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { XCheckbox } from 'openland-x/XCheckbox';

const Instruction = (props: { children?: any }) => (
    <XView paddingTop={4} paddingBottom={40}>
        {props.children}
    </XView>
);

const InstructionItem = css`
    font-size: 16px;
    color: rgba(0, 0, 0, 0.9);
    line-height: 20px;
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }

    & svg {
        display: inline-block;
        vertical-align: top;
        opacity: 0.7;
    }

    & strong: {
        font-weight: 600;
    }
`;

class BrowserNotifications extends React.Component<
    {},
    { notificationsState: AppNotifcationsState }
> {
    constructor(props: {}) {
        super(props);

        this.state = {
            notificationsState: AppNotifications.state,
        };

        AppNotifications.watch(this.handleNotificationsState);
    }

    componentWillUnmount() {
        AppNotifications.unwatch(this.handleNotificationsState);
    }

    handleNotificationsState = (state: AppNotifcationsState) => {
        if (state !== this.state.notificationsState) {
            this.setState({
                notificationsState: state,
            });
        }
    };

    handleEnableClick = () => {
        AppNotifications.requestPermission();
    };

    render() {
        if (canUseDOM) {
            let isFirefox = /Firefox\/\d./i.test(navigator.userAgent);
            let isOpera =
                /Opera\/\d./i.test(navigator.userAgent) || /OPR\/\d./i.test(navigator.userAgent);
            let isChrome = !isOpera && /Chrome\/\d./i.test(navigator.userAgent);
            let isSafari = !isChrome && /Safari\/\d./i.test(navigator.userAgent);

            let SupportedBrowsers = isChrome || isFirefox;

            let { notificationsState } = this.state;

            return (
                <Group>
                    <GroupTitle>Desktop notifications</GroupTitle>

                    {notificationsState === 'granted' && (
                        <div className={GroupText}>
                            Notifications are turned on in this browser.
                            <br />
                            You can always change it in your browser preferences.
                        </div>
                    )}

                    {notificationsState !== 'granted' &&
                        !SupportedBrowsers && (
                            <div className={GroupText}>
                                Notifications are turned off in this browser.
                                <br />
                                You can always change it in your browser preferences.
                            </div>
                        )}

                    {notificationsState !== 'granted' &&
                        SupportedBrowsers && (
                            <>
                                <div className={GroupText}>
                                    Notifications are disabled for this browser.
                                </div>

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
                                        target={
                                            <XButton
                                                alignSelf="flex-start"
                                                style="warning"
                                                size="small"
                                                text="Enable"
                                            />
                                        }
                                        footer={
                                            <XModalFooter>
                                                <XButton
                                                    text="Got it"
                                                    style="primary"
                                                    autoClose={true}
                                                />
                                            </XModalFooter>
                                        }
                                    >
                                        {isChrome && (
                                            <Instruction>
                                                <div className={InstructionItem}>
                                                    1. Click <LockIcon /> in your browser's address
                                                    bar.
                                                </div>
                                                <div className={InstructionItem}>
                                                    2. Locate <NotificationsIcon />{' '}
                                                    <strong>Notifications</strong> and select
                                                    "Allow".
                                                </div>
                                            </Instruction>
                                        )}
                                        {isFirefox && (
                                            <Instruction>
                                                <div className={InstructionItem}>
                                                    1. Click <LockIcon /> in your browser's address
                                                    bar.
                                                </div>
                                                <div className={InstructionItem}>
                                                    2. Locate <NotificationsFirefoxIcon />{' '}
                                                    <strong>Receive notifications</strong> and
                                                    select <CloseIcon /> next to «Blocked».
                                                </div>
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
}

const MobileApps = () => (
    <Group>
        <GroupTitle>Mobile apps</GroupTitle>
        <div className={GroupText}>
            Install Openland mobile app to receive new messages on the go.
        </div>

        <XView flexDirection="row">
            <XView
                as="a"
                href="https://oplnd.com/ios"
                target="_blank"
                marginRight={18}
                opacity={0.5}
                hoverOpacity={0.8}
                hoverTextDecoration="none"
            >
                <XImage width={103} height={33} src="/static/X/settings/appstore@2x.png" />
            </XView>
            <XView
                as="a"
                href="https://oplnd.com/android"
                target="_blank"
                opacity={0.5}
                hoverOpacity={0.8}
                hoverTextDecoration="none"
            >
                <XImage width={103} height={34} src="/static/X/settings/googleplay@2x.png" />
            </XView>
        </XView>
    </Group>
);

interface NotificationsSettingsPageProps {
    settings: Settings_settings;
    client: OpenlandClient;
}

interface NotificationsSettingsPageState {
    isNotificationSelectChanged: boolean;
    isEmailSelectChanged: boolean;
    isCommentSelectChanged: boolean;
}

class NotificationsSettingsPageInner extends React.Component<
    NotificationsSettingsPageProps,
    NotificationsSettingsPageState
> {
    constructor(props: NotificationsSettingsPageProps) {
        super(props);

        this.state = {
            isNotificationSelectChanged: false,
            isEmailSelectChanged: false,
            isCommentSelectChanged: false,
        };
    }

    handleNotificationSelectChange = () => {
        this.setState({
            isNotificationSelectChanged: true,
        });
    };

    handleEmailSelectChange = () => {
        this.setState({
            isEmailSelectChanged: true,
        });
    };

    handleCommentSelectChange = () => {
        this.setState({
            isCommentSelectChanged: true,
        });
    };

    handleNotificationSelectSaved = () => {
        this.setState({
            isNotificationSelectChanged: false,
        });
    };

    handleEmailSelectSaved = () => {
        this.setState({
            isEmailSelectChanged: false,
        });
    };

    handleCommentSelectSaved = () => {
        this.setState({
            isCommentSelectChanged: false,
        });
    };

    render() {
        let notificationParams = this.props.settings.desktopNotifications;
        let commentParams = this.props.settings.commentNotifications;

        if (notificationParams === NotificationMessages.NONE) {
            notificationParams = NotificationMessages.DIRECT;
        }

        return (
            <SettingsNavigation title="Notifications">
                <Content>
                    <Header>Notifications</Header>
                    <XVertical separator={15}>
                        <XForm
                            defaultData={{
                                input: {
                                    notifications: notificationParams,
                                },
                            }}
                            defaultAction={async data => {
                                await this.props.client.mutateSettingsUpdate({
                                    input: {
                                        desktopNotifications: data.input.notifications,
                                        mobileNotifications: data.input.notifications,
                                    },
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
                                                    subtitle:
                                                        'You’ll be notified for every new message',
                                                },
                                                {
                                                    value: 'DIRECT',
                                                    label: 'Direct messages and mentions',
                                                    subtitle:
                                                        'You’ll be only notified for messages directly involving you',
                                                },
                                            ]}
                                        />
                                    </XView>
                                </Group>

                                {this.state.isNotificationSelectChanged && (
                                    <XFormSubmit
                                        successText="Saved!"
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
                                    comment: commentParams,
                                },
                            }}
                            defaultAction={async data => {
                                await this.props.client.mutateSettingsUpdate({
                                    input: {
                                        commentNotifications: data.input.comment,
                                    },
                                });
                            }}
                            defaultLayout={false}
                        >
                            <XFormError onlyGeneralErrors={true} />
                            <XVertical separator={8}>
                                <Group>
                                    <GroupTitle>Comment notifications</GroupTitle>
                                    <XView maxWidth={440}>
                                        <XCheckbox
                                            label="Notify me about comments in threads I'm following"
                                            trueValue="ALL"
                                            falseValue="NONE"
                                            field="input.comment"
                                            onChange={this.handleCommentSelectChange}
                                        />
                                    </XView>
                                </Group>

                                {this.state.isCommentSelectChanged && (
                                    <XFormSubmit
                                        successText="Saved!"
                                        text="Save changes"
                                        style="primary"
                                        alignSelf="flex-start"
                                        onSuccessAnimationEnd={this.handleCommentSelectSaved}
                                    />
                                )}
                            </XVertical>
                        </XForm>

                        <XForm
                            defaultData={{
                                input: {
                                    emailFrequency: this.props.settings.emailFrequency,
                                },
                            }}
                            defaultAction={async data => {
                                await this.props.client.mutateSettingsUpdate({
                                    input: {
                                        emailFrequency: data.input.emailFrequency,
                                    },
                                });
                            }}
                            defaultLayout={false}
                        >
                            <XFormError onlyGeneralErrors={true} />
                            <XVertical separator={8}>
                                <Group>
                                    <GroupTitle>Email notifications</GroupTitle>
                                    <div className={GroupText}>
                                        When you’re not online, Openland can send you email
                                        notifications for new direct messages and mentions of your
                                        name. Notifications are sent to{' '}
                                        <strong>{this.props.settings.primaryEmail}.</strong>
                                    </div>
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
                                                },
                                            ]}
                                        />
                                    </XView>
                                </Group>

                                {this.state.isEmailSelectChanged && (
                                    <XFormSubmit
                                        successText="Saved!"
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
                </Content>
            </SettingsNavigation>
        );
    }
}

export default withApp(
    'Notifications',
    'viewer',
    () => {
        if (!canUseDOM) {
            return null;
        }
        const client = useClient();
        const settings = client.useSettings();

        return <NotificationsSettingsPageInner settings={settings.settings} client={client} />;
    },

    // withSettings(
    //     withQueryLoader(props => (
    //         <NotificationsSettingsPageInner settings={props.data.settings} update={props.update} />
    //     )),
    // ),
);
