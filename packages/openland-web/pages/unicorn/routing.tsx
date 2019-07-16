import * as React from 'react';
import { URouting } from 'openland-unicorn/URouting';
import { ProfileTab } from 'openland-web/fragments/account/ProfileTab';
import { Notifications } from 'openland-web/fragments/account/Notifications';
import { AppearanceTab } from 'openland-web/fragments/account/AppearanceTab';
import { ShortnameFragment } from 'openland-web/fragments/profile/ShortnameFragment';
import { MessengerFragment } from 'openland-web/fragments/MessengerFragment';
import { useXRouter } from 'openland-x-routing/useXRouter';
import { useUnicorn } from 'openland-unicorn/useUnicorn';

const routing = new URouting();

routing.addRoute('/settings/profile', () => ProfileTab);
routing.addRoute('/settings/notifications', () => Notifications);
routing.addRoute('/settings/appearance', () => AppearanceTab);
routing.addRoute('/mail/:conversationId', () =>
    React.memo(() => {
        let ctx = useUnicorn();
        return (<MessengerFragment id={ctx.id!} />);
    })
);
routing.addRoute('/:shortname', () => ShortnameFragment);

export const Routing = routing;