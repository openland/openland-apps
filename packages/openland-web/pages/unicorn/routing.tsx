import { URouting } from 'openland-unicorn/URouting';
import { ProfileTab } from 'openland-web/fragments/account/ProfileTab';
import { Notifications } from 'openland-web/fragments/account/Notifications';
import { AppearanceTab } from 'openland-web/fragments/account/AppearanceTab';

const routing = new URouting();

routing.addRoute('/settings/profile', () => ProfileTab);
routing.addRoute('/settings/notifications', () => Notifications);
routing.addRoute('/settings/appearance', () => AppearanceTab);

export const Routing = routing;