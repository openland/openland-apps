import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { AppNotifications } from 'openland-y-runtime-web/AppNotifications';
import { Router } from './routes';
import { Howler } from 'howler';

// Is it a good place?
if (canUseDOM) {
    Howler.mobileAutoEnable = true;
    AppNotifications.setRouter(Router);
}