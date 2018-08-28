import '../../init';
import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withMyOrganizationProfile } from '../../../api/withMyOrganizationProfile';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { Navigation } from './_navigation';
import { InvitesHistory } from './invitesHistory';
import { XHeader } from 'openland-x/XHeader';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { InvitesGlobalModal } from './invites';

const Content = Glamorous(XVertical)({
    paddingLeft: 24,
    paddingRight: 24,
});

export default withApp('Invites History', 'viewer', withQueryLoader(withMyOrganizationProfile((props) => {
    return (
        <Navigation title="Invites">
            <XHeader text="Invites" />
            <Content>
                <InvitesHistory />
                <InvitesGlobalModal target={<XButton alignSelf="flex-start" size="medium" style="primary" text="Send invites"/>}/>
            </Content>
        </Navigation>
    );
})));
