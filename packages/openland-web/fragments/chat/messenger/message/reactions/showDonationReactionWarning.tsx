import * as React from 'react';
import { css } from 'linaria';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';

const container = css`
    background: url(https://cdn.openland.com/shared/web/donations/ic-donations-96.png) center center no-repeat;
    background-image: -webkit-image-set(url(https://cdn.openland.com/shared/web/donations/ic-donations-96.png) 1x, url(https://cdn.openland.com/shared/web/donations/ic-donations-96@2x.png) 2x, url(https://cdn.openland.com/shared/web/donations/ic-donations-96@3x.png) 3x);
    height: 96px;
    width: 160px;
    margin: -4px auto 24px;
`;

export const showDonationReactionWarning = (action: () => Promise<any>) => {
    let builder = new AlertBlanketBuilder();
    builder
        .title('Premium reaction')
        .message('Express your support with a donation to the author')
        .body(() => <div className={container} />)
        .action('Donate $1', async() => { await action(); }, 'pay')
        .width(400);
    builder.show();
};
