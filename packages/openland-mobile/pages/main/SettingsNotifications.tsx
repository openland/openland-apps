import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';
import { PageProps } from '../../components/PageProps';
// import { FastHeader } from 'react-native-fast-navigation/FastHeader';
// import { FastHeaderButton } from 'react-native-fast-navigation/FastHeaderButton';
import { ZQuery } from '../../components/ZQuery';
import { SettingsQuery } from 'openland-api/SettingsQuery';
import { ZForm } from '../../components/ZForm';
import { YMutation } from 'openland-y-graphql/YMutation';
import { SettingsUpdateMutation } from 'openland-api/SettingsUpdateMutation';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';

class SettingsNotifciationsComponent extends React.Component<PageProps> {
    private ref = React.createRef<ZForm>();

    handleSave = () => {
        if (this.ref.current) {
            this.ref.current!!.submitForm();
        }
    }

    render() {
        return (
            <>
                <SHeader title="Notifications" />
                <SHeaderButton title="Save" onPress={this.handleSave} />
                <YMutation mutation={SettingsUpdateMutation}>
                    {save => (
                        <ZQuery query={SettingsQuery}>
                            {resp => {
                                return (
                                    <ZForm
                                        action={async (args) => {
                                            await save({ variables: args });
                                        }}
                                        onSuccess={() => this.props.router.back()}
                                        ref={this.ref}
                                        defaultData={{
                                            input: {
                                                mobileNotifications: resp.data.settings.mobileNotifications,
                                                desktopNotifications: resp.data.settings.desktopNotifications,
                                                emailFrequency: resp.data.settings.emailFrequency,
                                            }
                                        }}
                                    >
                                        <ZListItemGroup header="On mobile">
                                            <ZListItem text="All new messages" checkmarkField={{ key: 'input.mobileNotifications', value: 'ALL' }} />
                                            <ZListItem text="Direct messages" checkmarkField={{ key: 'input.mobileNotifications', value: 'DIRECT' }} />
                                            <ZListItem text="Never notify me" checkmarkField={{ key: 'input.mobileNotifications', value: 'NONE' }} />
                                        </ZListItemGroup>
                                        <ZListItemGroup header={null}>
                                            <ZListItem text="Alert" toggle={true} />
                                            <ZListItem text="Include preview of messages" toggle={true} />
                                        </ZListItemGroup>
                                        <ZListItemGroup header="On desktop">
                                            <ZListItem text="All new messages" checkmarkField={{ key: 'input.desktopNotifications', value: 'ALL' }} />
                                            <ZListItem text="Direct messages" checkmarkField={{ key: 'input.desktopNotifications', value: 'DIRECT' }} />
                                            <ZListItem text="Never notify me" checkmarkField={{ key: 'input.desktopNotifications', value: 'NONE' }} />
                                        </ZListItemGroup>
                                        <ZListItemGroup header="By email" footer="When you’re busy or not online, Openland can send you email notifications about new messages. We will use jstatham@gmail.com for notifications">
                                            <ZListItem text="Notify every 15 minutes" checkmarkField={{ key: 'input.emailFrequency', value: 'MIN_15' }} />
                                            <ZListItem text="Notify maximum once per 1 hour" checkmarkField={{ key: 'input.emailFrequency', value: 'HOUR_1' }} />
                                            <ZListItem text="Never notify me" checkmarkField={{ key: 'input.emailFrequency', value: 'NEVER' }} />
                                        </ZListItemGroup>
                                    </ZForm>
                                );
                            }}
                        </ZQuery>
                    )}
                </YMutation>
            </>
        );
    }
}

export const SettingsNotifications = withApp(SettingsNotifciationsComponent);