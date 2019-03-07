import React from 'react';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { AppNotifications } from 'openland-y-runtime-web/AppNotifications';
import { Router } from './routes';
import { Howler } from 'howler';

if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React);
}

// Is it a good place?
if (canUseDOM) {
    Howler.mobileAutoEnable = true;
    AppNotifications.setRouter(Router);
}
