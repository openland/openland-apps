import * as React from 'react';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { ZHeaderButton } from '../../components/ZHeaderButton';
import { ZScrollView } from '../../components/ZScrollView';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';
import { ZHeader } from '../../components/ZHeader';

class SettingsNotifciationsComponent extends React.Component<NavigationInjectedProps> {

    handleSave = () => {
        // if (this.ref.current) {
        //     this.ref.current!!.submitForm();
        // }
    }

    render() {
        return (
            <>
                <ZHeader title="Notifications" />
                <ZHeaderButton title="Save" onPress={this.handleSave} />
                <ZScrollView>
                    <ZListItemGroup header="On mobile">
                        <ZListItem text="All new messages" />
                        <ZListItem text="Direct messages" />
                        <ZListItem text="Never notify me" />
                    </ZListItemGroup>
                    <ZListItemGroup header={null}>
                        <ZListItem text="Sounds" toggle={true} />
                        <ZListItem text="Vibrate" toggle={true} />
                        <ZListItem text="Include preview of messages" toggle={true} />
                    </ZListItemGroup>
                    <ZListItemGroup header="By email" footer="When you’re busy or not online, Openland can send you email notifications about new messages. We will use jstatham@gmail.com for notifications">
                        <ZListItem text="Notify every 15 minutes" />
                        <ZListItem text="Notify maximum once per 1 hour" />
                        <ZListItem text="Never notify me" />
                    </ZListItemGroup>
                </ZScrollView>
            </>
        );
    }
}

export const SettingsNotifications = withApp(SettingsNotifciationsComponent);