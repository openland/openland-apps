import React from 'react';
import { XView, XImage } from 'react-mental';
import { TextTitle1, TextBody } from 'openland-web/utils/TextStyles';

export const NotFound = React.memo(() => (
    <XView justifyContent="center" alignItems="center" height="100%" width="100%">
        <XImage
            marginBottom={16}
            width={320}
            height={200}
            src="/static/X/illustration-error.png"
            srcSet="/static/X/illustration-error@2x.png 2x"
        />
        <XView marginBottom={8}>
            <span className={TextTitle1}>
                Content is unavailable
            </span>
        </XView>
        <XView color="var(--foregroundSecondary)">
            <p className={TextBody}>
                This content doesn’t exist or you don’t have an access            
            </p>
        </XView>
    </XView>
));
