import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withMyOrganizationProfile } from '../../../api/withMyOrganizationProfile';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { SettingsNavigation } from './components/SettingsNavigation';
import { InvitesHistory } from './components/invitesHistory';
import { XButton } from 'openland-x/XButton';
import { InvitesGlobalModal } from './components/invites';
import { XVertical } from 'openland-x-layout/XVertical';
import { XView } from 'react-mental';

export default withApp(
    'Invites History',
    'viewer',
    withQueryLoader(
        withMyOrganizationProfile(props => {
            return (
                <SettingsNavigation title="My invites">
                    <XView paddingTop={20} paddingLeft={30} paddingRight={30}>
                        <XVertical separator={12}>
                            <XView fontSize={18} fontWeight="600" color="#1f3449">
                                Invites
                            </XView>
                            <InvitesHistory />
                            <InvitesGlobalModal
                                target={
                                    <XButton
                                        alignSelf="flex-start"
                                        style="primary"
                                        text="Send invites"
                                    />
                                }
                            />
                        </XVertical>
                    </XView>
                </SettingsNavigation>
            );
        }),
    ),
);
