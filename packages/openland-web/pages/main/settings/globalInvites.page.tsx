import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { withMyOrganizationProfile } from '../../../api/withMyOrganizationProfile';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { Navigation } from './_navigation';
import { InvitesHistory } from './invitesHistory';
import { XButton } from 'openland-x/XButton';
import { XContent } from 'openland-x-layout/XContent';
import { InvitesGlobalModal } from './invites';
import { XVertical } from 'openland-x-layout/XVertical';

const HeadTitle = Glamorous.div({
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: -0.2,
    color: '#1f3449'
});

const Content = Glamorous(XContent)({
    paddingTop: 20
});

export default withApp('Invites History', 'viewer', withQueryLoader(withMyOrganizationProfile((props) => {
    return (
        <Navigation title="My invites">
            <Content>
                <XVertical separator={12}>
                    <HeadTitle>Invites</HeadTitle>
                    <InvitesHistory />
                    <InvitesGlobalModal target={<XButton alignSelf="flex-start" style="primary" text="Send invites" />} />
                </XVertical>
            </Content>
        </Navigation>
    );
})));
