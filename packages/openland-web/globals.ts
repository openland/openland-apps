import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { AppNotifications } from 'openland-y-runtime-web/AppNotifications';
import { Router } from './routes';
import { Howler } from 'howler';
import { disableTag } from 'mental-log';
import 'openland-x-routing/NextRouting';

// Disable annoying logs
disableTag('API');
disableTag('GraphQL-Direct');

// Is it a good place?
if (canUseDOM) {
    Howler.mobileAutoEnable = true;
    AppNotifications.setRouter(Router);
}
