import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { Howler } from 'howler';
import { disableTag } from 'mental-log';
import 'openland-x-routing/NextRouting';

// Disable annoying logs
disableTag('API');
disableTag('GraphQL-Direct');

// Is it a good place?
if (canUseDOM) {
    Howler.mobileAutoEnable = true;
}
